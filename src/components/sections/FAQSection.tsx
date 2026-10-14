import React from 'react';
import { Accordion } from '../common/Accordion';
import { FAQ_DATA } from '../../data/faqData';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();

  const items = FAQ_DATA.map((item) => ({
    ...item,
    question: t(`${item.id}.q`),
    answer: t(`${item.id}.a`),
  }));

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left — Section header (sticky on desktop) */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-[#1870FF]/10 text-[#1870FF] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#1870FF] uppercase tracking-widest">
              {t('faq.eyebrow')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#041A5A] tracking-tight leading-tight">
              {t('faq.heading')}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {t('faq.desc')}
            </p>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-8">
            <Accordion items={items} />
          </div>

        </div>

      </div>
    </section>
  );
};
