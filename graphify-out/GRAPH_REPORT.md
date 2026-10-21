# Graph Report - sekolah-programming-indonesia  (2026-10-21)

## Corpus Check
- 195 files · ~52,853,042 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .example 1, (none) 1, .gs 1)

## Summary
- 1305 nodes · 3094 edges · 79 communities (70 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 56 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c0158853`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- gallery_pipeline.py
- App.tsx
- LabProgramPage.tsx
- WhySPISection.tsx
- ProgramSelectorSection.tsx
- CoreProgramPage.tsx
- LanguageContext.tsx
- utils/seo.ts
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
- AboutPage.tsx
- IllustratedHero.tsx
- scrape.js
- Run and deploy your AI Studio app
- universityData.ts
- monthlyProgram.ts
- 8.1 EdTech dan pendidikan coding anak
- 6. Rekomendasi Homepage Secara Detail
- 3.1 Temuan yang perlu diperiksa
- AILiteracyPopup.tsx
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
- GalleryPage.tsx
- 12. Formulir, Kontak, dan Konversi
- 15. Measurement Plan dan KPI
- 4. Target Audiens dan Kebutuhan Pengguna
- 10. Lokasi dan Peta Kemitraan Indonesia
- FreeTrialModal.tsx
- SpiIcon.tsx
- EventsPage.tsx
- react
- SpiArticlePage.tsx
- ProjectsPage.tsx
- IllustratedHero
- AILiteracyJoinSection.tsx
- SpiIcon
- motion
- MentorSection.tsx
- PartnershipPage.tsx
- assets.ts
- Pendaftaran Gerakan AI Literacy Indonesia: panduan deploy
- ASSETS
- theme.tsx
- AILiteracyPage.tsx
- vercel.json
- LearningJourneyPage.tsx
- useLanguage
- StatisticSection.tsx
- ClassSelectionSection.tsx
- TestimonialsSection.tsx
- 14. Konten dan Editorial Governance
- 7. Transparansi Harga, Silabus, dan Free Trial
- Navbar.tsx
- LazyMount.tsx
- Kontrak API Class Registration → SPI_API
- ref_path

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 145 edges
2. `react` - 122 edges
3. `lucide-react` - 87 edges
4. `AppContent()` - 64 edges
5. `SpiIcon()` - 46 edges
6. `ASSETS` - 46 edges
7. `openSpiWhatsApp()` - 45 edges
8. `motion` - 44 edges
9. `IllustratedHero()` - 44 edges
10. `ImageWithFallback()` - 43 edges

## Surprising Connections (you probably didn't know these)
- `Status publikasi` --references--> `publish()`  [INFERRED]
  dokumentasi/_manifest/README.md → scripts/gallery_pipeline.py
- `MegaFeature` --references--> `LabCategoryKey`  [EXTRACTED]
  src/components/Navbar.tsx → src/data/labCategories.ts
- `ListItem` --references--> `SpiIconName`  [EXTRACTED]
  src/components/pages/BlogPage.tsx → src/components/illustrations/SpiIcon.tsx
- `GalleryCategory` --references--> `SpiIconName`  [EXTRACTED]
  src/data/gallery.ts → src/components/illustrations/SpiIcon.tsx
- `SpiArticle` --references--> `SpiIconName`  [EXTRACTED]
  src/data/spiArticles.ts → src/components/illustrations/SpiIcon.tsx

## Import Cycles
- None detected.

## Communities (79 total, 9 thin omitted)

### Community 0 - "gallery_pipeline.py"
Cohesion: 0.07
Nodes (39): csv, Hasil migrasi (salin, bukan pindah), Manifest dokumentasi galeri, Pemetaan sumber ke struktur final, Status publikasi, Image, json, Path (+31 more)

### Community 1 - "App.tsx"
Cohesion: 0.08
Nodes (51): AboutPage, AchievementPage, AdminPage, AILiteracyJoinSection, AILiteracyPage, AILiteracyRegisterPage, AppContent(), BASE_PATH (+43 more)

### Community 2 - "LabProgramPage.tsx"
Cohesion: 0.19
Nodes (18): LabCategoryPage, LabProgramPage, CategoryVisual(), LabBannerProps, Eyebrow(), HERO_ICON, LabCategoryPage(), LabCategoryPageProps (+10 more)

### Community 3 - "WhySPISection.tsx"
Cohesion: 0.20
Nodes (13): anim(), BuildVignette(), Check(), InnovateVignette(), POINTS, StageColumn(), StageKey, STAGES (+5 more)

### Community 4 - "ProgramSelectorSection.tsx"
Cohesion: 0.09
Nodes (34): ref_framer_motion, CORE_WORLDS, CoreWorld, DiscoverInteractiveWorld(), DiscoverInteractiveWorldProps, DiscoveryReportPage(), DiscoveryReportPageProps, evidenceLabels (+26 more)

### Community 5 - "CoreProgramPage.tsx"
Cohesion: 0.14
Nodes (22): spotlightMove(), CoreProgramPage(), CoreProgramPageProps, CoreLearningMethods(), METHODS, PROFILE, BuildAIScene(), BuildBrainScene() (+14 more)

### Community 6 - "LanguageContext.tsx"
Cohesion: 0.05
Nodes (42): three, BLOCKS, CodeBlocks3D(), CodeBlocks3DProps, drawFace(), DotField3D(), DotField3DProps, drawPlaceholder() (+34 more)

### Community 7 - "utils/seo.ts"
Cohesion: 0.31
Nodes (7): NOINDEX_PREFIXES, SEO_PAGES, SITE_URL, applyPageSeo(), PageSeo, setCanonical(), setMeta()

### Community 8 - "package.json"
Cohesion: 0.09
Nodes (21): name, private, type, version, autoprefixer, bcryptjs, concurrently, cors (+13 more)

### Community 9 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, bcryptjs, concurrently, cors, dotenv, express, @google/genai, jsonwebtoken (+10 more)

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
Cohesion: 0.17
Nodes (16): Chatbot(), localeLabel(), WaGlyph(), WhatsAppButton(), CHATBOT_FALLBACK, CHATBOT_GREETING, ChatbotAction, ChatbotCopy (+8 more)

### Community 14 - "index.js"
Cohesion: 0.11
Nodes (23): ref_crypto, get(), query(), ALLOWED_ORIGINS, ALLOWED_UPLOADS, app, authenticateToken(), cleanPayload() (+15 more)

### Community 15 - "check-i18n.mjs"
Cohesion: 0.11
Nodes (22): ref_node_child_process, ref_node_fs, ref_node_path, ref_node_process, ref_node_readline, ref_node_url, dicts, keysIn() (+14 more)

### Community 16 - "generate_placeholders.cjs"
Cohesion: 0.17
Nodes (4): files, fs, path, targetDir

### Community 17 - "devDependencies"
Cohesion: 0.18
Nodes (11): devDependencies, autoprefixer, esbuild, gh-pages, tailwindcss, tsx, @types/express, @types/node (+3 more)

### Community 18 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, check:i18n, clean, deploy, dev, dev:backend, dev:frontend (+5 more)

### Community 19 - "db.js"
Cohesion: 0.27
Nodes (8): sqlite3, ref_url, db, dbPath, __dirname, __filename, run(), seed()

### Community 20 - "audit.cjs"
Cohesion: 0.29
Nodes (6): ref_fs, files, fs, path, results, walk()

### Community 21 - "extract_blog_images.cjs"
Cohesion: 0.40
Nodes (5): ref_https, fetchImage(), https, run(), urls

### Community 22 - "AboutPage.tsx"
Cohesion: 0.33
Nodes (6): AboutPage(), AboutPageProps, Eyebrow(), PILLARS, PRODUCTS, STAGES

### Community 23 - "IllustratedHero.tsx"
Cohesion: 0.06
Nodes (68): IndonesiaMap(), JavaCard(), LABEL_OFFSET, OPEN_REGIONS, pctX(), pctY(), PHOTO_SLOTS, PHOTOS (+60 more)

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

### Community 34 - "AILiteracyPopup.tsx"
Cohesion: 0.24
Nodes (10): AILiteracySlide(), AILiteracySlideProps, TAGS, OpeningPopup(), OpeningPopupProps, Slide, PromoSlide(), PromoSlideProps (+2 more)

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

### Community 45 - "GalleryPage.tsx"
Cohesion: 0.16
Nodes (15): EXPECT, Eyebrow(), Filter, GalleryPage(), GalleryPageProps, Lightbox(), LightboxProps, PhotoCard() (+7 more)

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

### Community 50 - "FreeTrialModal.tsx"
Cohesion: 0.07
Nodes (48): ageFromBirthDate(), Field(), FreeTrialModal(), FreeTrialModalProps, inputClass(), PanelTexture(), WaveEdge(), BRANCH_OPTIONS (+40 more)

### Community 51 - "SpiIcon.tsx"
Cohesion: 0.17
Nodes (11): HeroBadge, HeroHighlight, PartnershipHub2D(), PartnershipHub2DProps, PartnershipNode, POSITIONS, GLYPHS, SpiIconName (+3 more)

### Community 52 - "EventsPage.tsx"
Cohesion: 0.32
Nodes (11): BLOCKS, BlockStack2D(), BlockStack2DProps, dayStart(), EventCard(), EventsPage(), EventsPageProps, FeaturedEvent() (+3 more)

### Community 53 - "react"
Cohesion: 0.22
Nodes (14): react, AchievementsManager(), AdminAuth(), AdminAuthProps, BlogManager(), DashboardOverview(), EventsManager(), FormField (+6 more)

### Community 54 - "SpiArticlePage.tsx"
Cohesion: 0.36
Nodes (6): SpiArticlePage(), SpiArticlePageProps, ArticleSection, getArticle(), SPI_ARTICLES, SpiArticle

### Community 55 - "ProjectsPage.tsx"
Cohesion: 0.05
Nodes (57): Accordion(), AccordionProps, initials(), PortfolioShowcase(), PortfolioShowcaseProps, prefersManualPlayback(), sendPlayerCommand(), YouTubeEmbed() (+49 more)

### Community 56 - "IllustratedHero"
Cohesion: 0.23
Nodes (12): AnimatedGridPattern(), AnimatedGridPatternProps, seeded(), IllustratedHero(), BlogPage(), BlogPageProps, ListItem, MEDIA_ARTICLES (+4 more)

### Community 57 - "AILiteracyJoinSection.tsx"
Cohesion: 0.28
Nodes (7): AILiteracyArt(), AILiteracyArtProps, HIDDEN, INPUTS, AILiteracyJoinSection(), AILiteracyJoinSectionProps, PILLARS

### Community 58 - "SpiIcon"
Cohesion: 0.20
Nodes (13): CTASection(), SpiIcon(), CareerPage(), JournalPage(), JournalPageProps, OWN_STEPS, PaperIllustration(), GlobalCodingSection() (+5 more)

### Community 59 - "motion"
Cohesion: 0.07
Nodes (52): motion, COLORS, Confetti(), composeLinks(), EmailApplyDialog(), EmailApplyDialogProps, Option, AINetwork3D() (+44 more)

### Community 60 - "MentorSection.tsx"
Cohesion: 0.50
Nodes (3): MentorSection(), MentorProfile, MENTORS_DATA

### Community 61 - "PartnershipPage.tsx"
Cohesion: 0.21
Nodes (14): SpotlightLayer(), useSpotlight(), ENG_AUDIENCES, EngineeringProgramPage(), EngineeringProgramPageProps, LearningPathData, PathCard(), Eyebrow() (+6 more)

### Community 62 - "assets.ts"
Cohesion: 0.13
Nodes (14): AchievementPage(), AchievementPageProps, content, InSchoolProgramPage(), InSchoolProgramPageProps, PHOTO_PROTECT, ALUMNI_UNIVERSITIES, HomepagePartnerLogosSection() (+6 more)

### Community 63 - "Pendaftaran Gerakan AI Literacy Indonesia: panduan deploy"
Cohesion: 0.20
Nodes (9): 1. Pasang script, 2. Deploy sebagai Web App, 3. Hubungkan website, 4. Pengaturan admin (Script properties), Aturan yang ditegakkan di server, Pendaftaran Gerakan AI Literacy Indonesia: panduan deploy, Uji sebelum dibuka untuk publik, Yang belum bisa diverifikasi dari sisi website (+1 more)

### Community 64 - "ASSETS"
Cohesion: 0.13
Nodes (18): ImageWithFallback(), ImageWithFallbackProps, resolveSrc(), CTASectionProps, ExperienceSection(), ExperienceSectionProps, STEPS, AssetViewerModal() (+10 more)

### Community 66 - "theme.tsx"
Cohesion: 0.20
Nodes (7): react-dom, App(), src_index, Theme, ThemeContext, ThemeContextType, ThemeProvider()

### Community 67 - "AILiteracyPage.tsx"
Cohesion: 0.09
Nodes (24): AILiteracyPage(), AILiteracyPageProps, CHECKLIST, CMP_ROWS, COMPETENCIES, daysUntilKickoff(), EVIDENCE, Eyebrow() (+16 more)

### Community 69 - "LearningJourneyPage.tsx"
Cohesion: 0.38
Nodes (5): LearningJourneyPage, LearningJourneySection, LearningJourneySection(), LearningJourneyPage(), LearningJourneyPageProps

### Community 70 - "useLanguage"
Cohesion: 0.13
Nodes (20): lucide-react, FeaturedStory, FeaturedStoryCarousel(), FeaturedStoryCarouselProps, IndonesiaMap(), IndonesiaMapProps, Footer(), FooterProps (+12 more)

### Community 72 - "ClassSelectionSection.tsx"
Cohesion: 0.40
Nodes (4): ClassSelectionSection(), ClassSelectionSectionProps, CLASSES_DATA, ClassItem

### Community 74 - "TestimonialsSection.tsx"
Cohesion: 0.33
Nodes (7): STUDENTS, TEACHERS, TestimonialsSection(), STUDENT_TESTIMONIALS, TEACHER_TESTIMONIALS, StudentTestimonial, TeacherTestimonial

### Community 75 - "14. Konten dan Editorial Governance"
Cohesion: 0.50
Nodes (4): 14.1 Standar konten, 14.2 Hal yang tidak boleh tampil pada website publik, 14.3 Pengelolaan pembaruan, 14. Konten dan Editorial Governance

### Community 76 - "7. Transparansi Harga, Silabus, dan Free Trial"
Cohesion: 0.50
Nodes (4): 7.1 Transparansi biaya, 7.2 Silabus ringkas, 7.3 Free Trial, 7. Transparansi Harga, Silabus, dan Free Trial

### Community 77 - "Navbar.tsx"
Cohesion: 0.12
Nodes (23): CorporateTrainingPage, LabBanner(), ProgramBanner(), MegaFeature, MegaMenu, MegaPanel, Navbar(), NavbarProps (+15 more)

### Community 82 - "Kontrak API Class Registration → SPI_API"
Cohesion: 0.40
Nodes (4): Body, Contoh, Field backend yang tidak ditampilkan, Kontrak API Class Registration → SPI_API

### Community 84 - "ref_path"
Cohesion: 0.53
Nodes (4): ref_path, @tailwindcss/vite, vite, @vitejs/plugin-react

## Knowledge Gaps
- **497 isolated node(s):** `name`, `private`, `version`, `type`, `go-live` (+492 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 562 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `App.tsx`, `LabProgramPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `CoreProgramPage.tsx`, `LanguageContext.tsx`, `package.json`, `Chatbot.tsx`, `AboutPage.tsx`, `IllustratedHero.tsx`, `AILiteracyPopup.tsx`, `GalleryPage.tsx`, `FreeTrialModal.tsx`, `SpiIcon.tsx`, `EventsPage.tsx`, `SpiArticlePage.tsx`, `ProjectsPage.tsx`, `IllustratedHero`, `AILiteracyJoinSection.tsx`, `SpiIcon`, `motion`, `MentorSection.tsx`, `PartnershipPage.tsx`, `assets.ts`, `ASSETS`, `theme.tsx`, `AILiteracyPage.tsx`, `LearningJourneyPage.tsx`, `useLanguage`, `StatisticSection.tsx`, `ClassSelectionSection.tsx`, `TestimonialsSection.tsx`, `Navbar.tsx`, `LazyMount.tsx`?**
  _High betweenness centrality (0.189) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `useLanguage` to `App.tsx`, `LabProgramPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `CoreProgramPage.tsx`, `LanguageContext.tsx`, `package.json`, `Chatbot.tsx`, `AboutPage.tsx`, `IllustratedHero.tsx`, `AILiteracyPopup.tsx`, `GalleryPage.tsx`, `FreeTrialModal.tsx`, `SpiIcon.tsx`, `EventsPage.tsx`, `react`, `SpiArticlePage.tsx`, `ProjectsPage.tsx`, `IllustratedHero`, `AILiteracyJoinSection.tsx`, `SpiIcon`, `motion`, `PartnershipPage.tsx`, `assets.ts`, `ASSETS`, `AILiteracyPage.tsx`, `LearningJourneyPage.tsx`, `StatisticSection.tsx`, `ClassSelectionSection.tsx`, `TestimonialsSection.tsx`, `Navbar.tsx`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `useLanguage()` connect `useLanguage` to `App.tsx`, `LabProgramPage.tsx`, `WhySPISection.tsx`, `ProgramSelectorSection.tsx`, `CoreProgramPage.tsx`, `LanguageContext.tsx`, `Chatbot.tsx`, `AboutPage.tsx`, `IllustratedHero.tsx`, `AILiteracyPopup.tsx`, `GalleryPage.tsx`, `FreeTrialModal.tsx`, `SpiIcon.tsx`, `EventsPage.tsx`, `SpiArticlePage.tsx`, `ProjectsPage.tsx`, `IllustratedHero`, `AILiteracyJoinSection.tsx`, `SpiIcon`, `motion`, `MentorSection.tsx`, `PartnershipPage.tsx`, `assets.ts`, `ASSETS`, `AILiteracyPage.tsx`, `ClassSelectionSection.tsx`, `TestimonialsSection.tsx`, `Navbar.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _497 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `gallery_pipeline.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06533776301218161 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07541478129713423 - nodes in this community are weakly interconnected._
- **Should `ProgramSelectorSection.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08534850640113797 - nodes in this community are weakly interconnected._