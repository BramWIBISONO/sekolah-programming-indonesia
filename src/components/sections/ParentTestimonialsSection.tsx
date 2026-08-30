import React from 'react';
import { MessageCircle, Quote, Sparkles } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const ParentTestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  // No verified parent testimonial data exists — show placeholder state
  const placeholders = [
    { id: 'pt-1' },
    { id: 'pt-2' },
    { id: 'pt-3' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">Parent's Perspective</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
              {t('parent_testimonial.title')}
            </h2>
            
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-md">
              {t('parent_testimonial.desc')} Kami sedang mengumpulkan cerita-cerita luar biasa dari para orang tua tentang perjalanan belajar anak-anak mereka di SPI.
            </p>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150" />
              <Quote className="w-8 h-8 text-[#176DF8]/20 mb-4" />
              <div className="relative z-10 space-y-3">
                <p className="text-slate-700 italic font-medium leading-relaxed">
                  "Menantikan kisah-kisah inspiratif dari orang tua siswa yang telah merasakan langsung transformasi putra-putri mereka menjadi pencipta teknologi."
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#176DF8]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Coming Soon</p>
                    <p className="text-[11px] font-semibold text-[#176DF8] uppercase tracking-wider">Parent Stories</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <div className="absolute inset-0 bg-blue-100 rounded-[32px] transform rotate-3 scale-105 opacity-50 blur-lg" />
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-slate-100 border border-white/50 shadow-2xl">
              <ImageWithFallback
                src={ASSETS.learning.teamProject}
                alt={ASSETS.learning.teamProject}
                fallbackLabel="Parent Voices Main Visual"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
