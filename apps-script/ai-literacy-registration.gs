/**
 * Gerakan AI Literacy Indonesia: registration endpoint for the SPI website.
 *
 * Deploy this file as a Web App in the Google account that owns the spreadsheet. The steps are in README.md.
 * Everything here runs on Google's servers. Nothing secret is sent to the browser.
 *
 * Rules enforced here (the website shows them, but this file is the one that decides):
 * - At most CAPACITY confirmed registrations. Requests run one at a time under a script lock, so two people
 *   cannot both take the last place.
 * - One confirmed registration per email address (lower-cased and trimmed). Nothing else is merged.
 * - A row is written only after the whole registration is valid. Rejected attempts are not stored.
 * - Success is returned only after the row has been written and flushed.
 */

// Identifier of the spreadsheet (not a secret). Only the "AI Literacy" worksheet is written; others are not touched.
const SPREADSHEET_ID = '1E4vP3G_pCZ6kROdmfJ0jkVenNLxoEA5uUdJysVqSlpo';
const SHEET_NAME = 'AI Literacy';
const DEFAULT_CAPACITY = 300;

// Column names, in the order from the brief. If the sheet already has headers, columns are matched by name.
const HEADERS = [
  'Timestamp',
  'Registration ID',
  'Nama Lengkap',
  'Email',
  'WhatsApp',
  'Kota',
  'Peran',
  'Bidang Pekerjaan',
  'Institusi',
  'Frekuensi Penggunaan AI',
  'Tools AI',
  'Kepercayaan Diri AI',
  'Kebutuhan AI',
  'Tantangan AI',
  'Tujuan Praktis',
  'Kesiapan Online',
  'Perangkat',
  'Koneksi Internet',
  'Kesiapan Praktik',
  'Persetujuan Data',
  'Minat Pelatihan Lanjutan',
  'Sumber Informasi',
  'Status Pendaftaran',
];

// Form field -> column name.
const FIELD_HEADERS = {
  full_name: 'Nama Lengkap',
  email: 'Email',
  whatsapp: 'WhatsApp',
  city: 'Kota',
  role: 'Peran',
  industry: 'Bidang Pekerjaan',
  organization: 'Institusi',
  ai_usage_frequency: 'Frekuensi Penggunaan AI',
  ai_tools: 'Tools AI',
  ai_confidence: 'Kepercayaan Diri AI',
  ai_work_needs: 'Kebutuhan AI',
  ai_challenges: 'Tantangan AI',
  practical_goal: 'Tujuan Praktis',
  online_readiness: 'Kesiapan Online',
  device: 'Perangkat',
  internet: 'Koneksi Internet',
  hands_on: 'Kesiapan Praktik',
  data_consent: 'Persetujuan Data',
  future_interest: 'Minat Pelatihan Lanjutan',
  referral_source: 'Sumber Informasi',
};

const COL_TIMESTAMP = 'Timestamp';
const COL_ID = 'Registration ID';
const COL_EMAIL = 'Email';
const COL_STATUS = 'Status Pendaftaran';

// A row marked with one of these statuses by an admin no longer uses a place.
const STATUS_CONFIRMED = 'Terdaftar';
const STATUS_NOT_COUNTED = ['Dibatalkan', 'Ditolak'];

const AI_TOOL_NONE = 'Belum pernah menggunakan AI';

// Options for the closed-choice questions. Anything else is rejected.
const ROLE_OPTIONS = [
  'Karyawan swasta', 'ASN / pegawai pemerintahan', 'Pemilik bisnis / entrepreneur', 'Freelancer',
  'Guru / tenaga pendidik', 'Mahasiswa / pelajar', 'Content creator', 'Profesional / konsultan',
  'Sedang mencari pekerjaan', 'Orang tua', 'Perwakilan sekolah', 'Perwakilan komunitas', 'Lainnya',
];
const INDUSTRY_OPTIONS = [
  'Pendidikan', 'Administrasi / operasional', 'Marketing / komunikasi', 'Sales / business development',
  'Keuangan / akuntansi', 'Human resources', 'Teknologi / IT', 'Desain / kreatif', 'Bisnis / kewirausahaan',
  'Kesehatan', 'Lainnya',
];
const USAGE_OPTIONS = [
  'Belum pernah', 'Pernah mencoba, tetapi jarang', 'Beberapa kali dalam seminggu', 'Hampir setiap hari',
  'AI sudah menjadi bagian dari alur kerja saya',
];
const TOOL_OPTIONS = [
  'ChatGPT', 'Google Gemini', 'Microsoft Copilot', 'Claude', 'NotebookLM', 'Canva AI', 'AI lainnya', AI_TOOL_NONE,
];
const WORK_NEED_OPTIONS = [
  'Menulis email dan dokumen', 'Membuat laporan dan ringkasan', 'Menganalisis data', 'Mencari dan merangkum informasi',
  'Membuat presentasi', 'Brainstorming ide dan pemecahan masalah', 'Membuat konten dan materi pemasaran',
  'Mengotomatisasi pekerjaan rutin', 'Membantu mengajar atau belajar', 'Mengelola pekerjaan dan produktivitas', 'Lainnya',
];
const CHALLENGE_OPTIONS = [
  'Tidak tahu harus mulai dari mana', 'Bingung membuat prompt yang baik', 'Hasil AI sering kurang tepat',
  'Tidak tahu cara memeriksa kebenaran hasil AI', 'Sulit mengintegrasikan AI ke pekerjaan',
  'Khawatir tentang privasi dan keamanan data', 'Belum menemukan manfaat AI yang relevan', 'Lainnya',
];
const DEVICE_OPTIONS = ['Laptop / komputer', 'Ponsel', 'Tablet', 'Laptop dan ponsel'];
const YES_NO = ['Ya', 'Tidak'];
const FUTURE_OPTIONS = [
  'Ya, untuk kebutuhan pribadi atau profesional', 'Ya, untuk tim atau perusahaan',
  'Mungkin, ingin mengetahui informasinya terlebih dahulu', 'Belum tertarik',
];
const REFERRAL_OPTIONS = [
  'Instagram SPI', 'WhatsApp', 'Teman / kolega', 'Sekolah / kampus / perusahaan', 'Komunitas', 'Website SPI', 'Lainnya',
];

// Messages shown to visitors. They match the website's copy.
const MESSAGES = {
  validation: 'Ada data yang belum lengkap atau belum sesuai. Periksa kembali formulir Anda.',
  alreadyRegistered: 'Email ini sudah terdaftar. Silakan periksa informasi pendaftaran Anda.',
  full: 'Terima kasih atas antusiasme Anda. Kuota Gerakan AI Literacy Indonesia telah mencapai 300 peserta dan pendaftaran saat ini ditutup.',
  closed: 'Pendaftaran Gerakan AI Literacy Indonesia sedang ditutup. Silakan hubungi SPI untuk informasi terbaru.',
  error: 'Pendaftaran belum berhasil disimpan. Silakan coba kembali.',
};

/* ---------- HTTP entry points ---------- */

/** Registration. The website sends JSON as text/plain, and this reads it from the request body. */
function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return reply_({ ok: false, code: 'VALIDATION_ERROR', message: MESSAGES.validation });
  }
  if (!body || body.action !== 'register') {
    return reply_({ ok: false, code: 'VALIDATION_ERROR', message: MESSAGES.validation });
  }

  // Honeypot: people never fill this field. A filled value is treated as a bot and nothing is stored.
  if (String(body.website_hp || '').trim() !== '') {
    return reply_({ ok: false, code: 'REGISTRATION_ERROR', message: MESSAGES.error });
  }

  if (!isValidRegistration_(body)) {
    return reply_({ ok: false, code: 'VALIDATION_ERROR', message: MESSAGES.validation });
  }

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    // Another registration is still being written. The visitor can try again.
    return reply_({ ok: false, code: 'REGISTRATION_ERROR', message: MESSAGES.error });
  }

  try {
    if (!isRegistrationOpen_()) {
      return reply_({ ok: false, code: 'REGISTRATION_CLOSED', message: MESSAGES.closed });
    }

    const sheet = getOrCreateSheet_();
    const headers = ensureHeaders_(sheet);
    const records = readRecords_(sheet, headers);
    const email = normalizeEmail_(body.email);

    if (records.some((r) => r.counts && r.email === email)) {
      return reply_({ ok: false, code: 'ALREADY_REGISTERED', message: MESSAGES.alreadyRegistered });
    }

    const confirmed = records.filter((r) => r.counts).length;
    const capacity = getCapacity_();
    if (confirmed >= capacity) {
      return reply_({ ok: false, code: 'REGISTRATION_FULL', message: MESSAGES.full });
    }

    const registrationId = makeRegistrationId_(confirmed + 1);
    const row = buildRow_(headers, body, registrationId, email);
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, headers.length).setValues([row]);
    SpreadsheetApp.flush();

    return reply_({
      ok: true,
      registration_id: registrationId,
      message: 'Pendaftaran berhasil.',
      remaining_slots: Math.max(0, capacity - (confirmed + 1)),
      // Shown only after a successful registration, and only if SPI has set the link.
      group_url: getWhatsappGroupUrl_() || null,
    });
  } catch (err) {
    // The details go to the Apps Script log for the administrator. The visitor gets the generic message.
    console.error(err);
    return reply_({ ok: false, code: 'REGISTRATION_ERROR', message: MESSAGES.error });
  } finally {
    lock.releaseLock();
  }
}

/** Counts only: whether registration is open and how many places are taken. Never returns participant data. */
function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : '';
  if (action !== 'capacity') {
    return reply_({ ok: false, code: 'VALIDATION_ERROR', message: 'Permintaan tidak dikenali.' });
  }
  const sheet = getSheetIfExists_();
  let confirmed = 0;
  if (sheet) {
    const headers = readHeaders_(sheet);
    confirmed = readRecords_(sheet, headers).filter((r) => r.counts).length;
  }
  return reply_({ open: isRegistrationOpen_(), confirmed: confirmed, capacity: getCapacity_() });
}

/* ---------- Validation ---------- */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidRegistration_(b) {
  const text = (v, max) => typeof v === 'string' && v.trim() !== '' && v.trim().length <= max;
  const optionalText = (v, max) => v === undefined || v === null || v === '' || (typeof v === 'string' && v.trim().length <= max);
  const choice = (v, list) => typeof v === 'string' && list.indexOf(v) !== -1;
  const multi = (v, list) => Array.isArray(v) && v.length > 0 && v.every((x) => list.indexOf(x) !== -1);

  if (!text(b.full_name, 120)) return false;
  if (!EMAIL_PATTERN.test(normalizeEmail_(b.email)) || normalizeEmail_(b.email).length > 254) return false;
  if (normalizeWhatsapp_(b.whatsapp) === null) return false;
  if (!text(b.city, 80)) return false;
  if (!choice(b.role, ROLE_OPTIONS) || !choice(b.industry, INDUSTRY_OPTIONS)) return false;
  if (!optionalText(b.organization, 150)) return false;
  if (!choice(b.ai_usage_frequency, USAGE_OPTIONS)) return false;
  // "Belum pernah menggunakan AI" must stand alone.
  if (!multi(b.ai_tools, TOOL_OPTIONS)) return false;
  if (b.ai_tools.indexOf(AI_TOOL_NONE) !== -1 && b.ai_tools.length > 1) return false;
  if (!(Number.isInteger(b.ai_confidence) && b.ai_confidence >= 1 && b.ai_confidence <= 5)) return false;
  if (!multi(b.ai_work_needs, WORK_NEED_OPTIONS)) return false;
  if (!choice(b.ai_challenges, CHALLENGE_OPTIONS)) return false;
  if (!optionalText(b.practical_goal, 1000)) return false;
  if (!choice(b.online_readiness, YES_NO) || !choice(b.device, DEVICE_OPTIONS)) return false;
  if (!choice(b.internet, YES_NO) || !choice(b.hands_on, YES_NO)) return false;
  if (b.data_consent !== true) return false;
  if (!choice(b.future_interest, FUTURE_OPTIONS) || !choice(b.referral_source, REFERRAL_OPTIONS)) return false;
  return true;
}

/* ---------- Normalisation ---------- */

/** Lower-case and trimmed. The duplicate rule uses this exact value. Dots and "+tags" are kept on purpose. */
function normalizeEmail_(value) {
  return String(value || '').trim().toLowerCase();
}

/** 08xx or 62xx, with spaces or dashes allowed. Returns 62xxxxxxxxx or null. */
function normalizeWhatsapp_(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.indexOf('0') === 0) digits = '62' + digits.slice(1);
  return /^62\d{9,12}$/.test(digits) ? digits : null;
}

/** Text written to a cell. Values that start with =, +, -, or @ are prefixed so spreadsheet formulas cannot run. */
function safeCell_(value) {
  let text = value === undefined || value === null ? '' : String(value).trim();
  if (text.length > 1000) text = text.slice(0, 1000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

/* ---------- Spreadsheet ---------- */

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function getSheetIfExists_() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

function readHeaders_(sheet) {
  if (sheet.getLastRow() < 1 || sheet.getLastColumn() < 1) return [];
  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map((h) => String(h).trim());
}

/**
 * Makes sure the headers the form needs exist. An empty sheet gets the standard header row. An existing sheet keeps
 * its columns, and any missing column is added at the end. Nothing is cleared or moved.
 */
function ensureHeaders_(sheet) {
  let headers = readHeaders_(sheet);
  if (headers.every((h) => h === '')) {
    headers = HEADERS.slice();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return headers;
  }
  HEADERS.forEach((name) => {
    if (headers.indexOf(name) === -1) {
      headers.push(name);
      sheet.getRange(1, headers.length, 1, 1).setValue(name);
    }
  });
  return headers;
}

/**
 * One entry per data row: its normalised email, and whether it uses a place. A row uses a place when it has an email
 * or a registration ID, and its status is not one of the statuses an admin uses to free a place.
 */
function readRecords_(sheet, headers) {
  const last = sheet.getLastRow();
  if (last < 2 || headers.length === 0) return [];
  const data = sheet.getRange(2, 1, last - 1, headers.length).getValues();
  const iEmail = headers.indexOf(COL_EMAIL);
  const iId = headers.indexOf(COL_ID);
  const iStatus = headers.indexOf(COL_STATUS);
  return data.map((row) => {
    const email = iEmail >= 0 ? normalizeEmail_(row[iEmail]) : '';
    const id = iId >= 0 ? String(row[iId]).trim() : '';
    const status = iStatus >= 0 ? String(row[iStatus]).trim() : '';
    return {
      email: email,
      counts: (email !== '' || id !== '') && STATUS_NOT_COUNTED.indexOf(status) === -1,
    };
  });
}

function buildRow_(headers, body, registrationId, email) {
  const row = headers.map(() => '');
  const put = (name, value) => {
    const index = headers.indexOf(name);
    if (index !== -1) row[index] = safeCell_(value);
  };

  put(COL_TIMESTAMP, Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'));
  put(COL_ID, registrationId);
  Object.keys(FIELD_HEADERS).forEach((field) => {
    let value = body[field];
    if (field === 'email') value = email;
    if (field === 'whatsapp') value = normalizeWhatsapp_(body.whatsapp);
    if (field === 'data_consent') value = value === true ? 'Ya' : 'Tidak';
    if (Array.isArray(value)) value = value.join('; ');
    put(FIELD_HEADERS[field], value);
  });
  put(COL_STATUS, STATUS_CONFIRMED);
  return row;
}

function makeRegistrationId_(sequence) {
  return 'AIL-' + ('0000' + sequence).slice(-4) + '-' + Utilities.getUuid().slice(0, 4).toUpperCase();
}

/* ---------- Settings (Script properties) ---------- */

function props_() {
  return PropertiesService.getScriptProperties();
}

/** Registration is open unless REGISTRATION_OPEN is set to "false". */
function isRegistrationOpen_() {
  return props_().getProperty('REGISTRATION_OPEN') !== 'false';
}

function getCapacity_() {
  const n = parseInt(props_().getProperty('CAPACITY'), 10);
  return n > 0 ? n : DEFAULT_CAPACITY;
}

function getWhatsappGroupUrl_() {
  return (props_().getProperty('WA_GROUP_URL') || '').trim();
}

function reply_(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Administration: run these from the Apps Script editor ---------- */

/** Run once after pasting the script. Creates the "AI Literacy" worksheet if missing and adds any missing headers. */
function setupSheet() {
  const sheet = getOrCreateSheet_();
  const headers = ensureHeaders_(sheet);
  Logger.log('Worksheet "' + SHEET_NAME + '" ready with ' + headers.length + ' columns. No rows were changed.');
}

function bukaPendaftaran() {
  props_().setProperty('REGISTRATION_OPEN', 'true');
  Logger.log('Pendaftaran dibuka.');
}

function tutupPendaftaran() {
  props_().setProperty('REGISTRATION_OPEN', 'false');
  Logger.log('Pendaftaran ditutup. Data pendaftar yang sudah ada tidak berubah.');
}

/** Sets the WhatsApp group invitation link. It is returned only after a successful registration. */
function aturLinkWhatsAppGroup(url) {
  if (!/^https:\/\/chat\.whatsapp\.com\/\S+$/.test(String(url || ''))) {
    throw new Error('Link harus berupa undangan grup WhatsApp, dimulai dengan https://chat.whatsapp.com/');
  }
  props_().setProperty('WA_GROUP_URL', url);
  Logger.log('Link grup WhatsApp disimpan.');
}

/** Sets the number of places. Default is 300. */
function aturKapasitas(n) {
  const value = parseInt(n, 10);
  if (!(value > 0)) throw new Error('Kapasitas harus angka lebih dari 0.');
  props_().setProperty('CAPACITY', String(value));
  Logger.log('Kapasitas diatur ke ' + value + '.');
}
