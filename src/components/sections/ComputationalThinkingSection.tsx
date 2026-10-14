import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { useLanguage } from '../../i18n';
import { ListTree, LayoutGrid, EyeOff, Waypoints } from 'lucide-react';

export const ComputationalThinkingSection: React.FC = () => {
  const { t } = useLanguage();

  const concepts = [
    { key: 'decomposition', icon: ListTree },
    { key: 'pattern', icon: LayoutGrid },
    { key: 'abstraction', icon: EyeOff },
    { key: 'algorithm', icon: Waypoints },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-[120px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Phones: heading → video → concepts. Desktop: heading + concepts left, media right. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-x-20 gap-y-8 lg:gap-y-10">

          <div className="space-y-4 lg:col-start-1 lg:row-start-1">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('ct.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] leading-[1.1] tracking-tight text-balance">
              {t('ct.title')}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">{t('ct.desc')}</p>
          </div>

          <div className="space-y-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200 shadow-2xl aspect-video">
              <YouTubeEmbed videoId="2XDyRUKSkh4" title={t('ct.title')} autoplayWhenVisible />
            </div>
            <div className="hidden lg:block relative h-[300px] rounded-[32px] overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <ImageWithFallback
                src={ASSETS.learning.roboticsClass}
                alt=""
                fallbackLabel={t('ct.title')}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Concepts: swipeable on phones, 2×2 grid from sm up */}
          <ul className="lg:col-start-1 lg:row-start-2 flex sm:grid sm:grid-cols-2 gap-4 lg:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 hide-scrollbar">
            {concepts.map((concept) => {
              const Icon = concept.icon;
              return (
                <li
                  key={concept.key}
                  className="group w-[82%] shrink-0 snap-start sm:w-auto bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#1870FF]/20 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 bg-[#EEF4FF] text-[#1870FF] transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-[#041A5A] mb-2">{t(`ct.${concept.key}`)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{t(`ct.${concept.key}_desc`)}</p>
                  <div className="mt-auto rounded-xl bg-[#F4F8FF] p-3">
                    <p className="text-[11px] font-bold text-[#1870FF] uppercase tracking-wider mb-0.5">{t('ct.example_label')}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{t(`ct.${concept.key}_example`)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
