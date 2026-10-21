import React, { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import { SpiNetworkMap } from '../common/SpiNetworkMap';
import { SPI_LOCATIONS } from '../../data/locations';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { PartnershipHub2D } from '../illustrations/PartnershipHub2D';
import { AnimatedGridPattern } from '../illustrations/AnimatedGridPattern';
import { SpiIcon, type SpiIconName } from '../illustrations/SpiIcon';
import { SpotlightLayer, useSpotlight } from '../common/Spotlight';

interface PartnershipPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

const PARTNER_MODELS: { key: 'school' | 'corporate' | 'community' | 'strategic'; icon: SpiIconName; image: string }[] = [
  { key: 'school', icon: 'inschool', image: ASSETS.partnership.schoolPartnership },
  { key: 'corporate', icon: 'briefcase', image: ASSETS.partnership.industryPartnership },
  { key: 'community', icon: 'community', image: ASSETS.partnership.communityPartnership },
  { key: 'strategic', icon: 'strategic', image: ASSETS.partnership.strategicPartnership },
];

/** One partnership model tab. Clickable, so it gets a soft pointer light; the light is off on touch and with reduced motion. */
const ModelTab: React.FC<{
  m: (typeof PARTNER_MODELS)[number];
  index: number;
  selected: boolean;
  title: string;
  meta: string;
  setRef: (el: HTMLButtonElement | null) => void;
  onSelect: () => void;
  onKey: (e: React.KeyboardEvent) => void;
}> = ({ m, index, selected, title, meta, setRef, onSelect, onKey }) => {
  const spot = useSpotlight<HTMLButtonElement>();
  return (
    <button
      ref={(el) => {
        spot.ref.current = el;
        setRef(el);
      }}
      type="button"
      role="tab"
      id={`ptab-${m.key}`}
      aria-selected={selected}
      aria-controls="ptab-panel"
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKey}
      onPointerMove={spot.onPointerMove}
      data-index={index}
      className={`group relative overflow-hidden shrink-0 snap-start w-[78%] sm:w-[46%] lg:w-full flex items-center gap-3 rounded-2xl p-3 sm:p-4 text-left border transition-all duration-300 active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 ${
        selected
          ? 'bg-[#1870FF] border-[#1870FF] text-white shadow-[0_18px_36px_-18px_rgba(24,112,255,0.9)]'
          : 'bg-white border-[#E3ECFA] text-[#041A5A] hover:border-[#1870FF]/40 hover:bg-[#F7FAFF]'
      }`}
    >
      {!selected && <SpotlightLayer />}
      <span className="relative flex w-full items-center gap-3">
        <span className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${selected ? 'bg-white' : 'bg-[#EEF4FF]'}`}>
          <SpiIcon name={m.icon} size={34} animate={selected ? 'always' : 'hover'} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm sm:text-base font-black leading-tight">{title}</span>
          <span className={`block text-xs mt-0.5 ${selected ? 'text-white/80' : 'text-slate-500'}`}>{meta}</span>
        </span>
        <ArrowRight className={`hidden lg:block w-4 h-4 shrink-0 transition-transform ${selected ? 'text-white translate-x-0.5' : 'text-slate-300 group-hover:text-[#1870FF] group-hover:translate-x-0.5'}`} aria-hidden="true" />
      </span>
    </button>
  );
};

const Eyebrow: React.FC<{ children: React.ReactNode; light?: boolean }> = ({ children, light }) => (
  <p className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest ${light ? 'text-white/85' : 'text-[#1870FF]'}`}>
    <span className={`w-6 h-[3px] rounded-full ${light ? 'bg-white/70' : 'bg-[#1870FF]'}`} aria-hidden="true" />
    {children}
  </p>
);

/** Areas where SPI franchise partnerships are open. Place names are the same in every language. */
const FRANCHISE_AREAS = ['Alam Sutera', 'BSD', 'PIK 1', 'PIK 2', 'Gading Serpong', 'Kemang', 'Bintaro Jaya'];

export const PartnershipPage: React.FC<PartnershipPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const discuss = (modelKey?: string) => {
    const type = modelKey ? t(`ppage.model.${modelKey}.title`) : t('partner.wa_generic');
    openSpiWhatsApp(t('partner.wa_message').replace('{type}', type));
  };
  const mailHref = (modelKey?: string) => {
    const subject = modelKey ? `${t('ppage.mail_subject')} – ${t(`ppage.model.${modelKey}.title`)}` : t('ppage.mail_subject');
    return `mailto:${SPI_CONFIG.INFO_EMAIL}?subject=${encodeURIComponent(subject)}`;
  };

  /** Arrow keys move between the model tabs. */
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (i + keys[e.key] + PARTNER_MODELS.length) % PARTNER_MODELS.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = PARTNER_MODELS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const model = PARTNER_MODELS[active];
  const modelTitle = t(`ppage.model.${model.key}.title`);

  return (
    <div className="min-h-screen bg-white text-[#0B1220] pb-20 selection:bg-[#1870FF] selection:text-white">
      <IllustratedHero
        variant="partnership"
        eyebrow={t('partner.eyebrow')}
        title={t('ppage.title')}
        description={t('ppage.desc')}
        artSlot={
          <PartnershipHub2D
            nodes={PARTNER_MODELS.map((m) => ({ key: m.key, icon: m.icon, label: t(`ppage.short.${m.key}`) }))}
          />
        }
        quiet
        primary={{ label: t('partner.cta_primary'), onClick: () => discuss() }}
        secondary={{ label: t('ppage.email'), onClick: () => { window.location.href = mailHref(); } }}
        onBack={onBack}
        backLabel={t('common.back_home')}
        highlights={PARTNER_MODELS.map((m) => ({ icon: m.icon, label: t(`ppage.short.${m.key}`) }))}
        footnote={
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#041A5A] [overflow-wrap:anywhere]">
            <Mail className="w-4 h-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
            {t('ppage.email_note').replace('{email}', SPI_CONFIG.INFO_EMAIL)}
          </p>
        }
      />

      {/* Partnership models: pick one, see the details */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-8 sm:mb-10">
            <Eyebrow>{t('ppage.models_eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight">{t('ppage.models_title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('ppage.models_desc')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
            <div
              role="tablist"
              aria-label={t('ppage.models_title')}
              className="lg:col-span-4 lg:sticky lg:top-24 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory -mx-4 px-4 lg:mx-0 lg:px-0 pb-1 hide-scrollbar"
            >
              {PARTNER_MODELS.map((m, i) => (
                <ModelTab
                  key={m.key}
                  m={m}
                  index={i}
                  selected={i === active}
                  title={t(`ppage.model.${m.key}.title`)}
                  meta={`${t(`ppage.model.${m.key}.b1`)} · ${t(`ppage.model.${m.key}.b2`)}`}
                  setRef={(el) => { tabRefs.current[i] = el; }}
                  onSelect={() => setActive(i)}
                  onKey={(e) => onTabKey(e, i)}
                />
              ))}
            </div>

            <div
              id="ptab-panel"
              role="tabpanel"
              aria-labelledby={`ptab-${model.key}`}
              className="lg:col-span-8 rounded-[28px] border border-[#E3ECFA] bg-white overflow-hidden shadow-[0_30px_60px_-40px_rgba(4,26,90,0.5)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={model.key}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative bg-[#EEF4FF]">
                    <ImageWithFallback src={model.image} alt={modelTitle} fallbackLabel={modelTitle} className="w-full aspect-[16/10]" />
                  </div>
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-[#041A5A]">{modelTitle}</h3>
                      <p className="text-base text-slate-600 leading-relaxed">{t(`ppage.model.${model.key}.desc`)}</p>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[1, 2, 3, 4].map((n) => (
                        <li key={n} className="flex items-center gap-2 rounded-xl bg-[#F5F9FF] px-3 py-2.5 text-sm font-bold text-[#041A5A]">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
                          {t(`ppage.model.${model.key}.b${n}`)}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => discuss(model.key)}
                        className="group inline-flex justify-center items-center gap-2 h-12 px-6 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-sm shadow-[0_14px_28px_-14px_rgba(24,112,255,0.9)] transition-all duration-200 active:scale-[0.98] active:shadow-[0_8px_16px_-10px_rgba(24,112,255,0.9)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        {t('partner.cta_primary')}
                      </button>
                      <a
                        href={mailHref(model.key)}
                        className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-2xl border border-[#C9DAF7] text-[#041A5A] hover:border-[#1870FF] font-bold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                      >
                        <Mail className="w-4 h-4 text-[#1870FF]" aria-hidden="true" />
                        {t('ppage.email')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* SPI network: map collage of Indonesia */}
      <section className="py-14 sm:py-20 bg-[#F5F9FF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            <Eyebrow>{t('ppage.network.eyebrow')}</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('net.title')}</h2>
            <p className="text-base text-slate-600 leading-relaxed">{t('net.desc').replace('{n}', String(SPI_LOCATIONS.length))}</p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => discuss()}
                className="h-11 px-6 rounded-xl border-2 border-[#1870FF] bg-[#1870FF] text-sm font-black uppercase tracking-wider text-white hover:bg-[#1059D4] hover:border-[#1059D4] transition-all duration-200 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                {t('network.open_cta')}
              </button>
              <a
                href={mailHref()}
                className="inline-flex items-center h-11 px-6 rounded-xl border-2 border-[#041A5A] text-sm font-black uppercase tracking-wider text-[#041A5A] hover:bg-[#1870FF] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                {t('ppage.email')}
              </a>
            </div>
          </div>
          <SpiNetworkMap />
        </div>
      </section>

      {/* Franchise: open areas, with a WhatsApp button */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] border border-[#DCE7FB] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(24,112,255,0.45)] sm:p-10 lg:p-12">
          <AnimatedGridPattern className="text-[#1870FF]" cell={40} glowing={8} />
          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-5">
              <Eyebrow>{t('franchise.eyebrow')}</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight text-balance">{t('franchise.title')}</h2>
              <p className="text-base text-slate-600 leading-relaxed">{t('franchise.desc')}</p>
              <button
                type="button"
                onClick={() => openSpiWhatsApp(t('franchise.wa_message'))}
                className="mt-2 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 text-base font-black text-white shadow-[0_18px_32px_-14px_rgba(37,211,102,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t('franchise.wa')}
              </button>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7" aria-label={t('franchise.title')}>
              {FRANCHISE_AREAS.map((area, i) => (
                <motion.li
                  key={area}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
                  className="group flex items-center gap-3 rounded-2xl border border-[#DCE7FB] bg-[#F7FAFF] px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-[#1870FF] hover:bg-white hover:shadow-[0_16px_30px_-22px_rgba(24,112,255,0.7)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1870FF] text-white shadow-[0_10px_20px_-10px_rgba(24,112,255,0.9)] transition-transform group-hover:scale-110">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-base font-black text-[#041A5A]">{area}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3D renders of SPI schools: complementary visuals next to the open areas */}
          <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <figure className="overflow-hidden rounded-2xl border border-[#DCE7FB] bg-[#F7FAFF] shadow-[0_18px_36px_-28px_rgba(24,112,255,0.6)]">
              <img
                src={ASSETS.partnership.franchiseCity}
                alt={t('franchise.img_city')}
                width={1672}
                height={940}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/3] w-full object-cover"
              />
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-[#DCE7FB] bg-[#F7FAFF] shadow-[0_18px_36px_-28px_rgba(24,112,255,0.6)]">
              <img
                src={ASSETS.partnership.franchiseExterior}
                alt={t('franchise.img_exterior')}
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                className="block aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-[28px] bg-[#1870FF] text-white p-7 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div
            className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
            aria-hidden="true"
          />
          <div className="absolute -right-40 -top-40 w-[520px] h-[520px] [mask-image:radial-gradient(circle,black_10%,transparent_65%)] pointer-events-none" aria-hidden="true">
            <div className="w-full h-full spi-anim-rays" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.14) 0deg 6deg, transparent 6deg 20deg)' }} />
          </div>
          <div className="relative lg:col-span-7 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-balance">{t('ppage.bottom_title')}</h2>
            <p className="text-sm sm:text-base text-blue-50/90 max-w-xl">{t('ppage.bottom_desc')}</p>
            <p className="pt-1 inline-flex items-center gap-2 text-sm font-semibold text-white [overflow-wrap:anywhere]">
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              {SPI_CONFIG.INFO_EMAIL}
            </p>
          </div>
          <div className="relative lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <button
              type="button"
              onClick={() => discuss()}
              className="inline-flex justify-center items-center gap-2 whitespace-nowrap h-12 sm:h-14 px-7 rounded-2xl bg-white text-[#1870FF] hover:bg-blue-50 font-bold shadow-[0_18px_36px_-16px_rgba(2,18,70,0.8)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1870FF]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('ppage.whatsapp')}
            </button>
            <a
              href={mailHref()}
              className="inline-flex justify-center items-center gap-2 whitespace-nowrap h-12 sm:h-14 px-7 rounded-2xl border border-white/60 bg-white/10 hover:bg-white/20 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              {t('ppage.email')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
