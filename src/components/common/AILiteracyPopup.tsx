import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { Cloud, Gears, Tree } from '../illustrations/SceneProps';

/** Remembers that the visitor closed the pop-up in this browser tab, so it does not return on every page. */
const STORAGE_KEY = 'spi-ail-popup-dismissed';

/** The three ideas, shown as tags on the illustration (same language as the product heroes). */
const TAGS: { key: 'p1' | 'p2' | 'p3'; icon: SpiIconName; pos: string }[] = [
  { key: 'p1', icon: 'ai', pos: 'left-[4%] top-[14%]' },
  { key: 'p2', icon: 'assessment', pos: 'left-[9%] top-[41%]' },
  { key: 'p3', icon: 'innovate', pos: 'left-[4%] top-[68%]' },
];

interface AILiteracyPopupProps {
  onNavigate: (path: string) => void;
}

/**
 * Opening pop-up for the AI Literacy movement. It appears shortly after the first visit to the site,
 * in the same illustrated style as the product heroes, and closes with the X, Escape, or a click outside.
 */
export const AILiteracyPopup: React.FC<AILiteracyPopupProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Show once per tab, a moment after the page has settled, so it does not slow down the first paint.
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
      // Storage unavailable (private mode, blocked): the pop-up can simply show again next time.
    }
  }, []);

  // Focus the close button when it opens; Escape closes it.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const goToMovement = () => {
    close();
    onNavigate('/gerakan-ai-literacy');
  };
  const join = () => {
    close();
    openSpiWhatsApp(t('ail.wa_message'));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label={t('ail.popup.close')} onClick={close} className="absolute inset-0 bg-[#041A5A]/55 backdrop-blur-sm cursor-pointer" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ail-popup-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(2,18,70,0.7)]"
          >
            {/* illustrated scene: light sky, props, the programme artwork on a card, and blue hills */}
            <div className="relative h-[218px] sm:h-[246px] overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#E9F1FF] to-[#D9E8FF]" aria-hidden="true">
              <div
                className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
                style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '32px 32px' }}
              />
              <div
                className="absolute right-[-12%] -top-24 w-[420px] h-[420px] rounded-full opacity-70 [mask-image:radial-gradient(circle,black_20%,transparent_68%)]"
                style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.8) 0deg 5deg, transparent 5deg 18deg)' }}
              />
              <Cloud className="absolute left-[46%] top-[6%] w-16 opacity-90" />
              <Gears className="absolute left-[2%] top-[4%] w-12" />

              {/* programme artwork on a tilted card, with a dashed orbit behind it */}
              <svg className="absolute right-[3%] top-[8%] w-[62%] h-[80%] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <ellipse cx="50" cy="52" rx="48" ry="44" fill="none" stroke="#1870FF" strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="1 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute right-[7%] top-[16%] w-[52%] h-[56%] rounded-2xl overflow-hidden border-[3px] border-white shadow-[0_30px_50px_-24px_rgba(2,18,70,0.6)] -rotate-2">
                <img src={ASSETS.learning.aiProject} alt="" className="w-full h-full object-cover" decoding="async" />
              </div>

              {TAGS.map(({ key, icon, pos }) => (
                <span key={key} className={`absolute ${pos} inline-flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 border border-white shadow-[0_14px_28px_-16px_rgba(2,18,70,0.55)] text-[11px] sm:text-xs font-black text-[#041A5A]`}>
                  <span className="w-6 h-6 rounded-lg bg-[#EEF4FF] flex items-center justify-center shrink-0">
                    <SpiIcon name={icon} size={18} animate="none" />
                  </span>
                  {t(`ail.join.${key}.title`)}
                </span>
              ))}

              <img src={ASSETS.brand.pandaMascot} alt="" className="absolute right-[2%] bottom-[10%] w-20 sm:w-24 drop-shadow-[0_18px_24px_rgba(2,18,70,0.35)]" />
              <Tree className="absolute left-[46%] bottom-[24%] w-9 sm:w-10" />

              {/* blue hills that flow into the white content below */}
              <svg className="absolute inset-x-0 bottom-0 w-full h-[46%]" viewBox="0 0 400 110" preserveAspectRatio="none">
                <path d="M0 40C70 14 150 24 220 40S330 22 400 34V110H0Z" fill="#9CC2FF" />
                <path d="M0 60C90 36 170 52 250 64S340 54 400 60V110H0Z" fill="#3D86FF" />
                <path d="M0 84C110 66 220 80 400 74V110H0Z" fill="#FFFFFF" />
              </svg>
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t('ail.popup.close')}
              className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-white text-[#041A5A] shadow-[0_12px_24px_-12px_rgba(2,18,70,0.6)] hover:bg-[#EEF4FF] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="relative px-6 pb-7 pt-1 sm:px-8 sm:pb-8 space-y-4">
              <p className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#1870FF]">
                <span className="w-5 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
                {t('ail.eyebrow')}
              </p>
              <div className="space-y-3">
                <span className="inline-flex items-center rounded-full bg-[#FFC928] text-[#041A5A] px-4 py-1.5 text-xs sm:text-sm font-black">
                  {t('ail.kickoff.label')} · {t('ail.kickoff.date')}
                </span>
                <h2 id="ail-popup-title" className="text-3xl sm:text-4xl font-black tracking-tight leading-[1.08] text-[#041A5A]">{t('ail.join.title')}</h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{t('ail.join.desc')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={goToMovement}
                  className="group inline-flex flex-1 justify-center items-center gap-2 h-12 sm:h-13 px-6 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold shadow-[0_18px_36px_-16px_rgba(24,112,255,0.85)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  {t('ail.join.cta')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={join}
                  className="inline-flex flex-1 justify-center items-center gap-2 h-12 sm:h-13 px-6 rounded-2xl border-2 border-[#1870FF] text-[#1870FF] hover:bg-[#EEF4FF] font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('ail.join.wa')}
                </button>
              </div>

              <div className="text-center">
                <button type="button" onClick={close} className="text-sm font-bold text-slate-500 hover:text-[#1870FF] underline-offset-4 hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]">
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
