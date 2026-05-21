import React, { useState } from 'react';
import { Github, Linkedin, Users, Code, Calendar, Sparkles, Globe, Cpu } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';
import TechTeam, { TeamCard, EventTeam, PRTeam, DesignTeam, ContentTeam } from '../components/TeamCard';

/* ─── DATA (unchanged) ─── */
const LEADS = [
  {
    id: '01', name: 'Sanskriti Singh', initials: 'SS', role: 'PRESIDENT', nationality: 'INDIAN',
    tagline: 'Leading Aignite to new horizons', photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Management' }, { label: 'STACK', value: 'Strategy' }, { label: 'PROJECTS', value: '12' }],
    linkedin: '#', github: '#',
  },
  {
    id: '02', name: 'Osman Sanjar', initials: 'OS', role: 'VICE PRESIDENT', nationality: 'INDIAN',
    tagline: 'Operations and community leader', photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Operations' }, { label: 'STACK', value: 'Planning' }, { label: 'PROJECTS', value: '10' }],
    linkedin: '#', github: '#',
  },
];

const DEPARTMENTS = [
  { id: 'tech',    label: 'Tech',    icon: Code,     color: '#3B82F6' },
  { id: 'event',   label: 'Events',  icon: Calendar, color: '#22D3EE' },
  { id: 'pr',      label: 'PR',      icon: Globe,    color: '#818CF8' },
  { id: 'design',  label: 'Design',  icon: Sparkles, color: '#F472B6' },
  { id: 'content', label: 'Content', icon: Cpu,      color: '#34D399' },
];

const FACULTY = [
  {
    code: 'VS', title: 'FACULTY COORDINATOR', name: 'Vishwayogita Savalkar', role: 'FACULTY COORDINATOR',
    tagline: 'Empowering students through technical leadership, project coordination, and structured academic mentorship.',
  },
  {
    code: 'SK', title: 'FACULTY COORDINATOR', name: 'Sanam Kazi', role: 'FACULTY COORDINATOR',
    tagline: 'Fostering academic engagement, supporting student development programs, and driving growth in technical research.',
  },
  {
    code: 'SK', title: 'AIML HOD', name: 'Supriya Khaitan', role: 'AIML HOD',
    tagline: 'Leading the department towards innovation, research excellence, and pioneering next-generation machine learning projects.',
  },
];

/* ─── Dept icon floating orbs for hero background ─── */
const HERO_ORBS = [
  { icon: Code,     color: '#3B82F6', top: '18%', left: '8%',   size: 36, delay: '0s',    dur: '6s'  },
  { icon: Calendar, color: '#22D3EE', top: '62%', left: '5%',   size: 28, delay: '1s',    dur: '7s'  },
  { icon: Sparkles, color: '#F472B6', top: '25%', right: '7%',  size: 32, delay: '0.5s',  dur: '8s'  },
  { icon: Globe,    color: '#818CF8', top: '70%', right: '9%',  size: 26, delay: '2s',    dur: '6.5s'},
  { icon: Cpu,      color: '#34D399', top: '45%', left: '3%',   size: 22, delay: '1.5s',  dur: '9s'  },
  { icon: Users,    color: '#FBBF24', top: '50%', right: '4%',  size: 24, delay: '3s',    dur: '7.5s'},
];

export default function Team() {
  const [activeDept, setActiveDept] = useState('tech');
  const ref = useScrollAnimate();
  const activeDeptData = DEPARTMENTS.find(d => d.id === activeDept);

  return (
    <div ref={ref}>

      {/* ══════════════════════════════════════════════
          §1  CINEMATIC HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col justify-center px-5 sm:px-8 pt-24 pb-16 overflow-hidden bg-level-0">

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-20" />
          {/* Main hero glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] opacity-[0.05]"
            style={{ background: 'radial-gradient(ellipse, #3B82F6, #818CF8, #22D3EE)' }} />
          {/* Top-right pink accent */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[120px] opacity-[0.04]" style={{ backgroundColor: '#F472B6' }} />
          {/* Bottom-left green accent */}
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[120px] opacity-[0.04]" style={{ backgroundColor: '#34D399' }} />
        </div>

        {/* Floating dept icon orbs */}
        {HERO_ORBS.map((o, i) => (
          <div key={i} className="absolute pointer-events-none animate-float"
            style={{ top: o.top, left: o.left, right: o.right, animationDelay: o.delay, animationDuration: o.dur }}>
            <div className="flex items-center justify-center rounded-2xl"
              style={{
                width: o.size + 20, height: o.size + 20,
                background: `${o.color}10`,
                border: `1px solid ${o.color}25`,
                backdropFilter: 'blur(4px)',
              }}>
              <o.icon size={o.size * 0.55} style={{ color: o.color, opacity: 0.6 }} />
            </div>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* Eyebrow */}
          <div data-animate="fade-up"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-bold mb-8 border border-white/10"
            style={{ backgroundColor: 'rgba(0,212,255,0.06)', color: '#22D3EE' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 10px #22D3EE' }} />
            25+ members across 5 departments
          </div>

          {/* Headline */}
          <h1 data-animate="fade-up" data-delay="80"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight mb-6 leading-[0.9] text-offwhite">
            The people<br />behind <span className="grad-text">Aignite.</span>
          </h1>

          {/* Sub */}
          <p data-animate="fade-up" data-delay="160"
            className="text-base sm:text-lg max-w-xl leading-relaxed text-muted">
            A diverse crew of builders, thinkers, and doers — united by a shared obsession with technology.
          </p>

          {/* Dept pills row */}
          <div data-animate="fade-up" data-delay="240"
            className="mt-10 flex flex-wrap gap-2 sm:gap-3">
            {DEPARTMENTS.map(d => (
              <div key={d.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border"
                style={{ color: d.color, borderColor: `${d.color}25`, background: `${d.color}08` }}>
                <d.icon size={11} />
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §2  LEADERSHIP CARDS
      ══════════════════════════════════════════════ */}
      <section className="relative px-3 sm:px-6 pb-16 bg-level-0">
        {/* Section label */}
        <div className="max-w-6xl mx-auto mb-6">
          <div data-animate="fade-up" className="flex items-center gap-3">
            <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Leadership</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3">
          {LEADS.map((l, i) => (
            <div key={i} data-animate={i === 0 ? 'fade-right' : 'fade-left'} data-delay={i * 150}>
              <TeamCard member={l} heightClass="h-[260px] md:h-[380px]" />
              <div className="flex gap-3 mt-3 px-1">
                <a href={l.linkedin} className="text-muted hover:text-neon transition-colors"><Linkedin size={18} /></a>
                <a href={l.github}   className="text-muted hover:text-offwhite transition-colors"><Github size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §3  DEPARTMENTS — premium tab selector
      ══════════════════════════════════════════════ */}
      <section className="relative px-3 sm:px-6 pb-24 bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0" />

        <div className="max-w-6xl mx-auto pt-12 sm:pt-16">

          {/* Section heading */}
          <div className="mb-8 sm:mb-10">
            <div data-animate="fade-up" className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Browse by team</span>
            </div>
            <h2 data-animate="fade-up" data-delay="80"
              className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-offwhite">
              Departments
            </h2>
          </div>

          {/* ── Tab selector ── */}
          <div data-animate="fade-up" data-delay="100"
            className="mb-8 sm:mb-12">
            <div className="flex flex-wrap gap-2 pb-1">
              {DEPARTMENTS.map(d => {
                const isActive = activeDept === d.id;
                return (
                  <button key={d.id} onClick={() => setActiveDept(d.id)}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-250 outline-none"
                    style={{
                      color: isActive ? d.color : 'rgba(255,255,255,0.4)',
                      background: isActive ? `${d.color}12` : 'transparent',
                      border: `1px solid ${isActive ? `${d.color}35` : 'rgba(255,255,255,0.07)'}`,
                      boxShadow: isActive ? `0 0 20px ${d.color}18` : 'none',
                    }}>
                    {/* Icon */}
                    <d.icon size={14} />
                    {d.label}
                    {/* Active bottom accent */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                        style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Active dept label + content ── */}
          <div>
            {/* Dept header strip */}
            <div data-animate="fade-up"
              className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${activeDeptData.color}15`, border: `1px solid ${activeDeptData.color}30` }}>
                <activeDeptData.icon size={16} style={{ color: activeDeptData.color }} />
              </div>
              <div>
                <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-muted mb-0.5">Team</div>
                <div className="text-sm font-black font-display text-offwhite uppercase tracking-wide">{activeDeptData.label}</div>
              </div>
              {/* Live dot */}
              <div className="ml-auto flex items-center gap-1.5 text-[9px] font-mono tracking-widest uppercase"
                style={{ color: activeDeptData.color, opacity: 0.7 }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeDeptData.color }} />
                Active
              </div>
            </div>

            {/* Team card grids — unchanged component */}
            {activeDept === 'tech'    && <TechTeam />}
            {activeDept === 'event'   && <EventTeam />}
            {activeDept === 'pr'      && <PRTeam />}
            {activeDept === 'design'  && <DesignTeam />}
            {activeDept === 'content' && <ContentTeam />}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §4  FACULTY — Honorable Memento
      ══════════════════════════════════════════════ */}
      <section className="relative px-5 sm:px-8 py-20 sm:py-28 bg-level-0">
        <div className="glow-divider absolute top-0 left-0 right-0" />

        {/* Ambient amber glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[180px] opacity-[0.025] pointer-events-none"
          style={{ backgroundColor: '#FBBF24' }} />

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div data-animate="fade-up" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-bold mb-6 border"
              style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.2)', backgroundColor: 'rgba(245,158,11,0.05)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
              Honorable Memento
            </div>
            <h2 data-animate="fade-up" data-delay="80"
              className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-offwhite mb-4 leading-tight">
              The minds that <span style={{ color: '#F59E0B' }}>guide</span> us
            </h2>
            <p data-animate="fade-up" data-delay="160"
              className="text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
              Faculty coordinators and department heads who shape the direction of Aignite.
            </p>
          </div>

          {/* Faculty cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {FACULTY.map((f, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 120}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-default transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(145deg, #111a2e, #0d1526)',
                  border: '1px solid rgba(245,158,11,0.15)',
                  boxShadow: '0 0 0 0 rgba(245,158,11,0)',
                }}>

                {/* Top amber gradient bar */}
                <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D, #F59E0B)' }} />

                {/* Hover ambient glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.06), transparent 70%)' }} />

                {/* Large watermark initials */}
                <div className="absolute top-0 right-3 font-black leading-none select-none pointer-events-none opacity-[0.035] text-amber-400"
                  style={{ fontSize: '7rem', fontFamily: '"Arial Black", Arial, sans-serif', lineHeight: 1 }}>
                  {f.code}
                </div>

                <div className="relative z-10 p-6 sm:p-8 flex flex-col min-h-[220px] justify-between">
                  <div>
                    {/* Role badge */}
                    <div className="inline-flex items-center gap-1.5 text-[9px] font-black font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-md mb-5"
                      style={{ color: '#F59E0B', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)' }}>
                      {f.title}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl sm:text-2xl font-black font-display text-offwhite uppercase tracking-tight mb-1 leading-tight">
                      {f.name}
                    </h3>
                    <div className="text-[10px] font-mono text-muted uppercase tracking-widest mb-5">{f.role}</div>
                  </div>

                  {/* Quote block */}
                  <blockquote className="relative pl-4 border-l-2 border-amber-500/30">
                    <div className="absolute -top-1 -left-1.5 text-amber-400/40 font-serif text-2xl leading-none select-none">"</div>
                    <p className="text-xs sm:text-sm text-muted italic leading-relaxed line-clamp-3">
                      {f.tagline}
                    </p>
                  </blockquote>
                </div>

                {/* Bottom right corner glow */}
                <div className="absolute bottom-0 right-0 w-20 h-20 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'radial-gradient(circle at 100% 100%, rgba(245,158,11,0.12), transparent)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
