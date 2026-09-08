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
    <section id="why-spi-section" className="py-20 sm:py-28 bg-white dark:bg-[#070D18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-16 space-y-3 text-center mx-auto">
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

        {/* Balanced responsive two-column card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {WHY_SPI_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group p-7 sm:p-9 rounded-3xl bg-slate-50/80 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-lg hover:border-[#186BF6]/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#186BF6]/10 dark:bg-[#186BF6]/20 text-[#186BF6] flex items-center justify-center group-hover:bg-[#186BF6] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
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
