import React from 'react';
import { ASSETS } from '../../constants/assets';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';
import { Monitor, Building2, ArrowRight } from 'lucide-react';

export const OnlineOfflineSection: React.FC = () => {
  const { t } = useLanguage();

  const options = [
    { key: 'offline', icon: Building2, color: 'text-[#176DF8] bg-blue-50 border-blue-100', asset: ASSETS.ONLINE_OFFLINE.OFFLINE_CLASS },
    { key: 'online', icon: Monitor, color: 'text-purple-600 bg-purple-50 border-purple-100', asset: ASSETS.ONLINE_OFFLINE.ONLINE_CLASS },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('onoff.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <h3 className="text-xl font-bold text-slate-800 pt-4">{t('onoff.headline')}</h3>
          <p className="text-slate-600 leading-relaxed">{t('onoff.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <div key={opt.key} className="rounded-3xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-shadow bg-white">
                <div className="aspect-[16/9] relative bg-slate-100 overflow-hidden">
                  <ImageWithFallback 
                    src={opt.asset || ''} 
                    alt={t(`onoff.${opt.key}`)} 
                    fallbackLabel={t(`onoff.${opt.key}`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                     <h3 className="text-2xl font-black text-white">{t(`onoff.${opt.key}`)}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${opt.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600">{t(`onoff.${opt.key}_desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-10 border border-blue-100 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{t('onoff.trial_headline')}</h3>
            <p className="text-slate-600">{t('onoff.trial_desc')}</p>
          </div>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#176DF8] hover:bg-[#0D47A1] text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer">
            <span>{t('onoff.cta')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
