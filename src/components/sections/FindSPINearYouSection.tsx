import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Building } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { motion, AnimatePresence } from 'motion/react';
import { SPI_LOCATIONS, locationName, mapsSearchUrl } from '../../data/locations';

const LOCATIONS = SPI_LOCATIONS.map((loc) => ({
  id: loc.id,
  name: locationName(loc),
  address: loc.address,
  mapsHref: mapsSearchUrl(loc),
}));

export const FindSPINearYouSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>(LOCATIONS[0].id);

  const selectedLoc = LOCATIONS.find(loc => loc.id === selectedId) || LOCATIONS[0];

  return (
    <section id="find-spi-section" className="py-12 sm:py-24 bg-slate-50 border-y border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100/50 text-[#1870FF] flex items-center justify-center mx-auto border border-blue-200/50 mb-4">
            <Building className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('find.heading')}</h2>
          <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base font-medium">{t('find.desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left: Location Selector */}
          {/* Phones/tablets: an accordion (address + Maps inside the chosen city). Desktop: list + detail panel. */}
          <ul className="lg:col-span-5 flex flex-col gap-3 lg:max-h-[540px] lg:overflow-y-auto lg:pr-2 custom-scrollbar">
            {LOCATIONS.map((loc) => {
              const isSelected = selectedId === loc.id;
              return (
                <li
                  key={loc.id}
                  className={`rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white border-[#1870FF] shadow-md ring-1 ring-[#1870FF]/10'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-blue-200 hover:shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(loc.id)}
                    aria-expanded={isSelected}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl cursor-pointer flex gap-3 sm:gap-4 items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    <span className={`mt-0.5 shrink-0 ${isSelected ? 'text-[#1870FF]' : 'text-slate-400'}`}>
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-bold text-[15px] sm:text-base leading-snug ${isSelected ? 'text-[#1870FF]' : 'text-[#041A5A]'}`}>
                        {loc.name}
                      </span>
                      <span className={`text-sm mt-1 ${isSelected ? 'block text-slate-600' : 'text-slate-500 line-clamp-1'}`}>
                        {loc.address}
                      </span>
                    </span>
                  </button>
                  {isSelected && (
                    <div className="lg:hidden px-4 sm:px-5 pb-4 pl-12 sm:pl-14 -mt-1">
                      <a
                        href={loc.mapsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 h-10 px-4 bg-[#1870FF] text-white text-sm font-bold rounded-xl hover:bg-[#1059D4] transition-colors"
                      >
                        <Navigation className="w-4 h-4" aria-hidden="true" />
                        <span>{t('find.open_maps')}</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right: Selected Detail */}
          <div className="hidden lg:flex lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-xl relative overflow-hidden lg:min-h-[400px] flex-col justify-center">
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
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1870FF] mb-2">
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
                    href={selectedLoc.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1870FF] text-white font-bold rounded-xl shadow-lg hover:bg-[#1059D4] hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                  >
                    <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>{t('find.open_maps')}</span>
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
