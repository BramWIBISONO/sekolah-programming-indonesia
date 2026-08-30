import React from 'react';
import { ASSETS } from '../../constants/assets';
import { Bot, Brain, Code2, Building2 } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const AINativeSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0B1220] to-[#1a2942] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black leading-tight">
            Mengapa AI Native Thinking Programming Untuk Generasi Muda?
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Point 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">AI Native Learning + Computational Thinking</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Kurikulum AI Native Learning yang digabung dengan Computational Thinking agar siswa tidak hanya menggunakan teknologi, tetapi memahami cara berpikir, memecahkan masalah, dan membangun solusi dengan teknologi.
                  </p>
                </div>
              </div>
            </div>

            {/* Point 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Ekosistem Teknologi Nyata</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Didukung oleh IT House Ekasa Technology & Digital Agency Icrea. Memberikan konteks pembelajaran yang selalu relevan dengan perkembangan industri digital masa kini.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                 <ImageWithFallback src={ASSETS.learning.aiProject} fallbackLabel="AI Native" alt={ASSETS.learning.aiProject} className="w-full h-full object-cover" />
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                 <Bot className="w-10 h-10 text-blue-400 mb-3" />
                 <span className="font-bold text-blue-300 text-sm">AI Assisted Learning</span>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                 <Code2 className="w-10 h-10 text-emerald-400 mb-3" />
                 <span className="font-bold text-emerald-300 text-sm">Real Tech Ecosystem</span>
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                 <ImageWithFallback src={ASSETS.learning.codingClass} fallbackLabel="Ecosystem" alt={ASSETS.learning.codingClass} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
