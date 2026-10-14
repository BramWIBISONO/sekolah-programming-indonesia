import React from 'react';
import { Trophy, Code2, Award, Globe } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const StudentAchievementSection: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    { key: 'competition', icon: Trophy, asset: ASSETS.achievement.competition },
    { key: 'project', icon: Code2, asset: ASSETS.achievement.project },
    { key: 'certification', icon: Award, asset: ASSETS.achievement.certification },
    { key: 'international', icon: Globe, asset: ASSETS.achievement.international },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('achievement.title')}</h2>
          <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('achievement.desc')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className="rounded-2xl sm:rounded-3xl border border-[#E3ECFA] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/3] bg-white/50">
                  <ImageWithFallback 
                    src={cat.asset} 
                    alt={t(`achievement.${cat.key}`)}
                    loading="lazy"
                    fallbackLabel={t(`achievement.${cat.key}`)} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 sm:p-5 flex items-center gap-2.5 sm:gap-3">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-[#041A5A] leading-tight">{t(`achievement.${cat.key}`)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
