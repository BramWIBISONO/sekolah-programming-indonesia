import React from 'react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { Monitor, Building2, ArrowRight, Video, Mic, PhoneOff } from 'lucide-react';

interface OnlineOfflineSectionProps {
  onOpenTrial?: () => void;
}

/** Online & offline classes: copy on the left, a collage of real SPI class photos on the right. */
export const OnlineOfflineSection: React.FC<OnlineOfflineSectionProps> = ({ onOpenTrial }) => {
  const { t } = useLanguage();

  const options = [
    { key: 'offline', icon: Building2 },
    { key: 'online', icon: Monitor },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-5 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('onoff.title')}</h2>
          <p className="text-base text-slate-600 leading-relaxed">{t('onoff.desc')}</p>
          <ul className="space-y-3">
            {options.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-3">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-black text-[#041A5A]">{t(`onoff.${key}`)}</span>
                  <span className="block text-sm text-slate-600 leading-relaxed">{t(`onoff.${key}_desc`)}</span>
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={onOpenTrial}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 h-12 px-7 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold rounded-xl shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
          >
            {t('cta.free_trial')}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Photo collage */}
        <div className="lg:col-span-7 relative h-[265px] sm:h-[440px] lg:h-[480px]" aria-hidden="true">
          {/* decorative shapes */}
          <svg className="absolute right-[2%] -top-2 w-20 h-20 sm:w-28 sm:h-28" viewBox="0 0 100 100">
            {[0, 45, 90, 135].map((r) => (
              <rect key={r} x="44" y="6" width="12" height="88" rx="6" fill="#9CC8FF" transform={`rotate(${r} 50 50)`} />
            ))}
          </svg>
          <span className="absolute left-[2%] bottom-[4%] w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#1870FF] flex items-center justify-center z-20">
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="#FFC928" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
            </svg>
          </span>
          <span className="absolute right-[10%] bottom-[2%] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFC928]" />

          {/* Online class inside a tablet frame */}
          <div className="absolute left-[6%] top-[4%] w-[58%] rounded-[22px] bg-[#0B1220] p-1.5 sm:p-2 shadow-[0_30px_60px_-30px_rgba(4,26,90,0.7)] z-10">
            <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden">
              <img src={ASSETS.learning.aiProject} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              <span className="absolute left-2 top-2 rounded-md bg-[#1870FF] px-2 py-1 text-[10px] sm:text-xs font-black text-white">{t('onoff.online')}</span>
              <div className="absolute left-2 bottom-2 flex gap-1.5">
                <span className="w-7 h-7 rounded-full bg-white/90 text-[#041A5A] flex items-center justify-center"><Mic className="w-3.5 h-3.5" /></span>
                <span className="w-7 h-7 rounded-full bg-white/90 text-[#041A5A] flex items-center justify-center"><Video className="w-3.5 h-3.5" /></span>
                <span className="w-7 h-7 rounded-full bg-[#1870FF] text-white flex items-center justify-center"><PhoneOff className="w-3.5 h-3.5" /></span>
              </div>
            </div>
          </div>

          {/* video-call tiles */}
          <span className="absolute left-[56%] top-0 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#1870FF] text-white flex items-center justify-center z-30 shadow-lg">
            <Video className="w-5 h-5 sm:w-6 sm:h-6" />
          </span>
          <div className="absolute left-[50%] top-[12%] w-[19%] aspect-square rounded-xl overflow-hidden border-4 border-[#1870FF] bg-white z-20 shadow-lg">
            <img src={ASSETS.mentors.mentor2} alt="" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
          </div>
          <div className="absolute left-[50%] top-[36%] w-[19%] aspect-square rounded-xl overflow-hidden border-4 border-white bg-white z-20 shadow-lg">
            <img src={ASSETS.mentors.mentor4} alt="" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
          </div>

          {/* Offline classes */}
          <div className="absolute right-0 top-[16%] w-[30%] aspect-[3/4] rounded-[20px] overflow-hidden shadow-[0_24px_48px_-28px_rgba(4,26,90,0.6)]">
            <img src={ASSETS.learning.codingClass} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <span className="absolute left-2 bottom-2 rounded-md bg-white/95 px-2 py-1 text-[10px] sm:text-xs font-black text-[#041A5A]">{t('onoff.offline')}</span>
          </div>
          <div className="absolute left-[26%] bottom-0 w-[38%] aspect-[16/10] rounded-[20px] overflow-hidden border-4 border-white shadow-[0_24px_48px_-28px_rgba(4,26,90,0.6)] z-20">
            <img src={ASSETS.learning.mentorSession} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
};
