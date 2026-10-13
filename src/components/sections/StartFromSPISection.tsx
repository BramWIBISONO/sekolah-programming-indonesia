import React from 'react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { useLanguage } from '../../i18n';

export const StartFromSPISection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('startspi.title')}</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {t('startspi.desc')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <YouTubeEmbed
            videoId="_oaWIGLntvk"
            title="Start From SPI"
            className="w-full aspect-video"
            options={{ startTime: 13, autoplay: true, muted: true }}
          />
        </div>
      </div>
    </section>
  );
};
