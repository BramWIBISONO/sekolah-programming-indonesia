import React from 'react';
import { ASSETS } from '../constants/assets';
import { ArrowRight, Bot, Lightbulb, Camera, Code2, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';

interface HeroSectionProps {
  onOpenTrial: () => void;
  onExplorePrograms: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTrial,
  onExplorePrograms
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#176DF8] via-[#1059D4] to-[#0B3C95] text-white py-14 lg:py-20"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.15] text-white">
                Empowering Imagination <br />
                Inspiring Innovation
              </h1>

              <p className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed max-w-xl pt-1">
                Developing Computational Thinking for the AI-Native Generation.
              </p>
            </div>

            {/* In collaboration with EKASA TECHNOLOGY */}
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-sm text-blue-100 font-medium">
                In collaboration with
              </span>
              <div className="h-8 flex items-center">
                <img
                  src={ASSETS.partnership.ekasa}
                  alt={ASSETS.partnership.ekasa}
                  className="h-7 w-auto object-contain brightness-0 invert opacity-95"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="hero-free-trial-btn"
                onClick={onOpenTrial}
                className="px-8 py-3.5 bg-white text-[#176DF8] hover:bg-blue-50 active:scale-98 font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-explore-program-btn"
                onClick={onExplorePrograms}
                className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-sm sm:text-base rounded-xl border border-white/80 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Explore Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Floating Badges & Panda Mascot */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Student Photo & Composition Container */}
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square flex items-center justify-center">
              
              {/* Background Circular Spotlight */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-sky-400/25 to-white/10 blur-xl pointer-events-none" />

              {/* Main Student Visual */}
              <div className="relative z-10 w-[88%] h-[88%] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                <ImageWithFallback
                  src={ASSETS.homepage.hero}
                  alt={ASSETS.homepage.hero}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge 1: Top-Left (AI Assistant) */}
              <div className="absolute -top-2 left-0 sm:left-2 z-20 bg-white text-slate-800 rounded-xl p-2.5 sm:p-3 shadow-xl border border-slate-100 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#176DF8] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">AI Assistant</p>
                  <p className="text-[10px] text-slate-500">How can I help you today?</p>
                </div>
              </div>

              {/* Floating Badge 2: Middle-Left (Scratch Block) */}
              <div className="absolute top-1/3 -left-4 sm:-left-6 z-20 bg-[#FFAB19] text-white rounded-lg px-3 py-2 shadow-xl text-left font-mono text-[10px] sm:text-xs font-bold leading-tight border border-amber-300 transform -rotate-2">
                <p>when 🚩 clicked</p>
                <p className="text-amber-100 pl-2">repeat</p>
                <p className="text-amber-100 pl-4">think()</p>
                <p className="text-white pl-4">build()</p>
              </div>

              {/* Floating Badge 3: Bottom-Left (AI Idea Generator) */}
              <div className="absolute -bottom-2 left-2 sm:left-4 z-20 bg-white text-slate-800 rounded-xl p-2.5 sm:p-3 shadow-xl border border-slate-100 flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">AI Idea Generator</p>
                  <p className="text-[10px] text-slate-500">Turn ideas into real solutions!</p>
                </div>
              </div>

              {/* Floating Badge 4: Top-Right (Python Code Block) */}
              <div className="absolute -top-3 right-0 sm:right-2 z-20 bg-[#071F4A]/95 backdrop-blur text-white rounded-xl p-2.5 sm:p-3 shadow-xl border border-sky-400/30 text-left font-mono text-[10px] sm:text-xs">
                <div className="flex items-center justify-between space-x-2 pb-1 mb-1 border-b border-slate-700 text-[#60A5FA]">
                  <span className="font-bold">python</span>
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-[#FFAB19]">for <span className="text-white">i</span> in <span className="text-sky-300">range</span>(5):</p>
                <p className="text-emerald-400 pl-3">think()</p>
                <p className="text-emerald-400 pl-3">code()</p>
                <p className="text-emerald-400 pl-3">build()</p>
                <p className="text-sky-300 pl-3">improve()</p>
              </div>

              {/* Floating Badge 5: Middle-Right (Computer Vision) */}
              <div className="absolute top-1/2 -right-4 sm:-right-6 z-20 bg-white text-slate-800 rounded-xl p-2.5 sm:p-3 shadow-xl border border-slate-100 text-left flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Computer Vision</p>
                  <p className="text-[10px] text-slate-500">Object Detection</p>
                </div>
              </div>

              {/* Floating Mascot: Bottom-Right (SPI Robot Panda) */}
              <div className="absolute -bottom-4 -right-3 sm:-right-5 z-30 w-24 h-24 sm:w-28 sm:h-28">
                <img
                  src={ASSETS.brand.pandaMascot}
                  alt={ASSETS.brand.pandaMascot}
                  className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
