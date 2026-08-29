import React from 'react';
import { Play } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const WhySPIVideoSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">{t('whykids.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base font-medium">{t('whykids.desc')} Lihat bagaimana siswa kami menemukan passion mereka di SPI.</p>
        </div>

        <div className="max-w-5xl mx-auto rounded-[28px] overflow-hidden shadow-2xl relative bg-gradient-to-br from-[#176DF8] via-[#5BA7FF] to-[#DCEBFF] aspect-video p-1.5 md:p-3">
          <div className="w-full h-full rounded-[20px] md:rounded-[24px] overflow-hidden bg-[#176DF8] shadow-inner relative group">
            <iframe
              src="https://www.youtube.com/embed/1y1z5wUIVr0?start=67&rel=0&modestbranding=1"
              title="Why Kids Choose SPI"
              className="absolute inset-0 w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
