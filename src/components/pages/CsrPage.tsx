import React, { useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { DotField3D } from '../illustrations/DotField3D';

interface CsrPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
}

/** A simple cog: a ring with eight teeth, drawn as SVG. */
const Gear: React.FC<{ className?: string; color: string; spin: number; reverse?: boolean; reduce: boolean }> = ({ className = '', color, spin, reverse, reduce }) => (
  <motion.svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    className={className}
    animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
    transition={{ duration: spin, repeat: Infinity, ease: 'linear' }}
  >
    <g fill={color}>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="44" y="2" width="12" height="20" rx="3" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="30" />
    </g>
    <circle cx="50" cy="50" r="13" fill="#EAF2FF" />
  </motion.svg>
);

/**
 * CSR SPI: the page where SPI's social responsibility activities will be shared.
 * The content is still being prepared, so the page says so and does not describe any activity yet.
 */
export const CsrPage: React.FC<CsrPageProps> = ({ onBack, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20 text-[#0B1220]">
      <IllustratedHero
        variant="partnership"
        eyebrow={t('csr.eyebrow')}
        title={t('csr.title')}
        description={t('csr.desc')}
        primary={{ label: t('csr.wa'), onClick: () => openSpiWhatsApp(t('csr.wa_message')) }}
        secondary={{ label: t('csr.partner_link'), onClick: () => onNavigate('/partnership') }}
        onBack={onBack}
        backLabel={t('lab.back')}
      />

      <section className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-[#DCE7FB] bg-[#EAF2FF] p-7 sm:p-12">
          <DotField3D />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A]">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                {t('csr.status')}
              </span>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">{t('csr.status_desc')}</p>
              <div className="mt-7 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/80" role="presentation">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#1870FF] to-[#38BDF8]"
                  animate={reduce ? undefined : { x: ['-100%', '300%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52" aria-hidden="true">
              <Gear className="absolute left-0 top-0 h-32 w-32 drop-shadow-[0_16px_24px_rgba(4,26,90,0.35)] sm:h-36 sm:w-36" color="#1870FF" spin={10} reduce={reduce} />
              <Gear className="absolute bottom-0 right-0 h-24 w-24 drop-shadow-[0_16px_24px_rgba(4,26,90,0.35)] sm:h-28 sm:w-28" color="#041A5A" spin={7} reverse reduce={reduce} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
