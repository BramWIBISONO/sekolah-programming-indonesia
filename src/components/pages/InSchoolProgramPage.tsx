import React, { useState } from 'react';
import { ASSETS, asset } from '../../constants/assets';
import { HomepagePartnerLogosSection } from '../sections/HomepagePartnerLogosSection';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BookOpen,
  GraduationCap,
  Rocket,
  LineChart,
  Handshake,
  Bot,
  Layers,
  Cpu,
  Sparkles,
  School,
  ChevronRight,
  ChevronLeft,
  Check,
  Award,
  Users,
  Presentation,
  Laptop,
  BookCheck,
  Building2,
  FileCheck2,
  Quote,
  Flame
} from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { GALLERY_PHOTOS } from '../../data/gallery';

/** Gallery photos are backgrounds here too, so they cannot be dragged or saved from the right-click menu. */
const blockMenu = (e: React.SyntheticEvent) => e.preventDefault();
const PHOTO_PROTECT: React.CSSProperties = { WebkitTouchCallout: 'none', userSelect: 'none', WebkitUserSelect: 'none' };

interface InSchoolProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const InSchoolProgramPage: React.FC<InSchoolProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const handleConsultationClick = () => {
    window.open(
      'https://wa.me/6281246906335?text=Halo%20SPI%2C%20saya%20ingin%20mengetahui%20lebih%20lanjut%20tentang%20program%20dan%20Trial%20Gratis%20SPI.',
      '_blank',
      'noopener,noreferrer'
    );
  };

  // 5 Cooperation Models for Program SPI InSchool (Image 2)
  const inschoolCooperations = [
    {
      num: '1',
      title: 'InSchool Material (Kurikulum SPI)',
      desc: 'Guru sekolah mengajar di sekolah menggunakan kurikulum SPI sebagai mata pelajaran, ekstrakurikuler, atau program after-school.',
      image: ASSETS.inschool.programs.material,
      icon: BookOpen,
      iconColor: 'bg-blue-600 text-white'
    },
    {
      num: '2',
      title: 'Teacher Training',
      desc: 'Pelatihan dan sertifikasi guru agar mampu mengajarkan Computational Thinking, Coding, AI, dan Digital Skills sesuai standar SPI.',
      image: ASSETS.inschool.programs.teacherTraining,
      icon: GraduationCap,
      iconColor: 'bg-emerald-600 text-white'
    },
    {
      num: '3',
      title: 'Modul, Buku & Pelatihan Terbatas',
      desc: 'Penjualan modul buku dan pelatihan teacher secara terbatas untuk sekolah atau institusi pendidikan.',
      image: ASSETS.inschool.programs.modulBuku,
      icon: Layers,
      iconColor: 'bg-purple-600 text-white'
    },
    {
      num: '4',
      title: 'SPI Satelit di Sekolah',
      desc: 'Sekolah menjadi SPI Satelit di kota tersebut, program les regular setelah jam operasional sekolah untuk memanfaatkan ruangan yang ada.',
      image: ASSETS.inschool.programs.satelit,
      icon: School,
      iconColor: 'bg-amber-500 text-white'
    },
    {
      num: '5',
      title: 'Sertifikasi & Assessment',
      desc: 'Ujian kompetensi untuk mengukur pencapaian siswa pada setiap level pembelajaran, disertai sertifikat kompetensi SPI.',
      image: ASSETS.inschool.programs.sertifikasi,
      icon: Award,
      iconColor: 'bg-cyan-600 text-white'
    }
  ];

  // 6 Comparison Points (Tantangan vs Solusi - Image 1 & 2)
  const challenges = [
    'Guru belum memiliki kompetensi Coding, AI, dan Computational Thinking.',
    'Kurikulum sekolah sudah padat sehingga sulit menambahkan mata pelajaran baru.',
    'Belum tersedia kurikulum, modul, dan materi pembelajaran yang terstruktur.',
    'Pembelajaran teknologi sering hanya berfokus pada penggunaan software, bukan problem solving dan Computational Thinking.',
    'Sekolah kesulitan membangun program teknologi yang berkelanjutan.',
    'Belum ada sistem assessment dan sertifikasi yang mengukur kompetensi siswa.'
  ];

  const solutions = [
    'Kurikulum SPI siap diimplementasikan sebagai mata pelajaran, ekstrakurikuler, maupun after-school.',
    'Guru SPI atau guru sekolah dapat mengajar melalui program Teacher Training & Certification.',
    'Modul, buku, lesson plan, worksheet, assessment, dan project guide telah disiapkan secara lengkap.',
    'Pembelajaran berbasis Computational Thinking & Project-Based Learning sehingga siswa belajar membangun solusi nyata.',
    'Assessment & Certification SPI untuk mengukur perkembangan kompetensi siswa secara terstruktur.',
    'Program kemitraan jangka panjang melalui SPI Satellite School sehingga sekolah dapat membuka program SPI secara berkelanjutan.'
  ];

  // 6 Pillars (Mengapa Sekolah Memilih SPI InSchool? - Image 2)
  const whyChoosePillars = [
    {
      icon: BookOpen,
      title: 'Selaras dengan Kurikulum Sekolah',
      desc: 'Tidak mengubah kurikulum inti sekolah dan mudah diintegrasikan.'
    },
    {
      icon: Rocket,
      title: 'Berbasis Project & Computational Thinking',
      desc: 'Siswa belajar melalui proyek nyata yang relevan dengan kehidupan.'
    },
    {
      icon: GraduationCap,
      title: 'Guru Didukung Penuh',
      desc: 'Pelatihan, pendampingan, dan materi lengkap untuk guru.'
    },
    {
      icon: LineChart,
      title: 'Hasil Terukur',
      desc: 'Evaluasi, assessment, dan sertifikasi sebagai bukti pencapaian siswa.'
    },
    {
      icon: Users,
      title: 'Fleksibel & Skalabel',
      desc: 'Dapat disesuaikan dengan kebutuhan dan skala sekolah.'
    },
    {
      icon: Handshake,
      title: 'Kemitraan Jangka Panjang',
      desc: 'SPI menjadi partner strategis sekolah untuk masa depan.'
    }
  ];

  // 6 Flow Steps (Bagaimana SPI InSchool Bekerja? - Image 1 & 2)
  const workflowSteps = [
    {
      step: '1',
      title: 'Consultation',
      desc: 'Kami memahami kebutuhan dan tujuan sekolah Anda.',
      icon: '💬'
    },
    {
      step: '2',
      title: 'Curriculum Integration',
      desc: 'Menyesuaikan kurikulum SPI dengan struktur sekolah.',
      icon: '📋'
    },
    {
      step: '3',
      title: 'Teacher Training',
      desc: 'Pelatihan guru agar siap mengimplementasikan pembelajaran.',
      icon: '👥'
    },
    {
      step: '4',
      title: 'School Implementation',
      desc: 'Pelaksanaan pembelajaran di kelas dengan pendampingan dari SPI.',
      icon: '🏫'
    },
    {
      step: '5',
      title: 'Assessment & Reporting',
      desc: 'Evaluasi hasil belajar dan laporan perkembangan siswa secara berkala.',
      icon: '📈'
    },
    {
      step: '6',
      title: 'Future Ready School',
      desc: 'Sekolah siap menghadapi era AI dengan ekosistem pembelajaran yang inovatif.',
      icon: '🎓'
    }
  ];

  // 4 Programs Offered (Image 1)
  const programsOffered = [
    {
      title: 'Coding for All Levels',
      desc: 'Dari dasar programming hingga Python, disesuaikan dengan jenjang dan kebutuhan sekolah Anda.',
      image: ASSETS.programs.spiCore,
      icon: Laptop,
      tags: ['Scratch', 'Python', 'Web', 'App']
    },
    {
      title: 'Robotics & IoT',
      desc: 'Membangun kreativitas dan kemampuan problem solving melalui robotika dan Internet of Things.',
      image: ASSETS.programs.spiEngineering,
      icon: Cpu,
      tags: ['Robotika', 'Arduino', 'IoT']
    },
    {
      title: 'AI & Emerging Tech',
      desc: 'Memperkenalkan Artificial Intelligence, Machine Learning, dan teknologi masa depan.',
      image: ASSETS.homepage.hero,
      icon: Bot,
      tags: ['AI Literacy', 'ML', 'Data Science']
    },
    {
      title: 'Project-Based Learning',
      desc: 'Siswa membangun project nyata yang relevan dengan kehidupan sehari-hari dan masa depan.',
      image: ASSETS.learning.experienceLearning,
      icon: Presentation,
      tags: ['Real Project', 'Teamwork', 'Presentation']
    }
  ];

  // Contoh project: foto kelas dan proyek dari galeri, dengan caption asli dari album
  const studentSamplePhotos = [
    ...GALLERY_PHOTOS.filter((p) => p.album === 'Classroom_Process').slice(0, 3),
    ...GALLERY_PHOTOS.filter((p) => p.album === 'Innovation_Festival').slice(0, 3),
  ];

  // Gallery of Activities (Image 2)
  /**
   * assets/inschool/gallery-1…5.jpg are currently 372-byte placeholders. Set to true once real
   * activity photos are in place (the grid below then needs to render g.img).
   */
  const SHOW_GALLERY = false;
  const galleryActivities = [
    { title: 'Siswa Praktik Coding di Kelas', img: ASSETS.inschool.gallery.img1 },
    { title: 'Sesi Workshop Guru & Mentor', img: ASSETS.inschool.gallery.img2 },
    { title: 'Penyerahan Sertifikat Kelulusan Siswa', img: ASSETS.inschool.gallery.img3 },
    { title: 'Showcase Proyek Robotika Sekolah', img: ASSETS.inschool.gallery.img4 },
    { title: 'Penandatanganan Kemitraan Sekolah', img: ASSETS.inschool.gallery.img5 }
  ];

  // Sekolah Mendapatkan (Image 1)
  const schoolBenefits = [
    {
      icon: GraduationCap,
      title: 'AI-Ready Curriculum',
      desc: 'Kurikulum teknologi yang relevan dengan era AI.'
    },
    {
      icon: Users,
      title: 'Teacher Development',
      desc: 'Guru lebih siap dan percaya diri mengajar teknologi.'
    },
    {
      icon: Award,
      title: 'Student Portfolio',
      desc: 'Portofolio project setiap siswa sebagai bukti kompetensi.'
    },
    {
      icon: School,
      title: 'School Innovation',
      desc: 'Program unggulan yang meningkatkan nilai tambah sekolah.'
    },
    {
      icon: Handshake,
      title: 'Strong Partnership',
      desc: 'Kolaborasi jangka panjang bersama SPI.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-24 selection:bg-[#1870FF] selection:text-white">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 sm:sticky sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <button onClick={onBack} className="hover:text-[#1870FF] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span>Program</span>
            <span>/</span>
            <span className="text-[#1870FF] font-bold">SPI InSchool</span>
          </div>

          <button
            onClick={onBack}
            aria-label="Kembali ke Beranda"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-[#1870FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Hero: illustrated scene shared with the other product pages */}
      <IllustratedHero
        variant="inschool"
        eyebrow="SPI InSchool"
        title={<>Transforming Schools Through <span className="text-[#1870FF]">Computational Thinking</span></>}
        description="Kami membantu sekolah membangun ekosistem pembelajaran yang relevan dengan era AI melalui kurikulum SPI, pelatihan guru, project-based learning, sertifikasi, dan kemitraan jangka panjang."
        art={ASSETS.programs.spiInSchool}
        artAlt="Ilustrasi SPI InSchool"
        primary={{ label: 'Schedule Free Consultation', onClick: handleConsultationClick }}
        secondary={{ label: 'Pelajari Lebih Lanjut', onClick: () => document.getElementById('program-inschool-section')?.scrollIntoView({ behavior: 'smooth' }) }}
        badges={[
          { icon: 'build', title: 'Project-Based', sub: 'Learning' },
          { icon: 'ai', title: 'AI-Ready', sub: 'Curriculum' },
          { icon: 'innovate', title: 'Real Impact', sub: 'Real Project • Real Future' },
        ]}
        highlights={[
          { icon: 'curriculum', label: 'Kurikulum SPI' },
          { icon: 'teacher', label: 'Teacher Training' },
          { icon: 'assessment', label: 'Sertifikasi' },
        ]}
        bottomFill="#FFFFFF"
      />

      {/* Dipercaya oleh sekolah & organisasi: sama dengan carousel di beranda */}
      <HomepagePartnerLogosSection />

      {/* Program SPI InSchool - 5 Bentuk Kerja Sama dengan Gambar (Image 2) */}
      <section id="program-inschool-section" className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Program SPI InSchool
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              5 model kerja sama fleksibel yang dapat disesuaikan dengan kebutuhan dan kesiapan institusi sekolah Anda.
            </p>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 hide-scrollbar">
            {inschoolCooperations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[78%] shrink-0 snap-start sm:w-auto bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#1870FF] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-full bg-[#1870FF] text-white text-xs font-black flex items-center justify-center shadow-xs">
                        {item.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EEF4FF] text-[#1870FF]">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 group-hover:text-[#1870FF] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed flex-1">
                      {item.desc}
                    </p>
                  </div>

                  {/* Program Image Visual */}
                  <div className="p-3 pt-0">
                    <div className="aspect-[16/11] rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Tantangan Sekolah Saat Ini vs Solusi SPI InSchool (Image 1 & 2) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            
            {/* Tantangan Sekolah Box (Left) */}
            <div className="md:col-span-5 bg-rose-50/40 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-rose-100">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-sm">
                  ✕
                </div>
                <h3 className="text-lg font-black text-slate-800">
                  Tantangan Sekolah Saat Ini
                </h3>
              </div>

              <div className="space-y-3.5">
                {challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-700 leading-relaxed">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Transition Arrow */}
            <div className="md:col-span-1 flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1870FF] text-white flex items-center justify-center shadow-md">
                <ArrowRight className="w-5 h-5 hidden md:block" />
                <span className="md:hidden font-black text-sm">↓</span>
              </div>
            </div>

            {/* Solusi SPI InSchool Box (Right) */}
            <div className="md:col-span-5 bg-emerald-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 pb-3 border-b border-emerald-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                  ✓
                </div>
                <h3 className="text-lg font-black text-slate-800">
                  Solusi SPI InSchool
                </h3>
              </div>

              <div className="space-y-3.5">
                {solutions.map((solution, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-800 font-medium leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mengapa Sekolah Memilih SPI InSchool? (6 Pillars - Image 2) */}
      <section className="py-16 sm:py-20 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Mengapa Sekolah Memilih SPI InSchool?
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Menghadirkan transformasi pendidikan teknologi yang terstruktur, berdampak, dan berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {whyChoosePillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#1870FF] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1870FF] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-slate-800 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bagaimana SPI InSchool Bekerja? (6 Flow Steps - Image 1 & 2) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Bagaimana SPI InSchool Bekerja?
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Alur kerja komprehensif dari tahap awal konsultasi hingga pencapaian sekolah masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 relative flex flex-col justify-between space-y-3 hover:border-[#1870FF] hover:bg-white transition-all shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#1870FF] text-white text-[11px] font-black flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                    <span className="text-xl">{step.icon}</span>
                  </div>

                  <h3 className="text-xs font-black text-slate-800">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Program yang Ditawarkan (4 Cards - Image 1) */}
      <section className="py-16 sm:py-20 bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Program yang Ditawarkan
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Pilihan mata ajar teknologi fleksibel sesuai jenjang TK, SD, SMP, maupun SMA.
            </p>
          </div>

          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 hide-scrollbar">
            {programsOffered.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="w-[80%] shrink-0 snap-start sm:w-auto bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#1870FF] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1870FF] text-white flex items-center justify-center shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-black text-slate-800">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        {prog.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {prog.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-blue-50 text-[#1870FF] text-[10px] font-bold px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Contoh Project Siswa (Image 1 & 2) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Contoh Project Siswa
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Hasil karya nyata siswa dalam program pembelajaran berbasis proyek SPI.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {studentSamplePhotos.map((photo) => (
              <figure
                key={photo.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  role="img"
                  aria-label={photo.alt}
                  onContextMenu={blockMenu}
                  onDragStart={blockMenu}
                  className="block aspect-[4/3] bg-slate-100 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ ...PHOTO_PROTECT, backgroundImage: `url("${asset(photo.thumb)}")` }}
                />
                <figcaption className="space-y-1.5 p-3">
                  <span className="block truncate text-[11px] font-black text-slate-800">{photo.caption}</span>
                  <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#1870FF]">
                    {photo.album === 'Classroom_Process' ? 'Pengalaman Belajar' : 'Proyek & Inovasi'}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Kegiatan SPI InSchool (Image 2): hidden until real photos replace the placeholder files */}
      {SHOW_GALLERY && (
      <section className="py-16 bg-slate-50/80 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Gallery Kegiatan SPI InSchool
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Dokumentasi aktivitas pembelajaran, workshop guru, dan penyerahan sertifikasi siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {galleryActivities.map((g, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm aspect-[4/3]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm font-bold text-slate-400">
                    Image Coming Soon
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-slate-900/85 flex items-end p-3.5">
                  <p className="text-xs font-bold text-white leading-snug">
                    {g.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      )}

      {/* Sekolah Mendapatkan (5 Feature Cards - Image 1) */}
      <section className="relative overflow-hidden py-16 sm:py-24 bg-[#F7F9FE]">
        <div
          className="absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
          style={{ backgroundImage: 'radial-gradient(#C9DAF7 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1870FF]">SPI InSchool</p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight text-balance">
              Sekolah Mendapatkan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Manfaat menyeluruh bagi reputasi sekolah, guru, dan pencapaian siswa.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {schoolBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              const highlighted = idx === 0;
              return (
                <li
                  key={idx}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                    highlighted
                      ? 'bg-[#0B2454] text-white shadow-[0_30px_60px_-30px_rgba(4,26,90,0.8)]'
                      : 'bg-white ring-1 ring-[#E3ECFA] shadow-[0_18px_40px_-30px_rgba(4,26,90,0.45)] hover:shadow-[0_26px_50px_-28px_rgba(24,112,255,0.4)]'
                  }`}
                >
                  <span className={`text-xs font-black tabular-nums ${highlighted ? 'text-[#FFC928]' : 'text-[#1870FF]'}`}>
                    0{idx + 1}
                  </span>
                  <span
                    className={`mt-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 ${
                      highlighted ? 'bg-white/10 text-[#FFC928]' : 'bg-gradient-to-br from-[#EAF2FF] to-[#D6E6FF] text-[#1870FF]'
                    }`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className={`mt-5 text-base font-black leading-snug ${highlighted ? 'text-white' : 'text-[#041A5A]'}`}>
                    {benefit.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${highlighted ? 'text-blue-100/85' : 'text-slate-600'}`}>
                    {benefit.desc}
                  </p>
                  <span
                    className={`mt-auto pt-6 block h-1 w-10 rounded-full transition-all duration-500 ${
                      highlighted ? 'bg-[#FFC928]' : 'bg-[#1870FF]/30 group-hover:w-full group-hover:bg-[#1870FF]'
                    }`}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Metrics Banner & Testimonial Kepala Sekolah (Image 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-[#0B1E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900/50 space-y-8">
          
          {/* Top Numbers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border-b border-blue-800/60 pb-8">
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-blue-400 mb-1">
                <Building2 className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">10+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Sekolah Bermitra</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-emerald-400 mb-1">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">5+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Guru Terlatih</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-cyan-400 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">200+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Siswa Belajar</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-purple-400 mb-1">
                <School className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">5+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Kota di Indonesia</p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto text-center sm:text-left">
            <Quote className="w-8 h-8 text-amber-300 shrink-0 opacity-80" />
            <div className="space-y-1">
              <p className="text-sm sm:text-base text-blue-100 italic leading-relaxed">
                "SPI membantu kami menghadirkan pembelajaran teknologi yang relevan dan menyenangkan bagi siswa, serta meningkatkan kompetensi guru kami dalam menghadapi era kecerdasan buatan."
              </p>
              <p className="text-xs font-bold text-amber-300 pt-1">
                — Kepala Sekolah Mitra SPI
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner (Image 1 & 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 text-slate-800 shadow-lg border border-slate-200 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Mascot Image */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="w-44 h-44 sm:w-56 sm:h-56 relative">
                <ImageWithFallback
                  src={ASSETS.brand.pandaMascot}
                  alt="SPI Robot Panda Mascot"
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>

            {/* Banner Text */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Siap Mentransformasi Sekolah Anda?
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Mari berdiskusi dengan tim kami untuk menemukan solusi terbaik bagi sekolah Anda dalam membangun ekosistem pembelajaran yang siap menghadapi era AI.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Konsultasi Gratis</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Solusi Sesuai Kebutuhan</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Dukungan Penuh</span>
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <button
                onClick={handleConsultationClick}
                className="px-7 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 cursor-pointer transform hover:scale-105 active:scale-95"
              >
                <span>Schedule Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
