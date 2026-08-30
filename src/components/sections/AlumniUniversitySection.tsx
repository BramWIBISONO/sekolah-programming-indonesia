import React from 'react';
import { UNIVERSITIES_DATA } from '../../data/universityData';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';

export const AlumniUniversitySection: React.FC = () => {
  const { t } = useLanguage();

  const getLogoPath = (assetKey: string): string => {
    const unis = ASSETS.universities as Record<string, string>;
    return unis[assetKey] || '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100/50 text-[#176DF8] flex items-center justify-center mx-auto border border-blue-200/50">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1220] tracking-tight">{t('alumni.title')}</h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">{t('alumni.desc')}</p>
        </div>

        {/* Mobile: Scrolling Marquee */}
        <div className="md:hidden relative flex overflow-x-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex space-x-8 shrink-0 whitespace-nowrap py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...UNIVERSITIES_DATA, ...UNIVERSITIES_DATA].map((uni, idx) => (
              <a
                href={uni.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Official website of ${uni.name}`}
                title={uni.name}
                key={`${uni.shortName}-${idx}`}
                className="w-28 h-20 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-center p-4 shrink-0 grayscale hover:grayscale-0 hover:scale-[1.04] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ImageWithFallback
                  src={getLogoPath(uni.logoAssetKey)}
                  alt={getLogoPath(uni.logoAssetKey)}
                  data-asset-path={getLogoPath(uni.logoAssetKey)}
                  fallbackLabel={uni.shortName}
                  className="max-w-full max-h-full object-contain"
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Desktop: Spaced Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8"
        >
          {UNIVERSITIES_DATA.map((uni) => (
            <motion.a
              variants={itemVariants}
              href={uni.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Official website of ${uni.name}`}
              title={uni.name}
              key={uni.shortName}
              className="group bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 h-32 flex items-center justify-center p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="w-full h-full relative flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[1.04]">
                <ImageWithFallback
                  src={getLogoPath(uni.logoAssetKey)}
                  alt={getLogoPath(uni.logoAssetKey)}
                  data-asset-path={getLogoPath(uni.logoAssetKey)}
                  fallbackLabel={uni.shortName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">{t('alumni.more')}</p>
      </div>
    </section>
  );
};
