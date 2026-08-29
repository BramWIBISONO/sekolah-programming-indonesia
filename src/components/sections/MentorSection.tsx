import React from 'react';
import { ASSETS } from '../../constants/assets';
import { MENTORS_DATA } from '../../data/mentorData';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useLanguage } from '../../i18n';

export const MentorSection: React.FC = () => {
  const { t } = useLanguage();

  const assetMap: Record<string, string> = {
    MENTOR_1: ASSETS.MENTORS.MENTOR_1,
    MENTOR_2: ASSETS.MENTORS.MENTOR_2,
    MENTOR_3: ASSETS.MENTORS.MENTOR_3,
    MENTOR_4: ASSETS.MENTORS.MENTOR_4,
    MENTOR_5: ASSETS.MENTORS.MENTOR_5,
    MENTOR_6: ASSETS.MENTORS.MENTOR_6,
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('mentors.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base">{t('mentors.desc')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENTORS_DATA.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group">
              <div className="aspect-[4/5] bg-slate-50">
                <ImageWithFallback
                  src={assetMap[mentor.photoAssetKey] || ''}
                  alt={mentor.name}
                  fallbackLabel={mentor.role}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{mentor.name}</h3>
                  <p className="text-sm font-semibold text-[#176DF8]">{mentor.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map((skill) => (
                    <span key={skill} className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
