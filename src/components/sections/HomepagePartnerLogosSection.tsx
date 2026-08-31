import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { asset } from '../../constants/assets';

interface HomepagePartnerLogosSectionProps {
  onNavigate?: (path: string) => void;
}

const TRUSTED_SCHOOLS = [
  { name: 'SD Kanisius Sengkan, Yogyakarta', asset: asset('assets/partners/schools/sd-kanisius-sengkan.png') },
  { name: 'SD Kanisius Duwet, Yogyakarta', asset: asset('assets/partners/schools/sd-kanisius-duwet.png') },
  { name: 'SD Kanisius Kalasan, Yogyakarta', asset: asset('assets/partners/schools/sd-kanisius-kalasan.png') },
  { name: 'SMP St. Aloysius Turi, Yogyakarta', asset: asset('assets/partners/schools/smp-st-aloysius-turi.png') },
  { name: 'Sekolah Kristen Kalam Kudus, Surakarta', asset: asset('assets/partners/schools/sekolah-kristen-kalam-kudus-surakarta.png') },
  { name: 'Kidsland International School, Surakarta', asset: asset('assets/partners/schools/kidsland-international-school-surakarta.png') },
  { name: 'Sekolah Nusantara Baru, Surakarta', asset: asset('assets/partners/schools/sekolah-nusantara-baru-surakarta.png') },
  { name: 'Nola Learning Center, Malang', asset: asset('assets/partners/schools/nola-learning-center.png') },
  { name: 'Ivy School, Surabaya', asset: asset('assets/partners/schools/ivy-school-surabaya.jpg') },
  { name: 'JAC School, Surabaya', asset: asset('assets/partners/schools/jac-school-surabaya.jpg') },
  { name: 'Little Key Montessori Daycare & Preschool, Bekasi', asset: asset('assets/partners/schools/little-key-montessori-bekasi.png') },
  { name: 'Makedonia Christian School, Kabupaten Landak, Kalimantan Barat', asset: asset('assets/partners/schools/makedonia-christian-school.png') },
  { name: 'OASE Learning Center', asset: asset('assets/partners/schools/oase-learning-center.jpg') },
  { name: 'Imadeo Learning Center', asset: asset('assets/partners/schools/imadeo-learning-center.png') },
  { name: 'Sekolah Musik Taman Surya', asset: asset('assets/partners/schools/sekolah-musik-taman-surya.png'), status: 'EMPTY' },
  { name: 'Sekolah Musik Surabaya by Imadeo Learning Center, Surabaya', asset: asset('assets/partners/schools/sekolah-musik-surabaya-imadeo.png'), status: 'EMPTY' },
  { name: 'ICREA (Imadeo Creative)', asset: asset('assets/partners/schools/icrea-imadeo-creative.jpg') },
  { name: 'Rumah Belajar Pancasila', asset: asset('assets/partners/schools/rumah-belajar-pancasila.png') },
  { name: 'INN Indonesia', asset: asset('assets/partners/schools/inn-indonesia.png') },
  { name: 'Ekasa Technology', asset: asset('assets/partners/schools/ekasa-technology.png') }
];

export const HomepagePartnerLogosSection: React.FC<HomepagePartnerLogosSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  // Triple items for seamless loop marquee
  const marqueeItems = [...TRUSTED_SCHOOLS, ...TRUSTED_SCHOOLS, ...TRUSTED_SCHOOLS];

  return (
    <section className="py-20 bg-[#F8FAFC] overflow-hidden relative border-y border-slate-100/50">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
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

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D47A1] tracking-tight">
            {t('partners.title')}
          </h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            Dipercaya oleh sekolah, institusi pendidikan, dan organisasi yang berkomitmen membangun generasi digital Indonesia.
          </p>
        </div>

        {/* Carousel Wrapper with fading masks at edges */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-20 pointer-events-none" />

          {/* Marquee Content */}
          <div className="flex w-max gap-6 animate-marquee marquee-container">
            {marqueeItems.map((school, idx) => (
              <div 
                key={`${school.name}-${idx}`} 
                className={`marquee-item flex-shrink-0 w-36 h-24 sm:w-44 sm:h-28 bg-[#FFFFFF] rounded-[20px] ${school.status === 'EMPTY' ? 'border border-dashed border-[#D6E5FF]' : 'border border-[#DCE7F5]'} shadow-sm hover:shadow-[0_12px_30px_rgba(24,107,246,0.12)] hover:border-[#186BF6] hover:-translate-y-1 transition-all duration-250 p-6 flex items-center justify-center cursor-pointer`}
                title={school.name}
              >
                <img
                  src={school.asset}
                  alt={school.name}
                  className="w-full h-full max-w-full max-h-full object-contain object-center"
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
