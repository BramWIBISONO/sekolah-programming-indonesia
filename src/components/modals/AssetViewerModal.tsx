import React, { useState } from 'react';
import { X, FolderOpen, ExternalLink, Image, Search, Check, Copy } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface AssetViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssetViewerModal: React.FC<AssetViewerModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  // Flatten assets array for easy browsing
  const assetList = [
    { key: 'LOGO', name: 'Official SPI 2025 Logo', path: ASSETS.LOGO, category: 'Brand' },
    { key: 'MASCOT', name: 'SPI Robot Panda Mascot', path: ASSETS.MASCOT, category: 'Brand' },
    { key: 'PARTNER_EKASA', name: 'EKASA Technology Partner Logo', path: ASSETS.PARTNER_EKASA, category: 'Partner' },
    
    { key: 'HERO_MAIN', name: 'Hero Homepage Visual', path: ASSETS.HERO_MAIN, category: 'Hero' },
    { key: 'HERO_CORE', name: 'SPI Core Hero Banner', path: ASSETS.HERO_CORE, category: 'Hero' },
    { key: 'HERO_LAB', name: 'SPI Lab Hero Banner', path: ASSETS.HERO_LAB, category: 'Hero' },
    { key: 'HERO_ENGINEERING', name: 'SPI Engineering Hero Banner', path: ASSETS.HERO_ENGINEERING, category: 'Hero' },
    { key: 'HERO_INSCHOOL', name: 'SPI InSchool Hero Banner', path: ASSETS.HERO_INSCHOOL, category: 'Hero' },
    
    { key: 'CORE_CARD', name: 'SPI Core Program Card', path: ASSETS.CORE_CARD, category: 'Program' },
    { key: 'LAB_CARD', name: 'SPI Lab Program Card', path: ASSETS.LAB_CARD, category: 'Program' },
    { key: 'ENGINEERING_CARD', name: 'SPI Engineering Card', path: ASSETS.ENGINEERING_CARD, category: 'Program' },
    { key: 'INSCHOOL_CARD', name: 'SPI InSchool Card', path: ASSETS.INSCHOOL_CARD, category: 'Program' },
    
    { key: 'EXPERIENCE_LEARNING', name: 'One-Stop Edutech Center', path: ASSETS.EXPERIENCE_LEARNING, category: 'Experience' },

    { key: 'PARTNER_LIA', name: 'Lia Stephanie School', path: ASSETS.PARTNERS.LIA_STEPHANIE, category: 'Partner' },
    { key: 'PARTNER_IPEKA', name: 'IPEKA Christian School', path: ASSETS.PARTNERS.IPEKA, category: 'Partner' },
    { key: 'PARTNER_LITTLEKEY', name: 'Little Key School', path: ASSETS.PARTNERS.LITTLE_KEY, category: 'Partner' },
    { key: 'PARTNER_PELITA', name: 'Pelita Harapan School', path: ASSETS.PARTNERS.PELITA_HARAPAN, category: 'Partner' },
    { key: 'PARTNER_BINA', name: 'Bina Bangsa School', path: ASSETS.PARTNERS.BINA_BANGSA, category: 'Partner' },
    { key: 'PARTNER_SURABAYA', name: 'Surabaya Intercultural School', path: ASSETS.PARTNERS.SURABAYA_INTERCULTURAL, category: 'Partner' },

    { key: 'PROJ_TRASH', name: 'Smart Trash Bin Project', path: ASSETS.PROJECTS.SMART_TRASH_BIN, category: 'Student Project' },
    { key: 'PROJ_AI', name: 'AI Image Classifier Project', path: ASSETS.PROJECTS.AI_IMAGE_CLASSIFIER, category: 'Student Project' },
    { key: 'PROJ_FLOOD', name: 'Flood Monitoring System', path: ASSETS.PROJECTS.FLOOD_MONITORING, category: 'Student Project' },
    { key: 'PROJ_GOGAME', name: 'GoGame Adventure Project', path: ASSETS.PROJECTS.GOGAME_ADVENTURE, category: 'Student Project' },
    { key: 'PROJ_CHATBOT', name: 'Chatbot for School Project', path: ASSETS.PROJECTS.CHATBOT_SCHOOL, category: 'Student Project' },
    { key: 'PROJ_MAZE', name: 'Maze Escape Game Project', path: ASSETS.PROJECTS.MAZE_ESCAPE, category: 'Student Project' },
    { key: 'PROJ_PARKING', name: 'Smart Parking Lot Project', path: ASSETS.PROJECTS.SMART_PARKING, category: 'Student Project' },
    { key: 'PROJ_PIANO', name: 'Digital Piano App Project', path: ASSETS.PROJECTS.DIGITAL_PIANO, category: 'Student Project' },
    { key: 'PROJ_TRAFFIC', name: 'Smart Traffic Light Project', path: ASSETS.PROJECTS.SMART_TRAFFIC_LIGHT, category: 'Student Project' },
    { key: 'PROJ_PORTFOLIO', name: 'Creating Web Portfolio', path: ASSETS.PROJECTS.CREATING_PORTFOLIO, category: 'Student Project' },
    { key: 'PROJ_AUTO', name: 'Python Task Automation', path: ASSETS.PROJECTS.AUTOMATION_PROJECT, category: 'Student Project' },
  ];

  const filteredAssets = assetList.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyPath = (path: string, key: string) => {
    navigator.clipboard.writeText(path);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#031336]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#062B6F] text-white px-6 py-4 border-b border-[#0057D8]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <FolderOpen className="w-5 h-5 text-[#4ED7FF]" />
            <div>
              <h3 className="text-base font-bold text-white">
                Direktori Asset: <code className="text-xs bg-white/10 px-2 py-0.5 rounded text-[#4ED7FF]">/public/assets/</code>
              </h3>
              <p className="text-[11px] text-slate-300">
                Semua gambar tersentralisasi. Mengganti file di folder otomatis memperbarui seluruh halaman.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter */}
        <div className="p-4 border-b border-slate-200 bg-[#F7FAFF] flex items-center gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari asset berdasarkan nama, path, atau kategori..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded focus:border-[#0057D8] outline-none bg-white font-mono"
            />
          </div>
          <span className="text-xs font-mono text-slate-500 shrink-0">
            {filteredAssets.length} / {assetList.length} assets
          </span>
        </div>

        {/* Assets Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.key}
              className="p-3 rounded border border-slate-200 bg-white hover:border-[#0057D8] transition-all space-y-2 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] bg-[#031336] rounded overflow-hidden border border-slate-100 mb-2">
                  <ImageWithFallback
                    src={asset.path}
                    alt={asset.name}
                    className="w-full h-full object-contain p-2"
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#062B6F] text-[#4ED7FF] px-1.5 py-0.5 rounded text-[9px] font-mono font-bold">
                    {asset.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-[#062B6F] line-clamp-1">
                  {asset.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                  {asset.path}
                </p>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleCopyPath(asset.path, asset.key)}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-[#0057D8] hover:underline cursor-pointer"
                >
                  {copiedKey === asset.key ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin Path</span>
                    </>
                  )}
                </button>

                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700"
                  title="Buka asset"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer tip */}
        <div className="bg-[#F7FAFF] px-6 py-3 border-t border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between shrink-0">
          <span>Format yang didukung: PNG, SVG, JPG, WebP</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#062B6F] text-white rounded text-xs font-mono font-bold cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
