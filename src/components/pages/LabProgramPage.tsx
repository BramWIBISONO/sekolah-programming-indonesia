import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS, asset } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SpiIcon } from '../illustrations/SpiIcon';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';

interface LabProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const SPI_LAB_PARTNERS = [
  { name: 'INN', asset: asset('assets/spi-lab/partners/inn.png') },
  { name: 'RBP', asset: asset('assets/spi-lab/partners/rbp.png') },
  { name: 'Yayasan Saluran Berkat Untuk Negeri', asset: asset('assets/spi-lab/partners/yayasan-saluran-berkat-untuk-negeri.png') },
  { name: 'STT El Bethel', asset: asset('assets/spi-lab/partners/stt-el-bethel.png') },
  { name: 'ICREA', asset: asset('assets/spi-lab/partners/icrea.png') },
  { name: 'Sekolah Musik Indonesia Solo', asset: asset('assets/spi-lab/partners/sekolah-musik-indonesia-solo.png') },
  { name: 'Sekolah Musik Taman Surya', asset: asset('assets/spi-lab/partners/sekolah-musik-taman-surya.png') },
  { name: 'Sekolah Musik Surabaya', asset: asset('assets/spi-lab/partners/sekolah-musik-surabaya.png') },
];

type CategoryKey = 'ai' | 'office' | 'design';

interface Category {
  key: CategoryKey;
  /** Short name on the card; product names stay in English in every language. */
  name: string;
  /** Short preview line on the card (tool or field names). */
  preview: string[];
  subs: { key: string; name: string; tools?: string[] }[];
}

/**
 * SPI Lab's three proposed categories. They are exploration categories pending the product
 * owner's approval, so the page never presents them as active courses with dates or prices.
 */
const CATEGORIES: Category[] = [
  {
    key: 'ai',
    name: 'AI for Work',
    preview: ['Music', 'Business', 'Accounting & Finance', 'Marketing & Sales', 'Human Resources', 'Tech & Data', 'Creative', 'Video Editing', 'Education', 'Research & Information'],
    subs: [
      { key: 'music', name: 'AI for Music' },
      { key: 'business', name: 'AI for Business' },
      { key: 'finance', name: 'AI for Accounting & Finance' },
      { key: 'marketing', name: 'AI for Marketing & Sales' },
      { key: 'hr', name: 'AI for Human Resources' },
      { key: 'techdata', name: 'AI for Tech & Data' },
      { key: 'creative', name: 'AI for Creative' },
      { key: 'video', name: 'AI for Video Editing' },
      { key: 'education', name: 'AI for Education' },
      { key: 'research', name: 'AI for Research & Information' },
    ],
  },
  {
    key: 'office',
    name: 'Office',
    preview: ['Excel / Sheets', 'Docs / Word', 'PowerPoint / Slides'],
    subs: [
      { key: 'sheet', name: 'Spreadsheet', tools: ['Microsoft Excel', 'Google Sheets'] },
      { key: 'docs', name: 'Documents', tools: ['Microsoft Word', 'Google Docs'] },
      { key: 'slides', name: 'Presentation', tools: ['Microsoft PowerPoint', 'Google Slides'] },
    ],
  },
  {
    key: 'design',
    name: 'Design & Editing',
    preview: ['Adobe Photoshop', 'Figma'],
    subs: [
      { key: 'photoshop', name: 'Adobe Photoshop' },
      { key: 'figma', name: 'Figma' },
    ],
  },
];

const PREVIEW_LIMIT = 6;

const N = '#041A5A';
const B = '#1870FF';
const LINE = '#DCE6F7';

/** Small scenes of the actual activity in each category (not stock icons). */
const CategoryVisual: React.FC<{ kind: CategoryKey }> = ({ kind }) => (
  <svg viewBox="0 0 240 120" className="w-full h-full" aria-hidden="true">
    <rect width="240" height="120" rx="16" fill="#F4F8FF" />
    {kind === 'ai' && (
      <g>
        {/* one prompt, two outputs compared, one verified */}
        <rect x="16" y="16" width="208" height="22" rx="8" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="26" y="24" width="96" height="6" rx="3" fill={N} />
        <rect x="128" y="24" width="40" height="6" rx="3" fill={LINE} />
        <circle cx="208" cy="27" r="7" fill={B} />
        <path d="M205 27h6M209 24l3 3-3 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="48" width="100" height="58" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <text x="26" y="64" fontSize="10" fontWeight="800" fill="#94A3B8">A</text>
        <rect x="26" y="72" width="70" height="5" rx="2.5" fill={LINE} />
        <rect x="26" y="82" width="56" height="5" rx="2.5" fill={LINE} />
        <rect x="124" y="48" width="100" height="58" rx="10" fill="#fff" stroke={B} strokeWidth="2" />
        <text x="134" y="64" fontSize="10" fontWeight="800" fill={B}>B</text>
        <rect x="134" y="72" width="70" height="5" rx="2.5" fill={N} />
        <rect x="134" y="82" width="52" height="5" rx="2.5" fill={N} opacity="0.6" />
        <circle cx="210" cy="96" r="9" fill={B} />
        <path d="M206 96l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
    {kind === 'office' && (
      <g>
        {/* a spreadsheet feeding a chart, with a slide behind */}
        <rect x="124" y="14" width="100" height="64" rx="8" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="134" y="24" width="50" height="6" rx="3" fill={N} />
        <rect x="134" y="36" width="80" height="32" rx="4" fill="#EEF4FF" />
        <rect x="16" y="30" width="136" height="78" rx="8" fill="#fff" stroke={N} strokeWidth="2" />
        {[0, 1, 2, 3].map((r) => (
          <path key={`r${r}`} d={`M16 ${48 + r * 15}H152`} stroke={LINE} strokeWidth="1.2" />
        ))}
        <path d="M56 30V108M96 30V108" stroke={LINE} strokeWidth="1.2" />
        <rect x="16" y="30" width="136" height="14" rx="8" fill={B} opacity="0.12" />
        <text x="24" y="41" fontSize="8.5" fontWeight="800" fill={B}>=SUM</text>
        <g transform="translate(166 108)">
          {[22, 36, 28, 46].map((h, i) => (
            <rect key={h} x={i * 14} y={-h} width="9" height={h} rx="2" fill={i === 3 ? B : '#9DBEF7'} />
          ))}
        </g>
      </g>
    )}
    {kind === 'design' && (
      <g>
        {/* artboard with a pen path, plus a layers panel */}
        <rect x="16" y="14" width="150" height="92" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="32" y="30" width="118" height="60" rx="6" fill="#EEF4FF" stroke={B} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M46 78C64 40 94 40 108 60S136 76 140 44" stroke={N} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="46" cy="78" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <circle cx="108" cy="60" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <circle cx="140" cy="44" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <path d="M108 60L90 46M108 60l18 14" stroke={B} strokeWidth="1.2" />
        <rect x="176" y="14" width="48" height="92" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="184" y={24 + i * 18} width="32" height="11" rx="3" fill={i === 1 ? B : '#EEF4FF'} />
        ))}
      </g>
    )}
  </svg>
);

export const LabProgramPage: React.FC<LabProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<CategoryKey>('ai');
  const panelRef = useRef<HTMLDivElement>(null);

  const current = CATEGORIES.find((c) => c.key === active)!;

  const explore = (key: CategoryKey) => {
    setActive(key);
    // Bring the detail panel into view and move focus to it (the panel persists while its content swaps).
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      panelRef.current?.focus({ preventScroll: true });
    });
  };

  const askAvailability = (name?: string) =>
    openSpiWhatsApp(t('lab.wa_message').replace('{category}', name ?? 'SPI Lab'));

  const scrollToCategories = () =>
    document.getElementById('lab-categories')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D18] text-[#0B1220] dark:text-white pb-20 selection:bg-[#1870FF] selection:text-white font-sans transition-colors">

      {/* 1. Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-[#1870FF] via-[#1463E6] to-[#0F56D1] text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[140px] opacity-15" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t('lab.back')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#FFE38A] mb-4">SPI Lab</p>
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] mb-6 text-balance">
                {t('lab.hero.title')}
              </h1>
              <p className="text-lg text-blue-50/90 mb-8 leading-relaxed max-w-xl">{t('lab.hero.desc')}</p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <button
                  type="button"
                  onClick={scrollToCategories}
                  className="bg-white hover:bg-blue-50 text-[#1870FF] h-12 px-7 rounded-xl font-bold transition-colors shadow-lg inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
                >
                  <span>{t('lab.hero.cta')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="text-sm font-bold text-white underline-offset-4 hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t('cta.free_trial')}
                </button>
              </div>

              <p className="mt-8 pt-6 border-t border-white/15 text-sm text-blue-50/90">
                <span className="font-bold text-white">{t('lab.hero.categories')}</span>{' '}
                {CATEGORIES.map((c) => c.name).join(' · ')}
              </p>
            </div>

            <div className="relative lg:h-[480px] flex items-center justify-center">
              <div className="relative w-full h-full min-h-[350px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white/10">
                <ImageWithFallback src={ASSETS.programs.spiLab} alt={t('lab.hero.image_alt')} fallbackLabel="SPI Lab" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Partners */}
      <section className="py-14 bg-white dark:bg-[#0B1220] border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#1870FF] uppercase tracking-widest">{t('lab.partners.eyebrow')}</p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">{t('lab.partners.title')}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full">
            {SPI_LAB_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="h-20 bg-white rounded-2xl border border-[#DCE7F5] dark:border-slate-800 p-3 flex items-center justify-center"
                title={partner.name}
              >
                <img src={partner.asset} alt={partner.name} className="w-full h-full object-contain" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* 4. Three categories + detail panel */}
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
          <ul className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-2 hide-scrollbar">
            {CATEGORIES.map((cat) => {
              const selected = cat.key === active;
              const extra = cat.preview.length - PREVIEW_LIMIT;
              return (
                <li
                  key={cat.key}
                  className={`w-[84%] sm:w-[60%] md:w-auto shrink-0 snap-start flex flex-col rounded-[24px] border-2 p-5 transition-colors ${
                    selected ? 'border-[#1870FF] bg-white dark:bg-slate-900' : 'border-[#E3ECFA] dark:border-slate-800 bg-[#F7F9FE] dark:bg-slate-900/60'
                  }`}
                >
                  <div className="aspect-[2/1] mb-5">
                    <CategoryVisual kind={cat.key} />
                  </div>
                  <h3 className="text-xl font-black text-[#041A5A] dark:text-white tracking-tight">{cat.name}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.cat.${cat.key}.summary`)}</p>
                  <p className="mt-4 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.preview.slice(0, PREVIEW_LIMIT).join(' · ')}
                    {extra > 0 && <span className="font-semibold text-slate-600 dark:text-slate-300"> · {t('lab.more').replace('{n}', String(extra))}</span>}
                  </p>
                  <button
                    type="button"
                    onClick={() => explore(cat.key)}
                    aria-controls="lab-panel"
                    aria-expanded={selected}
                    className={`mt-auto pt-5 group inline-flex items-center gap-2 self-start text-sm font-bold cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                      selected ? 'text-[#1870FF]' : 'text-[#041A5A] dark:text-white hover:text-[#1870FF]'
                    }`}
                  >
                    <span>{t('lab.cat.explore').replace('{name}', cat.name)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail panel for the chosen category */}
          <div
            id="lab-panel"
            ref={panelRef}
            tabIndex={-1}
            role="region"
            aria-labelledby="lab-panel-title"
            className="mt-8 outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] rounded-[28px] bg-[#F7F9FE] dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 p-6 sm:p-10 scroll-mt-24"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 lg:self-start">
                    <p className="text-xs font-black uppercase tracking-widest text-[#1870FF]">{t('lab.panel.eyebrow')}</p>
                    <h3 id="lab-panel-title" className="text-2xl sm:text-3xl font-black text-[#041A5A] dark:text-white tracking-tight">
                      {t(`lab.cat.${current.key}.full`)}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t(`lab.cat.${current.key}.desc`)}</p>
                    <button
                      type="button"
                      onClick={() => askAvailability(current.name)}
                      className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#1870FF] hover:bg-[#1059D4] text-white text-sm font-bold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {t('lab.panel.ask')}
                    </button>
                  </div>

                  <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {current.subs.map((sub) => (
                      <li key={sub.key} className="border-t border-[#DCE6F7] dark:border-slate-700 pt-4">
                        <p className="text-base font-black text-[#041A5A] dark:text-white">{sub.name}</p>
                        {sub.tools && <p className="text-xs font-bold text-[#1870FF] mt-0.5">{sub.tools.join(' · ')}</p>}
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">{t(`lab.sub.${sub.key}`)}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {current.key === 'ai' && (
                  <div className="mt-10 pt-8 border-t border-[#DCE6F7] dark:border-slate-700">
                    <h4 className="text-lg font-black text-[#041A5A] dark:text-white mb-5">{t('lab.ai.behaviors_title')}</h4>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <li key={n} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="shrink-0 text-xs font-black text-[#1870FF] tabular-nums pt-0.5">{String(n).padStart(2, '0')}</span>
                          <span>{t(`lab.ai.b${n}`)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
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
      <section className="py-20 sm:py-24 bg-[#041A5A] text-white">
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
