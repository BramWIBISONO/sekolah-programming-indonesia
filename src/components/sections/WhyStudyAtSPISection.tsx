import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const WhyStudyAtSPISection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">Mengapa Belajar di SPI?</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            {/* Point 1 */}
            <div className="flex gap-6">
              <div className="shrink-0 w-14 h-14 rounded-full bg-blue-50 text-[#176DF8] font-black text-xl flex items-center justify-center border border-blue-100">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Kurikulum AI Native Learning dengan Computational Thinking</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Gabungkan pembelajaran AI Native dengan Computational Thinking agar siswa membangun kemampuan berpikir, bukan hanya menggunakan tools.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex gap-6">
              <div className="shrink-0 w-14 h-14 rounded-full bg-blue-50 text-[#176DF8] font-black text-xl flex items-center justify-center border border-blue-100">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">IT House Ekasa Technology dan Digital Agency Icrea</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Gunakan ekosistem teknologi dan digital sebagai konteks pembelajaran agar pengalaman belajar tetap dekat dengan dunia teknologi nyata.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-slate-100 mt-8">
               <ImageWithFallback src={ASSETS.WHY_SPI.CURRICULUM} fallbackLabel="Curriculum" alt="SPI Curriculum" className="w-full h-full object-cover" />
             </div>
             <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-8">
               <ImageWithFallback src={ASSETS.WHY_SPI.TECHNOLOGY_ECOSYSTEM} fallbackLabel="Ecosystem" alt="IT Ecosystem" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
