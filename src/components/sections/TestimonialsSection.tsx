import React, { useState } from 'react';
import { STUDENT_TESTIMONIALS, TEACHER_TESTIMONIALS } from '../../data/testimonialsData';
import { ChevronLeft, ChevronRight, Quote, User } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ASSETS } from '../../constants/assets';
import { StudentTestimonial, TeacherTestimonial } from '../../types';

// Placeholder entries are never shown publicly; the section renders only verified testimonials.
const STUDENTS = STUDENT_TESTIMONIALS.filter((item) => !item.isPlaceholder);
const TEACHERS = TEACHER_TESTIMONIALS.filter((item) => !item.isPlaceholder);

export const TestimonialsSection: React.FC = () => {
  const { t: tr } = useLanguage();
  const [studentIdx, setStudentIdx] = useState(0);
  const [teacherIdx, setTeacherIdx] = useState(0);

  if (STUDENTS.length === 0 && TEACHERS.length === 0) return null;

  const nextStudent = () => setStudentIdx((p) => (p + 1) % STUDENTS.length);
  const prevStudent = () => setStudentIdx((p) => (p - 1 + STUDENTS.length) % STUDENTS.length);
  const nextTeacher = () => setTeacherIdx((p) => (p + 1) % TEACHERS.length);
  const prevTeacher = () => setTeacherIdx((p) => (p - 1 + TEACHERS.length) % TEACHERS.length);

  const renderStudentCard = (t: StudentTestimonial) => (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5 min-h-[220px] flex flex-col justify-between">
      <div className="space-y-4">
        <Quote className="w-8 h-8 text-[#176DF8]/20" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
          "{t.quote}"
        </p>
      </div>
      <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
        {/* Photo placeholder — shows SPI placeholder if no photo */}
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#176DF8]/10 flex items-center justify-center shrink-0">
          {t.photo ? (
            <ImageWithFallback
              src={t.photo}
              alt={t.photo}
              fallbackLabel={t.program}
              className="w-full h-full"
            />
          ) : (
            <User className="w-5 h-5 text-[#176DF8]/50" />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">
            {t.name}
          </p>
          <p className="text-xs text-[#176DF8] font-semibold">{t.program}</p>
        </div>
      </div>
    </div>
  );

  const renderTeacherCard = (t: TeacherTestimonial) => (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-5 min-h-[220px] flex flex-col justify-between">
      <div className="space-y-4">
        <Quote className="w-8 h-8 text-[#176DF8]/20" aria-hidden="true" />
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
          "{t.quote}"
        </p>
      </div>
      <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#176DF8]/10 flex items-center justify-center shrink-0">
          {t.photo ? (
            <ImageWithFallback
              src={t.photo}
              alt={t.photo}
              fallbackLabel={t.institution}
              className="w-full h-full"
            />
          ) : (
            <User className="w-5 h-5 text-[#176DF8]/50" />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">
            {t.name}
          </p>
          <p className="text-xs text-slate-500">{t.position} · {t.institution}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials-section" className="py-12 sm:py-24 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

        {/* ── Student Testimonials ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="max-w-xl mb-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">{tr('testi.student.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
                {tr('testi.student.title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                {tr('testi.student.desc')}
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${studentIdx * 100}%)` }}
                >
                  {STUDENTS.map((t) => (
                    <div key={t.id} className="w-full shrink-0">
                      {renderStudentCard(t)}
                    </div>
                  ))}
                </div>
              </div>

              {STUDENTS.length > 1 && (
                <div className="flex items-center space-x-3 mt-8">
                  <button
                    onClick={prevStudent}
                    aria-label={tr('common.previous')}
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextStudent}
                    aria-label={tr('common.next')}
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full h-[200px] sm:h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-slate-100">
              <ImageWithFallback
                src={ASSETS.learning.studentPresentation}
                alt=""
                fallbackLabel={tr('testi.student.title')}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 my-10 sm:my-16"></div>

        {/* ── Teacher Testimonials ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 hidden lg:block">
            <div className="relative w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-slate-100">
              <ImageWithFallback
                src={ASSETS.learning.mentorSession}
                alt=""
                fallbackLabel={tr('testi.teacher.title')}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="max-w-xl mb-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">{tr('testi.teacher.eyebrow')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
                {tr('testi.teacher.title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                {tr('testi.teacher.desc')}
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${teacherIdx * 100}%)` }}
                >
                  {TEACHERS.map((t) => (
                    <div key={t.id} className="w-full shrink-0">
                      {renderTeacherCard(t)}
                    </div>
                  ))}
                </div>
              </div>

              {TEACHERS.length > 1 && (
                <div className="flex items-center space-x-3 mt-8">
                  <button
                    onClick={prevTeacher}
                    aria-label={tr('common.previous')}
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTeacher}
                    aria-label={tr('common.next')}
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
