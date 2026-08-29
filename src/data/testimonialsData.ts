import { StudentTestimonial, TeacherTestimonial } from '../types';

/**
 * Placeholder testimonials — replace with real data when available.
 * isPlaceholder: true signals the UI to show a replaceable presentation.
 */
export const STUDENT_TESTIMONIALS: StudentTestimonial[] = [
  {
    id: 'st-1',
    photo: '',
    name: 'Siswa SPI',
    program: 'SPI Core',
    quote:
      'Di SPI saya belajar tidak hanya coding, tapi cara berpikir untuk memecahkan masalah. Project pertama saya benar-benar jadi dan bisa dipakai.',
    isPlaceholder: true,
  },
  {
    id: 'st-2',
    photo: '',
    name: 'Siswa SPI',
    program: 'SPI Engineering',
    quote:
      'SPI Engineering membuka mata saya tentang AI dan machine learning. Mentor membimbing saya membangun project yang relevan dengan industri.',
    isPlaceholder: true,
  },
  {
    id: 'st-3',
    photo: '',
    name: 'Siswa SPI',
    program: 'SPI Lab',
    quote:
      'SPI Lab mengajarkan saya memanfaatkan AI dan tools digital untuk belajar lebih efektif dan membuat karya kreatif.',
    isPlaceholder: true,
  },
];

export const TEACHER_TESTIMONIALS: TeacherTestimonial[] = [
  {
    id: 'tt-1',
    photo: '',
    name: 'Guru Mitra SPI',
    position: 'Guru Teknologi',
    institution: 'Sekolah Mitra',
    quote:
      'SPI membantu kami menghadirkan pembelajaran teknologi yang relevan dan menyenangkan bagi siswa, serta meningkatkan kompetensi guru dalam menghadapi era AI.',
    isPlaceholder: true,
  },
  {
    id: 'tt-2',
    photo: '',
    name: 'Kepala Sekolah Mitra',
    position: 'Kepala Sekolah',
    institution: 'Sekolah Mitra SPI',
    quote:
      'Program SPI InSchool memberikan kurikulum terstruktur dan pendampingan penuh. Sekolah kami kini memiliki program teknologi unggulan yang berkelanjutan.',
    isPlaceholder: true,
  },
];
