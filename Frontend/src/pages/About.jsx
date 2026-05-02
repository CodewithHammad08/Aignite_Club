import React from 'react';
import { Brain, Rocket, Target, Sparkles, Users, Trophy, Code, Zap, Star, Globe, ChevronRight } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const TIMELINE = [
  { year: '2025', title: 'Club Founded', desc: 'Aignite was established at Bharati Vidyapeeth with a vision to bridge the gap between academics and real-world technology.' },
  { year: '2025', title: 'First Hackathon', desc: 'Hosted our inaugural 24-hour hackathon with 80+ participants building AI-powered solutions.' },
  { year: '2026', title: 'Growing Strong', desc: 'Expanded to 120+ active members across all branches, with partnerships with industry leaders.' },
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
            Born in 2025 at Bharati Vidyapeeth Deemed University, Aignite is a student-led technology club passionate about AI, software engineering, and building products that matter.
          </p>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="relative px-6 pb-28 bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pt-20">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To create a community where students learn cutting-edge tech through practical, hands-on experience — not just theory.', color: '#3B82F6' },
            { icon: Rocket, title: 'Our Vision', desc: 'To become the most impactful student tech community in India, producing engineers who ship real products.', color: '#22D3EE' },
            { icon: Sparkles, title: 'Our Values', desc: 'Learn by building. Collaborate openly. Ship fearlessly. Mentor generously. Stay curious, always.', color: '#818CF8' },
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
      <section className="relative px-6 py-28 bg-level-0">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-20" data-animate="fade-up">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-offwhite">Our <span className="grad-text">Journey</span></h2>
          </div>
          
          <div className="relative">
            {/* Curvy background SVG line for timeline */}
            <div className="absolute top-0 bottom-0 left-6 md:left-1/2 -translate-x-1/2 w-[100px] opacity-40 hidden md:block" style={{ zIndex: 0 }}>
              <svg width="100" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M50 0 C 90 20, 90 40, 50 50 C 10 60, 10 80, 50 100" fill="none" stroke="url(#curve-grad)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                <defs>
                  <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            {/* Fallback straight line for mobile */}
            <div className="absolute left-6 md:hidden top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-400 to-transparent opacity-40"></div>

            <div className="space-y-16">
              {TIMELINE.map((t, i) => (
                <div key={i} className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} group`}>
                  {/* Glowing Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-deep z-10 transition-all duration-300 group-hover:scale-150 group-hover:bg-white" 
                    style={{ backgroundColor: i % 2 === 0 ? '#3B82F6' : '#22D3EE', boxShadow: `0 0 15px ${i % 2 === 0 ? '#3B82F6' : '#22D3EE'}` }}></div>
                  
                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] depth-card rounded-2xl p-6 relative overflow-hidden transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`} 
                    data-animate="fade-up" data-delay={i * 150}
                    style={{ borderColor: 'rgba(59,130,246,0.08)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at ${i % 2 === 0 ? '100% 50%' : '0% 50%'}, rgba(59,130,246,0.1), transparent 60%)` }}></div>
                    <span className="text-xs font-bold font-mono uppercase tracking-widest relative z-10" style={{ color: i % 2 === 0 ? '#3B82F6' : '#22D3EE' }}>{t.year}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 font-display text-offwhite relative z-10">{t.title}</h3>
                    <p className="text-sm leading-relaxed text-muted relative z-10">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -120; }
        }
      `}</style>
    </div>
  );
}
