import React from 'react';

interface BlockStack2DProps {
  className?: string;
}

/** The same five coding blocks as the 3D stack, drawn flat: each one sways out of step and a glow runs down the stack. */
const BLOCKS = [
  { label: 'when ▶︎ clicked', fill: '#FFC928', ink: '#041A5A', edge: '#D9A400', width: '80%', sway: 6 },
  { label: 'repeat 5', fill: '#1870FF', ink: '#FFFFFF', edge: '#0B4FC4', width: '72%', sway: -6 },
  { label: 'think()', fill: '#60A5FA', ink: '#041A5A', edge: '#2F7FD8', width: '64%', sway: 6 },
  { label: 'build()', fill: '#1870FF', ink: '#FFFFFF', edge: '#0B4FC4', width: '68%', sway: -6 },
  { label: 'innovate()', fill: '#041A5A', ink: '#FFFFFF', edge: '#020E33', width: '74%', sway: 6 },
];

const CSS = `
@keyframes bs2d-sway {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(var(--sway), -4px); }
}
@keyframes bs2d-run {
  0%, 100% { box-shadow: 0 4px 0 var(--edge), 0 0 0 0 rgba(24, 112, 255, 0); }
  8% { box-shadow: 0 4px 0 var(--edge), 0 0 0 6px rgba(24, 112, 255, 0.3); }
  22% { box-shadow: 0 4px 0 var(--edge), 0 0 0 0 rgba(24, 112, 255, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .bs2d-sway, .bs2d-block { animation: none !important; }
}
`;

/** Flat 2D board with the code-block stack. Used as the hero art on the event page. */
export const BlockStack2D: React.FC<BlockStack2DProps> = ({ className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F5F9FF] via-[#EAF2FF] to-[#D6E6FF] ${className}`}
    aria-hidden="true"
  >
    <style>{CSS}</style>
    <div
      className="absolute inset-[7%] rounded-[24px] border border-white bg-white shadow-[0_30px_60px_-36px_rgba(4,26,90,0.5)]"
      style={{
        backgroundImage: 'linear-gradient(#E3ECFA 1px, transparent 1px), linear-gradient(90deg, #E3ECFA 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    <div className="absolute inset-[7%] flex flex-col items-center justify-center gap-[4%] px-[6%]">
      {BLOCKS.map((b, i) => (
        <div
          key={b.label}
          className="bs2d-sway flex justify-center"
          style={
            {
              width: b.width,
              '--sway': `${b.sway}px`,
              animation: `bs2d-sway 3.6s ease-in-out ${i * 0.2}s infinite`,
            } as React.CSSProperties
          }
        >
          <div
            className="bs2d-block w-full rounded-[14px] py-[4%] text-center text-[clamp(12px,3.2vw,18px)] font-extrabold tracking-tight"
            style={
              {
                background: b.fill,
                color: b.ink,
                '--edge': b.edge,
                boxShadow: `0 4px 0 ${b.edge}`,
                animation: `bs2d-run 3s ease-in-out ${i * 0.6}s infinite`,
              } as React.CSSProperties
            }
          >
            {b.label}
          </div>
        </div>
      ))}
    </div>
  </div>
);
