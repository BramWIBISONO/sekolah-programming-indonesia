import { SPI_CONFIG } from '../constants/config';

/** Request body expected by SPI Digital System (field names are DS's). */
export interface SPIFormRegistrationPayload {
  /** Nama Lengkap Siswa */
  first_name: string;
  /** Nama Lengkap Orang Tua */
  custom_guardian_full_name: string;
  /** Nomor HP, 62xxxxxxxxxx */
  student_mobile_number: string;
  /** Sekolah */
  custom_school: string;
  /** Tanggal Lahir Siswa, YYYY-MM-DD */
  date_of_birth: string;
  /** Pernah Belajar Programming (label: Belum Pernah / Pernah Belajar / Sedang Belajar) */
  custom_coding_status: string;
  /** Minat Kategori Program (label: Focus / Partner / School) */
  program: string;
  /** Cabang (label, e.g. "Jakarta Barat") */
  branch: string;
}

/**
 * Submit registration payload directly to SPI Digital System (DS) API endpoint.
 */
export async function submitToDigitalSystem(payload: SPIFormRegistrationPayload): Promise<{ success: boolean; data?: any; error?: string }> {
  const dsApiUrl = import.meta.env.VITE_DS_API_URL || `${SPI_CONFIG.LMS_URL}/api/register`;

  try {
    const response = await fetch(dsApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DS API Error (${response.status}): ${errorText}`);
    }

    const resData = await response.json();
    return { success: true, data: resData };
  } catch (err: any) {
    console.error('Failed to submit registration to SPI Digital System:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}
