import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { asset } from '../../constants/assets';
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

const localeFor = (lang: string) => (lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'id-ID');

interface EventCardProps {
  event: SpiEvent;
  isUpcoming: boolean;
  onNavigate: (path: string) => void;
}

/** One event: poster, facts, schedule, and an optional registration form that opens inside the card. */
const EventCard: React.FC<EventCardProps> = ({ event, isUpcoming, onNavigate }) => {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const [formOpen, setFormOpen] = useState(false);

  const date = toDate(event.date);
  const endDate = event.endDate ? toDate(event.endDate) : null;

  return (
    <li className="overflow-hidden rounded-2xl border border-[#E4ECF8] bg-white">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start sm:p-7">
        {event.poster && (
          <img
            src={asset(event.poster)}
            alt={event.title[lang]}
            loading="lazy"
            decoding="async"
            width={900}
            height={1350}
            className="aspect-[2/3] w-full rounded-xl bg-[#EAF2FF] object-contain sm:w-56 sm:shrink-0"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-500">
            <Calendar className="h-3.5 w-3.5 text-[#1870FF]" aria-hidden="true" />
            {date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
            {endDate && ` – ${endDate.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}`}
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

          {event.schedule && event.schedule.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-black uppercase tracking-wider text-[#1870FF]">{t('acara.schedule')}</p>
              <ol className="mt-2 divide-y divide-[#EEF4FF] rounded-xl border border-[#E4ECF8]">
                {event.schedule.map((item) => (
                  <li key={item.title} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="text-sm font-bold text-[#041A5A]">{item.title}</span>
                    <span className="text-xs font-semibold text-slate-500 sm:text-right">
                      {toDate(item.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' })} · {item.audience}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {isUpcoming && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {event.formUrl && (
                <button
                  type="button"
                  onClick={() => setFormOpen((v) => !v)}
                  aria-expanded={formOpen}
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#1870FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  {formOpen ? t('acara.form_close') : t('acara.form_open')}
                  <ChevronDown className={`h-4 w-4 transition-transform ${formOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
              )}
              {event.registerPath && (
                <button
                  type="button"
                  onClick={() => onNavigate(event.registerPath as string)}
                  className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-[#1870FF] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                >
                  {t('acara.register')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DCE7FB] px-5 text-sm font-bold text-[#041A5A] transition-colors hover:border-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                >
                  {t('acara.more')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {!event.link && (
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
        </div>
      </div>

      {isUpcoming && event.formUrl && formOpen && (
        <div className="border-t border-[#E4ECF8] bg-[#F7FAFF] p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-[#041A5A]">{t('acara.form_title')}</p>
            <a
              href={event.formUrl.replace('/viewform?embedded=true', '/viewform')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded text-sm font-bold text-[#1870FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {t('acara.form_newtab')}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <iframe
            src={event.formUrl}
            title={event.title[lang]}
            loading="lazy"
            className="block h-[1100px] w-full rounded-xl border border-[#DCE7FB] bg-white sm:h-[950px]"
          />
        </div>
      )}
    </li>
  );
};

/** "Acara": upcoming and past events from SPI, listed by date. Data lives in src/data/spiEvents.ts. */
export const EventsPage: React.FC<EventsPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t, lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOf = (e: SpiEvent) => toDate(e.endDate ?? e.date);
  const sorted = [...SPI_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => endOf(e) >= today);
  const past = sorted.filter((e) => endOf(e) < today).reverse();

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
            <ul className="mt-5 space-y-4">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} isUpcoming onNavigate={onNavigate} />
              ))}
            </ul>
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
            <ul className="mt-5 space-y-4">
              {past.map((e) => (
                <EventCard key={e.id} event={e} isUpcoming={false} onNavigate={onNavigate} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
