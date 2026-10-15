import React from 'react';
import type { LabCategoryKey } from '../../data/labCategories';
import { SpiIcon } from '../illustrations/SpiIcon';
import { CategoryVisual } from './CategoryVisual';

interface LabBannerProps {
  kind: LabCategoryKey;
  /** Big title on the banner (product names stay in English). */
  title: string;
  /** Small label next to the SPI mark, e.g. "SPI Lab" or "SPI Lab for Business". */
  label?: string;
  /** Optional yellow corner badge. */
  badge?: string;
  /** sm: menu thumbnails · md: wide cards · lg: hero artwork (4:3). */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Program banner drawn in code (no stock photo): Electric Blue panel with a tech grid, the SPI mark,
 * a bold title and the category's own illustration on a tilted card.
 */
export const LabBanner: React.FC<LabBannerProps> = ({ kind, title, label = 'SPI Lab', badge, size = 'sm', className = '' }) => {
  const lg = size === 'lg';
  const md = size === 'md';
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1870FF] via-[#1462E8] to-[#0B3FB0] text-white ${lg ? 'aspect-[4/3]' : 'aspect-[16/9]'} ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: lg || md ? '28px 28px' : '16px 16px' }}
      />
      <span className="absolute -right-[20%] -top-[30%] w-[80%] h-[120%] rotate-12 bg-white/10" />
      <svg className="absolute inset-x-0 bottom-0 w-full h-[30%]" viewBox="0 0 400 60" preserveAspectRatio="none">
        <path d="M0 40C80 20 160 52 240 36S360 18 400 30V60H0Z" fill="#fff" opacity="0.12" />
        <path d="M0 50C100 34 190 58 280 46S370 36 400 42V60H0Z" fill="#fff" opacity="0.12" />
      </svg>

      {/* SPI mark + label */}
      <span className={`absolute flex items-center gap-1.5 font-black tracking-wide ${lg || md ? 'left-[6%] top-[8%] text-xs sm:text-sm' : 'left-[6%] top-[9%] text-[9px]'}`}>
        <span className={`rounded-full bg-white flex items-center justify-center ${lg || md ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-4 h-4'}`}>
          <SpiIcon name="lab" size={lg || md ? 24 : 13} animate="none" />
        </span>
        {label}
      </span>
      {badge && (
        <span className={`absolute right-0 top-0 rounded-bl-xl bg-[#FFC928] text-[#041A5A] font-black ${lg || md ? 'px-4 py-2 text-xs sm:text-sm' : 'px-2 py-1 text-[9px]'}`}>{badge}</span>
      )}

      {/* title */}
      <span
        className={`absolute left-[6%] font-black uppercase leading-[1.05] tracking-tight drop-shadow-[0_2px_8px_rgba(2,18,70,0.35)] ${
          lg ? 'top-[22%] w-[52%] text-2xl sm:text-3xl' : md ? 'top-[27%] w-[52%] text-base sm:text-xl lg:text-2xl' : 'top-[28%] w-[54%] text-[10px] sm:text-[12px] [overflow-wrap:anywhere]'
        }`}
      >
        {title}
      </span>

      {/* illustration */}
      <span className={`absolute rotate-[-4deg] rounded-xl bg-white shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] ${lg ? 'right-[6%] bottom-[14%] w-[44%] p-2' : md ? 'right-[5%] bottom-[13%] w-[40%] p-1.5' : 'right-[5%] bottom-[12%] w-[38%] p-1'}`}>
        <CategoryVisual kind={kind} className="w-full h-auto" />
      </span>
    </div>
  );
};
