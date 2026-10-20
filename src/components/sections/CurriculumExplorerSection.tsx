import React, { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon } from '../illustrations/SpiIcon';
import { CURRICULUM, type CurriculumProduct } from '../../data/curriculum';

interface CurriculumExplorerSectionProps {
  onNavigate: (path: string) => void;
}

const PRODUCTS: CurriculumProduct[] = ['core', 'lab', 'engineering', 'inschool'];

/** Each stage gets its own colour, so the levels read as a progression. Unlisted stages keep the brand blue. */
const STAGE_ACCENT: Record<string, { text: string; chip: string; border: string }> = {
  'Early Discovery': { text: 'text-[#D97706]', chip: 'bg-[#FFF4D6] text-[#D97706]', border: 'hover:border-[#D97706]/50' },
  Foundation: { text: 'text-[#1870FF]', chip: 'bg-[#EAF2FF] text-[#1870FF]', border: 'hover:border-[#1870FF]/50' },
  Development: { text: 'text-[#059669]', chip: 'bg-[#E3F9EF] text-[#059669]', border: 'hover:border-[#059669]/50' },
  AI: { text: 'text-[#7C3AED]', chip: 'bg-[#F0E9FF] text-[#7C3AED]', border: 'hover:border-[#7C3AED]/50' },
};
const DEFAULT_ACCENT = { text: 'text-[#1870FF]', chip: 'bg-[#F1F6FF] text-[#1870FF]', border: 'hover:border-[#1870FF]/40' };

/** "Kurikulum SPI": a tabbed overview of what each product covers, linking to its page. */
export const CurriculumExplorerSection: React.FC<CurriculumExplorerSectionProps> = ({ onNavigate }) => {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CurriculumProduct>('core');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = CURRICULUM[active];

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + PRODUCTS.length) % PRODUCTS.length;
    setActive(PRODUCTS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="curriculum-section" className="pb-16 sm:pb-24 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight">{t('cur.title')}</h2>
          <p className="text-sm sm:text-base text-slate-600">{t('cur.desc')}</p>
        </div>

        {/* Product tabs */}
        <div className="rounded-2xl border border-[#DCE7FB] bg-white p-1.5 sm:p-2 mb-6 overflow-x-auto hide-scrollbar">
          <div role="tablist" aria-label={t('cur.title')} className="flex sm:justify-center gap-1 min-w-max sm:min-w-0">
            {PRODUCTS.map((p, i) => {
              const selected = p === active;
              return (
                <button
                  key={p}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  id={`cur-tab-${p}`}
                  aria-selected={selected}
                  aria-controls="cur-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(p)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`h-10 px-4 sm:px-5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                    selected ? 'bg-[#1870FF] text-white' : 'text-slate-600 hover:text-[#1870FF] hover:bg-[#F4F8FF]'
                  }`}
                >
                  {t(`prog.${p}.short`)}
                </button>
              );
            })}
          </div>
        </div>

        <div id="cur-panel" role="tabpanel" aria-labelledby={`cur-tab-${active}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={active}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {current.items.map((item, i) => {
                const desc = item.desc?.[lang];
                const accent = (item.stage && STAGE_ACCENT[item.stage]) || DEFAULT_ACCENT;
                return (
                  <motion.li
                    key={item.name}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: reduce ? 0 : Math.min(i, 8) * 0.03 }}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigate(current.link)}
                      className="group flex h-full w-full min-h-[120px] flex-col rounded-2xl border border-[#E4ECF8] bg-white p-5 sm:p-6 text-left transition-[border-color,transform] duration-300 hover:-translate-y-0.5 ${accent.border} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent.chip}`}>
                          <SpiIcon name={item.icon} size={22} animate="hover" />
                        </span>
                        {item.stage && (
                          <span className={`pt-1 text-[11px] font-bold uppercase tracking-wider ${accent.text}`}>{item.stage}</span>
                        )}
                      </span>

                      <span className="mt-5 block text-base sm:text-lg font-black leading-snug text-[#041A5A]">
                        {item.code && <span className={`mr-1.5 ${accent.text}`}>{item.code}</span>}
                        {item.name}
                      </span>

                      {desc && <span className="mt-2 block text-sm leading-relaxed text-slate-600">{desc}</span>}

                      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-bold text-slate-500 transition-colors group-hover:text-[#1870FF]">
                        {item.soon ? t('cur.soon') : t('cur.detail')}
                        {!item.soon && <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
