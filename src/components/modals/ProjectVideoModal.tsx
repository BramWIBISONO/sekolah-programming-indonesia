import React from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { StudentProject } from '../../types';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface ProjectVideoModalProps {
  project: StudentProject | null;
  onClose: () => void;
}

export const ProjectVideoModal: React.FC<ProjectVideoModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl);

  const handleOpenYouTubeDirectly = () => {
    if (project.youtubeUrl) {
      window.open(project.youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-700/60 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-white">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <span className="bg-[#176DF8]/20 text-[#5BA7FF] border border-[#176DF8]/40 px-3 py-1 rounded-full text-xs font-bold shrink-0">
              {project.category}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white truncate">
                {project.projectName}
              </h3>
              {project.studentName && (
                <p className="text-xs text-slate-400 font-medium truncate">
                  Oleh: <span className="text-slate-200">{project.studentName}</span>
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.projectName}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-3 p-6 text-center">
              <Play className="w-12 h-12 text-[#176DF8]" />
              <p className="text-sm text-slate-300">Video tidak dapat diputar langsung di dalam modal.</p>
              <button
                onClick={handleOpenYouTubeDirectly}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Buka & Tonton di YouTube
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer - Direct Link */}
        <div className="px-6 py-4 bg-slate-900/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-medium text-center sm:text-left">
            {project.description || 'Proyek siswa Sekolah Programming Indonesia'}
          </div>
          <button
            onClick={handleOpenYouTubeDirectly}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer shrink-0"
          >
            <span>Tonton di YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
