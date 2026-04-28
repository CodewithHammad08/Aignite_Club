import React from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap, ChevronRight } from '../Icons';
import logo from '../assets/logo.png';

const STATS = [
  { value: '120+', label: 'Members',     icon: Users },
  { value: '25+',  label: 'Events',      icon: Zap },
  { value: '10+',  label: 'Projects',    icon: Code },
  { value: '2025', label: 'Est.',        icon: Sparkles },
];

const DOMAINS = [
  { icon: Brain, title: 'AI & Machine Learning',  desc: 'Deep learning, NLP, computer vision and generative AI research & projects.',     gradient: 'from-blue-600 to-indigo-700',  shadow: 'shadow-blue-600/20' },
  { icon: Globe, title: 'Web Development',         desc: 'Full-stack development with React, Next.js, Node.js, and modern architectures.',  gradient: 'from-cyan-500 to-blue-600',    shadow: 'shadow-cyan-500/20' },
  { icon: Cpu,   title: 'App Development',         desc: 'Native and cross-platform mobile apps with Flutter, React Native, and Swift.',    gradient: 'from-sky-500 to-indigo-600',   shadow: 'shadow-sky-500/20' },
  { icon: Code,  title: 'Open Source & DevOps',    desc: 'Contributing to OSS, building dev tools, CI/CD pipelines, and cloud infra.',      gradient: 'from-teal-500 to-cyan-600',    shadow: 'shadow-teal-500/20' },
];

export default function Home({ go }) {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden scanline">
        
        {/* Ambient orbs */}
        <div className="absolute top-10 left-[10%] w-96 h-96 bg-blue-600/15 rounded-full blur-[130px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }}></div>

        {/* Floating Logo */}
        <div className="animate-float mb-4">
          <div className="relative w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-[0_0_60px_rgba(59,130,246,0.4)]">
            <div className="w-full h-full bg-deep rounded-[calc(2rem-2px)] flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Aignite" className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
            </div>
            {/* Corner sparkle */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] animate-pulse"></div>
          </div>
        </div>

        {/* Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-blue-200/80 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Bharati Vidyapeeth Deemed University
        </div>

        {/* Title */}
        <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.1] mb-6 max-w-5xl"
          style={{ textShadow: '0 4px 40px rgba(59,130,246,0.15)' }}>
          Where <span className="grad-text">Innovation</span><br />
          Meets Intelligence
        </h1>

        <p className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Aignite is the official AI & Technology club — empowering students to build, learn, and innovate through projects, workshops, and hackathons.
        </p>

        {/* CTA Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mb-16">
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base overflow-hidden shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_50px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.03]">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="relative z-10 flex items-center gap-2">Become a Member <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
          </a>
          <button onClick={() => go('about')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass text-white font-bold text-base hover:bg-white/[0.08] transition-all glow-border">
            <Sparkles size={18} className="text-blue-400" /> Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="relative z-10 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-2xl px-6 py-5 text-center hover:bg-blue-500/[0.06] transition-all group glow-border">
              <s.icon size={18} className="mx-auto mb-2 text-blue-400/50 group-hover:text-blue-400 transition-colors" />
              <div className="text-2xl font-black text-white font-display mb-0.5">{s.value}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DOMAINS ─── */}
      <section className="py-28 px-6 relative dot-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">Our Verticals</p>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight mb-4">
              What We <span className="grad-text">Build</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Four core domains driving innovation at Aignite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DOMAINS.map((d, i) => (
              <div key={i} className="group glass rounded-3xl p-8 hover:bg-white/[0.05] transition-all duration-400 hover:-translate-y-1 glow-border cursor-default">
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${d.gradient} flex items-center justify-center shadow-xl ${d.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    <d.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 font-display flex items-center gap-2">
                      {d.title}
                      <ChevronRight size={16} className="text-blue-500/0 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
