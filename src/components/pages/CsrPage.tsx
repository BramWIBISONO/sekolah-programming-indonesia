import React, { useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { AnimatedGridPattern } from '../illustrations/AnimatedGridPattern';

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
    <circle cx="50" cy="50" r="13" fill="#1870FF" />
  </motion.svg>
);

/**
 * CSR SPI: the page where SPI's social responsibility activities will be shared.
 * The content is still being prepared, so the page says so and does not describe any activity yet.
 * The waiting state is animated: moving grid, floating light, turning gears, and a pulse.
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

      <section className="mx-auto max-w-5xl px-4 pt-14 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-[#1870FF] p-7 text-white shadow-[0_40px_80px_-40px_rgba(24,112,255,0.7)] sm:p-14">
          <AnimatedGridPattern className="text-white" cell={44} glowing={18} />

          {/* Two soft lights that drift slowly behind the content */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl"
            animate={reduce ? undefined : { y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#FFC928]/25 blur-3xl"
            animate={reduce ? undefined : { y: [0, -25, 0], x: [0, 25, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A] shadow-[0_12px_24px_-12px_rgba(255,201,40,0.9)]">
                <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                {t('csr.status')}
              </span>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">{t('csr.status_desc')}</p>

              <div className="mt-8 flex items-center gap-3 text-sm font-bold text-white/90" role="status">
                <span className="relative flex h-3 w-3" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-[#FFC928] spi-anim-ping" />
                  <span className="relative h-3 w-3 rounded-full bg-[#FFC928]" />
                </span>
                Sedang disiapkan
              </div>

              <div className="mt-4 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-white/25" role="presentation">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#FFC928] to-white"
                  animate={reduce ? undefined : { x: ['-100%', '300%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64" aria-hidden="true">
              {/* A ring that pulses behind the gears */}
              {!reduce && (
                <motion.span
                  className="absolute inset-4 rounded-full border-2 border-white/50"
                  animate={{ scale: [0.9, 1.25], opacity: [0.7, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <Gear className="absolute left-0 top-0 h-36 w-36 drop-shadow-[0_16px_24px_rgba(4,26,90,0.35)] sm:h-44 sm:w-44" color="#FFFFFF" spin={12} reduce={reduce} />
              <Gear className="absolute bottom-0 right-0 h-24 w-24 drop-shadow-[0_16px_24px_rgba(4,26,90,0.35)] sm:h-28 sm:w-28" color="#FFC928" spin={8} reverse reduce={reduce} />
              <Gear className="absolute bottom-6 left-10 h-14 w-14 drop-shadow-[0_12px_18px_rgba(4,26,90,0.3)]" color="#BFDBFE" spin={5} reduce={reduce} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
