import React from 'react';
import { ArrowLeft, ArrowRight, Handshake, School, Building2, Users, Globe, CheckCircle2, Phone, Mail } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import { PartnershipNetwork } from '../common/PartnershipNetwork';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { openSpiWhatsApp } from '../../utils/whatsapp';

interface PartnershipPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const PARTNER_MODELS = [
  { key: 'school', icon: School, image: ASSETS.partnership.schoolPartnership },
  { key: 'corporate', icon: Building2, image: ASSETS.partnership.industryPartnership },
  { key: 'community', icon: Users, image: ASSETS.partnership.communityPartnership },
  { key: 'strategic', icon: Globe, image: ASSETS.partnership.strategicPartnership },
];

export const PartnershipPage: React.FC<PartnershipPageProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const handleConsultationClick = (modelKey?: string) => {
    const type = modelKey ? t(`ppage.model.${modelKey}.title`) : t('partner.wa_generic');
    openSpiWhatsApp(t('partner.wa_message').replace('{type}', type));
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#1870FF] selection:text-white">

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#1870FF] via-[#1059D4] to-[#0B3C95] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t('common.back_home')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div className="max-w-xl space-y-5">
              <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
                <Handshake className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                <span>{t('partner.eyebrow')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {t('ppage.title')}
              </h1>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl">
                {t('ppage.desc')}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleConsultationClick()}
                  className="px-8 py-3.5 bg-white text-[#1870FF] hover:bg-blue-50 active:scale-[0.98] font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>{t('partner.cta_primary')}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <a
                  href={`mailto:${SPI_CONFIG.EMAIL}`}
                  className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-sm sm:text-base rounded-xl border border-white/60 transition-all flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  <span>{t('ppage.email')}</span>
                </a>
              </div>
            </div>

            <div className="relative w-full text-slate-800">
              <PartnershipNetwork onDiscuss={() => handleConsultationClick()} />
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Models */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">

        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">{t('ppage.models_title')}</h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl">{t('ppage.models_desc')}</p>
        </div>

        <div className="space-y-12">
          {PARTNER_MODELS.map((model, index) => {
            const Icon = model.icon;
            const isReversed = index % 2 !== 0;
            const title = t(`ppage.model.${model.key}.title`);

            return (
              <div
                key={model.key}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group`}
              >
                {/* Visual */}
                <div className="w-full md:w-1/2 min-h-[250px] md:min-h-[auto] relative overflow-hidden bg-slate-50">
                  <ImageWithFallback
                    src={model.image}
                    alt={title}
                    fallbackLabel={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1870FF] flex items-center justify-center shrink-0 border border-blue-100">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-800">{title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{t(`ppage.model.${model.key}.desc`)}</p>
                  </div>

                  <ul className="flex flex-wrap gap-3 pt-2">
                    {[1, 2, 3, 4].map((n) => (
                      <li
                        key={n}
                        className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1870FF]" aria-hidden="true" />
                        <span>{t(`ppage.model.${model.key}.b${n}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleConsultationClick(model.key)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer"
                    >
                      <span>{t('partner.cta_primary')}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#F4F8FF] rounded-3xl border border-blue-100 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">{t('ppage.bottom_title')}</h3>
            <p className="text-sm text-slate-600 max-w-lg">{t('ppage.bottom_desc')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => handleConsultationClick()}
              className="px-7 py-3.5 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{t('ppage.whatsapp')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
