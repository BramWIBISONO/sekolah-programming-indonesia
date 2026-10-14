import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { PartnershipNetwork } from '../common/PartnershipNetwork';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface PartnershipSectionProps {
  onNavigate?: (path: string) => void;
}

/** Benefits taken from what SPI InSchool already provides (see FAQ). */
const BENEFITS: { key: string; icon: SpiIconName }[] = [
  { key: 'curriculum', icon: 'curriculum' },
  { key: 'teachers', icon: 'teacher' },
  { key: 'projects', icon: 'build' },
  { key: 'assessment', icon: 'assessment' },
];

const PATHS: { key: string; icon: SpiIconName; tint: string }[] = [
  { key: 'school', icon: 'inschool', tint: 'bg-[#E2F5EC]' },
  { key: 'center', icon: 'center', tint: 'bg-[#E6F0FF]' },
  { key: 'community', icon: 'community', tint: 'bg-[#FFF6D6]' },
  { key: 'strategic', icon: 'strategic', tint: 'bg-[#F0ECFF]' },
];

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const discuss = (pathKey?: string) => {
    const type = pathKey ? t(`partner.path.${pathKey}.title`) : '';
    openSpiWhatsApp(t('partner.wa_message').replace('{type}', type || t('partner.wa_generic')));
  };

  const reveal = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.45, delay: i * 0.08 },
        };

  return (
    <section id="partnership-section" className="py-16 sm:py-24 bg-[#F7F8FC] dark:bg-[#070D18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('partner.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight leading-[1.08] text-balance">
              {t('partner.heading')}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{t('partner.desc')}</p>
          </div>
          <div className="lg:col-span-4 flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            <button
              type="button"
              onClick={() => discuss()}
              className="inline-flex items-center justify-center gap-2 h-12 px-6 whitespace-nowrap bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] focus-visible:ring-offset-2 active:translate-y-px"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>{t('partner.cta_primary')}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate?.('/partnership')}
              className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
            >
              <span>{t('partner.cta_secondary')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Why partner: icon row, no card frames */}
        <div className="mt-12 sm:mt-14">
          <h3 className="sr-only">{t('partner.why_title')}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#DCE6F7]">
            {BENEFITS.map(({ key, icon }, i) => (
              <motion.li key={key} {...reveal(i)} className="group flex lg:flex-col gap-4 lg:px-6 first:lg:pl-0 last:lg:pr-0">
                <SpiIcon name={icon} size={52} animate="hover" className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <div>
                  <p className="text-base font-black text-[#041A5A] dark:text-white">{t(`partner.benefit.${key}.title`)}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{t(`partner.benefit.${key}.desc`)}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Partnership paths + network */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <h3 className="text-xl font-black text-[#041A5A] dark:text-white mb-5">{t('partner.paths_title')}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PATHS.map(({ key, icon, tint }, i) => (
                <motion.li key={key} {...reveal(i)}>
                  <button
                    type="button"
                    onClick={() => discuss(key)}
                    className="group w-full h-full text-left flex flex-col gap-4 p-5 rounded-[22px] bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#176DF8]/50 hover:shadow-[0_20px_40px_-28px_rgba(4,26,90,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
                  >
                    <span className={`w-16 h-16 rounded-[18px] ${tint} flex items-center justify-center`}>
                      <SpiIcon name={icon} size={46} animate="hover" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-black text-[#041A5A] dark:text-white">{t(`partner.path.${key}.title`)}</span>
                      <span className="block text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-1">{t(`partner.path.${key}.desc`)}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176DF8]">
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      {t('partner.path_cta')}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">{t('partner.followup')}</p>
          </div>

          <div className="lg:col-span-6">
            <PartnershipNetwork onDiscuss={() => discuss()} />
          </div>
        </div>
      </div>
    </section>
  );
};
