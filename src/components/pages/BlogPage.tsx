import { useReducedMotion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight, ExternalLink, FileText, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ASSETS } from '../../constants/assets';
import { SPI_ARTICLES } from '../../data/spiArticles';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';
import { AnimatedGridPattern } from '../illustrations/AnimatedGridPattern';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { SpotlightLayer, spotlightMove } from '../common/Spotlight';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { useLanguage } from '../../i18n';

interface BlogPageProps {
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

const PAGE_SIZE = 6;
const ALL = '__all__';

/** Reading time from the number of words, at about 200 words a minute. */
const readMinutes = (text: string) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

interface ListItem {
  key: string;
  category: string;
  title: string;
  excerpt: string;
  minutes: number;
  icon: SpiIconName;
  image?: string;
  onOpen: () => void;
}

/** Press coverage of SPI. These link to the original articles on INN Indonesia. */
const MEDIA_ARTICLES = [
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

export const BlogPage: React.FC<BlogPageProps> = ({ onBack, onNavigate }) => {
  const { t } = useLanguage();
  const reduce = !!useReducedMotion();
  const [cmsPosts, setCmsPosts] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedSpotlightArticle, setSelectedSpotlightArticle] = useState<any | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [page, setPage] = useState(0);

  // Posts written in the admin area. They appear in the list when the API is running.
  useEffect(() => {
    fetch('/api/blog?status=published')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCmsPosts(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const open = !!(selectedSpotlightArticle || selectedArticle);
    document.body.style.overflow = open ? 'hidden' : 'auto';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSpotlightArticle(null);
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [selectedSpotlightArticle, selectedArticle]);

  const spiItems: ListItem[] = SPI_ARTICLES.map((a) => ({
    key: `spi-${a.slug}`,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    minutes: readMinutes([a.excerpt, ...a.sections.flatMap((s) => [s.heading ?? '', ...(s.paragraphs ?? []), ...(s.bullets ?? [])])].join(' ')),
    icon: a.icon ?? 'think',
    onOpen: () => onNavigate?.(`/artikel/${a.slug}`),
  }));

  const cmsItems: ListItem[] = cmsPosts.map((p, i) => ({
    key: `cms-${p.id ?? i}`,
    category: p.category || 'SPI',
    title: p.title || '',
    excerpt: p.excerpt || '',
    minutes: readMinutes(p.content || p.excerpt || ''),
    icon: 'think',
    image: p.cover_image || undefined,
    onOpen: () => setSelectedArticle(p),
  }));

  const items = [...cmsItems, ...spiItems];
  const categories = Array.from(new Set(items.map((i) => i.category))).filter(Boolean);
  const needle = query.trim().toLowerCase();
  const filtered = items.filter(
    (i) =>
      (category === ALL || i.category === category) &&
      (!needle || `${i.title} ${i.excerpt} ${i.category}`.toLowerCase().includes(needle)),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(0);
  };
  const changeCategory = (value: string) => {
    setCategory(value);
    setPage(0);
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#1870FF] selection:text-white">
      {/* Header */}
      {/* Hero: the same illustrated hero as the other pages */}
      <IllustratedHero
        variant="literacy"
        eyebrow={t('blog.list.eyebrow')}
        title={t('blog.list.title')}
        description={t('blog.list.desc')}
        artSlot={<AILiteracyArt className="block h-auto w-full" animate={!reduce} />}
        primary={{ label: t('blog.list.all'), onClick: () => document.getElementById('blog-list')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }) }}
        onBack={onBack}
        backLabel={t('lab.back')}
        bottomFill="#FFFFFF"
      />

      {/* Search, category, and the list */}
      <section id="blog-list" className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-y border-[#E4ECF8] py-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block flex-1 sm:max-w-sm">
            <span className="sr-only">{t('blog.list.search_label')}</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => changeQuery(e.target.value)}
              placeholder={t('blog.list.search')}
              className="h-11 w-full rounded-xl border border-[#DCE7FB] bg-white pl-10 pr-4 text-sm focus:border-[#1870FF] focus:outline-none focus:ring-2 focus:ring-[#1870FF]/25"
            />
          </label>
          <div>
            <label htmlFor="blog-category" className="sr-only">
              {t('blog.list.category')}
            </label>
            <select
              id="blog-category"
              value={category}
              onChange={(e) => changeCategory(e.target.value)}
              className="h-11 w-full min-w-[220px] cursor-pointer rounded-xl border border-[#DCE7FB] bg-white px-3 text-sm font-semibold text-[#041A5A] focus:border-[#1870FF] focus:outline-none focus:ring-2 focus:ring-[#1870FF]/25 sm:w-auto"
            >
              <option value={ALL}>{t('blog.list.all')}</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-500" aria-live="polite">
          {t('blog.list.count').replace('{n}', String(filtered.length))}
        </p>

        {visible.length === 0 ? (
          <p className="py-20 text-center text-slate-500">{t('blog.list.empty')}</p>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={item.onOpen}
                  onPointerMove={spotlightMove}
                  className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#E4ECF8] bg-white text-left shadow-[0_18px_40px_-30px_rgba(4,26,90,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1870FF]/40 hover:shadow-[0_28px_50px_-28px_rgba(24,112,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  <SpotlightLayer />
                  <span className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-[#F5F9FF] to-[#D6E6FF]">
                    {item.image ? (
                      <ImageWithFallback src={item.image} alt="" fallbackLabel={item.category} className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <AnimatedGridPattern className="text-[#1870FF]/25" />
                        <span className="absolute left-[30%] top-[24%] h-2.5 w-2.5 rounded-full bg-[#FFC928] shadow-[0_0_0_4px_rgba(255,201,40,0.2)]" aria-hidden="true" />
                        <span className="absolute bottom-[22%] right-[30%] h-2 w-2 rounded-full bg-[#1870FF]/60" aria-hidden="true" />
                        <span className="relative flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-[0_22px_40px_-18px_rgba(24,112,255,0.55)] ring-8 ring-white/70 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                          <SpiIcon name={item.icon} size={56} animate="hover" />
                        </span>
                      </>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="inline-flex w-fit rounded-full bg-[#EAF2FF] px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[#1870FF]">{item.category}</span>
                    <span className="mt-4 text-lg font-black leading-snug text-[#041A5A] transition-colors group-hover:text-[#1870FF]">{item.title}</span>
                    <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</span>
                    <span className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-semibold text-slate-400">
                      <span>{t('blog.list.read_time').replace('{n}', String(item.minutes))}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-[#1870FF]">
                        {t('article.read')}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {pageCount > 1 && (
          <nav aria-label={t('blog.list.pagination')} className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage(current - 1)}
              disabled={current === 0}
              aria-label={t('common.previous')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#DCE7FB] text-[#041A5A] hover:border-[#1870FF] disabled:cursor-default disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={t('blog.list.page').replace('{n}', String(i + 1))}
                aria-current={i === current ? 'page' : undefined}
                className={`h-10 min-w-[2.5rem] cursor-pointer rounded-xl px-3 text-sm font-bold ${
                  i === current ? 'bg-[#1870FF] text-white shadow-[0_12px_22px_-12px_rgba(24,112,255,0.9)]' : 'border border-[#DCE7FB] text-[#041A5A] hover:border-[#1870FF]'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(current + 1)}
              disabled={current >= pageCount - 1}
              aria-label={t('common.next')}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#DCE7FB] text-[#041A5A] hover:border-[#1870FF] disabled:cursor-default disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        )}
      </section>

      {/* Media Articles Section (SPI IN THE SPOTLIGHT) */}
      <section className="relative mt-16 bg-[#F8FAFC] py-16 sm:mt-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-xl border border-blue-100 bg-white px-4 py-1.5 text-xs font-bold tracking-wider text-[#1870FF] shadow-sm">SPI IN THE SPOTLIGHT</span>
            <h2 className="mb-6 text-3xl font-extrabold text-[#102A56] md:text-5xl">Our Students. Our Stories.</h2>
            <p className="mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Discover stories, projects, and ideas from Sekolah Programming Indonesia featured by INN Indonesia and other media.
            </p>
            <p className="text-md mx-auto max-w-2xl leading-relaxed text-slate-500">
              From student-built technology to new ideas in education and AI, these stories capture how SPI students and educators continue to explore, create, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MEDIA_ARTICLES.map((article, idx) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className={`group flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-[#DCEBFF] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedSpotlightArticle(article)}
              >
                <div className={`relative w-full overflow-hidden ${idx === 0 ? 'aspect-video md:aspect-[2/1]' : 'aspect-video md:aspect-[4/3] lg:aspect-[16/10]'}`}>
                  <ImageWithFallback
                    src={article.image || ''}
                    alt={article.title}
                    fallbackLabel={article.category}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-grow flex-col p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1870FF]">
                      {article.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{article.date}</span>
                    <span className="text-xs font-semibold text-slate-400">• {article.source}</span>
                  </div>
                  <h3 className={`${idx === 0 ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} mb-4 font-bold leading-tight text-[#102A56] transition-colors group-hover:text-[#1870FF]`}>
                    {article.title}
                  </h3>
                  {article.excerpt && <p className="mb-6 line-clamp-3 flex-grow text-sm text-slate-600">{article.excerpt}</p>}
                  <div className="mt-auto border-t border-slate-100 pt-4">
                    <span className="inline-flex items-center text-sm font-bold text-[#1870FF] group-hover:text-[#1059D4]">
                      Read Story <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press article modal */}
      <AnimatePresence>
        {selectedSpotlightArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 9999 }}>
            <div className="absolute inset-0 bg-[#102A56]/80 backdrop-blur-sm transition-opacity" onClick={() => setSelectedSpotlightArticle(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl md:rounded-3xl"
            >
              <button
                onClick={() => setSelectedSpotlightArticle(null)}
                className="absolute right-4 top-4 z-20 cursor-pointer rounded-full bg-slate-100 p-2 transition-colors hover:bg-slate-200 md:right-6 md:top-6"
              >
                <X className="h-6 w-6 text-slate-600" />
              </button>
              <div className="flex-grow p-6 md:p-10">
                <div className="mb-6 flex flex-wrap items-center gap-3 pr-12">
                  <span className="rounded border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1870FF] md:text-xs">{selectedSpotlightArticle.category}</span>
                  <span className="text-xs font-semibold text-slate-500 md:text-sm">{selectedSpotlightArticle.date}</span>
                  <span className="text-xs font-semibold text-slate-400 md:text-sm">• {selectedSpotlightArticle.source}</span>
                </div>
                <h2 className="mb-8 text-2xl font-extrabold leading-tight text-[#102A56] md:text-4xl lg:text-5xl">{selectedSpotlightArticle.title}</h2>
                {selectedSpotlightArticle.image && (
                  <div className="mb-8 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
                    <ImageWithFallback src={selectedSpotlightArticle.image} alt={selectedSpotlightArticle.title} fallbackLabel={selectedSpotlightArticle.category} className="h-auto max-h-[60vh] w-full object-cover" />
                  </div>
                )}
                {selectedSpotlightArticle.excerpt && (
                  <p className="mb-10 rounded-r-xl border-l-4 border-[#1870FF] bg-blue-50/30 py-4 pl-6 text-lg font-medium leading-relaxed text-slate-700 md:text-xl">
                    {selectedSpotlightArticle.excerpt}
                  </p>
                )}
                <div className="mt-auto flex justify-center border-t border-slate-100 pt-8 md:justify-start">
                  <a
                    href={selectedSpotlightArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1870FF] px-8 py-4 font-bold text-white shadow-md transition-all hover:bg-[#1059D4] hover:shadow-lg md:w-auto"
                  >
                    <span>Read Full Article on INN Indonesia</span>
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Article modal for posts from the admin area */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 cursor-pointer bg-[#0B1220]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden overflow-y-auto rounded-[28px] bg-white shadow-2xl"
            >
              <div className="absolute right-4 top-4 z-20">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/80 text-slate-500 backdrop-blur-md transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {selectedArticle.cover_image && (
                <div className="h-64 w-full bg-slate-100">
                  <ImageWithFallback src={selectedArticle.cover_image} alt="Cover" fallbackLabel={selectedArticle.category} className="h-full w-full object-cover" />
                </div>
              )}

              <div className="border-b border-slate-100 px-8 py-8">
                <span className="mb-4 inline-block rounded-lg bg-blue-100/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#1870FF]">
                  {selectedArticle.category}
                </span>
                <h3 className="text-xl font-black leading-tight text-slate-800 sm:text-2xl">{selectedArticle.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                  {(selectedArticle.source || selectedArticle.author) && (
                    <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" /> {selectedArticle.source || selectedArticle.author}</span>
                  )}
                  {selectedArticle.published_at && (
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(selectedArticle.published_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {selectedArticle.content ? (
                  <div className="prose prose-slate max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-600">{selectedArticle.content}</p>
                  </div>
                ) : (
                  <p className="italic text-slate-500">Konten artikel tidak tersedia.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
