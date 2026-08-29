import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { LearningJourneySection } from './components/LearningJourneySection';
import { ProgramSection } from './components/ProgramSection';
import { StudentProjectsSection } from './components/StudentProjectsSection';
import { StatisticSection } from './components/StatisticSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

import { HomeVideoSection } from './components/sections/HomeVideoSection';
import { WhySPISection } from './components/sections/WhySPISection';
import { WhyKidsChooseUsSection } from './components/sections/WhyKidsChooseUsSection';

import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FAQSection } from './components/sections/FAQSection';
import { InnovationFestivalSection } from './components/sections/InnovationFestivalSection';
import { PartnershipSection } from './components/sections/PartnershipSection';
import { StartFromSPISection } from './components/sections/StartFromSPISection';
import { ComputationalThinkingSection } from './components/sections/ComputationalThinkingSection';
import { AINativeSection } from './components/sections/AINativeSection';
import { WhyStudyAtSPISection } from './components/sections/WhyStudyAtSPISection';
import { StudentSuccessSection } from './components/sections/StudentSuccessSection';
import { GlobalCodingSection } from './components/sections/GlobalCodingSection';
import { OnlineOfflineSection } from './components/sections/OnlineOfflineSection';
import { LearningExperienceSection } from './components/sections/LearningExperienceSection';

import { ParentValueSection } from './components/sections/ParentValueSection';
import { MentorSection } from './components/sections/MentorSection';
import { ClassroomExperienceSection } from './components/sections/ClassroomExperienceSection';
import { SPIInNumbersSection } from './components/sections/SPIInNumbersSection';
import { StudentAchievementSection } from './components/sections/StudentAchievementSection';
import { HomepagePartnerLogosSection } from './components/sections/HomepagePartnerLogosSection';
import { FindSPINearYouSection } from './components/sections/FindSPINearYouSection';
import { ParentTestimonialsSection } from './components/sections/ParentTestimonialsSection';
import { ProgramSelectorSection } from './components/sections/ProgramSelectorSection';
import { GlobalLearningJourneySection } from './components/sections/GlobalLearningJourneySection';
import { WhySPIVideoSection } from './components/sections/WhySPIVideoSection';
import { UpcomingEventsSection } from './components/sections/UpcomingEventsSection';
import { MonthlyProgramSection } from './components/sections/MonthlyProgramSection';
import { ClassSelectionSection } from './components/sections/ClassSelectionSection';
import { ClassRegistrationSection } from './components/sections/ClassRegistrationSection';
import { AlumniUniversitySection } from './components/sections/AlumniUniversitySection';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { Chatbot } from './components/common/Chatbot';
import { LanguageProvider } from './i18n';

// Pages
import { CoreProgramPage } from './components/pages/CoreProgramPage';
import { LabProgramPage } from './components/pages/LabProgramPage';
import { EngineeringProgramPage } from './components/pages/EngineeringProgramPage';
import { InSchoolProgramPage } from './components/pages/InSchoolProgramPage';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { LearningJourneyPage } from './components/pages/LearningJourneyPage';
import { PartnershipPage } from './components/pages/PartnershipPage';
import { BlogPage } from './components/pages/BlogPage';
import { JournalPage } from './components/pages/JournalPage';
import { AchievementPage } from './components/pages/AchievementPage';
import { AdminPage } from './components/pages/AdminPage';

// Modals
import { FreeTrialModal } from './components/modals/FreeTrialModal';
import { ProjectVideoModal } from './components/modals/ProjectVideoModal';

import { StudentProject } from './types';
import { ArrowUp } from 'lucide-react';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  const [isRegistrationMode, setIsRegistrationMode] = useState<boolean>(false);
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
    <div className="min-h-screen flex flex-col bg-white text-[#0B1220] selection:bg-[#176DF8] selection:text-white font-sans antialiased">
      
      {/* Global Navigation Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenTrial={() => handleOpenTrial('SPI Core')}
        onOpenRegistration={() => handleOpenRegistration('SPI Core')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPath === '/' && (
          <>
            <HeroSection onOpenTrial={() => handleOpenTrial('SPI Core')} onExplorePrograms={() => {
              const el = document.getElementById('programs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />
            
            <StartFromSPISection />
            <WhySPISection />
            <WhySPIVideoSection />
            <ExperienceSection onOpenTrial={() => handleOpenTrial('SPI Core')} />
            <LearningExperienceSection />
            
            <ComputationalThinkingSection />
            
            <ProgramSection onSelectProgram={handleNavigate} onOpenTrial={handleOpenTrial} />
            <ProgramSelectorSection onNavigate={handleNavigate} />
            
            <ParentValueSection />
            <GlobalLearningJourneySection />
            
            <MonthlyProgramSection onOpenTrial={() => handleOpenTrial('SPI Core')} />
            
            <MentorSection />
            <ClassroomExperienceSection />
            
            <StudentProjectsSection />
            
            <TestimonialsSection />
            <ParentTestimonialsSection />
            
            <SPIInNumbersSection />
            <StudentAchievementSection />
            <HomepagePartnerLogosSection onNavigate={handleNavigate} />
            
            <GlobalCodingSection />
            <OnlineOfflineSection />
            <FindSPINearYouSection />
            <AlumniUniversitySection />
            
            <UpcomingEventsSection />
            <PartnershipSection onNavigate={handleNavigate} />
            <FAQSection />
            <CTASection onOpenRegistration={() => handleOpenTrial('SPI Core')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
          </>
        )}

        {currentPath === '/program/spi-core' && (
          <CoreProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/program/spi-lab' && (
          <LabProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Lab')} />
        )}

        {currentPath === '/program/spi-engineering' && (
          <EngineeringProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Engineering')} />
        )}

        {currentPath === '/program/spi-inschool' && (
          <InSchoolProgramPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI InSchool')} />
        )}

        {currentPath === '/about' && (
          <AboutPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/projects' && (
          <ProjectsPage onBack={() => handleNavigate('/')} onPlayVideo={handleOpenVideo} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/learning-journey' && (
          <LearningJourneyPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/partnership' && (
          <PartnershipPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
        )}

        {currentPath === '/blog' && (
          <BlogPage onBack={() => handleNavigate('/')} />
        )}

        {currentPath === '/journal' && (
          <JournalPage onBack={() => handleNavigate('/')} />
        )}

        {currentPath === '/achievement' && (
          <AchievementPage onBack={() => handleNavigate('/')} onOpenTrial={() => handleOpenTrial('SPI Core')} />
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
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onOpenTrial={() => handleOpenTrial('SPI Core')} />

      {/* Scroll to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-24 z-40 w-11 h-11 rounded-full bg-[#176DF8] text-white flex items-center justify-center shadow-xl hover:bg-[#1059D4] transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <WhatsAppButton />
      <Chatbot />

      {/* Modals */}
      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        initialTrack={selectedTrialTrack}
        isRegistration={isRegistrationMode}
      />

      <ProjectVideoModal
        project={selectedVideoProject}
        onClose={() => setSelectedVideoProject(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
