import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ASSETS } from '../../constants/assets';
import { CORE_CURRICULUM_STAGES, STUDENT_PROJECTS } from '../../data/mockData';
import { Code, Terminal, BrainCircuit, Rocket, CheckCircle2, Cpu, Database, Network, ArrowLeft, ArrowRight, BookOpen, Clock, Target, Users, Play, Download, Calendar, Layout, Layers, Code2, Brain, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { getYouTubeVideoId, getYouTubeThumbnailUrl } from '../../utils/youtube';

interface CoreProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

/** Inline SVG Rocket component */
const RocketSVG: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Rocket body */}
    <path d="M32 4C32 4 22 18 22 32C22 40 26 48 32 52C38 48 42 40 42 32C42 18 32 4 32 4Z" fill="#F8FAFC" stroke="#176DF8" strokeWidth="2"/>
    {/* Window */}
    <circle cx="32" cy="26" r="5" fill="#DCEBFF" stroke="#176DF8" strokeWidth="1.5"/>
    <circle cx="32" cy="26" r="2.5" fill="#5BA7FF"/>
    {/* Fins */}
    <path d="M22 38L16 46L22 44Z" fill="#176DF8"/>
    <path d="M42 38L48 46L42 44Z" fill="#176DF8"/>
    {/* Nose tip accent */}
    <path d="M32 4C32 4 29 12 29 16L32 10L35 16C35 12 32 4 32 4Z" fill="#5BA7FF" opacity="0.6"/>
    {/* Exhaust flames */}
    <g className="rocket-exhaust">
      <path d="M28 52L32 62L36 52" fill="#FF6B35" opacity="0.9"/>
      <path d="M30 52L32 58L34 52" fill="#FFD93D" opacity="0.8"/>
    </g>
  </svg>
);

/** Destination star SVG */
const DestinationStar: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 2L19.6 11.2L29.6 12L22 18.8L24.4 28.4L16 23.2L7.6 28.4L10 18.8L2.4 12L12.4 11.2L16 2Z" fill="#176DF8"/>
    <path d="M16 6L18.6 12.8L26 13.4L20.4 18.4L22.2 25.6L16 21.6L9.8 25.6L11.6 18.4L6 13.4L13.4 12.8L16 6Z" fill="#5BA7FF"/>
  </svg>
);

interface RocketJourneyStage {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  asset: string;
  icon: React.ElementType;
}

/** Rocket Journey visual for Learning Journey SPI Core */
const RocketJourneySection: React.FC<{ stages: RocketJourneyStage[] }> = ({ stages }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const checkpointLabels = ['01', '02', '03', '04'];

  return (
    <div ref={sectionRef} className="py-20 bg-[#F8FAFC] overflow-hidden">
      {/* Inline keyframes for rocket exhaust flicker and rocket flight */}
      <style>{`
        @keyframes exhaustFlicker {
          0%, 100% { opacity: 0.9; transform: scaleY(1); }
          50% { opacity: 0.6; transform: scaleY(0.85); }
        }
        @keyframes rocketFlyH {
          0% { left: -2%; }
          100% { left: 88%; }
        }
        @keyframes rocketFlyV {
          0% { top: -2%; }
          100% { top: 88%; }
        }
        .rocket-exhaust {
          animation: exhaustFlicker 0.4s ease-in-out infinite;
          transform-origin: center top;
        }
        @media (prefers-reduced-motion: reduce) {
          .rocket-exhaust { animation: none; }
          .rocket-animate-h { animation: none !important; left: 88% !important; }
          .rocket-animate-v { animation: none !important; top: 88% !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-black text-[#102A56]">Learning Journey SPI Core</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        {/* ───────── DESKTOP: Horizontal Trajectory ───────── */}
        <div className="hidden lg:block relative" style={{ minHeight: 420 }}>
          {/* SVG trajectory line */}
          <svg
            className="absolute top-[72px] left-0 w-full"
            viewBox="0 0 1200 80"
            fill="none"
            preserveAspectRatio="none"
            style={{ height: 80 }}
          >
            {/* Background track */}
            <path
              d="M40 40 C200 10, 350 70, 500 40 C650 10, 800 70, 1160 40"
              stroke="#DCEBFF"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Progress accent */}
            <path
              d="M40 40 C200 10, 350 70, 500 40 C650 10, 800 70, 1160 40"
              stroke="#176DF8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="1200"
              strokeDashoffset={isVisible ? '0' : '1200'}
              style={{ transition: 'stroke-dashoffset 2.5s ease-out' }}
            />
            {/* Small decorative dots along the path */}
            {[160, 380, 600, 820, 1040].map((cx, i) => (
              <circle key={i} cx={cx} cy={i % 2 === 0 ? 28 : 52} r="3" fill="#DCEBFF" />
            ))}
          </svg>

          {/* Animated rocket */}
          <div
            className={`absolute top-[38px] z-20 ${isVisible ? 'rocket-animate-h' : ''}`}
            style={{
              left: isVisible ? undefined : '-2%',
              animation: isVisible ? 'rocketFlyH 2.5s ease-out forwards' : 'none',
            }}
          >
            <div className="w-12 h-12 -rotate-90">
              <RocketSVG className="w-full h-full" />
            </div>
          </div>

          {/* Four checkpoints positioned along the trajectory */}
          <div className="relative z-10 grid grid-cols-4 gap-8 pt-2">
            {stages.map((stage, idx) => {
              const isDestination = idx === stages.length - 1;
              return (
                <div key={idx} className="flex flex-col items-center group">
                  {/* Node */}
                  <div className={`
                    relative w-20 h-20 rounded-full flex items-center justify-center
                    border-[3px] transition-all duration-300
                    ${isDestination
                      ? 'bg-[#176DF8] border-[#5BA7FF] text-white shadow-lg shadow-[#176DF8]/30 group-hover:scale-110'
                      : 'bg-white border-[#DCEBFF] text-[#176DF8] shadow-md group-hover:border-[#176DF8] group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#176DF8]/20'
                    }
                  `}>
                    {isDestination ? (
                      <DestinationStar className="w-8 h-8" />
                    ) : (
                      <span className="text-2xl font-black">{checkpointLabels[idx]}</span>
                    )}
                    {/* Small order badge */}
                    <span className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isDestination ? 'bg-[#5BA7FF] text-white' : 'bg-[#176DF8] text-white'
                    }`}>
                      {checkpointLabels[idx]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6 text-center max-w-[240px] space-y-2">
                    <h3 className="text-lg font-bold text-[#102A56] leading-tight">{stage.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────── MOBILE / TABLET: Vertical Trajectory ───────── */}
        <div className="lg:hidden relative pl-14 sm:pl-20">
          {/* Vertical trajectory line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[3px] bg-[#DCEBFF]">
            <div
              className="w-full bg-[#176DF8] rounded-full"
              style={{
                height: isVisible ? '100%' : '0%',
                transition: 'height 2.5s ease-out',
              }}
            />
          </div>

          {/* Animated rocket (vertical) */}
          <div
            className={`absolute left-[12px] sm:left-[18px] z-20 ${isVisible ? 'rocket-animate-v' : ''}`}
            style={{
              top: isVisible ? undefined : '-2%',
              animation: isVisible ? 'rocketFlyV 2.5s ease-out forwards' : 'none',
            }}
          >
            <div className="w-10 h-10">
              <RocketSVG className="w-full h-full" />
            </div>
          </div>

          {/* Four checkpoints */}
          <div className="space-y-12 relative z-10">
            {stages.map((stage, idx) => {
              const isDestination = idx === stages.length - 1;
              return (
                <div key={idx} className="relative group">
                  {/* Node on the line */}
                  <div className={`
                    absolute -left-14 sm:-left-20 top-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                    border-[3px] transition-all duration-300
                    ${isDestination
                      ? 'bg-[#176DF8] border-[#5BA7FF] text-white shadow-lg shadow-[#176DF8]/30'
                      : 'bg-white border-[#DCEBFF] text-[#176DF8] shadow-md group-hover:border-[#176DF8] group-hover:shadow-lg'
                    }
                  `}>
                    {isDestination ? (
                      <DestinationStar className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-black">{checkpointLabels[idx]}</span>
                    )}
                  </div>

                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-[#DCEBFF] transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#176DF8] bg-[#DCEBFF] px-2 py-0.5 rounded-full">
                        Stage {checkpointLabels[idx]}
                      </span>
                      {isDestination && (
                        <span className="text-[10px] font-bold text-white bg-[#176DF8] px-2 py-0.5 rounded-full">
                          Destination
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#102A56] leading-tight mb-1.5">{stage.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Carousel sub-component for SPI Core student projects – YouTube embed */
const CoreStudentProjectsCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const total = STUDENT_PROJECTS.length;

  const handlePrev = useCallback(() => {
    setActiveIdx((p) => (p > 0 ? p - 1 : total - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIdx((p) => (p < total - 1 ? p + 1 : 0));
  }, [total]);

  const active = STUDENT_PROJECTS[activeIdx];
  const videoId = getYouTubeVideoId(active.youtubeUrl) || '';

  // Side list: next 3 after active, wrapping
  const sideList = Array.from({ length: Math.min(3, total - 1) }, (_, i) =>
    STUDENT_PROJECTS[(activeIdx + 1 + i) % total]
  );

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-4 text-center sm:text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Project Siswa SPI Core</h2>
            <div className="w-20 h-1 bg-[#176DF8] mx-auto sm:mx-0 rounded-full" />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400 font-medium">{activeIdx + 1} / {total}</span>
            <div className="flex items-center space-x-2">
              <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#176DF8] hover:border-[#176DF8] transition-colors cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#176DF8] hover:border-[#176DF8] transition-colors cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured video – YouTube embed */}
          <div className="lg:col-span-7">
            <div key={active.id} className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl">
              <YouTubeEmbed
                videoId={videoId}
                title={active.projectName}
                options={{ autoplay: true, muted: true, controls: true }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 pointer-events-none">
                <span className="inline-block bg-[#176DF8] text-white px-3 py-1 rounded-lg text-xs font-bold mb-2 shadow-md">{active.category}</span>
                <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">{active.projectName}</h3>
                {active.studentName && <p className="text-slate-300 text-sm mt-1">By {active.studentName}</p>}
              </div>
            </div>
          </div>

          {/* Side list thumbnails */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Project Lainnya</h3>
            <div className="flex-1 space-y-4">
              {sideList.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    const idx = STUDENT_PROJECTS.findIndex((p) => p.id === project.id);
                    if (idx >= 0) setActiveIdx(idx);
                  }}
                  className="group flex items-center space-x-4 bg-white p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <ImageWithFallback
                      src={getYouTubeThumbnailUrl(project.youtubeUrl) || ''}
                      alt={project.projectName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <span className="text-[10px] font-bold text-[#176DF8] uppercase tracking-wider mb-1 block">{project.category}</span>
                    <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-[#176DF8] transition-colors line-clamp-2">{project.projectName}</h4>
                    {project.studentName && <p className="text-xs text-slate-500 truncate">By {project.studentName}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export const CoreProgramPage: React.FC<CoreProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const diffCards = [
    {
      title: 'Learn How to Think',
      subtitle: 'Computational Thinking',
      icon: Brain,
      tone: 'text-blue-500 bg-blue-50',
    },
    {
      title: 'Learn How to Build',
      subtitle: 'Programming',
      icon: Code,
      tone: 'text-emerald-500 bg-emerald-50',
    },
    {
      title: 'Learn with AI',
      subtitle: 'AI Collaboration',
      icon: Cpu,
      tone: 'text-purple-500 bg-purple-50',
    },
    {
      title: 'Create Real Impact',
      subtitle: 'Innovation',
      icon: Rocket,
      tone: 'text-orange-500 bg-orange-50',
    }
  ];

  const philosophies = [
    {
      name: 'Think',
      icon: Brain,
      desc: 'Memahami masalah menggunakan Computational Thinking.'
    },
    {
      name: 'Build',
      icon: Code,
      desc: 'Mengubah ide menjadi aplikasi dan teknologi yang berfungsi.'
    },
    {
      name: 'Innovate',
      icon: Rocket,
      desc: 'Menciptakan solusi baru yang memberikan dampak nyata.'
    }
  ];

  const stages = [
    {
      title: 'Preschool',
      subtitle: 'Playful Logic',
      desc: 'Membangun rasa ingin tahu, logika dasar, sebab-akibat, dan problem solving melalui aktivitas bermain serta eksplorasi teknologi sederhana.',
      tech: ['ScratchJr', 'Robotics Basics', 'Logic Games'],
      asset: ASSETS.SPI_CORE.JOURNEY_PRESCHOOL,
      icon: Layout
    },
    {
      title: 'Foundation',
      subtitle: 'Visual Foundation',
      desc: 'Membangun fondasi Computational Thinking dan programming melalui visual coding, pola, algoritma sederhana, dan proyek kreatif.',
      tech: ['Scratch', 'Blockly', 'Code.org'],
      asset: ASSETS.SPI_CORE.JOURNEY_FOUNDATION,
      icon: Layers
    },
    {
      title: 'Development',
      subtitle: 'Logic Development',
      desc: 'Mengembangkan kemampuan programming, software development, dan teknologi melalui proyek yang semakin kompleks dan aplikatif.',
      tech: ['Advanced Scratch', 'Thunkable', 'Python'],
      asset: ASSETS.SPI_CORE.JOURNEY_DEVELOPMENT,
      icon: Cpu
    },
    {
      title: 'Exploration and Research',
      subtitle: 'Applied Research',
      desc: 'Menggunakan kompetensi teknologi untuk membangun solusi nyata, eksperimen, analisis, inovasi, dan pengembangan proyek yang lebih mendalam.',
      tech: ['Advanced Python', 'Data Science', 'Arduino', 'AI/ML'],
      asset: ASSETS.SPI_CORE.JOURNEY_RESEARCH,
      icon: Rocket
    }
  ];

  const topics = [
    "Scratch & mBlock",
    "Python Programming",
    "App Development",
    "Web Development",
    "AI & Machine Learning",
    "IoT & Robotics",
    "Data Science",
    "Game Development"
  ];

  const outcomes = [
    "Critical Thinker",
    "Problem Solver",
    "Digital Creator",
    "AI Collaborator",
    "Creative Innovator",
    "Future Ready"
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#176DF8] selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full mb-6 border border-blue-100">
                <Code2 className="w-4 h-4 text-[#176DF8]" />
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">Core Track</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Bangun Logika dan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176DF8] to-[#1059D4]">Problem Solving</span> Sejak Dini
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
                Program fundamental SPI yang dirancang untuk membangun pola pikir algoritmik, kreativitas, dan kemampuan problem solving melalui pemrograman.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenTrial}
                  className="bg-[#176DF8] hover:bg-[#1059D4] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-[#176DF8]/20 flex items-center space-x-2 group cursor-pointer"
                >
                  <span>Coba Gratis Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
                <div>
                  <h4 className="text-2xl font-black text-slate-800">4-18</h4>
                  <p className="text-xs text-slate-500 font-medium">Tahun Usia</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800">100%</h4>
                  <p className="text-xs text-slate-500 font-medium">Project Based</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800">4</h4>
                  <p className="text-xs text-slate-500 font-medium">Tahap Belajar</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-white/50 bg-white">
                <ImageWithFallback
                  src={ASSETS.SPI_CORE.HERO}
                  alt="SPI Core Program"
                  fallbackLabel="SPI Core Hero Visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Kenapa SPI Core Berbeda? */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Kenapa SPI Core Berbeda?</h2>
            <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diffCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-default">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${card.tone}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{card.title}</h3>
                  <p className="text-sm font-semibold text-slate-500">{card.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Filosofi Pembelajaran */}
      <div className="py-20 bg-gradient-to-br from-[#176DF8] to-[#0D47A1] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <div className="text-center space-y-4">
            <span className="text-blue-200 font-bold tracking-widest text-sm uppercase">Filosofi Pembelajaran</span>
            <h2 className="text-3xl lg:text-4xl font-black">Think → Build → Innovate</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-blue-400/30" />
            
            {philosophies.map((phil, idx) => {
              const Icon = phil.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-white text-[#176DF8] rounded-full flex items-center justify-center shadow-xl border-4 border-blue-400/30">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{phil.name}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed max-w-xs mx-auto">
                      {phil.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Learning Journey SPI Core — Rocket Journey */}
      <RocketJourneySection stages={stages} />

      {/* 5. Apa yang Dipelajari? */}
      <div id="core-curriculum" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Apa yang Dipelajari?</h2>
            <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {topics.map((topic, idx) => (
              <span key={idx} className="px-6 py-3 bg-blue-50 text-[#0D47A1] font-bold text-sm rounded-2xl border border-blue-100/50 hover:bg-[#176DF8] hover:text-white hover:border-[#176DF8] transition-colors cursor-default">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Project Siswa SPI Core */}
      <CoreStudentProjectsCarousel />

      {/* 7. Learning Outcomes Panel */}
      <div className="py-24 bg-[#0D47A1] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <h2 className="text-3xl lg:text-4xl font-black mb-8">Hasil Pembelajaran</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {outcomes.map((outcome, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#90CAF9]" />
                <span className="font-bold text-sm text-center leading-tight">{outcome}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-12">
            <button
              onClick={onOpenTrial}
              className="px-10 py-4 bg-white text-[#0D47A1] hover:bg-blue-50 active:scale-98 font-black text-lg rounded-2xl shadow-xl transition-all inline-flex items-center space-x-3 cursor-pointer"
            >
              <span>Daftar Free Trial SPI Core</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
