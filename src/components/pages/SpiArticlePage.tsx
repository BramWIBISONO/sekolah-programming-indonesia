import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { SPI_ARTICLES, getArticle } from '../../data/spiArticles';

interface SpiArticlePageProps {
  slug: string;
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate: (path: string) => void;
}

/** One article from the SPI team, with a call to action and links to the other articles. */
export const SpiArticlePage: React.FC<SpiArticlePageProps> = ({ slug, onBack, onOpenTrial, onNavigate }) => {
  const { t } = useLanguage();
  const article = getArticle(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article) return;
    const previous = document.title;
    document.title = `${article.title} | Sekolah Programming Indonesia`;
    return () => { document.title = previous; };
  }, [article?.slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-28 pb-20 text-center px-4">
        <p className="text-lg text-slate-600">{t('article.notfound')}</p>
        <button type="button" onClick={onBack} className="mt-6 inline-flex items-center gap-2 font-bold text-[#1870FF] cursor-pointer">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t('article.back')}
        </button>
      </div>
    );
  }

  const others = SPI_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pt-24 sm:pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#1870FF] cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {t('article.back')}
        </button>

        <header className="mt-8 space-y-5">
          <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-[#1870FF]">
            <span className="w-6 h-[3px] rounded-full bg-[#1870FF]" aria-hidden="true" />
            {article.category}
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-[#041A5A] tracking-tight leading-[1.1] text-balance">{article.title}</h1>
          <p className="text-lg text-slate-600 leading-relaxed">{article.excerpt}</p>
          <p className="text-xs font-semibold text-slate-400">{t('article.note')}</p>
        </header>

        <article className="mt-12 space-y-10">
          {article.sections.map((section, i) => (
            <section key={i} className="space-y-4">
              {section.heading && <h2 className="text-xl sm:text-2xl font-black text-[#041A5A]">{section.heading}</h2>}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-base sm:text-[17px] text-slate-700 leading-relaxed">{p}</p>
              ))}
              {section.bullets && (
                <ul className="list-disc pl-5 space-y-2 text-base sm:text-[17px] text-slate-700 leading-relaxed marker:text-[#1870FF]">
                  {section.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {article.source && (
          <p className="mt-10 text-sm text-slate-500">
            <a
              href={article.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#1870FF] hover:text-[#0B3C95] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {article.source.label}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </p>
        )}

        <section className="relative mt-16 overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-7 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{t('article.cta_title')}</h2>
          <p className="mt-3 text-base text-blue-50/90 leading-relaxed">{t('article.cta_desc')}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onOpenTrial}
              className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t('cta.free_trial')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => openSpiWhatsApp(t('article.wa_message'))}
              className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('article.cta_wa')}
            </button>
          </div>
        </section>

        {others.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-black text-[#041A5A]">{t('article.more')}</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((a) => (
                <li key={a.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/artikel/${a.slug}`)}
                    className="group w-full text-left rounded-[22px] border border-[#E3ECFA] bg-white p-5 hover:border-[#1870FF]/40 hover:shadow-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    <span className="block text-[11px] font-black uppercase tracking-widest text-[#1870FF]">{a.category}</span>
                    <span className="mt-2 block text-base font-black text-[#041A5A] group-hover:text-[#1870FF]">{a.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
