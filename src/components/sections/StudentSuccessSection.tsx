import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { getYouTubeThumbnailUrl } from '../../utils/youtube';

export const StudentSuccessSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // We will treat STUDENT_PROJECTS as achievements/successes.
  const successes = STUDENT_PROJECTS.slice(0, 5); // take 5 for showcase

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : successes.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < successes.length - 1 ? prev + 1 : 0));
  };

  if (successes.length === 0) return null;
  const currentSuccess = successes[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Keberhasilan Siswa SPI</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 grid grid-cols-1 lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative aspect-video lg:aspect-auto lg:h-full bg-slate-900">
            <ImageWithFallback
              src={currentSuccess.image || getYouTubeThumbnailUrl(currentSuccess.youtubeUrl) || ''}
              alt={currentSuccess.projectName}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Info Side */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            
            <div className="space-y-4">
              <span className="text-sm font-bold text-[#176DF8] uppercase tracking-wider">
                {currentSuccess.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                {currentSuccess.projectName}
              </h3>
              {currentSuccess.studentName && (
                <p className="text-lg font-bold text-slate-700 border-l-4 border-[#176DF8] pl-4">
                  Karya: {currentSuccess.studentName}
                </p>
              )}
              <p className="text-slate-600 leading-relaxed">
                {currentSuccess.description}
              </p>
            </div>

            <div className="pt-8 flex items-center gap-4">
              <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-[#176DF8] hover:border-[#176DF8] transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={handleNext} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-[#176DF8] hover:border-[#176DF8] transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
              <span className="text-sm font-bold text-slate-400 ml-4">
                {currentIndex + 1} / {successes.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
