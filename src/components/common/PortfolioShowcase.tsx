import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import type { PortfolioItem } from '../../data/portfolio';

interface PortfolioShowcaseProps {
  items: PortfolioItem[];
  /** Plays a video project (opens the site's video modal). */
  onWatch?: (item: PortfolioItem) => void;
}

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || 'S';

/** Portfolio cards in a scrollable row; a card opens a detail dialog. */
export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ items, onWatch }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const rowRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const titleOf = (item: PortfolioItem) => (item.titleKey ? t(item.titleKey) : item.title || '');

  // Track which "page" of cards is visible for the dots.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const p = Math.max(1, Math.round(row.scrollWidth / row.clientWidth));
      setPages(p);
      setPage(Math.min(p - 1, Math.round(row.scrollLeft / row.clientWidth)));
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      row.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items.length]);

  const scrollToPage = (p: number) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollTo({ left: p * row.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Dialog: focus the close button, close on Escape, restore focus to the card.
  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      openerRef.current?.focus();
    };
  }, [selected]);

  const arrow = 'hidden sm:flex absolute top-[30%] z-10 w-12 h-12 rounded-full bg-[#1870FF] text-white items-center justify-center shadow-[0_10px_24px_-10px_rgba(24,112,255,0.9)] hover:bg-[#1059D4] disabled:opacity-40 disabled:cursor-default transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#041A5A] focus-visible:ring-offset-2';

  return (
    <div className="relative">
      <button type="button" onClick={() => scrollToPage(page - 1)} disabled={page === 0} aria-label={t('common.previous')} className={`${arrow} -left-5`}>
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => scrollToPage(page + 1)} disabled={page >= pages - 1} aria-label={t('common.next')} className={`${arrow} -right-5`}>
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>

      <ul ref={rowRef} className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-1 pt-1 pb-4 hide-scrollbar">
        {items.map((item) => (
          <li key={item.id} className="shrink-0 snap-start w-[78%] sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]">
            <button
              type="button"
              onClick={(e) => { openerRef.current = e.currentTarget; setSelected(item); }}
              className="group w-full h-full text-left rounded-[20px] bg-white border border-[#E3ECFA] shadow-[0_14px_30px_-24px_rgba(4,26,90,0.5)] hover:shadow-[0_24px_44px_-26px_rgba(4,26,90,0.55)] hover:-translate-y-1 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <span className="relative block aspect-video rounded-t-[20px] overflow-hidden bg-[#EEF4FF]">
                <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
                {item.kind === 'video' && (
                  <span className="absolute right-3 top-3 w-9 h-9 rounded-full bg-white/95 text-[#1870FF] flex items-center justify-center shadow" aria-hidden="true">
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </span>
                )}
              </span>
              <span className="relative block px-5 pb-5 pt-9">
                <span className="absolute -top-7 left-5 w-14 h-14 rounded-full bg-gradient-to-br from-[#2A7DFF] to-[#041A5A] text-white text-sm font-black flex items-center justify-center ring-4 ring-white" aria-hidden="true">
                  {initials(item.student)}
                </span>
                <span className="inline-block text-[11px] font-black text-[#041A5A] bg-[#FFE38A] rounded-md px-2.5 py-1">{item.category}</span>
                <span className="mt-3 block text-sm font-black text-[#041A5A] uppercase leading-snug tracking-wide line-clamp-2">{titleOf(item)}</span>
                <span className="mt-1 block text-sm text-slate-500 truncate">{item.student}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToPage(i)}
              aria-label={`${i + 1} / ${pages}`}
              aria-current={i === page ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${i === page ? 'w-7 bg-[#1870FF]' : 'w-2.5 bg-[#C9DAF7] hover:bg-[#9DBEF7]'}`}
            />
          ))}
        </div>
      )}

      {/* Detail dialog */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#041A5A]/55 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="portfolio-dialog-title"
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl my-auto bg-white rounded-[28px] shadow-2xl px-6 sm:px-10 pt-12 pb-8"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label={t('common.close')}
                className="absolute right-4 top-4 w-10 h-10 rounded-full text-slate-500 hover:text-[#041A5A] hover:bg-slate-100 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <span className="inline-block text-xs font-black text-[#041A5A] bg-[#FFE38A] rounded-md px-2.5 py-1">{selected.category}</span>
              <h3 id="portfolio-dialog-title" className="mt-3 text-2xl sm:text-3xl font-black text-[#041A5A] leading-tight tracking-tight">{titleOf(selected)}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">{selected.student}</p>

              {selected.kind === 'video' && selected.youtubeUrl && onWatch ? (
                <button
                  type="button"
                  onClick={() => { const item = selected; setSelected(null); onWatch(item); }}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  {t('pf.watch')}
                </button>
              ) : selected.link ? (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  {t('pf.open')}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : null}

              <div className="mt-5 rounded-2xl overflow-hidden bg-[#EEF4FF] aspect-[16/10]">
                <img src={selected.image} alt={titleOf(selected)} className="w-full h-full object-cover" />
              </div>

              <div className="mt-5 space-y-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                {selected.description && <p>{selected.description}</p>}
                {selected.challenge && (
                  <p><span className="font-black text-[#041A5A]">{t('projects.challenge')}: </span>{selected.challenge}</p>
                )}
                {selected.result && (
                  <p><span className="font-black text-[#041A5A]">{t('projects.result')}: </span>{selected.result}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
