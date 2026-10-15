import React, { useEffect, useState } from 'react';
import {
  ArrowRight, CalendarClock, Check, ChevronDown, ClipboardCheck, FlaskConical, Info, Mail, MessageCircle,
  SlidersHorizontal, Target, UserCheck,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import type { SpiIconName } from '../illustrations/SpiIcon';
import { LabBanner } from '../lab/LabBanner';
import { CORPORATE_TRACKS, type CorporateTrackKey } from '../../data/corporateTraining';
import { LAB_CATEGORIES } from '../../data/labCategories';

interface CorporateTrainingPageProps {
  /** null = overview of all corporate training. */
  track: CorporateTrackKey | null;
  onNavigate: (path: string) => void;
  onBack: () => void;
}

const FEATURES = [
  { n: 1, icon: SlidersHorizontal },
  { n: 2, icon: CalendarClock },
  { n: 3, icon: Target },
  { n: 4, icon: FlaskConical },
  { n: 5, icon: UserCheck },
  { n: 6, icon: ClipboardCheck },
];

const LAB_ICON: Record<string, SpiIconName> = { ai: 'ai', office: 'office', design: 'creative' };

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean; center?: boolean }> = ({ children, light, center }) => (
  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${light ? 'text-white/85' : 'text-[#1870FF]'} ${center ? 'justify-center' : ''}`}>
    <span className={`w-6 h-[3px] rounded-full ${light ? 'bg-white/70' : 'bg-[#1870FF]'}`} aria-hidden="true" />
    {children}
  </p>
);

/** Corporate training (SPI Lab for Business): overview, or one programme built on an SPI Lab category. */
export const CorporateTrainingPage: React.FC<CorporateTrainingPageProps> = ({ track: trackKey, onNavigate, onBack }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const track = CORPORATE_TRACKS.find((c) => c.key === trackKey) ?? null;
  const lab = track ? LAB_CATEGORIES.find((c) => c.key === track.lab)! : null;
  const others = CORPORATE_TRACKS.filter((c) => c.key !== trackKey);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const programName = track ? track.name : 'Corporate Training';

  useEffect(() => {
    const previous = document.title;
    document.title = `${programName} | SPI Lab for Business`;
    return () => { document.title = previous; };
  }, [programName]);

  const consult = () => openSpiWhatsApp(t('corp.wa_message').replace('{track}', programName));
  const mailHref = `mailto:${SPI_CONFIG.INFO_EMAIL}?subject=${encodeURIComponent(t('corp.mail_subject').replace('{track}', programName))}`;

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.45, delay: Math.min(i, 6) * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  const faqs = [
    { q: t('corp.faq.q1'), a: t('corp.faq.a1') },
    { q: t('corp.faq.q2'), a: t(track ? `corp.${track.key}.who` : 'corp.overview.who') },
    { q: t('corp.faq.q3'), a: t('corp.faq.a3') },
    { q: t('corp.faq.q4'), a: t('corp.faq.a4') },
    ...(track?.key === 'ai' ? [{ q: t('corp.faq.q6'), a: t('corp.faq.a6') }] : []),
    { q: t('corp.faq.q5'), a: t('corp.faq.a5').replace('{email}', SPI_CONFIG.INFO_EMAIL) },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="lab"
        eyebrow="SPI Lab for Business"
        title={
          track
            ? <>{t(`corp.${track.key}.title_a`)} <span className="text-[#1870FF]">{t(`corp.${track.key}.title_b`)}</span></>
            : <>{t('corp.overview.title_a')} <span className="text-[#1870FF]">{t('corp.overview.title_b')}</span></>
        }
        lead={track ? track.name : t('corp.overview.lead')}
        description={t(track ? `corp.${track.key}.desc` : 'corp.overview.desc')}
        art=""
        artAlt=""
        artSlot={<LabBanner kind={track ? track.lab : 'ai'} title={programName} label="SPI Lab for Business" size="lg" />}
        primary={{ label: t('corp.consult'), onClick: consult }}
        secondary={{ label: t('ppage.email'), onClick: () => { window.location.href = mailHref; } }}
        onBack={onBack}
        backLabel={track ? t('corp.back_overview') : t('common.back_home')}
        highlights={
          track && lab
            ? [
                { icon: LAB_ICON[lab.key], label: t('corp.topics').replace('{n}', String(lab.subs.length)) },
                { icon: 'build', label: t('lab.how.s3.title') },
                { icon: 'portfolio', label: t('lab.evidence.title') },
              ]
            : [
                { icon: 'office', label: 'Office & Productivity' },
                { icon: 'ai', label: 'AI for Work' },
                { icon: 'community', label: t('corp.feat.1.title') },
              ]
        }
        footnote={
          <p className="flex items-start gap-2 text-xs sm:text-sm text-slate-500 max-w-xl">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#1870FF]" aria-hidden="true" />
            {t('corp.status')}
          </p>
        }
      />

      {/* Overview: the programmes */}
      {!track && (
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-3 mb-8 sm:mb-10">
              <Eyebrow>{t('corp.programs.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight">{t('corp.programs.title')}</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {CORPORATE_TRACKS.map((c, i) => (
                <motion.li key={c.key} {...reveal(i)}>
                  <button
                    type="button"
                    onClick={() => onNavigate(c.path)}
                    className="group w-full h-full text-left rounded-[28px] border border-[#E3ECFA] bg-white p-3 sm:p-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/50 hover:shadow-[0_30px_60px_-32px_rgba(4,26,90,0.55)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                  >
                    <span className="block overflow-hidden rounded-[20px]">
                      <LabBanner kind={c.lab} title={c.name} label="SPI Lab for Business" size="md" className="transition-transform duration-500 group-hover:scale-[1.03]" />
                    </span>
                    <span className="block px-2 sm:px-3 pt-5 pb-3">
                      <span className="block text-xl sm:text-2xl font-black text-[#041A5A]">{c.name}</span>
                      <span className="mt-2 block text-sm sm:text-base text-slate-600 leading-relaxed">{t(`corp.${c.key}.desc`)}</span>
                      <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#EEF4FF] group-hover:bg-[#1870FF] px-4 py-2 text-sm font-bold text-[#1870FF] group-hover:text-white transition-colors">
                        {t('corp.view')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('/program/spi-lab')}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {t('corp.programs.more')}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      {/* Track: does your team face this? */}
      {track && (
        <section className="py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
              <Eyebrow center>{t('corp.pain.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight">{t('corp.pain.title')}</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {track.painIcons.map((Icon, i) => (
                <motion.li
                  key={i}
                  {...reveal(i)}
                  className="group relative overflow-hidden rounded-[24px] border border-[#E3ECFA] bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-[#FFC928]" aria-hidden="true" />
                  <span className="w-12 h-12 rounded-2xl bg-[#FFF6D6] text-[#B07A00] flex items-center justify-center">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`corp.${track.key}.pain${i + 1}.title`)}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`corp.${track.key}.pain${i + 1}.desc`)}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Track: what the programme focuses on + topics to choose from */}
      {track && lab && (
        <section className="pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <motion.div {...reveal()} className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <Eyebrow>{t('corp.focus.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('corp.focus.title').replace('{name}', track.name)}</h2>
              <p className="text-base text-slate-600 leading-relaxed">{t('corp.focus.desc')}</p>
              <ul className="space-y-3">
                {track.focusKeys.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-[#041A5A]">
                    <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#1870FF] text-white flex items-center justify-center"><Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" /></span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...reveal(1)} className="lg:col-span-7 relative overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-5 sm:p-8">
              <div
                className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_15%,transparent_75%)]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '34px 34px' }}
                aria-hidden="true"
              />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-black">{t('corp.areas.title')}</h3>
                <ul className={`mt-5 grid grid-cols-1 gap-3 ${lab.subs.length > 3 ? 'sm:grid-cols-2' : ''}`}>
                  {lab.subs.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <li key={sub.key} className="flex gap-3 rounded-2xl bg-white text-[#041A5A] p-4">
                        <span className="w-10 h-10 shrink-0 rounded-xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                        <span className="min-w-0">
                          <span className="block text-sm sm:text-base font-black leading-snug">{sub.name}</span>
                          {sub.tools && (
                            <span className="mt-1 flex flex-wrap gap-1">
                              {sub.tools.map((tool) => (
                                <span key={tool} className="rounded-md bg-[#EEF4FF] px-1.5 py-0.5 text-[10px] font-bold text-[#1870FF]">{tool}</span>
                              ))}
                            </span>
                          )}
                          <span className="mt-1 block text-xs sm:text-sm text-slate-600 leading-relaxed">{t(`lab.sub.${sub.key}`)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Shaped around the company */}
      <section className="py-14 sm:py-20 bg-[#F5F9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-8 sm:mb-10">
            <Eyebrow>{t('corp.feat.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('corp.feat.title')}</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(({ n, icon: Icon }, i) => (
              <motion.li
                key={n}
                {...reveal(i)}
                className="group rounded-[24px] bg-white border border-[#E3ECFA] p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/40 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
              >
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1870FF] to-[#0F56D1] text-white flex items-center justify-center shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)] transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`corp.feat.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`corp.feat.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI: responsible use; Office: evidence of learning */}
      {track && (
        <section className="py-14 sm:py-20 bg-[#041A5A] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {track.key === 'ai' ? (
              <>
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9CC2FF]">{t('lab.safety.eyebrow')}</p>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance">{t('lab.safety.title')}</h2>
                  <p className="text-base text-blue-100/80 leading-relaxed">{t('lab.safety.desc')}</p>
                </div>
                <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <li key={n} className="flex gap-3 border-t border-white/15 pt-4 text-sm text-blue-50/90 leading-relaxed">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[#1870FF] flex items-center justify-center mt-0.5" aria-hidden="true">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {t(`lab.safety.${n}`)}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <div className="lg:col-span-5 space-y-4">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9CC2FF]">{t('lab.how.eyebrow')}</p>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-balance">{t('lab.evidence.title')}</h2>
                  <p className="text-base text-blue-100/80 leading-relaxed">{t('lab.evidence.note')}</p>
                </div>
                <ul className="lg:col-span-7 flex flex-wrap content-start gap-2.5">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <li key={n} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FFC928]" aria-hidden="true" />
                      {t(`lab.evidence.${n}`)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

      {/* Three steps to start */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <Eyebrow center>{t('corp.steps.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight">{t('corp.steps.title')}</h2>
          </div>
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <span className="hidden md:block absolute left-[16%] right-[16%] top-[30px] border-t-2 border-dashed border-[#C9DAF7]" aria-hidden="true" />
            {[1, 2, 3].map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="relative rounded-2xl bg-white border border-[#E3ECFA] p-5 md:border-0 md:bg-transparent md:pt-0 md:text-center flex md:flex-col md:items-center gap-4">
                <span className="shrink-0 w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#1870FF] text-white text-lg font-black flex items-center justify-center tabular-nums ring-8 ring-white shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)]" aria-hidden="true">{n}</span>
                <span>
                  <span className="block text-base sm:text-lg font-black text-[#041A5A]">{t(`corp.steps.${n}.title`)}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed mt-1">{t(`corp.steps.${n}.desc`)}</span>
                </span>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={consult}
              className="group inline-flex items-center gap-2 h-12 sm:h-14 px-8 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-black uppercase tracking-wider text-sm shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('corp.steps.cta')}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-14 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight mb-8">FAQ</h2>
          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <li key={f.q} className={`rounded-2xl border transition-colors ${open ? 'border-[#1870FF]/40 bg-[#F5F9FF]' : 'border-[#E3ECFA] bg-white'}`}>
                  <button
                    type="button"
                    id={`corp-faq-${i}`}
                    aria-expanded={open}
                    aria-controls={`corp-faq-panel-${i}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    <span className="text-sm sm:text-base font-black text-[#041A5A]">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-[#1870FF] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  <div
                    id={`corp-faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`corp-faq-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Other programme */}
      {track && others.length > 0 && (
        <section className="pb-14 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight mb-6">{t('corp.other')}</h2>
            {others.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => onNavigate(c.path)}
                className="group w-full text-left grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 md:gap-8 items-center rounded-[28px] border border-[#E3ECFA] bg-[#F7F9FE] p-3 sm:p-4 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:bg-white hover:border-[#1870FF]/50 hover:shadow-[0_30px_60px_-32px_rgba(4,26,90,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <span className="block overflow-hidden rounded-[20px]">
                  <LabBanner kind={c.lab} title={c.name} label="SPI Lab for Business" size="md" className="transition-transform duration-500 group-hover:scale-[1.03]" />
                </span>
                <span className="block pr-2 pb-2 md:pb-0">
                  <span className="block text-xl sm:text-2xl font-black text-[#041A5A]">{c.name}</span>
                  <span className="mt-2 block text-sm sm:text-base text-slate-600 leading-relaxed">{t(`corp.${c.key}.desc`)}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#1870FF]">
                    {t('corp.view')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-7 sm:p-12 text-center">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
            aria-hidden="true"
          />
          <div className="absolute -right-40 -top-40 w-[520px] h-[520px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-balance">{t('corp.final.title')}</h2>
            <p className="text-sm sm:text-lg text-blue-50/90">{t('corp.final.desc')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={consult}
                className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('corp.consult')}
              </button>
              <a
                href={mailHref}
                className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                {SPI_CONFIG.INFO_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

