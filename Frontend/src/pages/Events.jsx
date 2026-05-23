import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Trophy, Users, Star, Zap, Rocket, Target, Sparkles, CheckCircle } from '../Icons';

const reduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

/* ── Framer Motion variants ── */

// Communicates: filtered items don't just appear — they arrive with purpose
const listItemVariants = {
  hidden:  { opacity: 0, y: reduced ? 0 : 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: reduced ? { duration: 0.2 } : { duration: 0.35, ease: 'easeOut', delay: i * 0.03 },
  }),
  exit: { opacity: 0, y: reduced ? 0 : -10, transition: { duration: 0.2 } },
};

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
            {/* Checkmark morphs in with stroke animation */}
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
              <option>Machine Learning & Deep Learning</option>
              <option>Natural Language Processing & GenAI</option>
              <option>Web Development</option>
              <option>MLOps & AI Infrastructure</option>
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
  { title: 'AI/ML Concept-Based Interactive Session', date: 'Jul 15, 2026', type: 'Session',  seats: 45 },
  { title: 'AI System Design & Problem Solving',      date: 'Aug 10, 2026', type: 'Workshop', seats: 60 },
  { title: 'Flagship AI Interactive Event',           date: 'Aug 25, 2026', type: 'Event',    seats: 120, featured: true },
  { title: 'AI Career Guidance / Expert Talk',        date: 'Oct 05, 2026', type: 'Speaker',  seats: 150 },
  { title: 'AI Application & Analysis Session',       date: 'Jan 15, 2027', type: 'Session',  seats: 50 },
  { title: 'AI Simulation / Engagement Session',      date: 'Feb 05, 2027', type: 'Workshop', seats: 40 },
  { title: 'AI Tools & Practical Applications',       date: 'Feb 20, 2027', type: 'Workshop', seats: 40 },
  { title: 'AI Innovation & Idea Presentation',       date: 'Mar 10, 2027', type: 'Event',    seats: 80 },
];

const PAST = [
  { title: 'Club Founded & Inaugural',          date: '2025', attendees: '200+', outcomes: 'Official Launch • Core Team Formed',    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format' },
  { title: 'Hands-on ML Workshop',              date: '2026', attendees: '120+', outcomes: '40+ Models Trained • 3 Datasets',       img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format' },
  { title: 'WebCraft: Web from Scratch',          date: '2026', attendees: '80+',  outcomes: 'HTML, CSS & JS Basics Learned',         img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format' },
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
            className="text-4xl md:text-7xl font-black font-display tracking-tight mb-4" style={{ color: '#e8f4f8' }}>
            <span className="grad-text">Events</span> & Workshops
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#4a6070' }}>
            Learn, build, and connect. Here's what's happening at Aignite.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED FLAGSHIP ── */}
      {flagship && (
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative depth-card rounded-3xl overflow-hidden">
              {/* Spinning gradient border */}
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
                  <p className="text-sm md:text-base mb-6 text-left" style={{ color: '#4a6070' }}>Our biggest event of the semester featuring expert talks and hands-on AI activities.</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#e8f4f8' }}>
                      <Calendar size={16} style={{ color: '#00d4ff' }} /> {flagship.date}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#e8f4f8' }}>
                        <Users size={16} style={{ color: '#e8a020' }} /> {flagship.seats} Seats Left
                      </div>
                      {/* Amber depletion bar — ~60% depleted static mock */}
                      <div className="w-36 h-1 rounded-full" style={{ backgroundColor: 'rgba(232,160,32,0.2)' }}>
                        <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: '#e8a020' }} />
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setShowRegister(v => !v)}
                    className="btn-glow btn-pulse-border flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base w-full sm:w-auto"
                    style={{ backgroundColor: '#00d4ff', color: '#050d1a' }}>
                    <Rocket size={18} /> Register Now
                    <ArrowRight size={16} className="btn-arrow-icon" />
                  </button>

                  <AnimatePresence>
                    {showRegister && <RegisterPanel onClose={() => setShowRegister(false)} />}
                  </AnimatePresence>
                </div>

                {/* Flip countdown */}
                <div className="flex-shrink-0 p-4 sm:p-6 rounded-2xl w-full md:w-auto" style={{ backgroundColor: 'rgba(5,13,26,0.6)', border: '1px solid rgba(0,212,255,0.08)' }}>
                  <div className="text-xs font-bold font-mono uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2" style={{ color: '#4a6070' }}>
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

      {/* ── EVENT SCHEDULE WITH FILTERS ── */}
      <section className="px-6 pb-20 bg-level-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <h2 className="text-2xl font-black font-display flex items-center gap-2" style={{ color: '#e8f4f8' }}>
              <Calendar size={22} style={{ color: '#00d4ff' }} /> Event Schedule
            </h2>
            {/* Tab filter */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl" style={{ backgroundColor: '#080f1d', border: '1px solid rgba(255,255,255,0.04)' }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300"
                  style={filter === f
                    ? { backgroundColor: '#00d4ff', color: '#050d1a', boxShadow: '0 0 12px rgba(0,212,255,0.3)' }
                    : { color: '#4a6070' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {displayed.map((e, i) => {
                const typeColor = TYPE_COLORS[e.type] || '#00d4ff';
                return (
                  <motion.div key={e.title + filter}
                    custom={i} variants={listItemVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="group relative glass rounded-2xl p-4 md:p-5 flex flex-row items-center gap-4 cursor-pointer overflow-hidden">

                    {/* Left cyan accent line — grows from 2px to 8px on hover */}
                    <div className="absolute left-0 top-3 bottom-3 rounded-r-full transition-all duration-150 group-hover:w-1.5"
                      style={{ width: '2px', backgroundColor: typeColor }} />

                    {/* Date badge in amber */}
                    <div className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-xl flex flex-col items-center justify-center"
                      style={{ backgroundColor: '#e8a020', color: '#050d1a' }}>
                      <span className="text-base md:text-lg font-black leading-none">{e.date.split(' ')[1]?.replace(',', '') || e.date.slice(8, 10)}</span>
                      <span className="text-[8px] md:text-[9px] font-bold font-mono uppercase">{e.date.split(' ')[0]?.slice(0, 3)}</span>
                    </div>

                    <div className="flex-grow min-w-0 pl-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                        <h3 className="text-sm md:text-base font-bold font-display truncate text-left" style={{ color: '#e8f4f8' }}>{e.title}</h3>
                        {e.featured && <span className="inline-block text-[8px] font-bold px-1.5 py-0.5 rounded w-max" style={{ backgroundColor: 'rgba(232,160,32,0.15)', color: '#e8a020', border: '1px solid rgba(232,160,32,0.2)' }}>⭑ Featured</span>}
                      </div>
                      <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold font-mono uppercase" style={{ color: '#4a6070' }}>
                        <span style={{ color: typeColor }}>{e.type}</span>
                        <span className="flex items-center gap-1"><Users size={10} /> {e.seats} Seats</span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-[#00d4ff]"
                      style={{ backgroundColor: '#0d1829', border: '1px solid rgba(0,212,255,0.1)' }}>
                      <ArrowRight size={12} className="text-muted group-hover:text-[#050d1a] transition-colors" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {displayed.length === 0 && (
              <div className="py-12 text-center rounded-2xl" style={{ color: '#4a6070', border: '1px dashed rgba(255,255,255,0.06)' }}>
                No {filter.toLowerCase()}s found.
              </div>
            )}
          </div>
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
                className="group relative depth-card rounded-3xl overflow-hidden min-h-[300px] cursor-pointer hover:-translate-y-2 transition-transform duration-300">

                {/* Background image scales on hover */}
                <div className="absolute inset-0">
                  <img src={p.img} alt={p.title}
                    className="w-full h-full object-cover opacity-35 group-hover:opacity-55 transition-all duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #050d1a 40%, transparent)' }} />
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

                  {/* Stat chip slides up from bottom on hover */}
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
