import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Medal, Star, ChevronRight, Award } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

interface AchievementPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const content: Record<string, any> = {
  id: {
    heroTag: 'PRESTASI INTERNASIONAL',
    heroTitle: <>From <span className="text-slate-400">#2</span> to <span className="text-[#176DF8]">#1</span>.</>,
    heroSubtitle: 'Siswa kami terus melangkah lebih jauh.',
    heroDesc: 'Dari berkompetisi di panggung internasional hingga mencapai Peringkat 1 Sekolah, siswa kami terus mengubah keterampilan pemrograman dan teknologi menjadi prestasi nyata.',
    exploreBtn: 'Jelajahi Program SPI',
    startBtn: 'Mulai Perjalanan',
    storyTitle: 'Dibangun untuk Bersaing. Dilatih untuk Unggul.',
    storyDesc: 'Pada tahun 2025, SPI Jakarta meraih peringkat #2. Pada tahun 2026, SPI Jakarta Barat mencapai peringkat #1. Perkembangan ini mewakili perjalanan pembelajaran berkelanjutan, pemecahan masalah, pengembangan proyek, dan pencapaian di panggung internasional.',
    timelineTitle: 'Dari Belajar Hingga Berkompetisi.',
    timelineDesc: 'Siswa SPI didorong untuk mengubah apa yang mereka pelajari menjadi proyek nyata, pemecahan masalah nyata, dan prestasi nyata.',
    score: 'TOTAL SKOR',
    schoolRank: 'PERINGKAT SEKOLAH',
    wrcTitle: '2026 World Robot Competition Overseas Championships (Singapore)',
    wrcSub1: '8th International Youth Coding Contest',
    wrcSub2: 'Space Exploration Challenge',
    wrcDesc: 'SPI Jakarta Barat meraih Juara 1 dalam School Rank dengan skor total 1.490.',
    wrcFallback: 'Screenshot Peringkat Sekolah #1 (2026)',
    icodeTitle: 'Global Recognition — iCode 2025',
    icodeSub: 'The 7th ICode International Youth Coding Contest (Regional Final 2025)',
    icodeDesc: 'SPI mencetak sejarah di panggung dunia dengan meraih Juara 2 School Rank global, membuktikan kualitas kurikulum AI-Native kami yang kompetitif secara internasional.',
    icodeFallback: 'Screenshot Peringkat Sekolah #2 (2025)',
    goldMedals: 'Medali Emas',
    silverMedals: 'Medali Perak',
    bronzeMedals: 'Medali Perunggu',
    marketingTitle: <>Lebih Dari Sekadar Belajar.<br /><span className="text-[#5BA7FF]">Dibangun untuk Tantangan Nyata.</span></>,
    marketingDesc1: 'Di SPI, pemrograman bukan hanya tentang belajar menulis kode. Siswa didorong untuk berpikir komputasional, membangun proyek, memecahkan masalah, dan menerapkan keterampilan mereka pada tantangan nyata.',
    marketingDesc2: 'Prestasi kompetisi adalah salah satu refleksi dari perjalanan itu: dari mempelajari fundamental, hingga menciptakan, bereksperimen, memecahkan masalah, dan akhirnya berkompetisi di tingkat internasional.',
    proofTitle: 'Rekam Jejak Prestasi Siswa.',
    proofDesc: 'Prestasi yang ditampilkan di atas mewakili peringkat School Rank yang dapat diverifikasi dari kompetisi internasional masing-masing.',
    additionalTitle: 'PRESTASI NASIONAL & LOKAL',
    additionalHeading: 'Prestasi Lainnya',
    additionalDesc: 'Catatan prestasi siswa yang terus berkembang di berbagai kompetisi nasional dan lokal.',
    journeyTitle: 'Setiap Prestasi Memiliki Perjalanan di Belakangnya.',
    journeyDesc: 'Dari kompetisi lokal hingga panggung nasional dan tantangan internasional, setiap prestasi mencerminkan perjalanan belajar, membangun, memecahkan masalah, dan pertumbuhan siswa.',
    ctaTitle: 'Apa yang Bisa Anak Anda Bangun Selanjutnya?',
    ctaDesc: 'Mulailah dengan perjalanan belajar yang tepat dan berikan anak Anda kesempatan untuk membangun keterampilan, membuat proyek, dan menghadapi tantangan yang lebih besar.',
  },
  en: {
    heroTag: 'INTERNATIONAL ACHIEVEMENT',
    heroTitle: <>From <span className="text-slate-400">#2</span> to <span className="text-[#176DF8]">#1</span>.</>,
    heroSubtitle: 'Our students keep pushing further.',
    heroDesc: 'From competing on the international stage to reaching the #1 School Rank, our students continue to turn programming and technology skills into real achievements.',
    exploreBtn: 'Explore SPI Programs',
    startBtn: 'Start the Journey',
    storyTitle: 'Built to Compete. Trained to Excel.',
    storyDesc: 'In 2025, SPI Jakarta ranked #2. In 2026, SPI Jakarta Barat reached #1. This progression represents a journey of continuous learning, problem-solving, project development, and achievement on the international stage.',
    timelineTitle: 'From Learning to Competing.',
    timelineDesc: 'SPI students are encouraged to transform what they learn into real projects, real problem solving, and real achievements.',
    score: 'TOTAL SCORE',
    schoolRank: 'SCHOOL RANK',
    wrcTitle: '2026 World Robot Competition Overseas Championships (Singapore)',
    wrcSub1: '8th International Youth Coding Contest',
    wrcSub2: 'Space Exploration Challenge',
    wrcDesc: 'SPI Jakarta Barat achieved 1st place in the School Rank with a total score of 1,490.',
    wrcFallback: 'School Rank #1 Screenshot (2026)',
    icodeTitle: 'Global Recognition — iCode 2025',
    icodeSub: 'The 7th ICode International Youth Coding Contest (Regional Final 2025)',
    icodeDesc: 'SPI made history on the world stage by winning 2nd Place in the global School Rank, proving the quality of our AI-Native curriculum which is internationally competitive.',
    icodeFallback: 'School Rank #2 Screenshot (2025)',
    goldMedals: 'Gold Medals',
    silverMedals: 'Silver Medals',
    bronzeMedals: 'Bronze Medals',
    marketingTitle: <>More Than Learning.<br /><span className="text-[#5BA7FF]">Built for Real Challenges.</span></>,
    marketingDesc1: 'At SPI, programming is not only about learning how to write code. Students are encouraged to think computationally, build projects, solve problems, and apply their skills to real challenges.',
    marketingDesc2: 'Competition achievements are one reflection of that journey: from learning the fundamentals, to creating, experimenting, solving problems, and ultimately competing on an international stage.',
    proofTitle: 'A Track Record of Student Achievement.',
    proofDesc: 'The achievements showcased above represent verifiable School Rank standings from respective international competitions.',
    additionalTitle: 'NATIONAL & LOCAL ACHIEVEMENTS',
    additionalHeading: 'More Achievements',
    additionalDesc: 'A growing record of student achievements across national and local competitions.',
    journeyTitle: 'Every Achievement Has a Journey Behind It.',
    journeyDesc: 'From local competitions to national stages and international challenges, every achievement reflects a student\'s journey of learning, building, problem-solving, and growth.',
    ctaTitle: 'What Could Your Child Build Next?',
    ctaDesc: 'Start with the right learning journey and give your child the opportunity to build skills, create projects, and take on bigger challenges.',
  },
  zh: {
    heroTag: '国际成就',
    heroTitle: <>From <span className="text-slate-400">#2</span> to <span className="text-[#176DF8]">#1</span>.</>,
    heroSubtitle: '我们的学生不断突破自我。',
    heroDesc: '从在国际舞台上竞争到荣获学校排名第一，我们的学生不断将编程和技术技能转化为真正的成就。',
    exploreBtn: '探索 SPI 课程',
    startBtn: '开启旅程',
    storyTitle: '为竞争而生，为卓越而练。',
    storyDesc: '2025 年，SPI 雅加达荣获第 2 名。2026 年，SPI 雅加达西部校区荣获第 1 名。这一进步代表了在国际舞台上持续学习、解决问题、项目开发和取得成就的旅程。',
    timelineTitle: '从学习到竞争。',
    timelineDesc: '我们鼓励 SPI 学生将所学知识转化为真实的项目、真实的问题解决和真实的成就。',
    score: '总分',
    schoolRank: '学校排名',
    wrcTitle: '2026 世界机器人大赛海外锦标赛 (新加坡)',
    wrcSub1: '第 8 届国际青少年编程大赛',
    wrcSub2: '太空探索挑战赛',
    wrcDesc: 'SPI 雅加达西部校区以 1,490 的总分荣获学校排名第一。',
    wrcFallback: '学校排名第一截图 (2026)',
    icodeTitle: '全球认可 — iCode 2025',
    icodeSub: '第 7 届 ICode 国际青少年编程大赛 (区域决赛 2025)',
    icodeDesc: 'SPI 在世界舞台上创造了历史，荣获全球学校排名第二（School Rank #2），证明了我们具有国际竞争力的 AI-Native 课程的质量。',
    icodeFallback: '学校排名第二截图 (2025)',
    goldMedals: '金牌',
    silverMedals: '银牌',
    bronzeMedals: '铜牌',
    marketingTitle: <>不仅是学习。<br /><span className="text-[#5BA7FF]">为真实挑战而生。</span></>,
    marketingDesc1: '在 SPI，编程不仅仅是学习如何编写代码。我们鼓励学生进行计算思维、构建项目、解决问题，并将他们的技能应用于现实挑战。',
    marketingDesc2: '竞赛成就是该旅程的一种体现：从学习基础知识，到创造、实验、解决问题，最终在国际舞台上进行竞争。',
    proofTitle: '学生成就的优良记录。',
    proofDesc: '上面展示的成就是来自各自国际竞赛的、可核实的学校排名。',
    additionalTitle: '国家与地方成就',
    additionalHeading: '更多成就',
    additionalDesc: '在国家和地方竞赛中，学生取得的成就记录不断增长。',
    journeyTitle: '每一个成就背后都有一个旅程。',
    journeyDesc: '从地方竞赛到国家舞台再到国际挑战，每一项成就都反映了学生学习、构建、解决问题和成长的历程。',
    ctaTitle: '您的孩子下一步能构建什么？',
    ctaDesc: '从正确的学习旅程开始，让您的孩子有机会培养技能、创建项目并迎接更大的挑战。',
  }
};

export const AchievementPage: React.FC<AchievementPageProps> = ({ onBack, onOpenTrial }) => {
  const { lang } = useLanguage();
  const c = content[lang] || content['en'];
  const defaultAchievements = [
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2024',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2024',
      year: '2024',
      category: 'SD',
      level: 'National',
      rank_label: 'Juara 2',
      image_path: '/assets/achievement/achievement-steam-2024-sd.jpg',
      status: 'published'
    },
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SD',
      level: 'National',
      rank_label: 'Juara 2',
      image_path: '/assets/achievement/achievement-steam-2025-sd.jpg',
      status: 'published'
    },
    {
      title: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      heading: 'Juara 2 STEAM National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SMP',
      level: 'National',
      rank_label: 'Juara 2',
      image_path: '/assets/achievement/achievement-steam-2025-smp.jpg',
      status: 'published'
    },
    {
      title: 'Juara 1 Kategori Robotik Ajang Kreatifitas Pemuda Kota Jakarta Barat',
      heading: 'Juara 1 Kategori Robotik Ajang Kreatifitas Pemuda Kota Jakarta Barat',
      year: 'N/A',
      category: 'Robotik',
      level: 'Local',
      rank_label: 'Juara 1',
      image_path: '/assets/achievement/achievement-robotik-jakarta-barat.jpg',
      status: 'published'
    },
    {
      title: '10 Besar National Competition Sampoerna Academy 2025',
      heading: '10 Besar National Competition Sampoerna Academy 2025',
      year: '2025',
      category: 'SMA',
      level: 'National',
      rank_label: '10 Besar',
      image_path: '/assets/achievement/achievement-steam-2025-sma.jpg',
      status: 'published'
    },
    {
      title: 'Siswa Sekolah Programming Indonesia Berjaya di ICode Global Hackathon 2024!',
      heading: 'Siswa Sekolah Programming Indonesia Berjaya di ICode Global Hackathon 2024!',
      description: 'Siswa Sekolah Programming Indonesia berhasil meraih prestasi dalam ICode Global Hackathon 2024, kompetisi coding internasional yang diikuti lebih dari 3 juta siswa dari 73 negara. Kompetisi mencakup Programming Block dan Programming Teks dengan Python. Grisson Orville Yang Sebastian Hokiman meraih Juara 1 Programming Block dan Juara 18 Bahasa Python; Eugenio Ng Juara 10 Bahasa Python; Jacqueline Calista Chen Peringkat 52 Bahasa Python; Lionel Darren Setiawan Peringkat 61 Bahasa Python.',
      year: '2024',
      category: 'International',
      level: 'International',
      rank_label: 'ICode Global Hackathon',
      image_path: '/assets/achievements/international/icode-global-hackathon-2024.png',
      status: 'published'
    },
    {
      title: 'Jacqueline Calista Chen — Bronze Medal',
      heading: 'Jacqueline Calista Chen',
      description: 'Bronze Medal dalam kategori Girls on STEAM pada Codeavour 2024 di Dubai, UEA.',
      year: '2024',
      category: 'Girls on STEAM',
      level: 'International',
      rank_label: 'Bronze Medal',
      image_path: '/assets/achievements/codeavour-2024-jacqueline-calista-chen.png',
      status: 'published'
    },
    {
      title: 'Codeavour 5.0',
      heading: 'Codeavour 5.0',
      description: 'Kompetisi coding dan kecerdasan buatan internasional untuk anak usia 7 hingga 18 tahun yang mendorong proyek kreatif, kepercayaan diri, kreativitas, dan pengalaman internasional.',
      year: '2024',
      category: 'AI & Coding',
      level: 'International',
      rank_label: 'Codeavour 5.0',
      image_path: '/assets/achievements/international/codeavour-5-0.png',
      status: 'published'
    }
  ];

  const [achievements, setAchievements] = useState<any[]>(defaultAchievements);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Achievement | Sekolah Programming Indonesia";
    
    // Add meta description dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover student achievements from Sekolah Programming Indonesia, including international, national, and local competition achievements.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Discover student achievements from Sekolah Programming Indonesia, including international, national, and local competition achievements.";
      document.head.appendChild(meta);
    }

    // Fetch dynamic achievements
    fetch('/api/achievements?status=published')
      .then(res => res.json())
      .then(data => {
        const fetchedTitles = new Set(data.map((item: any) => item.title || item.heading));
        setAchievements([...defaultAchievements.filter((item) => !fetchedTitles.has(item.title)), ...data]);
      })
      .catch(console.error);
  }, []);

  const getAchievementAssetPath = (title: string, category = ''): string => {
    const t = `${title || ''} ${category || ''}`;
    if (t.includes('ICode') || t.includes('iCode')) {
      return '/assets/achievements/international/icode-global-hackathon-2024.png';
    }
    if (t.includes('Jacqueline') || t.includes('Codeavour 2024')) {
      return '/assets/achievements/codeavour-2024-jacqueline-calista-chen.png';
    }
    if (t.includes('Codeavour 5.0')) {
      return '/assets/achievements/international/codeavour-5-0.png';
    }
    if (t.includes('2024') && t.includes('SD')) {
      return '/assets/achievement/achievement-steam-2024-sd.jpg';
    }
    if (t.includes('2025') && t.includes('SD')) {
      return '/assets/achievement/achievement-steam-2025-sd.jpg';
    }
    if (t.includes('2025') && t.includes('SMP')) {
      return '/assets/achievement/achievement-steam-2025-smp.jpg';
    }
    if (t.includes('Robotik') || t.includes('Jakarta Barat')) {
      return '/assets/achievement/achievement-robotik-jakarta-barat.jpg';
    }
    if (t.includes('2025') && t.includes('SMA')) {
      return '/assets/achievement/achievement-steam-2025-sma.jpg';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/50 via-[#DCEBFF]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/50 via-[#DCEBFF]/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-[#176DF8] px-4 py-2 rounded-full font-bold text-sm tracking-wide mb-8 border border-blue-100 shadow-sm"
          >
            <Trophy className="w-4 h-4" />
            <span>{c.heroTag}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-[#102A56] tracking-tight leading-tight mb-6"
          >
            {c.heroTitle}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#102A56] font-semibold mb-6 max-w-3xl mx-auto"
          >
            {c.heroSubtitle}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {c.heroDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById('main-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#176DF8] text-white font-bold rounded-2xl hover:bg-[#1059D4] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>{c.exploreBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#102A56] font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center space-x-2"
            >
              <span>{c.startBtn}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Story Section */}
      <section id="main-story" className="py-20 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-6">
              {c.storyTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {c.storyDesc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Achievement Timeline Section (2025 -> 2026) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-4">{c.timelineTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {c.timelineDesc}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0 relative">
            
            {/* Desktop Progression Connector */}
            <div className="hidden lg:block absolute top-1/2 left-[calc(50%-150px)] w-[300px] h-[3px] bg-gradient-to-r from-slate-200 via-[#5BA7FF] to-[#176DF8] -translate-y-1/2 z-0">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="h-full bg-[#176DF8] origin-left"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-[#176DF8] rounded-full z-10" />
            </div>

            {/* Mobile Progression Connector */}
            <div className="lg:hidden flex justify-center py-4 relative z-0">
               <div className="w-[3px] h-24 bg-gradient-to-b from-slate-200 via-[#5BA7FF] to-[#176DF8]" />
            </div>

            {/* 2025 Achievement Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:w-[45%] flex flex-col items-center lg:items-end z-10"
            >
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow w-full max-w-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50" />
                
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">2025</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">{c.score}</p>
                    <p className="text-xl font-bold text-[#102A56]">3,363</p>
                  </div>
                </div>

                <div className="text-center lg:text-left mb-6">
                  <p className="text-xs font-bold text-slate-400 tracking-widest mb-2">{c.schoolRank}</p>
                  <h3 className="text-6xl font-extrabold text-[#102A56] mb-4">#2</h3>
                  <h4 className="text-lg font-bold text-[#102A56] mb-2">{c.icodeTitle}</h4>
                  <p className="text-sm font-semibold text-[#176DF8] mb-4">{c.icodeSub}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {c.icodeDesc}
                  </p>

                  {/* Medals Row/Grid */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100/80 shadow-inner">
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Medal className="w-5 h-5 text-amber-500 animate-pulse" />
                      </div>
                      <p className="text-lg font-extrabold text-amber-600 leading-tight">07</p>
                      <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">{c.goldMedals}</p>
                    </div>
                    <div className="text-center border-x border-slate-200">
                      <div className="flex justify-center mb-1">
                        <Medal className="w-5 h-5 text-slate-400 animate-pulse" />
                      </div>
                      <p className="text-lg font-extrabold text-slate-500 leading-tight">35</p>
                      <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">{c.silverMedals}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Medal className="w-5 h-5 text-amber-700 animate-pulse" />
                      </div>
                      <p className="text-lg font-extrabold text-amber-800 leading-tight">28</p>
                      <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">{c.bronzeMedals}</p>
                    </div>
                  </div>
                </div>

                {/* Screenshot Placeholder / Proof Slot */}
                <ImageWithFallback
                  src="/assets/achievements/international/achievement-2025-school-rank-2.png"
                  alt="/assets/achievements/international/achievement-2025-school-rank-2.png"
                  data-asset-path="/assets/achievements/international/achievement-2025-school-rank-2.png"
                  fallbackLabel={c.icodeFallback}
                  className="mt-6 aspect-video w-full rounded-xl border border-slate-200 overflow-hidden cursor-pointer"
                />
              </div>
            </motion.div>

            {/* Spacer for Desktop Line */}
            <div className="hidden lg:block lg:w-[10%]" />

            {/* 2026 Achievement Card - Stronger Emphasis */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-[45%] flex flex-col items-center lg:items-start z-10"
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-[#176DF8]/20 shadow-lg hover:shadow-xl transition-all w-full max-w-lg relative overflow-hidden ring-4 ring-[#DCEBFF]/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#DCEBFF] rounded-bl-full -z-10 opacity-30" />
                <div className="absolute top-4 right-4 text-[#176DF8] opacity-20"><Award className="w-16 h-16" /></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 bg-[#176DF8] text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20">2026</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">{c.score}</p>
                    <p className="text-2xl font-black text-[#176DF8]">1,490</p>
                  </div>
                </div>

                <div className="text-center lg:text-left mb-6">
                  <p className="text-xs font-bold text-[#176DF8] tracking-widest mb-2">{c.schoolRank}</p>
                  <h3 className="text-7xl font-black text-[#176DF8] mb-4 tracking-tighter drop-shadow-sm">#1</h3>
                  <h4 className="text-xl font-bold text-[#102A56] mb-2 leading-snug">{c.wrcTitle}</h4>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm font-semibold text-[#102A56]">{c.wrcSub1}</p>
                    <p className="text-sm font-semibold text-slate-500">{c.wrcSub2}</p>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {c.wrcDesc}
                  </p>
                </div>

                {/* Screenshot Placeholder / Proof Slot */}
                <ImageWithFallback
                  src="/assets/achievements/international/achievement-2026-school-rank-1.png"
                  alt="/assets/achievements/international/achievement-2026-school-rank-1.png"
                  data-asset-path="/assets/achievements/international/achievement-2026-school-rank-1.png"
                  fallbackLabel={c.wrcFallback}
                  className="mt-6 aspect-video w-full rounded-xl border border-slate-200 overflow-hidden cursor-pointer"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Marketing Section & 5. Proof Section Info */}
      <section className="py-24 bg-[#102A56] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
              {c.marketingTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
              {c.marketingDesc1}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {c.marketingDesc2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof Text Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#102A56] mb-4">{c.proofTitle}</h3>
          <p className="text-slate-600">{c.proofDesc}</p>
        </div>
      </section>

      {/* 6. Additional Achievements (National & Local) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs tracking-wider mb-4">{c.additionalTitle}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-4">{c.additionalHeading}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {c.additionalDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => {
              const assetPath = getAchievementAssetPath(achievement.title || achievement.heading, achievement.category) || achievement.image_path || '';
              return (
                <motion.div
                  key={achievement.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                  className="bg-white rounded-2xl border border-[#DCEBFF] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  {/* Photo Area */}
                  <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center">
                    <ImageWithFallback
                      src={assetPath}
                      alt={assetPath}
                      data-asset-path={assetPath}
                      fallbackLabel={achievement.category || 'Achievement'}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                      <span className="text-xs font-bold px-2.5 py-1 bg-[#F8FAFC] text-slate-500 rounded-md border border-slate-100">
                        {achievement.year && achievement.year !== 'N/A' ? achievement.year : 'Recent'} {achievement.level ? `• ${achievement.level}` : ''}
                      </span>
                      {achievement.category && (
                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-[#176DF8] rounded uppercase tracking-wider">
                          {achievement.category}
                        </span>
                      )}
                    </div>
                    
                    {achievement.rank_label && (
                      <h4 className="text-2xl font-black text-[#176DF8] mb-2">{achievement.rank_label}</h4>
                    )}
                    <p className="text-sm font-bold text-[#102A56] leading-snug mb-4 flex-grow">
                      {achievement.heading || achievement.title}
                    </p>
                    {achievement.description && (
                      <p className="text-xs text-slate-500 line-clamp-2">{achievement.description}</p>
                    )}
                    
                  </div>
                </motion.div>
              );
            })}
            {achievements.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 font-semibold">
                {lang === 'zh' ? '无成就数据。' : lang === 'en' ? 'No achievement data.' : 'Tidak ada data achievement.'}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 9. Achievement Summary */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-10 h-10 text-[#5BA7FF] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#102A56] mb-4">
            {c.journeyTitle}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            {c.journeyDesc}
          </p>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[#176DF8]/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl border border-blue-50"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102A56] mb-6 tracking-tight">
              {c.ctaTitle}
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              {c.ctaDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = '/program/spi-core';
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#176DF8] text-white font-bold rounded-2xl hover:bg-[#1059D4] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>{c.exploreBtn}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenTrial}
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#102A56] font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center space-x-2"
              >
                <span>{c.startBtn}</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
