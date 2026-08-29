/**
 * Centralized Asset Constants
 * All images are stored in `/public/assets/` and referenced via `/assets/<filename>`
 * When the user uploads/replaces files in `/public/assets/`, all components automatically display them.
 *
 * ASSET SYSTEM RULES:
 * 1. Every image location on the website MUST have a key here.
 * 2. Components reference these keys — never hardcode paths in UI.
 * 3. If an image file does not exist yet, the key still exists here.
 *    ImageWithFallback will render a premium SPI placeholder automatically.
 * 4. To add a new image: place the file in /public/assets/, update the path here.
 *    No component rebuild needed.
 * 5. Use lowercase-kebab-case for new filenames.
 */

export const ASSETS = {
  // ─── Brand & Navigation ─────────────────────────────────────────
  LOGO: '/assets/logo.png',
  NAVBAR_REF: '/assets/navbar.png',
  MASCOT: '/assets/maskot.png',
  PARTNER_EKASA: '/assets/ekasa.png',

  // ─── Hero Section Visuals ───────────────────────────────────────
  HERO_MAIN: '/assets/hero.png',
  HERO_CORE: '/assets/hero_core.png',
  HERO_LAB: '/assets/hero_lab.png',
  HERO_ENGINEERING: '/assets/hero_engineering.png',
  HERO_INSCHOOL: '/assets/hero1.png',

  // ─── Program Card Visuals ──────────────────────────────────────
  CORE_CARD: '/assets/core.png',
  LAB_CARD: '/assets/lab.png',
  ENGINEERING_CARD: '/assets/engineering.png',
  INSCHOOL_CARD: '/assets/inschool.png',

  // ─── Experience Section ─────────────────────────────────────────
  EXPERIENCE_LEARNING: '/assets/experience_learning.png',

  // ─── Curriculum Stage Images ────────────────────────────────────
  CURRICULUM: {
    STAGE_1: '/assets/curriculum_stage1.png',
    STAGE_2: '/assets/curriculum_stage2.png',
    STAGE_3: '/assets/curriculum_stage3.png',
    STAGE_4: '/assets/curriculum_stage4.png',
  },

  // ─── InSchool 5 Cooperation Programs ────────────────────────────
  INSCHOOL_PROGRAMS: {
    MATERIAL: '/assets/inschool_material.png',
    TEACHER_TRAINING: '/assets/inschool_teacher.png',
    MODUL_BUKU: '/assets/inschool_modul.png',
    SATELIT: '/assets/inschool_satelit.png',
    SERTIFIKASI: '/assets/inschool_sertifikasi.png',
  },

  // ─── Lab Modules Images ─────────────────────────────────────────
  LAB_MODULES: {
    AI_PRODUCTIVITY: '/assets/lab_ai.png',
    DESIGN_VISUAL: '/assets/lab_design.png',
    WORKSPACE: '/assets/lab_workspace.png',
    LOGIC_GAME: '/assets/lab_logic.png',
  },

  // ─── Engineering Pillars Images ─────────────────────────────────
  ENGINEERING_PILLARS: {
    MACHINE_LEARNING: '/assets/eng_ml.png',
    COMPUTER_VISION: '/assets/eng_vision.png',
    IOT_PHYSICAL: '/assets/eng_iot.png',
    DATA_SCIENCE: '/assets/eng_datascience.png',
  },

  // ─── InSchool Gallery Activities ────────────────────────────────
  INSCHOOL_GALLERY: {
    IMG_1: '/assets/gallery_01.png',
    IMG_2: '/assets/gallery_02.png',
    IMG_3: '/assets/gallery_03.png',
    IMG_4: '/assets/gallery_04.png',
    IMG_5: '/assets/gallery_05.png',
  },

  // ─── School Partner Logos ───────────────────────────────────────
  PARTNERS: {
    LIA_STEPHANIE: '/assets/partner_liastephanie.png',
    IPEKA: '/assets/partner_ipeka.png',
    LITTLE_KEY: '/assets/partner_littlekey.png',
    PELITA_HARAPAN: '/assets/partner_pelitaharapan.png',
    BINA_BANGSA: '/assets/partner_binabangsa.png',
    SURABAYA_INTERCULTURAL: '/assets/partner_surabaya.png',
  },

  // ─── Student Projects ──────────────────────────────────────────
  PROJECTS: {
    SMART_TRASH_BIN: '/assets/project-01.png',
    AI_IMAGE_CLASSIFIER: '/assets/project-02.png',
    FLOOD_MONITORING: '/assets/project-03.png',
    GOGAME_ADVENTURE: '/assets/project-04.png',
    CHATBOT_SCHOOL: '/assets/project-05.png',
    MAZE_ESCAPE: '/assets/project-06.png',
    SMART_PARKING: '/assets/project-07.png',
    DIGITAL_PIANO: '/assets/project-08.png',
    SMART_TRAFFIC_LIGHT: '/assets/project-09.png',
    CREATING_PORTFOLIO: '/assets/project-10.png',
    AUTOMATION_PROJECT: '/assets/project-11.png',
  },

  // ─── Testimonial Photos ─────────────────────────────────────────
  TESTIMONIALS: {
    STUDENT_1: '/assets/testimonial-student-01.webp',
    STUDENT_2: '/assets/testimonial-student-02.webp',
    STUDENT_3: '/assets/testimonial-student-03.webp',
    TEACHER_1: '/assets/testimonial-teacher-01.webp',
    TEACHER_2: '/assets/testimonial-teacher-02.webp',
    PARENT_1: '/assets/testimonial-parent-01.webp',
    PARENT_2: '/assets/testimonial-parent-02.webp',
    PARENT_3: '/assets/testimonial-parent-03.webp',
  },

  // ─── Voices & Testimonials Visuals ──────────────────────────────
  STUDENT_VOICES: {
    MAIN: '/assets/student-voices-main.webp',
    VOICE_01: '/assets/student-voice-01.webp',
    VOICE_02: '/assets/student-voice-02.webp',
    VOICE_03: '/assets/student-voice-03.webp',
    VOICE_04: '/assets/student-voice-04.webp',
  },
  TEACHER_SCHOOL_VOICES: {
    MAIN: '/assets/teacher-school-voices-main.webp',
    VOICE_01: '/assets/teacher-school-voice-01.webp',
    VOICE_02: '/assets/teacher-school-voice-02.webp',
    LOGO_01: '/assets/teacher-school-logo-01.webp',
    LOGO_02: '/assets/teacher-school-logo-02.webp',
  },
  PARENT_TESTIMONIALS: {
    MAIN: '/assets/parent-testimonials-main.webp',
    TESTIMONIAL_01: '/assets/parent-testimonial-01.webp',
    TESTIMONIAL_02: '/assets/parent-testimonial-02.webp',
    TESTIMONIAL_03: '/assets/parent-testimonial-03.webp',
  },

  // ─── Student Projects Expanded ──────────────────────────────────
  STUDENT_PROJECTS: {
    MAIN: '/assets/student-projects-main.webp',
    PROJECT_01: '/assets/student-project-01.webp',
    PROJECT_02: '/assets/student-project-02.webp',
    PROJECT_03: '/assets/student-project-03.webp',
    PROJECT_04: '/assets/student-project-04.webp',
    PROJECT_05: '/assets/student-project-05.webp',
    PROJECT_06: '/assets/student-project-06.webp',
  },

  // ─── Computational Thinking ─────────────────────────────────────
  COMPUTATIONAL_THINKING: {
    MAIN: '/assets/computational-thinking-main.webp',
    ICON: '/assets/computational-thinking-icon.webp',
  },

  // ─── About Page Visuals ─────────────────────────────────────────
  ABOUT: {
    PHILOSOPHY: '/assets/about-philosophy.webp',
    ECOSYSTEM: '/assets/about-ecosystem.webp',
    HERO: '/assets/about-hero.webp',
    VISION: '/assets/about-vision.webp',
    MISSION: '/assets/about-mission.webp',
    QUALITY: '/assets/about-quality.webp',
    IMPACT_VISUAL: '/assets/about-impact-visual.webp',
  },

  // ─── Partnership Visuals ────────────────────────────────────────
  PARTNERSHIP: {
    MAIN: '/assets/partnership-main.webp',
    HERO: '/assets/partnership-hero.webp',
    COLLABORATION: '/assets/partnership-collaboration.webp',
    INSCHOOL: '/assets/partnership-inschool.webp',
    CORPORATE: '/assets/partnership-corporate.webp',
    COMMUNITY: '/assets/partnership-community.webp',
    STRATEGIC: '/assets/partnership-strategic.webp',
    INSCHOOL_VISUAL: '/assets/partnership-inschool-visual.webp',
    CORPORATE_VISUAL: '/assets/partnership-corporate-visual.webp',
    COMMUNITY_VISUAL: '/assets/partnership-community-visual.webp',
    STRATEGIC_VISUAL: '/assets/partnership-strategic-visual.webp',
  },

  // ─── Monthly Special Program ────────────────────────────────────
  MONTHLY_PROGRAM: {
    HERO: '/assets/monthly-special-program-hero.webp',
  },

  // ─── Innovation Festival ────────────────────────────────────────
  INNOVATION_FESTIVAL: {
    HERO: '/assets/innovation-festival-hero.webp',
  },

  // ─── Why SPI Section ───────────────────────────────────────────
  WHY_SPI: {
    CURRICULUM: '/assets/why-spi-curriculum.png',
    TECHNOLOGY_ECOSYSTEM: '/assets/why-spi-tech-ecosystem.png',
  },

  // ─── AI Native Section ─────────────────────────────────────────
  AI_NATIVE: {
    ASSISTED_LEARNING: '/assets/ai-native-assisted.png',
    REAL_ECOSYSTEM: '/assets/ai-native-ecosystem.png',
  },

  // ─── Learning Experience ────────────────────────────────────────
  LEARNING_EXPERIENCE: '/assets/learning-experience.png',

  // ─── Global Coding ──────────────────────────────────────────────
  GLOBAL_CODING: {
    MAP: '/assets/global-map.png',
    STUDENTS: '/assets/global-students.png',
    LOCATIONS: '/assets/global-locations.png',
  },

  // ─── Online / Offline ───────────────────────────────────────────
  ONLINE_OFFLINE: {
    ONLINE_CLASS: '/assets/online-class.png',
    OFFLINE_CLASS: '/assets/offline-class.png',
  },

  // ─── Blog & Journal ─────────────────────────────────────────────
  BLOG: {
    THUMBNAIL: '/assets/blog-thumbnail.png',
  },
  JOURNAL: {
    THUMBNAIL: '/assets/journal-thumbnail.png',
  },

  // ─── Mentors ────────────────────────────────────────────────────
  MENTORS: {
    MENTOR_1: '/assets/mentor-profile-1.webp',
    MENTOR_2: '/assets/mentor-profile-2.webp',
    MENTOR_3: '/assets/mentor-profile-3.webp',
    MENTOR_4: '/assets/mentor-profile-4.webp',
    MENTOR_5: '/assets/mentor-profile-5.webp',
    MENTOR_6: '/assets/mentor-profile-6.webp',
  },

  // ─── Classroom Experience ───────────────────────────────────────
  CLASSROOM: {
    MAIN: '/assets/classroom-main.webp',
    CODING: '/assets/classroom-coding.webp',
    ROBOTICS: '/assets/classroom-robotics.webp',
    AI_PROJECT: '/assets/classroom-ai.webp',
    PRESENTATION: '/assets/classroom-presentation.webp',
    MENTOR_SESSION: '/assets/classroom-mentor.webp',
    TEAM_PROJECT: '/assets/classroom-team.webp',
  },

  // ─── Student Achievement ────────────────────────────────────────
  ACHIEVEMENT: {
    COMPETITION: '/assets/achievement-competition.webp',
    PROJECT: '/assets/achievement-project.webp',
    CERTIFICATION: '/assets/achievement-certification.webp',
    INTERNATIONAL: '/assets/achievement-international.webp',
  },

  // ─── Parent Value Icons ─────────────────────────────────────────
  PARENT_VALUE: {
    THINKING: '/assets/parent-thinking.webp',
    PROJECT: '/assets/parent-project.webp',
    MENTOR: '/assets/parent-mentor.webp',
    PROGRESS: '/assets/parent-progress.webp',
    ONLINE_OFFLINE: '/assets/parent-online-offline.webp',
  },

  // ─── Class Visuals ──────────────────────────────────────────────
  CLASSES: {
    WEBSITE_AI: '/assets/class-create-website-ai.webp',
    WEB_DEV: '/assets/class-web-development.webp',
    POWERPOINT: '/assets/class-powerpoint.webp',
    WORD: '/assets/class-microsoft-word.webp',
    PYTHON: '/assets/class-python.webp',
    EXCEL: '/assets/class-excel.webp',
    DATA_ANALYSIS: '/assets/class-data-analysis.webp',
    UI_UX: '/assets/class-ui-ux.webp',
    SECTION_VISUAL: '/assets/class-section-visual.webp',
    REGISTRATION_VISUAL: '/assets/class-registration-visual.webp',
  },

  // ─── University Logos ───────────────────────────────────────────
  UNIVERSITIES: {
    UNIVERSITY_MALAYA: '/assets/university-malaya.webp',
    NATIONAL_UNIVERSITY_TAIWAN: '/assets/university-ntu.webp',
    WUHAN_UNIVERSITY: '/assets/university-wuhan.webp',
    HONG_KONG_POLYTECHNIC: '/assets/university-polyu.webp',
    BINUS_UNIVERSITY: '/assets/university-binus.webp',
    UBM: '/assets/university-ubm.webp',
    ZHEJIANG_UNIVERSITY: '/assets/university-zju.webp',
    ZUST: '/assets/university-zust.webp',
    SUTD: '/assets/university-sutd.webp',
    RMIT: '/assets/university-rmit.webp',
  },

  // ─── Find SPI / Branches ───────────────────────────────────────
  BRANCHES: {
    MAP: '/assets/branches-map.webp',
  },

  // ─── Program Selector ──────────────────────────────────────────
  PROGRAM_SELECTOR: {
    VISUAL: '/assets/program-selector-visual.webp',
  },

  // ─── Why SPI Video ─────────────────────────────────────────────
  WHY_SPI_VIDEO: {
    THUMBNAIL: '/assets/why-spi-video-thumbnail.webp',
  },

  // ─── SPI Core ──────────────────────────────────────────────────
  SPI_CORE: {
    HERO: '/assets/spi-core-hero.webp',
    JOURNEY_PRESCHOOL: '/assets/spi-core-journey-preschool.webp',
    JOURNEY_FOUNDATION: '/assets/spi-core-journey-foundation.webp',
    JOURNEY_DEVELOPMENT: '/assets/spi-core-journey-development.webp',
    JOURNEY_EXPLORATION: '/assets/spi-core-journey-exploration.webp',
    JOURNEY_RESEARCH: '/assets/spi-core-journey-research.webp',
  },

  // ─── SPI Lab ───────────────────────────────────────────────────
  SPI_LAB: {
    HERO: '/assets/spi-lab-hero.webp',
  },
} as const;
