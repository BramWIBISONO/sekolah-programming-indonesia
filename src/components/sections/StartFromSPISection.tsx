import React from 'react';
import { YouTubeEmbed } from '../common/YouTubeEmbed';
import { useLanguage } from '../../i18n';

export const StartFromSPISection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-14 sm:py-24 overflow-hidden bg-gradient-to-b from-white via-[#F3F8FF] to-white">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[640px] bg-[#176DF8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block text-[11px] sm:text-xs font-bold text-[#176DF8] bg-[#176DF8]/10 px-3 py-1 rounded-full uppercase tracking-widest">
            {t('startspi.eyebrow')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('startspi.title')}</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#176DF8] to-[#8EC5FF] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">
            {t('startspi.desc')}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto p-1.5 sm:p-2 rounded-[28px] bg-gradient-to-br from-[#176DF8] via-[#5BA7FF] to-[#DCEBFF] shadow-[0_30px_60px_-20px_rgba(23,109,248,0.45)]">
         <div className="rounded-[22px] overflow-hidden">
          <YouTubeEmbed
            videoId="_oaWIGLntvk"
            title={t('startspi.title')}
            className="w-full aspect-video"
            autoplayWhenVisible
            options={{ startTime: 13 }}
          />
         </div>
        </div>
      </div>
    </section>
  );
};
