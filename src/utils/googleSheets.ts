import { SPI_CONFIG } from '../constants/config';

export interface FormSubmissionData {
  parentName: string;
  studentName: string;
  studentAge: string;
  whatsapp: string;
  learningGoal?: string;
  learningMode?: string;
  city?: string;
  formType?: string;
  email?: string;
  notes?: string;
  birthDate?: string;
  programmingExperience?: string;
  programmingExperienceValue?: string;
  programCategory?: string;
  programCategoryValue?: string;
  school?: string;
  branch?: string;
  branchValue?: string;
  termsAccepted?: boolean;
}

/**
 * Sends registration form submission data to Google Sheets via Google Apps Script Web App.
 */
export async function submitToGoogleSheets(data: FormSubmissionData): Promise<boolean> {
  const url = SPI_CONFIG.GOOGLE_SHEETS_SCRIPT_URL;
  if (!url) {
    console.warn('Google Sheets Web App URL is not set in SPI_CONFIG or VITE_GOOGLE_SHEETS_URL.');
    return false;
  }

  try {
    // text/plain avoids CORS preflight OPTIONS check on Google Apps Script
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        ...data,
      }),
    });
    return true;
  } catch (err) {
    console.error('Error submitting form to Google Sheets:', err);
    return false;
  }
}
