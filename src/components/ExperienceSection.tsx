import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';

interface ExperienceSectionProps {
  onOpenTrial: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenTrial }) => {
  return (
    <section id="experience-section" className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Experience Visual Box */}
        <div className="bg-[#F4F8FF] rounded-3xl p-6 sm:p-10 lg:p-12 border border-blue-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left visual banner (One-Stop Edutech Center graphic) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[16/10] bg-white">
              <ImageWithFallback
                src={ASSETS.EXPERIENCE_LEARNING}
                alt="One-Stop Edutech Center - See Learning in Action"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-wider">
              EXPERIENCE SPI
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
              See Learning <br className="hidden sm:inline" />
              in Action
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Di SPI, belajar menjadi seru, interaktif, dan relevan dengan masa depan. Siswa membangun AI, membuat aplikasi, game, dan project nyata sejak dini.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenTrial}
                className="px-7 py-3.5 bg-[#176DF8] hover:bg-[#1059D4] active:scale-98 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Coba Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
