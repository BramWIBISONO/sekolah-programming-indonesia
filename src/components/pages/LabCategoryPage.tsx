import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Info, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import type { SpiIconName } from '../illustrations/SpiIcon';
import { CategoryVisual } from '../lab/CategoryVisual';
import { LAB_CATEGORIES, clearPendingLabArea, peekPendingLabArea, setPendingLabArea, type LabCategoryKey } from '../../data/labCategories';

interface LabCategoryPageProps {
  categoryKey: LabCategoryKey;
  onBack: () => void;
  onNavigate: (path: string) => void;
  onOpenTrial: () => void;
}

const HERO_ICON: Record<LabCategoryKey, SpiIconName> = { ai: 'ai', office: 'office', design: 'creative' };

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${light ? 'text-white/85' : 'text-[#1870FF]'}`}>
    <span className={`w-6 h-[3px] rounded-full ${light ? 'bg-white/70' : 'bg-[#1870FF]'}`} aria-hidden="true" />
    {children}
  </p>
);

/** One SPI Lab category (AI for Work, Office & Productivity, Digital Design & Editing) on its own page. */
export const LabCategoryPage: React.FC<LabCategoryPageProps> = ({ categoryKey, onBack, onNavigate, onOpenTrial }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const category = LAB_CATEGORIES.find((c) => c.key === categoryKey)!;
  const others = LAB_CATEGORIES.filter((c) => c.key !== categoryKey);
  const fullName = t(`lab.cat.${category.key}.full`);
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    const previous = document.title;
    document.title = `${fullName} | SPI Lab`;
    return () => { document.title = previous; };
  }, [fullName]);

  // Arriving from an area card on the SPI Lab page: scroll to that area and mark it briefly.
  useEffect(() => {
    const area = peekPendingLabArea();
    if (!area) return;
    setHighlight(area);
    // Open the page right at that area (an instant jump also cancels the app's scroll-to-top).
    const scrollId = window.setTimeout(() => {
      clearPendingLabArea();
      const target = document.getElementById(`area-${area}`);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - (window.innerHeight - target.offsetHeight) / 2;
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
    }, 60);
    const clearId = window.setTimeout(() => setHighlight(null), 4000);
    return () => { window.clearTimeout(scrollId); window.clearTimeout(clearId); };
  }, [categoryKey, reduce]);

  const ask = (area?: string) =>
    openSpiWhatsApp(t('lab.wa_message').replace('{category}', area ? `${category.name}: ${area}` : category.name));

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.45, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  });

  const openOther = (path: string) => {
    setPendingLabArea(null);
    onNavigate(path);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070D18] text-[#0B1220] dark:text-white pb-20 transition-colors">
      <IllustratedHero
        variant="lab"
        eyebrow={`SPI Lab · ${t('lab.panel.eyebrow')}`}
        title={fullName}
        lead={t(`lab.cat.${category.key}.summary`)}
        description={t(`lab.cat.${category.key}.desc`)}
        art={ASSETS.programs.spiLab}
        artAlt={fullName}
        artSlot={
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[#EAF2FF] via-[#F5F9FF] to-[#DCEBFF] overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '26px 26px' }}
              aria-hidden="true"
            />
            <CategoryVisual kind={category.key} className="absolute left-[8%] right-[8%] top-[16%] w-[84%] h-auto drop-shadow-[0_24px_30px_rgba(4,26,90,0.18)]" />
            {/* a few of the areas, floating */}
            {category.subs.slice(0, 3).map((sub, i) => {
              const Icon = sub.icon;
              // clear of the props and the robot that overlap the card's bottom corners
              const pos = ['left-[5%] top-[6%]', 'right-[5%] top-[7%]', 'left-1/2 -translate-x-1/2 bottom-[6%] whitespace-nowrap'][i];
              return (
                <span key={sub.key} className={`absolute ${pos}`} aria-hidden="true">
                  <span className="spi-anim-bob inline-flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 text-[11px] sm:text-xs font-bold text-[#041A5A] shadow-[0_14px_28px_-14px_rgba(4,26,90,0.55)]" style={{ animationDelay: `${i * 0.7}s` }}>
                    <span className="w-6 h-6 rounded-lg bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center"><Icon className="w-3.5 h-3.5" /></span>
                    {sub.name}
                  </span>
                </span>
              );
            })}
          </div>
        }
        primary={{ label: t('lab.panel.ask'), onClick: () => ask() }}
        secondary={{ label: t('cta.free_trial'), onClick: onOpenTrial }}
        onBack={onBack}
        backLabel={t('labcat.back')}
        highlights={[
          { icon: HERO_ICON[category.key], label: t('labcat.count').replace('{n}', String(category.subs.length)) },
          { icon: 'build', label: t('lab.how.s3.title') },
          { icon: 'portfolio', label: t('lab.evidence.title') },
        ]}
        footnote={
          <p className="flex items-start gap-2 text-xs sm:text-sm text-slate-500 max-w-xl">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#1870FF]" aria-hidden="true" />
            {t('lab.cat.status')}
          </p>
        }
      />

      {/* Areas inside this category */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
            <div className="space-y-3 max-w-2xl">
              <Eyebrow>{t('labcat.subs.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('labcat.subs.title')}</h2>
            </div>
            <span className="rounded-full bg-[#EEF4FF] dark:bg-white/10 px-4 py-2 text-sm font-black text-[#1870FF]">
              {t('labcat.count').replace('{n}', String(category.subs.length))}
            </span>
          </div>

          <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 ${category.subs.length > 4 ? 'lg:grid-cols-3' : category.subs.length === 3 ? 'lg:grid-cols-3' : ''}`}>
            {category.subs.map((sub, i) => {
              const Icon = sub.icon;
              const marked = highlight === sub.key;
              return (
                <motion.li key={sub.key} id={`area-${sub.key}`} {...reveal(i)} className="scroll-mt-28">
                  <article
                    className={`group relative h-full overflow-hidden rounded-[24px] border bg-white dark:bg-slate-900 p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(4,26,90,0.5)] ${
                      marked ? 'border-[#1870FF] ring-4 ring-[#1870FF]/20' : 'border-[#E3ECFA] dark:border-slate-800 hover:border-[#1870FF]/50'
                    }`}
                  >
                    <span className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-[#F3F7FF] dark:bg-white/5 transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1870FF] to-[#0F56D1] text-white flex items-center justify-center shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)] transition-transform duration-300 group-hover:-rotate-6">
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </span>
                      <span className="text-3xl font-black text-[#EEF4FF] dark:text-white/10 tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="relative mt-5 text-lg sm:text-xl font-black text-[#041A5A] dark:text-white">{sub.name}</h3>
                    {sub.tools && (
                      <p className="relative mt-2 flex flex-wrap gap-1.5">
                        {sub.tools.map((tool) => (
                          <span key={tool} className="rounded-md bg-[#EEF4FF] dark:bg-white/10 px-2 py-0.5 text-[11px] font-bold text-[#1870FF]">{tool}</span>
                        ))}
                      </p>
                    )}
                    <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.sub.${sub.key}`)}</p>
                    <button
                      type="button"
                      onClick={() => ask(sub.name)}
                      className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {t('labcat.sub.ask')}
                    </button>
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How an exploration runs */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-10 sm:px-10 sm:py-14 shadow-[0_40px_80px_-40px_rgba(24,112,255,0.75)]">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div className="absolute -right-40 -top-40 w-[560px] h-[560px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>
          <div className="relative">
            <div className="max-w-2xl space-y-3">
              <Eyebrow light>{t('lab.how.eyebrow')}</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-balance">{t('lab.how.title')}</h2>
            </div>
            <ol className="mt-10 relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
              <span className="hidden md:block absolute left-[10%] right-[10%] top-6 border-t-2 border-dashed border-white/40" aria-hidden="true" />
              {[1, 2, 3, 4, 5].map((n, i) => (
                <motion.li key={n} {...reveal(i)} className="relative flex md:flex-col md:items-center md:text-center gap-4 md:gap-3">
                  <span className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white text-[#1870FF] text-lg font-black flex items-center justify-center tabular-nums ring-8 ring-[#1870FF] shadow-[0_12px_24px_-12px_rgba(2,18,70,0.8)]" aria-hidden="true">{n}</span>
                  <span>
                    <span className="block text-base font-black">{t(`lab.how.s${n}.title`)}</span>
                    <span className="block text-sm text-blue-50/85 leading-relaxed mt-1">{t(`lab.how.s${n}.desc`)}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What you practise: AI habits + safety for AI; focus + evidence for the others */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {category.key === 'ai' ? (
            <>
              <motion.div {...reveal()} className="rounded-[28px] border border-[#E3ECFA] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white">{t('lab.ai.behaviors_title')}</h2>
                <ol className="mt-5 space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <li key={n} className="flex gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-[#EEF4FF] dark:bg-white/10 text-[#1870FF] text-xs font-black flex items-center justify-center tabular-nums">{n}</span>
                      <span className="pt-0.5">{t(`lab.ai.b${n}`)}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
              <motion.div {...reveal(1)} className="rounded-[28px] bg-[#041A5A] text-white p-6 sm:p-8">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9CC2FF]">{t('lab.safety.eyebrow')}</p>
                <h2 className="mt-2 text-xl sm:text-2xl font-black">{t('lab.safety.title')}</h2>
                <ul className="mt-5 space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <li key={n} className="flex gap-3 text-sm text-blue-50/90 leading-relaxed">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[#1870FF] flex items-center justify-center mt-0.5" aria-hidden="true">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      {t(`lab.safety.${n}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div {...reveal()} className="rounded-[28px] border border-[#E3ECFA] dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white">{t('lab.focus.title')}</h2>
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((n) => (
                    <li key={n} className="flex items-center gap-3 rounded-2xl bg-[#F5F9FF] dark:bg-white/5 px-4 py-3.5 text-sm font-bold text-[#041A5A] dark:text-white">
                      <span className="w-7 h-7 shrink-0 rounded-lg bg-[#1870FF] text-white text-xs font-black flex items-center justify-center tabular-nums">{n}</span>
                      {t(`lab.focus.${n}`)}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...reveal(1)} className="rounded-[28px] bg-[#041A5A] text-white p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black">{t('lab.evidence.title')}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <li key={n} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3.5 py-1.5 text-sm font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFC928]" aria-hidden="true" />
                      {t(`lab.evidence.${n}`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-blue-50/85 leading-relaxed">{t('lab.evidence.note')}</p>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] dark:text-white tracking-tight mb-6">{t('labcat.others.title')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {others.map((cat, i) => (
              <motion.li key={cat.key} {...reveal(i)}>
                <button
                  type="button"
                  onClick={() => openOther(cat.path)}
                  className="group w-full h-full text-left grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 items-center rounded-[24px] border border-[#E3ECFA] dark:border-slate-800 bg-[#F7F9FE] dark:bg-slate-900 p-4 sm:p-5 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:bg-white hover:border-[#1870FF]/50 hover:shadow-[0_28px_56px_-30px_rgba(4,26,90,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  <span className="block overflow-hidden rounded-2xl">
                    <CategoryVisual kind={cat.key} className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.04]" />
                  </span>
                  <span>
                    <span className="block text-xl font-black text-[#041A5A] dark:text-white">{t(`lab.cat.${cat.key}.full`)}</span>
                    <span className="mt-1.5 block text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.cat.${cat.key}.summary`)}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1870FF]">
                      {t('lab.cat.explore').replace('{name}', cat.name)}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            aria-hidden="true"
          />
          <div className="relative max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-balance">{t('labcat.final.title').replace('{name}', fullName)}</h2>
            <p className="mt-2 text-sm sm:text-base text-blue-50/90">{t('labcat.final.desc')}</p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => ask()}
              className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('lab.panel.ask')}
            </button>
            <button
              type="button"
              onClick={onOpenTrial}
              className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t('cta.free_trial')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
