import React from 'react';
import { Brain, Hammer, Users, TrendingUp, Laptop } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const ParentValueSection: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    { key: 'card1', icon: Brain },
    { key: 'card2', icon: Hammer },
    { key: 'card3', icon: Users },
    { key: 'card4', icon: TrendingUp },
    { key: 'card5', icon: Laptop },
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-blue-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('parent.title')}</h2>
          <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
          <p className="text-slate-600 text-base sm:text-lg font-medium">{t('parent.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className="sm:last:col-span-2 lg:last:col-span-1 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E3ECFA] shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex lg:flex-col items-start lg:items-center gap-4 lg:text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shrink-0 rounded-2xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" aria-hidden="true" />
                </div>
                <div className="space-y-1 lg:space-y-3 min-w-0">
                  <h3 className="text-base font-bold text-[#041A5A]">{t(`parent.${card.key}_title`)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t(`parent.${card.key}_desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
