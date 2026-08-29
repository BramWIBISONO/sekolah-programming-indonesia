import React from 'react';
import { StudentProjectsSection } from '../StudentProjectsSection';
import { StudentProject } from '../../types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectsPageProps {
  onBack: () => void;
  onPlayVideo: (project: StudentProject) => void;
  onOpenTrial: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onBack, onPlayVideo, onOpenTrial }) => {
  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20">
      
      {/* Header Banner */}
      <div className="bg-[#176DF8] text-white py-14 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="max-w-3xl space-y-3">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Student Projects Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Galeri Karya Siswa SPI
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Jelajahi seluruh karya nyata hasil rekayasa siswa SPI—mulai dari sistem IoT, game interaktif, script automasi Python, hingga aplikasi AI.
            </p>
          </div>
        </div>
      </div>

      {/* Main projects grid */}
      <StudentProjectsSection onPlayVideo={onPlayVideo} />

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-[#F4F8FF] p-8 rounded-3xl border border-blue-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Ingin Anak Anda Memiliki Karya Nyata Seperti Ini?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-lg">
              Daftarkan sekarang untuk sesi Free Trial 60 Menit dan bimbingan langsung dari Lead Mentor SPI.
            </p>
          </div>
          <button
            onClick={onOpenTrial}
            className="px-7 py-3 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shrink-0 shadow-md transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>Daftar Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
