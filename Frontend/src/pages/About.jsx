import React from 'react';
import { Brain, Rocket, Target, Sparkles, Users, Trophy, Code, Zap, Star, Globe, ChevronRight } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const TIMELINE = [
  { 
    year: '2025', 
    title: 'Club Founded & Inaugural', 
    desc: 'The official launch of Aignite at Bharati Vidyapeeth, establishing a new era of technical excellence and innovation.',
    icon: Star,
    color: '#3B82F6'
  },
  { 
    year: '2026', 
    title: 'Hands-on ML Workshop', 
    desc: 'An intensive session on Machine Learning fundamentals, empowering members with practical AI implementation skills.',
    icon: Brain,
    color: '#22D3EE'
  },
  { 
    year: '2026', 
    title: 'Practical Linux Workshop', 
    desc: 'From Command to Automation: A deep dive into Linux systems, shell scripting, and automation workflows.',
    icon: Code,
    color: '#818CF8'
  },
  { 
    year: '2026', 
    title: 'Tableau Visualization', 
    desc: 'Data Visualization using Tableau: Mastering the art of transforming raw data into high-impact interactive dashboards.',
    icon: Target,
    color: '#F472B6'
  },
];

const REASONS = [
  { icon: Code, label: 'Hands-On Workshops', color: '#3B82F6' },
  { icon: Trophy, label: 'Hackathon Access', color: '#22D3EE' },
  { icon: Users, label: 'Industry Mentors', color: '#818CF8' },
  { icon: Rocket, label: 'Build Real Projects', color: '#34D399' },
  { icon: Target, label: 'Certificates', color: '#F472B6' },
  { icon: Globe, label: 'Speaker Sessions', color: '#FBBF24' },
  { icon: Zap, label: 'Tech Community', color: '#A78BFA' },
  { icon: Brain, label: 'Innovation Culture', color: '#60A5FA' },
];

export default function About() {
  const ref = useScrollAnimate();
  
  return (
    <div ref={ref}>
      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden bg-level-0">
        <div className="absolute inset-0 dot-grid opacity-50"></div>
        {/* Animated background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[150px] rounded-full pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(59,130,246,0.05)' }}></div>
        
        <div className="relative z-10">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold mb-6 depth-card" style={{ color: '#60A5FA' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 8px rgba(34,211,238,0.5)' }}></span>
            About Us
          </div>
          <h1 data-animate="fade-up" data-delay="100" className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 text-offwhite">
            We are <span className="grad-text">Aignite</span>
          </h1>
          <p data-animate="fade-up" data-delay="200" className="text-lg max-w-2xl mx-auto leading-relaxed text-muted">
            Aignite is a student-led AI and technology club at Bharati Vidyapeeth Deemed University, built for students who want to create, innovate, and lead through technology. More than just a coding club, Aignite is a community of builders exploring AI, software development, open source, and real-world problem solving.
          </p>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="relative px-6 pb-28 bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To bridge the gap between classroom learning and industry-level execution through projects, hackathons, mentorship, and collaboration.', color: '#3B82F6' },
            { icon: Rocket, title: 'Our Vision', desc: 'To create an environment where students don’t just learn technology—they build with it, grow through it, and shape the future with it.', color: '#22D3EE' },
            { icon: Sparkles, title: 'Our Values', desc: 'Create, innovate, and lead. We are a community of builders exploring AI, software development, open source, and real-world problem solving.', color: '#818CF8' },
          ].map((c, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 120} className="depth-card rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 100% 0%, ${c.color}10, transparent 60%)` }}></div>
              <div className="icon-box w-14 h-14 mb-6 relative z-10">
                <c.icon size={24} style={{ color: c.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display text-offwhite relative z-10">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted relative z-10">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="relative px-6 py-40 bg-level-0 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        
        {/* Deep ambient glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03]" style={{ background: '#3B82F6' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.03]" style={{ background: '#22D3EE' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-32" data-animate="fade-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-black font-mono tracking-[0.3em] uppercase mb-6 border border-white/5 bg-white/5 text-blue-400">
              <span className="w-1 h-1 rounded-full bg-blue-400 animate-ping"></span>
              History Archive
            </div>
            <h2 className="text-4xl md:text-7xl font-black font-display tracking-tight text-offwhite">Our <span className="grad-text">Journey</span></h2>
            <p className="text-muted mt-6 max-w-xl mx-auto text-lg font-light leading-relaxed">Tracing the evolution of Aignite from a spark of an idea to a thriving hub of innovation.</p>
          </div>

          <div className="relative">
            {/* ── PREMIUM CURVY LINE (Desktop) ── */}
            <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="line-glow-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                    <stop offset="10%" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="90%" stopColor="#3B82F6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                  <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur1" />
                    <feGaussianBlur stdDeviation="1" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background soft glow path */}
                <path
                  d={(() => {
                    const count = TIMELINE.length;
                    const step = 100 / count;
                    let path = `M 50 0`;
                    for (let i = 0; i < count; i++) {
                      const y1 = step * i + step * 0.25;
                      const y2 = step * i + step * 0.75;
                      const yEnd = step * (i + 1);
                      // Move peak to the central gap (43% / 57%) to avoid card overlap
                      const xPeak = i % 2 === 0 ? 43 : 57;
                      path += ` C ${xPeak} ${y1}, ${xPeak} ${y2}, 50 ${yEnd}`;
                    }
                    return path;
                  })()}
                  fill="none"
                  stroke="url(#line-glow-grad)"
                  strokeWidth="2.5"
                  strokeOpacity="0.1"
                  filter="blur(10px)"
                />

                {/* Core animated wire path */}
                <path
                  id="main-path"
                  d={(() => {
                    const count = TIMELINE.length;
                    const step = 100 / count;
                    let path = `M 50 0`;
                    for (let i = 0; i < count; i++) {
                      const y1 = step * i + step * 0.25;
                      const y2 = step * i + step * 0.75;
                      const yEnd = step * (i + 1);
                      const xPeak = i % 2 === 0 ? 43 : 57;
                      path += ` C ${xPeak} ${y1}, ${xPeak} ${y2}, 50 ${yEnd}`;
                    }
                    return path;
                  })()}
                  fill="none"
                  stroke="url(#line-glow-grad)"
                  strokeWidth="0.6"
                  filter="url(#strong-glow)"
                  strokeDasharray="4 6"
                  className="animate-[dash_40s_linear_infinite]"
                />
              </svg>
            </div>

            {/* ── THE LINE (Mobile) ── */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #3B82F6 10%, #22D3EE 90%, transparent)' }}></div>

            {/* ── TIMELINE ITEMS ── */}
            <div className="flex flex-col gap-20 md:gap-28 relative z-10">
              {TIMELINE.map((t, i) => {
                const isEven = i % 2 === 0;
                const accent = t.color;
                const xPeak = isEven ? '43%' : '57%';

                return (
                  <div key={i} data-animate="fade-up" data-delay={i * 150}
                    className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} justify-between group`}>
                    
                    {/* Content Card (Holographic Glass) */}
                    <div className={`w-full md:w-[35%] ${isEven ? 'md:pr-0' : 'md:pl-0'}`}>
                      <div className="depth-card rounded-[2rem] p-7 md:p-8 relative overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-white/5 hover:border-white/10 group/card">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none"
                          style={{ background: `linear-gradient(45deg, transparent 40%, ${accent}05 50%, transparent 60%)`, backgroundSize: '200% 200%' }}></div>
                        
                        {/* Corner glow */}
                        <div className="absolute top-0 right-0 w-24 h-24 blur-[50px] opacity-10 group-hover/card:opacity-20 transition-opacity duration-700"
                          style={{ backgroundColor: accent }}></div>
                        
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-3"
                            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30`, boxShadow: `0 8px 20px ${accent}20` }}>
                            <t.icon size={22} />
                          </div>
                          <div>
                            <div className="text-[9px] font-black font-mono tracking-[0.2em] uppercase opacity-50 mb-0.5" style={{ color: accent }}>{t.year} Phase</div>
                            <h3 className="text-xl md:text-2xl font-bold font-display text-white">{t.title}</h3>
                          </div>
                        </div>

                        <p className="text-sm md:text-base leading-relaxed text-gray-400 font-light relative z-10">{t.desc}</p>
                        
                        {/* Interactive footer line */}
                        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-50 group-hover/card:opacity-100 transition-opacity">
                          <span className="text-[9px] font-bold font-mono tracking-widest text-muted">AIGNITE_LOG_v4.2</span>
                          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accent }}></div>
                        </div>
                      </div>
                    </div>

                    {/* The Enhanced Orb Marker */}
                    <div className="absolute left-5 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center pointer-events-none"
                      style={{ 
                        left: window.innerWidth > 768 ? xPeak : '20px',
                        transform: 'translate(-50%, -50%)' 
                      }}>
                      <div className="relative flex items-center justify-center scale-110 md:scale-125">
                        {/* Volumetric glow */}
                        <div className="absolute inset-0 rounded-full blur-[30px] opacity-40 animate-pulse" style={{ backgroundColor: accent }}></div>
                        
                        {/* Spinning ring */}
                        <div className="absolute -inset-3 border border-dashed rounded-full opacity-20 animate-[spin_10s_linear_infinite]" style={{ borderColor: accent }}></div>
                        
                        {/* The Orb */}
                        <div className="w-8 h-8 rounded-full flex items-center justify-center relative z-20"
                          style={{ 
                            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent), #060910`, 
                            border: `1.5px solid ${accent}`, 
                            boxShadow: `0 0 20px ${accent}60, inset 0 0 10px ${accent}40` 
                          }}>
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}></div>
                        </div>

                        {/* Enhanced Horizontal Connector */}
                        <div className={`hidden md:block absolute h-[2px] w-24 ${isEven ? 'left-10' : 'right-10'} opacity-10 group-hover:opacity-100 transition-all duration-700`}
                          style={{ 
                            background: `linear-gradient(${isEven ? 'to left' : 'to right'}, ${accent}, transparent)`,
                            transform: `scaleX(${isEven ? 1 : 1})`,
                            transformOrigin: isEven ? 'left' : 'right'
                          }}>
                          {/* Traveling pulse on connector */}
                          <div className="absolute inset-0 bg-white/40 blur-[2px] animate-[ping_3s_infinite]" style={{ animationDelay: `${i * 0.5}s` }}></div>
                        </div>
                        
                        {/* Badge */}
                        <div className={`hidden md:block absolute -top-10 whitespace-nowrap px-3 py-1 rounded border border-white/5 bg-black/40 backdrop-blur-sm text-[9px] font-black font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0`} style={{ color: accent }}>
                          System_Marker::{String(i + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[35%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
      `}</style>

      {/* ─── WHY JOIN ─── */}
      <section className="relative px-6 py-28 bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] blur-[120px] rounded-full pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(34,211,238,0.03)' }}></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16" data-animate="fade-up">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-offwhite">Why <span className="grad-text">Join?</span></h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {REASONS.map((r, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 50} 
                className="depth-card rounded-2xl p-6 text-center group cursor-default relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${r.color}15, transparent 60%)` }}></div>
                
                <div className="icon-box w-12 h-12 mx-auto mb-4 bg-level-2 group-hover:bg-level-3 transition-colors border border-gray-800 group-hover:border-transparent">
                  <r.icon size={20} style={{ color: r.color }} />
                </div>
                <div className="text-sm font-bold text-offwhite font-display tracking-wide">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
