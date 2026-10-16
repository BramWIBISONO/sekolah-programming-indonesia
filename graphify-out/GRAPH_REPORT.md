# Graph Report - sekolah-programming-indonesia  (2026-10-16)

## Corpus Check
- 166 files · ~4,344,149 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .example 1, (none) 1, .sqlite 1)

## Summary
- 1126 nodes · 2596 edges · 77 communities (69 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ec9b2dcc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ImageWithFallback
- App.tsx
- CorporateTrainingPage.tsx
- WhySPISection.tsx
- ProgramSelectorSection.tsx
- types/index.ts
- LanguageContext.tsx
- AdminPage.tsx
- package.json
- dependencies
- Directory Structure & Naming Convention
- setup-assets.cjs
- compilerOptions
- Chatbot.tsx
- server/index.js
- defence.mjs
- generate_placeholders.cjs
- devDependencies
- scripts
- server/db.js
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
- .sectest/server/index.js
- CoreProgramPage.tsx
- SpiIcon
- StudentProjectsSection.tsx
- AILiteracyPage.tsx
- motion
- MentorSection.tsx
- openSpiWhatsApp
- useLanguage
- AILiteracyPopup.tsx
- assets.ts
- Navbar.tsx
- react
- YouTubeEmbed
- theme.tsx
- BlogPage.tsx
- .sectest/server/db.js
- LearningJourneyPage.tsx
- corporateTraining.ts
- StatisticSection.tsx
- LazyMount.tsx
- FAQSection.tsx
- StudentWorkShowcase.tsx
- LearningExperienceSection.tsx
- EmailApplyDialog.tsx

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 133 edges
2. `react` - 106 edges
3. `lucide-react` - 80 edges
4. `AppContent()` - 58 edges
5. `ImageWithFallback()` - 43 edges
6. `SpiIcon()` - 43 edges
7. `ASSETS` - 41 edges
8. `motion` - 37 edges
9. `IllustratedHero()` - 34 edges
10. `openSpiWhatsApp()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Body` --references--> `School()`  [INFERRED]
  REGISTRATION_API.md → src/components/illustrations/SceneProps.tsx
- `MegaItem` --references--> `SpiIconName`  [EXTRACTED]
  src/components/Navbar.tsx → src/components/illustrations/SpiIcon.tsx
- `ProgramSection()` --calls--> `useLanguage()`  [EXTRACTED]
  src/components/ProgramSection.tsx → src/i18n/LanguageContext.tsx
- `HeroBadge` --references--> `SpiIconName`  [EXTRACTED]
  src/components/illustrations/IllustratedHero.tsx → src/components/illustrations/SpiIcon.tsx
- `HeroHighlight` --references--> `SpiIconName`  [EXTRACTED]
  src/components/illustrations/IllustratedHero.tsx → src/components/illustrations/SpiIcon.tsx

## Import Cycles
- None detected.

## Communities (77 total, 8 thin omitted)

### Community 0 - "ImageWithFallback"
Cohesion: 0.13
Nodes (20): ImageWithFallback(), ImageWithFallbackProps, resolveSrc(), ExperienceSection(), ExperienceSectionProps, STEPS, AssetViewerModal(), AssetViewerModalProps (+12 more)

### Community 1 - "App.tsx"
Cohesion: 0.08
Nodes (50): AboutPage, AchievementPage, AdminPage, AILiteracyJoinSection, AILiteracyPage, AILiteracyPopup, AppContent(), BlogPage (+42 more)

### Community 2 - "CorporateTrainingPage.tsx"
Cohesion: 0.14
Nodes (24): CategoryVisual(), LabBanner(), LabBannerProps, MegaFeature, CorporateTrainingPage(), CorporateTrainingPageProps, Eyebrow(), FEATURES (+16 more)

### Community 3 - "WhySPISection.tsx"
Cohesion: 0.20
Nodes (13): anim(), BuildVignette(), Check(), InnovateVignette(), POINTS, StageColumn(), StageKey, STAGES (+5 more)

### Community 4 - "ProgramSelectorSection.tsx"
Cohesion: 0.09
Nodes (34): ref_framer_motion, CORE_WORLDS, CoreWorld, DiscoverInteractiveWorld(), DiscoverInteractiveWorldProps, DiscoveryReportPage(), DiscoveryReportPageProps, evidenceLabels (+26 more)

### Community 5 - "types/index.ts"
Cohesion: 0.14
Nodes (17): STUDENTS, TEACHERS, CORE_CURRICULUM_STAGES, JOURNEY_STEPS, PROGRAMS_DATA, SCHOOL_PARTNERS, STATISTICS_DATA, STUDENT_TESTIMONIALS (+9 more)

### Community 6 - "LanguageContext.tsx"
Cohesion: 0.12
Nodes (17): HTML_LANG, Language, LanguageContext, LanguageContextType, LanguageProvider(), TranslationDict, TRANSLATIONS, TRI_SOURCES (+9 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.23
Nodes (13): AchievementsManager(), AdminAuth(), AdminAuthProps, BlogManager(), DashboardOverview(), EventsManager(), FormField, GenericManager() (+5 more)

### Community 8 - "package.json"
Cohesion: 0.11
Nodes (18): name, private, type, version, autoprefixer, concurrently, cors, dotenv (+10 more)

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

### Community 14 - "server/index.js"
Cohesion: 0.11
Nodes (23): ref_crypto, get(), query(), ALLOWED_ORIGINS, ALLOWED_UPLOADS, app, authenticateToken(), cleanPayload() (+15 more)

### Community 15 - "defence.mjs"
Cohesion: 0.05
Nodes (40): bcryptjs, jsonwebtoken, ref_node_fs, ref_node_path, ref_node_url, dicts, keysIn(), missing (+32 more)

### Community 16 - "generate_placeholders.cjs"
Cohesion: 0.17
Nodes (4): files, fs, path, targetDir

### Community 17 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, autoprefixer, esbuild, gh-pages, tailwindcss, tsx, @types/express, @types/node (+2 more)

### Community 18 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, check:i18n, clean, deploy, dev, dev:backend, dev:frontend (+3 more)

### Community 19 - "server/db.js"
Cohesion: 0.36
Nodes (6): db, dbPath, __dirname, __filename, run(), seed()

### Community 20 - "audit.cjs"
Cohesion: 0.29
Nodes (6): ref_fs, files, fs, path, results, walk()

### Community 21 - "extract_blog_images.cjs"
Cohesion: 0.40
Nodes (5): ref_https, fetchImage(), https, run(), urls

### Community 22 - "FreeTrialModal.tsx"
Cohesion: 0.14
Nodes (25): ageFromBirthDate(), Field(), FreeTrialModal(), FreeTrialModalProps, inputClass(), PanelTexture(), WaveEdge(), BRANCH_OPTIONS (+17 more)

### Community 23 - "IllustratedHero.tsx"
Cohesion: 0.08
Nodes (54): Body, Contoh, Kontrak API Form Pendaftaran SPI → Digital System, Pertanyaan untuk tim DS, Floating(), GreenFlag(), HeroSection(), HeroSectionProps (+46 more)

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

### Community 52 - ".sectest/server/index.js"
Cohesion: 0.12
Nodes (22): get(), query(), ALLOWED_ORIGINS, ALLOWED_UPLOADS, app, authenticateToken(), cleanPayload(), columnCache (+14 more)

### Community 53 - "CoreProgramPage.tsx"
Cohesion: 0.19
Nodes (15): CoreProgramPage(), CoreProgramPageProps, CoreLearningMethods(), BuildAIScene(), BuildBrainScene(), BuildWebScene(), ConnectBodyScene(), ConnectSystemsScene() (+7 more)

### Community 54 - "SpiIcon"
Cohesion: 0.23
Nodes (12): IllustratedHero(), SpiIcon(), AboutPage(), AboutPageProps, Eyebrow(), PILLARS, PRODUCTS, STAGES (+4 more)

### Community 55 - "StudentProjectsSection.tsx"
Cohesion: 0.24
Nodes (11): ProjectVideoModal(), StudentSuccessSection(), StudentProjectsSection(), STUDENT_PROJECTS, EXTRA_PORTFOLIO, PORTFOLIO, PortfolioKind, getYouTubeEmbedUrl() (+3 more)

### Community 56 - "AILiteracyPage.tsx"
Cohesion: 0.09
Nodes (24): AILiteracyPage(), AILiteracyPageProps, CHECKLIST, CMP_ROWS, COMPETENCIES, daysUntilKickoff(), EVIDENCE, Eyebrow() (+16 more)

### Community 57 - "motion"
Cohesion: 0.15
Nodes (15): motion, GLYPHS, SpiIconName, SpiIconProps, EXPECT, Eyebrow(), GalleryPage(), GalleryPageProps (+7 more)

### Community 58 - "MentorSection.tsx"
Cohesion: 0.50
Nodes (3): MentorSection(), MentorProfile, MENTORS_DATA

### Community 59 - "openSpiWhatsApp"
Cohesion: 0.13
Nodes (19): JavaCard(), SpiNetworkMap(), ApplyTrack, CareerPage(), CareerPageProps, REASONS, JournalPage(), JournalPageProps (+11 more)

### Community 60 - "useLanguage"
Cohesion: 0.12
Nodes (25): lucide-react, FeaturedStory, FeaturedStoryCarousel(), FeaturedStoryCarouselProps, IndonesiaMap(), IndonesiaMapProps, initials(), PortfolioShowcase() (+17 more)

### Community 61 - "AILiteracyPopup.tsx"
Cohesion: 0.20
Nodes (11): AILiteracyPopup(), AILiteracyPopupProps, TAGS, AILiteracyArt(), AILiteracyArtProps, HIDDEN, INPUTS, Cloud() (+3 more)

### Community 62 - "assets.ts"
Cohesion: 0.15
Nodes (12): AchievementArt(), AchievementArtProps, AchievementPage(), AchievementPageProps, content, ALUMNI_UNIVERSITIES, HomepagePartnerLogosSection(), HomepagePartnerLogosSectionProps (+4 more)

### Community 63 - "Navbar.tsx"
Cohesion: 0.15
Nodes (14): ProgramBanner(), MegaItem, MegaMenu, MegaPanel, NavbarProps, NavLink, SubLink, CurriculumExplorerSection() (+6 more)

### Community 64 - "react"
Cohesion: 0.16
Nodes (9): react, ProgramCard, ProgramSection(), ProgramSectionProps, ClassRegistrationSection(), ClassSelectionSection(), ClassSelectionSectionProps, CLASSES_DATA (+1 more)

### Community 65 - "YouTubeEmbed"
Cohesion: 0.16
Nodes (14): prefersManualPlayback(), sendPlayerCommand(), YouTubeEmbed(), YouTubeEmbedProps, HomeVideoSection(), StartFromSPISection(), WhyKidsChooseUsSection(), HOMEPAGE_VIDEO (+6 more)

### Community 66 - "theme.tsx"
Cohesion: 0.22
Nodes (7): react-dom, App(), src_index, Theme, ThemeContext, ThemeContextType, ThemeProvider()

### Community 67 - "BlogPage.tsx"
Cohesion: 0.22
Nodes (10): BlogFeaturedSlider(), BlogPage(), BlogPageProps, FeaturedArticle, SpiArticlePage(), SpiArticlePageProps, ArticleSection, getArticle() (+2 more)

### Community 68 - ".sectest/server/db.js"
Cohesion: 0.29
Nodes (7): sqlite3, ref_url, db, dbPath, __dirname, __filename, run()

### Community 69 - "LearningJourneyPage.tsx"
Cohesion: 0.38
Nodes (5): LearningJourneyPage, LearningJourneySection, LearningJourneySection(), LearningJourneyPage(), LearningJourneyPageProps

### Community 70 - "corporateTraining.ts"
Cohesion: 0.40
Nodes (5): Navbar(), CORPORATE_OVERVIEW_PATH, corporateTrackByPath(), isCorporatePath(), useTheme()

### Community 73 - "FAQSection.tsx"
Cohesion: 0.43
Nodes (5): Accordion(), AccordionProps, FAQSection(), FAQ_DATA, FAQItem

### Community 74 - "StudentWorkShowcase.tsx"
Cohesion: 0.32
Nodes (7): ProjectVideoModalProps, ProjectsPageProps, FILTERS, matches(), StudentWorkShowcase(), StudentWorkShowcaseProps, StudentProject

### Community 75 - "LearningExperienceSection.tsx"
Cohesion: 0.40
Nodes (5): FeederScene(), LearningExperienceSection(), PHASE_AT, Stage, STAGES

### Community 76 - "EmailApplyDialog.tsx"
Cohesion: 0.50
Nodes (4): composeLinks(), EmailApplyDialog(), EmailApplyDialogProps, Option

## Knowledge Gaps
- **475 isolated node(s):** `__filename`, `__dirname`, `dbPath`, `__filename`, `__dirname` (+470 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 519 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `ImageWithFallback`, `App.tsx`, `CorporateTrainingPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `AdminPage.tsx`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `CoreProgramPage.tsx`, `SpiIcon`, `StudentProjectsSection.tsx`, `AILiteracyPage.tsx`, `motion`, `MentorSection.tsx`, `openSpiWhatsApp`, `useLanguage`, `AILiteracyPopup.tsx`, `assets.ts`, `Navbar.tsx`, `YouTubeEmbed`, `theme.tsx`, `BlogPage.tsx`, `LearningJourneyPage.tsx`, `StatisticSection.tsx`, `LazyMount.tsx`, `FAQSection.tsx`, `StudentWorkShowcase.tsx`, `LearningExperienceSection.tsx`, `EmailApplyDialog.tsx`?**
  _High betweenness centrality (0.231) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `useLanguage` to `ImageWithFallback`, `App.tsx`, `CorporateTrainingPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `AdminPage.tsx`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `CoreProgramPage.tsx`, `SpiIcon`, `StudentProjectsSection.tsx`, `AILiteracyPage.tsx`, `motion`, `openSpiWhatsApp`, `AILiteracyPopup.tsx`, `assets.ts`, `Navbar.tsx`, `react`, `YouTubeEmbed`, `BlogPage.tsx`, `LearningJourneyPage.tsx`, `corporateTraining.ts`, `StatisticSection.tsx`, `FAQSection.tsx`, `StudentWorkShowcase.tsx`, `LearningExperienceSection.tsx`, `EmailApplyDialog.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Why does `useLanguage()` connect `useLanguage` to `ImageWithFallback`, `App.tsx`, `CorporateTrainingPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `Chatbot.tsx`, `FreeTrialModal.tsx`, `IllustratedHero.tsx`, `SpiNetworkMap.tsx`, `CoreProgramPage.tsx`, `SpiIcon`, `StudentProjectsSection.tsx`, `AILiteracyPage.tsx`, `motion`, `MentorSection.tsx`, `openSpiWhatsApp`, `AILiteracyPopup.tsx`, `assets.ts`, `Navbar.tsx`, `react`, `YouTubeEmbed`, `BlogPage.tsx`, `corporateTraining.ts`, `FAQSection.tsx`, `StudentWorkShowcase.tsx`, `LearningExperienceSection.tsx`, `EmailApplyDialog.tsx`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `dbPath` to the rest of the system?**
  _475 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ImageWithFallback` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07686274509803921 - nodes in this community are weakly interconnected._
- **Should `CorporateTrainingPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.135632183908046 - nodes in this community are weakly interconnected._