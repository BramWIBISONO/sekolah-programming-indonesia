import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { SPI_EVENTS, type SpiEvent } from '../../data/spiEvents';
import { openSpiWhatsApp } from '../../utils/whatsapp';

interface EventsPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
  onNavigate: (path: string) => void;
}

/** Local calendar date from YYYY-MM-DD. `new Date(string)` would read it as UTC and can shift the day. */
const toDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

/** "Acara": upcoming and past events from SPI, listed by date. Data lives in src/data/spiEvents.ts. */
export const EventsPage: React.FC<EventsPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t, lang } = useLanguage();
  const locale = lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'id-ID';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sorted = [...SPI_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => toDate(e.date) >= today);
  const past = sorted.filter((e) => toDate(e.date) < today).reverse();

  const renderEvent = (event: SpiEvent, isUpcoming: boolean) => {
    const date = toDate(event.date);
    return (
      <li key={event.id} className="flex flex-col gap-5 rounded-2xl border border-[#E4ECF8] bg-white p-5 sm:flex-row sm:items-start sm:p-7">
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#041A5A] text-white">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FFE38A]">
            {date.toLocaleDateString(locale, { month: 'short' })}
          </span>
          <span className="text-3xl font-black leading-none">{date.getDate()}</span>
          <span className="mt-1 text-[11px] font-semibold text-blue-100/80">{date.getFullYear()}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-[#1870FF]" aria-hidden="true" />
            {date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
            {event.time ? ` · ${event.time}` : ''}
          </p>
          <h3 className="mt-2 text-xl font-black leading-snug text-[#041A5A] sm:text-2xl">{event.title[lang]}</h3>
          {event.location && (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-600">
              <MapPin className="h-4 w-4 text-[#1870FF]" aria-hidden="true" />
              {event.location}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{event.description[lang]}</p>
        </div>

        {isUpcoming && (
          <div className="flex flex-col gap-2 sm:w-56 sm:shrink-0">
            {event.registerPath && (
              <button
                type="button"
                onClick={() => onNavigate(event.registerPath as string)}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1870FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                {t('acara.register')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            {event.link ? (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#1870FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                {t('acara.more')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openSpiWhatsApp(t('acara.wa_message'))}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-[#DCE7FB] px-5 text-sm font-bold text-[#041A5A] transition-colors hover:border-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <MessageCircle className="h-4 w-4 text-[#1870FF]" aria-hidden="true" />
                {t('acara.wa')}
              </button>
            )}
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20 text-[#0B1220]">
      <section className="pb-10 pt-28 sm:pb-14 sm:pt-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 rounded text-sm font-bold text-slate-500 hover:text-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('lab.back')}
          </button>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-[#1870FF] sm:text-sm">{t('acara.eyebrow')}</p>
          <h1 className="mt-3 text-3xl font-black leading-[1.1] tracking-tight text-[#041A5A] sm:text-5xl">{t('acara.title')}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{t('acara.desc')}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="acara-upcoming">
          <h2 id="acara-upcoming" className="text-xl font-black text-[#041A5A]">
            {t('acara.upcoming')}
          </h2>
          {upcoming.length > 0 ? (
            <ul className="mt-5 space-y-4">{upcoming.map((e) => renderEvent(e, true))}</ul>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#C9DAF7] bg-[#F7FAFF] p-8 text-center">
              <p className="mx-auto max-w-xl leading-relaxed text-slate-600">{t('acara.empty')}</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openSpiWhatsApp(t('acara.wa_message'))}
                  className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCE7FB] px-5 text-sm font-bold text-[#041A5A] hover:border-[#1870FF]"
                >
                  <MessageCircle className="h-4 w-4 text-[#1870FF]" aria-hidden="true" />
                  {t('acara.wa')}
                </button>
                <button
                  type="button"
                  onClick={onOpenTrial}
                  className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1870FF] px-5 text-sm font-bold text-white hover:bg-[#1059D4]"
                >
                  {t('cta.free_trial')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section aria-labelledby="acara-past">
            <h2 id="acara-past" className="text-xl font-black text-[#041A5A]">
              {t('acara.past')}
            </h2>
            <ul className="mt-5 space-y-4">{past.map((e) => renderEvent(e, false))}</ul>
          </section>
        )}
      </div>
    </div>
  );
};
