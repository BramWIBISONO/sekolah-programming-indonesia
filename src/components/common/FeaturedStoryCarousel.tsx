import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';

export interface FeaturedStory {
  id: string;
  image: string;
  /** 'contain' (default) shows the whole image, for posters and screenshots. 'cover' fills the frame, for photos. */
  fit?: 'cover' | 'contain';
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
  action?: { label: string; onClick: () => void };
}

interface FeaturedStoryCarouselProps {
  items: FeaturedStory[];
  label: string;
}

/**
 * One large featured story (image on a blue stage + text), prev/next arrows, and a thumbnail
 * strip to jump between stories. The stage uses a 16:9 frame, the shape of the project posters,
 * so the whole poster is visible. Arrow keys work while focus is inside the carousel.
 */
export const FeaturedStoryCarousel: React.FC<FeaturedStoryCarouselProps> = ({ items, label }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const current = items[index];

  const go = (next: number) => {
    const n = (next + items.length) % items.length;
    setDir(next > index ? 1 : -1);
    setIndex(n);
    const thumb = thumbsRef.current?.children[n] as HTMLElement | undefined;
    thumb?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  if (!current) return null;

  const arrow = 'w-11 h-11 rounded-full bg-[#1870FF] text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(24,112,255,0.9)] hover:bg-[#1059D4] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#041A5A] focus-visible:ring-offset-2';

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey} className="relative">
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
        {/* Image on a blue stage: 16:9, so a poster fits without being cut */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-video rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1870FF] via-[#1463E6] to-[#0F56D1]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <circle cx="360" cy="30" r="90" fill="#fff" opacity="0.08" />
              <circle cx="20" cy="260" r="110" fill="#fff" opacity="0.06" />
              <path d="M60 40q0 14 14 14q-14 0-14 14q0-14-14-14q14 0 14-14z" fill="#FFE38A" />
              <path d="M340 220q0 10 10 10q-10 0-10 10q0-10-10-10q10 0 10-10z" fill="#FFE38A" />
              <path d="M320 60q0 7 7 7q-7 0-7 7q0-7-7-7q7 0 7-7z" fill="#fff" opacity="0.8" />
            </svg>
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={current.id}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-3 sm:inset-5"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className={`h-full w-full rounded-xl shadow-[0_20px_40px_-20px_rgba(4,26,90,0.7)] ${
                    current.fit === 'cover' ? 'object-cover' : 'object-contain'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Story text */}
        <div className="lg:col-span-5 min-h-[180px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {current.badge && (
                <span className="inline-block text-xs font-black uppercase tracking-wider text-[#041A5A] bg-[#FFE38A] rounded-md px-2.5 py-1">
                  {current.badge}
                </span>
              )}
              <h3 className="text-2xl sm:text-3xl font-black text-[#041A5A] leading-tight tracking-tight text-balance">{current.title}</h3>
              {current.subtitle && <p className="text-sm sm:text-base font-bold text-[#1870FF]">{current.subtitle}</p>}
              {current.description && <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{current.description}</p>}
              {current.meta && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{current.meta}</p>}
              {current.action && (
                <button
                  type="button"
                  onClick={current.action.onClick}
                  className="group mt-2 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-[#1870FF] hover:bg-[#1059D4] text-white text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  {current.action.label}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={() => go(index - 1)} aria-label={t('common.previous')} className={arrow}>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label={t('common.next')} className={arrow}>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="ml-1 text-sm font-bold text-slate-400 tabular-nums" aria-hidden="true">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div ref={thumbsRef} className="mt-6 pt-2 flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 hide-scrollbar">
        {items.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i)}
              aria-label={item.title}
              aria-current={selected ? 'true' : undefined}
              className={`relative shrink-0 snap-start w-[44%] sm:w-[30%] lg:w-[calc((100%-4rem)/5)] aspect-video rounded-2xl overflow-hidden bg-[#0F56D1] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 ${
                selected ? 'ring-4 ring-[#1870FF] ring-offset-2' : 'opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={item.image}
                alt=""
                className={`w-full h-full ${item.fit === 'cover' ? 'object-cover' : 'object-contain p-1.5'}`}
                loading="lazy"
                decoding="async"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1870FF]/85 to-transparent p-2.5 pt-6 text-left">
                <span className="block text-[11px] font-black text-white leading-tight line-clamp-2">{item.badge ?? item.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
