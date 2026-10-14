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
  'prog.core.purpose': {
    id: 'Fondasi berpikir komputasional dan coding, dari visual programming hingga robotika.',
    en: 'Foundations in computational thinking and coding, from visual programming to robotics.',
    zh: '计算思维与编程基础，从可视化编程到机器人。',
  },
  'prog.lab.purpose': {
    id: 'Keterampilan digital praktis untuk belajar dan bekerja, termasuk AI untuk produktivitas.',
    en: 'Practical digital skills for study and work, including AI for productivity.',
    zh: '面向学习与工作的实用数字技能，包括提升效率的 AI 工具。',
  },
  'prog.engineering.purpose': {
    id: 'Jalur lanjutan untuk machine learning, computer vision, IoT, dan data science.',
    en: 'An advanced pathway in machine learning, computer vision, IoT, and data science.',
    zh: '机器学习、计算机视觉、物联网和数据科学的进阶学习路径。',
  },
  'prog.inschool.purpose': {
    id: 'Kemitraan dengan sekolah untuk integrasi kurikulum, pelatihan guru, dan program ekstrakurikuler.',
    en: 'School partnerships for curriculum integration, teacher training, and after-school programs.',
    zh: '与学校合作，提供课程整合、教师培训及课后项目。',
  },
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
    id: 'Dari fondasi Core hingga Engineering, teknologi sehari-hari melalui Lab, dan kemitraan sekolah melalui InSchool.',
    en: 'From Core foundations to Engineering, everyday technology through Lab, and school partnerships through InSchool.',
    zh: '从 Core 基础到 Engineering 进阶，通过 Lab 学习日常科技，并通过 InSchool 与学校合作。',
  },
  'whyspi.c4.benefit': {
    id: 'Satu jalur belajar berkesinambungan dari dasar hingga lanjutan.',
    en: 'One continuous pathway from fundamentals to advanced learning.',
    zh: '从基础到进阶的一条连贯学习路径。',
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
  'method.example.title': { id: 'Contoh alur: pintu otomatis dengan Arduino', en: 'Example: an automatic door with Arduino', zh: '示例：用 Arduino 制作自动门' },
  'method.example.badge': { id: 'Ilustrasi', en: 'Illustration', zh: '示意' },
  'method.example.think': {
    id: 'Kapan pintu harus terbuka? Siswa menentukan kondisi, misalnya saat ada orang dalam jarak tertentu.',
    en: 'When should the door open? The student defines the condition, for example when someone is within a set distance.',
    zh: '门应该在什么时候打开？学生先确定条件，例如有人进入一定距离时。',
  },
  'method.example.build': {
    id: 'Merangkai sensor jarak dan motor, menulis program, lalu mengujinya berulang kali.',
    en: 'Connect a distance sensor and a motor, write the program, then test it repeatedly.',
    zh: '连接距离传感器和电机，编写程序，并反复测试。',
  },
  'method.example.innovate': {
    id: 'Mengatur jeda dan sensitivitas sensor, lalu menjelaskan cara kerja dan alasan perubahannya.',
    en: 'Tune the delay and sensor sensitivity, then explain how it works and why the changes were made.',
    zh: '调整延迟和传感器灵敏度，再说明工作原理以及修改的原因。',
  },
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
  'whyspi.flow.think': { id: 'Pahami masalahnya', en: 'Understand the problem', zh: '理解问题' },
  'whyspi.flow.build': { id: 'Wujudkan solusinya', en: 'Build the solution', zh: '构建方案' },
  'whyspi.flow.innovate': { id: 'Kembangkan karyanya', en: 'Improve the work', zh: '改进作品' },

  /* ---------- Program levels (card badges) ---------- */
  'prog.core.level': { id: 'Fondasi', en: 'Foundation', zh: '基础' },
  'prog.lab.level': { id: 'Keterampilan Digital', en: 'Digital Skills', zh: '数字技能' },
  'prog.engineering.level': { id: 'Lanjutan', en: 'Advanced', zh: '进阶' },
  'prog.inschool.level': { id: 'Untuk Sekolah', en: 'For Schools', zh: '面向学校' },
};
