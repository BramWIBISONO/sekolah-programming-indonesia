import { ASSETS } from '../constants/assets';
import { ProgramItem, StudentProject, JourneyStep, StatisticItem, SchoolPartner } from '../types';

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'spi-core',
    image: ASSETS.programs.spiCore,
    title: 'SPI Core',
    subtitle: 'Fundamental Coding & Computational Thinking',
    badge: 'SPI Core',
    description: 'Program utama SPI yang membangun fundamental teknologi siswa melalui pembelajaran programming dan computational thinking dengan pendekatan Think → Build → Innovate.',
    materials: [
      'Scratch & mBlock Block Programming',
      'Python Text Programming',
      'MIT App Inventor Mobile Dev',
      'Arduino & Microcontroller Robotics'
    ],
    link: '/program/spi-core',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'spi-lab',
    image: ASSETS.programs.spiLab,
    title: 'SPI Lab',
    subtitle: 'Digital Technology & Creativity',
    badge: 'SPI Lab',
    description: 'Program eksplorasi teknologi digital dimana siswa meningkatkan kreativitas, produktivitas, dan kemampuan membuat solusi digital serta no-code automation.',
    materials: [
      'AI for Productivity & Prompt Engineering',
      'Google Workspace & Office Tools',
      'Canva & Graphic Multimedia Design',
      'Photoshop & Digital Content Creation'
    ],
    link: '/program/spi-lab',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'spi-engineering',
    image: ASSETS.programs.spiEngineering,
    title: 'SPI Engineering',
    subtitle: 'Advanced Technology & Robotics',
    badge: 'SPI Engineering',
    description: 'Program lanjutan yang berfokus pada software engineering, hardware, robotics, sistem AI, data engineering, dan pembuatan solusi teknologi nyata.',
    materials: [
      'Machine Learning & Computer Vision',
      'IoT & Embedded Smart Systems',
      'Data Science & Analytics',
      'Full-Stack Web & Cloud Technology'
    ],
    link: '/program/spi-engineering',
    color: 'from-indigo-600 to-purple-700'
  },
  {
    id: 'spi-inschool',
    image: ASSETS.programs.spiInSchool,
    title: 'SPI InSchool',
    subtitle: 'School Technology Partnership',
    badge: 'SPI InSchool',
    description: 'Program kolaborasi terstruktur dengan institusi sekolah untuk menghadirkan kurikulum coding, AI literacy, dan pelatihan guru di lingkungan sekolah.',
    materials: [
      'Structured School Curriculum',
      'Teacher Training & Mentorship',
      'Curriculum Integration & Assessment',
      'After School & Technology Club'
    ],
    link: '/program/spi-inschool',
    color: 'from-cyan-600 to-blue-700'
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    title: 'AI Mindset',
    subtitle: 'Pola Pikir Teknologi',
    description: 'Mengembangkan pola pikir teknologi, kreativitas, keingintahuan dan kesiapan menghadapi dunia digital masa kini.',
    focus: ['AI awareness', 'Digital mindset', 'Creative curiosity', 'Tech introduction'],
    icon: 'Bot'
  },
  {
    number: '02',
    title: 'Computational Thinking',
    subtitle: 'Problem Solving Sistematis',
    description: 'Belajar berpikir logis, memecahkan masalah kompleks, dekomposisi, pola dan membuat keputusan secara terstruktur.',
    focus: ['Problem solving', 'Logical decomposition', 'Pattern recognition', 'Algorithms'],
    icon: 'Puzzle'
  },
  {
    number: '03',
    title: 'Programming Skill',
    subtitle: 'Membangun Aplikasi & Solusi',
    description: 'Mulai dari block coding hingga text-based programming untuk mewujudkan logika menjadi kode aplikasi nyata.',
    focus: ['Block coding', 'Python & Web', 'Logic architecture', 'Debugging'],
    icon: 'Code2'
  },
  {
    number: '04',
    title: 'Innovation Engineering',
    subtitle: 'Menciptakan Dampak Nyata',
    description: 'Mewujudkan ide menjadi solusi nyata dan produk teknologi yang bermanfaat serta siap diikutsertakan dalam kompetisi.',
    focus: ['Hardware & IoT', 'AI Engineering', 'Competition & Showcase', 'Real impact'],
    icon: 'Rocket'
  }
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-nicholas',
    image: '',
    projectName: 'He Built a Real Stock Management System with Python 🤯 | Nicholas Sindhu Putra Perkasa',
    category: 'Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=R2-YzkwjN1k',
    studentName: 'Nicholas Sindhu Putra Perkasa',
    description: 'Sistem manajemen stok gudang dan kasir yang dibangun menggunakan Python.',
    challenge: 'Pencatatan inventaris barang secara manual rawan selisih stok dan memperlambat rekapitulasi data barang masuk/keluar.',
    thinkingProcess: 'Nicholas mendekomposisi alur data stok menjadi input transaksi, validasi ketersediaan barang di database, dan pembaruan saldo inventaris secara realtime.',
    techStack: ['Python', 'Tkinter GUI', 'Data Storage', 'Business Logic'],
    outcome: 'Aplikasi desktop manajemen stok mandiri yang dapat memverifikasi transaksi, mencetak laporan inventaris, dan mencegah kehabisan stok barang.',
    skillsLearned: ['Decomposition', 'Algoritma Validasi Data', 'CRUD Architecture', 'Error Handling']
  },
  {
    id: 'proj-natanael',
    image: '',
    projectName: 'Could YOU Build an Automatic Door with Arduino & mBlock? 🚪🤖 | Natanael Alexander Marghatan',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=KV-AA45JxVU',
    studentName: 'Natanael Alexander Marghatan',
    description: 'Prototipe pintu otomatis sensor jarak dengan Arduino & mBlock.',
    challenge: 'Menciptakan akses pintu otomatis tanpa kontak fisik demi kebersihan dan kemudahan akses bagi pengguna.',
    thinkingProcess: 'Natanael merancang algoritma deteksi jarak: sensor ultrasonik memantulkan gelombang suara, menghitung selisih waktu pantulan, dan menginstruksikan motor servo membuka pintu jika jarak < 30 cm.',
    techStack: ['Arduino Uno', 'mBlock / C++', 'Sensor Ultrasonik HC-SR04', 'Servo Motor'],
    outcome: 'Sistem pintu geser otomatis responsif dengan jeda penutupan aman yang mencegah tabrakan.',
    skillsLearned: ['Algorithmic Thinking', 'Sensor Calibration', 'Physical Computing', 'Event-Driven Logic']
  },
  {
    id: 'proj-nicolas-minesweeper',
    image: '',
    projectName: 'He Built a Minesweeper Game with Python & Tkinter! 🎮🐍 | Nicolas Alberto Tan',
    category: 'Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=j9mYai1s63Q',
    studentName: 'Nicolas Alberto Tan',
    description: 'Game Minesweeper interaktif dengan Python & Tkinter GUI.',
    challenge: 'Mereplikasi logika game kompleks yang memerlukan matriks 2 dimensi, penempatan ranjau acak, dan pembukaan otomatis area kosong.',
    thinkingProcess: 'Nicolas memanfaatkan pengenalan pola matriks untuk menghitung ranjau di 8 sel tetangga, serta algoritma flood-fill rekursif untuk membuka sel tanpa ranjau.',
    techStack: ['Python', 'Tkinter', '2D Matrix Arrays', 'Recursion Algorithm'],
    outcome: 'Game Minesweeper lengkap dengan indikator bendera, deteksi kemenangan/kekalahan, dan timer dinamis.',
    skillsLearned: ['Pattern Recognition', 'Recursive Algorithms', 'GUI Event Handling', 'State Management']
  },
  {
    id: 'proj-smart-alarm',
    image: '',
    projectName: 'He Built a Smart Alarm System with Arduino & mBlock! 🐶🤖',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=fgykQvbPZjg',
    studentName: 'Siswa SPI',
    description: 'Sistem alarm keamanan cerdas berbasis sensor gerak & buzzer.',
    challenge: 'Mendeteksi pergerakan objek mencurigakan di area rumah dan memberikan peringatan suara serta lampu peringatan secara instan.',
    thinkingProcess: 'Siswa memprogram mikrokontroler untuk membaca sinyal dari sensor PIR, mengevaluasi threshold batas deteksi, dan menyalakan buzzer serta LED indikator saat ada intrusi.',
    techStack: ['Arduino Uno', 'PIR Motion Sensor', 'Piezo Buzzer', 'LED Indicators'],
    outcome: 'Sistem peringatan dini keamanan rumah yang aktif otomatis saat mendeteksi gerakan.',
    skillsLearned: ['Condition Logic', 'Hardware Circuitry', 'Threshold Calibration', 'Safety Automation']
  },
  {
    id: 'proj-kevin',
    image: '',
    projectName: 'From HTML to Python: He Built a Full Web App with Login & Sign Up! 🤯 | Kevin Valerius Tanady',
    category: 'Web',
    youtubeUrl: 'https://www.youtube.com/watch?v=UudadB3lEK0',
    studentName: 'Kevin Valerius Tanady',
    description: 'Aplikasi web interaktif dengan sistem otentikasi login & registrasi terintegrasi.',
    challenge: 'Menghubungkan antarmuka halaman web dengan pemrosesan backend yang aman untuk memvalidasi identitas pengguna.',
    thinkingProcess: 'Kevin menyusun arsitektur sistem: form HTML mengirimkan request POST, backend Python memvalidasi format email dan kata sandi, lalu mengatur izin akses ke halaman dashboard.',
    techStack: ['HTML5 / CSS3', 'Python Backend', 'User Authentication', 'Form Handling'],
    outcome: 'Aplikasi web multi-halaman dengan alur signup, login, proteksi rute, dan feedback error yang jelas.',
    skillsLearned: ['Client-Server Architecture', 'Data Validation', 'Web Security Basics', 'Fullstack Integration']
  },
  {
    id: 'proj-kathy',
    image: '',
    projectName: 'She Built a Netflix-Style Movie App with MIT App Inventor! 🎬🤯 | Kathy',
    category: 'App',
    youtubeUrl: 'https://www.youtube.com/watch?v=mSzzlajngpU',
    studentName: 'Kathy',
    description: 'Aplikasi mobile streaming film bergaya Netflix menggunakan MIT App Inventor.',
    challenge: 'Mendesain antarmuka mobile yang menarik dengan katalog film yang mudah dijelajahi dan responsif pada berbagai ukuran smartphone.',
    thinkingProcess: 'Kathy mengabstraksikan data film ke dalam format list-of-pairs (judul, poster, genre, trailer), lalu mengaitkannya ke komponen horizontal scroll dan video player.',
    techStack: ['MIT App Inventor', 'Mobile UI Layout', 'Media Player Component', 'Dynamic List Data'],
    outcome: 'Aplikasi mobile Android yang mulus dengan navigasi kategori film dan pemutaran cuplikan video langsung.',
    skillsLearned: ['Mobile UI/UX Design', 'Abstraction', 'List Data Processing', 'Media Integration']
  },
  {
    id: 'proj-nicolas-tank',
    image: '',
    projectName: 'Could YOU Build a Working Tank with Arduino & mBlock? 🤯🛡️ | Nicolas Alberto Tan',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=ECxGpWmxQp8',
    studentName: 'Nicolas Alberto Tan',
    description: 'Robot tank beroda rantai dengan sistem kemudi motor DC ganda & kendali cerdas.',
    challenge: 'Mengendalikan pergerakan diferensial robot tank agar dapat bermanuver maju, mundur, dan berbelok secara seimbang.',
    thinkingProcess: 'Nicolas merumuskan sinyal PWM (Pulse Width Modulation) ke motor driver L298N untuk mengatur kecepatan dan arah putaran kedua motor DC secara sinkron.',
    techStack: ['Arduino Uno', 'Motor Driver L298N', 'DC Geared Motors', 'Track Chassis'],
    outcome: 'Robot tank mandiri yang mampu melintasi rintangan dengan kemudi presisi.',
    skillsLearned: ['Robotics Kinetics', 'PWM Motor Control', 'Mechanical Assembly', 'Debugging Hardware']
  },
  {
    id: 'proj-grisson',
    image: '',
    projectName: 'From Notes App to 2nd Place National Champion! 🏆📱 | Grisson Orville Yang',
    category: 'App',
    youtubeUrl: 'https://www.youtube.com/watch?v=okVogBsA7tA',
    studentName: 'Grisson Orville Yang',
    description: 'Aplikasi catatan mobile pintar yang meraih Juara 2 Tingkat Nasional.',
    challenge: 'Membantu siswa mengorganisasi catatan belajar dengan pencarian instan dan penyimpanan lokal yang aman tanpa koneksi internet.',
    thinkingProcess: 'Grisson mendesain sistem penyimpanan terstruktur menggunakan TinyDB lokal dengan fitur pencarian teks real-time dan kategorisasi berbasis warna.',
    techStack: ['MIT App Inventor', 'TinyDB Storage', 'Text Search Filter', 'National Competition'],
    outcome: 'Karya inovatif yang diuji oleh juri nasional dan sukses meraih Juara 2 Kompetisi Coding Nasional.',
    skillsLearned: ['Competitive Problem Solving', 'Product Pitching', 'Data Persistence', 'User Experience']
  },
  {
    id: 'proj-larry',
    image: '',
    projectName: 'What Will YOU Build with Arduino & mBlock? 🤖🗑️ | Larry Ho\'s Smart Trash Can',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=VTUJHqeDgsI',
    studentName: 'Larry Ho',
    description: 'Tempat sampah pintar tanpa sentuh dengan sensor ultrasonik & motor servo.',
    challenge: 'Mencegah penyebaran kuman di tempat umum dengan menghilangkan kebutuhan menyentuh tutup tempat sampah saat membuang sampah.',
    thinkingProcess: 'Larry mengukur jarak tangan mendekati tutup sampah: bila jarak < 20 cm, mikrokontroler memutar servo 90 derajat selama 4 detik lalu menutup secara perlahan.',
    techStack: ['Arduino Uno', 'HC-SR04 Ultrasonic', 'Servo SG90', 'Power Management'],
    outcome: 'Perangkat smart home sanitasi yang fungsional dan ramah anak.',
    skillsLearned: ['Hardware Logic', 'Automation Routine', 'Sanitary Tech Innovation', 'Prototyping']
  },
  {
    id: 'proj-nala',
    image: '',
    projectName: 'Think You Can Build a Smart Pet Feeder? 🐰🤖 | Nala\'s Arduino & mBlock Project',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=XnHe6-xAqyY',
    studentName: 'Nala',
    description: 'Alat pemberi makan hewan peliharaan otomatis berbasis timer & sensor.',
    challenge: 'Memastikan hewan peliharaan mendapat porsi makan tepat waktu saat pemilik sedang tidak berada di rumah.',
    thinkingProcess: 'Nala membuat algoritma penjadwalan pakan: menghitung interval waktu pembagian makanan dan membuka katup wadah pakan menggunakan servo sesuai gramatur yang diinginkan.',
    techStack: ['Arduino', 'Servo Motor', 'Real-time Timer Logic', 'Mechanical Dispenser'],
    outcome: 'Prototipe pet feeder yang berhasil mendistribusikan porsi pakan hewan secara konsisten.',
    skillsLearned: ['Timing Logic', 'Mechanical Prototyping', 'Problem-Solving Empathy', 'System Testing']
  },
  {
    id: 'proj-richard',
    image: '',
    projectName: 'He Built an AI That Predicts Credit Risk 🤯 | Richard Victorriano Effendi',
    category: 'AI/ML',
    youtubeUrl: 'https://www.youtube.com/watch?v=xYsdgHGX2iU',
    studentName: 'Richard Victorriano Effendi',
    description: 'Model Machine Learning untuk memprediksi risiko kelayakan kredit perbankan.',
    challenge: 'Analisis kelayakan kredit nasabah memerlukan evaluasi multi-variabel historis yang rumit bila dihitung secara manual.',
    thinkingProcess: 'Richard melakukan data cleaning, exploratory data analysis, feature engineering, dan melatih model klasifikasi machine learning untuk mengidentifikasi tingkat risiko pinjaman.',
    techStack: ['Python', 'Pandas & Scikit-Learn', 'Classification Model', 'Data Analytics'],
    outcome: 'Model prediktif AI berakurasi tinggi dengan visualisasi metriks evaluasi (confusion matrix & ROC curve).',
    skillsLearned: ['Machine Learning Workflow', 'Feature Engineering', 'Statistical Analysis', 'Model Evaluation']
  },
  {
    id: 'proj-gracia',
    image: '',
    projectName: 'From Python Code to a Real Parking System 🚗 | Gracia Huang',
    category: 'Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=lfi_CxaAOA8',
    studentName: 'Gracia Huang',
    description: 'Sistem otomasi parkir pintar dengan kalkulasi tarif dan deteksi slot berbasis Python.',
    challenge: 'Pengelolaan antrean kendaraan masuk/keluar parkir dan penghitungan tarif bertingkat yang sering memakan waktu lama.',
    thinkingProcess: 'Gracia memprogram logika penandaan slot parkir aktif/kosong, pencatatan timestamp masuk kendaraan, dan rumus kalkulasi tarif berbasis durasi menginap.',
    techStack: ['Python', 'Timestamp Handling', 'Conditional Pricing Logic', 'System Monitoring'],
    outcome: 'Sistem manajemen parkir yang efisien dengan pencatatan tiket otomatis dan kalkulasi tarif akurat.',
    skillsLearned: ['Algorithmic Thinking', 'Time-Based Math Functions', 'System Simulation', 'State Tracking']
  },
];

export const STATISTICS_DATA: StatisticItem[] = [
  {
    value: '604',
    title: 'Students',
    description: 'Siswa dari berbagai sekolah & kota yang belajar coding bersama SPI.',
    iconName: 'Users'
  },
  {
    value: '100+',
    title: 'Projects',
    description: 'Project nyata berbasis solusi & AI yang dibuat siswa setiap tahun.',
    iconName: 'Rocket'
  },
  {
    value: 'AI Native',
    title: 'Curriculum',
    description: 'Kurikulum masa depan yang relevan dengan perkembangan AI & teknologi.',
    iconName: 'Cpu'
  },
  {
    value: 'Project Based',
    title: 'Learning',
    description: 'Pembelajaran berbasis praktik langsung menghasilkan portofolio nyata.',
    iconName: 'BookOpen'
  }
];

export const SCHOOL_PARTNERS: SchoolPartner[] = [
  {
    name: 'LIA STEPHANIE CATHOLIC SCHOOL',
    logo: ASSETS.partnership.liaStephanie,
    type: 'Catholic School'
  },
  {
    name: 'IPEKA SEKOLAH KRISTEN',
    logo: ASSETS.partnership.ipeka,
    type: 'Christian School'
  },
  {
    name: 'LITTLE KEY SCHOOL',
    logo: ASSETS.partnership.littleKey,
    type: 'Primary & Early Ed'
  },
  {
    name: 'PELITA HARAPAN SCHOOL',
    logo: ASSETS.partnership.pelitaHarapan,
    type: 'International School'
  },
  {
    name: 'BINA BANGSA SCHOOL',
    logo: ASSETS.partnership.binaBangsa,
    type: 'National Plus School'
  },
  {
    name: 'SURABAYA INTERCULTURAL SCHOOL',
    logo: ASSETS.partnership.surabaya,
    type: 'Intercultural School'
  }
];

export const CORE_CURRICULUM_STAGES = [
  {
    stage: '1.0 FOUNDATION',
    goal: 'Membangun dasar berpikir komputasional dan pengenalan logika teknologi.',
    image: ASSETS.programs.spiCore,
    modules: [
      { name: 'Think with Code', tech: 'Scratch & mBlock block programming' },
      { name: 'Think with Machines', tech: 'Arduino & mBlock Robotics' },
      { name: 'Think with Intelligence', tech: 'AI with mBlock & Teachable Machine' }
    ]
  },
  {
    stage: '2.0 DEVELOPMENT',
    goal: 'Membangun kemampuan membuat aplikasi fungsional dan sistem komputasi.',
    image: ASSETS.programs.spiLab,
    modules: [
      { name: 'Think with Software', tech: 'MIT App Inventor for Android' },
      { name: 'Think with Text', tech: 'Python fundamentals & data structures' },
      { name: 'Build for the Web', tech: 'HTML, CSS & JavaScript basics' },
      { name: 'Connect Smart Systems', tech: 'IoT, WiFi sensors & Embedded controllers' },
      { name: 'Learn from Data', tech: 'Data science & introductory Machine Learning' },
      { name: 'Understand Digital Systems', tech: 'Computing concepts & Network basics' }
    ]
  },
  {
    stage: '3.0 EXPLORATION',
    goal: 'Eksplorasi teknologi industri tingkat lanjut sesuai minat spesialisasi siswa.',
    image: ASSETS.programs.spiEngineering,
    modules: [
      { name: 'Mobile Application Development', tech: 'React Native & Flutter fundamentals' },
      { name: 'Artificial Intelligence & Vision', tech: 'OpenCV, Computer Vision, NLP & LLMs' },
      { name: 'Full-Stack Web Development', tech: 'React, Node.js & Database Systems' },
      { name: 'Cybersecurity Fundamentals', tech: 'Linux, Network Security & Ethical Hacking' },
      { name: 'Game Development', tech: 'C# scripting & Unity Engine 2D/3D' },
      { name: 'Advanced Robotics & IoT', tech: 'Autonomous systems, Robot sensors & ESP32' }
    ]
  },
  {
    stage: '4.0 RESEARCH & INNOVATION',
    goal: 'Membawa siswa menuju riset mandiri, kompetisi nasional/internasional, dan inovasi solutif.',
    image: ASSETS.programs.spiInSchool,
    modules: [
      { name: 'Research & Innovation Studio', tech: 'Problem ideation & scientific method' },
      { name: 'Independent Applied Project', tech: 'End-to-end prototyping & engineering' },
      { name: 'Competition Mentorship', tech: 'Olimpiade robotika, AI hackathon & Expo' },
      { name: 'Portfolio & Demo Showcase', tech: 'Public presentation, pitch deck & docs' }
    ]
  }
];
