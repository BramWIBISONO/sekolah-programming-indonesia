import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { useLanguage } from '../i18n';
import { SPI_CONFIG } from '../constants/config';
import { openSpiWhatsApp } from '../utils/whatsapp';

interface ExperienceSectionProps {
  onOpenTrial: () => void;
}

/**
 * Free Trial explainer (design.md 7.3): who it is for, what happens, and what comes next.
 * Only uses details already published on the site (60-minute session with a mentor,
 * first project, program advice, and the team following up to schedule).
 */
const STEPS = ['s1', 's2', 's3', 's4'];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenTrial }) => {
  const { t } = useLanguage();

  return (
    <section id="free-trial-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Explanation and steps */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('trial.eyebrow')}</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] leading-tight tracking-tight">{t('trial.title')}</h2>
              <p className="text-base text-slate-600 leading-relaxed">{t('trial.desc')}</p>
            </div>

            <ol className="space-y-4">
              {STEPS.map((step, idx) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full bg-[#1870FF] text-white text-sm font-black flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-base font-bold text-[#041A5A]">{t(`trial.${step}.title`)}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{t(`trial.${step}.desc`)}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <button
                type="button"
                onClick={onOpenTrial}
                className="px-7 py-3.5 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                <span>{t('cta.free_trial')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => openSpiWhatsApp(SPI_CONFIG.WHATSAPP_PREFILLED_MESSAGE)}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] underline-offset-4 hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>{t('trial.ask')}</span>
              </button>
            </div>
          </div>

          {/* Existing SPI visual */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-[#F4F8FF] aspect-[4/3]">
              <ImageWithFallback
                src={ASSETS.homepage.experienceSpi}
                alt={t('trial.image_alt')}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
