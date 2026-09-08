import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, RotateCcw, MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface IndonesiaMapProps {
  selectedKey?: string;
  onSelect?: (item: { key: string; name: string; type: 'active' | 'future'; description: string } | null) => void;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({ selectedKey, onSelect }) => {
  const { t, lang } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<{
    key: string;
    name: string;
    type: 'active' | 'future';
    x: number;
    y: number;
  } | null>(null);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Percentage-based coordinates for exact location placements on Indonesia map
  // Geographic accuracy:
  // Jakarta Barat: West Java (x: 28.5%, y: 77.0%)
  // Yogyakarta: South Central Java (x: 34.0%, y: 80.5%)
  // Solo (Surakarta): Central Java, northeast of Jogja (x: 36.8%, y: 78.5%)
  // Surabaya: East Java north coast (x: 41.2%, y: 78.0%)
  // Malang: East Java south inland (x: 40.5%, y: 82.5%)
  const activeLocations = [
    { key: 'jakarta_barat', nameKey: 'partnership.loc.jakarta_barat', label: 'Jakarta Barat', x: 28.5, y: 77.0 },
    { key: 'jogja', nameKey: 'partnership.loc.jogja', label: 'Yogyakarta', x: 34.0, y: 80.5 },
    { key: 'solo', nameKey: 'partnership.loc.solo', label: 'Solo', x: 36.8, y: 78.5 },
    { key: 'surabaya', nameKey: 'partnership.loc.surabaya', label: 'Surabaya', x: 41.2, y: 78.0 },
    { key: 'malang', nameKey: 'partnership.loc.malang', label: 'Malang', x: 40.5, y: 82.5 }
  ];

  const futureRegions = [
    { key: 'sumatera', nameKey: 'partnership.reg.sumatera', label: 'Sumatra', x: 14.0, y: 35.0 },
    { key: 'kalimantan', nameKey: 'partnership.reg.kalimantan', label: 'Kalimantan', x: 36.0, y: 38.0 },
    { key: 'sulawesi', nameKey: 'partnership.reg.sulawesi', label: 'Sulawesi', x: 52.5, y: 42.0 },
    { key: 'papua', nameKey: 'partnership.reg.papua', label: 'Papua', x: 86.0, y: 50.0 },
    { key: 'other', nameKey: 'partnership.reg.other', label: 'Nusa Tenggara & Maluku', x: 65.0, y: 64.0 }
  ];

  const locationDescriptions: Record<string, Record<string, string>> = {
    jakarta_barat: {
      id: "SPI Jakarta Barat merupakan cabang utama kami yang menyelenggarakan kelas coding offline di center kami dan kelas online interaktif.",
      en: "SPI West Jakarta is our main branch offering offline coding classes at our center and interactive online classes.",
      zh: "SPI 雅加达西区是我们的主要分校，提供中心线下编程课程和互动式在线课程。"
    },
    surabaya: {
      id: "SPI Surabaya menghadirkan kurikulum AI-Native untuk tingkat SD, SMP, dan SMA dengan metode pembelajaran berbasis proyek nyata.",
      en: "SPI Surabaya brings the AI-Native curriculum for elementary, middle, and high school levels with project-based learning.",
      zh: "SPI 泗水为中小学生提供 AI-Native 课程，采用以真实项目为基础的教学方法。"
    },
    malang: {
      id: "SPI Malang memfokuskan pengembangan computational thinking dan robotik untuk membantu siswa berinovasi secara digital.",
      en: "SPI Malang focuses on computational thinking and robotics to help students innovate digitally.",
      zh: "SPI 玛琅专注于计算思维和机器人技术，帮助学生进行数字化创新。"
    },
    solo: {
      id: "SPI Solo melatih siswa dengan computational thinking dan coding fundamentals menggunakan platform pembelajaran terstandar.",
      en: "SPI Solo trains students in computational thinking and coding fundamentals using a standardized learning platform.",
      zh: "SPI 梭罗使用标准化的学习平台培养学生的计算思维和编程基础。"
    },
    jogja: {
      id: "SPI Yogyakarta mengkolaborasikan teknologi modern dengan kurikulum inovatif untuk mempersiapkan siswa bersaing secara internasional.",
      en: "SPI Yogyakarta collaborates modern technology with innovative curriculum to prepare students for international competition.",
      zh: "SPI 日惹将现代技术与创新课程相结合，为学生参加国际竞赛做好准备。"
    },
    sumatera: {
      id: "Terbuka bagi sekolah, learning center, dan komunitas di Sumatera yang ingin mengintegrasikan kurikulum coding & AI.",
      en: "Open for schools, learning centers, and communities in Sumatra looking to integrate coding & AI curriculum.",
      zh: "对苏门答腊的学校、学习中心和社区开放，旨在整合编程与人工智能课程。"
    },
    kalimantan: {
      id: "Membuka kerja sama dengan institusi pendidikan di Kalimantan untuk menyelenggarakan pembelajaran teknologi digital terpadu.",
      en: "Collaborate with educational institutions in Kalimantan to implement integrated digital technology learning.",
      zh: "与加里曼丹的教育机构合作，实施一体化的数字技术学习。"
    },
    sulawesi: {
      id: "Peluang kemitraan strategis untuk memperluas akses pendidikan programming dan literasi AI di wilayah Sulawesi.",
      en: "Strategic partnership opportunities to expand access to programming and AI literacy education in Sulawesi.",
      zh: "在苏拉威西扩大编程和人工智能素养教育覆盖面的战略合作机会。"
    },
    papua: {
      id: "Mendukung digitalisasi sekolah dan komunitas di Papua dengan kurikulum teknologi dan bimbingan guru berkelanjutan.",
      en: "Supporting school and community digitization in Papua with tech curriculum and continuous teacher guidance.",
      zh: "通过技术课程和持续的教师指导，支持巴布亚的学校和社区数字化进程。"
    },
    other: {
      id: "Bermitra dengan SPI untuk menghadirkan kelas teknologi interaktif di Bali, Nusa Tenggara, Maluku, dan wilayah lainnya.",
      en: "Partner with SPI to bring interactive technology classes to Bali, Nusa Tenggara, Maluku, and other regions.",
      zh: "与 SPI 合作，将互动技术课堂带到巴厘岛、努沙登加拉、马鲁古及其他地区。"
    }
  };

  const handleMarkerMouseEnter = (loc: any) => {
    const name = t(loc.nameKey) || loc.label;
    setHoveredItem({
      key: loc.key,
      name,
      type: 'active',
      x: loc.x,
      y: loc.y
    });
  };

  const handleRegionMouseEnter = (regionKey: string) => {
    setHoveredRegion(regionKey);
    const reg = [...futureRegions, { key: 'jawa', nameKey: '', label: 'Jawa', x: 34.5, y: 77.0 }].find(r => r.key === regionKey);
    if (!reg) return;

    const name = regionKey === 'jawa' ? 'Jawa' : (t(reg.nameKey) || reg.label);
    setHoveredItem({
      key: regionKey,
      name,
      type: regionKey === 'jawa' ? 'active' : 'future',
      x: reg.x,
      y: reg.y
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    setHoveredRegion(null);
  };

  const handleMarkerClick = (loc: any) => {
    if (!onSelect) return;
    const name = t(loc.nameKey) || loc.label;
    const desc = locationDescriptions[loc.key]?.[lang] || locationDescriptions[loc.key]?.['id'] || '';
    onSelect({
      key: loc.key,
      name,
      type: 'active',
      description: desc
    });
  };

  const handleRegionClick = (regionKey: string) => {
    if (!onSelect) return;

    if (regionKey === 'jawa') {
      onSelect({
        key: 'jawa',
        name: 'Jawa (Java)',
        type: 'active',
        description: lang === 'zh' ? 'SPI 当前在爪哇岛（Jawa）设有多个校区，包括雅加达西区、泗水、梭罗、日惹和玛琅。' : lang === 'en' ? 'SPI currently has multiple active branches in Java, including West Jakarta, Surabaya, Solo, Yogyakarta, and Malang.' : 'SPI saat ini memiliki beberapa cabang aktif di pulau Jawa, meliputi Jakarta Barat, Surabaya, Solo, Yogyakarta, dan Malang.'
      });
      return;
    }

    const reg = futureRegions.find(r => r.key === regionKey);
    if (!reg) return;

    const name = t(reg.nameKey) || reg.label;
    const desc = locationDescriptions[regionKey]?.[lang] || locationDescriptions[regionKey]?.['id'] || '';
    onSelect({
      key: regionKey,
      name,
      type: 'future',
      description: desc
    });
  };

  const updateZoom = (nextZoom: number) => {
    const clampedZoom = Math.min(2.5, Math.max(1, nextZoom));
    setZoom(clampedZoom);
    if (clampedZoom === 1) setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId || zoom === 1) return;
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    setPan((current) => ({ x: current.x + deltaX, y: current.y + deltaY }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    updateZoom(zoom + (event.deltaY < 0 ? 0.15 : -0.15));
  };

  return (
    <div className="relative w-full aspect-[900/440] select-none bg-[#EBF4FE] dark:bg-[#071324] rounded-2xl p-2 border border-[#CBE0F8] dark:border-slate-800 flex items-center justify-center overflow-hidden transition-colors shadow-inner">
      
      {/* Animations styling */}
      <style>{`
        @keyframes gentle-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.85;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 2.2s infinite ease-out;
        }
        @keyframes line-dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-connection-line {
          stroke-dasharray: 6, 4;
          animation: line-dash 3s infinite linear;
        }
      `}</style>

      <div
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >

        {/* High-Contrast Geographically Accurate Indonesia Map */}
        <div className="w-full h-full relative flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Indonesia_blank_map.svg"
            alt={t('partnership.aria')}
            className="w-full h-full object-contain select-none pointer-events-none filter drop-shadow-[0_2px_10px_rgba(24,107,246,0.25)] brightness-[1.02] contrast-[1.65] saturate-[1.15] dark:invert dark:opacity-80"
            draggable={false}
          />
        </div>

        {/* SVG overlay for drawing accurate connection lines between SPI centers in Java */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-1"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {!prefersReducedMotion && (
            <g>
              {/* Jakarta Barat -> Jogja */}
              <path
                d="M 28.5,77.0 Q 31.2,78.5 34.0,80.5"
                fill="none"
                stroke="#186BF6"
                strokeWidth="0.5"
                strokeOpacity="0.75"
                className="animate-connection-line"
              />
              {/* Jogja -> Solo */}
              <path
                d="M 34.0,80.5 Q 35.4,79.5 36.8,78.5"
                fill="none"
                stroke="#186BF6"
                strokeWidth="0.5"
                strokeOpacity="0.75"
                className="animate-connection-line"
              />
              {/* Solo -> Surabaya */}
              <path
                d="M 36.8,78.5 Q 39.0,77.5 41.2,78.0"
                fill="none"
                stroke="#186BF6"
                strokeWidth="0.5"
                strokeOpacity="0.75"
                className="animate-connection-line"
              />
              {/* Surabaya -> Malang */}
              <path
                d="M 41.2,78.0 Q 41.5,80.5 40.5,82.5"
                fill="none"
                stroke="#186BF6"
                strokeWidth="0.5"
                strokeOpacity="0.75"
                className="animate-connection-line"
              />
            </g>
          )}
          {prefersReducedMotion && (
            <g className="opacity-60">
              <path d="M 28.5,77.0 Q 31.2,78.5 34.0,80.5" fill="none" stroke="#186BF6" strokeWidth="0.4" />
              <path d="M 34.0,80.5 Q 35.4,79.5 36.8,78.5" fill="none" stroke="#186BF6" strokeWidth="0.4" />
              <path d="M 36.8,78.5 Q 39.0,77.5 41.2,78.0" fill="none" stroke="#186BF6" strokeWidth="0.4" />
              <path d="M 41.2,78.0 Q 41.5,80.5 40.5,82.5" fill="none" stroke="#186BF6" strokeWidth="0.4" />
            </g>
          )}
        </svg>

        {/* Region Labels on Map for Geographical Clarity */}
        <div className="absolute inset-0 pointer-events-none select-none z-10 text-[9px] font-black uppercase tracking-wider text-slate-500/80 dark:text-slate-400">
          <span className="absolute left-[13%] top-[34%] -rotate-30">Sumatra</span>
          <span className="absolute left-[36%] top-[38%]">Kalimantan</span>
          <span className="absolute left-[52%] top-[40%]">Sulawesi</span>
          <span className="absolute left-[32%] top-[86%]">Jawa</span>
          <span className="absolute left-[84%] top-[50%]">Papua</span>
        </div>

        {/* Future Region Hover/Click Zones */}
        {futureRegions.map((reg) => {
          const isHovered = hoveredRegion === reg.key;
          const isSelected = selectedKey === reg.key;
          
          let style: React.CSSProperties = {};
          if (reg.key === 'sumatera') style = { left: '3%', top: '16%', width: '23%', height: '40%', transform: 'rotate(-30deg)' };
          else if (reg.key === 'kalimantan') style = { left: '29%', top: '25%', width: '16%', height: '30%' };
          else if (reg.key === 'sulawesi') style = { left: '48%', top: '28%', width: '12%', height: '30%' };
          else if (reg.key === 'papua') style = { left: '76%', top: '35%', width: '22%', height: '35%' };
          else if (reg.key === 'other') style = { left: '55%', top: '55%', width: '20%', height: '26%' };

          return (
            <button
              key={reg.key}
              onClick={() => handleRegionClick(reg.key)}
              onMouseEnter={() => handleRegionMouseEnter(reg.key)}
              onMouseLeave={handleMouseLeave}
              className={`absolute rounded-3xl border transition-all duration-200 flex flex-col items-center justify-center cursor-pointer group z-10 ${
                isHovered || isSelected
                  ? 'bg-[#186BF6]/15 border-[#186BF6]/60 shadow-lg'
                  : 'bg-transparent border-transparent'
              }`}
              style={style}
              aria-label={reg.label}
            />
          );
        })}

        {/* Jawa Region Interactive Zone */}
        <button
          onClick={() => handleRegionClick('jawa')}
          onMouseEnter={() => handleRegionMouseEnter('jawa')}
          onMouseLeave={handleMouseLeave}
          className={`absolute rounded-full border transition-all duration-200 flex items-center justify-center cursor-pointer group z-10 ${
            hoveredRegion === 'jawa' || selectedKey === 'jawa'
              ? 'bg-[#186BF6]/15 border-[#186BF6]/60 shadow-lg'
              : 'bg-transparent border-transparent'
          }`}
          style={{ left: '25%', top: '74%', width: '20%', height: '11%' }}
          aria-label="Jawa"
        />

        {/* Active branch markers: high-contrast, distinct circles with clear labels */}
        {activeLocations.map((loc) => {
          const isSelected = selectedKey === loc.key;
          const isHovered = hoveredItem?.key === loc.key;
          return (
            <button
              key={loc.key}
              onMouseEnter={() => handleMarkerMouseEnter(loc)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMarkerClick(loc)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20 group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              aria-label={loc.label}
            >
              {/* Glowing Outer Ring */}
              {!prefersReducedMotion && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-[#186BF6] animate-gentle-pulse pointer-events-none" />
              )}
              
              {/* Distinct High-Contrast Solid Marker Pin */}
              <div className={`relative flex items-center justify-center w-6 h-6 rounded-full border-[2.5px] border-white shadow-lg transition-all ${
                isSelected || isHovered
                  ? 'bg-[#186BF6] scale-125 ring-2 ring-[#186BF6]/50'
                  : 'bg-[#186BF6] hover:scale-115'
              }`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Geographic Label Pill */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-0.5 rounded-md text-[9.5px] font-black whitespace-nowrap shadow-sm border transition-all pointer-events-none ${
                isSelected || isHovered
                  ? 'bg-[#186BF6] text-white border-[#186BF6]'
                  : 'bg-white/95 dark:bg-slate-900/95 text-[#0B2454] dark:text-slate-100 border-slate-200/80 dark:border-slate-700'
              }`}>
                {loc.label}
              </div>
            </button>
          );
        })}

        {/* Dynamic Tooltip */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 pointer-events-none bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800 rounded-xl shadow-xl p-2.5 flex flex-col items-start min-w-[130px]"
              style={{
                left: `${hoveredItem.x}%`,
                top: `${hoveredItem.y}%`,
                transform: 'translate(-50%, -140%)',
              }}
            >
              <span className="text-[11px] font-black text-[#0B2454] dark:text-white leading-tight block">
                {hoveredItem.name}
              </span>
              <span className="text-[9px] font-extrabold text-[#186BF6] mt-1 flex items-center space-x-1 uppercase tracking-wider leading-none">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${hoveredItem.type === 'active' ? 'bg-[#186BF6]' : 'bg-[#9FC2F7]'}`} />
                <span>
                  {hoveredItem.type === 'active'
                    ? (t('partnership.legend.current') || 'SPI Saat Ini')
                    : (t('partnership.legend.open') || 'Terbuka Kemitraan')}
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Map Controls: Zoom in, Zoom out, Reset */}
      <div className="absolute right-3 top-3 z-40 flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-1 shadow-md" aria-label="Map controls">
        <button
          type="button"
          onClick={() => updateZoom(zoom - 0.25)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-[#186BF6] transition-colors cursor-pointer"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => updateZoom(zoom + 0.25)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-[#186BF6] transition-colors cursor-pointer"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => updateZoom(1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-[#186BF6] transition-colors cursor-pointer"
          aria-label="Reset zoom"
          title="Reset zoom"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
