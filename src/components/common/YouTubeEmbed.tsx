import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { buildYouTubeEmbedUrl, getYouTubeThumbnailUrl, YouTubeEmbedOptions } from '../../utils/youtube';
import { useLanguage } from '../../i18n';

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
  /**
   * Muted autoplay driven by visibility: the iframe mounts when the player nears the
   * viewport, pauses when it scrolls away and resumes when it returns (the iframe stays
   * mounted, so nothing is downloaded again). Falls back to poster-first when the visitor
   * prefers reduced motion or has data saver enabled.
   */
  autoplayWhenVisible?: boolean;
}

const prefersManualPlayback = () => {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return Boolean(reducedMotion || saveData);
};

const sendPlayerCommand = (iframe: HTMLIFrameElement | null, func: 'playVideo' | 'pauseVideo') => {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), 'https://www.youtube.com');
};

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title,
  className = '',
  options = {},
  posterFirst = false,
  autoplayWhenVisible = false,
}) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [manualOnly] = useState(prefersManualPlayback);
  const visibilityAutoplay = autoplayWhenVisible && !manualOnly;
  const [playRequested, setPlayRequested] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);

  // Mount the iframe once the player approaches the viewport; pause/resume as it leaves/returns.
  useEffect(() => {
    if (!visibilityAutoplay) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          sendPlayerCommand(iframeRef.current, 'playVideo');
        } else {
          sendPlayerCommand(iframeRef.current, 'pauseVideo');
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visibilityAutoplay, videoId]);

  const showPoster = visibilityAutoplay
    ? !nearViewport
    : (posterFirst || (autoplayWhenVisible && manualOnly)) && !playRequested;

  const embedOptions: YouTubeEmbedOptions = visibilityAutoplay
    ? { ...options, autoplay: true, muted: true, jsApi: true }
    : posterFirst || autoplayWhenVisible
      ? { ...options, autoplay: true }
      : options;
  const embedUrl = buildYouTubeEmbedUrl(videoId, embedOptions);

  const thumbnail =
    getYouTubeThumbnailUrl(`https://www.youtube.com/watch?v=${videoId}`, 'maxres')
    || getYouTubeThumbnailUrl(`https://www.youtube.com/watch?v=${videoId}`)
    || '';

  return (
    <div ref={containerRef} className={`relative aspect-video bg-slate-900 overflow-hidden ${className}`}>
      {showPoster ? (
        <button
          type="button"
          onClick={() => (visibilityAutoplay ? setNearViewport(true) : setPlayRequested(true))}
          className="absolute inset-0 w-full h-full group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/60"
          aria-label={`${t('video.play')}: ${title}`}
        >
          <img
            src={thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/20 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#1870FF] shadow-2xl border border-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1870FF] group-hover:text-white transition-all duration-200">
              <Play className="w-7 h-7 sm:w-9 sm:h-9 ml-0.5 fill-current" />
            </div>
            <span className="bg-white/95 text-[#1870FF] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {t('video.watch')}
            </span>
          </div>
        </button>
      ) : (
        <iframe
          ref={iframeRef}
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
