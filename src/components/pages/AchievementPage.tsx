import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Medal, Star, ChevronRight, Award } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

interface AchievementPageProps {
  onBack: () => void;
  onOpenTrial: () => void;
}

export const AchievementPage: React.FC<AchievementPageProps> = ({ onBack, onOpenTrial }) => {
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Achievement | Sekolah Programming Indonesia";
    
    // Add meta description dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover student achievements from Sekolah Programming Indonesia, including international, national, and local competition achievements.');
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Discover student achievements from Sekolah Programming Indonesia, including international, national, and local competition achievements.";
      document.head.appendChild(meta);
    }

    // Fetch dynamic achievements
    fetch('/api/achievements?status=published')
      .then(res => res.json())
      .then(data => setAchievements(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50/50 via-[#DCEBFF]/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/50 via-[#DCEBFF]/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-blue-50 text-[#176DF8] px-4 py-2 rounded-full font-bold text-sm tracking-wide mb-8 border border-blue-100 shadow-sm"
          >
            <Trophy className="w-4 h-4" />
            <span>INTERNATIONAL ACHIEVEMENT</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-[#102A56] tracking-tight leading-tight mb-6"
          >
            From <span className="text-slate-400">#2</span> to <span className="text-[#176DF8]">#1</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#102A56] font-semibold mb-6 max-w-3xl mx-auto"
          >
            Our students keep pushing further.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            From competing on the international stage to reaching the #1 School Rank, our students continue to turn programming and technology skills into real achievements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById('main-story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-[#176DF8] text-white font-bold rounded-2xl hover:bg-[#1059D4] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Explore SPI Programs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenTrial}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#102A56] font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Start the Journey</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Story Section */}
      <section id="main-story" className="py-20 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-6">
              Built to Compete. Trained to Excel.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              In 2025, SPI Jakarta ranked <strong className="text-[#102A56]">#2</strong>. In 2026, SPI Jakarta Barat reached <strong className="text-[#176DF8]">#1</strong>. This progression represents a journey of continuous learning, problem-solving, project development, and achievement on the international stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Achievement Timeline Section (2025 -> 2026) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-4">From Learning to Competing.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              SPI students are encouraged to transform what they learn into real projects, real problem solving, and real achievements.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-0 relative">
            
            {/* Desktop Progression Connector */}
            <div className="hidden lg:block absolute top-1/2 left-[calc(50%-150px)] w-[300px] h-[3px] bg-gradient-to-r from-slate-200 via-[#5BA7FF] to-[#176DF8] -translate-y-1/2 z-0">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                className="h-full bg-[#176DF8] origin-left"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-[#176DF8] rounded-full z-10" />
            </div>

            {/* Mobile Progression Connector */}
            <div className="lg:hidden flex justify-center py-4 relative z-0">
               <div className="w-[3px] h-24 bg-gradient-to-b from-slate-200 via-[#5BA7FF] to-[#176DF8]" />
            </div>

            {/* 2025 Achievement Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:w-[45%] flex flex-col items-center lg:items-end z-10"
            >
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow w-full max-w-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 opacity-50" />
                
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">2025</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">TOTAL SCORE</p>
                    <p className="text-xl font-bold text-[#102A56]">3,363</p>
                  </div>
                </div>

                <div className="text-center lg:text-left mb-6">
                  <p className="text-xs font-bold text-slate-400 tracking-widest mb-2">SCHOOL RANK</p>
                  <h3 className="text-6xl font-extrabold text-[#102A56] mb-4">#2</h3>
                  <h4 className="text-lg font-bold text-[#102A56] mb-2">The 7th ICode International Youth Coding Contest</h4>
                  <p className="text-sm font-semibold text-[#176DF8] mb-4">Regional Final 2025</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    SPI Jakarta achieved 2nd place in the School Rank with a total score of 3,363.
                  </p>
                </div>

                {/* Screenshot Placeholder / Proof Slot */}
                <div className="mt-6 aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  <div className="text-center p-4">
                    <p className="text-xs text-slate-500 font-medium">Ranking Screenshot (2025)</p>
                    <p className="text-[10px] text-slate-400 mt-1">Image slot for user-provided proof</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Spacer for Desktop Line */}
            <div className="hidden lg:block lg:w-[10%]" />

            {/* 2026 Achievement Card - Stronger Emphasis */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-[45%] flex flex-col items-center lg:items-start z-10"
            >
              <div className="bg-white rounded-3xl p-8 border-2 border-[#176DF8]/20 shadow-lg hover:shadow-xl transition-all w-full max-w-lg relative overflow-hidden ring-4 ring-[#DCEBFF]/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#DCEBFF] rounded-bl-full -z-10 opacity-30" />
                <div className="absolute top-4 right-4 text-[#176DF8] opacity-20"><Award className="w-16 h-16" /></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 bg-[#176DF8] text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/20">2026</span>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 tracking-wider mb-1">TOTAL SCORE</p>
                    <p className="text-2xl font-black text-[#176DF8]">1,490</p>
                  </div>
                </div>

                <div className="text-center lg:text-left mb-6">
                  <p className="text-xs font-bold text-[#176DF8] tracking-widest mb-2">SCHOOL RANK</p>
                  <h3 className="text-7xl font-black text-[#176DF8] mb-4 tracking-tighter drop-shadow-sm">#1</h3>
                  <h4 className="text-xl font-bold text-[#102A56] mb-2 leading-snug">2026 World Robot Competition Overseas Championships (Singapore)</h4>
                  <div className="space-y-1 mb-4">
                    <p className="text-sm font-semibold text-[#102A56]">8th International Youth Coding Contest</p>
                    <p className="text-sm font-semibold text-slate-500">Space Exploration Challenge</p>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    SPI Jakarta Barat achieved 1st place in the School Rank with a total score of 1,490.
                  </p>
                </div>

                {/* Screenshot Placeholder / Proof Slot */}
                <div className="mt-6 aspect-video bg-blue-50/50 rounded-xl border border-[#176DF8]/30 overflow-hidden flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/0 transition-colors" />
                  <div className="text-center p-4">
                    <p className="text-xs text-[#176DF8] font-bold">Ranking Screenshot (2026)</p>
                    <p className="text-[10px] text-slate-500 mt-1">Image slot for user-provided proof</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Marketing Section & 5. Proof Section Info */}
      <section className="py-24 bg-[#102A56] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
              More Than Learning.<br />
              <span className="text-[#5BA7FF]">Built for Real Challenges.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
              At SPI, programming is not only about learning how to write code. Students are encouraged to think computationally, build projects, solve problems, and apply their skills to real challenges.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Competition achievements are one reflection of that journey: from learning the fundamentals, to creating, experimenting, solving problems, and ultimately competing on an international stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Proof Text Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#102A56] mb-4">A Track Record of Student Achievement.</h3>
          <p className="text-slate-600">The achievements showcased above represent verifiable School Rank standings from respective international competitions.</p>
        </div>
      </section>

      {/* 6. Additional Achievements (National & Local) */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 font-bold rounded-xl text-xs tracking-wider mb-4">NATIONAL & LOCAL ACHIEVEMENTS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102A56] mb-4">More Achievements</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A growing record of student achievements across national and local competitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                className="bg-white rounded-2xl border border-[#DCEBFF] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                {/* Photo Area */}
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#102A56]/5 group-hover:bg-transparent transition-colors z-10" />
                  {achievement.photo_url ? (
                    <img src={achievement.photo_url} alt={achievement.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 z-0 text-slate-400">
                      <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs font-mono">{achievement.category || 'Achievement'}</p>
                      <p className="text-[10px] mt-1">Image slot</p>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-[#F8FAFC] text-slate-500 rounded-md border border-slate-100">
                      {achievement.year && achievement.year !== 'N/A' ? achievement.year : 'Recent'} {achievement.level ? `• ${achievement.level}` : ''}
                    </span>
                    {achievement.category && (
                      <span className="text-[10px] font-bold px-2 py-1 bg-blue-50 text-[#176DF8] rounded uppercase tracking-wider">
                        {achievement.category}
                      </span>
                    )}
                  </div>
                  
                  {achievement.rank_label && (
                    <h4 className="text-2xl font-black text-[#176DF8] mb-2">{achievement.rank_label}</h4>
                  )}
                  <p className="text-sm font-bold text-[#102A56] leading-snug mb-4 flex-grow">
                    {achievement.heading || achievement.title}
                  </p>
                  {achievement.description && (
                    <p className="text-xs text-slate-500 line-clamp-2">{achievement.description}</p>
                  )}
                  
                </div>
              </motion.div>
            ))}
            {achievements.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 font-semibold">
                Tidak ada data achievement.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. Achievement Summary */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-10 h-10 text-[#5BA7FF] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#102A56] mb-4">
            Every Achievement Has a Journey Behind It.
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            From local competitions to national stages and international challenges, every achievement reflects a student's journey of learning, building, problem-solving, and growth.
          </p>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[#176DF8]/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl border border-blue-50"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102A56] mb-6 tracking-tight">
              What Could Your Child Build Next?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Start with the right learning journey and give your child the opportunity to build skills, create projects, and take on bigger challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  window.location.href = '/program/spi-core';
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#176DF8] text-white font-bold rounded-2xl hover:bg-[#1059D4] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>Explore SPI Programs</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenTrial}
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#102A56] font-bold rounded-2xl hover:bg-slate-50 transition-all border border-slate-200 shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Start the Journey</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
