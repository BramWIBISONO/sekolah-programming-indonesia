import { STUDENT_PROJECTS } from './mockData';
import { getYouTubeThumbnailUrl } from '../utils/youtube';

/**
 * Student portfolio shown as cards with a detail dialog.
 * `video` items come from STUDENT_PROJECTS; other kinds (a playable game, a website, an app,
 * an IoT build) can be added to EXTRA_PORTFOLIO with a cover image and an optional link.
 */
export type PortfolioKind = 'video' | 'game' | 'web' | 'app' | 'iot';

export interface PortfolioItem {
  id: string;
  /** Translation key for a clean title; falls back to `title`. */
  titleKey?: string;
  title?: string;
  student: string;
  category: string;
  kind: PortfolioKind;
  image: string;
  youtubeUrl?: string;
  /** Where a non-video project can be opened (Scratch, website, store page, …). */
  link?: string;
  description?: string;
  challenge?: string;
  result?: string;
}

/*
 * Add non-video work here once real covers exist, for example:
 * {
 *   id: 'pf-pumpkin-adventure',
 *   title: 'Pumpkin Adventure',
 *   student: 'Nama Siswa',
 *   category: 'Desktop Game',
 *   kind: 'game',
 *   image: asset('assets/portfolio/pumpkin-adventure.webp'),
 *   link: 'https://scratch.mit.edu/projects/…',
 *   description: 'Ringkasan singkat dari siswa/mentor.',
 * },
 */
export const EXTRA_PORTFOLIO: PortfolioItem[] = [];

export const PORTFOLIO: PortfolioItem[] = [
  ...EXTRA_PORTFOLIO,
  ...STUDENT_PROJECTS.map((p) => ({
    id: p.id,
    titleKey: `projects.item.${p.id}`,
    student: p.studentName || 'Siswa SPI',
    category: p.category,
    kind: 'video' as const,
    image: getYouTubeThumbnailUrl(p.youtubeUrl, 'hq') || '',
    youtubeUrl: p.youtubeUrl,
    description: p.description,
    challenge: p.challenge,
    result: p.outcome,
  })),
];
