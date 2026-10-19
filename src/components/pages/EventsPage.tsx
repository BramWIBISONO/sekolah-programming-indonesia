import React, { useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { asset } from '../../constants/assets';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';
import { IllustratedHero } from '../illustrations/IllustratedHero';
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

const dayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Shows how far away an event is, or that it is running now. */
const useTiming = (event: SpiEvent) => {
  const { t } = useLanguage();
  const today = dayStart();
  const start = toDate(event.date);
  const end = toDate(event.endDate ?? event.date);
  if (today >= start && today <= end) return { kind: 'ongoing' as const, label: t('acara.ongoing') };
  const days = Math.round((start.getTime() - today.getTime()) / 86400000);
  return { kind: 'soon' as const, label: `${days} ${t('acara.days_unit')}` };
};

/** The next event, large, with its poster. This is the first thing on the page. */
const FeaturedEvent: React.FC<{ event: SpiEvent; onNavigate: (path: string) => void }> = ({ event, onNavigate }) => {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const timing = useTiming(event);
  const reduce = !!useReducedMotion();

  const start = toDate(event.date);
  const end = event.endDate ? toDate(event.endDate) : null;
  const dateLine = end
    ? `${start.toLocaleDateString(locale, { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}`
    : start.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-[#1870FF] p-5 text-white shadow-[0_30px_60px_-30px_rgba(24,112,255,0.7)] sm:p-8 lg:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]">
        {event.poster ? (
          <img
            src={asset(event.poster)}
            alt={event.title[lang]}
            width={900}
            height={1350}
            className="mx-auto aspect-[2/3] w-full max-w-[260px] rounded-2xl bg-white object-contain shadow-[0_24px_40px_-18px_rgba(0,0,0,0.6)] md:max-w-none"
          />
        ) : (
          // Shown until a flyer exists. Set `poster` on the event in src/data/spiEvents.ts to replace it.
          <div className="mx-auto w-full max-w-[260px] rounded-2xl bg-white p-4 shadow-[0_24px_40px_-18px_rgba(0,0,0,0.6)] md:max-w-none" aria-hidden="true">
            <AILiteracyArt className="block h-auto w-full" animate={!reduce} />
          </div>
        )}

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE38A] px-3 py-1 text-xs font-black uppercase tracking-wider text-[#041A5A]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t('acara.featured')}
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur">{timing.label}</span>
          </div>

          <h2 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl">{event.title[lang]}</h2>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-white/90">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#FFE38A]" aria-hidden="true" />
              {dateLine}
              {event.time ? ` · ${event.time}` : ''}
            </span>
            {event.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FFE38A]" aria-hidden="true" />
                {event.location}
              </span>
            )}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">{event.description[lang]}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {event.registerPath && (
              <button
                type="button"
                onClick={() => onNavigate(event.registerPath as string)}
                className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl bg-white px-6 text-sm font-black text-[#041A5A] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              >
                {event.registerLabel ? event.registerLabel[lang] : t('acara.register')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={() => openSpiWhatsApp(t('acara.wa_message'))}
              className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl border border-white/40 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('acara.wa')}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

/** A compact event card for the rest of the list. */
const EventCard: React.FC<{ event: SpiEvent; isUpcoming: boolean; onNavigate: (path: string) => void }> = ({ event, isUpcoming, onNavigate }) => {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const date = toDate(event.date);

  return (
    <li className="flex flex-col gap-5 rounded-2xl border border-[#E4ECF8] bg-white p-5 sm:flex-row sm:items-start sm:p-7">
      {event.poster ? (
        <img
          src={asset(event.poster)}
          alt={event.title[lang]}
          loading="lazy"
          decoding="async"
          width={900}
          height={1350}
          className="aspect-[2/3] w-full rounded-xl bg-[#EAF2FF] object-contain sm:w-36 sm:shrink-0"
        />
      ) : (
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#041A5A] text-white">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FFE38A]">{date.toLocaleDateString(locale, { month: 'short' })}</span>
          <span className="text-3xl font-black leading-none">{date.getDate()}</span>
          <span className="mt-1 text-[11px] font-semibold text-blue-100/80">{date.getFullYear()}</span>
        </div>
      )}

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
              {event.registerLabel ? event.registerLabel[lang] : t('acara.register')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
          {event.link ? (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE7FB] px-5 text-sm font-bold text-[#041A5A] transition-colors hover:border-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {t('acara.more')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => openSpiWhatsApp(t('acara.wa_message'))}
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCE7FB] px-5 text-sm font-bold text-[#041A5A] transition-colors hover:border-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
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

/** "Acara": the next event first, then the rest, then past events. Data lives in src/data/spiEvents.ts. */
export const EventsPage: React.FC<EventsPageProps> = ({ onBack, onOpenTrial, onNavigate }) => {
  const { t, lang } = useLanguage();
  const reduce = !!useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const today = dayStart();
  const endOf = (e: SpiEvent) => toDate(e.endDate ?? e.date);
  const sorted = [...SPI_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  // Events marked featured come first; the rest keep date order.
  const upcoming = sorted
    .filter((e) => endOf(e) >= today)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const past = sorted.filter((e) => endOf(e) < today).reverse();
  const [featured, ...others] = upcoming;

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-20 text-[#0B1220]">
      {/* Same illustrated hero as the SPI Core and AI Literacy pages */}
      <IllustratedHero
        variant="partnership"
        eyebrow={t('acara.eyebrow')}
        title={t('acara.title')}
        description={t('acara.desc')}
        artSlot={<AILiteracyArt className="block h-auto w-full" animate={!reduce} />}
        primary={{ label: t('acara.wa'), onClick: () => openSpiWhatsApp(t('acara.wa_message')) }}
        secondary={{ label: t('cta.free_trial'), onClick: onOpenTrial }}
        onBack={onBack}
        backLabel={t('lab.back')}
        bottomFill="#F4F8FF"
      />

      <div className="mx-auto mt-10 max-w-5xl space-y-12 px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="acara-upcoming" className="space-y-8">
          <h2 id="acara-upcoming" className="sr-only">
            {t('acara.upcoming')}
          </h2>

          {featured ? (
            <FeaturedEvent event={featured} onNavigate={onNavigate} />
          ) : (
            <div className="rounded-2xl border border-dashed border-[#C9DAF7] bg-white p-8 text-center">
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

          {others.length > 0 && (
            <div>
              <h3 className="text-xl font-black text-[#041A5A]">{t('acara.more_upcoming')}</h3>
              <ul className="mt-5 space-y-4">
                {others.map((e) => (
                  <EventCard key={e.id} event={e} isUpcoming onNavigate={onNavigate} />
                ))}
              </ul>
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
