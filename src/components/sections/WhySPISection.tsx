import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';

/** Think → Build → Innovate is the central philosophy; the rest support it. */
const SUPPORTING = ['c2', 'c3', 'c4'];

export const WhySPISection: React.FC = () => {
  const { t } = useLanguage();

  const scrollToPrograms = () => {
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="why-spi-section" className="py-16 sm:py-24 bg-[#F7F8FC] dark:bg-[#070D18] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-14">

        {/* Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('whyspi.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight leading-tight">
              {t('whyspi.title')}
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t('whyspi.desc')}</p>
            <button
              type="button"
              onClick={scrollToPrograms}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] rounded cursor-pointer"
            >
              <span>{t('common.explore_programs')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Central philosophy: typographic, not a card */}
        <div className="border-y border-slate-200 dark:border-slate-800 py-8 sm:py-10">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#041A5A] dark:text-white">
            {t('whyspi.c1.title')}
          </p>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('whyspi.c1.desc')}
          </p>
          <p className="mt-4 inline-flex items-start gap-2 text-sm font-semibold text-[#0B3C95] dark:text-blue-300">
            <span className="mt-2 w-2 h-2 rounded-full bg-[#176DF8] shrink-0" aria-hidden="true" />
            <span>{t('whyspi.c1.benefit')}</span>
          </p>
        </div>

        {/* Supporting principles: plain list, separated by rules */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SUPPORTING.map((key) => (
            <li key={key} className="space-y-3 border-t-2 border-[#176DF8]/20 pt-5">
              <h3 className="text-lg sm:text-xl font-black text-[#041A5A] dark:text-white">{t(`whyspi.${key}.title`)}</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{t(`whyspi.${key}.desc`)}</p>
              <p className="text-sm font-semibold text-[#0B3C95] dark:text-blue-300">{t(`whyspi.${key}.benefit`)}</p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};
