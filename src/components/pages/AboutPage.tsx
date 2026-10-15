import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface AboutPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate?: (path: string) => void;
}

const PILLARS: { key: 'vision' | 'mission' | 'quality'; icon: SpiIconName }[] = [
  { key: 'vision', icon: 'strategic' },
  { key: 'mission', icon: 'projects' },
  { key: 'quality', icon: 'assessment' },
];

const STAGES = ['think', 'build', 'innovate'] as const;

const PRODUCTS: { key: 'core' | 'lab' | 'engineering' | 'inschool'; link: string }[] = [
  { key: 'core', link: '/program/spi-core' },
  { key: 'lab', link: '/program/spi-lab' },
  { key: 'engineering', link: '/program/spi-engineering' },
  { key: 'inschool', link: '/program/spi-inschool' },
];

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${light ? 'text-white/85' : 'text-[#1870FF]'}`}>
    <span className={`w-6 h-[3px] rounded-full ${light ? 'bg-white/70' : 'bg-[#1870FF]'}`} aria-hidden="true" />
    {children}
  </p>
);

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  });

  const scrollToEcosystem = () => document.getElementById('about-ecosystem')?.scrollIntoView({ behavior: 'smooth' });
  const [p3Before, p3After] = t('about.why.p3').split('{path}');

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#1870FF] selection:text-white">
      <IllustratedHero
        variant="about"
        eyebrow={t('nav.about_spi')}
        title={<>{t('about.hero.title_a')} <span className="text-[#1870FF]">{t('about.hero.title_b')}</span></>}
        lead={t('about.hero.lead')}
        description={t('about.hero.desc')}
        art={ASSETS.learning.aiProject}
        artAlt={t('about.hero.art_alt')}
        primary={{ label: t('about.cta.button'), onClick: onOpenTrial }}
        secondary={{ label: t('about.hero.cta_programs'), onClick: scrollToEcosystem }}
        onBack={onBack}
        backLabel={t('lab.back')}
        badges={STAGES.map((k) => ({ icon: k, title: t(`method.${k}.title`) }))}
        highlights={[
          { icon: 'think', label: t('about.phil.think.sub') },
          { icon: 'terminal', label: t('about.phil.build.sub') },
          { icon: 'innovate', label: t('about.phil.innovate.sub') },
        ]}
      />

      {/* Vision · Mission · Quality */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>{t('about.pillars.eyebrow')}</Eyebrow>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map(({ key, icon }, i) => (
              <motion.li
                key={key}
                {...reveal(i)}
                className="group relative overflow-hidden rounded-[24px] border border-[#E3ECFA] bg-white p-6 sm:p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#1870FF]/40 hover:shadow-[0_24px_48px_-28px_rgba(4,26,90,0.45)]"
              >
                <span className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#F3F7FF] transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
                <span className="relative w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mb-5">
                  <SpiIcon name={icon} size={44} />
                </span>
                <h2 className="relative text-xl font-black text-[#041A5A]">{t(`about.${key}.title`)}</h2>
                <p className="relative mt-2 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{t(`about.${key}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why SPI exists */}
      <section className="pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div {...reveal()} className="lg:col-span-6 space-y-5">
            <Eyebrow>{t('about.why.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('about.why.title')}</h2>
            <div className="space-y-4 text-base text-slate-600 leading-relaxed">
              <p>{t('about.why.p1')}</p>
              <p>{t('about.why.p2')}</p>
              <p>
                {p3Before}
                <strong className="text-[#041A5A]">Computational Thinking → Programming → Innovation Engineering</strong>
                {p3After}
              </p>
            </div>
          </motion.div>
          <motion.div {...reveal(1)} className="lg:col-span-6 relative">
            <span className="absolute -inset-4 rounded-[36px] bg-[#EEF4FF] rotate-2" aria-hidden="true" />
            <div className="relative rounded-[28px] overflow-hidden border-4 border-white shadow-[0_40px_80px_-40px_rgba(4,26,90,0.6)]">
              <ImageWithFallback src={ASSETS.about.philosophy} alt={t('about.why.image_alt')} className="w-full aspect-[3/2]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Think → Build → Innovate on Electric Blue */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-10 sm:px-10 sm:py-14 shadow-[0_40px_80px_-40px_rgba(24,112,255,0.75)]">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div className="absolute -right-40 -top-40 w-[560px] h-[560px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>
          <div className="relative">
            <div className="max-w-2xl">
              <Eyebrow light>{t('about.phil.eyebrow')}</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Think → Build → Innovate</h2>
              <p className="mt-3 text-base text-blue-50/90 leading-relaxed">{t('about.phil.desc')}</p>
            </div>
            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {STAGES.map((k, i) => (
                <motion.li key={k} {...reveal(i)} className="relative rounded-[24px] bg-white text-[#041A5A] p-6 shadow-[0_24px_50px_-30px_rgba(2,18,70,0.7)]">
                  <div className="flex items-center justify-between">
                    <span className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                      <SpiIcon name={k} size={40} animate="always" />
                    </span>
                    <span className="text-4xl font-black text-[#EEF4FF] tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{t(`method.${k}.title`)}</h3>
                  <p className="text-sm font-bold text-[#1870FF]">{t(`about.phil.${k}.sub`)}</p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{t(`about.phil.${k}.desc`)}</p>
                  {i < STAGES.length - 1 && (
                    <span className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#FFC928] text-[#041A5A] items-center justify-center shadow" aria-hidden="true">
                      <ArrowRight className="w-4 h-4" strokeWidth={3} />
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Product ecosystem */}
      <section id="about-ecosystem" className="py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <Eyebrow>{t('about.eco.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('about.eco.title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('about.eco.desc')}</p>
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {PRODUCTS.map(({ key, link }, i) => (
              <motion.li key={key} {...reveal(i % 2)}>
                <button
                  type="button"
                  onClick={() => onNavigate?.(link)}
                  disabled={!onNavigate}
                  className="group w-full h-full text-left rounded-[24px] border border-[#E3ECFA] bg-white p-6 sm:p-8 transition-[transform,box-shadow,border-color] duration-300 enabled:hover:-translate-y-1 enabled:hover:border-[#1870FF]/40 enabled:hover:shadow-[0_28px_56px_-30px_rgba(4,26,90,0.5)] enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  <span className="flex items-start gap-4">
                    <span className="w-16 h-16 shrink-0 rounded-2xl bg-[#EEF4FF] group-hover:bg-[#1870FF]/10 transition-colors flex items-center justify-center">
                      <SpiIcon name={key} size={44} />
                    </span>
                    <span className="space-y-1">
                      <span className="block text-xl font-black text-[#041A5A]">{t(`prog.${key}.short`)}</span>
                      <span className="block text-xs font-bold text-[#1870FF] uppercase tracking-wider">{t(`about.eco.${key}.pos`)}</span>
                    </span>
                  </span>
                  <span className="mt-5 block text-lg font-bold text-[#041A5A] leading-snug">{t(`about.eco.${key}.headline`)}</span>
                  <span className="mt-2 block text-sm text-slate-600 leading-relaxed">{t(`about.eco.${key}.desc`)}</span>
                  {onNavigate && (
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF]">
                      {t('about.eco.more')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expected impact */}
      <section className="px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal()} className="max-w-6xl mx-auto overflow-hidden rounded-[32px] bg-[#041A5A] text-white grid grid-cols-1 md:grid-cols-2">
          <div className="relative p-8 sm:p-12 lg:p-14 flex flex-col justify-center gap-5">
            <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
              <SpiIcon name="innovate" size={40} />
            </span>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">{t('about.impact.title')}</h2>
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">{t('about.impact.desc')}</p>
          </div>
          <div className="relative min-h-[260px]">
            <ImageWithFallback src={ASSETS.about.impactVisual} alt={t('about.impact.image_alt')} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            aria-hidden="true"
          />
          <img src={ASSETS.brand.pandaMascot} alt="" className="hidden lg:block absolute right-[30%] -bottom-6 w-28 drop-shadow-[0_18px_24px_rgba(2,18,70,0.4)]" />
          <div className="relative max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-balance">{t('about.cta.title')}</h2>
            <p className="mt-2 text-sm sm:text-base text-blue-50/90">{t('about.cta.desc')}</p>
          </div>
          <button
            type="button"
            onClick={onOpenTrial}
            className="relative w-full sm:w-auto inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
          >
            {t('about.cta.button')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
