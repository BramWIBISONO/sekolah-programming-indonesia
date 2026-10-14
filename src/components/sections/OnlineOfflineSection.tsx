import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { Monitor, Building2, ArrowRight } from 'lucide-react';

interface OnlineOfflineSectionProps {
  onOpenTrial?: () => void;
}

export const OnlineOfflineSection: React.FC<OnlineOfflineSectionProps> = ({ onOpenTrial }) => {
  const { t } = useLanguage();

  const options = [
    { key: 'offline', icon: Building2, asset: ASSETS.learning.codingClass },
    { key: 'online', icon: Monitor, asset: ASSETS.learning.aiProject },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('onoff.title')}</h2>
          <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
          <h3 className="text-lg sm:text-xl font-bold text-[#041A5A] pt-2 sm:pt-4">{t('onoff.headline')}</h3>
          <p className="text-slate-600 leading-relaxed">{t('onoff.desc')}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.key} className="rounded-2xl sm:rounded-3xl border border-[#E3ECFA] shadow-sm overflow-hidden group hover:shadow-xl transition-shadow bg-white">
                <div className="aspect-[4/3] sm:aspect-[16/9] relative bg-slate-100 overflow-hidden">
                  <ImageWithFallback 
                    src={opt.asset || ''} 
                    alt={t(`onoff.${opt.key}`)}
                    loading="lazy"
                    fallbackLabel={t(`onoff.${opt.key}`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041A5A]/70 to-transparent flex items-end p-3 sm:p-6">
                     <h3 className="flex items-center gap-2 text-base sm:text-2xl font-black text-white">
                       <Icon className="w-4 h-4 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                       {t(`onoff.${opt.key}`)}
                     </h3>
                  </div>
                </div>
                <div className="p-3 sm:p-6 md:p-8">
                  <p className="text-[13px] sm:text-base text-slate-600 leading-relaxed">{t(`onoff.${opt.key}_desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#F4F8FF] rounded-3xl p-6 sm:p-10 border border-[#DCE7FB] text-center space-y-5 sm:space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#041A5A] text-balance">{t('onoff.trial_headline')}</h3>
            <p className="text-slate-600">{t('onoff.trial_desc')}</p>
          </div>
          <button
            type="button"
            onClick={onOpenTrial}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-8 py-4 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
          >
            <span>{t('onoff.cta')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
