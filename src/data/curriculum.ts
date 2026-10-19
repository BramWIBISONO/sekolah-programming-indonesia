import type { SpiIconName } from '../components/illustrations/SpiIcon';
import type { TriText } from '../i18n/translations/sections';

/**
 * Curriculum overview for the homepage explorer and the navbar materials list. SPI Core follows the
 * outline in the curriculum brief (Preschool, then levels 1.0 to 2.4). Other products keep the names
 * their own pages already show; nothing here adds new classes, prices or schedules.
 */
export type CurriculumProduct = 'core' | 'lab' | 'engineering' | 'inschool';

export interface CurriculumItem {
  name: string;
  /** Level number shown before the name, such as "1.0". */
  code?: string;
  /** Small label above the name (stage or series group). Product terms stay in English. */
  stage?: string;
  /** One short line about the item, written in each language. Left out where no description exists yet. */
  desc?: TriText;
  icon: SpiIconName;
  /** Marked "coming soon" on its product page. */
  soon?: boolean;
}

export const CURRICULUM: Record<CurriculumProduct, { link: string; items: CurriculumItem[] }> = {
  core: {
    link: '/program/spi-core',
    items: [
      {
        name: 'Preschool',
        stage: 'Early Discovery',
        icon: 'curiosity',
        desc: {
          id: 'Coding dengan Lego Feelo untuk melatih computational thinking sebelum mengenal layar.',
          en: 'Coding with Lego Feelo to build computational thinking before screens.',
          zh: '使用 Lego Feelo 编程，在接触屏幕之前培养计算思维。',
        },
      },
      {
        name: 'Block-Based Programming',
        code: '1.0',
        stage: 'Foundation',
        icon: 'think',
        desc: {
          id: 'Pemrograman berbasis blok dengan Scratch dan mBlock.',
          en: 'Block-based programming with Scratch and mBlock.',
          zh: '使用 Scratch 和 mBlock 进行图形化编程。',
        },
      },
      {
        name: 'Robotics',
        code: '1.1',
        stage: 'Foundation',
        icon: 'engineering',
        desc: {
          id: 'Robotika dengan Arduino Uno dan mBlock.',
          en: 'Robotics with Arduino Uno and mBlock.',
          zh: '使用 Arduino Uno 和 mBlock 学习机器人。',
        },
      },
      {
        name: 'Mobile App Development',
        code: '1.2',
        stage: 'Foundation',
        icon: 'creator',
        desc: {
          id: 'Membuat aplikasi mobile dengan MIT App Inventor sebagai jembatan sebelum belajar bahasa teks.',
          en: 'Building mobile apps with MIT App Inventor as a bridge before text-based programming.',
          zh: '使用 MIT App Inventor 开发移动应用，作为学习文本编程语言前的过渡。',
        },
      },
      { name: 'AI with MIT App Inventor', code: '2.0', stage: 'Development', icon: 'ai' },
      { name: 'Python', code: '2.1', stage: 'Development', icon: 'terminal' },
      {
        name: 'Web Development',
        code: '2.2',
        stage: 'Development',
        icon: 'build',
        desc: {
          id: 'Web development dengan HTML, CSS, dan JavaScript.',
          en: 'Web development with HTML, CSS and JavaScript.',
          zh: '使用 HTML、CSS 和 JavaScript 进行网页开发。',
        },
      },
      {
        name: 'Internet of Things',
        code: '2.3',
        stage: 'Development',
        icon: 'ecosystem',
        desc: {
          id: 'IoT dengan Arduino Uno, Wokwi, dan mobile app development.',
          en: 'IoT with Arduino Uno, Wokwi and mobile app development.',
          zh: '使用 Arduino Uno、Wokwi 和移动应用开发学习物联网。',
        },
      },
      {
        name: 'Data Science',
        code: '2.4',
        stage: 'Development',
        icon: 'assessment',
        desc: {
          id: 'Fondasi data dalam AI.',
          en: 'The foundation of data in AI.',
          zh: '人工智能中的数据基础。',
        },
      },
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
