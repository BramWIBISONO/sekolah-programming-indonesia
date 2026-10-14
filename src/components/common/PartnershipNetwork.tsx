import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SPI_LOCATIONS, locationName } from '../../data/locations';
import { SpiIcon } from '../illustrations/SpiIcon';

/**
 * SPI partnership network as a hub-and-spoke diagram (non-geographic on purpose):
 * the inner ring holds the verified learning locations, the dashed outer ring holds
 * regions that are open to partnership. A text list is always available as an alternative.
 */
const OPEN_REGIONS = ['sumatra', 'kalimantan', 'sulawesi', 'bali_nusa', 'maluku_papua'];

const INNER_R = 112; // in a 400×400 diagram
const OUTER_R = 176;

const polar = (r: number, i: number, count: number, offsetDeg = -90) => {
  const a = ((offsetDeg + (360 / count) * i) * Math.PI) / 180;
  return { x: 200 + r * Math.cos(a), y: 200 + r * Math.sin(a), cos: Math.cos(a) };
};

/** Outer pills stay inside the box: left-side pills grow rightwards, right-side pills leftwards. */
const anchor = (cos: number) => (cos < -0.35 ? 'translate(-12%, -50%)' : cos > 0.35 ? 'translate(-88%, -50%)' : 'translate(-50%, -50%)');

/** Inner labels point away from the hub: pin stays centred on its point, label sits outside it. */
const innerLayout = (cos: number) =>
  Math.abs(cos) < 0.25
    ? { className: 'flex-col', transform: 'translate(-50%, -20px)' }
    : cos < 0
      ? { className: 'flex-row-reverse', transform: 'translate(calc(-100% + 20px), -50%)' }
      : { className: 'flex-row', transform: 'translate(-20px, -50%)' };

interface PartnershipNetworkProps {
  /** Optional action shown under the diagram. */
  onDiscuss?: () => void;
}

export const PartnershipNetwork: React.FC<PartnershipNetworkProps> = ({ onDiscuss }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const inner = SPI_LOCATIONS.map((loc, i) => ({ loc, ...polar(INNER_R, i, SPI_LOCATIONS.length) }));
  const outer = OPEN_REGIONS.map((key, i) => ({ key, ...polar(OUTER_R, i, OPEN_REGIONS.length, -90 + 36) }));

  const pop = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="rounded-[28px] border border-[#E3ECFA] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_24px_60px_-40px_rgba(4,26,90,0.45)] overflow-hidden text-left">
      {/* Title + legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-black text-[#041A5A] dark:text-white">{t('network.title')}</h3>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1" aria-label={t('network.legend')}>
          <li className="flex items-center gap-1.5 text-[11px] font-bold text-[#041A5A] dark:text-slate-200">
            <span className="w-3 h-3 rounded-full bg-[#176DF8] ring-2 ring-[#176DF8]/25" aria-hidden="true" />
            {t('network.current')} ({SPI_LOCATIONS.length})
          </li>
          <li className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-[#176DF8]/70" aria-hidden="true" />
            {t('network.open')}
          </li>
        </ul>
      </div>

      {/* Diagram */}
      <div className="px-4 sm:px-6 pt-6 pb-4 bg-[radial-gradient(circle_at_center,#F2F7FF_0%,#FFFFFF_70%)] dark:bg-none">
        <div className="relative w-full max-w-[440px] mx-auto aspect-square" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            <circle cx="200" cy="200" r={OUTER_R} fill="none" stroke="#C9DAF7" strokeWidth="1.5" strokeDasharray="4 7" className="spi-anim-spin" style={{ animationDuration: '90s' }} />
            <circle cx="200" cy="200" r={INNER_R} fill="#F4F8FF" stroke="#DCE6F7" strokeWidth="1.5" />
            {inner.map(({ loc, x, y }) => (
              <g key={loc.id}>
                <line x1="200" y1="200" x2={x} y2={y} stroke="#C9DAF7" strokeWidth="2" />
                <line x1="200" y1="200" x2={x} y2={y} stroke="#176DF8" strokeWidth="2" strokeDasharray="3 9" className="spi-anim-dash" />
              </g>
            ))}
            <circle cx="200" cy="200" r="34" fill="#176DF8" opacity="0.25" className="spi-anim-ping" />
          </svg>

          {/* Hub */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] aspect-square rounded-full bg-[#041A5A] text-white flex items-center justify-center font-black text-sm sm:text-base shadow-lg ring-4 ring-white">
            SPI
          </div>

          {/* Verified learning locations */}
          {inner.map(({ loc, x, y, cos }, i) => (
            <motion.div key={loc.id} {...pop(i)} className="absolute" style={{ left: `${x / 4}%`, top: `${y / 4}%` }}>
              <div className={`flex items-center gap-1.5 ${innerLayout(cos).className}`} style={{ transform: innerLayout(cos).transform }}>
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white ring-2 ring-[#176DF8] shadow-md flex items-center justify-center shrink-0">
                  <SpiIcon name="pin" size={26} animate="none" />
                </span>
                <span className="hidden sm:inline whitespace-nowrap text-[12px] font-bold text-[#041A5A] bg-white/95 rounded-md px-1.5 py-0.5 shadow-sm">
                  {loc.city}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Regions open to partnership */}
          {outer.map(({ key, x, y, cos }, i) => (
            <motion.div key={key} {...pop(i + 5)} className="absolute" style={{ left: `${x / 4}%`, top: `${y / 4}%` }}>
              <div style={{ transform: anchor(cos) }}>
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border-2 border-dashed border-[#176DF8]/55 bg-white px-2 py-1 text-[11px] font-bold text-[#0B3C95]">
                  <span aria-hidden="true">+</span>
                  <span className="hidden sm:inline">{t(`network.region.${key}`)}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text alternative: visible on small screens, available to screen readers everywhere */}
      <div className="px-5 sm:px-6 pb-6 space-y-4">
        <div className="sm:sr-only">
          <p className="text-xs font-black uppercase tracking-wider text-[#176DF8] mb-2">{t('network.current')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {SPI_LOCATIONS.map((loc) => (
              <li key={loc.id} className="text-xs font-bold text-white bg-[#176DF8] rounded-md px-2 py-1">
                <span className="sr-only">{locationName(loc)}, {t(loc.provinceKey)}</span>
                <span aria-hidden="true">{loc.city}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs font-black uppercase tracking-wider text-slate-500 mt-4 mb-2">{t('network.open')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {OPEN_REGIONS.map((key) => (
              <li key={key} className="text-xs font-bold text-[#0B3C95] border-2 border-dashed border-[#176DF8]/45 rounded-md px-2 py-0.5">
                {t(`network.region.${key}`)}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t('network.open_note')}</p>
        {onDiscuss && (
          <button
            type="button"
            onClick={onDiscuss}
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
          >
            {t('network.open_cta')}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </div>
  );
};
