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

export const PROGRAM_GROUPS = [
  {
    group: 'SPI Core',
    options: [
      { label: '1.0 - Block Visual Programming (mBlock)', value: 'spi_core_1_0' },
      { label: '1.1 - Robotics with Arduino', value: 'spi_core_1_1' },
      { label: '1.2 - Mobile App Development (MIT App Inventor)', value: 'spi_core_1_2' },
      { label: '2.0 - AI with MIT App Inventor', value: 'spi_core_2_0' },
      { label: '2.1 - Python Programming', value: 'spi_core_2_1' },
      { label: '2.2 - Web Development', value: 'spi_core_2_2' },
      { label: '2.3 - Internet of Things (IoT)', value: 'spi_core_2_3' },
      { label: '2.4 - AI and Data Science', value: 'spi_core_2_4' },
      { label: '3.0 - AI Exploration (NLP and Computer Vision)', value: 'spi_core_3_0' },
    ],
  },
  {
    group: 'SPI Lab',
    options: [
      { label: 'Microsoft Word', value: 'spi_lab_word' },
      { label: 'Microsoft Excel', value: 'spi_lab_excel' },
      { label: 'Microsoft PowerPoint', value: 'spi_lab_powerpoint' },
      { label: 'AI for Work', value: 'spi_lab_ai_for_work' },
      { label: 'AI for Learning', value: 'spi_lab_ai_for_learning' },
    ],
  },
];

export const CONSULTATION_OPTION = { label: 'Belum Yakin / Ingin Konsultasi', value: 'consultation' };

export const findCategory = (value: string) =>
  value === CONSULTATION_OPTION.value
    ? CONSULTATION_OPTION
    : PROGRAM_GROUPS.flatMap((g) => g.options).find((o) => o.value === value);

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
  if (!v.parentName.trim()) e.parentName = 'Nama lengkap orang tua wajib diisi';
  if (!v.studentName.trim()) e.studentName = 'Nama lengkap siswa wajib diisi';
  if (!v.phone.trim()) e.phone = 'Nomor HP wajib diisi';
  else if (!normalizePhone(v.phone)) e.phone = 'Gunakan nomor HP Indonesia yang valid (08..., 62..., atau +62...)';
  if (!v.birthDate) e.birthDate = 'Tanggal lahir siswa wajib diisi';
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(v.birthDate) || v.birthDate < '1900-01-01') e.birthDate = 'Tanggal lahir tidak valid';
  else if (v.birthDate > todayISO()) e.birthDate = 'Tanggal lahir tidak boleh di masa depan';
  if (!v.programmingExperience) e.programmingExperience = 'Pilih status belajar programming';
  if (!v.programCategory) e.programCategory = 'Pilih salah satu minat kategori';
  if (!v.school.trim()) e.school = 'Nama sekolah wajib diisi';
  if (!v.branch) e.branch = 'Pilih salah satu cabang SPI';
  if (!v.termsAccepted) e.termsAccepted = 'Anda harus menyetujui Syarat dan Ketentuan';
  return e;
};
