import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Building } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { motion, AnimatePresence } from 'motion/react';

const LOCATIONS = [
  {
    id: "spi-jakarta",
    name: "Sekolah Programming Indonesia Jakarta",
    address: "Jl. Taman Surya 5 No.1 Ruko, RT.7/RW.3, Pegadungan, Kalideres, West Jakarta City, Jakarta 11830",
    google_maps_share_url: "https://share.google/nGwuibwTlz85FeLai"
  },
  {
    id: "spi-surabaya",
    name: "Sekolah Programming Indonesia Surabaya",
    address: "Lagoon Avenue Mall Sungkono, Jl. KH Abdul Wahab Siamin Surabaya No.Kav 9, RW.10, Putat Gede, Kec. Dukuhpakis, Surabaya, Jawa Timur 60225",
    google_maps_share_url: "https://share.google/TsONq79NF1OgjgywI"
  },
  {
    id: "spi-malang",
    name: "SPI Malang",
    address: "Jl. Galunggung No.78b, Gading Kasri, Kec. Klojen, Kota Malang, Jawa Timur 65115",
    google_maps_share_url: "https://share.google/rrjWnjPe4w61zuZhK"
  },
  {
    id: "spi-solo",
    name: "SPI Solo",
    address: "Jl. Veteran No.2, Ps. Kliwon, Kec. Ps. Kliwon, Kota Surakarta, Jawa Tengah 57116",
    google_maps_share_url: "https://share.google/GhMWUa06NzVFct57M"
  },
  {
    id: "spi-jogja",
    name: "SPI Jogja",
    address: "Jl. Tata Bumi No.1A, Area Sawah, Banyuraden, Kec. Gamping, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55293",
    google_maps_share_url: "https://share.google/7rADnQ0lZO3VYdzZk"
  }
];

export const FindSPINearYouSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(LOCATIONS[0].id);

  const selectedLoc = LOCATIONS.find(loc => loc.id === selectedId) || LOCATIONS[0];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100/50 text-[#176DF8] flex items-center justify-center mx-auto border border-blue-200/50 mb-4">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">Find SPI Near You</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base font-medium">Temukan lokasi belajar coding SPI terdekat di kota Anda.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left: Location Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedId === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border cursor-pointer flex gap-4 items-start ${
                    isSelected 
                      ? 'bg-white border-[#176DF8] shadow-md ring-1 ring-[#176DF8]/10' 
                      : 'bg-white/50 border-slate-200 hover:bg-white hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`mt-1 shrink-0 ${isSelected ? 'text-[#176DF8]' : 'text-slate-400'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-base ${isSelected ? 'text-[#176DF8]' : 'text-slate-800'}`}>
                      {loc.name}
                    </h3>
                    <p className={`text-sm mt-1 line-clamp-2 ${isSelected ? 'text-slate-600' : 'text-slate-500'}`}>
                      {loc.address}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Detail */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#176DF8] mb-2">
                  <MapPin className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B1220]">
                  {selectedLoc.name}
                </h3>
                
                <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                  {selectedLoc.address}
                </p>

                <div className="pt-6 border-t border-slate-100">
                  <a
                    href={selectedLoc.google_maps_share_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#176DF8] text-white font-bold rounded-xl shadow-lg hover:bg-[#1059D4] hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                  >
                    <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Buka di Google Maps</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
