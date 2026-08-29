import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Search, ExternalLink, X, FileText, Calendar, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { AnimatePresence, motion } from 'motion/react';

interface BlogPageProps {
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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
            <div 
              key={idx} 
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#176DF8]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {article.cover_image && (
                <div className="h-48 overflow-hidden bg-slate-100">
                  <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
            </div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 font-semibold">
              Tidak ada artikel yang ditemukan.
            </div>
          )}
        </div>
      </div>

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
                  <img src={selectedArticle.cover_image} alt="Cover" className="w-full h-full object-cover" />
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
