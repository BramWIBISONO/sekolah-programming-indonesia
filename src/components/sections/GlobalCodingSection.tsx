import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';

/**
 * "From Curiosity to Creation": how SPI programs relate to one another.
 * The three core stages are presented as a common path (not a fixed sequence);
 * SPI InSchool is shown separately because it is delivered through schools.
 */
const STAGES = [
  { key: 'stage1', program: 'prog.core.short', accent: 'border-t-[#176DF8]', text: 'text-[#176DF8]' },
  { key: 'stage2', program: 'prog.lab.short', accent: 'border-t-[#7C3AED]', text: 'text-[#7C3AED]' },
  { key: 'stage3', program: 'prog.engineering.short', accent: 'border-t-[#082B72]', text: 'text-[#082B72]' },
];

export const GlobalCodingSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="learning-pathway" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">

        {/* Heading */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('path.eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-tight">
            {t('path.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t('path.desc')}</p>
        </div>

        {/* Core progression: three stages in reading order */}
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 relative">
          {STAGES.map((stage, idx) => (
            <li key={stage.key} className="relative flex lg:block">
              <article
                className={`flex-1 bg-white border border-slate-200 border-t-4 ${stage.accent} rounded-2xl p-6 sm:p-7 space-y-3 h-full lg:mx-3`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-xs font-black uppercase tracking-wider ${stage.text}`}>{t(`path.${stage.key}.label`)}</span>
                  <span className="text-sm font-black text-slate-300 tabular-nums" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-black text-[#041A5A]">{t(stage.program)}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{t(`path.${stage.key}.desc`)}</p>
              </article>
              {idx < STAGES.length - 1 && (
                <span
                  className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 z-10"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="text-xs sm:text-sm text-slate-500 -mt-6">{t('path.note')}</p>

        {/* Separate institutional pathway */}
        <aside
          aria-labelledby="inschool-pathway-title"
          className="rounded-2xl border border-dashed border-[#176DF8]/40 bg-[#F4F8FF] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
        >
          <div className="md:col-span-4 space-y-2">
            <p className="text-xs font-black text-[#176DF8] uppercase tracking-wider">{t('path.inschool.label')}</p>
            <h3 id="inschool-pathway-title" className="text-xl font-black text-[#041A5A]">{t(`prog.inschool.short`)}</h3>
          </div>
          <div className="md:col-span-8 space-y-2">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{t('path.inschool.desc')}</p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{t('path.inschool.note')}</p>
          </div>
        </aside>

        {/* Closing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-slate-200 pt-10">
          <p className="md:col-span-5 text-lg sm:text-xl font-black text-[#041A5A] leading-snug">{t('path.outcome')}</p>
          <p className="md:col-span-7 text-sm sm:text-base text-slate-600 leading-relaxed">{t('path.closing')}</p>
        </div>

      </div>
    </section>
  );
};
