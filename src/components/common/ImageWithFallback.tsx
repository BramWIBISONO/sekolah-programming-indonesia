import React, { useState } from 'react';
import { asset } from '../../constants/assets';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  /** Optional category label shown in placeholder (e.g. "SPI Core", "Robotics") */
  fallbackLabel?: string;
  aspectRatio?: string;
}

const resolveSrc = (s: string): string => {
  if (!s) return s;
  if (/^(https?:|\/\/|data:|blob:)/.test(s)) return s;
  if (s.startsWith(import.meta.env.BASE_URL)) return s;
  if (s.startsWith('/assets/') || s.startsWith('assets/')) {
    return asset(s);
  }
  return s;
};

/**
 * Image component with premium SPI-branded placeholder fallback.
 * NEVER exposes asset paths, filenames, or src values to visitors.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  fallbackLabel,
  aspectRatio,
  ...props
}) => {
  const resolvedSrc = resolveSrc(src);
  const resolvedFallback = fallbackSrc ? resolveSrc(fallbackSrc) : undefined;

  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync if src changes
  React.useEffect(() => {
    setCurrentSrc(resolvedSrc);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (resolvedFallback && currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio ? aspectRatio : ''} ${className}`}>
      {/* Loading shimmer */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#176DF8]/8 via-[#F4F8FF] to-[#176DF8]/5 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#176DF8]/20 border-t-[#176DF8]/60 animate-spin" />
        </div>
      )}

      {/* Actual image — hidden until loaded */}
      {!hasError && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}

      {/* Premium SPI placeholder — shown when image is unavailable.
          Displays the required asset path as requested. */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4F8FF] via-white to-[#EBF2FF] flex flex-col items-center justify-center p-4 text-center">
          {/* Subtle tech grid background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(to right, #176DF8 1px, transparent 1px), linear-gradient(to bottom, #176DF8 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* SPI Brand Mark */}
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#176DF8]/10 flex items-center justify-center border border-[#176DF8]/15">
              <span className="text-xs font-black text-[#176DF8] font-mono tracking-wider">SPI</span>
            </div>
            
            <h4 className="text-sm font-bold text-[#102A56] tracking-widest">IMAGE REQUIRED</h4>
            
            {/* Show exact required asset path */}
            <p className="text-xs font-medium text-slate-500 max-w-[90%] break-all leading-relaxed bg-white/60 p-2 rounded-lg border border-slate-200">
              {alt}
            </p>

            {fallbackLabel && (
              <span className="text-[10px] font-bold text-[#176DF8]/80 uppercase tracking-widest">{fallbackLabel}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
