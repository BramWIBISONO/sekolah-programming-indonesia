export interface ClassItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  learningPoints: string[];
}

export const CLASSES_DATA: ClassItem[] = [
  {
    id: 'create-website-using-ai',
    icon: '🤖',
    title: 'Create Website Using AI',
    description: 'Pelajari cara memanfaatkan Generative AI untuk membuat website dengan lebih cepat, mulai dari menyusun ide, menghasilkan kode, hingga mengembangkan website yang dapat digunakan.',
    learningPoints: [
      'Memahami dasar penggunaan Generative AI untuk coding',
      'Membuat website dengan bantuan AI',
      'Mengembangkan dan menyempurnakan website melalui project',
    ],
  },
  {
    id: 'fast-track-web-development',
    icon: '🌐',
    title: 'Fast Track Web Development',
    description: 'Pelajari dasar pengembangan website dari struktur halaman hingga membuat website yang responsif dan dapat digunakan.',
    learningPoints: [
      'HTML & CSS Fundamental',
      'Responsive Web Design',
      'Final Project Website Sederhana',
    ],
  },
  {
    id: 'fast-track-powerpoint',
    icon: '📊',
    title: 'Fast Track PowerPoint',
    description: 'Tingkatkan kemampuan membuat presentasi yang lebih profesional, menarik, dan efektif menggunakan Microsoft PowerPoint.',
    learningPoints: [
      'Menyusun struktur dan alur presentasi',
      'Membuat desain slide yang menarik dan konsisten',
      'Membuat presentasi profesional melalui project',
    ],
  },
  {
    id: 'fast-track-microsoft-word',
    icon: '📝',
    title: 'Fast Track Microsoft Word',
    description: 'Kuasai Microsoft Word untuk membuat dokumen yang rapi, profesional, dan siap digunakan untuk kebutuhan sekolah, kuliah, maupun pekerjaan.',
    learningPoints: [
      'Formatting dan pengaturan dokumen',
      'Membuat tabel, layout, dan struktur dokumen',
      'Membuat dokumen profesional melalui project',
    ],
  },
  {
    id: 'intro-to-python-programming',
    icon: '🐍',
    title: 'Intro to Python Programming',
    description: 'Pelajari dasar Python dari nol dan bangun pemahaman programming melalui latihan dan project sederhana.',
    learningPoints: [
      'Variable, Condition & Loop',
      'Function, OOP & Data Structure',
      'Final Project Aplikasi Sederhana',
    ],
  },
  {
    id: 'microsoft-excel',
    icon: '📈',
    title: 'Microsoft Excel',
    description: 'Kuasai skill Excel untuk mengolah data, menggunakan formula, dan membuat laporan yang lebih efektif.',
    learningPoints: [
      'Mengolah dan merapikan data',
      'Formula & Function untuk kebutuhan sehari-hari',
      'Final Project Dashboard Sederhana',
    ],
  },
  {
    id: 'fast-track-data-analysis',
    icon: '📉',
    title: 'Fast Track Data Analysis',
    description: 'Belajar mengolah data menjadi informasi yang lebih mudah dipahami dan digunakan untuk mendukung pengambilan keputusan.',
    learningPoints: [
      'Data Cleaning',
      'Analisis Data',
      'Visualisasi & Dashboard',
    ],
  },
  {
    id: 'fast-track-ui-ux-design',
    icon: '🎨',
    title: 'Fast Track UI/UX Design',
    description: 'Belajar merancang tampilan dan pengalaman pengguna untuk menghasilkan website atau aplikasi yang lebih intuitif, menarik, dan mudah digunakan.',
    learningPoints: [
      'UI/UX Fundamental',
      'Wireframe & User Flow',
      'Prototype dengan Figma',
    ],
  },
];
