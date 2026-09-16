import React from 'react';
import { BrainCircuit, Lightbulb, Network, Rocket } from 'lucide-react';

interface WhyCard {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const WHY_SPI_CARDS: WhyCard[] = [
  {
    title: 'Think → Build → Innovate',
    description:
      'Pembelajaran dimulai dari cara berpikir, dilanjutkan kemampuan membangun solusi, hingga menghasilkan inovasi nyata.',
    icon: Lightbulb,
  },
  {
    title: 'Project-Based Learning',
    description:
      'Setiap siswa membangun project nyata yang relevan, bukan sekadar latihan di layar.',
    icon: Rocket,
  },
  {
    title: 'AI-Native Curriculum',
    description:
      'Kurikulum dirancang untuk generasi yang berkolaborasi dengan AI sebagai alat, bukan hanya sebagai pengguna.',
    icon: BrainCircuit,
  },
  {
    title: 'Ekosistem Lengkap',
    description:
      'Dari fondasi Core hingga Engineering, teknologi sehari-hari melalui Lab, dan kemitraan sekolah melalui InSchool.',
    icon: Network,
  },
];

export const WhySPISection: React.FC = () => {
  return (
    <section id="why-spi-section" className="py-12 sm:py-28 bg-white dark:bg-[#070D18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 text-center mx-auto">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
            Why SPI
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] dark:text-white tracking-tight leading-tight">
            Mengapa SPI Berbeda
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            SPI bukan kursus coding biasa. Kami membangun ekosistem pendidikan teknologi yang
            mempersiapkan generasi AI-Native untuk berpikir, membangun, dan berinovasi.
          </p>
        </div>

        {/* Mobile: compact editorial principle list · Desktop: two-column cards (unchanged) */}
        <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-8">
          {WHY_SPI_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`group flex items-start gap-4 sm:flex-col sm:items-center sm:text-center sm:justify-between py-3 sm:py-0 ${
                  idx > 0 ? 'border-t border-slate-200/80' : ''
                } sm:border-0 sm:p-9 sm:rounded-3xl sm:bg-slate-50/80 sm:dark:bg-slate-900/70 sm:border-slate-100 sm:dark:border-slate-800/80 sm:shadow-sm sm:hover:shadow-lg sm:hover:border-[#186BF6]/40 sm:hover:-translate-y-1 sm:transition-all sm:duration-200`}
              >
                <div className="shrink-0">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#186BF6]/10 sm:dark:bg-[#186BF6]/20 text-[#186BF6] flex items-center justify-center sm:group-hover:bg-[#186BF6] sm:group-hover:text-white sm:transition-colors sm:duration-200">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 sm:flex-none sm:text-center sm:space-y-4">
                  <h3 className="text-base sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.description}
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
