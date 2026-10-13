import React from 'react';
import { ArrowRight, BookOpenCheck, Building2, GraduationCap, Handshake, Layers, MessageCircle, School, Users, Award } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { PartnershipNetwork } from '../common/PartnershipNetwork';

interface PartnershipSectionProps {
  onNavigate?: (path: string) => void;
}

/** Benefits taken from what SPI InSchool already provides (see FAQ). */
const BENEFITS = [
  { key: 'curriculum', icon: BookOpenCheck },
  { key: 'teachers', icon: GraduationCap },
  { key: 'projects', icon: Layers },
  { key: 'assessment', icon: Award },
];

const PATHS = [
  { key: 'school', icon: School },
  { key: 'center', icon: Building2 },
  { key: 'community', icon: Users },
  { key: 'strategic', icon: Handshake },
];

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const discuss = (pathKey?: string) => {
    const type = pathKey ? t(`partner.path.${pathKey}.title`) : '';
    openSpiWhatsApp(t('partner.wa_message').replace('{type}', type || t('partner.wa_generic')));
  };

  return (
    <section id="partnership-section" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#070D18] border-y border-[#DCE7F5] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">

        {/* Header + value proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#EAF2FF] dark:bg-[#176DF8]/15 text-[#176DF8] px-3.5 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20 font-bold text-xs tracking-wider uppercase">
              <Handshake className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t('partner.eyebrow')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#041A5A] dark:text-white tracking-tight leading-tight">
              {t('partner.heading')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {t('partner.desc')}
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <button
              type="button"
              onClick={() => discuss()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 whitespace-nowrap bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{t('partner.cta_primary')}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('/partnership')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 whitespace-nowrap bg-white dark:bg-slate-900 text-[#176DF8] font-bold text-sm rounded-xl border border-[#BFD5F5] dark:border-slate-700 hover:border-[#176DF8] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] focus-visible:ring-offset-2"
            >
              <span>{t('partner.cta_secondary')}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Why partner with SPI */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">{t('partner.why_title')}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ key, icon: Icon }) => (
              <li key={key} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800">
                <Icon className="w-6 h-6 text-[#176DF8] mb-3" aria-hidden="true" />
                <p className="text-sm font-bold text-[#041A5A] dark:text-white">{t(`partner.benefit.${key}.title`)}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{t(`partner.benefit.${key}.desc`)}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Partnership paths + network */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">{t('partner.paths_title')}</h3>
            <ul className="space-y-3">
              {PATHS.map(({ key, icon: Icon }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => discuss(key)}
                    className="group w-full text-left flex gap-4 items-start p-4 rounded-2xl bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800 hover:border-[#176DF8] hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#176DF8]/10 text-[#176DF8] flex items-center justify-center shrink-0 group-hover:bg-[#176DF8] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-[#041A5A] dark:text-white">{t(`partner.path.${key}.title`)}</span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{t(`partner.path.${key}.desc`)}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#176DF8] mt-1 shrink-0 transition-colors" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">{t('partner.followup')}</p>
          </div>

          <div className="lg:col-span-7">
            <PartnershipNetwork onDiscuss={() => discuss()} />
          </div>
        </div>
      </div>
    </section>
  );
};
