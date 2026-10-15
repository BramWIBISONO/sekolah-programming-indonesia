import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { asset } from '../../constants/assets';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

const ITEMS: { key: string; icon: SpiIconName }[] = [
  { key: 'creator', icon: 'creator' },
  { key: 'ainative', icon: 'ai' },
  { key: 'thinking', icon: 'think' },
  { key: 'future', icon: 'briefcase' },
];

/** Why coding and AI literacy matter for children now: an illustration plus an accordion. */
export const WhyCodingAISection: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <section id="why-coding-section" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('whycode.eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight text-balance">{t('whycode.title')}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Illustration: SPI classroom artwork framed with floating skill badges */}
          <div className="lg:col-span-6 relative px-3 sm:px-6">
            <div className="absolute -inset-2 sm:inset-0 rounded-[40px] bg-gradient-to-br from-[#DCEBFF] via-[#EEF4FF] to-white rotate-[-3deg]" aria-hidden="true" />
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_60px_-36px_rgba(4,26,90,0.55)] border-4 border-white">
              <img
                src={asset('assets/homepage/homepage-why-coding.webp')}
                alt={t('whycode.image_alt')}
                className="w-full h-auto aspect-[3/2] object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={799}
              />
            </div>
            <div className="absolute -left-1 sm:-left-3 top-6 sm:top-10 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_14px_30px_-16px_rgba(4,26,90,0.45)]" aria-hidden="true">
              <SpiIcon name="terminal" size={30} animate="none" />
              <span className="text-xs font-black text-[#041A5A] font-mono">print("Hi!")</span>
            </div>
            <div className="absolute -right-1 sm:-right-3 bottom-8 sm:bottom-12 flex items-center gap-2 rounded-2xl bg-[#041A5A] px-3 py-2 shadow-[0_14px_30px_-16px_rgba(4,26,90,0.6)]" aria-hidden="true">
              <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center"><SpiIcon name="ai" size={22} animate="none" /></span>
              <span className="text-xs font-black text-white">AI-Native</span>
            </div>
            <span className="absolute right-10 -top-3 w-10 h-10 rounded-full bg-[#FFC928]" aria-hidden="true" />
          </div>

          {/* Accordion */}
          <div className="lg:col-span-6">
            <ul className="divide-y divide-[#E3ECFA] border-y border-[#E3ECFA]">
              {ITEMS.map(({ key, icon }, i) => {
                const isOpen = open === i;
                return (
                  <li key={key}>
                    <h3>
                      <button
                        type="button"
                        id={`whycode-btn-${key}`}
                        aria-expanded={isOpen}
                        aria-controls={`whycode-panel-${key}`}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="w-full flex items-center gap-4 py-5 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] rounded-lg"
                      >
                        <span className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${isOpen ? 'bg-[#EEF4FF]' : 'bg-[#F7F8FC]'}`}>
                          <SpiIcon name={icon} size={30} animate="none" />
                        </span>
                        <span className={`flex-1 text-base sm:text-lg font-black leading-snug transition-colors ${isOpen ? 'text-[#1870FF]' : 'text-[#041A5A] group-hover:text-[#1870FF]'}`}>
                          {t(`whycode.${key}.title`)}
                        </span>
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#1870FF]' : 'text-slate-400'}`} aria-hidden="true" />
                      </button>
                    </h3>
                    {/* grid-rows trick animates height without measuring */}
                    <div
                      id={`whycode-panel-${key}`}
                      role="region"
                      aria-labelledby={`whycode-btn-${key}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-[60px] pr-2 text-sm sm:text-[15px] text-slate-600 leading-relaxed">{t(`whycode.${key}.desc`)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
