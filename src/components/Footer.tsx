import React from 'react';
import { ASSETS } from '../constants/assets';
import { Phone, Mail, Globe, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../i18n';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrial }) => {
  const { t } = useLanguage();

  return (
    <footer id="main-footer" className="bg-[#071F4A] text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-slate-800">
          
          {/* Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-sm">
              <img
                src={ASSETS.brand.logo}
                alt="Sekolah Programming Indonesia"
                className="h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Developing Computational Thinking for the AI-Native Generation.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-1">
              <a
                href="https://www.instagram.com/sekolahprogrammingindonesia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram SPI"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#176DF8] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@sekolahprogrammingindonesia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube SPI"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#176DF8] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@sekolahprogramming.id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok SPI"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#176DF8] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <span className="text-[11px] font-bold">TT</span>
              </a>
              <a
                href="https://sekolahprogrammingindonesia.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website SPI"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#176DF8] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('footer.links')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-core')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.program')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/partnership')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.partnership')}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTrial}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.trial')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about#faq')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Program (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('nav.program')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-core')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  SPI Core
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-lab')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  SPI Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-engineering')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  SPI Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-inschool')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  SPI InSchool
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('footer.support')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <a href="tel:+6281234567890" className="hover:text-white transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <a href="mailto:info@sekolahprogrammingindonesia.com" className="hover:text-white transition-colors truncate">
                  info@sekolahprogrammingindonesia.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                <a href="https://sekolahprogrammingindonesia.com" className="hover:text-white transition-colors">
                  sekolahprogrammingindonesia.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-500">
          <p>{t('footer.copyright')}</p>
        </div>

      </div>
    </footer>
  );
};
