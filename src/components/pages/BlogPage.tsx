import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Search, ExternalLink, X, FileText, Calendar, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { AnimatePresence, motion } from 'motion/react';

interface BlogPageProps {
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedSpotlightArticle, setSelectedSpotlightArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mediaArticles = [
    {
      id: "inn-2022-pet-feeder",
      title: "Wow! Christoper dari Sekolah Programming Indonesia Sulap Rongsokan Jadi Pet Feeder",
      url: "https://innindonesia.com/2022/10/17/wow-christoper-dari-sekolah-programming-indonesia-sulap-rongsokan-jadi-pet-feeder/",
      date: "17 Oktober 2022",
      source: "INN Indonesia",
      category: "Student Project",
      excerpt: "Student innovation story featuring a technology project created through SPI.",
      image: ASSETS.blog.christopherPetFeeder
    },
    {
      id: "inn-2022-computational-thinking",
      title: "Terapkan Computational Thinking dalam Pembelajaran, Sekolah Programming Indonesia Siap Cetak SDM Handal di Bidang Teknologi",
      url: "https://innindonesia.com/2022/10/28/terapkan-computational-thinking-dalam-pembelajaran-sekolah-programming-indonesia-siap-cetak-sdm-handal-di-bidang-teknologi/",
      date: "28 Oktober 2022",
      source: "INN Indonesia",
      category: "Education",
      excerpt: "INN NEWS - Di era serba teknologi seperti sekarang ini, dunia Pemrograman sudah sepatutnya dimasukkan ke dalam list keahlian anak muda Indonesia.",
      image: ASSETS.blog.computationalThinking
    },
    {
      id: "inn-2022-jocelyn",
      title: "Belajar Programming di SPI, Jocelyn Purnomo Cipta Aplikasi Belajar Baca",
      url: "https://innindonesia.com/2022/10/31/belajar-programming-di-spi-jocelyn-purnomo-cipta-aplikasi-belajar-baca/",
      date: "31 Oktober 2022",
      source: "INN Indonesia",
      category: "Student Project",
      excerpt: "A student project story showing how programming skills can be transformed into a practical learning application.",
      image: ASSETS.blog.jocelynBelajarBaca
    },
    {
      id: "inn-2025-innovation-fest",
      title: "Siswi Homeschooling Raih Project Terfavorit di Innovation Fest",
      url: "https://innindonesia.com/2025/12/03/siswi-homeschooling-raih-project-terfavorit-di-inovation-fest/",
      date: "3 Desember 2025",
      source: "INN Indonesia",
      category: "Achievement",
      excerpt: "A student achievement story highlighting project-based learning and innovation.",
      image: ASSETS.blog.innovationFest
    },
    {
      id: "inn-2025-infest",
      title: "INFEST 2025 Melatih Generasi Pencipta Teknologi, Bukan Sekadar Pengguna",
      url: "https://innindonesia.com/2025/10/18/infest-2025-melatih-generasi-pencipta-teknologi-bukan-sekadar-pengguna/",
      date: "18 Oktober 2025",
      source: "INN Indonesia",
      category: "Education",
      excerpt: "A story about developing students as technology creators rather than passive technology users.",
      image: ASSETS.blog.infest2025
    },
    {
      id: "inn-2024-spi-solo",
      title: "Bersama SPI Solo Menuju Masa Depan Cerah dengan Teknologi: The Future Is Now",
      url: "https://innindonesia.com/2024/12/20/bersama-spi-solo-menuju-masa-depan-cerah-dengan-teknologi-the-future-is-now/",
      date: "20 Desember 2024",
      source: "INN Indonesia",
      category: "SPI Story",
      excerpt: "A feature about SPI Solo and the role of technology education in preparing students for the future.",
      image: ASSETS.blog.spiSolo
    },
    {
      id: "inn-2026-ai-music",
      title: "Quo Vadis Pendidikan Musik di Era AI: Rekonfigurasi Kreativitas, Literasi Teknis, dan Taksonomi Pembelajaran",
      url: "https://innindonesia.com/2026/05/04/quo-vadis-pendidikan-musik-di-era-ai-rekonfigurasi-kreativitas-literasi-teknis-dan-taksonomi-pembelajaran/",
      date: "4 Mei 2026",
      source: "INN Indonesia",
      category: "AI & Education",
      excerpt: "A discussion about AI, creativity, technical literacy, and the changing landscape of education.",
      image: ASSETS.blog.aiMusicEducation
    },
    {
      id: "inn-2025-ai-composer",
      title: "AI Sebagai Komposer Baru: Krisis, Revolusi, dan Reinterpretasi Musikalitas",
      url: "https://innindonesia.com/2025/11/13/ai-sebagai-komposer-baru-krisis-revolusi-dan-reinterpretasi-musikalitas/",
      date: "13 November 2025",
      source: "INN Indonesia",
      category: "AI & Creativity",
      excerpt: "An exploration of artificial intelligence, creativity, and the changing relationship between technology and music.",
      image: ASSETS.blog.aiComposer
    }
  ];

  useEffect(() => {
    if (selectedSpotlightArticle || selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSpotlightArticle(null);
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedSpotlightArticle, selectedArticle]);
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    fetch('/api/blog?status=published')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(console.error);
  }, []);

  const categories = ['Semua', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = articles.filter(a => {
    const matchCategory = activeCategory === 'Semua' || a.category === activeCategory;
    const matchSearch = (a.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (a.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#176DF8] selection:text-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#176DF8] via-[#1059D4] to-[#0B3C95] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold text-white">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>SPI Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t('nav.blog')}
            </h1>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-xl">
              Berita terbaru, inovasi siswa, dan wawasan seputar teknologi dari publikasi terpercaya.
            </p>
          </div>
        </div>
      </div>

      {/* Media Articles Section (SPI IN THE SPOTLIGHT) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white text-[#176DF8] font-bold rounded-xl text-xs tracking-wider mb-4 border border-blue-100 shadow-sm">SPI IN THE SPOTLIGHT</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102A56] mb-6">Our Students. Our Stories.</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Discover stories, projects, and ideas from Sekolah Programming Indonesia featured by INN Indonesia and other media.
            </p>
            <p className="text-md text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From student-built technology to new ideas in education and AI, these stories capture how SPI students and educators continue to explore, create, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaArticles.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className={`bg-white rounded-[20px] border border-[#DCEBFF] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col cursor-pointer ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedSpotlightArticle(article)}
              >
                <div className={`w-full relative overflow-hidden ${idx === 0 ? 'aspect-video md:aspect-[2/1]' : 'aspect-video md:aspect-[4/3] lg:aspect-[16/10]'}`}>
                  <ImageWithFallback
                    src={article.image || ''}
                    alt={article.title}
                    fallbackLabel={article.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-[#176DF8] rounded uppercase tracking-wider border border-blue-100">
                      {article.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {article.date}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      • {article.source}
                    </span>
                  </div>
                  <h3 className={`${idx === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} font-bold text-[#102A56] leading-tight mb-4 group-hover:text-[#176DF8] transition-colors`}>
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-slate-600 line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center text-sm font-bold text-[#176DF8] group-hover:text-[#1059D4]">
                      Read Story <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Search & Filter Bar (Premium UI) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari artikel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#176DF8]/20 focus:border-[#176DF8] text-sm transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex-shrink-0 cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-blue-50 border-blue-200 text-[#176DF8]' 
                    : 'bg-white border-slate-200 text-slate-600 hover:text-[#176DF8] hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredArticles.map((article, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#176DF8]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {article.cover_image && (
                <div className="h-48 overflow-hidden bg-slate-100">
                  <ImageWithFallback src={article.cover_image} alt={article.title} fallbackLabel={article.category} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <span className="inline-block bg-blue-50 text-[#176DF8] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {article.category || 'Uncategorized'}
                  </span>
                  <h3 className="font-bold text-slate-800 leading-snug group-hover:text-[#176DF8] transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-slate-500 line-clamp-2">{article.excerpt}</p>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{article.source || article.author || 'SPI'}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#176DF8] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 font-semibold">
              Tidak ada artikel yang ditemukan.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedSpotlightArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 9999 }}>
            <div className="absolute inset-0 bg-[#102A56]/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedSpotlightArticle(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedSpotlightArticle(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20 cursor-pointer"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
              <div className="p-6 md:p-10 flex-grow">
                <div className="flex flex-wrap items-center gap-3 mb-6 pr-12">
                  <span className="text-[10px] md:text-xs font-bold px-3 py-1 bg-blue-50 text-[#176DF8] rounded uppercase tracking-wider border border-blue-100">{selectedSpotlightArticle.category}</span>
                  <span className="text-xs md:text-sm font-semibold text-slate-500">{selectedSpotlightArticle.date}</span>
                  <span className="text-xs md:text-sm font-semibold text-slate-400">• {selectedSpotlightArticle.source}</span>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#102A56] mb-8 leading-tight md:leading-tight">
                  {selectedSpotlightArticle.title}
                </h2>
                {selectedSpotlightArticle.image && (
                  <div className="w-full rounded-2xl overflow-hidden bg-slate-100 mb-8 border border-slate-100">
                    <ImageWithFallback src={selectedSpotlightArticle.image} alt={selectedSpotlightArticle.title} fallbackLabel={selectedSpotlightArticle.category} className="w-full h-auto max-h-[60vh] object-cover" />
                  </div>
                )}
                {selectedSpotlightArticle.excerpt && (
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-10 border-l-4 border-[#176DF8] pl-6 bg-blue-50/30 py-4 rounded-r-xl">
                    {selectedSpotlightArticle.excerpt}
                  </p>
                )}
                <div className="border-t border-slate-100 pt-8 mt-auto flex justify-center md:justify-start">
                  <a
                    href={selectedSpotlightArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-[#176DF8] text-white font-bold rounded-xl hover:bg-[#1059D4] transition-all shadow-md hover:shadow-lg gap-2 cursor-pointer w-full md:w-auto"
                  >
                    <span>Read Full Article on INN Indonesia</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-[#0B1220]/60 backdrop-blur-sm cursor-pointer" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedArticle.cover_image && (
                <div className="h-64 w-full bg-slate-100">
                  <ImageWithFallback src={selectedArticle.cover_image} alt="Cover" fallbackLabel={selectedArticle.category} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="px-8 py-8 border-b border-slate-100">
                <span className="inline-block bg-blue-100/50 text-[#176DF8] text-xs font-bold px-3 py-1 rounded-lg mb-4 uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-tight">
                  {selectedArticle.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500 font-medium">
                  {(selectedArticle.source || selectedArticle.author) && (
                    <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {selectedArticle.source || selectedArticle.author}</span>
                  )}
                  {selectedArticle.published_at && (
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(selectedArticle.published_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {selectedArticle.content ? (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedArticle.content}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">Konten artikel tidak tersedia.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
