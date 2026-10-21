import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS, asset } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SpiIcon } from '../illustrations/SpiIcon';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { LAB_CATEGORIES, setPendingLabArea, type LabCategoryKey } from '../../data/labCategories';
import { CategoryVisual } from '../lab/CategoryVisual';
import { HomepagePartnerLogosSection } from '../sections/HomepagePartnerLogosSection';

interface LabProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate?: (path: string) => void;
}

/** How many area names a category card lists before "+N more". */
const PREVIEW_LIMIT = 6;

export const LabProgramPage: React.FC<LabProgramPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<LabCategoryKey>('ai');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = LAB_CATEGORIES.find((c) => c.key === active)!;

  /** Opens a category page, optionally scrolled to one of its areas. */
  const openCategory = (path: string, area?: string) => {
    setPendingLabArea(area ?? null);
    onNavigate?.(path);
  };

  /** Arrow keys move between the preview tabs. */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + LAB_CATEGORIES.length) % LAB_CATEGORIES.length;
    setActive(LAB_CATEGORIES[next].key);
    tabRefs.current[next]?.focus();
  };

  const askAvailability = (name?: string) =>
    openSpiWhatsApp(t('lab.wa_message').replace('{category}', name ?? 'SPI Lab'));

  const scrollToCategories = () =>
    document.getElementById('lab-categories')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-[#0B1220] dark:text-white pb-20 selection:bg-[#1870FF] selection:text-white font-sans transition-colors">

      {/* 1. Hero: illustrated scene shared with the other product pages */}
      <IllustratedHero
        variant="lab"
        eyebrow="SPI Lab"
        title={t('lab.hero.title')}
        description={t('lab.hero.desc')}
        art={ASSETS.programs.spiLab}
        artAlt={t('lab.hero.image_alt')}
        primary={{ label: t('lab.hero.cta'), onClick: scrollToCategories }}
        secondary={{ label: t('cta.free_trial'), onClick: onOpenTrial }}
        onBack={onBack}
        backLabel={t('lab.back')}
        highlights={[
          { icon: 'ai', label: 'AI for Work' },
          { icon: 'office', label: 'Office' },
          { icon: 'creative', label: 'Design & Editing' },
        ]}
        bottomFill="#FFFFFF"
      />

      {/* 2. Partners: same carousel as the homepage */}
      <HomepagePartnerLogosSection />


      {/* 3. Why SPI Lab: from digital consumer to digital creator */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">SPI Lab</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('lab.why.title')}</h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t('lab.why.desc')}</p>
            </div>
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end gap-4" aria-hidden="true">
              <span className="w-20 h-20 rounded-[22px] bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 flex items-center justify-center">
                <SpiIcon name="consumer" size={56} animate="none" />
              </span>
              <svg width="72" height="16" viewBox="0 0 72 16" className="shrink-0">
                <path d="M2 8h62" stroke="#C9DAF7" strokeWidth="2" strokeDasharray="4 5" />
                <path d="M62 3l6 5-6 5" stroke="#1870FF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="w-20 h-20 rounded-[22px] bg-[#EEF4FF] dark:bg-slate-800 flex items-center justify-center">
                <SpiIcon name="creator" size={56} animate="none" />
              </span>
            </div>
          </div>

          <div className="rounded-[24px] bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 px-8 py-4 bg-[#F7F9FE] dark:bg-slate-800/60 text-xs font-black uppercase tracking-widest">
              <span className="text-slate-500 dark:text-slate-400">{t('lab.why.from')}</span>
              <span className="w-5" aria-hidden="true" />
              <span className="text-[#1870FF]">{t('lab.why.to')}</span>
            </div>
            <ol className="divide-y divide-[#EEF2F8] dark:divide-slate-800">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-6 items-center px-5 sm:px-8 py-5">
                  <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    <span className="md:hidden text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{t('lab.why.from')}</span>
                    {t(`lab.why.c${n}`)}
                  </p>
                  <ArrowRight className="hidden md:block w-5 h-5 text-[#1870FF]" aria-hidden="true" />
                  <p className="text-sm sm:text-base font-bold text-[#041A5A] dark:text-white">
                    <span className="md:hidden text-[11px] font-black uppercase tracking-widest text-[#1870FF] block mb-0.5">{t('lab.why.to')}</span>
                    {t(`lab.why.s${n}`)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Three categories (each opens its own page) + a quick look inside each */}
      <section id="lab-categories" className="py-20 sm:py-24 bg-white dark:bg-[#0B1220] border-y border-slate-200/80 dark:border-slate-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('lab.cat.eyebrow')}</p>
              <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('lab.cat.title')}</h2>
            </div>
            <div className="lg:col-span-5 space-y-2">
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t('lab.cat.desc')}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('lab.cat.status')}</p>
            </div>
          </div>

          {/* Phones: swipe between the three categories; md+: three columns */}
          <ul className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pt-2 pb-3 hide-scrollbar">
            {LAB_CATEGORIES.map((cat) => {
              const extra = cat.preview.length - PREVIEW_LIMIT;
              return (
                <li key={cat.key} className="w-[84%] sm:w-[60%] md:w-auto shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={() => openCategory(cat.path)}
                    className="group w-full h-full text-left flex flex-col rounded-[24px] border-2 border-[#E3ECFA] dark:border-slate-800 bg-[#F7F9FE] dark:bg-slate-900/60 p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1.5 hover:border-[#1870FF] hover:bg-white dark:hover:bg-slate-900 hover:shadow-[0_28px_56px_-30px_rgba(4,26,90,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                  >
                    <span className="block aspect-[2/1] mb-5 overflow-hidden rounded-2xl">
                      <CategoryVisual kind={cat.key} className="w-full h-full transition-transform duration-500 group-hover:scale-[1.04]" />
                    </span>
                    <span className="flex items-center justify-between gap-3">
                      <span className="text-xl font-black text-[#041A5A] dark:text-white tracking-tight">{cat.name}</span>
                      <span className="shrink-0 rounded-full bg-[#EEF4FF] dark:bg-white/10 px-2.5 py-1 text-[11px] font-black text-[#1870FF] tabular-nums">
                        {t('labcat.count').replace('{n}', String(cat.subs.length))}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.cat.${cat.key}.summary`)}</span>
                    <span className="mt-4 block text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      {cat.preview.slice(0, PREVIEW_LIMIT).join(' · ')}
                      {extra > 0 && <span className="font-semibold text-slate-600 dark:text-slate-300"> · {t('lab.more').replace('{n}', String(extra))}</span>}
                    </span>
                    <span className="mt-auto pt-5 inline-flex items-center gap-2 self-start rounded-full bg-white dark:bg-white/10 group-hover:bg-[#1870FF] border border-[#DCE7FB] dark:border-slate-700 group-hover:border-[#1870FF] px-4 py-2 text-sm font-bold text-[#041A5A] dark:text-white group-hover:text-white transition-colors">
                      {t('lab.cat.explore').replace('{name}', cat.name)}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* A quick look inside: tabs + Electric Blue summary + area cards */}
          <div className="mt-12 sm:mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <h3 className="text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('lab.panel.preview_title')}</h3>
              <div role="tablist" aria-label={t('lab.panel.preview_title')} className="inline-flex rounded-full bg-[#EEF4FF] dark:bg-slate-800 p-1 gap-1">
                {LAB_CATEGORIES.map((cat, i) => {
                  const selected = cat.key === active;
                  return (
                    <button
                      key={cat.key}
                      ref={(el) => { tabRefs.current[i] = el; }}
                      type="button"
                      role="tab"
                      id={`lab-tab-${cat.key}`}
                      aria-selected={selected}
                      aria-controls="lab-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(cat.key)}
                      onKeyDown={(e) => onTabKey(e, i)}
                      className={`relative h-9 sm:h-10 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                        selected ? 'text-white' : 'text-[#041A5A] dark:text-slate-200 hover:text-[#1870FF]'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId={reduce ? undefined : 'lab-tab-pill'}
                          className="absolute inset-0 rounded-full bg-[#1870FF] shadow-[0_8px_18px_-8px_rgba(24,112,255,0.9)]"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              id="lab-panel"
              role="tabpanel"
              aria-labelledby={`lab-tab-${current.key}`}
              className="rounded-[28px] bg-[#F7F9FE] dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 p-3 sm:p-4"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.key}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4"
                >
                  {/* summary on Electric Blue */}
                  <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start relative overflow-hidden rounded-[22px] bg-[#1870FF] text-white p-6 sm:p-7 flex flex-col">
                    <div
                      className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_15%,transparent_75%)]"
                      style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                      aria-hidden="true"
                    />
                    <div className="absolute -right-28 -top-28 w-[360px] h-[360px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
                      <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.16) 0deg 6deg, transparent 6deg 20deg)' }} />
                    </div>
                    <div className="relative space-y-4 flex-1 flex flex-col">
                      <p className="text-xs font-black uppercase tracking-widest text-white/80">{t('lab.panel.eyebrow')}</p>
                      <h4 className="text-2xl sm:text-3xl font-black tracking-tight">{t(`lab.cat.${current.key}.full`)}</h4>
                      <p className="text-sm sm:text-base text-blue-50/90 leading-relaxed">{t(`lab.cat.${current.key}.desc`)}</p>
                      <span className="inline-flex self-start items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1 text-xs font-black">
                        <span className="w-2 h-2 rounded-full bg-[#FFC928]" aria-hidden="true" />
                        {t('labcat.count').replace('{n}', String(current.subs.length))}
                      </span>
                      <span className="block rounded-2xl bg-white/95 p-2" aria-hidden="true">
                        <CategoryVisual kind={current.key} className="w-full h-auto" />
                      </span>
                      <div className="flex flex-col gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => openCategory(current.path)}
                          className="group inline-flex justify-center items-center gap-2 h-12 px-5 rounded-xl bg-white text-[#1870FF] hover:bg-blue-50 text-sm font-bold shadow-[0_14px_28px_-14px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
                        >
                          {t('lab.panel.open').replace('{name}', current.name)}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => askAvailability(current.name)}
                          className="inline-flex justify-center items-center gap-2 h-11 px-5 rounded-xl border border-white/50 bg-white/10 hover:bg-white/20 text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          {t('lab.panel.ask')}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* areas */}
                  <ul className={`lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-start ${current.subs.length > 4 ? 'xl:grid-cols-2' : ''}`}>
                    {current.subs.map((sub, i) => {
                      const Icon = sub.icon;
                      return (
                        <motion.li
                          key={sub.key}
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: reduce ? 0 : 0.05 + i * 0.04 }}
                        >
                          <button
                            type="button"
                            onClick={() => openCategory(current.path, sub.key)}
                            className="group w-full h-full text-left flex gap-4 rounded-[20px] bg-white dark:bg-slate-800/70 border border-[#E3ECFA] dark:border-slate-700 p-4 sm:p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#1870FF]/50 hover:shadow-[0_20px_40px_-28px_rgba(4,26,90,0.55)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                          >
                            <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#EEF4FF] dark:bg-white/10 text-[#1870FF] group-hover:bg-[#1870FF] group-hover:text-white flex items-center justify-center transition-colors">
                              <Icon className="w-6 h-6" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-start justify-between gap-2">
                                <span className="text-base font-black text-[#041A5A] dark:text-white leading-snug">{sub.name}</span>
                                <ArrowRight className="mt-1 w-4 h-4 shrink-0 text-slate-300 group-hover:text-[#1870FF] transition-[color,transform] group-hover:translate-x-0.5" aria-hidden="true" />
                              </span>
                              {sub.tools && (
                                <span className="mt-1.5 flex flex-wrap gap-1.5">
                                  {sub.tools.map((tool) => (
                                    <span key={tool} className="rounded-md bg-[#EEF4FF] dark:bg-white/10 px-2 py-0.5 text-[11px] font-bold text-[#1870FF]">{tool}</span>
                                  ))}
                                </span>
                              )}
                              <span className="mt-1.5 block text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.sub.${sub.key}`)}</span>
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How a lab works: challenge → tools → experiment → compare → document, plus evidence */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('lab.how.eyebrow')}</p>
            <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] dark:text-white tracking-tight text-balance">{t('lab.how.title')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <ol className="lg:col-span-7 relative space-y-6">
              <span className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-[#DCE6F7] dark:bg-slate-800" aria-hidden="true" />
              {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="relative flex gap-5">
                  <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-[#1870FF] text-white text-xs font-black flex items-center justify-center tabular-nums" aria-hidden="true">
                    {n}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-base sm:text-lg font-black text-[#041A5A] dark:text-white">{t(`lab.how.s${n}.title`)}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">{t(`lab.how.s${n}.desc`)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[24px] bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 p-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#041A5A] dark:text-white mb-3">{t('lab.focus.title')}</h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="flex gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1870FF] shrink-0" aria-hidden="true" />
                      {t(`lab.focus.${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] bg-[#EEF4FF] dark:bg-slate-900 border border-[#D6E4FF] dark:border-slate-800 p-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#041A5A] dark:text-white mb-3">{t('lab.evidence.title')}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => t(`lab.evidence.${n}`)).join(' · ')}
                </p>
                <p className="mt-4 text-sm font-bold text-[#041A5A] dark:text-white">{t('lab.evidence.note')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Responsible AI use */}
      <section className="py-20 sm:py-24 bg-[#1870FF] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9CC2FF]">{t('lab.safety.eyebrow')}</p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-balance">{t('lab.safety.title')}</h2>
            <p className="text-base text-blue-100/80 leading-relaxed">{t('lab.safety.desc')}</p>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <li key={n} className="flex gap-3 border-t border-white/15 pt-4 text-sm text-blue-50/90 leading-relaxed">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[#1870FF] flex items-center justify-center mt-0.5" aria-hidden="true">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {t(`lab.safety.${n}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Who it suits (existing audiences, pending confirmation) */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          <h2 className="lg:col-span-4 text-2xl sm:text-3xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('lab.who.title')}</h2>
          <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="border-t-2 border-[#041A5A] dark:border-slate-600 pt-3 text-base font-bold text-[#041A5A] dark:text-white">
                {t(`lab.who.${n}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#1870FF] to-[#0F56D1] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight text-balance">{t('lab.final.title')}</h2>
          <p className="text-lg text-blue-50/90 max-w-2xl mx-auto">{t('lab.final.desc')}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
            <button
              type="button"
              onClick={() => askAvailability()}
              className="h-14 px-8 bg-white text-[#1870FF] hover:bg-blue-50 font-black text-base rounded-2xl shadow-xl transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>{t('lab.final.ask')}</span>
            </button>
            <button
              type="button"
              onClick={onOpenTrial}
              className="text-sm font-bold text-white underline-offset-4 hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t('cta.free_trial')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
