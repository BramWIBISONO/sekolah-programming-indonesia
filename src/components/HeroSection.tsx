import React, { useRef } from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, Bot, Lightbulb, Camera, Code2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { useLanguage } from '../i18n';
import { useParallax, parallaxStyle } from '../utils/useParallax';
import { Layer } from './illustrations/IllustratedHero';
import { SpiIcon } from './illustrations/SpiIcon';
import { Cloud, Gears, Rocket, Skyline, Tree } from './illustrations/SceneProps';

interface HeroSectionProps {
  onOpenTrial: () => void;
  onExplorePrograms: () => void;
  /** Opens a program page; without it the dock scrolls to the program section. */
  onSelectProgram?: (path: string) => void;
}

const PROGRAMS = [
  { key: 'core', link: '/program/spi-core' },
  { key: 'lab', link: '/program/spi-lab' },
  { key: 'engineering', link: '/program/spi-engineering' },
  { key: 'inschool', link: '/program/spi-inschool' },
] as const;

const METHOD = ['think', 'build', 'innovate'] as const;

// Hill outlines (viewBox 1440×300): pale back hill, light middle hill, white front hill into the next section.
const BACK = 'M0 112C200 70 380 52 600 86C820 120 1000 48 1220 60C1330 66 1400 78 1440 84';
const MID = 'M0 168C240 124 470 118 700 152C930 186 1120 126 1310 134C1380 137 1420 142 1440 146';
const FRONT = 'M0 222C260 182 520 200 760 182C1000 164 1220 150 1440 166';

/** Yellow hand-drawn underline used as a background so it follows each wrapped line. */
const SWASH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 20' preserveAspectRatio='none'%3E%3Cpath d='M4 14C70 6 160 3 296 10' stroke='%23FFE38A' stroke-width='5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E")`;

/** Scratch's green flag, drawn instead of an emoji. */
const GreenFlag: React.FC = () => (
  <svg viewBox="0 0 16 16" className="inline-block w-3.5 h-3.5 -mt-0.5 mx-0.5" aria-hidden="true">
    <path d="M3.5 2v12.5" stroke="#2E8B3E" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M4 2.6c3-1.6 5 1.4 9 0v6.2c-4 1.4-6-1.6-9 0z" fill="#4CBF56" stroke="#2E8B3E" strokeWidth="0.9" strokeLinejoin="round" />
  </svg>
);

/** A floating card around the photo: drifts with the pointer and bobs gently. */
const Floating: React.FC<{ className: string; depth: number; delay: number; children: React.ReactNode }> = ({ className, depth, delay, children }) => (
  <div className={`absolute z-20 ${className}`} style={parallaxStyle(depth)}>
    <div className="spi-anim-bob" style={{ animationDelay: `${delay}s` }}>{children}</div>
  </div>
);

const card = 'bg-white text-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-[0_22px_44px_-22px_rgba(2,18,70,0.75)] border border-white flex items-center gap-2.5';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrial,
  onExplorePrograms,
  onSelectProgram,
}) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  useParallax(sceneRef);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={sceneRef}
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#1870FF] via-[#1466F4] to-[#0E55DB] text-white"
    >
      {/* sky: tech grid, slow light rays behind the photo, glows */}
      <div
        className="absolute inset-0 opacity-[0.09] [mask-image:radial-gradient(ellipse_at_70%_35%,black_10%,transparent_70%)]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true"
      />
      <div className="absolute right-[-10%] lg:right-[2%] top-[-12%] w-[720px] h-[720px] pointer-events-none [mask-image:radial-gradient(circle,black_15%,transparent_66%)]" aria-hidden="true">
        <div
          className="w-full h-full spi-anim-rays"
          style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.16) 0deg 6deg, transparent 6deg 20deg)' }}
        />
      </div>
      <div className="absolute right-[12%] top-[8%] w-[420px] h-[420px] rounded-full bg-white/15 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -left-24 top-1/3 w-[380px] h-[380px] rounded-full bg-[#5FB4FF]/25 blur-3xl pointer-events-none" aria-hidden="true" />

      {/* sky props (desktop only, so phones stay calm) */}
      <Layer className="left-[31%] top-[4%] w-24 hidden lg:block" depth={8} i={0} reduce={reduce}><Cloud className="w-full" /></Layer>
      <Layer className="left-[40%] top-[56%] w-20 hidden lg:block opacity-80" depth={6} i={1} reduce={reduce}><Cloud className="w-full" /></Layer>
      <Layer className="left-[45%] top-[6%] w-20 hidden lg:block" depth={24} i={2} reduce={reduce}><Gears className="w-full" /></Layer>
      <Layer className="right-[1.5%] top-[5%] w-14 hidden xl:block" depth={30} i={3} reduce={reduce}><Rocket className="w-full rotate-[24deg]" /></Layer>

      {/* distant skyline, back hill, trees, then middle and front hills */}
      <span className="absolute inset-x-0 bottom-[150px] sm:bottom-[170px] lg:bottom-[190px] h-[90px] sm:h-[120px] lg:h-[140px] opacity-25 pointer-events-none lg:[mask-image:linear-gradient(to_right,transparent_38%,black_62%)]" style={parallaxStyle(3)} aria-hidden="true">
        <Skyline className="w-full h-full" />
      </span>
      <svg className="absolute inset-x-0 -bottom-1 w-full h-[260px] sm:h-[280px] lg:h-[300px]" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d={`${BACK}V300H0Z`} fill="#3D86FF" />
        <path d={BACK} stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      <Layer className="left-[1.5%] bottom-[150px] w-12 hidden sm:block lg:hidden" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <Layer className="left-[6%] bottom-[146px] w-9 hidden sm:block lg:hidden" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <Layer className="right-[2%] bottom-[150px] w-12 hidden sm:block lg:bottom-[164px] lg:w-14" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <svg className="absolute inset-x-0 -bottom-1 w-full h-[260px] sm:h-[280px] lg:h-[300px]" viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d={`${MID}V300H0Z`} fill="#A8CAFF" />
        <path d={MID} stroke="#fff" strokeOpacity="0.6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <path d={`${FRONT}V300H0Z`} fill="#FFFFFF" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left: message and actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.p {...rise(0)} className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full bg-white/12 border border-white/25 backdrop-blur px-3.5 py-1.5 text-xs sm:text-sm font-bold">
              <span className="relative flex w-2.5 h-2.5" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-[#FFE38A] spi-anim-ping" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#FFE38A]" />
              </span>
              {METHOD.map((k, i) => (
                <React.Fragment key={k}>
                  {i > 0 && <ArrowRight className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />}
                  <span>{t(`method.${k}.title`)}</span>
                </React.Fragment>
              ))}
            </motion.p>

            <motion.h1 {...rise(0.08)} className="text-[40px] sm:text-6xl lg:text-[50px] xl:text-[60px] font-black tracking-tight leading-[1.04] text-white text-balance">
              <span className="block">{t('hero.h1_a')}</span>
              {/* hand-drawn underline under every line of the phrase, drawn once */}
              <motion.span
                className="text-[#FFE38A] pb-[0.12em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone] bg-no-repeat bg-[position:0_100%]"
                style={{ backgroundImage: SWASH }}
                initial={reduce ? false : { backgroundSize: '0% 0.24em' }}
                animate={{ backgroundSize: '100% 0.24em' }}
                transition={{ duration: 0.9, delay: reduce ? 0 : 0.7, ease: 'easeOut' }}
              >
                {t('hero.h1_b')}
              </motion.span>
            </motion.h1>

            <motion.p {...rise(0.16)} className="text-lg sm:text-xl text-blue-50/90 font-medium leading-relaxed max-w-xl">
              {t('hero.sub')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...rise(0.24)} className="pt-1 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-free-trial-btn"
                onClick={onOpenTrial}
                className="group relative overflow-hidden w-full sm:w-auto justify-center h-12 sm:h-14 px-8 bg-white text-[#1870FF] hover:bg-blue-50 font-bold text-sm sm:text-base rounded-2xl shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
              >
                <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-[#1870FF]/10 transition-transform duration-700 group-hover:translate-x-[420%]" aria-hidden="true" />
                <span className="relative">{t('nav.trial')}</span>
                <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <button
                id="hero-explore-program-btn"
                onClick={onExplorePrograms}
                className="group w-full sm:w-auto justify-center h-12 sm:h-14 px-7 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold text-sm sm:text-base rounded-2xl border border-white/60 transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{t('hero.explore')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </motion.div>

            {/* In collaboration with EKASA TECHNOLOGY */}
            <motion.div {...rise(0.32)} className="flex items-center gap-3">
              <span className="text-sm text-blue-100 font-medium">{t('hero.collab')}</span>
              <span className="h-5 w-px bg-white/30" aria-hidden="true" />
              <img
                src={ASSETS.partnership.ekasa}
                alt="EKASA Technology"
                className="h-8 w-auto object-contain brightness-0 invert opacity-95"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right: the students step out of a glowing stage, with floating cards and the SPI robot */}
          <div className="lg:col-span-7 relative mx-1 sm:mx-12 lg:mx-0 lg:ml-6 lg:mr-8 mt-6 lg:mt-0">
            <span className="absolute -inset-12 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.28),rgba(255,255,255,0))]" aria-hidden="true" />
            {/* orbit: a circle as wide as the stage, turning slowly */}
            <svg className="absolute pointer-events-none spi-anim-orbit" style={{ left: '6%', top: '-20%', width: '96%', height: '144%' }} viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="49" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="1" r="1.3" fill="#FFE38A" />
              <circle cx="99" cy="50" r="1" fill="#fff" />
              <circle cx="15.4" cy="84.6" r="1" fill="#fff" />
            </svg>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 aspect-[3/2] [perspective:1400px]"
            >
              {/* tilts toward the pointer on desktop */}
              <div
                className="absolute inset-0"
                style={{
                  transform: 'rotateY(calc(var(--px, 0) * 5deg)) rotateX(calc(var(--py, 0) * -4deg))',
                  transition: 'transform 0.3s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* glass stage; the students' heads rise above its top edge */}
                <div className="absolute left-[15%] right-[5%] top-[24%] bottom-[3%] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/45 bg-gradient-to-b from-white/35 via-white/15 to-white/5 shadow-[0_50px_90px_-40px_rgba(2,18,70,0.9)]">
                  <span
                    className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.28) 45%, transparent 60%)',
                      transform: 'translateX(calc(var(--px, 0) * 22%))',
                      transition: 'transform 0.3s ease-out',
                    }}
                    aria-hidden="true"
                  />
                </div>
                <ImageWithFallback
                  src={ASSETS.homepage.hero}
                  alt={t('hero.image_alt')}
                  className="!absolute inset-0 w-full h-full object-contain drop-shadow-[0_28px_26px_rgba(2,18,70,0.35)]"
                  loading="eager"
                  fetchPriority="high"
                  width={1200}
                  height={799}
                />
              </div>
            </motion.div>

            {/* AI assistant */}
            <Floating className="top-[2%] left-0 sm:-left-6" depth={14} delay={0}>
              <div className={card}>
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#1870FF] flex items-center justify-center shrink-0"><Bot className="w-4 h-4" aria-hidden="true" /></span>
                <span className="text-left">
                  <span className="block text-[11px] font-bold text-slate-800 leading-tight">{t('hero.card.assistant')}</span>
                  <span className="block text-[10px] text-slate-500">{t('hero.card.assistant_sub')}</span>
                </span>
              </div>
            </Floating>

            {/* Scratch block */}
            <Floating className="hidden sm:block top-[24%] -left-8" depth={22} delay={1.2}>
              <div className="bg-[#FFAB19] text-white rounded-xl px-3 py-2 shadow-[0_22px_44px_-22px_rgba(2,18,70,0.75)] text-left font-mono text-[10px] sm:text-xs font-bold leading-tight border border-amber-300 -rotate-3">
                <p>when <GreenFlag /> clicked</p>
                <p className="text-amber-100 pl-2">repeat</p>
                <p className="text-amber-100 pl-4">think()</p>
                <p className="text-white pl-4">build()</p>
                <p className="text-white pl-4">innovate()</p>
              </div>
            </Floating>

            {/* Real projects */}
            <Floating className="-bottom-8 left-[34%] sm:left-[40%]" depth={10} delay={0.6}>
              <div className={card}>
                <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0"><Lightbulb className="w-4 h-4" aria-hidden="true" /></span>
                <span className="text-left">
                  <span className="block text-[11px] font-bold text-slate-800 leading-tight">{t('hero.card.idea')}</span>
                  <span className="block text-[10px] text-slate-500">{t('hero.card.idea_sub')}</span>
                </span>
              </div>
            </Floating>

            {/* Python */}
            <Floating className="hidden sm:block -top-10 -right-4" depth={26} delay={1.8}>
              <div className="bg-[#071F4A]/95 backdrop-blur text-white rounded-xl p-3 shadow-[0_22px_44px_-22px_rgba(2,18,70,0.9)] border border-sky-400/30 text-left font-mono text-[10px] sm:text-xs">
                <div className="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-slate-700 text-[#60A5FA]">
                  <span className="font-bold">python</span>
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <p className="text-[#FFAB19]">for <span className="text-white">i</span> in <span className="text-sky-300">range</span>(5):</p>
                <p className="text-emerald-400 pl-3">think()</p>
                <p className="text-emerald-400 pl-3">code()</p>
                <p className="text-emerald-400 pl-3">build()</p>
                <p className="text-sky-300 pl-3">improve()</p>
              </div>
            </Floating>

            {/* Computer vision */}
            <Floating className="hidden sm:block top-[40%] -right-10" depth={18} delay={2.4}>
              <div className={card}>
                <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0"><Camera className="w-4 h-4" aria-hidden="true" /></span>
                <span className="text-left">
                  <span className="block text-[11px] font-bold text-slate-800 leading-tight">{t('hero.card.cv')}</span>
                  <span className="block text-[10px] text-slate-500">{t('hero.card.cv_sub')}</span>
                </span>
              </div>
            </Floating>

            {/* SPI robot */}
            <Layer className="z-30 -bottom-6 -left-3 w-[18%] sm:-left-6 sm:w-[19%]" depth={9} i={4} reduce={reduce}>
              <img
                src={ASSETS.brand.pandaMascot}
                alt={t('cta.mascot_alt')}
                className="w-full h-auto object-contain drop-shadow-[0_22px_28px_rgba(2,18,70,0.45)]"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </Layer>
          </div>
        </div>

        {/* Program dock: the four SPI programs, standing on the hills */}
        <motion.nav
          {...rise(0.4)}
          aria-label={t('nav.program')}
          className="relative z-20 mt-16 sm:mt-20 lg:mt-14 rounded-[24px] bg-white border border-[#E3ECFA] shadow-[0_30px_60px_-30px_rgba(4,26,90,0.55)] p-2 sm:p-3 grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2"
        >
          {PROGRAMS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => (onSelectProgram ? onSelectProgram(p.link) : onExplorePrograms())}
              className="group flex items-center gap-3 rounded-2xl p-2 sm:p-3 text-left hover:bg-[#F3F7FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <span className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-[#EEF4FF] group-hover:bg-white transition-colors flex items-center justify-center">
                <SpiIcon name={p.key} size={32} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm sm:text-base font-black text-[#041A5A] leading-tight">{t(`prog.${p.key}.short`)}</span>
                <span className="hidden sm:block text-xs text-slate-500 leading-snug mt-0.5">{t(`prog.${p.key}.menu`)}</span>
              </span>
              <ArrowRight className="hidden sm:block w-4 h-4 shrink-0 text-slate-300 group-hover:text-[#1870FF] group-hover:translate-x-0.5 transition" aria-hidden="true" />
            </button>
          ))}
        </motion.nav>
      </div>
    </section>
  );
};
