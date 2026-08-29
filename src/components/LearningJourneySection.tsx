import React from 'react';
import { Bot, Puzzle, Code2, Rocket } from 'lucide-react';

export const LearningJourneySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'AI Mindset',
      description: 'Mengembangkan pola pikir ingin tahu, kreatif, dan siap menghadapi dunia digital.',
      icon: Bot,
    },
    {
      num: '02',
      title: 'Computational Thinking',
      description: 'Belajar berpikir logis, memecahkan masalah, dan membuat keputusan.',
      icon: Puzzle,
    },
    {
      num: '03',
      title: 'Programming Skill',
      description: 'Mulai dari block coding hingga text-based coding untuk membangun apa saja.',
      icon: Code2,
    },
    {
      num: '04',
      title: 'Innovation Engineering',
      description: 'Mewujudkan ide menjadi solusi nyata dan siap berdampak untuk dunia.',
      icon: Rocket,
    },
  ];

  return (
    <section id="learning-journey-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
            Our Learning Journey
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Perjalanan belajar yang bermakna dan berkesinambungan
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-blue-100 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  id={`journey-step-${step.num}`}
                  className="flex flex-col items-center text-center space-y-3 group"
                >
                  {/* Circular Icon with connecting dot */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-blue-50 text-[#176DF8] flex items-center justify-center shadow-sm border-2 border-white group-hover:scale-105 group-hover:bg-[#176DF8] group-hover:text-white transition-all duration-300">
                      <IconComp className="w-8 h-8" />
                    </div>

                    {/* Small inter-step connector dot on right (except last) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-8 -translate-y-1/2 w-4 h-4 rounded-full bg-[#176DF8] text-white items-center justify-center text-[8px] font-bold">
                        <span>›</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    <span className="text-[#176DF8] font-bold mr-1.5">{step.num}</span>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
