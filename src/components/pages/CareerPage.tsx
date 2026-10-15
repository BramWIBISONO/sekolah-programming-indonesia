import React, { useEffect } from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface CareerPageProps {
  onBack: () => void;
}

const REASONS: { key: string; icon: SpiIconName }[] = [
  { key: 'curriculum', icon: 'curriculum' },
  { key: 'projects', icon: 'build' },
  { key: 'locations', icon: 'pin' },
];

/** Karier: invites mentors and educators to apply (open application by e-mail or WhatsApp). */
export const CareerPage: React.FC<CareerPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Karier | Sekolah Programming Indonesia';
    return () => { document.title = previous; };
  }, []);

  const mailHref = `mailto:${SPI_CONFIG.EMAIL}?subject=${encodeURIComponent(t('career.mail_subject'))}`;

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      {/* Hero: photo collage on a blue wave, copy on the right */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-20 sm:pb-28">
        <svg className="absolute left-0 top-[18%] w-full h-[78%]" viewBox="0 0 1440 520" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40C300 30 520 150 740 310C940 450 1200 505 1440 480V520H0Z" fill="#1870FF" />
          <path d="M0 40C300 30 520 150 740 310C940 450 1200 505 1440 480V500C1200 520 920 480 700 360C480 240 260 110 0 100Z" fill="#5B9BFF" opacity="0.35" />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#1870FF] mb-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t('lab.back')}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Collage of real SPI mentors and class */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative h-[320px] sm:h-[420px]"
              aria-hidden="true"
            >
              <div className="absolute left-0 top-0 w-[56%] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(4,26,90,0.6)] bg-[#DCEBFF]">
                <img src={ASSETS.mentors.mentor1} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute right-[4%] top-[8%] w-[30%] aspect-square rounded-[20px] overflow-hidden border-4 border-white shadow-xl bg-[#DCEBFF]">
                <img src={ASSETS.mentors.mentor3} alt="" className="w-full h-full object-cover object-top" />
              </div>
              <span className="absolute left-[44%] top-[16%] rounded-2xl bg-[#FFE38A] px-4 py-3 shadow-lg">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#041A5A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#041A5A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#041A5A]" />
                </span>
              </span>
              <div className="absolute right-0 bottom-0 w-[56%] aspect-[16/10] rounded-[20px] p-1.5 bg-[#0B1220] shadow-[0_30px_60px_-30px_rgba(4,26,90,0.7)]">
                <div className="w-full h-full rounded-[14px] overflow-hidden">
                  <img src={ASSETS.learning.mentorSession} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <svg className="absolute left-[30%] bottom-[2%] w-20 h-14" viewBox="0 0 80 56">
                <path d="M14 40L40 16L66 34" stroke="#041A5A" strokeWidth="3" fill="none" />
                <circle cx="14" cy="40" r="9" fill="#FFC928" />
                <circle cx="40" cy="16" r="12" fill="#041A5A" />
                <circle cx="66" cy="34" r="8" fill="#fff" stroke="#041A5A" strokeWidth="3" />
              </svg>
            </motion.div>

            {/* Copy */}
            <div className="lg:col-span-6 space-y-5 lg:bg-transparent rounded-3xl bg-white/95 p-6 sm:p-8 lg:p-0 shadow-xl lg:shadow-none">
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#1870FF]">{t('career.eyebrow')}</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('career.title')}</h1>
              <p className="text-base text-slate-600 leading-relaxed">{t('career.desc')}</p>
              <p className="text-sm font-semibold text-[#041A5A]">{t('career.email_note').replace('{email}', SPI_CONFIG.EMAIL)}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={mailHref}
                  className="inline-flex justify-center items-center gap-2 h-12 px-7 rounded-xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {t('career.apply')}
                </a>
                <button
                  type="button"
                  onClick={() => openSpiWhatsApp(t('career.wa_message'))}
                  className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-xl border-2 border-[#1870FF] text-[#1870FF] hover:bg-[#EEF4FF] font-bold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('career.ask')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-4xl font-black text-[#041A5A] tracking-tight mb-12 text-balance">{t('career.why_title')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {REASONS.map(({ key, icon }, i) => (
              <motion.li
                key={key}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center space-y-3"
              >
                <span className="mx-auto w-24 h-24 rounded-full bg-[#EEF4FF] flex items-center justify-center">
                  <SpiIcon name={icon} size={60} animate="hover" />
                </span>
                <h3 className="text-lg font-black text-[#041A5A]">{t(`career.why.${key}.title`)}</h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-xs mx-auto">{t(`career.why.${key}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-16 sm:py-20 bg-[#F7F8FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight mb-8">{t('career.how_title')}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <li key={n} className="rounded-2xl bg-white border border-[#E3ECFA] p-5 flex gap-4">
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#1870FF] text-white text-sm font-black flex items-center justify-center tabular-nums" aria-hidden="true">{n}</span>
                <span>
                  <span className="block text-base font-black text-[#041A5A]">{t(`career.how.${n}.title`)}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed mt-1">{t(`career.how.${n}.desc`)}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#1870FF] to-[#0F56D1] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <p className="text-lg sm:text-xl font-black max-w-xl text-balance">{t('career.cta_title')}</p>
            <a
              href={mailHref}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 h-12 px-7 rounded-xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold text-sm transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t('career.apply')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
