import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../i18n';

const TRANSLATIONS = {
  id: {
    eyebrow: "HOW SPI GROWS WITH YOUR CHILD",
    title: "From Curiosity to Creation.",
    description: "SPI membangun ekosistem pembelajaran teknologi yang berkembang bersama siswa, dari membangun fondasi berpikir hingga mengeksplorasi, membangun, dan menciptakan solusi dengan teknologi.",
    closing: "Tidak harus langsung tahu ingin menjadi apa. Yang penting adalah memiliki kesempatan untuk terus belajar, mencoba, membangun, dan menemukan potensinya.",
    curiosity: "Curiosity",
    curiosity_desc: "Pola pikir awal rasa ingin tahu",
    inschool_label: "SCHOOL ECOSYSTEM",
    inschool_title: "Extend the Ecosystem",
    inschool_desc: "Menghadirkan pengalaman belajar teknologi ke lingkungan sekolah melalui kurikulum, program teknologi, dan pengembangan kompetensi guru.",
    inschool_keys: ["School Partnership", "Curriculum Integration", "Teacher Training", "Technology Education"],
    journey: [
      {
        number: "01",
        program: "SPI Core",
        label: "BUILD THE FOUNDATION",
        headline: "Think.",
        subheadline: "Build the foundation.",
        description: "Membangun Computational Thinking, programming, dan pengalaman membuat project sebagai fondasi teknologi siswa.",
        keywords: ["Programming", "Logic", "Computational Thinking", "Projects"]
      },
      {
        number: "02",
        program: "SPI Lab",
        label: "EXPLORE & CREATE",
        headline: "Explore.",
        subheadline: "Create with technology.",
        description: "Mengembangkan kreativitas dan kemampuan menggunakan teknologi digital, AI, design, productivity tools, dan berbagai teknologi praktis.",
        keywords: ["AI", "Digital Tools", "Design", "Productivity", "Creative Technology"]
      },
      {
        number: "03",
        program: "SPI Engineering",
        label: "BUILD ADVANCED SYSTEMS",
        headline: "Build.",
        subheadline: "Engineer advanced technology.",
        description: "Membawa siswa lebih jauh ke programming, AI, machine learning, data, robotics, IoT, dan pengembangan sistem teknologi yang lebih kompleks.",
        keywords: ["AI", "Machine Learning", "Data", "Robotics", "IoT", "Engineering"]
      }
    ],
    impact_title: "CREATE IMPACT",
    impact_headline: "Create.",
    impact_desc: "Menggunakan kemampuan teknologi untuk membangun solusi yang bermakna."
  },
  en: {
    eyebrow: "HOW SPI GROWS WITH YOUR CHILD",
    title: "From Curiosity to Creation.",
    description: "SPI builds a technology learning ecosystem that evolves with students, from developing thinking foundations to exploring, building, and creating technology solutions.",
    closing: "You don't have to know what you want to be right away. What matters is having the opportunity to keep learning, trying, building, and discovering your potential.",
    curiosity: "Curiosity",
    curiosity_desc: "The initial spark of interest",
    inschool_label: "SCHOOL ECOSYSTEM",
    inschool_title: "Extend the Ecosystem",
    inschool_desc: "Bringing the technology learning experience to the school environment through curriculum, technology programs, and teacher competency development.",
    inschool_keys: ["School Partnership", "Curriculum Integration", "Teacher Training", "Technology Education"],
    journey: [
      {
        number: "01",
        program: "SPI Core",
        label: "BUILD THE FOUNDATION",
        headline: "Think.",
        subheadline: "Build the foundation.",
        description: "Developing Computational Thinking, programming, and project creation as students' technology foundations.",
        keywords: ["Programming", "Logic", "Computational Thinking", "Projects"]
      },
      {
        number: "02",
        program: "SPI Lab",
        label: "EXPLORE & CREATE",
        headline: "Explore.",
        subheadline: "Create with technology.",
        description: "Developing creativity and the ability to use digital technology, AI, design, productivity tools, and practical skills.",
        keywords: ["AI", "Digital Tools", "Design", "Productivity", "Creative Technology"]
      },
      {
        number: "03",
        program: "SPI Engineering",
        label: "BUILD ADVANCED SYSTEMS",
        headline: "Build.",
        subheadline: "Engineer advanced technology.",
        description: "Leading students further into programming, AI, machine learning, data, robotics, IoT, and complex technology system development.",
        keywords: ["AI", "Machine Learning", "Data", "Robotics", "IoT", "Engineering"]
      }
    ],
    impact_title: "CREATE IMPACT",
    impact_headline: "Create.",
    impact_desc: "Applying technology skills to build meaningful solutions."
  },
  zh: {
    eyebrow: "SPI 如何伴随您的孩子成长",
    title: "从好奇到创造。",
    description: "SPI 打造了一个与学生共同进化的技术学习生态系统，从培养思维基础到探索、构建和创造技术解决方案。",
    closing: "你不必马上知道自己想成为什么样的人。最重要的是有机会不断学习、尝试、构建并发现自己的潜力。",
    curiosity: "好奇心",
    curiosity_desc: "最初的兴趣火花",
    inschool_label: "学校生态系统",
    inschool_title: "拓展生态系统",
    inschool_desc: "通过课程整合、技术项目和教师能力培训，将技术学习体验引入学校环境。",
    inschool_keys: ["学校合作", "课程整合", "教师培训", "技术教育"],
    journey: [
      {
        number: "01",
        program: "SPI Core",
        label: "打下坚实基础",
        headline: "思考。",
        subheadline: "构建技术基石。",
        description: "培养计算思维、编程和项目创作经验，作为学生的技术基础。",
        keywords: ["编程", "逻辑", "计算思维", "项目"]
      },
      {
        number: "02",
        program: "SPI Lab",
        label: "探索与创造",
        headline: "探索。",
        subheadline: "用技术进行创造。",
        description: "培养创造力以及使用数字技术、人工智能、设计、办公软件和各种实用技术的能力。",
        keywords: ["人工智能", "数字工具", "设计", "生产力", "创意技术"]
      },
      {
        number: "03",
        program: "SPI Engineering",
        label: "构建高级系统",
        headline: "构建。",
        subheadline: "开发先进的技术系统。",
        description: "引导学生深入学习编程、人工智能、机器学习、数据、机器人、物联网和复杂的系统开发。",
        keywords: ["人工智能", "机器学习", "数据", "机器人", "物联网", "系统工程"]
      }
    ],
    impact_title: "创造影响力",
    impact_headline: "创造。",
    impact_desc: "运用技术技能构建有意义的解决方案。"
  }
};

export const GlobalCodingSection: React.FC = () => {
  const { lang } = useLanguage();
  const content = TRANSLATIONS[lang] || TRANSLATIONS['id'];

  const [activeStage, setActiveStage] = useState<number | string>(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const anim = (initial: any, whileInView: any, transition: any) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, scale: 1, pathLength: 1 },
        animate: { opacity: 1, scale: 1, pathLength: 1 }
      };
    }
    return {
      initial,
      whileInView,
      viewport: { once: true },
      transition
    };
  };

  const getPathOpacity = (stage: number | string) => {
    if (activeStage === stage) return 1;
    return 0.35;
  };

  const getPathWidth = (stage: number | string) => {
    if (activeStage === stage) return 3.5;
    return 2;
  };

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      
      {/* Background Radial Glow Effect */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 45%, rgba(24,107,246,0.06), transparent 50%)'
        }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Centered Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center px-4 py-1.5 bg-[#EAF2FF] text-[#186BF6] border border-[#D6E5FF] font-bold rounded-full text-[10px] tracking-wider uppercase">
            {content.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0B2454] tracking-tight leading-tight">
            {content.title}
          </h2>
          <p className="text-[#526A8F] text-base sm:text-lg leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* --- DESKTOP VISUALIZATION (Horizontal flow) --- */}
        <div className="hidden lg:block relative w-full h-[480px]">
          
          {/* Background SVG Pathway */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 320">
            {/* Primary Journey Line */}
            <motion.path
              d="M 50 100 L 950 100"
              stroke="#186BF6"
              strokeWidth={getPathWidth(activeStage)}
              fill="none"
              strokeLinecap="round"
              style={{ transition: 'opacity 300ms, stroke-width 300ms' }}
              opacity={activeStage === 'inschool' ? 0.2 : 0.6}
              {...anim({ pathLength: 0 }, { pathLength: 1 }, { duration: 1.2, ease: "easeInOut" })}
            />

            {/* School Pathway Branch (Bending downwards from SPI Core to SPI InSchool) */}
            <motion.path
              d="M 250 100 C 250 180, 310 240, 375 240"
              stroke="#186BF6"
              strokeWidth={activeStage === 'inschool' ? 3.5 : 2}
              fill="none"
              strokeLinecap="round"
              style={{ transition: 'opacity 300ms, stroke-width 300ms' }}
              opacity={activeStage === 'inschool' ? 1.0 : 0.35}
              {...anim({ pathLength: 0 }, { pathLength: 1 }, { duration: 1.2, delay: 0.5, ease: "easeInOut" })}
            />

            {/* Slow restrained moving pulses */}
            {!prefersReducedMotion && (
              <>
                <circle r="3" fill="#186BF6">
                  <animateMotion dur="6s" repeatCount="indefinite" path="M 50 100 L 950 100" />
                </circle>
                <circle r="3" fill="#186BF6">
                  <animateMotion dur="5s" begin="1.5s" repeatCount="indefinite" path="M 250 100 C 250 180, 310 240, 375 240" />
                </circle>
              </>
            )}
          </svg>

          {/* --- INTERACTIVE NODES (Absolute percentages coordinates) --- */}

          {/* Node 0: Curiosity (Origin point) */}
          <div className="absolute left-[5%] top-[100px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <motion.div 
              {...anim({ scale: 0 }, { scale: 1 }, { duration: 0.5 })}
              className="w-4 h-4 rounded-full bg-[#186BF6] shadow-[0_0_12px_rgba(24,107,246,0.6)]"
            />
            <span className="text-[10px] font-bold text-[#526A8F] uppercase mt-2">{content.curiosity}</span>
          </div>

          {/* Node 1: SPI Core Card */}
          <motion.div 
            {...anim({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.2 })}
            onMouseEnter={() => setActiveStage(1)}
            className={`absolute left-[25%] top-[100px] -translate-x-1/2 -translate-y-1/2 w-[180px] bg-white border rounded-2xl p-4 flex flex-col space-y-2 cursor-pointer shadow-sm transition-all duration-300 ${
              activeStage === 1 ? 'border-[#186BF6] shadow-[0_12px_30px_rgba(24,107,246,0.08)] -translate-y-[calc(50%+6px)]' : 'border-[#D6E5FF]'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#186BF6] uppercase tracking-wider">{content.journey[0].label}</span>
              <span className="text-xs font-black text-[#186BF6]">{content.journey[0].number}</span>
            </div>
            <h3 className="text-base font-extrabold text-[#0B2454] leading-tight">{content.journey[0].program}</h3>
            <p className="text-[11px] text-[#526A8F] leading-tight">{content.journey[0].description}</p>
            {activeStage === 1 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {content.journey[0].keywords.map((k) => (
                  <span key={k} className="text-[8px] font-bold bg-[#EAF2FF] text-[#186BF6] px-1.5 py-0.5 rounded">{k}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Node 2: SPI Lab Card */}
          <motion.div 
            {...anim({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.35 })}
            onMouseEnter={() => setActiveStage(2)}
            className={`absolute left-[50%] top-[100px] -translate-x-1/2 -translate-y-1/2 w-[180px] bg-white border rounded-2xl p-4 flex flex-col space-y-2 cursor-pointer shadow-sm transition-all duration-300 ${
              activeStage === 2 ? 'border-[#186BF6] shadow-[0_12px_30px_rgba(24,107,246,0.08)] -translate-y-[calc(50%+6px)]' : 'border-[#D6E5FF]'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#186BF6] uppercase tracking-wider">{content.journey[1].label}</span>
              <span className="text-xs font-black text-[#186BF6]">{content.journey[1].number}</span>
            </div>
            <h3 className="text-base font-extrabold text-[#0B2454] leading-tight">{content.journey[1].program}</h3>
            <p className="text-[11px] text-[#526A8F] leading-tight">{content.journey[1].description}</p>
            {activeStage === 2 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {content.journey[1].keywords.map((k) => (
                  <span key={k} className="text-[8px] font-bold bg-[#EAF2FF] text-[#186BF6] px-1.5 py-0.5 rounded">{k}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Node 3: SPI Engineering Card */}
          <motion.div 
            {...anim({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.5 })}
            onMouseEnter={() => setActiveStage(3)}
            className={`absolute left-[75%] top-[100px] -translate-x-1/2 -translate-y-1/2 w-[180px] bg-white border rounded-2xl p-4 flex flex-col space-y-2 cursor-pointer shadow-sm transition-all duration-300 ${
              activeStage === 3 ? 'border-[#082B72] shadow-[0_12px_30px_rgba(8,43,114,0.08)] -translate-y-[calc(50%+6px)]' : 'border-[#D6E5FF]'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#082B72] uppercase tracking-wider">{content.journey[2].label}</span>
              <span className="text-xs font-black text-[#082B72]">{content.journey[2].number}</span>
            </div>
            <h3 className="text-base font-extrabold text-[#0B2454] leading-tight">{content.journey[2].program}</h3>
            <p className="text-[11px] text-[#526A8F] leading-tight">{content.journey[2].description}</p>
            {activeStage === 3 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {content.journey[2].keywords.map((k) => (
                  <span key={k} className="text-[8px] font-bold bg-[#EAF2FF] text-[#082B72] px-1.5 py-0.5 rounded">{k}</span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Node 4: Create Impact (Outcome target) */}
          <div className="absolute left-[95%] top-[100px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <motion.div 
              animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full border-2 border-[#186BF6] bg-white flex items-center justify-center shadow-[0_8px_24px_rgba(24,107,246,0.15)]"
            >
              <div className="w-4 h-4 rounded-full bg-[#186BF6]" />
            </motion.div>
            <span className="text-[10px] font-black text-[#186BF6] uppercase tracking-wider mt-2">{content.impact_title}</span>
          </div>

          {/* Node 5: SPI InSchool Parallel Ecosystem Branch */}
          <motion.div 
            {...anim({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { duration: 0.5, delay: 0.65 })}
            onMouseEnter={() => setActiveStage('inschool')}
            className={`absolute left-[37.5%] top-[240px] -translate-x-1/2 -translate-y-1/2 w-[220px] bg-white border border-dashed rounded-2xl p-4 flex flex-col space-y-2 cursor-pointer shadow-sm transition-all duration-300 ${
              activeStage === 'inschool' ? 'border-[#186BF6] shadow-[0_12px_30px_rgba(24,107,246,0.08)] -translate-y-[calc(50%+6px)]' : 'border-[#D6E5FF]'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[#186BF6] uppercase tracking-wider">{content.inschool_label}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#186BF6]" />
            </div>
            <h3 className="text-base font-extrabold text-[#0B2454] leading-tight">{content.inschool_title}</h3>
            <p className="text-[11px] text-[#526A8F] leading-tight">{content.inschool_desc}</p>
            {activeStage === 'inschool' && (
              <div className="flex flex-wrap gap-1 pt-1">
                {content.inschool_keys.map((k) => (
                  <span key={k} className="text-[8px] font-bold bg-[#EAF2FF] text-[#186BF6] px-1.5 py-0.5 rounded">{k}</span>
                ))}
              </div>
            )}
          </motion.div>

        </div>

        {/* --- TABLET/MOBILE RESPONSIVE JOURNAL (Vertical flow) --- */}
        <div className="lg:hidden relative space-y-10">
          
          {/* Vertical connection line */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-[#186BF6]/25 z-0">
            <motion.div 
              {...anim({ height: 0 }, { height: '100%' }, { duration: 1.5, ease: "easeOut" })}
              className="w-full bg-[#186BF6] origin-top"
            />
          </div>

          {/* Step 1: SPI Core */}
          <div className="relative pl-12 flex gap-4 items-start z-10">
            <div className="absolute left-[14px] top-1.5 w-4 h-4 rounded-full bg-[#186BF6] border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-2xl border border-[#DCE7F5] p-5 shadow-sm space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-[#186BF6] tracking-wider uppercase">{content.journey[0].label}</span>
                <span className="text-[11px] font-black text-[#186BF6]">{content.journey[0].number}</span>
              </div>
              <h3 className="text-lg font-black text-[#0B2454]">{content.journey[0].program}</h3>
              <p className="text-xs text-[#526A8F] leading-relaxed">{content.journey[0].description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.journey[0].keywords.map((k) => (
                  <span key={k} className="text-[9px] font-bold bg-[#EAF2FF] text-[#186BF6] px-2 py-0.5 rounded">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: SPI Lab */}
          <div className="relative pl-12 flex gap-4 items-start z-10">
            <div className="absolute left-[14px] top-1.5 w-4 h-4 rounded-full bg-[#186BF6] border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-2xl border border-[#DCE7F5] p-5 shadow-sm space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-[#186BF6] tracking-wider uppercase">{content.journey[1].label}</span>
                <span className="text-[11px] font-black text-[#186BF6]">{content.journey[1].number}</span>
              </div>
              <h3 className="text-lg font-black text-[#0B2454]">{content.journey[1].program}</h3>
              <p className="text-xs text-[#526A8F] leading-relaxed">{content.journey[1].description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.journey[1].keywords.map((k) => (
                  <span key={k} className="text-[9px] font-bold bg-[#EAF2FF] text-[#186BF6] px-2 py-0.5 rounded">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: SPI Engineering */}
          <div className="relative pl-12 flex gap-4 items-start z-10">
            <div className="absolute left-[14px] top-1.5 w-4 h-4 rounded-full bg-[#082B72] border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-2xl border border-[#DCE7F5] p-5 shadow-sm space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-[#082B72] tracking-wider uppercase">{content.journey[2].label}</span>
                <span className="text-[11px] font-black text-[#082B72]">{content.journey[2].number}</span>
              </div>
              <h3 className="text-lg font-black text-[#0B2454]">{content.journey[2].program}</h3>
              <p className="text-xs text-[#526A8F] leading-relaxed">{content.journey[2].description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.journey[2].keywords.map((k) => (
                  <span key={k} className="text-[9px] font-bold bg-[#EAF2FF] text-[#082B72] px-2 py-0.5 rounded">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: SPI InSchool (Distinct parallel block below) */}
          <div className="relative pl-12 flex gap-4 items-start z-10">
            <div className="absolute left-[14px] top-1.5 w-4 h-4 rounded-full bg-[#186BF6] border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="bg-white rounded-2xl border border-dashed border-[#DCE7F5] p-5 shadow-sm space-y-2 flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-[#186BF6] tracking-wider uppercase">{content.inschool_label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#186BF6]" />
              </div>
              <h3 className="text-lg font-black text-[#0B2454]">{content.inschool_title}</h3>
              <p className="text-xs text-[#526A8F] leading-relaxed">{content.inschool_desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {content.inschool_keys.map((k) => (
                  <span key={k} className="text-[9px] font-bold bg-[#EAF2FF] text-[#186BF6] px-2 py-0.5 rounded">{k}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Large Centered Editorial Closing Statement */}
        <motion.div 
          {...anim({ opacity: 0, y: 20 }, { opacity: 1, y: 0 }, { duration: 0.7 })}
          className="text-center pt-8 max-w-3xl mx-auto space-y-4"
        >
          <div className="w-12 h-1 bg-[#186BF6] mx-auto rounded-full" />
          <h3 className="text-xl sm:text-2xl font-black text-[#0B2454]">
            {content.closing.split('.')[0]}.
          </h3>
          <p className="text-sm sm:text-base text-[#526A8F] leading-relaxed font-semibold">
            {content.closing.split('.')[1]}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
