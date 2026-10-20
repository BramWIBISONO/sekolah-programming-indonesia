import React, { useCallback, useRef } from 'react';

/**
 * A soft light that follows the pointer across a card. Put `group relative overflow-hidden` on the card and
 * `<SpotlightLayer />` as its first child. Hover-only, so touch screens are not affected. Writes CSS variables
 * directly, so moving the pointer does not re-render React.
 */
export const useSpotlight = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  }, []);
  return { ref, onPointerMove };
};

/** Pointer handler for a clickable card that already has the spotlight layer as a child. Mouse only, so touch is unaffected. */
export const spotlightMove = (e: React.PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
};

export const SpotlightLayer: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={{
      background: 'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(24,112,255,0.13), transparent 70%)',
    }}
  />
);
