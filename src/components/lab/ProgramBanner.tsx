import React from 'react';
import type { CurriculumProduct } from '../../data/curriculum';
import { SpiIcon } from '../illustrations/SpiIcon';
import { CodeWindow, RobotCar, School } from '../illustrations/SceneProps';

type BannerProduct = Exclude<CurriculumProduct, 'lab'>;

/** One illustration per product, drawn in code like the lab banners. */
const SCENE: Record<BannerProduct, React.FC<{ className?: string }>> = {
  core: CodeWindow,
  engineering: RobotCar,
  inschool: School,
};

interface ProgramBannerProps {
  product: BannerProduct;
  /** Big title on the banner (product names stay in English). */
  title: string;
  /** Small label next to the SPI mark. */
  label: string;
  className?: string;
}

/**
 * Wide programme banner for the navbar mega menu: Electric Blue panel, tech grid, the programme's
 * illustration on a tilted card, and the title. Drawn in code, no stock photo.
 */
export const ProgramBanner: React.FC<ProgramBannerProps> = ({ product, title, label, className = '' }) => {
  const Scene = SCENE[product];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#1870FF] via-[#1462E8] to-[#0B3FB0] text-white aspect-[16/7] ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />
      <span className="absolute -right-[20%] -top-[30%] w-[80%] h-[120%] rotate-12 bg-white/10" />
      <svg className="absolute inset-x-0 bottom-0 w-full h-[30%]" viewBox="0 0 400 60" preserveAspectRatio="none">
        <path d="M0 40C80 20 160 52 240 36S360 18 400 30V60H0Z" fill="#fff" opacity="0.12" />
        <path d="M0 50C100 34 190 58 280 46S370 36 400 42V60H0Z" fill="#fff" opacity="0.12" />
      </svg>

      <span className="absolute left-[6%] top-[8%] flex items-center gap-2 text-xs sm:text-sm font-black tracking-wide">
        <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
          <SpiIcon name="lab" size={20} animate="none" />
        </span>
        {label}
      </span>

      <span className="absolute left-[6%] top-[30%] w-[52%] font-black uppercase leading-[1.05] tracking-tight text-2xl sm:text-3xl drop-shadow-[0_2px_8px_rgba(2,18,70,0.35)]">
        {title}
      </span>

      <span className="absolute right-[6%] bottom-[12%] w-[36%] rotate-[-4deg] rounded-xl bg-white p-2 shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)]">
        <Scene className="w-full h-auto" />
      </span>
    </div>
  );
};
