import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { promoDaysLeft } from '../../utils/promo';
import { PromoSlide } from './PromoPopup';
import { AILiteracySlide } from './AILiteracyPopup';

/** Remembers that the visitor closed the pop-up in this tab, so it does not return on every page. */
const STORAGE_KEY = 'spi-opening-popup-dismissed';

interface Slide {
  key: 'promo' | 'ai';
  /** Short name shown when the visitor moves to this slide. */
  label: string;
  /** Id of the slide heading, used as the dialog name. */
  titleId: string;
  render: (close: () => void) => React.ReactNode;
}

interface OpeningPopupProps {
  onNavigate: (path: string) => void;
  onRegister: () => void;
}

/**
 * The opening pop-up: the registration promo and the AI Literacy movement side by side, with arrows,
 * a teaser for the next slide, swipe on touch screens, and the arrow keys. It appears a moment after the first
 * page of a tab, and closes with the X, Escape, a click outside, or "Nanti saja".
 */
export const OpeningPopup: React.FC<OpeningPopupProps> = ({ onNavigate, onRegister }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [hint, setHint] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const countRef = useRef(0);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const id = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage unavailable: the pop-up can simply show again next time.
    }
  }, []);

  // Keeps the step inside the slides that exist, without re-creating the handler on every render.
  const step = useCallback((delta: number) => {
    setIndex((i) => Math.max(0, Math.min(countRef.current - 1, i + delta)));
  }, []);

  const slides: Slide[] = [
    ...(promoDaysLeft() !== null
      ? [
          {
            key: 'promo' as const,
            label: t('promo.eyebrow'),
            titleId: 'promo-popup-title',
            render: (done: () => void) => <PromoSlide onClose={done} onRegister={onRegister} />,
          },
        ]
      : []),
    {
      key: 'ai' as const,
      label: t('ail.nav'),
      titleId: 'ail-popup-title',
      render: (done: () => void) => <AILiteracySlide onClose={done} onNavigate={onNavigate} />,
    },
  ];
  countRef.current = slides.length;
  const current = Math.min(index, slides.length - 1);
  const isLast = current === slides.length - 1;
  const titleId = slides[current].titleId;

  // Focus the close button when it opens; arrow keys move between slides; Escape closes it.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  // Once it opens, the right arrow pulses for a moment so visitors notice there is more to see.
  useEffect(() => {
    if (!open || reduce) return;
    const on = window.setTimeout(() => setHint(true), 900);
    const off = window.setTimeout(() => setHint(false), 4200);
    return () => {
      window.clearTimeout(on);
      window.clearTimeout(off);
    };
  }, [open, reduce]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    if (start === null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (dx < -50) step(1);
    if (dx > 50) step(-1);
  };

  const arrow =
    'flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-30';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label={t('ail.popup.close')} onClick={close} className="absolute inset-0 cursor-pointer bg-[#1870FF]/55 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(2,18,70,0.7)] sm:max-w-lg sm:rounded-[28px]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t('ail.popup.close')}
              className="absolute right-4 top-4 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-[#041A5A] shadow-[0_12px_24px_-12px_rgba(2,18,70,0.6)] transition-colors hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* slides sit side by side; the track slides to the current one. Long slides scroll on their own. */}
            <div className="min-h-0 overflow-hidden">
              <div
                className="flex items-stretch transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slides.map((s, i) => (
                  <div
                    key={s.key}
                    className="max-h-[calc(92vh-11rem)] w-full shrink-0 overflow-y-auto"
                    aria-hidden={i !== current}
                    inert={i !== current}
                  >
                    {s.render(close)}
                  </div>
                ))}
              </div>
            </div>

            {/* footer stays visible under every slide: arrows, what comes next, and the way out */}
            <div className="shrink-0 border-t border-slate-100 px-4 pb-4 pt-3 sm:px-6">
              {slides.length > 1 && (
                <>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      disabled={current === 0}
                      aria-label={t('common.previous')}
                      className={`${arrow} border border-[#DCE7FB] text-[#041A5A] hover:border-[#1870FF] hover:text-[#1870FF]`}
                    >
                      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    </button>

                    <div className="min-w-0 flex-1 text-center">
                      <p className="text-[11px] font-black uppercase tracking-wider text-[#1870FF]">
                        {t('popup.count').replace('{n}', String(current + 1)).replace('{total}', String(slides.length))}
                      </p>
                      <button
                        type="button"
                        onClick={() => step(isLast ? -1 : 1)}
                        className="mt-0.5 max-w-full cursor-pointer truncate rounded text-sm font-bold text-[#041A5A] underline-offset-4 hover:text-[#1870FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                      >
                        {isLast
                          ? `${t('common.previous')}: ${slides[current - 1].label}`
                          : `${t('common.next')}: ${slides[current + 1].label}`}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => step(1)}
                      disabled={isLast}
                      aria-label={t('common.next')}
                      className={`${arrow} relative bg-[#1870FF] text-white hover:bg-[#1059D4]`}
                    >
                      {hint && <span className="absolute inset-0 animate-ping rounded-full bg-[#1870FF]/40" aria-hidden="true" />}
                      <ArrowRight className="relative h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-2.5 flex justify-center gap-1.5">
                    {slides.map((s, i) => (
                      <button
                        key={s.key}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={s.label}
                        aria-current={i === current ? 'true' : undefined}
                        className={`h-2 cursor-pointer rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                          i === current ? 'w-6 bg-[#1870FF]' : 'w-2 bg-[#C9DAF7] hover:bg-[#9DBEF7]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-center text-[11px] font-semibold text-slate-400">{t('popup.swipe')}</p>
                </>
              )}

              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={close}
                  className="cursor-pointer rounded text-sm font-bold text-slate-500 underline-offset-4 hover:text-[#1870FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  {t('ail.popup.later')}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
