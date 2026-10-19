import React, { useEffect } from 'react';
import { Wrench } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { IllustratedHero } from '../illustrations/IllustratedHero';

interface CsrPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
}

/**
 * CSR SPI: the page where SPI's social responsibility activities will be shared.
 * The content is still being prepared, so the page says so and does not describe any activity yet.
 */
export const CsrPage: React.FC<CsrPageProps> = ({ onBack, onNavigate }) => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20 text-[#0B1220]">
      <IllustratedHero
        variant="partnership"
        eyebrow={t('csr.eyebrow')}
        title={t('csr.title')}
        description={t('csr.desc')}
        primary={{ label: t('csr.wa'), onClick: () => openSpiWhatsApp(t('csr.wa_message')) }}
        secondary={{ label: t('csr.partner_link'), onClick: () => onNavigate('/partnership') }}
        onBack={onBack}
        backLabel={t('lab.back')}
      />

      <section className="mx-auto max-w-3xl px-4 pt-14 sm:px-6">
        <div className="rounded-[28px] border border-[#DCE7FB] bg-[#F7FAFF] p-7 sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A]">
            <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
            {t('csr.status')}
          </span>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{t('csr.status_desc')}</p>
        </div>
      </section>
    </div>
  );
};
