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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="bg-[#176DF8]/10 text-[#176DF8] px-2.5 py-0.5 rounded-full text-xs font-bold">
              {project.category}
            </span>
            <h3 className="text-base font-bold text-slate-800 truncate max-w-sm sm:max-w-md">
              {project.projectName}
            </h3>
          </div>
          
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Embed */}
        <div className="relative aspect-video bg-black">
          {embedUrl ? (
            <iframe
              src={`${embedUrl}?autoplay=1&rel=0`}
              title={project.projectName}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-3">
              <Play className="w-12 h-12 text-[#176DF8]" />
              <button
                onClick={handleOpenYouTubeDirectly}
                className="px-4 py-2 bg-[#176DF8] text-white rounded-xl text-xs font-bold"
              >
                Buka di YouTube
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer - Direct Link */}
        <div className="p-4 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Sekolah Programming Indonesia
          </span>
          <button
            onClick={handleOpenYouTubeDirectly}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-[#176DF8] hover:bg-[#1059D4] text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <span>Tonton di YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
