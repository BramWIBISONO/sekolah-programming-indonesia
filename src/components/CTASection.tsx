import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n';
import { openSpiWhatsApp } from '../utils/whatsapp';

interface CTASectionProps {
  onOpenRegistration: () => void;
  onOpenTrial?: () => void;
  onNavigate?: (path: string) => void;
}

/**
 * Closing call to action, split by audience (design.md 6.13):
 * parents/students start with a free class; schools start a partnership conversation.
 */
export const CTASection: React.FC<CTASectionProps> = ({ onOpenRegistration, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section id="cta-section" className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Parents & students */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#176DF8] to-[#0B3C95] text-white px-6 py-8 sm:px-10 sm:py-10 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
            <img
              src={ASSETS.brand.pandaMascot}
              alt={t('cta.mascot_alt')}
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-lg shrink-0"
              loading="lazy"
              decoding="async"
            />
            <div className="text-center sm:text-left space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-100">{t('cta.parents_label')}</p>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">{t('cta.parents_title')}</h2>
              <button
                id="cta-register-now-btn"
                type="button"
                onClick={onOpenRegistration}
                className="px-7 py-3.5 bg-white text-[#176DF8] hover:bg-blue-50 font-bold text-sm sm:text-base rounded-xl shadow-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#176DF8]"
              >
                <span>{t('cta.free_trial')}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Schools & institutions */}
          <div className="lg:col-span-5 rounded-3xl bg-[#041A5A] text-white px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FFE38A]">{t('cta.schools_label')}</p>
            <h2 className="text-2xl sm:text-[26px] font-black tracking-tight leading-tight">{t('cta.schools_title')}</h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <button
                type="button"
                onClick={() => openSpiWhatsApp(t('partner.wa_message').replace('{type}', t('partner.path.school.title')))}
                className="px-6 py-3 bg-[#FFC928] hover:bg-[#FFD54F] text-[#041A5A] font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041A5A]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>{t('cta.schools_button')}</span>
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/program/spi-inschool')}
                  className="text-sm font-bold text-blue-100 hover:text-white underline-offset-4 hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {t('prog.inschool.cta')} →
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
