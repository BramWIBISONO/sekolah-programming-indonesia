import { useEffect, type CSSProperties, type RefObject } from 'react';

/**
 * Pointer parallax: writes --px / --py (-1…1, from the element's centre) on the element while a
 * mouse moves over it. Children use them in transforms, e.g.
 * `translate3d(calc(var(--px) * 12px), calc(var(--py) * 8px), 0)`.
 * Does nothing on touch-only devices or when the visitor prefers reduced motion.
 */
export const useParallax = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty('--px', x.toFixed(3));
      el.style.setProperty('--py', y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 2 - 1;
      y = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
};

/** Inline style for a layer that should drift `depth` px with the pointer. */
export const parallaxStyle = (depth: number): CSSProperties => ({
  // 2D translate so it also works on SVG groups.
  transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px))`,
  transition: 'transform 0.25s ease-out',
});
