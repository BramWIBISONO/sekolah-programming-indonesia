import React, { useEffect, useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon } from '../illustrations/SpiIcon';

/**
 * Think → Build → Innovate as a working method (design.md 6.7).
 * An interactive stepper walks through an illustrated example (automatic door with Arduino);
 * the scene is labelled as an illustration, not a case study.
 */
type Stage = 'think' | 'build' | 'innovate';
const STAGES: Stage[] = ['think', 'build', 'innovate'];
const AUTO_ADVANCE_MS = 6500;

const N = '#041A5A';
const B = '#176DF8';
const L = '#DCEBFF';
const Y = '#FFC928';

/** Illustrated scene for one stage of the automatic-door example. */
const DoorScene: React.FC<{ stage: Stage; reduce: boolean }> = ({ stage, reduce }) => {
  const loop = (values: number[], duration = 2.4) =>
    reduce ? undefined : { duration, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const };
  const doorOpen = stage === 'innovate';
  const clipId = useId().replace(/:/g, '');

  return (
    <svg viewBox="0 0 360 230" className="w-full h-auto" role="img" aria-hidden="true">
      {/* floor + backdrop */}
      <rect x="0" y="0" width="360" height="230" rx="20" fill="#F4F8FF" />
      <path d="M20 196h320" stroke="#C9DAF7" strokeWidth="2" strokeLinecap="round" />

      {/* door frame + sliding panels */}
      <defs>
        <clipPath id={clipId}>
          <rect x="210" y="60" width="100" height="136" rx="4" />
        </clipPath>
      </defs>
      <rect x="208" y="58" width="104" height="138" rx="6" fill="#fff" stroke={N} strokeWidth="2.5" />
      {/* motion's x/y are transforms, so positions live on the <rect> inside the animated <g> */}
      <g clipPath={`url(#${clipId})`}>
      <motion.g
        animate={{ x: doorOpen && !reduce ? [0, -34] : doorOpen ? -34 : 0 }}
        transition={doorOpen ? loop([0, -34], 1.8) : { duration: 0.4 }}
      >
        <rect x="212" y="62" width="48" height="134" rx="3" fill={L} stroke={N} strokeWidth="2" />
      </motion.g>
      <motion.g
        animate={{ x: doorOpen && !reduce ? [0, 34] : doorOpen ? 34 : 0 }}
        transition={doorOpen ? loop([0, 34], 1.8) : { duration: 0.4 }}
      >
        <rect x="260" y="62" width="48" height="134" rx="3" fill={L} stroke={N} strokeWidth="2" />
      </motion.g>
      </g>
      <rect x="208" y="58" width="104" height="138" rx="6" fill="none" stroke={N} strokeWidth="2.5" />

      {/* ultrasonic sensor above the door */}
      <rect x="244" y="40" width="32" height="14" rx="4" fill={B} stroke={N} strokeWidth="2" />
      <circle cx="253" cy="47" r="3.6" fill="#fff" stroke={N} strokeWidth="1.6" />
      <circle cx="267" cy="47" r="3.6" fill="#fff" stroke={N} strokeWidth="1.6" />

      {stage === 'think' && (
        <g>
          {/* child walking towards the door */}
          <motion.g animate={reduce ? undefined : { x: [0, 26] }} transition={loop([0, 26], 2.6)}>
            <circle cx="96" cy="118" r="13" fill={Y} stroke={N} strokeWidth="2.5" />
            <path d="M82 196v-36a14 14 0 0128 0v36" fill={B} stroke={N} strokeWidth="2.5" />
            {/* thought bubble */}
            <circle cx="128" cy="86" r="18" fill="#fff" stroke={N} strokeWidth="2" />
            <circle cx="112" cy="104" r="3.5" fill="#fff" stroke={N} strokeWidth="1.6" />
            <text x="128" y="93" textAnchor="middle" fontSize="20" fontWeight="900" fill={B}>?</text>
          </motion.g>
          {/* distance being reasoned about */}
          <path d="M126 176h76" stroke={B} strokeWidth="2.5" strokeDasharray="5 5" className="spi-anim-dash" />
          <path d="M132 170l-6 6 6 6M196 170l6 6-6 6" stroke={B} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* sensor beam */}
          <path d="M252 54L200 150M268 54l-20 96" stroke={Y} strokeWidth="2" strokeDasharray="3 5" opacity="0.9" />
        </g>
      )}

      {stage === 'build' && (
        <g>
          {/* code panel with lines being written */}
          <rect x="22" y="30" width="150" height="100" rx="10" fill={N} />
          <circle cx="36" cy="44" r="3" fill={Y} />
          <circle cx="47" cy="44" r="3" fill={B} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${i === 2 ? 48 : 36} ${60 + i * 16})`}>
              <motion.rect
                height="7" rx="3.5"
                fill={i === 1 ? Y : i === 3 ? '#7FB1FF' : '#fff'}
                initial={{ width: reduce ? [96, 70, 64, 88][i] : 4 }}
                animate={{ width: [96, 70, 64, 88][i] }}
                transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.25 + i * 0.45, repeat: Infinity, repeatDelay: 2.2 }}
              />
            </g>
          ))}
          <rect className="spi-anim-blink" x="140" y="108" width="3" height="12" fill={Y} />
          {/* microcontroller board */}
          <rect x="40" y="148" width="104" height="44" rx="6" fill={B} stroke={N} strokeWidth="2.5" />
          <rect x="74" y="160" width="34" height="20" rx="3" fill={N} />
          <path d="M50 152v-4M58 152v-4M66 152v-4M118 152v-4M126 152v-4M134 152v-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          {/* wires to the sensor and the door motor, with current flowing */}
          <path d="M144 158C180 158 190 47 244 47" stroke={N} strokeWidth="2.5" fill="none" />
          <path className="spi-anim-dash" d="M144 158C180 158 190 47 244 47" stroke={Y} strokeWidth="2.5" strokeDasharray="4 8" fill="none" />
          <path d="M144 180C200 180 214 180 214 120" stroke={N} strokeWidth="2.5" fill="none" />
          <path className="spi-anim-dash" d="M144 180C200 180 214 180 214 120" stroke={Y} strokeWidth="2.5" strokeDasharray="4 8" fill="none" />
        </g>
      )}

      {stage === 'innovate' && (
        <g>
          {/* sensitivity slider being tuned */}
          <text x="30" y="58" fontSize="12" fontWeight="800" fill={N}>sensor</text>
          <rect x="30" y="68" width="140" height="8" rx="4" fill={L} stroke={N} strokeWidth="1.6" />
          <motion.circle
            cy="72" r="9" fill={Y} stroke={N} strokeWidth="2.5"
            initial={{ cx: 120 }}
            animate={reduce ? { cx: 120 } : { cx: [70, 132] }}
            transition={loop([70, 132], 2.2)}
          />
          <text x="30" y="108" fontSize="12" fontWeight="800" fill={N}>delay</text>
          <rect x="30" y="118" width="140" height="8" rx="4" fill={L} stroke={N} strokeWidth="1.6" />
          <motion.circle
            cy="122" r="9" fill={B} stroke={N} strokeWidth="2.5"
            initial={{ cx: 90 }}
            animate={reduce ? { cx: 90 } : { cx: [110, 60] }}
            transition={loop([110, 60], 2.8)}
          />
          {/* tested & improved */}
          <circle cx="100" cy="168" r="20" fill={B} stroke={N} strokeWidth="2.5" />
          <motion.path
            d="M90 168l7 7 14-15" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.8, repeat: Infinity, repeatDelay: 1.6 }}
          />
        </g>
      )}
    </svg>
  );
};

export const LearningExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState<Stage>('think');
  const [paused, setPaused] = useState(false);

  // Gentle auto-advance; stops on hover/focus, after manual selection, or with reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => {
      setActive((s) => STAGES[(STAGES.indexOf(s) + 1) % STAGES.length]);
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduce]);

  const choose = (s: Stage) => {
    setActive(s);
    setPaused(true);
  };

  const scrollToProjects = () => {
    document.getElementById('student-projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="method-section" className="py-16 sm:py-24 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('method.eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('method.title')}</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t('method.desc')}</p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
          onMouseEnter={() => setPaused(true)}
          onFocusCapture={() => setPaused(true)}
        >
          {/* Stage tabs + what students do in that stage */}
          <div className="lg:col-span-5 space-y-5">
            <div role="tablist" aria-label={t('method.title')} className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {STAGES.map((s) => {
                const selected = active === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="tab"
                    id={`method-tab-${s}`}
                    aria-selected={selected}
                    aria-controls="method-panel"
                    onClick={() => choose(s)}
                    className={`group relative flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-4 rounded-2xl p-3 lg:p-4 text-center lg:text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] ${
                      selected ? 'bg-white shadow-[0_16px_40px_-28px_rgba(4,26,90,0.5)] ring-1 ring-[#D6E5FF]' : 'hover:bg-white/70'
                    }`}
                  >
                    <SpiIcon name={s} size={44} animate={selected ? 'always' : 'hover'} className="shrink-0" />
                    <span className="min-w-0">
                      <span className={`block text-base lg:text-lg font-black ${selected ? 'text-[#041A5A]' : 'text-slate-500'}`}>{t(`method.${s}.title`)}</span>
                      <span className="hidden lg:block text-sm text-slate-500">{t(`whyspi.flow.${s}`)}</span>
                    </span>
                    {selected && !reduce && !paused && (
                      <motion.span
                        key={`bar-${s}`}
                        className="absolute left-3 right-3 bottom-1.5 h-[3px] rounded-full bg-[#176DF8]/70 origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <ul className="space-y-2.5 rounded-2xl bg-white/60 border border-[#E3ECFA] p-5">
              {[1, 2, 3, 4].map((n) => (
                <li key={`${active}-${n}`} className="flex gap-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  <span className="mt-0.5 w-5 h-5 rounded-md bg-[#176DF8]/10 text-[#176DF8] text-[11px] font-black flex items-center justify-center shrink-0 tabular-nums">{n}</span>
                  <span>{t(`method.${active}.b${n}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrated example */}
          <div
            id="method-panel"
            role="tabpanel"
            aria-labelledby={`method-tab-${active}`}
            className="lg:col-span-7 rounded-[24px] bg-white border border-[#E3ECFA] p-4 sm:p-6 shadow-[0_24px_60px_-40px_rgba(4,26,90,0.4)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h3 className="text-base sm:text-lg font-black text-[#041A5A]">{t('method.example.title')}</h3>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-md px-2 py-1">
                {t('method.example.badge')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <DoorScene stage={active} reduce={reduce} />
                <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <span className="font-black text-[#176DF8]">{t(`method.${active}.title`)}: </span>
                  {t(`method.example.${active}`)}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={scrollToProjects}
              className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
            >
              <span>{t('method.example.cta')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
