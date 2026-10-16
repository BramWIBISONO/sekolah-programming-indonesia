import type { TriText } from '../i18n/translations/sections';

/**
 * Events from SPI, shown on the Acara page. Add an entry once a date is confirmed.
 * `date` is YYYY-MM-DD. Leave out `location` or `link` until they are confirmed; the page hides what is missing.
 * Only facts that SPI already publishes belong here.
 */
export interface SpiEvent {
  id: string;
  date: string;
  title: TriText;
  description: TriText;
  location?: string;
  /** Page with full details or a registration form. When missing, the card links to WhatsApp instead. */
  link?: string;
}

export const SPI_EVENTS: SpiEvent[] = [
  {
    id: 'ai-literacy-kickoff-2026',
    date: '2026-10-28',
    title: {
      id: 'Pembukaan Gerakan AI Literacy Indonesia',
      en: 'Opening of the AI Literacy Indonesia movement',
      zh: 'AI Literacy Indonesia 运动启动',
    },
    description: {
      id: 'Gerakan AI Literacy dibuka bertepatan dengan Hari Sumpah Pemuda. Sekolah dan komunitas bisa menghubungi SPI mulai sekarang.',
      en: 'The AI Literacy movement opens on Youth Pledge Day. Schools and communities can contact SPI starting now.',
      zh: 'AI Literacy 运动将在印尼青年宣誓日启动。学校和社区现在即可联系 SPI。',
    },
  },
];
