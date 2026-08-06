import React, { useEffect, useRef, useState } from 'react';
import { Brain, Rocket, Target, Sparkles, Users, Trophy, Code, Zap, Star, Globe } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

/* ─────────────────────────────────────────────────────────
   ORIGINAL DATA PRESERVED
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
    icon: Star,
    tags: ['First ever event', 'Official launch', 'Cross-dept members'],
    photos: [
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779466919/inaugral-1_xkrt47.png',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779466919/inaugral-2_bvbhqt.png',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779466920/inaugral-3_geptyn.png',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779467716/1000028126_enmz7l.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779467729/inaugral-4_qscrp2.heic',
    ],
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
    icon: Brain,
    tags: ['Python & scikit-learn', 'Hands-on coding', 'ML fundamentals'],
    photos: [
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473312/IMG_7193_p5zhmg.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473314/IMG_4324_m9tlwv.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473313/IMG_4315_rdqef0.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473313/IMG_8741_zeyotl.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473314/IMG_4320_mxwqlf.jpg',
    ],
    placeholders: ['#0e7490', '#0891b2', '#06b6d4', '#0e4f5f', '#083344'],
  },
  {
    id: 'web-dev',
    num: '03',
    month: 'FEB',
    year: '2026',
    badge: 'SPEAKER SESSION',
    title: 'WebCraft: Web from Scratch',
    desc: 'An expert speaker session by Prof. Snehal Mumbaikar introducing HTML, CSS, and JavaScript. Students gained a hands-on understanding of site structure, styling, and interactivity, building their own projects from scratch.',
    color: '#F472B6',
    icon: Globe,
    tags: ['HTML, CSS & JS', 'Speaker Session', 'Prof. Snehal M.'],
    photos: [
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779512784/IMG_5286_aqg3lc.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779512784/IMG_5266_fgwgj5.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779514556/IMG_5252_1_xfdpu4.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779512784/IMG_5253_jzkfmc.jpg',
      'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779512784/IMG_5255_zgkmwz.jpg',
    ],
    placeholders: ['#9d174d', '#be185d', '#db2777', '#831843', '#500724'],
  },
  {
    id: 'linux-workshop',
    num: '04',
    month: 'MAR',
    year: '2026',
    badge: 'WORKSHOP',
    title: 'Practical Linux & OS',
    desc: 'An expert-led session by Prof. Shubham Nerkar introducing Linux fundamentals and Operating System concepts. Students explored command-line tools, file and directory management, and practical shell automation.',
    color: '#818CF8',
    icon: Code,
    tags: ['CLI Commands', 'OS Basics', 'Prof. Shubham N.'],
    photos: [null, null, null, null, null],
    placeholders: ['#3730a3', '#4338ca', '#4f46e5', '#2e2687', '#1e1b4b'],
  },
];

const STATS = [
  { value: 25, suffix: '+', label: 'Active Members' },
  { value: 4, suffix: '', label: 'Events Hosted' },
  { value: 3, suffix: '+', label: 'Workshops Run' },
  { value: 100, suffix: '%', label: 'Free to Join' },
];

const PILLARS = [
  {
    icon: Target, title: 'Mission', subtitle: 'Purpose-driven', color: '#3B82F6', tag: 'CORE MISSION',
    desc: 'Bridge the gap between classroom theory and industry-level execution through real projects, hackathons, and mentorship.'
  },
  {
    icon: Rocket, title: 'Vision', subtitle: 'Future-focused', color: '#22D3EE', tag: 'LONG TERM',
    desc: "Create an environment where students don't just learn technology — they build with it, grow through it, and shape the future."
  },
  {
    icon: Sparkles, title: 'Values', subtitle: 'Culture-first', color: '#818CF8', tag: 'OUR DNA',
    desc: 'Curiosity, collaboration, and craftsmanship. Learning happens fastest when you build alongside others.'
  },
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

/* ─── Photo slot ─── */
function PhotoSlot({ src, bg, color, size = 'md', className = '' }) {
  const sizeMap = { lg: 28, md: 20, sm: 16 };
  const iconSize = sizeMap[size] || 20;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden group/slot rounded-xl sm:rounded-2xl border border-white/5 shadow-2xl transition-transform duration-700 hover:scale-[1.02] hover:z-10 ${className}`} style={{ background: bg }}>
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
      <div className="absolute inset-0 opacity-[0.1]" style={{ background: `linear-gradient(135deg, ${color} 0%, transparent 50%, ${color} 100%)` }} />
      <div className="absolute inset-0 bg-black/20 group-hover/slot:bg-transparent transition-colors duration-500 z-10" />

      {src ? (
        <img src={src} alt="" loading="lazy" onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover/slot:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
      ) : (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-2">
          <div className="rounded-xl p-3 opacity-50" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          {size !== 'sm' && <span className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-40 font-bold" style={{ color }}>Coming Soon</span>}
        </div>
      )}
    </div>
  );
}

/* ─── Storytelling Editorial Photo Cluster ─── */
function PhotoCluster({ event }) {
  const { photos, placeholders, color, num } = event;

  return (
    <div className="w-full relative group">
      {/* Cinematic back glow */}
      <div className="absolute inset-0 blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000 rounded-[3rem]" style={{ backgroundColor: color }} />

      {/* MOBILE Layout */}
      <div className="sm:hidden grid gap-2 relative z-10" style={{ gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: '140px 140px' }}>
        <div className="row-span-2 relative">
          <PhotoSlot src={photos[0]} bg={placeholders[0]} color={color} size="lg" className="w-full h-full" />
          <div className="absolute bottom-2 left-3 text-[50px] font-black leading-none select-none pointer-events-none opacity-[0.08]" style={{ color, fontFamily: '"Arial Black", Arial, sans-serif' }}>{num}</div>
        </div>
        <PhotoSlot src={photos[1]} bg={placeholders[1]} color={color} size="md" className="w-full h-full" />
        <PhotoSlot src={photos[2]} bg={placeholders[2]} color={color} size="md" className="w-full h-full" />
      </div>

      {/* DESKTOP Editorial Layout */}
      <div className="hidden sm:grid gap-3 relative z-10" style={{ gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '220px 180px' }}>
        <div className="row-span-2 relative transform transition-transform duration-700 hover:-translate-y-2">
          <PhotoSlot src={photos[0]} bg={placeholders[0]} color={color} size="lg" className="w-full h-full" />
          <div className="absolute bottom-4 left-5 text-[80px] font-black leading-none select-none pointer-events-none opacity-[0.08] z-20 drop-shadow-2xl" style={{ color, fontFamily: '"Arial Black", Arial, sans-serif' }}>{num}</div>
        </div>
        <div className="col-span-2 transform transition-transform duration-700 hover:-translate-y-2">
          <PhotoSlot src={photos[1]} bg={placeholders[1]} color={color} size="md" className="w-full h-full" />
        </div>
        <div className="transform transition-transform duration-700 hover:-translate-y-2">
          <PhotoSlot src={photos[2]} bg={placeholders[2]} color={color} size="sm" className="w-full h-full" />
        </div>
        <div className="transform transition-transform duration-700 hover:-translate-y-2">
          <PhotoSlot src={photos[3]} bg={placeholders[3]} color={color} size="sm" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useScrollAnimate();

  return (
    <div ref={ref} className="bg-[#050810] min-h-screen font-sans">
      
      <style>{`
        .clip-diagonal { clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%); }
        .clip-diagonal-rev { clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%); }
        .glass-panel {
          background: rgba(10, 14, 23, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          §1  CINEMATIC HERO & STATS
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-32 text-center overflow-hidden clip-diagonal z-10 bg-[#060910]">
        {/* Deep ambient backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] rounded-full blur-[250px] opacity-[0.05]" style={{ background: 'radial-gradient(circle, #22D3EE, #3B82F6)' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04]" style={{ backgroundColor: '#818CF8' }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
          
          {/* Badge */}
          <div data-animate="fade-up" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-xs font-mono font-bold mb-10 border border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22D3EE]" />
            <span className="text-cyan-300 tracking-wider">Est. 2025 · Bharati Vidyapeeth</span>
          </div>

          {/* Epic Headline */}
          <h1 data-animate="fade-up" data-delay="100" className="font-black font-display mb-8 leading-[1.0] tracking-tight text-white drop-shadow-2xl" style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}>
            We are<br /><span className="grad-text pr-2">Aignite.</span>
          </h1>

          <p data-animate="fade-up" data-delay="200" className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-sans font-medium text-slate-400 mb-20">
            A student-led AI & technology club built for students who want to <strong className="text-white">create, innovate, and lead.</strong> More than a club — a community of builders.
          </p>

          {/* Storytelling Stats Grid */}
          <div data-animate="fade-up" data-delay="300" className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block -translate-y-1/2 z-0" />
            
            {STATS.map((s, i) => (
              <div key={i} className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center relative z-10 group hover:-translate-y-2 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="text-4xl sm:text-5xl font-black font-display text-white mb-3 tracking-tight drop-shadow-lg">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold text-center">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §2  THE PILLARS (Ultra-Premium Editorial Layout)
      ══════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-40 bg-[#050810] z-20">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div data-animate="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-cyan-500" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">
                Our Foundation
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight text-white leading-none">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Core.</span>
            </h2>
          </div>
          <div data-animate="fade-up" data-delay="100" className="md:text-right max-w-sm">
            <p className="text-lg text-slate-400 font-sans leading-relaxed">
              We stripped away the noise to focus on three principles that dictate how we operate, build, and grow.
            </p>
          </div>
        </div>

        {/* Minimalist Brutalist Grid */}
        <div className="max-w-7xl mx-auto border-t border-b border-white/10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10 bg-[#050810]">
          {PILLARS.map((p, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 100} className="relative p-10 md:p-14 lg:p-16 flex flex-col group overflow-hidden transition-colors duration-700 hover:bg-white/[0.02]">
              
              {/* Massive background number */}
              <div className="absolute -top-10 -right-6 text-[12rem] font-black font-display leading-none select-none pointer-events-none transition-all duration-700 opacity-[0.02] group-hover:opacity-[0.05] group-hover:-translate-y-4" style={{ color: p.color }}>
                0{i + 1}
              </div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-0 h-1 transition-all duration-700 group-hover:w-full" style={{ backgroundColor: p.color }} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-slate-300">
                    {p.title}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black font-display text-white mb-6 leading-tight">
                  {p.subtitle}.
                </h3>
                
                <p className="text-base text-slate-400 font-sans leading-relaxed mt-auto">
                  {p.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          §3  EVENTS (Cinematic Story Timeline)
      ══════════════════════════════════════════════ */}
      <section className="relative px-6 py-32 bg-[#060910] clip-diagonal-rev z-30">
        
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.03]" style={{ backgroundColor: '#3B82F6' }} />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.03]" style={{ backgroundColor: '#F472B6' }} />
        </div>

        <div className="max-w-6xl mx-auto relative pt-10">
          
          <div className="mb-24 md:mb-32 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div data-animate="fade-up" className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-gradient-to-r from-cyan-500/50 to-transparent hidden md:block" />
                <p className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-cyan-400">{'// season_2025_26'}</p>
              </div>
              <h2 data-animate="fade-up" data-delay="100" className="text-4xl md:text-5xl lg:text-7xl font-black font-display tracking-tight text-white leading-tight">
                What we've <span className="grad-text">done.</span>
              </h2>
            </div>
            <p data-animate="fade-up" data-delay="200" className="text-lg text-slate-400 max-w-sm leading-relaxed md:text-right font-sans">
              Real events. Real students. Real skills built from scratch.
            </p>
          </div>

          <div className="flex flex-col gap-32 md:gap-48">
            {EVENTS.map((ev, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={ev.id} data-animate="fade-up" data-delay={i * 100} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 relative`}>
                  
                  {/* Visual Cluster */}
                  <div className="w-full lg:w-[55%] flex-shrink-0 relative z-10">
                    <PhotoCluster event={ev} />
                  </div>

                  {/* Story Text */}
                  <div className="w-full lg:flex-1 flex flex-col justify-center relative z-20">
                    
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `${ev.color}15`, border: `2px solid ${ev.color}40` }}>
                        <span className="text-2xl font-black font-display leading-none" style={{ color: ev.color }}>{ev.num}</span>
                      </div>
                      <div>
                        <span className="inline-block text-[10px] font-black font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-md mb-1" style={{ color: ev.color, background: `${ev.color}15`, border: `1px solid ${ev.color}30` }}>
                          {ev.badge}
                        </span>
                        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{ev.month} {ev.year}</div>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-white mb-6 leading-tight drop-shadow-md">
                      {ev.title}
                    </h3>

                    <div className="w-16 h-1.5 rounded-full mb-8 shadow-[0_0_15px_currentColor]" style={{ backgroundColor: ev.color, color: ev.color }} />

                    <p className="text-lg md:text-xl leading-relaxed text-slate-400 mb-10 font-sans">
                      {ev.desc}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {ev.tags.map((t, j) => (
                        <span key={j} className="text-xs font-mono px-4 py-2 rounded-lg font-bold shadow-sm" style={{ color: ev.color, background: `${ev.color}10`, border: `1px solid ${ev.color}25` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>

          <div data-animate="fade-up" className="mt-32 text-center pb-10">
            <p className="text-sm font-mono font-bold text-slate-500 tracking-[0.1em]">
              // More events, hackathons & sessions coming in 2026.
            </p>
          </div>
        </div>
      </section>



    </div>
  );
}
