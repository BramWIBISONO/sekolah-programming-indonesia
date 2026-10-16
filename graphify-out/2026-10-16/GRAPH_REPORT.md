# Graph Report - sekolah-programming-indonesia  (2026-10-16)

## Corpus Check
- 159 files · ~4,334,991 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: .example 1, (none) 1, .ini 1)

## Summary
- 1028 nodes · 2431 edges · 72 communities (64 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 42 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8fe97177`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- assets.ts
- App.tsx
- Navbar.tsx
- WhySPISection.tsx
- ProgramSelectorSection.tsx
- types/index.ts
- LanguageContext.tsx
- react
- package.json
- dependencies
- Directory Structure & Naming Convention
- setup-assets.cjs
- compilerOptions
- Chatbot.tsx
- index.js
- check-i18n.mjs
- generate_placeholders.cjs
- devDependencies
- scripts
- db.js
- audit.cjs
- extract_blog_images.cjs
- FreeTrialModal.tsx
- IllustratedHero.tsx
- scrape.js
- Run and deploy your AI Studio app
- universityData.ts
- monthlyProgram.ts
- 8.1 EdTech dan pendidikan coding anak
- 6. Rekomendasi Homepage Secara Detail
- 3.1 Temuan yang perlu diperiksa
- SpiNetworkMap.tsx
- design.md
- 1.3 Urutan prioritas
- 2.2 Empat produk utama
- 9. Sistem Visual dan UI Design Direction
- 16. Roadmap Implementasi
- 18. Master Prompt untuk AI atau Tim Desain yang Mengimplementasikan DESIGN.md
- 13. SEO, Aksesibilitas, Responsivitas, dan Performa
- 17. Acceptance Criteria
- 19. Referensi dan Jejak Sumber Benchmark
- 5. Struktur Informasi dan Navigasi
- ref_path
- 12. Formulir, Kontak, dan Konversi
- 15. Measurement Plan dan KPI
- 4. Target Audiens dan Kebutuhan Pengguna
- 10. Lokasi dan Peta Kemitraan Indonesia
- 14. Konten dan Editorial Governance
- 7. Transparansi Harga, Silabus, dan Free Trial
- lucide-react
- useLanguage
- CoreProgramPage.tsx
- openSpiWhatsApp
- AILiteracyPage.tsx
- SpiIcon
- YouTubeEmbed
- CareerPage.tsx
- ProjectsPage.tsx
- Navbar
- IllustratedHero
- StudentAchievementSection.tsx
- ClassSelectionSection.tsx
- StudentProjectsSection.tsx
- LearningJourneyPage.tsx
- StudentWorkShowcase.tsx
- AboutPage.tsx
- LearningExperienceSection.tsx
- ParentValueSection.tsx
- StatisticSection.tsx

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 131 edges
2. `react` - 104 edges
3. `lucide-react` - 79 edges
4. `AppContent()` - 56 edges
5. `ImageWithFallback()` - 43 edges
6. `SpiIcon()` - 43 edges
7. `ASSETS` - 41 edges
8. `motion` - 37 edges
9. `IllustratedHero()` - 34 edges
10. `openSpiWhatsApp()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `Body` --references--> `School()`  [INFERRED]
  REGISTRATION_API.md → src/components/illustrations/SceneProps.tsx
- `Footer()` --calls--> `useLanguage()`  [EXTRACTED]
  src/components/Footer.tsx → src/i18n/LanguageContext.tsx
- `MegaItem` --references--> `SpiIconName`  [EXTRACTED]
  src/components/Navbar.tsx → src/components/illustrations/SpiIcon.tsx
- `HeroBadge` --references--> `SpiIconName`  [EXTRACTED]
  src/components/illustrations/IllustratedHero.tsx → src/components/illustrations/SpiIcon.tsx
- `HeroHighlight` --references--> `SpiIconName`  [EXTRACTED]
  src/components/illustrations/IllustratedHero.tsx → src/components/illustrations/SpiIcon.tsx

## Import Cycles
- None detected.

## Communities (72 total, 8 thin omitted)

### Community 0 - "assets.ts"
Cohesion: 0.14
Nodes (20): ImageWithFallback(), ImageWithFallbackProps, resolveSrc(), ExperienceSection(), ExperienceSectionProps, STEPS, AssetViewerModal(), AssetViewerModalProps (+12 more)

### Community 1 - "App.tsx"
Cohesion: 0.09
Nodes (45): AboutPage, AchievementPage, AdminPage, AILiteracyJoinSection, AILiteracyPage, AILiteracyPopup, AppContent(), BlogPage (+37 more)

### Community 2 - "Navbar.tsx"
Cohesion: 0.09
Nodes (36): CategoryVisual(), LabBanner(), LabBannerProps, ProgramBanner(), MegaFeature, MegaItem, MegaMenu, MegaPanel (+28 more)

### Community 3 - "WhySPISection.tsx"
Cohesion: 0.22
Nodes (11): anim(), BuildVignette(), Check(), InnovateVignette(), POINTS, StageKey, STAGES, ThinkVignette() (+3 more)

### Community 4 - "ProgramSelectorSection.tsx"
Cohesion: 0.09
Nodes (34): ref_framer_motion, CORE_WORLDS, CoreWorld, DiscoverInteractiveWorld(), DiscoverInteractiveWorldProps, DiscoveryReportPage(), DiscoveryReportPageProps, evidenceLabels (+26 more)

### Community 5 - "types/index.ts"
Cohesion: 0.14
Nodes (17): STUDENTS, TEACHERS, CORE_CURRICULUM_STAGES, JOURNEY_STEPS, PROGRAMS_DATA, SCHOOL_PARTNERS, STATISTICS_DATA, STUDENT_TESTIMONIALS (+9 more)

### Community 6 - "LanguageContext.tsx"
Cohesion: 0.12
Nodes (17): HTML_LANG, Language, LanguageContext, LanguageContextType, LanguageProvider(), TranslationDict, TRANSLATIONS, TRI_SOURCES (+9 more)

### Community 7 - "react"
Cohesion: 0.22
Nodes (14): react, AchievementsManager(), AdminAuth(), AdminAuthProps, BlogManager(), DashboardOverview(), EventsManager(), FormField (+6 more)

### Community 8 - "package.json"
Cohesion: 0.12
Nodes (15): name, private, type, version, autoprefixer, concurrently, dotenv, esbuild (+7 more)

### Community 9 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, bcryptjs, concurrently, cors, dotenv, express, @google/genai, jsonwebtoken (+9 more)

### Community 10 - "Directory Structure & Naming Convention"
Cohesion: 0.12
Nodes (15): About, Achievement, Blog, Brand, Directory Structure & Naming Convention, Homepage, Inschool, Journal (+7 more)

### Community 11 - "setup-assets.cjs"
Cohesion: 0.16
Nodes (15): ref_zlib, baseDir, crc32(), createHeroBackgroundPlaceholder(), createLogoPlaceholder(), createPng(), dirs, fs (+7 more)

### Community 12 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+7 more)

### Community 13 - "Chatbot.tsx"
Cohesion: 0.16
Nodes (17): Chatbot(), HeaderTexture(), localeLabel(), WaGlyph(), WhatsAppButton(), CHATBOT_FALLBACK, CHATBOT_GREETING, ChatbotAction (+9 more)

### Community 14 - "index.js"
Cohesion: 0.15
Nodes (15): bcryptjs, cors, express, jsonwebtoken, multer, get(), query(), app (+7 more)

### Community 15 - "check-i18n.mjs"
Cohesion: 0.18
Nodes (11): ref_node_fs, ref_node_path, ref_node_url, dicts, keysIn(), missing, root, srcDir (+3 more)

### Community 16 - "generate_placeholders.cjs"
Cohesion: 0.17
Nodes (4): files, fs, path, targetDir

### Community 17 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, esbuild, gh-pages, tailwindcss, tsx, @types/express, @types/node (+2 more)

### Community 18 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check:i18n, clean, deploy, dev, dev:backend, dev:frontend (+3 more)

### Community 19 - "db.js"
Cohesion: 0.27
Nodes (8): sqlite3, ref_url, db, dbPath, __dirname, __filename, run(), seed()

### Community 20 - "audit.cjs"
Cohesion: 0.29
Nodes (6): ref_fs, files, fs, path, results, walk()

### Community 21 - "extract_blog_images.cjs"
Cohesion: 0.40
Nodes (5): ref_https, fetchImage(), https, run(), urls

### Community 22 - "FreeTrialModal.tsx"
Cohesion: 0.12
Nodes (27): Footer(), FooterProps, ageFromBirthDate(), Field(), FreeTrialModal(), FreeTrialModalProps, inputClass(), PanelTexture() (+19 more)

### Community 23 - "IllustratedHero.tsx"
Cohesion: 0.06
Nodes (64): Body, Contoh, Kontrak API Form Pendaftaran SPI → Digital System, Pertanyaan untuk tim DS, AILiteracyPopup(), AILiteracyPopupProps, TAGS, Floating() (+56 more)

### Community 24 - "scrape.js"
Cohesion: 0.67
Nodes (3): fetchOgImage(), run(), urls

### Community 31 - "8.1 EdTech dan pendidikan coding anak"
Cohesion: 0.05
Nodes (40): 8.1 EdTech dan pendidikan coding anak, 8.2 Platform developer education, 8.3 Platform dan pengalaman belajar, 8.4 Merek teknologi dan disiplin desain, 8.5 Pemerintah, lembaga, dan organisasi sosial, 8.6 Ringkasan prinsip yang paling layak diadopsi, 8. Benchmark Website: Apa yang Dipelajari SPI, Apple (+32 more)

### Community 32 - "6. Rekomendasi Homepage Secara Detail"
Cohesion: 0.12
Nodes (17): 6.10 Section: Sekolah dan mitra, 6.11 Section: Lokasi dan jangkauan, 6.12 Section: FAQ, 6.13 Final CTA, 6.1 Hero section, 6.2 Section: Why SPI, 6.3 Section: AI-Native Generation, 6.4 Section: Program SPI (+9 more)

### Community 33 - "3.1 Temuan yang perlu diperiksa"
Cohesion: 0.18
Nodes (11): 3.1 Temuan yang perlu diperiksa, 3.2 Skor audit awal, 3. Audit Konten dan Temuan Website Awal, A. Testimoni dan social proof, B. Bagian alumni, C. Konten yang berulang, D. Event, E. AI Idea Generator (+3 more)

### Community 34 - "SpiNetworkMap.tsx"
Cohesion: 0.13
Nodes (21): IndonesiaMap(), LABEL_OFFSET, OPEN_REGIONS, pctX(), pctY(), PHOTO_SLOTS, PHOTOS, FindSPINearYouSection() (+13 more)

### Community 35 - "design.md"
Cohesion: 0.22
Nodes (8): 0.1 Prinsip penting, 0.2 Batasan dan status bukti audit awal, 0. Cara Menggunakan Dokumen Ini, 11. Bahasa dan Internasionalisasi, 20. Penutup: Prinsip yang Tidak Boleh Hilang, DESIGN.md, Master Design, UX, Content, Brand, dan Website Strategy, Sekolah Programming Indonesia (SPI)

### Community 36 - "1.3 Urutan prioritas"
Cohesion: 0.25
Nodes (8): 1.1 Diagnosis utama, 1.2 Prinsip positioning, 1.3 Urutan prioritas, 1. Ringkasan Eksekutif, P0: Kepercayaan dan akurasi, P1: Positioning dan konversi, P2: Sistem visual dan konten, P3: Validasi teknis dan optimasi

### Community 37 - "2.2 Empat produk utama"
Cohesion: 0.25
Nodes (8): 2.1 Identitas inti, 2.2 Empat produk utama, 2.3 Jangan membuat produk terlihat saling tumpang tindih, 2. Identitas, Visi, dan Arsitektur Produk SPI, SPI Core, SPI Engineering, SPI InSchool, SPI Lab

### Community 38 - "9. Sistem Visual dan UI Design Direction"
Cohesion: 0.25
Nodes (8): 9.1 Palet warna, 9.2 Karakter visual, 9.3 Tipografi, 9.4 Komponen UI, 9.5 Spacing, radius, dan border, 9.6 Ilustrasi dan aset, 9.7 Animasi, 9. Sistem Visual dan UI Design Direction

### Community 39 - "16. Roadmap Implementasi"
Cohesion: 0.29
Nodes (7): 16. Roadmap Implementasi, Phase 0: Audit dan baseline, Phase 1: Trust and accuracy, Phase 2: Positioning and conversion, Phase 3: Learning proof and storytelling, Phase 4: Visual system and responsive design, Phase 5: Technical optimization and measurement

### Community 40 - "18. Master Prompt untuk AI atau Tim Desain yang Mengimplementasikan DESIGN.md"
Cohesion: 0.29
Nodes (7): 18. Master Prompt untuk AI atau Tim Desain yang Mengimplementasikan DESIGN.md, Aturan desain, Aturan konten dan bahasa, Instruksi kerja, Konteks, Output yang harus dihasilkan, Persona

### Community 41 - "13. SEO, Aksesibilitas, Responsivitas, dan Performa"
Cohesion: 0.33
Nodes (6): 13.1 SEO, 13.2 Core Web Vitals, 13.3 Mobile responsiveness, 13.4 Accessibility, 13.5 Kinerja, 13. SEO, Aksesibilitas, Responsivitas, dan Performa

### Community 42 - "17. Acceptance Criteria"
Cohesion: 0.33
Nodes (6): 17.1 Trust and content, 17.2 Brand and product, 17.3 Conversion, 17.4 Learning proof, 17.5 Visual and technical, 17. Acceptance Criteria

### Community 43 - "19. Referensi dan Jejak Sumber Benchmark"
Cohesion: 0.33
Nodes (6): 19. Referensi dan Jejak Sumber Benchmark, Learning platforms dan interactive learning, Performa web, Sekolah coding dan pendidikan, SPI, Teknologi dan desain

### Community 44 - "5. Struktur Informasi dan Navigasi"
Cohesion: 0.33
Nodes (6): 5.1 Usulan navigasi utama, 5.2 Pisahkan jalur B2C dan B2B, 5.3 Halaman yang disarankan, 5. Struktur Informasi dan Navigasi, Jalur B2B: sekolah dan institusi, Jalur B2C: siswa dan orang tua

### Community 45 - "ref_path"
Cohesion: 0.53
Nodes (4): ref_path, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 46 - "12. Formulir, Kontak, dan Konversi"
Cohesion: 0.40
Nodes (5): 12.1 Kontak resmi, 12.2 Formulir Free Trial, 12.3 Formulir kerja sama sekolah, 12.4 Prinsip konversi, 12. Formulir, Kontak, dan Konversi

### Community 47 - "15. Measurement Plan dan KPI"
Cohesion: 0.40
Nodes (5): 15.1 KPI funnel B2C, 15.2 KPI funnel B2B, 15.3 KPI konten dan produk, 15.4 Prinsip pengukuran, 15. Measurement Plan dan KPI

### Community 48 - "4. Target Audiens dan Kebutuhan Pengguna"
Cohesion: 0.40
Nodes (5): 4.1 Orang tua dan calon siswa, 4.2 Siswa, 4.3 Sekolah dan institusi, 4.4 Mitra dan calon lokasi kemitraan, 4. Target Audiens dan Kebutuhan Pengguna

### Community 49 - "10. Lokasi dan Peta Kemitraan Indonesia"
Cohesion: 0.50
Nodes (4): 10.1 Informasi yang harus dibedakan, 10.2 Arahan desain peta, 10.3 Data lokasi, 10. Lokasi dan Peta Kemitraan Indonesia

### Community 50 - "14. Konten dan Editorial Governance"
Cohesion: 0.50
Nodes (4): 14.1 Standar konten, 14.2 Hal yang tidak boleh tampil pada website publik, 14.3 Pengelolaan pembaruan, 14. Konten dan Editorial Governance

### Community 51 - "7. Transparansi Harga, Silabus, dan Free Trial"
Cohesion: 0.50
Nodes (4): 7.1 Transparansi biaya, 7.2 Silabus ringkas, 7.3 Free Trial, 7. Transparansi Harga, Silabus, dan Free Trial

### Community 52 - "lucide-react"
Cohesion: 0.23
Nodes (8): lucide-react, Accordion(), AccordionProps, FAQSection(), GlobalLearningJourneySection(), UpcomingEventsSection(), FAQ_DATA, FAQItem

### Community 53 - "useLanguage"
Cohesion: 0.10
Nodes (25): motion, IndonesiaMap(), IndonesiaMapProps, JavaCard(), SpiNetworkMap(), BlogFeaturedSlider(), BlogPage(), BlogPageProps (+17 more)

### Community 54 - "CoreProgramPage.tsx"
Cohesion: 0.16
Nodes (18): ProjectVideoModal(), CoreProgramPage(), CoreProgramPageProps, CoreLearningMethods(), BuildAIScene(), BuildBrainScene(), BuildWebScene(), ConnectBodyScene() (+10 more)

### Community 55 - "openSpiWhatsApp"
Cohesion: 0.16
Nodes (14): CTASection(), CTASectionProps, JournalPage(), JournalPageProps, OWN_STEPS, PaperIllustration(), Eyebrow(), PARTNER_MODELS (+6 more)

### Community 56 - "AILiteracyPage.tsx"
Cohesion: 0.10
Nodes (21): AILiteracyPage(), AILiteracyPageProps, CHECKLIST, CMP_ROWS, COMPETENCIES, daysUntilKickoff(), EVIDENCE, Eyebrow() (+13 more)

### Community 57 - "SpiIcon"
Cohesion: 0.12
Nodes (21): GLYPHS, SpiIcon(), SpiIconName, SpiIconProps, ENG_AUDIENCES, EngineeringProgramPage(), EngineeringProgramPageProps, EXPECT (+13 more)

### Community 58 - "YouTubeEmbed"
Cohesion: 0.16
Nodes (14): prefersManualPlayback(), sendPlayerCommand(), YouTubeEmbed(), YouTubeEmbedProps, HomeVideoSection(), StartFromSPISection(), WhyKidsChooseUsSection(), HOMEPAGE_VIDEO (+6 more)

### Community 59 - "CareerPage.tsx"
Cohesion: 0.27
Nodes (8): composeLinks(), EmailApplyDialog(), EmailApplyDialogProps, Option, ApplyTrack, CareerPage(), CareerPageProps, REASONS

### Community 60 - "ProjectsPage.tsx"
Cohesion: 0.29
Nodes (9): initials(), PortfolioShowcase(), PortfolioShowcaseProps, ProjectsPage(), STUDENT_PROJECTS, EXTRA_PORTFOLIO, PORTFOLIO, PortfolioItem (+1 more)

### Community 61 - "Navbar"
Cohesion: 0.15
Nodes (11): react-dom, App(), Navbar(), corporateTrackByPath(), isCorporatePath(), src_index, Theme, ThemeContext (+3 more)

### Community 62 - "IllustratedHero"
Cohesion: 0.21
Nodes (11): IllustratedHero(), AchievementPage(), AchievementPageProps, content, ADDITIONAL_TRUSTED, InSchoolProgramPage(), InSchoolProgramPageProps, LabProgramPage() (+3 more)

### Community 63 - "StudentAchievementSection.tsx"
Cohesion: 0.27
Nodes (7): FeaturedStory, FeaturedStoryCarousel(), FeaturedStoryCarouselProps, StudentAchievementSection(), StudentAchievementSectionProps, FEATURED_ACHIEVEMENTS, FeaturedAchievement

### Community 64 - "ClassSelectionSection.tsx"
Cohesion: 0.24
Nodes (7): ClassRegistrationSection, ClassSelectionSection, ClassRegistrationSection(), ClassSelectionSection(), ClassSelectionSectionProps, CLASSES_DATA, ClassItem

### Community 65 - "StudentProjectsSection.tsx"
Cohesion: 0.47
Nodes (6): StudentSuccessSection(), StudentProjectsSection(), getYouTubeEmbedUrl(), getYouTubeStartTime(), getYouTubeThumbnailUrl(), getYouTubeVideoId()

### Community 66 - "LearningJourneyPage.tsx"
Cohesion: 0.38
Nodes (5): LearningJourneyPage, LearningJourneySection, LearningJourneySection(), LearningJourneyPage(), LearningJourneyPageProps

### Community 67 - "StudentWorkShowcase.tsx"
Cohesion: 0.38
Nodes (5): ProjectVideoModalProps, ProjectsPageProps, FILTERS, StudentWorkShowcaseProps, StudentProject

### Community 68 - "AboutPage.tsx"
Cohesion: 0.33
Nodes (6): AboutPage(), AboutPageProps, Eyebrow(), PILLARS, PRODUCTS, STAGES

### Community 69 - "LearningExperienceSection.tsx"
Cohesion: 0.40
Nodes (5): FeederScene(), LearningExperienceSection(), PHASE_AT, Stage, STAGES

## Knowledge Gaps
- **423 isolated node(s):** `name`, `private`, `version`, `type`, `dev:frontend` (+418 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 459 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `assets.ts`, `App.tsx`, `Navbar.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `lucide-react`, `useLanguage`, `CoreProgramPage.tsx`, `openSpiWhatsApp`, `AILiteracyPage.tsx`, `SpiIcon`, `YouTubeEmbed`, `CareerPage.tsx`, `ProjectsPage.tsx`, `Navbar`, `IllustratedHero`, `StudentAchievementSection.tsx`, `ClassSelectionSection.tsx`, `StudentProjectsSection.tsx`, `LearningJourneyPage.tsx`, `StudentWorkShowcase.tsx`, `AboutPage.tsx`, `LearningExperienceSection.tsx`, `ParentValueSection.tsx`, `StatisticSection.tsx`?**
  _High betweenness centrality (0.185) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `assets.ts`, `App.tsx`, `Navbar.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `react`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `useLanguage`, `CoreProgramPage.tsx`, `openSpiWhatsApp`, `AILiteracyPage.tsx`, `SpiIcon`, `YouTubeEmbed`, `CareerPage.tsx`, `ProjectsPage.tsx`, `IllustratedHero`, `StudentAchievementSection.tsx`, `ClassSelectionSection.tsx`, `StudentProjectsSection.tsx`, `LearningJourneyPage.tsx`, `StudentWorkShowcase.tsx`, `AboutPage.tsx`, `LearningExperienceSection.tsx`, `ParentValueSection.tsx`, `StatisticSection.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `useLanguage()` connect `useLanguage` to `assets.ts`, `App.tsx`, `Navbar.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `lucide-react`, `CoreProgramPage.tsx`, `openSpiWhatsApp`, `AILiteracyPage.tsx`, `SpiIcon`, `YouTubeEmbed`, `CareerPage.tsx`, `ProjectsPage.tsx`, `Navbar`, `IllustratedHero`, `StudentAchievementSection.tsx`, `ClassSelectionSection.tsx`, `StudentProjectsSection.tsx`, `StudentWorkShowcase.tsx`, `AboutPage.tsx`, `LearningExperienceSection.tsx`, `ParentValueSection.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _423 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `assets.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13763440860215054 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08599033816425121 - nodes in this community are weakly interconnected._
- **Should `Navbar.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08888888888888889 - nodes in this community are weakly interconnected._