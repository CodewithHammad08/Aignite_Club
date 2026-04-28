import React, { useState } from 'react';
import { Github, Linkedin, Users, Code, Calendar, Sparkles, Globe, Cpu } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

import sanskritImg from '../assets/sanskriti.jpg';
import osmanImg from '../assets/osman.jpg';

const LEADS = [
  { name: 'Sanskriti Singh', role: 'President', code: '01', focus: 'AI & Strategy', img: sanskritImg, linkedin: '#', github: '#' },
  { name: 'Osman Sanjar',    role: 'Vice President', code: '02', focus: 'Engineering & Ops', img: osmanImg, linkedin: '#', github: '#' },
];

const DEPARTMENTS = [
  {
    id: 'tech', label: 'Tech', icon: Code,
    head:   { name: 'Tech Head',    title: 'Head', code: '03', img: null },
    cohead: { name: 'Tech Co-Head', title: 'Co-Head', code: '04', img: null },
    members: [
      { name: 'Member 1', title: 'Full Stack', code: '05' },
      { name: 'Member 2', title: 'Backend', code: '06' },
      { name: 'Member 3', title: 'ML Engineer', code: '07' },
      { name: 'Member 4', title: 'Frontend', code: '08' },
      { name: 'Member 5', title: 'DevOps', code: '09' },
    ],
  },
  {
    id: 'event', label: 'Events', icon: Calendar,
    head:   { name: 'Event Head',    title: 'Head', code: '10', img: null },
    cohead: { name: 'Event Co-Head', title: 'Co-Head', code: '11', img: null },
    members: [
      { name: 'Member 1', title: 'Coordinator', code: '12' },
      { name: 'Member 2', title: 'Logistics', code: '13' },
      { name: 'Member 3', title: 'Coordinator', code: '14' },
      { name: 'Member 4', title: 'Outreach', code: '15' },
      { name: 'Member 5', title: 'Coordinator', code: '16' },
    ],
  },
  {
    id: 'pr', label: 'PR', icon: Globe,
    head:   { name: 'PR Head',    title: 'Head', code: '17', img: null },
    cohead: { name: 'PR Co-Head', title: 'Co-Head', code: '18', img: null },
    members: [
      { name: 'Member 1', title: 'Outreach', code: '19' },
      { name: 'Member 2', title: 'Partnerships', code: '20' },
      { name: 'Member 3', title: 'Sponsorships', code: '21' },
      { name: 'Member 4', title: 'Communications', code: '22' },
      { name: 'Member 5', title: 'Social Media', code: '23' },
    ],
  },
  {
    id: 'design', label: 'Design', icon: Sparkles,
    head:   { name: 'Design Head',    title: 'Head', code: '24', img: null },
    cohead: { name: 'Design Co-Head', title: 'Co-Head', code: '25', img: null },
    members: [
      { name: 'Member 1', title: 'UI/UX', code: '26' },
      { name: 'Member 2', title: 'Graphics', code: '27' },
      { name: 'Member 3', title: 'Motion', code: '28' },
      { name: 'Member 4', title: 'Brand', code: '29' },
      { name: 'Member 5', title: 'Illustration', code: '30' },
      { name: 'Member 6', title: 'Visual', code: '31' },
    ],
  },
  {
    id: 'content', label: 'Content', icon: Cpu,
    head:   { name: 'Content Head',    title: 'Head', code: '32', img: null },
    cohead: { name: 'Content Co-Head', title: 'Co-Head', code: '33', img: null },
    members: [
      { name: 'Member 1', title: 'Photography', code: '34' },
      { name: 'Member 2', title: 'Videography', code: '35' },
      { name: 'Member 3', title: 'Copywriter', code: '36' },
      { name: 'Member 4', title: 'Strategy', code: '37' },
      { name: 'Member 5', title: 'Reels', code: '38' },
      { name: 'Member 6', title: 'Blogs', code: '39' },
    ],
  },
];

/* ─── Player Card ─── */
function PlayerCard({ name, title, code, img, size = 'md', accent = false }) {
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');

  const h = { lg: 'min-h-[380px]', md: 'min-h-[300px]', sm: 'min-h-[260px]' }[size];
  const numSize = { lg: 'text-[10rem]', md: 'text-[7rem]', sm: 'text-[5rem]' }[size];
  const imgH = { lg: 'h-60', md: 'h-48', sm: 'h-40' }[size];
  const nameSize = { lg: 'text-2xl', md: 'text-lg', sm: 'text-base' }[size];
  const initSize = { lg: 'text-7xl', md: 'text-5xl', sm: 'text-4xl' }[size];

  return (
    <div className={`group relative ${h} rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}
      style={{ backgroundColor: '#0f1d32' }}>

      {/* Top accent stripe */}
      {accent && <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>}

      {/* Big number */}
      <div className={`absolute top-0 right-3 ${numSize} font-black text-white/[0.04] leading-none font-display select-none pointer-events-none`}>
        {code}
      </div>

      {/* Photo or Initials */}
      <div className={`relative z-10 flex items-end justify-center ${imgH} pt-4 px-4`}>
        {img ? (
          <img src={img} alt={name}
            className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_8px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.03] transition-transform duration-500" />
        ) : (
          <span className={`${initSize} font-black text-white/[0.07] font-display mb-8 select-none group-hover:text-white/[0.12] transition-colors`}>
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="relative z-10 p-4 pt-3">
        <div className="text-[10px] font-bold text-blue-400/70 uppercase tracking-[0.15em] mb-1">{code} · {title}</div>
        <h3 className={`${nameSize} font-black text-white font-display uppercase tracking-tight leading-[1.15]`}>
          {firstName}{lastName ? <><br /><span className="text-white/80">{lastName}</span></> : null}
        </h3>
      </div>
    </div>
  );
}

export default function Team() {
  const [activeDept, setActiveDept] = useState('tech');
  const dept = DEPARTMENTS.find(d => d.id === activeDept);
  const ref = useScrollAnimate();

  return (
    <div ref={ref}>
      {/* ─── HEADER ─── */}
      <section className="pt-12 pb-6 px-6">
        <div className="max-w-5xl mx-auto" data-animate="fade-up">
          <h1 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight mb-4">
            The people behind <span className="grad-text">Aignite</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            A diverse crew of builders, thinkers, and doers from Bharati Vidyapeeth.
          </p>
        </div>
      </section>

      {/* ─── PRESIDENT & VP ─── */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADS.map((l, i) => (
            <div key={i} data-animate={i === 0 ? 'fade-right' : 'fade-left'} data-delay={i * 150}>
              <PlayerCard name={l.name} title={l.role} code={l.code} img={l.img} size="lg" accent />
              <div className="flex gap-3 mt-3 px-1">
                <a href={l.linkedin} className="text-gray-600 hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
                <a href={l.github} className="text-gray-600 hover:text-white transition-colors"><Github size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEPARTMENTS ─── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white font-display mb-8" data-animate="fade-up">Departments</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2" data-animate="fade-up" data-delay="100">
            {DEPARTMENTS.map(d => {
              const isActive = activeDept === d.id;
              return (
                <button key={d.id} onClick={() => setActiveDept(d.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                    isActive
                      ? 'bg-white text-[#020817] border-white shadow-[0_2px_20px_rgba(255,255,255,0.12)]'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:text-white hover:border-gray-500'
                  }`}>
                  {d.label}
                </button>
              );
            })}
          </div>

          {dept && (
            <div>
              {/* Head & Co-Head */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[dept.head, dept.cohead].map((person, i) => (
                  <PlayerCard key={i} name={person.name} title={`${person.title} · ${dept.label}`} code={person.code} img={person.img} size="md" accent />
                ))}
              </div>

              {/* Members */}
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">Core Members</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {dept.members.map((m, i) => (
                  <PlayerCard key={i} name={m.name} title={m.title} code={m.code} img={null} size="sm" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
