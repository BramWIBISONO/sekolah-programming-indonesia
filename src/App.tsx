import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LazyMount } from './components/common/LazyMount';

import { labCategoryByPath } from './data/labCategories';
import { CORPORATE_OVERVIEW_PATH, corporateTrackByPath, isCorporatePath } from './data/corporateTraining';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { LanguageProvider, useLanguage } from './i18n';
import { ThemeProvider } from './utils/theme';

// Below-the-fold homepage sections, footer and chatbot load after the hero, so the first screen is not held back.
const ExperienceSection = lazy(() => import('./components/ExperienceSection').then(({ ExperienceSection }) => ({ default: ExperienceSection })));
const LearningJourneySection = lazy(() => import('./components/LearningJourneySection').then(({ LearningJourneySection }) => ({ default: LearningJourneySection })));
const ProgramSection = lazy(() => import('./components/ProgramSection').then(({ ProgramSection }) => ({ default: ProgramSection })));
const StudentProjectsSection = lazy(() => import('./components/StudentProjectsSection').then(({ StudentProjectsSection }) => ({ default: StudentProjectsSection })));
const StatisticSection = lazy(() => import('./components/StatisticSection').then(({ StatisticSection }) => ({ default: StatisticSection })));
const CTASection = lazy(() => import('./components/CTASection').then(({ CTASection }) => ({ default: CTASection })));
const Footer = lazy(() => import('./components/Footer').then(({ Footer }) => ({ default: Footer })));
const WhySPISection = lazy(() => import('./components/sections/WhySPISection').then(({ WhySPISection }) => ({ default: WhySPISection })));
const FAQSection = lazy(() => import('./components/sections/FAQSection').then(({ FAQSection }) => ({ default: FAQSection })));
const PartnershipSection = lazy(() => import('./components/sections/PartnershipSection').then(({ PartnershipSection }) => ({ default: PartnershipSection })));
const ComputationalThinkingSection = lazy(() => import('./components/sections/ComputationalThinkingSection').then(({ ComputationalThinkingSection }) => ({ default: ComputationalThinkingSection })));
const GlobalCodingSection = lazy(() => import('./components/sections/GlobalCodingSection').then(({ GlobalCodingSection }) => ({ default: GlobalCodingSection })));
const OnlineOfflineSection = lazy(() => import('./components/sections/OnlineOfflineSection').then(({ OnlineOfflineSection }) => ({ default: OnlineOfflineSection })));
const LearningExperienceSection = lazy(() => import('./components/sections/LearningExperienceSection').then(({ LearningExperienceSection }) => ({ default: LearningExperienceSection })));
const ParentValueSection = lazy(() => import('./components/sections/ParentValueSection').then(({ ParentValueSection }) => ({ default: ParentValueSection })));
const MentorSection = lazy(() => import('./components/sections/MentorSection').then(({ MentorSection }) => ({ default: MentorSection })));
const ClassroomExperienceSection = lazy(() => import('./components/sections/ClassroomExperienceSection').then(({ ClassroomExperienceSection }) => ({ default: ClassroomExperienceSection })));
const StudentAchievementSection = lazy(() => import('./components/sections/StudentAchievementSection').then(({ StudentAchievementSection }) => ({ default: StudentAchievementSection })));
const HomepagePartnerLogosSection = lazy(() => import('./components/sections/HomepagePartnerLogosSection').then(({ HomepagePartnerLogosSection }) => ({ default: HomepagePartnerLogosSection })));
const FindSPINearYouSection = lazy(() => import('./components/sections/FindSPINearYouSection').then(({ FindSPINearYouSection }) => ({ default: FindSPINearYouSection })));
const ProgramSelectorSection = lazy(() => import('./components/sections/ProgramSelectorSection').then(({ ProgramSelectorSection }) => ({ default: ProgramSelectorSection })));
const WhySPIVideoSection = lazy(() => import('./components/sections/WhySPIVideoSection').then(({ WhySPIVideoSection }) => ({ default: WhySPIVideoSection })));
const ClassSelectionSection = lazy(() => import('./components/sections/ClassSelectionSection').then(({ ClassSelectionSection }) => ({ default: ClassSelectionSection })));
const ClassRegistrationSection = lazy(() => import('./components/sections/ClassRegistrationSection').then(({ ClassRegistrationSection }) => ({ default: ClassRegistrationSection })));
const WhyCodingAISection = lazy(() => import('./components/sections/WhyCodingAISection').then(({ WhyCodingAISection }) => ({ default: WhyCodingAISection })));
const CurriculumExplorerSection = lazy(() => import('./components/sections/CurriculumExplorerSection').then(({ CurriculumExplorerSection }) => ({ default: CurriculumExplorerSection })));
const Chatbot = lazy(() => import('./components/common/Chatbot').then(({ Chatbot }) => ({ default: Chatbot })));

// Pages load only when visitors navigate to them, keeping the home page bundle small.
const CoreProgramPage = lazy(() => import('./components/pages/CoreProgramPage').then(({ CoreProgramPage }) => ({ default: CoreProgramPage })));
const LabProgramPage = lazy(() => import('./components/pages/LabProgramPage').then(({ LabProgramPage }) => ({ default: LabProgramPage })));
const LabCategoryPage = lazy(() => import('./components/pages/LabCategoryPage').then(({ LabCategoryPage }) => ({ default: LabCategoryPage })));
const CorporateTrainingPage = lazy(() => import('./components/pages/CorporateTrainingPage').then(({ CorporateTrainingPage }) => ({ default: CorporateTrainingPage })));
const EngineeringProgramPage = lazy(() => import('./components/pages/EngineeringProgramPage').then(({ EngineeringProgramPage }) => ({ default: EngineeringProgramPage })));
const InSchoolProgramPage = lazy(() => import('./components/pages/InSchoolProgramPage').then(({ InSchoolProgramPage }) => ({ default: InSchoolProgramPage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(({ AboutPage }) => ({ default: AboutPage })));
const CareerPage = lazy(() => import('./components/pages/CareerPage').then(({ CareerPage }) => ({ default: CareerPage })));
const AILiteracyPage = lazy(() => import('./components/pages/AILiteracyPage').then(({ AILiteracyPage }) => ({ default: AILiteracyPage })));
const AILiteracyJoinSection = lazy(() => import('./components/sections/AILiteracyJoinSection').then(({ AILiteracyJoinSection }) => ({ default: AILiteracyJoinSection })));
const AILiteracyPopup = lazy(() => import('./components/common/AILiteracyPopup').then(({ AILiteracyPopup }) => ({ default: AILiteracyPopup })));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage').then(({ ProjectsPage }) => ({ default: ProjectsPage })));
const LearningJourneyPage = lazy(() => import('./components/pages/LearningJourneyPage').then(({ LearningJourneyPage }) => ({ default: LearningJourneyPage })));
const PartnershipPage = lazy(() => import('./components/pages/PartnershipPage').then(({ PartnershipPage }) => ({ default: PartnershipPage })));
const BlogPage = lazy(() => import('./components/pages/BlogPage').then(({ BlogPage }) => ({ default: BlogPage })));
const SpiArticlePage = lazy(() => import('./components/pages/SpiArticlePage').then(({ SpiArticlePage }) => ({ default: SpiArticlePage })));
const JournalPage = lazy(() => import('./components/pages/JournalPage').then(({ JournalPage }) => ({ default: JournalPage })));
const AchievementPage = lazy(() => import('./components/pages/AchievementPage').then(({ AchievementPage }) => ({ default: AchievementPage })));
const GalleryPage = lazy(() => import('./components/pages/GalleryPage').then(({ GalleryPage }) => ({ default: GalleryPage })));
const AdminPage = lazy(() => import('./components/pages/AdminPage').then(({ AdminPage }) => ({ default: AdminPage })));
const DiscoveryReportPage = lazy(() => import('./components/pages/DiscoveryReportPage').then(({ DiscoveryReportPage }) => ({ default: DiscoveryReportPage })));

// Modals are requested only after a visitor opens one.
const FreeTrialModal = lazy(() => import('./components/modals/FreeTrialModal').then(({ FreeTrialModal }) => ({ default: FreeTrialModal })));
const ProjectVideoModal = lazy(() => import('./components/modals/ProjectVideoModal').then(({ ProjectVideoModal }) => ({ default: ProjectVideoModal })));

import { StudentProject } from './types';
import { ArrowUp } from 'lucide-react';

const DEFAULT_TITLE = 'Sekolah Programming Indonesia (SPI) | Bukan Sekadar Belajar Coding';

/** Pages that do not set their own tab title. Pages with their own title set it when they mount. */
const PAGE_TITLES: Record<string, string> = {
  '/partnership': 'Kemitraan',
  '/blog': 'Blog',
  '/journal': 'Jurnal',
  '/discover': 'Jelajahi SPI',
  '/projects': 'Karya Siswa',
};

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Keep the tab title right when a page has none of its own; otherwise it keeps the previous page's name.
  useEffect(() => {
    if (currentPath === '/') document.title = DEFAULT_TITLE;
    else if (PAGE_TITLES[currentPath]) document.title = `${PAGE_TITLES[currentPath]} | Sekolah Programming Indonesia`;
  }, [currentPath]);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  const [isRegistrationMode, setIsRegistrationMode] = useState<boolean>(false);
  const { t } = useLanguage();
  const [selectedTrialTrack, setSelectedTrialTrack] = useState<string>('SPI Core');
  const [selectedVideoProject, setSelectedVideoProject] = useState<StudentProject | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTrial = (trackName: string = 'SPI Core') => {
    setSelectedTrialTrack(trackName);
    setIsRegistrationMode(false);
    setIsTrialModalOpen(true);
  };

  const handleOpenRegistration = (trackName: string = 'SPI Core') => {
    setSelectedTrialTrack(trackName);
    setIsRegistrationMode(true);
    setIsTrialModalOpen(true);
  };

  const handleOpenVideo = (project: StudentProject) => {
    setSelectedVideoProject(project);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRegistration = () => {
    const el = document.getElementById('class-registration');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070D18] text-[#0B1220] dark:text-[#F8FAFC] selection:bg-[#1870FF] selection:text-white font-sans antialiased transition-colors">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenTrial={() => handleOpenTrial('SPI Core')}
        onOpenRegistration={() => handleOpenRegistration('SPI Core')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        <Suspense fallback={<div className="py-24 text-center text-sm font-medium text-slate-500" role="status">{t('common.loading')}</div>}>
        {currentPath === '/' && (
          <>
            {/* 01. Hero: Positioning & Free Trial */}
            <HeroSection onOpenTrial={() => handleOpenTrial('SPI Core')} onSelectProgram={handleNavigate} onExplorePrograms={() => {
              const el = document.getElementById('programs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <Suspense fallback={null}>
            {/* 02. Mengapa coding & AI penting sekarang, lalu Mengapa SPI Berbeda */}
            <LazyMount>
                <WhyCodingAISection />
            </LazyMount>
            <LazyMount>
                <WhySPISection />
            </LazyMount>

            {/* 03. Think → Build → Innovate: Computational Thinking & Method Example */}
            <LazyMount>
                <ComputationalThinkingSection />
            </LazyMount>
            <LazyMount>
                <LearningExperienceSection />
            </LazyMount>

            {/* 04. Program SPI: 4 Core Offerings & Interactive Program Finder */}
            <LazyMount anchorId="programs-section">
                <ProgramSection onSelectProgram={handleNavigate} onOpenTrial={handleOpenTrial} />
            </LazyMount>
            <LazyMount>
                <CurriculumExplorerSection onNavigate={handleNavigate} />
            </LazyMount>
            <LazyMount>
                <ProgramSelectorSection onNavigate={handleNavigate} />
            </LazyMount>

            {/* 05. Learning Journey: From Curiosity to Creation Roadmap */}
            <LazyMount>
                <GlobalCodingSection />
            </LazyMount>

            {/* 06. Bukti Pembelajaran: Real Student Projects */}
            <LazyMount anchorId="student-projects-section">
                <StudentProjectsSection />
            </LazyMount>

            {/* 07. Mentor & Kepercayaan: Nilai Orang Tua, Mentor, Prestasi, Suasana Kelas, Video & Mitra */}
            <LazyMount>
                <ParentValueSection />
            </LazyMount>
            <LazyMount>
                <MentorSection />
            </LazyMount>
            <LazyMount>
                <StudentAchievementSection onNavigate={handleNavigate} />
            </LazyMount>
            <LazyMount>
                <ClassroomExperienceSection />
            </LazyMount>
            <LazyMount>
                <WhySPIVideoSection onOpenTrial={() => handleOpenTrial('SPI Core')} />
            </LazyMount>
            <LazyMount>
                <HomepagePartnerLogosSection onNavigate={handleNavigate} />
            </LazyMount>

            {/* Gerakan AI Literacy: ajakan bergabung, setelah mitra dan sebelum lokasi */}
            <LazyMount anchorId="ai-literacy-section">
                <AILiteracyJoinSection onNavigate={handleNavigate} />
            </LazyMount>

            {/* 08. Lokasi & FAQ: Format Belajar Fleksibel, Peta Lokasi Resmi, Kemitraan & FAQ */}
            <LazyMount>
                <OnlineOfflineSection onOpenTrial={() => handleOpenTrial('SPI Core')} />
            </LazyMount>
            <LazyMount anchorId="find-spi-section">
                <FindSPINearYouSection />
            </LazyMount>
            <LazyMount>
                <PartnershipSection onNavigate={handleNavigate} />
            </LazyMount>
            <LazyMount anchorId="faq-section">
                <FAQSection />
            </LazyMount>

            {/* 09. Closing CTA: 4 Langkah Free Trial & Split Parents/Schools Action */}
            <LazyMount>
                <ExperienceSection onOpenTrial={() => handleOpenTrial('SPI Core')} />
            </LazyMount>
            <LazyMount>
                <CTASection
                  onOpenRegistration={() => handleOpenTrial('SPI Core')}
                  onOpenTrial={() => handleOpenTrial('SPI Core')}
                  onNavigate={handleNavigate}
                />
            </LazyMount>
            </Suspense>
          </>
        )}

        {currentPath === '/discover' && (
          <ProgramSelectorSection onNavigate={handleNavigate} />
        )}

        {currentPath === '/discover/report' && (
          <DiscoveryReportPage onBack={() => handleNavigate('/discover')} onNavigate={handleNavigate} />
        )}

        {currentPath === '/program/spi-core' && (
          <CoreProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/program/spi-lab' && (
          <LabProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Lab')} onNavigate={handleNavigate} />
        )}

        {labCategoryByPath(currentPath) && (
          <LabCategoryPage
            key={currentPath}
            categoryKey={labCategoryByPath(currentPath)!.key}
            onBack={() => handleNavigate('/program/spi-lab')}
            onNavigate={handleNavigate}
            onOpenTrial={() => handleOpenTrial('SPI Lab')}
          />
        )}

        {currentPath === '/program/spi-engineering' && (
          <EngineeringProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Engineering')} />
        )}

        {currentPath === '/program/spi-inschool' && (
          <InSchoolProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI InSchool')} />
        )}

        {currentPath === '/about' && (
          <AboutPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} onNavigate={handleNavigate} />
        )}

        {currentPath === '/gerakan-ai-literacy' && (
          <AILiteracyPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/career' && (
          <CareerPage onBack={() => handleNavigate('/')} />
        )}

        {currentPath === '/projects' && (
          <ProjectsPage onBack={() => handleNavigate('/')} onPlayVideo={handleOpenVideo} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/learning-journey' && (
          <LearningJourneyPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {isCorporatePath(currentPath) && (
          <CorporateTrainingPage
            key={currentPath}
            track={corporateTrackByPath(currentPath)?.key ?? null}
            onNavigate={handleNavigate}
            onBack={() => handleNavigate(currentPath === CORPORATE_OVERVIEW_PATH ? '/' : CORPORATE_OVERVIEW_PATH)}
          />
        )}

        {currentPath === '/partnership' && (
          <PartnershipPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/blog' && (
          <BlogPage onBack={() => handleNavigate('/')} onNavigate={handleNavigate} />
        )}

        {currentPath === '/journal' && (
          <JournalPage onBack={() => handleNavigate('/')} />
        )}

        {currentPath === '/achievement' && (
          <AchievementPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/galeri' && (
          <GalleryPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath.startsWith('/artikel/') && (
          <SpiArticlePage
            slug={currentPath.slice('/artikel/'.length)}
            onBack={() => handleNavigate('/blog')}
            onOpenTrial={() => handleOpenTrial('SPI Core')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPath === '/classes' && (
          <div className="pt-20">
            <ClassSelectionSection onScrollToRegistration={scrollToRegistration} />
            <ClassRegistrationSection />
          </div>
        )}

        {currentPath.startsWith('/admin') && (
          <AdminPage currentPath={currentPath} onNavigate={handleNavigate} onBack={() => handleNavigate('/')} />
        )}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Suspense fallback={null}>
      <Footer onNavigate={handleNavigate} onOpenTrial={() => handleOpenTrial('SPI Core')} />
      </Suspense>

      {/* Scroll to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="hidden sm:flex fixed bottom-6 right-24 z-40 w-11 h-11 rounded-full bg-[#1870FF] text-white flex items-center justify-center shadow-xl hover:bg-[#1059D4] transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <Suspense fallback={null}>
        <AILiteracyPopup onNavigate={handleNavigate} />
      </Suspense>
      <WhatsAppButton />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

      {/* Modals */}
      {isTrialModalOpen && (
        <Suspense fallback={null}>
          <FreeTrialModal
            isOpen={isTrialModalOpen}
            onClose={() => setIsTrialModalOpen(false)}
            initialTrack={selectedTrialTrack}
            isRegistration={isRegistrationMode}
            onViewTerms={() => {
              setIsTrialModalOpen(false);
              handleNavigate('/about');
            }}
          />
        </Suspense>
      )}

      {selectedVideoProject && (
        <Suspense fallback={null}>
          <ProjectVideoModal
            project={selectedVideoProject}
            onClose={() => setSelectedVideoProject(null)}
          />
        </Suspense>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
