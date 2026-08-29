import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Monitor, Image as ImageIcon, Briefcase, Play, ChevronLeft, ChevronRight, Laptop } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface LabProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

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

  const experiences = ["Learn", "Practice", "Apply", "Improve", "Empower"];

  return (
    <div className="min-h-screen bg-[#050B14] text-white pb-20 selection:bg-[#186BF6] selection:text-white font-sans">
      
      {/* Hero Section - Dark Theme */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0B1220]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#176DF8] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-[#186BF6] rounded-full blur-[120px] opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">Lab Track</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Kuasai AI Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#176DF8]">Digital Skills</span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                Program praktis yang dirancang agar siswa bisa memanfaatkan AI dan teknologi digital terkini untuk produktivitas, kreativitas, dan kolaborasi sehari-hari.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenTrial}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Coba Gratis Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl font-black text-white">8-18</h4>
                  <p className="text-xs text-slate-400 font-medium">Tahun Usia</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">4</h4>
                  <p className="text-xs text-slate-400 font-medium">Fokus Skill</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white">100%</h4>
                  <p className="text-xs text-slate-400 font-medium">Tools Terkini</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#176DF8] to-purple-600 rounded-3xl transform -rotate-3 scale-105 opacity-30 blur-xl"></div>
              <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
                <ImageWithFallback
                  src={ASSETS.SPI_LAB.HERO}
                  alt="SPI Lab Program"
                  fallbackLabel="SPI Lab Hero Visual"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trusted Section (Partners) */}
      <div className="py-10 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Dipercaya oleh</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Logo placeholders - purely visual representation of trusted section structure */}
            <div className="h-8 flex items-center font-bold text-xl">Institution 1</div>
            <div className="h-8 flex items-center font-bold text-xl">Partner 2</div>
            <div className="h-8 flex items-center font-bold text-xl">School 3</div>
            <div className="h-8 flex items-center font-bold text-xl">Company 4</div>
          </div>
        </div>
      </div>

      {/* 3. Mengapa SPI Lab? */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black">Mengapa SPI Lab?</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {/* Challenges */}
            <div className="bg-red-950/20 border border-red-900/30 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
                <XCircle className="w-6 h-6" /> Tantangan Sekarang
              </h3>
              <ul className="space-y-4">
                {challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Solutions */}
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> Solusi SPI Lab
              </h3>
              <ul className="space-y-4">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500/80 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Program SPI Lab */}
      <div className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black">Program SPI Lab</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div key={idx} className={`bg-[#0A192F] rounded-3xl border-t-4 ${prog.color} border-x border-b border-white/10 p-6 flex flex-col`}>
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-4">{prog.title}</h3>
                  <ul className="space-y-2 mb-6 flex-grow">
                    {prog.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto aspect-video rounded-xl bg-white/5 overflow-hidden border border-white/5">
                     <ImageWithFallback src={''} alt={prog.title} className="w-full h-full object-cover opacity-50" />
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
            <h2 className="text-3xl lg:text-4xl font-black">Popular Learning Paths</h2>
            <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {paths.map((path, idx) => (
              <span key={idx} className="px-6 py-3 bg-[#0A192F] text-slate-300 font-bold text-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors cursor-default">
                {path}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Siapa yang Cocok? & 7. Learning Experience */}
      <div className="py-24 bg-gradient-to-b from-transparent to-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black">Siapa yang Cocok?</h2>
              <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((aud, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                  <h4 className="font-bold text-slate-200">{aud}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black">Learning Experience</h2>
              <div className="w-20 h-1 bg-[#186BF6] mx-auto rounded-full" />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#050B14] border-2 border-white/20 rounded-full flex items-center justify-center font-black text-slate-400 group-hover:border-[#186BF6] group-hover:text-[#186BF6] transition-colors">
                    {idx + 1}
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-slate-300 group-hover:text-white transition-colors">{exp}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 8. Final CTA */}
      <div className="py-20 relative overflow-hidden bg-[#0A192F] border-t border-[#186BF6]/20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black text-white">Siap Tingkatkan Skill Digitalmu?</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Bergabunglah dengan program SPI Lab dan kuasai tools masa depan hari ini.
          </p>
          <button
            onClick={onOpenTrial}
            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white active:scale-98 font-black text-lg rounded-2xl shadow-xl transition-all inline-flex items-center space-x-3 cursor-pointer"
          >
            <span>Daftar SPI Lab</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
};
