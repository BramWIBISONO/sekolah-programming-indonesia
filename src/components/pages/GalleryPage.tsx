import React, { useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { asset } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { GALLERY_CATEGORIES } from '../../data/gallery';
import { GalleryArt } from '../illustrations/GalleryArt';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface GalleryPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const EXPECT: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'curiosity' },
  { n: 2, icon: 'projects' },
  { n: 3, icon: 'community' },
];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1870FF]">
    <span className="w-6 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
    {children}
  </p>
);

/** Documentation gallery: categories are ready and each one fills in as its photos are grouped. */
export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${t('gallery.nav')} | Sekolah Programming Indonesia`;
    return () => { document.title = previous; };
  }, []);

  const join = () => openSpiWhatsApp(t('gallery.wa_message'));

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay: Math.min(i, 6) * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="gallery"
        eyebrow={t('gallery.eyebrow')}
        title={<>{t('gallery.hero.title_a')} <span className="text-[#1870FF]">{t('gallery.hero.title_b')}</span></>}
        lead={t('gallery.hero.lead')}
        description={t('gallery.hero.desc')}
        artSlot={
          <GalleryArt
            labels={{ preschool: t('gallery.cat.preschool'), robotics: t('gallery.cat.robotics'), empty: t('gallery.card.soon') }}
          />
        }
        primary={{ label: t('cta.free_trial'), onClick: onOpenTrial }}
        secondary={{ label: t('gallery.wa'), onClick: join }}
        onBack={onBack}
        backLabel={t('lab.back')}
      />

      {/* what the gallery will hold */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-10">
            <Eyebrow>{t('gallery.expect.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('gallery.expect.title')}</h2>
          </motion.div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {EXPECT.map(({ n, icon }, i) => (
              <motion.li key={n} {...reveal(i)} className="rounded-[24px] bg-white border border-[#E3ECFA] p-6">
                <span className="w-12 h-12 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                  <SpiIcon name={icon} size={30} animate="hover" />
                </span>
                <h3 className="mt-4 text-lg font-black text-[#041A5A]">{t(`gallery.expect.${n}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{t(`gallery.expect.${n}.desc`)}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* categories */}
      <section className="py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-6">
            <Eyebrow>{t('gallery.cats.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('gallery.cats.title')}</h2>
          </motion.div>

          <motion.div {...reveal(1)} className="mb-10 flex items-center gap-3">
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#DCE7FB]" aria-hidden="true">
              <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-[#1870FF] to-[#FFC928] spi-anim-sweep" />
            </div>
            <span className="whitespace-nowrap text-xs sm:text-sm font-bold text-[#041A5A]">{t('gallery.badge.sub')}</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {GALLERY_CATEGORIES.map((cat, i) => (
              <motion.article
                key={cat.key}
                {...reveal(i)}
                className="rounded-[28px] bg-white border border-[#E3ECFA] p-5 sm:p-6 shadow-[0_24px_50px_-34px_rgba(4,26,90,0.45)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-11 h-11 shrink-0 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                      <SpiIcon name={cat.icon} size={28} animate="hover" />
                    </span>
                    <h3 className="truncate text-lg font-black text-[#041A5A]">{t(cat.titleKey)}</h3>
                  </div>
                  {cat.images.length === 0 && (
                    <span className="shrink-0 rounded-full bg-[#FFC928] px-3 py-1 text-[11px] font-black text-[#041A5A]">{t('gallery.badge.title')}</span>
                  )}
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cat.images.length > 0
                    ? cat.images.map((img) => (
                        <figure key={img.src} className="overflow-hidden rounded-2xl bg-[#F5F9FF]">
                          <img src={asset(img.src)} alt={img.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                          {img.caption && <figcaption className="px-2 py-1.5 text-xs font-semibold text-slate-600">{img.caption}</figcaption>}
                        </figure>
                      ))
                    : [0, 1, 2].map((slot) => (
                        <div key={slot} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dashed border-[#C9DAF7] bg-[#F5F9FF]">
                          <span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent spi-anim-sweep" aria-hidden="true" />
                          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-2 text-center">
                            <SpiIcon name="portfolio" size={22} animate="none" />
                            <span className="text-[11px] font-bold text-slate-400">{t('gallery.card.soon')}</span>
                          </span>
                        </div>
                      ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* closing call to action */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="relative max-w-6xl mx-auto overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-10 sm:px-10 sm:py-14">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div className="relative max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('gallery.cta.title')}</h2>
            <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed">{t('gallery.cta.desc')}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenTrial}
                className="group inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
              >
                {t('cta.free_trial')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={join}
                className="inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('gallery.wa')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
