import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { promoDaysLeft } from '../../utils/promo';

interface PromoSlideProps {
  /** Closes the whole pop-up. */
  onClose: () => void;
  /** Opens the registration form. */
  onRegister: () => void;
}

/** The registration fee promo as one slide of the opening pop-up. */
export const PromoSlide: React.FC<PromoSlideProps> = ({ onClose, onRegister }) => {
  const { t } = useLanguage();
  const daysLeft = promoDaysLeft() ?? 0;

  const register = () => {
    onClose();
    onRegister();
  };
  const join = () => {
    onClose();
    openSpiWhatsApp(t('promo.wa_message'));
  };

  return (
    <>
      {/* Coupon header: logo, price, and the panda, with ticket notches along the bottom edge */}
      <div className="relative overflow-hidden bg-[#1870FF] px-6 pb-12 pt-6 text-white sm:px-8">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          aria-hidden="true"
        />
        <span className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
        <span className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[#0F56D1]/60" aria-hidden="true" />

        <div className="relative flex items-center gap-3 pr-12">
          <span className="inline-flex shrink-0 items-center rounded-xl bg-white px-3 py-2 shadow-[0_12px_24px_-12px_rgba(2,18,70,0.6)]">
            <img src={ASSETS.brand.logoHeader} alt="Sekolah Programming Indonesia" className="h-6 w-auto sm:h-7" />
          </span>
          <span className="rounded-md bg-[#FFC928] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#041A5A]">{t('promo.badge')}</span>
        </div>

        <div className="relative mt-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-100">{t('promo.before')}</p>
            <p className="text-lg font-bold text-blue-100 line-through decoration-2">Rp 350.000</p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-blue-100">{t('promo.now')}</p>
            <p className="whitespace-nowrap text-5xl font-black leading-none tracking-tight">Rp 100.000</p>
            <span className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{t('promo.save')}</span>
          </div>
          <img
            src={ASSETS.brand.pandaMascot}
            alt=""
            className="spi-anim-float pointer-events-none absolute bottom-2 right-0 h-auto w-28 object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.3)] sm:w-32"
          />
        </div>

        <span className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-white" aria-hidden="true" />
        <span className="absolute -bottom-3 -right-3 h-6 w-6 rounded-full bg-white" aria-hidden="true" />
      </div>

      <div className="space-y-4 px-6 pb-6 pt-7 sm:px-8">
        <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1870FF] sm:text-xs">
          <span className="h-[3px] w-5 rounded-full bg-[#1870FF]" aria-hidden="true" />
          {t('promo.eyebrow')}
        </p>
        <h2 id="promo-popup-title" className="text-3xl font-black leading-[1.08] tracking-tight text-[#041A5A] sm:text-4xl">
          {t('promo.title')}
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A] sm:text-sm">
            {daysLeft === 0 ? t('promo.today') : `${daysLeft} ${t('promo.days_unit')}`}
          </span>
          <span className="text-sm font-semibold text-[#041A5A]">{t('promo.valid')}</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-500">{t('promo.terms')}</p>
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6 sm:px-8">
        <button
          type="button"
          onClick={register}
          className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#1870FF] px-6 font-bold text-white shadow-[0_18px_36px_-16px_rgba(24,112,255,0.85)] transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
        >
          {t('promo.claim')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={join}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-[#1870FF] px-6 font-bold text-[#1870FF] transition-colors hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {t('promo.wa')}
        </button>
      </div>
    </>
  );
};
