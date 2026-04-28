import React from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap } from '../Icons';
import logo from '../assets/logo.png';

const STATS = [
  { value: '120+', label: 'Members' },
  { value: '25+',  label: 'Events Held' },
  { value: '10+',  label: 'Projects' },
  { value: '2025', label: 'Founded' },
];

const DOMAINS = [
  { icon: Brain, title: 'AI & ML',         desc: 'Deep learning, NLP, computer vision and generative AI projects.',   color: 'from-blue-500 to-indigo-600',  glow: 'blue' },
  { icon: Globe, title: 'Web Development',  desc: 'Modern full-stack web apps with React, Next.js, and Node.',        color: 'from-cyan-500 to-blue-600',    glow: 'cyan' },
  { icon: Cpu,   title: 'App Development',  desc: 'Cross-platform mobile experiences with Flutter and React Native.', color: 'from-sky-500 to-blue-600',     glow: 'sky' },
  { icon: Code,  title: 'Open Source',      desc: 'Contributing to and building impactful open-source tools.',        color: 'from-teal-500 to-cyan-600',    glow: 'teal' },
];

export default function Home({ go }) {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        
        {/* Decorative orbs */}
        <div className="absolute top-20 left-[15%] w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-cyan-600/15 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Floating Logo */}
        <div className="animate-float mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-[0_0_50px_rgba(59,130,246,0.5)]">
            <div className="w-full h-full bg-deep rounded-[22px] flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Aignite" className="w-16 h-16 object-contain" />
            </div>
          </div>
        </div>

        {/* University Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-gray-300 mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Bharati Vidyapeeth Deemed University
        </div>

        {/* Title */}
        <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[1.1] mb-6 max-w-5xl">
          Where <span className="grad-text">Innovation</span><br />
          Meets Intelligence
        </h1>

        <p className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Aignite is the official AI & Technology club, empowering students to build, learn, and innovate through hands-on projects, workshops, and hackathons.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.03]">
            Become a Member <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button onClick={() => go('about')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass text-white font-bold text-base hover:bg-white/[0.08] transition-all">
            <Sparkles size={18} className="text-blue-400" /> Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="glass rounded-2xl px-6 py-5 text-center hover:bg-blue-500/[0.06] transition-colors">
              <div className="text-3xl font-black text-white font-display mb-1">{s.value}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHAT WE DO ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight mb-4">
              What We <span className="grad-text">Focus</span> On
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Four core verticals that drive everything we build and teach.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {DOMAINS.map((d, i) => (
              <div key={i} className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute -top-12 -right-12 w-40 h-40 bg-${d.glow}-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${d.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <d.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">{d.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
