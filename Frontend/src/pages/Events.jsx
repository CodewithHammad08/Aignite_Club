import React from 'react';
import { Calendar, ArrowRight, Trophy, Users } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const EVENTS = [
  { title: 'AI Innovation Hackathon',   date: 'Nov 15, 2026', type: 'Hackathon', status: 'Upcoming',    statusColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30', desc: '24-hour hackathon — build AI-powered solutions to real-world problems.' },
  { title: 'Intro to Machine Learning', date: 'Nov 22, 2026', type: 'Workshop',  status: 'Upcoming',    statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', desc: 'Beginner-friendly workshop covering Python, NumPy, and scikit-learn.' },
  { title: 'Flutter App Dev Bootcamp',  date: 'Dec 05, 2026', type: 'Bootcamp',  status: 'Upcoming',    statusColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30', desc: '3-day intensive bootcamp to build and deploy your first mobile app.' },
  { title: 'Tech Talk: Future of GenAI', date: 'Dec 14, 2026', type: 'Speaker',  status: 'Coming Soon', statusColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', desc: 'Industry speaker session on the current state and future of generative AI.' },
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
        <h1 data-animate="fade-up" className="text-4xl md:text-6xl font-black text-white font-display tracking-tight mb-6">
          <span className="grad-text">Events</span> & Workshops
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          From hackathons to bootcamps — here's what's happening at Aignite.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Calendar size={14} className="text-blue-400" /> Upcoming
          </h2>
          <div className="flex flex-col gap-4">
            {EVENTS.map((e, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="group glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5 hover:bg-blue-500/[0.04] hover:border-blue-500/20 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center justify-center">
                  <span className="text-lg font-black text-white leading-none">{e.date.split(' ')[1].replace(',','')}</span>
                  <span className="text-[10px] font-bold text-blue-400 uppercase">{e.date.split(' ')[0]}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white font-display">{e.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${e.statusColor}`}>{e.status}</span>
                  </div>
                  <p className="text-sm text-gray-400">{e.desc}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:block">{e.type}</span>
                  <ArrowRight size={18} className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Trophy size={14} className="text-cyan-400" /> Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PAST.map((p, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="glass rounded-2xl p-6 hover:bg-blue-500/[0.04] transition-colors">
                <h3 className="text-base font-bold text-white mb-2 font-display">{p.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
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
