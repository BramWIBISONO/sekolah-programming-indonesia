/**
 * Trilingual strings for homepage sections and shared UI.
 * Each key keeps id / en / zh side by side so every string is reviewed in all three languages.
 * Keys here are merged into the per-language dictionaries in LanguageContext.
 * Placeholders such as {n} or {period} are replaced at the call site.
 */
export type TriText = { id: string; en: string; zh: string };

export const sectionTranslations: Record<string, TriText> = {
  /* ---------- Shared CTAs ---------- */
  'cta.free_trial': { id: 'Coba Kelas Gratis', en: 'Try a Free Class', zh: '免费试听课程' },
  'common.learn_more': { id: 'Selengkapnya', en: 'Learn More', zh: '了解更多' },
  'common.register_now': { id: 'Daftar Sekarang', en: 'Register Now', zh: '立即报名' },
  'common.explore_programs': { id: 'Lihat Program', en: 'Explore Programs', zh: '查看课程' },

  /* ---------- Program names (approved terminology) ---------- */
  'prog.core.label': { id: 'SPI Core (Program Dasar Berpikir Komputasional)', en: 'SPI Core', zh: 'SPI 核心课程 (SPI Core)' },
  'prog.inschool.label': { id: 'SPI InSchool (Program Pembelajaran Teknologi di Sekolah)', en: 'SPI InSchool', zh: 'SPI 校园课程 (SPI InSchool)' },
  'prog.lab.label': { id: 'SPI Lab (Program Keterampilan Digital)', en: 'SPI Lab', zh: 'SPI 数字技能实验室 (SPI Lab)' },
  'prog.engineering.label': { id: 'SPI Engineering (Jalur Pembelajaran Teknologi Lanjutan)', en: 'SPI Engineering', zh: 'SPI 工程进阶课程 (SPI Engineering)' },
  'prog.core.purpose': { id: 'Fondasi berpikir komputasional dan programming.', en: 'Foundations in computational thinking and programming.', zh: '计算思维与编程的基础。' },
  'prog.lab.purpose': { id: 'Eksplorasi keterampilan digital, AI, kreativitas, produktivitas, dan eksperimen teknologi terapan.', en: 'Exploring digital skills, AI, creativity, productivity and applied technology experiments.', zh: '探索数字技能、AI、创意、效率和应用科技实验。' },
  'prog.engineering.purpose': { id: 'Jalur teknologi lanjutan melalui proyek dan sistem teknologi.', en: 'An advanced technology track through projects and technology systems.', zh: '通过项目和科技系统进阶的科技路径。' },
  'prog.inschool.purpose': { id: 'Kemitraan pembelajaran teknologi untuk sekolah dan institusi pendidikan.', en: 'Technology learning partnerships for schools and educational institutions.', zh: '面向学校和教育机构的科技学习合作。' },
  'prog.inschool.i1': { id: 'Kemitraan Sekolah', en: 'School Partnership', zh: '学校合作' },
  'prog.inschool.i2': { id: 'Integrasi Kurikulum', en: 'Curriculum Integration', zh: '课程整合' },
  'prog.inschool.i3': { id: 'Pelatihan Guru', en: 'Teacher Training', zh: '教师培训' },
  'prog.inschool.i4': { id: 'Program Ekstrakurikuler', en: 'After-School Program', zh: '课后项目' },
  'programs.title': { id: 'Program SPI', en: 'SPI Programs', zh: 'SPI 课程体系' },
  'programs.desc': {
    id: 'Pilih program yang paling sesuai dengan minat dan jenjang usia anak.',
    en: "Choose the program that best fits your child's interests and age.",
    zh: '根据孩子的兴趣和年龄，选择最合适的课程。',
  },

  /* ---------- Why SPI is different ---------- */
  'whyspi.eyebrow': { id: 'Keunggulan SPI', en: 'Why SPI', zh: '为什么选择 SPI' },
  'whyspi.title': { id: 'Mengapa SPI Berbeda?', en: 'What Makes SPI Different?', zh: 'SPI 的独特之处是什么？' },
  'whyspi.desc': {
    id: 'SPI bukan kursus coding biasa. Kami membangun ekosistem pendidikan teknologi yang mempersiapkan generasi AI-Native untuk berpikir, membangun, dan berinovasi.',
    en: 'SPI is not an ordinary coding course. We build a technology education ecosystem that prepares the AI-Native generation to think, build, and innovate.',
    zh: 'SPI 不是普通的编程课程。我们打造完整的科技教育生态，帮助 AI 原生一代学会思考、动手创造与创新。',
  },
  'whyspi.c1.title': { id: 'Think → Build → Innovate', en: 'Think → Build → Innovate', zh: 'Think → Build → Innovate' },
  'whyspi.c1.desc': {
    id: 'Pembelajaran dimulai dari cara berpikir, dilanjutkan kemampuan membangun solusi, hingga menghasilkan inovasi nyata.',
    en: 'Learning starts with how to think, continues with building solutions, and leads to real innovation.',
    zh: '学习从思维方式开始，进而培养构建解决方案的能力，最终实现真正的创新。',
  },
  'whyspi.c1.benefit': {
    id: 'Anak belajar memecahkan masalah, bukan sekadar menghafal sintaks.',
    en: 'Children learn to solve problems, not just memorise syntax.',
    zh: '孩子学会解决问题，而不只是背诵语法。',
  },
  'whyspi.c2.title': { id: 'Belajar Berbasis Proyek', en: 'Project-Based Learning', zh: '项目式学习' },
  'whyspi.c2.desc': {
    id: 'Setiap siswa membangun project nyata yang relevan, bukan sekadar latihan di layar.',
    en: 'Every student builds real, relevant projects rather than on-screen exercises alone.',
    zh: '每位学生都会完成真实且有意义的项目，而不仅仅是屏幕上的练习。',
  },
  'whyspi.c2.benefit': {
    id: 'Hasil belajar terlihat nyata dalam karya yang bisa ditunjukkan.',
    en: 'Progress is visible in work students can show.',
    zh: '学习成果体现在可以展示的作品中。',
  },
  'whyspi.c3.title': { id: 'Kurikulum AI-Native', en: 'AI-Native Curriculum', zh: 'AI 原生课程' },
  'whyspi.c3.desc': {
    id: 'Kurikulum dirancang untuk generasi yang berkolaborasi dengan AI sebagai alat, bukan hanya sebagai pengguna.',
    en: 'The curriculum is designed for a generation that works with AI as a tool, not merely as users.',
    zh: '课程专为将 AI 作为协作工具、而不仅是使用者的一代人而设计。',
  },
  'whyspi.c3.benefit': {
    id: 'Siap menghadapi studi dan dunia kerja yang dibentuk oleh AI.',
    en: 'Prepared for study and careers shaped by AI.',
    zh: '为受 AI 影响的学业与职业做好准备。',
  },
  'whyspi.c4.title': { id: 'Ekosistem Lengkap', en: 'A Complete Ecosystem', zh: '完整的学习生态' },
  'whyspi.c4.desc': {
    id: 'Empat produk dengan peran berbeda: Core untuk fondasi, Lab untuk eksplorasi digital, Engineering untuk teknologi lanjutan, dan InSchool untuk sekolah.',
    en: 'Four products with different roles: Core for foundations, Lab for digital exploration, Engineering for advanced technology, and InSchool for schools.',
    zh: '四个各有分工的产品：Core 打基础，Lab 做数字探索，Engineering 学进阶科技，InSchool 服务学校。',
  },
  'whyspi.c4.benefit': {
    id: 'Pilih produk sesuai kebutuhan, tanpa harus mengikuti urutan tertentu.',
    en: 'Choose the product that fits your needs, with no required order.',
    zh: '按需选择产品，无需遵循固定顺序。',
  },

  /* ---------- Why kids choose SPI (video) ---------- */
  'whykids.passion': {
    id: 'Lihat bagaimana siswa kami menemukan minat dan potensi mereka di SPI.',
    en: 'See how our students discover their interests and potential at SPI.',
    zh: '看看我们的学生如何在 SPI 发现自己的兴趣与潜能。',
  },

  /* ---------- Experience SPI ---------- */
  'experience.eyebrow': { id: 'Kenali SPI', en: 'Experience SPI', zh: '体验 SPI' },
  'experience.title': { id: 'Kenali Pengalaman Belajar di SPI', en: 'Explore the SPI Learning Experience', zh: '体验 SPI 的学习之旅' },
  'experience.desc': {
    id: 'Di SPI, belajar menjadi seru, interaktif, dan relevan dengan masa depan. Siswa membangun AI, membuat aplikasi, game, dan project nyata sejak dini.',
    en: 'At SPI, learning is fun, interactive, and relevant to the future. Students build AI, apps, games, and real projects from an early age.',
    zh: '在 SPI，学习有趣、互动且面向未来。学生从小就动手打造 AI、应用程序、游戏和真实项目。',
  },

  /* ---------- Learning experience steps ---------- */
  'learnexp.title': { id: 'Pengalaman Belajar di SPI', en: 'The SPI Learning Experience', zh: 'SPI 学习体验' },
  'learnexp.learn': { id: 'Belajar', en: 'Learn', zh: '学习' },
  'learnexp.learn_desc': {
    id: 'Memahami konsep dasar dan logika dengan metode yang menyenangkan.',
    en: 'Understand core concepts and logic through enjoyable methods.',
    zh: '通过有趣的方式理解基础概念与逻辑。',
  },
  'learnexp.practice': { id: 'Berlatih', en: 'Practice', zh: '练习' },
  'learnexp.practice_desc': {
    id: 'Mempraktikkan teori melalui latihan coding terstruktur.',
    en: 'Put theory into practice through structured coding exercises.',
    zh: '通过系统化的编程练习将理论付诸实践。',
  },
  'learnexp.apply': { id: 'Menerapkan', en: 'Apply', zh: '应用' },
  'learnexp.apply_desc': {
    id: 'Menerapkan skill untuk menyelesaikan masalah spesifik.',
    en: 'Apply skills to solve specific problems.',
    zh: '运用所学技能解决具体问题。',
  },
  'learnexp.innovate': { id: 'Berinovasi', en: 'Innovate', zh: '创新' },
  'learnexp.innovate_desc': {
    id: 'Menciptakan project atau produk baru yang bermanfaat nyata.',
    en: 'Create new projects or products with real-world value.',
    zh: '创造具有实际价值的新项目或产品。',
  },

  /* ---------- Computational thinking ---------- */
  'ct.eyebrow': { id: 'Filosofi Inti', en: 'Core Philosophy', zh: '核心理念' },

  /* ---------- Monthly special program ---------- */
  'monthly.heading': { id: 'PROGRAM SPESIAL BULAN INI', en: "THIS MONTH'S SPECIAL PROGRAM", zh: '本月特别课程' },
  'monthly.soon_title': { id: 'Program Spesial Bulan Ini Segera Hadir', en: 'A Special SPI Program Is Coming Soon', zh: 'SPI 特别课程即将推出' },
  'monthly.soon_desc': {
    id: 'Nantikan program eksklusif dari SPI yang tersedia dalam periode terbatas.',
    en: 'Stay tuned for exclusive SPI programs available for a limited time.',
    zh: '敬请期待 SPI 限时推出的专属课程。',
  },
  'monthly.featured_title': { id: 'Program Pilihan Bulan Ini', en: "This Month's Featured Program", zh: '本月精选课程' },
  'monthly.period_desc': {
    id: 'Program belajar pilihan SPI yang tersedia untuk periode {period}.',
    en: 'A featured SPI learning program available for {period}.',
    zh: 'SPI 精选学习课程，开放期间：{period}。',
  },
  'monthly.seats_left': { id: '{n} Sisa Kuota', en: '{n} seats left', zh: '剩余名额：{n}' },

  /* ---------- Video & carousel controls ---------- */
  'video.play': { id: 'Putar video', en: 'Play video', zh: '播放视频' },
  'video.watch': { id: 'Tonton Video', en: 'Watch Video', zh: '观看视频' },
  'common.previous': { id: 'Sebelumnya', en: 'Previous', zh: '上一个' },
  'common.next': { id: 'Berikutnya', en: 'Next', zh: '下一个' },

  /* ---------- Student projects ---------- */
  'projects.by': { id: 'Oleh {name}', en: 'By {name}', zh: '作者：{name}' },
  'projects.more': { id: 'Project Lainnya', en: 'More Projects', zh: '更多项目' },

  /* ---------- Classroom & mentors ---------- */
  'classroom.main_alt': {
    id: 'Suasana kelas teknologi SPI: siswa praktik coding bersama mentor',
    en: 'An SPI technology class: students practising coding with a mentor',
    zh: 'SPI 科技课堂：学生在导师指导下练习编程',
  },
  'mentor.role.coding': { id: 'Mentor Coding', en: 'Coding Mentor', zh: '编程导师' },

  /* ---------- Testimonials ---------- */
  'testi.student.eyebrow': { id: 'Suara Siswa', en: 'Student Voices', zh: '学生心声' },
  'testi.student.title': { id: 'Cerita Siswa SPI', en: 'SPI Student Stories', zh: 'SPI 学生故事' },
  'testi.student.desc': {
    id: 'Dengarkan langsung pengalaman belajar para siswa di SPI.',
    en: 'Hear directly from students about their learning experience at SPI.',
    zh: '听听学生们亲口讲述在 SPI 的学习经历。',
  },
  'testi.teacher.eyebrow': { id: 'Suara Guru & Sekolah', en: 'Teacher & School Voices', zh: '教师与学校心声' },
  'testi.teacher.title': { id: 'Kata Guru & Sekolah Mitra', en: 'What Teachers and Partner Schools Say', zh: '教师与合作学校的评价' },
  'testi.teacher.desc': {
    id: 'Pengalaman dari pendidik dan pimpinan sekolah yang telah bekerja sama dengan SPI.',
    en: 'Experiences from educators and school leaders who have worked with SPI.',
    zh: '来自与 SPI 合作的教育工作者和学校领导的分享。',
  },

  /* ---------- Find SPI near you ---------- */
  'find.heading': { id: 'Temukan SPI di Dekat Anda', en: 'Find SPI Near You', zh: '寻找您附近的 SPI' },
  'find.desc': {
    id: 'Temukan lokasi belajar dan peluang kemitraan Sekolah Programming Indonesia di wilayah Anda.',
    en: 'Explore Sekolah Programming Indonesia learning locations and partnership opportunities in your area.',
    zh: '查找您所在地区的印尼编程学校学习地点及合作机会。',
  },
  'find.open_maps': { id: 'Buka di Google Maps', en: 'Open in Google Maps', zh: '在 Google 地图中打开' },

  /* ---------- Closing CTA ---------- */
  'cta.ready_title': { id: 'Siap Membangun Masa Depan?', en: 'Ready to Build Your Future?', zh: '准备好创造你的未来了吗？' },
  'cta.ready_sub': { id: 'Ikuti kelas uji coba gratis hari ini.', en: 'Join a free trial class today.', zh: '今天就来参加免费试听课吧。' },
  'cta.mascot_alt': { id: 'Maskot SPI', en: 'SPI mascot', zh: 'SPI 吉祥物' },

  /* ---------- Hero floating cards ---------- */
  'hero.image_alt': { id: 'Siswa SPI belajar coding', en: 'SPI students learning to code', zh: 'SPI 学生正在学习编程' },
  'hero.card.assistant': { id: 'Asisten SPI', en: 'SPI Assistant', zh: 'SPI 助手' },
  'hero.card.assistant_sub': { id: 'Ada yang bisa dibantu, SPIvers?', en: 'How can I help you today, SPIvers?', zh: 'SPIvers，今天需要什么帮助？' },
  'hero.card.idea': { id: 'Proyek Nyata', en: 'Real Projects', zh: '真实项目' },
  'hero.card.idea_sub': { id: 'Dari ide menjadi karya', en: 'From idea to working project', zh: '从创意到成品' },
  'hero.card.cv': { id: 'Computer Vision', en: 'Computer Vision', zh: '计算机视觉' },
  'hero.card.cv_sub': { id: 'Deteksi Objek', en: 'Object Detection', zh: '目标检测' },

  /* ---------- Discover SPI / program recommendation ---------- */
  'common.back': { id: 'Kembali', en: 'Back', zh: '返回' },
  'disc.eyebrow': { id: 'Jelajahi SPI', en: 'Discover SPI', zh: '探索 SPI' },
  'disc.heading': { id: 'Bingung Memilih Program?', en: 'Not Sure Which Program to Choose?', zh: '不知道该选择哪个课程？' },
  'disc.desc': {
    id: 'Ceritakan kebutuhan Anda agar kami dapat merekomendasikan program yang paling sesuai.',
    en: 'Tell us about your needs so we can recommend the right program for you.',
    zh: '告诉我们您的需求，我们将为您推荐最合适的课程。',
  },
  'disc.interest.game': { id: 'Game', en: 'Games', zh: '游戏' },
  'disc.interest.coding': { id: 'Coding', en: 'Coding', zh: '编程' },
  'disc.interest.ai': { id: 'AI', en: 'AI', zh: '人工智能' },
  'disc.interest.robotics': { id: 'Robotik', en: 'Robotics', zh: '机器人' },
  'disc.badge': { id: 'Kreasi berikutnya dimulai di sini', en: 'Your next creation starts here', zh: '下一个创作从这里开始' },
  'disc.card_title': { id: 'Apa yang ingin kamu buat berikutnya?', en: 'What do you want to build next?', zh: '你接下来想做什么？' },
  'disc.card_desc': {
    id: 'Mulai langkah kecil menuju dunia ide, tools, dan proyek yang dibentuk dari hal yang ingin kamu ciptakan.',
    en: 'Take small steps into ideas, tools, and projects shaped by what you want to create.',
    zh: '从你想创造的东西出发，一步步探索创意、工具和项目。',
  },
  'disc.name_label': { id: 'Siapa namamu?', en: "What's your name?", zh: '你叫什么名字？' },
  'disc.name_placeholder': { id: 'Masukkan namamu', en: 'Enter your name', zh: '请输入你的名字' },
  'disc.back_name': { id: 'Kembali untuk mengganti nama', en: 'Back to change your name', zh: '返回修改名字' },
  'disc.q_eyebrow': { id: 'Eksplorasi Ide', en: 'Idea Exploration', zh: '创意探索' },
  'disc.step': { id: 'Langkah {n} dari {total}', en: 'Step {n} of {total}', zh: '第 {n} 步，共 {total} 步' },
  'disc.results_eyebrow': { id: 'Hasil Eksplorasi', en: 'Your Results', zh: '探索结果' },
  'disc.personalize': { id: 'Personalisasi', en: 'Personalise', zh: '个性化' },
  'disc.path_eyebrow': { id: 'Rekomendasi Jalur Belajar', en: 'Recommended Learning Path', zh: '推荐学习路径' },
  'disc.view_report': { id: 'Lihat Laporan Lengkap', en: 'View Full Report', zh: '查看完整报告' },

  /* ---------- Misc shared UI ---------- */
  'img.coming_soon': { id: 'Gambar segera hadir', en: 'Image coming soon', zh: '图片即将上线' },
  'chat.open': { id: 'Tanya Asisten SPI', en: 'Ask the SPI Assistant', zh: '询问 SPI 助手' },
  'chat.close': { id: 'Tutup obrolan', en: 'Close chat', zh: '关闭对话' },
  'chat.send': { id: 'Kirim pesan', en: 'Send message', zh: '发送消息' },
  'startspi.eyebrow': { id: 'Pengalaman SPI', en: 'SPI Experience', zh: 'SPI 体验' },
  'partners.desc_long': {
    id: 'Dipercaya oleh sekolah, institusi pendidikan, dan organisasi yang berkomitmen membangun generasi digital Indonesia.',
    en: "Trusted by schools, educational institutions, and organisations committed to building Indonesia's digital generation.",
    zh: '深受致力于培养印尼数字一代的学校、教育机构和组织的信赖。',
  },

  /* ---------- Program cards: audience and outcomes (based on the FAQ) ---------- */
  'programs.for': { id: 'Untuk', en: 'For', zh: '适合对象' },
  'programs.output': { id: 'Contoh hasil', en: 'Example outcomes', zh: '成果示例' },
  'programs.topics': { id: 'Contoh materi', en: 'Sample topics', zh: '学习内容示例' },
  'prog.core.audience': { id: 'Pemula, termasuk yang belum pernah belajar coding', en: 'Beginners, including those who have never coded', zh: '初学者，包括从未学过编程的学生' },
  'prog.core.output': { id: 'Game, aplikasi, dan proyek robotika', en: 'Games, apps, and robotics projects', zh: '游戏、应用程序和机器人项目' },
  'prog.lab.audience': { id: 'Siswa, orang tua, guru, dan profesional', en: 'Students, parents, teachers, and professionals', zh: '学生、家长、教师和职场人士' },
  'prog.lab.output': { id: 'Karya kreatif dan cara kerja yang lebih produktif dengan AI', en: 'Creative work and more productive workflows with AI', zh: '创意作品，以及借助 AI 更高效的工作方式' },
  'prog.engineering.audience': { id: 'Siswa yang ingin mendalami sistem teknologi tingkat lanjut', en: 'Students ready to go deeper into advanced technology systems', zh: '希望深入学习进阶科技系统的学生' },
  'prog.engineering.output': { id: 'Proyek AI, data, IoT, dan web berbasis kebutuhan nyata', en: 'AI, data, IoT, and web projects based on real needs', zh: '基于真实需求的 AI、数据、物联网和 Web 项目' },
  'prog.inschool.audience': { id: 'Sekolah dan institusi pendidikan', en: 'Schools and educational institutions', zh: '学校和教育机构' },
  'prog.inschool.output': { id: 'Program teknologi di sekolah, lengkap dengan pelatihan guru dan asesmen', en: 'Technology programs in school, with teacher training and assessment', zh: '校内科技项目，包含教师培训与评估' },
  'prog.inschool.cta': { id: 'Program untuk Sekolah', en: 'Programs for Schools', zh: '面向学校的项目' },

  /* ---------- Free Trial explainer (design.md 7.3) ---------- */
  'trial.eyebrow': { id: 'Kelas Gratis 60 Menit', en: '60-Minute Free Class', zh: '60 分钟免费试听课' },
  'trial.title': { id: 'Seperti Apa Kelas Gratis di SPI?', en: 'What Happens in a Free Class?', zh: 'SPI 免费试听课是什么样的？' },
  'trial.desc': {
    id: 'Kelas gratis terbuka untuk siswa yang belum pernah belajar coding maupun yang sudah pernah. Berikut alurnya.',
    en: 'The free class is open to students who have never coded and to those who already have some experience. Here is how it works.',
    zh: '免费试听课面向从未学过编程的学生，也欢迎已有基础的学生。流程如下：',
  },
  'trial.s1.title': { id: 'Isi formulir singkat', en: 'Fill in a short form', zh: '填写简短表格' },
  'trial.s1.desc': {
    id: 'Isi data orang tua dan siswa. Tim SPI akan menghubungi Anda untuk menentukan jadwal.',
    en: 'Enter the parent and student details. The SPI team will contact you to arrange a time.',
    zh: '填写家长和学生信息，SPI 团队会与您联系安排时间。',
  },
  'trial.s2.title': { id: 'Sesi 60 menit bersama mentor', en: 'A 60-minute session with a mentor', zh: '与导师进行 60 分钟课程' },
  'trial.s2.desc': {
    id: 'Mentor mengenali minat dan kemampuan awal anak melalui aktivitas langsung.',
    en: "The mentor gets to know your child's interests and starting level through hands-on activities.",
    zh: '导师通过动手活动了解孩子的兴趣和起点水平。',
  },
  'trial.s3.title': { id: 'Mencoba membuat proyek pertama', en: 'Try building a first project', zh: '尝试完成第一个项目' },
  'trial.s3.desc': {
    id: 'Anak langsung praktik membuat proyek teknologi sederhana, bukan hanya mendengarkan materi.',
    en: 'Your child builds a simple technology project instead of only listening to a lesson.',
    zh: '孩子亲手完成一个简单的科技项目，而不只是听讲。',
  },
  'trial.s4.title': { id: 'Konsultasi program', en: 'Program advice', zh: '课程咨询' },
  'trial.s4.desc': {
    id: 'Setelah sesi, tim SPI membantu memilih program dan jalur belajar yang sesuai.',
    en: 'After the session, the SPI team helps you choose a suitable program and learning path.',
    zh: '课程结束后，SPI 团队会协助您选择合适的课程和学习路径。',
  },
  'trial.ask': { id: 'Tanya dulu lewat WhatsApp', en: 'Ask us on WhatsApp first', zh: '先通过 WhatsApp 咨询' },
  'trial.image_alt': { id: 'Suasana belajar di SPI', en: 'Learning at SPI', zh: 'SPI 的学习场景' },

  /* ---------- Think → Build → Innovate in practice (design.md 6.7) ---------- */
  'method.eyebrow': { id: 'Metode Belajar', en: 'How Students Learn', zh: '学习方法' },
  'method.title': { id: 'Think → Build → Innovate dalam Praktik', en: 'Think → Build → Innovate in Practice', zh: 'Think → Build → Innovate 的实践' },
  'method.desc': {
    id: 'Begini cara siswa SPI mengerjakan sebuah proyek, dari memahami masalah sampai memperbaiki karyanya.',
    en: 'This is how SPI students work through a project, from understanding the problem to improving their work.',
    zh: '这是 SPI 学生完成一个项目的方式：从理解问题，到不断改进作品。',
  },
  'method.think.title': { id: 'Think', en: 'Think', zh: 'Think 思考' },
  'method.think.b1': { id: 'Memahami kebutuhan atau masalah.', en: 'Understand the need or problem.', zh: '理解需求或问题。' },
  'method.think.b2': { id: 'Memecah masalah menjadi bagian yang lebih kecil.', en: 'Break the problem into smaller parts.', zh: '把问题拆分成更小的部分。' },
  'method.think.b3': { id: 'Mengenali pola dan membuat rencana.', en: 'Spot patterns and make a plan.', zh: '发现规律并制定计划。' },
  'method.think.b4': { id: 'Menjelaskan alasan di balik solusi.', en: 'Explain the reasoning behind the solution.', zh: '说明解决方案背后的理由。' },
  'method.build.title': { id: 'Build', en: 'Build', zh: 'Build 构建' },
  'method.build.b1': { id: 'Membuat solusi dengan alat yang sesuai.', en: 'Build a solution with the right tools.', zh: '用合适的工具构建解决方案。' },
  'method.build.b2': { id: 'Menulis kode atau menyusun sistem.', en: 'Write code or assemble a system.', zh: '编写代码或搭建系统。' },
  'method.build.b3': { id: 'Menguji apakah solusi bekerja.', en: 'Test whether the solution works.', zh: '测试方案是否有效。' },
  'method.build.b4': { id: 'Menemukan dan memperbaiki kesalahan.', en: 'Find and fix mistakes.', zh: '发现并修正错误。' },
  'method.innovate.title': { id: 'Innovate', en: 'Innovate', zh: 'Innovate 创新' },
  'method.innovate.b1': { id: 'Mengevaluasi hasil.', en: 'Evaluate the result.', zh: '评估结果。' },
  'method.innovate.b2': { id: 'Memperbaiki berdasarkan pengujian.', en: 'Improve it based on testing.', zh: '根据测试结果进行改进。' },
  'method.innovate.b3': { id: 'Menambahkan ide atau fungsi yang relevan.', en: 'Add relevant ideas or features.', zh: '加入相关的新想法或功能。' },
  'method.innovate.b4': { id: 'Menjelaskan manfaat karya dan apa yang dipelajari.', en: 'Explain what the work does and what was learned.', zh: '说明作品的作用以及学到了什么。' },
  'method.example.title': { id: 'Contoh: Pet Feeder karya Julius', en: "Example: Julius's pet feeder", zh: '示例：Julius 的宠物喂食器' },
  'method.example.badge': { id: 'Ilustrasi cara kerja', en: 'How-it-works illustration', zh: '工作原理示意' },
  'method.example.think': { id: 'Apa yang perlu terjadi saat hamster mendekat?', en: 'What should happen when the hamster comes close?', zh: '仓鼠靠近时，应该发生什么？' },
  'method.example.build': { id: 'Buat feeder merespons.', en: 'Make the feeder respond.', zh: '让喂食器做出反应。' },
  'method.example.innovate': { id: 'Amati apakah responsnya sesuai.', en: 'Check whether the response is right.', zh: '观察反应是否符合预期。' },
  'method.example.cta': { id: 'Lihat karya siswa', en: 'See student work', zh: '查看学生作品' },

  /* ---------- Closing CTA split by audience (design.md 6.13) ---------- */
  'cta.parents_label': { id: 'Untuk orang tua & siswa', en: 'For parents & students', zh: '面向家长与学生' },
  'cta.parents_title': {
    id: 'Mulai dari rasa ingin tahu, lanjutkan dengan karya nyata.',
    en: 'Start with curiosity. Continue with real work.',
    zh: '从好奇心出发，用真实作品继续前进。',
  },
  'cta.schools_label': { id: 'Untuk sekolah & institusi', en: 'For schools & institutions', zh: '面向学校与机构' },
  'cta.schools_title': {
    id: 'Bangun pengalaman belajar teknologi yang relevan bersama SPI.',
    en: 'Build relevant technology learning experiences with SPI.',
    zh: '与 SPI 一起打造贴合需求的科技学习体验。',
  },
  'cta.schools_button': { id: 'Diskusikan Kerja Sama', en: 'Discuss a Partnership', zh: '洽谈合作' },

  /* ---------- Why SPI: flow captions ---------- */
  'whyspi.flow.think': { id: 'Pahami masalahnya.', en: 'Understand the problem.', zh: '理解问题。' },
  'whyspi.flow.build': { id: 'Wujudkan solusinya.', en: 'Build the solution.', zh: '实现解决方案。' },
  'whyspi.flow.innovate': { id: 'Uji dan kembangkan karyanya.', en: 'Test and improve the work.', zh: '测试并改进作品。' },

  /* ---------- Program levels (card badges) ---------- */
  'prog.core.level': { id: 'Fondasi', en: 'Foundation', zh: '基础' },
  'prog.lab.level': { id: 'Keterampilan Digital', en: 'Digital Skills', zh: '数字技能' },
  'prog.engineering.level': { id: 'Lanjutan', en: 'Advanced', zh: '进阶' },
  'prog.inschool.level': { id: 'Untuk Sekolah', en: 'For Schools', zh: '面向学校' },

  // Student projects (editorial showcase)
  'projects.eyebrow': { id: 'Karya Siswa', en: 'Student Work', zh: '学生作品' },
  'projects.choose': { id: 'Pilih karya', en: 'Choose a project', zh: '选择作品' },
  'projects.keyboard_hint': { id: 'Gunakan tombol panah untuk berpindah karya.', en: 'Use the arrow keys to switch projects.', zh: '使用方向键切换作品。' },
  'projects.challenge': { id: 'Tantangan', en: 'Challenge', zh: '挑战' },
  'projects.thinking': { id: 'Cara berpikir', en: 'Thinking process', zh: '思考过程' },
  'projects.result': { id: 'Hasil', en: 'Result', zh: '成果' },
  'projects.details': { id: 'Lihat detail teknologi & kompetensi', en: 'See technology & skills', zh: '查看技术与能力' },
  'projects.tech': { id: 'Teknologi', en: 'Technology', zh: '技术' },
  'projects.skills': { id: 'Kompetensi', en: 'Skills', zh: '能力' },
  'projects.item.proj-nicholas': { id: 'Sistem Manajemen Stok dengan Python', en: 'Stock Management System in Python', zh: 'Python 库存管理系统' },
  'projects.item.proj-natanael': { id: 'Pintu Otomatis dengan Arduino & mBlock', en: 'Automatic Door with Arduino & mBlock', zh: 'Arduino 与 mBlock 自动门' },
  'projects.item.proj-nicolas-minesweeper': { id: 'Game Minesweeper dengan Python & Tkinter', en: 'Minesweeper Game with Python & Tkinter', zh: 'Python 与 Tkinter 扫雷游戏' },
  'projects.item.proj-smart-alarm': { id: 'Sistem Alarm Pintar dengan Arduino & mBlock', en: 'Smart Alarm System with Arduino & mBlock', zh: 'Arduino 与 mBlock 智能报警系统' },
  'projects.item.proj-kevin': { id: 'Web App dengan Login & Sign Up', en: 'Web App with Login & Sign Up', zh: '带登录与注册的网页应用' },
  'projects.item.proj-kathy': { id: 'Aplikasi Film ala Netflix dengan MIT App Inventor', en: 'Netflix-Style Movie App with MIT App Inventor', zh: 'MIT App Inventor 仿 Netflix 电影应用' },
  'projects.item.proj-nicolas-tank': { id: 'Tank Robot dengan Arduino & mBlock', en: 'Robot Tank with Arduino & mBlock', zh: 'Arduino 与 mBlock 机器人坦克' },
  'projects.item.proj-grisson': { id: 'Aplikasi Catatan, Juara 2 Nasional', en: 'Notes App, 2nd Place Nationally', zh: '笔记应用，全国第二名' },
  'projects.item.proj-larry': { id: 'Tempat Sampah Pintar dengan Arduino & mBlock', en: 'Smart Trash Can with Arduino & mBlock', zh: 'Arduino 与 mBlock 智能垃圾桶' },
  'projects.item.proj-nala': { id: 'Pet Feeder Pintar dengan Arduino & mBlock', en: 'Smart Pet Feeder with Arduino & mBlock', zh: 'Arduino 与 mBlock 智能宠物喂食器' },
  'projects.item.proj-richard': { id: 'AI Prediksi Risiko Kredit', en: 'AI That Predicts Credit Risk', zh: '预测信用风险的 AI' },
  'projects.item.proj-gracia': { id: 'Sistem Parkir dengan Python', en: 'Parking System in Python', zh: 'Python 停车系统' },

  // Program cards + navbar dropdown (short one-liners)
  'programs.eyebrow': { id: 'Pilihan Program', en: 'Programs', zh: '课程选择' },
  'prog.core.menu': { id: 'Fondasi berpikir dan coding.', en: 'Foundations in thinking and coding.', zh: '思维与编程基础。' },
  'prog.lab.menu': { id: 'Keterampilan digital praktis.', en: 'Practical digital skills.', zh: '实用数字技能。' },
  'prog.engineering.menu': { id: 'Proyek teknologi lanjutan.', en: 'Advanced technology projects.', zh: '进阶科技项目。' },
  'prog.inschool.menu': { id: 'Program teknologi untuk sekolah.', en: 'Technology programs for schools.', zh: '面向学校的科技课程。' },

  // Method example: Julius's pet feeder (only verified fact: it opens when the hamster comes close)
  'method.example.fact': {
    id: 'Yang terlihat di video: pet feeder terbuka ketika hamster mendekat.',
    en: 'What the video shows: the pet feeder opens when the hamster comes close.',
    zh: '视频中可以看到：仓鼠靠近时，宠物喂食器会打开。',
  },
  'method.example.video_title': { id: 'Pet Feeder karya Julius Christiano Go', en: 'Pet feeder by Julius Christiano Go', zh: 'Julius Christiano Go 的宠物喂食器' },
  'method.example.credit': {
    id: 'Mini project oleh Julius Christiano Go · Kanal YouTube Sekolah Programming Indonesia',
    en: 'Mini project by Julius Christiano Go · Sekolah Programming Indonesia YouTube channel',
    zh: '迷你项目作者：Julius Christiano Go · Sekolah Programming Indonesia YouTube 频道',
  },
  'method.example.replay': { id: 'Putar ulang', en: 'Replay', zh: '重播' },
  'method.example.scene_alt': {
    id: 'Ilustrasi: hamster mendekat, lalu pet feeder terbuka.',
    en: 'Illustration: the hamster comes close, then the pet feeder opens.',
    zh: '示意：仓鼠靠近后，宠物喂食器打开。',
  },

  // Product gallery (four independent products) and learning philosophy (Think → Build → Innovate)
  'products.eyebrow': { id: 'Empat produk, satu ekosistem', en: 'Four products, one ecosystem', zh: '四个产品，一个生态' },
  'products.title': { id: 'Jelajahi Produk SPI', en: 'Explore SPI Products', zh: '了解 SPI 产品' },
  'products.desc': {
    id: 'Setiap produk punya peran dan audiens yang berbeda. Pilih sesuai kebutuhan, tidak harus berurutan.',
    en: 'Each product has its own role and audience. Choose what fits your needs; there is no required order.',
    zh: '每个产品都有不同的定位和对象。按需选择即可，无需按顺序学习。',
  },
  'products.explore': { id: 'Jelajahi {name}', en: 'Explore {name}', zh: '了解 {name}' },
  'phil.eyebrow': { id: 'Filosofi belajar', en: 'Learning philosophy', zh: '学习理念' },
  'phil.desc': {
    id: 'Di setiap produk SPI, belajar bergerak dari pertanyaan menjadi karya melalui Think → Build → Innovate.',
    en: 'In every SPI product, learning moves from a question to a creation through Think → Build → Innovate.',
    zh: '在每个 SPI 产品中，学习都通过 Think → Build → Innovate，从问题走向作品。',
  },
  'phil.think': {
    id: 'Memahami masalah, mengenali pola, memecah masalah, dan menyusun rencana.',
    en: 'Understand the problem, spot patterns, break it down and make a plan.',
    zh: '理解问题、发现规律、拆解问题并制定计划。',
  },
  'phil.build': {
    id: 'Mewujudkan ide menjadi program, prototipe, aplikasi, eksperimen, atau solusi sesuai konteks.',
    en: 'Turn the idea into a program, prototype, app, experiment or solution that fits the context.',
    zh: '把想法变成符合情境的程序、原型、应用、实验或解决方案。',
  },
  'phil.innovate': {
    id: 'Mengevaluasi hasil, memperbaiki karya, dan menjelaskan apa yang dipelajari.',
    en: 'Evaluate the result, improve the work and explain what was learned.',
    zh: '评估结果、改进作品，并说明学到了什么。',
  },
  'phil.loop': { id: 'Diulang dengan pertanyaan baru', en: 'Repeated with a new question', zh: '带着新问题再次循环' },
  'phil.products_note': {
    id: 'Cara belajar ini dipakai di keempat produk SPI.',
    en: 'This way of learning is used across all four SPI products.',
    zh: '这种学习方式贯穿 SPI 的全部四个产品。',
  },

  // Curriculum explorer (homepage, under the product cards)
  'cur.title': { id: 'Kurikulum SPI', en: 'SPI Curriculum', zh: 'SPI 课程内容' },
  'cur.desc': {
    id: 'Lihat apa saja yang dipelajari di setiap produk SPI.',
    en: 'See what is covered in each SPI product.',
    zh: '了解每个 SPI 产品的学习内容。',
  },
  'cur.detail': { id: 'Lihat detail', en: 'View details', zh: '查看详情' },
  'cur.soon': { id: 'Segera hadir', en: 'Coming soon', zh: '即将推出' },

  // Why coding & AI now
  'whycode.eyebrow': { id: 'Mengapa sekarang', en: 'Why now', zh: '为什么是现在' },
  'whycode.title': {
    id: 'Mengapa Coding dan AI Penting untuk Generasi Sekarang?',
    en: 'Why Do Coding and AI Matter for Children Today?',
    zh: '为什么编程和 AI 对这一代孩子如此重要？',
  },
  'whycode.image_alt': { id: 'Siswa dan mentor SPI belajar bersama', en: 'SPI students and a mentor learning together', zh: 'SPI 学生与导师一起学习' },
  'whycode.creator.title': { id: 'Dari pengguna menjadi pencipta', en: 'From users to creators', zh: '从使用者到创造者' },
  'whycode.creator.desc': {
    id: 'Anak-anak sudah akrab dengan gawai, game, dan aplikasi. Coding mengubah peran mereka: dari sekadar memakai teknologi menjadi merancang dan membuat solusinya sendiri, mulai dari game sederhana sampai alat yang membantu orang di sekitarnya.',
    en: 'Children already know phones, games and apps. Coding changes their role: from simply using technology to designing and building their own solutions, from simple games to tools that help the people around them.',
    zh: '孩子们早已熟悉手机、游戏和应用。学习编程能改变他们的角色：从单纯使用科技，转变为设计和制作自己的解决方案，从简单游戏到帮助身边人的工具。',
  },
  'whycode.ainative.title': { id: 'Generasi AI-Native', en: 'The AI-native generation', zh: 'AI 原生一代' },
  'whycode.ainative.desc': {
    id: 'AI kini hadir di sekolah, pekerjaan, dan kehidupan sehari-hari. Anak perlu memahami cara kerjanya, menulis instruksi yang jelas, memeriksa hasilnya, dan memakainya dengan bertanggung jawab, bukan hanya menerima jawabannya.',
    en: 'AI is now part of school, work and daily life. Children need to understand how it works, give clear instructions, check its output and use it responsibly, not just accept its answers.',
    zh: 'AI 已经出现在学校、工作和日常生活中。孩子需要理解它如何运作、给出清晰的指令、核查结果，并负责任地使用它，而不是只接受它的答案。',
  },
  'whycode.thinking.title': { id: 'Cara berpikir yang terpakai di mana saja', en: 'A way of thinking that goes everywhere', zh: '处处用得上的思维方式' },
  'whycode.thinking.desc': {
    id: 'Computational thinking melatih anak memecah masalah, mengenali pola, dan menyusun langkah. Kemampuan ini berguna di matematika, sains, bisnis, hingga seni, bukan hanya di dunia pemrograman.',
    en: 'Computational thinking teaches children to break problems down, spot patterns and plan steps. It helps in maths, science, business and the arts, not only in programming.',
    zh: '计算思维训练孩子拆解问题、发现规律、规划步骤。这种能力在数学、科学、商业乃至艺术中都有用，而不只是在编程领域。',
  },
  'whycode.future.title': { id: 'Setiap bidang bersentuhan dengan teknologi', en: 'Every field now involves technology', zh: '每个领域都离不开科技' },
  'whycode.future.desc': {
    id: 'Dari kesehatan, keuangan, hingga musik, banyak profesi kini memakai data, otomasi, dan AI. Fondasi coding sejak dini memberi anak lebih banyak pilihan untuk masa depannya.',
    en: 'From healthcare and finance to music, many professions now rely on data, automation and AI. An early foundation in coding gives children more choices for their future.',
    zh: '从医疗、金融到音乐，许多职业都在使用数据、自动化和 AI。尽早打下编程基础，能为孩子的未来带来更多选择。',
  },

  // Achievements carousel (homepage)
  'ach.eyebrow': { id: 'Prestasi', en: 'Achievements', zh: '成就' },
  'ach.all': { id: 'Lihat semua prestasi', en: 'See all achievements', zh: '查看全部成就' },
  'ach.level.international': { id: 'Internasional', en: 'International', zh: '国际' },
  'ach.level.national': { id: 'Nasional', en: 'National', zh: '全国' },
  'ach.wrc.desc': {
    id: 'SPI Jakarta Barat meraih peringkat 1 School Rank dengan skor total 1.490.',
    en: 'SPI Jakarta Barat ranked #1 in the School Rank with a total score of 1,490.',
    zh: 'SPI 西雅加达校区以 1,490 的总分获得学校排名第 1。',
  },
  'ach.icode.desc': {
    id: 'SPI Jakarta meraih peringkat 2 School Rank dengan skor total 3.363.',
    en: 'SPI Jakarta ranked #2 in the School Rank with a total score of 3,363.',
    zh: 'SPI 雅加达校区以 3,363 的总分获得学校排名第 2。',
  },

  // Portfolio cards + dialog
  'pf.title': { id: 'Portofolio Proyek Siswa', en: 'Student Project Portfolio', zh: '学生项目作品集' },
  'pf.desc': {
    id: 'Klik sebuah karya untuk melihat ceritanya.',
    en: 'Click a project to see its story.',
    zh: '点击作品查看它的故事。',
  },
  'csr.nav': { id: 'CSR SPI', en: 'SPI CSR', zh: 'SPI 社会责任' },
  'csr.menu_desc': { id: 'Kegiatan tanggung jawab sosial SPI.', en: 'SPI social responsibility activities.', zh: 'SPI 的社会责任活动。' },
  'csr.eyebrow': { id: 'CSR SPI', en: 'SPI CSR', zh: 'SPI 社会责任' },
  'csr.title': { id: 'Kegiatan CSR SPI', en: 'SPI CSR activities', zh: 'SPI 社会责任活动' },
  'csr.desc': {
    id: 'Kegiatan tanggung jawab sosial SPI akan dibagikan di halaman ini.',
    en: 'SPI social responsibility activities will be shared on this page.',
    zh: 'SPI 的社会责任活动将在本页分享。',
  },
  'csr.status': { id: 'Halaman sedang dalam pemeliharaan', en: 'This page is under maintenance', zh: '本页面正在维护中' },
  'csr.status_desc': {
    id: 'Konten CSR sedang kami siapkan. Sambil menunggu, pertanyaan tentang kegiatan sosial SPI bisa langsung ditanyakan lewat WhatsApp.',
    en: 'We are preparing the CSR content. In the meantime, questions about SPI social activities can be asked on WhatsApp.',
    zh: '我们正在准备 CSR 内容。在此期间，可以通过 WhatsApp 咨询 SPI 的社会活动。',
  },
  'csr.wa': { id: 'Tanya lewat WhatsApp', en: 'Ask on WhatsApp', zh: '通过 WhatsApp 咨询' },
  'csr.wa_message': {
    id: 'Halo SPI, saya ingin tahu tentang kegiatan CSR SPI.',
    en: 'Hello SPI, I would like to know about SPI CSR activities.',
    zh: '您好 SPI，我想了解 SPI 的社会责任活动。',
  },
  'csr.partner_link': { id: 'Lihat halaman Kemitraan', en: 'See the Partnership page', zh: '查看合作页面' },
  'ail.register.cta': { id: 'Join Gerakan AI Literacy', en: 'Join the AI Literacy Movement', zh: '加入 AI 素养运动' },
  'acara.register': { id: 'Daftar AI Literacy', en: 'Register for AI Literacy', zh: '报名 AI 素养活动' },
  'popup.count': { id: '{n} dari {total} info penting', en: '{n} of {total} important updates', zh: '第 {n} 条，共 {total} 条重要信息' },
  'popup.swipe': { id: 'Geser atau tekan panah untuk melihat info lainnya', en: 'Swipe or tap the arrows to see more', zh: '滑动或点击箭头查看更多' },
  'promo.eyebrow': { id: 'Promo pendaftaran', en: 'Registration promo', zh: '报名优惠' },
  'promo.title': { id: 'Promo spesial dari SPI, khusus untukmu!', en: 'A special offer from SPI, just for you!', zh: 'SPI 专属优惠，只为你准备！' },
  'promo.badge': { id: 'Potongan pendaftaran', en: 'Registration discount', zh: '报名减免' },
  'promo.before': { id: 'Sebelumnya', en: 'Before', zh: '之前' },
  'promo.now': { id: 'Sekarang', en: 'Now', zh: '现在' },
  'promo.valid': { id: 'Berlaku sampai 10 November 2026', en: 'Valid until 10 November 2026', zh: '优惠有效期至 2026 年 11 月 10 日' },
  'promo.terms': {
    id: 'Syarat dan ketentuan bisa ditanyakan langsung ke tim SPI.',
    en: 'You can ask the SPI team about the terms and conditions directly.',
    zh: '如需了解条款，可直接咨询 SPI 团队。',
  },
  'promo.claim': { id: 'Klaim promo', en: 'Claim the offer', zh: '领取优惠' },
  'promo.wa': { id: 'Tanya dulu lewat WhatsApp', en: 'Ask on WhatsApp first', zh: '先通过 WhatsApp 咨询' },
  'promo.wa_message': {
    id: 'Halo SPI, saya ingin tahu lebih lanjut tentang promo potongan biaya pendaftaran sampai 10 November.',
    en: 'Hello SPI, I would like to know more about the registration fee promo until 10 November.',
    zh: '您好 SPI，我想进一步了解截至 11 月 10 日的报名费优惠。',
  },
  'promo.save': { id: 'Hemat Rp 250.000', en: 'Save Rp 250,000', zh: '节省 Rp 250.000' },
  'promo.days_unit': { id: 'hari lagi', en: 'days left', zh: '天' },
  'promo.today': { id: 'Hari ini hari terakhir', en: 'Today is the last day', zh: '今天是最后一天' },
  'blog.list.eyebrow': { id: 'Blog SPI', en: 'SPI Blog', zh: 'SPI 博客' },
  'blog.list.title': {
    id: 'Tulisan tentang coding, AI-native, dan cara belajar anak',
    en: 'Writing on coding, AI-native learning and how children learn',
    zh: '关于编程、AI 原生与儿童学习方式的文章',
  },
  'blog.list.desc': {
    id: 'Artikel dari tim SPI untuk orang tua, guru, dan siapa saja yang ingin memahami coding dan AI.',
    en: 'Articles from the SPI team for parents, teachers, and anyone who wants to understand coding and AI.',
    zh: '来自 SPI 团队的文章，写给家长、老师，以及所有想了解编程与 AI 的人。',
  },
  'blog.list.search': { id: 'Cari artikel...', en: 'Search articles...', zh: '搜索文章...' },
  'blog.list.search_label': { id: 'Cari artikel', en: 'Search articles', zh: '搜索文章' },
  'blog.list.category': { id: 'Kategori', en: 'Category', zh: '分类' },
  'blog.list.all': { id: 'Semua kategori', en: 'All categories', zh: '全部分类' },
  'blog.list.count': { id: '{n} artikel', en: '{n} articles', zh: '{n} 篇文章' },
  'blog.list.empty': {
    id: 'Tidak ada artikel yang cocok. Coba kata kunci atau kategori lain.',
    en: 'No articles match. Try another keyword or category.',
    zh: '没有匹配的文章，请尝试其他关键词或分类。',
  },
  'blog.list.read_time': { id: '{n} menit baca', en: '{n} min read', zh: '阅读约 {n} 分钟' },
  'blog.list.page': { id: 'Halaman {n}', en: 'Page {n}', zh: '第 {n} 页' },
  'blog.list.pagination': { id: 'Halaman artikel', en: 'Article pages', zh: '文章分页' },
  'acara.nav': { id: 'Acara', en: 'Events', zh: '活动' },
  'acara.menu_desc': { id: 'Jadwal pembukaan dan kegiatan dari SPI.', en: 'Openings and activities from SPI.', zh: 'SPI 的开幕与各类活动。' },
  'acara.eyebrow': { id: 'Acara SPI', en: 'SPI Events', zh: 'SPI 活动' },
  'acara.title': { id: 'Ikuti Workshop dan Gerakan SPI', en: 'Join SPI workshops and movements', zh: '参加 SPI 的工作坊与运动' },
  'acara.desc': {
    id: 'Workshop online gratis dan Gerakan AI Literacy Indonesia, lengkap dengan jadwal dan cara daftarnya. Tautan Zoom dan info keikutsertaan dikirim ke kontak yang didaftarkan.',
    en: 'Free online workshops and the AI Literacy Indonesia movement, with schedules and how to register. Zoom links and participation details are sent to the contact you register with.',
    zh: '免费线上工作坊与 AI Literacy Indonesia 运动，附有活动安排和报名方式。Zoom 链接和参与信息将发送到您报名时填写的联系方式。',
  },
  'acara.upcoming': { id: 'Acara mendatang', en: 'Upcoming events', zh: '即将举行的活动' },
  'acara.past': { id: 'Acara sebelumnya', en: 'Past events', zh: '往期活动' },
  'acara.empty': {
    id: 'Belum ada acara terjadwal. Pantau halaman ini, atau hubungi SPI lewat WhatsApp untuk informasi terbaru.',
    en: 'No events are scheduled yet. Check back here, or contact SPI on WhatsApp for the latest information.',
    zh: '暂无已排期的活动。请留意本页，或通过 WhatsApp 联系 SPI 获取最新信息。',
  },
  'acara.wa': { id: 'Tanya lewat WhatsApp', en: 'Ask on WhatsApp', zh: '通过 WhatsApp 咨询' },
  'acara.wa_message': {
    id: 'Halo SPI, saya ingin bertanya tentang acara SPI.',
    en: 'Hello SPI, I would like to ask about SPI events.',
    zh: '您好 SPI，我想咨询 SPI 的活动。',
  },
  'acara.more': { id: 'Info lengkap', en: 'More info', zh: '了解详情' },
  'acara.form_open': { id: 'Daftar workshop', en: 'Register for the workshop', zh: '报名工作坊' },
  'acara.form_close': { id: 'Tutup formulir', en: 'Close the form', zh: '关闭表单' },
  'acara.form_newtab': { id: 'Buka formulir di tab baru', en: 'Open the form in a new tab', zh: '在新标签页打开表单' },
  'acara.form_title': { id: 'Formulir pendaftaran workshop', en: 'Workshop registration form', zh: '工作坊报名表' },
  'acara.schedule': { id: 'Jadwal workshop', en: 'Workshop schedule', zh: '工作坊安排' },
  'acara.featured': { id: 'Acara utama', en: 'Main event', zh: '主要活动' },
  'acara.more_upcoming': { id: 'Acara mendatang lainnya', en: 'More upcoming events', zh: '更多即将举行的活动' },
  'acara.ongoing': { id: 'Sedang berlangsung', en: 'Happening now', zh: '进行中' },
  'acara.days_unit': { id: 'hari lagi', en: 'days to go', zh: '天后' },
  'acara.back_to_list': { id: 'Kembali ke halaman Acara', en: 'Back to events', zh: '返回活动页' },
  'pf.flow.eyebrow': { id: 'Langkah berikutnya', en: 'Next step', zh: '下一步' },
  'pf.flow.step1_title': { id: 'Pilih minat anak', en: "Choose your child's interest", zh: '选择孩子的兴趣' },
  'pf.flow.step1_desc': {
    id: 'Dari Preschool, Core, Lab, Engineering, sampai InSchool, pilih jalur yang sesuai.',
    en: 'From Preschool and Core to Lab, Engineering and InSchool, pick the pathway that fits.',
    zh: '从 Preschool、Core、Lab、Engineering 到 InSchool，选择适合的学习路径。',
  },
  'pf.flow.step2_title': { id: 'Ikuti kelas coba gratis', en: 'Join a free trial class', zh: '参加免费试听课' },
  'pf.flow.step2_desc': {
    id: 'Sesi 60 menit bersama mentor SPI, tanpa biaya.',
    en: 'A 60-minute session with an SPI mentor, at no cost.',
    zh: '与 SPI 导师一起的 60 分钟课程，免费参加。',
  },
  'pf.flow.step3_title': { id: 'Mulai karya pertamanya', en: 'Start the first project', zh: '开始第一个作品' },
  'pf.flow.step3_desc': {
    id: 'Anak langsung membuat sesuatu yang bisa ditunjukkan kepada keluarga.',
    en: 'Your child starts building something they can show their family.',
    zh: '孩子马上开始制作可以展示给家人的作品。',
  },
  'pf.flow.wa': { id: 'Tanya lewat WhatsApp', en: 'Ask on WhatsApp', zh: '通过 WhatsApp 咨询' },
  'pf.flow.wa_message': {
    id: 'Halo SPI, saya sudah melihat karya siswa di website dan ingin bertanya tentang kelas coba gratis.',
    en: 'Hello SPI, I have seen the student projects on the website and would like to ask about the free trial class.',
    zh: '您好 SPI，我已在网站上看到学生作品，想咨询免费试听课程。',
  },
  'pf.watch': { id: 'Tonton video', en: 'Watch video', zh: '观看视频' },
  'pf.open': { id: 'Buka proyek', en: 'Open project', zh: '打开项目' },
  'pf.cta_title': { id: 'Ingin anak Anda punya karya seperti ini?', en: 'Want your child to build work like this?', zh: '希望孩子也能做出这样的作品吗？' },
  'pf.cta_desc': {
    id: 'Mulai dari kelas gratis 60 menit bersama mentor SPI.',
    en: 'Start with a free 60-minute class with an SPI mentor.',
    zh: '从与 SPI 导师一起的 60 分钟免费课程开始。',
  },

  // Blog featured slider
  'blog.featured': { id: 'Artikel pilihan', en: 'Featured articles', zh: '精选文章' },
  'blog.read': { id: 'Baca artikel', en: 'Read article', zh: '阅读文章' },

  // WhatsApp chat card (opens WhatsApp with an automatic opening message)
  'wa.auto_message': {
    id: 'Halo SPI, saya lihat website Sekolah Programming Indonesia dan ingin bertanya tentang program SPI.',
    en: 'Hello SPI, I saw the Sekolah Programming Indonesia website and would like to ask about SPI programs.',
    zh: '您好 SPI，我看到了 Sekolah Programming Indonesia 的网站，想咨询 SPI 的课程。',
  },
  'wa.popup.name': { id: 'Sekolah Programming Indonesia', en: 'Sekolah Programming Indonesia', zh: 'Sekolah Programming Indonesia' },
  'wa.popup.role': { id: 'Admin SPI', en: 'SPI Admin', zh: 'SPI 客服' },
  'wa.popup.greeting': {
    id: 'Halo! Ada yang bisa kami bantu? Tekan Mulai Chat untuk terhubung dengan admin SPI di WhatsApp.',
    en: 'Hi! How can we help? Tap Start Chat to talk to the SPI admin on WhatsApp.',
    zh: '您好！有什么可以帮您？点击“开始聊天”，在 WhatsApp 上联系 SPI 客服。',
  },
  'wa.popup.preview': { id: 'Pesan otomatis', en: 'Automatic message', zh: '自动消息' },
  'wa.popup.start': { id: 'Mulai Chat', en: 'Start Chat', zh: '开始聊天' },
  'wa.popup.close': { id: 'Tutup', en: 'Close', zh: '关闭' },
  'wa.popup.typing': { id: 'Admin SPI sedang mengetik', en: 'SPI admin is typing', zh: 'SPI 客服正在输入' },

  // Blog hero
  'blog.hero.title': { id: 'Cerita, karya, dan wawasan dari SPI', en: 'Stories, projects and ideas from SPI', zh: '来自 SPI 的故事、作品与见解' },
  'blog.hero.desc': {
    id: 'Kabar tentang siswa, proyek, dan pendidikan teknologi dari Sekolah Programming Indonesia, termasuk liputan media tentang SPI.',
    en: 'News about students, projects and technology education at Sekolah Programming Indonesia, including media coverage of SPI.',
    zh: '关于 Sekolah Programming Indonesia 学生、项目与科技教育的动态，以及媒体对 SPI 的报道。',
  },
  'blog.rail': { id: 'Semua cerita', en: 'All stories', zh: '全部文章' },

  // Application dialog (Kirim lamaran)
  'apply.title': { id: 'Kirim lamaran ke SPI', en: 'Send your application to SPI', zh: '向 SPI 投递申请' },
  'apply.desc': {
    id: 'Pilih aplikasi email yang Anda pakai. Alamat dan isi pesan sudah terisi.',
    en: 'Choose the email app you use. The address and message are filled in for you.',
    zh: '请选择您常用的邮箱应用，收件地址和信息内容已为您填好。',
  },
  'apply.gmail': { id: 'Gmail', en: 'Gmail', zh: 'Gmail' },
  'apply.outlook': { id: 'Outlook', en: 'Outlook', zh: 'Outlook' },
  'apply.yahoo': { id: 'Yahoo Mail', en: 'Yahoo Mail', zh: 'Yahoo Mail' },
  'apply.zoho': { id: 'Zoho Mail', en: 'Zoho Mail', zh: 'Zoho Mail' },
  'apply.zoho_hint': {
    id: 'Zoho Mail dibuka di tab baru dan detail lamaran disalin. Tinggal tempel di pesan baru.',
    en: 'Zoho Mail opens in a new tab and the application details are copied. Paste them into a new message.',
    zh: '将在新标签页打开 Zoho Mail，并复制申请详情，粘贴到新邮件即可。',
  },
  'apply.device': { id: 'Aplikasi email di perangkat', en: 'Email app on this device', zh: '本机邮件应用' },
  'apply.copy': { id: 'Salin alamat email', en: 'Copy email address', zh: '复制邮箱地址' },
  'apply.copied': { id: 'Alamat disalin', en: 'Address copied', zh: '已复制地址' },
  'apply.close': { id: 'Tutup', en: 'Close', zh: '关闭' },
  'apply.attach': {
    id: 'Jangan lupa melampirkan CV dan portofolio sebelum mengirim.',
    en: "Don't forget to attach your CV and portfolio before sending.",
    zh: '发送前请别忘了附上简历和作品集。',
  },
  'apply.other_position': { id: 'posisi lain (sebutkan posisinya)', en: 'another role (please specify)', zh: '其他职位（请注明）' },
  'apply.body': {
    id: 'Halo Tim SPI,\n\nSaya ingin melamar sebagai {position}.\n\nNama lengkap: \nNomor WhatsApp: \nAsal sekolah / institusi / pekerjaan: \n\nCV dan portofolio terlampir.\n\nTerima kasih.',
    en: 'Hello SPI team,\n\nI would like to apply for the position of {position}.\n\nFull name: \nWhatsApp number: \nSchool / institution / current work: \n\nMy CV and portfolio are attached.\n\nThank you.',
    zh: '您好 SPI 团队，\n\n我想申请{position}一职。\n\n姓名：\nWhatsApp 号码：\n学校 / 机构 / 目前工作单位：\n\n我的简历和作品集已附上。\n\n谢谢。',
  },
};
