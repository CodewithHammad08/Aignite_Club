import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Trophy, Users, Star, Rocket, Target, Sparkles, CheckCircle } from '../Icons';

const reduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

/* ── Flip Digit — airport board style ── */
function FlipDigit({ value }) {
  const [current, setCurrent] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);
  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => { setCurrent(value); setFlipping(false); }, 300);
      prevRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <div className="flip-digit-container">
      <div className={`flip-digit text-xl sm:text-3xl md:text-4xl font-black font-mono px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg w-10 sm:w-16 md:w-20 text-center ${flipping ? 'flipping' : ''}`}
        style={{ backgroundColor: '#0d1829', border: '1px solid rgba(0,212,255,0.12)', color: '#e8f4f8' }}>
        {String(current).padStart(2, '0')}
      </div>
    </div>
  );
}

/* ── Inline Registration Panel ── */
function RegisterPanel({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', domain: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden"
    >
      <div className="mt-6 pt-6 border-t border-white/5">
        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-3 py-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
              <CheckCircle size={28} style={{ color: '#34D399' }} />
            </div>
            <p className="font-bold" style={{ color: '#34D399' }}>You're registered!</p>
            <p className="text-sm" style={{ color: '#4a6070' }}>We'll send details to {form.email}</p>
            <button onClick={onClose} className="text-xs font-mono mt-2" style={{ color: '#4a6070' }}>Close</button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="px-4 py-3 rounded-xl text-sm font-semibold outline-none w-full"
              style={{ backgroundColor: '#0d1829', border: '1px solid rgba(0,212,255,0.12)', color: '#e8f4f8' }} />
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Email address"
              className="px-4 py-3 rounded-xl text-sm font-semibold outline-none w-full"
              style={{ backgroundColor: '#0d1829', border: '1px solid rgba(0,212,255,0.12)', color: '#e8f4f8' }} />
            <select required value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })}
              className="px-4 py-3 rounded-xl text-sm font-semibold outline-none w-full"
              style={{ backgroundColor: '#0d1829', border: '1px solid rgba(0,212,255,0.12)', color: form.domain ? '#e8f4f8' : '#4a6070' }}>
              <option value="">Domain interest</option>
              <option>Machine Learning &amp; Deep Learning</option>
              <option>Natural Language Processing &amp; GenAI</option>
              <option>Web Development</option>
              <option>MLOps &amp; AI Infrastructure</option>
            </select>
            <div className="md:col-span-3 flex flex-col sm:flex-row gap-3">
              <button type="submit"
                className="btn-glow px-8 py-3.5 rounded-xl font-bold text-sm w-full sm:w-auto text-center"
                style={{ backgroundColor: '#00d4ff', color: '#050d1a' }}>
                Submit
              </button>
              <button type="button" onClick={onClose} className="px-6 py-3.5 rounded-xl text-sm font-semibold w-full sm:w-auto text-center"
                style={{ color: '#4a6070', border: '1px solid rgba(255,255,255,0.05)' }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ── Data ── */
const EVENTS = [
  { title: 'AI/ML Concept-Based Interactive Session', date: 'Jul 15, 2026', type: 'Session', seats: 45 },
  { title: 'AI System Design & Problem Solving', date: 'Aug 10, 2026', type: 'Workshop', seats: 60 },
  { title: 'Flagship AI Interactive Event', date: 'Aug 25, 2026', type: 'Event', seats: 120, featured: true },
  { title: 'AI Career Guidance / Expert Talk', date: 'Oct 05, 2026', type: 'Speaker', seats: 150 },
  { title: 'AI Application & Analysis Session', date: 'Jan 15, 2027', type: 'Session', seats: 50 },
  { title: 'AI Simulation / Engagement Session', date: 'Feb 05, 2027', type: 'Workshop', seats: 40 },
  { title: 'AI Tools & Practical Applications', date: 'Feb 20, 2027', type: 'Workshop', seats: 40 },
  { title: 'AI Innovation & Idea Presentation', date: 'Mar 10, 2027', type: 'Event', seats: 80 },
];

const PAST = [
  { title: 'Club Founded & Inaugural', date: '2025', attendees: '200+', outcomes: 'Official Launch • Core Team Formed', img: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779466919/inaugral-2_bvbhqt.png' },
  { title: 'Hands-on ML Workshop', date: '2026', attendees: '120+', outcomes: '40+ Models Trained • 3 Datasets', img: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779473314/IMG_4320_mxwqlf.jpg' },
  { title: 'WebCraft: Web from Scratch', date: '2026', attendees: '80+', outcomes: 'HTML, CSS & JS Basics Learned', img: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779512784/IMG_5266_fgwgj5.jpg' },
  { title: 'Practical Linux & OS: Commands to Automation', date: '2026', attendees: '100+', outcomes: 'CLI Basics & OS Concepts Gained', img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600&auto=format' },
];

const FILTERS = ['All', 'Session', 'Workshop', 'Event', 'Speaker'];
const TYPE_COLORS = { Session: '#00d4ff', Workshop: '#818CF8', Event: '#e8a020', Speaker: '#34D399' };

/* ── Stroke text fill on scroll ── */
function StrokeImpact() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) ref.current?.classList.add('filled');
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref} className="stroke-text"> Impact</span>;
}

export default function Events() {
  const [filter, setFilter] = useState('All');
  const [showRegister, setShowRegister] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 96, hours: 14, minutes: 22, seconds: 40 });
  const flagship = EVENTS.find(e => e.featured);
  const displayed = EVENTS.filter(e => filter === 'All' || e.type === filter);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      {/* ── HEADER ── */}
      <section className="pt-24 pb-12 px-6 text-center bg-level-0 relative overflow-hidden">
        <div className="svg-grid absolute inset-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[150px] rounded-full pointer-events-none opacity-15"
          style={{ backgroundColor: '#00d4ff' }} />
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display mb-5 leading-[0.95]"
            style={{ color: '#e8f4f8', letterSpacing: '-0.03em' }}>
            <span className="grad-text">Events</span> &amp; Workshops
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-sans"
            style={{ color: '#6a8090' }}>
            Learn, build, and connect. Here's what's happening at Aignite.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED FLAGSHIP ── */}
      {flagship && (
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative depth-card rounded-3xl overflow-hidden">
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite]"
                  style={{ background: 'conic-gradient(from 0deg, transparent 60%, rgba(0,212,255,0.4), transparent 60%)' }} />
              </div>
              <div className="relative z-10 p-5 md:p-12 flex flex-col md:flex-row items-stretch md:items-start gap-8 md:gap-10"
                style={{ backgroundColor: '#0d1829', margin: '1px', borderRadius: 'calc(1.5rem - 1px)' }}>
                <div className="flex-grow">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-widest mb-6"
                    style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.25)' }}>
                    <Star size={12} className="animate-pulse" /> Featured Flagship
                  </div>
                  <h2 className="text-2xl md:text-4xl font-black font-display mb-3 text-left" style={{ color: '#e8f4f8' }}>{flagship.title}</h2>
                  <p className="text-sm md:text-base mb-6 text-left" style={{ color: '#4a6070' }}>
                    Our biggest event of the semester featuring expert talks and hands-on AI activities.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#e8f4f8' }}>
                      <Calendar size={16} style={{ color: '#00d4ff' }} /> Announced Soon
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#e8f4f8' }}>
                        <Users size={16} style={{ color: '#e8a020' }} /> {flagship.seats} Seats Available
                      </div>
                      <div className="w-36 h-1 rounded-full" style={{ backgroundColor: 'rgba(232,160,32,0.2)' }}>
                        <div className="h-full rounded-full" style={{ width: '100%', backgroundColor: '#e8a020' }} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button disabled
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base w-full sm:w-auto opacity-70 cursor-not-allowed"
                      style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.3)' }}>
                      <Rocket size={18} /> Coming Soon
                    </button>
                  </div>
                </div>

                {/* Flip countdown */}
                <div className="flex-shrink-0 p-4 sm:p-6 rounded-2xl w-full md:w-auto"
                  style={{ backgroundColor: 'rgba(5,13,26,0.6)', border: '1px solid rgba(0,212,255,0.08)' }}>
                  <div className="text-xs font-bold font-mono uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2"
                    style={{ color: '#4a6070' }}>
                    <Sparkles size={12} /> Closes In
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-center">
                    {Object.entries(timeLeft).map(([unit, val]) => (
                      <div key={unit} className="flex flex-col items-center gap-1">
                        <FlipDigit value={val} />
                        <span className="text-[9px] uppercase tracking-widest" style={{ color: '#4a6070' }}>{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING EVENTS GRID ── */}
      <section className="px-6 pb-32 bg-[#050810] relative z-20">
        <div className="max-w-6xl mx-auto">

          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
                <p className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-cyan-400">{'// schedule'}</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                Upcoming <span className="grad-text">Events.</span>
              </h2>
            </div>

            {/* Tab filter */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-[background-color,color,box-shadow] duration-200 ${filter === f
                      ? 'bg-cyan-400 text-[#050810] shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {displayed.map((e, i) => {
                const typeColor = TYPE_COLORS[e.type] || '#22D3EE';
                const day = e.date.split(' ')[1]?.replace(',', '') || e.date.slice(8, 10);
                const mon = e.date.split(' ')[0]?.slice(0, 3).toUpperCase() || '';
                const year = e.date.split(' ')[2] || e.date.slice(0, 4);
                return (
                  <motion.div key={e.title + filter}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    className="group relative flex flex-col bg-[#090e1c] border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer transition-[transform,border-color,box-shadow] duration-300 hover:border-white/[0.16] hover:-translate-y-1.5 hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.7)]"
                  >
                    {/* Top color accent bar */}
                    <div className="h-[3px] w-full flex-shrink-0"
                      style={{ background: `linear-gradient(90deg, ${typeColor}, ${typeColor}40)` }} />

                    {/* Ghosted number watermark */}
                    <div className="absolute -right-2 -bottom-4 text-[9rem] font-black font-display leading-none select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.065] transition-opacity duration-500"
                      style={{ color: typeColor }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Card body */}
                    <div className="relative z-10 flex flex-col flex-1 p-6">

                      {/* Row 1: type badge + featured */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="inline-flex items-center text-[10px] font-black font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg"
                          style={{ color: typeColor, background: `${typeColor}14`, border: `1px solid ${typeColor}2a` }}>
                          {e.type}
                        </span>
                        {e.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono tracking-wider uppercase text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-1.5 rounded-lg">
                            <Star size={9} /> Flagship
                          </span>
                        )}
                      </div>

                      {/* Row 2: title */}
                      <h3 className="text-[1.05rem] sm:text-[1.15rem] font-bold font-display text-white leading-[1.35] mb-6 flex-1">
                        {e.title}
                      </h3>

                      {/* Row 3: date + seats + arrow */}
                      <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/[0.06]">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04]">
                            <span className="text-[11px] font-black font-display text-white tracking-widest uppercase">TBD</span>
                          </div>
                          <span className="text-xs font-mono text-slate-500">{year}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-white font-display leading-none">{e.seats}</div>
                            <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">seats</div>
                          </div>
                          <div className="flex-shrink-0 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04] text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 group-hover:text-cyan-400 transition-all duration-300">
                            Coming Soon
                          </div>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {displayed.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <Target size={32} className="text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-300 mb-2 font-display">No events found</h3>
              <p className="text-slate-500 font-sans">There are no {filter.toLowerCase()}s scheduled at the moment.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── PAST IMPACT ── */}
      <section className="px-6 py-24 bg-level-1 relative">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight" style={{ color: '#e8f4f8' }}>
              Past<StrokeImpact />
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: '#4a6070' }}>
              A look back at what our community has built, learned, and achieved.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAST.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative depth-card rounded-3xl overflow-hidden min-h-[320px] cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute inset-0">
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,13,26,0.9) 0%, rgba(5,13,26,0.5) 25%, transparent 50%)' }} />
                </div>
                <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="amber-badge">{p.date}</span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase flex items-center gap-1"
                      style={{ backgroundColor: 'rgba(0,212,255,0.12)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
                      <Users size={9} /> {p.attendees}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-display group-hover:text-[#00d4ff] transition-colors" style={{ color: '#e8f4f8' }}>{p.title}</h3>
                  <div className="relative h-8 overflow-hidden">
                    <div className="absolute bottom-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 flex items-center gap-2 text-sm font-medium"
                      style={{ color: '#e8f4f8' }}>
                      <Trophy size={14} style={{ color: '#e8a020' }} /> {p.outcomes}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}