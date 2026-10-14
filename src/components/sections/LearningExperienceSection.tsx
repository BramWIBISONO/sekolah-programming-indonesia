import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { YouTubeEmbed } from '../common/YouTubeEmbed';

/**
 * Think → Build → Innovate in practice, using Julius Christiano Go's pet feeder mini project
 * (published on SPI's YouTube channel). The only verified behaviour is that the feeder opens
 * when the hamster comes close, so the illustration shows exactly that and nothing about the
 * hardware or code inside it.
 */
type Stage = 'think' | 'build' | 'innovate';
const STAGES: Stage[] = ['think', 'build', 'innovate'];
const JULIUS_VIDEO_ID = '5e51CWsl2Bs';

/** Phase timings (ms): think → build (hamster approaches, feeder opens) → innovate (observe) → done. */
const PHASE_AT = [0, 1800, 4400, 6000];

const N = '#041A5A';
const B = '#1870FF';
const FUR = '#F2C48D';
const FOOD = '#E0A82E';

/**
 * How-it-works illustration. `phase`: 0 think, 1 build, 2 innovate, 3 done.
 * motion's x/y on SVG are transforms, so base positions live on wrapping <g transform>s.
 */
const FeederScene: React.FC<{ phase: number; reduce: boolean; label: string }> = ({ phase, reduce, label }) => {
  const near = reduce || phase >= 1;
  const observed = reduce || phase >= 2;
  const walking = !reduce && phase === 1;

  return (
    <svg viewBox="0 0 320 190" className="w-full h-auto" role="img" aria-label={label}>
      <rect width="320" height="190" rx="18" fill="#F4F8FF" />
      <path d="M16 163H304" stroke="#C9DAF7" strokeWidth="2" strokeLinecap="round" />

      {/* Feeder: container with food, spout, sliding gate and bowl */}
      <rect x="226" y="40" width="62" height="82" rx="10" fill="#fff" stroke={N} strokeWidth="2.5" />
      <rect x="236" y="52" width="42" height="34" rx="6" fill="#FFF1C7" />
      {[[244, 74], [252, 79], [261, 73], [269, 79], [256, 66]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill={FOOD} />
      ))}
      <rect x="246" y="122" width="22" height="10" fill="#fff" stroke={N} strokeWidth="2" />
      <path d="M232 148h52a4 4 0 014 4c0 7-10 11-30 11s-30-4-30-11a4 4 0 014-4z" fill="#DCEBFF" stroke={N} strokeWidth="2.5" />
      {/* Gate under the spout: a flap hinged on its left edge that swings down to open */}
      <g transform="translate(245 132)">
        <motion.rect
          width="24" height="5" rx="2" fill={B}
          style={{ transformBox: 'fill-box', transformOrigin: '0% 50%' }}
          initial={false}
          animate={{ rotate: near ? 75 : 0 }}
          transition={{ duration: near && !reduce ? 0.4 : 0, delay: walking ? 1.35 : 0 }}
        />
      </g>
      {/* Food drops into the bowl once the feeder opens */}
      {[[250, 146], [258, 144], [266, 146]].map(([cx, cy], i) => (
        <g key={cx} transform={`translate(${cx} ${cy})`}>
          <motion.circle
            r="3.2" fill={FOOD}
            initial={false}
            animate={near ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            // A short (non-zero) reset fade: zero-duration opacity resets did not apply on SVG here.
            transition={{ duration: reduce ? 0 : near ? 0.35 : 0.15, delay: walking ? 1.6 + i * 0.15 : 0 }}
          />
        </g>
      ))}

      {/* Think: how close is "close"? */}
      <motion.g initial={false} animate={{ opacity: !reduce && phase <= 0 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <path d="M90 176H222" stroke={B} strokeWidth="2" strokeDasharray="5 5" />
        <path d="M96 171l-6 5 6 5M216 171l6 5-6 5" stroke={B} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="104" cy="104" r="14" fill="#fff" stroke={N} strokeWidth="2" />
        <circle cx="92" cy="122" r="3" fill="#fff" stroke={N} strokeWidth="1.6" />
        <text x="104" y="110" textAnchor="middle" fontSize="17" fontWeight="900" fill={B}>?</text>
      </motion.g>

      {/* Hamster: far at first, then walks to the bowl once */}
      <g transform="translate(58 163)">
        <motion.g
          initial={false}
          animate={{ x: near ? 138 : 0 }}
          transition={{ duration: walking ? 1.4 : 0, ease: 'easeInOut' }}
        >
          <motion.g
            initial={false}
            animate={walking ? { y: [0, -3, 0, -3, 0, -3, 0] } : { y: 0 }}
            transition={{ duration: walking ? 1.4 : 0 }}
          >
            <path d="M-24-14c-6 0-8-3-7-6" stroke={N} strokeWidth="2" fill="none" strokeLinecap="round" />
            <ellipse cx="0" cy="-16" rx="25" ry="16" fill={FUR} stroke={N} strokeWidth="2.5" />
            <ellipse cx="7" cy="-11" rx="12" ry="7" fill="#FFF4E3" />
            <circle cx="9" cy="-30" r="6" fill={FUR} stroke={N} strokeWidth="2" />
            <circle cx="9" cy="-30" r="2.4" fill="#F4A7A7" />
            <circle cx="16" cy="-20" r="2.2" fill={N} />
            <circle cx="25" cy="-15" r="2" fill={N} />
            <ellipse cx="-10" cy="-1" rx="4.5" ry="2" fill={N} />
            <ellipse cx="11" cy="-1" rx="4.5" ry="2" fill={N} />
          </motion.g>
        </motion.g>
      </g>

      {/* Innovate: observe whether the response is right */}
      <g transform="translate(176 28)">
        <motion.g
          initial={false}
          animate={observed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          <path d="M-13 0Q0-10 13 0Q0 10-13 0z" fill="#fff" stroke={N} strokeWidth="2" />
          <circle r="3.4" fill={N} />
          <circle cx="26" r="10" fill={B} />
          <path d="M21.5 0.5l3 3 6-6" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </g>
    </svg>
  );
};

export const LearningExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { once: true, amount: 0.5 });
  /** -1 before it starts; 0..2 the active stage; 3 when the one-shot sequence is done. */
  const [phase, setPhase] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = PHASE_AT.map((ms, p) => window.setTimeout(() => setPhase(p), ms));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [inView, reduce, run]);

  const shownPhase = reduce ? 3 : phase;

  const scrollToProjects = () => {
    document.getElementById('student-projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="method-section" className="py-16 sm:py-24 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('method.eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('method.title')}</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t('method.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* The real project video */}
          <figure className="md:col-span-7 space-y-3">
            <div className="rounded-[24px] overflow-hidden bg-slate-900 shadow-[0_30px_60px_-40px_rgba(4,26,90,0.6)]">
              <YouTubeEmbed videoId={JULIUS_VIDEO_ID} title={t('method.example.video_title')} posterFirst />
            </div>
            <figcaption className="space-y-1">
              <p className="text-base font-black text-[#041A5A]">{t('method.example.title')}</p>
              <p className="text-sm text-slate-500">{t('method.example.credit')}</p>
            </figcaption>
          </figure>

          {/* How-it-works storyboard */}
          <div className="md:col-span-5 space-y-5">
            <div ref={sceneRef} className="rounded-[24px] bg-white border border-[#E3ECFA] p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{t('method.example.badge')}</span>
                {!reduce && (
                  <button
                    type="button"
                    onClick={() => { setPhase(-1); setRun((r) => r + 1); }}
                    disabled={phase >= 0 && phase < 3}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1870FF] hover:text-[#0B3C95] disabled:text-slate-300 disabled:cursor-default cursor-pointer rounded px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    {t('method.example.replay')}
                  </button>
                )}
              </div>
              <FeederScene phase={shownPhase} reduce={reduce} label={t('method.example.scene_alt')} />
            </div>

            <ol className="space-y-1">
              {STAGES.map((s, i) => {
                const reached = shownPhase >= i;
                const current = shownPhase === i;
                return (
                  <li
                    key={s}
                    className={`relative pl-5 py-2.5 transition-opacity duration-500 ${reached ? 'opacity-100' : 'opacity-45'}`}
                  >
                    <span
                      className={`absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full transition-colors duration-500 ${current ? 'bg-[#1870FF]' : reached ? 'bg-[#BFD5FF]' : 'bg-[#E3ECFA]'}`}
                      aria-hidden="true"
                    />
                    <p className="text-xs font-black uppercase tracking-widest text-[#1870FF]">
                      <span className="text-slate-400 tabular-nums mr-2">{String(i + 1).padStart(2, '0')}</span>
                      {t(`method.${s}.title`)}
                    </p>
                    <p className="mt-1 text-base sm:text-lg font-bold text-[#041A5A] leading-snug">{t(`method.example.${s}`)}</p>
                  </li>
                );
              })}
            </ol>

            <p className="text-sm text-slate-600 leading-relaxed border-t border-[#E3ECFA] pt-4">{t('method.example.fact')}</p>

            <button
              type="button"
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
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
