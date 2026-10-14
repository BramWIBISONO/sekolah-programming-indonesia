import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../i18n';
import { ASSETS } from '../constants/assets';

interface ProgramSectionProps {
  onSelectProgram: (path: string) => void;
  onOpenTrial?: (programName: string) => void;
}

interface ProgramCard {
  id: string;
  key: 'core' | 'lab' | 'engineering' | 'inschool';
  link: string;
  /** SPI's original program illustration. */
  image: string;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onSelectProgram }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const programs: ProgramCard[] = [
    { id: 'spi-core', key: 'core', link: '/program/spi-core', image: ASSETS.programs.spiCore },
    { id: 'spi-lab', key: 'lab', link: '/program/spi-lab', image: ASSETS.programs.spiLab },
    { id: 'spi-engineering', key: 'engineering', link: '/program/spi-engineering', image: ASSETS.programs.spiEngineering },
    { id: 'spi-inschool', key: 'inschool', link: '/program/spi-inschool', image: ASSETS.programs.spiInSchool },
  ];

  return (
    <section id="programs-section" className="py-16 sm:py-24 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('products.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08]">
              {t('products.title')}
            </h2>
          </div>
          <p className="lg:col-span-5 text-slate-600 text-base leading-relaxed">{t('products.desc')}</p>
        </div>

        {/* Mobile: horizontal snap carousel · sm+: grid */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {programs.map((prog, i) => (
            <motion.article
              key={prog.id}
              id={`program-card-${prog.id}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group w-[280px] shrink-0 snap-start sm:w-auto flex flex-col rounded-[24px] bg-white border border-[#E3ECFA] overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#1870FF]/40 hover:shadow-[0_28px_50px_-30px_rgba(4,26,90,0.45)]"
            >
              {/* Original SPI illustration, settling into place once on view (scaled to crop its built-in frame) */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#EEF4FF] overflow-hidden">
                <motion.img
                  src={prog.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  initial={reduce ? false : { scale: 1.2 }}
                  whileInView={reduce ? undefined : { scale: 1.1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  style={reduce ? { scale: 1.1 } : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-[#041A5A] tracking-tight">{t(`prog.${prog.key}.short`)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t(`prog.${prog.key}.purpose`)}</p>
                </div>

                <dl className="space-y-2 text-[13px] leading-snug border-t border-slate-100 pt-4">
                  <div>
                    <dt className="font-bold text-[#041A5A]">{t('programs.for')}</dt>
                    <dd className="text-slate-600">{t(`prog.${prog.key}.audience`)}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-[#041A5A]">{t('programs.output')}</dt>
                    <dd className="text-slate-600">{t(`prog.${prog.key}.output`)}</dd>
                  </div>
                </dl>

                <button
                  id={`btn-learn-more-${prog.id}`}
                  type="button"
                  onClick={() => onSelectProgram(prog.link)}
                  className="mt-auto w-full h-11 px-4 rounded-xl border-2 border-[#1870FF] text-[#1870FF] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer hover:bg-[#1870FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 active:translate-y-px"
                >
                  <span>{prog.key === 'inschool' ? t('prog.inschool.cta') : t('products.explore').replace('{name}', t(`prog.${prog.key}.short`))}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
