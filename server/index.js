import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { query, get, run } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_spi_2026';

// Middleware
app.use(cors());
app.use(express.json());

// Setup static file serving for uploads
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedDocTypes = ['application/pdf'];
    if (allowedImageTypes.includes(file.mimetype) || allowedDocTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed.'));
    }
  }
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    
    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash]);
    
    res.status(201).json({ message: 'User created successfully', id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// ─── UPLOAD ROUTE ────────────────────────────────────────────────────────────

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl, filename: req.file.filename });
});

// ─── GENERIC CRUD FACTORY ───────────────────────────────────────────────────

const generateCrudRoutes = (tableName, pathName) => {
  // Get all (publicly visible typically filtered by status='published', but admin sees all)
  app.get(`/api/${pathName}`, async (req, res) => {
    try {
      const { status } = req.query;
      let sql = `SELECT * FROM ${tableName} ORDER BY created_at DESC`;
      let params = [];
      
      if (status) {
        sql = `SELECT * FROM ${tableName} WHERE status = ? ORDER BY created_at DESC`;
        params = [status];
      }
      
      const rows = await query(sql, params);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get one
  app.get(`/api/${pathName}/:id`, async (req, res) => {
    try {
      const row = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id]);
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create (Admin only)
  app.post(`/api/${pathName}`, authenticateToken, async (req, res) => {
    try {
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      
      if (keys.length === 0) return res.status(400).json({ error: 'Empty payload' });

      const placeholders = keys.map(() => '?').join(', ');
      const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
      
      const result = await run(sql, values);
      const inserted = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [result.lastID]);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update (Admin only)
  app.put(`/api/${pathName}/:id`, authenticateToken, async (req, res) => {
    try {
      const keys = Object.keys(req.body);
      const values = Object.values(req.body);
      
      if (keys.length === 0) return res.status(400).json({ error: 'Empty payload' });

      const setClause = keys.map(k => `${k} = ?`).join(', ');
      // Add updated_at
      const sql = `UPDATE ${tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      
      await run(sql, [...values, req.params.id]);
      const updated = await get(`SELECT * FROM ${tableName} WHERE id = ?`, [req.params.id]);
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete (Admin only)
  app.delete(`/api/${pathName}/:id`, authenticateToken, async (req, res) => {
    try {
      await run(`DELETE FROM ${tableName} WHERE id = ?`, [req.params.id]);
      res.json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Generate routes for all modules
generateCrudRoutes('events', 'events');
generateCrudRoutes('blog_posts', 'blog');
generateCrudRoutes('journal_publications', 'journal');
generateCrudRoutes('monthly_programs', 'programs');
generateCrudRoutes('achievements', 'achievements');


app.listen(PORT, () => {
  console.log(`Express API running on http://localhost:${PORT}`);
});
