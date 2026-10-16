import React, { useEffect } from 'react';
import { ArrowRight, BarChart3, Check, FileText, Image as ImageIcon, Info, Music, MessageCircle, Video, Workflow, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface AILiteracyPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const COMPETENCIES: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'ai' },
  { n: 2, icon: 'think' },
  { n: 3, icon: 'curriculum' },
  { n: 4, icon: 'assessment' },
  { n: 5, icon: 'creator' },
  { n: 6, icon: 'community' },
];

const PATH: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'think' },
  { n: 2, icon: 'ai' },
  { n: 3, icon: 'build' },
];

const STAGES: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'curiosity' },
  { n: 2, icon: 'solver' },
  { n: 3, icon: 'assessment' },
  { n: 4, icon: 'build' },
  { n: 5, icon: 'innovate' },
];

const EVIDENCE = [1, 2, 3, 4, 5, 6, 7];
const PRINCIPLES = [1, 2, 3];

const WHO: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'grad' },
  { n: 2, icon: 'teacher' },
  { n: 3, icon: 'inschool' },
  { n: 4, icon: 'community' },
];

const PILLARS: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'ecosystem' },
  { n: 2, icon: 'curriculum' },
  { n: 3, icon: 'teacher' },
  { n: 4, icon: 'inschool' },
  { n: 5, icon: 'assessment' },
  { n: 6, icon: 'strategic' },
];

const PHASES = [1, 2, 3, 4, 5];
const STEPS: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'pin' },
  { n: 2, icon: 'teacher' },
  { n: 3, icon: 'ecosystem' },
];
const SAFETY: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'assessment' },
  { n: 2, icon: 'solver' },
  { n: 3, icon: 'curriculum' },
  { n: 4, icon: 'community' },
];
const CMP_ROWS = [1, 2, 3, 4, 5, 6, 7];
const WHY_LIST = [1, 2, 3, 4, 5, 6, 7];
const RISKS = [1, 2, 3];
const NOW_REASONS = [1, 2, 3];
const ROLES = ['school', 'community', 'parent'] as const;
const CHECKLIST = [1, 2, 3];
const SHOWCASE: { n: number; Icon: LucideIcon }[] = [
  { n: 1, Icon: Music },
  { n: 2, Icon: ImageIcon },
  { n: 3, Icon: Video },
  { n: 4, Icon: FileText },
  { n: 5, Icon: BarChart3 },
  { n: 6, Icon: Workflow },
];
const WHY_BLOCKS: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'ecosystem' },
  { n: 2, icon: 'community' },
  { n: 3, icon: 'strategic' },
  { n: 4, icon: 'briefcase' },
];
const FW_MODES: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'think' },
  { n: 2, icon: 'assessment' },
  { n: 3, icon: 'build' },
];

/** Kick-off date: 28 Oktober 2026, Hari Sumpah Pemuda. Month index 9 is October. */
const KICKOFF = new Date(2026, 9, 28);

/** Whole days from today until the kick-off, or null once it has passed (the countdown then disappears). */
const daysUntilKickoff = (): number | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((KICKOFF.getTime() - today.getTime()) / 86400000);
  return days >= 0 ? days : null;
};

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${light ? 'text-white/85' : 'text-[#1870FF]'}`}>
    <span className={`w-6 h-[3px] rounded-full ${light ? 'bg-white/70' : 'bg-[#1870FF]'}`} aria-hidden="true" />
    {children}
  </p>
);

/** Gerakan AI Literacy Indonesia: what it is, the competencies, the pathway, how to join. */
export const AILiteracyPage: React.FC<AILiteracyPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${t('ail.nav')} | Sekolah Programming Indonesia`;
    return () => { document.title = previous; };
  }, []);

  const join = () => openSpiWhatsApp(t('ail.wa_message'));
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay: Math.min(i, 6) * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  const daysLeft = daysUntilKickoff();

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="literacy"
        eyebrow={t('ail.eyebrow')}
        title={<>{t('ail.hero.title_a')} <span className="text-[#1870FF]">{t('ail.hero.title_b')}</span></>}
        lead={t('ail.hero.lead')}
        description={t('ail.hero.desc')}
        artSlot={<AILiteracyArt className="w-full h-auto block" animate={!reduce} />}
        primary={{ label: t('ail.hero.join'), onClick: join }}
        secondary={{ label: t('ail.hero.learn'), onClick: () => scrollTo('ail-why') }}
        onBack={onBack}
        backLabel={t('lab.back')}
        badges={[
          { icon: 'ai', title: t('ail.kickoff.label'), sub: t('ail.kickoff.date') },
          ...(daysLeft !== null ? [{ icon: 'curiosity' as const, title: String(daysLeft), sub: t('ail.cd.label') }] : []),
        ]}
        highlights={[
          { icon: 'think', label: t('ail.hl.understand') },
          { icon: 'assessment', label: t('ail.hl.evaluate') },
          { icon: 'innovate', label: t('ail.hl.create') },
        ]}
        footnote={
          <p className="flex items-start gap-2 text-xs sm:text-sm text-slate-500 max-w-xl">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#1870FF]" aria-hidden="true" />
            {t('ail.status')}
          </p>
        }
      />

      {/* What happens if we wait */}
      <section className="py-14 sm:py-20 bg-[#041A5A] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-3xl space-y-3 mb-10">
            <Eyebrow light>{t('ail.risk.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('ail.risk.title')}</h2>
          </motion.div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {RISKS.map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white/[0.07] border border-white/15 p-6">
                <span className="text-3xl font-black text-[#FFC928] tabular-nums" aria-hidden="true">{String(n).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-black">{t(`ail.risk.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-blue-100/85 leading-relaxed">{t(`ail.risk.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why now */}
      <section id="ail-why" className="py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div {...reveal()} className="lg:col-span-5 space-y-5">
            <Eyebrow>{t('ail.why.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.why.title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('ail.why.desc')}</p>
          </motion.div>
          <motion.ul {...reveal(1)} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY_LIST.map((n) => (
              <li key={n} className="flex items-start gap-3 rounded-2xl border border-[#E3ECFA] bg-white px-4 py-3.5 text-sm sm:text-[15px] font-semibold text-[#041A5A]">
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center"><Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" /></span>
                {t(`ail.why.l${n}`)}
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div {...reveal()} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <blockquote className="relative overflow-hidden rounded-[28px] bg-[#1870FF] text-white px-6 py-8 sm:px-12 sm:py-10">
            <div
              className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
              style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
              aria-hidden="true"
            />
            <p className="relative text-xl sm:text-3xl font-black leading-snug tracking-tight text-balance max-w-4xl">“{t('ail.why.quote')}”</p>
          </blockquote>
        </motion.div>
      </section>

      {/* What AI can already do */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.show.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.show.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SHOWCASE.map(({ n, Icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white border border-[#E3ECFA] p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="w-12 h-12 rounded-2xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`ail.show.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.show.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
          <motion.p {...reveal(2)} className="mt-8 text-base sm:text-lg font-bold text-[#041A5A] max-w-3xl">{t('ail.show.note')}</motion.p>
        </div>
      </section>

      {/* Why join: the nation, communities, cities, and your own work */}
      <section className="relative overflow-hidden bg-[#041A5A] text-white py-14 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <motion.div {...reveal()} className="max-w-3xl space-y-4">
            <Eyebrow light>{t('ail.why2.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('ail.why2.title')}</h2>
            <p className="text-base sm:text-lg text-blue-100/85 leading-relaxed">{t('ail.why2.desc')}</p>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {WHY_BLOCKS.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white/[0.07] border border-white/15 p-6">
                <span className="w-12 h-12 rounded-2xl bg-white text-[#041A5A] flex items-center justify-center">
                  <SpiIcon name={icon} size={30} animate="hover" />
                </span>
                <h3 className="mt-4 text-lg font-black">{t(`ail.why2.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-blue-100/85 leading-relaxed">{t(`ail.why2.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
          <motion.p {...reveal(2)} className="text-lg sm:text-xl font-black text-[#FFC928] max-w-3xl">{t('ail.why2.close')}</motion.p>
        </div>
      </section>

      {/* Competencies */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.comp.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.comp.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {COMPETENCIES.map(({ n, icon }, i) => (
              <motion.li
                key={n}
                {...reveal(i)}
                className="group rounded-[24px] bg-white border border-[#E3ECFA] p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/40 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
              >
                <span className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center transition-transform duration-300 group-hover:-rotate-6">
                  <SpiIcon name={icon} size={38} />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`ail.comp.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.comp.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reference framework: Digital Promise AI Literacy Framework */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div {...reveal()} className="lg:col-span-5 space-y-5">
            <Eyebrow>{t('ail.fw.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.fw.title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('ail.fw.desc')}</p>
            <a
              href="https://digitalpromise.org/initiative/artificial-intelligence-in-education/ai-literacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {t('ail.fw.source')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
          <div className="lg:col-span-7 space-y-4">
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {FW_MODES.map(({ n, icon }, i) => (
                <motion.li key={n} {...reveal(i)} className="rounded-[24px] border border-[#E3ECFA] bg-white p-5">
                  <span className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center">
                    <SpiIcon name={icon} size={26} animate="none" />
                  </span>
                  <h3 className="mt-4 text-base font-black text-[#041A5A]">{t(`ail.fw.mode.${n}.title`)}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.fw.mode.${n}.desc`)}</p>
                </motion.li>
              ))}
            </ol>
            <motion.p {...reveal(3)} className="rounded-2xl bg-[#F5F9FF] border border-[#E3ECFA] px-5 py-4 text-sm font-semibold text-[#041A5A]">{t('ail.fw.goals')}</motion.p>
          </div>
        </div>
      </section>

      {/* Principle quote */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div {...reveal()} className="lg:col-span-5">
            <Eyebrow>{t('ail.path.eyebrow')}</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.path.title')}</h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">{t('ail.path.desc')}</p>
          </motion.div>
          <ol className="lg:col-span-7 relative grid grid-cols-1 gap-4">
            {PATH.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="relative flex items-start gap-4 rounded-[24px] border border-[#E3ECFA] bg-white p-5 sm:p-6">
                <span className="shrink-0 w-12 h-12 rounded-full bg-[#1870FF] text-white text-lg font-black flex items-center justify-center tabular-nums ring-8 ring-[#EEF4FF] shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)]" aria-hidden="true">{n}</span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2 text-lg font-black text-[#041A5A]">
                    <SpiIcon name={icon} size={24} animate="none" />
                    {t(`ail.path.${n}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t(`ail.path.${n}.desc`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stages */}
      <section className="py-14 sm:py-20 bg-[#041A5A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-3xl space-y-3 mb-10">
            <Eyebrow light>{t('ail.stage.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('ail.stage.title')}</h2>
            <p className="text-sm sm:text-base text-blue-100/85 leading-relaxed">{t('ail.stage.note')}</p>
          </motion.div>
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
            {STAGES.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[22px] bg-white text-[#041A5A] p-5 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={icon} size={30} animate="none" /></span>
                  <span className="text-xs font-black uppercase tracking-widest text-[#1870FF]">{t('ail.stage.label')} {n}</span>
                </div>
                <h3 className="mt-4 text-base font-black leading-snug">{t(`ail.stage.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.stage.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tracking progress */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div {...reveal()} className="lg:col-span-5 space-y-5">
            <Eyebrow>{t('ail.measure.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.measure.title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('ail.measure.desc')}</p>
            <div className="rounded-2xl border border-[#E3ECFA] bg-[#F5F9FF] p-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#041A5A] mb-3">{t('ail.measure.pr_title')}</p>
              <ul className="space-y-2.5">
                {PRINCIPLES.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-sm font-semibold text-[#041A5A]">
                    <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-[#1870FF] text-white flex items-center justify-center"><Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" /></span>
                    {t(`ail.measure.pr${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div {...reveal(1)} className="lg:col-span-7 rounded-[28px] border border-[#E3ECFA] bg-white p-6 sm:p-8 shadow-[0_30px_60px_-40px_rgba(4,26,90,0.45)]">
            <h3 className="text-lg font-black text-[#041A5A]">{t('ail.measure.ev_title')}</h3>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EVIDENCE.map((n) => (
                <li key={n} className="flex items-start gap-3 rounded-2xl bg-[#F5F9FF] px-4 py-3.5 text-sm font-semibold text-[#041A5A]">
                  <span className="mt-1 w-2 h-2 shrink-0 rounded-full bg-[#FFC928]" aria-hidden="true" />
                  {t(`ail.measure.ev${n}`)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* From using to understanding */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.cmp.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.cmp.title')}</h2>
          </motion.div>
          <motion.div {...reveal(1)} className="rounded-[24px] bg-white border border-[#E3ECFA] overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 px-8 py-4 bg-[#F5F9FF] text-xs font-black uppercase tracking-widest">
              <span className="text-slate-500">{t('ail.cmp.from')}</span>
              <span className="w-5" aria-hidden="true" />
              <span className="text-[#1870FF]">{t('ail.cmp.to')}</span>
            </div>
            <ol className="divide-y divide-[#EEF2F8]">
              {CMP_ROWS.map((n) => (
                <li key={n} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-6 items-center px-5 sm:px-8 py-5">
                  <p className="text-sm sm:text-base text-slate-500">
                    <span className="md:hidden text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">{t('ail.cmp.from')}</span>
                    {t(`ail.cmp.r${n}.from`)}
                  </p>
                  <ArrowRight className="hidden md:block w-5 h-5 text-[#1870FF]" aria-hidden="true" />
                  <p className="text-sm sm:text-base font-bold text-[#041A5A]">
                    <span className="md:hidden text-[11px] font-black uppercase tracking-widest text-[#1870FF] block mb-0.5">{t('ail.cmp.to')}</span>
                    {t(`ail.cmp.r${n}.to`)}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Who can take part */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.who.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.who.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHO.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white border border-[#E3ECFA] p-6">
                <span className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={icon} size={30} /></span>
                <h3 className="mt-4 text-base font-black text-[#041A5A]">{t(`ail.who.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.who.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Six pillars */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.pillar.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.pillar.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PILLARS.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="group relative overflow-hidden rounded-[24px] bg-white border border-[#E3ECFA] p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]">
                <span className="absolute inset-x-0 top-0 h-1 bg-[#1870FF]" aria-hidden="true" />
                <span className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={icon} size={30} /></span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`ail.pillar.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.pillar.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phases */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.phase.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.phase.title')}</h2>
            <p className="text-sm text-slate-500">{t('ail.phase.note')}</p>
          </motion.div>
          <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
            <span className="hidden md:block absolute left-[10%] right-[10%] top-6 border-t-2 border-dashed border-[#C9DAF7]" aria-hidden="true" />
            {PHASES.map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="relative rounded-2xl bg-white border border-[#E3ECFA] p-5 md:pt-0 md:border-0 md:bg-transparent">
                <span className="relative z-10 w-12 h-12 rounded-full bg-[#1870FF] text-white text-lg font-black flex items-center justify-center tabular-nums ring-8 ring-white shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)]" aria-hidden="true">{n}</span>
                <h3 className="mt-4 text-base font-black text-[#041A5A]">{t(`ail.phase.${n}.title`)}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t(`ail.phase.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why start now */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.now.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.now.title')}</h2>
          </motion.div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {NOW_REASONS.map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white border border-[#E3ECFA] p-6">
                <span className="text-3xl font-black text-[#1870FF] tabular-nums" aria-hidden="true">{String(n).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`ail.now.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.now.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Checklist before the opening */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div {...reveal()} className="lg:col-span-5 space-y-3">
            <Eyebrow>{t('ail.check.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.check.title')}</h2>
          </motion.div>
          <ol className="lg:col-span-7 space-y-3">
            {CHECKLIST.map((n, i) => (
              <motion.li key={n} {...reveal(i)} className="flex items-start gap-4 rounded-[22px] border border-[#E3ECFA] bg-white p-5 sm:p-6">
                <span className="mt-0.5 w-9 h-9 shrink-0 rounded-xl bg-[#1870FF] text-white flex items-center justify-center" aria-hidden="true">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-black text-[#041A5A]">{t(`ail.check.${n}.title`)}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t(`ail.check.${n}.desc`)}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* How to join */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-10 sm:px-10 sm:py-14">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div className="relative">
            <motion.div {...reveal()} className="max-w-2xl space-y-3">
              <Eyebrow light>{t('ail.steps.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('ail.steps.title')}</h2>
            </motion.div>
            <ol className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {STEPS.map(({ n, icon }, i) => (
                <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white text-[#041A5A] p-6 shadow-[0_24px_50px_-30px_rgba(2,18,70,0.7)]">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={icon} size={30} animate="none" /></span>
                    <span className="text-3xl font-black text-[#EEF4FF] tabular-nums" aria-hidden="true">{String(n).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-black">{t(`ail.steps.${n}.title`)}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`ail.steps.${n}.desc`)}</p>
                </motion.li>
              ))}
            </ol>
            <div className="relative mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => openSpiWhatsApp(t(`ail.wa.${role}`))}
                  className={`inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF] ${
                    role === 'parent'
                      ? 'border border-white/60 bg-white/10 hover:bg-white/20'
                      : 'bg-white text-[#1870FF] hover:bg-blue-50 shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)]'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t(`ail.join.role.${role}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety principles */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('ail.safe.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('ail.safe.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {SAFETY.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="flex gap-4 rounded-[24px] border border-[#E3ECFA] bg-white p-6">
                <span className="w-12 h-12 shrink-0 rounded-2xl bg-[#EEF4FF] flex items-center justify-center"><SpiIcon name={icon} size={30} /></span>
                <div>
                  <h3 className="text-base font-black text-[#041A5A]">{t(`ail.safe.${n}.title`)}</h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t(`ail.safe.${n}.desc`)}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] bg-[#041A5A] text-white p-7 sm:p-12 text-center">
          <div className="relative max-w-2xl mx-auto space-y-4">
            {daysLeft !== null && (
              <span className="inline-flex items-center rounded-full bg-[#FFC928] px-4 py-1.5 text-xs sm:text-sm font-black text-[#041A5A]">{daysLeft} {t('ail.cd.label')}</span>
            )}
            <h2 className="text-2xl sm:text-4xl font-black text-balance">{t('ail.final.title')}</h2>
            <p className="text-sm sm:text-lg text-blue-100/90">{t('ail.final.desc')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={join}
                className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041A5A]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('ail.final.wa')}
              </button>
              <button
                type="button"
                onClick={onOpenTrial}
                className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t('cta.free_trial')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
