import React, { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2, ArrowRight, Send, Loader2 } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { submitToDigitalSystem } from '../../utils/dsApi';
import { SPI_CONFIG } from '../../constants/config';
import { ASSETS } from '../../constants/assets';
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

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const inputClass = (hasError: boolean) =>
  `w-full h-12 px-3.5 text-sm text-[#0B1220] bg-[#F3F7FF] border rounded-xl outline-none transition-colors placeholder:text-[#8A9BB8] hover:border-[#A9C6FF] focus:bg-white focus:border-[#1870FF] focus:ring-4 focus:ring-[#1870FF]/15 disabled:opacity-60 ${
    hasError ? 'border-red-400 bg-red-50/40' : 'border-[#DCE7FB]'
  }`;

/** Faint circuit traces and soft light shapes, so the blue panel has depth without noise. */
const PanelTexture: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <circle cx="300" cy="40" r="120" fill="#fff" opacity="0.08" />
    <circle cx="-10" cy="640" r="150" fill="#fff" opacity="0.07" />
    <circle cx="250" cy="430" r="60" fill="#fff" opacity="0.05" />
    <g stroke="#fff" strokeWidth="1.3" fill="none" opacity="0.22" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 150H54L76 172H128" />
      <path d="M210 0V46L232 68V118" />
      <path d="M340 250H284L262 272V330" />
      <path d="M0 470H38L58 450H112" />
      <path d="M170 700V650L192 628H250" />
      <path d="M300 560V520L320 500H340" />
    </g>
    <g fill="#fff" opacity="0.35">
      <circle cx="128" cy="172" r="3.5" />
      <circle cx="232" cy="118" r="3.5" />
      <circle cx="262" cy="330" r="3.5" />
      <circle cx="112" cy="450" r="3.5" />
      <circle cx="250" cy="628" r="3.5" />
    </g>
    <g fill="#fff" opacity="0.18">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 4 }).map((__, c) => <circle key={`${r}-${c}`} cx={36 + c * 14} cy={36 + r * 14} r="1.6" />)
      )}
    </g>
  </svg>
);

/** Layered wave edge where the blue panel meets the white form. */
const WaveEdge: React.FC = () => (
  <svg className="absolute right-0 top-0 h-full w-[64px] pointer-events-none" viewBox="0 0 64 600" preserveAspectRatio="none" aria-hidden="true">
    <path d="M64 0H30C12 60 42 110 24 170S38 290 20 350 36 470 18 530C8 565 22 590 26 600H64Z" fill="#fff" opacity="0.22" />
    <path d="M64 0H40C26 50 52 100 36 160S48 280 32 340 46 460 30 520C22 555 34 585 38 600H64Z" fill="#fff" opacity="0.45" />
    <path d="M64 0H50C40 60 60 110 48 170S58 290 46 350 58 470 46 530C40 565 48 590 50 600H64Z" fill="#fff" />
  </svg>
);

const Field: React.FC<{
  label: string;
  htmlFor: string;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}> = ({ label, htmlFor, error, helper, children }) => (
  <div className="min-w-0">
    <label htmlFor={htmlFor} className="block text-[13px] font-semibold text-[#041A5A] mb-1.5">
      {label}
    </label>
    {children}
    {helper && !error && <p id={`${htmlFor}-help`} className="mt-1.5 text-xs text-slate-500">{helper}</p>}
    {error && (
      <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {error}
      </p>
    )}
  </div>
);

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({
  isOpen,
  onClose,
  isRegistration = false,
  onViewTerms,
}) => {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  // The parent passes a new onClose on every render; keep the latest in a ref so the
  // focus effect below runs only when the dialog opens or closes.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus management: move focus into the dialog, trap Tab inside it, lock page scroll,
  // close on Escape, and return focus to whatever opened the dialog when it closes.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    // On phones, focus the dialog itself so the on-screen keyboard does not cover the form at once.
    (wide ? dialog?.querySelector<HTMLElement>('input, select') : dialog)?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialog) return;
      const items = Array.from<HTMLElement>(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  if (!isOpen) return null;

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /** Shared accessibility props for a field: required, invalid state and its message. */
  const a11y = (key: keyof FormValues, hasHelper = false) => {
    const id = FIELD_NAMES[key];
    const describedBy = errors[key] ? `${id}-error` : hasHelper ? `${id}-help` : undefined;
    return { 'aria-required': true, 'aria-invalid': !!errors[key], 'aria-describedby': describedBy };
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

  const steps = ['s1', 's2', 's3', 's4'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#041A5A]/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6">
      <motion.div
        ref={dialogRef}
        initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-dialog-title"
        aria-describedby={isSubmitted ? undefined : 'registration-dialog-desc'}
        tabIndex={-1}
        className="relative bg-white rounded-[24px] sm:rounded-[28px] w-full max-w-lg sm:max-w-2xl lg:max-w-[980px] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] grid lg:grid-cols-[340px_1fr] overflow-hidden shadow-[0_40px_100px_-30px_rgba(4,26,90,0.55)] outline-none my-auto"
      >
        {/* Side panel (wide screens): Electric Blue with circuit texture and a layered wave edge */}
        <aside className="hidden lg:flex relative flex-col justify-between text-white pl-8 pr-14 py-8 overflow-hidden bg-[linear-gradient(160deg,#2A7DFF_0%,#1870FF_45%,#1260E8_100%)]">
          <PanelTexture />
          <WaveEdge />

          <div className="relative space-y-6">
            <span className="inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-[0_8px_20px_-10px_rgba(4,26,90,0.5)]">
              <img src={ASSETS.brand.logoHeader} alt="Sekolah Programming Indonesia" className="h-7 w-auto" decoding="async" />
            </span>
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#041A5A] bg-[#FFC928] rounded-md px-2 py-1">
                {t(isRegistration ? 'reg.badge_register' : 'reg.badge_trial')}
              </span>
              <p className="text-[26px] font-black leading-[1.15] tracking-tight text-balance">{t('cta.parents_title')}</p>
            </div>

            {isRegistration ? (
              <p className="text-sm font-semibold leading-relaxed text-white/90">{t('reg.side_register')}</p>
            ) : (
              <div className="rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-[2px]">
                <p className="text-xs font-black uppercase tracking-wider text-white/80 mb-3">{t('reg.next_title')}</p>
                <ol className="space-y-2.5">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-white text-[#1870FF] text-[11px] font-black flex items-center justify-center tabular-nums" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold leading-snug">{t(`trial.${s}.title`)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Mascot on a soft spotlight, rising in once */}
          <div className="relative h-40 mt-6" aria-hidden="true">
            <span className="absolute left-2 bottom-0 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_70%)]" />
            <span className="absolute left-10 bottom-1 w-24 h-3 rounded-full bg-[#041A5A]/25 blur-[3px]" />
            <motion.img
              src={ASSETS.brand.pandaMascot}
              alt=""
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-4 bottom-2 w-36 h-36 object-contain drop-shadow-[0_12px_18px_rgba(4,26,90,0.35)]"
              decoding="async"
            />
          </div>
        </aside>

        {/* Form column */}
        <div className="flex flex-col min-h-0 max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)]">
          {/* Compact Electric Blue band on smaller screens */}
          <div className="lg:hidden relative h-[88px] shrink-0 overflow-hidden bg-[linear-gradient(160deg,#2A7DFF_0%,#1870FF_55%,#1260E8_100%)]" aria-hidden="true">
            <PanelTexture />
            <span className="absolute left-5 top-4 inline-flex items-center rounded-lg bg-white px-2.5 py-1.5">
              <img src={ASSETS.brand.logoHeader} alt="" className="h-5 w-auto" decoding="async" />
            </span>
            <img src={ASSETS.brand.pandaMascot} alt="" className="absolute right-14 -bottom-3 w-20 h-20 object-contain" decoding="async" />
            <svg className="absolute left-0 right-0 bottom-0 w-full h-6" viewBox="0 0 400 24" preserveAspectRatio="none">
              <path d="M0 10 C50 0 90 20 140 12 S240 0 290 10 S370 22 400 8 V24 H0Z" fill="#fff" opacity="0.3" />
              <path d="M0 16 C60 6 100 24 160 16 S260 6 310 16 S380 24 400 14 V24 H0Z" fill="#fff" />
            </svg>
          </div>

          <div className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-6 sm:pt-8 pb-4 shrink-0">
            <div className="space-y-2 min-w-0">
              <span className="lg:hidden inline-block text-[11px] font-bold text-[#1870FF] bg-[#1870FF]/10 px-2.5 py-0.5 rounded-full">
                {t(isRegistration ? 'reg.badge_register' : 'reg.badge_trial')}
              </span>
              <h3 id="registration-dialog-title" className="text-2xl sm:text-[28px] font-black text-[#041A5A] leading-tight tracking-tight">
                {t(isRegistration ? 'reg.title_register' : 'reg.title_trial')}
              </h3>
              {!isSubmitted && (
                <p id="registration-dialog-desc" className="text-sm text-slate-600 leading-relaxed max-w-md">
                  {t('reg.intro')}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="shrink-0 w-10 h-10 -mt-1 -mr-2 flex items-center justify-center rounded-full text-slate-500 hover:text-[#041A5A] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body scrolls inside the dialog on short screens */}
          <div className="overflow-y-auto px-5 sm:px-8 pb-6 sm:pb-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate>
                <fieldset disabled={isSubmitting} className="min-w-0 space-y-5">
                  <legend className="sr-only">{t(isRegistration ? 'reg.title_register' : 'reg.title_trial')}</legend>
                  <p className="text-xs text-slate-500">{t('reg.all_required')}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                    <Field label={t('reg.f.parent')} htmlFor="parent_name" error={errors.parentName && t(errors.parentName)}>
                      <input
                        id="parent_name"
                        name="parent_name"
                        type="text"
                        autoComplete="name"
                        value={values.parentName}
                        onChange={(e) => setField('parentName', e.target.value)}
                        placeholder={t('reg.p.parent')}
                        {...a11y('parentName')}
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
                        {...a11y('studentName')}
                        className={inputClass(!!errors.studentName)}
                      />
                    </Field>
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
                        {...a11y('phone')}
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
                        {...a11y('birthDate')}
                        className={inputClass(!!errors.birthDate)}
                      />
                    </Field>
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
                        {...a11y('programmingExperience')}
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
                        {...a11y('programCategory', true)}
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
                        {...a11y('school')}
                        className={inputClass(!!errors.school)}
                      />
                    </Field>
                    <Field label={t('reg.f.branch')} htmlFor="branch" error={errors.branch && t(errors.branch)}>
                      <select
                        id="branch"
                        name="branch"
                        value={values.branch}
                        onChange={(e) => setField('branch', e.target.value)}
                        {...a11y('branch')}
                        className={inputClass(!!errors.branch)}
                      >
                        <option value="">{t('reg.p.branch')}</option>
                        {BRANCH_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Terms: the whole row is the target, so it is easy to tap on mobile */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                      <input
                        id="terms_accepted"
                        type="checkbox"
                        name="terms_accepted"
                        checked={values.termsAccepted}
                        onChange={(e) => setField('termsAccepted', e.target.checked)}
                        {...a11y('termsAccepted')}
                        className="mt-0.5 w-5 h-5 shrink-0 rounded border-[#CBD5E1] accent-[#1870FF] cursor-pointer"
                      />
                      <span className="leading-relaxed">
                        {t('reg.terms_prefix')}{' '}
                        <button
                          type="button"
                          onClick={onViewTerms}
                          className="text-[#1870FF] underline underline-offset-2 font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] rounded"
                        >
                          {t('reg.terms_link')}
                        </button>
                      </span>
                    </label>
                    {errors.termsAccepted && (
                      <p id="terms_accepted-error" role="alert" className="mt-2 text-xs font-medium text-red-600">
                        {t(errors.termsAccepted)}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div role="alert" className="p-3.5 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
                      {t(submitError)}
                    </div>
                  )}

                  <button
                    type="submit"
                    aria-busy={isSubmitting}
                    className="w-full h-[52px] px-4 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold text-[15px] rounded-xl shadow-[0_12px_24px_-12px_rgba(24,112,255,0.8)] transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
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
                </fieldset>
              </form>
            ) : (
              /* Success state */
              <div className="py-4 sm:py-8 space-y-6" role="status">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF4FF] text-[#1870FF] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h4 ref={successRef} tabIndex={-1} className="text-xl sm:text-2xl font-black text-[#041A5A] outline-none">
                    {t(isRegistration ? 'reg.success_register' : 'reg.success_trial')}
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                    {t('reg.success_desc').replace('{parent}', values.parentName).replace('{student}', values.studentName)}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="h-12 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{t('reg.chat_whatsapp')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-12 px-5 text-sm font-bold text-slate-600 hover:text-[#041A5A] rounded-xl hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                  >
                    {t('common.close')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
