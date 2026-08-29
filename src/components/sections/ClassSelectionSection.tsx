import React from 'react';
import { CLASSES_DATA } from '../../data/classesData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface ClassSelectionSectionProps {
  onScrollToRegistration?: () => void;
}

export const ClassSelectionSection: React.FC<ClassSelectionSectionProps> = ({ onScrollToRegistration }) => {
  const { t } = useLanguage();

  return (
    <section id="class-selection" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('classes.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('classes.desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLASSES_DATA.map((cls) => (
            <div key={cls.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all p-6 space-y-4 group flex flex-col">
              <div className="text-4xl">{cls.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#176DF8] transition-colors">{cls.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-1">{cls.description}</p>
              <ul className="space-y-2 pt-2 border-t border-slate-50">
                {cls.learningPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#176DF8] to-[#0D47A1] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-xl sm:text-2xl font-bold relative z-10">{t('classes.cta_title')}</h3>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm sm:text-base relative z-10">{t('classes.cta_desc')}</p>
          <button
            onClick={onScrollToRegistration}
            className="mt-2 px-8 py-4 bg-white text-[#176DF8] font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 mx-auto relative z-10 cursor-pointer"
          >
            <span>{t('classes.cta_button')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
