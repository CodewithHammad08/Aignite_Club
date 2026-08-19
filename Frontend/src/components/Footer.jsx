import React from 'react';
import { Github, Linkedin, Instagram, Mail } from '../Icons';
import logo from '../assets/logo.png';

const SOCIALS = [
  { Icon: Instagram, href: 'https://www.instagram.com/aignite.bvdu/', label: 'Instagram', color: '#E1306C' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/aignite-student-chapter-bvdu-det-nm', label: 'LinkedIn', color: '#0A66C2' },
  { Icon: Github, href: 'https://github.com/AIgnite-BVDUDET', label: 'GitHub', color: '#e2e8f0' },
  { Icon: Mail, href: 'mailto:aigniteclub.bvdu@gmail.com', label: 'Email', color: '#22d3ee' },
];

const FOCUS = [
  { label: 'Artificial Intelligence', accent: '#22d3ee' },
  { label: 'Machine Learning', accent: '#818cf8' },
  { label: 'Web Development', accent: '#34d399' },
  { label: 'Cloud & DevOps', accent: '#f472b6' },
  { label: 'Open Source', accent: '#fb923c' },
  { label: 'Hackathons', accent: '#facc15' },
];

export default function Footer({ go }) {
  return (
    <footer className="relative bg-[#050810] overflow-hidden">

      <style>{`
        @keyframes scanline {
          0%   { transform: translateX(-150%); }
          100% { transform: translateX(500%); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(0,212,255,0.15)); }
          50%       { filter: drop-shadow(0 0 18px rgba(0,212,255,0.55)); }
        }
        @keyframes statusBlink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(52,211,153,0.8); }
          50%       { opacity: 0.4; box-shadow: 0 0 2px rgba(52,211,153,0.3); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-20px) scale(1.05); }
        }
        .footer-focus-pill:hover .focus-dot { transform: scale(1.5); }
      `}</style>

      {/* ══════ BACKGROUND LAYERS ══════ */}

      {/* Fine dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Large centered glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.06) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)', animation: 'float-slow 10s ease-in-out infinite' }} />

      {/* Top-right accent orb */}
      <div className="absolute -top-20 right-0 w-[600px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 60%)' }} />

      {/* Scanning top border */}
      <div className="relative h-px w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.3), rgba(129,140,248,0.3), transparent)' }} />
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[scanline_5s_ease-in-out_infinite]" />
      </div>

      {/* ══════ MAIN CONTENT ══════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 pt-16 lg:pt-20 pb-6 lg:pb-8">

        {/* 2-Column Balanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-start max-w-5xl mx-auto">

          {/* ── COL 1: Identity ── */}
          <div className="flex flex-col">
            {/* Logo */}
            <button onClick={() => go && go('home')} className="block mb-8 cursor-pointer w-fit group" aria-label="Go home">
              <img
                src={logo} alt="Aignite"
                className="w-[180px] sm:w-[220px] md:w-[260px] h-auto object-contain transition-all duration-700 group-hover:scale-[1.02]"
                style={{ animation: 'logoPulse 2.5s ease-in-out infinite' }}
              />
            </button>

            {/* Institution badge */}
            <div className="relative mb-8 pl-5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:rounded-full before:bg-gradient-to-b before:from-cyan-500/80 before:to-indigo-500/40">
              <p className="text-base font-bold text-slate-200 mb-1.5 tracking-wide">Official AI &amp; Technology Club</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-1">Dept. of Computer Science &amp; Engineering (AIML)</p>
              <p className="text-sm text-slate-500 leading-relaxed">Bharati Vidyapeeth (Deemed to be University), Navi Mumbai</p>
            </div>

            {/* Status pill & Socials row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mt-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] text-[11px] sm:text-xs font-mono text-emerald-300 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: 'statusBlink 2s ease-in-out infinite' }} />
                Applications open · 2026–27
              </div>

              <div className="hidden sm:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-2">
                {SOCIALS.map(({ Icon, href, label, color }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="group/s w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border border-white/[0.06] bg-white/[0.025] transition-all duration-300 hover:scale-110"
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = color + '50';
                      e.currentTarget.style.backgroundColor = color + '12';
                      e.currentTarget.style.boxShadow = `0 0 16px ${color}25`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.025)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                    <Icon size={16} className="text-slate-500 group-hover/s:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── COL 2: Our Focus ── */}
          <div className="lg:pl-8 lg:border-l border-white/5 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
            <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 sm:mb-8 flex items-center gap-3">
              <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-cyan-500/50 to-transparent" />
              Our Focus
            </h4>
            {/* 2-column grid for the pills to fill space beautifully on all devices */}
            <ul className="grid grid-cols-2 gap-2 sm:gap-3">
              {FOCUS.map(({ label, accent }) => (
                <li key={label}>
                  <div className="footer-focus-pill group/f flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl cursor-default transition-all duration-300 hover:bg-white/[0.04] border border-white/[0.02] hover:border-white/[0.08] bg-white/[0.01]">
                    <span className="focus-dot w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 transition-all duration-300"
                      style={{ backgroundColor: accent + '60', boxShadow: `0 0 6px ${accent}40` }} />
                    <span className="text-[11px] sm:text-sm text-slate-300 group-hover/f:text-white transition-colors duration-300 font-medium leading-tight">{label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative mb-8">
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(34,211,238,0.15) 50%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
              <span>&copy; {new Date().getFullYear()} AIGNITE</span>
              <span className="hidden sm:block w-px h-3 bg-slate-800" />
              <span className="hidden sm:block">Bharati Vidyapeeth Deemed To Be University, Navi Mumbai</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400 transition-colors duration-300"
                style={{ boxShadow: '0 0 4px rgba(52,211,153,0.5)' }} />
              <span className="group-hover:text-slate-500 transition-colors duration-300">All systems operational</span>
            </div>
          </div>
        </div>

        {/* ── Massive Typography Brand Background ── */}
        <div className="w-full overflow-hidden flex justify-center select-none pointer-events-none pb-4 relative z-0">
          <h1 className="font-black font-display tracking-tighter text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(3.5rem, 15vw, 24rem)',
              lineHeight: '0.75',
              backgroundImage: 'linear-gradient(to bottom, rgba(34,211,238,0.15) 0%, rgba(59,130,246,0.02) 100%)'
            }}>
            AIGNITE
          </h1>
        </div>

      </div>
    </footer>
  );
}
