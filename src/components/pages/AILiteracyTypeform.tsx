import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertTriangle, ArrowRight, Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { AI_TOOL_NONE, FORM_SECTIONS, type FieldName, type FormField, type FormSection } from '../../data/aiLiteracyForm';
import { validate, type FieldErrors, type RegistrationValues } from '../../utils/aiLiteracyRegistration';
import { ASSETS } from '../../constants/assets';

/** Every question in order, one per screen. */
export const FLOW_FIELDS: { field: FormField; section: FormSection; sectionIndex: number }[] = FORM_SECTIONS.flatMap((section, sectionIndex) =>
  section.fields.map((field) => ({ field, section, sectionIndex })),
);

export const flowIndexOf = (name: FieldName) => FLOW_FIELDS.findIndex((item) => item.field.name === name);

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TEXT_TYPES = ['text', 'email', 'tel'];

interface AILiteracyTypeformProps {
  values: RegistrationValues;
  onChange: <K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) => void;
  errors: FieldErrors;
  setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
  step: number;
  setStep: (step: number) => void;
  submitting: boolean;
  /** Message from the server when sending failed. Shown on the last question. */
  submitError: string;
  onSubmit: (values: RegistrationValues) => void;
  onClose: () => void;
}

interface OptionButtonProps {
  letter: string;
  label: string;
  selected: boolean;
  role: 'radio' | 'checkbox';
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ letter, label, selected, role, onClick }) => (
  <button
    type="button"
    role={role}
    aria-checked={selected}
    onClick={onClick}
    className={`group flex min-h-[56px] w-full cursor-pointer items-center gap-3.5 rounded-2xl border-2 px-4 py-3 text-left text-[17px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 ${
      selected
        ? 'border-[#1870FF] bg-gradient-to-br from-[#1870FF] to-[#1059D4] text-white shadow-[0_18px_32px_-16px_rgba(24,112,255,0.95)]'
        : 'border-white bg-white text-[#041A5A] shadow-[0_10px_24px_-18px_rgba(4,26,90,0.45)] hover:-translate-y-0.5 hover:border-[#1870FF]/40'
    }`}
  >
    <span
      aria-hidden="true"
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-sm font-black transition-colors ${
        selected ? 'border-white/70 bg-white text-[#1870FF]' : 'border-[#1870FF]/40 bg-[#EEF4FF] text-[#1870FF] group-hover:bg-white'
      }`}
    >
      {selected ? <Check className="h-4 w-4" strokeWidth={3} /> : letter}
    </span>
    <span className="leading-snug">{label}</span>
  </button>
);

/** One question at a time, full screen, in the style of a conversational form. */
export const AILiteracyTypeform: React.FC<AILiteracyTypeformProps> = ({
  values,
  onChange,
  errors,
  setErrors,
  step,
  setStep,
  submitting,
  submitError,
  onSubmit,
  onClose,
}) => {
  const reduce = !!useReducedMotion();
  const [dir, setDir] = useState<1 | -1>(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const total = FLOW_FIELDS.length;
  const { field, section, sectionIndex } = FLOW_FIELDS[step];
  const isLast = step === total - 1;
  const error = errors[field.name];
  const sectionTitle = section.title.replace(/^\d+\.\s*/, '');
  const options = field.options ?? [];

  // Handlers that run later (auto-advance) always read the latest values and step through these refs.
  const live = useRef({ values, step, isLast });
  live.current = { values, step, isLast };

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Keyboard shortcuts need focus inside the dialog; keep the first input's own autofocus if it already has it.
    if (!rootRef.current?.contains(document.activeElement)) rootRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    window.clearTimeout(timer.current);
    mainRef.current?.scrollTo({ top: 0 });
    // Text questions focus their own input. For choices, keep focus inside the dialog so the letter shortcuts work.
    if (!contentRef.current?.contains(document.activeElement)) rootRef.current?.focus({ preventScroll: true });
  }, [step]);

  const goTo = (next: number) => {
    setDir(next > live.current.step ? 1 : -1);
    setStep(next);
  };

  const tryNext = () => {
    const { values: current, step: at, isLast: last } = live.current;
    const name = FLOW_FIELDS[at].field.name;
    const found = validate(current)[name];
    if (found) {
      setErrors((prev) => ({ ...prev, [name]: found }));
      return;
    }
    if (last) {
      onSubmit(current);
      return;
    }
    goTo(at + 1);
  };

  const goBack = () => {
    if (live.current.step > 0) goTo(live.current.step - 1);
  };

  /** After choosing an answer that is complete on its own, move on shortly, as the choice animation finishes. */
  const advanceSoon = () => {
    if (live.current.isLast) return;
    const at = live.current.step;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      if (live.current.step === at) tryNext();
    }, reduce ? 0 : 320);
  };

  const choose = (option: string) => {
    onChange(field.name as keyof RegistrationValues, option as never);
    advanceSoon();
  };

  const toggleTool = (option: string) => {
    const selected = values[field.name] as string[];
    const checked = selected.includes(option);
    let next: string[];
    if (checked) next = selected.filter((s) => s !== option);
    else next = option === AI_TOOL_NONE ? [option] : [...selected.filter((s) => s !== AI_TOOL_NONE), option];
    onChange(field.name as keyof RegistrationValues, next as never);
  };

  const pickScale = (n: number) => {
    onChange('ai_confidence', n);
    advanceSoon();
  };

  const toggleConsent = () => {
    const next = !values.data_consent;
    onChange('data_consent', next);
    if (next) advanceSoon();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    const target = e.target as HTMLElement;
    const tag = target.tagName;

    if (e.key === 'Tab') {
      const nodes = rootRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([tabindex="-1"]), textarea, select, a[href]');
      const focusable: HTMLElement[] = nodes ? Array.from(nodes) : [];
      if (focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === rootRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      return;
    }

    if (e.key === 'Enter') {
      if (tag === 'TEXTAREA' && e.shiftKey) return;
      // Buttons keep their own click, except the multiple-choice ones where Enter means "continue".
      if ((tag === 'BUTTON' || tag === 'A') && target.getAttribute('role') !== 'checkbox') return;
      e.preventDefault();
      tryNext();
      return;
    }

    const typing = tag === 'TEXTAREA' || tag === 'SELECT' || (tag === 'INPUT' && TEXT_TYPES.includes((target as HTMLInputElement).type));
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;

    if (field.kind === 'scale' && /^[1-5]$/.test(e.key)) {
      e.preventDefault();
      pickScale(Number(e.key));
      return;
    }
    if (field.kind === 'consent' && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      toggleConsent();
      return;
    }
    if (field.kind === 'radio' || field.kind === 'select' || field.kind === 'checkbox') {
      const index = e.key.length === 1 ? LETTERS.indexOf(e.key.toUpperCase()) : -1;
      if (index >= 0 && index < options.length) {
        e.preventDefault();
        if (field.kind === 'checkbox') toggleTool(options[index]);
        else choose(options[index]);
      }
    }
  };

  const percent = Math.round((step / total) * 100);
  const autoAdvances = !isLast && (field.kind === 'radio' || field.kind === 'select' || field.kind === 'scale');

  const renderControl = () => {
    switch (field.kind) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            autoFocus
            id="flow-input"
            name={field.name}
            type={field.kind}
            value={values[field.name] as string}
            placeholder={field.placeholder ?? 'Ketik jawaban Anda di sini...'}
            autoComplete={field.kind === 'email' ? 'email' : field.kind === 'tel' ? 'tel' : 'off'}
            inputMode={field.kind === 'tel' ? 'tel' : undefined}
            aria-labelledby="flow-question"
            aria-describedby={error ? 'flow-error' : undefined}
            aria-invalid={Boolean(error)}
            onChange={(e) => onChange(field.name as keyof RegistrationValues, e.target.value as never)}
            className={`w-full border-0 border-b-2 bg-transparent py-3 text-2xl font-semibold text-[#041A5A] transition-colors placeholder:text-[#1870FF]/30 focus:outline-none sm:text-3xl ${
              error ? 'border-red-400 focus:border-red-500' : 'border-[#1870FF]/35 focus:border-[#1870FF]'
            }`}
          />
        );

      case 'textarea':
        return (
          <textarea
            autoFocus
            id="flow-input"
            name={field.name}
            rows={3}
            value={values[field.name] as string}
            placeholder={field.placeholder ?? 'Ketik jawaban Anda di sini...'}
            aria-labelledby="flow-question"
            onChange={(e) => onChange(field.name as keyof RegistrationValues, e.target.value as never)}
            className="w-full resize-none border-0 border-b-2 border-[#1870FF]/35 bg-transparent py-3 text-xl font-semibold text-[#041A5A] transition-colors placeholder:text-[#1870FF]/30 focus:border-[#1870FF] focus:outline-none sm:text-2xl"
          />
        );

      case 'select':
      case 'radio': {
        const value = values[field.name] as string;
        return (
          <div role="radiogroup" aria-labelledby="flow-question" className={`grid gap-2.5 ${options.length > 6 ? 'sm:grid-cols-2' : 'max-w-xl'}`}>
            {options.map((option, i) => (
              <OptionButton key={option} letter={LETTERS[i]} label={option} role="radio" selected={value === option} onClick={() => choose(option)} />
            ))}
          </div>
        );
      }

      case 'checkbox': {
        const selected = values[field.name] as string[];
        return (
          <div role="group" aria-labelledby="flow-question" className="grid gap-2.5 sm:grid-cols-2">
            {options.map((option, i) => (
              <OptionButton key={option} letter={LETTERS[i]} label={option} role="checkbox" selected={selected.includes(option)} onClick={() => toggleTool(option)} />
            ))}
          </div>
        );
      }

      case 'scale': {
        const value = values[field.name] as number | null;
        return (
          <div>
            <div role="radiogroup" aria-labelledby="flow-question" className="grid max-w-xl grid-cols-5 gap-2.5 sm:gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={value === n}
                  onClick={() => pickScale(n)}
                  className={`flex h-16 cursor-pointer items-center justify-center rounded-2xl border-2 text-2xl font-black transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 sm:h-20 ${
                    value === n
                      ? 'border-[#1870FF] bg-gradient-to-br from-[#1870FF] to-[#1059D4] text-white shadow-[0_18px_32px_-16px_rgba(24,112,255,0.95)]'
                      : 'border-white bg-white text-[#041A5A] shadow-[0_10px_24px_-18px_rgba(4,26,90,0.45)] hover:-translate-y-0.5 hover:border-[#1870FF]/40'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            {field.scaleLabels && (
              <div className="mt-3 flex max-w-xl justify-between gap-4 text-sm font-semibold text-slate-500">
                <span>{field.scaleLabels[0]}</span>
                <span className="text-right">{field.scaleLabels[1]}</span>
              </div>
            )}
          </div>
        );
      }

      case 'consent':
        return (
          <div className="max-w-xl">
            <OptionButton letter="Y" label="Ya, saya setuju" role="checkbox" selected={values.data_consent} onClick={toggleConsent} />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Data Anda hanya dipakai untuk administrasi pendaftaran, informasi kegiatan, dan evaluasi program. Kami tidak membagikannya kepada pihak lain di luar kebutuhan kegiatan ini.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Formulir pendaftaran Gerakan AI Literacy Indonesia"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex h-[100dvh] flex-col overflow-hidden bg-[#F4F8FF] text-[#0B1220] outline-none"
    >
      {/* soft sky: faint grid and light blobs, in the same language as the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.35] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
          style={{ backgroundImage: 'linear-gradient(#C9DAF7 1px, transparent 1px), linear-gradient(90deg, #C9DAF7 1px, transparent 1px)', backgroundSize: '44px 44px' }}
        />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#9CC2FF]/40 blur-3xl" />
      </div>

      <img src={ASSETS.brand.pandaMascot} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-24 right-6 hidden w-28 drop-shadow-[0_18px_24px_rgba(2,18,70,0.35)] lg:block xl:w-36" />

      {/* honeypot: people never see or fill this */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website_hp">Jangan isi kolom ini</label>
        <input id="website_hp" name="website_hp" type="text" tabIndex={-1} autoComplete="off" value={values.website_hp} onChange={(e) => onChange('website_hp', e.target.value)} />
      </div>

      <div
        className="relative h-2 w-full bg-white/70"
        role="progressbar"
        aria-label="Progres pengisian formulir"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="h-full rounded-r-full bg-gradient-to-r from-[#1870FF] to-[#38BDF8] shadow-[0_0_14px_rgba(24,112,255,0.55)] transition-all duration-500" style={{ width: `${Math.max(percent, 2)}%` }} />
      </div>

      <header className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex min-w-0 items-center gap-4">
          <img src={ASSETS.brand.logoHeader} alt="Sekolah Programming Indonesia" className="h-8 w-auto shrink-0 sm:h-9" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[#041A5A] shadow-sm transition-colors hover:text-[#1870FF] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          Tutup
        </button>
      </header>

      <main ref={mainRef} className="relative flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-3xl items-center px-5 py-8 sm:px-8">
          {/* The new question replaces the old one at once, so typing right after Enter always lands in the new field. */}
          <motion.div
            key={step}
            ref={contentRef}
            initial={{ opacity: 0, y: reduce ? 0 : dir * 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#1870FF] shadow-[0_8px_20px_-14px_rgba(4,26,90,0.5)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1870FF]" aria-hidden="true" />
              Bagian {sectionIndex + 1} dari {FORM_SECTIONS.length} · {sectionTitle}
            </span>

            <h2 id="flow-question" className="flex items-start gap-3 text-3xl font-black leading-[1.15] tracking-tight text-[#041A5A] sm:gap-4 sm:text-5xl">
              <span className="mt-2 flex shrink-0 items-center gap-1 rounded-lg bg-[#1870FF] px-2 py-0.5 text-sm font-black text-white sm:mt-3 sm:text-base" aria-hidden="true">
                {step + 1}
                <ArrowRight className="h-4 w-4" />
              </span>
              <span>
                {field.label}
                {field.required ? (
                  <span aria-hidden="true" className="text-red-500">
                    {'\u00A0'}*
                  </span>
                ) : (
                  <span className="ml-3 inline-block translate-y-[-3px] rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-500">Opsional</span>
                )}
              </span>
            </h2>

            {field.hint && <p className="mt-3 pl-8 text-base text-slate-600 sm:pl-12 sm:text-lg">{field.hint}</p>}
            {field.kind === 'checkbox' && <p className="mt-3 pl-8 text-base text-slate-600 sm:pl-12 sm:text-lg">Bisa memilih lebih dari satu.</p>}

            <div className="mt-7 pl-0 sm:mt-9 sm:pl-12">
              {renderControl()}

              {error && (
                <p id="flow-error" role="alert" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">
                  <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}

              {isLast && submitError && (
                <p role="alert" className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {submitError}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-4">
                {autoAdvances ? (
                  <p className="hidden text-sm text-slate-500 sm:block">
                    {field.kind === 'scale' ? 'Tekan angka 1 sampai 5 pada keyboard, atau klik jawaban Anda.' : 'Tekan huruf pada keyboard, atau klik jawaban Anda.'}
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={tryNext}
                      disabled={submitting}
                      className="inline-flex h-14 cursor-pointer items-center gap-3 rounded-2xl bg-gradient-to-r from-[#1870FF] to-[#1059D4] px-7 text-lg font-black text-white shadow-[0_18px_32px_-14px_rgba(24,112,255,0.95)] transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                    >
                      {isLast ? (submitting ? 'Mengirim pendaftaran...' : 'Kirim Pendaftaran') : 'Lanjut'}
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <p className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                      atau tekan
                      <kbd className="rounded-md border border-slate-300 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700 shadow-sm">Enter ↵</kbd>
                      {field.kind === 'textarea' ? ' (Shift + Enter untuk baris baru)' : ''}
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#041A5A] shadow-sm">
          {step + 1} dari {total}
        </p>
        <div className="flex items-center gap-2" role="group" aria-label="Pindah pertanyaan">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            aria-label="Pertanyaan sebelumnya"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-[#1870FF] to-[#1059D4] text-white shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)] transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ChevronUp className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={tryNext}
            disabled={isLast || submitting}
            aria-label="Pertanyaan berikutnya"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-[#1870FF] to-[#1059D4] text-white shadow-[0_12px_24px_-12px_rgba(24,112,255,0.9)] transition-colors hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </div>
  );
};
