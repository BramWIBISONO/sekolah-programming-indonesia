import React from 'react';
import { SCHOOL_PARTNERS } from '../../data/mockData';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface HomepagePartnerLogosSectionProps {
  onNavigate?: (path: string) => void;
}

export const HomepagePartnerLogosSection: React.FC<HomepagePartnerLogosSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const partnersList = [
    ...SCHOOL_PARTNERS,
    { name: 'EKASA TECHNOLOGY', logo: ASSETS.partnership.ekasa, type: 'Technology Partner' }
  ];

  // Repeat the list to ensure seamless marquee looping
  const marqueeItems = [...partnersList, ...partnersList, ...partnersList];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden relative border-y border-slate-100/50">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none !important;
            transform: none !important;
          }
          .marquee-container {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            justify-content: center !important;
            width: 100% !important;
            gap: 1.5rem !important;
            padding: 0 1rem !important;
          }
          .marquee-item {
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D47A1] tracking-tight">
            {t('partners.title')}
          </h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            Dipercaya oleh sekolah, institusi pendidikan, dan organisasi yang berkomitmen membangun generasi digital Indonesia.
          </p>
        </div>

        {/* Marquee Wrapper with fading masks at edges */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-20 pointer-events-none" />

          {/* Marquee Content */}
          <div className="flex w-max gap-8 animate-marquee marquee-container">
            {marqueeItems.map((partner, idx) => (
              <div 
                key={`${partner.name}-${idx}`} 
                className="marquee-item flex-shrink-0 w-32 h-24 sm:w-40 sm:h-28 bg-white rounded-2xl border border-slate-100/90 shadow-sm p-4 flex items-center justify-center hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                title={partner.name}
              >
                <ImageWithFallback
                  src={partner.logo}
                  alt={partner.name}
                  fallbackLabel={partner.name.split(' ').slice(0, 2).join(' ')}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {onNavigate && (
          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('/partnership')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0D47A1] transition-colors cursor-pointer group"
            >
              <span>{t('partners.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
