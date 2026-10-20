import React, { useEffect } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { StudentProject } from '../../types';
import { STUDENT_PROJECTS } from '../../data/mockData';
import { PORTFOLIO } from '../../data/portfolio';
import { getYouTubeThumbnailUrl } from '../../utils/youtube';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { useLanguage } from '../../i18n';
import { ASSETS } from '../../constants/assets';
import { FeaturedStoryCarousel } from '../common/FeaturedStoryCarousel';
import { PortfolioShowcase } from '../common/PortfolioShowcase';
import { IllustratedHero } from '../illustrations/IllustratedHero';

interface ProjectsPageProps {
  onBack: () => void;
  onPlayVideo: (project: StudentProject) => void;
  onOpenTrial: () => void;
}

/** "Karya Siswa": every student project as a featured story, then the portfolio cards, then the trial step. */
export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onPlayVideo, onOpenTrial }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Every project is shown, in the poster format. Posters are 16:9, so they are shown whole (contain).
  const featured = STUDENT_PROJECTS.map((p) => ({
    id: p.id,
    image: getYouTubeThumbnailUrl(p.youtubeUrl, 'maxres') || getYouTubeThumbnailUrl(p.youtubeUrl, 'hq') || '',
    fit: 'contain' as const,
    badge: p.category,
    title: t(`projects.item.${p.id}`),
    subtitle: p.studentName ? t('projects.by').replace('{name}', p.studentName) : undefined,
    description: p.outcome || p.description,
    action: { label: t('pf.watch'), onClick: () => onPlayVideo(p) },
  }));

  const watch = (id: string) => {
    const project = STUDENT_PROJECTS.find((p) => p.id === id);
    if (project) onPlayVideo(project);
  };

  const featuredProject = featured[0];

  const steps = [
    { n: '1', title: t('pf.flow.step1_title'), desc: t('pf.flow.step1_desc') },
    { n: '2', title: t('pf.flow.step2_title'), desc: t('pf.flow.step2_desc') },
    { n: '3', title: t('pf.flow.step3_title'), desc: t('pf.flow.step3_desc') },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="core"
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        description={t('projects.desc')}
        art={featuredProject?.image || ASSETS.studentProjects.stockManager}
        artAlt={featuredProject?.title || t('projects.title')}
        artAspect="16 / 9"
        primary={{
          label: featuredProject ? t('pf.watch') : t('cta.free_trial'),
          onClick: () => featuredProject ? watch(featuredProject.id) : onOpenTrial(),
        }}
        secondary={featuredProject ? { label: t('cta.free_trial'), onClick: onOpenTrial } : undefined}
        onBack={onBack}
        backLabel={t('lab.back')}
      />

      {/* Featured stories */}
      {featured.length > 1 && (
        <section id="featured-projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative">
          <FeaturedStoryCarousel items={featured.slice(1)} label={t('projects.title')} />
        </section>
      )}

      {/* Portfolio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight">{t('pf.title')}</h2>
          <p className="text-sm sm:text-base text-slate-600">{t('pf.desc')}</p>
        </div>
        <PortfolioShowcase items={PORTFOLIO} onWatch={(item) => watch(item.id)} />
      </section>

      {/* Next step after watching: the way into a free trial class */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="relative overflow-hidden rounded-[28px] bg-[#1870FF] text-white px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#FFE38A]">{t('pf.flow.eyebrow')}</p>
              <h2 className="mt-3 text-2xl sm:text-4xl font-black leading-tight tracking-tight text-balance">{t('pf.cta_title')}</h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-blue-100/85">{t('pf.cta_desc')}</p>

              <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                {steps.map((s) => (
                  <li key={s.n} className="border-t border-white/15 pt-4">
                    <span className="text-sm font-black tabular-nums text-[#FFE38A]">{s.n}</span>
                    <p className="mt-2 font-bold">{s.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-blue-100/75">{s.desc}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 font-bold text-[#041A5A] hover:bg-blue-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041A5A]"
                >
                  <span>{t('cta.free_trial')}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => openSpiWhatsApp(t('pf.flow.wa_message'))}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-7 font-bold text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#041A5A]"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{t('pf.flow.wa')}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <img
                src={ASSETS.brand.pandaMascot}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-auto w-48 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)] sm:w-64 lg:w-72"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
