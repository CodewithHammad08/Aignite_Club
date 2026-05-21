import React, { useEffect, useRef, useState } from 'react';
import { Brain, Rocket, Target, Sparkles, Users, Trophy, Code, Zap, Star, Globe } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

/* ─────────────────────────────────────────────────────────
   EVENTS — each has up to 5 photo slots.
   Drop real images into /public/events/ and update `photos`.
   Any null slot renders a branded placeholder gradient.
───────────────────────────────────────────────────────── */
const EVENTS = [
  {
    id: 'inaugural',
    num: '01',
    month: 'SEP',
    year: '2025',
    badge: 'MILESTONE',
    title: 'Club Founded & Inaugural',
    desc: 'The official launch of Aignite at Bharati Vidyapeeth — students, faculty, and leadership came together to kick-start a community dedicated to AI and technology.',
    color: '#3B82F6',
    grad: 'linear-gradient(135deg, #1e3a5f, #0d1829)',
    icon: Star,
    tags: ['First ever event', 'Official launch', 'Cross-dept members'],
    // Add real paths like '/events/inaugural-1.jpg' — null = placeholder
    photos: [null, null, null, null, null],
    placeholders: ['#1e3a8a', '#1d4ed8', '#2563eb', '#1e40af', '#1a3363'],
  },
  {
    id: 'ml-workshop',
    num: '02',
    month: 'JAN',
    year: '2026',
    badge: 'WORKSHOP',
    title: 'Hands-on ML Workshop',
    desc: 'An intensive session on Machine Learning fundamentals — members wrote real Python code, preprocessed data, and trained their first ML models from scratch.',
    color: '#22D3EE',
    grad: 'linear-gradient(135deg, #0e3040, #0d1829)',
    icon: Brain,
    tags: ['Python & scikit-learn', 'Hands-on coding', 'ML fundamentals'],
    photos: [null, null, null, null, null],
    placeholders: ['#0e7490', '#0891b2', '#06b6d4', '#0e4f5f', '#083344'],
  },
  {
    id: 'linux-workshop',
    num: '03',
    month: 'FEB',
    year: '2026',
    badge: 'WORKSHOP',
    title: 'Practical Linux Workshop',
    desc: 'From Command to Automation — members dived into Linux terminal, shell scripting, file permissions, process management, and dev environment setup.',
    color: '#818CF8',
    grad: 'linear-gradient(135deg, #1e1b4b, #0d1829)',
    icon: Code,
    tags: ['Terminal & shell', 'Bash scripting', 'Dev environment'],
    photos: [null, null, null, null, null],
    placeholders: ['#3730a3', '#4338ca', '#4f46e5', '#2e2687', '#1e1b4b'],
  },
  {
    id: 'tableau',
    num: '04',
    month: 'MAR',
    year: '2026',
    badge: 'WORKSHOP',
    title: 'Tableau Data Visualization',
    desc: 'Mastering the art of turning raw data into meaningful stories. Members built interactive dashboards and learned to communicate insights visually.',
    color: '#F472B6',
    grad: 'linear-gradient(135deg, #4a0e2b, #0d1829)',
    icon: Target,
    tags: ['Tableau Desktop', 'Interactive dashboards', 'Data storytelling'],
    photos: [null, null, null, null, null],
    placeholders: ['#9d174d', '#be185d', '#db2777', '#831843', '#500724'],
  },
];

const STATS = [
  { value: 25,  suffix: '+', label: 'Active Members' },
  { value: 4,   suffix: '',  label: 'Events Hosted' },
  { value: 3,   suffix: '+', label: 'Workshops Run' },
  { value: 100, suffix: '%', label: 'Free to Join' },
];

const PILLARS = [
  { icon: Target,   title: 'Mission', subtitle: 'Purpose-driven', color: '#3B82F6', tag: 'CORE MISSION',
    desc: 'Bridge the gap between classroom theory and industry-level execution through real projects, hackathons, and mentorship.' },
  { icon: Rocket,   title: 'Vision',  subtitle: 'Future-focused',  color: '#22D3EE', tag: 'LONG TERM',
    desc: "Create an environment where students don't just learn technology — they build with it, grow through it, and shape the future." },
  { icon: Sparkles, title: 'Values',  subtitle: 'Culture-first',   color: '#818CF8', tag: 'OUR DNA',
    desc: 'Curiosity, collaboration, and craftsmanship. Learning happens fastest when you build alongside others.' },
];

const REASONS = [
  { icon: Code,     label: 'Hands-On Workshops',  desc: 'Build real things, not just slides.',          color: '#3B82F6' },
  { icon: Trophy,   label: 'Hackathon Access',     desc: 'Compete, prototype, and win.',                 color: '#22D3EE' },
  { icon: Users,    label: 'Industry Mentors',     desc: 'Learn from people already in the field.',      color: '#818CF8' },
  { icon: Rocket,   label: 'Build Real Projects',  desc: 'Ship things with your name on them.',          color: '#34D399' },
  { icon: Target,   label: 'Certificates',         desc: 'Recognised for what you built, not attended.', color: '#F472B6' },
  { icon: Globe,    label: 'Speaker Sessions',     desc: 'Perspectives from people doing the work.',     color: '#FBBF24' },
  { icon: Zap,      label: 'Tech Community',       desc: 'Find your crew, build your network.',          color: '#A78BFA' },
  { icon: Sparkles, label: 'Innovation Culture',   desc: 'An environment that rewards curiosity.',       color: '#60A5FA' },
];

/* ─── Animated counter ─── */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1600, t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Photo slot — shared between mobile & desktop ─── */
function PhotoSlot({ src, bg, color, size = 'md', className = '' }) {
  const sizeMap = { lg: 28, md: 20, sm: 16 };
  const iconSize = sizeMap[size] || 20;

  return (
    <div className={`relative overflow-hidden group/slot ${className}`} style={{ background: bg }}>
      {/* texture: dot grid */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }} />
      {/* diagonal shimmer */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ background: `linear-gradient(135deg, ${color} 0%, transparent 50%, ${color} 100%)` }} />
      {/* corner color accent */}
      <div className="absolute top-0 left-0 w-12 h-12 opacity-20 rounded-br-3xl"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}, transparent)` }} />

      {src ? (
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/slot:scale-105" />
      ) : (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-1.5">
          {/* camera icon */}
          <div className="rounded-lg p-2 opacity-40" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          {size !== 'sm' && (
            <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-30" style={{ color }}>
              photo
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Photo cluster ─── */
function PhotoCluster({ event }) {
  const { photos, placeholders, color, num, title } = event;

  return (
    <div className="w-full">

      {/* ── MOBILE (< sm): 3-tile asymmetric layout ──
          ┌──────────┬────────┐
          │          │  [1]   │
          │   [0]    ├────────┤
          │  (tall)  │  [2]   │
          └──────────┴────────┘
      */}
      <div className="sm:hidden grid gap-2" style={{ gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '120px 120px' }}>
        {/* Big left — spans both rows */}
        <div className="row-span-2 rounded-2xl overflow-hidden relative">
          <PhotoSlot src={photos[0]} bg={placeholders[0]} color={color} size="lg" className="w-full h-full" />
          {/* Watermark number */}
          <div className="absolute bottom-2 left-3 text-[40px] font-black leading-none select-none pointer-events-none opacity-[0.07]"
            style={{ color, fontFamily: '"Arial Black", Arial, sans-serif' }}>
            {num}
          </div>
        </div>
        {/* Top right */}
        <div className="rounded-2xl overflow-hidden">
          <PhotoSlot src={photos[1]} bg={placeholders[1]} color={color} size="md" className="w-full h-full" />
        </div>
        {/* Bottom right */}
        <div className="rounded-2xl overflow-hidden">
          <PhotoSlot src={photos[2]} bg={placeholders[2]} color={color} size="md" className="w-full h-full" />
        </div>
      </div>

      {/* ── DESKTOP (≥ sm): 5-tile mosaic ──
          ┌──────────┬─────────────┐
          │  [0]     │     [1]     │   row 1: 180px
          │  (tall)  ├──────┬──────┤
          │          │  [2] │  [3] │   row 2: 140px
          └──────────┴──────┴──────┘
          + [4] spans part of row2
      */}
      <div className="hidden sm:grid gap-2"
        style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '185px 145px' }}>
        {/* Tall left — row-span-2 */}
        <div className="row-span-2 rounded-2xl overflow-hidden relative">
          <PhotoSlot src={photos[0]} bg={placeholders[0]} color={color} size="lg" className="w-full h-full" />
          <div className="absolute bottom-3 left-4 text-[56px] font-black leading-none select-none pointer-events-none opacity-[0.06]"
            style={{ color, fontFamily: '"Arial Black", Arial, sans-serif' }}>
            {num}
          </div>
        </div>
        {/* Top right wide — col-span-2 */}
        <div className="col-span-2 rounded-2xl overflow-hidden">
          <PhotoSlot src={photos[1]} bg={placeholders[1]} color={color} size="md" className="w-full h-full" />
        </div>
        {/* Bottom right — 2 equal tiles */}
        <div className="rounded-2xl overflow-hidden">
          <PhotoSlot src={photos[2]} bg={placeholders[2]} color={color} size="sm" className="w-full h-full" />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <PhotoSlot src={photos[3]} bg={placeholders[3]} color={color} size="sm" className="w-full h-full" />
        </div>
      </div>

      {/* Photo count chip — shown only when no photos */}
      {photos.every(p => !p) && (
        <div className="mt-2.5 flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase" style={{ color, opacity: 0.4 }}>
            Photos coming soon
          </span>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function About() {
  const ref = useScrollAnimate();

  return (
    <div ref={ref}>

      {/* ══════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-5 sm:px-8 pt-24 pb-16 text-center overflow-hidden bg-level-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[700px] rounded-full blur-[200px] opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #00d4ff, #3B82F6)' }} />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[120px] opacity-[0.04]" style={{ backgroundColor: '#818CF8' }} />
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[100px] opacity-[0.04]" style={{ backgroundColor: '#F472B6' }} />
        </div>

        {/* floating micro-orbs */}
        {[
          { top: '30%', left: '7%',  c: '#22D3EE', d: '0s',   s: 8  },
          { top: '55%', right: '9%', c: '#818CF8', d: '1.2s', s: 6  },
          { top: '70%', left: '14%', c: '#F472B6', d: '2.4s', s: 5  },
          { top: '22%', right: '18%',c: '#FBBF24', d: '0.6s', s: 10 },
        ].map((o, i) => (
          <div key={i} className="absolute rounded-full animate-float pointer-events-none"
            style={{ top: o.top, left: o.left, right: o.right, width: o.s, height: o.s,
              backgroundColor: o.c, opacity: 0.5, animationDelay: o.d }} />
        ))}

        <div className="relative z-10 max-w-4xl mx-auto w-full">
          <div data-animate="fade-up"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-bold mb-8 border border-white/10"
            style={{ backgroundColor: 'rgba(0,212,255,0.06)', color: '#22D3EE' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 10px #22D3EE' }} />
            Est. 2025 · Bharati Vidyapeeth Deemed University
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 10px #22D3EE' }} />
          </div>

          <h1 data-animate="fade-up" data-delay="100"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight mb-6 leading-[0.9] text-offwhite">
            We are<br /><span className="grad-text">Aignite.</span>
          </h1>

          <p data-animate="fade-up" data-delay="200"
            className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-muted mb-12">
            A student-led AI &amp; technology club built for students who want to
            <strong style={{ color: '#e8f4f8' }}> create, innovate, and lead.</strong>{' '}
            More than a club — a community of builders.
          </p>

          <div data-animate="fade-up" data-delay="300"
            className="w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)' }}>
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-4"
                style={{ background: 'rgba(0,0,0,0.2)', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : '' }}>
                <div className="text-2xl sm:text-3xl font-black font-display text-offwhite mb-1">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §2  PILLARS
      ══════════════════════════════════════════════ */}
      <section className="relative px-5 sm:px-8 py-20 sm:py-28 bg-level-1 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div data-animate="fade-up" className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Our foundation</span>
          </div>
          <h2 data-animate="fade-up" data-delay="80"
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-offwhite leading-tight">
            Built on three <span className="grad-text">pillars</span>
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PILLARS.map((p, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 100}
              className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden group cursor-default"
              style={{ background: 'linear-gradient(145deg, #0d1829, #090f1d)', border: `1px solid ${p.color}20` }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-15 transition-opacity duration-700" style={{ backgroundColor: p.color }} />
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${p.color}12`, border: `1px solid ${p.color}30` }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <span className="text-[9px] font-black font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-md"
                  style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}20` }}>{p.tag}</span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.15em] uppercase mb-2" style={{ color: p.color }}>{p.subtitle}</div>
              <h3 className="text-2xl font-black font-display text-offwhite mb-3">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${p.color}60, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §3  EVENTS — Photo cluster per event
      ══════════════════════════════════════════════ */}
      <section className="relative px-5 sm:px-8 py-20 sm:py-32 bg-level-0 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />

        {/* ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[200px] opacity-[0.025]" style={{ backgroundColor: '#3B82F6' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[180px] opacity-[0.025]" style={{ backgroundColor: '#818CF8' }} />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Header */}
          <div className="mb-14 sm:mb-20">
            <div data-animate="fade-up" className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Season 2025–26</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <h2 data-animate="fade-up" data-delay="80"
                className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-offwhite leading-tight">
                What we've <span className="grad-text">done</span>
              </h2>
              <p data-animate="fade-up" data-delay="120"
                className="text-sm text-muted max-w-xs leading-relaxed sm:text-right">
                Real events. Real students. Real skills built from scratch.
              </p>
            </div>
          </div>

          {/* Event blocks */}
          <div className="flex flex-col gap-20 sm:gap-28">
            {EVENTS.map((ev, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={ev.id} data-animate="fade-up" data-delay={i * 80}
                  className={`flex flex-col gap-8 lg:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start`}>

                  {/* ── Photo cluster ── */}
                  <div className="w-full lg:w-[55%] flex-shrink-0">
                    <PhotoCluster event={ev} />
                  </div>

                  {/* ── Info panel ── */}
                  <div className="w-full lg:flex-1 flex flex-col justify-center">
                    {/* Number + date */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                        style={{ background: `${ev.color}15`, border: `1.5px solid ${ev.color}35` }}>
                        <span className="text-[10px] font-black font-mono leading-none" style={{ color: ev.color }}>{ev.num}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-md"
                          style={{ color: ev.color, background: `${ev.color}12`, border: `1px solid ${ev.color}25` }}>{ev.badge}</span>
                        <span className="text-[10px] font-mono text-muted">{ev.month} {ev.year}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-offwhite mb-4 leading-tight">{ev.title}</h3>

                    {/* Accent line */}
                    <div className="w-10 h-0.5 mb-5 rounded-full" style={{ backgroundColor: ev.color }} />

                    {/* Desc */}
                    <p className="text-sm sm:text-base leading-relaxed text-muted mb-6">{ev.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {ev.tags.map((t, j) => (
                        <span key={j} className="text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full"
                          style={{ color: ev.color, background: `${ev.color}10`, border: `1px solid ${ev.color}25` }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div data-animate="fade-up" className="mt-16 sm:mt-24 text-center">
            <p className="text-xs font-mono text-muted">
              // More events, hackathons &amp; sessions coming in 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §4  WHY JOIN
      ══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 bg-level-1 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-[0.025] pointer-events-none"
          style={{ backgroundColor: '#22D3EE' }} />

        {/* Header */}
        <div className="px-5 sm:px-8 max-w-5xl mx-auto mb-10 sm:mb-14">
          <div data-animate="fade-up" className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: '#00d4ff' }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Membership perks</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 data-animate="fade-up" data-delay="80"
              className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-offwhite leading-tight">
              Why <span className="grad-text">Join Us?</span>
            </h2>
            <p data-animate="fade-up" data-delay="120" className="text-sm text-muted sm:text-right max-w-xs">
              Eight reasons we're built differently from a typical college club.
            </p>
          </div>
        </div>

        {/* Unified grid — 2 col on mobile, 4 col on desktop. No scroll. */}
        <div className="px-5 sm:px-8 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {REASONS.map((r, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 50}
              className="relative rounded-2xl p-4 sm:p-5 overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1.5"
              style={{ background: 'linear-gradient(145deg, #0d1829, #090f1d)', border: `1px solid ${r.color}18` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 120%, ${r.color}18, transparent 65%)` }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${r.color}90, transparent)` }} />
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${r.color}12`, border: `1px solid ${r.color}28` }}>
                <r.icon size={18} style={{ color: r.color }} />
              </div>
              <div className="text-xs sm:text-sm font-bold text-offwhite font-display mb-1 leading-snug">{r.label}</div>
              <div className="text-[10px] sm:text-[11px] text-muted leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>
    </div>
  );
}
