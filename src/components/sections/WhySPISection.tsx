import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';

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
  const { key, detail } = STAGES[index];
  const reached = reduce || stage >= index;
  const current = !reduce && stage === index;
  const Vignette = VIGNETTES[key];

  return (
    <li ref={ref} className={`transition-opacity duration-500 ${reached ? 'opacity-100' : 'opacity-40'}`}>
      <div
        className={`aspect-[16/10] rounded-2xl border-2 bg-[#F7F9FE] p-3 transition-colors duration-500 ${current ? 'border-[#1870FF]' : 'border-transparent'}`}
      >
        <Vignette play={reached && onScreen} reduce={reduce} />
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
        <span className="text-slate-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-[#1870FF]">{t(`method.${key}.title`)}</span>
      </p>
      <h3 className="mt-1.5 text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white tracking-tight">{t(`whyspi.flow.${key}`)}</h3>
      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(detail)}</p>
    </li>
  );
};

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('whyspi.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight leading-[1.08] text-balance">
              {t('whyspi.title')}
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">{t('whyspi.desc')}</p>
            <button
              type="button"
              onClick={scrollToPrograms}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <span>{t('common.explore_programs')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Think → Build → Innovate: one composition, lit stage by stage once */}
        <div ref={frameRef} className="rounded-[28px] border border-[#E3ECFA] dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
            <p className="text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('whyspi.c1.title')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">{t('whyspi.c1.desc')}</p>
          </div>

          {/* Progress rail (desktop): fills as each stage is reached */}
          <div className="hidden md:grid grid-cols-3 gap-8 mb-6" aria-hidden="true">
            {STAGES.map((s, i) => (
              <div key={s.key} className="h-1 rounded-full bg-[#E3ECFA] dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-[#1870FF] origin-left"
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: reduce || stage >= i ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : STEP_MS / 1000 - 0.2, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STAGES.map((s, i) => (
              <StageColumn key={s.key} index={i} stage={stage} reduce={reduce} />
            ))}
          </ol>
        </div>

        {/* Outcome + supporting differentiators as a typographic list (no icon cards) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <p className="lg:col-span-4 text-2xl sm:text-[28px] font-black text-[#041A5A] dark:text-white leading-tight tracking-tight text-balance">
            {t('whyspi.c1.benefit')}
          </p>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {['c2', 'c3', 'c4'].map((key) => (
              <li key={key} className="border-t-2 border-[#041A5A] dark:border-slate-600 pt-4 space-y-2">
                <h3 className="text-base font-black text-[#041A5A] dark:text-white">{t(`whyspi.${key}.title`)}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`whyspi.${key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
