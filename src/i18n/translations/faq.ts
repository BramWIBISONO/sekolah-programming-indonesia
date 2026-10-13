import type { TriText } from './sections';

/**
 * FAQ questions and answers. Keys follow the FAQ_DATA ids: `<id>.q` and `<id>.a`.
 * Answers must stay factually equivalent across languages.
 */
export const faqTranslations: Record<string, TriText> = {
  'faq.heading': { id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions', zh: '常见问题' },
  'faq.desc': {
    id: 'Temukan jawaban tentang SPI, program pembelajaran, metode pengajaran, dan cara mendaftar.',
    en: 'Find answers about SPI, our programs, teaching approach, and how to enroll.',
    zh: '了解有关 SPI、课程项目、教学方法及报名流程的常见问题解答。',
  },
  'faq.eyebrow': { id: 'FAQ', en: 'FAQ', zh: '常见问题' },

  'faq-1.q': { id: 'Apa itu SPI?', en: 'What is SPI?', zh: '什么是 SPI？' },
  'faq-1.a': {
    id: 'Sekolah Programming Indonesia (SPI) adalah ekosistem pendidikan teknologi yang mempersiapkan generasi AI-Native melalui Computational Thinking, programming, dan Innovation Engineering. SPI membantu siswa berpikir sistematis, membangun solusi nyata, dan menciptakan inovasi yang relevan dengan kebutuhan dunia nyata.',
    en: 'Sekolah Programming Indonesia (SPI) is a technology education ecosystem that prepares the AI-Native generation through computational thinking, programming, and innovation engineering. SPI helps students think systematically, build real solutions, and create innovations that address real-world needs.',
    zh: '印尼编程学校（Sekolah Programming Indonesia，简称 SPI）是一个科技教育生态，通过计算思维、编程和创新工程培养 AI 原生一代。SPI 帮助学生系统地思考、构建真实的解决方案，并创造贴合现实需求的创新成果。',
  },
  'faq-2.q': {
    id: 'Apa yang membedakan SPI dengan kursus programming biasa?',
    en: 'How is SPI different from a regular programming course?',
    zh: 'SPI 与普通编程课程有什么不同？',
  },
  'faq-2.a': {
    id: 'SPI tidak hanya mengajarkan syntax coding. Pembelajaran dimulai dari Computational Thinking, dilanjutkan dengan kemampuan membangun solusi, hingga menghasilkan inovasi nyata melalui pendekatan Think → Build → Innovate. Siswa belajar memahami masalah, membangun solusi, dan menciptakan dampak — bukan sekadar menyelesaikan latihan.',
    en: 'SPI does more than teach coding syntax. Learning starts with computational thinking, moves on to building solutions, and leads to real innovation through the Think → Build → Innovate approach. Students learn to understand problems, build solutions, and create impact rather than simply complete exercises.',
    zh: 'SPI 不只是教授编程语法。学习从计算思维开始，进而培养构建解决方案的能力，并通过 Think → Build → Innovate 的方法实现真正的创新。学生学会理解问题、构建解决方案并创造影响，而不只是完成练习。',
  },
  'faq-3.q': { id: 'Untuk usia berapa SPI Core?', en: 'What age group is SPI Core for?', zh: 'SPI 核心课程 (SPI Core) 适合哪个年龄段？' },
  'faq-3.a': {
    id: 'SPI Core dirancang untuk membangun fondasi berpikir dan kemampuan teknologi sejak dini, dengan kurikulum bertahap yang disesuaikan jenjang usia — dari pengenalan logika visual hingga text-based programming dan robotics.',
    en: 'SPI Core is designed to build thinking skills and technology foundations from an early age, with a staged curriculum adapted to each age level — from visual logic to text-based programming and robotics.',
    zh: 'SPI 核心课程旨在从小培养思维能力和科技基础，课程按年龄阶段循序渐进——从可视化逻辑入门，到文本编程和机器人。',
  },
  'faq-4.q': { id: 'Apa yang dipelajari di SPI Core?', en: 'What do students learn in SPI Core?', zh: 'SPI 核心课程 (SPI Core) 学习哪些内容？' },
  'faq-4.a': {
    id: 'SPI Core mencakup Computational Thinking, block programming (Scratch & mBlock), Python, MIT App Inventor, Arduino & robotics, hingga eksplorasi AI. Kurikulum terstruktur dalam tahap Foundation, Development, Exploration, dan Research & Innovation.',
    en: 'SPI Core covers computational thinking, block programming (Scratch & mBlock), Python, MIT App Inventor, Arduino & robotics, and AI exploration. The curriculum is structured in four stages: Foundation, Development, Exploration, and Research & Innovation.',
    zh: 'SPI 核心课程涵盖计算思维、积木编程（Scratch 与 mBlock）、Python、MIT App Inventor、Arduino 与机器人，以及 AI 探索。课程分为四个阶段：Foundation（基础）、Development（发展）、Exploration（探索）和 Research & Innovation（研究与创新）。',
  },
  'faq-5.q': { id: 'Apa itu SPI Lab?', en: 'What is SPI Lab?', zh: '什么是 SPI 数字技能实验室 (SPI Lab)？' },
  'faq-5.a': {
    id: 'SPI Lab membantu peserta memanfaatkan teknologi dan AI dalam kehidupan sehari-hari — untuk bekerja lebih produktif, belajar lebih efektif, dan berkarya lebih kreatif. Fokusnya bukan membuat software dari nol, melainkan memanfaatkan software dan AI secara optimal.',
    en: 'SPI Lab helps participants use technology and AI in everyday life — to work more productively, learn more effectively, and create more creatively. The focus is not on building software from scratch, but on making the most of existing software and AI.',
    zh: 'SPI 数字技能实验室帮助学员在日常生活中运用科技与 AI——更高效地工作、更有效地学习、更有创意地创作。重点不是从零开发软件，而是充分利用现有软件和 AI。',
  },
  'faq-6.q': { id: 'Siapa yang cocok mengikuti SPI Lab?', en: 'Who is SPI Lab for?', zh: '谁适合参加 SPI 数字技能实验室 (SPI Lab)？' },
  'faq-6.a': {
    id: 'SPI Lab cocok untuk siswa, orang tua, guru, profesional, dan siapa pun yang ingin menguasai AI for productivity, creative digital tools, business productivity, content creation, dan digital skills tanpa harus menjadi programmer.',
    en: 'SPI Lab suits students, parents, teachers, professionals, and anyone who wants to master AI for productivity, creative digital tools, business productivity, content creation, and digital skills without becoming a programmer.',
    zh: 'SPI 数字技能实验室适合学生、家长、教师、职场人士，以及任何希望掌握 AI 效率工具、创意数字工具、商务效率、内容创作和数字技能，但不需要成为程序员的人。',
  },
  'faq-7.q': { id: 'Apa itu SPI Engineering?', en: 'What is SPI Engineering?', zh: '什么是 SPI 工程进阶课程 (SPI Engineering)？' },
  'faq-7.a': {
    id: 'SPI Engineering adalah jalur spesialisasi profesional bagi siswa yang ingin membangun sistem berskala industri — meliputi Software Engineering, AI Engineering, Data Science, Machine Learning, Computer Vision, IoT, Web Engineering, Cloud & DevOps, dan Cyber Security.',
    en: 'SPI Engineering is a professional specialisation pathway for students who want to build industry-scale systems, covering Software Engineering, AI Engineering, Data Science, Machine Learning, Computer Vision, IoT, Web Engineering, Cloud & DevOps, and Cyber Security.',
    zh: 'SPI 工程进阶课程是面向希望构建行业级系统的学生的专业方向路径，涵盖软件工程、AI 工程、数据科学、机器学习、计算机视觉、物联网、Web 工程、云计算与 DevOps，以及网络安全。',
  },
  'faq-8.q': { id: 'Apa yang dipelajari di SPI Engineering?', en: 'What do students learn in SPI Engineering?', zh: 'SPI 工程进阶课程 (SPI Engineering) 学习哪些内容？' },
  'faq-8.a': {
    id: 'SPI Engineering mencakup seri Software Engineering, AI Engineering, Data Science Engineering, Machine Learning, Computer Vision, NLP, Web Engineering, IoT Engineering, Cloud & DevOps, dan Cyber Security — semuanya berbasis project nyata dan relevan industri.',
    en: 'SPI Engineering includes series in Software Engineering, AI Engineering, Data Science Engineering, Machine Learning, Computer Vision, NLP, Web Engineering, IoT Engineering, Cloud & DevOps, and Cyber Security — all based on real, industry-relevant projects.',
    zh: 'SPI 工程进阶课程包括软件工程、AI 工程、数据科学工程、机器学习、计算机视觉、自然语言处理、Web 工程、物联网工程、云计算与 DevOps 以及网络安全等系列，全部基于真实且贴近行业的项目。',
  },
  'faq-9.q': { id: 'Apakah siswa harus sudah bisa coding?', en: 'Do students need prior coding experience?', zh: '学生需要有编程基础吗？' },
  'faq-9.a': {
    id: 'Tidak. SPI Core dirancang sebagai fondasi utama seluruh pembelajaran SPI. Siswa belajar bertahap dari cara berpikir komputasional, block coding, hingga text-based programming sesuai jenjang dan kesiapan masing-masing.',
    en: 'No. SPI Core is designed as the foundation for all SPI learning. Students progress step by step from computational thinking and block coding to text-based programming, according to their level and readiness.',
    zh: '不需要。SPI 核心课程是所有 SPI 学习的基础。学生会根据自身水平和准备程度，从计算思维、积木编程逐步过渡到文本编程。',
  },
  'faq-10.q': { id: 'Apakah SPI menggunakan AI dalam pembelajaran?', en: 'Does SPI use AI in its teaching?', zh: 'SPI 在教学中使用 AI 吗？' },
  'faq-10.a': {
    id: 'Ya. SPI membangun AI literacy sejak dini — siswa belajar berkolaborasi dengan AI sebagai alat yang mempercepat proses pembangunan solusi, sambil tetap menjadi perancang, pengarah, dan pengambil keputusan.',
    en: 'Yes. SPI builds AI literacy from an early age. Students learn to work with AI as a tool that speeds up building solutions, while remaining the designers, directors, and decision-makers.',
    zh: '是的。SPI 从小培养 AI 素养——学生学习把 AI 当作加快构建解决方案的工具，同时始终担任设计者、主导者和决策者。',
  },
  'faq-11.q': { id: 'Apakah siswa membuat project nyata?', en: 'Do students build real projects?', zh: '学生会做真实的项目吗？' },
  'faq-11.a': {
    id: 'Ya. Seluruh pembelajaran SPI berbasis Project-Based Learning. Siswa membangun solusi nyata — mulai dari IoT, game, aplikasi web, AI/ML, hingga sistem otomatisasi — yang dapat dijadikan portofolio dan presentasi.',
    en: 'Yes. All SPI learning is project-based. Students build real solutions — from IoT, games, and web apps to AI/ML and automation systems — that they can use for their portfolio and presentations.',
    zh: '是的。SPI 的所有学习都采用项目式学习。学生会构建真实的解决方案——从物联网、游戏、网页应用，到 AI/机器学习和自动化系统——并可用于作品集和展示。',
  },
  'faq-12.q': { id: 'Apakah SPI memiliki program untuk sekolah?', en: 'Does SPI offer programs for schools?', zh: 'SPI 有面向学校的课程吗？' },
  'faq-12.a': {
    id: 'Ya. SPI InSchool menghadirkan model implementasi Computational Thinking, AI literacy, dan programming yang disesuaikan dengan kebutuhan sekolah — tanpa harus mengubah kurikulum inti sekolah.',
    en: "Yes. SPI InSchool provides an implementation model for computational thinking, AI literacy, and programming tailored to each school's needs — without changing the school's core curriculum.",
    zh: '有。SPI 校园课程 (SPI InSchool) 提供根据学校需求定制的计算思维、AI 素养和编程实施方案，无需改变学校的核心课程。',
  },
  'faq-13.q': { id: 'Apa itu SPI InSchool?', en: 'What is SPI InSchool?', zh: '什么是 SPI 校园课程 (SPI InSchool)？' },
  'faq-13.a': {
    id: 'SPI InSchool bukan sekadar memindahkan kelas SPI ke sekolah. Program ini menghadirkan kurikulum terstruktur, pelatihan guru, project-based learning kontekstual, assessment, sertifikasi, dan kemitraan jangka panjang dengan institusi pendidikan.',
    en: 'SPI InSchool is more than moving SPI classes into a school. The program provides a structured curriculum, teacher training, contextual project-based learning, assessment, certification, and long-term partnerships with educational institutions.',
    zh: 'SPI 校园课程不只是把 SPI 的课堂搬进学校。该项目提供系统化课程、教师培训、情境化项目式学习、评估、认证，以及与教育机构的长期合作。',
  },
  'faq-14.q': {
    id: 'Bagaimana hubungan SPI Core, SPI Lab, SPI Engineering, dan SPI InSchool?',
    en: 'How do SPI Core, SPI Lab, SPI Engineering, and SPI InSchool fit together?',
    zh: 'SPI Core、SPI Lab、SPI Engineering 和 SPI InSchool 之间是什么关系？',
  },
  'faq-14.a': {
    id: 'Keempat produk membentuk ekosistem SPI: SPI Core sebagai fondasi berpikir dan teknologi, SPI Lab untuk teknologi sehari-hari, SPI Engineering untuk jalur profesional, dan SPI InSchool untuk membawa filosofi SPI ke sekolah. Setiap produk menjawab kebutuhan belajar yang berbeda.',
    en: "The four programs form the SPI ecosystem: SPI Core for thinking and technology foundations, SPI Lab for everyday technology, SPI Engineering for the professional pathway, and SPI InSchool for bringing SPI's philosophy into schools. Each program serves a different learning need.",
    zh: '这四个课程共同构成 SPI 学习生态：SPI 核心课程 (SPI Core) 奠定思维与科技基础，SPI 数字技能实验室 (SPI Lab) 聚焦日常科技应用，SPI 工程进阶课程 (SPI Engineering) 面向专业发展路径，SPI 校园课程 (SPI InSchool) 将 SPI 的理念带入学校。每个课程满足不同的学习需求。',
  },
  'faq-15.q': { id: 'Bagaimana cara mencoba atau mendaftar SPI?', en: 'How can I try or enroll in SPI?', zh: '如何试听或报名 SPI？' },
  'faq-15.a': {
    id: 'Anda dapat mengikuti kelas uji coba gratis 60 menit melalui tombol "Coba Kelas Gratis" di website, atau mendaftar kelas reguler melalui menu "Pendaftaran". Tim SPI akan menghubungi Anda untuk konsultasi jadwal dan program yang sesuai.',
    en: 'You can book a free 60-minute trial class with the "Try a Free Class" button on the website, or enroll in regular classes through the "Register" menu. The SPI team will contact you to discuss a suitable schedule and program.',
    zh: '您可以通过网站上的「免费试听课程」按钮预约 60 分钟免费试听课，或通过「注册报名」菜单报名常规课程。SPI 团队会与您联系，协助安排合适的时间和课程。',
  },
  'faq-16.q': { id: 'Bagaimana bisnis dapat bekerja sama dengan SPI?', en: 'How can a business partner with SPI?', zh: '企业如何与 SPI 合作？' },
  'faq-16.a': {
    id: 'SPI terbuka untuk kemitraan dengan bisnis, organisasi, dan institusi. Kunjungi halaman Kemitraan atau hubungi tim SPI melalui WhatsApp untuk membahas kolaborasi program, sponsorship, atau integrasi teknologi pendidikan.',
    en: 'SPI welcomes partnerships with businesses, organisations, and institutions. Visit the Partnership page or contact the SPI team on WhatsApp to discuss program collaboration, sponsorship, or education technology integration.',
    zh: 'SPI 欢迎与企业、组织和机构合作。请访问合作页面，或通过 WhatsApp 联系 SPI 团队，洽谈课程合作、赞助或教育科技整合。',
  },
  'faq-17.q': { id: 'Apa itu SPI Innovation Festival?', en: 'What is the SPI Innovation Festival?', zh: '什么是 SPI 创新节（SPI Innovation Festival）？' },
  'faq-17.a': {
    id: 'SPI Innovation Festival adalah ajang showcase inovasi teknologi siswa SPI — tempat siswa mempresentasikan project nyata, berkolaborasi, dan merayakan pencapaian. Festival direncanakan hadir di Jakarta, Surabaya, Malang, Solo, dan Yogyakarta. Status: segera hadir.',
    en: 'The SPI Innovation Festival is a showcase of SPI students’ technology innovations, where students present real projects, collaborate, and celebrate their achievements. The festival is planned for Jakarta, Surabaya, Malang, Solo, and Yogyakarta. Status: coming soon.',
    zh: 'SPI 创新节是展示 SPI 学生科技创新成果的活动，学生可以在这里展示真实项目、相互协作并庆祝成就。创新节计划在雅加达、泗水、玛琅、梭罗和日惹举办。状态：即将推出。',
  },
};
