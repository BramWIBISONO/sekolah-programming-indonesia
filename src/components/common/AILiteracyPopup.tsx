import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { Cloud, Gears } from '../illustrations/SceneProps';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';

/** The three ideas, shown as tags on the illustration (same language as the product heroes). */
const TAGS: { key: 'p1' | 'p2' | 'p3'; icon: SpiIconName; pos: string }[] = [
  { key: 'p1', icon: 'ai', pos: 'left-[4%] top-[12%]' },
  { key: 'p2', icon: 'assessment', pos: 'left-[9%] top-[31%]' },
  { key: 'p3', icon: 'innovate', pos: 'left-[4%] top-[50%]' },
];

interface AILiteracySlideProps {
  /** Closes the whole pop-up. */
  onClose: () => void;
  onNavigate: (path: string) => void;
}

/** The AI Literacy movement as one slide of the opening pop-up, in the same illustrated style as the product heroes. */
export const AILiteracySlide: React.FC<AILiteracySlideProps> = ({ onClose, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();

  const goToMovement = () => {
    onClose();
    onNavigate('/ai-literacy/daftar');
  };
  const join = () => {
    onClose();
    openSpiWhatsApp(t('ail.wa_message'));
  };

  return (
    <>
      {/* illustrated scene: light sky, props, blue hills, and the AI illustration on a card */}
      <div className="relative h-[218px] overflow-hidden bg-gradient-to-b from-[#F5F9FF] via-[#E9F1FF] to-[#D9E8FF] sm:h-[246px]" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
          style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        <div
          className="absolute right-[-12%] -top-24 h-[420px] w-[420px] rounded-full opacity-70 [mask-image:radial-gradient(circle,black_20%,transparent_68%)]"
          style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.8) 0deg 5deg, transparent 5deg 18deg)' }}
        />
        <Cloud className="absolute left-[38%] top-[3%] w-12 opacity-90" />
        <Gears className="absolute left-[1%] top-[1%] w-9" />

        {/* dashed orbit behind the AI illustration */}
        <svg className="pointer-events-none absolute right-[3%] top-[6%] h-[84%] w-[60%]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="50" cy="52" rx="48" ry="44" fill="none" stroke="#1870FF" strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="1 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* blue hills sit behind the illustration card, so the card floats over the landscape */}
        <svg className="absolute inset-x-0 bottom-0 h-[46%] w-full" viewBox="0 0 400 110" preserveAspectRatio="none">
          <path d="M0 40C70 14 150 24 220 40S330 22 400 34V110H0Z" fill="#9CC2FF" />
          <path d="M0 60C90 36 170 52 250 64S340 54 400 60V110H0Z" fill="#3D86FF" />
          <path d="M0 84C110 66 220 80 400 74V110H0Z" fill="#FFFFFF" />
        </svg>

        <AILiteracyArt className="absolute right-[6%] top-[8%] h-[74%] w-[50%] -rotate-2 drop-shadow-[0_24px_30px_rgba(2,18,70,0.35)]" animate={!reduce} />

        {TAGS.map(({ key, icon, pos }) => (
          <span
            key={key}
            className={`absolute ${pos} inline-flex items-center gap-2 rounded-xl border border-white bg-white px-2.5 py-1.5 text-[11px] font-black text-[#041A5A] shadow-[0_14px_28px_-16px_rgba(2,18,70,0.55)] sm:text-xs`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF]">
              <SpiIcon name={icon} size={18} animate="none" />
            </span>
            {t(`ail.join.${key}.title`)}
          </span>
        ))}

        <img src={ASSETS.brand.pandaMascot} alt="" className="absolute bottom-[2%] right-[1%] w-14 drop-shadow-[0_18px_24px_rgba(2,18,70,0.35)] sm:w-16" />
      </div>

      <div className="relative space-y-4 px-6 pb-6 pt-1 sm:px-8">
        <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1870FF] sm:text-xs">
          <span className="h-[3px] w-5 rounded-full bg-[#1870FF]" aria-hidden="true" />
          {t('ail.eyebrow')}
        </p>
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A] sm:text-sm">
            {t('ail.kickoff.label')} · {t('ail.kickoff.date')}
          </span>
          <h2 id="ail-popup-title" className="text-3xl font-black leading-[1.08] tracking-tight text-[#041A5A] sm:text-4xl">
            {t('ail.join.title')}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{t('ail.join.desc')}</p>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <button
            type="button"
            onClick={goToMovement}
            className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#1870FF] px-6 font-bold text-white shadow-[0_18px_36px_-16px_rgba(24,112,255,0.85)] transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
          >
            {t('ail.register.cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={join}
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-[#1870FF] px-6 font-bold text-[#1870FF] transition-colors hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {t('ail.join.wa')}
          </button>
        </div>
      </div>
    </>
  );
};
