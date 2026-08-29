import React, { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Search, FlaskConical, Download, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface JournalPageProps {
  onBack: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua Volume');

  useEffect(() => {
    fetch('/api/journal?status=published')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(console.error);
  }, []);

  const categories = ['Semua Volume', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = articles.filter(a => {
    const matchCategory = activeCategory === 'Semua Volume' || a.category === activeCategory;
    const matchSearch = (a.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (a.abstract || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#176DF8] selection:text-white">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#0B1220] via-[#0F1C36] to-[#0A162B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white/80 hover:text-white mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-white">
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>Jurnal Pendidikan Teknologi</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t('nav.journal')}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Publikasi dan penelitian mengenai perkembangan teknologi pendidikan dan literasi digital di Indonesia.
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
              placeholder="Cari jurnal publikasi..." 
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

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#176DF8] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {article.category || 'Journal'}
                    </span>
                    {article.year && (
                      <span className="inline-block bg-blue-50 text-[#176DF8] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Vol {article.volume || '-'} • {article.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-[#176DF8] transition-colors">
                    {article.title}
                  </h3>
                  {article.abstract && (
                    <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                      {article.abstract}
                    </p>
                  )}
                  {article.authors && (
                    <p className="text-xs font-semibold text-slate-400 mt-2">
                      Oleh: <span className="text-slate-600">{article.authors}</span>
                    </p>
                  )}
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(article.published_at || article.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {article.pdf_url ? (
                    <a 
                      href={article.pdf_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#176DF8] hover:text-[#1059D4] cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh PDF</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">PDF tidak tersedia</span>
                  )}
                </div>
              </div>
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-500 font-semibold">
                Tidak ada jurnal yang ditemukan.
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-slate-100/50 to-blue-50/30 rounded-3xl border border-slate-200/60 p-12 lg:p-20 text-center overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-slate-300/20 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-2">
                <FlaskConical className="w-10 h-10 text-slate-700" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800">Menyusun Riset Masa Depan</h3>
                <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Publikasi akademik dan jurnal penelitian metodologi pendidikan teknologi SPI sedang dalam tahap peer-review. Jurnal perdana akan segera diterbitkan.
                </p>
              </div>

              <button 
                onClick={onBack}
                className="mt-4 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
