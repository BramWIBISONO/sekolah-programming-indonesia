import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { useParallax, parallaxStyle } from '../../utils/useParallax';
import { SpiIcon, type SpiIconName } from './SpiIcon';
import {
  AIChat, Blocks, Certificate, Chalkboard, ChartCard, Chip, Cloud, CloudServer, CodeWindow, Gears,
  GradCap, NeuralNet, PenCard, RobotCar, Rocket, School, Skyline, Sparkles, Terminal, Tree, WifiChip,
} from './SceneProps';

export type HeroVariant = 'core' | 'lab' | 'engineering' | 'inschool' | 'career' | 'about' | 'partnership' | 'literacy';

type PropFC = React.FC<{ className?: string }>;

/** Which props surround the program artwork on each product page. */
const VARIANTS: Record<HeroVariant, { icon: SpiIconName; topLeft: PropFC; topRight: PropFC; bottomLeft: PropFC; sky: PropFC }> = {
  core: { icon: 'core', topLeft: Blocks, topRight: Rocket, bottomLeft: RobotCar, sky: Gears },
  lab: { icon: 'lab', topLeft: AIChat, topRight: Sparkles, bottomLeft: ChartCard, sky: PenCard },
  engineering: { icon: 'engineering', topLeft: Terminal, topRight: WifiChip, bottomLeft: NeuralNet, sky: CloudServer },
  inschool: { icon: 'inschool', topLeft: Chalkboard, topRight: GradCap, bottomLeft: Certificate, sky: School },
  career: { icon: 'teacher', topLeft: Chalkboard, topRight: Sparkles, bottomLeft: Terminal, sky: Gears },
  about: { icon: 'ecosystem', topLeft: CodeWindow, topRight: Rocket, bottomLeft: Chip, sky: Gears },
  partnership: { icon: 'community', topLeft: School, topRight: Sparkles, bottomLeft: ChartCard, sky: CloudServer },
  literacy: { icon: 'ai', topLeft: AIChat, topRight: Sparkles, bottomLeft: NeuralNet, sky: Gears },
};

/** A scene prop placed by `className`, drifting `depth` px with the pointer and popping in at step `i`. */
export const Layer: React.FC<{ className: string; depth: number; i: number; reduce: boolean; children: React.ReactNode }> =({ className, depth, i, reduce, children }) => (
  <span className={`absolute pointer-events-none ${className}`} style={parallaxStyle(depth)} aria-hidden="true">
    <motion.span
      className="block"
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: reduce ? 0 : 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

// Hill outlines (viewBox 1440×300). Back is drawn on its own so trees can stand between layers.
const BACK = 'M0 120C240 60 420 40 640 80C860 120 1040 30 1260 50C1350 58 1410 70 1440 76';
const MID = 'M0 170C220 120 460 110 680 150C900 190 1100 120 1300 130C1370 134 1420 140 1440 144';
const FRONT = 'M0 220C260 180 520 196 760 178C1000 160 1220 140 1440 160';
const hillsBox = 'absolute inset-x-0 -bottom-1 w-full h-[190px] sm:h-[250px] lg:h-[300px]';

export interface HeroBadge {
  icon: SpiIconName;
  title: string;
  sub?: string;
}

export interface HeroHighlight {
  icon: SpiIconName;
  label: string;
}

interface IllustratedHeroProps {
  variant: HeroVariant;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  description: string;
  art: string;
  artAlt: string;
  primary: { label: string; onClick: () => void };
  secondary?: { label: string; onClick: () => void };
  onBack?: () => void;
  backLabel?: string;
  badges?: HeroBadge[];
  /** Three short facts shown as chips under the buttons (taken from the page's own content). */
  highlights?: HeroHighlight[];
  /** Colour of the band under the hills, to blend into the next section. */
  bottomFill?: string;
  /** Custom artwork (e.g. a photo collage) shown on the tilting card instead of `art`. */
  artSlot?: React.ReactNode;
  /** Extra content under the highlights (e.g. a contact note). */
  footnote?: React.ReactNode;
}

/**
 * Product hero in the same illustrated language as the homepage "Mengapa Anak Memilih SPI?"
 * banner: light sky with a distant skyline, layered blue hills with trees, flat technology props,
 * the program artwork on an orbit and the SPI robot. On desktop the props drift and the artwork
 * tilts with the pointer; everything appears once on load. All motion is off under reduced motion.
 */
export const IllustratedHero: React.FC<IllustratedHeroProps> = ({
  variant, eyebrow, title, lead, description, art, artAlt, primary, secondary, onBack, backLabel,
  badges = [], highlights = [], bottomFill = '#FFFFFF', artSlot, footnote,
}) => {
  const reduce = !!useReducedMotion();
  const sceneRef = useRef<HTMLElement>(null);
  useParallax(sceneRef);
  const { icon, topLeft: TopLeft, topRight: TopRight, bottomLeft: BottomLeft, sky: SkyProp } = VARIANTS[variant];
  const gradId = `hero-front-${variant}`;

  return (
    <section ref={sceneRef} className="relative overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#E9F1FF] to-[#D9E8FF]">
      {/* sky: faint tech grid, diagonal light band, sun with rays, clouds */}
      <div
        className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
        style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '44px 44px' }}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 w-[60%] h-[52%] bg-[#C9DDFF]/55 [clip-path:polygon(30%_0,100%_0,100%_100%)]" aria-hidden="true" />
      <div
        className="absolute right-[6%] -top-24 w-[520px] h-[520px] rounded-full opacity-70 [mask-image:radial-gradient(circle,black_20%,transparent_68%)]"
        style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.75) 0deg 5deg, transparent 5deg 18deg)' }}
        aria-hidden="true"
      />
      <div className="absolute right-[14%] top-[4%] w-56 h-56 rounded-full bg-white/70 shadow-[0_0_80px_30px_rgba(255,255,255,0.55)]" aria-hidden="true" />
      <Layer className="left-[38%] top-[10%] w-24 hidden lg:block" depth={8} i={0} reduce={reduce}><Cloud className="w-full" /></Layer>
      <Layer className="right-[30%] top-[40%] w-20 hidden lg:block" depth={6} i={0} reduce={reduce}><Cloud className="w-full" /></Layer>
      <Layer className="left-[54%] top-[3%] w-24 hidden lg:block" depth={26} i={1} reduce={reduce}><SkyProp className="w-full" /></Layer>

      {/* distant skyline, sitting just behind the back hill */}
      <span className="absolute inset-x-0 bottom-[120px] sm:bottom-[160px] lg:bottom-[205px] h-[90px] sm:h-[120px] lg:h-[150px] pointer-events-none" style={parallaxStyle(3)} aria-hidden="true">
        <Skyline className="w-full h-full" />
      </span>

      {/* back hill */}
      <svg className={hillsBox} viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <path d={`${BACK}V300H0Z`} fill="#B9D3FF" />
        <path d={BACK} stroke="#fff" strokeOpacity="0.6" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* trees standing on the back hill, half hidden by the middle hill */}
      <Layer className="left-[3%] bottom-[96px] w-14 sm:bottom-[128px] sm:w-16 lg:bottom-[150px] lg:w-20" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <Layer className="left-[9%] bottom-[92px] w-10 sm:bottom-[124px] sm:w-12 lg:bottom-[144px] lg:w-14" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <Layer className="left-[40%] bottom-[150px] w-14 hidden lg:block" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>
      <Layer className="right-[3%] bottom-[104px] w-12 sm:bottom-[140px] sm:w-14 lg:bottom-[172px] lg:w-16" depth={5} i={0} reduce={reduce}><Tree className="w-full" /></Layer>

      {/* middle + front hills, a winding learning path, and the soft edge into the next section */}
      <svg className={hillsBox} viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A7DFF" />
            <stop offset="1" stopColor="#1463E6" />
          </linearGradient>
        </defs>
        <path d={`${MID}V300H0Z`} fill="#6FA6FF" />
        <path d={MID} stroke="#fff" strokeOpacity="0.5" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <path d={`${FRONT}V300H0Z`} fill={`url(#${gradId})`} />
        <path d={FRONT} stroke="#fff" strokeOpacity="0.4" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
        <motion.path
          d="M60 300C240 262 470 268 660 240S980 200 1160 186"
          stroke="#fff"
          strokeOpacity="0.45"
          strokeWidth="4"
          strokeDasharray="2 14"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
        />
        <path d="M0 284C380 262 900 304 1440 276V300H0Z" fill={bottomFill} />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-20 lg:pb-24">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1870FF] mb-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{backLabel}</span>
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          {/* copy, kept on the sky so it stays readable */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-5 lg:pb-[150px]"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white pl-1.5 pr-4 py-1.5 shadow-[0_8px_20px_-12px_rgba(4,26,90,0.5)] border border-[#DCE7FB]">
              <span className="w-7 h-7 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                <SpiIcon name={icon} size={22} animate="none" />
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#1870FF]">{eyebrow}</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#041A5A] tracking-tight leading-[1.05] text-balance">{title}</h1>
            {lead && <p className="text-lg sm:text-xl font-bold text-[#1870FF] leading-snug">{lead}</p>}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">{description}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={primary.onClick}
                className="group relative overflow-hidden inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                {/* a light sweep on hover */}
                <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:translate-x-[420%]" aria-hidden="true" />
                <span className="relative">{primary.label}</span>
                <ArrowRight className="relative w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              {secondary && (
                <button
                  type="button"
                  onClick={secondary.onClick}
                  className="inline-flex justify-center items-center gap-1.5 h-12 sm:h-14 px-6 rounded-2xl bg-white text-[#041A5A] font-bold border border-[#C9DAF7] hover:border-[#1870FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  {secondary.label}
                  <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                </button>
              )}
            </div>
            {highlights.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {highlights.map((h, i) => (
                  <motion.li
                    key={h.label}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : 0.6 + i * 0.08 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur pl-1.5 pr-3.5 py-1.5 border border-[#DCE7FB] text-sm font-bold text-[#041A5A]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={h.icon} size={18} animate="none" /></span>
                    {h.label}
                  </motion.li>
                ))}
              </ul>
            )}
            {footnote}
          </motion.div>

          {/* program artwork on an orbit, standing on the hills, with props around it */}
          <div className="lg:col-span-6 relative mx-3 sm:mx-10 lg:mx-0 lg:ml-8 mt-6 lg:mt-0">
            {/* glow + dashed orbit behind the card */}
            <span className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(255,255,255,0))]" aria-hidden="true" />
            <svg className="absolute pointer-events-none" style={{ left: '-8%', top: '-14%', width: '116%', height: '128%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <motion.ellipse
                cx="50" cy="52" rx="49" ry="46"
                fill="none" stroke="#1870FF" strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="1 6" strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
              />
              {[[3, 40], [96, 30], [70, 96], [22, 92]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.9" fill="#1870FF" opacity="0.7" />
              ))}
            </svg>

            <Layer className="-left-5 -top-10 w-24 sm:-left-12 sm:-top-14 sm:w-36 z-20" depth={18} i={2} reduce={reduce}><TopLeft className="w-full" /></Layer>
            <Layer className="-right-3 -top-12 w-14 sm:-right-8 sm:-top-16 sm:w-24 z-20" depth={28} i={3} reduce={reduce}><TopRight className="w-full rotate-[18deg]" /></Layer>
            <Layer className="-left-6 -bottom-8 w-24 sm:-left-14 sm:-bottom-10 sm:w-36 z-20" depth={12} i={4} reduce={reduce}><BottomLeft className="w-full" /></Layer>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 [perspective:1200px]"
            >
              {/* tilts toward the pointer on desktop (uses the same --px/--py as the parallax) */}
              <div
                className="relative rounded-[28px] p-1.5 sm:p-2 bg-white shadow-[0_40px_80px_-40px_rgba(4,26,90,0.7)]"
                style={{
                  transform: 'rotateY(calc(var(--px, 0) * 6deg)) rotateX(calc(var(--py, 0) * -5deg))',
                  transition: 'transform 0.3s ease-out',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  {artSlot ?? <img src={art} alt={artAlt} className="w-full aspect-[4/3] object-cover" decoding="async" />}
                  {/* glossy sheen that slides with the pointer */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.28) 48%, transparent 62%)',
                      transform: 'translateX(calc(var(--px, 0) * 22%))',
                      transition: 'transform 0.3s ease-out',
                    }}
                    aria-hidden="true"
                  />
                </div>
                {badges.map((b, i) => (
                  <span
                    key={b.title}
                    className={`hidden sm:flex absolute items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2 shadow-xl ${
                      i === 0 ? 'left-5 top-5' : i === 1 ? 'right-5 top-5' : 'left-1/2 -translate-x-1/2 bottom-5 whitespace-nowrap'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={b.icon} size={24} animate="none" /></span>
                    <span className="text-left">
                      <span className="block text-[11px] font-black text-[#041A5A] leading-tight">{b.title}</span>
                      {b.sub && <span className="block text-[10px] text-slate-500 leading-tight">{b.sub}</span>}
                    </span>
                  </span>
                ))}
              </div>
            </motion.div>

            <Layer className="-right-4 -bottom-10 w-20 sm:-right-10 sm:-bottom-12 sm:w-32 z-20" depth={8} i={5} reduce={reduce}>
              <img src={ASSETS.brand.pandaMascot} alt="" className="w-full drop-shadow-[0_18px_24px_rgba(4,26,90,0.35)]" />
            </Layer>
          </div>
        </div>
      </div>
    </section>
  );
};
