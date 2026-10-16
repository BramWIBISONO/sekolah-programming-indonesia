import type { SpiIconName } from '../components/illustrations/SpiIcon';

/** One photo in a category. `src` is a path under /public, e.g. "assets/gallery/preschool/01.webp". */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface GalleryCategory {
  key: string;
  /** Translation key for the category name. */
  titleKey: string;
  icon: SpiIconName;
  /** Leave empty until the photos are grouped: the page then shows "coming soon" tiles for the category. */
  images: GalleryImage[];
}

/**
 * Gallery categories. Photos are not grouped yet, so every `images` list is empty.
 * To publish a category, add its photos here; the page switches that category from tiles to the photos.
 */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { key: 'preschool', titleKey: 'gallery.cat.preschool', icon: 'curiosity', images: [] },
  { key: 'robotics', titleKey: 'gallery.cat.robotics', icon: 'engineering', images: [] },
  { key: 'a', titleKey: 'gallery.cat.a', icon: 'think', images: [] },
  { key: 'b', titleKey: 'gallery.cat.b', icon: 'build', images: [] },
  { key: 'c', titleKey: 'gallery.cat.c', icon: 'innovate', images: [] },
  { key: 'd', titleKey: 'gallery.cat.d', icon: 'projects', images: [] },
  { key: 'e', titleKey: 'gallery.cat.e', icon: 'community', images: [] },
];
