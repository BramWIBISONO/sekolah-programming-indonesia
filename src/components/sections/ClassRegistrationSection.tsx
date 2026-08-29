import React, { useState } from 'react';
import { CLASSES_DATA } from '../../data/classesData';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const ClassRegistrationSection: React.FC = () => {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', classId: '', age: '', city: '', method: '', notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t('reg.required');
    if (!form.email.trim()) errs.email = t('reg.required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('reg.email_invalid');
    if (!form.whatsapp.trim()) errs.whatsapp = t('reg.required');
    else if (!/^[0-9+]{8,15}$/.test(form.whatsapp.replace(/\s/g, ''))) errs.whatsapp = t('reg.whatsapp_invalid');
    if (!form.classId) errs.classId = t('reg.required');
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // In production, this would submit to the existing backend or trial infrastructure.
      // For now, show success state.
      setSubmitted(true);
    }
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  if (submitted) {
    return (
      <section id="class-registration" className="py-20 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-[#0D47A1]">{t('reg.success_title')}</h2>
          <p className="text-slate-600">{t('reg.success_desc')}</p>
        </div>
      </section>
    );
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl border ${errors[field] ? 'border-red-300 bg-red-50/50' : 'border-slate-200'} text-sm focus:outline-none focus:border-[#176DF8] focus:ring-1 focus:ring-[#176DF8]/20 transition-colors`;

  return (
    <section id="class-registration" className="py-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('reg.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('reg.desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.name')} *</label>
            <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder={t('reg.name_placeholder')} className={inputCls('name')} />
            {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.email')} *</label>
            <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder={t('reg.email_placeholder')} className={inputCls('email')} />
            {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.whatsapp')} *</label>
            <input type="tel" value={form.whatsapp} onChange={(e) => updateField('whatsapp', e.target.value)} placeholder={t('reg.whatsapp_placeholder')} className={inputCls('whatsapp')} />
            {errors.whatsapp && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.whatsapp}</p>}
          </div>

          {/* Class Selection — uses centralized data */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.class')} *</label>
            <select value={form.classId} onChange={(e) => updateField('classId', e.target.value)} className={inputCls('classId')}>
              <option value="">{t('reg.class_placeholder')}</option>
              {CLASSES_DATA.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.icon} {cls.title}</option>
              ))}
            </select>
            {errors.classId && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.classId}</p>}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.age')}</label>
              <input type="text" value={form.age} onChange={(e) => updateField('age', e.target.value)} placeholder={t('reg.age_placeholder')} className={inputCls('age')} />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.city')}</label>
              <input type="text" value={form.city} onChange={(e) => updateField('city', e.target.value)} placeholder={t('reg.city_placeholder')} className={inputCls('city')} />
            </div>
          </div>

          {/* Learning Method */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.method')}</label>
            <div className="flex gap-4">
              {['online', 'offline'].map((m) => (
                <label key={m} className={`flex-1 py-3 rounded-xl border-2 text-center text-sm font-bold cursor-pointer transition-all ${form.method === m ? 'border-[#176DF8] bg-blue-50 text-[#176DF8]' : 'border-slate-100 text-slate-600 hover:border-slate-200'}`}>
                  <input type="radio" name="method" value={m} checked={form.method === m} onChange={(e) => updateField('method', e.target.value)} className="sr-only" />
                  {t(`reg.method_${m}`)}
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">{t('reg.notes')}</label>
            <textarea value={form.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder={t('reg.notes_placeholder')} rows={3} className={inputCls('notes')} />
          </div>

          <button type="submit" className="w-full py-4 bg-[#176DF8] hover:bg-[#0D47A1] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer text-base">
            {t('reg.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};
