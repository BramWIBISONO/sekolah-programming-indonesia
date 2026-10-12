import React, { useRef, useState } from 'react';
import { X, CheckCircle2, ArrowRight, Send, Loader2 } from 'lucide-react';
import { submitToDigitalSystem } from '../../utils/dsApi';
import {
  BRANCH_OPTIONS,
  CONSULTATION_OPTION,
  EMPTY_VALUES,
  EXPERIENCE_OPTIONS,
  FIELD_NAMES,
  FIELD_ORDER,
  PROGRAM_GROUPS,
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
  `w-full h-[50px] px-3.5 text-sm text-[#333333] bg-white border rounded-lg outline-none transition-all focus:border-[#176DF8] focus:ring-2 focus:ring-[#176DF8]/20 ${
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
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#333333] mb-1.5">
      {label} <span className="text-red-500">*</span>
    </label>
    {children}
    {helper && !error && <p className="mt-1.5 text-xs text-slate-500">{helper}</p>}
    {error && (
      <p role="alert" className="mt-1.5 text-xs text-red-600">
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
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submittingRef = useRef(false);

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
        parent_name: values.parentName.trim(),
        student_name: values.studentName.trim(),
        phone: normalizePhone(values.phone),
        birth_date: values.birthDate,
        programming_experience: values.programmingExperience,
        program_category: values.programCategory,
        school: values.school.trim(),
        branch: values.branch,
        terms_accepted: true,
        form_type: isRegistration ? 'Pendaftaran Kelas SPI' : 'Free Trial Class',
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
      setSubmitError('Data belum terkirim. Periksa koneksi internet Anda lalu coba lagi. Data yang sudah diisi tetap tersimpan.');
    }
  };

  const handleOpenWhatsApp = () => {
    const actionTitle = isRegistration ? 'Pendaftaran Kelas Reguler' : 'Free Trial Class 60 Menit';
    const category = findCategory(values.programCategory)?.label;
    const branch = BRANCH_OPTIONS.find((b) => b.value === values.branch)?.label;
    const message = `Halo SPI! Saya ${values.parentName || 'Orang Tua'}, ingin mendaftarkan anak saya (${values.studentName || 'Siswa'}, ${values.school}) untuk ${actionTitle}.\n\n📌 Minat Program: ${category || '-'}\n📍 Cabang: ${branch || '-'}.\n\nMohon informasi ketersediaan jadwal terdekat. Terima kasih!`;
    window.open(`https://wa.me/6281246906335?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">

        {/* Clean Modal Header */}
        <div className="bg-[#176DF8] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="inline-block bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-1">
              {isRegistration ? 'Formulir Pendaftaran Siswa' : 'Free Trial Class 60 Menit'}
            </span>
            <h3 className="text-xl font-bold text-white">
              {isRegistration ? 'Pendaftaran Kelas SPI' : 'Daftar Kelas Uji Coba Gratis'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                <Field label="Nama Lengkap Orang Tua" htmlFor="parent_name" error={errors.parentName}>
                  <input
                    id="parent_name"
                    name="parent_name"
                    type="text"
                    autoComplete="name"
                    value={values.parentName}
                    onChange={(e) => setField('parentName', e.target.value)}
                    placeholder="Masukkan nama lengkap orang tua"
                    aria-invalid={!!errors.parentName}
                    className={inputClass(!!errors.parentName)}
                  />
                </Field>
                <Field label="Nama Lengkap Siswa" htmlFor="student_name" error={errors.studentName}>
                  <input
                    id="student_name"
                    name="student_name"
                    type="text"
                    value={values.studentName}
                    onChange={(e) => setField('studentName', e.target.value)}
                    placeholder="Masukkan nama lengkap siswa"
                    aria-invalid={!!errors.studentName}
                    className={inputClass(!!errors.studentName)}
                  />
                </Field>

                <Field label="Nomor HP" htmlFor="phone" error={errors.phone}>
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
                <Field label="Tanggal Lahir Siswa" htmlFor="birth_date" error={errors.birthDate}>
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

                <Field label="Pernah Belajar Programming ?" htmlFor="programming_experience" error={errors.programmingExperience}>
                  <select
                    id="programming_experience"
                    name="programming_experience"
                    value={values.programmingExperience}
                    onChange={(e) => setField('programmingExperience', e.target.value)}
                    aria-invalid={!!errors.programmingExperience}
                    className={inputClass(!!errors.programmingExperience)}
                  >
                    <option value="">Pilih status</option>
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
                <Field
                  label="Minat Kategori Program"
                  htmlFor="program_category"
                  error={errors.programCategory}
                  helper="Pilih saja salah satu jika tidak mengerti"
                >
                  <select
                    id="program_category"
                    name="program_category"
                    value={values.programCategory}
                    onChange={(e) => setField('programCategory', e.target.value)}
                    aria-invalid={!!errors.programCategory}
                    className={inputClass(!!errors.programCategory)}
                  >
                    <option value="">Pilih salah satu minat kategori</option>
                    {PROGRAM_GROUPS.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.options.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </optgroup>
                    ))}
                    <option value={CONSULTATION_OPTION.value}>{CONSULTATION_OPTION.label}</option>
                  </select>
                </Field>

                <Field label="Sekolah" htmlFor="school" error={errors.school}>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    value={values.school}
                    onChange={(e) => setField('school', e.target.value)}
                    placeholder="Masukkan nama sekolah"
                    aria-invalid={!!errors.school}
                    className={inputClass(!!errors.school)}
                  />
                </Field>
                <Field label="Cabang" htmlFor="branch" error={errors.branch}>
                  <select
                    id="branch"
                    name="branch"
                    value={values.branch}
                    onChange={(e) => setField('branch', e.target.value)}
                    aria-invalid={!!errors.branch}
                    className={inputClass(!!errors.branch)}
                  >
                    <option value="">Pilih salah satu cabang SPI</option>
                    {BRANCH_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-2.5 text-sm text-[#333333] cursor-pointer">
                  <input
                    type="checkbox"
                    name="terms_accepted"
                    checked={values.termsAccepted}
                    onChange={(e) => setField('termsAccepted', e.target.checked)}
                    aria-invalid={!!errors.termsAccepted}
                    className="mt-0.5 w-5 h-5 shrink-0 rounded border-[#D6D6D6] accent-[#176DF8] cursor-pointer"
                  />
                  <span>
                    Saya setuju dengan{' '}
                    <button
                      type="button"
                      onClick={onViewTerms}
                      className="text-[#176DF8] underline font-medium cursor-pointer"
                    >
                      Syarat dan Ketentuan
                    </button>{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p role="alert" className="mt-1.5 text-xs text-red-600">{errors.termsAccepted}</p>
                )}
              </div>

              {submitError && (
                <div role="alert" className="p-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[50px] px-4 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>
                  {isSubmitting
                    ? 'Mengirim Data...'
                    : submitError
                    ? 'Coba Kirim Lagi'
                    : isRegistration
                    ? 'Konfirmasi Pendaftaran Kelas'
                    : 'Konfirmasi Pendaftaran Trial'}
                </span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#176DF8] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-bold text-slate-800">
                  {isRegistration ? 'Pendaftaran Kelas Berhasil Diterima!' : 'Pendaftaran Trial Berhasil Diterima!'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Terima kasih <strong className="text-slate-700">{values.parentName || 'Orang Tua'}</strong>. Data untuk{' '}
                  <strong className="text-slate-700">{values.studentName || 'Siswa'}</strong> telah tercatat.
                </p>
              </div>

              <div className="pt-3 space-y-2">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Chat WhatsApp Tim Konsultan SPI</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Tutup Jendela
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
