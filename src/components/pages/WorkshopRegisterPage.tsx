import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, ExternalLink, MapPin, MessageCircle, Monitor } from 'lucide-react';
import { asset } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { SPI_EVENTS } from '../../data/spiEvents';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { DotField3D } from '../illustrations/DotField3D';

interface WorkshopRegisterPageProps {
  onNavigate: (path: string) => void;
}

const WORKSHOP_ID = 'spi-workshop-series-2026';

/** Local calendar date from YYYY-MM-DD. */
const toDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

const localeFor = (lang: string) => (lang === 'zh' ? 'zh-CN' : lang === 'en' ? 'en-US' : 'id-ID');

/** Registration page for SPI Workshop Series 2026. The Google Form is embedded here, not on the events list. */
export const WorkshopRegisterPage: React.FC<WorkshopRegisterPageProps> = ({ onNavigate }) => {
  const { t, lang } = useLanguage();
  const locale = localeFor(lang);
  const event = SPI_EVENTS.find((e) => e.id === WORKSHOP_ID);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!event || !event.formUrl) {
    return (
      <div className="min-h-screen bg-white pb-20 pt-32 text-center text-slate-600">
        <button type="button" onClick={() => onNavigate('/acara')} className="font-bold text-[#1870FF] hover:underline">
          {t('acara.back_to_list')}
        </button>
      </div>
    );
  }

  const start = toDate(event.date);
  const end = toDate(event.endDate ?? event.date);
  const range = `${start.toLocaleDateString(locale, { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}`;

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-20 text-[#0B1220]">
      <header className="relative overflow-hidden bg-[#EAF2FF] pb-20 pt-28 text-[#041A5A] sm:pt-32">
        <DotField3D />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('/acara')}
            className="inline-flex cursor-pointer items-center gap-2 rounded text-sm font-bold text-slate-600 hover:text-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('acara.back_to_list')}
          </button>
          <p className="mt-6 flex w-fit items-center rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#1870FF] shadow-sm">
            Gratis · Online
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl">Daftar {event.title[lang]}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{event.description[lang]}</p>
        </div>
      </header>

      <div className="mx-auto -mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-4 rounded-3xl border border-[#DCE7FB] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(4,26,90,0.45)] sm:p-6 lg:sticky lg:top-24">
            {event.poster && (
              <img
                src={asset(event.poster)}
                alt={event.title[lang]}
                width={900}
                height={1350}
                className="aspect-[2/3] w-full rounded-2xl bg-[#EAF2FF] object-contain"
              />
            )}
            <ul className="space-y-2.5 text-sm font-semibold text-slate-600">
              <li className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
                <span>{range}{event.time ? ` · ${event.time}` : ''}</span>
              </li>
              {event.location && (
                <li className="flex items-start gap-2">
                  <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
                  <span>{event.location}</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
                <span>Tautan Zoom dan informasi keikutsertaan dikirim ke kontak yang didaftarkan.</span>
              </li>
            </ul>

            {event.schedule && event.schedule.length > 0 && (
              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs font-black uppercase tracking-wider text-[#1870FF]">{t('acara.schedule')}</p>
                <ol className="mt-3 space-y-2">
                  {event.schedule.map((item) => (
                    <li key={item.title} className="rounded-xl bg-[#F4F8FF] px-3 py-2.5">
                      <p className="text-sm font-black text-[#041A5A]">{item.title}</p>
                      <p className="text-xs font-semibold text-slate-500">
                        {toDate(item.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' })} · {item.audience}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <button
              type="button"
              onClick={() => openSpiWhatsApp(t('acara.wa_message'))}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#DCE7FB] text-sm font-bold text-[#041A5A] transition-colors hover:border-[#1870FF]"
            >
              <MessageCircle className="h-4 w-4 text-[#1870FF]" aria-hidden="true" />
              {t('acara.wa')}
            </button>
          </aside>

          <section aria-labelledby="workshop-form-title" className="min-w-0 overflow-hidden rounded-3xl border border-[#DCE7FB] bg-white shadow-[0_18px_40px_-28px_rgba(4,26,90,0.45)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
              <h2 id="workshop-form-title" className="text-lg font-black text-[#041A5A]">
                {t('acara.form_title')}
              </h2>
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
              title={t('acara.form_title')}
              className="block h-[1500px] w-full bg-white sm:h-[1250px]"
            />
          </section>
        </div>
      </div>
    </div>
  );
};
