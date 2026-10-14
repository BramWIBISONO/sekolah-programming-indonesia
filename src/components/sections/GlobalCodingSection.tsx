import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

/**
 * "From Curiosity to Creation": SPI's learning philosophy. The flow is the
 * Think → Build → Innovate method, bookended by curiosity and real work.
 * Product names never appear as stages here; the four products live in their
 * own gallery (#programs-section) because they are not a sequence.
 */
interface Node {
  key: string;
  icon: SpiIconName;
  title: string;
  desc: string;
  /** Think / Build / Innovate sit inside the framework band. */
  method?: boolean;
}

export const GlobalCodingSection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const nodes: Node[] = [
    { key: 'start', icon: 'curiosity', title: t('path.start.title'), desc: t('path.start.desc') },
    { key: 'think', icon: 'think', title: 'Think', desc: t('phil.think'), method: true },
    { key: 'build', icon: 'build', title: 'Build', desc: t('phil.build'), method: true },
    { key: 'innovate', icon: 'innovate', title: 'Innovate', desc: t('phil.innovate'), method: true },
    { key: 'end', icon: 'projects', title: t('path.end.title'), desc: t('path.end.desc') },
  ];

  const scrollToProducts = () =>
    document.getElementById('programs-section')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <section id="learning-pathway" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-14 sm:mb-16">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('phil.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08] text-balance">{t('path.title')}</h2>
          </div>
          <p className="lg:col-span-5 text-base sm:text-lg text-slate-600 leading-relaxed">{t('phil.desc')}</p>
        </div>

        <div className="relative">
          {/* Desktop: the framework band behind Think, Build and Innovate */}
          <div className="hidden lg:block absolute left-[19%] right-[19%] -top-7 -bottom-16 rounded-[28px] bg-[#F4F8FF] border border-[#DCE7FB]" aria-hidden="true">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white border border-[#DCE7FB] px-3 py-0.5 text-[11px] font-black uppercase tracking-widest text-[#1870FF]">
              Think → Build → Innovate
            </span>
            {/* Innovate feeds the next question: the method repeats */}
            <span className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
              <RotateCcw className="w-3.5 h-3.5 text-[#1870FF]" />
              {t('phil.loop')}
            </span>
          </div>

          {/* Desktop: one line drawn on scroll through the method */}
          <div className="hidden lg:block absolute left-0 right-0 top-0 h-[96px] pointer-events-none" aria-hidden="true">
            <svg className="w-full h-full" viewBox="0 0 1000 96" preserveAspectRatio="none">
              <path d="M100 48 C150 6,250 6,300 48 S450 90,500 48 S650 6,700 48 S850 90,900 48" stroke="#DCE6F7" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="2 9" strokeLinecap="round" />
              <motion.path
                d="M100 48 C150 6,250 6,300 48 S450 90,500 48 S650 6,700 48 S850 90,900 48"
                stroke="#1870FF" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* Mobile: vertical line */}
          <div className="lg:hidden absolute left-[43px] top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-[#C9DAF7] via-[#1870FF] to-[#C9DAF7] opacity-40" aria-hidden="true" />

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
                <div
                  className={`relative z-10 shrink-0 w-[88px] h-[88px] lg:w-[96px] lg:h-[96px] rounded-[28px] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 ${
                    node.method ? 'bg-white border border-[#DCE7FB] ring-8 ring-white lg:ring-[#F4F8FF]' : 'bg-[#EEF4FF] ring-8 ring-white'
                  }`}
                >
                  <SpiIcon name={node.icon} size={58} animate="hover" />
                </div>
                <div className="pt-1 lg:pt-0 space-y-1 min-w-0">
                  <h3 className={`text-lg font-black leading-snug ${node.method ? 'text-[#1870FF]' : 'text-[#041A5A]'}`}>{node.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{node.desc}</p>
                  {node.key === 'innovate' && (
                    <p className="lg:hidden pt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                      <RotateCcw className="w-3.5 h-3.5 text-[#1870FF] shrink-0" aria-hidden="true" />
                      {t('phil.loop')}
                    </p>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-16 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end">
          <p className="lg:col-span-8 text-lg sm:text-xl font-semibold text-[#041A5A] leading-relaxed text-pretty">
            “{t('path.closing')}”
          </p>
          <div className="lg:col-span-4 lg:text-right space-y-2">
            <p className="text-sm text-slate-500">{t('phil.products_note')}</p>
            <button
              type="button"
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <span>{t('products.title')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
