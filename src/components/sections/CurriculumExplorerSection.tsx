import React, { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpotlightLayer, spotlightMove } from '../common/Spotlight';
import { CURRICULUM, type CurriculumProduct } from '../../data/curriculum';
import {
  BuildAIScene,
  BuildBrainScene,
  BuildWebScene,
  ConnectBodyScene,
  ConnectSystemsScene,
  CreateExperienceScene,
  ExploreScene,
  PathwayFrame,
  PRESCHOOL_SKILLS,
  ResearchScene,
  ThinkPythonScene,
} from '../program/CorePathwayScenes';

interface CurriculumExplorerSectionProps {
  onNavigate: (path: string) => void;
}

const PRODUCTS: CurriculumProduct[] = ['core', 'lab', 'engineering', 'inschool'];

/**
 * Each core item shows its own animated scene, the same scenes as the Foundation and Development pages.
 * Items without a scene of their own use the generic branching scene.
 */
const SCENE_BY_KEY: Record<string, React.FC> = {
  Preschool: PRESCHOOL_SKILLS[0].Tile,
  '1.0': BuildBrainScene,
  '1.1': ConnectBodyScene,
  '1.2': CreateExperienceScene,
  '2.0': BuildAIScene,
  '2.1': ThinkPythonScene,
  '2.2': BuildWebScene,
  '2.3': ConnectSystemsScene,
  '2.4': ResearchScene,
};

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
                const Scene = SCENE_BY_KEY[item.code ?? item.name] ?? ExploreScene;
                const eyebrow = [item.stage, item.code].filter(Boolean).join(' ');
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
                      onPointerMove={spotlightMove}
                      className="group relative flex h-full w-full min-h-[120px] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5 text-left shadow-[0_18px_36px_-30px_rgba(4,26,90,0.35)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/30 hover:shadow-[0_26px_50px_-30px_rgba(24,112,255,0.45)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                    >
                      <SpotlightLayer />
                      <PathwayFrame>
                        <Scene />
                      </PathwayFrame>

                      {eyebrow && (
                        <span className="mt-4 block px-1 text-[11px] font-bold uppercase tracking-wider text-[#1870FF]">{eyebrow}</span>
                      )}
                      <span className="mt-1 block px-1 text-base sm:text-lg font-black leading-snug text-[#041A5A]">{item.name}</span>

                      {desc && <span className="mt-1.5 block px-1 text-sm leading-relaxed text-slate-600">{desc}</span>}

                      <span className="mt-auto inline-flex items-center gap-1 px-1 pt-4 text-xs font-bold text-slate-500 transition-colors group-hover:text-[#1870FF]">
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
