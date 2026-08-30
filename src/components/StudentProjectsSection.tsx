import React, { useState, useCallback } from 'react';
import { STUDENT_PROJECTS } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getYouTubeVideoId, getYouTubeThumbnailUrl } from '../utils/youtube';
import { useLanguage } from '../i18n';
import { motion, AnimatePresence } from 'motion/react';
import { YouTubeEmbed } from './common/YouTubeEmbed';
import { ImageWithFallback } from './common/ImageWithFallback';

export const StudentProjectsSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const totalProjects = STUDENT_PROJECTS.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalProjects - 1));
  }, [totalProjects]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < totalProjects - 1 ? prev + 1 : 0));
  }, [totalProjects]);

  const activeProject = STUDENT_PROJECTS[activeIndex];
  const activeVideoId = getYouTubeVideoId(activeProject.youtubeUrl) || '';

  // Get side-list projects (next 3 after active, wrapping)
  const sideProjects = [];
  for (let i = 1; i <= 3; i++) {
    sideProjects.push(STUDENT_PROJECTS[(activeIndex + i) % totalProjects]);
  }

  return (
    <section id="student-projects-section" className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full mt-4 mb-4" />
          <p className="text-slate-500 text-sm sm:text-base">
            {t('projects.desc')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Featured Project (YouTube Embed) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl"
                >
                  {/* YouTube Embed - autoplay muted */}
                  <YouTubeEmbed
                    videoId={activeVideoId}
                    title={activeProject.projectName}
                    options={{
                      autoplay: true,
                      muted: true,
                      controls: true,
                    }}
                  />
                  
                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-6 sm:p-8 pointer-events-none">
                    <span className="inline-block bg-[#176DF8] text-white px-3 py-1 rounded-lg text-xs font-bold mb-3 shadow-md">
                      {activeProject.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2">
                      {activeProject.projectName}
                    </h3>
                    {activeProject.studentName && (
                      <p className="text-slate-300 font-medium text-sm mt-1">
                        By {activeProject.studentName}
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Scrollable List (Smaller items) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Project Lainnya</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-slate-400 font-medium">
                    {activeIndex + 1} / {totalProjects}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handlePrev}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#176DF8] hover:text-[#176DF8] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:border-[#176DF8] hover:text-[#176DF8] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <AnimatePresence mode="popLayout">
                  {sideProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      onClick={() => {
                        const realIdx = STUDENT_PROJECTS.findIndex(p => p.id === project.id);
                        if (realIdx >= 0) setActiveIndex(realIdx);
                      }}
                      className="group flex items-center space-x-4 bg-white p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
                        <ImageWithFallback
                          src={getYouTubeThumbnailUrl(project.youtubeUrl) || ''}
                          alt={getYouTubeThumbnailUrl(project.youtubeUrl) || ''}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0 py-1">
                        <span className="text-[10px] font-bold text-[#176DF8] uppercase tracking-wider mb-1 block">
                          {project.category}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight mb-1 group-hover:text-[#176DF8] transition-colors line-clamp-2">
                          {project.projectName}
                        </h4>
                        {project.studentName && (
                          <p className="text-xs text-slate-500 truncate">
                            By {project.studentName}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
