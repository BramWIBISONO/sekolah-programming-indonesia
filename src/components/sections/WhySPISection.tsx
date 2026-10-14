import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

/** Think → Build → Innovate is the central philosophy; the three differentiators support it. */
const FLOW: { key: string; icon: SpiIconName; tint: string }[] = [
  { key: 'think', icon: 'think', tint: 'bg-[#FFF6D6]' },
  { key: 'build', icon: 'build', tint: 'bg-[#E6F0FF]' },
  { key: 'innovate', icon: 'innovate', tint: 'bg-[#EEF0FF]' },
];

const SUPPORTING: { key: string; icon: SpiIconName }[] = [
  { key: 'c2', icon: 'projects' },
  { key: 'c3', icon: 'ai' },
  { key: 'c4', icon: 'ecosystem' },
];

export const WhySPISection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const scrollToPrograms = () => {
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const reveal = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="why-spi-section" className="relative py-16 sm:py-24 bg-[#F7F8FC] dark:bg-[#070D18] overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('whyspi.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight leading-[1.08] text-balance">
              {t('whyspi.title')}
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">{t('whyspi.desc')}</p>
            <button
              type="button"
              onClick={scrollToPrograms}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
            >
              <span>{t('common.explore_programs')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Think → Build → Innovate: illustrated flow */}
        <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 px-5 py-8 sm:px-10 sm:py-10 shadow-[0_24px_60px_-40px_rgba(4,26,90,0.35)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
            <p className="text-xl sm:text-2xl font-black text-[#041A5A] dark:text-white tracking-tight">{t('whyspi.c1.title')}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">{t('whyspi.c1.desc')}</p>
          </div>

          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            {/* Animated connector between the three stages (desktop) */}
            <div className="hidden md:block absolute left-[16%] right-[16%] top-[38px] h-3 pointer-events-none" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 100 4" preserveAspectRatio="none">
                <path d="M0 2H100" stroke="#C9DAF7" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" />
                <path className="spi-anim-dash" d="M0 2H100" stroke="#176DF8" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 18" />
              </svg>
            </div>

            {FLOW.map((stage, i) => (
              <motion.li key={stage.key} {...reveal(i)} className="group relative flex md:flex-col items-center md:text-center gap-4">
                <div className={`relative z-10 shrink-0 w-[88px] h-[88px] rounded-[26px] ${stage.tint} flex items-center justify-center ring-8 ring-white dark:ring-slate-900 transition-transform duration-300 group-hover:-translate-y-1`}>
                  <SpiIcon name={stage.icon} size={56} animate="always" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#041A5A] text-white text-xs font-black flex items-center justify-center tabular-nums">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#041A5A] dark:text-white">{t(`method.${stage.key}.title`)}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{t(`whyspi.flow.${stage.key}`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>

          <p className="mt-8 inline-flex items-start gap-2 rounded-xl bg-[#FFF6D6] text-[#5C4300] px-4 py-2.5 text-sm font-semibold">
            <SpiIcon name="innovate" size={20} animate="none" className="shrink-0 mt-px" />
            <span>{t('whyspi.c1.benefit')}</span>
          </p>
        </div>

        {/* Supporting differentiators: icon-led, no card frames */}
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {SUPPORTING.map(({ key, icon }, i) => (
            <motion.li key={key} {...reveal(i)} className="group flex md:flex-col gap-4">
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-[#E3ECFA] dark:border-slate-800 flex items-center justify-center transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <SpiIcon name={icon} size={44} animate="hover" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#041A5A] dark:text-white">{t(`whyspi.${key}.title`)}</h3>
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">{t(`whyspi.${key}.desc`)}</p>
                <p className="text-sm font-semibold text-[#176DF8] dark:text-blue-300">{t(`whyspi.${key}.benefit`)}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
