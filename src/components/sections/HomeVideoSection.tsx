import React from 'react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { HOMEPAGE_VIDEO } from '../../data/homepageData';

export const HomeVideoSection: React.FC = () => {
  return (
    <section id="home-video-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
            See Learning in Action
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
            Pengalaman Belajar di SPI
          </h2>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Lihat bagaimana siswa SPI belajar, berkreasi, dan membangun solusi teknologi nyata.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
          <YouTubeEmbed
            videoId={HOMEPAGE_VIDEO.id}
            title="Pengalaman Belajar SPI"
            options={{ autoplay: true, muted: true, controls: true }}
          />
        </div>
      </div>
    </section>
  );
};
