import React from 'react';
import { Trophy, Code2, Award, Globe } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const StudentAchievementSection: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    { key: 'competition', icon: Trophy, color: 'border-amber-200 bg-amber-50', iconColor: 'text-amber-600', asset: ASSETS.ACHIEVEMENT.COMPETITION },
    { key: 'project', icon: Code2, color: 'border-blue-200 bg-blue-50', iconColor: 'text-blue-600', asset: ASSETS.ACHIEVEMENT.PROJECT },
    { key: 'certification', icon: Award, color: 'border-emerald-200 bg-emerald-50', iconColor: 'text-emerald-600', asset: ASSETS.ACHIEVEMENT.CERTIFICATION },
    { key: 'international', icon: Globe, color: 'border-purple-200 bg-purple-50', iconColor: 'text-purple-600', asset: ASSETS.ACHIEVEMENT.INTERNATIONAL },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('achievement.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('achievement.desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key} className={`rounded-3xl border ${cat.color} overflow-hidden shadow-sm hover:shadow-xl transition-all group`}>
                <div className="aspect-[4/3] bg-white/50">
                  <ImageWithFallback src={cat.asset} alt={t(`achievement.${cat.key}`)} fallbackLabel={t(`achievement.${cat.key}`)} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-3">
                  <div className={`w-10 h-10 rounded-xl ${cat.color} ${cat.iconColor} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{t(`achievement.${cat.key}`)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
