/**
 * Centralized Asset Constants
 * Resolves static asset paths against Vite's base URL.
 */

export const asset = (path: string): string => {
  if (!path) return '';
  if (/^(https?:|\/\/|data:|blob:)/.test(path)) {
    return path;
  }
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
};

export const ASSETS = {
  brand: {
    logo: asset("assets/brand/spi-logo.webp"),
    /** Globe mark only (square), for round avatars. */
    mark: asset("assets/brand/spi-mark.webp"),
    /** Tightly cropped wordmark for the header/footer (the square logo has large transparent padding). */
    logoHeader: asset("assets/brand/spi-logo-header.webp"),
    logoFooter: asset("assets/brand/spi-logo.webp"), // Fallback to spi-logo.png as footer logo does not exist
    pandaMascot: asset("assets/brand/spi-panda-mascot.webp"),
    favicon: asset("assets/brand/spi-logo.webp")
  },

  discover: {
    heroBackground: asset("assets/discover/discover-hero-background.webp"),
  },

  mentors: {
    mentor1: asset("assets/mentors/mentor-1.webp"),
    mentor2: asset("assets/mentors/mentor-2.webp"),
    mentor3: asset("assets/mentors/mentor-3.webp"),
    mentor4: asset("assets/mentors/mentor-4.webp"),
    mentor5: asset("assets/mentors/mentor-5.webp"),
    mentor6: asset("assets/mentors/mentor-6.webp")
  },

  programs: {
    spiCore: asset("assets/programs/program-spi-core.webp"),
    spiCoreHero: asset("assets/programs/program-spi-core-hero.webp"),
    spiLab: asset("assets/programs/program-spi-lab.webp"),
    spiLabHero: asset("assets/programs/program-spi-lab-hero.webp"),
    spiEngineering: asset("assets/programs/program-spi-engineering.webp"),
    spiEngineeringHero: asset("assets/programs/program-spi-engineering-hero.webp"),
    spiInSchool: asset("assets/programs/program-spi-inschool.webp"),
    spiInSchoolHero: asset("assets/programs/program-spi-inschool-hero.webp"),
    spiInschool: asset("assets/programs/program-spi-inschool.webp") // Alias for backwards compatibility
  },

  achievement: {
    international2025Ranking: asset("assets/achievement/achievement-international-2025-ranking.webp"),
    international2026Ranking: asset("assets/achievement/achievement-international-2026-ranking.webp"),
    steam2024Sd: asset("assets/achievement/achievement-steam-2024-sd.webp"),
    steam2025Sd: asset("assets/achievement/achievement-steam-2025-sd.webp"),
    steam2025Smp: asset("assets/achievement/achievement-steam-2025-smp.webp"),
    robotikJakartaBarat: asset("assets/achievement/achievement-robotik-jakarta-barat.webp"),
    steam2025Sma: asset("assets/achievement/achievement-steam-2025-sma.webp"),
    competition: asset("assets/achievement/achievement-category-competition.webp"),
    project: asset("assets/achievement/achievement-category-project.webp"),
    certification: asset("assets/achievement/achievement-category-certification.webp"),
    international: asset("assets/achievement/achievement-category-international.webp")
  },

  learning: {
    classroom: asset("assets/learning/learning-classroom.webp"),
    codingClass: asset("assets/learning/learning-coding-class.webp"),
    roboticsClass: asset("assets/learning/learning-robotics-class.webp"),
    aiProject: asset("assets/learning/learning-ai-project.webp"),
    studentPresentation: asset("assets/learning/learning-student-presentation.webp"),
    mentorSession: asset("assets/learning/learning-mentor-session.webp"),
    teamProject: asset("assets/learning/learning-team-project.webp"),
    experienceLearning: asset("assets/homepage/homepage-experience-spi.webp") // Alias for InSchoolProgramPage
  },

  studentProjects: {
    petFeeder: asset("assets/student-projects/student-project-pet-feeder.webp"),
    iBelajarBaca: asset("assets/student-projects/student-project-gogame-adventure.webp"), // fallback/alias
    stockManager: asset("assets/student-projects/student-project-stock-manager.webp"),
    nlpChatbot: asset("assets/student-projects/student-project-chatbot-school.webp"), // fallback/alias
    universityAdmissionPredictor: asset("assets/student-projects/student-project-university-admission-predictor.webp"),
    smartVendingMachine: asset("assets/student-projects/student-project-smart-vending-machine.webp"),
    smartHomeSystem: asset("assets/student-projects/student-project-flood-monitoring.webp"), // fallback/alias
    reverseVendingMachine: asset("assets/student-projects/student-project-smart-trash-bin.webp"), // fallback/alias
    
    // New specific png mappings matching physical disk files
    aiImageClassifier: asset("assets/student-projects/student-project-ai-image-classifier.webp"),
    automationProject: asset("assets/student-projects/student-project-automation-project.webp"),
    chatbotSchool: asset("assets/student-projects/student-project-chatbot-school.webp"),
    creatingPortfolio: asset("assets/student-projects/student-project-creating-portfolio.webp"),
    digitalPiano: asset("assets/student-projects/student-project-digital-piano.webp"),
    floodMonitoring: asset("assets/student-projects/student-project-flood-monitoring.webp"),
    gogameAdventure: asset("assets/student-projects/student-project-gogame-adventure.webp"),
    mazeEscape: asset("assets/student-projects/student-project-maze-escape.webp"),
    smartParking: asset("assets/student-projects/student-project-smart-parking.webp"),
    smartTrafficLight: asset("assets/student-projects/student-project-smart-traffic-light.webp"),
    smartTrashBin: asset("assets/student-projects/student-project-smart-trash-bin.webp")
  },

  blog: {
    christopherPetFeeder: "https://innindonesia.com/wp-content/uploads/2022/10/IMG_20221017_154244-e1665996492743.jpg",
    computationalThinking: "https://innindonesia.com/wp-content/uploads/2022/10/IMG_20221025_170449-e1666923801236.jpg",
    jocelynBelajarBaca: "https://innindonesia.com/wp-content/uploads/2022/10/IMG-20221028-WA0040-1-e1667217644218.jpg",
    innovationFest: "https://innindonesia.com/wp-content/uploads/2025/12/Untitled-800-x-337-px-800-x-447-px.jpg",
    infest2025: "https://innindonesia.com/wp-content/uploads/2025/10/IMG20251017164412-scaled-e1760768107421.jpg",
    spiSolo: "https://innindonesia.com/wp-content/uploads/2024/12/InShot_20241220_190736113-scaled.jpg",
    aiMusicEducation: "https://innindonesia.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-04-at-20.22.51-e1777902084283.jpeg",
    aiComposer: "https://innindonesia.com/wp-content/uploads/2025/11/Untitled-design-4.jpg"
  },

  homepage: {
    hero: asset("assets/homepage/homepage-hero.webp"),
    whyKidsChooseSpi: asset("assets/homepage/homepage-why-kids-choose-spi.webp"),
    learningJourney: asset("assets/homepage/homepage-learning-journey.webp"),
    spiLab: asset("assets/homepage/homepage-spi-lab.webp"),
    spiEngineering: asset("assets/homepage/homepage-spi-engineering.webp"),
    experienceSpi: asset("assets/homepage/homepage-experience-spi.webp"),
    learning: asset("assets/homepage/homepage-learning.webp")
  },

  partnership: {
    partnershipHero: asset("assets/partnership/partnership-hero.webp"),
    schoolPartnership: asset("assets/partnership/partnership-school.webp"),
    industryPartnership: asset("assets/partnership/partnership-industry.webp"),
    communityPartnership: asset("assets/partnership/partnership-community.webp"),
    strategicPartnership: asset("assets/partnership/partnership-strategic.webp"),
    franchiseCity: asset("assets/partnership/partnership-franchise-city.webp"),
    franchiseExterior: asset("assets/partnership/partnership-franchise-exterior.webp"),
    ekasa: asset("assets/partnership/partner-ekasa.webp"),
    binaBangsa: asset("assets/partnership/partner-binabangsa.webp"),
    ipeka: asset("assets/partnership/partner-ipeka.webp"),
    liaStephanie: asset("assets/partnership/partner-liastephanie.webp"),
    littleKey: asset("assets/partnership/partner-littlekey.webp"),
    pelitaHarapan: asset("assets/partnership/partner-pelitaharapan.webp"),
    surabaya: asset("assets/partnership/partner-surabaya.webp")
  },

  universities: {
    UNIVERSITY_MALAYA: asset("assets/universities/university-of-malaya.webp"),
    NATIONAL_UNIVERSITY_TAIWAN: asset("assets/universities/national-university-of-taiwan.webp"),
    WUHAN_UNIVERSITY: asset("assets/universities/wuhan-university.webp"),
    HONG_KONG_POLYTECHNIC: asset("assets/universities/hong-kong-polytechnic.webp"),
    BINUS_UNIVERSITY: asset("assets/universities/binus-university.webp"),
    UBM: asset("assets/universities/universitas-bunda-mulia.webp"),
    ZHEJIANG_UNIVERSITY: asset("assets/universities/zhejiang-university.webp"),
    ZUST: asset("assets/universities/zust.webp"),
    SUTD: asset("assets/universities/sutd.webp"),
    RMIT: asset("assets/universities/rmit.webp")
  },

  about: {
    vision: asset("assets/about/about-vision.webp"),
    mission: asset("assets/about/about-mission.webp"),
    quality: asset("assets/about/about-quality.webp"),
    philosophy: asset("assets/about/about-philosophy.webp"),
    impactVisual: asset("assets/about/about-impact-visual.webp")
  },

  inschool: {
    programs: {
      material: asset("assets/inschool/program-material.webp"),
      teacherTraining: asset("assets/inschool/program-teacher-training.webp"),
      modulBuku: asset("assets/inschool/program-modul-buku.webp"),
      satelit: asset("assets/inschool/program-satelit.webp"),
      sertifikasi: asset("assets/inschool/program-sertifikasi.webp")
    },
    projects: {
      smartParking: asset("assets/student-projects/student-project-smart-parking.webp"),
      digitalPiano: asset("assets/student-projects/student-project-digital-piano.webp"),
      mazeEscape: asset("assets/student-projects/student-project-maze-escape.webp"),
      smartTrafficLight: asset("assets/student-projects/student-project-smart-traffic-light.webp"),
      portfolio: asset("assets/student-projects/student-project-creating-portfolio.webp"),
      automation: asset("assets/student-projects/student-project-automation-project.webp")
    },
    gallery: {
      img1: asset("assets/inschool/gallery-1.webp"),
      img2: asset("assets/inschool/gallery-2.webp"),
      img3: asset("assets/inschool/gallery-3.webp"),
      img4: asset("assets/inschool/gallery-4.webp"),
      img5: asset("assets/inschool/gallery-5.webp")
    }
  },

  journal: {
    journalHero: asset("assets/journal/journal-hero.webp"),
    journalCover: asset("assets/journal/journal-cover.webp")
  }
} as const;
