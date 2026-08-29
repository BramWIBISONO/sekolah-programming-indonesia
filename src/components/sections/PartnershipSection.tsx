import React from 'react';
import { Handshake, ArrowRight, Building2, School, Users, Globe } from 'lucide-react';

interface PartnershipSectionProps {
  onNavigate?: (path: string) => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onNavigate }) => {
  const partnerTypes = [
    {
      icon: School,
      title: 'Sekolah & Institusi Pendidikan',
      desc: 'Implementasi kurikulum SPI, Teacher Training, dan program ekskul teknologi.',
    },
    {
      icon: Building2,
      title: 'Bisnis & Korporasi',
      desc: 'CSR pendidikan teknologi, sponsorship, dan kolaborasi program pelatihan.',
    },
    {
      icon: Users,
      title: 'Organisasi & Komunitas',
      desc: 'Workshop, bootcamp, dan program edukasi teknologi untuk komunitas.',
    },
    {
      icon: Globe,
      title: 'Mitra Strategis',
      desc: 'Kolaborasi jangka panjang untuk pengembangan ekosistem pendidikan teknologi.',
    },
  ];

  const handlePartnershipClick = () => {
    if (onNavigate) {
      onNavigate('/partnership');
    }
  };

  return (
    <section id="partnership-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Editorial Copy */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-[#176DF8]/10 text-[#176DF8] flex items-center justify-center">
                <Handshake className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
              Partner With SPI
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B1220] tracking-tight leading-[1.1]">
              Bangun Masa Depan Bersama SPI
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
              Bagi bisnis, sekolah, organisasi, dan institusi yang ingin bekerja sama dengan SPI — mari membangun ekosistem pendidikan teknologi bersama.
            </p>

            <div className="pt-3">
              <button
                onClick={handlePartnershipClick}
                className="px-7 py-3.5 bg-[#176DF8] hover:bg-[#1059D4] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center space-x-2 cursor-pointer"
              >
                <span>Partnership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right — Partner Type Cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {partnerTypes.map((pt) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={pt.title}
                    className="bg-[#F4F8FF] rounded-2xl p-5 sm:p-6 border border-blue-100/80 hover:border-[#176DF8]/30 transition-colors space-y-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-[#176DF8] flex items-center justify-center shadow-sm group-hover:bg-[#176DF8] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">{pt.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{pt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
