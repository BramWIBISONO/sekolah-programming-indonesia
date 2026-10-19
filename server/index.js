import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { query, get, run } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// The signing secret comes from the environment only. If it is missing, this process uses a random secret,
// so tokens stop working after a restart, and nothing committed to the repository can sign a token.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(48).toString('hex');
if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is not set: using a random secret for this process. Set JWT_SECRET in the environment.');
}

// Only these origins may call the API from a browser.
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS || [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5174',
  'https://www.sekolahprogrammingindonesia.com',
  'https://sekolahprogrammingindonesia.com',
].join(',')).split(',').map((o) => o.trim()).filter(Boolean);

// Public signup is off unless it is enabled explicitly. Accounts created this way are regular users, never admins.
const ALLOW_SIGNUP = process.env.ALLOW_SIGNUP === 'true';

// ─── MIDDLEWARE ──────────────────────────────────────────────────────────────

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.use(cors({ origin: (origin, callback) => callback(null, !origin || ALLOWED_ORIGINS.includes(origin)) }));
app.use(express.json({ limit: '100kb' }));

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
};

// Authentication: the token must be valid and signed with our secret.
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Authorization: the role is checked against the database, not only the token, so a changed role takes effect at once.
const requireAdmin = async (req, res, next) => {
  try {
    const row = await get('SELECT role FROM users WHERE id = ?', [req.user.id]);
    if (!row || row.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
    next();
  } catch (error) {
    handleError(res, error);
  }
};

// Public reads: an admin token shows every row, anyone else sees only published rows.
const optionalAdmin = async (req, res, next) => {
  req.isAdmin = false;
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return next();
  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    const row = await get('SELECT role FROM users WHERE id = ?', [payload.id]);
    req.isAdmin = !!row && row.role === 'admin';
  } catch {
    // Invalid or expired token: treat the request as public.
  }
  next();
};

// Login throttling: after too many failures for one account from one address, refuse for a while.
const failures = new Map();
const FAIL_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;
const loginKey = (req) => `${req.ip}|${String(req.body?.email || '').toLowerCase()}`;
const isLocked = (key) => {
  const entry = failures.get(key);
  if (!entry) return false;
  if (Date.now() - entry.since > FAIL_WINDOW_MS) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
};
const recordFailure = (key) => {
  const entry = failures.get(key);
  if (!entry || Date.now() - entry.since > FAIL_WINDOW_MS) failures.set(key, { count: 1, since: Date.now() });
  else entry.count += 1;
};

// ─── UPLOADS ─────────────────────────────────────────────────────────────────

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// PDFs are downloaded rather than rendered, so a document cannot run in the site's origin.
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (path.extname(filePath).toLowerCase() === '.pdf') res.setHeader('Content-Disposition', 'attachment');
  },
}));

// Accepted extensions and the MIME type that goes with each.
const ALLOWED_UPLOADS = {
  '.jpg': ['image/jpeg'],
  '.jpeg': ['image/jpeg'],
  '.png': ['image/png'],
  '.webp': ['image/webp'],
  '.pdf': ['application/pdf'],
};

// The first bytes of each accepted type. The MIME type sent by the browser is not trusted on its own.
const MAGIC = {
  '.jpg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.jpeg': (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  '.png': (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  '.webp': (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP',
  '.pdf': (b) => b.subarray(0, 4).toString('ascii') === '%PDF',
};

// Keep only a plain file name: no directories, no unusual characters.
const safeName = (name) => path.basename(String(name)).replace(/[^a-zA-Z0-9._-]/g, '-').slice(-120) || 'file';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${safeName(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const mimes = ALLOWED_UPLOADS[ext];
    if (mimes && mimes.includes(file.mimetype)) return cb(null, true);
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.'));
  },
});

app.post('/api/upload', authenticateToken, requireAdmin, (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const ext = path.extname(req.file.filename).toLowerCase();
    const head = Buffer.alloc(12);
    const fd = fs.openSync(req.file.path, 'r');
    fs.readSync(fd, head, 0, 12, 0);
    fs.closeSync(fd);

    const matches = MAGIC[ext] ? MAGIC[ext](head) : false;
    if (!matches) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'File content does not match its type.' });
    }
    res.json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
  });
});

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

app.post('/api/auth/signup', async (req, res) => {
  if (!ALLOW_SIGNUP) return res.status(403).json({ error: 'Signup is disabled' });
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    if (typeof password !== 'string' || password.length < 10) {
      return res.status(400).json({ error: 'Password must be at least 10 characters' });
    }

    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 12);
    const result = await run("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'user')", [email, hash]);
    res.status(201).json({ message: 'User created successfully', id: result.lastID });
  } catch (error) {
    handleError(res, error);
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const key = loginKey(req);
    if (isLocked(key)) return res.status(429).json({ error: 'Too many attempts. Try again later.' });

    if (typeof email !== 'string' || typeof password !== 'string') {
      recordFailure(key);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    const valid = user ? await bcrypt.compare(password, user.password_hash) : false;
    if (!valid) {
      recordFailure(key);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    failures.delete(key);
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h', algorithm: 'HS256' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// ─── GENERIC CRUD FACTORY ───────────────────────────────────────────────────

// Column names come from the table itself, so a request key can only name a real column.
const columnCache = {};
const columnsOf = async (table) => {
  if (!columnCache[table]) {
    const rows = await query(`PRAGMA table_info(${table})`, []);
    columnCache[table] = new Set(rows.map((r) => r.name));
  }
  return columnCache[table];
};

const IGNORED_FIELDS = new Set(['id', 'created_at', 'updated_at']);

const cleanPayload = async (table, body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Invalid payload' };
  const allowed = await columnsOf(table);
  const keys = Object.keys(body).filter((k) => !IGNORED_FIELDS.has(k));
  if (keys.length === 0) return { error: 'Empty payload' };
  const unknown = keys.filter((k) => !allowed.has(k));
  if (unknown.length) return { error: `Unknown field(s): ${unknown.join(', ')}` };
  return { keys, values: keys.map((k) => body[k]) };
};

const generateCrudRoutes = (tableName, pathName) => {
  // Public: published rows only. Admin token: all rows, optionally filtered by status.
  app.get(`/api/${pathName}`, optionalAdmin, async (req, res) => {
    try {
      let rows;
      if (req.isAdmin) {
        const { status } = req.query;
        rows = status
          ? await query(`SELECT * FROM ${tableName} WHERE status = ? ORDER BY created_at DESC`, [String(status)])
          : await query(`SELECT * FROM ${tableName} ORDER BY created_at DESC`, []);
      } else {
        rows = await query(`SELECT * FROM ${tableName} WHERE status = 'published' ORDER BY created_at DESC`, []);
      }
      res.json(rows);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.get(`/api/${pathName}/:id`, optionalAdmin, async (req, res) => {
    try {
      const row = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id]);
      if (!row || (!req.isAdmin && row.status !== 'published')) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.post(`/api/${pathName}`, authenticateToken, requireAdmin, async (req, res) => {
    try {
      const clean = await cleanPayload(tableName, req.body);
      if (clean.error) return res.status(400).json({ error: clean.error });

      const columns = clean.keys.map((k) => `"${k}"`).join(', ');
      const placeholders = clean.keys.map(() => '?').join(', ');
      const result = await run(`INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`, clean.values);
      const inserted = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [result.lastID]);
      res.status(201).json(inserted);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.put(`/api/${pathName}/:id`, authenticateToken, requireAdmin, async (req, res) => {
    try {
      const clean = await cleanPayload(tableName, req.body);
      if (clean.error) return res.status(400).json({ error: clean.error });

      const setClause = clean.keys.map((k) => `"${k}" = ?`).join(', ');
      await run(`UPDATE ${tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, [...clean.values, req.params.id]);
      const updated = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id]);
      res.json(updated);
    } catch (error) {
      handleError(res, error);
    }
  });

  app.delete(`/api/${pathName}/:id`, authenticateToken, requireAdmin, async (req, res) => {
    try {
      await run(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id]);
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  });
};

generateCrudRoutes('events', 'events');
generateCrudRoutes('blog_posts', 'blog');
generateCrudRoutes('journal_publications', 'journal');
generateCrudRoutes('monthly_programs', 'programs');
generateCrudRoutes('achievements', 'achievements');

// Malformed JSON and similar request errors: short message, no stack trace.
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  if (err && err.status === 413) return res.status(413).json({ error: 'Payload too large' });
  handleError(res, err);
});

app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
