import React from 'react';

/**
 * Custom SPI icon set: one 48×48 grid, one stroke weight, brand colours
 * (navy outline, SPI blue, light blue fill, yellow accent). Small parts carry
 * CSS micro-animations (see index.css, `spi-anim-*`), disabled for reduced motion.
 */
const N = '#041A5A'; // navy outline
const B = '#176DF8'; // SPI blue
const L = '#DCEBFF'; // light fill
const Y = '#FFC928'; // accent yellow
const W = '#FFFFFF';

/** Four-point sparkle path centred on (cx, cy) with radius r. */
const sparkle = (cx: number, cy: number, r: number, _fill?: string) => {
  const a = +(r * 0.28).toFixed(2);
  const b = +(r * 0.72).toFixed(2);
  return `M${cx} ${cy - r}l${a} ${b} ${b} ${a}-${b} ${a}-${a} ${b}-${a}-${b}-${b}-${a} ${b}-${a}z`;
};

const GLYPHS: Record<string, React.ReactNode> = {
  think: (
    <>
      <circle cx="24" cy="19" r="14" fill={Y} stroke="none" className="spi-anim-glow" />
      <path d="M24 8c-6.1 0-10.5 4.5-10.5 10.2 0 3.6 1.9 6.3 4.2 8.2 1 .9 1.6 2 1.6 3.3V32h9.4v-2.3c0-1.3.6-2.4 1.6-3.3 2.3-1.9 4.2-4.6 4.2-8.2C34.5 12.5 30.1 8 24 8z" fill={W} />
      <path d="M20.5 21.5l3.5 3.5 3.5-3.5M24 25v7" stroke={B} />
      <path d="M19.8 36h8.4M21.2 40h5.6" />
      <path className="spi-anim-twinkle" d="M39 5v5M36.5 7.5h5" stroke={Y} strokeWidth={2.6} />
      <path className="spi-anim-twinkle spi-anim-delay-1" d="M8.5 9v4M6.5 11h4" stroke={B} />
    </>
  ),
  build: (
    <>
      <rect x="4" y="8" width="31" height="25" rx="4" fill={W} />
      <path d="M4 14.5h31" />
      <circle cx="8.5" cy="11.2" r="1" fill={N} stroke="none" />
      <circle cx="12" cy="11.2" r="1" fill={N} stroke="none" />
      <path d="M13 20l-3.5 3.5L13 27M22 20l3.5 3.5L22 27" stroke={B} />
      <rect className="spi-anim-blink" x="16.6" y="20.5" width="1.8" height="6" rx=".6" fill={B} stroke="none" />
      <g className="spi-anim-spin">
        <circle cx="36" cy="34" r="7.4" fill="none" strokeWidth={3.2} strokeDasharray="2.9 2.9" />
        <circle cx="36" cy="34" r="5.4" fill={Y} />
        <circle cx="36" cy="34" r="1.9" fill={W} strokeWidth={1.4} />
      </g>
    </>
  ),
  innovate: (
    <>
      <path className="spi-anim-dash" d="M9 39c6-1 10.5-5 12.5-11" stroke={B} strokeDasharray="3 3" />
      <circle cx="8" cy="39.5" r="2.4" fill={B} stroke="none" />
      <path d="M28 6l2.9 8.6 8.6 2.9-8.6 2.9L28 29l-2.9-8.6-8.6-2.9 8.6-2.9z" fill={Y} />
      <path className="spi-anim-twinkle" d="M40 29v5M37.5 31.5h5" stroke={B} />
      <path className="spi-anim-twinkle spi-anim-delay-2" d="M11 10v4M9 12h4" stroke={Y} strokeWidth={2.6} />
    </>
  ),
  projects: (
    <>
      <path d="M24 9.5v4.5" />
      <circle className="spi-anim-float" cx="24" cy="7.5" r="2.7" fill={Y} />
      <rect x="11.5" y="14" width="25" height="18" rx="5" fill={W} />
      <circle cx="19" cy="22" r="2.5" fill={B} stroke="none" />
      <circle cx="29" cy="22" r="2.5" fill={B} stroke="none" />
      <path d="M20.5 27.5h7M7.5 20.5v5M40.5 20.5v5" />
      <rect x="14" y="35" width="20" height="7" rx="2.5" fill={L} />
      <path d="M19 32v3M29 32v3" />
    </>
  ),
  ai: (
    <>
      <path d="M7 12a4 4 0 014-4h22a4 4 0 014 4v13a4 4 0 01-4 4H19l-7 6v-6h-1a4 4 0 01-4-4z" fill={W} />
      <path className="spi-anim-twinkle" d={sparkle(22, 18.5, 6, B)} fill={B} stroke="none" />
      <path className="spi-anim-twinkle spi-anim-delay-1" d={sparkle(39, 34, 4.5, Y)} fill={Y} strokeWidth={1.4} />
    </>
  ),
  ecosystem: (
    <>
      <path className="spi-anim-dash" d="M14 14h20M14 14l10 20M34 14L24 34" stroke={B} strokeDasharray="3 3" />
      <circle cx="14" cy="14" r="6" fill={Y} />
      <circle cx="34" cy="14" r="6" fill={L} />
      <circle cx="24" cy="34" r="7" fill={B} />
      <circle cx="24" cy="34" r="2.2" fill={W} stroke="none" />
    </>
  ),
  core: (
    <>
      <path d="M6 10h9l2 2.2h5l2-2.2h10v8H24l-2 2.2h-5l-2-2.2H6z" fill={Y} />
      <path d="M11 21h9l2 2.2h5l2-2.2h9v8H29l-2 2.2h-5l-2-2.2h-9z" fill={B} />
      <path d="M6 32h9l2 2.2h5l2-2.2h14v8H6z" fill={L} />
      <g className="spi-anim-float">
        <path d="M40 3v9" />
        <path d="M40 3.5h6l-1.8 2.3 1.8 2.3h-6" fill={Y} strokeWidth={1.6} />
      </g>
    </>
  ),
  lab: (
    <>
      <rect x="8" y="6" width="23" height="31" rx="3" fill={W} />
      <path d="M13 14h13M13 19.5h13M13 25h8" stroke={B} />
      <path d="M26 42l2-6.5 10.5-10.5 4.5 4.5L32.5 40z" fill={Y} />
      <path d="M36 27.5l4.5 4.5" />
      <path className="spi-anim-twinkle" d={sparkle(38, 11, 5, B)} fill={B} stroke="none" />
    </>
  ),
  engineering: (
    <>
      <path d="M3 17h9M3 31h9M36 17h9M36 31h9M17 3v9M31 3v9M17 36v9M31 36v9" />
      <path className="spi-anim-dash" d="M3 17h9M36 31h9M17 3v9M31 36v9" stroke={B} strokeWidth={2.6} strokeDasharray="2 4" />
      <rect x="12" y="12" width="24" height="24" rx="4" fill={L} />
      <rect className="spi-anim-glow" x="18" y="18" width="12" height="12" rx="2" fill={B} stroke="none" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill="none" />
    </>
  ),
  inschool: (
    <>
      <path d="M5 41h38" />
      <path d="M9 41V22l15-9.5L39 22v19" fill={W} />
      <rect x="20" y="30" width="8" height="11" rx="1" fill={L} />
      <circle cx="24" cy="22.5" r="3" fill={Y} />
      <path d="M13.5 27h3.5M31 27h3.5M13.5 32.5h3.5M31 32.5h3.5" stroke={B} />
      <path d="M24 12.5V3.5" />
      <path className="spi-anim-float" d="M24 4h8l-2.2 2.5 2.2 2.5h-8" fill={B} strokeWidth={1.6} />
    </>
  ),
  curriculum: (
    <>
      <path d="M24 12c-4-3-10-4-16-3v27c6-1 12 0 16 3 4-3 10-4 16-3V9c-6-1-12 0-16 3z" fill={W} />
      <path d="M24 12v27" />
      <path d="M12 16h7M12 21h7M12 26h5M29 21h7M29 26h7" stroke={B} />
      <path className="spi-anim-float" d="M29 6v11l3.5-2.4L36 17V6" fill={Y} strokeWidth={1.6} />
    </>
  ),
  teacher: (
    <>
      <rect x="17" y="6" width="26" height="19" rx="2.5" fill={W} />
      <path className="spi-anim-draw" d="M21.5 20l4.5-5.5 3.5 3 5.5-6.5" stroke={B} />
      <path d="M30 25v8M26 41l4-8 4 8" />
      <circle cx="10.5" cy="19.5" r="4.2" fill={Y} />
      <path d="M3.5 41v-6a7 7 0 0114 0v6" fill={L} />
      <path d="M15.5 29.5l7-5" />
    </>
  ),
  assessment: (
    <>
      <path d="M16 5l5 13.5M32 5l-5 13.5" stroke={B} strokeWidth={3.4} />
      <circle cx="24" cy="29" r="11.5" fill={Y} />
      <circle cx="24" cy="29" r="7.2" fill={W} strokeWidth={1.6} />
      <path className="spi-anim-twinkle" d="M24 24.3l1.45 3 3.3.4-2.4 2.3.6 3.2-2.95-1.6-2.95 1.6.6-3.2-2.4-2.3 3.3-.4z" fill={B} stroke="none" />
    </>
  ),
  center: (
    <>
      <path d="M5 41h38" />
      <rect x="9" y="17" width="30" height="24" rx="2" fill={W} />
      <path d="M6.5 17l4-9h27l4 9z" fill={B} />
      <rect x="14" y="22.5" width="20" height="12" rx="1.6" fill={L} />
      <path d="M20 26.5l-2.4 2 2.4 2M28 26.5l2.4 2-2.4 2" stroke={B} />
      <rect className="spi-anim-blink" x="23.3" y="26.5" width="1.5" height="4" fill={N} stroke="none" />
    </>
  ),
  community: (
    <>
      <circle className="spi-anim-float" cx="24" cy="14.5" r="5.2" fill={Y} />
      <path d="M14 37v-3a10 10 0 0120 0v3" fill={B} />
      <circle cx="10.5" cy="20" r="4" fill={L} />
      <path d="M3.5 37.5v-2a7 7 0 0110.5-6.1" />
      <circle cx="37.5" cy="20" r="4" fill={L} />
      <path d="M44.5 37.5v-2a7 7 0 00-10.5-6.1" />
    </>
  ),
  strategic: (
    <>
      <circle cx="18" cy="25" r="10.5" fill={L} />
      <circle className="spi-anim-float" cx="30" cy="23" r="10.5" fill="none" stroke={B} strokeWidth={2.8} />
      <path className="spi-anim-twinkle" d={sparkle(38, 8, 4.5, Y)} fill={Y} strokeWidth={1.4} />
    </>
  ),
  consumer: (
    <>
      <rect x="15" y="4" width="18" height="40" rx="4" fill={W} />
      <path d="M21 8h6" />
      <rect x="18.5" y="13" width="11" height="15" rx="2" fill={L} stroke="none" />
      <path d="M22.5 17.5v6l4.5-3z" fill={B} stroke="none" />
      <path className="spi-anim-float" d="M19 33h10M19 37.5h6" stroke={B} />
    </>
  ),
  creator: (
    <>
      <rect x="8" y="10" width="32" height="21" rx="2.5" fill={W} />
      <path d="M4 35h40l-2.2 4.5H6.2z" fill={L} />
      <path className="spi-anim-draw" d="M14 25l5.5-6.5 4 4 4.5-5.5 6 7.5" stroke={B} />
      <path className="spi-anim-twinkle" d={sparkle(41, 7, 4.5, Y)} fill={Y} strokeWidth={1.4} />
    </>
  ),
  office: (
    <>
      <rect x="7" y="7" width="34" height="34" rx="4" fill={W} />
      <path d="M7 16h34M18 7v34M7 25h34M7 33h34" strokeWidth={1.4} />
      <rect className="spi-anim-grow" x="20" y="18" width="19" height="5" fill={Y} stroke="none" />
      <path d="M10.5 12h4.5" stroke={B} />
    </>
  ),
  creative: (
    <>
      <path className="spi-anim-dash" d="M8 36C14 18 30 34 40 12" stroke={B} strokeDasharray="4 3" />
      <rect x="5.5" y="33.5" width="5" height="5" rx="1" fill={W} />
      <rect x="37.5" y="9.5" width="5" height="5" rx="1" fill={W} />
      <path d="M21.5 31l4.5-13 4.5 13-4.5 5z" fill={Y} />
      <circle cx="26" cy="26" r="1.5" fill={N} stroke="none" />
    </>
  ),
  video: (
    <>
      <rect x="6" y="17" width="36" height="24" rx="3" fill={W} />
      <path d="M7.5 17l1.6-8.5h32.4L40 17z" fill={N} />
      <path d="M15 8.6l-2.2 8.2M23 8.6l-2.2 8.2M31 8.6l-2.2 8.2M39 8.6l-2.2 8.2" stroke={Y} strokeWidth={2.4} />
      <path className="spi-anim-glow" d="M20.5 23.5v11l9.5-5.5z" fill={B} stroke="none" />
      <path d="M20.5 23.5v11l9.5-5.5z" fill="none" stroke={B} strokeWidth={1.6} />
    </>
  ),
  grad: (
    <>
      <path d="M4 18l20-9 20 9-20 9z" fill={N} />
      <path d="M11.5 22v8c0 3.3 5.6 6.5 12.5 6.5S36.5 33.3 36.5 30v-8" fill={L} />
      <path d="M40.5 19.5v10" />
      <circle className="spi-anim-float" cx="40.5" cy="31.5" r="2.2" fill={Y} />
    </>
  ),
  highschool: (
    <>
      <path d="M18 11a6 6 0 0112 0" />
      <rect x="10.5" y="10" width="27" height="32" rx="7" fill={B} />
      <rect x="15.5" y="26" width="17" height="10.5" rx="3" fill={L} />
      <path d="M16 18.5h16" stroke={W} />
      <path d="M24 26v4" />
    </>
  ),
  university: (
    <>
      <path d="M5 17l19-9.5L43 17z" fill={Y} />
      <path d="M8 17h32M8 38h32M5 42.5h38" />
      <path d="M13 20.5v14M21 20.5v14M27 20.5v14M35 20.5v14" stroke={B} strokeWidth={3.2} />
    </>
  ),
  briefcase: (
    <>
      <rect x="5" y="14" width="38" height="26" rx="4" fill={W} />
      <path d="M17.5 14v-3a3 3 0 013-3h7a3 3 0 013 3v3M5 24.5h38" />
      <rect x="20" y="21" width="8" height="7" rx="1.6" fill={Y} />
    </>
  ),
  terminal: (
    <>
      <rect x="4" y="7" width="40" height="33" rx="4" fill={N} />
      <circle cx="9.5" cy="12" r="1.2" fill={Y} stroke="none" />
      <circle cx="13.5" cy="12" r="1.2" fill={B} stroke="none" />
      <path d="M11 20l5.5 4.5L11 29" stroke={Y} />
      <rect className="spi-anim-blink" x="20" y="27" width="9" height="2.6" rx="1" fill={W} stroke="none" />
    </>
  ),
  specialist: (
    <>
      <circle cx="20" cy="20" r="12" fill={W} />
      <path d="M28.8 28.8l11 11" strokeWidth={4.2} />
      <path className="spi-anim-draw" d="M14 20.5l4 4 8-9" stroke={B} />
    </>
  ),
  solver: (
    <path d="M10 14h8a4 4 0 118 0h8v8a4 4 0 110 8v8h-8a4 4 0 10-8 0h-8v-8a4 4 0 100-8z" fill={Y} />
  ),
  challenge: (
    <>
      <path d="M3 41l13.5-20 7 9 6.5-8.5L45 41z" fill={L} />
      <path d="M30 22V7" />
      <path className="spi-anim-float" d="M30 7.5h9.5l-2.6 3 2.6 3H30" fill={Y} strokeWidth={1.6} />
    </>
  ),
  portfolio: (
    <>
      <path d="M5 14a3 3 0 013-3h10l3 4h19a3 3 0 013 3v19a3 3 0 01-3 3H8a3 3 0 01-3-3z" fill={L} />
      <rect x="10" y="19" width="28" height="15" rx="2" fill={W} />
      <path className="spi-anim-twinkle" d={sparkle(24, 26.5, 5, Y)} fill={Y} strokeWidth={1.4} />
    </>
  ),
  pin: (
    <>
      <path d="M24 43S12 31.5 12 21a12 12 0 0124 0c0 10.5-12 22-12 22z" fill={B} />
      <circle cx="24" cy="21" r="4.6" fill={W} />
    </>
  ),
  curiosity: (
    <>
      <circle cx="23" cy="25" r="16" fill={L} />
      <path d="M18.5 20.5a4.5 4.5 0 119 0c0 3.2-4.5 3.6-4.5 7.2" stroke={B} />
      <circle cx="23" cy="32.5" r="1.7" fill={B} stroke="none" />
      <path className="spi-anim-twinkle" d={sparkle(40, 8, 5, Y)} fill={Y} strokeWidth={1.4} />
    </>
  ),
};

export type SpiIconName = keyof typeof GLYPHS;

interface SpiIconProps {
  name: SpiIconName;
  size?: number;
  /** 'always' animates continuously, 'hover' only while the parent .group is hovered/focused. */
  animate?: 'always' | 'hover' | 'none';
  className?: string;
  title?: string;
}

export const SpiIcon: React.FC<SpiIconProps> = ({ name, size = 48, animate = 'hover', className = '', title }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill="none"
    stroke={N}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`spi-icon ${animate === 'hover' ? 'spi-icon--hover' : ''} ${className}`}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    style={animate === 'none' ? { animation: 'none' } : undefined}
  >
    {animate === 'none' ? <g className="spi-icon-static">{GLYPHS[name]}</g> : GLYPHS[name]}
  </svg>
);
