import React, { useState } from 'react';
import { Github, Linkedin, Users, Code, Calendar, Sparkles, Globe, Cpu } from '../Icons';

const LEADS = [
  { name: 'Sanskriti Singh', role: 'President',     focus: 'AI & Strategy',     linkedin: '#', github: '#' },
  { name: 'Osman Sanjar',    role: 'Vice President', focus: 'Engineering & Ops', linkedin: '#', github: '#' },
];

const DEPARTMENTS = [
  {
    id: 'tech',
    label: 'Tech Team',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    head:   { name: 'Tech Head',    role: 'Head' },
    cohead: { name: 'Tech Co-Head', role: 'Co-Head' },
    members: [
      { name: 'Member 1', role: 'Full Stack Dev' },
      { name: 'Member 2', role: 'Backend Dev' },
      { name: 'Member 3', role: 'ML Engineer' },
      { name: 'Member 4', role: 'Frontend Dev' },
      { name: 'Member 5', role: 'DevOps' },
    ],
  },
  {
    id: 'event',
    label: 'Event Team',
    icon: Calendar,
    color: 'from-cyan-500 to-blue-600',
    head:   { name: 'Event Head',    role: 'Head' },
    cohead: { name: 'Event Co-Head', role: 'Co-Head' },
    members: [
      { name: 'Member 1', role: 'Coordinator' },
      { name: 'Member 2', role: 'Logistics' },
      { name: 'Member 3', role: 'Coordinator' },
      { name: 'Member 4', role: 'Outreach' },
      { name: 'Member 5', role: 'Coordinator' },
    ],
  },
  {
    id: 'pr',
    label: 'PR Team',
    icon: Globe,
    color: 'from-sky-500 to-cyan-600',
    head:   { name: 'PR Head',    role: 'Head' },
    cohead: { name: 'PR Co-Head', role: 'Co-Head' },
    members: [
      { name: 'Member 1', role: 'Outreach' },
      { name: 'Member 2', role: 'Partnerships' },
      { name: 'Member 3', role: 'Sponsorships' },
      { name: 'Member 4', role: 'Communications' },
      { name: 'Member 5', role: 'Social Media' },
    ],
  },
  {
    id: 'design',
    label: 'Design Team',
    icon: Sparkles,
    color: 'from-indigo-500 to-blue-600',
    head:   { name: 'Design Head',    role: 'Head' },
    cohead: { name: 'Design Co-Head', role: 'Co-Head' },
    members: [
      { name: 'Member 1', role: 'UI/UX Designer' },
      { name: 'Member 2', role: 'Graphic Designer' },
      { name: 'Member 3', role: 'Motion Design' },
      { name: 'Member 4', role: 'Brand Identity' },
      { name: 'Member 5', role: 'Illustration' },
      { name: 'Member 6', role: 'Visual Design' },
    ],
  },
  {
    id: 'content',
    label: 'Content Team',
    icon: Cpu,
    color: 'from-teal-500 to-blue-600',
    head:   { name: 'Content Head',    role: 'Head' },
    cohead: { name: 'Content Co-Head', role: 'Co-Head' },
    members: [
      { name: 'Member 1', role: 'Photography' },
      { name: 'Member 2', role: 'Videography' },
      { name: 'Member 3', role: 'Copywriter' },
      { name: 'Member 4', role: 'Content Strategy' },
      { name: 'Member 5', role: 'Reels & Shorts' },
      { name: 'Member 6', role: 'Blog Writer' },
    ],
  },
];

export default function Team() {
  const [activeDept, setActiveDept] = useState('tech');
  const dept = DEPARTMENTS.find(d => d.id === activeDept);

  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="pt-12 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight mb-6">
          Our <span className="grad-text">Team</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          The people building Aignite from the ground up.
        </p>
      </section>

      {/* ─── FOUNDING LEADERS ─── */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 text-center">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADS.map((l, i) => (
              <div key={i} className="group relative glass rounded-3xl p-8 overflow-hidden hover:border-blue-500/20 transition-all duration-300 hover:-translate-y-1 glow-border">
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

      {/* ─── DEPARTMENT TABS ─── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Mini Navbar */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl glass">
              {DEPARTMENTS.map(d => {
                const Icon = d.icon;
                const isActive = activeDept === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDept(d.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-500/15 text-blue-300 shadow-[inset_0_1px_0_rgba(59,130,246,0.3)]'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="hidden md:inline">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Department Content */}
          {dept && (
            <div>
              {/* Head & Co-Head */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {[dept.head, dept.cohead].map((person, i) => (
                  <div key={i} className="glass rounded-2xl p-6 flex items-center gap-4 hover:bg-blue-500/[0.04] hover:border-blue-500/20 transition-all glow-border">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center shadow-lg`}>
                      <span className="text-xl font-black text-white font-display">{person.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">{person.name}</h3>
                      <p className="text-xs font-bold text-blue-400">{person.role} · {dept.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Members */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5 text-center">Core Members</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {dept.members.map((m, i) => (
                  <div key={i} className="glass rounded-2xl p-5 text-center hover:bg-blue-500/[0.04] hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 glow-border">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                      <Users size={20} className="text-blue-400/40" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-display">{m.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
