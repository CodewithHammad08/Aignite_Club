import React from 'react';
import { Github, Linkedin, Users } from '../Icons';

const LEADS = [
  { name: 'Sanskriti Singh', role: 'President',     focus: 'AI & Strategy',     linkedin: '#', github: '#' },
  { name: 'Osman Sanjar',    role: 'Vice President', focus: 'Engineering & Ops', linkedin: '#', github: '#' },
];

const TEAM = [
  { name: 'Member 1', role: 'Tech Lead',         focus: 'Full Stack' },
  { name: 'Member 2', role: 'Design Lead',       focus: 'UI/UX' },
  { name: 'Member 3', role: 'ML Engineer',       focus: 'Deep Learning' },
  { name: 'Member 4', role: 'Community Lead',    focus: 'Outreach' },
  { name: 'Member 5', role: 'Content Head',      focus: 'Social Media' },
  { name: 'Member 6', role: 'Event Coordinator', focus: 'Operations' },
];

export default function Team() {
  return (
    <>
      <section className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight mb-6">
          Our <span className="grad-text">Team</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          The people building Aignite from the ground up.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 text-center">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADS.map((l, i) => (
              <div key={i} className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1">
                <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${i === 0 ? 'bg-blue-600/25' : 'bg-cyan-600/25'}`}></div>
                <div className="relative z-10 flex items-start gap-5">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${i === 0 ? 'from-blue-500 to-indigo-600' : 'from-cyan-500 to-blue-600'} flex items-center justify-center shadow-xl`}>
                    <span className="text-3xl font-black text-white font-display">{l.name.charAt(0)}</span>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-white font-display mb-1">{l.name}</h3>
                    <p className={`text-sm font-bold mb-1 ${i === 0 ? 'text-blue-400' : 'text-cyan-400'}`}>{l.role}</p>
                    <p className="text-xs text-gray-500 mb-4">{l.focus}</p>
                    <div className="flex gap-2">
                      <a href={l.linkedin} className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                        <Linkedin size={14} />
                      </a>
                      <a href={l.github} className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.1] transition-all">
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 text-center">Core Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TEAM.map((m, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:bg-blue-500/[0.04] hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                  <Users size={22} className="text-blue-400/50" />
                </div>
                <h3 className="text-base font-bold text-white font-display">{m.name}</h3>
                <p className="text-xs font-semibold text-blue-400 mt-1">{m.role}</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
