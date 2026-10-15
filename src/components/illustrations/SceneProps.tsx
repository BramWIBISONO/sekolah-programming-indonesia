import React from 'react';

/**
 * Small, flat technology props drawn for SPI's illustrated scenes (homepage banner and product
 * heroes). One palette (navy, Electric Blue, light blue, yellow accent), no stock artwork.
 */
const N = '#041A5A';
const B = '#1870FF';
const L = '#DCEBFF';
const Y = '#FFC928';
const W = '#FFFFFF';

type PropSvg = React.FC<{ className?: string }>;

const shadow = 'drop-shadow-[0_12px_18px_rgba(4,26,90,0.22)]';

export const gearPath = (cx: number, cy: number, rOuter: number, rInner: number, teeth: number) => {
  const pts: string[] = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const r = i % 4 === 0 || i % 4 === 1 ? rOuter : rInner;
    const a = i * step;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
};

export const sparklePath = (x: number, y: number, s: number) =>
  `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`;

const Svg: React.FC<{ viewBox: string; className?: string; children: React.ReactNode }> = ({ viewBox, className = '', children }) => (
  <svg viewBox={viewBox} className={`${shadow} ${className}`} aria-hidden="true">{children}</svg>
);

export const CodeWindow: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 210 138" className={className}>
    <rect width="210" height="138" rx="16" fill={W} />
    <path d="M0 16a16 16 0 0 1 16-16h178a16 16 0 0 1 16 16v14H0z" fill={N} />
    <circle cx="20" cy="15" r="4.5" fill={Y} /><circle cx="36" cy="15" r="4.5" fill="#9DBEF7" /><circle cx="52" cy="15" r="4.5" fill={W} />
    <rect x="20" y="48" width="70" height="8" rx="4" fill={B} /><rect x="98" y="48" width="44" height="8" rx="4" fill="#C9DAF7" />
    <rect x="36" y="66" width="96" height="8" rx="4" fill={N} /><rect x="36" y="84" width="60" height="8" rx="4" fill={Y} />
    <rect x="20" y="102" width="84" height="8" rx="4" fill="#C9DAF7" />
    <rect x="150" y="86" width="44" height="36" rx="10" fill={B} />
    <path d="M165 97l-6 7 6 7M179 97l6 7-6 7M175 95l-6 18" stroke={W} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Gears: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 110 100" className={className}>
    <path d={gearPath(42, 42, 38, 30, 10)} fill={N} /><circle cx="42" cy="42" r="12" fill={L} />
    <path d={gearPath(88, 78, 22, 17, 8)} fill={B} /><circle cx="88" cy="78" r="7" fill={L} />
  </Svg>
);

export const Chip: PropSvg = ({ className }) => (
  <Svg viewBox="0 -12 100 104" className={className}>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={18 + i * 18} y="-10" width="6" height="12" rx="2" fill="#9DBEF7" />
        <rect x={18 + i * 18} y="78" width="6" height="12" rx="2" fill="#9DBEF7" />
      </g>
    ))}
    <rect width="100" height="80" rx="14" fill={N} />
    <rect x="16" y="16" width="44" height="30" rx="6" fill={B} />
    <circle cx="78" cy="22" r="7" fill={Y} />
    <rect x="16" y="56" width="68" height="6" rx="3" fill="#2B4A8F" />
  </Svg>
);

export const Rocket: PropSvg = ({ className }) => (
  <Svg viewBox="-45 -70 90 160" className={className}>
    <path d="M-11 40Q0 86 11 40Z" fill={Y} />
    <path d="M-18 18L-38 50L-16 42Z" fill={B} /><path d="M18 18L38 50L16 42Z" fill={B} />
    <path d="M0 -62C24 -40 28 10 18 42H-18C-28 10 -24 -40 0 -62Z" fill={W} />
    <circle cy="-10" r="13" fill={B} /><circle cy="-10" r="6" fill={L} />
  </Svg>
);

/** Scratch / mBlock style stacked code blocks. */
export const Blocks: PropSvg = ({ className }) => {
  const block = (w: number) => `M0 6a6 6 0 0 1 6-6h10l4 4h12l4-4h${w - 42}a6 6 0 0 1 6 6v16a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z`;
  return (
    <Svg viewBox="0 0 160 112" className={className}>
      <g transform="translate(4 4)"><path d={`M0 18C0 4 24 0 48 0s48 4 48 18v6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z`} fill={Y} /><rect x="12" y="13" width="54" height="6" rx="3" fill={N} opacity="0.7" /></g>
      <g transform="translate(4 36)"><path d={block(130)} fill={B} /><rect x="12" y="11" width="70" height="6" rx="3" fill={W} opacity="0.9" /></g>
      <g transform="translate(18 66)"><path d={block(120)} fill={N} /><rect x="12" y="11" width="56" height="6" rx="3" fill={W} opacity="0.85" /></g>
      <g transform="translate(4 94)"><rect width="70" height="14" rx="6" fill="#9DBEF7" /></g>
    </Svg>
  );
};

/** Arduino robot car with an ultrasonic sensor "face". */
export const RobotCar: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 140 104" className={className}>
    <path d="M70 6v14" stroke={N} strokeWidth="4" strokeLinecap="round" /><circle cx="70" cy="6" r="6" fill={Y} />
    <rect x="14" y="22" width="112" height="50" rx="14" fill={B} />
    <rect x="34" y="32" width="72" height="26" rx="8" fill={N} />
    <circle cx="56" cy="45" r="9" fill={W} /><circle cx="56" cy="45" r="4" fill={N} />
    <circle cx="84" cy="45" r="9" fill={W} /><circle cx="84" cy="45" r="4" fill={N} />
    <circle cx="36" cy="80" r="17" fill={N} /><circle cx="36" cy="80" r="7" fill={L} />
    <circle cx="104" cy="80" r="17" fill={N} /><circle cx="104" cy="80" r="7" fill={L} />
  </Svg>
);

export const AIChat: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 160 118" className={className}>
    <path d="M18 0h124a18 18 0 0 1 18 18v52a18 18 0 0 1-18 18H62l-26 22 4-22H18A18 18 0 0 1 0 70V18A18 18 0 0 1 18 0z" fill={W} />
    <rect x="18" y="20" width="36" height="36" rx="10" fill={B} />
    <text x="36" y="45" textAnchor="middle" fontSize="17" fontWeight="900" fill={W} fontFamily="system-ui, sans-serif">AI</text>
    <rect x="66" y="24" width="72" height="8" rx="4" fill={N} /><rect x="66" y="42" width="54" height="8" rx="4" fill="#C9DAF7" />
    <rect x="18" y="66" width="96" height="8" rx="4" fill="#C9DAF7" />
    <path d={sparklePath(146, 14, 11)} fill={Y} />
  </Svg>
);

export const ChartCard: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 170 124" className={className}>
    <rect width="170" height="124" rx="16" fill={W} />
    <rect x="16" y="16" width="70" height="8" rx="4" fill={N} />
    {[34, 56, 44, 72].map((h, i) => (
      <rect key={i} x={22 + i * 32} y={108 - h} width="20" height={h} rx="4" fill={i === 3 ? B : '#9DBEF7'} />
    ))}
    <path d="M30 86L62 62L94 72L126 40" stroke={Y} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="126" cy="40" r="6" fill={Y} />
  </Svg>
);

export const PenCard: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 170 124" className={className}>
    <rect width="170" height="124" rx="16" fill={W} />
    <rect x="14" y="14" width="142" height="96" rx="10" fill={L} stroke={B} strokeWidth="2" strokeDasharray="6 5" />
    <path d="M34 92C52 40 88 34 104 64S136 82 140 36" stroke={N} strokeWidth="4" fill="none" strokeLinecap="round" />
    {[[34, 92], [104, 64], [140, 36]].map(([x, y]) => (
      <rect key={x} x={x - 6} y={y - 6} width="12" height="12" rx="3" fill={W} stroke={B} strokeWidth="3" />
    ))}
    <path d="M104 64L82 46M104 64l22 18" stroke={B} strokeWidth="2" />
  </Svg>
);

export const NeuralNet: PropSvg = ({ className }) => {
  const cols = [[30, 70, 110].map((y) => [26, y]), [40, 90].map((y) => [80, y]), [[134, 70]]];
  const edges: [number[], number[]][] = [];
  cols[0].forEach((a) => cols[1].forEach((b) => edges.push([a, b])));
  cols[1].forEach((a) => cols[2].forEach((b) => edges.push([a, b])));
  return (
    <Svg viewBox="0 0 160 140" className={className}>
      <rect width="160" height="140" rx="18" fill={W} />
      {edges.map(([a, b], i) => <path key={i} d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} stroke="#9DBEF7" strokeWidth="2.5" />)}
      {cols[0].map(([x, y]) => <circle key={`a${y}`} cx={x} cy={y} r="10" fill={B} />)}
      {cols[1].map(([x, y]) => <circle key={`b${y}`} cx={x} cy={y} r="11" fill={N} />)}
      {cols[2].map(([x, y]) => <circle key={`c${y}`} cx={x} cy={y} r="12" fill={Y} />)}
    </Svg>
  );
};

export const Terminal: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 190 124" className={className}>
    <rect width="190" height="124" rx="16" fill={N} />
    <circle cx="20" cy="17" r="4.5" fill={Y} /><circle cx="36" cy="17" r="4.5" fill="#9DBEF7" /><circle cx="52" cy="17" r="4.5" fill={W} opacity="0.7" />
    <path d="M20 46l12 10-12 10" stroke={Y} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="42" y="62" width="22" height="5" rx="2.5" fill={Y} />
    <rect x="20" y="82" width="110" height="7" rx="3.5" fill="#2B4A8F" /><rect x="20" y="98" width="76" height="7" rx="3.5" fill="#2B4A8F" />
    <rect x="80" y="48" width="86" height="7" rx="3.5" fill={B} />
  </Svg>
);

export const CloudServer: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 180 128" className={className}>
    <path d="M44 64a32 32 0 0 1 62-12a26 26 0 0 1 46 18a22 22 0 0 1-4 44H40a26 26 0 0 1 4-50z" fill={W} />
    <rect x="60" y="66" width="64" height="18" rx="6" fill={B} /><rect x="60" y="88" width="64" height="18" rx="6" fill={N} />
    <circle cx="112" cy="75" r="3.5" fill={Y} /><circle cx="112" cy="97" r="3.5" fill={Y} />
    <rect x="68" y="72" width="26" height="5" rx="2.5" fill={W} opacity="0.8" /><rect x="68" y="94" width="26" height="5" rx="2.5" fill={W} opacity="0.6" />
  </Svg>
);

export const WifiChip: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 130 130" className={className}>
    <path d="M30 54a50 50 0 0 1 70 0M42 66a33 33 0 0 1 46 0M54 78a16 16 0 0 1 22 0" stroke={B} strokeWidth="7" fill="none" strokeLinecap="round" />
    <rect x="35" y="88" width="60" height="38" rx="10" fill={N} />
    <circle cx="65" cy="107" r="7" fill={Y} />
  </Svg>
);

export const School: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 180 140" className={className}>
    <path d="M90 6v26" stroke={N} strokeWidth="3" /><path d="M90 6h22l-6 7 6 7H90z" fill={Y} />
    <path d="M30 62L90 30l60 32z" fill={B} />
    <rect x="34" y="60" width="112" height="70" rx="6" fill={W} />
    <rect x="76" y="94" width="28" height="36" rx="4" fill={N} />
    {[48, 112].map((x) => (
      <g key={x}><rect x={x} y="72" width="20" height="18" rx="3" fill={L} /><rect x={x} y="100" width="20" height="18" rx="3" fill={L} /></g>
    ))}
    <circle cx="90" cy="76" r="8" fill={L} stroke={B} strokeWidth="3" />
  </Svg>
);

export const GradCap: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 150 112" className={className}>
    <path d="M30 52v28c0 10 20 18 45 18s45-8 45-18V52" fill={N} />
    <path d="M75 8l70 30-70 30L5 38z" fill={B} />
    <path d="M118 46v34" stroke={Y} strokeWidth="4" strokeLinecap="round" /><circle cx="118" cy="84" r="7" fill={Y} />
  </Svg>
);

export const Chalkboard: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 180 128" className={className}>
    <rect width="180" height="112" rx="14" fill={B} />
    <rect x="10" y="10" width="160" height="92" rx="8" fill={N} />
    <path d="M44 38l-14 16 14 16M76 38l14 16-14 16M66 34l-12 40" stroke={Y} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="106" y="40" width="48" height="6" rx="3" fill={W} opacity="0.8" /><rect x="106" y="56" width="36" height="6" rx="3" fill={W} opacity="0.5" />
    <rect x="62" y="110" width="56" height="12" rx="4" fill="#9DBEF7" />
  </Svg>
);

export const Certificate: PropSvg = ({ className }) => (
  <Svg viewBox="0 0 170 128" className={className}>
    <rect width="150" height="108" rx="12" fill={W} />
    <rect x="10" y="10" width="130" height="88" rx="8" fill="none" stroke={L} strokeWidth="3" />
    <rect x="34" y="28" width="82" height="9" rx="4.5" fill={N} />
    <rect x="28" y="46" width="94" height="6" rx="3" fill="#C9DAF7" /><rect x="40" y="60" width="70" height="6" rx="3" fill="#C9DAF7" />
    <path d="M128 92l-8 30 14-8 14 8-8-30" fill={B} />
    <circle cx="134" cy="86" r="18" fill={Y} /><circle cx="134" cy="86" r="9" fill={W} opacity="0.7" />
  </Svg>
);

export const Sparkles: PropSvg = ({ className }) => (
  <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
    <path d={sparklePath(20, 22, 14)} fill={Y} />
    <path d={sparklePath(46, 44, 9)} fill={W} />
  </svg>
);

export const Cloud: PropSvg = ({ className }) => (
  <svg viewBox="0 0 120 50" className={className} aria-hidden="true">
    <path d="M24 42a18 18 0 0 1 4-35a24 24 0 0 1 44 6a16 16 0 0 1 26 12a14 14 0 0 1 4 17z" fill={W} opacity="0.9" />
  </svg>
);

/** Distant city / tech skyline, drawn in pale blues so it reads as far away. */
type NestableSvg = React.FC<{ className?: string; svgProps?: React.SVGProps<SVGSVGElement> }>;

export const Skyline: NestableSvg = ({ className, svgProps }) => {
  const buildings: [number, number, number][] = [
    [0, 70, 60], [76, 54, 92], [136, 80, 70], [222, 60, 118], [330, 90, 64], [428, 56, 104], [490, 76, 80],
    [580, 64, 126], [650, 96, 72], [820, 70, 96], [896, 58, 66], [960, 84, 110], [1150, 76, 78], [1232, 62, 100],
    [1300, 90, 70], [1396, 60, 112],
  ];
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true" {...svgProps}>
      <g fill="#CFE0FF">
        {buildings.map(([x, w, h]) => <rect key={x} x={x} y={160 - h} width={w} height={h} rx="6" />)}
        {/* observatory dome */}
        <path d="M260 160V112h52v48z" /><path d="M254 112a32 32 0 0 1 64 0z" />
        {/* broadcast tower */}
        <rect x="1078" y="40" width="14" height="120" rx="4" /><path d="M1060 160l25-96 25 96z" />
        {/* satellite dish */}
        <path d="M1250 60a30 30 0 0 0 46 34z" /><rect x="1268" y="78" width="6" height="22" />
        {/* wind turbine */}
        <rect x="764" y="56" width="6" height="104" rx="3" />
        <path d="M767 56l-4-44 8 0z M767 56l-40 22 4 6z M767 56l40 22-4 6z" />
      </g>
      <g fill="#E3EEFF">
        {buildings.filter((_, i) => i % 2 === 0).map(([x, w, h]) =>
          [0, 1, 2].map((r) => <rect key={`${x}-${r}`} x={x + 12} y={160 - h + 14 + r * 18} width={w - 24} height="6" rx="3" />)
        )}
      </g>
      <circle cx="1085" cy="38" r="6" fill="#FFC928" />
    </svg>
  );
};

/** Stylised tree for the hills. */
export const Tree: NestableSvg = ({ className, svgProps }) => (
  <svg viewBox="0 0 80 100" className={className} aria-hidden="true" {...svgProps}>
    <rect x="36" y="58" width="8" height="40" rx="4" fill="#2B5FC9" />
    <circle cx="40" cy="40" r="28" fill="#4F8DFF" />
    <circle cx="24" cy="52" r="18" fill="#3D7DF5" />
    <circle cx="56" cy="50" r="20" fill="#5B9BFF" />
    <circle cx="46" cy="28" r="10" fill="#7FB0FF" opacity="0.9" />
  </svg>
);
