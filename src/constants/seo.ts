/** Canonical address of the live site, without a trailing slash. Used for canonical links, Open Graph URLs and the sitemap. */
export const SITE_URL = 'https://www.sekolahprogrammingindonesia.com';

/** Search snippet per public path: the keys of its title and description in src/i18n/translations/seo.ts. */
export const SEO_PAGES: Record<string, { title: string; desc: string }> = {
  '/': { title: 'seo.home.title', desc: 'seo.home.desc' },
  '/program/spi-core': { title: 'seo.core.title', desc: 'seo.core.desc' },
  '/program/spi-lab': { title: 'seo.lab.title', desc: 'seo.lab.desc' },
  '/program/spi-engineering': { title: 'seo.engineering.title', desc: 'seo.engineering.desc' },
  '/program/spi-inschool': { title: 'seo.inschool.title', desc: 'seo.inschool.desc' },
  '/classes': { title: 'seo.classes.title', desc: 'seo.classes.desc' },
  '/discover': { title: 'seo.discover.title', desc: 'seo.discover.desc' },
  '/discover/report': { title: 'seo.discover_report.title', desc: 'seo.discover_report.desc' },
  '/about': { title: 'seo.about.title', desc: 'seo.about.desc' },
  '/gerakan-ai-literacy': { title: 'seo.ai_literacy.title', desc: 'seo.ai_literacy.desc' },
  '/career': { title: 'seo.career.title', desc: 'seo.career.desc' },
  '/projects': { title: 'seo.projects.title', desc: 'seo.projects.desc' },
  '/learning-journey': { title: 'seo.journey.title', desc: 'seo.journey.desc' },
  '/csr': { title: 'seo.csr.title', desc: 'seo.csr.desc' },
  '/partnership': { title: 'seo.partnership.title', desc: 'seo.partnership.desc' },
  '/blog': { title: 'seo.blog.title', desc: 'seo.blog.desc' },
  '/journal': { title: 'seo.journal.title', desc: 'seo.journal.desc' },
  '/achievement': { title: 'seo.achievement.title', desc: 'seo.achievement.desc' },
  '/acara': { title: 'seo.events.title', desc: 'seo.events.desc' },
  '/acara/workshop-series-2026/daftar': { title: 'seo.acara_daftar.title', desc: 'seo.acara_daftar.desc' },
  '/ai-literacy/daftar': { title: 'seo.ai_literacy_daftar.title', desc: 'seo.ai_literacy_daftar.desc' },
  '/galeri': { title: 'seo.gallery.title', desc: 'seo.gallery.desc' },
};

/** Pages kept out of search results: registration forms, a visitor's personal report and the admin area. */
export const NOINDEX_PREFIXES = ['/ai-literacy/daftar', '/acara/workshop-series-2026/daftar', '/discover/report', '/admin'];
