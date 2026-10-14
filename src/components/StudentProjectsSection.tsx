import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { STUDENT_PROJECTS } from '../data/mockData';
import { getYouTubeVideoId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { useLanguage } from '../i18n';
import { YouTubeEmbed } from './common/YouTubeEmbed';
import { ImageWithFallback } from './common/ImageWithFallback';

/**
 * Editorial showcase of real student work published on SPI's YouTube channel.
 * The video leads; the challenge → thinking → result story sits underneath it,
 * and a thumbnail list (a vertical tablist with arrow-key support) switches projects.
 */
export const StudentProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const total = STUDENT_PROJECTS.length;
  const active = STUDENT_PROJECTS[activeIndex];
  const activeVideoId = getYouTubeVideoId(active.youtubeUrl) || '';
  const titleOf = (id: string) => t(`projects.item.${id}`);

  const select = (index: number, focus = false) => {
    const next = (index + total) % total;
    setActiveIndex(next);
    if (focus) {
      const el = tabRefs.current[next];
      el?.focus();
      el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in moves) {
      e.preventDefault();
      select(activeIndex + moves[e.key], true);
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      select(e.key === 'Home' ? 0 : total - 1, true);
    }
  };

  const story = [
    { key: 'challenge', text: active.challenge },
    { key: 'thinking', text: active.thinkingProcess },
    { key: 'result', text: active.outcome },
  ].filter((s) => s.text);

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.28 } };

  return (
    <section id="student-projects-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-12">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('projects.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08] text-balance">
              {t('projects.title')}
            </h2>
          </div>
          <p className="lg:col-span-5 text-base text-slate-600 leading-relaxed text-pretty">{t('projects.desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">

          {/* Featured video: nothing is layered over the player */}
          <div className="lg:col-span-8 space-y-5">
            <div className="rounded-[24px] overflow-hidden bg-slate-900 shadow-[0_30px_60px_-40px_rgba(4,26,90,0.6)]">
              {activeVideoId && (
                <YouTubeEmbed key={activeVideoId} videoId={activeVideoId} title={titleOf(active.id)} autoplayWhenVisible />
              )}
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} {...fade} className="space-y-2">
                <p className="text-sm text-slate-500">
                  <span className="font-bold text-[#1870FF]">{active.category}</span>
                  {active.studentName && <span> · {t('projects.by').replace('{name}', active.studentName)}</span>}
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-[#041A5A] tracking-tight leading-tight">{titleOf(active.id)}</h3>
                {active.description && <p className="text-base text-slate-600 leading-relaxed max-w-3xl">{active.description}</p>}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Project switcher */}
          <div className="lg:col-span-4 lg:row-span-2 min-w-0">
            <div className="flex items-baseline justify-between mb-3">
              <p id="projects-list-label" className="text-sm font-black text-[#041A5A]">{t('projects.choose')}</p>
              <p className="text-xs font-semibold text-slate-400 tabular-nums" aria-hidden="true">
                {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
            </div>
            <div
              role="tablist"
              aria-labelledby="projects-list-label"
              aria-orientation="vertical"
              onKeyDown={onListKeyDown}
              className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:max-h-[640px] snap-x snap-mandatory lg:snap-none hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 lg:pr-1"
            >
              {STUDENT_PROJECTS.map((project, i) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={project.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`project-tab-${project.id}`}
                    aria-selected={selected}
                    aria-controls="project-story-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className={`group relative w-[200px] sm:w-[220px] lg:w-full shrink-0 snap-start flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 lg:gap-3 p-2 lg:pr-3 rounded-2xl text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                      selected ? 'bg-[#EEF4FF]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-colors hidden lg:block ${selected ? 'bg-[#1870FF]' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />
                    <span className={`relative w-full aspect-video lg:w-24 lg:h-[54px] lg:aspect-auto rounded-xl overflow-hidden bg-slate-100 shrink-0 ring-2 lg:ring-0 ${selected ? 'ring-[#1870FF]' : 'ring-transparent'}`}>
                      <ImageWithFallback
                        src={getYouTubeThumbnailUrl(project.youtubeUrl) || ''}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="min-w-0 flex-1 px-1 lg:px-0 pb-1 lg:pb-0">
                      <span className={`block text-sm font-bold leading-snug line-clamp-2 ${selected ? 'text-[#041A5A]' : 'text-slate-700'}`}>
                        {titleOf(project.id)}
                      </span>
                      <span className="block text-xs text-slate-500 truncate mt-0.5">
                        {project.category}{project.studentName ? ` · ${project.studentName}` : ''}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="hidden lg:block text-xs text-slate-400 mt-3">{t('projects.keyboard_hint')}</p>
          </div>

          {/* Challenge → thinking → result */}
          <div
            id="project-story-panel"
            role="tabpanel"
            aria-labelledby={`project-tab-${active.id}`}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active.id} {...fade}>
                {story.length > 0 && (
                  <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-[#E3ECFA] pt-6">
                    {story.map((s, i) => (
                      <li key={s.key} className="space-y-2">
                        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#041A5A]">
                          <span className="text-[#1870FF] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                          {t(`projects.${s.key}`)}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                      </li>
                    ))}
                  </ol>
                )}

                {(active.techStack?.length || active.skillsLearned?.length) ? (
                  <details className="group/details mt-6 border-t border-[#E3ECFA] pt-4">
                    <summary className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF] cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]">
                      {t('projects.details')}
                      <ChevronDown className="w-4 h-4 transition-transform group-open/details:rotate-180" aria-hidden="true" />
                    </summary>
                    <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
                      {active.techStack?.length ? (
                        <>
                          <dt className="font-bold text-[#041A5A]">{t('projects.tech')}</dt>
                          <dd className="text-slate-600">{active.techStack.join(' · ')}</dd>
                        </>
                      ) : null}
                      {active.skillsLearned?.length ? (
                        <>
                          <dt className="font-bold text-[#041A5A]">{t('projects.skills')}</dt>
                          <dd className="text-slate-600">{active.skillsLearned.join(' · ')}</dd>
                        </>
                      ) : null}
                    </dl>
                  </details>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
