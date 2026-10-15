import { asset } from '../constants/assets';

/**
 * Achievements that have a real photo or ranking screenshot in /public/assets.
 * Titles and ranks come from AchievementPage's records and the screenshots themselves.
 * Items whose image is still a placeholder (Robotik Jakarta Barat, Codeavour, iCode Hackathon)
 * are left out until real images are added.
 */
export interface FeaturedAchievement {
  id: string;
  image: string;
  /** 'contain' for ranking screenshots (tables must stay readable), 'cover' for photos. */
  fit: 'cover' | 'contain';
  badge: string;
  title: string;
  subtitle?: string;
  /** Translation key for the description, when there is a verified one. */
  descKey?: string;
  year: string;
  level: 'International' | 'National';
}

export const FEATURED_ACHIEVEMENTS: FeaturedAchievement[] = [
  {
    id: 'wrc-2026',
    image: asset('assets/achievements/international/achievement-2026-school-rank-1.png'),
    fit: 'contain',
    badge: '#1 School Rank',
    title: '2026 World Robot Competition Overseas Championships (Singapore)',
    subtitle: '8th International Youth Coding Contest · Space Exploration Challenge',
    descKey: 'ach.wrc.desc',
    year: '2026',
    level: 'International',
  },
  {
    id: 'icode-2025',
    image: asset('assets/achievements/international/achievement-2025-school-rank-2.png'),
    fit: 'contain',
    badge: '#2 School Rank',
    title: 'The 7th ICode International Youth Coding Contest',
    subtitle: 'Regional Final 2025',
    descKey: 'ach.icode.desc',
    year: '2025',
    level: 'International',
  },
  {
    id: 'steam-2025-sd',
    image: asset('assets/achievement/achievement-steam-2025-sd.jpg'),
    fit: 'cover',
    badge: 'Juara 2 · SD',
    title: 'STEAM National Competition Sampoerna Academy 2025',
    year: '2025',
    level: 'National',
  },
  {
    id: 'steam-2025-smp',
    image: asset('assets/achievement/achievement-steam-2025-smp.webp'),
    fit: 'cover',
    badge: 'Juara 2 · SMP',
    title: 'STEAM National Competition Sampoerna Academy 2025',
    year: '2025',
    level: 'National',
  },
  {
    id: 'steam-2025-sma',
    image: asset('assets/achievement/achievement-steam-2025-sma.jpg'),
    fit: 'cover',
    badge: '10 Besar · SMA',
    title: 'STEAM National Competition Sampoerna Academy 2025',
    year: '2025',
    level: 'National',
  },
  {
    id: 'steam-2024-sd',
    image: asset('assets/achievement/achievement-steam-2024-sd.webp'),
    fit: 'cover',
    badge: 'Juara 2 · SD',
    title: 'STEAM National Competition Sampoerna Academy 2024',
    year: '2024',
    level: 'National',
  },
];
