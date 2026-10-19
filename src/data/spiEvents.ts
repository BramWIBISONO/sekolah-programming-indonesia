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
  /** Start time shown on the card, such as "19.00 WIB". */
  time?: string;
  /** Internal route of the registration page. When set, the card shows a registration button. */
  registerPath?: string;
  /** Text on the registration button. Defaults to the AI Literacy label. */
  registerLabel?: TriText;
  /** Page with full details or a registration form. When missing, the card links to WhatsApp instead. */
  link?: string;
  /** Last day of a multi-day series. The event stays upcoming until this day has passed. */
  endDate?: string;
  /** Poster under /public/assets, shown on the card. */
  poster?: string;
  /** Sessions of a series, listed on the card. Only what the poster states. */
  schedule?: { date: string; title: string; audience: string }[];
  /** Google Form, embedded on the registration page of the event. */
  formUrl?: string;
}

export const SPI_EVENTS: SpiEvent[] = [
  {
    id: 'ai-literacy-kickoff-2026',
    date: '2026-10-28',
    location: 'Online',
    time: '19.00 WIB',
    registerPath: '/ai-literacy/daftar',
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
  {
    id: 'spi-workshop-series-2026',
    date: '2026-10-20',
    endDate: '2026-10-30',
    location: 'Online via Zoom Meeting',
    time: '19.00 WIB',
    poster: 'assets/events/spi-workshop-series-2026.webp',
    registerPath: '/acara/workshop-series-2026/daftar',
    registerLabel: { id: 'Daftar workshop', en: 'Register for the workshop', zh: '报名工作坊' },
    formUrl: 'https://docs.google.com/forms/d/1_I4gKA9xYCa4ml-F6cznEJGjAG7SkeICh9sUP0eNcHI/viewform?embedded=true',
    schedule: [
      { date: '2026-10-20', title: 'Python Workshop', audience: 'SMP – Kuliah' },
      { date: '2026-10-23', title: 'Web Development Workshop', audience: 'SMP – SMA' },
      { date: '2026-10-27', title: 'Robotics Using Tinkercad', audience: 'Kelas 4 SD – Kelas 3 SMP' },
      { date: '2026-10-29', title: 'AI for Works', audience: 'Umum' },
      { date: '2026-10-30', title: 'AI for Learning', audience: 'SD – SMP' },
    ],
    title: {
      id: 'SPI Workshop Series 2026',
      en: 'SPI Workshop Series 2026',
      zh: 'SPI Workshop Series 2026',
    },
    description: {
      id: '5 workshop online gratis untuk eksplorasi coding, AI, dan teknologi. Belajar hal baru, bangun proyek nyata, dan kembangkan kreativitasmu bersama Sekolah Programming Indonesia. Setiap peserta mendapat e-certificate.',
      en: '5 free online workshops to explore coding, AI, and technology. Learn something new, build real projects, and grow your creativity with Sekolah Programming Indonesia. Every participant receives an e-certificate.',
      zh: '5 场免费线上工作坊，探索编程、AI 与科技。与 Sekolah Programming Indonesia 一起学习新知识、打造真实项目、发展创造力。每位参与者都可获得电子证书。',
    },
  },
];
