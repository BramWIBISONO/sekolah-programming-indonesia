import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { asset } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { GALLERY_CATEGORIES, GALLERY_PHOTOS, type GalleryCategoryKey, type GalleryPhoto } from '../../data/gallery';
import { GalleryArt } from '../illustrations/GalleryArt';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface GalleryPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate: (path: string) => void;
}

type Filter = GalleryCategoryKey | 'all';

/** Photos added per "show more" press. */
const PAGE_SIZE = 24;

/** One photo tile. The photo is a background, so it cannot be dragged or saved from the right-click menu. */
const PhotoCard: React.FC<{ photo: GalleryPhoto; onOpen: () => void }> = ({ photo, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    onContextMenu={blockMenu}
    className="group mb-3 sm:mb-5 flex w-full break-inside-avoid flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_18px_40px_-30px_rgba(4,26,90,0.6)] ring-1 ring-[#E3ECFA] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-28px_rgba(4,26,90,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] cursor-zoom-in"
    style={PROTECT}
  >
    <span
      role="img"
      aria-label={photo.alt}
      onDragStart={blockMenu}
      className="block w-full bg-[#EEF4FF] bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      style={{ ...PROTECT, aspectRatio: `${photo.width} / ${photo.height}`, backgroundImage: `url("${asset(photo.thumb)}")` }}
    />
    <span className="block truncate px-3.5 py-2.5 text-xs font-semibold text-slate-600">{photo.caption}</span>
  </button>
);

const EXPECT: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'curiosity' },
  { n: 2, icon: 'projects' },
  { n: 3, icon: 'community' },
];

/**
 * Photos are drawn as backgrounds, not <img>, so there is no image to drag or to pick from the right-click menu.
 * Long-press on iPhone and Android is blocked too. This only deters casual saving: a screenshot still works.
 */
const PROTECT: React.CSSProperties = { WebkitTouchCallout: 'none', userSelect: 'none', WebkitUserSelect: 'none' };
const blockMenu = (e: React.SyntheticEvent) => e.preventDefault();

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1870FF]">
    <span className="w-6 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
    {children}
  </p>
);

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onIndex: (next: number) => void;
  onClose: () => void;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  dialogLabel: string;
}

/** Full-screen photo viewer: arrows, Escape, Tab kept inside the dialog, and horizontal swipe on touch. */
const Lightbox: React.FC<LightboxProps> = ({ photos, index, onIndex, onClose, closeLabel, prevLabel, nextLabel, dialogLabel }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const photo = photos[index];
  const step = (d: number) => onIndex((index + d + photos.length) % photos.length);

  // Lock page scroll, move focus into the dialog, and give focus back when it closes.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index + 1) % photos.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + photos.length) % photos.length);
      else if (e.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, photos.length, onClose, onIndex]);

  const navButton =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';
  const ratio = photo.width / photo.height;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      className="fixed inset-0 z-[100] flex flex-col bg-[#041A5A]/95"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 text-white">
        <p className="min-w-0 truncate text-sm font-semibold">{photo.caption}</p>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-xs tabular-nums text-blue-100">{index + 1} / {photos.length}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-20 pb-6">
        {photos.length > 1 && (
          <button type="button" onClick={() => step(-1)} aria-label={prevLabel} className={`${navButton} left-2 sm:left-6`}>
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
        <div
          key={photo.id}
          role="img"
          aria-label={photo.alt}
          onContextMenu={blockMenu}
          onDragStart={blockMenu}
          className="rounded-xl bg-no-repeat bg-center bg-cover"
          style={{
            ...PROTECT,
            width: `min(calc(100vw - 7rem), calc((100vh - 9rem) * ${ratio}))`,
            aspectRatio: `${photo.width} / ${photo.height}`,
            backgroundImage: `url("${asset(photo.src)}")`,
          }}
        />
        {photos.length > 1 && (
          <button type="button" onClick={() => step(1)} aria-label={nextLabel} className={`${navButton} right-2 sm:right-6`}>
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

/** Documentation gallery: a 3D photo ring in the hero, filter by category, featured stories, and photos at their own proportions. */
export const GalleryPage: React.FC<GalleryPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previous = document.title;
    document.title = `${t('gallery.nav')} | Sekolah Programming Indonesia`;
    return () => { document.title = previous; };
  }, []);

  const hasPhotos = GALLERY_PHOTOS.length > 0;
  const join = () => openSpiWhatsApp(t('gallery.wa_message'));

  // Photos in display order. Only the first `limit` are rendered, so the page stays light with a large collection.
  const visible = useMemo(
    () => (filter === 'all' ? GALLERY_PHOTOS : GALLERY_PHOTOS.filter((p) => p.category === filter)),
    [filter],
  );
  const indexById = useMemo(() => new Map(visible.map((p, i) => [p.id, i])), [visible]);
  // consecutive photos from the same album form one section
  const sections = useMemo(() => {
    const groups: { key: string; title: string; category: GalleryCategoryKey; items: { photo: GalleryPhoto; index: number }[] }[] = [];
    visible.slice(0, limit).forEach((photo, index) => {
      const last = groups[groups.length - 1];
      if (last && last.key === photo.section) last.items.push({ photo, index });
      else groups.push({ key: photo.section, title: photo.section_title, category: photo.category, items: [{ photo, index }] });
    });
    return groups;
  }, [visible, limit]);
  const totalFor = (key: string) => visible.filter((p) => p.section === key).length;

  const countFor = (key: Filter) => (key === 'all' ? GALLERY_PHOTOS.length : GALLERY_PHOTOS.filter((p) => p.category === key).length);

  const reveal = (i = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay: Math.min(i, 6) * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  });

  const scrollToGallery = () => {
    document.getElementById('galeri-foto')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('gallery.filter.all') },
    ...GALLERY_CATEGORIES.map((c) => ({ key: c.key as Filter, label: t(c.titleKey) })),
  ];

  const openPhoto = (photo: GalleryPhoto) => setOpenIndex(indexById.get(photo.id) ?? null);

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="gallery"
        quiet
        eyebrow={t('gallery.eyebrow')}
        title={<>{t('gallery.hero.title_a')} <span className="text-[#1870FF]">{t('gallery.hero.title_b')}</span></>}
        lead={t('gallery.hero.lead')}
        description={t('gallery.hero.desc')}
        artSlot={
          <GalleryArt
            labels={{ learning: t('gallery.cat.learning'), projects: t('gallery.cat.projects'), empty: t('gallery.card.soon') }}
          />
        }
        primary={{ label: t('gallery.hero.cta_explore'), onClick: scrollToGallery }}
        secondary={{ label: t('gallery.hero.cta_programs'), onClick: () => onNavigate('/program/spi-core') }}
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

      {/* photos */}
      <section id="galeri-foto" className="scroll-mt-24 py-14 sm:py-20 bg-[#F7F9FE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal()} className="max-w-2xl space-y-3 mb-6">
            <Eyebrow>{t('gallery.cats.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('gallery.cats.title')}</h2>
          </motion.div>

          {!hasPhotos && (
            <motion.div {...reveal(1)} className="mb-10 flex items-center gap-3">
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[#DCE7FB]" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-[#1870FF] to-[#FFC928] spi-anim-sweep" />
              </div>
              <span className="whitespace-nowrap text-xs sm:text-sm font-bold text-[#041A5A]">{t('gallery.badge.sub')}</span>
            </motion.div>
          )}

          {/* category filter */}
          <div role="group" aria-label={t('gallery.filter.aria')} className="mb-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {filters.map(({ key, label }) => {
              const active = filter === key;
              const count = countFor(key);
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => { setFilter(key); setLimit(PAGE_SIZE); }}
                  className={`shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 cursor-pointer ${
                    active
                      ? 'bg-[#1870FF] border-[#1870FF] text-white'
                      : 'bg-white border-[#C9DAF7] text-[#041A5A] hover:border-[#1870FF]'
                  }`}
                >
                  {label}
                  {hasPhotos && (
                    <span className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${active ? 'bg-white/20 text-white' : 'bg-[#EEF4FF] text-[#041A5A]'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!hasPhotos ? (
            // no published photo yet: keep one "coming soon" tile per category
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
                    <span className="shrink-0 rounded-full bg-[#FFC928] px-3 py-1 text-[11px] font-black text-[#041A5A]">{t('gallery.badge.title')}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[0, 1, 2].map((slot) => (
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
          ) : visible.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-[#C9DAF7] bg-white p-10 text-center text-sm font-semibold text-slate-500">
              {t('gallery.filter.empty')}
            </div>
          ) : (
            <>
              <div className="space-y-16 sm:space-y-20">
                {sections.map((section) => {
                  const category = GALLERY_CATEGORIES.find((c) => c.key === section.category);
                  return (
                    <div key={section.key}>
                      <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#DCE7FB] pb-4">
                        <div className="min-w-0">
                          {category && (
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1870FF]">{t(category.titleKey)}</p>
                          )}
                          <h3 className="mt-1 text-xl sm:text-2xl font-black text-[#041A5A] text-balance">{section.title}</h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold tabular-nums text-slate-500 ring-1 ring-[#E3ECFA]">
                          {totalFor(section.key)} {t('gallery.photos_label')}
                        </span>
                      </header>
                      {/* CSS columns keep every photo at its own proportions: nothing is stretched or cropped */}
                      <div className="columns-2 lg:columns-3 gap-3 sm:gap-5">
                        {section.items.map(({ photo, index }) => (
                          <PhotoCard key={photo.id} photo={photo} onOpen={() => setOpenIndex(index)} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {limit < visible.length && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setLimit((n) => n + PAGE_SIZE)}
                    className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[#1870FF] px-7 font-bold text-white shadow-[0_18px_36px_-18px_rgba(24,112,255,0.8)] transition-colors hover:bg-[#0F5FE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 cursor-pointer"
                  >
                    {t('gallery.more')}
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] tabular-nums">{visible.length - limit}</span>
                  </button>
                </div>
              )}
            </>
          )}
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

      {openIndex !== null && visible[openIndex] && (
        <Lightbox
          photos={visible}
          index={openIndex}
          onIndex={setOpenIndex}
          onClose={() => setOpenIndex(null)}
          closeLabel={t('gallery.lightbox.close')}
          prevLabel={t('gallery.lightbox.prev')}
          nextLabel={t('gallery.lightbox.next')}
          dialogLabel={t('gallery.lightbox.label')}
        />
      )}
    </div>
  );
};
