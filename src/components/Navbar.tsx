import React, { useEffect, useRef, useState } from 'react';
import { ASSETS, asset } from '../constants/assets';
import { Menu, X, ChevronDown, Sun, Moon, Check } from 'lucide-react';
import { useLanguage, Language } from '../i18n';
import { useTheme } from '../utils/theme';

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

interface NavLink {
  key: string;
  label: string;
  path?: string;
  /** Paths that mark this item as active. */
  match?: (path: string) => boolean;
  children?: SubLink[];
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
    { key: 'partnership', label: t('nav.partnership'), path: '/partnership', match: (p) => p === '/partnership' },
    {
      key: 'insights',
      label: t('nav.insights'),
      match: (p) => ['/achievement', '/blog', '/journal'].includes(p),
      children: [
        { label: t('nav.achievement'), path: '/achievement' },
        { label: t('nav.blog'), path: '/blog' },
        { label: t('nav.journal'), path: '/journal' },
      ],
    },
    { key: 'register', label: t('nav.register'), action: 'register' },
  ];

  const languages: { code: Language; displayCode: string; flag: string; label: string }[] = [
    { code: 'id', displayCode: 'ID', flag: asset('assets/ui/flags/indonesia.svg'), label: 'Bahasa Indonesia' },
    { code: 'en', displayCode: 'EN', flag: asset('assets/ui/flags/united-kingdom.svg'), label: 'English' },
    { code: 'zh', displayCode: 'CN', flag: asset('assets/ui/flags/china.svg'), label: '简体中文' },
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

  const go = (path: string) => {
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
      className="sticky top-0 z-50 bg-white dark:bg-[#070D18] border-b border-slate-100 dark:border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-colors"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 h-20">

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
                className="h-9 sm:h-11 2xl:h-12 w-auto object-contain"
                width="167"
                height="48"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden min-[1360px]:flex items-center justify-center gap-4 2xl:gap-6 flex-1 min-w-0 px-2" aria-label={t('nav.main')}>
            {navItems.map((item) => {
              const active = item.match ? item.match(currentPath) : false;

              if (item.children) {
                const isOpen = openMenu === item.key;
                const menuId = `nav-menu-${item.key}`;
                return (
                  <div
                    key={item.key}
                    className="relative"
                    // Hover opens menus for mouse users only; touch relies on the click toggle below.
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') setOpenMenu(item.key); }}
                    onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOpenMenu((m) => (m === item.key ? null : m)); }}
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

                    {isOpen && (
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
          <div className="hidden min-[1360px]:flex items-center gap-2.5 shrink-0">

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
          <div className="flex min-[1360px]:hidden items-center gap-2">
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
          <div id="mobile-nav-drawer" className="min-[1360px]:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)] bg-white dark:bg-[#070D18]">
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
