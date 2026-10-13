import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, ArrowRight, Send, Loader2 } from 'lucide-react';
import { submitToDigitalSystem } from '../../utils/dsApi';
import { SPI_CONFIG } from '../../constants/config';
import { useLanguage } from '../../i18n';
import {
  BRANCH_OPTIONS,
  EMPTY_VALUES,
  EXPERIENCE_OPTIONS,
  FIELD_NAMES,
  FIELD_ORDER,
  PROGRAM_OPTIONS,
  findCategory,
  normalizePhone,
  todayISO,
  validateForm,
  type FormErrors,
  type FormValues,
} from './registrationForm';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
  isRegistration?: boolean;
  onViewTerms?: () => void;
}

const inputClass = (hasError: boolean) =>
  `w-full h-12 px-3.5 text-sm text-[#333333] bg-white border rounded-lg outline-none transition-colors placeholder:text-slate-400 focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/25 ${
    hasError ? 'border-red-500' : 'border-[#D6D6D6]'
  }`;

const Field: React.FC<{
  label: string;
  htmlFor: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, error, helper, children }) => (
  <div className="min-w-0">
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#041A5A] mb-1.5">
      {label} <span className="text-red-500" aria-hidden="true">*</span>
    </label>
    {children}
    {helper && !error && <p className="mt-1.5 text-xs text-slate-500">{helper}</p>}
    {error && (
      <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {error}
      </p>
    )}
  </div>
);

const Group: React.FC<{ legend: string; children: React.ReactNode }> = ({ legend, children }) => (
  <fieldset className="min-w-0 space-y-4">
    <legend className="text-xs font-black uppercase tracking-wider text-[#176DF8] mb-1">{legend}</legend>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">{children}</div>
  </fieldset>
);

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  isRegistration = false,
  onViewTerms,
}) => {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);

  // Close with Escape while the dialog is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = FIELD_ORDER.find((k) => nextErrors[k]);
      if (first) (document.getElementsByName(FIELD_NAMES[first])[0] as HTMLElement | undefined)?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError('');

    let ok = false;
    try {
      const res = await submitToDigitalSystem({
        first_name: values.studentName.trim(),
        custom_guardian_full_name: values.parentName.trim(),
        student_mobile_number: normalizePhone(values.phone),
        custom_school: values.school.trim(),
        date_of_birth: values.birthDate,
        custom_coding_status: EXPERIENCE_OPTIONS.find((o) => o.value === values.programmingExperience)?.label ?? '',
        program: findCategory(values.programCategory)?.label ?? '',
        branch: BRANCH_OPTIONS.find((o) => o.value === values.branch)?.label ?? '',
      });
      ok = res.success;
    } catch {
      ok = false;
    }

    submittingRef.current = false;
    setIsSubmitting(false);
    if (ok) {
      setIsSubmitted(true);
    } else {
      setSubmitError('reg.submit_error');
    }
  };

  const handleOpenWhatsApp = () => {
    const message = t('reg.wa_message')
      .replace('{parent}', values.parentName || '-')
      .replace('{student}', values.studentName || '-')
      .replace('{school}', values.school || '-')
      .replace('{type}', t(isRegistration ? 'reg.badge_register' : 'reg.badge_trial'))
      .replace('{program}', findCategory(values.programCategory)?.label || '-')
      .replace('{branch}', BRANCH_OPTIONS.find((b) => b.value === values.branch)?.label || '-');
    window.open(`https://wa.me/${SPI_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-dialog-title"
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200 my-auto"
      >
        {/* Header: slim and light, so the form gets the space */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-slate-100 shrink-0">
          <div className="space-y-1.5 min-w-0">
            <span className="inline-block text-[11px] font-bold text-[#176DF8] bg-[#176DF8]/10 px-2.5 py-0.5 rounded-full">
              {t(isRegistration ? 'reg.badge_register' : 'reg.badge_trial')}
            </span>
            <h3 id="registration-dialog-title" className="text-xl sm:text-2xl font-black text-[#041A5A] leading-tight">
              {t(isRegistration ? 'reg.title_register' : 'reg.title_trial')}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="shrink-0 w-10 h-10 -mt-1 -mr-1 flex items-center justify-center rounded-full text-slate-500 hover:text-[#041A5A] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body scrolls inside the dialog on short screens */}
        <div className="overflow-y-auto px-5 sm:px-7 py-5 sm:py-6">
          {!isSubmitted ? (
            <>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{t('reg.intro')}</p>
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                <Group legend={t('reg.group.identity')}>
                  <Field label={t('reg.f.parent')} htmlFor="parent_name" error={errors.parentName && t(errors.parentName)}>
                    <input
                      id="parent_name"
                      name="parent_name"
                      type="text"
                      autoComplete="name"
                      value={values.parentName}
                      onChange={(e) => setField('parentName', e.target.value)}
                      placeholder={t('reg.p.parent')}
                      aria-invalid={!!errors.parentName}
                      className={inputClass(!!errors.parentName)}
                    />
                  </Field>
                  <Field label={t('reg.f.student')} htmlFor="student_name" error={errors.studentName && t(errors.studentName)}>
                    <input
                      id="student_name"
                      name="student_name"
                      type="text"
                      value={values.studentName}
                      onChange={(e) => setField('studentName', e.target.value)}
                      placeholder={t('reg.p.student')}
                      aria-invalid={!!errors.studentName}
                      className={inputClass(!!errors.studentName)}
                    />
                  </Field>
                </Group>

                <Group legend={t('reg.group.contact')}>
                  <Field label={t('reg.f.phone')} htmlFor="phone" error={errors.phone && t(errors.phone)}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      placeholder="62+++"
                      aria-invalid={!!errors.phone}
                      className={inputClass(!!errors.phone)}
                    />
                  </Field>
                  <Field label={t('reg.f.birth')} htmlFor="birth_date" error={errors.birthDate && t(errors.birthDate)}>
                    <input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      min="1900-01-01"
                      max={todayISO()}
                      value={values.birthDate}
                      onChange={(e) => setField('birthDate', e.target.value)}
                      aria-invalid={!!errors.birthDate}
                      className={inputClass(!!errors.birthDate)}
                    />
                  </Field>
                </Group>

                <Group legend={t('reg.group.program')}>
                  <Field
                    label={t('reg.f.experience')}
                    htmlFor="programming_experience"
                    error={errors.programmingExperience && t(errors.programmingExperience)}
                  >
                    <select
                      id="programming_experience"
                      name="programming_experience"
                      value={values.programmingExperience}
                      onChange={(e) => setField('programmingExperience', e.target.value)}
                      aria-invalid={!!errors.programmingExperience}
                      className={inputClass(!!errors.programmingExperience)}
                    >
                      <option value="">{t('reg.p.experience')}</option>
                      {EXPERIENCE_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{t(`reg.exp.${o.value}`)}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label={t('reg.f.program')}
                    htmlFor="program_category"
                    error={errors.programCategory && t(errors.programCategory)}
                    helper={t('reg.h.program')}
                  >
                    <select
                      id="program_category"
                      name="program_category"
                      value={values.programCategory}
                      onChange={(e) => setField('programCategory', e.target.value)}
                      aria-invalid={!!errors.programCategory}
                      className={inputClass(!!errors.programCategory)}
                    >
                      <option value="">{t('reg.p.program')}</option>
                      {PROGRAM_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t('reg.f.school')} htmlFor="school" error={errors.school && t(errors.school)}>
                    <input
                      id="school"
                      name="school"
                      type="text"
                      autoComplete="organization"
                      value={values.school}
                      onChange={(e) => setField('school', e.target.value)}
                      placeholder={t('reg.p.school')}
                      aria-invalid={!!errors.school}
                      className={inputClass(!!errors.school)}
                    />
                  </Field>
                  <Field label={t('reg.f.branch')} htmlFor="branch" error={errors.branch && t(errors.branch)}>
                    <select
                      id="branch"
                      name="branch"
                      value={values.branch}
                      onChange={(e) => setField('branch', e.target.value)}
                      aria-invalid={!!errors.branch}
                      className={inputClass(!!errors.branch)}
                    >
                      <option value="">{t('reg.p.branch')}</option>
                      {BRANCH_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </Field>
                </Group>

                {/* Terms: the whole row is the target, so it is easy to tap on mobile */}
                <div className="rounded-xl bg-[#F7F8FC] border border-slate-200 p-4">
                  <label className="flex items-start gap-3 text-sm text-[#333333] cursor-pointer">
                    <input
                      type="checkbox"
                      name="terms_accepted"
                      checked={values.termsAccepted}
                      onChange={(e) => setField('termsAccepted', e.target.checked)}
                      aria-invalid={!!errors.termsAccepted}
                      aria-describedby={errors.termsAccepted ? 'terms-error' : undefined}
                      className="mt-0.5 w-5 h-5 shrink-0 rounded border-[#D6D6D6] accent-[#176DF8] cursor-pointer"
                    />
                    <span className="leading-relaxed">
                      {t('reg.terms_prefix')}{' '}
                      <button
                        type="button"
                        onClick={onViewTerms}
                        className="text-[#176DF8] underline underline-offset-2 font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] rounded"
                      >
                        {t('reg.terms_link')}
                      </button>{' '}
                      <span className="text-red-500" aria-hidden="true">*</span>
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p id="terms-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
                      {t(errors.termsAccepted)}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div role="alert" className="p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
                    {t(submitError)}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full h-12 px-4 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176DF8] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                  <span>
                    {isSubmitting
                      ? t('reg.sending')
                      : submitError
                      ? t('reg.retry')
                      : t(isRegistration ? 'reg.submit_register' : 'reg.submit_trial')}
                  </span>
                  {!isSubmitting && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#176DF8] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-[#041A5A]">
                  {t(isRegistration ? 'reg.success_register' : 'reg.success_trial')}
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {t('reg.success_desc').replace('{parent}', values.parentName).replace('{student}', values.studentName)}
                </p>
              </div>
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full h-12 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{t('reg.chat_whatsapp')}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
