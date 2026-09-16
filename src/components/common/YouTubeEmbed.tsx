import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { buildYouTubeEmbedUrl, getYouTubeThumbnailUrl, YouTubeEmbedOptions } from '../../utils/youtube';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  options?: YouTubeEmbedOptions;
  /**
   * Poster-first strategy: renders a poster thumbnail with a play affordance and
   * only mounts the heavy YouTube iframe after an explicit user tap.
   */
  posterFirst?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  className = '',
  options = {},
  posterFirst = false,
}) => {
  const [playRequested, setPlayRequested] = useState(false);

  // When poster-first, playing only starts after an explicit tap (user intent).
  const embedOptions = posterFirst ? { ...options, autoplay: true } : options;
  const embedUrl = buildYouTubeEmbedUrl(videoId, embedOptions);

  return (
    <div className={`relative aspect-video bg-slate-900 overflow-hidden ${className}`}>
      {posterFirst && !playRequested ? (
        <button
          type="button"
          onClick={() => setPlayRequested(true)}
          className="absolute inset-0 w-full h-full group cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={getYouTubeThumbnailUrl(`https://www.youtube.com/watch?v=${videoId}`, 'maxres')
              || getYouTubeThumbnailUrl(`https://www.youtube.com/watch?v=${videoId}`)
              || ''}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/20 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#176DF8] shadow-2xl border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#176DF8] group-hover:text-white transition-all duration-200">
              <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-0.5 fill-current" />
            </div>
            <span className="bg-white/95 text-[#176DF8] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              Watch Video
            </span>
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};
