import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../i18n';
import { SpiIcon, type SpiIconName } from './illustrations/SpiIcon';

interface ProgramSectionProps {
  onSelectProgram: (path: string) => void;
  onOpenTrial?: (programName: string) => void;
}

interface ProgramCard {
  id: string;
  key: 'core' | 'lab' | 'engineering' | 'inschool';
  icon: SpiIconName;
  link: string;
  /** Header tint and accent colour, so each program is recognisable at a glance. */
  tint: string;
  accent: string;
  items: string[];
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onSelectProgram }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  const programs: ProgramCard[] = [
    {
      id: 'spi-core',
      key: 'core',
      icon: 'core',
      link: '/program/spi-core',
      tint: 'bg-[#E6F0FF]',
      accent: 'text-[#176DF8] border-[#176DF8]',
      items: ['Scratch & mBlock', 'Python', 'MIT App Inventor', 'Arduino & Robotics'],
    },
    {
      id: 'spi-lab',
      key: 'lab',
      icon: 'lab',
      link: '/program/spi-lab',
      tint: 'bg-[#F0ECFF]',
      accent: 'text-[#6D28D9] border-[#6D28D9]',
      items: ['AI for Productivity', 'Google Workspace', 'Photoshop', 'Canva & Design', 'Logic & Multigame'],
    },
    {
      id: 'spi-engineering',
      key: 'engineering',
      icon: 'engineering',
      link: '/program/spi-engineering',
      tint: 'bg-[#E4E9F6]',
      accent: 'text-[#041A5A] border-[#041A5A]',
      items: ['Machine Learning', 'Computer Vision', 'IoT & Smart System', 'Data Science'],
    },
    {
      id: 'spi-inschool',
      key: 'inschool',
      icon: 'inschool',
      link: '/program/spi-inschool',
      tint: 'bg-[#E2F5EC]',
      accent: 'text-[#0B7A52] border-[#0B7A52]',
      items: [t('prog.inschool.i1'), t('prog.inschool.i2'), t('prog.inschool.i3'), t('prog.inschool.i4')],
    },
  ];

  return (
    <section id="programs-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-14">
          <h2 className="lg:col-span-7 text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08]">
            {t('programs.title')}
          </h2>
          <p className="lg:col-span-5 text-slate-600 text-base leading-relaxed">{t('programs.desc')}</p>
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
              className="group w-[280px] shrink-0 snap-start sm:w-auto flex flex-col rounded-[24px] bg-white border border-[#E3ECFA] overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(4,26,90,0.45)]"
            >
              {/* Illustrated header */}
              <div className={`relative h-36 ${prog.tint} flex flex-col items-start justify-between px-5 pt-4 pb-3 overflow-hidden`}>
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ backgroundImage: 'radial-gradient(rgba(4,26,90,0.10) 1px, transparent 1px)', backgroundSize: '14px 14px' }}
                  aria-hidden="true"
                />
                <span className={`relative text-[11px] font-black uppercase tracking-wider whitespace-nowrap bg-white/90 border ${prog.accent} rounded-md px-2 py-1`}>
                  {t(`prog.${prog.key}.level`)}
                </span>
                <SpiIcon
                  name={prog.icon}
                  size={80}
                  animate="hover"
                  className="relative self-end -mb-1 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>

              <div className="flex flex-col flex-1 p-5 gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-[#041A5A] leading-snug">{t(`prog.${prog.key}.label`)}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t(`prog.${prog.key}.purpose`)}</p>
                </div>

                <dl className="space-y-2.5 text-[13px] leading-snug">
                  <div className="flex gap-2.5">
                    <SpiIcon name="community" size={22} animate="none" className="shrink-0" />
                    <div>
                      <dt className="sr-only">{t('programs.for')}</dt>
                      <dd className="text-slate-700"><span className="font-bold text-[#041A5A]">{t('programs.for')}:</span> {t(`prog.${prog.key}.audience`)}</dd>
                    </div>
                  </div>
                  <div className="flex gap-2.5">
                    <SpiIcon name="innovate" size={22} animate="none" className="shrink-0" />
                    <div>
                      <dt className="sr-only">{t('programs.output')}</dt>
                      <dd className="text-slate-700"><span className="font-bold text-[#041A5A]">{t('programs.output')}:</span> {t(`prog.${prog.key}.output`)}</dd>
                    </div>
                  </div>
                </dl>

                <ul className="flex flex-wrap gap-1.5" aria-label={t('programs.topics')}>
                  {prog.items.map((item) => (
                    <li key={item} className="text-[12px] font-semibold text-slate-700 bg-[#F4F6FB] rounded-md px-2 py-1">
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  id={`btn-learn-more-${prog.id}`}
                  type="button"
                  onClick={() => onSelectProgram(prog.link)}
                  className="mt-auto w-full h-11 px-4 rounded-xl border-2 border-[#176DF8] text-[#176DF8] font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer hover:bg-[#176DF8] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] focus-visible:ring-offset-2 active:translate-y-px"
                >
                  <span>{prog.key === 'inschool' ? t('prog.inschool.cta') : t('common.learn_more')}</span>
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
