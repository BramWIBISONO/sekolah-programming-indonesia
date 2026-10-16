import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Mail, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { EmailApplyDialog } from '../common/EmailApplyDialog';

interface CareerPageProps {
  onBack: () => void;
}

const REASONS: { key: string; icon: SpiIconName }[] = [
  { key: 'curriculum', icon: 'curriculum' },
  { key: 'projects', icon: 'build' },
  { key: 'locations', icon: 'pin' },
];

type ApplyTrack = 'mentor' | 'other';

/** Karier: invites people who can teach and know technology to apply as mentors, plus open applications. */
export const CareerPage: React.FC<CareerPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [applyFor, setApplyFor] = useState<ApplyTrack | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = 'Karier | Sekolah Programming Indonesia';
    return () => { document.title = previous; };
  }, []);

  const askOnWhatsApp = () => openSpiWhatsApp(t('career.wa_message'));
  const applyDetails = applyFor === 'other'
    ? { subject: t('career.track.other.subject'), position: t('apply.other_position') }
    : { subject: t('career.mail_subject'), position: t('career.track.mentor.title') };

  const reveal = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="career"
        eyebrow={t('career.eyebrow')}
        title={<>{t('career.hero.title_a')} <span className="text-[#1870FF]">{t('career.hero.title_b')}</span></>}
        lead={t('career.hero.lead')}
        description={t('career.hero.desc')}
        art={ASSETS.learning.mentorSession}
        artAlt={t('career.hero.art_alt')}
        artSlot={
          <div className="relative aspect-[4/3]">
            <img src={ASSETS.learning.mentorSession} alt={t('career.hero.art_alt')} className="w-full h-full object-cover" decoding="async" />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#041A5A]/70 to-transparent" aria-hidden="true" />
            {/* real SPI mentors */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-3 whitespace-nowrap">
              <span className="flex -space-x-3">
                {[ASSETS.mentors.mentor1, ASSETS.mentors.mentor3, ASSETS.mentors.mentor2].map((src) => (
                  <img key={src} src={src} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover object-top border-2 border-white bg-[#DCEBFF]" />
                ))}
              </span>
              <span className="text-sm font-black text-white drop-shadow">{t('career.hero.mentors')}</span>
            </span>
          </div>
        }
        primary={{ label: t('career.apply'), onClick: () => setApplyFor('mentor') }}
        secondary={{ label: t('career.ask'), onClick: askOnWhatsApp }}
        onBack={onBack}
        backLabel={t('lab.back')}
        badges={[
          { icon: 'teacher', title: t('career.chip.teach') },
          { icon: 'terminal', title: t('career.chip.tech') },
        ]}
        highlights={[
          { icon: 'teacher', label: t('career.chip.teach') },
          { icon: 'terminal', label: t('career.chip.tech') },
          { icon: 'briefcase', label: t('career.chip.other') },
        ]}
        footnote={
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#041A5A] [overflow-wrap:anywhere]">
            <Mail className="w-4 h-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
            {t('career.email_note').replace('{email}', SPI_CONFIG.INFO_EMAIL)}
          </p>
        }
      />

      {/* Two ways to apply */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">
              <span className="w-6 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
              {t('career.tracks.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('career.tracks.title')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Mentor & teacher: the main path, on Electric Blue */}
            <motion.article {...reveal(0)} className="lg:col-span-7 relative overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-6 sm:p-9 shadow-[0_40px_80px_-40px_rgba(24,112,255,0.8)]">
              <div
                className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_15%,transparent_70%)]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
                aria-hidden="true"
              />
              <div className="absolute -right-32 -top-32 w-[420px] h-[420px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
                <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.16) 0deg 6deg, transparent 6deg 20deg)' }} />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <span className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-[0_14px_28px_-14px_rgba(2,18,70,0.8)]">
                    <SpiIcon name="teacher" size={44} animate="always" />
                  </span>
                  <span className="rounded-full bg-[#FFC928] text-[#041A5A] text-xs font-black uppercase tracking-wider px-3 py-1.5">{t('career.track.mentor.tag')}</span>
                </div>
                <h3 className="mt-6 text-2xl sm:text-3xl font-black tracking-tight">{t('career.track.mentor.title')}</h3>
                <p className="mt-3 text-base text-blue-50/90 leading-relaxed max-w-xl">{t('career.track.mentor.desc')}</p>
                <ul className="mt-6 space-y-3">
                  {[1, 2, 3].map((n) => (
                    <li key={n} className="flex items-start gap-3 text-sm sm:text-base font-semibold">
                      <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-white/20 flex items-center justify-center"><Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" /></span>
                      {t(`career.track.mentor.p${n}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyFor('mentor')}
                    className="group inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    {t('career.track.mentor.cta')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={askOnWhatsApp}
                    className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-6 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {t('career.ask')}
                  </button>
                </div>
              </div>
            </motion.article>

            {/* Other roles: open application, subject to availability */}
            <motion.article {...reveal(1)} className="lg:col-span-5 relative overflow-hidden rounded-[28px] bg-white border border-[#DCE7FB] p-6 sm:p-9 flex flex-col">
              <span className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[#EEF4FF]" aria-hidden="true" />
              <div className="relative flex flex-col flex-1">
                <span className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                  <SpiIcon name="briefcase" size={44} />
                </span>
                <h3 className="mt-6 text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight">{t('career.track.other.title')}</h3>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">{t('career.track.other.desc')}</p>
                <ul className="mt-6 space-y-3">
                  {[1, 2].map((n) => (
                    <li key={n} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#041A5A]">
                      <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center"><Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" /></span>
                      {t(`career.track.other.p${n}`)}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setApplyFor('other')}
                    className="inline-flex justify-center items-center gap-2 w-full sm:w-auto h-12 sm:h-14 px-7 rounded-2xl border-2 border-[#1870FF] text-[#1870FF] hover:bg-[#1870FF] hover:text-white font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    {t('career.track.other.cta')}
                  </button>
                </div>
              </div>
            </motion.article>
          </div>
          <p className="mt-6 text-sm text-slate-500 [overflow-wrap:anywhere]">{t('career.track.email').replace('{email}', SPI_CONFIG.INFO_EMAIL)}</p>
        </div>
      </section>

      {/* Why join */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-4xl font-black text-[#041A5A] tracking-tight mb-10 sm:mb-12 text-balance">{t('career.why_title')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REASONS.map(({ key, icon }, i) => (
              <motion.li
                key={key}
                {...reveal(i)}
                className="group rounded-[24px] bg-white border border-[#E3ECFA] p-6 sm:p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
              >
                <span className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mb-5">
                  <SpiIcon name={icon} size={44} />
                </span>
                <h3 className="text-lg font-black text-[#041A5A]">{t(`career.why.${key}.title`)}</h3>
                <p className="mt-2 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{t(`career.why.${key}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight mb-8">{t('career.how_title')}</h2>
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <span className="hidden md:block absolute left-[16%] right-[16%] top-[30px] border-t-2 border-dashed border-[#C9DAF7]" aria-hidden="true" />
            {[1, 2, 3].map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="relative rounded-2xl bg-white border border-[#E3ECFA] p-5 md:pt-0 md:border-0 md:bg-transparent md:text-center flex md:flex-col md:items-center gap-4">
                <span className="shrink-0 w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#1870FF] text-white text-lg font-black flex items-center justify-center tabular-nums ring-8 ring-white shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)]" aria-hidden="true">{n}</span>
                <span>
                  <span className="block text-base font-black text-[#041A5A]">{t(`career.how.${n}.title`)}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed mt-1">{t(`career.how.${n}.desc`)}</span>
                </span>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 relative overflow-hidden rounded-3xl bg-[#1870FF] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              aria-hidden="true"
            />
            <p className="relative text-lg sm:text-xl font-black max-w-xl text-balance">{t('career.cta_title')}</p>
            <button
              type="button"
              onClick={() => setApplyFor('mentor')}
              className="relative w-full sm:w-auto inline-flex justify-center items-center gap-2 h-12 px-7 rounded-xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold text-sm transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t('career.apply')}
            </button>
          </div>
        </div>
      </section>

      <EmailApplyDialog
        open={applyFor !== null}
        onClose={() => setApplyFor(null)}
        subject={applyDetails.subject}
        position={applyDetails.position}
      />
    </div>
  );
};
