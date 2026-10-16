import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { useHideOnScroll } from '../../utils/useHideOnScroll';
import { openSpiWhatsApp } from '../../utils/whatsapp';

/** WhatsApp-style chat glyph (speech bubble with a handset). */
const WaGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
    <g transform="translate(7.2 7.2) scale(0.4)" fill="currentColor" stroke="none">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </g>
  </svg>
);

/**
 * Floating WhatsApp button. A click opens a small chat card (SPI admin, a greeting and a preview of
 * the opening message); "Mulai Chat" opens WhatsApp with that message already typed in.
 */
export const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const scrolledAway = useHideOnScroll();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<HTMLButtonElement>(null);
  const hidden = scrolledAway && !open;
  const message = t('wa.auto_message');

  // Typing dots first, then the greeting (skipped under reduced motion).
  useEffect(() => {
    if (!open) return;
    setTyping(!reduce);
    const focusId = window.setTimeout(() => startRef.current?.focus(), 120);
    if (reduce) return () => window.clearTimeout(focusId);
    const typingId = window.setTimeout(() => setTyping(false), 900);
    return () => { window.clearTimeout(focusId); window.clearTimeout(typingId); };
  }, [open, reduce]);

  // Close on Escape (focus back to the button) or on a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); fabRef.current?.focus(); }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !fabRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown); };
  }, [open]);

  const startChat = () => {
    openSpiWhatsApp(message);
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="wa-popup"
            role="dialog"
            aria-labelledby="wa-popup-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 16 }}
            transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 420, damping: 30 }}
            style={{ transformOrigin: 'bottom right' }}
            className="fixed right-4 sm:right-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-[60] w-[min(340px,calc(100vw-2rem))] rounded-[22px] bg-white shadow-[0_30px_70px_-20px_rgba(4,26,90,0.5)] border border-slate-100 overflow-hidden"
          >
            {/* header: SPI admin, online */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#12A150] px-5 pt-6 pb-5 text-center text-white">
              <span className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-white/10" aria-hidden="true" />
              <span className="absolute -right-8 bottom-[-40px] w-28 h-28 rounded-full bg-white/10" aria-hidden="true" />
              <button
                type="button"
                onClick={() => { setOpen(false); fabRef.current?.focus(); }}
                aria-label={t('wa.popup.close')}
                className="absolute right-3 top-3 w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:bg-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <motion.span
                initial={reduce ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.08, type: 'spring', stiffness: 380, damping: 22 }}
                className="relative mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]"
              >
                {/* the globe mark only: the full wordmark is too wide for a round avatar and gets cut */}
                <img src={ASSETS.brand.mark} alt="" className="w-[70%] h-[70%] object-contain" />
                <span className="absolute bottom-0.5 right-0.5 flex w-4 h-4" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-[#25D366] spi-anim-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-[#25D366] border-2 border-white" />
                </span>
              </motion.span>
              <p id="wa-popup-title" className="relative mt-3 text-base font-black leading-tight">{t('wa.popup.name')}</p>
              <p className="relative text-sm text-white/85">{t('wa.popup.role')}</p>
            </div>

            {/* chat: greeting from the admin, then the opening message that will be sent */}
            <div className="bg-[#F2F7F3] px-4 py-4 space-y-2.5 min-h-[132px]" aria-live="polite">
              <div className="flex">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-3.5 py-2.5 shadow-sm text-sm text-slate-700 leading-relaxed">
                  {typing ? (
                    <span className="flex items-center gap-1 py-1" role="status">
                      <span className="sr-only">{t('wa.popup.typing')}</span>
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-slate-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </span>
                  ) : (
                    <motion.span initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="block">
                      {t('wa.popup.greeting')}
                    </motion.span>
                  )}
                </div>
              </div>
              {!typing && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : 0.25 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[#D9FDD3] px-3.5 py-2.5 shadow-sm">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#12A150]">{t('wa.popup.preview')}</span>
                    <span className="block text-sm text-slate-700 leading-relaxed">{message}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 pt-3 bg-white">
              <button
                ref={startRef}
                type="button"
                onClick={startChat}
                className="group w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold flex items-center justify-center gap-2 shadow-[0_12px_24px_-12px_rgba(18,161,80,0.9)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A150] focus-visible:ring-offset-2"
              >
                <WaGlyph className="w-5 h-5" />
                {t('wa.popup.start')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={fabRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="wa-popup"
        aria-label={t('wa.label')}
        title={t('wa.label')}
        className={`fixed right-4 sm:right-6 z-[60] flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1EBE57] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A150] focus-visible:ring-offset-2 ${
          hidden ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 sm:hover:-translate-y-1'
        }`}
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* a soft pulse while closed invites a tap */}
        {!open && (
          <span className="absolute inset-0 opacity-50" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-[#25D366] spi-anim-ping" />
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'wa'}
            initial={reduce ? false : { rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={reduce ? undefined : { rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="relative flex"
          >
            {open ? <X className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" /> : <WaGlyph className="w-6 h-6 sm:w-7 sm:h-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
};
