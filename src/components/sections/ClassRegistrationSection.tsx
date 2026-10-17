import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { normalizePhone, todayISO } from '../modals/registrationForm';
import {
  fetchStudentApplicantBranches,
  StudentApplicantApiError,
  submitStudentApplicant,
  type StudentApplicantBranch,
  type StudentApplicantPayload,
} from '../../utils/studentApplicantApi';

type FormValues = {
  studentName: string;
  guardianName: string;
  phone: string;
  email: string;
  birthDate: string;
  codingStatus: '' | '1' | '0';
  program: '' | StudentApplicantPayload['program'];
  school: string;
  branch: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_FORM: FormValues = {
  studentName: '',
  guardianName: '',
  phone: '',
  email: '',
  birthDate: '',
  codingStatus: '',
  program: '',
  school: '',
  branch: '',
};

const FIELD_NAMES: Record<keyof FormValues, string> = {
  studentName: 'student_name',
  guardianName: 'guardian_name',
  phone: 'student_mobile_number',
  email: 'student_email_id',
  birthDate: 'date_of_birth',
  codingStatus: 'custom_coding_status',
  program: 'program',
  school: 'custom_school',
  branch: 'branch',
};

const API_FIELD_TO_FORM: Record<string, keyof FormValues> = {
  first_name: 'studentName',
  custom_guardian_full_name: 'guardianName',
  student_mobile_number: 'phone',
  student_email_id: 'email',
  date_of_birth: 'birthDate',
  custom_coding_status: 'codingStatus',
  program: 'program',
  custom_school: 'school',
  branch: 'branch',
};

const API_ERROR_KEYS: Record<keyof FormValues, string> = {
  studentName: 'reg.err.name_alpha',
  guardianName: 'reg.err.name_alpha',
  phone: 'reg.err.phone_invalid',
  email: 'reg.email_invalid',
  birthDate: 'reg.err.birth_invalid',
  codingStatus: 'reg.err.experience',
  program: 'reg.err.program',
  school: 'reg.err.school',
  branch: 'reg.err.branch',
};

const FIELD_ORDER: (keyof FormValues)[] = [
  'studentName',
  'guardianName',
  'phone',
  'email',
  'birthDate',
  'codingStatus',
  'program',
  'school',
  'branch',
];

const NAME_PATTERN = /^[\p{L}\s]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ClassRegistrationSection: React.FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [branches, setBranches] = useState<StudentApplicantBranch[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);
  const [branchLoadError, setBranchLoadError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const loadBranches = async () => {
    setIsLoadingBranches(true);
    setBranchLoadError(false);

    try {
      setBranches(await fetchStudentApplicantBranches());
    } catch {
      setBranches([]);
      setBranchLoadError(true);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  useEffect(() => {
    void loadBranches();
  }, []);

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    if (submitError) setSubmitError('');
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const studentName = form.studentName.trim();
    const guardianName = form.guardianName.trim();

    if (!studentName) nextErrors.studentName = 'reg.err.student';
    else if (!NAME_PATTERN.test(studentName)) nextErrors.studentName = 'reg.err.name_alpha';
    if (guardianName && !NAME_PATTERN.test(guardianName)) nextErrors.guardianName = 'reg.err.name_alpha';
    if (!form.phone.trim()) nextErrors.phone = 'reg.err.phone_required';
    else if (!normalizePhone(form.phone)) nextErrors.phone = 'reg.err.phone_invalid';
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = 'reg.email_invalid';
    if (!form.birthDate) nextErrors.birthDate = 'reg.err.birth_required';
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate) || form.birthDate < '1900-01-01') nextErrors.birthDate = 'reg.err.birth_invalid';
    else if (form.birthDate > todayISO()) nextErrors.birthDate = 'reg.err.birth_future';
    if (form.codingStatus === '') nextErrors.codingStatus = 'reg.err.experience';
    if (!form.program) nextErrors.program = 'reg.err.program';
    if (!form.school.trim()) nextErrors.school = 'reg.err.school';
    if (!form.branch) nextErrors.branch = 'reg.err.branch';

    return nextErrors;
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    const firstField = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!firstField) return;
    (document.getElementsByName(FIELD_NAMES[firstField])[0] as HTMLElement | undefined)?.focus();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitStudentApplicant({
        first_name: form.studentName.trim(),
        custom_guardian_full_name: form.guardianName.trim() || null,
        student_mobile_number: normalizePhone(form.phone),
        student_email_id: form.email.trim() || null,
        custom_school: form.school.trim(),
        date_of_birth: form.birthDate,
        custom_coding_status: form.codingStatus === '1',
        program: form.program as StudentApplicantPayload['program'],
        branch: form.branch,
      });
      setSubmitted(true);
    } catch (error) {
      if (error instanceof StudentApplicantApiError && Object.keys(error.fieldErrors).length > 0) {
        const serverErrors: FormErrors = {};
        for (const field of Object.keys(error.fieldErrors)) {
          const formField = API_FIELD_TO_FORM[field];
          if (formField) serverErrors[formField] = API_ERROR_KEYS[formField];
        }
        setErrors(serverErrors);
        focusFirstError(serverErrors);
      }
      setSubmitError('reg.section_submit_error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormValues) =>
    `w-full min-h-12 px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-700 ${
      errors[field] ? 'border-red-600 bg-red-50/50' : 'border-slate-500 bg-white'
    }`;

  const errorMessage = (field: keyof FormValues) => errors[field] && (
    <p id={`${FIELD_NAMES[field]}-error`} role="alert" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-700">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {errors[field]?.startsWith('reg.') ? t(errors[field] as string) : errors[field]}
    </p>
  );

  const a11y = (field: keyof FormValues, required = true) => ({
    name: FIELD_NAMES[field],
    'aria-required': required,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field] ? `${FIELD_NAMES[field]}-error` : undefined,
  });

  if (submitted) {
    return (
      <section id="class-registration" className="bg-slate-50 py-20" role="status" aria-live="polite">
        <div className="mx-auto max-w-xl space-y-6 px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle className="h-10 w-10" aria-hidden="true" />
          </div>
          <h2 className="text-3xl font-black text-[#0D47A1]">{t('reg.success_title')}</h2>
          <p className="text-slate-600">{t('reg.section_success_desc').replace('{student}', form.studentName.trim())}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="class-registration" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-2xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-black text-[#0D47A1] lg:text-4xl">{t('reg.title')}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-[#1870FF]" aria-hidden="true" />
          <p className="text-sm text-slate-600 sm:text-base">{t('reg.desc')}</p>
          <p className="text-xs font-semibold text-slate-500">{t('reg.required_note')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-busy={isSubmitting}
          className="space-y-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg sm:p-8"
        >
          <div>
            <label htmlFor="student_name" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.student')} *</label>
            <input
              id="student_name"
              type="text"
              value={form.studentName}
              onChange={(event) => updateField('studentName', event.target.value)}
              placeholder={t('reg.p.student')}
              autoComplete="name"
              className={inputClass('studentName')}
              {...a11y('studentName')}
            />
            {errorMessage('studentName')}
          </div>

          <div>
            <label htmlFor="guardian_name" className="mb-1.5 block text-sm font-bold text-slate-700">
              {t('reg.f.parent')} <span className="font-medium text-slate-500">({t('reg.optional')})</span>
            </label>
            <input
              id="guardian_name"
              type="text"
              value={form.guardianName}
              onChange={(event) => updateField('guardianName', event.target.value)}
              placeholder={t('reg.p.parent')}
              autoComplete="name"
              className={inputClass('guardianName')}
              {...a11y('guardianName', false)}
            />
            {errorMessage('guardianName')}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="student_mobile_number" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.phone')} *</label>
              <input
                id="student_mobile_number"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="08xxxxxxxxxx"
                autoComplete="tel"
                className={inputClass('phone')}
                {...a11y('phone')}
              />
              {errorMessage('phone')}
            </div>
            <div>
              <label htmlFor="student_email_id" className="mb-1.5 block text-sm font-bold text-slate-700">
                {t('reg.f.email')} <span className="font-medium text-slate-500">({t('reg.optional')})</span>
              </label>
              <input
                id="student_email_id"
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder={t('reg.p.email')}
                autoComplete="email"
                className={inputClass('email')}
                {...a11y('email', false)}
              />
              {errorMessage('email')}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="date_of_birth" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.birth')} *</label>
              <input
                id="date_of_birth"
                type="date"
                min="1900-01-01"
                max={todayISO()}
                value={form.birthDate}
                onChange={(event) => updateField('birthDate', event.target.value)}
                className={inputClass('birthDate')}
                {...a11y('birthDate')}
              />
              {errorMessage('birthDate')}
            </div>
            <div>
              <label htmlFor="custom_school" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.school')} *</label>
              <input
                id="custom_school"
                type="text"
                value={form.school}
                onChange={(event) => updateField('school', event.target.value)}
                placeholder={t('reg.p.school')}
                className={inputClass('school')}
                {...a11y('school')}
              />
              {errorMessage('school')}
            </div>
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-slate-700">{t('reg.f.experience')} *</legend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { value: '0' as const, label: t('reg.coding.no') },
                { value: '1' as const, label: t('reg.coding.yes') },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-3 text-center text-sm font-bold transition-colors focus-within:ring-2 focus-within:ring-[#176DF8] focus-within:ring-offset-2 ${
                    form.codingStatus === option.value
                      ? 'border-[#176DF8] bg-blue-50 text-[#0D47A1]'
                      : 'border-slate-500 text-slate-700 hover:border-[#176DF8]'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={form.codingStatus === option.value}
                    onChange={(event) => updateField('codingStatus', event.target.value as FormValues['codingStatus'])}
                    className="sr-only"
                    {...a11y('codingStatus')}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errorMessage('codingStatus')}
          </fieldset>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="program" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.program')} *</label>
              <select
                id="program"
                value={form.program}
                onChange={(event) => updateField('program', event.target.value as FormValues['program'])}
                className={inputClass('program')}
                {...a11y('program')}
              >
                <option value="">{t('reg.p.program')}</option>
                {['Focus', 'Partner', 'Group', 'School'].map((program) => <option key={program} value={program}>{program}</option>)}
              </select>
              {errorMessage('program')}
            </div>

            <div>
              <label htmlFor="branch" className="mb-1.5 block text-sm font-bold text-slate-700">{t('reg.f.branch')} *</label>
              <select
                id="branch"
                value={form.branch}
                onChange={(event) => updateField('branch', event.target.value)}
                disabled={isLoadingBranches || branchLoadError || branches.length === 0}
                aria-busy={isLoadingBranches}
                className={inputClass('branch')}
                {...a11y('branch')}
              >
                <option value="">{isLoadingBranches ? t('reg.branch_loading') : t('reg.p.branch')}</option>
                {branches.map((branch) => <option key={branch.id || branch.endpoint} value={branch.endpoint}>{branch.name}</option>)}
              </select>
              {branchLoadError && (
                <div className="mt-2 flex flex-wrap items-center gap-2" role="alert">
                  <p className="text-xs font-medium text-red-700">{t('reg.branch_error')}</p>
                  <button
                    type="button"
                    onClick={() => void loadBranches()}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#0D47A1] px-3 text-xs font-bold text-[#0D47A1] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:ring-offset-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('reg.branch_retry')}
                  </button>
                </div>
              )}
              {!isLoadingBranches && !branchLoadError && branches.length === 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <p role="status" className="text-xs font-medium text-slate-600">{t('reg.branch_empty')}</p>
                  <button
                    type="button"
                    onClick={() => void loadBranches()}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[#0D47A1] px-3 text-xs font-bold text-[#0D47A1] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:ring-offset-2"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('reg.branch_retry')}
                  </button>
                </div>
              )}
              {errorMessage('branch')}
            </div>
          </div>

          {submitError && (
            <p role="alert" className="rounded-xl border border-red-600 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {t(submitError)}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoadingBranches || branchLoadError || branches.length === 0}
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#176DF8] px-5 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-[#0D47A1] focus:outline-none focus:ring-2 focus:ring-[#176DF8] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:shadow-none"
          >
            {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {isSubmitting ? t('reg.sending') : t('reg.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};
