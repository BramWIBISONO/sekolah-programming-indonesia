import { SPI_CONFIG } from '../constants/config';

export interface SPIFormRegistrationPayload {
  parent_name: string;
  student_name: string;
  /** Normalized Indonesian mobile number, always 62xxxxxxxxxx */
  phone: string;
  /** ISO date YYYY-MM-DD */
  birth_date: string;
  /** never | previously_learned | currently_learning */
  programming_experience: string;
  /** spi_core_1_0 ... spi_core_3_0 | spi_lab_word | spi_lab_excel | spi_lab_powerpoint | spi_lab_ai_for_work | spi_lab_ai_for_learning | consultation */
  program_category: string;
  school: string;
  /** jakarta_barat | jogja | solo | surabaya | malang */
  branch: string;
  terms_accepted: boolean;
  form_type: string;
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
        ...(import.meta.env.VITE_DS_API_KEY ? { 'Authorization': `Bearer ${import.meta.env.VITE_DS_API_KEY}` } : {}),
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
