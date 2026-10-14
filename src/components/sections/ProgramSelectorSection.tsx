import React, { useMemo, useState } from 'react';
import { ArrowRight, Bot, Code2, Compass, Cpu, Gamepad2, RotateCcw, Shuffle, Sparkles, type LucideIcon } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { ASSETS } from '../../constants/assets';
import {
  copyFor,
  DISCOVERY_QUESTION_BANK,
  DiscoveryAnswer,
  DiscoveryInterest,
  DiscoveryProgram,
  DiscoveryProject,
  DiscoveryReportData,
  initialScores,
  PROJECT_CATALOG,
} from '../../data/discoveryData';
import { DiscoverInteractiveWorld } from '../discover/DiscoverInteractiveWorld';

interface ProgramSelectorSectionProps {
  onNavigate?: (path: string) => void;
}

type Step = 'landing' | 'interest' | 'questions' | 'projects' | 'make-it-yours' | 'path';

const INTEREST_OPTIONS: Array<{ id: DiscoveryInterest; icon: LucideIcon }> = [
  { id: 'game', icon: Gamepad2 },
  { id: 'coding', icon: Code2 },
  { id: 'ai', icon: Bot },
  { id: 'robotics', icon: Cpu },
];

const PROGRAM_SHORT_KEYS: Record<DiscoveryProgram, string> = {
  'SPI Core': 'prog.core.short',
  'SPI Lab': 'prog.lab.short',
  'SPI Engineering': 'prog.engineering.short',
};

const PROGRAM_PATHS: Record<DiscoveryProgram, string> = {
  'SPI Core': '/program/spi-core',
  'SPI Lab': '/program/spi-lab',
  'SPI Engineering': '/program/spi-engineering',
};

const MAKE_IT_YOURS = [
  'selector.make_easier',
  'selector.make_smarter',
  'selector.make_fun',
  'selector.make_useful',
  'selector.make_different',
];

export const ProgramSelectorSection: React.FC<ProgramSelectorSectionProps> = ({ onNavigate }) => {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<Step>('landing');
  const [studentName, setStudentName] = useState('');
  const [interest, setInterest] = useState<DiscoveryInterest | null>(null);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<DiscoveryAnswer[]>([]);
  const [scores, setScores] = useState<Record<DiscoveryProgram, number>>({
    'SPI Core': 0,
    'SPI Lab': 0,
    'SPI Engineering': 0,
  });
  const [selectedProject, setSelectedProject] = useState<DiscoveryProject | null>(null);
  const [personalization, setPersonalization] = useState<string | null>(null);

  const question = useMemo(
    () => DISCOVERY_QUESTION_BANK.find((item) => item.id === questionId) ?? null,
    [questionId]
  );

  const recommendations = useMemo(() => {
    if (!interest) return [];
    const preferred =
      interest === 'game' || interest === 'coding'
        ? 'SPI Core'
        : interest === 'ai'
        ? 'SPI Lab'
        : 'SPI Engineering';
    return [...PROJECT_CATALOG]
      .map((project) => ({
        project,
        score: scores[project.program] + (project.program === preferred ? 1 : 0),
      }))
      .sort((a, b) => b.score - a.score || a.project.title.id.localeCompare(b.project.title.id))
      .slice(0, 3)
      .map(({ project }) => project);
  }, [interest, scores]);

  const beginDiscovery = (value: DiscoveryInterest) => {
    setInterest(value);
    setScores(initialScores(value));
    setAnswers([]);
    setQuestionId(`${value}-01`);
    setStep('questions');
  };

  const surpriseMe = () => {
    const randomInterest = INTEREST_OPTIONS[Math.floor(Math.random() * INTEREST_OPTIONS.length)].id;
    beginDiscovery(randomInterest);
  };

  const answerQuestion = (answer: DiscoveryAnswer) => {
    const nextScores: Record<DiscoveryProgram, number> = {
      'SPI Core': scores['SPI Core'] + answer.impact['SPI Core'],
      'SPI Lab': scores['SPI Lab'] + answer.impact['SPI Lab'],
      'SPI Engineering': scores['SPI Engineering'] + answer.impact['SPI Engineering'],
    };
    const nextAnswers = [...answers, answer];
    setScores(nextScores);
    setAnswers(nextAnswers);

    // Adaptive stopping condition (max 10 answers or terminal node)
    if (!answer.nextId || nextAnswers.length >= 10) {
      setStep('projects');
      return;
    }
    setQuestionId(answer.nextId);
  };

  const reset = () => {
    setStep('interest');
    setInterest(null);
    setQuestionId(null);
    setAnswers([]);
    setScores({ 'SPI Core': 0, 'SPI Lab': 0, 'SPI Engineering': 0 });
    setSelectedProject(null);
    setPersonalization(null);
  };

  const selectedProgram = selectedProject?.program ?? recommendations[0]?.program;

  const openReport = (makeItYours: string) => {
    if (!interest || !selectedProject || !selectedProgram) return;
    const report: DiscoveryReportData = {
      studentName: studentName.trim() || undefined,
      interest,
      answers,
      recommendedProjects: recommendations,
      selectedProject,
      personalization: makeItYours,
      program: selectedProgram,
    };
    sessionStorage.setItem('spi_discovery_report', JSON.stringify(report));
    onNavigate?.('/discover/report');
  };

  return (
    <section id="discover-spi" className="py-16 sm:py-24 bg-gradient-to-b from-[#F4F8FF] via-white to-slate-50 dark:from-[#070D18] dark:via-[#091526] dark:to-[#070D18] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading matching Gambar 2 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1870FF]/10 dark:bg-[#1870FF]/20 text-[#1870FF] text-xs font-black uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t('disc.eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#041A5A] dark:text-white tracking-tight">
            {t('disc.heading')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {t('disc.desc')}
          </p>
        </div>

        {/* Top 4 Core Interest Pills matching Gambar 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {INTEREST_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => beginDiscovery(item.id)}
              className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#1870FF] hover:-translate-y-0.5 transition-all text-sm font-bold text-[#0B2454] dark:text-white cursor-pointer group"
            >
              <item.icon className="w-5 h-5 text-[#1870FF] group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t(`disc.interest.${item.id}`)}</span>
            </button>
          ))}
        </div>

        {/* Step: Welcome Landing with Hero Background Container matching Gambar 2 */}
        {step === 'landing' && (
          <div className="relative min-h-[380px] sm:min-h-[500px] rounded-3xl overflow-hidden border border-blue-100/80 dark:border-slate-800 shadow-xl flex items-center justify-center p-4 sm:p-10 lg:p-14">
            {/* Background Image Container prepared for User's PNG attachment */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EBF3FF] via-[#F4F8FF] to-[#E5EFFE] dark:from-[#0A1526] dark:via-[#091526] dark:to-[#081220]" aria-hidden="true">
              <img
                src={ASSETS.discover.heroBackground}
                alt=""
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Floating Main White Card (Centered like Gambar 2) */}
            <div className="relative z-10 w-full max-w-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-9 shadow-2xl border border-blue-100/90 dark:border-slate-800 text-center space-y-5">
              {/* Top Sparkle Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" aria-hidden="true" />
                <span>{t('disc.badge')}</span>
              </div>

              {/* Card Title & Subtitle */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B2454] dark:text-white tracking-tight leading-snug">
                  {t('disc.card_title')}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#526A8A] dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                  {t('disc.card_desc')}
                </p>
              </div>

              {/* Student Name Input */}
              <div className="space-y-1.5 text-left max-w-md mx-auto">
                <label htmlFor="discover-name" className="block text-xs font-black text-[#0B2454] dark:text-white">
                  {t('disc.name_label')}
                </label>
                <input
                  id="discover-name"
                  name="discover-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={t('disc.name_placeholder')}
                  maxLength={60}
                  autoComplete="name"
                  required
                  className="w-full h-11 px-4 rounded-xl border border-[#D5E4F8] dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-[#0B2454] dark:text-white placeholder:text-slate-400 focus:border-[#1870FF] focus:outline-none focus:ring-2 focus:ring-[#1870FF]/20 transition-all shadow-inner"
                />
              </div>

              {/* Action Buttons matching Gambar 2 */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('interest')}
                  disabled={!studentName.trim()}
                  className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#1870FF] hover:bg-[#1059D4] disabled:bg-[#1870FF]/45 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>{t('selector.start_exploring') || 'Mulai Eksplorasi'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={surpriseMe}
                  disabled={!studentName.trim()}
                  className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-blue-200 dark:border-slate-700 hover:border-[#1870FF] disabled:opacity-45 disabled:cursor-not-allowed text-[#1870FF] dark:text-blue-400 font-bold text-sm bg-white dark:bg-slate-900 transition-all cursor-pointer"
                >
                  <Shuffle className="w-4 h-4" aria-hidden="true" />
                  <span>{t('selector.surprise_me') || 'Kejutkan Saya'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Explore the four SPI worlds */}
        {step === 'interest' && (
          <div className="space-y-6">
            <DiscoverInteractiveWorld
              onStartExploration={(suggested) => {
                if (suggested) beginDiscovery(suggested);
              }}
            />
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep('landing')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                ← {t('disc.back_name')}
              </button>
            </div>
          </div>
        )}

        {/* Step: Questions (Preserved Adaptive 120-node Engine) */}
        {step === 'questions' && question && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 sm:p-10 space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="uppercase tracking-wider text-[#1870FF]">{t('disc.q_eyebrow')}</span>
              <span>{t('disc.step').replace('{n}', String(answers.length + 1)).replace('{total}', '10')}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-relaxed">
              {copyFor(question.prompt, lang)}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {question.answers.map((answer) => (
                <button
                  key={answer.id}
                  type="button"
                  onClick={() => answerQuestion(answer)}
                  className="min-h-16 px-5 py-4 text-left rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#1870FF] dark:hover:border-[#1870FF] bg-slate-50/50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-base font-bold text-slate-800 dark:text-slate-100 hover:text-[#1870FF] transition-all cursor-pointer shadow-sm"
                >
                  {copyFor(answer.label, lang)}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setStep('projects')}
                className="text-xs font-bold text-[#1870FF] hover:underline cursor-pointer"
              >
                {t('selector.recommend_now') || 'Langsung lihat rekomendasi project →'}
              </button>
              <button
                type="button"
                onClick={() => setStep('landing')}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
              >
                {t('common.back')}
              </button>
            </div>
          </div>
        )}

        {/* Step: Projects Recommendation */}
        {step === 'projects' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 sm:p-10 space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase text-[#1870FF] tracking-wider">{t('disc.results_eyebrow')}</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {t('selector.projects_title') || 'Project yang Cocok untuk Kamu'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('selector.projects_desc') || 'Pilih salah satu ide project nyata di bawah ini untuk melihat jalur belajarnya:'}
              </p>
            </div>

            <div className="grid gap-4 pt-2">
              {recommendations.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    setSelectedProject(project);
                    setStep('make-it-yours');
                  }}
                  className="w-full text-left p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#1870FF] bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer shadow-sm group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-base font-bold text-[#0D47A1] dark:text-blue-400 group-hover:text-[#1870FF]">
                        {copyFor(project.title, lang)}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {copyFor(project.description, lang)}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100/70 dark:bg-blue-900/40 text-[#1870FF] dark:text-blue-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-black px-3 py-1 rounded-full bg-[#1870FF]/10 text-[#1870FF] uppercase">
                      {t(PROGRAM_SHORT_KEYS[project.program])}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Make It Yours */}
        {step === 'make-it-yours' && selectedProject && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 sm:p-10 space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs font-black uppercase text-[#1870FF] tracking-wider">{t('disc.personalize')}</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {t('selector.make_title') || 'Make It Yours'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <strong>{copyFor(selectedProject.title, lang)}</strong> — {t('selector.make_desc') || 'Bagaimana caramu ingin mengembangkannya?'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {MAKE_IT_YOURS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setPersonalization(t(option));
                    setStep('path');
                  }}
                  className="min-h-16 px-5 py-4 text-left rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-[#1870FF] bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-base font-bold text-slate-800 dark:text-slate-100 hover:text-[#1870FF] transition-all cursor-pointer shadow-sm"
                >
                  {t(option)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Final Learning Path & Report Trigger */}
        {step === 'path' && selectedProject && selectedProgram && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-8 sm:p-10 text-center space-y-6 max-w-2xl mx-auto">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-[#1870FF] tracking-wider">{t('disc.path_eyebrow')}</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {t('selector.path_title') || 'Jalur Belajar Terbaik Untukmu'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t('selector.path_selected') || 'Project pilihanmu:'} <strong>{copyFor(selectedProject.title, lang)}</strong>
                {personalization ? ` — ${personalization}.` : '.'}
              </p>
            </div>

            <div className="inline-block w-full bg-gradient-to-r from-[#1870FF] to-[#0D47A1] text-white px-7 py-6 rounded-2xl shadow-xl text-left space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-100">
                {t('selector.path_label') || 'Program yang Direkomendasikan:'}
              </p>
              <p className="text-2xl sm:text-3xl font-black">{t(PROGRAM_SHORT_KEYS[selectedProgram])}</p>
              <p className="text-sm text-blue-100 leading-relaxed">
                {t('selector.path_desc') || 'Fokus pengembangan keahlian:'} {selectedProject.skills.join(', ')}.
              </p>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('selector.path_note') || 'Kamu dapat melihat laporan eksplorasi lengkap atau langsung melihat detail kurikulum program.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openReport(personalization ?? '')}
                className="w-full sm:w-auto px-7 py-3 bg-[#1870FF] hover:bg-[#1059D4] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('disc.view_report')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate?.(PROGRAM_PATHS[selectedProgram])}
                className="w-full sm:w-auto px-6 py-3 border border-blue-200 dark:border-slate-700 hover:border-[#1870FF] text-[#1870FF] dark:text-blue-400 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('selector.cta') || 'Lihat Program'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={reset}
                className="w-full sm:w-auto px-5 py-3 border border-slate-200 dark:border-slate-700 hover:border-[#1870FF] text-slate-600 dark:text-slate-300 hover:text-[#1870FF] font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('selector.reset') || 'Ulangi'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
