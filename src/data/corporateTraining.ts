import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Files, HelpCircle, RefreshCw, SearchCheck, ShieldAlert, Timer, Users } from 'lucide-react';
import type { LabCategoryKey } from './labCategories';

export type CorporateTrackKey = 'office' | 'ai';

export interface CorporateTrack {
  key: CorporateTrackKey;
  path: string;
  /** The SPI Lab category the training is built on. */
  lab: LabCategoryKey;
  /** Programme name (English in every language, like the SPI Lab category names). */
  name: string;
  /** Icons for the four "does your team face this?" cards. */
  painIcons: LucideIcon[];
  /** Translation keys of the four training focus points. */
  focusKeys: string[];
}

export const CORPORATE_OVERVIEW_PATH = '/corporate-training';

/**
 * Corporate training built on SPI Lab categories (SPI Lab for Business). Like SPI Lab itself, details
 * such as schedule, duration, format and fees are confirmed by the SPI team, never listed on the page.
 */
export const CORPORATE_TRACKS: CorporateTrack[] = [
  {
    key: 'office',
    path: '/corporate-training/office',
    lab: 'office',
    name: 'Office & Productivity Corporate Training',
    painIcons: [RefreshCw, AlertTriangle, Files, Users],
    focusKeys: ['corp.office.focus1', 'corp.office.focus2', 'corp.office.focus3', 'corp.office.focus4'],
  },
  {
    key: 'ai',
    path: '/corporate-training/ai-for-work',
    lab: 'ai',
    name: 'AI for Work Corporate Training',
    painIcons: [Timer, HelpCircle, ShieldAlert, SearchCheck],
    // the SPI Lab AI habits, which are exactly what a team should practise
    focusKeys: ['lab.ai.b1', 'lab.ai.b2', 'lab.ai.b3', 'lab.ai.b4', 'lab.ai.b5'],
  },
];

export const corporateTrackByPath = (path: string) => CORPORATE_TRACKS.find((c) => c.path === path);
export const isCorporatePath = (path: string) => path === CORPORATE_OVERVIEW_PATH || !!corporateTrackByPath(path);
