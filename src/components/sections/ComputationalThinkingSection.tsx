import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { ListTree, LayoutGrid, EyeOff, Waypoints } from 'lucide-react';

export const ComputationalThinkingSection: React.FC = () => {
  const { t } = useLanguage();

  const concepts = [
    { key: 'decomposition', icon: ListTree, color: 'text-blue-500 bg-blue-50' },
    { key: 'pattern', icon: LayoutGrid, color: 'text-emerald-500 bg-emerald-50' },
    { key: 'abstraction', icon: EyeOff, color: 'text-amber-500 bg-amber-50' },
    { key: 'algorithm', icon: Waypoints, color: 'text-purple-500 bg-purple-50' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-[120px] opacity-70 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">Core Philosophy</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] leading-[1.1] tracking-tight">
                {t('ct.title')}
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed max-w-xl">
                {t('ct.desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {concepts.map((concept) => {
                const Icon = concept.icon;
                return (
                  <div key={concept.key} className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#176DF8]/20 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3 ${concept.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{t(`ct.${concept.key}`)}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{t(`ct.${concept.key}_desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="relative rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200 shadow-2xl aspect-video group">
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
              <iframe 
                src="https://www.youtube.com/embed/2XDyRUKSkh4?autoplay=1&mute=1&loop=1&playlist=2XDyRUKSkh4&controls=0&modestbranding=1" 
                title="What is Computational Thinking?"
                className="absolute inset-0 w-full h-full object-cover scale-105"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] rounded-[32px] overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <ImageWithFallback 
                src={ASSETS.learning.roboticsClass} 
                alt={ASSETS.learning.roboticsClass}
                fallbackLabel="Computational Thinking Visual"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
