import React, { useState } from 'react';
import { ASSETS } from '../../constants/assets';
import { SCHOOL_PARTNERS } from '../../data/mockData';
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

interface InSchoolProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const InSchoolProgramPage: React.FC<InSchoolProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const handleConsultationClick = () => {
    window.open(
      'https://wa.me/6281234567890?text=Halo%20SPI%2C%20kami%20dari%20pihak%20sekolah%20ingin%20berkonsultasi%20mengenai%20kemitraan%20program%20SPI%20InSchool.',
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

  // Sample Student Projects (Image 1 & 2)
  const studentSampleProjects = [
    { name: 'Smart Parking System', category: 'Robotics • IoT', img: ASSETS.inschool.projects.smartParking },
    { name: 'Digital Piano', category: 'Mobile App', img: ASSETS.inschool.projects.digitalPiano },
    { name: 'Maze Escape Game', category: 'Computational Thinking', img: ASSETS.inschool.projects.mazeEscape },
    { name: 'Smart Traffic Light', category: 'IoT • Robotics', img: ASSETS.inschool.projects.smartTrafficLight },
    { name: 'My Portfolio Website', category: 'Web Development', img: ASSETS.inschool.projects.portfolio },
    { name: 'Automation Project', category: 'Python • IoT', img: ASSETS.inschool.projects.automation }
  ];

  // Gallery of Activities (Image 2)
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
    <div className="min-h-screen bg-white text-[#0B1220] pb-24 selection:bg-[#176DF8] selection:text-white">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <button onClick={onBack} className="hover:text-[#176DF8] transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span>Program</span>
            <span>/</span>
            <span className="text-[#176DF8] font-bold">SPI InSchool</span>
          </div>

          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-[#176DF8] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Hero Section (Image 1 & 2) */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-[#E3F2FD] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iLjE1Ii8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#176DF8]">
                <School className="w-4 h-4" />
                <span>SPI InSchool</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0D47A1] leading-tight">
                  Transforming Schools Through <br />
                  <span className="text-[#176DF8]">Computational Thinking</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Kami membantu sekolah membangun ekosistem pembelajaran yang relevan dengan era AI melalui kurikulum SPI, pelatihan guru, project-based learning, sertifikasi, dan kemitraan jangka panjang.
              </p>

              {/* Consultation Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleConsultationClick}
                  className="px-8 py-4 bg-[#176DF8] hover:bg-[#1059D4] text-white font-black text-sm rounded-2xl shadow-[0_8px_30px_rgba(23,109,248,0.25)] transition-all flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Schedule Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('program-inschool-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-white text-[#176DF8] hover:bg-blue-50 font-bold text-sm rounded-2xl border border-[#176DF8]/20 hover:border-[#176DF8] transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Hero Image Showcase with Interactive Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 p-2.5 border border-white/20">
                <ImageWithFallback
                  src={ASSETS.programs.spiInSchool}
                  alt={ASSETS.programs.spiInSchool}
                  className="w-full h-auto aspect-[4/3] object-cover rounded-2xl"
                />

                {/* Floating Badge Top Left: Project-Based Learning */}
                <div className="absolute top-5 left-5 bg-white text-slate-800 px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-2.5 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#176DF8] flex items-center justify-center font-bold">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-slate-800 leading-tight">Project-Based</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Learning</p>
                  </div>
                </div>

                {/* Floating Badge Top Right: AI-Ready Curriculum */}
                <div className="absolute top-5 right-5 bg-white text-slate-800 px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-2 backdrop-blur-md">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-extrabold text-slate-800 leading-tight">AI-Ready</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Curriculum</p>
                  </div>
                </div>

                {/* Floating Bottom Right Badge: Real Impact */}
                <div className="absolute bottom-5 right-5 bg-white text-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 backdrop-blur-md flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#176DF8] flex items-center justify-center">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-800 leading-tight">Real Impact</p>
                    <p className="text-[10px] font-semibold text-slate-500 leading-tight">Real Project • Real Future</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trusted by Our Partner Schools (Image 1 & 2) */}
      <section className="py-10 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-3 text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-black text-[#176DF8] tracking-tight">
                Trusted by
              </h3>
              <p className="text-sm font-bold text-slate-800">
                Our Partner Schools
              </p>
            </div>

            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-center">
              {SCHOOL_PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-xl p-3 flex flex-col items-center justify-center text-center h-24 hover:border-[#176DF8] hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 mb-1.5 flex items-center justify-center">
                    <ImageWithFallback
                      src={partner.logo}
                      alt={partner.logo}
                      className="max-h-8 max-w-full object-contain"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight">
                    {partner.name}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {inschoolCooperations.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#176DF8] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-full bg-[#176DF8] text-white text-xs font-black flex items-center justify-center shadow-xs">
                        {item.num}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-sm font-black text-slate-800 group-hover:text-[#176DF8] transition-colors leading-snug">
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
                        alt={item.image}
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
              <div className="w-10 h-10 rounded-full bg-[#176DF8] text-white flex items-center justify-center shadow-md">
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
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#176DF8] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#176DF8] flex items-center justify-center shadow-xs">
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
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 relative flex flex-col justify-between space-y-3 hover:border-[#176DF8] hover:bg-white transition-all shadow-xs"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#176DF8] text-white text-[11px] font-black flex items-center justify-center shadow-xs">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programsOffered.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#176DF8] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={prog.image}
                      alt={prog.image}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="w-8 h-8 rounded-lg bg-[#176DF8] text-white flex items-center justify-center shadow-md">
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
                          className="bg-blue-50 text-[#176DF8] text-[10px] font-bold px-2.5 py-0.5 rounded-md"
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
            {studentSampleProjects.map((sample, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[16/11] bg-slate-900 overflow-hidden">
                  <ImageWithFallback
                    src={sample.img}
                    alt={sample.img}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-black text-slate-800 truncate">
                    {sample.name}
                  </h4>
                  <span className="inline-block text-[10px] font-bold text-[#176DF8] bg-blue-50 px-2 py-0.5 rounded-full">
                    {sample.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Kegiatan SPI InSchool (Image 2) */}
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
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm aspect-[4/3]"
              >
                <ImageWithFallback
                  src={g.img}
                  alt={g.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                  <p className="text-xs font-bold text-white leading-snug">
                    {g.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sekolah Mendapatkan (5 Feature Cards - Image 1) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] tracking-tight">
              Sekolah Mendapatkan
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              Manfaat menyeluruh bagi reputasi sekolah, guru, dan pencapaian siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {schoolBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-[#176DF8] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-black text-slate-800">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>

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
              <p className="text-3xl sm:text-4xl font-black text-amber-300">100+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Sekolah Bermitra</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-emerald-400 mb-1">
                <GraduationCap className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">500+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Guru Terlatih</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-cyan-400 mb-1">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">20.000+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">Siswa Belajar</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-purple-400 mb-1">
                <School className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">50+</p>
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
        <div className="bg-gradient-to-r from-[#0B3C95] via-[#176DF8] to-[#1059D4] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden bg-tech-dark-grid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Mascot Image */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
                <ImageWithFallback
                  src={ASSETS.brand.pandaMascot}
                  alt={ASSETS.brand.pandaMascot}
                  className="w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>

            {/* Banner Text */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Siap Mentransformasi Sekolah Anda?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Mari berdiskusi dengan tim kami untuk menemukan solusi terbaik bagi sekolah Anda dalam membangun ekosistem pembelajaran yang siap menghadapi era AI.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-blue-100">
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
