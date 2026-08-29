import React from 'react';
import { Globe, Users, MapPin } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const GlobalCodingSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { key: 'standard', icon: Globe },
    { key: 'community', icon: Users },
    { key: 'borderless', icon: MapPin },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1] leading-tight">
                {t('global.title')}
              </h2>
              <div className="w-20 h-1 bg-[#176DF8] rounded-full" />
              <p className="text-slate-600 text-lg leading-relaxed">
                {t('global.desc')}
              </p>
            </div>
            
            <div className="space-y-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.key} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#176DF8] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{t(`global.${feat.key}`)}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t(`global.${feat.key}_desc`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-white p-4">
              <ImageWithFallback 
                src={ASSETS.GLOBAL_CODING.MAP || ''}
                alt="Global Coding Experience"
                fallbackLabel="Global Network Map"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
