import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Brain, Database, Eye, Wifi, Terminal, Network, Code, Server, Smartphone, Globe, Shield, Activity, Target, TargetIcon, Layers, Zap, Lightbulb, GraduationCap, Building, Briefcase } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface EngineeringProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const EngineeringProgramPage: React.FC<EngineeringProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const learningPathways = [
    {
      title: "Software Engineering Series",
      description: "Membangun aplikasi menggunakan praktik pengembangan perangkat lunak modern.",
      courses: ["Python OOP Essentials", "Desktop Application with Tkinter", "REST API Development with FastAPI", "Flask Web Development", "Database Design with SQL", "Git & GitHub Workflow", "Clean Code Principles", "Software Architecture Fundamentals"],
      icon: Terminal,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Artificial Intelligence Engineering Series",
      description: "Membangun solusi berbasis Artificial Intelligence untuk berbagai kebutuhan industri.",
      courses: ["Prompt Engineering", "AI Workflow", "LLM Applications", "AI Chatbot Development", "Retrieval-Augmented Generation (RAG)", "AI Agent Development", "OpenAI API Integration", "Gemini API Integration"],
      icon: Brain,
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "Data Science Engineering Series",
      description: "Menerapkan teknik analisis data untuk mendukung pengambilan keputusan.",
      courses: ["Data Cleaning with Pandas", "Exploratory Data Analysis", "Linear Regression for Business Analytics", "Customer Segmentation with K-Means", "Decision Tree Applications", "Dashboard with Looker Studio", "Data Visualization", "Predictive Analytics"],
      icon: Database,
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "Machine Learning Engineering Series",
      description: "Mengembangkan model Machine Learning hingga siap digunakan.",
      courses: ["Classification with Scikit-Learn", "Regression Modeling", "Clustering Techniques", "Feature Engineering", "Model Evaluation", "Hyperparameter Tuning", "Model Deployment"],
      icon: Network,
      color: "text-indigo-500 bg-indigo-50"
    },
    {
      title: "Computer Vision Engineering Series",
      description: "Membangun aplikasi berbasis pengolahan citra dan visi komputer.",
      courses: ["OpenCV Fundamentals", "Image Processing", "Object Detection with YOLO", "OCR Applications", "Face Recognition", "Image Classification"],
      icon: Eye,
      color: "text-rose-500 bg-rose-50"
    },
    {
      title: "Natural Language Processing Series",
      description: "Mengembangkan solusi berbasis pemrosesan bahasa alami.",
      courses: ["Text Processing", "TF-IDF Applications", "Text Classification", "Sentiment Analysis", "Information Retrieval", "Chatbot Development"],
      icon: Code,
      color: "text-amber-500 bg-amber-50"
    },
    {
      title: "Web Engineering Series",
      description: "Mengembangkan aplikasi web modern.",
      courses: ["HTML & CSS Essentials", "JavaScript Fundamentals", "Responsive Web Design", "React Fundamentals", "Next.js Essentials", "Tailwind CSS"],
      icon: Globe,
      color: "text-cyan-500 bg-cyan-50"
    },
    {
      title: "IoT Engineering Series",
      description: "Mengembangkan sistem Internet of Things berbasis perangkat keras dan cloud.",
      courses: ["Arduino Applications", "ESP32 Development", "IoT Communication", "MQTT", "IoT Dashboard", "Smart Home Development"],
      icon: Wifi,
      color: "text-teal-500 bg-teal-50"
    },
    {
      title: "Cloud & DevOps Series",
      description: "Mempersiapkan aplikasi untuk lingkungan produksi.",
      courses: ["Docker Essentials", "Linux Fundamentals", "GitHub Actions", "CI/CD Basics", "Cloud Deployment", "Nginx Essentials"],
      icon: Server,
      color: "text-sky-500 bg-sky-50"
    },
    {
      title: "Cyber Security Series (Future)",
      description: "Future series. Do not imply currently available unless verified data exists.",
      courses: ["Web Security", "Secure Coding", "Authentication", "Penetration Testing Basics"],
      icon: Shield,
      color: "text-slate-500 bg-slate-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-24 selection:bg-[#176DF8] selection:text-white font-sans">
      
      {/* 1. Hero Banner */}
      <section className="bg-[#176DF8] text-white pt-24 pb-20 relative bg-tech-dark-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#176DF8] via-[#1059D4] to-[#0B1220] opacity-90 mix-blend-multiply" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-white/80 hover:text-white mb-8 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Track 03 • Professional Technology Courses
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                SPI Engineering
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Program pembelajaran profesional yang berfokus pada penguasaan satu kompetensi spesifik secara mendalam untuk kebutuhan industri, pekerjaan, dan karier.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={onOpenTrial}
                  className="px-8 py-4 bg-white text-[#176DF8] hover:bg-blue-50 active:scale-95 font-bold rounded-2xl shadow-xl transition-all flex items-center space-x-2 cursor-pointer group"
                >
                  <span>Mulai Spesialisasi Anda</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transform scale-110" />
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 p-2 border border-white/20 relative backdrop-blur-sm">
                <ImageWithFallback
                  src={ASSETS.HERO_ENGINEERING}
                  alt="SPI Engineering Hero"
                  fallbackLabel="Engineering Visual"
                  className="w-full h-auto aspect-square lg:aspect-[4/5] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Overview & Philosophy (Mengapa Hadir) */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200">
              <Lightbulb className="w-4 h-4 text-[#176DF8]" />
              <span className="text-xs font-bold text-[#176DF8] uppercase tracking-wide">Mengapa SPI Engineering Hadir?</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220] leading-tight">
              Kebutuhan industri sering kali bukan mempelajari lebih banyak materi, tetapi menguasai kompetensi yang tepat.
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-4">
              <p>Perkembangan teknologi berlangsung sangat cepat, sementara kebutuhan setiap individu maupun industri sangat beragam. Tidak semua orang membutuhkan pembelajaran yang panjang atau mempelajari seluruh topik dalam satu bidang teknologi.</p>
              <p>SPI Core dirancang untuk membangun fondasi yang kuat, mengajarkan <em>breadth</em> (cakupan luas). Namun, seorang Data Analyst belum tentu membutuhkan seluruh algoritma Machine Learning—mungkin hanya <em>Linear Regression</em>. Seorang Software Developer mungkin hanya butuh membangun <em>REST API dengan FastAPI</em>. Seorang AI Engineer mungkin hanya butuh membangun <em>RAG untuk Chatbot LLM</em>.</p>
              <p className="font-semibold text-[#176DF8]">Jika SPI Core mengajarkan <em>breadth</em>, maka SPI Engineering mengajarkan <em>depth where it matters</em>.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Brain className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1220]">Contoh Nyata Perbedaan Pendekatan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <div className="bg-slate-100 px-3 py-1 rounded-md inline-block text-xs font-bold text-slate-600 mb-2">Di SPI Core (Data Science)</div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Data Acquisition & Cleaning</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> EDA & Regression</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Classification & Clustering</li>
                </ul>
                <p className="text-xs font-medium text-slate-500 italic mt-2">Semua diperkenalkan untuk membangun fondasi.</p>
              </div>
              <div className="space-y-3 border-l-2 border-[#176DF8]/20 pl-0 md:pl-8">
                <div className="bg-blue-50 px-3 py-1 rounded-md inline-block text-xs font-bold text-[#176DF8] mb-2">Di SPI Engineering (Micro-course)</div>
                <p className="font-bold text-[#0B1220] text-sm">Applied Linear Regression for Sales Forecasting</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#176DF8]" /> Business Case & Real Dataset</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#176DF8]" /> Feature Engineering & Model Evaluation</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#176DF8]" /> Flask Integration & Deployment</li>
                </ul>
                <p className="text-xs font-medium text-slate-500 italic mt-2">Selesai satu kompetensi dengan kualitas profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Pathways */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">Learning Pathways</h2>
            <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
            <p className="text-slate-600 text-lg">
              Berbagai Professional Technology Series yang dapat diikuti secara mandiri sebagai micro-course maupun dikombinasikan menjadi jalur spesialisasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPathways.map((path, idx) => {
              const Icon = path.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#176DF8]/30 transition-all duration-300 flex flex-col h-full group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${path.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#176DF8] transition-colors">{path.title}</h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow">{path.description}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Micro-courses</p>
                    <div className="flex flex-wrap gap-2">
                      {path.courses.slice(0, 3).map((course, cIdx) => (
                        <span key={cIdx} className="text-xs font-medium bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-100">
                          {course}
                        </span>
                      ))}
                      {path.courses.length > 3 && (
                        <span className="text-xs font-medium bg-blue-50 text-[#176DF8] px-2.5 py-1.5 rounded-lg border border-blue-100">
                          +{path.courses.length - 3} lebih
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Target Market & Entry Requirements */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#176DF8]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Target Market */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Target Market</span>
                </div>
                <h3 className="text-3xl font-black">Siapa yang Membutuhkan SPI Engineering?</h3>
                <p className="text-slate-400">Dirancang bagi individu yang ingin menguasai kompetensi teknologi tertentu secara praktis dan profesional.</p>
              </div>
              
              <ul className="space-y-4">
                {[
                  { title: "SPI Core Graduates", desc: "Mengembangkan spesialisasi tanpa mengikuti jalur penuh." },
                  { title: "Senior High School Students", desc: "Membangun portfolio, persiapan kompetisi & kuliah." },
                  { title: "University Students", desc: "Memperkuat hard skills praktis yang relevan dengan industri." },
                  { title: "Fresh Graduates", desc: "Membangun portofolio teknis sebelum memasuki dunia kerja." },
                  { title: "IT Professionals & Developers", desc: "Upskilling teknologi tertentu secara efisien." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-[#176DF8] shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Objectives & Requirements */}
            <div className="space-y-12">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  Persyaratan (Entry Requirements)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Secara umum peserta direkomendasikan telah memiliki dasar pemrograman, computational thinking, dan kemampuan problem solving. Persyaratan khusus (seperti penguasaan Python atau SQL) bergantung pada kelas yang diambil.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-[#176DF8]/20 to-[#1059D4]/20 border border-[#176DF8]/30 rounded-3xl p-8 space-y-6 backdrop-blur-sm">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <TargetIcon className="w-6 h-6 text-[#5BA7FF]" />
                  Tujuan Pembelajaran
                </h3>
                <ul className="space-y-4">
                  {[
                    "Technology Specialization (Fokus satu teknologi)",
                    "Applied Technology Implementation (Studi kasus nyata)",
                    "Industry Best Practices (Standard workflow)",
                    "System Integration (Penggabungan teknologi API/DB)",
                    "Professional Portfolio Development"
                  ].map((obj, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="w-2 h-2 rounded-full bg-[#5BA7FF]" />
                      <span className="text-sm font-medium">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Product Comparison Ecosystem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">Ekosistem Pembelajaran SPI</h2>
            <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
            <p className="text-slate-600 text-lg">
              Setiap produk SPI memiliki tujuan yang spesifik untuk mencetak inovator teknologi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[
              {
                name: "SPI Core",
                q: "Bagaimana saya memahami dunia teknologi?",
                desc: "Membangun fondasi dari Computational Thinking hingga Technology Innovation.",
                color: "bg-blue-500", text: "text-blue-500"
              },
              {
                name: "SPI Engineering",
                q: "Bagaimana saya menguasai satu keterampilan untuk bekerja?",
                desc: "Penguasaan spesifik berbasis proyek sesuai kebutuhan industri.",
                color: "bg-[#0B1220]", text: "text-[#0B1220]"
              },
              {
                name: "SPI Lab",
                q: "Bagaimana saya menggunakan teknologi sehari-hari?",
                desc: "Keterampilan digital & AI untuk produktivitas (Word, Excel, ChatGPT).",
                color: "bg-purple-500", text: "text-purple-500"
              },
              {
                name: "SPI InSchool",
                q: "Bagaimana sekolah menerapkan ini?",
                desc: "Integrasi kurikulum formal, pelatihan guru, dan assessment di sekolah.",
                color: "bg-emerald-500", text: "text-emerald-500"
              },
              {
                name: "SPI Research",
                q: "Bagaimana saya berinovasi?",
                desc: "Pembuatan prototype, publikasi, startup, dan kolaborasi industri.",
                color: "bg-amber-500", text: "text-amber-500"
              }
            ].map((prod, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col hover:-translate-y-1 transition-transform">
                <h3 className={`text-lg font-black mb-2 ${prod.text}`}>{prod.name}</h3>
                <p className="text-xs font-bold text-slate-800 italic mb-4">"{prod.q}"</p>
                <p className="text-xs text-slate-600 leading-relaxed flex-grow">{prod.desc}</p>
                <div className={`h-1.5 w-full rounded-full mt-4 opacity-50 ${prod.color}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Graduate Profile / CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <GraduationCap className="w-16 h-16 text-[#176DF8] mx-auto" />
          <h2 className="text-3xl font-black text-[#0B1220]">Siap Membangun Portofolio Profesional?</h2>
          <p className="text-lg text-slate-600">
            Lulusan SPI Engineering berkembang menjadi Technology Specialist yang mampu mengembangkan solusi nyata, memecahkan masalah industri, dan siap untuk sertifikasi atau karier.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onOpenTrial} className="px-8 py-4 bg-[#176DF8] text-white font-bold rounded-2xl shadow-xl hover:bg-[#1059D4] hover:-translate-y-1 transition-all cursor-pointer">
              Daftar Free Trial
            </button>
            <button onClick={onBack} className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-colors cursor-pointer">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
