/**
 * Helper utilities for YouTube URLs, Embeds, and Thumbnails
 */

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  try {
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch')) {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get('v');
    }
    // Short URL: youtu.be/VIDEO_ID
    if (url.includes('youtu.be/')) {
      const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
    // Embed URL: youtube.com/embed/VIDEO_ID
    if (url.includes('youtube.com/embed/')) {
      const match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
    // Shorts URL: youtube.com/shorts/VIDEO_ID
    if (url.includes('youtube.com/shorts/')) {
      const match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : null;
    }
  } catch {
    // If URL parsing fails, attempt regex fallback
    const match = url.match(/(?:v=|\/embed\/|\.be\/|\/shorts\/)([\w-]{11})/);
    return match ? match[1] : null;
  }
  return null;
}

export function getYouTubeStartTime(url?: string): number | null {
  if (!url) return null;
  try {
    // Check for &t=237s or ?t=237 or &start=237
    const timeMatch = url.match(/[?&](?:t|start)=([0-9]+)s?/);
    if (timeMatch && timeMatch[1]) {
      return parseInt(timeMatch[1], 10);
    }
  } catch {
    return null;
  }
  return null;
}

export function getYouTubeThumbnailUrl(url?: string, quality: 'hq' | 'maxres' | 'sd' = 'hq'): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  switch (quality) {
    case 'maxres':
      return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    case 'sd':
      return `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`;
    case 'hq':
    default:
      return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
}

export function getYouTubeEmbedUrl(url?: string, autoplay = true): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  const startTime = getYouTubeStartTime(url);
  const params = new URLSearchParams();
  
  if (autoplay) {
    params.set('autoplay', '1');
  }
  params.set('rel', '0');
  params.set('modestbranding', '1');
  
  if (startTime && startTime > 0) {
    params.set('start', startTime.toString());
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export interface YouTubeEmbedOptions {
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  startTime?: number;
}

export function buildYouTubeEmbedUrl(
  videoId: string,
  options: YouTubeEmbedOptions = {}
): string {
  const {
    autoplay = false,
    muted = false,
    controls = true,
    startTime,
  } = options;

  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  if (muted) params.set('mute', '1');
  if (controls) params.set('controls', '1');
  params.set('rel', '0');
  params.set('modestbranding', '1');
  params.set('playsinline', '1');
  if (startTime && startTime > 0) params.set('start', startTime.toString());

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
