import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../../i18n';

export const UpcomingEventsSection: React.FC = () => {
  const { t } = useLanguage();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/events?status=published')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl lg:text-4xl font-black text-[#0D47A1]">{t('events.title')}</h2>
          <div className="w-20 h-1 bg-[#176DF8] mx-auto rounded-full" />
        </div>

        {events.length === 0 ? (
          /* Coming Soon — no verified event data */
          <div className="max-w-lg mx-auto bg-white border border-slate-100 rounded-3xl p-10 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#176DF8] flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <p className="text-slate-600 font-semibold">{t('events.coming_soon')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-md transition-shadow">
                {event.image_url ? (
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">{event.title}</h3>
                  {event.description && <p className="text-slate-600 line-clamp-2">{event.description}</p>}
                  
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {event.date && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar className="w-4 h-4 text-[#176DF8]" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    )}
                    {(event.start_time || event.end_time) && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Clock className="w-4 h-4 text-[#176DF8]" />
                        {event.start_time} {event.end_time ? `- ${event.end_time}` : ''}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-[#176DF8]" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  
                  {event.registration_url && (
                    <a 
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2.5 bg-[#176DF8] hover:bg-[#1059D4] text-white font-bold rounded-xl transition-colors mt-4"
                    >
                      Daftar Sekarang
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
