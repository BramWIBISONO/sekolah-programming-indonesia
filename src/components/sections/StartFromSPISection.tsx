import React from 'react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';

export const StartFromSPISection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Mulai Dari SPI</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Saksikan bagaimana kami mempersiapkan generasi muda untuk masa depan melalui pendidikan teknologi yang tepat.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <YouTubeEmbed
            videoId="_oaWIGLntvk"
            startSeconds={13}
            title="Start From SPI"
            className="w-full aspect-video"
          />
        </div>
      </div>
    </section>
  );
};
