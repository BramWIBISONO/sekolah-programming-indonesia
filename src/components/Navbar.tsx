import React, { useState } from 'react';
import { ASSETS } from '../constants/assets';
import { Menu, X, ChevronDown, Check } from 'lucide-react';
import { useLanguage, Language } from '../i18n';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenTrial: () => void;
  onOpenRegistration?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenTrial,
  onOpenRegistration
}) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    {
      name: t('nav.program'),
      path: '/program',
      hasDropdown: true,
      subItems: [
        { name: 'SPI Core', path: '/program/spi-core', desc: 'Scratch, Python, MIT App & Arduino' },
        { name: 'SPI Lab', path: '/program/spi-lab', desc: 'AI Tools, Design, Photoshop & Logic' },
        { name: 'SPI Engineering', path: '/program/spi-engineering', desc: 'Machine Learning, Computer Vision & IoT' },
        { name: 'SPI InSchool', path: '/program/spi-inschool', desc: 'School Partnership & Curriculum Integration' },
      ]
    },
    { name: t('nav.partnership'), path: '/partnership' },
    { name: t('nav.achievement'), path: '/achievement' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.journal'), path: '/journal' },
    { name: t('nav.trial'), path: '/free-trial', isTrialAction: true },
    { name: t('nav.register'), path: '/pendaftaran', isRegisterAction: true },
  ];

  const languages: { code: Language; displayCode: string; flag: string }[] = [
    { code: 'id', displayCode: 'ID', flag: '🇮🇩' },
    { code: 'en', displayCode: 'EN', flag: '🇬🇧' },
    { code: 'zh', displayCode: 'CN', flag: '🇨🇳' },
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isTrialAction) {
      onOpenTrial();
    } else if (item.isRegisterAction) {
      if (onOpenRegistration) {
        onOpenRegistration();
      } else {
        onOpenTrial();
      }
    } else {
      onNavigate(item.path);
    }
    setMobileMenuOpen(false);
    setProgramDropdownOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <div className="flex items-center">
            <button
              id="navbar-brand-logo"
              onClick={() => onNavigate('/')}
              className="flex items-center focus:outline-none transition-transform hover:opacity-95 cursor-pointer"
            >
              <img
                src={ASSETS.LOGO}
                alt="Sekolah Programming Indonesia"
                className="h-10 sm:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center justify-center space-x-6 flex-1 px-8">
            {navItems.map((item, idx) => {
              const isHomeActive = item.name === t('nav.home') && currentPath === '/';
              const isAboutActive = item.name === t('nav.about') && currentPath === '/about';
              const isProgramActive = item.name === t('nav.program') && currentPath.startsWith('/program');
              const isPartnershipActive = item.name === t('nav.partnership') && currentPath === '/partnership';
              const isAchievementActive = item.name === t('nav.achievement') && currentPath === '/achievement';
              const isBlogActive = item.name === t('nav.blog') && currentPath === '/blog';
              const isJournalActive = item.name === t('nav.journal') && currentPath === '/journal';
              const isActive = isHomeActive || isAboutActive || isProgramActive || isPartnershipActive || isAchievementActive || isBlogActive || isJournalActive;

              if (item.hasDropdown) {
                return (
                  <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setProgramDropdownOpen(true)}
                    onMouseLeave={() => setProgramDropdownOpen(false)}
                  >
                    <button
                      id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleNavClick(item)}
                      className={`text-[14px] flex items-center space-x-1 transition-colors relative py-2 cursor-pointer ${
                        isActive
                          ? 'text-[#176DF8] font-semibold'
                          : 'text-[#102A56] font-medium hover:text-[#176DF8]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#176DF8] rounded-t-full" />
                      )}
                    </button>

                    {programDropdownOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 w-64 z-50">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2 space-y-1">
                          {item.subItems?.map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => {
                                onNavigate(sub.path);
                                setProgramDropdownOpen(false);
                              }}
                              className="w-full text-left p-2 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer block"
                            >
                              <p className="text-[14px] font-medium text-[#102A56] group-hover:text-[#176DF8]">
                                {sub.name}
                              </p>
                              <p className="text-[12px] text-slate-500 mt-0.5">
                                {sub.desc}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={idx}
                  id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item)}
                  className={`text-[14px] transition-colors relative py-2 cursor-pointer ${
                    isActive
                      ? 'text-[#176DF8] font-semibold'
                      : 'text-[#102A56] font-medium hover:text-[#176DF8]'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#176DF8] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language + Login (Desktop) */}
          <div className="hidden xl:flex items-center space-x-3">
            
            {/* Compact Language Selector */}
            <div 
              className="relative"
              onMouseEnter={() => setLangDropdownOpen(true)}
              onMouseLeave={() => setLangDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 p-1.5 pr-2 rounded-full border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                aria-label="Select Language"
              >
                <div className="w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                  <span className="text-[14px] leading-none filter drop-shadow-sm -translate-y-[0.5px]">{currentLangObj.flag}</span>
                </div>
                <span className="text-[13px] font-medium text-[#102A56] leading-none">{currentLangObj.displayCode}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full pt-1 w-24 z-50">
                  <div className="bg-white rounded-xl shadow-md border border-slate-100 p-1.5 space-y-0.5">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                          lang === l.code ? 'bg-blue-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                          <span className="text-[14px] leading-none filter drop-shadow-sm -translate-y-[0.5px]">{l.flag}</span>
                        </div>
                        <span className={`text-[13px] font-medium ${lang === l.code ? 'text-[#176DF8]' : 'text-[#102A56]'}`}>{l.displayCode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[1px] h-4 bg-slate-200" />

            {/* Login */}
            <a
              href="https://spidigitalsystem.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-semibold text-[#176DF8] hover:text-[#1059D4] transition-colors py-1.5 px-3 cursor-pointer"
            >
              {t('nav.login')}
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick(navItems.find(i => i.isTrialAction)!)}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#176DF8] rounded-xl cursor-pointer"
            >
              {t('nav.trial')}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-100 space-y-2 overflow-y-auto max-h-[80vh]">
            {navItems.map((item, idx) => {
              if (item.hasDropdown) {
                return (
                  <div key={idx} className="space-y-1">
                    <p className="px-3 py-2 text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.name}
                    </p>
                    {item.subItems?.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => {
                          onNavigate(sub.path);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-5 py-2 text-[14px] font-medium text-[#102A56] hover:text-[#176DF8] hover:bg-blue-50/50 rounded-lg cursor-pointer"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                );
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left px-3 py-2 text-[14px] font-medium text-[#102A56] hover:text-[#176DF8] hover:bg-blue-50/50 rounded-lg cursor-pointer"
                >
                  {item.name}
                </button>
              );
            })}
            
            {/* Mobile Language Selection */}
            <div className="pt-4 mt-2 border-t border-slate-100 px-3 space-y-2">
              <p className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">Language</p>
              <div className="flex gap-2">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer flex-1 justify-center ${
                      lang === l.code ? 'border-[#176DF8] bg-blue-50' : 'border-slate-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                      <span className="text-[14px] leading-none filter drop-shadow-sm -translate-y-[0.5px]">{l.flag}</span>
                    </div>
                    <span className={`text-[13px] font-medium ${lang === l.code ? 'text-[#176DF8]' : 'text-[#102A56]'}`}>
                      {l.displayCode}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                href="https://spidigitalsystem.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 text-[14px] font-bold text-[#176DF8]"
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
