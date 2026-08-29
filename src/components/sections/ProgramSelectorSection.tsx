import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface ProgramSelectorSectionProps {
  onNavigate?: (path: string) => void;
}

type Step = 'age' | 'interest' | 'result';

const AGE_OPTIONS = ['5-7', '8-10', '11-13', '14+'];
const INTEREST_OPTIONS = ['Game', 'Coding', 'AI', 'Robotics'];

function getRecommendation(age: string, interest: string): { name: string; path: string } {
  // Simple mapping to existing SPI programs
  if (interest === 'AI' || interest === 'Robotics') {
    if (age === '14+') return { name: 'SPI Engineering', path: '/program/spi-engineering' };
    return { name: 'SPI Core', path: '/program/spi-core' };
  }
  if (interest === 'Coding') {
    if (age === '14+') return { name: 'SPI Engineering', path: '/program/spi-engineering' };
    return { name: 'SPI Core', path: '/program/spi-core' };
  }
  // Game, general
  if (age === '5-7' || age === '8-10') return { name: 'SPI Core', path: '/program/spi-core' };
  return { name: 'SPI Lab', path: '/program/spi-lab' };
}

export const ProgramSelectorSection: React.FC<ProgramSelectorSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('age');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');

  const recommendation = age && interest ? getRecommendation(age, interest) : null;

  const reset = () => {
    setStep('age');
    setAge('');
    setInterest('');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/60 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('selector.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('selector.desc')}</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8 sm:p-10 space-y-8">
          {/* Step 1: Age */}
          {step === 'age' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">{t('selector.age_question')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {AGE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setAge(opt); setStep('interest'); }}
                    className="py-4 rounded-2xl border-2 border-slate-100 hover:border-[#176DF8] text-lg font-bold text-slate-700 hover:text-[#176DF8] hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Interest */}
          {step === 'interest' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">{t('selector.interest_question')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {INTEREST_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setInterest(opt); setStep('result'); }}
                    className="py-4 rounded-2xl border-2 border-slate-100 hover:border-[#176DF8] text-lg font-bold text-slate-700 hover:text-[#176DF8] hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Result */}
          {step === 'result' && recommendation && (
            <div className="text-center space-y-6">
              <h3 className="text-xl font-bold text-slate-800">{t('selector.result_title')}</h3>
              <div className="inline-block bg-gradient-to-r from-[#176DF8] to-[#0D47A1] text-white px-10 py-5 rounded-2xl shadow-xl">
                <span className="text-2xl font-black">{recommendation.name}</span>
              </div>
              <p className="text-sm text-slate-500">{t('selector.result_note')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate?.(recommendation.path)}
                  className="px-8 py-3 bg-[#176DF8] hover:bg-[#0D47A1] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('selector.cta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-3 border border-slate-200 hover:border-[#176DF8] text-slate-600 hover:text-[#176DF8] font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('selector.reset')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
