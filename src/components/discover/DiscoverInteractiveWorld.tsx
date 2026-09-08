import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code2, Cog, Cpu, Rocket, Sparkles } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { DiscoveryInterest } from '../../data/discoveryData';

/**
 * Core SPI worlds.
 *
 * Discover SPI is built around the four technology worlds students can
 * actually explore at SPI: Coding, AI, Robotics, and Engineering.
 * Each world is an invitation to explore — never a label for the person.
 */
export interface CoreWorld {
  id: string;
  title: string;
  meaning: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  softBg: string;
  suggestedInterest: DiscoveryInterest;
}

export const CORE_WORLDS: CoreWorld[] = [
  {
    id: 'coding',
    title: 'Coding',
    meaning: 'Buat program, game, website, dan solusi digital.',
    icon: Code2,
    color: '#186BF6',
    softBg: 'bg-blue-50 dark:bg-blue-500/15',
    suggestedInterest: 'coding',
  },
  {
    id: 'ai',
    title: 'AI',
    meaning: 'Jelajahi kecerdasan buatan dan berkarya bersama AI.',
    icon: BrainCircuit,
    color: '#8B5CF6',
    softBg: 'bg-violet-50 dark:bg-violet-500/15',
    suggestedInterest: 'ai',
  },
  {
    id: 'robotics',
    title: 'Robotics',
    meaning: 'Bangun dan program mesin yang berinteraksi dengan dunia nyata.',
    icon: Cpu,
    color: '#0EA5E9',
    softBg: 'bg-sky-50 dark:bg-sky-500/15',
    suggestedInterest: 'robotics',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    meaning: 'Rancang sistem dan teknologi untuk memecahkan masalah nyata.',
    icon: Cog,
    color: '#10B981',
    softBg: 'bg-emerald-50 dark:bg-emerald-500/15',
    suggestedInterest: 'robotics',
  },
];

interface DiscoverInteractiveWorldProps {
  onStartExploration: (suggestedInterest?: DiscoveryInterest) => void;
}

/**
 * Signature Discover SPI experience.
 *
 * A large illustrated technology environment sits behind the interface as a
 * single cohesive scene. The four core worlds are presented as invitations to
 * explore — never as personality labels. Selection drives the existing
 * Discovery engine (question bank, branching, scoring, recommendations)
 * without replacing it.
 */
export const DiscoverInteractiveWorld: React.FC<DiscoverInteractiveWorldProps> = ({
  onStartExploration,
}) => {
  const { lang } = useLanguage();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeWorld, setActiveWorld] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const heading =
    lang === 'id'
      ? 'Apa yang ingin kamu buat berikutnya?'
      : lang === 'en'
        ? 'What do you want to build next?'
        : '你想尝试什么？';

  const subtext =
    lang === 'id'
      ? 'Mulai langkah kecil menuju dunia ide, tools, dan proyek yang dibentuk dari hal yang ingin kamu ciptakan.'
      : lang === 'en'
        ? 'Take small steps into ideas, tools, and projects shaped by what you want to create.'
        : '走进编程、AI、机器人和工程的世界——看看你能创造什么。';

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl border border-blue-100/80 dark:border-slate-800 shadow-xl"
    >
      {/* Large illustrated SPI world environment (single cohesive background scene) */}
      <div className="absolute inset-0 bg-[#EAF3FF] dark:bg-[#0A1526]" aria-hidden="true">
        <img
          src={ASSETS.discover.heroBackground}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        {/* Subtle readability scrim — keeps the artwork visible without an opaque box */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/30 to-white/85 dark:from-[#0A1526]/85 dark:via-[#0A1526]/40 dark:to-[#0A1526]/95"
          aria-hidden="true"
        />
      </div>
<div className="relative z-10 px-5 py-9 sm:p-10 lg:p-12">
        {/* SPI brand inside the experience */}
        <div className="flex items-center justify-between gap-4">
          <img
            src={ASSETS.brand.logo}
            alt="Sekolah Programming Indonesia"
            className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
            loading="lazy"
            decoding="async"
          />
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-blue-100 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-[#186BF6] shadow-sm">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Discover SPI
          </span>
        </div>

        {/* Invitation copy */}
        <div className="mt-6 sm:mt-8 max-w-2xl space-y-3">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2454] dark:text-white tracking-tight leading-tight">
            {heading}
          </h3>
          <p className="text-sm sm:text-base font-medium text-[#41587A] dark:text-blue-100/90 leading-relaxed">
            {subtext}
          </p>
        </div>

        {/* Four core worlds — invitations to explore */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-7 sm:mt-9">
          {CORE_WORLDS.map((world, index) => {
            const Icon = world.icon;
            return (
              <motion.button
                key={world.id}
                type="button"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.07,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                onClick={() => onStartExploration(world.suggestedInterest)}
                onFocus={() => setActiveWorld(world.id)}
                onMouseEnter={() => setActiveWorld(world.id)}
                onMouseLeave={() => setActiveWorld(null)}
                aria-label={
                  lang === 'id'
                    ? `Jelajahi ${world.title}`
                    : lang === 'en'
                      ? `Explore ${world.title}`
                      : `探索${world.title}`
                }
                className={`group text-left bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-2 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#186BF6] ${
                  activeWorld === world.id
                    ? 'border-[#186BF6]/70 dark:border-blue-500/60'
                    : 'border-white/80 dark:border-slate-700'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl ${world.softBg} flex items-center justify-center mb-3.5`}>
                  <Icon className="w-5 h-5" style={{ color: world.color }} aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-black text-[#0B2454] dark:text-white tracking-tight">
                    {world.title}
                  </h4>
                  <ArrowRight
                    className="w-4 h-4 text-[#186BF6] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#526A8F] dark:text-slate-300">
                  {world.meaning}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Lightweight journey hint — feels like exploration, not a test */}
        <div className="mt-7 flex items-center gap-2 text-xs font-bold text-[#526A8F] dark:text-blue-200/80">
          <Rocket className="w-3.5 h-3.5 text-[#186BF6]" aria-hidden="true" />
          <span>
            {lang === 'id'
              ? 'Kamu bisa menjelajahi lebih dari satu dunia sepanjang perjalanan.'
              : lang === 'en'
                ? 'You can explore more than one world along the way.'
                : '你可以在探索过程中体验多个世界。'}
          </span>
        </div>
      </div>
    </div>
  );
};