import React from 'react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { WHY_KIDS_VIDEO } from '../../data/homepageData';

export const WhyKidsChooseUsSection: React.FC = () => {
  return (
    <section id="why-kids-choose-us" className="py-16 sm:py-24 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial text */}
          <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
              Why Kids Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B1220] tracking-tight leading-[1.1]">
              Mengapa Anak-Anak Memilih SPI
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Belajar di SPI bukan hanya tentang coding — ini tentang kepercayaan diri, kreativitas,
              dan kemampuan membangun sesuatu yang nyata. Anak-anak merasa didengar, didampingi,
              dan diberi ruang untuk bereksplorasi.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Dengarkan langsung pengalaman belajar di SPI — bagaimana siswa menemukan passion
              mereka dalam teknologi dan inovasi.
            </p>
          </div>

          {/* Full-bleed video — not a generic card */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#176DF8]/20 via-[#5BA7FF]/10 to-[#DCEBFF]/10 rounded-3xl blur-xl pointer-events-none" />
              <div className="absolute -inset-1 bg-gradient-to-br from-[#176DF8]/30 to-[#102A56]/20 rounded-2xl pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#176DF8]/20">
                <YouTubeEmbed
                  videoId={WHY_KIDS_VIDEO.id}
                  title="Mengapa Anak-Anak Memilih SPI"
                  options={{
                    autoplay: true,
                    muted: true,
                    controls: true,
                    startTime: WHY_KIDS_VIDEO.startTime,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
