import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { FeaturedStoryCarousel } from '../common/FeaturedStoryCarousel';
import { FEATURED_ACHIEVEMENTS } from '../../data/achievements';

interface StudentAchievementSectionProps {
  onNavigate?: (path: string) => void;
}

/** "Prestasi Siswa SPI": verified achievements in a featured carousel. */
export const StudentAchievementSection: React.FC<StudentAchievementSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const items = FEATURED_ACHIEVEMENTS.map((a) => ({
    id: a.id,
    image: a.image,
    fit: a.fit,
    badge: a.badge,
    title: a.title,
    subtitle: a.subtitle,
    description: a.descKey ? t(a.descKey) : undefined,
    meta: `${a.year} · ${t(a.level === 'International' ? 'ach.level.international' : 'ach.level.national')}`,
  }));

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-12">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">{t('ach.eyebrow')}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.08] text-balance">{t('achievement.title')}</h2>
          </div>
          <div className="lg:col-span-5 space-y-3">
            <p className="text-base text-slate-600 leading-relaxed">{t('achievement.desc')}</p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/achievement')}
                className="group inline-flex items-center gap-2 text-sm font-bold text-[#1870FF] hover:text-[#0B3C95] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                {t('ach.all')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <FeaturedStoryCarousel items={items} label={t('achievement.title')} />
      </div>
    </section>
  );
};
