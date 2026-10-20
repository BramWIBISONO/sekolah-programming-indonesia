import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Search, FlaskConical, Download, Calendar, Cpu, Sparkles, Lightbulb, Rocket, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '../../i18n';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';

interface JournalPageProps {
  onBack: () => void;
}

/** Loop length (s) of the "paper being written" animation in the hero. */
const WRITE_LOOP = 7;

/**
 * A research paper writing itself: title, author, abstract lines and a growing chart, then a
 * "coming soon" stamp. Loops gently; shows the finished paper under reduced motion.
 */
const PaperIllustration: React.FC<{ reduce: boolean }> = ({ reduce }) => {
  const { t } = useLanguage();
  const loop = (delay: number, extra: object = {}) =>
    reduce
      ? {}
      : { transition: { duration: 0.6, delay, repeat: Infinity, repeatDelay: WRITE_LOOP - 0.6, ease: 'easeOut' as const, ...extra } };
  const lines = [100, 92, 96, 70];

  return (
    <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-[#DCEBFF] to-[#C9DDFF]" role="img" aria-label={t('journal.hero.art_label')}>
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />
      {/* papers behind */}
      <span className="absolute left-[22%] top-[12%] w-[52%] h-[80%] rounded-2xl bg-white/60 rotate-[8deg]" aria-hidden="true" />
      <span className="absolute left-[20%] top-[10%] w-[52%] h-[80%] rounded-2xl bg-white/80 rotate-[4deg]" aria-hidden="true" />

      {/* the paper */}
      <div className="absolute left-[18%] top-[8%] w-[54%] h-[84%] rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(4,26,90,0.6)] -rotate-2 p-[5%] flex flex-col gap-[4%]" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1870FF]">{t('journal.hero.paper_label')}</span>
          <span className="w-5 h-5 rounded-full bg-[#EEF4FF] flex items-center justify-center"><BookOpen className="w-3 h-3 text-[#1870FF]" /></span>
        </div>
        <motion.p
          className="text-[13px] sm:text-base font-black text-[#041A5A] leading-tight origin-left"
          initial={reduce ? false : { opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          {...loop(0.2)}
        >
          {t('journal.hero.paper_title')}
        </motion.p>
        <motion.span
          className="flex items-center gap-1.5"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          {...loop(0.6)}
        >
          <span className="w-4 h-4 rounded-full bg-[#FFC928]" />
          <span className="text-[9px] sm:text-[11px] font-bold text-slate-500">{t('journal.hero.paper_author')}</span>
        </motion.span>
        <span className="flex flex-col gap-[6px]">
          {lines.map((w, i) => (
            <motion.span
              key={i}
              className="block h-[5px] sm:h-[6px] rounded-full bg-[#DCE6F7] origin-left"
              style={{ width: `${w}%` }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              {...loop(0.9 + i * 0.25)}
            />
          ))}
        </span>
        {/* figure: bars grow, a trend line draws over them */}
        <span className="relative mt-auto h-[34%] rounded-xl bg-[#F3F7FF] flex items-end gap-[6%] px-[8%] pb-[8%]">
          {[40, 62, 50, 84].map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-md bg-[#1870FF] origin-bottom"
              style={{ height: `${h}%`, opacity: 0.55 + i * 0.15 }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              {...loop(2 + i * 0.15)}
            />
          ))}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            <motion.path
              d="M8 48 L32 34 L56 40 L88 12"
              stroke="#FFC928"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              {...loop(2.8, { duration: 0.8 })}
            />
          </svg>
        </span>
      </div>

      {/* "coming soon" stamp */}
      <motion.span
        className="absolute right-[8%] bottom-[12%] w-[26%] aspect-square rounded-full border-[3px] border-dashed border-[#1870FF] bg-white/90 flex items-center justify-center text-center rotate-[-12deg] shadow-[0_18px_36px_-18px_rgba(24,112,255,0.8)]"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        {...(reduce ? {} : { transition: { duration: 0.5, ease: 'backOut', delay: 3.6, repeat: Infinity, repeatDelay: WRITE_LOOP - 0.5 } })}
        aria-hidden="true"
      >
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#1870FF] leading-tight px-2">{t('journal.hero.stamp')}</span>
      </motion.span>

      {/* floating tools of research */}
      {[
        { Icon: FlaskConical, cls: 'left-[5%] top-[18%]', d: 0 },
        { Icon: Cpu, cls: 'left-[7%] bottom-[16%]', d: 0.8 },
        { Icon: Lightbulb, cls: 'right-[9%] top-[12%]', d: 1.6 },
        { Icon: Sparkles, cls: 'right-[20%] top-[40%]', d: 2.4 },
      ].map(({ Icon, cls, d }) => (
        <span key={cls} className={`absolute ${cls}`} aria-hidden="true">
          <span className="spi-anim-bob flex w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white text-[#1870FF] items-center justify-center shadow-[0_12px_24px_-12px_rgba(4,26,90,0.5)]" style={{ animationDelay: `${d}s` }}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
        </span>
      ))}
    </div>
  );
};

const OWN_STEPS: { n: number; icon: SpiIconName }[] = [
  { n: 1, icon: 'curiosity' },
  { n: 2, icon: 'build' },
  { n: 3, icon: 'curriculum' },
  { n: 4, icon: 'grad' },
];

export const JournalPage: React.FC<JournalPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua Volume');
  const [isLoading, setIsLoading] = useState(true);
  const reduce = !!useReducedMotion();

  useEffect(() => {
    fetch('/api/journal?status=published')
      .then(res => (res.ok ? res.json() : []))
      .then(data => setArticles(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error(error);
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const categories = ['Semua Volume', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = articles.filter(a => {
    const matchCategory = activeCategory === 'Semua Volume' || a.category === activeCategory;
    const matchSearch = (a.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (a.abstract || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#1870FF] selection:text-white">
      {/* Hero: the same illustrated hero as the SPI Core page */}
      <IllustratedHero
        variant="achievement"
        eyebrow={t('journal.eyebrow')}
        title={t('nav.journal')}
        description={t('journal.hero.desc')}
        artSlot={<PaperIllustration reduce={reduce} />}
        primary={{ label: t('acara.wa'), onClick: () => openSpiWhatsApp(t('acara.wa_message')) }}
        onBack={onBack}
        backLabel={t('lab.back')}
        bottomFill="#FFFFFF"
        footnote={
          <span className="inline-flex items-center gap-2.5 rounded-full bg-[#041A5A] text-white pl-2 pr-4 py-1.5 text-sm font-bold">
            <span className="relative flex w-2.5 h-2.5 ml-1" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-[#FFC928] spi-anim-ping" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-[#FFC928]" />
            </span>
            {t('journal.soon.status')}
          </span>
        }
      />

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">

        {/* Search & Filter Bar */}
        {articles.length > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari jurnal publikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#1870FF]/20 focus:border-[#1870FF] text-sm transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex-shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-50 border-blue-200 text-[#1870FF]'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-[#1870FF] hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        )}

        {isLoading ? (
          <div role="status" aria-label={t('journal.loading')} className="mx-auto max-w-xl space-y-5 py-12 animate-pulse">
            <span className="sr-only">{t('journal.loading')}</span>
            <div className="mx-auto h-20 w-20 rounded-2xl bg-blue-50" />
            <div className="mx-auto h-6 w-2/3 rounded-lg bg-slate-100" />
            <div className="mx-auto h-4 w-full rounded-lg bg-slate-100" />
            <div className="mx-auto h-4 w-4/5 rounded-lg bg-slate-100" />
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1870FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {article.category || 'Journal'}
                    </span>
                    {article.year && (
                      <span className="inline-block bg-blue-50 text-[#1870FF] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Vol {article.volume || '-'} • {article.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-[#1870FF] transition-colors">
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
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1870FF] hover:text-[#1059D4] cursor-pointer"
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
          /* Coming soon: research orbiting into the journal, an "in progress" bar and a way to be notified */
          <section className="relative overflow-hidden py-6 sm:py-10 text-center">
            <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EEF4FF] blur-3xl" aria-hidden="true" />
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
              <div className="relative flex h-56 w-56 items-center justify-center" aria-hidden="true">
                <span className="absolute inset-0 rounded-full border border-dashed border-[#A9C9FF]" />
                <span className="absolute inset-8 rounded-full border border-[#DCEBFF]" />
                {!reduce && <span className="absolute inset-14 rounded-full bg-[#1870FF]/10 spi-anim-ping" />}
                {/* icons travel round the outer ring, staying upright */}
                <motion.div
                  className="absolute inset-0"
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                  {[
                    { Icon: FlaskConical, pos: 'left-1/2 -top-5 -translate-x-1/2' },
                    { Icon: Cpu, pos: '-right-5 top-1/2 -translate-y-1/2' },
                    { Icon: Rocket, pos: 'left-1/2 -bottom-5 -translate-x-1/2' },
                    { Icon: Lightbulb, pos: '-left-5 top-1/2 -translate-y-1/2' },
                  ].map(({ Icon, pos }) => (
                    <span key={pos} className={`absolute ${pos}`}>
                      <motion.span
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1870FF] shadow-[0_8px_20px_-12px_rgba(4,26,90,0.45)]"
                        animate={reduce ? undefined : { rotate: -360 }}
                        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.span>
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1870FF] text-white shadow-[0_18px_36px_-18px_rgba(24,112,255,0.8)]"
                  animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <BookOpen className="h-11 w-11" />
                </motion.div>
                <Sparkles className="absolute right-8 top-6 h-6 w-6 text-[#E2A900] spi-anim-twinkle" />
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-[#041A5A] text-balance">{t('journal.empty.title')}</h2>
                <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">{t('journal.empty.desc')}</p>
              </div>

              {/* in progress */}
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#041A5A] mb-2">
                  <span>{t('journal.soon.status')}</span>
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#1870FF]"
                        animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                </div>
                <div className="relative h-2.5 rounded-full bg-[#E3ECFA] overflow-hidden" aria-hidden="true">
                  {reduce ? (
                    <span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-[#1870FF]" />
                  ) : (
                    <motion.span
                      className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-[#1870FF]/0 via-[#1870FF] to-[#1870FF]/0"
                      animate={{ left: ['-50%', '100%'] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openSpiWhatsApp(t('journal.soon.wa_message'))}
                  className="inline-flex justify-center items-center gap-2 h-12 px-6 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm rounded-xl shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('journal.soon.notify')}
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="h-12 px-6 bg-white border border-[#DCE7F5] text-[#041A5A] font-bold text-sm rounded-xl hover:bg-blue-50 hover:border-[#1870FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  {t('lab.back')}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Your own paper through SPI */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[32px] bg-[#1870FF] text-white px-5 py-10 sm:px-10 sm:py-14 shadow-[0_40px_80px_-40px_rgba(24,112,255,0.75)]">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            aria-hidden="true"
          />
          <div className="absolute -right-40 -top-40 w-[560px] h-[560px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/85">
                <span className="w-6 h-[3px] rounded-full bg-white/70" aria-hidden="true" />
                {t('journal.own.eyebrow')}
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-balance">{t('journal.own.title')}</h2>
              <p className="text-base sm:text-lg text-blue-50/90 leading-relaxed">{t('journal.own.desc')}</p>
              <ul className="flex flex-wrap gap-2">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3.5 py-1.5 text-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#FFC928]" aria-hidden="true" />
                    {t(`journal.own.v${n}`)}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => openSpiWhatsApp(t('journal.own.wa_message'))}
                className="group inline-flex justify-center items-center gap-2 h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
              >
                {t('journal.own.cta')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>

            {/* idea → innovation → paper → legacy */}
            <ol className="lg:col-span-7 relative grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OWN_STEPS.map(({ n, icon }, i) => (
                <motion.li
                  key={n}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-[22px] bg-white text-[#041A5A] p-5 shadow-[0_24px_50px_-30px_rgba(2,18,70,0.7)] ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-14 h-14 rounded-2xl bg-[#EEF4FF] flex items-center justify-center">
                      <SpiIcon name={icon} size={40} animate="always" />
                    </span>
                    <span className="text-3xl font-black text-[#EEF4FF] tabular-nums" aria-hidden="true">{String(n).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-black">{t(`journal.own.step${n}.title`)}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{t(`journal.own.step${n}.desc`)}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};
