import React from 'react';
import type { LabCategoryKey } from '../../data/labCategories';

const N = '#041A5A';
const B = '#1870FF';
const LINE = '#DCE6F7';

/** Small scenes of the actual activity in each category (not stock icons). */
export const CategoryVisual: React.FC<{ kind: LabCategoryKey; className?: string }> = ({ kind, className = 'w-full h-full' }) => (
  <svg viewBox="0 0 240 120" className={className} aria-hidden="true">
    <rect width="240" height="120" rx="16" fill="#F4F8FF" />
    {kind === 'ai' && (
      <g>
        {/* one prompt, two outputs compared, one verified */}
        <rect x="16" y="16" width="208" height="22" rx="8" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="26" y="24" width="96" height="6" rx="3" fill={N} />
        <rect x="128" y="24" width="40" height="6" rx="3" fill={LINE} />
        <circle cx="208" cy="27" r="7" fill={B} />
        <path d="M205 27h6M209 24l3 3-3 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="16" y="48" width="100" height="58" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <text x="26" y="64" fontSize="10" fontWeight="800" fill="#94A3B8">A</text>
        <rect x="26" y="72" width="70" height="5" rx="2.5" fill={LINE} />
        <rect x="26" y="82" width="56" height="5" rx="2.5" fill={LINE} />
        <rect x="124" y="48" width="100" height="58" rx="10" fill="#fff" stroke={B} strokeWidth="2" />
        <text x="134" y="64" fontSize="10" fontWeight="800" fill={B}>B</text>
        <rect x="134" y="72" width="70" height="5" rx="2.5" fill={N} />
        <rect x="134" y="82" width="52" height="5" rx="2.5" fill={N} opacity="0.6" />
        <circle cx="210" cy="96" r="9" fill={B} />
        <path d="M206 96l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
    {kind === 'office' && (
      <g>
        {/* a spreadsheet feeding a chart, with a slide behind */}
        <rect x="124" y="14" width="100" height="64" rx="8" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="134" y="24" width="50" height="6" rx="3" fill={N} />
        <rect x="134" y="36" width="80" height="32" rx="4" fill="#EEF4FF" />
        <rect x="16" y="30" width="136" height="78" rx="8" fill="#fff" stroke={N} strokeWidth="2" />
        {[0, 1, 2, 3].map((r) => (
          <path key={`r${r}`} d={`M16 ${48 + r * 15}H152`} stroke={LINE} strokeWidth="1.2" />
        ))}
        <path d="M56 30V108M96 30V108" stroke={LINE} strokeWidth="1.2" />
        <rect x="16" y="30" width="136" height="14" rx="8" fill={B} opacity="0.12" />
        <text x="24" y="41" fontSize="8.5" fontWeight="800" fill={B}>=SUM</text>
        <g transform="translate(166 108)">
          {[22, 36, 28, 46].map((h, i) => (
            <rect key={h} x={i * 14} y={-h} width="9" height={h} rx="2" fill={i === 3 ? B : '#9DBEF7'} />
          ))}
        </g>
      </g>
    )}
    {kind === 'design' && (
      <g>
        {/* artboard with a pen path, plus a layers panel */}
        <rect x="16" y="14" width="150" height="92" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        <rect x="32" y="30" width="118" height="60" rx="6" fill="#EEF4FF" stroke={B} strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M46 78C64 40 94 40 108 60S136 76 140 44" stroke={N} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="46" cy="78" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <circle cx="108" cy="60" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <circle cx="140" cy="44" r="3.5" fill="#fff" stroke={B} strokeWidth="2" />
        <path d="M108 60L90 46M108 60l18 14" stroke={B} strokeWidth="1.2" />
        <rect x="176" y="14" width="48" height="92" rx="10" fill="#fff" stroke={LINE} strokeWidth="1.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="184" y={24 + i * 18} width="32" height="11" rx="3" fill={i === 1 ? B : '#EEF4FF'} />
        ))}
      </g>
    )}
  </svg>
);
