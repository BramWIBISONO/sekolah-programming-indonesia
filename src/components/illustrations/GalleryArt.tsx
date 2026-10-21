import React from 'react';
import { Camera } from 'lucide-react';
import { Blocks, Chip, RobotCar, Sparkles } from './SceneProps';

interface GalleryArtProps {
  className?: string;
  labels: { learning: string; projects: string; empty: string };
}

/**
 * Hero artwork for the documentation gallery: four frames pinned to a board. Two hold illustrations,
 * and the empty dashed frame waits for the first photo.
 */
export const GalleryArt: React.FC<GalleryArtProps> = ({ className = '', labels }) => (
  <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F5F9FF] via-[#E6F0FF] to-[#D6E6FF] ${className}`}>
    <div
      className="absolute inset-0 opacity-[0.3]"
      style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      aria-hidden="true"
    />
    <div className="absolute inset-[7%] rounded-[26px] border border-white bg-white/70 shadow-[0_30px_60px_-36px_rgba(4,26,90,0.5)]" aria-hidden="true" />
    <Sparkles className="absolute left-[6%] top-[4%] w-7 h-7 spi-anim-twinkle" />

    {/* learning */}
    <figure className="absolute left-[11%] top-[10%] w-[33%] -rotate-3 spi-anim-bob">
      <div className="rounded-xl bg-white p-2 shadow-[0_18px_34px_-18px_rgba(2,18,70,0.55)]">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#EEF4FF]">
          <Blocks className="w-[72%] h-auto" />
        </div>
        <figcaption className="mt-2 text-center text-[11px] sm:text-xs font-black text-[#041A5A]">{labels.learning}</figcaption>
      </div>
    </figure>

    {/* projects */}
    <figure className="absolute right-[11%] top-[8%] w-[33%] rotate-3 spi-anim-bob" style={{ animationDelay: '1s' }}>
      <div className="rounded-xl bg-white p-2 shadow-[0_18px_34px_-18px_rgba(2,18,70,0.55)]">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#EEF4FF]">
          <RobotCar className="w-[72%] h-auto" />
        </div>
        <figcaption className="mt-2 text-center text-[11px] sm:text-xs font-black text-[#041A5A]">{labels.projects}</figcaption>
      </div>
    </figure>

    {/* empty frame: waiting for the first photo */}
    <figure className="absolute left-[11%] bottom-[8%] w-[33%] rotate-2 spi-anim-bob" style={{ animationDelay: '0.5s' }}>
      <div className="rounded-xl border-2 border-dashed border-[#9DBEF7] bg-white/80 p-2">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#F5F9FF]">
          <span className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(24,112,255,0.18),transparent)] spi-anim-glow" aria-hidden="true" />
          <Camera className="relative w-7 h-7 text-[#1870FF]" aria-hidden="true" />
        </div>
        <figcaption className="mt-2 text-center text-[11px] sm:text-xs font-bold text-slate-500">{labels.empty}</figcaption>
      </div>
    </figure>

    {/* a student-work placeholder drawn as an illustration */}
    <div className="absolute right-[10%] bottom-[10%] w-[33%] -rotate-2 rounded-xl bg-white p-2 shadow-[0_18px_34px_-18px_rgba(2,18,70,0.55)] spi-anim-bob" style={{ animationDelay: '1.6s' }}>
      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-[#EEF4FF]">
        <Chip className="w-[70%] h-auto" />
      </div>
    </div>
  </div>
);
