import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const COLORS = ['#1870FF', '#60A5FA', '#FFC928', '#25D366', '#041A5A', '#FFFFFF'];
const PIECES = 150;
const DURATION_MS = 3200;

/**
 * A short burst of confetti in SPI colours, for the moment a registration succeeds.
 * Plain canvas, no library. It draws for a few seconds, then stops and removes itself. Skipped when reduced motion is on.
 */
export const Confetti: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Burst from the top centre, wider and faster for some pieces.
    const originX = window.innerWidth / 2;
    const originY = Math.min(window.innerHeight * 0.3, 260);
    const pieces = Array.from({ length: PIECES }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 9;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now - started;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const fade = elapsed > DURATION_MS - 700 ? Math.max(0, (DURATION_MS - elapsed) / 700) : 1;
      for (const p of pieces) {
        p.vx *= 0.99;
        p.vy = p.vy * 0.99 + 0.28;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      if (elapsed < DURATION_MS) frame = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] h-full w-full" />;
};
