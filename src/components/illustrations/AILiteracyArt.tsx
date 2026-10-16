import React from 'react';
import { sparklePath } from './SceneProps';

const N = '#041A5A';
const B = '#1870FF';
const L = '#DCEBFF';
const Y = '#FFC928';
const LINE = '#DCE7FB';

/** Input, hidden and output nodes of the small neural network drawn on the right. */
const INPUTS = [120, 160, 200];
const HIDDEN = [100, 140, 180, 220];
const OUTPUT = 160;

interface AILiteracyArtProps {
  className?: string;
  /** Moving parts on. Pass false under reduced motion (the CSS classes already respect it). */
  animate?: boolean;
}

/**
 * Flat illustration of AI literacy: a conversation with an AI assistant, an answer being checked,
 * a small neural network and an idea. Drawn in the SPI palette; no photos, no text inside.
 * With `animate`, the answer writes itself, the check pulses, data flows through the network and the idea glows.
 */
export const AILiteracyArt: React.FC<AILiteracyArtProps> = ({ className = '', animate = true }) => {
  const motionClass = (name: string) => (animate ? name : undefined);
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <defs>
        <pattern id="ail-art-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke={LINE} strokeWidth="1" />
        </pattern>
      </defs>

      {/* backdrop with a faint grid */}
      <rect x="0" y="0" width="400" height="300" rx="28" fill="#F5F9FF" />
      <rect x="0" y="0" width="400" height="300" rx="28" fill="url(#ail-art-grid)" opacity="0.7" />

      {/* chat with an AI assistant */}
      <rect x="36" y="46" width="200" height="190" rx="20" fill="#FFFFFF" stroke={LINE} strokeWidth="2" />
      <circle cx="56" cy="66" r="4" fill={LINE} />
      <circle cx="68" cy="66" r="4" fill={LINE} />
      <circle cx="80" cy="66" r="4" fill={LINE} />

      {/* the question */}
      <rect x="118" y="86" width="96" height="32" rx="16" fill={L} />
      <rect x="132" y="97" width="64" height="6" rx="3" fill={N} opacity="0.75" />
      <rect x="132" y="106" width="40" height="6" rx="3" fill={N} opacity="0.5" />

      {/* the AI answer: the lines grow one after another, as if being written */}
      <rect x="52" y="132" width="150" height="66" rx="18" fill={B} />
      <path d={sparklePath(72, 154, 9)} fill="#FFFFFF" className={motionClass('spi-anim-twinkle')} />
      <rect x="92" y="147" width="88" height="6" rx="3" fill="#FFFFFF" className={motionClass('spi-anim-grow')} style={{ transformOrigin: 'left center' }} />
      <rect x="92" y="159" width="110" height="6" rx="3" fill="#FFFFFF" opacity="0.85" className={motionClass('spi-anim-grow spi-anim-delay-1')} style={{ transformOrigin: 'left center' }} />
      <rect x="92" y="171" width="70" height="6" rx="3" fill="#FFFFFF" opacity="0.65" className={motionClass('spi-anim-grow spi-anim-delay-2')} style={{ transformOrigin: 'left center' }} />

      {/* input bar with a blinking caret */}
      <rect x="52" y="206" width="150" height="20" rx="10" fill="#F5F9FF" stroke={LINE} strokeWidth="1.5" />
      <rect x="64" y="213" width="58" height="6" rx="3" fill={LINE} />
      <rect x="126" y="211" width="2" height="10" fill={B} className={motionClass('spi-anim-blink')} />
      <circle cx="190" cy="216" r="7" fill={B} />

      {/* the answer is checked: a ring pulses, then the tick is drawn */}
      <circle cx="212" cy="134" r="15" fill="none" stroke={Y} strokeWidth="2" className={motionClass('spi-anim-ping')} />
      <circle cx="212" cy="134" r="15" fill={Y} stroke="#FFFFFF" strokeWidth="3" />
      <path d="M205 134l5 5 9-10" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={motionClass('spi-anim-draw')} />

      {/* neural network: nodes glow, data points travel from input to output */}
      <g fill="none" stroke="#9DBEF7" strokeWidth="1.6">
        {INPUTS.flatMap((y1) => HIDDEN.map((y2) => <line key={`${y1}-${y2}`} x1="268" y1={y1} x2="318" y2={y2} />))}
        {HIDDEN.map((y) => <line key={`o-${y}`} x1="322" y1={y} x2={366} y2={OUTPUT} />)}
      </g>
      {animate &&
        INPUTS.map((_, i) => (
          <circle key={`pulse-${i}`} r="2.8" fill={Y}>
            <animateMotion dur="2.6s" begin={`${i * 0.85}s`} repeatCount="indefinite" path={`M268 ${INPUTS[i]} L322 ${HIDDEN[i + 1]} L366 ${OUTPUT}`} />
          </circle>
        ))}
      {INPUTS.map((y, i) => <circle key={`i-${y}`} cx="268" cy={y} r="7" fill="#FFFFFF" stroke={B} strokeWidth="2.5" className={motionClass('spi-anim-glow')} style={{ animationDelay: `${i * 0.3}s` }} />)}
      {HIDDEN.map((y, i) => <circle key={`h-${y}`} cx="322" cy={y} r="7" fill={B} className={motionClass('spi-anim-glow')} style={{ animationDelay: `${i * 0.25}s` }} />)}
      <circle cx="366" cy={OUTPUT} r="10" fill={Y} stroke={N} strokeWidth="2" />
      <circle cx="366" cy={OUTPUT} r="10" fill="none" stroke={Y} strokeWidth="2" className={motionClass('spi-anim-ping')} />

      {/* an idea: the bulb glows behind the glass */}
      <circle cx="300" cy="252" r="22" fill={Y} opacity="0.35" className={motionClass('spi-anim-glow')} />
      <circle cx="300" cy="252" r="15" fill="#FFFFFF" stroke={Y} strokeWidth="2.5" />
      <path d="M296 249a4 4 0 1 1 8 0c0 1.5-1 2-1 3.5h-6c0-1.5-1-2-1-3.5z" fill="none" stroke={N} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M297 257h6" stroke={N} strokeWidth="1.6" strokeLinecap="round" />

      {/* sparkles */}
      <path d={sparklePath(352, 60, 11)} fill={Y} className={motionClass('spi-anim-twinkle')} />
      <path d={sparklePath(268, 60, 7)} fill={B} opacity="0.7" className={motionClass('spi-anim-twinkle spi-anim-delay-1')} />
      <path d={sparklePath(372, 262, 7)} fill={B} className={motionClass('spi-anim-twinkle spi-anim-delay-2')} />
    </svg>
  );
};
