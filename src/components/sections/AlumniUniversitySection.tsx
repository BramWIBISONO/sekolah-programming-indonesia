import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { asset } from '../../constants/assets';

const ALUMNI_UNIVERSITIES = [
  { name: 'University of Malaya', url: 'https://www.um.edu.my/', asset: asset('assets/alumni/universities/university-of-malaya.png') },
  { name: 'National University of Taiwan', url: 'https://www.ntu.edu.tw/', asset: asset('assets/alumni/universities/national-university-of-taiwan.png') },
  { name: 'Wuhan University', url: 'https://en.whu.edu.cn/', asset: asset('assets/alumni/universities/wuhan-university.png') },
  { name: 'The Hong Kong Polytechnic University', url: 'https://www.polyu.edu.hk/', asset: asset('assets/alumni/universities/hong-kong-polytechnic.png') },
  { name: 'BINUS University', url: 'https://binus.ac.id/', asset: asset('assets/alumni/universities/binus-university.png') },
  { name: 'Universitas Bunda Mulia', url: 'https://www.ubm.ac.id/', asset: asset('assets/alumni/universities/universitas-bunda-mulia.png') },
  { name: 'Zhejiang University', url: 'https://www.zju.edu.cn/english/', asset: asset('assets/alumni/universities/zhejiang-university.png') },
  { name: 'Zhejiang University of Science and Technology', url: 'https://www.zust.edu.cn/', asset: asset('assets/alumni/universities/zust.png') },
  { name: 'Singapore University of Technology and Design', url: 'https://www.sutd.edu.sg/', asset: asset('assets/alumni/universities/sutd.png') },
  { name: 'RMIT University', url: 'https://www.rmit.edu.au/', asset: asset('assets/alumni/universities/rmit.png') },
  { name: 'Sampoerna Academy', url: 'https://www.sampoernaacademy.sch.id/', asset: asset('assets/alumni/universities/sampoerna-academy.webp') }
];

export const AlumniUniversitySection: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      y: -4,
      transition: { duration: 0.25 }
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100/50 text-[#176DF8] flex items-center justify-center mx-auto border border-blue-200/50">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1220] tracking-tight">{t('alumni.title')}</h2>
          <p className="text-slate-500 text-sm sm:text-base font-medium">{t('alumni.desc')}</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px]"
        >
          {ALUMNI_UNIVERSITIES.map((uni, idx) => (
            <motion.a
              variants={itemVariants}
              whileHover="hover"
              href={uni.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Official website of ${uni.name}`}
              title={uni.name}
              key={idx}
              className="bg-[#FFFFFF] rounded-[20px] border border-[#DCE7F5] shadow-sm hover:shadow-[0_12px_30px_rgba(24,107,246,0.12)] hover:border-[#186BF6] transition-all duration-250 h-[110px] md:h-[120px] flex items-center justify-center py-[20px] px-[24px] overflow-visible cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={uni.asset}
                alt={uni.name}
                className="w-full h-full max-w-full max-h-full object-contain object-center"
              />
            </motion.a>
          ))}
        </motion.div>

        <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest pt-4">{t('alumni.more')}</p>
      </div>
    </section>
  );
};
