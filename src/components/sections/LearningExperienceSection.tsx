import React from 'react';
import { Brain, Code, Rocket, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const LearningExperienceSection: React.FC = () => {
  const { t } = useLanguage();
  const steps = [
    { key: 'learn', icon: Brain },
    { key: 'practice', icon: Code },
    { key: 'apply', icon: CheckCircle2 },
    { key: 'innovate', icon: Rocket },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('learnexp.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/8 right-1/8 h-0.5 bg-blue-100 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-white border-4 border-blue-50 shadow-lg rounded-full flex items-center justify-center text-[#176DF8] group hover:border-[#176DF8] transition-all">
                   <Icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{t(`learnexp.${step.key}`)}</h3>
                <p className="text-sm text-slate-500 max-w-xs">{t(`learnexp.${step.key}_desc`)}</p>
              </div>
            );
          })}
        </div>

        {/* Image Container / Box */}
        <div className="max-w-5xl mx-auto mt-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-100/80 bg-white">
           <ImageWithFallback 
             src={ASSETS.homepage.learning} 
             fallbackLabel={t('learnexp.title')}
             alt={t('learnexp.title')}
             loading="lazy"
             className="w-full h-auto object-contain block" 
           />
        </div>
      </div>
    </section>
  );
};
