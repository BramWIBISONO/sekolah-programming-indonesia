import React from 'react';
import { ArrowLeft, ArrowRight, Handshake, School, Building2, Users, Globe, CheckCircle2, Phone, Mail } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

interface PartnershipPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const PartnershipPage: React.FC<PartnershipPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();

  const handleConsultationClick = () => {
    window.open(
      'https://wa.me/6281234567890?text=Halo%20SPI%2C%20kami%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20program%20Partnership%20SPI.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const partnerModels = [
    {
      icon: School,
      title: 'SPI InSchool — Kemitraan Sekolah',
      desc: 'Implementasi kurikulum SPI sebagai mata pelajaran, ekstrakurikuler, atau program after-school. Termasuk Teacher Training, modul, assessment, dan sertifikasi.',
      benefits: ['Kurikulum Terstruktur', 'Teacher Training', 'Assessment & Sertifikasi', 'Pendampingan Berkelanjutan'],
      image: ASSETS.partnership.schoolPartnership,
    },
    {
      icon: Building2,
      title: 'Corporate Partnership',
      desc: 'Program CSR pendidikan teknologi, sponsorship Innovation Festival, kolaborasi pelatihan karyawan, atau integrasi program edukasi untuk komunitas perusahaan.',
      benefits: ['CSR Pendidikan', 'Sponsorship Event', 'Employee Training', 'Community Program'],
      image: ASSETS.partnership.industryPartnership,
    },
    {
      icon: Users,
      title: 'Community & Organization',
      desc: 'Workshop dan bootcamp teknologi untuk komunitas, organisasi pemuda, atau lembaga non-profit yang ingin memperkenalkan coding dan AI literacy.',
      benefits: ['Workshop & Bootcamp', 'Custom Program', 'Mentor Access', 'Flexible Schedule'],
      image: ASSETS.partnership.communityPartnership,
    },
    {
      icon: Globe,
      title: 'Strategic Alliance',
      desc: 'Kolaborasi jangka panjang untuk bersama-sama mengembangkan ekosistem pendidikan teknologi — termasuk co-development program, joint research, dan ekspansi regional.',
      benefits: ['Co-Development', 'Joint Research', 'Regional Expansion', 'Ecosystem Growth'],
      image: ASSETS.partnership.strategicPartnership,
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-xl space-y-5">
              <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
                <Handshake className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('nav.partnership')} Program</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Bangun Masa Depan Bersama SPI
              </h1>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl">
                SPI terbuka untuk kemitraan dengan bisnis, sekolah, organisasi, dan institusi yang ingin bersama-sama membangun generasi AI-Native Indonesia.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleConsultationClick}
                  className="px-8 py-3.5 bg-white text-[#176DF8] hover:bg-blue-50 active:scale-[0.98] font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Konsultasi Partnership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="mailto:info@sekolahprogrammingindonesia.com"
                  className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-sm sm:text-base rounded-xl border border-white/60 transition-all flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Kami</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
              <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <ImageWithFallback
                  src={ASSETS.partnership.partnershipHero}
                  alt={ASSETS.partnership.partnershipHero}
                  fallbackLabel="Partnership Hero Visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Models */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">

        <div className="space-y-4 border-b border-slate-100 pb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Model Kerja Sama</h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl">
            SPI menyediakan berbagai model kolaborasi yang dapat disesuaikan dengan kebutuhan dan tujuan mitra.
          </p>
        </div>

        <div className="space-y-12">
          {partnerModels.map((model, index) => {
            const Icon = model.icon;
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={model.title}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group`}
              >
                {/* Visual */}
                <div className="w-full md:w-1/2 min-h-[250px] md:min-h-[auto] relative overflow-hidden bg-slate-50">
                  <ImageWithFallback
                    src={model.image}
                    alt={model.image}
                    fallbackLabel={model.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#176DF8] flex items-center justify-center shrink-0 border border-blue-100">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-slate-800">{model.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{model.desc}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {model.benefits.map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#176DF8]" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#F4F8FF] rounded-3xl border border-blue-100 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800">Siap Bermitra dengan SPI?</h3>
            <p className="text-sm text-slate-600 max-w-lg">
              Hubungi tim partnership kami untuk diskusi lebih lanjut mengenai model kolaborasi yang sesuai dengan kebutuhan Anda.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleConsultationClick}
              className="px-7 py-3.5 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Kami</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
