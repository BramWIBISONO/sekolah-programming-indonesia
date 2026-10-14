import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { Code2, Cpu, Bot, Presentation, Users2, Wrench, ChevronRight } from 'lucide-react';

export const ClassroomExperienceSection: React.FC = () => {
  const { t } = useLanguage();

  const flowSteps = ['learn', 'practice', 'build', 'present'];

  const activities = [
    { key: 'coding', icon: Code2, asset: ASSETS.learning.codingClass },
    { key: 'robotics', icon: Wrench, asset: ASSETS.learning.roboticsClass },
    { key: 'ai', icon: Bot, asset: ASSETS.learning.aiProject },
    { key: 'presentation', icon: Presentation, asset: ASSETS.learning.studentPresentation },
    { key: 'mentor', icon: Users2, asset: ASSETS.learning.mentorSession },
    { key: 'team', icon: Cpu, asset: ASSETS.learning.teamProject },
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('classroom.title')}</h2>
          <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('classroom.desc')}</p>
        </div>

        {/* Learning Flow */}
        <ol className="grid grid-cols-2 gap-2 max-w-sm mx-auto sm:max-w-none sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-x-3 sm:gap-y-2">
          {flowSteps.map((step, idx) => (
            <li key={step} className="flex items-center sm:gap-3">
              <span className="w-full sm:w-auto inline-flex items-center gap-2 bg-white border border-[#DCE7FB] text-[#041A5A] pl-1.5 pr-3 sm:pr-4 py-1.5 rounded-full text-[13px] sm:text-sm font-bold">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#1870FF] text-white text-[10px] sm:text-xs font-black flex items-center justify-center tabular-nums" aria-hidden="true">{idx + 1}</span>
                {t(`classroom.${step}`)}
              </span>
              {idx < flowSteps.length - 1 && <ChevronRight className="hidden sm:block w-4 h-4 text-[#9DBEF7] shrink-0" aria-hidden="true" />}
            </li>
          ))}
        </ol>

        {/* Main + Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 flex flex-col">
            <ImageWithFallback
              src={ASSETS.learning.classroom}
              alt={t('classroom.main_alt')}
              fallbackLabel={t('classroom.title')}
              loading="lazy"
              className="w-full h-full min-h-[200px] sm:min-h-[320px] object-cover flex-1"
            />
          </div>
          <div className="lg:col-span-5 flex sm:grid sm:grid-cols-3 lg:grid-cols-2 gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 hide-scrollbar">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.key} className="w-[46%] shrink-0 snap-start sm:w-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group">
                  <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-800">
                    <ImageWithFallback src={act.asset} alt={t(`classroom.${act.key}`)} fallbackLabel={t(`classroom.${act.key}`)} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#1870FF] shrink-0" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{t(`classroom.${act.key}`)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
