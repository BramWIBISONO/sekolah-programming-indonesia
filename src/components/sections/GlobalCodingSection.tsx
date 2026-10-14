import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

/**
 * "From Curiosity to Creation": an illustrated path through the SPI programs.
 * The three programs are a common path, not a required sequence; SPI InSchool is a
 * separate school track because it is delivered through schools.
 */
interface Node {
  key: string;
  icon: SpiIconName;
  title: string;
  label?: string;
  desc: string;
  tint: string;
}

export const GlobalCodingSection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const nodes: Node[] = [
    { key: 'start', icon: 'curiosity', title: t('path.start.title'), desc: t('path.start.desc'), tint: 'bg-[#FFF6D6]' },
    { key: 'core', icon: 'core', title: t('prog.core.short'), label: t('path.stage1.label'), desc: t('path.stage1.desc'), tint: 'bg-[#E6F0FF]' },
    { key: 'lab', icon: 'lab', title: t('prog.lab.short'), label: t('path.stage2.label'), desc: t('path.stage2.desc'), tint: 'bg-[#F0ECFF]' },
    { key: 'engineering', icon: 'engineering', title: t('prog.engineering.short'), label: t('path.stage3.label'), desc: t('path.stage3.desc'), tint: 'bg-[#E4E9F6]' },
    { key: 'end', icon: 'innovate', title: t('path.end.title'), desc: t('path.end.desc'), tint: 'bg-[#FFF6D6]' },
  ];

  return (
    <section id="learning-pathway" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl space-y-4 mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('path.eyebrow')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08] text-balance">{t('path.title')}</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t('path.desc')}</p>
        </div>

        {/* The path */}
        <div className="relative">
          {/* Desktop: a curved line drawn on scroll, passing through every node */}
          <div className="hidden lg:block absolute left-0 right-0 top-0 h-[96px] pointer-events-none" aria-hidden="true">
            <svg className="w-full h-full" viewBox="0 0 1000 96" preserveAspectRatio="none">
              <path d="M100 48 C150 6,250 6,300 48 S450 90,500 48 S650 6,700 48 S850 90,900 48" stroke="#DCE6F7" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="2 9" strokeLinecap="round" />
              <motion.path
                d="M100 48 C150 6,250 6,300 48 S450 90,500 48 S650 6,700 48 S850 90,900 48"
                stroke="#176DF8" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* Mobile: vertical line */}
          <div className="lg:hidden absolute left-[43px] top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[#FFC928] via-[#176DF8] to-[#FFC928] opacity-40" aria-hidden="true" />

          <ol className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {nodes.map((node, i) => (
              <motion.li
                key={node.key}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.25 + i * 0.35 }}
                className="group flex lg:flex-col items-start lg:items-center gap-5 lg:gap-4 lg:text-center"
              >
                <div className={`relative z-10 shrink-0 w-[88px] h-[88px] lg:w-[96px] lg:h-[96px] rounded-[28px] ${node.tint} ring-8 ring-white flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2`}>
                  <SpiIcon name={node.icon} size={58} animate="hover" />
                </div>
                <div className="pt-1 lg:pt-0 space-y-1 min-w-0">
                  {node.label && <p className="text-[11px] font-black uppercase tracking-wider text-[#176DF8]">{node.label}</p>}
                  <h3 className="text-lg font-black text-[#041A5A] leading-snug">{node.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{node.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <p className="mt-8 text-sm text-slate-500 max-w-3xl">{t('path.note')}</p>

        {/* Separate school track */}
        <aside
          aria-labelledby="inschool-pathway-title"
          className="group mt-10 relative rounded-[24px] border-2 border-dashed border-[#9ED9BF] bg-[#F1FBF6] p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start sm:items-center"
        >
          <div className="shrink-0 w-20 h-20 rounded-[22px] bg-white flex items-center justify-center">
            <SpiIcon name="inschool" size={56} animate="always" />
          </div>
          <div className="space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#0B7A52]">{t('path.inschool.label')}</p>
            <h3 id="inschool-pathway-title" className="text-xl font-black text-[#041A5A]">{t('prog.inschool.short')}</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">{t('path.inschool.desc')}</p>
            <p className="text-xs sm:text-sm text-slate-500">{t('path.inschool.note')}</p>
          </div>
        </aside>

        <p className="mt-12 max-w-3xl text-lg sm:text-xl font-semibold text-[#041A5A] leading-relaxed text-pretty">
          “{t('path.closing')}”
        </p>
      </div>
    </section>
  );
};
