import { SPI_CONFIG } from '../constants/config';
import { AI_TOOL_NONE, FORM_SECTIONS, type FieldName } from '../data/aiLiteracyForm';

/** Confirmed registrations allowed for the first Gerakan AI Literacy session. Enforced on the server too. */
export const AI_LITERACY_CAPACITY = 300;

/** Values as the form holds them while the visitor types. */
export interface RegistrationValues {
  full_name: string;
  email: string;
  whatsapp: string;
  city: string;
  role: string;
  industry: string;
  organization: string;
  ai_usage_frequency: string;
  ai_tools: string[];
  ai_confidence: number | null;
  ai_work_needs: string[];
  ai_challenges: string;
  practical_goal: string;
  online_readiness: string;
  device: string;
  internet: string;
  hands_on: string;
  data_consent: boolean;
  future_interest: string;
  referral_source: string;
  /** Hidden field that people never fill in. Bots that fill every field reveal themselves here. */
  website_hp: string;
}

export const EMPTY_VALUES: RegistrationValues = {
  full_name: '',
  email: '',
  whatsapp: '',
  city: '',
  role: '',
  industry: '',
  organization: '',
  ai_usage_frequency: '',
  ai_tools: [],
  ai_confidence: null,
  ai_work_needs: [],
  ai_challenges: '',
  practical_goal: '',
  online_readiness: '',
  device: '',
  internet: '',
  hands_on: '',
  data_consent: false,
  future_interest: '',
  referral_source: '',
  website_hp: '',
};

export type FieldErrors = Partial<Record<FieldName, string>>;

export const MESSAGES = {
  required: 'Bagian ini wajib diisi.',
  consent: 'Anda perlu menyetujui penggunaan data untuk mendaftar.',
  email: 'Format email belum benar. Contoh: nama@email.com',
  whatsapp: 'Nomor WhatsApp belum benar. Contoh: 081234567890',
  toolsExclusive: `Pilih "${AI_TOOL_NONE}" saja, atau pilih tools lainnya.`,
  notConfigured: 'Pendaftaran online belum terhubung. Silakan coba lagi nanti atau hubungi SPI lewat WhatsApp.',
  validation: 'Ada data yang belum lengkap atau belum sesuai. Periksa kembali formulir Anda.',
  alreadyRegistered: 'Email ini sudah terdaftar. Silakan periksa informasi pendaftaran Anda.',
  full: 'Terima kasih atas antusiasme Anda. Kuota Gerakan AI Literacy Indonesia telah mencapai 300 peserta dan pendaftaran saat ini ditutup.',
  closed: 'Pendaftaran Gerakan AI Literacy Indonesia sedang ditutup. Silakan hubungi SPI untuk informasi terbaru.',
  error: 'Pendaftaran belum berhasil disimpan. Silakan coba kembali.',
  unavailable: 'Pendaftaran sementara tidak dapat diproses. Silakan coba kembali beberapa saat lagi.',
  network: 'Pendaftaran sementara tidak dapat diproses. Silakan coba kembali beberapa saat lagi.',
} as const;

export type RegistrationCode =
  | 'ALREADY_REGISTERED'
  | 'REGISTRATION_FULL'
  | 'REGISTRATION_CLOSED'
  | 'VALIDATION_ERROR'
  | 'REGISTRATION_ERROR'
  | 'NETWORK';

const MESSAGE_FOR_CODE: Record<RegistrationCode, string> = {
  ALREADY_REGISTERED: MESSAGES.alreadyRegistered,
  REGISTRATION_FULL: MESSAGES.full,
  REGISTRATION_CLOSED: MESSAGES.closed,
  VALIDATION_ERROR: MESSAGES.validation,
  REGISTRATION_ERROR: MESSAGES.error,
  NETWORK: MESSAGES.network,
};

/** Lower-case and trimmed. Used for duplicate checks. Dots and "+tags" are kept, so two real addresses never merge. */
export const normalizeEmail = (value: string) => value.trim().toLowerCase();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const isValidEmail = (value: string) => EMAIL_PATTERN.test(normalizeEmail(value));

/** Turns 08xx or 62xx (with spaces, dashes, or a leading +) into 62xxxxxxxxx. Returns null when it is not a valid number. */
export const normalizeWhatsapp = (value: string): string | null => {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^62\d{9,12}$/.test(digits) ? digits : null;
};

const isEmptyValue = (value: unknown) =>
  value === null ||
  value === undefined ||
  value === false ||
  (typeof value === 'string' && value.trim() === '') ||
  (Array.isArray(value) && value.length === 0);

/** Client-side checks for what the visitor sees. The server repeats every check. */
export const validate = (values: RegistrationValues): FieldErrors => {
  const errors: FieldErrors = {};

  for (const section of FORM_SECTIONS) {
    for (const field of section.fields) {
      const value = values[field.name];
      if (field.required && isEmptyValue(value)) {
        errors[field.name] = field.kind === 'consent' ? MESSAGES.consent : MESSAGES.required;
      }
    }
  }

  if (!errors.email && !isValidEmail(values.email)) errors.email = MESSAGES.email;
  if (!errors.whatsapp && normalizeWhatsapp(values.whatsapp) === null) errors.whatsapp = MESSAGES.whatsapp;
  if (!errors.ai_tools && values.ai_tools.includes(AI_TOOL_NONE) && values.ai_tools.length > 1) {
    errors.ai_tools = MESSAGES.toolsExclusive;
  }

  return errors;
};

/** The body sent to the server: trimmed text, normalised email and WhatsApp number, and arrays as lists. */
export const toPayload = (values: RegistrationValues) => ({
  full_name: values.full_name.trim(),
  email: normalizeEmail(values.email),
  whatsapp: normalizeWhatsapp(values.whatsapp) ?? '',
  city: values.city.trim(),
  role: values.role,
  industry: values.industry,
  organization: values.organization.trim(),
  ai_usage_frequency: values.ai_usage_frequency,
  ai_tools: values.ai_tools,
  ai_confidence: values.ai_confidence ?? 0,
  ai_work_needs: values.ai_work_needs,
  ai_challenges: values.ai_challenges,
  practical_goal: values.practical_goal.trim(),
  online_readiness: values.online_readiness,
  device: values.device,
  internet: values.internet,
  hands_on: values.hands_on,
  data_consent: values.data_consent,
  future_interest: values.future_interest,
  referral_source: values.referral_source,
  website_hp: values.website_hp,
});

export interface RegistrationSuccess {
  ok: true;
  registrationId: string;
  remainingSlots: number | null;
  /** WhatsApp group invitation. Only present after a successful registration and when SPI has set it. */
  groupUrl: string | null;
}

export interface RegistrationFailure {
  ok: false;
  code: RegistrationCode;
  message: string;
}

export type RegistrationResult = RegistrationSuccess | RegistrationFailure;

const isRegistrationCode = (value: unknown): value is RegistrationCode =>
  typeof value === 'string' && value in MESSAGE_FOR_CODE;

/**
 * Sends the registration to the server. Success is reported only when the server answers ok: true,
 * which it does after the row has been saved. Network and parsing problems count as failures.
 */
export const submitRegistration = async (values: RegistrationValues): Promise<RegistrationResult> => {
  const url = SPI_CONFIG.AI_LITERACY_API_URL;
  if (!url) return { ok: false, code: 'REGISTRATION_ERROR', message: MESSAGES.notConfigured };

  try {
    // text/plain keeps this a simple cross-origin request; the server reads the JSON body itself.
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'register', ...toPayload(values) }),
    });
    const data: unknown = await response.json();
    const body = (data ?? {}) as Record<string, unknown>;

    if (body.ok === true && typeof body.registration_id === 'string' && body.registration_id !== '') {
      return {
        ok: true,
        registrationId: body.registration_id,
        remainingSlots: typeof body.remaining_slots === 'number' ? body.remaining_slots : null,
        groupUrl: typeof body.group_url === 'string' && body.group_url !== '' ? body.group_url : null,
      };
    }

    const code = isRegistrationCode(body.code) ? body.code : 'REGISTRATION_ERROR';
    return { ok: false, code, message: MESSAGE_FOR_CODE[code] };
  } catch {
    return { ok: false, code: 'NETWORK', message: MESSAGES.network };
  }
};

export interface CapacityInfo {
  open: boolean;
  confirmed: number;
  capacity: number;
}

/** Counts only: how many are confirmed and whether registration is open. Never returns participant data. */
export const fetchCapacity = async (): Promise<CapacityInfo | null> => {
  const url = SPI_CONFIG.AI_LITERACY_API_URL;
  if (!url) return null;
  try {
    const response = await fetch(`${url}?action=capacity`);
    if (!response.ok) return null;
    const body = (await response.json()) as Record<string, unknown>;
    if (typeof body.confirmed !== 'number' || typeof body.capacity !== 'number') return null;
    return { open: body.open !== false, confirmed: body.confirmed, capacity: body.capacity };
  } catch {
    return null;
  }
};
