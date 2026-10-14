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
    logo: asset("assets/brand/spi-logo.png"),
    /** Tightly cropped wordmark for the header/footer (the square logo has large transparent padding). */
    logoHeader: asset("assets/brand/spi-logo-header.webp"),
    logoFooter: asset("assets/brand/spi-logo.png"), // Fallback to spi-logo.png as footer logo does not exist
    pandaMascot: asset("assets/brand/spi-panda-mascot.webp"),
    favicon: asset("assets/brand/spi-logo.png")
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
    spiLabHero: asset("assets/programs/program-spi-lab-hero.png"),
    spiEngineering: asset("assets/programs/program-spi-engineering.webp"),
    spiEngineeringHero: asset("assets/programs/program-spi-engineering-hero.png"),
    spiInSchool: asset("assets/programs/program-spi-inschool.webp"),
    spiInSchoolHero: asset("assets/programs/program-spi-inschool-hero.png"),
    spiInschool: asset("assets/programs/program-spi-inschool.webp") // Alias for backwards compatibility
  },

  achievement: {
    international2025Ranking: asset("assets/achievement/achievement-international-2025-ranking.png"),
    international2026Ranking: asset("assets/achievement/achievement-international-2026-ranking.png"),
    steam2024Sd: asset("assets/achievement/achievement-steam-2024-sd.webp"),
    steam2025Sd: asset("assets/achievement/achievement-steam-2025-sd.jpg"),
    steam2025Smp: asset("assets/achievement/achievement-steam-2025-smp.webp"),
    robotikJakartaBarat: asset("assets/achievement/achievement-robotik-jakarta-barat.jpg"),
    steam2025Sma: asset("assets/achievement/achievement-steam-2025-sma.jpg"),
    competition: asset("assets/achievement/achievement-category-competition.webp"),
    project: asset("assets/achievement/achievement-category-project.webp"),
    certification: asset("assets/achievement/achievement-category-certification.webp"),
    international: asset("assets/achievement/achievement-category-international.webp")
  },

  learning: {
    classroom: asset("assets/learning/learning-classroom.jpg"),
    codingClass: asset("assets/learning/learning-coding-class.webp"),
    roboticsClass: asset("assets/learning/learning-robotics-class.jpg"),
    aiProject: asset("assets/learning/learning-ai-project.webp"),
    studentPresentation: asset("assets/learning/learning-student-presentation.webp"),
    mentorSession: asset("assets/learning/learning-mentor-session.webp"),
    teamProject: asset("assets/learning/learning-team-project.webp"),
    experienceLearning: asset("assets/homepage/homepage-experience-spi.webp") // Alias for InSchoolProgramPage
  },

  studentProjects: {
    petFeeder: asset("assets/student-projects/student-project-pet-feeder.jpg"),
    iBelajarBaca: asset("assets/student-projects/student-project-gogame-adventure.png"), // fallback/alias
    stockManager: asset("assets/student-projects/student-project-stock-manager.jpg"),
    nlpChatbot: asset("assets/student-projects/student-project-chatbot-school.png"), // fallback/alias
    universityAdmissionPredictor: asset("assets/student-projects/student-project-university-admission-predictor.jpg"),
    smartVendingMachine: asset("assets/student-projects/student-project-smart-vending-machine.jpg"),
    smartHomeSystem: asset("assets/student-projects/student-project-flood-monitoring.png"), // fallback/alias
    reverseVendingMachine: asset("assets/student-projects/student-project-smart-trash-bin.png"), // fallback/alias
    
    // New specific png mappings matching physical disk files
    aiImageClassifier: asset("assets/student-projects/student-project-ai-image-classifier.png"),
    automationProject: asset("assets/student-projects/student-project-automation-project.png"),
    chatbotSchool: asset("assets/student-projects/student-project-chatbot-school.png"),
    creatingPortfolio: asset("assets/student-projects/student-project-creating-portfolio.png"),
    digitalPiano: asset("assets/student-projects/student-project-digital-piano.png"),
    floodMonitoring: asset("assets/student-projects/student-project-flood-monitoring.png"),
    gogameAdventure: asset("assets/student-projects/student-project-gogame-adventure.png"),
    mazeEscape: asset("assets/student-projects/student-project-maze-escape.png"),
    smartParking: asset("assets/student-projects/student-project-smart-parking.png"),
    smartTrafficLight: asset("assets/student-projects/student-project-smart-traffic-light.png"),
    smartTrashBin: asset("assets/student-projects/student-project-smart-trash-bin.png")
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
    learningJourney: asset("assets/homepage/homepage-learning-journey.jpg"),
    spiLab: asset("assets/homepage/homepage-spi-lab.jpg"),
    spiEngineering: asset("assets/homepage/homepage-spi-engineering.jpg"),
    experienceSpi: asset("assets/homepage/homepage-experience-spi.webp"),
    learning: asset("assets/homepage/homepage-learning.webp")
  },

  partnership: {
    partnershipHero: asset("assets/partnership/partnership-hero.jpg"),
    schoolPartnership: asset("assets/partnership/partnership-school.webp"),
    industryPartnership: asset("assets/partnership/partnership-industry.webp"),
    communityPartnership: asset("assets/partnership/partnership-community.webp"),
    strategicPartnership: asset("assets/partnership/partnership-strategic.webp"),
    ekasa: asset("assets/partnership/partner-ekasa.png"),
    binaBangsa: asset("assets/partnership/partner-binabangsa.png"),
    ipeka: asset("assets/partnership/partner-ipeka.png"),
    liaStephanie: asset("assets/partnership/partner-liastephanie.png"),
    littleKey: asset("assets/partnership/partner-littlekey.png"),
    pelitaHarapan: asset("assets/partnership/partner-pelitaharapan.png"),
    surabaya: asset("assets/partnership/partner-surabaya.png")
  },

  universities: {
    UNIVERSITY_MALAYA: asset("assets/universities/university-of-malaya.png"),
    NATIONAL_UNIVERSITY_TAIWAN: asset("assets/universities/national-university-of-taiwan.png"),
    WUHAN_UNIVERSITY: asset("assets/universities/wuhan-university.png"),
    HONG_KONG_POLYTECHNIC: asset("assets/universities/hong-kong-polytechnic.png"),
    BINUS_UNIVERSITY: asset("assets/universities/binus-university.png"),
    UBM: asset("assets/universities/universitas-bunda-mulia.png"),
    ZHEJIANG_UNIVERSITY: asset("assets/universities/zhejiang-university.png"),
    ZUST: asset("assets/universities/zust.png"),
    SUTD: asset("assets/universities/sutd.png"),
    RMIT: asset("assets/universities/rmit.png")
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
      smartParking: asset("assets/student-projects/student-project-smart-parking.png"),
      digitalPiano: asset("assets/student-projects/student-project-digital-piano.png"),
      mazeEscape: asset("assets/student-projects/student-project-maze-escape.png"),
      smartTrafficLight: asset("assets/student-projects/student-project-smart-traffic-light.png"),
      portfolio: asset("assets/student-projects/student-project-creating-portfolio.png"),
      automation: asset("assets/student-projects/student-project-automation-project.png")
    },
    gallery: {
      img1: asset("assets/inschool/gallery-1.jpg"),
      img2: asset("assets/inschool/gallery-2.jpg"),
      img3: asset("assets/inschool/gallery-3.jpg"),
      img4: asset("assets/inschool/gallery-4.jpg"),
      img5: asset("assets/inschool/gallery-5.jpg")
    }
  },

  journal: {
    journalHero: asset("assets/journal/journal-hero.jpg"),
    journalCover: asset("assets/journal/journal-cover.jpg")
  }
} as const;
