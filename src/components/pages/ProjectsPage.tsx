import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { StudentProject } from '../../types';
import { STUDENT_PROJECTS } from '../../data/mockData';
import { PORTFOLIO } from '../../data/portfolio';
import { getYouTubeThumbnailUrl } from '../../utils/youtube';
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

/** "Karya Siswa": featured project stories, then the full portfolio as cards with details. */
export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onPlayVideo, onOpenTrial }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featured = STUDENT_PROJECTS.filter((p) => p.challenge && p.outcome).slice(0, 6).map((p) => ({
    id: p.id,
    image: getYouTubeThumbnailUrl(p.youtubeUrl, 'maxres') || getYouTubeThumbnailUrl(p.youtubeUrl, 'hq') || '',
    fit: 'cover' as const,
    badge: p.category,
    title: t(`projects.item.${p.id}`),
    subtitle: p.studentName ? t('projects.by').replace('{name}', p.studentName) : undefined,
    description: p.outcome,
    action: { label: t('pf.watch'), onClick: () => onPlayVideo(p) },
  }));

  const watch = (id: string) => {
    const project = STUDENT_PROJECTS.find((p) => p.id === id);
    if (project) onPlayVideo(project);
  };

  const featuredProject = featured[0];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      <IllustratedHero
        variant="core"
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        description={t('projects.desc')}
        art={featuredProject?.image || ASSETS.studentProjects.stockManager}
        artAlt={featuredProject?.title || t('projects.title')}
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

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-[#F4F8FF] p-6 sm:p-8 rounded-3xl border border-[#DCE7FB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="text-xl font-black text-[#041A5A]">{t('pf.cta_title')}</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-lg">{t('pf.cta_desc')}</p>
          </div>
          <button
            type="button"
            onClick={onOpenTrial}
            className="w-full sm:w-auto justify-center h-12 px-7 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shrink-0 shadow-md transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
          >
            <span>{t('cta.free_trial')}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
