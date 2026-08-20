import React, { useState } from 'react';
import { Github, Linkedin, Users, Code, Calendar, Sparkles, Globe, Cpu } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';
import TechTeam, { TeamCard, EventTeam, PRTeam, DesignTeam, ContentTeam, DisciplineTeam } from '../components/TeamCard';

/* ─── DATA (unchanged) ─── */
const LEADS = [
  {
    id: '01', name: 'Sanskriti Singh', initials: 'SS', role: 'PRESIDENT', nationality: 'INDIAN',
    tagline: 'Fostering an inclusive and driven tech community at Aignite.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232632/sanskriti_main-no-bg_chgqoh.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787231929/sanskriti_hover-no-bg_op7njh.png',
    photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Leadership' }, { label: 'FOCUS', value: 'Community' }],
    linkedin: 'https://www.linkedin.com/in/itirksnasingh/', github: '#',
  },
  {
    id: '02', name: 'Osman Sanjar', initials: 'OS', role: 'VICE PRESIDENT', nationality: 'INDIAN',
    tagline: 'Orchestrating seamless operations and leading impactful initiatives.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232630/osman-no-bg_qqrv8a.png',
    photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Operations' }, { label: 'FOCUS', value: 'Coordination' }],
    linkedin: 'https://www.linkedin.com/in/osman-sanjar-02a796321/', github: '#',
  },
];

const SPECIAL_HEADS = [
  {
    id: 'SH', name: 'Shreyash', initials: 'SH', role: 'SPONSORSHIP HEAD', nationality: 'INDIAN',
    tagline: 'Driving strategic partnerships and securing resources',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787236375/0d44176b51af46f39f49970ab48170f5-no-bg_xyzuur.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787236375/0d44176b51af46f39f49970ab48170f5-no-bg_xyzuur.png',
    photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Sponsorship' }, { label: 'STACK', value: 'Outreach' }, { label: 'DEALS', value: 'Active' }],
    linkedin: '#',
  },
  {
    id: 'FH', name: 'Sharavani', initials: 'SH', role: 'FINANCE HEAD', nationality: 'INDIAN',
    tagline: 'Managing funds, budgets, and financial strategy',
    photo_face: null,
    photo_body: null,
    stats: [{ label: 'DOMAIN', value: 'Finance' }, { label: 'STACK', value: 'Management' }, { label: 'FUNDS', value: 'Active' }],
    linkedin: '#',
  },
];

const DEPARTMENTS = [
  { id: 'tech', label: 'Tech', icon: Code, color: '#3B82F6' },
  { id: 'event', label: 'Events', icon: Calendar, color: '#22D3EE' },
  { id: 'pr', label: 'PR', icon: Globe, color: '#818CF8' },
  { id: 'design', label: 'Design', icon: Sparkles, color: '#F472B6' },
  { id: 'social', label: 'Social Media', icon: Cpu, color: '#34D399' },
  { id: 'discipline', label: 'Discipline', icon: Users, color: '#FBBF24' },
];



/* ─── Dept icon floating orbs for hero background ─── */
const HERO_ORBS = [
  { icon: Code, color: '#3B82F6', top: '18%', left: '8%', size: 36, delay: '0s', dur: '6s' },
  { icon: Calendar, color: '#22D3EE', top: '62%', left: '5%', size: 28, delay: '1s', dur: '7s' },
  { icon: Sparkles, color: '#F472B6', top: '25%', right: '7%', size: 32, delay: '0.5s', dur: '8s' },
  { icon: Globe, color: '#818CF8', top: '70%', right: '9%', size: 26, delay: '2s', dur: '6.5s' },
  { icon: Cpu, color: '#34D399', top: '45%', left: '3%', size: 22, delay: '1.5s', dur: '9s' },
  { icon: Users, color: '#FBBF24', top: '50%', right: '4%', size: 24, delay: '3s', dur: '7.5s' },
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
            30+ members across 6 departments
          </div>

          {/* Headline */}
          <h1 data-animate="fade-up" data-delay="80"
            className="font-black font-display mb-6 leading-[0.95]"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '-0.035em',
              color: '#E5E7EB'
            }}>
            The people<br />behind <span className="grad-text">Aignite.</span>
          </h1>

          {/* Sub */}
          <p data-animate="fade-up" data-delay="160"
            className="text-base sm:text-lg max-w-xl leading-relaxed font-sans"
            style={{ color: '#6a8090' }}>
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
              <TeamCard member={l} heightClass="h-[260px] md:h-[380px]" facing={i % 2 === 0 ? 'right' : 'left'} />
              <div className="flex gap-3 mt-3 px-1">
                {l.linkedin && l.linkedin !== '#' ? (
                  <a href={l.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-neon transition-colors"><Linkedin size={18} /></a>
                ) : (
                  <div className="text-muted/30 pointer-events-none"><Linkedin size={18} /></div>
                )}
                {l.github && l.github !== '#' ? (
                  <a href={l.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-offwhite transition-colors"><Github size={18} /></a>
                ) : (
                  <div className="text-muted/30 pointer-events-none"><Github size={18} /></div>
                )}
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
            {activeDept === 'tech' && <TechTeam />}
            {activeDept === 'event' && <EventTeam />}
            {activeDept === 'pr' && <PRTeam />}
            {activeDept === 'design' && <DesignTeam />}
            {activeDept === 'social' && <ContentTeam />}
            {activeDept === 'discipline' && <DisciplineTeam />}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §3.5  CORE COMMITTEE HEADS (Sponsorship & Finance)
      ══════════════════════════════════════════════ */}
      <section className="relative px-3 sm:px-6 pb-24 bg-level-0">
        <div className="max-w-4xl mx-auto pt-4">
          <div data-animate="fade-up" className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Core Committee Heads</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {SPECIAL_HEADS.map((h, i) => (
              <div key={i} data-animate={i === 0 ? 'fade-right' : 'fade-left'} data-delay={i * 150}>
                <TeamCard member={h} heightClass="h-[180px] md:h-[280px]" facing={i % 2 === 0 ? 'right' : 'left'} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §4  STORY DRIVEN JOIN CTA
      ══════════════════════════════════════════════ */}
      <section className="relative px-5 sm:px-8 py-24 sm:py-32 bg-[#060910] overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />

        {/* Cinematic ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] opacity-[0.03]"
            style={{ background: 'radial-gradient(circle, #22D3EE, #818CF8)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Typography & Story */}
          <div className="flex-1 text-center md:text-left">
            <div data-animate="fade-up" className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block" />
              <p className="text-[10px] sm:text-xs font-bold font-mono uppercase tracking-[0.3em] text-cyan-400">
                {'// the_next_chapter'}
              </p>
            </div>

            <h2 data-animate="fade-up" data-delay="100" className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white mb-6 leading-[1.1]">
              Think you belong<br />on this <span className="grad-text">page?</span>
            </h2>

            <p data-animate="fade-up" data-delay="200" className="text-base md:text-lg text-slate-400 leading-relaxed font-sans mb-10 max-w-lg mx-auto md:mx-0">
              We are constantly looking for curious minds, restless builders, and passionate designers. If you want to stop attending workshops and start organizing them, your seat is empty.
            </p>

            <div data-animate="fade-up" data-delay="300" className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a href="https://forms.google.com" target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-sm text-white overflow-hidden bg-[#0a0e17] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Apply for Core Team</span>
                <Sparkles size={16} className="relative z-10 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right: Visual Storytelling Grid */}
          <div className="flex-1 relative w-full" data-animate="fade-left" data-delay="300">
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">

              {/* Floating glass panels */}
              <div className="absolute top-[10%] right-[10%] w-[60%] aspect-[4/3] rounded-2xl border border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl overflow-hidden shadow-2xl z-20 animate-float" style={{ animationDelay: '0s' }}>
                <img src="https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_500/v1779473312/IMG_7193_p5zhmg.jpg" alt="Team collaborating" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Late Night Builds</div>
              </div>

              <div className="absolute bottom-[10%] left-[5%] w-[55%] aspect-square rounded-2xl border border-white/10 bg-[#0a0e17]/80 backdrop-blur-xl overflow-hidden shadow-2xl z-30 animate-float" style={{ animationDelay: '1.5s' }}>
                <img src="https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_500/v1779466919/inaugral-1_xkrt47.png" alt="Team celebrating" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Community Impact</div>
              </div>

              {/* Decorative nodes */}
              <div className="absolute top-[45%] left-[60%] w-px h-24 bg-gradient-to-b from-cyan-500/50 to-transparent -rotate-45 z-10" />
              <div className="absolute top-[45%] left-[60%] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-10" />
            </div>
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
