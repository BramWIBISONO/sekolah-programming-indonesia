import { SPI_CONFIG } from '../constants/config';

export interface StudentApplicantPayload {
  first_name: string;
  custom_guardian_full_name: string | null;
  student_mobile_number: string;
  student_email_id: string | null;
  custom_school: string;
  date_of_birth: string;
  custom_coding_status: boolean;
  program: 'Focus' | 'Partner' | 'Group' | 'School';
  branch: string;
}

export interface StudentApplicantBranch {
  id?: string;
  name: string;
  endpoint: string;
}

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

const apiBaseUrl = SPI_CONFIG.SPI_API_BASE_URL.replace(/\/+$/, '');

const apiUrl = (path: string) => {
  if (!apiBaseUrl) {
    throw new StudentApplicantApiError('SPI API is not configured.');
  }

  return `${apiBaseUrl}/${path.replace(/^\/+/, '')}`;
};

const readJson = async <T,>(response: Response): Promise<T | null> => {
  try {
    return await response.json() as T;
  } catch {
    return null;
  }
};

export class StudentApplicantApiError extends Error {
  status?: number;
  fieldErrors: Record<string, string[]>;

  constructor(message: string, status?: number, fieldErrors: Record<string, string[]> = {}) {
    super(message);
    this.name = 'StudentApplicantApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export async function fetchStudentApplicantBranches(): Promise<StudentApplicantBranch[]> {
  const response = await fetch(apiUrl('guest/branches?paginate=false'), {
    headers: { Accept: 'application/json' },
  });
  const body = await readJson<StudentApplicantBranch[] | { data?: StudentApplicantBranch[] }>(response);

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse | null;
    throw new StudentApplicantApiError(errorBody?.message || 'Unable to load SPI branches.', response.status);
  }

  const branches = Array.isArray(body) ? body : body?.data;
  if (!Array.isArray(branches)) return [];

  return branches.filter((branch) => branch.name && branch.endpoint);
}

export async function submitStudentApplicant(payload: StudentApplicantPayload): Promise<unknown> {
  const response = await fetch(apiUrl('student-applicant'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await readJson<ApiErrorResponse & Record<string, unknown>>(response);

  if (!response.ok) {
    throw new StudentApplicantApiError(
      body?.message || 'Unable to submit the registration.',
      response.status,
      body?.errors ?? {},
    );
  }

  return body;
}
