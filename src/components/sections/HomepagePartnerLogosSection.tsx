import React from 'react';
import { SCHOOL_PARTNERS } from '../../data/mockData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n';

interface HomepagePartnerLogosSectionProps {
  onNavigate?: (path: string) => void;
}

export const HomepagePartnerLogosSection: React.FC<HomepagePartnerLogosSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl lg:text-3xl font-black text-[#0D47A1]">{t('partners.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {SCHOOL_PARTNERS.map((partner) => (
            <div key={partner.name} className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl border border-slate-100 shadow-sm p-3 flex items-center justify-center hover:shadow-lg hover:border-blue-200 transition-all">
              <ImageWithFallback
                src={partner.logo}
                alt={partner.name}
                fallbackLabel={partner.name.split(' ').slice(0, 2).join(' ')}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {onNavigate && (
          <div className="text-center">
            <button
              onClick={() => onNavigate('/partnership')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#176DF8] hover:text-[#0D47A1] transition-colors cursor-pointer"
            >
              <span>{t('partners.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
