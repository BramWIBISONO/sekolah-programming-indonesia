import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, MapPin, MessageCircle, Wrench, Sparkles } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { ASSETS } from '../../constants/assets';
import { SPI_CONFIG } from '../../constants/config';
import type { FormField } from '../../data/aiLiteracyForm';
import {
  EMPTY_VALUES,
  MESSAGES,
  fetchCapacity,
  submitRegistration,
  validate,
  AI_LITERACY_CAPACITY,
  type CapacityInfo,
  type FieldErrors,
  type RegistrationCode,
  type RegistrationValues,
  type RegistrationSuccess,
} from '../../utils/aiLiteracyRegistration';
import { openSpiWhatsApp } from '../../utils/whatsapp';
import { AILiteracyArt } from '../illustrations/AILiteracyArt';
import { IllustratedHero } from '../illustrations/IllustratedHero';
import { AILiteracyTypeform, FLOW_FIELDS, flowIndexOf } from './AILiteracyTypeform';

interface AILiteracyRegisterPageProps {
  onNavigate: (path: string) => void;
}

/** Below this many free places the page warns that the quota is almost full. */
const ALMOST_FULL_THRESHOLD = 30;

const REQUIRED_FIELDS = FLOW_FIELDS.filter((item) => item.field.required).map((item) => item.field);

/** Registration page for Gerakan AI Literacy Indonesia. Copy is Indonesian, as the brief asks. */
export const AILiteracyRegisterPage: React.FC<AILiteracyRegisterPageProps> = ({ onNavigate }) => {
  const [values, setValues] = useState<RegistrationValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phase, setPhase] = useState<'form' | 'submitting' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorCode, setErrorCode] = useState<RegistrationCode | null>(null);
  const [success, setSuccess] = useState<RegistrationSuccess | null>(null);
  const [capacity, setCapacity] = useState<CapacityInfo | null | 'loading'>('loading');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const startRef = useRef<HTMLButtonElement>(null);
  const reduce = !!useReducedMotion();
  // Without an endpoint there is nowhere to send a registration, so the form is not shown at all.
  const configured = SPI_CONFIG.AI_LITERACY_API_URL !== '';

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    // Refresh the count every 30 seconds and when the visitor comes back to the tab, so freed places show up.
    const refresh = () => {
      fetchCapacity().then((info) => {
        if (!cancelled) setCapacity((prev) => info ?? (prev === 'loading' ? null : prev));
      });
    };
    refresh();
    const timer = window.setInterval(refresh, 30000);
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'success') return;
    document.getElementById('form-area')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    document.getElementById('success-title')?.focus({ preventScroll: true });
  }, [phase, reduce]);

  const set = <K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as keyof FieldErrors]) return prev;
      const next = { ...prev };
      delete next[key as keyof FieldErrors];
      return next;
    });
  };

  // Capacity shown to the visitor. The server decides; this only describes what it reported.
  const info = capacity === 'loading' ? null : capacity;
  const remaining = info ? Math.max(0, info.capacity - info.confirmed) : null;
  const isFull = (info !== null && (!info.open || remaining === 0)) || errorCode === 'REGISTRATION_FULL' || errorCode === 'REGISTRATION_CLOSED';

  const isFilled = (field: FormField) => {
    const v = values[field.name];
    if (field.kind === 'checkbox') return Array.isArray(v) && v.length > 0;
    if (field.kind === 'scale') return v !== null;
    if (field.kind === 'consent') return v === true;
    return typeof v === 'string' && v.trim() !== '';
  };
  const filledCount = REQUIRED_FIELDS.filter(isFilled).length;

  const scrollToForm = () => document.getElementById('form-area')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  const openFlow = () => {
    if (isFull) {
      scrollToForm();
      return;
    }
    setOpen(true);
  };

  const closeFlow = () => {
    setOpen(false);
    window.setTimeout(() => startRef.current?.focus({ preventScroll: true }), 0);
  };

  const submit = async (current: RegistrationValues) => {
    if (phase === 'submitting' || isFull) return;

    const found = validate(current);
    setErrors(found);
    const firstInvalid = FLOW_FIELDS.findIndex((item) => found[item.field.name]);
    if (firstInvalid !== -1) {
      setStep(firstInvalid);
      return;
    }

    setPhase('submitting');
    setErrorMessage('');
    setErrorCode(null);
    const result = await submitRegistration(current);

    if (result.ok === true) {
      setSuccess(result);
      setPhase('success');
      setOpen(false);
      return;
    }

    if (result.code === 'ALREADY_REGISTERED') {
      // The fix is a different email, so take the visitor straight back to that question.
      setErrors({ email: result.message });
      setStep(flowIndexOf('email'));
      setPhase('form');
      return;
    }

    setErrorCode(result.code);
    setErrorMessage(result.message);
    setPhase('error');
    if (result.code === 'REGISTRATION_FULL' || result.code === 'REGISTRATION_CLOSED') {
      setCapacity((prev) => (prev && prev !== 'loading' ? { ...prev, open: false } : prev));
    }
  };

  const capacityBox = (() => {
    if (capacity === 'loading') {
      return (
        <div>
          <p className="sr-only">Memuat kuota pendaftaran...</p>
          <div aria-hidden="true" className="space-y-3">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-9 w-36 animate-pulse rounded bg-slate-200" />
            <div className="h-2 w-full animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      );
    }
    if (!info) {
      return (
        <p className="text-sm text-slate-600">
          Kuota belum dapat dimuat saat ini. Pendaftaran tetap bisa dikirim, dan sistem akan memeriksa kuota saat Anda mendaftar.
        </p>
      );
    }
    if (!info.open || remaining === 0) {
      return (
        <p className="flex items-start gap-2 text-sm font-semibold text-[#041A5A]">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
          {MESSAGES.full}
        </p>
      );
    }
    const almost = (remaining ?? 0) < ALMOST_FULL_THRESHOLD;
    const taken = Math.min(100, Math.max(0, (info.confirmed / info.capacity) * 100));
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Kuota tersedia</p>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-4xl font-black leading-none text-[#041A5A]">{remaining}</span>
          <span className="text-sm font-semibold text-slate-500">dari {info.capacity} peserta</span>
        </p>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-white"
          role="progressbar"
          aria-label="Kuota yang sudah terisi"
          aria-valuemin={0}
          aria-valuemax={info.capacity}
          aria-valuenow={info.confirmed}
        >
          <div className={`h-full rounded-full ${almost ? 'bg-amber-500' : 'bg-[#1870FF]'}`} style={{ width: `${taken}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-600">
          {almost ? 'Kuota hampir penuh. Segera daftarkan diri Anda.' : 'Pendaftaran masih dibuka. Pendaftar pertama mendapat tempat lebih dulu.'}
        </p>
      </div>
    );
  })();

  const card = 'rounded-3xl border border-[#DCE7FB] bg-white shadow-[0_18px_40px_-28px_rgba(4,26,90,0.45)]';

  return (
    <div className="min-h-screen bg-[#F4F8FF] pb-24 text-[#0B1220]">
      {/* Hero: the same illustrated hero as the SPI Core and AI Literacy pages */}
      <IllustratedHero
        variant="literacy"
        eyebrow="Gerakan AI Literacy Indonesia"
        title={
          <>
            Bergabung dalam Gerakan <span className="text-[#1870FF]">AI Literacy Indonesia</span>
          </>
        }
        lead="Mari membangun kemampuan menggunakan AI secara cerdas, kritis, aman, dan bertanggung jawab."
        description="Gerakan AI Literacy Indonesia mengajak individu, sekolah, dan komunitas untuk mengembangkan pemahaman serta keterampilan menggunakan kecerdasan buatan secara bertanggung jawab."
        artSlot={<AILiteracyArt className="block h-auto w-full" animate={!reduce} />}
        primary={
          configured
            ? { label: filledCount > 0 ? 'Lanjutkan Pendaftaran' : 'Mulai Mendaftar', onClick: openFlow }
            : { label: 'Tanya lewat WhatsApp', onClick: () => openSpiWhatsApp('Halo SPI, saya ingin bertanya tentang pendaftaran Gerakan AI Literacy Indonesia.') }
        }
        onBack={() => onNavigate('/acara')}
        backLabel="Kembali ke halaman Acara"
        badges={[
          { icon: 'ai', title: 'Rabu, 28 Oktober 2026', sub: '19.00 WIB' },
          { icon: 'community', title: 'Online', sub: 'Sekolah Programming Indonesia' },
        ]}
        bottomFill="#F4F8FF"
        footnote={
          <p className="flex max-w-xl items-start gap-2 text-xs text-slate-500 sm:text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1870FF]" aria-hidden="true" />
            Kapasitas {AI_LITERACY_CAPACITY} peserta, pendaftar pertama mendapat tempat lebih dulu.
          </p>
        }
      />

      <div id="form-area" className="mx-auto mt-4 max-w-3xl scroll-mt-24 px-4 sm:mt-8 sm:px-6">
        {!configured ? (
          <section aria-labelledby="not-open-title" className={`${card} p-6 sm:p-8`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFC928] px-4 py-1.5 text-xs font-black text-[#041A5A]">
              <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
              Segera dibuka
            </span>
            <h2 id="not-open-title" className="mt-4 text-2xl font-black text-[#041A5A]">
              Pendaftaran online sedang disiapkan
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">
              Formulir pendaftaran akan dibuka di halaman ini. Sambil menunggu, pertanyaan tentang Gerakan AI Literacy Indonesia bisa langsung ditanyakan lewat WhatsApp.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openSpiWhatsApp('Halo SPI, saya ingin bertanya tentang pendaftaran Gerakan AI Literacy Indonesia.')}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-[#1870FF] px-6 font-bold text-[#1870FF] transition-colors hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Tanya lewat WhatsApp
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/acara')}
                className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 font-bold text-slate-600 hover:text-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Kembali ke halaman Acara
              </button>
            </div>
          </section>
        ) : phase === 'success' && success ? (
          <section aria-labelledby="success-title" className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-[0_30px_60px_-30px_rgba(4,26,90,0.55)]">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#16A34A] via-[#22C55E] to-[#1870FF] px-6 pb-20 pt-8 text-white sm:px-10 sm:pt-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden="true" />
              </span>
              <p className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Kamu sudah terdaftar
              </p>
              <h2 id="success-title" tabIndex={-1} className="relative mt-3 text-4xl font-black leading-tight tracking-tight focus:outline-none sm:text-5xl">
                Pendaftaran Berhasil!
              </h2>
              <p className="relative mt-3 max-w-xl text-base leading-relaxed text-white/90">Terima kasih telah bergabung dengan Gerakan AI Literacy Indonesia.</p>
              <img src={ASSETS.brand.pandaMascot} alt="" aria-hidden="true" className="absolute -bottom-4 right-4 w-28 drop-shadow-[0_18px_24px_rgba(2,18,70,0.4)] sm:right-10 sm:w-36" />
            </div>

            <div className="relative mx-5 -mt-10 rounded-2xl border border-[#DCE7FB] bg-white p-5 shadow-[0_18px_40px_-24px_rgba(4,26,90,0.5)] sm:mx-10 sm:p-6">
              <dl className="grid gap-4 sm:grid-cols-2 sm:divide-x sm:divide-dashed sm:divide-[#DCE7FB]">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Nomor pendaftaran</dt>
                  <dd className="mt-1 text-2xl font-black tracking-wide text-[#041A5A]">{success.registrationId}</dd>
                </div>
                <div className="sm:pl-6">
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">Kegiatan</dt>
                  <dd className="mt-1 font-bold text-[#041A5A]">Rabu, 28 Oktober 2026 · 19.00 WIB · Online</dd>
                </div>
              </dl>
            </div>

            <div className="px-5 pb-8 pt-8 sm:px-10">
              <p className="text-xs font-black uppercase tracking-widest text-[#1870FF]">Langkah berikutnya</p>
              <ol className="mt-4 space-y-3">
                <li className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3.5">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" aria-hidden="true" />
                  <div>
                    <p className="font-black text-[#041A5A]">Pendaftaran tersimpan</p>
                    <p className="text-sm text-slate-600">Simpan nomor pendaftaran di atas.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 rounded-2xl border-2 border-[#25D366]/40 bg-white px-4 py-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-xs font-black text-white" aria-hidden="true">2</span>
                  <div>
                    <p className="font-black text-[#041A5A]">Gabung grup WhatsApp</p>
                    <p className="text-sm text-slate-600">Link Zoom dan info terbaru dibagikan di grup ini.</p>
                  </div>
                </li>
              </ol>

              {success.groupUrl ? (
                <div className="mt-7">
                  <a
                    href={success.groupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-lg font-black text-white shadow-[0_18px_32px_-14px_rgba(37,211,102,0.9)] transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 sm:w-auto sm:px-10"
                  >
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                    Gabung Grup WhatsApp
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-xs text-slate-500">Link grup terbuka di tab baru.</p>
                </div>
              ) : (
                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Informasi untuk bergabung ke WhatsApp Group akan dibagikan oleh tim SPI.
                </div>
              )}

              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded text-sm font-bold text-[#1870FF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Kembali ke website SPI
              </button>
            </div>
          </section>
        ) : (
          <section aria-labelledby="start-title" className={`${card} p-6 sm:p-9`}>
            <h2 id="start-title" className="text-2xl font-black text-[#041A5A] sm:text-3xl">
              Formulir Pendaftaran Gerakan AI Literacy Indonesia
            </h2>
            <p className="mt-2 text-base leading-relaxed text-slate-600">Isi satu pertanyaan pada satu waktu. Kolom bertanda * wajib diisi.</p>

            <div aria-live="polite" className="mt-6 rounded-2xl bg-[#F4F8FF] p-5 sm:p-6">
              {capacityBox}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                ref={startRef}
                type="button"
                onClick={openFlow}
                disabled={isFull}
                className="group inline-flex h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#1870FF] px-8 text-base font-black text-white shadow-[0_18px_36px_-16px_rgba(24,112,255,0.85)] transition-all hover:-translate-y-0.5 hover:bg-[#1059D4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1870FF]/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {filledCount > 0 ? 'Lanjutkan Pendaftaran' : 'Mulai Mendaftar'}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              {filledCount > 0 && (
                <p className="text-sm font-semibold text-slate-500">
                  {filledCount} dari {REQUIRED_FIELDS.length} kolom wajib terisi
                </p>
              )}
              {isFull && <p className="text-sm font-semibold text-slate-600">Pendaftaran saat ini ditutup.</p>}
            </div>
          </section>
        )}

        <div className="mt-12 border-t border-slate-200 pt-6 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/acara')}
            className="inline-flex cursor-pointer items-center gap-2 rounded text-sm font-bold text-slate-600 hover:text-[#1870FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke halaman Acara
          </button>
          <p className="mt-3 text-xs text-slate-500">
            Ada pertanyaan? Hubungi SPI lewat WhatsApp di{' '}
            <a href={`https://wa.me/${SPI_CONFIG.WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1870FF] hover:underline">
              +{SPI_CONFIG.WHATSAPP_NUMBER}
            </a>
            .
          </p>
        </div>
      </div>

      {configured && open && phase !== 'success' && (
        <AILiteracyTypeform
          values={values}
          onChange={set}
          errors={errors}
          setErrors={setErrors}
          step={step}
          setStep={setStep}
          submitting={phase === 'submitting'}
          submitError={phase === 'error' ? errorMessage : ''}
          onSubmit={submit}
          onClose={closeFlow}
        />
      )}
    </div>
  );
};
