import React from 'react';
import { ASSETS } from '../../constants/assets';
import { SpiIcon, type SpiIconName } from './SpiIcon';

export interface PartnershipNode {
  key: string;
  icon: SpiIconName;
  label: string;
}

interface PartnershipHub2DProps {
  className?: string;
  /** Four partnership models, placed in the four corners in this order: top left, top right, bottom left, bottom right. */
  nodes: PartnershipNode[];
}

/** Node centres as a share of the frame, in the same order as the nodes. */
const POSITIONS = [
  { left: 27, top: 25 },
  { left: 73, top: 25 },
  { left: 27, top: 75 },
  { left: 73, top: 75 },
];

const CSS = `
@keyframes pnh-flow { to { stroke-dashoffset: -24; } }
@keyframes pnh-bob {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-5px); }
}
@keyframes pnh-ping {
  0% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .pnh-line, .pnh-node, .pnh-ping { animation: none !important; }
}
`;

/**
 * Partnership hero art, drawn in code: SPI at the centre of a network, with the four partnership
 * models connected to it. Lines carry a slow flow, and each model bobs out of step with the others.
 */
export const PartnershipHub2D: React.FC<PartnershipHub2DProps> = ({ className = '', nodes }) => (
  <div
    className={`relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#F5F9FF] via-[#EAF2FF] to-[#D6E6FF] ${className}`}
    aria-hidden="true"
  >
    <style>{CSS}</style>

    <div
      className="absolute inset-0 opacity-[0.35]"
      style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '28px 28px' }}
    />

    {/* connections: dashed lines from the hub to each model, flowing outward */}
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {POSITIONS.map((p, i) => (
        <line
          key={i}
          className="pnh-line"
          x1="50"
          y1="50"
          x2={p.left}
          y2={p.top}
          stroke="#1870FF"
          strokeWidth="0.5"
          strokeDasharray="1.6 1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 2.5, opacity: 0.6, animation: `pnh-flow 1.6s linear infinite` }}
        />
      ))}
    </svg>

    {/* hub: SPI logo with a soft pulse */}
    <span
      className="absolute left-1/2 top-1/2 h-28 w-28 rounded-full bg-[#1870FF]/25"
      style={{ animation: 'pnh-ping 2.8s ease-out infinite' }}
      aria-hidden="true"
    />
    <span
      className="absolute left-1/2 top-1/2 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_22px_40px_-18px_rgba(24,112,255,0.6)] ring-8 ring-white/70 sm:h-28 sm:w-28"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <img src={ASSETS.brand.logoHeader} alt="" className="w-[68%] object-contain" decoding="async" />
    </span>

    {/* the four partnership models */}
    {nodes.map((node, i) => {
      const pos = POSITIONS[i];
      if (!pos) return null;
      return (
        <div
          key={node.key}
          className="pnh-node absolute flex w-[36%] min-w-[104px] max-w-[146px] flex-col items-center gap-2 rounded-2xl border border-[#DCE7FB] bg-white px-3 py-3 text-center shadow-[0_18px_36px_-22px_rgba(4,26,90,0.45)]"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            transform: 'translate(-50%, -50%)',
            animation: `pnh-bob 4.2s ease-in-out ${i * 0.45}s infinite`,
          }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#1870FF]">
            <SpiIcon name={node.icon} size={26} animate="none" />
          </span>
          <span className="text-[12px] font-black leading-tight text-[#041A5A]">{node.label}</span>
        </div>
      );
    })}
  </div>
);
