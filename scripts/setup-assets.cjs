const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createPng(width, height, getPixel) {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter type 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const p = rowOffset + 1 + x * 4;
      rawData[p] = r;
      rawData[p + 1] = g;
      rawData[p + 2] = b;
      rawData[p + 3] = a;
    }
  }
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function createLogoPlaceholder(label) {
  const width = 320;
  const height = 160;
  return createPng(width, height, (x, y, w, h) => {
    // Card border
    const isBorder = x === 0 || x === w - 1 || y === 0 || y === h - 1;
    if (isBorder) return [220, 231, 245, 255];
    
    // Top SPI brand bar
    if (y < 4) return [24, 107, 246, 255];
    
    // Inner badge
    const cx = w / 2;
    const cy = h / 2;
    const dist = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
    if (dist < 28) {
      if (dist > 25) return [24, 107, 246, 255];
      return [240, 246, 255, 255];
    }
    
    return [255, 255, 255, 255];
  });
}

function createHeroBackgroundPlaceholder() {
  const width = 1200;
  const height = 500;
  return createPng(width, height, (x, y, w, h) => {
    const ratioY = y / h;
    const r = Math.round(244 + (255 - 244) * (1 - ratioY));
    const g = Math.round(248 + (255 - 248) * (1 - ratioY));
    const b = 255;
    return [r, g, b, 255];
  });
}

// 1. Ensure directories exist
const baseDir = path.resolve(__dirname, '..');
const dirs = [
  path.join(baseDir, 'public', 'assets', 'discover'),
  path.join(baseDir, 'public', 'assets', 'partners'),
  path.join(baseDir, 'public', 'assets', 'spi-lab', 'partners'),
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
    console.log('Created directory:', d);
  }
});

// 2. Discover hero background
const heroBgPath = path.join(baseDir, 'public', 'assets', 'discover', 'discover-hero-background.png');
fs.writeFileSync(heroBgPath, createHeroBackgroundPlaceholder());
console.log('Created:', heroBgPath);

// 3. Trusted by partners
const trustedPartners = [
  'stt-el-bethel.png',
  'yayasan-saluran-berkat-untuk-negeri.png',
];

trustedPartners.forEach(filename => {
  const p = path.join(baseDir, 'public', 'assets', 'partners', filename);
  fs.writeFileSync(p, createLogoPlaceholder(filename));
  console.log('Created partner placeholder:', p);
});

// 4. SPI Lab partners
const schoolsDir = path.join(baseDir, 'public', 'assets', 'partners', 'schools');
const spiLabPartners = [
  { file: 'inn.png', copyFrom: 'inn-indonesia.png' },
  { file: 'rbp.png', copyFrom: 'rumah-belajar-pancasila.png' },
  { file: 'yayasan-saluran-berkat-untuk-negeri.png' },
  { file: 'stt-el-bethel.png' },
  { file: 'icrea.png', copyFrom: 'icrea-imadeo-creative.jpg' },
  { file: 'sekolah-musik-indonesia-solo.png' },
  { file: 'sekolah-musik-taman-surya.png', copyFrom: 'sekolah-musik-taman-surya.png' },
  { file: 'sekolah-musik-surabaya.png', copyFrom: 'sekolah-musik-surabaya-imadeo.png' },
];

spiLabPartners.forEach(p => {
  const target = path.join(baseDir, 'public', 'assets', 'spi-lab', 'partners', p.file);
  if (p.copyFrom && fs.existsSync(path.join(schoolsDir, p.copyFrom))) {
    fs.copyFileSync(path.join(schoolsDir, p.copyFrom), target);
    console.log(`Copied real logo ${p.copyFrom} -> ${target}`);
  } else {
    fs.writeFileSync(target, createLogoPlaceholder(p.file));
    console.log('Created dedicated placeholder:', target);
  }
});

console.log('All asset folders and valid PNG files created successfully!');
