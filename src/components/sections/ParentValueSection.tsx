import React from 'react';
import { Brain, Hammer, Users, TrendingUp, Laptop } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const ParentValueSection: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    { key: 'card1', icon: Brain, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { key: 'card2', icon: Hammer, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { key: 'card3', icon: Users, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { key: 'card4', icon: TrendingUp, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { key: 'card5', icon: Laptop, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('parent.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all text-center space-y-4 group">
                <div className={`w-16 h-16 rounded-2xl ${card.color} border flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t(`parent.${card.key}_title`)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t(`parent.${card.key}_desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
