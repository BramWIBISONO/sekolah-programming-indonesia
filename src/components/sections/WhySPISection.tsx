import React from 'react';
import { Brain, Rocket, Cpu, Layers } from 'lucide-react';
import { WHY_SPI_DIFFERENT } from '../../data/homepageData';

const ICONS = [Brain, Rocket, Cpu, Layers];

export const WhySPISection: React.FC = () => {
  return (
    <section id="why-spi-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
            Why SPI
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
            Mengapa SPI Berbeda
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            SPI bukan kursus coding biasa. Kami membangun ekosistem pendidikan teknologi
            yang mempersiapkan generasi AI-Native untuk berpikir, membangun, dan berinovasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {WHY_SPI_DIFFERENT.map((item, idx) => {
            const Icon = ICONS[idx] ?? Brain;
            return (
              <div key={item.title} className="flex gap-5 sm:gap-6">
                <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#176DF8]/10 text-[#176DF8] flex items-center justify-center">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    {item.description}
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
