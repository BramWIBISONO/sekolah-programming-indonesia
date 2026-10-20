import React from 'react';
import { ASSETS } from '../constants/assets';
import { Phone, Mail, Globe, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useLanguage } from '../i18n';
import { SPI_CONFIG } from '../constants/config';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrial }) => {
  const { t } = useLanguage();

  return (
    <footer id="main-footer" className="bg-[#1870FF] text-blue-50 pt-10 pb-24 sm:pt-16 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-8 lg:gap-6 pb-8 sm:pb-12 border-b border-white/25">
          
          {/* Brand & Socials (4 cols) */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-sm">
              <img
                src={ASSETS.brand.logoHeader}
                alt="Sekolah Programming Indonesia"
                className="h-10 w-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-1 text-white">
              <a
                href="https://www.instagram.com/sekolahprogrammingindonesia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram SPI"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1870FF] text-white hover:text-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@sekolahprogrammingindonesia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube SPI"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1870FF] text-white hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@sekolahprogramming.id"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok SPI"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1870FF] text-white hover:text-white flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/sekolah-programming-indonesia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn SPI"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1870FF] text-white hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://sekolahprogrammingindonesia.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website SPI"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-[#1870FF] text-white hover:text-white flex items-center justify-center transition-colors"
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
            <ul className="space-y-2 text-xs sm:text-sm text-blue-100">
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
                  onClick={() => onNavigate('/career')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('nav.career')}
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
                  onClick={() => onNavigate('/galeri')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('gallery.nav')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/acara')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('acara.nav')}
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
                  onClick={() => {
                    onNavigate('/');
                    window.setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 350);
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {t('faq.eyebrow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Program (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('nav.program')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-100">
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-core')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  {t('prog.core.short')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-lab')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  {t('prog.lab.short')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-engineering')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  {t('prog.engineering.short')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/program/spi-inschool')}
                  className="hover:text-white transition-colors block text-left cursor-pointer"
                >
                  {t('prog.inschool.short')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('footer.support')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-100">
              <li>
                <a
                  href={`https://wa.me/${SPI_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(SPI_CONFIG.WHATSAPP_PREFILLED_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t('footer.help')}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li className="flex items-start gap-2 min-w-0">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="tel:+6281246906335" className="hover:text-white transition-colors">
                  +62 812-4690-6335
                </a>
              </li>
              <li className="flex items-start gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <a href={`mailto:${SPI_CONFIG.EMAIL}`} className="hover:text-white transition-colors break-all min-w-0">
                  informasi@sekolahprogrammingindonesia.com
                </a>
              </li>
              <li className="flex items-start gap-2 min-w-0">
                <Globe className="w-3.5 h-3.5 text-white shrink-0" />
                <a href="https://sekolahprogrammingindonesia.com" className="hover:text-white transition-colors break-all min-w-0">
                  sekolahprogrammingindonesia.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 sm:pt-8 text-center text-xs text-blue-100/85">
          <p>{t('footer.copyright')}</p>
          <p className="mt-1 font-semibold text-white">{t('footer.imadeo')}</p>
        </div>

      </div>
    </footer>
  );
};
