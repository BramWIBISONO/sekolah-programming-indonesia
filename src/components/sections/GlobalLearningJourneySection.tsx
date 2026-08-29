import React from 'react';
import { Search, BookOpen, Wrench, Hammer, Lightbulb, Presentation } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const GlobalLearningJourneySection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    { key: 'step1', icon: Search, color: 'bg-blue-500' },
    { key: 'step2', icon: BookOpen, color: 'bg-emerald-500' },
    { key: 'step3', icon: Wrench, color: 'bg-purple-500' },
    { key: 'step4', icon: Hammer, color: 'bg-amber-500' },
    { key: 'step5', icon: Lightbulb, color: 'bg-rose-500' },
    { key: 'step6', icon: Presentation, color: 'bg-cyan-500' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('journey.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        {/* Desktop: Horizontal progression */}
        <div className="hidden md:block relative">
          <div className="absolute top-12 left-[8%] right-[8%] h-0.5 bg-blue-100" />
          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-4 relative">
                  <div className={`w-24 h-24 ${step.color} text-white rounded-full flex items-center justify-center shadow-lg z-10`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                  <h3 className="text-base font-bold text-slate-800">{t(`journey.${step.key}`)}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[140px]">{t(`journey.${step.key}_desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center shadow-md shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {idx < steps.length - 1 && <div className="w-0.5 flex-1 bg-blue-100 mt-2" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs font-mono font-bold text-slate-400 block">0{idx + 1}</span>
                  <h3 className="text-lg font-bold text-slate-800">{t(`journey.${step.key}`)}</h3>
                  <p className="text-sm text-slate-500">{t(`journey.${step.key}_desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
