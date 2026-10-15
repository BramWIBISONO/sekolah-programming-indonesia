import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Brain, Database, Eye, Wifi, Terminal, Network, Code, Server, Smartphone, Globe, Shield, Layers, Zap, Lightbulb, GraduationCap, Building, Briefcase } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { useLanguage } from '../../i18n';

/** Who SPI Engineering is for (titles and descriptions live in eng.who.*). */
const ENG_AUDIENCES: { key: string; icon: SpiIconName }[] = [
  { key: 'core', icon: 'grad' },
  { key: 'highschool', icon: 'highschool' },
  { key: 'university', icon: 'university' },
  { key: 'fresh', icon: 'briefcase' },
  { key: 'pro', icon: 'terminal' },
];

interface EngineeringProgramPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const EngineeringProgramPage: React.FC<EngineeringProgramPageProps> = ({ onBack, onOpenTrial }) => {
  const { t } = useLanguage();
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
    <div className="min-h-screen bg-white text-[#0B1220] pb-24 selection:bg-[#1870FF] selection:text-white font-sans">
      
      {/* 1. Hero: illustrated scene shared with the other product pages */}
      <IllustratedHero
        variant="engineering"
        eyebrow="Professional Technology Courses"
        title="SPI Engineering"
        description="Program pembelajaran profesional yang berfokus pada penguasaan satu kompetensi spesifik secara mendalam untuk kebutuhan industri, pekerjaan, dan karier."
        art={ASSETS.programs.spiEngineering}
        artAlt="Ilustrasi SPI Engineering"
        primary={{ label: 'Mulai Spesialisasi Anda', onClick: onOpenTrial }}
        onBack={onBack}
        backLabel="Kembali ke Beranda"
        highlights={[
          { icon: 'ai', label: 'AI Engineering' },
          { icon: 'assessment', label: 'Data Science' },
          { icon: 'ecosystem', label: 'IoT Engineering' },
        ]}
        bottomFill="#F8FAFC"
      />

      {/* 2. Overview & Philosophy (Mengapa Hadir) */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200">
              <Lightbulb className="w-4 h-4 text-[#1870FF]" />
              <span className="text-xs font-bold text-[#1870FF] uppercase tracking-wide">Mengapa SPI Engineering Hadir?</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220] leading-tight">
              Kebutuhan industri sering kali bukan mempelajari lebih banyak materi, tetapi menguasai kompetensi yang tepat.
            </h2>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 space-y-4">
              <p>Perkembangan teknologi berlangsung sangat cepat, sementara kebutuhan setiap individu maupun industri sangat beragam. Tidak semua orang membutuhkan pembelajaran yang panjang atau mempelajari seluruh topik dalam satu bidang teknologi.</p>
              <p>SPI Core dirancang untuk membangun fondasi yang kuat, mengajarkan <em>breadth</em> (cakupan luas). Namun, seorang Data Analyst belum tentu membutuhkan seluruh algoritma Machine Learning—mungkin hanya <em>Linear Regression</em>. Seorang Software Developer mungkin hanya butuh membangun <em>REST API dengan FastAPI</em>. Seorang AI Engineer mungkin hanya butuh membangun <em>RAG untuk Chatbot LLM</em>.</p>
              <p className="font-semibold text-[#1870FF]">Jika SPI Core mengajarkan <em>breadth</em>, maka SPI Engineering mengajarkan <em>depth where it matters</em>.</p>
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
              <div className="space-y-3 border-l-2 border-[#1870FF]/20 pl-0 md:pl-8">
                <div className="bg-blue-50 px-3 py-1 rounded-md inline-block text-xs font-bold text-[#1870FF] mb-2">Di SPI Engineering (Micro-course)</div>
                <p className="font-bold text-[#0B1220] text-sm">Applied Linear Regression for Sales Forecasting</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#1870FF]" /> Business Case & Real Dataset</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#1870FF]" /> Feature Engineering & Model Evaluation</li>
                  <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-[#1870FF]" /> Flask Integration & Deployment</li>
                </ul>
                <p className="text-xs font-medium text-slate-500 italic mt-2">Selesai satu kompetensi dengan kualitas profesional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Learning Pathways */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-[#041A5A]">Learning Pathways</h2>
            <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
            <p className="text-slate-600 text-base sm:text-lg">
              Berbagai Professional Technology Series yang dapat diikuti secara mandiri sebagai micro-course maupun dikombinasikan menjadi jalur spesialisasi.
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 pb-2 hide-scrollbar">
            {learningPathways.map((path, idx) => {
              const Icon = path.icon;
              return (
                <div key={idx} className="w-[82%] sm:w-[60%] md:w-auto shrink-0 snap-start bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#1870FF]/30 transition-all duration-300 flex flex-col group">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 text-[#1870FF] bg-[#EEF4FF]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#041A5A] mb-3 group-hover:text-[#1870FF] transition-colors">{path.title}</h3>
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
                        <span className="text-xs font-medium bg-blue-50 text-[#1870FF] px-2.5 py-1.5 rounded-lg border border-blue-100">
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

      {/* 4. Who it is for, entry requirements and learning objectives */}
      <section className="py-20 sm:py-24 bg-[#041A5A] text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-4 mb-12">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#9CC2FF]">{t('eng.who.eyebrow')}</p>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">{t('eng.who.title')}</h3>
            <p className="text-base text-blue-100/80 leading-relaxed">{t('eng.who.desc')}</p>
          </div>

          {/* Audiences: icon-led, separated by rules instead of boxes */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8">
            {ENG_AUDIENCES.map(({ key, icon }) => (
              <li key={key} className="group border-t border-white/15 pt-5 space-y-3">
                <span className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <SpiIcon name={icon} size={40} animate="hover" />
                </span>
                <h4 className="text-base font-black">{t(`eng.who.${key}.title`)}</h4>
                <p className="text-sm text-blue-100/75 leading-relaxed">{t(`eng.who.${key}.desc`)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 rounded-[24px] bg-white/[0.06] border border-white/10 p-6 sm:p-8 lg:divide-x lg:divide-white/10">
            <div className="space-y-3 lg:pr-10">
              <p className="text-xs font-black uppercase tracking-widest text-[#FFC928]">{t('eng.req.title')}</p>
              <p className="text-sm sm:text-base text-blue-50/90 leading-relaxed">{t('eng.req.desc')}</p>
            </div>
            <div className="space-y-4 lg:pl-10">
              <p className="text-xs font-black uppercase tracking-widest text-[#9CC2FF]">{t('eng.obj.title')}</p>
              <ol className="space-y-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="flex gap-3 text-sm sm:text-base">
                    <span className="shrink-0 w-6 h-6 rounded-full border border-white/25 text-[11px] font-black flex items-center justify-center tabular-nums" aria-hidden="true">{n}</span>
                    <span className="text-blue-50/90">{t(`eng.obj.${n}`)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Comparison Ecosystem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">Ekosistem Pembelajaran SPI</h2>
            <div className="w-20 h-1 bg-[#1870FF] mx-auto rounded-full" />
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
          <GraduationCap className="w-16 h-16 text-[#1870FF] mx-auto" />
          <h2 className="text-3xl font-black text-[#0B1220]">Siap Membangun Portofolio Profesional?</h2>
          <p className="text-lg text-slate-600">
            Lulusan SPI Engineering berkembang menjadi Technology Specialist yang mampu mengembangkan solusi nyata, memecahkan masalah industri, dan siap untuk sertifikasi atau karier.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={onOpenTrial} className="px-8 py-4 bg-[#1870FF] text-white font-bold rounded-2xl shadow-xl hover:bg-[#1059D4] hover:-translate-y-1 transition-all cursor-pointer">
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
