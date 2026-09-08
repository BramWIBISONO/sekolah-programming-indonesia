import React from 'react';
import { ASSETS, asset } from '../../constants/assets';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Monitor, Image as ImageIcon, Briefcase, Play, Laptop, BookOpen, Code2, Rocket, RefreshCcw, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LabProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const SPI_LAB_PARTNERS = [
  { name: 'INN', asset: asset('assets/spi-lab/partners/inn.png') },
  { name: 'RBP', asset: asset('assets/spi-lab/partners/rbp.png') },
  { name: 'Yayasan Saluran Berkat Untuk Negeri', asset: asset('assets/spi-lab/partners/yayasan-saluran-berkat-untuk-negeri.png') },
  { name: 'STT El Bethel', asset: asset('assets/spi-lab/partners/stt-el-bethel.png') },
  { name: 'ICREA', asset: asset('assets/spi-lab/partners/icrea.png') },
  { name: 'Sekolah Musik Indonesia Solo', asset: asset('assets/spi-lab/partners/sekolah-musik-indonesia-solo.png') },
  { name: 'Sekolah Musik Taman Surya', asset: asset('assets/spi-lab/partners/sekolah-musik-taman-surya.png') },
  { name: 'Sekolah Musik Surabaya', asset: asset('assets/spi-lab/partners/sekolah-musik-surabaya.png') },
];

export const LabProgramPage: React.FC<LabProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const challenges = [
    "Ketergantungan pada gadget hanya untuk konsumsi",
    "Kurangnya keterampilan digital dasar",
    "Gagap teknologi di era AI",
    "Produktivitas rendah tanpa bantuan digital tools"
  ];

  const solutions = [
    "Mengubah konsumen menjadi kreator digital",
    "Membangun literasi digital aplikatif",
    "Menguasai AI tools untuk mempermudah hidup",
    "Meningkatkan produktivitas dengan efisien"
  ];

  const programs = [
    { title: "AI Series", icon: Monitor, color: "border-purple-500", items: ["ChatGPT Prompting", "AI Image Generation", "AI for Productivity"] },
    { title: "Office Series", icon: Briefcase, color: "border-blue-500", items: ["Microsoft Word", "Excel Mastery", "PowerPoint Design"] },
    { title: "Creative Digital", icon: ImageIcon, color: "border-pink-500", items: ["Canva Design", "Photoshop Basics", "UI/UX Intro"] },
    { title: "Content Creation", icon: Play, color: "border-red-500", items: ["Video Editing (CapCut)", "Social Media Content", "Storyboarding"] }
  ];

  const paths = [
    "AI for Education",
    "AI for Business",
    "AI for Students",
    "Creative Digital",
    "Content Creation",
    "Future Skills"
  ];

  const audiences = [
    "Students & University Students",
    "Parents & Teachers",
    "Professionals & Employees",
    "Business Owners & Entrepreneurs"
  ];

  const experiences = [
    { number: '01', title: 'Learn', meaning: 'Memahami konsep dan teknologinya.', icon: BookOpen },
    { number: '02', title: 'Practice', meaning: 'Mencoba eksperimen dengan kegiatan terbimbing.', icon: Code2 },
    { number: '03', title: 'Apply', meaning: 'Gunakan yang dipelajari untuk membangun sesuatu yang nyata.', icon: Rocket },
    { number: '04', title: 'Improve', meaning: 'Uji, perbaiki, dan iterasi agar project semakin baik.', icon: RefreshCcw },
    { number: '05', title: 'Create', meaning: 'Kembangkan pengalaman belajar menjadi karya sendiri.', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-[#0B1220] dark:text-white pb-20 selection:bg-[#186BF6] selection:text-white font-sans transition-colors">
      
      {/* Hero Section - SPI Core-Style Bright Blue Theme */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-[#176DF8] via-[#1059D4] to-[#0B3C95] text-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[140px] opacity-15" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-sky-300 rounded-full blur-[120px] opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/15 px-3.5 py-1.5 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                <Laptop className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">Lab Track</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Kuasai AI Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-amber-200">Digital Skills</span>
              </h1>
              
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
                Program praktis yang dirancang agar siswa bisa memanfaatkan AI dan teknologi digital terkini untuk produktivitas, kreativitas, dan kolaborasi sehari-hari.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenTrial}
                  className="bg-white hover:bg-blue-50 text-[#176DF8] px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Coba Gratis Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/15 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl font-black text-white">8-18</h4>
                  <p className="text-xs text-blue-100 font-medium">Tahun Usia</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">4</h4>
                  <p className="text-xs text-blue-100 font-medium">Fokus Skill</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">100%</h4>
                  <p className="text-xs text-blue-100 font-medium">Tools Terkini</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:h-[480px] flex items-center justify-center">
              <div className="relative w-full h-full min-h-[350px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
                <ImageWithFallback
                  src={ASSETS.programs.spiLab}
                  alt="SPI Lab Hero Visual"
                  fallbackLabel="SPI Lab Hero Visual"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted Section (Partners) - Clean White Logo Cards */}
      <section className="py-14 bg-white dark:bg-[#0B1220] border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#176DF8] uppercase tracking-widest">
              Dipercaya oleh
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
              Mitra Pendidikan & Organisasi
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full">
            {SPI_LAB_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="h-20 sm:h-22 bg-[#FFFFFF] rounded-2xl border border-[#DCE7F5] dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#186BF6] hover:-translate-y-0.5 transition-all p-3 flex items-center justify-center cursor-default group"
                title={partner.name}
              >
                <img
                  src={partner.asset}
                  alt={partner.name}
                  className="w-full h-full max-w-full max-h-full object-contain object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mengapa SPI Lab? */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Mengapa SPI Lab?</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Challenges */}
            <div className="bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle className="w-6 h-6" /> Tantangan Sekarang
              </h3>
              <ul className="space-y-4">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Solutions */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> Solusi SPI Lab
              </h3>
              <ul className="space-y-4">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Program SPI Lab */}
      <div className="py-24 bg-white dark:bg-[#0B1220] border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Program SPI Lab</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div key={idx} className={`bg-slate-50 dark:bg-slate-900 rounded-3xl border-t-4 ${prog.color} border-x border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#176DF8] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">{prog.title}</h3>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {prog.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#176DF8]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto aspect-video rounded-xl bg-white dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                    <ImageWithFallback src={ASSETS.programs.spiLab} alt="SPI Lab" fallbackLabel="SPI Lab" className="w-full h-full object-contain" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Popular Learning Paths */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Popular Learning Paths</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {paths.map((path, idx) => (
              <span key={idx} className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#176DF8] hover:text-[#176DF8] transition-colors cursor-default">
                {path}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Siapa yang Cocok? & 7. Learning Experience */}
      <div className="py-24 bg-slate-50 dark:bg-[#0B1220]/50 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Siapa yang Cocok?</h2>
              <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((aud, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">{aud}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white">Learning Experience</h2>
              <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4 relative">
              {/* Connecting journey line — subtle, SPI blue */}
              <div className="hidden md:block absolute top-[46px] left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-[#186BF6]/20 via-[#186BF6]/60 to-[#186BF6]/20" aria-hidden="true" />
              <div className="md:hidden absolute left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#186BF6]/20 via-[#186BF6]/60 to-[#186BF6]/20" aria-hidden="true" />

              {experiences.map((exp) => {
                const Icon = exp.icon;
                return (
                  <div key={exp.number} className="relative z-10 flex md:flex-col items-start md:items-center gap-5 md:gap-4 group w-full md:w-auto">
                    <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#186BF6]/30 dark:border-slate-700 flex items-center justify-center shadow-sm group-hover:border-[#186BF6] group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all">
                      <Icon className="w-8 h-8 text-[#186BF6]" aria-hidden="true" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#186BF6] text-white text-[10px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                        {exp.number}
                      </span>
                    </div>
                    <div className="md:text-center">
                      <h4 className="text-base font-black text-slate-800 dark:text-white group-hover:text-[#176DF8] transition-colors">{exp.title}</h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">{exp.meaning}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 8. Final CTA */}
      <div className="py-20 relative overflow-hidden bg-gradient-to-br from-[#176DF8] to-[#0B3C95] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black text-white">Siap Tingkatkan Skill Digitalmu?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Bergabunglah dengan program SPI Lab dan kuasai tools masa depan hari ini.
          </p>
          <button
            onClick={onOpenTrial}
            className="px-10 py-4 bg-white text-[#176DF8] hover:bg-blue-50 active:scale-98 font-black text-lg rounded-2xl shadow-xl transition-all inline-flex items-center space-x-3 cursor-pointer"
          >
            <span>Daftar SPI Lab</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
