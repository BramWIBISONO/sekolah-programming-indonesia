import type { SpiIconName } from '../components/illustrations/SpiIcon';

/**
 * Curriculum overview for the homepage explorer. Names mirror what each product page already
 * shows (CoreProgramPage pathway, Lab categories, Engineering series, InSchool cooperation models);
 * nothing here adds new classes, prices or schedules.
 */
export type CurriculumProduct = 'core' | 'lab' | 'engineering' | 'inschool';

export interface CurriculumItem {
  name: string;
  /** Small label above the name (stage or series group). Product terms stay in English. */
  stage?: string;
  icon: SpiIconName;
  /** Marked "coming soon" on its product page. */
  soon?: boolean;
}

export const CURRICULUM: Record<CurriculumProduct, { link: string; items: CurriculumItem[] }> = {
  core: {
    link: '/program/spi-core',
    items: [
      { name: 'Preschool', stage: 'Early Discovery', icon: 'curiosity' },
      { name: 'Build the Brain', stage: 'Foundation 1.0', icon: 'think' },
      { name: 'Connect the Body', stage: 'Foundation 1.1', icon: 'engineering' },
      { name: 'Create the Experience', stage: 'Foundation 1.2', icon: 'creative' },
      { name: 'Think with Python', stage: 'Development', icon: 'terminal' },
      { name: 'Build for the Web', stage: 'Development', icon: 'build' },
      { name: 'Connect Smart Systems', stage: 'Development', icon: 'ecosystem' },
      { name: 'Build Intelligent Systems', stage: 'Development', icon: 'ai' },
      { name: 'SPI Exploration', stage: 'Learn to Specialize', icon: 'specialist' },
      { name: 'SPI Research', stage: 'Learn to Create Impact', icon: 'innovate' },
    ],
  },
  lab: {
    link: '/program/spi-lab',
    items: [
      { name: 'AI for Work', stage: 'AI', icon: 'ai' },
      { name: 'Office & Productivity', stage: 'Excel · Docs · Slides', icon: 'office' },
      { name: 'Digital Design & Editing', stage: 'Photoshop · Figma', icon: 'creative' },
    ],
  },
  engineering: {
    link: '/program/spi-engineering',
    items: [
      { name: 'Software Engineering', stage: 'Series', icon: 'terminal' },
      { name: 'Artificial Intelligence Engineering', stage: 'Series', icon: 'ai' },
      { name: 'Data Science Engineering', stage: 'Series', icon: 'assessment' },
      { name: 'Machine Learning Engineering', stage: 'Series', icon: 'solver' },
      { name: 'Computer Vision Engineering', stage: 'Series', icon: 'video' },
      { name: 'Natural Language Processing', stage: 'Series', icon: 'community' },
      { name: 'Web Engineering', stage: 'Series', icon: 'build' },
      { name: 'IoT Engineering', stage: 'Series', icon: 'ecosystem' },
      { name: 'Cloud & DevOps', stage: 'Series', icon: 'strategic' },
      { name: 'Cyber Security', stage: 'Series', icon: 'challenge', soon: true },
    ],
  },
  inschool: {
    link: '/program/spi-inschool',
    items: [
      { name: 'InSchool Material (Kurikulum SPI)', stage: '01', icon: 'curriculum' },
      { name: 'Teacher Training', stage: '02', icon: 'teacher' },
      { name: 'Modul, Buku & Pelatihan Terbatas', stage: '03', icon: 'portfolio' },
      { name: 'SPI Satelit di Sekolah', stage: '04', icon: 'center' },
      { name: 'Sertifikasi & Assessment', stage: '05', icon: 'assessment' },
    ],
  },
};
