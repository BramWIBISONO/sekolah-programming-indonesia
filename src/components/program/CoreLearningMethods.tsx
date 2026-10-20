import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

/**
 * SPI Core: how students learn (five methods) and the graduate profile they build towards.
 * Methods are tabs (auto-advancing until the visitor interacts); each method lights up
 * more of the graduate profile, so the relationship is visible without connector lines.
 */
const METHODS: SpiIconName[] = ['projects', 'challenge', 'portfolio', 'community', 'ai'];
const PROFILE: SpiIconName[] = ['think', 'build', 'specialist', 'solver', 'ai', 'innovate'];
const AUTO_MS = 4500;

export const CoreLearningMethods: React.FC = () => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % METHODS.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduce]);

  // Method i unlocks profile badges 0..i+1 (the last method completes the profile).
  const unlocked = Math.min(active + 1, PROFILE.length - 1) + (active === METHODS.length - 1 ? 1 : 0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-12">
          <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('core.learn.eyebrow')}</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.05]">
            {t('core.learn.title')} <span className="text-[#1870FF]">{t('core.learn.title_em')}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">{t('core.learn.desc')}</p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          onMouseEnter={() => setPaused(true)}
          onFocusCapture={() => setPaused(true)}
        >
          {/* Methods */}
          <div role="tablist" aria-label={t('core.learn.eyebrow')} className="lg:col-span-5 space-y-2">
            {METHODS.map((icon, i) => {
              const selected = i === active;
              return (
                <button
                  key={icon}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="core-profile"
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  className={`group relative w-full text-left flex gap-4 items-start rounded-2xl p-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                    selected ? 'bg-[#F4F8FF] ring-1 ring-[#D6E5FF]' : 'hover:bg-slate-50'
                  }`}
                >
                  <SpiIcon name={icon} size={44} animate={selected ? 'always' : 'hover'} className="shrink-0" />
                  <span className="min-w-0">
                    <span className={`block text-base font-black ${selected ? 'text-[#041A5A]' : 'text-slate-500'}`}>
                      {t(`core.method.${i + 1}.title`)}
                    </span>
                    <span className={`block text-sm leading-relaxed mt-0.5 ${selected ? 'text-slate-600' : 'text-slate-400'}`}>
                      {t(`core.method.${i + 1}.desc`)}
                    </span>
                  </span>
                  {selected && !reduce && !paused && (
                    <motion.span
                      key={`bar-${i}`}
                      className="absolute left-4 right-4 bottom-1.5 h-[3px] rounded-full bg-[#1870FF]/70 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Graduate profile */}
          <div id="core-profile" role="tabpanel" className="lg:col-span-7 rounded-[28px] bg-[#1870FF] text-white p-6 sm:p-10 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFE38A]">{t('core.grad.eyebrow')}</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
                {t('core.grad.title')} <span className="text-[#7FB1FF]">{t('core.grad.title_em')}</span>
              </h3>

              <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {PROFILE.map((icon, k) => {
                  const lit = k <= unlocked;
                  return (
                    <li
                      key={icon}
                      className={`rounded-2xl p-4 transition-colors duration-500 ${lit ? 'bg-white text-[#041A5A]' : 'bg-white/[0.06] text-white/60'}`}
                    >
                      <motion.div
                        animate={lit && !reduce ? { scale: [0.9, 1.08, 1] } : { scale: 1 }}
                        transition={{ duration: 0.45 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${lit ? 'bg-[#F4F8FF]' : 'bg-white/10 grayscale opacity-60'}`}
                      >
                        <SpiIcon name={icon} size={36} animate={lit ? 'always' : 'none'} />
                      </motion.div>
                      <p className="text-sm font-black leading-snug">{t(`core.grad.${k + 1}.title`)}</p>
                      <p className={`text-xs leading-relaxed mt-1 ${lit ? 'text-slate-600' : 'text-white/50'}`}>{t(`core.grad.${k + 1}.desc`)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
