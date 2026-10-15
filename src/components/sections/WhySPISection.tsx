import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check as CheckIcon } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { useMediaQuery } from '../../utils/useMediaQuery';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

const N = '#041A5A';
const B = '#1870FF';
const LINE = '#DCE6F7';
const SOFT = '#EEF4FF';
const Y = '#FFC928';

type StageKey = 'think' | 'build' | 'innovate';
const STAGES: { key: StageKey; detail: string }[] = [
  { key: 'think', detail: 'method.think.b2' },
  { key: 'build', detail: 'method.build.b2' },
  { key: 'innovate', detail: 'method.innovate.b2' },
];

/** Delay (ms) before each stage lights up once the framework scrolls into view. */
const STEP_MS = 1500;

interface VignetteProps {
  /** True once this stage has been reached and is on screen. */
  play: boolean;
  reduce: boolean;
}

/** helper: hidden → shown transition that is skipped entirely under reduced motion. */
const anim = (play: boolean, reduce: boolean, hidden: object, shown: object, delay = 0) => ({
  initial: reduce ? false : hidden,
  animate: play || reduce ? shown : hidden,
  transition: { duration: 0.45, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
});

/** Think: one tangled problem is broken into three smaller, ordered parts. */
const ThinkVignette: React.FC<VignetteProps> = ({ play, reduce }) => (
  <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
    <rect x="66" y="12" width="108" height="38" rx="12" fill={SOFT} stroke={N} strokeWidth="2" />
    <path d="M82 31c5-9 10 9 15 0s10 9 15 0 10 9 15 0 10 9 15 0" stroke={N} strokeWidth="2" fill="none" strokeLinecap="round" />
    {[50, 120, 190].map((x, i) => (
      <motion.path
        key={x}
        d={`M120 50 C120 70 ${x} 66 ${x} 88`}
        stroke={B}
        strokeWidth="2"
        fill="none"
        {...anim(play, reduce, { pathLength: 0 }, { pathLength: 1 }, 0.15 + i * 0.12)}
      />
    ))}
    {[24, 94, 164].map((x, i) => (
      <g key={x} transform={`translate(${x} 88)`}>
        <motion.g {...anim(play, reduce, { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, 0.45 + i * 0.15)}>
          <rect width="52" height="38" rx="10" fill="#fff" stroke={B} strokeWidth="2" />
          <circle cx="14" cy="19" r="7" fill={B} />
          <text x="14" y="22.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">{i + 1}</text>
          <rect x="26" y="15" width="18" height="3.5" rx="1.75" fill={N} />
          <rect x="26" y="22" width="12" height="3.5" rx="1.75" fill={LINE} />
        </motion.g>
      </g>
    ))}
  </svg>
);

/** Build: code blocks snap into place one after another until the program is complete. */
const BuildVignette: React.FC<VignetteProps> = ({ play, reduce }) => {
  const blocks = [
    { x: 46, y: 36, w: 112, fill: N },
    { x: 60, y: 60, w: 132, fill: B },
    { x: 60, y: 84, w: 104, fill: B },
    { x: 46, y: 108, w: 84, fill: '#9DBEF7' },
  ];
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
      <rect x="28" y="8" width="184" height="134" rx="14" fill="#fff" stroke={LINE} strokeWidth="2" />
      <circle cx="42" cy="20" r="3" fill={LINE} />
      <circle cx="52" cy="20" r="3" fill={LINE} />
      <circle cx="62" cy="20" r="3" fill={LINE} />
      {blocks.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <motion.g {...anim(play, reduce, { opacity: 0, x: 26 }, { opacity: 1, x: 0 }, 0.1 + i * 0.22)}>
            {/* block with a small puzzle notch on top */}
            <path d={`M0 4a4 4 0 0 1 4-4h8l3 3h8l3-3h${b.w - 34}a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4z`} fill={b.fill} />
            <rect x="10" y="7" width={Math.min(46, b.w - 30)} height="4" rx="2" fill="#fff" opacity="0.85" />
          </motion.g>
        </g>
      ))}
      <motion.rect
        x="136" y="109" width="2.5" height="16" rx="1" fill={N}
        {...anim(play, reduce, { opacity: 0 }, { opacity: 1 }, 1)}
      />
    </svg>
  );
};

const Check: React.FC = () => <path d="M-4 0.5l2.8 2.8L4.2-2.6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />;

/** Innovate: the work is tested; one check fails, is fixed, and passes. */
const InnovateVignette: React.FC<VignetteProps> = ({ play, reduce }) => {
  // The middle row first fails, then passes after a fix. Under reduced motion only the final state shows.
  const [fixed, setFixed] = useState(reduce);
  useEffect(() => {
    if (reduce) { setFixed(true); return; }
    if (!play) return;
    const id = window.setTimeout(() => setFixed(true), 1500);
    return () => window.clearTimeout(id);
  }, [play, reduce]);

  const rows = [34, 75, 116];
  return (
    <svg viewBox="0 0 240 150" className="w-full h-full" aria-hidden="true">
      <rect x="36" y="8" width="168" height="134" rx="14" fill="#fff" stroke={LINE} strokeWidth="2" />
      {rows.map((y, i) => (
        <g key={y} transform={`translate(0 ${y})`}>
          <rect x="88" y="-4" width={i === 1 ? 76 : 92} height="8" rx="4" fill={LINE} />
          <g transform="translate(64 0)">
            {i === 1 ? (
              <>
                <motion.g {...anim(play, reduce, { opacity: 0, scale: 0.4 }, { opacity: fixed ? 0 : 1, scale: 1 }, 0.5)}>
                  <circle r="11" fill={Y} />
                  <path d="M-3.5-3.5l7 7M3.5-3.5l-7 7" stroke={N} strokeWidth="2.2" strokeLinecap="round" />
                </motion.g>
                <motion.g initial={reduce ? false : { opacity: 0, scale: 0.4 }} animate={fixed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }} transition={{ duration: 0.35 }}>
                  <circle r="11" fill={B} />
                  <Check />
                </motion.g>
              </>
            ) : (
              <motion.g {...anim(play, reduce, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }, i === 0 ? 0.2 : 1.9)}>
                <circle r="11" fill={B} />
                <Check />
              </motion.g>
            )}
          </g>
        </g>
      ))}
      {/* "fix and retest" loop shown next to the failing row while it is being fixed */}
      <motion.g
        transform="translate(184 75)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: play && !reduce && !fixed ? 1 : 0 }}
        transition={{ duration: 0.3, delay: play && !fixed ? 0.8 : 0 }}
      >
        <g className={play && !fixed && !reduce ? 'spi-anim-spin' : undefined} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <path d="M-7 0a7 7 0 1 1 2 5" stroke={B} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M-9 1.5l2 4 4-2" stroke={B} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </motion.g>
    </svg>
  );
};

const VIGNETTES: Record<StageKey, React.FC<VignetteProps>> = {
  think: ThinkVignette,
  build: BuildVignette,
  innovate: InnovateVignette,
};

const StageColumn: React.FC<{ index: number; stage: number; reduce: boolean }> = ({ index, stage, reduce }) => {
  const { t } = useLanguage();
  const ref = useRef<HTMLLIElement>(null);
  const onScreen = useInView(ref, { once: true, amount: 0.5 });
  // On phones the stages are a swipeable row: each one plays when swiped into view, none is dimmed.
  const sequenced = useMediaQuery('(min-width: 768px)');
  const { key, detail } = STAGES[index];
  const reached = reduce || stage >= index;
  const current = !reduce && stage === index && sequenced;
  const Vignette = VIGNETTES[key];

  return (
    <li
      ref={ref}
      className={`w-[82%] shrink-0 snap-start md:w-auto transition-[opacity,transform] duration-500 ${reached || !sequenced ? 'opacity-100' : 'opacity-55'} ${current ? 'md:-translate-y-2' : ''}`}
    >
      <div
        className={`h-full rounded-[24px] bg-white p-3 sm:p-3.5 transition-shadow duration-500 ${
          current ? 'shadow-[0_0_0_4px_rgba(255,201,40,0.9),0_30px_60px_-30px_rgba(2,18,70,0.8)]' : 'shadow-[0_24px_50px_-30px_rgba(2,18,70,0.7)]'
        }`}
      >
        <div className="aspect-[16/10] rounded-[18px] bg-[#F3F7FF] p-3">
          <Vignette play={onScreen && (reached || !sequenced)} reduce={reduce} />
        </div>
        <div className="px-2 pt-4 pb-2">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <span className="text-slate-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[#1870FF]">{t(`method.${key}.title`)}</span>
          </p>
          <h3 className="mt-1.5 text-xl lg:text-2xl font-black text-[#041A5A] tracking-tight">{t(`whyspi.flow.${key}`)}</h3>
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t(detail)}</p>
        </div>
      </div>
    </li>
  );
};

/** Supporting differentiators, each with its SPI icon. */
const POINTS: { key: 'c2' | 'c3' | 'c4'; icon: SpiIconName }[] = [
  { key: 'c2', icon: 'projects' },
  { key: 'c3', icon: 'ai' },
  { key: 'c4', icon: 'ecosystem' },
];

export const WhySPISection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, amount: 0.35 });
  /** -1 = not started, 0..2 = stage lit, 3 = sequence finished (all stages equal). Plays once. */
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (reduce || !inView) return;
    setStage(0);
    const timers = [1, 2, 3].map((s) => window.setTimeout(() => setStage(s), s * STEP_MS));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [inView, reduce]);

  const scrollToPrograms = () => {
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-spi-section" className="relative py-16 sm:py-24 bg-white dark:bg-[#070D18] overflow-hidden transition-colors">
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-[#EEF4FF] dark:bg-[#1870FF]/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">
              <span className="w-6 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
              {t('whyspi.eyebrow')}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight leading-[1.08] text-balance">
              {t('whyspi.title')}
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">{t('whyspi.desc')}</p>
            <button
              type="button"
              onClick={scrollToPrograms}
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-[#EEF4FF] dark:bg-white/10 text-sm font-bold text-[#1870FF] dark:text-white hover:bg-[#1870FF] hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <span>{t('common.explore_programs')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Think → Build → Innovate on an Electric Blue panel, lit stage by stage once */}
        <div ref={frameRef} className="relative overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-8 sm:px-10 sm:py-12 shadow-[0_40px_80px_-40px_rgba(24,112,255,0.75)]">
          {/* texture: tech grid, light rays, glows */}
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div
            className="absolute -right-40 -top-40 w-[560px] h-[560px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>
          <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#5FB4FF]/30 blur-3xl pointer-events-none" aria-hidden="true" />

          <div className="relative">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
              <p className="text-2xl sm:text-3xl font-black tracking-tight">{t('whyspi.c1.title')}</p>
              <p className="text-sm sm:text-base text-blue-100 max-w-md leading-relaxed">{t('whyspi.c1.desc')}</p>
            </div>

            {/* Stepper (desktop): each node lights up and the line fills toward the next stage */}
            <div className="hidden md:grid grid-cols-3 gap-8 mb-6" aria-hidden="true">
              {STAGES.map((s, i) => {
                const lit = reduce || stage >= i;
                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <span
                      className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${
                        lit ? 'bg-white shadow-[0_10px_24px_-10px_rgba(2,18,70,0.8)]' : 'bg-white/15 border border-white/30'
                      }`}
                    >
                      <span className={`transition-opacity duration-500 ${lit ? 'opacity-100' : 'opacity-40'}`}>
                        <SpiIcon name={s.key} size={30} animate="none" />
                      </span>
                    </span>
                    {i < STAGES.length - 1 ? (
                      <span className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                        <motion.span
                          className="block h-full bg-white origin-left"
                          initial={reduce ? false : { scaleX: 0 }}
                          animate={{ scaleX: reduce || stage > i ? 1 : 0 }}
                          transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
                        />
                      </span>
                    ) : (
                      /* after the last stage: the line runs out to a check once the cycle is complete */
                      <span className="flex-1 flex items-center gap-2">
                        <span className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                          <motion.span
                            className="block h-full bg-white origin-left"
                            initial={reduce ? false : { scaleX: 0 }}
                            animate={{ scaleX: reduce || stage >= 3 ? 1 : 0 }}
                            transition={{ duration: reduce ? 0 : 0.6, ease: 'easeOut' }}
                          />
                        </span>
                        <motion.span
                          className="w-7 h-7 rounded-full bg-[#FFC928] text-[#041A5A] flex items-center justify-center"
                          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                          animate={{ scale: reduce || stage >= 3 ? 1 : 0.4, opacity: reduce || stage >= 3 ? 1 : 0 }}
                          transition={{ duration: 0.35, delay: reduce ? 0 : 0.5 }}
                        >
                          <CheckIcon className="w-4 h-4" strokeWidth={3} />
                        </motion.span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <ol className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 sm:-mx-10 sm:px-10 md:mx-0 md:px-0 pb-2 hide-scrollbar">
              {STAGES.map((s, i) => (
                <StageColumn key={s.key} index={i} stage={stage} reduce={reduce} />
              ))}
            </ol>
          </div>
        </div>

        {/* Outcome + supporting differentiators */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-4 lg:pt-4">
            <svg viewBox="0 0 48 36" className="w-10 h-8 mb-3 text-[#1870FF]" aria-hidden="true">
              <path d="M4 34V20C4 9 10 3 20 2v7c-5 1-8 4-8 10h8v15zm24 0V20c0-11 6-17 16-18v7c-5 1-8 4-8 10h8v15z" fill="currentColor" opacity="0.18" />
            </svg>
            <p className="text-2xl sm:text-[30px] font-black text-[#041A5A] dark:text-white leading-tight tracking-tight text-balance">
              {t('whyspi.c1.benefit')}
            </p>
            <span className="mt-5 block w-16 h-1.5 rounded-full bg-[#FFC928]" aria-hidden="true" />
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {POINTS.map(({ key, icon }) => (
              <li
                key={key}
                className="group relative rounded-[22px] border border-[#E3ECFA] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/40 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
              >
                <span className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-[#1870FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
                <span className="w-14 h-14 rounded-2xl bg-[#EEF4FF] dark:bg-white/10 flex items-center justify-center mb-4">
                  <SpiIcon name={icon} size={40} />
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#041A5A] dark:text-white">{t(`whyspi.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`whyspi.${key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
