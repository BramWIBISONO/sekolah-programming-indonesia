export interface FormValues {
  parentName: string;
  studentName: string;
  phone: string;
  birthDate: string;
  programmingExperience: string;
  programCategory: string;
  school: string;
  branch: string;
  termsAccepted: boolean;
}

/** Values are translation keys (reg.err.*), rendered by the modal in the active language. */
export type FormErrors = Partial<Record<keyof FormValues, string>>;

export const EMPTY_VALUES: FormValues = {
  parentName: '',
  studentName: '',
  phone: '',
  birthDate: '',
  programmingExperience: '',
  programCategory: '',
  school: '',
  branch: '',
  termsAccepted: false,
};

export const FIELD_ORDER: (keyof FormValues)[] = [
  'parentName', 'studentName', 'phone', 'birthDate',
  'programmingExperience', 'programCategory', 'school', 'branch', 'termsAccepted',
];

export const FIELD_NAMES: Record<keyof FormValues, string> = {
  parentName: 'parent_name',
  studentName: 'student_name',
  phone: 'phone',
  birthDate: 'birth_date',
  programmingExperience: 'programming_experience',
  programCategory: 'program_category',
  school: 'school',
  branch: 'branch',
  termsAccepted: 'terms_accepted',
};

export const EXPERIENCE_OPTIONS = [
  { label: 'Belum Pernah', value: 'never' },
  { label: 'Pernah Belajar', value: 'previously_learned' },
  { label: 'Sedang Belajar', value: 'currently_learning' },
];

export const PROGRAM_OPTIONS = [
  { label: 'Focus', value: 'focus' },
  { label: 'Partner', value: 'partner' },
  { label: 'School', value: 'school' },
];

export const findCategory = (value: string) => PROGRAM_OPTIONS.find((o) => o.value === value);

// Active SPI branches (same list as src/components/common/IndonesiaMap.tsx activeLocations)
export const BRANCH_OPTIONS = [
  { label: 'Jakarta Barat', value: 'jakarta_barat' },
  { label: 'Yogyakarta', value: 'jogja' },
  { label: 'Solo', value: 'solo' },
  { label: 'Surabaya', value: 'surabaya' },
  { label: 'Malang', value: 'malang' },
];

/** Returns the number in 62xxxxxxxxxx form, or '' when it is not a valid Indonesian mobile number. */
export const normalizePhone = (raw: string): string => {
  const cleaned = raw.replace(/[\s\-().]/g, '');
  const m = cleaned.match(/^(?:\+62|62|0)(8[1-9][0-9]{7,10})$/);
  return m ? `62${m[1]}` : '';
};

const pad = (n: number) => String(n).padStart(2, '0');

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const calcAge = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y) return '';
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
  return `${age} tahun`;
};

export const validateForm = (v: FormValues): FormErrors => {
  const e: FormErrors = {};
  if (!v.parentName.trim()) e.parentName = 'reg.err.parent';
  if (!v.studentName.trim()) e.studentName = 'reg.err.student';
  if (!v.phone.trim()) e.phone = 'reg.err.phone_required';
  else if (!normalizePhone(v.phone)) e.phone = 'reg.err.phone_invalid';
  if (!v.birthDate) e.birthDate = 'reg.err.birth_required';
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v.birthDate) || v.birthDate < '1900-01-01') e.birthDate = 'reg.err.birth_invalid';
  else if (v.birthDate > todayISO()) e.birthDate = 'reg.err.birth_future';
  if (!v.programmingExperience) e.programmingExperience = 'reg.err.experience';
  if (!v.programCategory) e.programCategory = 'reg.err.program';
  if (!v.school.trim()) e.school = 'reg.err.school';
  if (!v.branch) e.branch = 'reg.err.branch';
  if (!v.termsAccepted) e.termsAccepted = 'reg.err.terms';
  return e;
};
