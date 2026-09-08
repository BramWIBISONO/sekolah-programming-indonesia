import React, { useState } from 'react';
import { Handshake, ArrowRight, Phone, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n';
import { IndonesiaMap } from '../common/IndonesiaMap';

interface PartnershipSectionProps {
  onNavigate?: (path: string) => void;
}

const locationDescriptions: Record<string, Record<string, string>> = {
  jakarta_barat: {
    id: "SPI Jakarta Barat merupakan cabang utama kami yang menyelenggarakan kelas coding offline di center kami dan kelas online interaktif.",
    en: "SPI West Jakarta is our main branch offering offline coding classes at our center and interactive online classes.",
    zh: "SPI 雅加达西区是我们的主要分校，提供中心线下编程课程 and 互动式在线课程。"
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

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onNavigate }) => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');

  const [selectedItem, setSelectedItem] = useState<{
    key: string;
    name: string;
    type: 'active' | 'future';
    description: string;
  } | null>(null);

  const activeLocations = [
    { key: 'jakarta_barat', nameKey: 'partnership.loc.jakarta_barat', label: 'Jakarta Barat' },
    { key: 'jogja', nameKey: 'partnership.loc.jogja', label: 'Yogyakarta' },
    { key: 'solo', nameKey: 'partnership.loc.solo', label: 'Solo' },
    { key: 'surabaya', nameKey: 'partnership.loc.surabaya', label: 'Surabaya' },
    { key: 'malang', nameKey: 'partnership.loc.malang', label: 'Malang' }
  ];

  const futureRegions = [
    { key: 'sumatera', nameKey: 'partnership.reg.sumatera', label: 'Sumatra' },
    { key: 'kalimantan', nameKey: 'partnership.reg.kalimantan', label: 'Kalimantan' },
    { key: 'sulawesi', nameKey: 'partnership.reg.sulawesi', label: 'Sulawesi' },
    { key: 'papua', nameKey: 'partnership.reg.papua', label: 'Papua' },
    { key: 'other', nameKey: 'partnership.reg.other', label: 'Lainnya' }
  ];

  const handleLocationClick = (loc: any) => {
    const name = t(loc.nameKey) || loc.label;
    const desc = locationDescriptions[loc.key]?.[lang] || locationDescriptions[loc.key]?.['id'] || '';
    setSelectedItem({
      key: loc.key,
      name,
      type: 'active',
      description: desc
    });
  };

  const handleRegionClick = (reg: any) => {
    const name = t(reg.nameKey) || reg.label;
    const desc = locationDescriptions[reg.key]?.[lang] || locationDescriptions[reg.key]?.['id'] || '';
    setSelectedItem({
      key: reg.key,
      name,
      type: 'future',
      description: desc
    });
  };

  const handleWhatsAppClick = () => {
    window.open(
      'https://wa.me/6281246906335?text=Halo%20SPI%2C%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20program%20dan%20Trial%20Gratis%20SPI.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleExploreClick = () => {
    if (onNavigate) {
      onNavigate('/partnership');
    }
  };

  return (
    <section id="partnership-section" className="py-16 sm:py-24 bg-[#F8FAFC] dark:bg-[#070D18] border-t border-b border-[#DCE7F5] dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Perfectly Aligned Content Grid */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* 1. Header Information */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 bg-[#EAF2FF] dark:bg-[#186BF6]/15 text-[#186BF6] px-3.5 py-1.5 rounded-full border border-blue-100 dark:border-blue-500/20 font-bold text-xs tracking-wider uppercase">
                <Handshake className="w-3.5 h-3.5" />
                <span>{t('partnership.eyebrow') || 'KEMITRAAN SPI'}</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2454] dark:text-white tracking-tight leading-tight">
                {t('partnership.headline') || 'Mau Jadi Mitra SPI?'}
              </h2>
              
              <p className="text-sm sm:text-base text-[#526A8F] dark:text-slate-400 leading-relaxed">
                {t('partnership.description') || 'SPI membuka peluang kemitraan bagi sekolah, learning center, organisasi, dan institusi yang ingin menghadirkan pendidikan teknologi berkualitas di daerahnya.'}
              </p>
            </div>

            {/* 2. Interactive Locations Panel */}
            <div className="bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
              
              {/* Segmented Controls */}
              <div className="grid grid-cols-2 p-1 bg-slate-100/80 dark:bg-slate-800 rounded-2xl gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('current')}
                  className={`py-2.5 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'current'
                      ? 'bg-white dark:bg-slate-900 text-[#186BF6] shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('partnership.legend.current') || 'SPI Saat Ini'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('future')}
                  className={`py-2.5 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeTab === 'future'
                      ? 'bg-white dark:bg-slate-900 text-[#186BF6] shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t('partnership.legend.open') || 'Terbuka untuk Kemitraan'}
                </button>
              </div>

              {/* Location / Region Pills */}
              <div className="flex flex-wrap gap-2">
                {activeTab === 'current'
                  ? activeLocations.map((loc) => {
                      const isSelected = selectedItem?.key === loc.key;
                      return (
                        <button
                          key={loc.key}
                          type="button"
                          onClick={() => handleLocationClick(loc)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center space-x-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#EAF2FF] dark:bg-blue-900/40 border-[#186BF6] text-[#186BF6] dark:text-blue-400 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-[#DCE7F5] dark:border-slate-800 text-[#526A8F] dark:text-slate-300 hover:text-[#0B2454] dark:hover:text-white hover:border-[#186BF6]/45'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#186BF6]" />
                          <span>{t(loc.nameKey) || loc.label}</span>
                        </button>
                      );
                    })
                  : futureRegions.map((reg) => {
                      const isSelected = selectedItem?.key === reg.key;
                      return (
                        <button
                          key={reg.key}
                          type="button"
                          onClick={() => handleRegionClick(reg)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center space-x-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#EAF2FF] dark:bg-blue-900/40 border-[#186BF6] text-[#186BF6] dark:text-blue-400 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-[#DCE7F5] dark:border-slate-800 text-[#526A8F] dark:text-slate-300 hover:text-[#0B2454] dark:hover:text-white hover:border-[#186BF6]/45'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-[#9FC2F7]" />
                          <span>{t(reg.nameKey) || reg.label}</span>
                        </button>
                      );
                    })}
              </div>

              {/* Selection Detail / Empty State Panel */}
              <AnimatePresence mode="wait">
                {selectedItem ? (
                  <motion.div
                    key={selectedItem.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="p-4 bg-[#F5F9FF] dark:bg-slate-800/60 border border-[#DCE7F5] dark:border-slate-700/80 rounded-2xl relative space-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      aria-label="Clear selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#186BF6] flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${selectedItem.type === 'active' ? 'bg-[#186BF6]' : 'bg-[#9FC2F7]'}`} />
                      <span>{selectedItem.type === 'active' ? (t('partnership.legend.current') || 'SPI Saat Ini') : (t('partnership.legend.open') || 'Terbuka Kemitraan')}</span>
                    </p>
                    <h4 className="text-base font-extrabold text-[#0B2454] dark:text-white">{selectedItem.name}</h4>
                    <p className="text-xs text-[#526A8F] dark:text-slate-300 leading-relaxed">{selectedItem.description}</p>
                  </motion.div>
                ) : (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-dashed border-[#DCE7F5] dark:border-slate-700 rounded-2xl text-center">
                    <p className="text-xs text-[#526A8F] dark:text-slate-400 font-medium py-2">
                      Pilih kota atau wilayah pada peta atau daftar untuk melihat detail.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. Lower CTA Card */}
            <div className="p-5 sm:p-6 bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-black text-[#0B2454] dark:text-white">
                  Mari Hadirkan Pendidikan Teknologi Bersama SPI
                </h4>
                <p className="text-xs text-[#526A8F] dark:text-slate-400 leading-relaxed">
                  {t('partnership.cta.desc') || 'Jika Anda berada di wilayah yang belum terjangkau SPI dan tertarik menjadi mitra, kami siap berdiskusi mengenai peluang kerja sama.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex-1 py-3 px-4 bg-[#186BF6] hover:bg-[#1059D4] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi Kami via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleExploreClick}
                  className="flex-1 py-3 px-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] text-[#186BF6] font-bold text-xs sm:text-sm rounded-xl border border-[#BFD5F5] dark:border-slate-700 hover:border-[#186BF6] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Pelajari Program Kemitraan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column - Map Card */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white dark:bg-slate-900 border border-[#DCE7F5] dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl shadow-blue-500/5 relative overflow-hidden flex flex-col items-stretch space-y-4">
              
              {/* Map Title / Legend Header */}
              <div className="flex flex-wrap justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
                <h3 className="text-xs font-black uppercase text-[#0B2454] dark:text-white tracking-wider flex items-center space-x-1.5">
                  <span className="w-1.5 h-3 bg-[#186BF6] rounded-full" />
                  <span>Peta Jaringan Kemitraan Indonesia</span>
                </h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#186BF6]" />
                    <span className="text-[11px] font-bold text-[#0B2454] dark:text-slate-300">SPI Saat Ini</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9FC2F7]" />
                    <span className="text-[11px] font-bold text-[#526A8F] dark:text-slate-400">Terbuka Kemitraan</span>
                  </div>
                </div>
              </div>

              {/* Shared High-Contrast Interactive Map Component */}
              <IndonesiaMap
                selectedKey={selectedItem?.key}
                onSelect={(item) => setSelectedItem(item)}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
