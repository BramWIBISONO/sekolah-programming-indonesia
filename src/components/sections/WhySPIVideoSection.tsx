import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { useLanguage } from '../../i18n';
import { ASSETS } from '../../constants/assets';
import { WHY_KIDS_VIDEO } from '../../data/homepageData';
import { useParallax, parallaxStyle } from '../../utils/useParallax';
import { Skyline, Tree } from '../illustrations/SceneProps';

const N = '#041A5A';
const B = '#1870FF';
const Y = '#FFC928';

/** Closed gear outline (teeth on a circle), used as a drawn technology prop. */
const gearPath = (cx: number, cy: number, rOuter: number, rInner: number, teeth: number) => {
  const pts: string[] = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const r = i % 4 === 0 || i % 4 === 1 ? rOuter : rInner;
    const a = i * step;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

/** Four-point sparkle. */
const sparkle = (x: number, y: number, s: number) =>
  `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;

/** Layered landscape with technology props, drawn for SPI (no stock artwork). */
const Landscape: React.FC = () => (
  <svg className="w-full h-full" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="wk-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F4F8FF" />
        <stop offset="1" stopColor="#D6E6FF" />
      </linearGradient>
      <linearGradient id="wk-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2A7DFF" />
        <stop offset="1" stopColor="#1463E6" />
      </linearGradient>
      <filter id="wk-shadow" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#041A5A" floodOpacity="0.18" />
      </filter>
    </defs>

    <rect width="1440" height="760" fill="url(#wk-sky)" />
    {/* diagonal light band and sun glow */}
    <path d="M820 0H1440V250Z" fill="#C9DDFF" opacity="0.6" />
    <g fill="#fff" opacity="0.35">
      {Array.from({ length: 18 }).map((_, i) => (
        <path key={i} d="M1180 150L1166 -170H1194Z" transform={`rotate(${i * 20} 1180 150)`} />
      ))}
    </g>
    <circle cx="1180" cy="150" r="130" fill="#fff" opacity="0.6" />

    {/* soft clouds */}
    <g fill="#fff" opacity="0.9" style={parallaxStyle(6)}>
      <path d="M520 150a28 28 0 0 1 54-8a22 22 0 0 1 36 18H504a16 16 0 0 1 16-10z" />
      <path d="M1240 300a24 24 0 0 1 46-6a18 18 0 0 1 30 16h-90a14 14 0 0 1 14-10z" />
      <path d="M260 330a22 22 0 0 1 42-6a17 17 0 0 1 28 15h-84a13 13 0 0 1 14-9z" />
    </g>

    {/* distant skyline behind the back hill */}
    <g style={parallaxStyle(3)}>
      <Skyline svgProps={{ x: 0, y: 200, width: 1440, height: 150 }} />
    </g>

    {/* hills: back → front */}
    <path d="M0 360C220 300 380 250 600 290C820 330 980 230 1200 250C1320 262 1400 280 1440 290V760H0Z" fill="#B9D3FF" />
    <path d="M0 360C220 300 380 250 600 290C820 330 980 230 1200 250C1320 262 1400 280 1440 290" stroke="#fff" strokeOpacity="0.55" strokeWidth="3" fill="none" />
    {/* stylised trees on the back hill */}
    <Tree svgProps={{ x: 262, y: 232, width: 64, height: 80 }} />
    <Tree svgProps={{ x: 310, y: 250, width: 48, height: 60 }} />
    <Tree svgProps={{ x: 1000, y: 196, width: 60, height: 76 }} />
    <path d="M0 430C200 380 420 360 640 400C860 440 1060 360 1260 370C1360 375 1410 385 1440 392V760H0Z" fill="#6FA6FF" />
    <path d="M0 430C200 380 420 360 640 400C860 440 1060 360 1260 370C1360 375 1410 385 1440 392" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" fill="none" />
    <Tree svgProps={{ x: 92, y: 330, width: 70, height: 88 }} />
    <Tree svgProps={{ x: 1316, y: 318, width: 56, height: 70 }} />
    <path d="M0 500C260 450 520 470 760 450C1000 430 1200 400 1440 430V760H0Z" fill="url(#wk-front)" />
    <path d="M0 500C260 450 520 470 760 450C1000 430 1200 400 1440 430" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" fill="none" />
    <path d="M0 690C300 660 700 710 1000 680C1200 660 1340 668 1440 676V760H0Z" fill="#0F56D1" opacity="0.45" />

    {/* code window */}
    <g style={parallaxStyle(18)}>
    <g transform="translate(96 120) rotate(-6)" filter="url(#wk-shadow)">
      <rect width="210" height="138" rx="16" fill="#fff" />
      <rect width="210" height="30" rx="16" fill={N} />
      <rect y="16" width="210" height="14" fill={N} />
      <circle cx="20" cy="15" r="4.5" fill={Y} /><circle cx="36" cy="15" r="4.5" fill="#9DBEF7" /><circle cx="52" cy="15" r="4.5" fill="#fff" />
      <rect x="20" y="48" width="70" height="8" rx="4" fill={B} />
      <rect x="98" y="48" width="44" height="8" rx="4" fill="#C9DAF7" />
      <rect x="36" y="66" width="96" height="8" rx="4" fill={N} />
      <rect x="36" y="84" width="60" height="8" rx="4" fill={Y} />
      <rect x="20" y="102" width="84" height="8" rx="4" fill="#C9DAF7" />
      <g transform="translate(150 86)">
        <rect width="44" height="36" rx="10" fill={B} />
        <path d="M15 11l-6 7 6 7M29 11l6 7-6 7M25 9l-6 18" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
    </g>

    {/* gears */}
    <g filter="url(#wk-shadow)" style={parallaxStyle(26)}>
      <path d={gearPath(430, 96, 38, 30, 10)} fill={N} />
      <circle cx="430" cy="96" r="12" fill="#D6E6FF" />
      <path d={gearPath(482, 138, 22, 17, 8)} fill={B} />
      <circle cx="482" cy="138" r="7" fill="#D6E6FF" />
    </g>

    {/* microcontroller chip */}
    <g style={parallaxStyle(14)}>
    <g transform="translate(728 150) rotate(8)" filter="url(#wk-shadow)">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={18 + i * 18} y="-10" width="6" height="12" rx="2" fill="#9DBEF7" />
          <rect x={18 + i * 18} y="78" width="6" height="12" rx="2" fill="#9DBEF7" />
        </g>
      ))}
      <rect width="100" height="80" rx="14" fill={N} />
      <rect x="16" y="16" width="44" height="30" rx="6" fill={B} />
      <circle cx="78" cy="22" r="7" fill={Y} />
      <rect x="16" y="56" width="68" height="6" rx="3" fill="#2B4A8F" />
    </g>
    </g>

    {/* rocket with dashed trail */}
    <g style={parallaxStyle(30)}>
    <path d="M900 330C960 250 1010 230 1060 170" stroke="#fff" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" fill="none" opacity="0.9" />
    <g transform="translate(1092 128) rotate(38)" filter="url(#wk-shadow)">
      <path d="M-11 40Q0 86 11 40Z" fill={Y} />
      <path d="M-18 18L-38 50L-16 42Z" fill={B} />
      <path d="M18 18L38 50L16 42Z" fill={B} />
      <path d="M0 -62C24 -40 28 10 18 42H-18C-28 10 -24 -40 0 -62Z" fill="#fff" />
      <circle cy="-10" r="13" fill={B} />
      <circle cy="-10" r="6" fill="#D6E6FF" />
    </g>
    </g>

    {/* sparkles */}
    <g fill="#fff">
      <path d={sparkle(640, 70, 12)} />
      <path d={sparkle(1300, 90, 10)} />
      <path d={sparkle(360, 230, 9)} />
    </g>
    <g fill={Y}>
      <path d={sparkle(980, 90, 9)} />
      <path d={sparkle(220, 90, 8)} />
    </g>
  </svg>
);

interface WhySPIVideoSectionProps {
  onOpenTrial?: () => void;
}

/** "Mengapa Anak Memilih SPI?": the student video set in an illustrated SPI landscape. */
export const WhySPIVideoSection: React.FC<WhySPIVideoSectionProps> = ({ onOpenTrial }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  useParallax(sceneRef);

  return (
    <section ref={sceneRef} className="relative overflow-hidden bg-[#1870FF]">
      {/* Phones: the landscape is a band on top; desktop: it fills the section */}
      <div className="absolute inset-x-0 top-0 h-[260px] sm:h-[360px] lg:h-full pointer-events-none">
        <Landscape />
      </div>

      {/* SPI robot standing on the hills */}
      <motion.img
        src={ASSETS.brand.pandaMascot}
        alt=""
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10 right-3 top-[92px] w-24 sm:right-[8%] sm:top-[150px] sm:w-36 lg:top-[96px] lg:right-[7%] lg:w-44 drop-shadow-[0_18px_24px_rgba(4,26,90,0.35)]"
        loading="lazy"
        decoding="async"
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[230px] sm:pt-[320px] lg:pt-[330px] pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-5 lg:order-2 text-white space-y-4 lg:pb-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('whykids.title')}</h2>
            <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed">{t('whykids.passion')}</p>
            {onOpenTrial && (
              <button
                type="button"
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-[#1870FF] font-bold text-sm sm:text-base shadow-lg hover:bg-blue-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
              >
                {t('cta.free_trial')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <div className="[perspective:1400px]">
            <div
              className="rounded-[24px] p-1.5 sm:p-2 bg-white/90 shadow-[0_40px_80px_-40px_rgba(4,26,90,0.7)]"
              style={{ transform: 'rotateY(calc(var(--px, 0) * 4deg)) rotateX(calc(var(--py, 0) * -3deg))', transition: 'transform 0.3s ease-out' }}
            >
              <div className="rounded-[18px] overflow-hidden">
                <YouTubeEmbed
                  videoId={WHY_KIDS_VIDEO.id}
                  title={t('whykids.title')}
                  posterFirst
                  options={{ startTime: WHY_KIDS_VIDEO.startTime }}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
