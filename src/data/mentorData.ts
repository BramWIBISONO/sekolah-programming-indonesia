/**
 * Mentor data.
 * Real mentor names are provided.
 * Replace photos with verified mentor photos when available.
 */
export interface MentorProfile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  photoAssetKey: string;
  isPlaceholder: boolean;
}

export const MENTORS_DATA: MentorProfile[] = [
  {
    id: 'mentor-1',
    name: 'Bram Wibisono',
    role: 'Coding Mentor',
    skills: ['Programming', 'Computational Thinking'],
    photoAssetKey: 'MENTOR_1',
    isPlaceholder: true,
  },
  {
    id: 'mentor-2',
    name: 'Gracia Zerlinda',
    role: 'Coding Mentor',
    skills: ['AI', 'Python'],
    photoAssetKey: 'MENTOR_2',
    isPlaceholder: true,
  },
  {
    id: 'mentor-3',
    name: 'Dimas Agum',
    role: 'Coding Mentor',
    skills: ['Robotics', 'Arduino'],
    photoAssetKey: 'MENTOR_3',
    isPlaceholder: true,
  },
  {
    id: 'mentor-4',
    name: 'Tryo Pujianto',
    role: 'Coding Mentor',
    skills: ['Web Development', 'UI/UX'],
    photoAssetKey: 'MENTOR_4',
    isPlaceholder: true,
  },
  {
    id: 'mentor-5',
    name: 'Andrean Perdana',
    role: 'Coding Mentor',
    skills: ['Data Science', 'Machine Learning'],
    photoAssetKey: 'MENTOR_5',
    isPlaceholder: true,
  },
  {
    id: 'mentor-6',
    name: 'Fritz Alpheratz',
    role: 'Coding Mentor',
    skills: ['Game Development', 'IoT'],
    photoAssetKey: 'MENTOR_6',
    isPlaceholder: true,
  },
];
