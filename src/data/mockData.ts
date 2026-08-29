import { ASSETS } from '../constants/assets';
import { ProgramItem, StudentProject, JourneyStep, StatisticItem, SchoolPartner } from '../types';

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'spi-core',
    image: ASSETS.CORE_CARD,
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
    image: ASSETS.LAB_CARD,
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
    image: ASSETS.ENGINEERING_CARD,
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
    image: ASSETS.INSCHOOL_CARD,
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
    description: 'Real Stock Management System built with Python.'
  },
  {
    id: 'proj-natanael',
    image: '',
    projectName: 'Could YOU Build an Automatic Door with Arduino & mBlock? 🚪🤖 | Natanael Alexander Marghatan',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=KV-AA45JxVU',
    studentName: 'Natanael Alexander Marghatan',
    description: 'Automatic Door built with Arduino & mBlock.'
  },
  {
    id: 'proj-nicolas-minesweeper',
    image: '',
    projectName: 'He Built a Minesweeper Game with Python & Tkinter! 🎮🐍 | Nicolas Alberto Tan',
    category: 'Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=j9mYai1s63Q',
    studentName: 'Nicolas Alberto Tan',
    description: 'Minesweeper Game built with Python & Tkinter.'
  },
  {
    id: 'proj-smart-alarm',
    image: '',
    projectName: 'He Built a Smart Alarm System with Arduino & mBlock! 🐶🤖 |',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=fgykQvbPZjg',
    studentName: '',
    description: 'Smart Alarm System built with Arduino & mBlock.'
  },
  {
    id: 'proj-kevin',
    image: '',
    projectName: 'From HTML to Python: He Built a Full Web App with Login & Sign Up! 🤯 | Kevin Valerius Tanady',
    category: 'Web',
    youtubeUrl: 'https://www.youtube.com/watch?v=UudadB3lEK0',
    studentName: 'Kevin Valerius Tanady',
    description: 'Full Web App with Login & Sign Up built from HTML to Python.'
  },
  {
    id: 'proj-kathy',
    image: '',
    projectName: 'She Built a Netflix-Style Movie App with MIT App Inventor! 🎬🤯 | Kathy',
    category: 'App',
    youtubeUrl: 'https://www.youtube.com/watch?v=mSzzlajngpU',
    studentName: 'Kathy',
    description: 'Netflix-Style Movie App built with MIT App Inventor.'
  },
  {
    id: 'proj-nicolas-tank',
    image: '',
    projectName: 'Could YOU Build a Working Tank with Arduino & mBlock? 🤯🛡️ | Nicolas Alberto Tan',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=ECxGpWmxQp8',
    studentName: 'Nicolas Alberto Tan',
    description: 'Working Tank built with Arduino & mBlock.'
  },
  {
    id: 'proj-grisson',
    image: '',
    projectName: 'From Notes App to 2nd Place National Champion! 🏆📱 | Grisson Orville Yang',
    category: 'App',
    youtubeUrl: 'https://www.youtube.com/watch?v=okVogBsA7tA',
    studentName: 'Grisson Orville Yang',
    description: 'Notes App that won 2nd Place National Champion.'
  },
  {
    id: 'proj-larry',
    image: '',
    projectName: 'What Will YOU Build with Arduino & mBlock? 🤖🗑️ | Larry Ho\'s Smart Trash Can',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=VTUJHqeDgsI',
    studentName: 'Larry Ho',
    description: 'Smart Trash Can built with Arduino & mBlock.'
  },
  {
    id: 'proj-nala',
    image: '',
    projectName: 'Think You Can Build a Smart Pet Feeder? 🐰🤖 | Nala\'s Arduino & mBlock Project',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=XnHe6-xAqyY',
    studentName: 'Nala',
    description: 'Smart Pet Feeder built with Arduino & mBlock.'
  },
  {
    id: 'proj-kenward',
    image: '',
    projectName: 'Kenward Fushin - Fighting Game Final Project Foundation 1.2 using MIT App Inventor',
    category: 'App',
    youtubeUrl: 'https://www.youtube.com/watch?v=Yig-EXJYiGk',
    studentName: 'Kenward Fushin',
    description: 'Fighting Game Final Project using MIT App Inventor.'
  },
  {
    id: 'proj-richard',
    image: '',
    projectName: 'He Built an AI That Predicts Credit Risk 🤯 | Richard Victorriano Effendi',
    category: 'AI/ML',
    youtubeUrl: 'https://www.youtube.com/watch?v=xYsdgHGX2iU',
    studentName: 'Richard Victorriano Effendi',
    description: 'AI model that predicts Credit Risk.'
  },
  {
    id: 'proj-jose',
    image: '',
    projectName: 'A 3rd Grader Built an RGB Box with Arduino & mBlock! 🌈🤯 | Jose Enrique Guo',
    category: 'Arduino',
    youtubeUrl: 'https://www.youtube.com/watch?v=K1ZbPXCW3CM',
    studentName: 'Jose Enrique Guo',
    description: 'RGB Box built with Arduino & mBlock by a 3rd Grader.'
  },
  {
    id: 'proj-gracia',
    image: '',
    projectName: 'From Python Code to a Real Parking System 🚗 | Gracia Huang',
    category: 'Python',
    youtubeUrl: 'https://www.youtube.com/watch?v=lfi_CxaAOA8',
    studentName: 'Gracia Huang',
    description: 'Real Parking System built with Python.'
  },
];

export const STATISTICS_DATA: StatisticItem[] = [
  {
    value: '1000+',
    title: 'Students',
    description: 'Siswa dari berbagai sekolah & kota yang belajar coding bersama SPI.',
    iconName: 'Users'
  },
  {
    value: '40+',
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
    logo: ASSETS.PARTNERS.LIA_STEPHANIE,
    type: 'Catholic School'
  },
  {
    name: 'IPEKA SEKOLAH KRISTEN',
    logo: ASSETS.PARTNERS.IPEKA,
    type: 'Christian School'
  },
  {
    name: 'LITTLE KEY SCHOOL',
    logo: ASSETS.PARTNERS.LITTLE_KEY,
    type: 'Primary & Early Ed'
  },
  {
    name: 'PELITA HARAPAN SCHOOL',
    logo: ASSETS.PARTNERS.PELITA_HARAPAN,
    type: 'International School'
  },
  {
    name: 'BINA BANGSA SCHOOL',
    logo: ASSETS.PARTNERS.BINA_BANGSA,
    type: 'National Plus School'
  },
  {
    name: 'SURABAYA INTERCULTURAL SCHOOL',
    logo: ASSETS.PARTNERS.SURABAYA_INTERCULTURAL,
    type: 'Intercultural School'
  }
];

export const CORE_CURRICULUM_STAGES = [
  {
    stage: '1.0 FOUNDATION',
    goal: 'Membangun dasar berpikir komputasional dan pengenalan logika teknologi.',
    image: ASSETS.CURRICULUM.STAGE_1,
    modules: [
      { name: 'Think with Code', tech: 'Scratch & mBlock block programming' },
      { name: 'Think with Machines', tech: 'Arduino & mBlock Robotics' },
      { name: 'Think with Intelligence', tech: 'AI with mBlock & Teachable Machine' }
    ]
  },
  {
    stage: '2.0 DEVELOPMENT',
    goal: 'Membangun kemampuan membuat aplikasi fungsional dan sistem komputasi.',
    image: ASSETS.CURRICULUM.STAGE_2,
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
    image: ASSETS.CURRICULUM.STAGE_3,
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
    image: ASSETS.CURRICULUM.STAGE_4,
    modules: [
      { name: 'Research & Innovation Studio', tech: 'Problem ideation & scientific method' },
      { name: 'Independent Applied Project', tech: 'End-to-end prototyping & engineering' },
      { name: 'Competition Mentorship', tech: 'Olimpiade robotika, AI hackathon & Expo' },
      { name: 'Portfolio & Demo Showcase', tech: 'Public presentation, pitch deck & docs' }
    ]
  }
];
