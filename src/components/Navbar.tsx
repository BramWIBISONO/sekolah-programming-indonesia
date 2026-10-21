import React, { useEffect, useRef, useState } from 'react';
import { ASSETS, asset } from '../constants/assets';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, Check } from 'lucide-react';
import { useLanguage, Language } from '../i18n';
import { useTheme } from '../utils/theme';
import { SpiIcon, type SpiIconName } from './illustrations/SpiIcon';
import { LabBanner } from './lab/LabBanner';
import { LAB_CATEGORIES, setPendingLabArea, type LabCategoryKey } from '../data/labCategories';
import { CORPORATE_OVERVIEW_PATH, CORPORATE_TRACKS, isCorporatePath } from '../data/corporateTraining';
import { CURRICULUM, type CurriculumProduct } from '../data/curriculum';
import { ProgramBanner } from './lab/ProgramBanner';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenTrial: () => void;
  onOpenRegistration?: () => void;
}

interface SubLink {
  label: string;
  path: string;
  desc?: string;
}

interface MegaItem {
  label: string;
  path: string;
  desc: string;
  icon: SpiIconName;
}

interface MegaFeature {
  title: string;
  desc: string;
  path: string;
  kind: LabCategoryKey;
  /** Title printed on the banner (product names stay in English). */
  banner: string;
  bannerLabel: string;
  badge?: string;
}

/** Right-hand panel for a programme: a wide banner, a short line, and its materials from CURRICULUM. */
interface MegaPanel {
  product: Exclude<CurriculumProduct, 'lab'>;
  title: string;
  label: string;
  desc: string;
}

/** Full-width menu: a list on the left, featured programmes with banners on the right. */
interface MegaMenu {
  leftTitle: string;
  items: MegaItem[];
  rightTitle: string;
  features: MegaFeature[];
  /** Panel shown for a hovered item (keyed by item path). Items without one show `features`. */
  panels?: Record<string, MegaPanel>;
}

interface NavLink {
  key: string;
  label: string;
  path?: string;
  /** Paths that mark this item as active. */
  match?: (path: string) => boolean;
  children?: SubLink[];
  mega?: MegaMenu;
  action?: 'register';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenTrial,
  onOpenRegistration
}) => {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Which desktop dropdown (nav menu key or 'lang') is open. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /** Programme hovered or focused inside a mega menu; drives the right-hand panel. */
  const [megaHover, setMegaHover] = useState<{ menu: string; path: string } | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navItems: NavLink[] = [
    { key: 'home', label: t('nav.home'), path: '/', match: (p) => p === '/' },
    { key: 'discover', label: t('nav.discover'), path: '/discover', match: (p) => p.startsWith('/discover') },
    {
      key: 'program',
      label: t('nav.program'),
      match: (p) => p.startsWith('/program'),
      children: [
        { label: t('prog.core.short'), path: '/program/spi-core', desc: t('prog.core.menu') },
        { label: t('prog.lab.short'), path: '/program/spi-lab', desc: t('prog.lab.menu') },
        { label: t('prog.engineering.short'), path: '/program/spi-engineering', desc: t('prog.engineering.menu') },
        { label: t('prog.inschool.short'), path: '/program/spi-inschool', desc: t('prog.inschool.menu') },
      ],
      mega: {
        leftTitle: t('mega.programs'),
        items: (['core', 'lab', 'engineering', 'inschool'] as const).map((k) => ({
          label: t(`prog.${k}.short`),
          path: `/program/spi-${k}`,
          desc: t(`prog.${k}.menu`),
          icon: k,
        })),
        panels: {
          '/program/spi-core': { product: 'core', title: t('prog.core.short'), label: t('mega.programs'), desc: t('prog.core.menu') },
          '/program/spi-engineering': { product: 'engineering', title: t('prog.engineering.short'), label: t('mega.programs'), desc: t('prog.engineering.menu') },
          '/program/spi-inschool': { product: 'inschool', title: t('prog.inschool.short'), label: t('mega.programs'), desc: t('prog.inschool.menu') },
        },
        rightTitle: t('mega.lab'),
        features: LAB_CATEGORIES.map((c, i) => ({
          title: t(`lab.cat.${c.key}.full`),
          desc: t(`lab.cat.${c.key}.summary`),
          path: c.path,
          kind: c.key,
          banner: t(`lab.cat.${c.key}.full`),
          bannerLabel: 'SPI Lab',
          badge: i === 0 ? t('mega.new') : undefined,
        })),
      },
    },
    { key: 'projects', label: t('nav.projects'), path: '/projects', match: (p) => p === '/projects' },
    {
      key: 'about',
      label: t('nav.about'),
      match: (p) => p === '/about' || p === '/career',
      children: [
        { label: t('nav.about_spi'), path: '/about' },
        { label: t('nav.career'), path: '/career' },
      ],
    },
    {
      key: 'partnership',
      label: t('nav.partnership'),
      match: (p) => p === '/partnership' || p === '/csr' || isCorporatePath(p),
      children: [
        { label: 'Corporate Training', path: CORPORATE_OVERVIEW_PATH, desc: t('mega.corp.desc') },
        ...CORPORATE_TRACKS.map((c) => ({ label: c.name, path: c.path })),
        { label: t('nav.partnership'), path: '/partnership', desc: t('mega.partner.desc') },
        { label: t('csr.nav'), path: '/csr', desc: t('csr.menu_desc') },
      ],
      mega: {
        leftTitle: t('mega.solutions'),
        items: [
          { label: 'Corporate Training', path: CORPORATE_OVERVIEW_PATH, desc: t('mega.corp.desc'), icon: 'briefcase' },
          { label: t('nav.partnership'), path: '/partnership', desc: t('mega.partner.desc'), icon: 'community' },
          { label: t('csr.nav'), path: '/csr', desc: t('csr.menu_desc'), icon: 'projects' },
        ],
        rightTitle: t('mega.corp_top'),
        features: CORPORATE_TRACKS.map((c) => ({
          title: c.name,
          desc: t(`corp.${c.key}.desc`),
          path: c.path,
          kind: c.lab,
          banner: c.name,
          bannerLabel: 'SPI Lab for Business',
        })),
      },
    },
    {
      key: 'insights',
      label: t('nav.insights'),
      match: (p) => ['/achievement', '/blog', '/journal', '/gerakan-ai-literacy', '/galeri', '/acara'].includes(p) || p.startsWith('/artikel'),
      children: [
        { label: t('nav.achievement'), path: '/achievement' },
        { label: t('nav.blog'), path: '/blog' },
        { label: t('nav.journal'), path: '/journal' },
        { label: t('ail.nav'), path: '/gerakan-ai-literacy', desc: t('ail.hero.lead') },
        { label: t('gallery.nav'), path: '/galeri', desc: t('gallery.menu_desc') },
        { label: t('acara.nav'), path: '/acara', desc: t('acara.menu_desc') },
      ],
    },
    { key: 'register', label: t('nav.register'), action: 'register' },
  ];

  const languages: { code: Language; displayCode: string; flag: string; label: string }[] = [
    { code: 'id', displayCode: 'ID', flag: asset('assets/ui/flags/indonesia.svg'), label: 'Bahasa Indonesia' },
    { code: 'en', displayCode: 'EN', flag: asset('assets/ui/flags/united-kingdom.svg'), label: 'English' },
    { code: 'zh', displayCode: 'CN', flag: asset('assets/ui/flags/china.svg'), label: '简体中文' },
    { code: 'ms', displayCode: 'MS', flag: asset('assets/ui/flags/malaysia.svg'), label: 'Bahasa Melayu' },
  ];
  const activeLanguage = languages.find((l) => l.code === lang) ?? languages[0];

  // Close open menus on Escape (returning focus to the trigger) or on a click outside the header.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (headerRef.current?.contains(document.activeElement)) {
        document.getElementById(`nav-trigger-${openMenu}`)?.focus();
      }
      setOpenMenu(null);
    };
    const onPointer = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [openMenu]);

  const closeTimer = useRef<number | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = (key: string) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu((m) => (m === key ? null : m)), 160);
  };
  useEffect(() => cancelClose, []);

  const go = (path: string) => {
    cancelClose();
    setPendingLabArea(null);
    onNavigate(path);
    setMobileMenuOpen(false);
    setOpenMenu(null);
  };

  const handleItem = (item: NavLink) => {
    if (item.action === 'register') {
      (onOpenRegistration ?? onOpenTrial)();
      setMobileMenuOpen(false);
      setOpenMenu(null);
    } else if (item.path) {
      go(item.path);
    }
  };

  /** Arrow-key movement inside an open desktop dropdown. */
  const menuButtons = (key: string) =>
    Array.from(document.querySelectorAll<HTMLButtonElement>(`#nav-menu-${key} button`));

  const onTriggerKeyDown = (key: string) => (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    setOpenMenu(key);
    requestAnimationFrame(() => menuButtons(key)[0]?.focus());
  };

  const onMenuKeyDown = (key: string) => (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = menuButtons(key);
    const at = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === 'ArrowDown' ? (at + 1) % items.length : (at - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  const linkClass = (active: boolean) =>
    `relative py-2 text-[13.5px] 2xl:text-[14px] whitespace-nowrap transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2 ${
      active ? 'text-[#1870FF] font-semibold' : 'text-[#102A56] dark:text-slate-200 font-medium hover:text-[#1870FF]'
    }`;

  const ActiveBar = () => (
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#1870FF] rounded-t-full" aria-hidden="true" />
  );

  return (
    <header
      ref={headerRef}
      id="main-navbar"
      className="sticky top-0 z-50 bg-white/95 dark:bg-[#070D18]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_rgba(4,26,90,0.06)] transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-[72px]">

          {/* Official Brand Logo */}
          <div className="flex items-center shrink-0">
            <button
              id="navbar-brand-logo"
              onClick={() => go('/')}
              aria-label={t('nav.home')}
              className="flex items-center shrink-0 mr-4 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-4 transition-opacity hover:opacity-90 cursor-pointer"
            >
              <img
                src={ASSETS.brand.logoHeader}
                alt="Sekolah Programming Indonesia"
                className="h-9 sm:h-10 2xl:h-11 w-auto object-contain dark:bg-white dark:rounded-lg dark:px-1.5 dark:py-0.5"
                width="167"
                height="48"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden min-[1240px]:flex items-center justify-center gap-3 2xl:gap-5 flex-1 min-w-0 px-2" aria-label={t('nav.main')}>
            {navItems.map((item) => {
              const active = item.match ? item.match(currentPath) : false;

              if (item.children) {
                const isOpen = openMenu === item.key;
                const menuId = `nav-menu-${item.key}`;
                // Hovered item, else the current page's programme, else the first one.
                const megaPath = megaHover?.menu === item.key
                  ? megaHover.path
                  : item.mega?.items.find((m) => currentPath.startsWith(m.path))?.path ?? item.mega?.items[0]?.path;
                const activePanel = megaPath ? item.mega?.panels?.[megaPath] : undefined;
                return (
                  <div
                    key={item.key}
                    className="relative"
                    // Hover opens menus for mouse users only; touch relies on the click toggle below.
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') { cancelClose(); setOpenMenu(item.key); } }}
                    onPointerLeave={(e) => { if (e.pointerType === 'mouse') scheduleClose(item.key); }}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu((m) => (m === item.key ? null : m));
                    }}
                  >
                    <button
                      id={`nav-trigger-${item.key}`}
                      type="button"
                      onKeyDown={onTriggerKeyDown(item.key)}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => setOpenMenu(isOpen ? null : item.key)}
                      className={`${linkClass(active)} flex items-center gap-1`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                      {active && <ActiveBar />}
                    </button>

                    {isOpen && item.mega && (
                      <div id={menuId} onKeyDown={onMenuKeyDown(item.key)} className="fixed inset-x-0 top-[72px] z-50 spi-anim-mega">
                        <div className="bg-[#F9FBFE] dark:bg-[#0B1220] border-y border-slate-100 dark:border-slate-800 shadow-[0_40px_70px_-40px_rgba(4,26,90,0.45)]">
                          <div className="max-w-[1440px] mx-auto px-8 py-8 grid grid-cols-12 gap-10 max-h-[calc(100vh-72px)] overflow-y-auto">
                            <div className="col-span-5">
                              <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-4">{item.mega.leftTitle}</p>
                              <ul className="space-y-1.5">
                                {item.mega.items.map((m) => {
                                  const current = currentPath === m.path;
                                  return (
                                    <li key={m.path}>
                                      <button
                                        type="button"
                                        onClick={() => go(m.path)}
                                        onPointerEnter={() => setMegaHover({ menu: item.key, path: m.path })}
                                        onFocus={() => setMegaHover({ menu: item.key, path: m.path })}
                                        aria-current={current ? 'page' : undefined}
                                        className={`group w-full text-left flex items-start gap-4 rounded-2xl p-3.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] ${
                                          current ? 'bg-[#EEF4FF] dark:bg-white/10' : 'hover:bg-[#EEF4FF] dark:hover:bg-white/5'
                                        }`}
                                      >
                                        <span className="w-11 h-11 shrink-0 rounded-xl bg-white dark:bg-white/10 border border-[#E3ECFA] dark:border-slate-700 flex items-center justify-center">
                                          <SpiIcon name={m.icon} size={30} />
                                        </span>
                                        <span className="min-w-0">
                                          <span className="block text-[15px] font-black text-[#041A5A] dark:text-white group-hover:text-[#1870FF]">{m.label}</span>
                                          <span className="block text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{m.desc}</span>
                                        </span>
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="col-span-7">
                              {activePanel && megaPath ? (
                                <div key={megaPath} className="spi-anim-mega">
                                  <ProgramBanner product={activePanel.product} title={activePanel.title} label={activePanel.label} className="rounded-2xl shadow-[0_18px_36px_-20px_rgba(4,26,90,0.6)]" />
                                  <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[#041A5A] dark:text-white">{activePanel.desc}</p>
                                  <p className="mt-5 text-[12px] font-black uppercase tracking-widest text-[#1870FF]">{t('mega.materi')}</p>
                                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                    {CURRICULUM[activePanel.product].items.map((it) => (
                                      <li key={it.name} className="flex items-center gap-3 rounded-xl px-2 py-2">
                                        <span className="w-9 h-9 shrink-0 rounded-lg bg-[#EEF4FF] dark:bg-white/10 flex items-center justify-center">
                                          <SpiIcon name={it.icon} size={22} animate="none" />
                                        </span>
                                        <span className="min-w-0">
                                          {it.stage && <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">{it.stage}</span>}
                                          <span className="block text-[14px] font-bold text-[#041A5A] dark:text-white">
                                            {it.name}
                                            {it.soon && <span className="ml-2 align-middle rounded-full bg-[#FFC928] px-2 py-0.5 text-[10px] font-black text-[#041A5A]">{t('mega.soon')}</span>}
                                          </span>
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                  <button
                                    type="button"
                                    onClick={() => go(CURRICULUM[activePanel.product].link)}
                                    className="mt-5 inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[#1870FF] hover:bg-[#1059D4] text-white text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
                                  >
                                    {t('mega.open')}
                                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <p className="text-[15px] text-slate-500 dark:text-slate-400 mb-4">{item.mega.rightTitle}</p>
                                  <ul className="space-y-4">
                                    {item.mega.features.map((f) => (
                                      <li key={f.path}>
                                        <button
                                          type="button"
                                          onClick={() => go(f.path)}
                                          aria-current={currentPath === f.path ? 'page' : undefined}
                                          className="group w-full text-left grid grid-cols-[220px_minmax(0,1fr)] 2xl:grid-cols-[250px_minmax(0,1fr)] gap-5 items-start rounded-2xl p-2 -m-2 hover:bg-white dark:hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
                                        >
                                          <span className="block overflow-hidden rounded-xl shadow-[0_14px_28px_-18px_rgba(4,26,90,0.6)]">
                                            <LabBanner kind={f.kind} title={f.banner} label={f.bannerLabel} badge={f.badge} className="transition-transform duration-500 group-hover:scale-[1.05]" />
                                          </span>
                                          <span className="pt-1">
                                            <span className="block text-[15px] font-black text-[#041A5A] dark:text-white group-hover:text-[#1870FF]">{f.title}</span>
                                            <span className="block text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1 line-clamp-2">{f.desc}</span>
                                          </span>
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {isOpen && !item.mega && (
                      <div id={menuId} onKeyDown={onMenuKeyDown(item.key)} className={`absolute left-1/2 -translate-x-1/2 top-full pt-1 ${item.children.some((c) => c.desc) ? 'w-72' : 'w-52'} max-w-[calc(100vw-2rem)] z-50`}>
                        <ul className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 p-2 space-y-1">
                          {item.children.map((sub) => (
                            <li key={sub.path}>
                              <button
                                type="button"
                                onClick={() => go(sub.path)}
                                aria-current={currentPath === sub.path ? 'page' : undefined}
                                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] transition-colors group cursor-pointer block"
                              >
                                <span className={`block text-[14px] text-[#102A56] dark:text-slate-100 group-hover:text-[#1870FF] ${sub.desc ? 'font-bold' : 'font-medium'}`}>
                                  {sub.label}
                                </span>
                                {sub.desc && (
                                  <span className="block text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">{sub.desc}</span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleItem(item)}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(active)}
                >
                  <span>{item.label}</span>
                  {active && <ActiveBar />}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language + Theme Toggle + Login + primary CTA (Desktop) */}
          <div className="hidden min-[1240px]:flex items-center gap-2.5 shrink-0">

            {/* Language selector: 🇮🇩 ID / 🇬🇧 EN / 🇨🇳 CN */}
            <div className="relative">
              <button
                id="nav-trigger-lang"
                type="button"
                onKeyDown={onTriggerKeyDown('lang')}
                aria-haspopup="true"
                aria-expanded={openMenu === 'lang'}
                aria-controls="nav-menu-lang"
                aria-label={`${t('nav.language')}: ${activeLanguage.label}`}
                onClick={() => setOpenMenu(openMenu === 'lang' ? null : 'lang')}
                className="h-9 px-2.5 rounded-full inline-flex items-center gap-1.5 border border-[#DCE7F5] dark:border-slate-700 bg-white dark:bg-slate-900 text-[#041A5A] dark:text-slate-100 hover:border-[#1870FF] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              >
                <img src={activeLanguage.flag} alt="" className="w-[18px] h-[14px] object-contain rounded-[3px]" />
                <span className="text-[12px] font-bold tracking-wide">{activeLanguage.displayCode}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openMenu === 'lang' ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {openMenu === 'lang' && (
                <ul id="nav-menu-lang" onKeyDown={onMenuKeyDown('lang')} className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 p-1.5 z-50">
                  {languages.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(l.code);
                          setOpenMenu(null);
                        }}
                        aria-current={lang === l.code ? 'true' : undefined}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] cursor-pointer"
                      >
                        <img src={l.flag} alt="" className="w-[18px] h-[14px] object-contain rounded-[3px]" />
                        <span className="text-[13px] font-bold text-[#041A5A] dark:text-slate-100 w-6">{l.displayCode}</span>
                        <span className="text-[12px] text-slate-500 dark:text-slate-400 flex-1">{l.label}</span>
                        {lang === l.code && <Check className="w-4 h-4 text-[#1870FF]" aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-[#1870FF] flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
              aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>

            {/* Login */}
            <a
              href="https://spidigitalsystem.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-[#1870FF] hover:text-[#1059D4] transition-colors py-1.5 px-2 rounded whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF]"
            >
              {t('nav.login')}
            </a>

            <button
              type="button"
              onClick={onOpenTrial}
              className="h-10 px-4 rounded-xl bg-[#1870FF] hover:bg-[#1059D4] text-white text-[13px] font-bold shadow-sm whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
            >
              {t('cta.free_trial')}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex min-[1240px]:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenTrial();
                setMobileMenuOpen(false);
              }}
              className="h-10 px-3 text-xs font-bold text-white bg-[#1870FF] rounded-xl whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] focus-visible:ring-offset-2"
            >
              {t('cta.free_trial')}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1870FF] cursor-pointer"
              aria-label={mobileMenuOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav-drawer" className="min-[1240px]:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-1 overflow-y-auto max-h-[calc(100vh-4.5rem)] bg-white dark:bg-[#070D18]">
            {/* Language + theme first, so they are easy to find */}
            <div className="pb-3 mb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 px-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="sr-only">{t('nav.language')}</span>
                <div className="flex gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLang(l.code)}
                      aria-label={l.label}
                      aria-current={lang === l.code ? 'true' : undefined}
                      className={`h-10 px-2.5 inline-flex items-center gap-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-[#1870FF] text-white border-[#1870FF]'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <img src={l.flag} alt="" className="w-[18px] h-[14px] object-contain rounded-[3px]" />
                      {l.displayCode}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-300 border border-slate-200 dark:border-slate-700 cursor-pointer"
                aria-label={theme === 'dark' ? t('theme.light') : t('theme.dark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>

            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.key} className="space-y-0.5 pt-1">
                    <p className="px-3 py-2 text-[12px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.children.map((sub) => (
                      <button
                        key={sub.path}
                        type="button"
                        onClick={() => go(sub.path)}
                        aria-current={currentPath === sub.path ? 'page' : undefined}
                        className="w-full text-left px-5 py-2.5 text-[14px] font-medium text-[#102A56] dark:text-slate-200 hover:text-[#1870FF] hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                      >
                        <span className="block">{sub.label}</span>
                        {sub.desc && <span className="block text-[12px] font-normal text-slate-500 dark:text-slate-400">{sub.desc}</span>}
                      </button>
                    ))}
                    {/* the SPI Lab categories from the Program mega menu */}
                    {item.key === 'program' && item.mega && (
                      <>
                        <p className="px-5 pt-2 pb-1 text-[11px] font-bold text-[#1870FF] uppercase tracking-wider">{item.mega.rightTitle}</p>
                        {item.mega.features.map((f) => (
                          <button
                            key={f.path}
                            type="button"
                            onClick={() => go(f.path)}
                            aria-current={currentPath === f.path ? 'page' : undefined}
                            className="w-full text-left px-5 py-2.5 text-[14px] font-medium text-[#102A56] dark:text-slate-200 hover:text-[#1870FF] hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                          >
                            {f.title}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleItem(item)}
                  aria-current={item.match?.(currentPath) ? 'page' : undefined}
                  className="w-full text-left px-3 py-2.5 text-[14px] font-semibold text-[#102A56] dark:text-slate-200 hover:text-[#1870FF] hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer block"
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Login Link */}
            <div className="pt-3 px-3">
              <a
                href="https://spidigitalsystem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 px-4 rounded-xl text-sm font-bold bg-[#1870FF]/10 dark:bg-[#1870FF]/20 text-[#1870FF] hover:bg-[#1870FF] hover:text-white transition-all cursor-pointer"
              >
                {t('nav.login')}
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
