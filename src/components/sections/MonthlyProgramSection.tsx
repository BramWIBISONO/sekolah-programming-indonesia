import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../constants/assets';
import { Calendar, CheckCircle2, Users, Award, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface MonthlyProgramSectionProps {
  onOpenTrial?: () => void;
}

export const MonthlyProgramSection: React.FC<MonthlyProgramSectionProps> = ({ onOpenTrial }) => {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/programs?status=published')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProgram(data[0]); // Use the most recently created active program
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className="py-16 sm:py-24 bg-[#F4F8FF] min-h-[400px] flex items-center justify-center"></section>;
  }

  if (!program) {
    return (
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <p className="text-sm font-bold text-[#176DF8] uppercase tracking-widest">
            PROGRAM KHUSUS BULAN INI
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight">
            Program Spesial Bulan Ini Akan Segera Hadir
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto">
            Nantikan program eksklusif dari SPI yang hanya tersedia untuk periode waktu terbatas.
          </p>
        </div>
      </section>
    );
  }

  let parsedBenefits: string[] = [];
  try {
    parsedBenefits = JSON.parse(program.benefits || '[]');
  } catch (e) {
    parsedBenefits = (program.benefits || '').split('\n').filter(Boolean);
  }

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const displayMonth = program.month && program.month >= 1 && program.month <= 12 ? monthNames[program.month - 1] : "";

  return (
    <section className="py-16 sm:py-24 bg-[#F4F8FF] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#176DF8]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-[#1059D4]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-blue-100 text-xs font-bold text-[#176DF8] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#176DF8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#176DF8]"></span>
            </span>
            <span>PROGRAM KHUSUS BULAN INI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
            Program Pilihan Bulan Ini
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Program belajar pilihan SPI yang tersedia untuk periode bulan {displayMonth} {program.year}.
          </p>
        </div>

        {/* Featured Program Card */}
        <div className="bg-white rounded-[28px] shadow-xl shadow-[#176DF8]/5 border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-[#176DF8]/10 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Visual Side */}
            <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden bg-slate-50">
              <ImageWithFallback
                src={program.visual_image || ASSETS.programs.spiCore}
                alt={program.visual_image || ASSETS.programs.spiCore}
                fallbackLabel="Monthly Program Visual"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {program.badge && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="inline-flex items-center space-x-1.5 bg-[#0B1220]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{program.badge}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Content Side */}
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight">
                  {program.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {program.description}
                </p>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {parsedBenefits.map((highlight: string, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#176DF8] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-700">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Info Pill Section */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-wrap gap-4">
                {program.start_date && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600">{program.start_date}</span>
                  </div>
                )}
                {program.start_date && program.remaining_seats != null && (
                  <div className="w-px h-4 bg-slate-200 hidden sm:block"></div>
                )}
                {program.remaining_seats != null && (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-600">{program.remaining_seats} Sisa Kuota</span>
                  </div>
                )}
              </div>

              {/* CTA Action */}
              <div className="pt-2">
                <a
                  href={program.registration_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#176DF8] hover:bg-[#1059D4] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-xl hover:shadow-[#176DF8]/20 cursor-pointer w-full sm:w-auto"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
