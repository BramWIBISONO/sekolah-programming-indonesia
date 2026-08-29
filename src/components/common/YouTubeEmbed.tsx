import React from 'react';
import { buildYouTubeEmbedUrl, YouTubeEmbedOptions } from '../../utils/youtube';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
  options?: YouTubeEmbedOptions;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  className = '',
  options = {},
}) => {
  const embedUrl = buildYouTubeEmbedUrl(videoId, options);

  return (
    <div className={`relative aspect-video bg-slate-900 overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
