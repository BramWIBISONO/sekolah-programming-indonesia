import React, { useId, useRef } from 'react';
import { Code2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_LOCATIONS } from '../../data/locations';
import {
  CITY_POINTS, ISLAND_PATHS, JAVA_BOUNDS, JAVA_CITY_POINTS, JAVA_PATHS, JAVA_VIEWBOX, MAP_VIEWBOX, REGION_POINTS,
} from '../../data/indonesiaMap';
import { useLanguage } from '../../i18n';
import { gearPath } from '../illustrations/SceneProps';
import { parallaxStyle, useParallax } from '../../utils/useParallax';

const OPEN_REGIONS = ['sumatra', 'kalimantan', 'sulawesi', 'bali_nusa', 'maluku_papua'] as const;

/** Real photos of SPI classes. They are not tied to a particular city, so none is pinned to one. */
const PHOTOS = [
  ASSETS.learning.codingClass,
  ASSETS.learning.mentorSession,
  ASSETS.learning.aiProject,
  ASSETS.learning.studentPresentation,
  ASSETS.learning.roboticsClass,
  ASSETS.learning.teamProject,
];

/** Desktop collage: where each photo floats (outer box %), its size, tilt and parallax depth. */
const PHOTO_SLOTS = [
  { cls: 'left-[39%] top-[3%] w-[14%]', rot: -3, depth: 10 },
  { cls: 'left-[56%] top-0 w-[16%]', rot: 2, depth: 16 },
  { cls: 'left-[77%] top-[5%] w-[19%]', rot: -2, depth: 8 },
  { cls: 'left-[69%] top-[36%] w-[12%]', rot: 3, depth: 14 },
  { cls: 'left-[1%] top-[63%] w-[15%]', rot: -2, depth: 12 },
  { cls: 'left-[80%] top-[75%] w-[15%]', rot: 2, depth: 10 },
];

/** Where a city's name sits next to its pin in the Java close-up (keeps the five names apart). */
const LABEL_OFFSET: Record<string, string> = {
  'spi-jakarta': 'translate(12px, -50%)',
  'spi-jogja': 'translate(calc(-100% - 12px), -20%)',
  'spi-solo': 'translate(-50%, calc(-100% - 12px))',
  'spi-surabaya': 'translate(12px, -85%)',
  'spi-malang': 'translate(12px, -5%)',
};

const pctX = (x: number) => `${(x / MAP_VIEWBOX.width) * 100}%`;
const pctY = (y: number) => `${(y / MAP_VIEWBOX.height) * 100}%`;

/** Stylised Indonesia with the five SPI locations (on Java) and the regions open to partnership. */
const IndonesiaMap: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { t } = useLanguage();
  // unique ids: the map renders twice (desktop collage + phone layout) and one copy is always hidden
  const uid = useId().replace(/:/g, '');
  const j = JAVA_BOUNDS;
  return (
    <div className="relative w-full aspect-[950/370]">
      <svg viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <pattern id={`${uid}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.25" fill="#B9CFF5" />
          </pattern>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0" stopColor="#1870FF" stopOpacity="0.28" />
            <stop offset="1" stopColor="#1870FF" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Object.entries(ISLAND_PATHS).map(([name, d]) => (
          <g key={name}>
            <path d={d} fill={name === 'java' ? '#DCE8FF' : '#EEF3FB'} stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            <path d={d} fill={`url(#${uid}-dots)`} opacity={name === 'java' ? 1 : 0.8} />
          </g>
        ))}
        {/* Java, where every SPI location is today */}
        <ellipse cx={j.x + j.width / 2} cy={j.y + j.height / 2} rx={j.width * 0.75} ry={j.height * 1.3} fill={`url(#${uid}-glow)`} />
        <ellipse
          cx={j.x + j.width / 2} cy={j.y + j.height / 2} rx={j.width * 0.62} ry={j.height * 0.95}
          fill="none" stroke="#1870FF" strokeWidth="1.6" strokeDasharray="5 6" className="spi-anim-dash"
        />
      </svg>

      {SPI_LOCATIONS.map((loc) => {
        const p = CITY_POINTS[loc.id];
        if (!p) return null;
        return (
          <span key={loc.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pctX(p.x), top: pctY(p.y) }} aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-[#1870FF] spi-anim-ping" />
            <span className={`relative block rounded-full bg-[#1870FF] border-2 border-white shadow ${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} />
          </span>
        );
      })}

      {OPEN_REGIONS.map((key) => {
        const p = REGION_POINTS[key];
        // labels near the left/right edge grow inwards so they never get cut off
        const shift = p.x > MAP_VIEWBOX.width * 0.85 ? '-translate-x-[92%]' : p.x < MAP_VIEWBOX.width * 0.16 ? '-translate-x-[25%]' : '-translate-x-1/2';
        return (
          <span
            key={key}
            className={`absolute ${shift} -translate-y-1/2 whitespace-nowrap rounded-full border border-dashed border-[#1870FF]/60 bg-white/90 font-bold text-[#041A5A] shadow-sm ${
              compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2.5 py-1 text-[11px]'
            }`}
            style={{ left: pctX(p.x), top: pctY(p.y) }}
          >
            + {t(`network.region.${key}`)}
          </span>
        );
      })}
    </div>
  );
};

/** Close-up of Java with the five SPI locations named. */
const JavaCard: React.FC = () => {
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');
  return (
    <div className="rounded-[20px] bg-white border border-[#E3ECFA] shadow-[0_24px_50px_-30px_rgba(4,26,90,0.55)] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3 px-1 pb-2">
        <p className="text-sm font-black text-[#041A5A]">{t('net.java')}</p>
        <p className="flex items-center gap-1.5 text-[11px] font-bold text-[#1870FF]">
          <span className="w-2 h-2 rounded-full bg-[#1870FF]" aria-hidden="true" />
          {t('network.locations_count').replace('{n}', String(SPI_LOCATIONS.length))}
        </p>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${JAVA_VIEWBOX.width} ${JAVA_VIEWBOX.height}`} className="w-full h-auto" aria-hidden="true">
          <defs>
            <pattern id={`${uid}-jdots`} width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.4" fill="#B9CFF5" />
            </pattern>
          </defs>
          {Object.entries(JAVA_PATHS).map(([name, d]) => (
            <g key={name}>
              <path d={d} fill={name === 'java' ? '#E3EDFF' : '#F1F5FC'} stroke="#C9DAF7" strokeWidth="1.5" strokeLinejoin="round" />
              <path d={d} fill={`url(#${uid}-jdots)`} />
            </g>
          ))}
        </svg>
        <ul aria-label={t('network.current')}>
          {SPI_LOCATIONS.map((loc) => {
            const p = JAVA_CITY_POINTS[loc.id];
            if (!p) return null;
            return (
              <li
                key={loc.id}
                className="absolute"
                style={{ left: `${(p.x / JAVA_VIEWBOX.width) * 100}%`, top: `${(p.y / JAVA_VIEWBOX.height) * 100}%` }}
              >
                <span className="absolute -translate-x-1/2 -translate-y-1/2 flex" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-[#1870FF] spi-anim-ping" />
                  <span className="relative w-3.5 h-3.5 rounded-full bg-[#1870FF] border-2 border-white shadow" />
                </span>
                <span
                  className="absolute whitespace-nowrap rounded-md bg-[#1870FF] px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white shadow"
                  style={{ transform: LABEL_OFFSET[loc.id] }}
                >
                  {loc.city}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

/**
 * SPI network as a map collage: a dotted map of Indonesia, the five SPI locations on Java (named in a
 * close-up), dashed labels on the regions open to partnership, and real class photos floating around.
 */
export const SpiNetworkMap: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref);

  const pop = (i: number) => ({
    initial: reduce ? false : { opacity: 0, scale: 0.8, y: 16 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.5, delay: reduce ? 0 : 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div>
      {/* Desktop: collage */}
      <div ref={ref} className="hidden lg:block relative aspect-[16/9]">
        <div className="absolute inset-x-0 bottom-0">
          <IndonesiaMap />
        </div>

        {/* dashed links between the photos and from the Java close-up down to Java */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M46 14 L64 10 L86 16 M75 44 L86 16 M64 10 L75 44 M9 72 L19 30" stroke="#1870FF" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="4 5" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M20 31 C22 52 30 64 33 80" stroke="#1870FF" strokeWidth="1.8" strokeDasharray="6 6" fill="none" vectorEffect="non-scaling-stroke" className="spi-anim-dash" />
        </svg>

        <motion.div {...pop(0)} className="absolute left-[2%] top-[3%] w-[34%] z-10" style={parallaxStyle(6)}>
          <JavaCard />
        </motion.div>

        {PHOTOS.map((src, i) => {
          const slot = PHOTO_SLOTS[i];
          return (
            <div key={src} className={`absolute ${slot.cls}`} style={parallaxStyle(slot.depth)}>
              <motion.div {...pop(i + 1)}>
                <img
                  src={src}
                  alt={t('net.photo_alt')}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover rounded-2xl border-4 border-white shadow-[0_24px_48px_-24px_rgba(4,26,90,0.6)] transition-transform duration-300 hover:scale-[1.04]"
                  style={{ rotate: `${slot.rot}deg` }}
                />
              </motion.div>
            </div>
          );
        })}

        {/* decorations */}
        <span className="absolute left-[34%] top-[27%] w-12 h-12 rounded-full bg-[#1870FF] text-white flex items-center justify-center shadow-lg" style={parallaxStyle(20)} aria-hidden="true">
          <Code2 className="w-6 h-6" />
        </span>
        <svg className="absolute left-[73.5%] top-[1%] w-10 h-10 spi-anim-spin [animation-duration:12s]" viewBox="0 0 40 40" aria-hidden="true">
          <path d={gearPath(20, 20, 17, 12, 8)} fill="#FFC928" />
          <circle cx="20" cy="20" r="5.5" fill="#fff" />
        </svg>
        <span className="absolute left-[97%] top-[32%] w-8 h-8 rounded-full bg-[#1870FF]/80" aria-hidden="true" />
        <span className="absolute left-[30%] top-[58%] w-5 h-5 rounded-full bg-[#FFC928]" aria-hidden="true" />
        <span className="absolute left-[64%] top-[66%] w-10 h-10 rounded-full bg-[#BFD6FF]" aria-hidden="true" />

        {/* legend */}
        <p className="absolute left-[17%] bottom-[1%] flex items-center gap-4 text-[11px] font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1870FF]" aria-hidden="true" />{t('network.current')} ({SPI_LOCATIONS.length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-dashed border-[#1870FF]" aria-hidden="true" />{t('network.open')}</span>
        </p>
      </div>

      {/* Phones and tablets: map, close-up and a strip of photos */}
      <div className="lg:hidden space-y-4">
        <IndonesiaMap compact />
        <JavaCard />
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1 hide-scrollbar">
          {PHOTOS.map((src) => (
            <img
              key={src}
              src={src}
              alt={t('net.photo_alt')}
              loading="lazy"
              decoding="async"
              className="snap-start shrink-0 w-44 sm:w-56 aspect-[4/3] object-cover rounded-2xl border-4 border-white shadow-[0_16px_32px_-20px_rgba(4,26,90,0.55)]"
            />
          ))}
        </div>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#1870FF]" aria-hidden="true" />{t('network.current')} ({SPI_LOCATIONS.length})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border border-dashed border-[#1870FF]" aria-hidden="true" />{t('network.open')}</span>
        </p>
      </div>
    </div>
  );
};
