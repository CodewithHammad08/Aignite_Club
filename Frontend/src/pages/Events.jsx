import React from 'react';
import { Calendar, ArrowRight, Trophy, Users } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const EVENTS = [
  { title: 'AI Innovation Hackathon', date: 'Nov 15, 2026', type: 'Hackathon', status: 'Upcoming', desc: '24-hour hackathon — build AI-powered solutions to real-world problems.' },
  { title: 'Intro to Machine Learning', date: 'Nov 22, 2026', type: 'Workshop', status: 'Upcoming', desc: 'Beginner-friendly workshop covering Python, NumPy, and scikit-learn.' },
  { title: 'Flutter App Dev Bootcamp', date: 'Dec 05, 2026', type: 'Bootcamp', status: 'Upcoming', desc: '3-day intensive bootcamp to build and deploy your first mobile app.' },
  { title: 'Tech Talk: Future of GenAI', date: 'Dec 14, 2026', type: 'Speaker', status: 'Coming Soon', desc: 'Industry speaker session on the current state and future of generative AI.' },
];

const PAST = [
  { title: 'Inauguration Ceremony', date: 'Sep 2025', attendees: '200+' },
  { title: 'Web Dev Workshop Series', date: 'Oct 2025', attendees: '80+' },
  { title: 'Neural Hack 1.0', date: 'Jan 2026', attendees: '120+' },
];

export default function Events() {
  const ref = useScrollAnimate();
  return (
    <div ref={ref}>
      <section className="pt-12 pb-8 px-6 text-center">
        <h1 data-animate="fade-up" className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 text-offwhite">
          <span className="grad-text">Events</span> & Workshops
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-muted">From hackathons to bootcamps — here's what's happening at Aignite.</p>
      </section>
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <Calendar size={14} style={{ color: '#3B82F6' }} /> Upcoming
          </h2>
          <div className="flex flex-col gap-4">
            {EVENTS.map((e, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="group glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.12)' }}>
                  <span className="text-lg font-black text-offwhite leading-none">{e.date.split(' ')[1].replace(',','')}</span>
                  <span className="text-[10px] font-bold font-mono uppercase" style={{ color: '#3B82F6' }}>{e.date.split(' ')[0]}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold font-display text-offwhite">{e.title}</h3>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: 'rgba(34,211,238,0.08)', color: '#22D3EE', border: '1px solid rgba(34,211,238,0.15)' }}>{e.status}</span>
                  </div>
                  <p className="text-sm text-muted">{e.desc}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs font-semibold uppercase tracking-wider hidden md:block text-muted">{e.type}</span>
                  <ArrowRight size={18} className="text-muted group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <Trophy size={14} style={{ color: '#22D3EE' }} /> Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PAST.map((p, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="glass rounded-2xl p-6">
                <h3 className="text-base font-bold mb-2 font-display text-offwhite">{p.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {p.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
