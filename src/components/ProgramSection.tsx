import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';

interface ProgramSectionProps {
  onSelectProgram: (path: string) => void;
  onOpenTrial?: (programName: string) => void;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onSelectProgram }) => {
  const programs = [
    {
      id: 'spi-core',
      badge: 'SPI Core',
      image: ASSETS.programs.spiCore,
      link: '/program/spi-core',
      items: [
        'Scratch & mBlock',
        'Python',
        'MIT App Inventor',
        'Arduino & Robotics',
      ],
    },
    {
      id: 'spi-lab',
      badge: 'SPI Lab',
      image: ASSETS.programs.spiLab,
      link: '/program/spi-lab',
      items: [
        'AI for Productivity',
        'Google Workspace',
        'Photoshop',
        'Canva & Design',
        'Logic & Multigame',
      ],
    },
    {
      id: 'spi-engineering',
      badge: 'SPI Engineering',
      image: ASSETS.programs.spiEngineering,
      link: '/program/spi-engineering',
      items: [
        'Machine Learning',
        'Computer Vision',
        'IoT & Smart System',
        'Data Science',
      ],
    },
    {
      id: 'spi-inschool',
      badge: 'SPI InSchool',
      image: ASSETS.programs.spiInSchool,
      link: '/program/spi-inschool',
      items: [
        'School Partnership',
        'Curriculum Integration',
        'Teacher Training',
        'After School Program',
      ],
    },
  ];

  return (
    <section id="programs-section" className="py-16 sm:py-20 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
            Program SPI
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Pilih program terbaik sesuai minat dan jenjang usia
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              id={`program-card-${prog.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#176DF8]/50 transition-all duration-300 flex flex-col justify-between group p-5"
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center space-x-2">
                  <div className="bg-[#176DF8] text-white px-3 py-1 rounded-xl text-xs font-bold font-mono">
                    SPI
                  </div>
                  <span className="text-base font-bold text-slate-800">
                    {prog.badge.replace('SPI ', '')}
                  </span>
                </div>

                {/* Program Illustration */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                  <ImageWithFallback
                    src={prog.image}
                    alt={prog.image}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  {prog.items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-[#176DF8] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Learn More */}
              <div className="pt-6">
                <button
                  id={`btn-learn-more-${prog.id}`}
                  onClick={() => onSelectProgram(prog.link)}
                  className="w-full py-2.5 px-4 bg-white hover:bg-[#176DF8] text-[#176DF8] hover:text-white font-bold text-xs sm:text-sm rounded-xl border border-[#176DF8] transition-all flex items-center justify-center space-x-2 cursor-pointer group-hover:bg-[#176DF8] group-hover:text-white"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
