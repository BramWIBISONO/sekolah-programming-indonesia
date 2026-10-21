import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BrainCircuit, Rocket, CheckCircle2, Cpu, Database, Network, BookOpen, Clock, Target, Users, Layout, Layers, Code2, Brain, AlertCircle, Sparkles, Lightbulb, Code, Wrench, Search, Star, BookOpenCheck, Microscope, MonitorSmartphone, GraduationCap, Building2, Play, Youtube, ExternalLink, Filter } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { StudentProject } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ProjectVideoModal } from '../modals/ProjectVideoModal';
import { CoreLearningMethods } from '../program/CoreLearningMethods';
import { StudentWorkShowcase } from '../program/StudentWorkShowcase';
import {
  BuildAIScene,
  BuildBrainScene,
  BuildWebScene,
  ConnectBodyScene,
  ConnectSystemsScene,
  CreateExperienceScene,
  ExploreScene,
  PathwayFrame,
  PRESCHOOL_SKILLS,
  ResearchScene,
  ThinkPythonScene,
} from '../program/CorePathwayScenes';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpotlightLayer, spotlightMove } from '../common/Spotlight';

interface CoreProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const CoreProgramPage: React.FC<CoreProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<StudentProject | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SPI Core | Sekolah Programming Indonesia";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* 1. HERO: illustrated scene shared with the other product pages */}
      <IllustratedHero
        variant="core"
        eyebrow="SPI Core"
        title={<>Build the Mind. <span className="text-[#1870FF]">Build the Technology.</span> Create the Future.</>}
        lead="A complete technology learning journey for the AI era."
        description="SPI Core membantu siswa berkembang secara bertahap dari memahami cara berpikir komputasional, membangun solusi digital, menemukan bidang spesialisasi, hingga menciptakan inovasi yang memberikan dampak nyata."
        art={ASSETS.programs.spiCore}
        artAlt="Ilustrasi SPI Core"
        primary={{ label: 'Explore SPI Core', onClick: () => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }) }}
        secondary={{ label: 'Find Your Learning Path', onClick: onOpenTrial }}
        onBack={onBack}
        backLabel="Kembali ke Beranda"
        highlights={[
          { icon: 'think', label: 'Scratch & mBlock' },
          { icon: 'terminal', label: 'Python' },
          { icon: 'engineering', label: 'Arduino & Robotics' },
        ]}
        bottomFill="#FFFFFF"
      />

      {/* 2. WHY SPI CORE (The Problem & Solution) */}
      <section className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Decorative backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/40 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-[#F0F6FF]/60 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-20 md:mb-28"
          >
            <span className="inline-block px-5 py-2 bg-blue-50 text-[#1870FF] font-bold rounded-full text-xs tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm uppercase">WHY SPI CORE</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#102A56] mb-6 max-w-4xl mx-auto leading-[1.1] tracking-tight">
              Technology Changes Fast.<br />
              <span className="text-[#1870FF]">The Way We Think Matters More.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {[
                { 
                  icon: AlertCircle, 
                  text: "Perkembangan Artificial Intelligence membuat proses menulis kode, membuat aplikasi, dan menghasilkan berbagai bentuk teknologi menjadi semakin mudah.",
                  highlight: false
                },
                { 
                  icon: Brain, 
                  text: "Namun kemampuan menggunakan teknologi tidak sama dengan kemampuan memahami masalah, merancang solusi, mengevaluasi hasil, dan mengambil keputusan.",
                  highlight: false
                },
                { 
                  icon: Sparkles, 
                  text: "SPI Core hadir untuk membangun kemampuan tersebut secara bertahap. Siswa tidak hanya belajar menggunakan teknologi, tetapi memahami konsep di balik teknologi, membangun solusi, dan menciptakan inovasi.",
                  highlight: true
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex gap-5 p-6 rounded-3xl transition-all duration-300 ${item.highlight ? 'bg-blue-50/50 border border-blue-100 shadow-sm' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${item.highlight ? 'bg-[#1870FF] text-white' : 'bg-white border border-slate-200 text-[#1870FF]'}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <p className={`text-lg leading-relaxed ${item.highlight ? 'text-[#102A56] font-bold' : 'text-slate-600'}`}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1870FF] to-[#0A47B8] rounded-[2.5rem] blur-2xl opacity-20 transform translate-y-4 scale-95" />
              <div className="bg-gradient-to-br from-[#102A56] to-[#061F55] rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
                {/* Decorative glowing orb */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1870FF]/30 rounded-full blur-3xl group-hover:bg-[#1870FF]/40 transition-colors duration-700" />
                
                <Lightbulb className="w-14 h-14 text-[#5BA7FF] mb-10 relative z-10 drop-shadow-[0_0_15px_rgba(91,167,255,0.4)]" />
                
                <h3 className="text-3xl md:text-4xl font-extrabold leading-[1.2] mb-8 relative z-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                  "AI may make technology easier to build. SPI Core develops the thinking required to build it well."
                </h3>
                
                <div className="w-12 h-1 bg-[#1870FF] rounded-full mb-8 relative z-10" />
                
                <p className="text-xl text-blue-100/80 font-medium relative z-10">
                  Learning technology should be a journey, not a collection of random classes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HOW SPI CORE WORKS / PHILOSOPHY */}
      <section id="philosophy" className="py-16 sm:py-24 md:py-32 bg-[#F8FAFC] border-t border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <span className="inline-block px-5 py-2 bg-blue-50 text-[#1870FF] font-bold rounded-full text-xs tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm uppercase">THE SPI CORE PHILOSOPHY</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#102A56] mb-8 tracking-tight">
              Think <span className="text-[#1870FF] mx-2">→</span> 
              Build <span className="text-[#1870FF] mx-2">→</span> 
              Specialize <span className="text-[#1870FF] mx-2">→</span> 
              Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Setiap tahap SPI Core memiliki tujuan perkembangan yang berbeda. Siswa tidak dipaksa langsung menjadi spesialis, tetapi dibangun secara bertahap sesuai dengan kesiapan belajar, pengalaman, minat, dan potensinya.
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-[3px] bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-[#1870FF] via-[#5BA7FF] to-[#1870FF]"
              />
            </div>
            
            {/* Mobile Vertical Line */}
            <div className="lg:hidden absolute top-[50px] bottom-[50px] left-[43px] w-[3px] bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="w-full bg-gradient-to-b from-[#1870FF] via-[#5BA7FF] to-[#1870FF]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {[
                { step: '01', name: 'Foundation', identity: 'Learn to Think', desc: 'Understand problems, patterns, logic, algorithms, and computational thinking.', icon: Brain },
                { step: '02', name: 'Development', identity: 'Learn to Build', desc: 'Turn ideas into applications, systems, websites, devices, and digital solutions.', icon: Wrench },
                { step: '03', name: 'Exploration', identity: 'Learn to Specialize', desc: 'Develop deeper competence in a technology field aligned with individual interests.', icon: Target },
                { step: '04', name: 'Research', identity: 'Learn to Create Impact', desc: 'Apply technology through research, innovation, and social projects.', icon: Rocket }
              ].map((stage, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + (idx * 0.2) }}
                  className="flex flex-row lg:flex-col items-start lg:items-center relative group"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-[104px] h-[104px] bg-white rounded-3xl border-4 border-[#EAF4FF] group-hover:border-[#1870FF] group-hover:-translate-y-2 transition-all duration-300 shadow-xl z-10 relative lg:mx-auto">
                    <stage.icon className="w-10 h-10 text-[#1870FF]" />
                    <div className="absolute -top-3 -right-3 w-9 h-9 bg-[#102A56] rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md transform rotate-3 group-hover:rotate-6 transition-transform">
                      {stage.step}
                    </div>
                  </div>
                  <div className="ml-8 lg:ml-0 lg:mt-10 lg:text-center flex-grow bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-slate-100 lg:border-none">
                    <span className="text-[#1870FF] font-bold text-[11px] tracking-[0.2em] uppercase mb-2 block">{stage.identity}</span>
                    <h3 className="text-2xl font-black text-[#102A56] mb-3 group-hover:text-[#1870FF] transition-colors">{stage.name}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">{stage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM-UP LEARNING & READINESS */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#0A1930] text-white relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1870FF]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#5BA7FF]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1870FF]/20 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-[#1870FF]/20 text-[#5BA7FF] font-bold rounded-xl text-xs tracking-[0.2em] mb-6 border border-[#1870FF]/30 backdrop-blur-sm">LEARNING READINESS</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">Not Every Student Starts at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5BA7FF] to-[#1870FF]">Same Place.</span></h2>
                <p className="text-lg text-blue-100/70 leading-relaxed mb-6 font-light">
                  SPI Core menggunakan learning readiness sebagai dasar penempatan siswa. Usia menjadi salah satu referensi, tetapi bukan satu-satunya penentu. Siswa dapat masuk pada tahap yang sesuai dengan kompetensi dan pengalamannya.
                </p>
                <div className="flex items-center gap-4 text-[#5BA7FF] font-semibold bg-white/5 p-4 rounded-2xl border border-white/10 w-fit">
                  <Target className="w-5 h-5" />
                  <span>Different starting points. One long-term pathway.</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1870FF] to-transparent" />
                <span className="inline-block px-4 py-1.5 bg-[#1870FF]/20 text-[#5BA7FF] font-bold rounded-xl text-xs tracking-[0.2em] mb-6 border border-[#1870FF]/30 backdrop-blur-sm">THE SPI APPROACH</span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Build From the Foundation Up.</h2>
                <p className="text-lg text-blue-100/70 leading-relaxed font-light">
                  Siswa membangun kompetensi secara bertahap dari cara berpikir, konsep dasar, kemampuan membangun solusi, spesialisasi, hingga inovasi. <span className="text-white font-medium">Strong foundations enable deeper technology capabilities.</span>
                </p>
              </div>
            </motion.div>

            {/* Pyramid / Layered Foundation Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-6 sm:p-10 md:p-14 bg-gradient-to-br from-[#102A56]/80 to-[#061F55]/80 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-end gap-4 min-h-[500px] shadow-2xl backdrop-blur-xl group"
            >
              {/* Central Glowing Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#1870FF]/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#1870FF]/30 transition-colors duration-700" />

              {[
                { layer: '05', title: 'Innovation', desc: 'Research, product development, entrepreneurship, and impact', width: 'w-full md:w-[50%]', color: 'from-[#5BA7FF] to-[#3A8DFF]' },
                { layer: '04', title: 'Specialization', desc: 'Deep expertise in selected technology fields', width: 'w-full md:w-[65%]', color: 'from-[#3A8DFF] to-[#1870FF]' },
                { layer: '03', title: 'Building', desc: 'Applications, systems, devices, and digital products', width: 'w-full md:w-[80%]', color: 'from-[#1870FF] to-[#1059D4]' },
                { layer: '02', title: 'Programming', desc: 'Programming concepts and software development', width: 'w-full md:w-[90%]', color: 'from-[#1059D4] to-[#0B3D91]' },
                { layer: '01', title: 'Thinking', desc: 'Computational Thinking and problem solving', width: 'w-full md:w-[100%]', color: 'from-[#0B3D91] to-[#06245C]' }
              ].map((level, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                  className={`${level.width} bg-gradient-to-r ${level.color} p-5 rounded-2xl text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[#1870FF]/30 hover:shadow-xl relative cursor-default border border-white/10 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
                  <p className="font-extrabold text-white text-xl tracking-wide">{level.title}</p>
                  <div className="absolute inset-0 flex items-center justify-center bg-[#061F55]/95 backdrop-blur-sm rounded-2xl px-6 text-center opacity-0 hover:opacity-100 transition-all duration-300 border border-[#1870FF]/30">
                    <p className="text-sm text-blue-100 font-medium">
                      {level.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. CURRICULUM OVERVIEW */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-20 md:mb-28"
          >
            <span className="inline-block px-5 py-2 bg-blue-50 text-[#1870FF] font-bold rounded-full text-xs tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm uppercase">THE LEARNING PATHWAY</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#102A56] mb-8 tracking-tight leading-[1.1]">
              One Pathway. Four Stages.<br />
              <span className="text-[#1870FF]">Endless Possibilities.</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              SPI Core dibangun sebagai perjalanan pembelajaran yang berkembang dari fondasi berpikir menuju pembangunan teknologi, spesialisasi, dan inovasi.
            </p>
          </motion.div>

          <div className="space-y-10">

            {/* Preschool */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row gap-10 items-center md:items-start group hover:border-[#1870FF]/20 transition-colors"
            >
              <div className="w-full md:w-1/3">
                <div className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 font-bold text-[11px] tracking-widest rounded-xl mb-6 border border-purple-100 uppercase">Early Discovery</div>
                <h3 className="text-3xl font-black text-[#102A56] mb-4 tracking-tight">Preschool</h3>
                <p className="text-slate-500 text-base leading-relaxed">Membangun logika dasar, pola, kreativitas, dan kemampuan berpikir melalui aktivitas visual dan permainan edukatif.</p>
              </div>
              <div className="w-full md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {PRESCHOOL_SKILLS.map(({ name, Tile }, idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                    key={name}
                    onPointerMove={spotlightMove}
                    className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-[#E4ECF8] bg-white p-3 shadow-[0_14px_30px_-22px_rgba(4,26,90,0.35)] transition-[box-shadow,border-color] duration-300 hover:border-[#1870FF]/35 hover:shadow-[0_24px_44px_-24px_rgba(24,112,255,0.45)]"
                  >
                    <SpotlightLayer />
                    <PathwayFrame mini>
                      <Tile />
                    </PathwayFrame>
                    <p className="text-center text-sm font-bold text-slate-700">{name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-[#1870FF]/10 shadow-xl shadow-[#1870FF]/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="mb-12">
                <div className="inline-block px-4 py-1.5 bg-[#1870FF] text-white font-bold text-[11px] tracking-widest rounded-xl mb-6 shadow-md shadow-[#1870FF]/20 uppercase">Learn to Think</div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#102A56] mb-5 tracking-tight">SPI Foundation</h3>
                <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                  Membangun fondasi Computational Thinking dan Programming melalui pendekatan visual, interaktif, dan berbasis proyek.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "Foundation 1.0", title: "Build the Brain", tech: "Block Programming", topics: "Algorithm, Sequence, Variables, Logic, Loops", Scene: BuildBrainScene },
                  { name: "Foundation 1.1", title: "Connect the Body", tech: "Robotics / Arduino", topics: "Digital I/O, Sensors, Motors, Automation", Scene: ConnectBodyScene },
                  { name: "Foundation 1.2", title: "Create the Experience", tech: "Mobile App Dev", tech_tool: "MIT App Inventor", topics: "UI/UX, Components, Data Flow, Database", Scene: CreateExperienceScene }
                ].map((lvl, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    key={idx}
                    className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:shadow-[#1870FF]/10 hover:-translate-y-1 transition-all duration-300 group/card"
                  >
                    <PathwayFrame className="mb-6">
                      <lvl.Scene />
                    </PathwayFrame>
                    <span className="text-xs font-black text-[#1870FF] tracking-wider uppercase mb-2 block">{lvl.name}</span>
                    <h4 className="text-2xl font-bold text-[#102A56] mb-5 tracking-tight group-hover/card:text-[#1870FF] transition-colors">{lvl.title}</h4>
                    <div className="text-[13px] font-bold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl mb-6 inline-block shadow-sm">{lvl.tech}</div>
                    <div className="flex flex-wrap gap-2">
                      {lvl.topics.split(', ').map((topic) => (
                        <span key={topic} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[12px] font-bold text-slate-600">{topic}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Development */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-[#1870FF]/10 shadow-xl shadow-[#1870FF]/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700" />
              <div className="mb-12">
                <div className="inline-block px-4 py-1.5 bg-[#1870FF] text-white font-bold text-[11px] tracking-widest rounded-xl mb-6 shadow-md shadow-[#1870FF]/20 uppercase">Learn to Build</div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#102A56] mb-5 tracking-tight">SPI Development</h3>
                <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                  Membawa siswa dari pemahaman konsep programming menuju kemampuan membangun solusi digital menggunakan bahasa pemrograman berbasis teks dan teknologi profesional.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Think with Python", desc: "Python, Logic, OOP, Data Structures, Desktop Apps", Scene: ThinkPythonScene },
                  { name: "Build for the Web", desc: "HTML, CSS, JS, DOM, Responsive UI, Deployment", Scene: BuildWebScene },
                  { name: "Connect Smart Systems", desc: "Python, ESP32, MQTT, Sensors, IoT Automation", Scene: ConnectSystemsScene },
                  { name: "Build Intelligent Systems", desc: "Data Literacy, ML Basics, Prompt Engineering, AI Dev", Scene: BuildAIScene }
                ].map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                    key={idx}
                    className="bg-[#F8FAFC] border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:shadow-[#1870FF]/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <PathwayFrame className="mb-5">
                      <item.Scene />
                    </PathwayFrame>
                    <h4 className="text-xl font-bold text-[#102A56] mb-4 tracking-tight">{item.name}</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.desc.split(', ').map((topic) => (
                        <span key={topic} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[12px] font-bold text-slate-600">{topic}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Exploration & Research (Split) */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* Exploration */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-[#0A1930] to-[#102A56] text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-white/10 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1870FF]/20 rounded-bl-full -z-10 blur-2xl group-hover:bg-[#1870FF]/30 group-hover:scale-125 transition-all duration-700" />
                <PathwayFrame className="mb-8">
                  <ExploreScene />
                </PathwayFrame>
                <div className="inline-block px-4 py-1.5 bg-white/10 text-[#5BA7FF] font-bold text-[11px] tracking-widest rounded-xl mb-8 border border-white/10 backdrop-blur-sm uppercase">Learn to Specialize</div>
                <h3 className="text-4xl font-black mb-6 tracking-tight">SPI Exploration</h3>
                <p className="text-blue-100/80 text-lg mb-10 leading-relaxed font-light">
                  Membantu siswa memilih dan mendalami bidang teknologi yang paling sesuai dengan minat, kemampuan, dan tujuan masa depannya. <span className="text-white font-medium">From Generalist to Specialist.</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {["AI", "Machine Learning", "Web Dev", "Mobile Apps", "Robotics", "Game Dev"].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-xs font-bold text-white/90 border border-white/10 backdrop-blur-sm cursor-default">{tag}</span>
                  ))}
                </div>
              </motion.div>

              {/* Research */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-[#1870FF] to-[#0A47B8] text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 border border-[#5BA7FF]/30 shadow-2xl shadow-[#1870FF]/20 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-bl-full -z-10 blur-2xl group-hover:bg-white/30 group-hover:scale-125 transition-all duration-700" />
                <PathwayFrame className="mb-8">
                  <ResearchScene />
                </PathwayFrame>
                <div className="inline-block px-4 py-1.5 bg-white text-[#1870FF] font-bold text-[11px] tracking-widest rounded-xl mb-8 shadow-md uppercase">Learn to Create Impact</div>
                <h3 className="text-4xl font-black mb-6 tracking-tight">SPI Research</h3>
                <p className="text-blue-50/90 text-lg mb-10 leading-relaxed font-light">
                  Menggunakan kompetensi teknologi yang telah dibangun untuk melakukan penelitian, mengembangkan inovasi, dan menciptakan solusi nyata.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Scientific Paper", "Startup Prototype", "Social Innovation", "Industry Project", "Competition Project"].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-black/10 hover:bg-black/20 transition-colors rounded-xl text-xs font-bold text-white border border-white/20 backdrop-blur-sm cursor-default">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. HOW STUDENTS LEARN & GRADUATE PROFILE */}
      <CoreLearningMethods />

      {/* 7. STUDENT WORK SHOWCASE */}
      <StudentWorkShowcase onSelectProject={setSelectedProjectForModal} />

      {/* 8. FUTURE PATHWAY & FOR PARENTS */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-10" />
              
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#1870FF] font-bold rounded-xl text-[11px] tracking-widest mb-6 border border-blue-100 uppercase shadow-sm">WHERE THE JOURNEY CAN LEAD</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-8 tracking-tight">One Foundation.<br /><span className="text-[#1870FF]">Many Possible Futures.</span></h2>
              
              <div className="flex flex-wrap gap-3">
                {["Competitions", "Technology Research", "Industry Collaboration", "Internship", "Technology Entrepreneurship", "Startup Development", "Scientific Publication", "Computer Science", "Artificial Intelligence"].map((path, idx) => (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + (idx * 0.05) }}
                    key={path} 
                    className="px-5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#1870FF] hover:text-white hover:border-[#1870FF] hover:shadow-md transition-all cursor-default"
                  >
                    {path}
                  </motion.span>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-xs text-slate-400 italic font-medium leading-relaxed">Note: These are possible pathways that students can pursue based on their readiness, specialization, and independent achievements.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-5 py-2 bg-blue-50 text-[#1870FF] font-bold rounded-full text-xs tracking-[0.2em] mb-6 border border-blue-100/50 shadow-sm uppercase">FOR PARENTS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-10 tracking-tight leading-tight">A Learning Path That <span className="text-[#1870FF]">Grows With Your Child.</span></h2>
              
              <ul className="space-y-6">
                {[
                  "Parents can see how learning progresses from basic thinking to advanced technology.",
                  "Students are not forced to specialize too early.",
                  "Learning can adapt to individual readiness.",
                  "Projects provide tangible evidence of learning.",
                  "Portfolio development happens progressively.",
                  "Advanced students can move toward research and innovation."
                ].map((benefit, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                    key={idx} 
                    className="flex gap-4 items-start group"
                  >
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1870FF] transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#1870FF] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-slate-600 font-medium text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 9. CORE STORY / CTA */}
      <section className="py-16 sm:py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-blue-50/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center space-x-3 mb-10 text-[#1870FF] font-bold text-sm tracking-[0.2em] uppercase bg-white px-6 py-3 rounded-full border border-blue-100 shadow-sm"
          >
            <span>Think</span> <ArrowRight className="w-4 h-4 text-blue-300" />
            <span>Build</span> <ArrowRight className="w-4 h-4 text-blue-300" />
            <span>Specialize</span> <ArrowRight className="w-4 h-4 text-blue-300" />
            <span>Impact</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#102A56] mb-8 tracking-tight leading-[1.1]"
          >
            Don't Just Teach Technology.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1870FF] to-[#0A47B8]">Build the Ability to Create With It.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 mb-16 leading-relaxed max-w-3xl mx-auto font-light"
          >
            SPI Core dirancang untuk membangun kemampuan siswa secara bertahap. Mereka mulai dengan memahami cara berpikir, belajar membangun solusi, menemukan bidang teknologi yang sesuai, kemudian menggunakan kompetensi tersebut untuk menciptakan inovasi dan memberikan dampak.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-[#102A56] to-[#061F55] rounded-[3rem] p-12 md:p-16 border border-blue-900/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1870FF]/30 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#5BA7FF]/20 blur-3xl rounded-full" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Where Will Your Technology<br />Journey Begin?</h3>
              <p className="text-blue-100/80 mb-12 max-w-2xl mx-auto text-lg leading-relaxed font-light">
                Mulai dari tahap yang sesuai dengan kemampuan dan kesiapan belajar siswa, lalu berkembang secara bertahap menuju teknologi dan tantangan yang lebih kompleks.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button
                  onClick={onOpenTrial}
                  className="w-full sm:w-auto px-10 py-5 bg-[#1870FF] text-white font-bold rounded-2xl hover:bg-[#3A8DFF] transition-all duration-300 shadow-lg hover:shadow-[#1870FF]/40 hover:-translate-y-1 flex items-center justify-center space-x-3 group"
                >
                  <span className="text-lg">Find Your Learning Path</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => window.location.href = '/programs'}
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center justify-center space-x-3 group"
                >
                  <span className="text-lg">Explore SPI Programs</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <ProjectVideoModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />

    </div>
  );
};
