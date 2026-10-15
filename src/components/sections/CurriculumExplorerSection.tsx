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

/** "Kurikulum SPI": a tabbed overview of what each product covers, linking to its page. */
export const CurriculumExplorerSection: React.FC<CurriculumExplorerSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
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
        <div className="rounded-2xl border border-[#DCE7FB] bg-white p-1.5 sm:p-2 mb-5 overflow-x-auto hide-scrollbar">
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
                    selected ? 'bg-[#041A5A] text-white' : 'text-slate-600 hover:text-[#1870FF] hover:bg-[#F4F8FF]'
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
              className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4"
            >
              {current.items.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: reduce ? 0 : Math.min(i, 8) * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(current.link)}
                    className="group relative w-full h-full min-h-[92px] text-left overflow-hidden rounded-2xl bg-[#1870FF] hover:bg-[#1463E6] text-white px-3.5 py-3 sm:px-5 sm:py-4 flex items-center gap-3 sm:gap-4 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(24,112,255,0.9)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#041A5A] focus-visible:ring-offset-2"
                  >
                    {/* faint dot texture */}
                    <span
                      className="absolute inset-0 opacity-[0.12] pointer-events-none"
                      style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                      aria-hidden="true"
                    />
                    <span className="relative flex-1 min-w-0">
                      {item.stage && <span className="block text-[11px] font-bold uppercase tracking-wider text-blue-100/80">{item.stage}</span>}
                      <span className="block text-sm sm:text-base font-black leading-snug">{item.name}</span>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#FFE38A]">
                        {item.soon ? t('cur.soon') : t('cur.detail')}
                        {!item.soon && <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
                      </span>
                    </span>
                    <span className="relative hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-white items-center justify-center ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                      <SpiIcon name={item.icon} size={36} animate="hover" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
