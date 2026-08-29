import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { Code2, Cpu, Bot, Presentation, Users2, Wrench } from 'lucide-react';

export const ClassroomExperienceSection: React.FC = () => {
  const { t } = useLanguage();

  const flowSteps = [
    { key: 'learn', color: 'bg-blue-500' },
    { key: 'practice', color: 'bg-emerald-500' },
    { key: 'build', color: 'bg-purple-500' },
    { key: 'present', color: 'bg-amber-500' },
  ];

  const activities = [
    { key: 'coding', icon: Code2, asset: ASSETS.CLASSROOM.CODING },
    { key: 'robotics', icon: Wrench, asset: ASSETS.CLASSROOM.ROBOTICS },
    { key: 'ai', icon: Bot, asset: ASSETS.CLASSROOM.AI_PROJECT },
    { key: 'presentation', icon: Presentation, asset: ASSETS.CLASSROOM.PRESENTATION },
    { key: 'mentor', icon: Users2, asset: ASSETS.CLASSROOM.MENTOR_SESSION },
    { key: 'team', icon: Cpu, asset: ASSETS.CLASSROOM.TEAM_PROJECT },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('classroom.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('classroom.desc')}</p>
        </div>

        {/* Learning Flow */}
        <div className="flex flex-wrap justify-center gap-4">
          {flowSteps.map((step, idx) => (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`${step.color} text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm`}>
                {t(`classroom.${step.key}`)}
              </div>
              {idx < flowSteps.length - 1 && (
                <span className="hidden sm:block text-slate-300 text-lg">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Main + Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
            <ImageWithFallback
              src={ASSETS.CLASSROOM.MAIN}
              alt="SPI Classroom"
              fallbackLabel="See SPI in Action"
              className="w-full aspect-[16/10] object-cover"
            />
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.key} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-200 transition-all group">
                  <div className="aspect-[4/3] bg-slate-50">
                    <ImageWithFallback src={act.asset} alt={t(`classroom.${act.key}`)} fallbackLabel={t(`classroom.${act.key}`)} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#176DF8] shrink-0" />
                    <span className="text-xs font-bold text-slate-700 truncate">{t(`classroom.${act.key}`)}</span>
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
