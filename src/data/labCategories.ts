import type { LucideIcon } from 'lucide-react';
import {
  Briefcase, Calculator, Clapperboard, Database, FileSpreadsheet, FileText, GraduationCap, Image,
  Megaphone, Music, Palette, PenTool, Presentation, Search, Users,
} from 'lucide-react';

export type LabCategoryKey = 'ai' | 'office' | 'design';

export interface LabSubcategory {
  key: string;
  name: string;
  icon: LucideIcon;
  tools?: string[];
}

export interface LabCategory {
  key: LabCategoryKey;
  /** URL of the category page. */
  path: string;
  /** Short name on the card; product names stay in English in every language. */
  name: string;
  /** Short preview line on the card (tool or field names). */
  preview: string[];
  subs: LabSubcategory[];
}

/**
 * SPI Lab's three proposed categories. They are exploration categories pending the product
 * owner's approval, so pages never present them as active courses with dates or prices.
 */
export const LAB_CATEGORIES: LabCategory[] = [
  {
    key: 'ai',
    path: '/program/spi-lab/ai-for-work',
    name: 'AI for Work',
    preview: ['Music', 'Business', 'Accounting & Finance', 'Marketing & Sales', 'Human Resources', 'Tech & Data', 'Creative', 'Video Editing', 'Education', 'Research & Information'],
    subs: [
      { key: 'music', name: 'AI for Music', icon: Music },
      { key: 'business', name: 'AI for Business', icon: Briefcase },
      { key: 'finance', name: 'AI for Accounting & Finance', icon: Calculator },
      { key: 'marketing', name: 'AI for Marketing & Sales', icon: Megaphone },
      { key: 'hr', name: 'AI for Human Resources', icon: Users },
      { key: 'techdata', name: 'AI for Tech & Data', icon: Database },
      { key: 'creative', name: 'AI for Creative', icon: Palette },
      { key: 'video', name: 'AI for Video Editing', icon: Clapperboard },
      { key: 'education', name: 'AI for Education', icon: GraduationCap },
      { key: 'research', name: 'AI for Research & Information', icon: Search },
    ],
  },
  {
    key: 'office',
    path: '/program/spi-lab/office',
    name: 'Office',
    preview: ['Excel / Sheets', 'Docs / Word', 'PowerPoint / Slides'],
    subs: [
      { key: 'sheet', name: 'Spreadsheet', icon: FileSpreadsheet, tools: ['Microsoft Excel', 'Google Sheets'] },
      { key: 'docs', name: 'Documents', icon: FileText, tools: ['Microsoft Word', 'Google Docs'] },
      { key: 'slides', name: 'Presentation', icon: Presentation, tools: ['Microsoft PowerPoint', 'Google Slides'] },
    ],
  },
  {
    key: 'design',
    path: '/program/spi-lab/design-editing',
    name: 'Design & Editing',
    preview: ['Adobe Photoshop', 'Figma'],
    subs: [
      { key: 'photoshop', name: 'Adobe Photoshop', icon: Image },
      { key: 'figma', name: 'Figma', icon: PenTool },
    ],
  },
];

export const labCategoryByPath = (path: string) => LAB_CATEGORIES.find((c) => c.path === path);

/** Area to highlight when a category page opens (set right before navigating there). */
let pendingArea: string | null = null;
export const setPendingLabArea = (key: string | null) => { pendingArea = key; };
/** Read without clearing (effects can run twice in development), then clear once used. */
export const peekPendingLabArea = () => pendingArea;
export const clearPendingLabArea = () => { pendingArea = null; };
