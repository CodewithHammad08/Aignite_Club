import React, { useState } from 'react';
import { Github, Linkedin, Users, Code, Calendar, Sparkles, Globe, Cpu } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';
import TechTeam, { TeamCard, EventTeam, PRTeam, DesignTeam, ContentTeam } from '../components/TeamCard';

const LEADS = [
  {
    id: '01',
    name: 'Sanskriti Singh',
    initials: 'SS',
    role: 'PRESIDENT',
    nationality: 'INDIAN',
    tagline: 'Leading Aignite to new horizons',
    photo_body: null,
    stats: [
      { label: 'DOMAIN',   value: 'Management' },
      { label: 'STACK',    value: 'Strategy' },
      { label: 'PROJECTS', value: '12' },
    ],
    linkedin: '#',
    github: '#',
  },
  {
    id: '02',
    name: 'Osman Sanjar',
    initials: 'OS',
    role: 'VICE PRESIDENT',
    nationality: 'INDIAN',
    tagline: 'Operations and community leader',
    photo_body: null,
    stats: [
      { label: 'DOMAIN',   value: 'Operations' },
      { label: 'STACK',    value: 'Planning' },
      { label: 'PROJECTS', value: '10' },
    ],
    linkedin: '#',
    github: '#',
  },
];

const DEPARTMENTS = [
  { id: 'tech', label: 'Tech', icon: Code, head: { name: 'Prathamesh Khaire', title: 'Head', code: '03', img: null }, cohead: { name: 'Parth', title: 'Co-Head', code: '04', img: null }, members: [{ name: 'Hammad Dalvi', title: 'Full Stack', code: '05' },{ name: 'Ramanan D.', title: 'Backend', code: '06' },{ name: 'Ushank Shirke', title: 'App Dev', code: '07' },{ name: 'Soham', title: 'Developer', code: '08' },{ name: 'Manogya', title: 'AI Engineer', code: '09' },{ name: 'Tejas Gunjal', title: 'Frontend', code: '10' }] },
  { id: 'event', label: 'Events', icon: Calendar, head: { name: 'Event Head', title: 'Head', code: '10', img: null }, cohead: { name: 'Event Co-Head', title: 'Co-Head', code: '11', img: null }, members: [{ name: 'Member 1', title: 'Coordinator', code: '12' },{ name: 'Member 2', title: 'Logistics', code: '13' },{ name: 'Member 3', title: 'Coordinator', code: '14' },{ name: 'Member 4', title: 'Outreach', code: '15' },{ name: 'Member 5', title: 'Coordinator', code: '16' }] },
  { id: 'pr', label: 'PR', icon: Globe, head: { name: 'PR Head', title: 'Head', code: '17', img: null }, cohead: { name: 'PR Co-Head', title: 'Co-Head', code: '18', img: null }, members: [{ name: 'Member 1', title: 'Outreach', code: '19' },{ name: 'Member 2', title: 'Partnerships', code: '20' },{ name: 'Member 3', title: 'Sponsorships', code: '21' },{ name: 'Member 4', title: 'Communications', code: '22' },{ name: 'Member 5', title: 'Social Media', code: '23' }] },
  { id: 'design', label: 'Design', icon: Sparkles, head: { name: 'Design Head', title: 'Head', code: '24', img: null }, cohead: { name: 'Design Co-Head', title: 'Co-Head', code: '25', img: null }, members: [{ name: 'Member 1', title: 'UI/UX', code: '26' },{ name: 'Member 2', title: 'Graphics', code: '27' },{ name: 'Member 3', title: 'Motion', code: '28' },{ name: 'Member 4', title: 'Brand', code: '29' },{ name: 'Member 5', title: 'Illustration', code: '30' },{ name: 'Member 6', title: 'Visual', code: '31' }] },
  { id: 'content', label: 'Content', icon: Cpu, head: { name: 'Content Head', title: 'Head', code: '32', img: null }, cohead: { name: 'Content Co-Head', title: 'Co-Head', code: '33', img: null }, members: [{ name: 'Member 1', title: 'Photography', code: '34' },{ name: 'Member 2', title: 'Videography', code: '35' },{ name: 'Member 3', title: 'Copywriter', code: '36' },{ name: 'Member 4', title: 'Strategy', code: '37' },{ name: 'Member 5', title: 'Reels', code: '38' },{ name: 'Member 6', title: 'Blogs', code: '39' }] },
];

const FACULTY = [
  {
    code: 'FC',
    title: 'FACULTY COORDINATOR',
    name: 'Vishwayogita Savalkar',
    role: 'FACULTY COORDINATOR',
    tagline: 'Empowering students through technical leadership, project coordination, and structured academic mentorship.',
  },
  {
    code: 'FC',
    title: 'FACULTY COORDINATOR',
    name: 'Sanam Kazi',
    role: 'FACULTY COORDINATOR',
    tagline: 'Fostering academic engagement, supporting student development programs, and driving growth in technical research.',
  },
  {
    code: 'HD',
    title: 'AIML HOD',
    name: 'Supriya Khaitan',
    role: 'AIML HOD',
    tagline: 'Leading the department towards innovation, research excellence, and pioneering next-generation machine learning projects.',
  },
];



export default function Team() {
  const [activeDept, setActiveDept] = useState('tech');
  const dept = DEPARTMENTS.find(d => d.id === activeDept);
  const ref = useScrollAnimate();

  return (
    <div ref={ref}>
      <section className="pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto" data-animate="fade-up">
          <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-4 text-offwhite">
            The people behind <span className="grad-text">Aignite</span>
          </h1>
          <p className="text-lg max-w-xl leading-relaxed text-muted">A diverse crew of builders, thinkers, and doers.</p>
        </div>
      </section>
      <section className="px-3 md:px-6 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-3">
          {LEADS.map((l, i) => (
            <div key={i} data-animate={i === 0 ? 'fade-right' : 'fade-left'} data-delay={i * 150}>
              <TeamCard member={l} heightClass="h-[260px] md:h-[380px]" />
              <div className="flex gap-3 mt-3 px-1">
                <a href={l.linkedin} className="text-muted hover:text-neon transition-colors"><Linkedin size={18} /></a>
                <a href={l.github} className="text-muted hover:text-offwhite transition-colors"><Github size={18} /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold font-display mb-8 text-offwhite" data-animate="fade-up">Departments</h2>
          <div className="flex flex-wrap gap-2.5 mb-10 justify-start" data-animate="fade-up" data-delay="100">
            {DEPARTMENTS.map(d => {
              const isActive = activeDept === d.id;
              return (
                <button key={d.id} onClick={() => setActiveDept(d.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${isActive ? 'border-transparent text-white' : 'bg-transparent border-gray-700 text-muted hover:text-offwhite hover:border-gray-500'}`}
                  style={isActive ? { backgroundColor: '#3B82F6', boxShadow: '0 0 20px rgba(59,130,246,0.3)' } : {}}>
                  {d.label}
                </button>
              );
            })}
          </div>
          {dept && (
            <div>
              {activeDept === 'tech' && <TechTeam />}
              {activeDept === 'event' && <EventTeam />}
              {activeDept === 'pr' && <PRTeam />}
              {activeDept === 'design' && <DesignTeam />}
              {activeDept === 'content' && <ContentTeam />}
            </div>
          )}
        </div>
      </section>

      {/* ── HONORABLE MEMENTO (Faculty & Teachers) ── */}
      <section className="px-6 pb-24 border-t border-white/5 pt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black font-display mb-2 text-offwhite text-center uppercase tracking-tight" data-animate="fade-up">
            Honorable Memento
          </h2>
          <p className="text-sm font-mono text-muted text-center uppercase tracking-[0.2em] mb-12" data-animate="fade-up" data-delay="100">
            The faculty heads and teachers behind us
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACULTY.map((f, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(232,160,32,0.15)]"
                style={{
                  background: '#0d1526',
                  border: '1px solid rgba(232, 160, 32, 0.15)', // Distinguished gold/amber border hint
                }}
                data-animate="fade-up"
                data-delay={i * 150}
              >
                {/* Gold glowing top accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 to-yellow-500 opacity-60"></div>

                {/* Background Large Initials watermark */}
                <div
                  className="absolute top-0 right-4 text-[7rem] md:text-[8rem] font-black leading-none font-display select-none pointer-events-none opacity-[0.02] text-amber-500"
                >
                  {f.code}
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px]">
                  <div>
                    {/* Role Title */}
                    <div
                      className="text-[9px] font-bold font-mono tracking-[0.2em] uppercase text-amber-500/80 mb-2"
                    >
                      {f.title}
                    </div>

                    {/* Name */}
                    <h3 className="text-xl md:text-2xl font-black font-display text-offwhite uppercase tracking-tight mb-1">
                      {f.name}
                    </h3>

                    {/* Designation */}
                    <div className="text-[11px] font-mono text-white/50 uppercase mb-4">
                      {f.role}
                    </div>
                  </div>

                  {/* Tagline / Memento */}
                  <p className="text-xs md:text-sm text-white/70 italic leading-relaxed pl-3 border-l-2 border-amber-500/40">
                    "{f.tagline}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
