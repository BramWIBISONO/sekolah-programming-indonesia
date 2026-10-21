import type { SpiIconName } from '../components/illustrations/SpiIcon';
import { GALLERY_MANIFEST } from './gallery-manifest';

export type GalleryCategoryKey =
  | 'learning-experience'
  | 'competitions-achievements'
  | 'school-partnerships'
  | 'innovation-projects'
  | 'events-community'
  | 'webinars-online';

export interface GalleryCategory {
  key: GalleryCategoryKey;
  /** Translation key for the category name. */
  titleKey: string;
  icon: SpiIconName;
}

/** One photo from the manifest. Paths are public URLs under /assets/gallery; source paths never reach the client. */
export interface GalleryPhoto {
  id: string;
  category: GalleryCategoryKey;
  album: string;
  src: string;
  thumb: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  orientation: 'landscape' | 'portrait' | 'square';
  featured: boolean;
  /** Display order: competition first, then InSchool, classes, group photos, and selfies last. */
  order: number;
  /** Album group shown as one section on the page, e.g. "competition-process". */
  section: string;
  section_title: string;
  selfie: boolean;
  publication_status: 'review' | 'published' | 'archived';
  consent_status: string;
}

/** The six categories of the documentation gallery, in the order they appear on the page. */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { key: 'learning-experience', titleKey: 'gallery.cat.learning', icon: 'think' },
  { key: 'competitions-achievements', titleKey: 'gallery.cat.competitions', icon: 'engineering' },
  { key: 'school-partnerships', titleKey: 'gallery.cat.inschool', icon: 'build' },
  { key: 'innovation-projects', titleKey: 'gallery.cat.projects', icon: 'innovate' },
  { key: 'events-community', titleKey: 'gallery.cat.events', icon: 'community' },
  { key: 'webinars-online', titleKey: 'gallery.cat.webinars', icon: 'curiosity' },
];

/**
 * Photos that may be shown. Only entries marked "published" in gallery-manifest.ts appear;
 * everything else stays in review. Photos follow the display order set by the pipeline.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = (GALLERY_MANIFEST.photos as GalleryPhoto[])
  .filter((p) => p.publication_status === 'published')
  .sort((a, b) => a.order - b.order);
