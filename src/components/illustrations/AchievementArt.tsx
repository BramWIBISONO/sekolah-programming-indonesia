import React from 'react';
import { sparklePath } from './SceneProps';

const N = '#102A56';
const B = '#1870FF';
const Y = '#FFC928';

interface AchievementArtProps {
  /** Screenshot of the 2026 school ranking (#1). */
  rankOneSrc: string;
  rankOneAlt: string;
  /** Screenshot of the 2025 school ranking (#2). */
  rankTwoSrc: string;
  rankTwoAlt: string;
  className?: string;
}

/**
 * Hero artwork for the achievement page. Two real ranking screenshots sit on the left without overlapping;
 * a podium that moved from #2 to #1, with a trophy, stands on the right. The square frame gives both screenshots room.
 */
export const AchievementArt: React.FC<AchievementArtProps> = ({ rankOneSrc, rankOneAlt, rankTwoSrc, rankTwoAlt, className = '' }) => (
  <div className={`relative aspect-square w-full overflow-hidden rounded-[22px] bg-gradient-to-b from-[#F5F9FF] via-[#E6F0FF] to-[#D6E6FF] ${className}`}>
    <div
      className="absolute inset-0 opacity-[0.3]"
      style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      aria-hidden="true"
    />
    <div className="absolute -right-[10%] -top-[8%] h-[62%] w-[62%] rounded-full bg-white/80 blur-2xl" aria-hidden="true" />

    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="achv-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4D9BFF" />
          <stop offset="0.5" stopColor={B} />
          <stop offset="1" stopColor="#0B4FD1" />
        </linearGradient>
        <linearGradient id="achv-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF4FB" />
          <stop offset="1" stopColor="#B8C7DE" />
        </linearGradient>
        <linearGradient id="achv-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE38A" />
          <stop offset="0.55" stopColor={Y} />
          <stop offset="1" stopColor="#E8A800" />
        </linearGradient>
      </defs>
      {/* ground */}
      <path d="M0 330 C 120 310, 260 345, 400 322 V400 H0 Z" fill="#9CC2FF" opacity="0.6" />
      <path d="M0 362 C 140 342, 280 372, 400 354 V400 H0 Z" fill="#3D86FF" opacity="0.35" />

      {/* podium shadow */}
      <ellipse cx="290" cy="338" rx="120" ry="9" fill="#0B3C95" opacity="0.18" />

      {/* #2 step (silver) */}
      <rect x="222" y="232" width="72" height="104" rx="8" fill="url(#achv-silver)" />
      <text x="258" y="286" textAnchor="middle" fontSize="34" fontWeight="900" fill={N} opacity="0.8">2</text>
      <text x="258" y="310" textAnchor="middle" fontSize="11" fontWeight="800" fill={N} opacity="0.6">2025</text>

      {/* #1 step (Electric Blue), taller, rising above it */}
      <rect x="306" y="178" width="78" height="158" rx="8" fill="url(#achv-blue)" />
      <rect x="312" y="184" width="66" height="4" rx="2" fill="#FFFFFF" opacity="0.45" />
      <text x="345" y="246" textAnchor="middle" fontSize="40" fontWeight="900" fill="#FFFFFF">1</text>
      <text x="345" y="270" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF" opacity="0.85">2026</text>

      <rect x="296" y="334" width="98" height="8" rx="4" fill={N} opacity="0.85" />

      {/* trophy standing on the #1 step */}
      <g className="spi-anim-float">
        <path d="M322 124 H368 V142 Q368 164 345 164 Q322 164 322 142 Z" fill="url(#achv-gold)" />
        <path d="M322 132 H312 Q306 132 306 139 Q306 152 322 154" fill="none" stroke={Y} strokeWidth="5" strokeLinecap="round" />
        <path d="M368 132 H378 Q384 132 384 139 Q384 152 368 154" fill="none" stroke={Y} strokeWidth="5" strokeLinecap="round" />
        <rect x="339" y="164" width="12" height="8" fill={Y} />
        <rect x="327" y="172" width="36" height="6" rx="3" fill={N} />
      </g>

      <path d={sparklePath(374, 104, 11)} fill={Y} className="spi-anim-twinkle" />
      <path d={sparklePath(300, 112, 7)} fill={B} opacity="0.7" className="spi-anim-twinkle spi-anim-delay-1" />
      <circle cx="368" cy="70" r="4" fill={Y} className="spi-anim-twinkle spi-anim-delay-2" />
      <circle cx="318" cy="64" r="3" fill={B} className="spi-anim-twinkle" />
    </svg>

    {/* the two real ranking screenshots: left column, stacked without overlap */}
    <div className="absolute left-[5%] top-[10%] w-[44%] spi-anim-bob">
      <figure className="relative -rotate-2 rounded-2xl border border-white bg-white p-1.5 shadow-[0_22px_40px_-22px_rgba(2,18,70,0.6)]">
        <img src={rankOneSrc} alt={rankOneAlt} className="block w-full h-auto rounded-xl" loading="lazy" decoding="async" />
        <figcaption className="absolute -top-3 left-3 rounded-full bg-[#FFC928] px-2.5 py-1 text-[10px] sm:text-xs font-black text-[#041A5A] shadow whitespace-nowrap">2026 · #1 School Rank</figcaption>
      </figure>
    </div>
    <div className="absolute left-[10%] top-[58%] w-[38%] spi-anim-bob" style={{ animationDelay: '1.2s' }}>
      <figure className="relative rotate-2 rounded-2xl border border-white bg-white p-1.5 shadow-[0_22px_40px_-22px_rgba(2,18,70,0.6)]">
        <img src={rankTwoSrc} alt={rankTwoAlt} className="block w-full h-auto rounded-xl" loading="lazy" decoding="async" />
        <figcaption className="absolute -top-3 right-3 rounded-full bg-white px-2.5 py-1 text-[10px] sm:text-xs font-black text-[#041A5A] shadow ring-1 ring-[#DCE7FB] whitespace-nowrap">2025 · #2 School Rank</figcaption>
      </figure>
    </div>
  </div>
);
