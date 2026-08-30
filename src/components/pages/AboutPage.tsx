import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ArrowLeft, ArrowRight, ShieldCheck, Target, Heart, Brain, Rocket, Cpu, Layers, Lightbulb, Code2, BookOpen, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

interface AboutPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();

  const ecosystemProducts = [
    {
      name: 'SPI Core',
      positioning: 'Foundation of Everything',
      headline: 'Building Future Thinkers for the AI Era',
      desc: 'Program utama SPI yang membangun fondasi Computational Thinking, programming, dan Innovation Engineering sejak dini.',
      icon: Brain,
      color: 'bg-blue-600',
    },
    {
      name: 'SPI Lab',
      positioning: 'Technology for Everyday Life',
      headline: 'Digital Skills for Everyday Life',
      desc: 'Membantu peserta memanfaatkan teknologi dan AI dalam kehidupan sehari-hari — bekerja lebih produktif, belajar lebih efektif, berkarya lebih kreatif.',
      icon: Lightbulb,
      color: 'bg-emerald-600',
    },
    {
      name: 'SPI Engineering',
      positioning: 'Professional Technology Pathway',
      headline: 'Build. Innovate. Create Impact.',
      desc: 'Jalur spesialisasi profesional — Software Engineering, AI Engineering, Data Science, IoT, Cloud & DevOps, dan Cyber Security.',
      icon: Cpu,
      color: 'bg-indigo-600',
    },
    {
      name: 'SPI InSchool',
      positioning: 'Technology Education for Schools',
      headline: 'Membawa Filosofi SPI ke Sekolah',
      desc: 'Model implementasi Computational Thinking, AI literacy, dan programming yang disesuaikan dengan kebutuhan institusi pendidikan.',
      icon: BookOpen,
      color: 'bg-cyan-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#176DF8] selection:text-white">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#176DF8] via-[#1059D4] to-[#0B3C95] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t('nav.about')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Membangun Generasi AI-Native Indonesia
            </h1>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl">
              Sekolah Programming Indonesia (SPI) didirikan dengan visi melatih computational thinking, kreativitas rekayasa, dan kemandirian teknologi bagi generasi muda Indonesia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        
        {/* ── Foundation Pillars ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Visi Kami',
              description: 'Menjadi pusat edukasi teknologi dan computational thinking terdepan di Indonesia yang melahirkan inovator muda bertaraf global.',
              asset: ASSETS.about.vision,
              icon: Target
            },
            {
              title: 'Misi Pendidikan',
              description: 'Memberikan pengalaman belajar coding yang menyenangkan, kontekstual, dan relevan dengan industri AI masa kini.',
              asset: ASSETS.about.mission,
              icon: Heart
            },
            {
              title: 'Standar Kualitas',
              description: 'Kurikulum terstruktur, mentor praktisi profesional, serta pendekatan Project-Based Learning dengan hasil karya nyata.',
              asset: ASSETS.about.quality,
              icon: ShieldCheck
            }
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 sm:p-8 rounded-[22px] border border-blue-100/80 shadow-sm hover:shadow-md transition-shadow space-y-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-50/50 flex items-center justify-center shrink-0 border border-blue-50">
                <ImageWithFallback
                  src={card.asset}
                  alt={card.asset}
                  fallbackLabel={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-800">{card.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Why SPI Exists ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
              Why SPI Exists
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight leading-tight">
              Masa Depan yang Kami Percaya
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Di era dimana AI mengubah cara dunia bekerja, kemampuan berpikir komputasional menjadi fondasi yang sama pentingnya dengan kemampuan membaca dan menulis.
              </p>
              <p>
                SPI hadir bukan sekadar untuk mengajarkan syntax coding — tetapi untuk membangun generasi yang mampu berpikir sistematis, membangun solusi nyata, dan menciptakan inovasi yang berdampak.
              </p>
              <p>
                Melalui pendekatan <strong className="text-slate-800">Computational Thinking → Programming → Innovation Engineering</strong>, SPI membekali setiap siswa dengan kemampuan yang relevan untuk dunia yang berubah cepat.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <ImageWithFallback
                src={ASSETS.about.philosophy}
                alt={ASSETS.about.philosophy}
                fallbackLabel="About SPI"
                className="w-full aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        {/* ── Educational Philosophy: Think → Build → Innovate ── */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
            Our Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight">
            Think → Build → Innovate
          </h2>
          <p className="text-base text-slate-500 leading-relaxed">
            Pembelajaran SPI dimulai dari kemampuan berpikir, dilanjutkan kemampuan membangun solusi, hingga menghasilkan inovasi nyata yang berdampak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              step: '01',
              title: 'Think',
              subtitle: 'Computational Thinking',
              desc: 'Membangun pola pikir logis, sistematis, dan terstruktur — fondasi utama seluruh pembelajaran SPI.',
              icon: Brain,
            },
            {
              step: '02',
              title: 'Build',
              subtitle: 'Programming & Engineering',
              desc: 'Menerjemahkan pemikiran menjadi kode, aplikasi, dan sistem teknologi yang berfungsi nyata.',
              icon: Code2,
            },
            {
              step: '03',
              title: 'Innovate',
              subtitle: 'Innovation Engineering',
              desc: 'Mewujudkan ide menjadi inovasi yang bermanfaat — produk, solusi, dan dampak bagi lingkungan sekitar.',
              icon: Rocket,
            },
          ].map((phase) => {
            const Icon = phase.icon;
            return (
              <div key={phase.step} className="text-center space-y-4 p-6 sm:p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#176DF8]/10 text-[#176DF8] flex items-center justify-center mx-auto">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#176DF8] font-mono">{phase.step}</span>
                  <h3 className="text-2xl font-black text-slate-800">{phase.title}</h3>
                  <p className="text-sm font-semibold text-slate-500">{phase.subtitle}</p>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {phase.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Product Ecosystem ──────────────────────────────── */}
        <div className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs sm:text-sm font-bold text-[#176DF8] uppercase tracking-widest">
              SPI Product Ecosystem
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1220] tracking-tight leading-tight">
              Mengapa SPI Memiliki Banyak Produk?
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Setiap produk SPI menjawab kebutuhan belajar yang berbeda. Bersama, mereka membentuk ekosistem pendidikan teknologi yang lengkap — dari fondasi hingga profesional, dari individu hingga institusi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {ecosystemProducts.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.name} className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#176DF8]/30 transition-all duration-300 space-y-4 group">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-2xl ${product.color} text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-800">{product.name}</h3>
                      <p className="text-xs font-semibold text-[#176DF8] uppercase tracking-wider">{product.positioning}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-slate-700 leading-snug">
                    {product.headline}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Expected Impact ────────────────────────────────── */}
        <div className="bg-white rounded-[24px] border border-blue-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
              <div className="w-12 h-12 bg-blue-50 text-[#176DF8] rounded-xl flex items-center justify-center border border-blue-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 leading-tight">
                  Dampak yang Kami Harapkan
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Generasi yang tidak hanya menggunakan teknologi, tetapi mampu memahami, membangun, dan mengarahkan teknologi untuk kebaikan — generasi AI-Native yang berpikir kritis, membangun solusi nyata, dan menciptakan inovasi berdampak.
                </p>
              </div>
            </div>
            
            <div className="relative h-64 sm:h-80 md:h-auto overflow-hidden bg-slate-50">
              <ImageWithFallback
                src={ASSETS.about.impactVisual}
                alt={ASSETS.about.impactVisual}
                fallbackLabel="Impact Visual"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
              />
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────── */}
        <div className="bg-[#F4F8FF] p-8 rounded-3xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Mulai Perjalanan Teknologi Anak Anda</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-lg">
              Konsultasikan minat dan ikuti Free Trial Class 60 Menit bersama tim SPI.
            </p>
          </div>
          <button
            onClick={onOpenTrial}
            className="px-7 py-3 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer shrink-0"
          >
            <span>Daftar Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
