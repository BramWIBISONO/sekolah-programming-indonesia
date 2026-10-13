import React from 'react';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';

export const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  
  // Clean phone number (remove spaces, +, etc for API)
  const cleanPhone = SPI_CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(SPI_CONFIG.WHATSAPP_PREFILLED_MESSAGE)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#1EBE57] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label={t('wa.label')}
      title={t('wa.label')}
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
        <g transform="translate(7.2 7.2) scale(0.4)" fill="currentColor" stroke="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </g>
      </svg>
    </a>
  );
};
