import React from 'react';
import { Users, Rocket, BookOpen, Cpu } from 'lucide-react';
import { STATISTICS_DATA, SCHOOL_PARTNERS } from '../../data/mockData';
import { useLanguage } from '../../i18n';

export const SPIInNumbersSection: React.FC = () => {
  const { t } = useLanguage();

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Users, Rocket, Cpu, BookOpen,
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0D47A1] to-[#176DF8] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black">{t('numbers.title')}</h2>
          <div className="w-20 h-1 bg-white/40 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATISTICS_DATA.map((stat) => {
            const Icon = iconMap[stat.iconName] || Rocket;
            return (
              <div key={stat.title} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-center space-y-3 hover:bg-white/15 transition-colors">
                <Icon className="w-8 h-8 mx-auto text-blue-200" />
                <div className="text-3xl sm:text-4xl font-black">{stat.value}</div>
                <p className="text-sm font-bold text-blue-100">{t(`numbers.${stat.title.toLowerCase()}`) || stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
