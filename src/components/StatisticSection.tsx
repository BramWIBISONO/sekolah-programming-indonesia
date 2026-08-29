import React from 'react';
import { Users, Rocket, Cpu, BookOpen } from 'lucide-react';

export const StatisticSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      iconColor: 'text-[#176DF8]',
      title: '1000+',
      subtitle: 'Students',
      description: 'Siswa dari berbagai sekolah belajar di SPI',
    },
    {
      icon: Rocket,
      iconColor: 'text-[#0284C7]',
      title: '40+',
      subtitle: 'Projects',
      description: 'Project nyata yang dibuat siswa setiap tahun',
    },
    {
      icon: Cpu,
      iconColor: 'text-[#4F46E5]',
      title: 'AI Native',
      subtitle: 'Curriculum',
      description: 'Kurikulum dirancang untuk generasi AI-Native',
    },
    {
      icon: BookOpen,
      iconColor: 'text-[#0284C7]',
      title: 'Project',
      subtitle: 'Based Learning',
      description: 'Belajar berbasis proyek untuk hasil yang nyata',
    },
  ];

  return (
    <section id="statistic-section" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Card Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {stats.map((stat, i) => {
            const IconComp = stat.icon;
            return (
              <div
                key={i}
                id={`stat-item-${i}`}
                className={`flex items-start space-x-4 ${i !== 0 ? 'sm:pl-6 lg:pl-8' : ''} ${i !== 0 ? 'pt-4 sm:pt-0' : ''}`}
              >
                {/* Icon */}
                <div className={`p-2.5 rounded-xl bg-blue-50/70 ${stat.iconColor} shrink-0 mt-0.5`}>
                  <IconComp className="w-7 h-7" />
                </div>

                {/* Text Details */}
                <div className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    <span>{stat.title}</span>{' '}
                    <span className="text-base sm:text-lg font-bold text-slate-900">{stat.subtitle}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-snug pt-0.5">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
