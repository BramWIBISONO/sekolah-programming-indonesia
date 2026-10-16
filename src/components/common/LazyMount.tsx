import React, { useEffect, useRef, useState } from 'react';

interface LazyMountProps {
  children: React.ReactNode;
  /** Kept on the placeholder so in-page links still find the section before it has mounted. */
  anchorId?: string;
  /** Height reserved for the placeholder, so the page does not jump when the section appears. */
  minHeight?: number;
}

/**
 * Renders its children only when the placeholder comes near the viewport. Sections below the fold are
 * downloaded this way, so the first screen does not wait for dozens of section modules.
 */
export const LazyMount: React.FC<LazyMountProps> = ({ children, anchorId, minHeight = 480 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '1200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  if (mounted) return <>{children}</>;
  return <div ref={ref} id={anchorId} style={{ minHeight }} aria-hidden="true" />;
};
