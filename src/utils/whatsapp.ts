import { SPI_CONFIG } from '../constants/config';

/** Opens a WhatsApp chat with SPI, pre-filled with the given message. */
export const openSpiWhatsApp = (message: string) => {
  const url = `https://wa.me/${SPI_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
