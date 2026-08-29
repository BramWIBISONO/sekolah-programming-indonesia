import React from 'react';
import { MessageCircle } from 'lucide-react';
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
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE57] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={t('wa.label')}
      title={t('wa.label')}
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};
