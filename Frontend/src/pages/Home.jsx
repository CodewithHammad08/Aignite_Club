import React from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap, ChevronRight } from '../Icons';
import logo from '../assets/logo.png';
import useScrollAnimate from '../hooks/useScrollAnimate';

const STATS = [
  { value: '120+', label: 'Members', icon: Users },
  { value: '25+',  label: 'Events',  icon: Zap },
  { value: '10+',  label: 'Projects',icon: Code },
  { value: '2025', label: 'Est.',    icon: Sparkles },
];

const DOMAINS = [
  { icon: Brain, title: 'AI & Machine Learning',  desc: 'Deep learning, NLP, computer vision and generative AI research & projects.' },
  { icon: Globe, title: 'Web Development',         desc: 'Full-stack development with React, Next.js, Node.js, and modern architectures.' },
  { icon: Cpu,   title: 'App Development',         desc: 'Native and cross-platform mobile apps with Flutter, React Native, and Swift.' },
  { icon: Code,  title: 'Open Source & DevOps',    desc: 'Contributing to OSS, building dev tools, CI/CD pipelines, and cloud infra.' },
];

export default function Home({ go }) {
  const ref = useScrollAnimate();
  return (
    <div ref={ref}>
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden scanline">
        <div className="absolute top-10 left-[10%] w-96 h-96 rounded-full blur-[130px] animate-pulse-glow pointer-events-none" style={{ backgroundColor: 'rgba(153,225,217,0.07)' }}></div>
        <div className="absolute bottom-20 right-[5%] w-80 h-80 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ backgroundColor: 'rgba(112,171,175,0.06)', animationDelay: '2s' }}></div>

        <div className="animate-float mb-4" data-animate="zoom-in">
          <div className="relative w-28 h-28 rounded-[2rem] p-[2px]" style={{ background: 'linear-gradient(135deg, #99E1D9, #70ABAF)', boxShadow: '0 0 60px rgba(153,225,217,0.2)' }}>
            <div className="w-full h-full bg-deep rounded-[calc(2rem-2px)] flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Aignite" className="w-20 h-20 object-contain" style={{ filter: 'drop-shadow(0 0 20px rgba(153,225,217,0.3))' }} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#99E1D9' }}></div>
          </div>
        </div>

        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold mb-8" style={{ color: '#70ABAF' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#99E1D9' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#70ABAF' }}></span>
          </span>
          Bharati Vidyapeeth Deemed University
        </div>

        <h1 data-animate="fade-up" data-delay="200" className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[1.1] mb-6 max-w-5xl" style={{ color: '#F0F7F4' }}>
          Where <span className="grad-text">Innovation</span><br />Meets Intelligence
        </h1>

        <p className="relative z-10 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: '#70ABAF' }}>
          Aignite is the official AI & Technology club — empowering students to build, learn, and innovate through projects, workshops, and hackathons.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-16">
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.03]"
            style={{ backgroundColor: '#99E1D9', color: '#32292F', boxShadow: '0 8px 30px rgba(153,225,217,0.2)' }}>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
            <span className="relative z-10 flex items-center gap-2">Become a Member <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
          </a>
          <button onClick={() => go('about')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass font-bold text-base hover:bg-white/[0.04] transition-all glow-border"
            style={{ color: '#F0F7F4' }}>
            <Sparkles size={18} style={{ color: '#99E1D9' }} /> Learn More
          </button>
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4" data-animate="stagger-up" data-delay="100">
          {STATS.map((s, i) => (
            <div key={i} data-stagger-child className="glass rounded-2xl px-6 py-5 text-center transition-all group glow-border">
              <s.icon size={18} className="mx-auto mb-2 transition-colors" style={{ color: 'rgba(153,225,217,0.35)' }} />
              <div className="text-2xl font-black font-display mb-0.5" style={{ color: '#F0F7F4' }}>{s.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#705D56' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-28 px-6 relative dot-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#70ABAF' }}>Our Verticals</p>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4" style={{ color: '#F0F7F4' }}>
              What We <span className="grad-text">Build</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#705D56' }}>Four core domains driving innovation at Aignite.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOMAINS.map((d, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="group glass rounded-3xl p-8 hover:bg-white/[0.03] transition-all duration-400 hover:-translate-y-1 glow-border cursor-default">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#70ABAF' }}>
                    <d.icon size={24} style={{ color: '#F0F7F4' }} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 font-display flex items-center gap-2" style={{ color: '#F0F7F4' }}>
                      {d.title}
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: '#99E1D9' }} />
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#705D56' }}>{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
