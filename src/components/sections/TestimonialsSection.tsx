import React, { useState } from 'react';
import { STUDENT_TESTIMONIALS, TEACHER_TESTIMONIALS } from '../../data/testimonialsData';
import { ChevronLeft, ChevronRight, Quote, User, Play } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ASSETS } from '../../constants/assets';
import { StudentTestimonial, TeacherTestimonial } from '../../types';

export const TestimonialsSection: React.FC = () => {
  const [studentIdx, setStudentIdx] = useState(0);
  const [teacherIdx, setTeacherIdx] = useState(0);

  const nextStudent = () => setStudentIdx((p) => (p + 1) % STUDENT_TESTIMONIALS.length);
  const prevStudent = () => setStudentIdx((p) => (p - 1 + STUDENT_TESTIMONIALS.length) % STUDENT_TESTIMONIALS.length);
  const nextTeacher = () => setTeacherIdx((p) => (p + 1) % TEACHER_TESTIMONIALS.length);
  const prevTeacher = () => setTeacherIdx((p) => (p - 1 + TEACHER_TESTIMONIALS.length) % TEACHER_TESTIMONIALS.length);

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
            {t.isPlaceholder && <span className="text-[10px] text-slate-400 font-normal ml-1.5">(Placeholder)</span>}
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
            {t.isPlaceholder && <span className="text-[10px] text-slate-400 font-normal ml-1.5">(Placeholder)</span>}
          </p>
          <p className="text-xs text-slate-500">{t.position} · {t.institution}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#F4F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

        {/* ── Student Testimonials ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="max-w-xl mb-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">Student Voices</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
                Cerita Siswa SPI
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                Dengarkan langsung pengalaman belajar yang transformatif di SPI dari para siswa.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${studentIdx * 100}%)` }}
                >
                  {STUDENT_TESTIMONIALS.map((t) => (
                    <div key={t.id} className="w-full shrink-0">
                      {renderStudentCard(t)}
                    </div>
                  ))}
                </div>
              </div>

              {STUDENT_TESTIMONIALS.length > 1 && (
                <div className="flex items-center space-x-3 mt-8">
                  <button
                    onClick={prevStudent}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextStudent}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-slate-100">
              <ImageWithFallback
                src={ASSETS.learning.studentPresentation}
                alt={ASSETS.learning.studentPresentation}
                fallbackLabel="Student Voices Main Visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200 my-16"></div>

        {/* ── Teacher Testimonials ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 hidden lg:block">
            <div className="relative w-full h-[500px] rounded-[32px] overflow-hidden shadow-2xl bg-slate-100">
              <ImageWithFallback
                src={ASSETS.learning.mentorSession}
                alt={ASSETS.learning.mentorSession}
                fallbackLabel="Teacher Voices Main Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="max-w-xl mb-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                <span className="text-xs font-bold text-[#176DF8] tracking-wide uppercase">Teacher & School Voices</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1220] tracking-tight leading-tight">
                Kata Guru & Sekolah Mitra
              </h2>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                Pengalaman inspiratif dari pendidik dan pimpinan sekolah yang telah merasakan dampak nyata SPI.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${teacherIdx * 100}%)` }}
                >
                  {TEACHER_TESTIMONIALS.map((t) => (
                    <div key={t.id} className="w-full shrink-0">
                      {renderTeacherCard(t)}
                    </div>
                  ))}
                </div>
              </div>

              {TEACHER_TESTIMONIALS.length > 1 && (
                <div className="flex items-center space-x-3 mt-8">
                  <button
                    onClick={prevTeacher}
                    aria-label="Previous teacher testimonial"
                    className="w-10 h-10 rounded-full bg-white text-[#176DF8] shadow-sm border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTeacher}
                    aria-label="Next teacher testimonial"
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
