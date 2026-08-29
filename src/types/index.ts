export interface NavItem {
  name: string;
  path: string;
  badge?: string;
}

export interface ProgramItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  materials: string[];
  link: string;
  color: string;
}

export interface StudentProject {
  id: string;
  image: string;
  projectName: string;
  category: 'AI/ML' | 'Arduino' | 'Python' | 'Game' | 'Web' | 'IoT' | 'Computational Thinking' | 'App';
  youtubeUrl: string;
  studentName?: string;
  description?: string;
  school?: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
  icon: string;
}

export interface StatisticItem {
  value: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SchoolPartner {
  name: string;
  logo: string;
  type: string;
}

export interface TrialFormData {
  parentName: string;
  phone: string;
  childName: string;
  birthDate: string;
  schoolName: string;
  grade: string;
  interests: string[];
  priorExperience: string;
  referralSource: string;
  notes?: string;
}

export interface StudentTestimonial {
  id: string;
  photo: string;
  name: string;
  program: string;
  quote: string;
  isPlaceholder?: boolean;
}

export interface TeacherTestimonial {
  id: string;
  photo: string;
  name: string;
  position: string;
  institution: string;
  quote: string;
  isPlaceholder?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface InnovationFestivalCity {
  name: string;
  status: 'Coming Soon';
}
