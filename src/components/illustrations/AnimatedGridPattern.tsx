import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface AnimatedGridPatternProps {
  className?: string;
  /** Size of one grid cell in pixels. */
  cell?: number;
  /** How many cells light up at once. */
  glowing?: number;
}

/** Deterministic pseudo-random numbers, so the same grid is drawn on every render and every visit. */
const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * A faint grid where a few cells softly light up and fade, one after another. Decorative only.
 * Uses plain SVG and motion, so it adds no heavy library.
 */
export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({ className = '', cell = 40, glowing = 12 }) => {
  const reduce = !!useReducedMotion();

  const cells = useMemo(() => {
    const cols = 30;
    const rows = 16;
    return Array.from({ length: glowing }, (_, i) => ({
      x: Math.floor(seeded(i + 1) * cols),
      y: Math.floor(seeded(i + 101) * rows),
      delay: seeded(i + 201) * 4,
    }));
  }, [glowing]);

  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id="spi-grid" width={cell} height={cell} patternUnits="userSpaceOnUse">
          <path d={`M ${cell} 0 L 0 0 0 ${cell}`} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#spi-grid)" />
      {cells.map((c, i) => (
        <motion.rect
          key={i}
          x={c.x * cell + 1}
          y={c.y * cell + 1}
          width={cell - 1}
          height={cell - 1}
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.12 } : { opacity: [0, 0.22, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 4, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
};
