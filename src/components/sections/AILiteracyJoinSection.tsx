import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface AILiteracyJoinSectionProps {
  onNavigate: (path: string) => void;
}

const PILLARS: { key: 'p1' | 'p2' | 'p3'; icon: SpiIconName }[] = [
  { key: 'p1', icon: 'ai' },
  { key: 'p2', icon: 'assessment' },
  { key: 'p3', icon: 'innovate' },
];

/** Homepage call to join the AI Literacy movement: date, the illustration, three ideas, and two ways to take part. */
export const AILiteracyJoinSection: React.FC<AILiteracyJoinSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const join = () => openSpiWhatsApp(t('ail.wa_message'));

  return (
    <section id="ai-literacy-section" className="relative overflow-hidden bg-[#1870FF] text-white py-16 sm:py-24 scroll-mt-20">
      <div
        className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        aria-hidden="true"
      />
      <div className="absolute -right-40 -top-40 w-[560px] h-[560px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
        <div className={`w-full h-full ${reduce ? '' : 'spi-anim-rays'}`} style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 flex flex-col items-start gap-5">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/85">
            <span className="w-6 h-[3px] rounded-full bg-white/70" aria-hidden="true" />
            {t('ail.join.eyebrow')}
          </p>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC928] text-[#041A5A] px-4 py-1.5 text-xs sm:text-sm font-black">
            {t('ail.kickoff.label')} · {t('ail.kickoff.date')}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08] text-balance">{t('ail.join.title')}</h2>
          <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed max-w-xl">{t('ail.join.desc')}</p>
          <p className="text-sm font-black text-[#041A5A] bg-white/90 inline-block rounded-lg px-3 py-1.5">{t('ail.status')}</p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/gerakan-ai-literacy')}
              className="group inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              {t('ail.join.cta')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={join}
              className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('ail.join.wa')}
            </button>
          </div>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-xl">{t('ail.join.note')}</p>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-[28px] bg-white p-3 shadow-[0_30px_60px_-30px_rgba(2,18,70,0.7)]">
            <AILiteracyArt className="w-full h-auto block rounded-[20px]" animate={!reduce} />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PILLARS.map(({ key, icon }, i) => (
              <motion.li
                key={key}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white text-[#041A5A] p-4 shadow-[0_24px_50px_-30px_rgba(2,18,70,0.7)]"
              >
                <span className="w-10 h-10 rounded-xl bg-[#EEF4FF] flex items-center justify-center">
                  <SpiIcon name={icon} size={26} animate="hover" />
                </span>
                <span className="block mt-3 text-base font-black">{t(`ail.join.${key}.title`)}</span>
                <span className="block mt-1 text-xs sm:text-[13px] text-slate-600 leading-relaxed">{t(`ail.join.${key}.desc`)}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
