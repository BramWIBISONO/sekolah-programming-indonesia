/**
 * Registration form for Gerakan AI Literacy Indonesia. Field names are the keys sent to the server;
 * labels and options are the Indonesian copy from the registration brief.
 */

export type FieldName =
  | 'full_name'
  | 'email'
  | 'whatsapp'
  | 'city'
  | 'role'
  | 'industry'
  | 'organization'
  | 'ai_usage_frequency'
  | 'ai_tools'
  | 'ai_confidence'
  | 'ai_work_needs'
  | 'ai_challenges'
  | 'practical_goal'
  | 'online_readiness'
  | 'device'
  | 'internet'
  | 'hands_on'
  | 'data_consent'
  | 'future_interest'
  | 'referral_source';

export type FieldKind = 'text' | 'email' | 'tel' | 'select' | 'radio' | 'checkbox' | 'scale' | 'textarea' | 'consent';

export interface FormField {
  name: FieldName;
  label: string;
  kind: FieldKind;
  required: boolean;
  options?: readonly string[];
  placeholder?: string;
  hint?: string;
  /** Labels at the two ends of a 1 to 5 scale. */
  scaleLabels?: readonly [string, string];
}

export interface FormSection {
  id: string;
  title: string;
  fields: readonly FormField[];
}

/** Choosing this option clears the others in the AI tools question. */
export const AI_TOOL_NONE = 'Belum pernah menggunakan AI';

const YES_NO = ['Ya', 'Tidak'] as const;

export const FORM_SECTIONS: readonly FormSection[] = [
  {
    id: 'participant_data',
    title: '1. Data Peserta',
    fields: [
      { name: 'full_name', label: 'Nama lengkap', kind: 'text', required: true },
      { name: 'email', label: 'Email aktif', kind: 'email', required: true },
      {
        name: 'whatsapp',
        label: 'Nomor WhatsApp aktif',
        kind: 'tel',
        required: true,
        placeholder: '081234567890',
        hint: 'Format: 08xx atau 62xx. Tanpa spasi atau tanda hubung.',
      },
      { name: 'city', label: 'Kota domisili', kind: 'text', required: true },
    ],
  },
  {
    id: 'participant_profile',
    title: '2. Profil Peserta',
    fields: [
      {
        name: 'role',
        label: 'Apa status atau peran Anda saat ini?',
        kind: 'select',
        required: true,
        options: [
          'Karyawan swasta',
          'ASN / pegawai pemerintahan',
          'Pemilik bisnis / entrepreneur',
          'Freelancer',
          'Guru / tenaga pendidik',
          'Mahasiswa / pelajar',
          'Content creator',
          'Profesional / konsultan',
          'Sedang mencari pekerjaan',
          'Orang tua',
          'Perwakilan sekolah',
          'Perwakilan komunitas',
          'Lainnya',
        ],
      },
      {
        name: 'industry',
        label: 'Apa bidang pekerjaan atau industri Anda?',
        kind: 'select',
        required: true,
        options: [
          'Pendidikan',
          'Administrasi / operasional',
          'Marketing / komunikasi',
          'Sales / business development',
          'Keuangan / akuntansi',
          'Human resources',
          'Teknologi / IT',
          'Desain / kreatif',
          'Bisnis / kewirausahaan',
          'Kesehatan',
          'Lainnya',
        ],
      },
      {
        name: 'organization',
        label: 'Nama perusahaan, sekolah, komunitas, atau institusi',
        kind: 'text',
        required: false,
      },
    ],
  },
  {
    id: 'ai_experience',
    title: '3. Pengalaman Menggunakan AI',
    fields: [
      {
        name: 'ai_usage_frequency',
        label: 'Seberapa sering Anda menggunakan AI untuk pekerjaan?',
        kind: 'radio',
        required: true,
        options: [
          'Belum pernah',
          'Pernah mencoba, tetapi jarang',
          'Beberapa kali dalam seminggu',
          'Hampir setiap hari',
          'AI sudah menjadi bagian dari alur kerja saya',
        ],
      },
      {
        name: 'ai_tools',
        label: 'Tools AI apa yang pernah Anda gunakan?',
        kind: 'checkbox',
        required: true,
        options: [
          'ChatGPT',
          'Google Gemini',
          'Microsoft Copilot',
          'Claude',
          'NotebookLM',
          'Canva AI',
          'AI lainnya',
          AI_TOOL_NONE,
        ],
      },
      {
        name: 'ai_confidence',
        label: 'Seberapa percaya diri Anda menggunakan AI?',
        kind: 'scale',
        required: true,
        scaleLabels: ['Belum percaya diri', 'Sangat percaya diri'],
      },
    ],
  },
  {
    id: 'ai_work_needs',
    title: '4. Kebutuhan AI',
    fields: [
      {
        name: 'ai_work_needs',
        label: 'Pekerjaan apa yang paling ingin Anda bantu dengan AI?',
        kind: 'checkbox',
        required: true,
        options: [
          'Menulis email dan dokumen',
          'Membuat laporan dan ringkasan',
          'Menganalisis data',
          'Mencari dan merangkum informasi',
          'Membuat presentasi',
          'Brainstorming ide dan pemecahan masalah',
          'Membuat konten dan materi pemasaran',
          'Mengotomatisasi pekerjaan rutin',
          'Membantu mengajar atau belajar',
          'Mengelola pekerjaan dan produktivitas',
          'Lainnya',
        ],
      },
      {
        name: 'ai_challenges',
        label: 'Apa tantangan terbesar Anda ketika menggunakan AI?',
        kind: 'radio',
        required: true,
        options: [
          'Tidak tahu harus mulai dari mana',
          'Bingung membuat prompt yang baik',
          'Hasil AI sering kurang tepat',
          'Tidak tahu cara memeriksa kebenaran hasil AI',
          'Sulit mengintegrasikan AI ke pekerjaan',
          'Khawatir tentang privasi dan keamanan data',
          'Belum menemukan manfaat AI yang relevan',
          'Lainnya',
        ],
      },
      {
        name: 'practical_goal',
        label: 'Apa satu pekerjaan nyata yang ingin Anda selesaikan lebih cepat dengan bantuan AI?',
        kind: 'textarea',
        required: false,
        placeholder: 'Ceritakan pekerjaan yang memakan waktu, berulang, atau sulit dilakukan.',
      },
    ],
  },
  {
    id: 'activity_readiness',
    title: '5. Kesiapan Mengikuti Kegiatan',
    fields: [
      {
        name: 'online_readiness',
        label: 'Apakah Anda bersedia mengikuti kegiatan online jika diperlukan?',
        kind: 'radio',
        required: true,
        options: YES_NO,
      },
      {
        name: 'device',
        label: 'Perangkat yang biasa Anda gunakan',
        kind: 'radio',
        required: true,
        options: ['Laptop / komputer', 'Ponsel', 'Tablet', 'Laptop dan ponsel'],
      },
      {
        name: 'internet',
        label: 'Apakah Anda memiliki koneksi internet yang memadai?',
        kind: 'radio',
        required: true,
        options: YES_NO,
      },
      {
        name: 'hands_on',
        label: 'Apakah Anda bersedia mencoba praktik AI secara langsung?',
        kind: 'radio',
        required: true,
        options: YES_NO,
      },
    ],
  },
  {
    id: 'consent_and_follow_up',
    title: '6. Persetujuan dan Tindak Lanjut',
    fields: [
      {
        name: 'data_consent',
        label:
          'Saya menyetujui penggunaan data pendaftaran untuk administrasi Gerakan AI Literacy, komunikasi terkait kegiatan, dan evaluasi program.',
        kind: 'consent',
        required: true,
      },
      {
        name: 'future_interest',
        label: 'Apakah Anda tertarik mengikuti pelatihan AI lanjutan dari SPI?',
        kind: 'radio',
        required: true,
        options: [
          'Ya, untuk kebutuhan pribadi atau profesional',
          'Ya, untuk tim atau perusahaan',
          'Mungkin, ingin mengetahui informasinya terlebih dahulu',
          'Belum tertarik',
        ],
      },
      {
        name: 'referral_source',
        label: 'Dari mana Anda mengetahui Gerakan AI Literacy?',
        kind: 'select',
        required: true,
        options: [
          'Instagram SPI',
          'WhatsApp',
          'Teman / kolega',
          'Sekolah / kampus / perusahaan',
          'Komunitas',
          'Website SPI',
          'Lainnya',
        ],
      },
    ],
  },
];
