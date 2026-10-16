import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';

interface EmailApplyDialogProps {
  open: boolean;
  onClose: () => void;
  /** Subject line, e.g. "Lamaran Mentor SPI". */
  subject: string;
  /** Position name put into the message body. */
  position: string;
}

interface Option {
  key: string;
  label: string;
  /** One letter shown in a coloured square, instead of a logo file. */
  initial: string;
  tint: string;
  href?: string;
  /** Opens a page without pre-filling it: details are copied first. */
  copyThenOpen?: string;
}

/** Opens a webmail compose window (or the device mail app) with the address, subject and body filled in. */
const composeLinks = (email: string, subject: string, body: string) => {
  const q = (v: string) => encodeURIComponent(v);
  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(email)}&su=${q(subject)}&body=${q(body)}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${q(email)}&subject=${q(subject)}&body=${q(body)}`,
    yahoo: `https://compose.mail.yahoo.com/?to=${q(email)}&subject=${q(subject)}&body=${q(body)}`,
    device: `mailto:${email}?subject=${q(subject)}&body=${q(body)}`,
  };
};

/**
 * "Kirim lamaran": one tap to start an email to SPI's inbox in the webmail or mail app the visitor uses.
 * Attachments cannot be added by a link, so the dialog reminds the applicant to attach CV and portfolio.
 */
export const EmailApplyDialog: React.FC<EmailApplyDialogProps> = ({ open, onClose, subject, position }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [copied, setCopied] = useState(false);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const email = SPI_CONFIG.INFO_EMAIL;
  const body = t('apply.body').replace('{position}', position);
  const links = composeLinks(email, subject, body);
  const details = `To: ${email}\nSubject: ${subject}\n\n${body}`;

  // Keep the latest onClose without re-running the open effect on every parent render.
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Focus the first option when opened; Escape closes.
  useEffect(() => {
    if (!open) return;
    setCopied(false);
    const focusId = window.setTimeout(() => firstRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeRef.current(); };
    document.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(focusId); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const options: Option[] = [
    { key: 'gmail', label: t('apply.gmail'), initial: 'G', tint: 'bg-[#EA4335]', href: links.gmail },
    { key: 'outlook', label: t('apply.outlook'), initial: 'O', tint: 'bg-[#0F6CBD]', href: links.outlook },
    { key: 'yahoo', label: t('apply.yahoo'), initial: 'Y', tint: 'bg-[#6001D2]', href: links.yahoo },
    { key: 'zoho', label: t('apply.zoho'), initial: 'Z', tint: 'bg-[#089949]', copyThenOpen: 'https://mail.zoho.com/' },
    { key: 'device', label: t('apply.device'), initial: '@', tint: 'bg-[#1870FF]', href: links.device },
  ];

  const rowClass =
    'group w-full h-14 rounded-2xl border border-[#E3ECFA] bg-white hover:border-[#1870FF] hover:bg-[#F5F9FF] flex items-center gap-3 px-3 text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button type="button" aria-label={t('apply.close')} onClick={onClose} className="absolute inset-0 bg-[#041A5A]/55 backdrop-blur-sm cursor-pointer" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-dialog-title"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(2,18,70,0.7)]"
          >
            {/* header: Electric Blue with the tech grid, like the registration form */}
            <div className="relative overflow-hidden bg-[#1870FF] text-white px-6 pt-6 pb-6">
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                aria-hidden="true"
              />
              <span className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/10" aria-hidden="true" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t('apply.close')}
                className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:bg-white/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="relative flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0">
                  <img src={ASSETS.brand.mark} alt="" className="w-9 h-9 object-contain" />
                </span>
                <div className="min-w-0">
                  <h2 id="apply-dialog-title" className="text-xl font-black leading-tight">{t('apply.title')}</h2>
                  <p className="text-xs font-semibold text-blue-50/90 [overflow-wrap:anywhere]">{email}</p>
                </div>
              </div>
              <p className="relative mt-4 text-sm text-blue-50/95 leading-relaxed">{t('apply.desc')}</p>
            </div>

            <div className="p-5 sm:p-6 space-y-2.5">
              {options.map((o, i) => {
                const inner = (
                  <>
                    <span className={`w-9 h-9 rounded-xl ${o.tint} text-white text-sm font-black flex items-center justify-center shrink-0`} aria-hidden="true">{o.initial}</span>
                    <span className="flex-1 text-sm font-black text-[#041A5A]">{o.label}</span>
                  </>
                );
                if (o.href) {
                  return (
                    <a
                      key={o.key}
                      ref={i === 0 ? firstRef : undefined}
                      href={o.href}
                      target={o.key === 'device' ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={rowClass}
                      onClick={onClose}
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <button
                    key={o.key}
                    type="button"
                    className={rowClass}
                    onClick={() => {
                      copy(details);
                      window.open(o.copyThenOpen, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    {inner}
                  </button>
                );
              })}
              <p className="text-xs text-slate-500 leading-relaxed px-1">{t('apply.zoho_hint')}</p>

              <button
                type="button"
                onClick={() => copy(email)}
                className="w-full h-12 rounded-2xl border-2 border-dashed border-[#C9DAF7] hover:border-[#1870FF] text-sm font-bold text-[#1870FF] flex items-center justify-center gap-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                {copied ? t('apply.copied') : t('apply.copy')}
              </button>

              <p className="rounded-xl bg-[#FFF6D6] text-[#7A5A00] text-xs font-semibold px-4 py-3 leading-relaxed">{t('apply.attach')}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
