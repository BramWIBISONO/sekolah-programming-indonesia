/**
 * SPI Assistant knowledge base.
 *
 * All content in this file is derived from the actual content already
 * published on the SPI website (homepage, program pages, FAQ, student
 * projects, mentors, achievements, partnership, and footer). No facts are
 * invented here. If an answer is genuinely not published on the website the
 * assistant says so and directs visitors to the right SPI contact instead.
 *
 * The matcher is intentionally small and dependency-free so the assistant
 * stays lightweight (no external AI dependency, no large client bundle).
 */

export type ChatbotAction =
  | { type: 'navigate'; path: string; labelKey: string }
  | { type: 'whatsapp' };

export type ChatbotCopy = { id: string; en: string; zh: string };

export interface ChatbotIntent {
  /** Stable intent id, also used for contextual quick actions. */
  id: string;
  /** Keywords in Indonesian, English and Chinese (lowercase). */
  keywords: string[];
  response: ChatbotCopy;
  /** Navigation / contact actions shown under the message. */
  actions?: ChatbotAction[];
}

/** Matches a keyword with word boundaries when it is very short. */
function containsKeyword(text: string, keyword: string): boolean {
  const kw = keyword.trim().toLowerCase();
  if (!kw) return false;
  if (kw.length <= 2) {
    // Avoid matching 'ai' inside 'email' or 'hai' inside 'thailand'.
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(text);
  }
  return text.includes(kw);
}

const GREETING_KEYWORDS = [
  'halo', 'hallo', 'hello', 'helo', 'hi', 'hai', 'hye', 'hey', 'hy',
  'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam',
  'good morning', 'good afternoon', 'good evening', 'good night', 'morning',
  'evening', 'pagi', 'siang', 'sore',
  '你好', '您好', '嗨', '早上好', '下午好', '晚上好',
];

/** Returns true when the visitor just greets the assistant. */
export function isChatbotGreeting(text: string): boolean {
  const lower = text.toLowerCase().trim();
  if (!lower) return false;
  return GREETING_KEYWORDS.some((kw) => containsKeyword(lower, kw));
}

export const CHATBOT_GREETING: ChatbotCopy = {
  id: 'Halo! 👋 Saya SPI Assistant. Saya bisa membantu kamu mengenal Sekolah Programming Indonesia, mulai dari program Coding, AI, Robotics, Engineering, project siswa, achievement, partnership, sampai informasi Trial Gratis. Kamu ingin tahu apa?',
  en: 'Hello! 👋 I am the SPI Assistant. I can help you get to know Sekolah Programming Indonesia — from Coding, AI, Robotics and Engineering programs, to student projects, achievements, partnership, and Free Trial information. What would you like to know?',
  zh: '你好！👋 我是SPI助理。我可以帮你了解Sekolah Programming Indonesia——从编程、AI、机器人和工程课程，到学生项目、成就、合作伙伴以及免费试听课信息。你想了解什么呢？',
};

export const CHATBOT_FALLBACK: ChatbotCopy = {
  id: 'Saya belum menemukan informasi tersebut di informasi SPI yang tersedia saat ini. Kalau kamu ingin memastikan detailnya, saya bisa mengarahkan kamu langsung ke tim SPI melalui WhatsApp. Atau coba tanya tentang program, project siswa, atau prestasi SPI ya!',
  en: "I couldn't find that in the SPI information available right now. If you need the exact details, I can point you straight to the SPI team on WhatsApp. Or try asking about our programs, student projects, or achievements!",
  zh: '我目前在SPI现有的信息里没有找到相关的内容。如果你需要确切信息，我可以直接帮你联系SPI团队（WhatsApp）。也可以问问我们的课程、学生项目或成就哦！',
};

export const UNKNOWN_RESPONSE = CHATBOT_FALLBACK;

export const SPI_CHATBOT_INTENTS: ChatbotIntent[] = [
  {
    id: 'about',
    keywords: [
      'apa itu spi', 'spi itu apa', 'tentang spi', 'kenal spi', 'profil spi',
      'sekolah programming indonesia', 'visi misi', 'what is spi', 'about spi',
      'tell me about spi', 'spi是什么', '什么是spi', '关于spi',
    ],
    response: {
      id: 'Sekolah Programming Indonesia (SPI) adalah ekosistem pendidikan teknologi yang menyiapkan generasi AI-Native. Kami membangun lewat pendekatan Computational Thinking dulu: berpikir logis dan sistematis, lalu belajar programming dan engineering, sampai innovation engineering — ditutup dengan pendekatan Think → Build → Innovate. Jadi siswa tidak cuma hafal kode, tapi bisa memahami masalah, membangun solusi nyata, dan berinovasi.',
      en: 'Sekolah Programming Indonesia (SPI) is a technology-education ecosystem preparing the AI-Native generation. We start with Computational Thinking, then programming, engineering, and innovation. Students not only learn code — they learn to understand problems, build real solutions, and create innovations.',
      zh: 'Sekolah Programming Indonesia（SPI）是一个为AI原生代打造的科技教育生态。我们从计算思维（Computational Thinking）开始，再到编程与工程。学生不仅学代码，更学会理解问题、构建真实解决方案并创造创新。',
    },
    actions: [
      { type: 'navigate', path: '/about', labelKey: 'chat.act.about' },
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
    ],
  },
  {
    id: 'programs',
    keywords: [
      'program spi', 'pilih program', 'apa saja program', 'program', 'produk spi',
      'jalur belajar', 'spi programs', 'programs', '选择课程', '课程',
      '项目', 'program apa',
    ],
    response: {
      id: 'SPI punya 4 program utama:\n\n1. SPI Core — Coding, Computational Thinking & Programming.\n2. SPI Lab — teknologi & AI untuk kehidupan sehari-hari.\n3. SPI Engineering — jalur spesialisasi teknologi profesional.\n4. SPI InSchool — kemitraan & kurikulum untuk sekolah.\n\nKamu mau lihat detail yang mana?',
      en: 'SPI has 4 main programs:\n\n1. SPI Core — Coding, Computational Thinking & Programming.\n2. SPI Lab — everyday digital & AI productivity tools.\n3. SPI Engineering — the professional technology specialization path.\n4. SPI InSchool — school partnership & curriculum.\n\nWhich one would you like to explore first?',
      zh: 'SPI有4个主要课程：\n\n1. SPI Core —— 编程、计算思维与软件开发。\n2. SPI Lab —— 日常生活与工作中的数字工具和AI。\n3. SPI Engineering —— 专业工程方向。\n4. SPI InSchool —— 学校合作课程。\n\n你想先了解哪一个呢？',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
      { type: 'navigate', path: '/program/spi-lab', labelKey: 'chat.act.lab' },
      { type: 'navigate', path: '/program/spi-engineering', labelKey: 'chat.act.engineering' },
      { type: 'navigate', path: '/program/spi-inschool', labelKey: 'chat.act.inschool' },
    ],
  },
  {
    id: 'core',
    keywords: [
      'spi core', 'program utama', 'fundamental spi', 'dasar spi', 'spi konsep',
      'introduksi spi', 'spi inti',
    ],
    response: {
      id: 'SPI Core adalah fondasi utama SPI. Siswa belajar Computational Thinking, block programming (Scratch & mBlock), Python text-based programming, aplikasi mobile dengan MIT App Inventor, sampai eksplorasi Arduino, robotics, dan pengenalan AI. Kurikulumnya bertahap: dari FOUNDATION 1.0, DEVELOPMENT 2.0, EXPLORATION 3.0, hingga Research & Innovation 4.0.',
      en: 'SPI Core is the main foundation of SPI. Students learn Computational Thinking, block programming (Scratch & mBlock), text-based Python, mobile apps with MIT App Inventor, and continue with Arduino, robotics, and AI exploration. The curriculum is staged: Foundation 1.0, Development 2.0, Exploration 3.0, and Research & Innovation 4.0.',
      zh: 'SPI Core是SPI的核心基础。学生学习计算思维、积木式编程（Scratch & mBlock）、Python文本编程、通过MIT App Inventor开发手机应用，再到Arduino、机器人和AI探索。课程分阶段：Foundation 1.0、Development 2.0、Exploration 3.0 和 Research & Innovation 4.0。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
      { type: 'navigate', path: '/program/spi-lab', labelKey: 'chat.act.lab' },
    ],
  },
  {
    id: 'lab',
    keywords: [
      'spi lab', 'tools', 'produktivitas', 'digital skill', 'ai tools',
      'photoshop', 'canva', 'google workspace', 'prompt engineering',
    ],
    response: {
      id: 'SPI Lab berfokus pada pemanfaatan teknologi dan AI di kehidupan sehari-hari: AI untuk productivity (generative AI & prompt engineering), Google Workspace & Office tools, Canva & graphic design, Photoshop & content creation. Sangat cocok untuk pelajar, orang tua, guru, maupun profesional — tidak perlu jadi programmer.',
      en: 'SPI Lab focuses on using technology and AI in everyday life: AI for productivity (generative AI & prompt engineering), Google Workspace & Office tools, Canva & graphic design, and content creation. It fits students, parents, teachers, and professionals — no programming background needed.',
      zh: 'SPI Lab专注于日常生活与工作中技术和AI的应用：AI生产力工具（生成式AI与提示词工程）、Google Workspace和办公工具、Canva与平面设计、内容创作。适合学生、家长、教师和职场人士——无需编程基础。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-lab', labelKey: 'chat.act.lab' },
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
    ],
  },
{
    id: 'engineering',
    keywords: [
      'spi engineering', 'engineering', 'insinyur', 'data science', 'machine learning',
      'computer vision', 'iot', 'cloud', 'devops', 'cyber security', 'profesional',
    ],
    response: {
      id: 'SPI Engineering adalah jalur spesialisasi teknologi profesional. Di dalamnya ada Software Engineering, AI Engineering, Data Science, Machine Learning, Computer Vision, NLP, Web Engineering, IoT Engineering, Cloud & DevOps, sampai Cyber Security — semua berbasis project nyata yang relevan untuk industri.',
      en: 'SPI Engineering is the professional technology specialization path. It covers: Software Engineering, AI Engineering, Data Science, Machine Learning, Computer Vision, NLP, Web Engineering, IoT Engineering, Cloud & DevOps, and Cyber Security — all project-based and industry-relevant.',
      zh: 'SPI Engineering是面向专业的技术方向。涵盖软件工程、AI工程、数据科学、机器学习、计算机视觉、NLP、Web工程、IoT工程、云与DevOps以及网络安全——都以真实项目和行业需求为基础。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-engineering', labelKey: 'chat.act.engineering' },
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
    ],
  },
  {
    id: 'inschool',
    keywords: [
      'spi inschool', 'inschool', 'kemitraan sekolah', 'ekstrakurikuler',
      'kurikulum sekolah', 'school program', 'school partnership', 'untuk sekolah',
    ],
    response: {
      id: 'SPI InSchool membawa konsep SPI langsung ke sekolah: kurikulum teknologi terstruktur, pelatihan guru (Teacher Training), modul & buku, assessment, sertifikasi, sampai kemitraan jangka panjang — bisa sebagai mata pelajaran atau ekstrakurikuler tanpa mengubah kurikulum inti sekolah.',
      en: 'SPI InSchool brings SPI into schools: a structured technology curriculum, teacher training, modules & books, assessment, certification, and long-term partnerships — as a subject or extracurricular, without changing the school core curriculum.',
      zh: 'SPI InSchool将SPI带入学校：结构化的科技课程、教师培训、教材、评估、认证和长期合作——可以作为课程或课外活动，且无需改变学校核心课程。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-inschool', labelKey: 'chat.act.inschool' },
      { type: 'navigate', path: '/partnership', labelKey: 'chat.act.partnership' },
    ],
  },
  {
id: 'coding',
    keywords: [
      'coding', 'programming', 'kode', 'scratch', 'python', 'app inventor',
      'web', 'game', 'belajar ngoding', 'ngoding', '编程', '写代码', 'code',
    ],
    response: {
      id: 'Di SPI, belajar coding selalu lewat project nyata. Siswa mulai dari block programming (Scratch & mBlock), lalu Python, aplikasi mobile dengan MIT App Inventor, web development, sampai membuat game. Contoh siswa: sistem stock management Python, web app dengan login, game Minesweeper, dan aplikasi mobile ala film. Lihat di halaman Project Siswa.',
      en: 'At SPI, coding is always learned through real projects. Students start with block programming (Scratch & mBlock), then Python, mobile apps with MIT App Inventor, web development, and game development. Examples: a Python stock management system, a web app with login, a Minesweeper game, and a movie-style mobile app. Check the Student Projects page.',
      zh: '在SPI，我们总是通过真实项目学习编程。学生从积木式编程（Scratch & mBlock）开始，然后学习Python、用MIT App Inventor开发手机App、网页开发和游戏开发。例如：Python库存管理系统、带登录的网页应用、扫雷游戏和影视风格的移动应用。欢迎查看“学生项目”页面。',
    },
    actions: [
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
    ],
  },
  {
    id: 'ai',
    keywords: [
      'kecerdasan buatan', 'artificial intelligence', 'ai literacy', 'generative ai',
      'chatgpt', 'prompt engineering', '人工智能',
    ],
    response: {
      id: 'SPI membangun AI literacy sejak dini. Siswa belajar berkolaborasi dengan AI sebagai alat: mencoba tools AI, prompt engineering, dan membangun proyek — sambil tetap menjadi perancang dan pengambil keputusan. Bahkan ada siswa yang membuat AI sendiri, misalnya AI untuk memprediksi Credit Risk.',
      en: 'SPI builds AI literacy from an early age. Students learn to collaborate with AI as a tool: exploring AI tools, prompt engineering, and building projects while staying the designer and decision maker. Some students even build their own AI, such as a credit-risk prediction model.',
      zh: 'SPI从小培养AI素养。学生学习把AI作为工具来协作：尝试AI工具、练习提示词工程、借助AI完成项目——同时始终是设计者和决策者。甚至有学生做出了自己的AI，比如信贷风险预测模型。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-lab', labelKey: 'chat.act.lab' },
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
    ],
  },
  {
    id: 'robotics',
    keywords: [
      'robotics', 'robot', 'arduino', 'mblock', 'sensor', 'smart',
      'microcontroller', 'hardware', '机器人',
    ],
    response: {
      id: 'Robotics adalah salah satu keunggulan SPI. Siswa belajar Arduino, sensor, motor, dan mBlock — dari level dasar sampai sistem yang lebih kompleks. Banyak siswa sudah membuat proyek nyata: pintu otomatis (automatic door), smart alarm, smart trash can, dan smart pet feeder dengan Arduino & mBlock.',
      en: 'Robotics is one of SPI strengths. Students learn with Arduino, sensors, motors, and mBlock — from basic to more complex systems. Many students have built real projects: an automatic door, a smart alarm, a smart trash can, and a smart pet feeder (Arduino & mBlock).',
      zh: '机器人是SPI的强项之一。学生学习使用Arduino、传感器、电机和mBlock，从基础到更复杂的系统。许多学生已经制作了真实项目：自动门、智能报警器、智能垃圾桶和智能宠物喂食器（Arduino & mBlock）。',
    },
    actions: [
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
    ],
  },
  {
    id: 'projects',
    keywords: [
      'project siswa', 'project', 'proyek', 'karya siswa', 'hasil siswa',
      'portfolio siswa', 'student project', 'projects', '作品', '项目作品',
    ],
    response: {
      id: 'Siswa SPI aktif membangun project nyata dan semuanya bisa dilihat di halaman Project Siswa. Contohnya: Stock Management System dengan Python, Automatic Door/Smart Alarm/Smart Pet Feeder dengan Arduino & mBlock, game Minesweeper, Full Web App dengan Login, aplikasi mobile ala Netflix, dan AI yang memprediksi Credit Risk.',
      en: 'SPI students build real projects you can see on the Student Projects page. Examples: a Python Stock Management System, an Automatic Door / Smart Alarm / Smart Pet Feeder (Arduino & mBlock), a Minesweeper game, a full web app with login, a Netflix-style mobile app, and an AI that predicts credit risk.',
      zh: 'SPI学生制作了大量真实项目，都可以在“学生项目”页面看到。例如：Python库存管理系统、用Arduino & mBlock制作的自动门/智能报警器/智能宠物喂食器、扫雷游戏、带登录的网页应用、Netflix风格的手机App，以及预测信贷风险的AI。',
    },
    actions: [
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
      { type: 'navigate', path: '/achievement', labelKey: 'chat.act.achievement' },
    ],
  },
{
    id: 'achievements',
    keywords: [
      'prestasi', 'achievement', 'juara', 'penghargaan', 'menang', 'lomba',
      'kompetisi', '成就', '获奖',
    ],
    response: {
      id: 'Prestasi siswa SPI yang sudah dipublikasikan di website:\n\n1. World Robot Competition 2026 (Singapore) — 8th International Youth Coding Contest, Space Exploration Challenge: School Rank SPI Jakarta Barat Peringkat 1 dengan total skor 1.490.\n2. iCode 2025 — 7th ICode International Youth Coding Contest (Regional Final): School Rank global SPI Peringkat 2.\n\nAda juga prestasi lokal/nasional, termasuk Notes App juara 2 national champion. Detail lengkap di halaman Achievement.',
      en: 'SPI achievements published on the website:\n\n1. World Robot Competition 2026 (Singapore) — 8th International Youth Coding Contest, Space Exploration Challenge — SPI West Jakarta reached School Rank #1 with a total score of 1,490.\n2. iCode 2025 — The 7th ICode International Youth Coding Contest (Regional Final): SPI 2nd place in the global School Rank.\n\nThere are also local and national records, including a Notes App that won 2nd place national champion. See the Achievement page for details.',
      zh: 'SPI官网上公开发布的成就：\n\n1. 2026年世界机器人大赛（新加坡）——第八届国际青少年编程大赛“太空探索挑战赛”——SPI西雅加达校区学校总排名第一名，总分1,490。\n2. iCode 2025——第七届ICode国际青少年编程大赛区域决赛——SPI全球学校排名第二名。\n\n另外还有本地和全国记录，比如获得全国第二名的笔记应用。详情见“Achievement”页面。',
    },
    actions: [
      { type: 'navigate', path: '/achievement', labelKey: 'chat.act.achievement' },
      { type: 'navigate', path: '/projects', labelKey: 'chat.act.projects' },
    ],
  },
  {
    id: 'mentors',
    keywords: [
      'mentor', 'pengajar', 'guru', 'coach', 'trainer', 'teacher', '导师', '讲师',
    ],
    response: {
      id: 'Tim mentor SPI tampil di website: Bram (Programming, Robotics & AI), Gracia (Web Development, Python & Data Science), Dimas (Robotics, Arduino & IoT), Tryo (Web, Scratch & Robotics), Andrean (Data Science & Machine Learning), dan Fritz (Web Development & IoT). Siswa dibimbing langsung oleh mentor saat project-based learning.',
      en: 'SPI shows an experienced mentor team on its website: Bram (Programming, Robotics & AI), Gracia (Web Development, Python & Data Science), Dimas (Robotics, Arduino & IoT), Tryo (Web, Scratch & Robotics), Andrean (Data Science & Machine Learning), and Fritz (Web Development & IoT). Students are guided by mentors during project-based learning.',
      zh: 'SPI官网展示了经验丰富的导师团队：Bram（编程、机器人与AI）、Gracia（Web开发、Python与数据科学）、Dimas（机器人与IoT）、Tryo（Web、Scratch与机器人）、Andrean（数据科学与机器学习）、Fritz（Web开发与IoT）。学生在项目式学习中直接得到导师指导。',
    },
    actions: [
      { type: 'navigate', path: '/', labelKey: 'chat.act.home' },
      { type: 'whatsapp' },
    ],
  },
  {
    id: 'partnership',
    keywords: [
      'partnership', 'mitra', 'kerja sama', 'partner', 'kolaborasi', 'corporate',
      'csr', 'komunitas', '合作', '合作伙伴',
    ],
    response: {
      id: 'SPI memiliki beberapa model kemitraan: Kemitraan Sekolah (SPI InSchool), Corporate Partnership (CSR & pelatihan karyawan), Community Workshop, sampai Strategic Alliance. Partner sekolah di website mencakup: Lia Stephanie Catholic School, IPEKA, Little Key School, Pelita Harapan School, Bina Bangsa, dan Surabaya International School. Kunjungi halaman Partnership atau hubungi tim SPI via WhatsApp.',
      en: 'SPI offers several partnership models: School partnership (SPI InSchool), Corporate Partnership (CSR / employee training), Community Workshops, and Strategic Alliances. Featured school partners include: Lia Stephanie Catholic School, IPEKA, Little Key School, Pelita Harapan, Bina Bangsa, and Surabaya International School. Visit the Partnership page or contact the SPI team on WhatsApp.',
      zh: 'SPI提供多种合作模式：学校合作（SPI InSchool）、企业合作（CSR/员工培训）、社区工作坊和战略联盟。官网展示的学校伙伴包括：Lia Stephanie Catholic School、IPEKA、Little Key School、Pelita Harapan、Bina Bangsa和Surabaya International School。请访问伙伴页面或通过WhatsApp联系我们。',
    },
    actions: [
      { type: 'navigate', path: '/partnership', labelKey: 'chat.act.partnership' },
      { type: 'whatsapp' },
    ],
  },
  {
    id: 'trial',
    keywords: [
      'trial', 'coba gratis', 'free trial', 'uji coba', 'konsultasi', 'try spi',
      '免费试听', '试听课', '免费体验',
    ],
    response: {
      id: 'Tentu bisa! SPI punya Free Trial Class — kelas uji coba 60 menit, gratis. Calon siswa bisa merasakan langsung pengalaman belajar dan orang tua bisa konsultasi minat anak bersama tim. Daftar lewat menu Free Trial, tombol "Coba Gratis" di website, atau langsung dari sini.',
      en: 'Yes! SPI provides a Free Trial Class — a 60-minute trial class, free. Prospective students experience SPI hands-on and parents can consult about their child\'s interests with the team. Register through the Free Trial menu, the "Try for Free" button, or right here.',
      zh: '当然！SPI提供免费试听课——60分钟的体验课，完全免费。学生可以现场体验SPI的学习方式，家长也能和团队沟通孩子的兴趣方向。可以通过“免费试听”菜单、页面上的“免费体验”按钮或直接在这里报名。',
    },
    actions: [
      { type: 'navigate', path: '/free-trial', labelKey: 'chat.act.trial' },
      { type: 'whatsapp' },
    ],
  },
{
    id: 'registration',
    keywords: [
      'daftar', 'pendaftaran', 'cara daftar', 'bagaimana daftar', 'register',
      'sign up', 'enroll', '报名', '注册', '如何报名',
    ],
    response: {
      id: 'Cara daftar SPI: bisa lewat tombol "Pendaftaran" / "Daftar Kelas" di website, atau lewat form Free Trial. Tim admission SPI akan mengonfirmasi kelas dan jadwal (Online/Offline) melalui WhatsApp. Panduan paling cepat tetap lewat WhatsApp — klik di bawah ya.',
      en: 'To register at SPI: use the "Register"/"Sign Up Class" button on the website or go through the Free Trial form. The admission team then confirms the class and schedule (online/offline) via WhatsApp. The fastest path is right below — just open WhatsApp.',
      zh: '如何报名SPI：可在网页上点击“报名/注册课程”按钮，或通过免费试听表单提交。SPI招生团队会通过WhatsApp与您确认班级和时间安排（支持线上/线下）。最快的方式就是打开下方的WhatsApp按钮。',
    },
    actions: [
      { type: 'whatsapp' },
      { type: 'navigate', path: '/classes', labelKey: 'chat.act.classes' },
    ],
  },
  {
    id: 'classes',
    keywords: [
      'kelas', 'pilihan kelas', 'daftar kelas', 'belajar apa', 'syllabus',
      'mata pelajaran', 'class', 'course', '班级', '课程列表',
    ],
    response: {
      id: 'Kelas SPI yang dipublikasikan di website: Create Website Using AI, Fast Track Web Development, Intro to Python Programming, Microsoft Excel, Fast Track Data Analysis, Fast Track UI/UX Design, PowerPoint, dan Microsoft Word — dengan opsi belajar Online/Offline.',
      en: 'Classes published on the SPI website: Create Website Using AI, Fast Track Web Development, Intro to Python Programming, Microsoft Excel, Fast Track Data Analysis, Fast Track UI/UX Design, PowerPoint, and Microsoft Word — with online/offline options.',
      zh: 'SPI官网上公开发布的课程：使用AI创建网站、Web开发快速班、Python编程入门、Excel、数据分析快速班、UI/UX设计、PowerPoint和Word——支持线上/线下。',
    },
    actions: [
      { type: 'navigate', path: '/classes', labelKey: 'chat.act.classes' },
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
    ],
  },
  {
    id: 'locations',
    keywords: [
      'lokasi', 'cabang', 'alamat', 'di mana', 'dimana', 'kota', 'offline',
      'nearest', 'location', '位置', '城市', '地址',
    ],
    response: {
      id: 'SPI melayani kelas Online dari seluruh wilayah Indonesia. Lokasi yang dipublikasikan di peta Partnership: Jakarta Barat, Surabaya, Malang, Solo, dan Yogyakarta — dan masih membuka peluang kemitraan di berbagai daerah. Untuk lokasi terdekatmu, hubungi admin ya.',
      en: 'SPI serves online classes from anywhere in Indonesia. Locations published on the partnership map: West Jakarta, Surabaya, Malang, Solo, and Yogyakarta — with partnership opportunities open in other regions. Contact the admin team for your nearest location.',
      zh: 'SPI在线课程服务全印尼。合作地图上公开的线下地点：西雅加达、泗水、玛琅、梭罗和日惹——同时也在其他地区开放合作。如需最近的教室位置，请联系我们。',
    },
    actions: [
      { type: 'navigate', path: '/partnership', labelKey: 'chat.act.partnership' },
      { type: 'whatsapp' },
    ],
  },
  {
    id: 'contact',
    keywords: [
      'kontak', 'contact', 'nomor', 'email', 'telepon', 'hubungi', 'wa',
      'whatsapp', 'cs', 'tim spi', '联系', '联系方式', '电话',
    ],
    response: {
      id: 'Kamu bisa menghubungi SPI lewat:\n• WhatsApp: +62 812-4690-0335 (tercepat)\n• Email: informasi@sekolahprogrammingindonesia.com\n• Website: sekolahprogrammingindonesia.com\n• Instagram & YouTube: @sekolahprogrammingindonesia, TikTok: @sekolahprogramming.id',
      en: 'You can reach SPI at:\n• WhatsApp: +62 812-4690-0335 (fastest)\n• Email: informasi@sekolahprogrammingindonesia.com\n• Website: sekolahprogrammingindonesia.com\n• Instagram & YouTube: @sekolahprogrammingindonesia, TikTok: @sekolahprogramming.id',
      zh: '你可以这样联系我们：\n• WhatsApp：+62 812-4690-0335（下方按钮直达）\n• 邮箱：informasi@sekolahprogrammingindonesia.com\n• 网站：sekolahprogrammingindonesia.com\n• Instagram & YouTube：@sekolahprogrammingindonesia，TikTok：@sekolahprogramming.id',
    },
    actions: [{ type: 'whatsapp' }],
  },
{
    id: 'price',
    keywords: [
      'harga', 'biaya', 'tarif', 'berbayar', 'price', 'cost', 'fee', '多少钱',
      '价格', '费用', '学费',
    ],
    response: {
      id: 'Informasi harga belum dipublikasikan di website ini karena menyesuaikan program, jenjang, dan paket (Online/Offline). Tim admission SPI bisa menjelaskan rinciannya sesuai kebutuhanmu — hubungi kami via WhatsApp ya.',
      en: 'Pricing is not published on this website because it depends on the program, level, and package (online/offline). The SPI admission team can walk you through the details — feel free to reach us on WhatsApp.',
      zh: '价格没有在本网站公开，因为它取决于课程、水平和套餐（线上/线下）。SPI招生团队可以为您详细介绍——欢迎通过WhatsApp联系我们。',
    },
    actions: [
      { type: 'whatsapp' },
      { type: 'navigate', path: '/free-trial', labelKey: 'chat.act.trial' },
    ],
  },
  {
    id: 'schedule',
    keywords: [
      'jadwal', 'waktu', 'jam', 'kapan', 'schedule', 'timing', 'start',
      'mulai kapan', 'kapan mulai', '时间', '日程', '什么时候',
    ],
    response: {
      id: 'Jadwal kelas dan waktu mulai bervariasi tergantung kelas (Online/Offline). Karena detail jadwal paling baru dikelola langsung oleh admin & tim kurikulum, cara tercepat adalah bertanya jadwal terdekat lewat WhatsApp.',
      en: 'Class schedules and starting dates vary by class (online/offline). Since the most current schedule is managed by the admin & curriculum team, the fastest way is to ask about the nearest schedule via WhatsApp.',
      zh: '课程时间与开课日期因班级（线上/线下）而异。最新安排由导师和教务团队管理，最快的了解方式是直接通过WhatsApp咨询最近的排课。',
    },
    actions: [
      { type: 'whatsapp' },
      { type: 'navigate', path: '/free-trial', labelKey: 'chat.act.trial' },
    ],
  },
  {
    id: 'age',
    keywords: [
      'usia', 'umur', 'untuk anak', 'prasekolah', 'sekolah dasar', 'smp', 'sma',
      'anak saya', 'berapa tahun', 'age', 'kid', 'children', '年级', '年龄', '孩子',
    ],
    response: {
      id: 'SPI terbuka untuk berbagai rentang usia — dari pra-sekolah, SD, SMP, SMA, sampai mahasiswa dan profesional — dengan materi yang disesuaikan per jenjang. Yang utama: kemauan belajar dan perangkat laptop/komputer standar.',
      en: 'SPI is open to a wide age range — from preschool, elementary, junior/senior high school, to university students and professionals — with content adjusted per level. The essentials are curiosity to learn and a standard laptop/computer.',
      zh: 'SPI面向不同年龄段开放——从学前、小学、初中、高中，到大学生和职场人士——内容会根据水平调整。关键是学习热情和一台普通的笔记本电脑/电脑。',
    },
    actions: [
      { type: 'navigate', path: '/program/spi-core', labelKey: 'chat.act.core' },
      { type: 'whatsapp' },
    ],
  },
  {
    id: 'bootcamp',
    keywords: [
      'bootcamp', 'generative ai for students', 'program bulan', 'program khusus',
      'khusus bulan',
    ],
    response: {
      id: 'Ada juga program khusus yang tampil di website: "Generative AI for Students" bootcamp — program intensif 4 minggu untuk siswa SMP/SMA, 8x sesi belajar interaktif, maks. 20 peserta per kelas, dan sertifikat penyelesaian.',
      en: 'There is a featured special program on the website: the "Generative AI for Students" bootcamp — a 4-week intensive program for junior & senior high students, 8 interactive sessions, max 20 participants per class, and a completion certificate.',
      zh: '网站还展示了一个月度特别项目：“面向学生的生成式AI”训练营——为初中和高中生设计的4周强化课程，共8次互动学习，每班最多20人，附结业证书。',
    },
    actions: [{ type: 'whatsapp' }],
  },
  {
    id: 'festival',
    keywords: [
      'festival', 'innovation festival', 'ajang', 'showcase', 'pameran', 'expo',
      'fest', '节日', '比赛展示',
    ],
    response: {
      id: 'SPI Innovation Festival adalah ajang showcase inovasi teknologi siswa. Di website informasinya bertuliskan "Coming Soon" dan direncanakan hadir di: Jakarta, Surabaya, Malang, Solo, dan Jogja.',
      en: 'The SPI Innovation Festival is a showcase of student technology innovations. On the website it is marked "Coming Soon", planned for: Jakarta, Surabaya, Malang, Solo, and Jogja.',
      zh: 'SPI创新节是展示学生科技创新的活动。官网当前状态为“即将推出”，计划城市：雅加达、泗水、玛琅、梭罗和日惹。',
    },
    actions: [
      { type: 'navigate', path: '/', labelKey: 'chat.act.home' },
      { type: 'whatsapp' },
    ],
  },
  {
    id: 'faq',
    keywords: [
      'faq', 'pertanyaan umum', 'common question', 'bantuan', '常见问题', '怎么学',
    ],
    response: {
      id: 'Beberapa pertanyaan umum: berapa usia yang pas, apa saja yang dipelajari, program mana yang cocok, dan bagaimana cara Free Trial. Jawaban lengkapnya bisa dibaca di bagian FAQ halaman utama — atau tanyakan hal yang spesifik ke saya ya.',
      en: 'Common questions cover suitable ages, what is taught, which program fits, and how the free trial works. You can read full answers on the FAQ section of the homepage — or ask me something more specific.',
      zh: '常见问题包括：合适的年龄、学习内容、哪个课程适合、如何参加免费试听。你可以在首页的FAQ板块阅读完整解答——也可以直接问我更具体的问题。',
    },
    actions: [{ type: 'navigate', path: '/', labelKey: 'chat.act.home' }],
  },
];

export const SPI_KNOWLEDGE_BASE = SPI_CHATBOT_INTENTS;