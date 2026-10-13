import React, { useState, useRef } from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import { useLanguage } from '../i18n';

interface ProgramSectionProps {
  onSelectProgram: (path: string) => void;
  onOpenTrial?: (programName: string) => void;
}

export const ProgramSection: React.FC<ProgramSectionProps> = ({ onSelectProgram }) => {
  const { t } = useLanguage();
  const programs = [
    {
      id: 'spi-core',
      key: 'core',
      accent: 'bg-[#176DF8]',
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
      key: 'lab',
      accent: 'bg-purple-600',
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
      key: 'engineering',
      accent: 'bg-[#041A5A]',
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
      key: 'inschool',
      accent: 'bg-emerald-600',
      image: ASSETS.programs.spiInSchool,
      link: '/program/spi-inschool',
      items: [
        t('prog.inschool.i1'),
        t('prog.inschool.i2'),
        t('prog.inschool.i3'),
        t('prog.inschool.i4'),
      ],
    },
  ];

  return (
    <section id="programs-section" className="py-16 sm:py-20 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
            {t('programs.title')}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {t('programs.desc')}
          </p>
        </div>

        {/* 4 Cards: mobile horizontal snap carousel · sm+: grid · lg: unchanged 4-col grid */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3 hide-scrollbar sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {programs.map((prog) => (
            <div
              key={prog.id}
              id={`program-card-${prog.id}`}
              className="w-[252px] shrink-0 snap-start sm:w-auto bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#176DF8]/50 transition-all duration-300 flex flex-col justify-between group p-5"
            >
              <div className="space-y-4">
                {/* Program name and purpose */}
                <div className="space-y-2">
                  <div className={`h-1 w-10 rounded-full ${prog.accent}`} aria-hidden="true" />
                  <h3 className="text-base font-bold text-slate-800 leading-snug">
                    {t(`prog.${prog.key}.label`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {t(`prog.${prog.key}.purpose`)}
                  </p>
                </div>

                {/* Program Illustration */}
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                  <ImageWithFallback
                    src={prog.image}
                    alt={t(`prog.${prog.key}.label`)}
                    loading="lazy"
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
                  <span>{t('common.learn_more')}</span>
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
