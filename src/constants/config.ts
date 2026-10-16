/**
 * SPI Application Configuration
 * Central place for configurable values. Fill placeholders when real data is available.
 */
export const SPI_CONFIG = {
  /** Verified SPI WhatsApp contact. */
  WHATSAPP_NUMBER: '6281246906335',
  WHATSAPP_PREFILLED_MESSAGE: 'Halo SPI, saya ingin mengetahui lebih lanjut tentang program dan Trial Gratis SPI.',

  /** External links and APIs. */
  LMS_URL: 'https://spidigitalsystem.com',
  DS_API_URL: import.meta.env.VITE_DS_API_URL || 'https://spidigitalsystem.com/api/register',
  SPI_API_BASE_URL: import.meta.env.VITE_SPI_API_BASE_URL
    || (import.meta.env.DEV ? 'http://localhost:8000/api/v1' : ''),

  /** Contact — verified SPI public email */
  EMAIL: 'informasi@sekolahprogrammingindonesia.com',
  /** Inbox for job applications and partnership enquiries (as requested by SPI). */
  INFO_EMAIL: 'info@sekolahprogrammingindonesia.com',
  PHONE: '',

  /** Google Sheets Web App URL for registration form submissions */
  GOOGLE_SHEETS_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyfDSJhH_8VSA6txBcLdvm5LayzGxckaKwM-01fLpFpukbEcOYpQY3afB0gm7OMKhQ/exec',
} as const;
