import React from 'react';
import { INNOVATION_FESTIVAL_CITIES } from '../../data/homepageData';
import { MapPin, Sparkles, CalendarClock } from 'lucide-react';

export const InnovationFestivalSection: React.FC = () => {
  return (
    <section id="innovation-festival-section" className="py-16 sm:py-24 bg-[#071F4A] text-white relative overflow-hidden">
      {/* Background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'linear-gradient(to right, #176DF8 1px, transparent 1px), linear-gradient(to bottom, #176DF8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#176DF8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#176DF8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Coming Soon</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            SPI Innovation Festival
          </h2>

          <p className="text-base sm:text-lg text-blue-200 leading-relaxed">
            Innovation Festival SPI akan hadir di berbagai kota. Tunggu informasi selanjutnya mengenai jadwal dan detail acaranya.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {INNOVATION_FESTIVAL_CITIES.map((city) => (
            <div
              key={city.name}
              className="group bg-white/[0.06] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-[#176DF8]/40 hover:bg-white/[0.1] transition-all duration-300 text-center space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#176DF8]/20 text-[#176DF8] flex items-center justify-center mx-auto group-hover:bg-[#176DF8] group-hover:text-white transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">{city.name}</h3>
              <div className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-300/80">
                <CalendarClock className="w-3 h-3" />
                <span>{city.status}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-blue-300/60 mt-10 font-medium">
          Nantikan pengumuman resmi dari SPI.
        </p>
      </div>
    </section>
  );
};
