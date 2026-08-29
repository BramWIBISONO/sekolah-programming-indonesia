const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Exact match of official 2025 SPI Logo
function makeLogoSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 180" width="620" height="180">
  <defs>
    <linearGradient id="spiSphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0062F6"/>
      <stop offset="100%" stop-color="#0057D8"/>
    </linearGradient>
  </defs>
  
  <!-- Left Faceted Geodesic Sphere Emblem -->
  <g transform="translate(20, 20)">
    <!-- Base circle -->
    <circle cx="70" cy="70" r="66" fill="url(#spiSphereGrad)" />
    
    <!-- Geodesic Facet Lines (Hexagonal diamond structure) -->
    <!-- Inner Octagon/Hexagon center -->
    <polygon points="70,30 102,48 102,92 70,110 38,92 38,48" fill="#0057D8" stroke="#FFFFFF" stroke-width="4.5" stroke-linejoin="round" />
    
    <!-- Radiating Facet Lines to perimeter -->
    <line x1="70" y1="30" x2="70" y2="4" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
    <line x1="102" y1="48" x2="128" y2="36" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
    <line x1="102" y1="92" x2="128" y2="104" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
    <line x1="70" y1="110" x2="70" y2="136" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
    <line x1="38" y1="92" x2="12" y2="104" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
    <line x1="38" y1="48" x2="12" y2="36" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />

    <!-- Secondary triangulations -->
    <line x1="70" y1="4" x2="128" y2="36" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <line x1="128" y1="36" x2="128" y2="104" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <line x1="128" y1="104" x2="70" y2="136" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <line x1="70" y1="136" x2="12" y2="104" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <line x1="12" y1="104" x2="12" y2="36" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    <line x1="12" y1="36" x2="70" y2="4" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />
    
    <!-- Central diamond -->
    <polygon points="70,48 90,70 70,92 50,70" fill="none" stroke="#FFFFFF" stroke-width="3.5" />
  </g>

  <!-- Typography "spi" -->
  <g transform="translate(180, 48)">
    <text x="0" y="70" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="900" font-size="78" fill="#0B1220" letter-spacing="-3">sp<tspan fill="#0B1220">ı</tspan></text>
    <!-- Cyan dot on i -->
    <circle cx="86" cy="16" r="6.5" fill="#0062F6" />
    
    <!-- Vertical Divider Line -->
    <line x1="118" y1="-8" x2="118" y2="78" stroke="#0B1220" stroke-width="3.5" stroke-linecap="round" />
    
    <!-- "SEKOLAH PROGRAMMING INDONESIA" in 3 stacked lines -->
    <text x="138" y="16" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#0B1220" letter-spacing="1">SEKOLAH</text>
    <text x="138" y="44" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#0B1220" letter-spacing="1">PROGRAMMING</text>
    <text x="138" y="72" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="800" font-size="22" fill="#0B1220" letter-spacing="1">INDONESIA</text>
  </g>
</svg>`;
}

// Handcrafted technical visual placeholders with blueprint circuit style & authentic learning atmosphere
function makeBlueprintHeroSVG(title, subtitle, badge, width = 1000, height = 660, theme = 'core') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062B6F" />
      <stop offset="60%" stop-color="#0057D8" />
      <stop offset="100%" stop-color="#0062F6" />
    </linearGradient>
    <pattern id="circuitGrid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <circle cx="0" cy="0" r="2" fill="rgba(78, 215, 255, 0.4)" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bgGrad)"/>
  <rect width="100%" height="100%" fill="url(#circuitGrid)"/>

  <!-- Circuit traces -->
  <path d="M 60 120 L 220 120 L 260 160 L 400 160" fill="none" stroke="#4ED7FF" stroke-width="2" opacity="0.35" />
  <circle cx="400" cy="160" r="4" fill="#4ED7FF" opacity="0.8" />

  <path d="M ${width - 60} ${height - 120} L ${width - 240} ${height - 120} L ${width - 290} ${height - 170} L ${width - 440} ${height - 170}" fill="none" stroke="#4ED7FF" stroke-width="2" opacity="0.35" />
  <circle cx="${width - 440}" cy="${height - 170}" r="4" fill="#4ED7FF" opacity="0.8" />

  <!-- Code Frame Mockup / Real student artifact visual -->
  <rect x="${width * 0.08}" y="${height * 0.12}" width="${width * 0.84}" height="${height * 0.76}" rx="8" fill="#031336" stroke="rgba(78,215,255,0.3)" stroke-width="1.5"/>
  
  <!-- Terminal Header Bar -->
  <rect x="${width * 0.08}" y="${height * 0.12}" width="${width * 0.84}" height="40" rx="8" fill="#0A1E4A" />
  <circle cx="${width * 0.08 + 24}" cy="${height * 0.12 + 20}" r="5" fill="#EF4444"/>
  <circle cx="${width * 0.08 + 42}" cy="${height * 0.12 + 20}" r="5" fill="#F59E0B"/>
  <circle cx="${width * 0.08 + 60}" cy="${height * 0.12 + 20}" r="5" fill="#10B981"/>
  <text x="${width * 0.5}" y="${height * 0.12 + 25}" font-family="monospace" font-size="12" fill="#94A3B8" text-anchor="middle">spi-workbench // ${badge} // project_builder.ts</text>

  <!-- Technical Content Workspace -->
  <g transform="translate(${width * 0.13}, ${height * 0.26})">
    <!-- Code Lines Mock -->
    <text x="0" y="24" font-family="'JetBrains Mono', monospace" font-size="14" fill="#4ED7FF">// SPI Project Pipeline: Think → Build → Innovate</text>
    <text x="0" y="52" font-family="'JetBrains Mono', monospace" font-size="13" fill="#E2E8F0"><tspan fill="#F43F5E">import</tspan> { AIModel, SensorArray, HardwareController } <tspan fill="#F43F5E">from</tspan> <tspan fill="#10B981">'@spi/engineering'</tspan>;</text>
    <text x="0" y="80" font-family="'JetBrains Mono', monospace" font-size="13" fill="#E2E8F0"><tspan fill="#3B82F6">class</tspan> <tspan fill="#FBBF24">StudentInnovationLab</tspan> <tspan fill="#3B82F6">implements</tspan> RealWorldSolution {</text>
    <text x="24" y="108" font-family="'JetBrains Mono', monospace" font-size="13" fill="#94A3B8">  readonly mentorGuidance = <tspan fill="#10B981">"1-on-1 Hands-On Mentorship"</tspan>;</text>
    <text x="24" y="136" font-family="'JetBrains Mono', monospace" font-size="13" fill="#94A3B8">  readonly objective = <tspan fill="#10B981">"Build Real Technology, Not Just Syntax"</tspan>;</text>
    <text x="0" y="164" font-family="'JetBrains Mono', monospace" font-size="13" fill="#E2E8F0">}</text>
  </g>

  <!-- Big Title & Subtitle Badge inside viewport -->
  <rect x="${width * 0.12}" y="${height * 0.60}" width="${width * 0.76}" height="80" rx="6" fill="rgba(0, 87, 216, 0.4)" stroke="#4ED7FF" stroke-width="1" />
  <text x="${width * 0.5}" y="${height * 0.60 + 34}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">${title}</text>
  <text x="${width * 0.5}" y="${height * 0.60 + 60}" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="13" fill="#E0F2FE" text-anchor="middle">${subtitle}</text>

  <!-- Bottom File Path Tag -->
  <text x="${width * 0.5}" y="${height * 0.95}" font-family="monospace" font-size="11" fill="rgba(255,255,255,0.6)" text-anchor="middle">ASSET LOCATED AT: /public/assets/</text>
</svg>`;
}

function makeCardSVG(title, stack, accentColor = '#0057D8') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062B6F"/>
      <stop offset="100%" stop-color="#031336"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#cardGrad)" rx="6"/>
  <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="${accentColor}" stroke-width="2" rx="6"/>

  <!-- Circuit technical header -->
  <path d="M 0 30 L 140 30 L 160 50 L 600 50" fill="none" stroke="rgba(78,215,255,0.3)" stroke-width="1.5"/>
  <circle cx="160" cy="50" r="3" fill="#4ED7FF"/>
  
  <text x="24" y="24" font-family="monospace" font-size="11" fill="#4ED7FF" font-weight="bold">PROGRAM TRACK // SPI</text>
  <text x="300" y="160" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle">${title}</text>
  
  <!-- Tech badges -->
  <g transform="translate(60, 220)">
    <rect width="480" height="70" rx="4" fill="#0A1E4A" stroke="rgba(255,255,255,0.15)"/>
    <text x="240" y="32" font-family="monospace" font-size="11" fill="#94A3B8" text-anchor="middle">CORE TECHNOLOGIES</text>
    <text x="240" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="13" fill="#38BDF8" text-anchor="middle">${stack}</text>
  </g>

  <text x="300" y="360" font-family="monospace" font-size="10" fill="rgba(255,255,255,0.4)" text-anchor="middle">/public/assets/</text>
</svg>`;
}

function makeProjectSVG(title, category, student) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" width="640" height="400">
  <defs>
    <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081E48"/>
      <stop offset="100%" stop-color="#020B1C"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#pGrad)" rx="6"/>
  <rect width="100%" height="100%" fill="none" stroke="rgba(78,215,255,0.25)" stroke-width="1.5" rx="6"/>

  <!-- Blueprint corner grid -->
  <line x1="20" y1="20" x2="60" y2="20" stroke="#4ED7FF" stroke-width="2"/>
  <line x1="20" y1="20" x2="20" y2="60" stroke="#4ED7FF" stroke-width="2"/>

  <!-- Category & Live tag -->
  <rect x="30" y="35" width="90" height="24" rx="3" fill="#0057D8" />
  <text x="75" y="51" font-family="monospace" font-weight="bold" font-size="10" fill="#FFFFFF" text-anchor="middle">${category}</text>

  <!-- Project center schematics -->
  <g transform="translate(320, 160)">
    <circle r="40" fill="#0A255C" stroke="#4ED7FF" stroke-width="2"/>
    <polygon points="-10,-14 16,0 -10,14" fill="#FFFFFF"/>
  </g>

  <text x="320" y="245" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF" text-anchor="middle">${title}</text>
  <text x="320" y="275" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#94A3B8" text-anchor="middle">Student Creator: ${student}</text>

  <rect x="220" y="315" width="200" height="28" rx="4" fill="#0057D8" stroke="#4ED7FF" stroke-width="1"/>
  <text x="320" y="333" font-family="monospace" font-weight="bold" font-size="11" fill="#FFFFFF" text-anchor="middle">▶ WATCH DEMO</text>
</svg>`;
}

function makeMascotSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="pandaG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="blueG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0057D8"/>
      <stop offset="100%" stop-color="#062B6F"/>
    </linearGradient>
  </defs>
  
  <!-- Ears -->
  <circle cx="120" cy="110" r="40" fill="#062B6F" />
  <circle cx="120" cy="110" r="22" fill="#0062F6" />
  <circle cx="280" cy="110" r="40" fill="#062B6F" />
  <circle cx="280" cy="110" r="22" fill="#0062F6" />

  <!-- Head -->
  <rect x="90" y="100" width="220" height="190" rx="95" fill="url(#pandaG)" stroke="#CBD5E1" stroke-width="3" />

  <!-- Eye Patches -->
  <ellipse cx="145" cy="180" rx="34" ry="40" fill="#0B1220" transform="rotate(-15 145 180)" />
  <ellipse cx="255" cy="180" rx="34" ry="40" fill="#0B1220" transform="rotate(15 255 180)" />

  <!-- Focused Tech Eyes -->
  <ellipse cx="147" cy="180" rx="18" ry="22" fill="#4ED7FF" />
  <circle cx="142" cy="174" r="6" fill="#FFFFFF" />
  <ellipse cx="253" cy="180" rx="18" ry="22" fill="#4ED7FF" />
  <circle cx="248" cy="174" r="6" fill="#FFFFFF" />

  <!-- Cute Nose -->
  <ellipse cx="200" cy="215" rx="14" ry="10" fill="#0B1220" />
  <path d="M 188 230 Q 200 242 212 230" fill="none" stroke="#0B1220" stroke-width="3.5" stroke-linecap="round" />

  <!-- Engineering Hoodie Suit -->
  <path d="M 115 280 C 115 360, 285 360, 285 280 Z" fill="url(#blueG)" stroke="#062B6F" stroke-width="3" />
  
  <!-- SPI Emblem on Chest -->
  <circle cx="200" cy="315" r="20" fill="#FFFFFF" stroke="#0057D8" stroke-width="2" />
  <polygon points="200,305 210,315 200,325 190,315" fill="#0057D8" />
  <circle cx="200" cy="315" r="3" fill="#4ED7FF" />
</svg>`;
}

function makePartnerSVG(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 90" width="280" height="90">
  <rect width="100%" height="100%" fill="#FFFFFF" rx="4" stroke="#E2E8F0" stroke-width="1.5"/>
  <g transform="translate(18, 22)">
    <rect width="44" height="44" rx="4" fill="#F0F7FF" stroke="#0057D8" stroke-width="1.5"/>
    <text x="22" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="20" fill="#0057D8" text-anchor="middle">${name.charAt(0)}</text>
    <text x="56" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="12" fill="#0B1220">${name}</text>
    <text x="56" y="38" font-family="monospace" font-weight="600" font-size="9" fill="#64748B">ACCREDITED SCHOOL PARTNER</text>
  </g>
</svg>`;
}

function makeEkasaSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" width="260" height="70">
  <rect width="100%" height="100%" fill="rgba(6, 43, 111, 0.4)" rx="4" stroke="rgba(78, 215, 255, 0.3)" stroke-width="1"/>
  <g transform="translate(14, 16)">
    <circle cx="18" cy="18" r="15" fill="#0057D8" opacity="0.3" />
    <path d="M 18 4 L 18 32 M 4 18 L 32 18 M 8 8 L 28 28 M 8 28 L 28 8" stroke="#4ED7FF" stroke-width="2.5" stroke-linecap="round" />
    <text x="44" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="17" fill="#FFFFFF" letter-spacing="2">EKASA</text>
    <text x="44" y="32" font-family="monospace" font-weight="700" font-size="8.5" fill="#93C5FD" letter-spacing="1.5">TECHNOLOGY</text>
  </g>
</svg>`;
}

const files = {
  'logo.png': makeLogoSVG(),
  'maskot.png': makeMascotSVG(),
  'ekasa.png': makeEkasaSVG(),
  'navbar.png': makeBlueprintHeroSVG('SPI Header Reference', 'Faceted brand navigation system', 'NAVBAR_SPEC', 1200, 120),
  
  // Hero Visuals
  'hero.png': makeBlueprintHeroSVG('Empowering Imagination, Inspiring Innovation', 'Developing Computational Thinking for the AI-Native Generation', 'HERO_HOMEPAGE', 1000, 680),
  'hero_core.png': makeBlueprintHeroSVG('SPI Core: Think → Build → Innovate', 'Foundational Programming, Scratch, Python & Mobile Logic', 'SPI_CORE', 900, 600),
  'hero_lab.png': makeBlueprintHeroSVG('SPI Lab: Digital Creation & Productivity', 'Applied AI Tools, Generative Media, No-Code Automation', 'SPI_LAB', 900, 600),
  'hero_engineering.png': makeBlueprintHeroSVG('SPI Engineering: Advanced Technology & Hardware', 'Robotics, IoT Controllers, Machine Learning & Cloud Architectures', 'SPI_ENGINEERING', 900, 600),
  'hero1.png': makeBlueprintHeroSVG('SPI InSchool: Institutional Partnership', 'Structured Curriculum, Teacher Training & Innovation Ecosystem', 'SPI_INSCHOOL', 900, 600),
  
  // Program Cards
  'core.png': makeCardSVG('SPI Core', 'Scratch • Python • MIT App Inventor • Arduino', '#0057D8'),
  'lab.png': makeCardSVG('SPI Lab', 'AI Workflow • Google Workspace • Canva • No-Code', '#0062F6'),
  'engineering.png': makeCardSVG('SPI Engineering', 'Machine Learning • IoT Sensors • Web Stack • Cloud', '#062B6F'),
  'inschool.png': makeCardSVG('SPI InSchool', 'School Integration • Teacher Mentorship • Certification', '#0057D8'),
  
  'experience_learning.png': makeBlueprintHeroSVG('One-Stop Edutech Center', 'Hands-On Robotics & Coding Classrooms in Action', 'STUDENT_WORKSHOP', 900, 520),

  // Partner School Logos
  'partner_liastephanie.png': makePartnerSVG('LIA STEPHANIE'),
  'partner_ipeka.png': makePartnerSVG('IPEKA'),
  'partner_littlekey.png': makePartnerSVG('LITTLE KEY'),
  'partner_pelitaharapan.png': makePartnerSVG('PELITA HARAPAN'),
  'partner_binabangsa.png': makePartnerSVG('BINA BANGSA'),
  'partner_surabaya.png': makePartnerSVG('SURABAYA INTERCULTURAL'),

  // Student Projects
  'project-01.png': makeProjectSVG('Smart Trash Bin', 'IoT', 'Kenzo & Arkan (5 SD)'),
  'project-02.png': makeProjectSVG('AI Image Classifier', 'AI/ML', 'Valerie (7 SMP)'),
  'project-03.png': makeProjectSVG('Flood Monitoring System', 'IoT', 'Rayyan (8 SMP)'),
  'project-04.png': makeProjectSVG('GoGame Adventure', 'Game', 'Nathan (6 SD)'),
  'project-05.png': makeProjectSVG('Chatbot for School', 'AI/ML', 'Clarissa (9 SMP)'),
  'project-06.png': makeProjectSVG('Maze Escape Game', 'Computational', 'Darren (4 SD)'),
  'project-07.png': makeProjectSVG('Smart Parking Lot', 'IoT', 'Raffi & Kevin (8 SMP)'),
  'project-08.png': makeProjectSVG('Digital Piano App', 'Web', 'Michelle (6 SD)'),
  'project-09.png': makeProjectSVG('Smart Traffic Light', 'Arduino', 'Bima (5 SD)'),
  'project-10.png': makeProjectSVG('Creating Web Portfolio', 'Web', 'Alvaro (10 SMA)'),
  'project-11.png': makeProjectSVG('Python Task Automation', 'Python', 'Satria (11 SMA)'),
};

for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Generated official asset: ${filename}`);
}

console.log(`Successfully generated all ${Object.keys(files).length} official assets in /public/assets/`);
