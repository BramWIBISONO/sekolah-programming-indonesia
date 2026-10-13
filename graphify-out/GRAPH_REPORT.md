# Graph Report - sekolah-programming-indonesia  (2026-10-13)

## Corpus Check
- 122 files · ~4,070,334 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .ini 1)

## Summary
- 564 nodes · 1364 edges · 31 communities (25 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `da7d25d2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- App.tsx
- PartnershipPage.tsx
- CoreProgramPage.tsx
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
- index.js
- check-i18n.mjs
- generate_placeholders.cjs
- devDependencies
- scripts
- db.js
- ref_path
- extract_blog_images.cjs
- FreeTrialModal.tsx
- Kontrak API Form Pendaftaran SPI → Digital System
- scrape.js
- Run and deploy your AI Studio app
- universityData.ts
- monthlyProgram.ts

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 93 edges
2. `react` - 77 edges
3. `lucide-react` - 61 edges
4. `ImageWithFallback()` - 55 edges
5. `AppContent()` - 49 edges
6. `ASSETS` - 34 edges
7. `YouTubeEmbed()` - 18 edges
8. `compilerOptions` - 15 edges
9. `Directory Structure & Naming Convention` - 14 edges
10. `scripts` - 11 edges

## Surprising Connections (you probably didn't know these)
- `generateCrudRoutes()` --calls--> `run()`  [EXTRACTED]
  server/index.js → server/db.js
- `seed()` --calls--> `run()`  [EXTRACTED]
  server/seed.js → server/db.js
- `AppContent()` --calls--> `Chatbot()`  [EXTRACTED]
  src/App.tsx → src/components/common/Chatbot.tsx
- `AppContent()` --calls--> `PartnershipSection()`  [EXTRACTED]
  src/App.tsx → src/components/sections/PartnershipSection.tsx
- `AppContent()` --calls--> `ProgramSelectorSection()`  [EXTRACTED]
  src/App.tsx → src/components/sections/ProgramSelectorSection.tsx

## Import Cycles
- None detected.

## Communities (31 total, 6 thin omitted)

### Community 0 - "react"
Cohesion: 0.07
Nodes (48): lucide-react, motion, react, AdminAuthProps, ImageWithFallback(), ImageWithFallbackProps, resolveSrc(), IndonesiaMapProps (+40 more)

### Community 1 - "App.tsx"
Cohesion: 0.06
Nodes (63): react-dom, AboutPage, AchievementPage, AdminPage, App(), AppContent(), BlogPage, CoreProgramPage (+55 more)

### Community 2 - "PartnershipPage.tsx"
Cohesion: 0.14
Nodes (15): OPEN_REGIONS, PartnershipNetwork(), PartnershipNetworkProps, SPI_LOCATIONS, PARTNER_MODELS, PartnershipPage(), PartnershipPageProps, BENEFITS (+7 more)

### Community 3 - "CoreProgramPage.tsx"
Cohesion: 0.10
Nodes (28): prefersManualPlayback(), sendPlayerCommand(), YouTubeEmbed(), YouTubeEmbedProps, ProjectVideoModal(), ProjectVideoModalProps, CoreProgramPage(), CoreProgramPageProps (+20 more)

### Community 4 - "ProgramSelectorSection.tsx"
Cohesion: 0.09
Nodes (34): ref_framer_motion, CORE_WORLDS, CoreWorld, DiscoverInteractiveWorld(), DiscoverInteractiveWorldProps, DiscoveryReportPage(), DiscoveryReportPageProps, evidenceLabels (+26 more)

### Community 5 - "types/index.ts"
Cohesion: 0.11
Nodes (22): Accordion(), AccordionProps, SPIInNumbersSection(), STUDENTS, TEACHERS, FAQ_DATA, CORE_CURRICULUM_STAGES, JOURNEY_STEPS (+14 more)

### Community 6 - "LanguageContext.tsx"
Cohesion: 0.13
Nodes (16): HTML_LANG, LanguageContext, LanguageContextType, LanguageProvider(), TranslationDict, TRANSLATIONS, TRI_SOURCES, warnedKeys (+8 more)

### Community 7 - "AdminPage.tsx"
Cohesion: 0.27
Nodes (12): AchievementsManager(), AdminAuth(), BlogManager(), DashboardOverview(), EventsManager(), FormField, GenericManager(), GenericManagerProps (+4 more)

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
Cohesion: 0.21
Nodes (13): Chatbot(), localeLabel(), CHATBOT_FALLBACK, CHATBOT_GREETING, ChatbotAction, ChatbotCopy, ChatbotIntent, containsKeyword() (+5 more)

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

### Community 20 - "ref_path"
Cohesion: 0.19
Nodes (10): ref_fs, ref_path, @tailwindcss/vite, vite, @vitejs/plugin-react, files, fs, path (+2 more)

### Community 21 - "extract_blog_images.cjs"
Cohesion: 0.40
Nodes (5): ref_https, fetchImage(), https, run(), urls

### Community 22 - "FreeTrialModal.tsx"
Cohesion: 0.19
Nodes (19): Field(), FreeTrialModal(), FreeTrialModalProps, Group(), inputClass(), BRANCH_OPTIONS, EMPTY_VALUES, EXPERIENCE_OPTIONS (+11 more)

### Community 23 - "Kontrak API Form Pendaftaran SPI → Digital System"
Cohesion: 0.40
Nodes (4): Body, Contoh, Kontrak API Form Pendaftaran SPI → Digital System, Pertanyaan untuk tim DS

### Community 24 - "scrape.js"
Cohesion: 0.67
Nodes (3): fetchOgImage(), run(), urls

## Knowledge Gaps
- **204 isolated node(s):** `name`, `private`, `version`, `type`, `dev:frontend` (+199 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 229 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `App.tsx`, `PartnershipPage.tsx`, `CoreProgramPage.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `AdminPage.tsx`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`?**
  _High betweenness centrality (0.246) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `react` to `App.tsx`, `PartnershipPage.tsx`, `CoreProgramPage.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `AdminPage.tsx`, `package.json`, `Chatbot.tsx`, `FreeTrialModal.tsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `useLanguage()` connect `App.tsx` to `react`, `PartnershipPage.tsx`, `CoreProgramPage.tsx`, `ProgramSelectorSection.tsx`, `types/index.ts`, `LanguageContext.tsx`, `Chatbot.tsx`, `FreeTrialModal.tsx`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _204 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.07437518819632641 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.060350877192982454 - nodes in this community are weakly interconnected._
- **Should `PartnershipPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13768115942028986 - nodes in this community are weakly interconnected._