import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onOpenRegistration: () => void;
  onOpenTrial?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onOpenRegistration
}) => {
  return (
    <section id="cta-section" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-r from-[#176DF8] to-[#1059D4] text-white px-6 py-8 sm:px-12 sm:py-10 lg:px-14 lg:py-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Background Glow */}
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left: Panda Mascot */}
          <div className="relative z-10 flex items-center shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 -my-4 sm:-my-6">
              <img
                src={ASSETS.brand.pandaMascot}
                alt="SPI Robot Panda Mascot"
                className="w-full h-full object-contain filter drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Center: Text */}
          <div className="relative z-10 text-center md:text-left flex-1 md:px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Ready to Build Your Future?
            </h2>
            <p className="text-base sm:text-xl text-blue-100 font-semibold mt-1">
              Join Our Free Trial Today.
            </p>
          </div>

          {/* Right: Button */}
          <div className="relative z-10 shrink-0">
            <button
              id="cta-register-now-btn"
              onClick={onOpenRegistration}
              className="px-8 py-3.5 bg-white text-[#176DF8] hover:bg-blue-50 active:scale-98 font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
