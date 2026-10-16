import React from 'react';

const N = '#102A56';
const B = '#1870FF';
const L = '#DCEBFF';
const Y = '#FFC928';
const G = '#2BB673';
const SKY = '#5BA7FF';
const WHITE = '#FFFFFF';

interface PathwayFrameProps {
  children: React.ReactNode;
  className?: string;
  /** Small size for the preschool skill tiles. */
  mini?: boolean;
}

/** Shared frame for the curriculum scenes: soft grid, rounded corners, decorative only. */
export const PathwayFrame: React.FC<PathwayFrameProps> = ({ children, className = '', mini = false }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-[#E3ECFA] bg-[#F5F9FF] ${mini ? 'h-28' : 'h-40 sm:h-44'} ${className}`}
    aria-hidden="true"
  >
    <div
      className="absolute inset-0 opacity-60"
      style={{ backgroundImage: 'linear-gradient(#DCE7FB 1px, transparent 1px), linear-gradient(90deg, #DCE7FB 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    />
    <svg viewBox={mini ? '0 0 120 80' : '0 0 240 150'} preserveAspectRatio="xMidYMid meet" className="relative w-full h-full">
      {children}
    </svg>
  </div>
);

/* ---------- Preschool: one small animated tile per skill ---------- */

/** Logic: a shape slides into its matching slot, and the slot confirms it. */
const LogicTile = () => (
  <>
    <rect x="12" y="26" width="26" height="26" rx="6" fill="none" stroke={N} strokeWidth="2" strokeDasharray="4 3" />
    <rect x="82" y="26" width="26" height="26" rx="6" fill="none" stroke={N} strokeWidth="2" strokeDasharray="4 3" />
    <g className="spi-anim-slide">
      <rect x="12" y="26" width="26" height="26" rx="6" fill={B} />
    </g>
    <circle cx="95" cy="58" r="6" fill={G} className="spi-anim-pop" />
  </>
);

/** Patterns: circle, triangle, circle, triangle appear in order. */
const PatternsTile = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} className="spi-anim-pop" style={{ animationDelay: `${i * 0.5}s` }}>
        {i % 2 === 0 ? (
          <circle cx={22 + i * 24} cy="40" r="9" fill={B} />
        ) : (
          <path d={`M${12 + i * 24} 50 L${32 + i * 24} 50 L${22 + i * 24} 30 Z`} fill={Y} />
        )}
      </g>
    ))}
  </>
);

/** Creativity: a brush stroke draws itself, then a splash of colour appears. */
const CreativityTile = () => (
  <>
    <path d="M14 58 C 30 20, 56 96, 80 44 S 104 24, 108 40" fill="none" stroke={B} strokeWidth="5" strokeLinecap="round" pathLength={1} className="spi-anim-trace" />
    <circle cx="98" cy="62" r="8" fill={Y} className="spi-anim-pop" />
    <circle cx="26" cy="22" r="5" fill={G} className="spi-anim-pop" style={{ animationDelay: '1s' }} />
  </>
);

/** Visual play: a ball bounces on the floor. */
const VisualPlayTile = () => (
  <>
    <ellipse cx="60" cy="68" rx="20" ry="4" fill={N} opacity="0.18" />
    <circle cx="60" cy="52" r="14" fill={Y} className="spi-anim-drop" />
  </>
);

/** Early math: dots are counted one at a time. */
const EarlyMathTile = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={20 + i * 22} cy="38" r="8" fill={B} className="spi-anim-pop" style={{ animationDelay: `${i * 0.45}s` }} />
    ))}
    <rect x="18" y="58" width="84" height="10" rx="5" fill={L} />
    <rect x="18" y="58" width="84" height="10" rx="5" fill={G} className="spi-anim-grow" />
  </>
);

export const PRESCHOOL_SKILLS: { name: string; Tile: React.FC }[] = [
  { name: 'Logic', Tile: LogicTile },
  { name: 'Patterns', Tile: PatternsTile },
  { name: 'Creativity', Tile: CreativityTile },
  { name: 'Visual Play', Tile: VisualPlayTile },
  { name: 'Early Math', Tile: EarlyMathTile },
];

/* ---------- Foundation ---------- */

/** Build the Brain: command blocks snap in one after another, with a loop ring turning beside them. */
export const BuildBrainScene: React.FC = () => (
  <>
    {[
      { y: 28, w: 96, label: 'move', c: B },
      { y: 60, w: 84, label: 'repeat', c: Y },
      { y: 92, w: 72, label: 'turn', c: G },
    ].map((b, i) => (
      <g key={b.label} className="spi-anim-slide" style={{ animationDelay: `${i * 0.6}s` }}>
        <rect x="24" y={b.y} width={b.w} height="24" rx="8" fill={b.c} />
        <text x="34" y={b.y + 16} fontSize="11" fontWeight="700" fill={b.c === Y ? N : WHITE}>{b.label}</text>
      </g>
    ))}
    <circle cx="180" cy="76" r="30" fill="none" stroke={B} strokeWidth="6" strokeDasharray="110 80" strokeLinecap="round" opacity="0.45" className="spi-anim-spin" />
    <circle cx="180" cy="76" r="14" fill={WHITE} stroke={N} strokeWidth="2.5" />
    <circle cx="180" cy="76" r="4" fill={B} className="spi-anim-pop" />
  </>
);

/** Connect the Body: a board with an LED, a sensor sending waves, and a motor wheel that turns. */
export const ConnectBodyScene: React.FC = () => (
  <>
    <rect x="72" y="26" width="110" height="82" rx="12" fill={N} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={86 + i * 14} cy="40" r="2.5" fill={SKY} />
    ))}
    <circle cx="92" cy="72" r="7" fill={Y} className="spi-anim-blink" />
    <circle cx="116" cy="72" r="7" fill={G} className="spi-anim-glow" style={{ animationDelay: '0.6s' }} />
    <rect x="138" y="62" width="32" height="22" rx="4" fill={B} />
    <circle cx="36" cy="68" r="10" fill={B} />
    <circle cx="36" cy="68" r="10" fill="none" stroke={B} strokeWidth="2" className="spi-anim-ping" />
    <path d="M50 68 L66 68" stroke={B} strokeWidth="2.5" strokeDasharray="5 5" fill="none" className="spi-anim-dash" />
    <g className="spi-anim-spin">
      <circle cx="190" cy="120" r="18" fill={WHITE} stroke={N} strokeWidth="3" />
      <path d="M190 106 V134 M176 120 H204" stroke={N} strokeWidth="3" strokeLinecap="round" />
    </g>
  </>
);

/** Create the Experience: app screens are assembled block by block on a phone, with a tap ripple. */
export const CreateExperienceScene: React.FC = () => (
  <>
    <rect x="30" y="12" width="78" height="126" rx="16" fill={WHITE} stroke={N} strokeWidth="3" />
    <rect x="42" y="28" width="54" height="16" rx="5" fill={B} className="spi-anim-pop" />
    <rect x="42" y="50" width="54" height="30" rx="6" fill={L} className="spi-anim-pop" style={{ animationDelay: '0.5s' }} />
    <rect x="42" y="88" width="24" height="24" rx="6" fill={Y} className="spi-anim-pop" style={{ animationDelay: '1s' }} />
    <rect x="72" y="88" width="24" height="24" rx="6" fill={G} className="spi-anim-pop" style={{ animationDelay: '1.5s' }} />
    <g className="spi-anim-slide">
      <rect x="132" y="44" width="80" height="22" rx="7" fill={N} />
      <text x="142" y="59" fontSize="10" fontWeight="700" fill={WHITE}>Components</text>
    </g>
    <g className="spi-anim-slide" style={{ animationDelay: '0.8s' }}>
      <rect x="132" y="74" width="80" height="22" rx="7" fill={N} />
      <text x="142" y="89" fontSize="10" fontWeight="700" fill={WHITE}>Data Flow</text>
    </g>
    <circle cx="71" cy="110" r="10" fill="none" stroke={B} strokeWidth="2.5" className="spi-anim-ping" />
    <circle cx="71" cy="110" r="4" fill={B} />
  </>
);

/* ---------- Development ---------- */

/** Think with Python: lines of code are typed in, then a cursor blinks. */
export const ThinkPythonScene: React.FC = () => (
  <>
    <rect x="20" y="18" width="200" height="114" rx="12" fill={N} />
    <circle cx="34" cy="30" r="3.5" fill="#FF6B6B" />
    <circle cx="46" cy="30" r="3.5" fill={Y} />
    <circle cx="58" cy="30" r="3.5" fill={G} />
    {[
      { y: 46, w: 92, c: SKY, d: 0 },
      { y: 62, w: 130, c: Y, d: 0.5 },
      { y: 78, w: 110, c: G, d: 1 },
      { y: 94, w: 74, c: SKY, d: 1.5 },
    ].map((l) => (
      <rect key={l.y} x="34" y={l.y} width={l.w} height="7" rx="3.5" fill={l.c} className="spi-anim-grow" style={{ animationDelay: `${l.d}s` }} />
    ))}
    <rect x="34" y="110" width="6" height="12" fill={WHITE} className="spi-anim-blink" />
  </>
);

/** Build for the Web: a page layout appears block by block, with a cursor that clicks. */
export const BuildWebScene: React.FC = () => (
  <>
    <rect x="20" y="16" width="200" height="118" rx="12" fill={WHITE} stroke={N} strokeWidth="2.5" />
    <rect x="20" y="16" width="200" height="20" rx="12" fill={N} />
    <circle cx="32" cy="26" r="3" fill={WHITE} opacity="0.8" />
    <circle cx="42" cy="26" r="3" fill={WHITE} opacity="0.6" />
    <rect x="34" y="46" width="172" height="18" rx="5" fill={B} className="spi-anim-pop" />
    <rect x="34" y="72" width="82" height="48" rx="6" fill={L} className="spi-anim-pop" style={{ animationDelay: '0.5s' }} />
    <rect x="124" y="72" width="82" height="48" rx="6" fill={Y} className="spi-anim-pop" style={{ animationDelay: '1s' }} />
    <path d="M150 98 L150 120 L156 114 L161 125 L165 123 L160 112 L168 112 Z" fill={N} className="spi-anim-float" />
  </>
);

/** Connect Smart Systems: a board sends data along dashed links to a sensor and a phone. */
export const ConnectSystemsScene: React.FC = () => (
  <>
    <path d="M52 76 L92 76" stroke={B} strokeWidth="2.5" strokeDasharray="6 6" fill="none" className="spi-anim-dash" />
    <path d="M148 76 L188 76" stroke={B} strokeWidth="2.5" strokeDasharray="6 6" fill="none" className="spi-anim-dash" />
    <rect x="92" y="56" width="56" height="40" rx="9" fill={N} />
    <circle cx="106" cy="76" r="3.5" fill={Y} className="spi-anim-blink" />
    <circle cx="134" cy="76" r="3.5" fill={G} className="spi-anim-glow" />
    <circle cx="120" cy="48" r="9" fill="none" stroke={B} strokeWidth="2" className="spi-anim-ping" />
    <circle cx="36" cy="76" r="16" fill={WHITE} stroke={B} strokeWidth="2.5" />
    <circle cx="36" cy="76" r="5" fill={B} />
    <rect x="186" y="58" width="30" height="40" rx="7" fill={WHITE} stroke={N} strokeWidth="2.5" />
    <rect x="193" y="66" width="16" height="22" rx="3" fill={L} />
  </>
);

/** Build Intelligent Systems: a small neural network lights up layer by layer. */
export const BuildAIScene: React.FC = () => {
  const inputs = [36, 70, 104];
  const hidden = [24, 50, 76, 102, 128];
  return (
    <>
      {inputs.flatMap((y1) =>
        hidden.map((y2) => <line key={`${y1}-${y2}`} x1="58" y1={y1} x2="118" y2={y2} stroke="#9DBEF7" strokeWidth="1.2" />),
      )}
      {hidden.map((y) => (
        <line key={`o-${y}`} x1="130" y1={y} x2="186" y2="76" stroke="#9DBEF7" strokeWidth="1.2" />
      ))}
      {inputs.map((y, i) => (
        <circle key={`i-${y}`} cx="52" cy={y} r="6" fill={WHITE} stroke={B} strokeWidth="2" className="spi-anim-glow" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {hidden.map((y, i) => (
        <circle key={`h-${y}`} cx="124" cy={y} r="6" fill={B} className="spi-anim-glow" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
      <circle cx="192" cy="76" r="10" fill={Y} stroke={N} strokeWidth="2" />
      <circle cx="192" cy="76" r="10" fill="none" stroke={Y} strokeWidth="2" className="spi-anim-ping" />
    </>
  );
};

/* ---------- Exploration and Research ---------- */

/** SPI Exploration: one starting point branches into specialisations. */
export const ExploreScene: React.FC = () => {
  const branches = [
    { label: 'AI', y: 28, c: Y },
    { label: 'Web Dev', y: 58, c: SKY },
    { label: 'Robotics', y: 90, c: G },
    { label: 'Game Dev', y: 120, c: '#FF8A65' },
  ];
  return (
    <>
      <circle cx="36" cy="75" r="16" fill={N} />
      <circle cx="36" cy="75" r="16" fill="none" stroke={B} strokeWidth="2" className="spi-anim-ping" />
      {branches.map((b, i) => (
        <g key={b.label}>
          <path d={`M52 75 C 78 75, 92 ${b.y}, 118 ${b.y}`} fill="none" stroke={B} strokeWidth="2.5" strokeDasharray="5 5" className="spi-anim-dash" />
          <rect x="118" y={b.y - 12} width="104" height="24" rx="12" fill={WHITE} stroke={b.c} strokeWidth="2" className="spi-anim-pop" style={{ animationDelay: `${i * 0.25}s` }} />
          <text x="170" y={b.y + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={N}>{b.label}</text>
        </g>
      ))}
    </>
  );
};

/** SPI Research: bars rise, a trend line is traced, and an idea lights up. */
export const ResearchScene: React.FC = () => (
  <>
    {[
      { x: 26, h: 40, c: SKY },
      { x: 58, h: 62, c: SKY },
      { x: 90, h: 52, c: B },
      { x: 122, h: 80, c: B },
      { x: 154, h: 96, c: N },
    ].map((bar, i) => (
      <rect key={bar.x} x={bar.x} y={122 - bar.h} width="20" height={bar.h} rx="4" fill={bar.c} className="spi-anim-rise" style={{ animationDelay: `${i * 0.25}s` }} />
    ))}
    <path d="M22 104 C 58 100, 88 74, 124 60 S 186 38, 214 30" fill="none" stroke={Y} strokeWidth="3" strokeLinecap="round" pathLength={1} className="spi-anim-trace" />
    <circle cx="214" cy="30" r="6" fill={Y} className="spi-anim-pop" />
    <circle cx="200" cy="96" r="12" fill={Y} className="spi-anim-glow" />
    <rect x="195" y="108" width="10" height="8" rx="2" fill={N} />
  </>
);
