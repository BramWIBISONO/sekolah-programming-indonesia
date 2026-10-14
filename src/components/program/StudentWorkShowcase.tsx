import React, { useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { STUDENT_PROJECTS } from '../../data/mockData';
import { StudentProject } from '../../types';
import { getYouTubeThumbnailUrl } from '../../utils/youtube';
import { ImageWithFallback } from '../common/ImageWithFallback';

/** Student work published on SPI's YouTube channel, filterable by technology. */
const FILTERS = [
  { key: 'All', labelKey: 'core.work.all' },
  { key: 'Python', label: 'Python' },
  { key: 'Arduino', label: 'Arduino & IoT' },
  { key: 'App', label: 'Mobile App' },
  { key: 'Web', label: 'Web App' },
  { key: 'AI/ML', label: 'AI & ML' },
];

const matches = (p: StudentProject, key: string) => key === 'All' || p.category.toLowerCase().includes(key.toLowerCase());

interface StudentWorkShowcaseProps {
  onSelectProject: (project: StudentProject) => void;
}

export const StudentWorkShowcase: React.FC<StudentWorkShowcaseProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('All');

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.key, STUDENT_PROJECTS.filter((p) => matches(p, f.key)).length])),
    []
  );
  const projects = STUDENT_PROJECTS.filter((p) => matches(p, filter));

  return (
    <section className="py-20 md:py-28 bg-[#F7F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-7 space-y-3">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">{t('core.work.eyebrow')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.05]">
              {t('core.work.title')} <span className="text-[#176DF8]">{t('core.work.title_em')}</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-slate-600 leading-relaxed">{t('core.work.desc')}</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" role="group" aria-label={t('core.work.filter')}>
          {FILTERS.map((f) => {
            const selected = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 h-10 px-4 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] ${
                  selected ? 'bg-[#041A5A] text-white' : 'bg-white text-slate-700 border border-[#E3ECFA] hover:border-[#176DF8]'
                }`}
              >
                <span>{f.labelKey ? t(f.labelKey) : f.label}</span>
                <span className={`text-xs tabular-nums ${selected ? 'text-white/70' : 'text-slate-400'}`}>{counts[f.key]}</span>
              </button>
            );
          })}
        </div>

        {projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#C9DAF7] bg-white p-10 text-center text-slate-500">{t('core.work.empty')}</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => {
              const thumb = getYouTubeThumbnailUrl(proj.youtubeUrl, 'maxres') || getYouTubeThumbnailUrl(proj.youtubeUrl, 'hq') || '';
              const [rawTitle, rawName] = proj.projectName.split('|');
              const title = rawTitle.trim();
              const student = rawName?.trim() || proj.studentName || 'SPI';
              return (
                <motion.li
                  key={proj.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                >
                  <button
                    type="button"
                    onClick={() => onSelectProject(proj)}
                    aria-label={`${t('core.work.watch')}: ${title}`}
                    className="group w-full h-full text-left flex flex-col rounded-[22px] bg-white border border-[#E3ECFA] overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(4,26,90,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
                  >
                    <span className="relative block aspect-video bg-slate-100 overflow-hidden">
                      <ImageWithFallback src={thumb} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" fallbackLabel={proj.category} />
                      <span className="absolute inset-0 bg-gradient-to-t from-[#041A5A]/55 via-transparent to-transparent" aria-hidden="true" />
                      <span className="absolute left-3 bottom-3 text-[11px] font-black uppercase tracking-wider text-white bg-[#176DF8] rounded-md px-2 py-1">
                        {proj.category}
                      </span>
                      <span className="absolute right-3 bottom-3 w-11 h-11 rounded-full bg-white text-[#041A5A] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                        <Play className="w-4 h-4 ml-0.5 fill-current" />
                      </span>
                    </span>
                    <span className="flex flex-col flex-1 p-5 gap-3">
                      <span className="text-base font-black text-[#041A5A] leading-snug line-clamp-2">{title}</span>
                      {proj.description && <span className="text-sm text-slate-600 leading-relaxed line-clamp-2">{proj.description}</span>}
                      <span className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-7 h-7 rounded-lg bg-[#FFF6D6] text-[#5C4300] text-xs font-black flex items-center justify-center shrink-0" aria-hidden="true">
                            {student.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-sm font-semibold text-slate-700 truncate">{student}</span>
                        </span>
                        <span className="text-sm font-bold text-[#176DF8] shrink-0">{t('core.work.watch')}</span>
                      </span>
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};
