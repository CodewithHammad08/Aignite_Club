import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap, ChevronRight, Star, Trophy, Rocket } from '../Icons';
import logo from '../assets/logo.png';
import useScrollAnimate from '../hooks/useScrollAnimate';
import HeroRobot from '../components/HeroRobot';

/* ─── Animated counter ─── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        if (isNaN(num)) { setCount(target); return; }
        const s = performance.now();
        const tick = (now) => {
          const t = Math.min((now - s) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - t, 3)) * num));
          if (t < 1) requestAnimationFrame(tick); else setCount(num);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [ref, typeof target === 'string' && target.includes('+') ? count + '+' : count];
}

/* ─── Interactive particle canvas ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf, time = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => { canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize(); window.addEventListener('resize', resize);

    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 0.8 + Math.random() * 2,
      pulse: Math.random() * Math.PI * 2,
    }));

    let mx = -999, my = -999;
    const onM = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onM);

    const draw = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // Mouse repulsion
        const dx = p.x - mx, dy = p.y - my, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) { p.x += (dx / dist) * 2; p.y += (dy / dist) * 2; }

        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + p.pulse);
        // Glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, `rgba(59,130,246,${0.08 * pulse})`);
        g.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        // Dot
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${0.2 + 0.2 * pulse})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.sqrt((pts[i].x - pts[j].x) ** 2 + (pts[i].y - pts[j].y) ** 2);
          if (d < 140) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - d / 140) * 0.08})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
        // Mouse lines — brighter
        const md = Math.sqrt((pts[i].x - mx) ** 2 + (pts[i].y - my) ** 2);
        if (md < 200) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(34,211,238,${(1 - md / 200) * 0.2})`;
          ctx.lineWidth = 0.8; ctx.stroke();
        }
      }

      // Mouse glow
      if (mx > 0) {
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        mg.addColorStop(0, 'rgba(34,211,238,0.06)');
        mg.addColorStop(1, 'rgba(34,211,238,0)');
        ctx.beginPath(); ctx.arc(mx, my, 80, 0, Math.PI * 2); ctx.fillStyle = mg; ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onM); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

/* ─── Data ─── */
const STATS = [
  { value: '120+', label: 'Active Members', icon: Users },
  { value: '25+',  label: 'Events Hosted',  icon: Zap },
  { value: '10+',  label: 'Projects Built', icon: Code },
  { value: '2025', label: 'Year Founded',   icon: Sparkles },
];

const DOMAINS = [
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Deep learning, NLP, computer vision and generative AI.', tag: 'Core', accent: '#3B82F6', glow: 'rgba(59,130,246,0.15)' },
  { icon: Globe, title: 'Web Development', desc: 'Full-stack with React, Next.js, and modern architectures.', tag: 'Build', accent: '#22D3EE', glow: 'rgba(34,211,238,0.12)' },
  { icon: Cpu,   title: 'App Development', desc: 'Cross-platform apps with Flutter and React Native.', tag: 'Ship', accent: '#818CF8', glow: 'rgba(129,140,248,0.12)' },
  { icon: Code,  title: 'Open Source & DevOps', desc: 'OSS contributions, CI/CD pipelines, cloud infra.', tag: 'Scale', accent: '#34D399', glow: 'rgba(52,211,153,0.12)' },
];

const HIGHLIGHTS = [
  { icon: Trophy, title: 'Neural Hack 1.0', desc: '120+ students competed in our flagship 24-hour AI hackathon — real problems, real solutions.', stat: '120+ Participants', accent: '#3B82F6' },
  { icon: Rocket, title: 'Industry Mentors', desc: 'Direct mentorship from professionals at Google, Microsoft, and top startups.', stat: '10+ Mentors', accent: '#22D3EE' },
  { icon: Star,   title: 'Community First', desc: 'Weekly meetups, study groups, project squads — nobody learns alone at Aignite.', stat: 'Every Week', accent: '#818CF8' },
];

export default function Home({ go }) {
  const ref = useScrollAnimate();
  const parallaxRef = useRef(null);

  useEffect(() => {
    const fn = () => {
      if (!parallaxRef.current) return;
      const y = window.scrollY;
      parallaxRef.current.querySelectorAll('[data-speed]').forEach(el => {
        el.style.transform = `translateY(${y * parseFloat(el.dataset.speed)}px)`;
      });
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div ref={ref}>
      {/* ═══════ HERO ═══════ */}
      <section ref={parallaxRef} className="relative min-h-screen flex items-center px-6 overflow-hidden">
        <ParticleField />
        <div className="absolute inset-0 scanline"></div>
        {/* Bottom fade to create depth between hero and next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060910] to-transparent pointer-events-none z-[2]"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          {/* Left */}
          <div className="order-2 lg:order-1">
            <div data-speed="-0.04" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold mb-8 text-muted" data-animate="fade-right">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#3B82F6' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#3B82F6' }}></span>
              </span>
              Bharati Vidyapeeth Deemed University
            </div>

            <h1 data-speed="-0.025" data-animate="fade-up" data-delay="100" className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black font-display tracking-tight leading-[1.05] mb-6" style={{ color: '#E5E7EB' }}>
              Where<br /><span className="grad-text">Innovation</span><br />Meets Intelligence
            </h1>

            <p data-speed="-0.015" data-animate="fade-up" data-delay="250" className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed text-muted">
              The official AI & Tech club of BVDU — empowering 120+ students to build, ship, and innovate.
            </p>

            <div data-speed="-0.01" className="flex flex-col sm:flex-row gap-4 mb-10" data-animate="fade-up" data-delay="400">
              <a href="https://forms.google.com" target="_blank" rel="noreferrer"
                className="btn-glow group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white"
                style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"></div>
                <span className="relative z-10 flex items-center gap-2">Join Aignite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </a>
              <button onClick={() => go('about')} className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass font-bold text-base glow-border" style={{ color: '#E5E7EB' }}>
                <Sparkles size={18} style={{ color: '#22D3EE' }} /> Explore
              </button>
            </div>

            <div data-animate="fade-up" data-delay="600" className="flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs bg-level-2" style={{ border: '1px solid rgba(59,130,246,0.1)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE' }}></span>
              <span className="text-muted">$</span>
              <span style={{ color: '#E5E7EB' }}>building the future</span>
              <span className="w-[2px] h-4 animate-pulse" style={{ backgroundColor: '#3B82F6' }}></span>
            </div>
          </div>

          {/* Right: Robot + tech pills */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end" data-animate="zoom-in">
            <HeroRobot />
            {[
              { label: 'TensorFlow', color: '#FF6F00', top: '8%', right: '5%', delay: '0s' },
              { label: 'PyTorch', color: '#EE4C2C', bottom: '22%', left: '3%', delay: '1.5s' },
              { label: 'React', color: '#61DAFB', top: '38%', left: '-2%', delay: '0.8s' },
              { label: 'Node.js', color: '#68A063', bottom: '8%', right: '8%', delay: '2.2s' },
            ].map((pill, i) => (
              <div key={i} className="absolute px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold animate-float depth-card"
                style={{ color: pill.color, animationDelay: pill.delay, top: pill.top, bottom: pill.bottom, left: pill.left, right: pill.right, borderColor: `${pill.color}20` }}>
                {pill.label}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" data-animate="fade-up" data-delay="900">
          <span className="text-[10px] font-bold font-mono uppercase tracking-[0.3em] text-muted">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: 'rgba(59,130,246,0.2)' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#3B82F6', animation: 'scrollDot 2s ease-in-out infinite' }}></div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="relative py-12 px-6 bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5" data-animate="stagger-up">
          {STATS.map((s, i) => {
            const [cRef, display] = useCounter(s.value);
            return (
              <div key={i} ref={cRef} data-stagger-child className="depth-card rounded-2xl px-6 py-6 text-center cursor-default group">
                <div className="icon-box w-12 h-12 mx-auto mb-3">
                  <s.icon size={20} style={{ color: '#3B82F6' }} />
                </div>
                <div className="text-3xl font-black font-display mb-1" style={{ color: '#E5E7EB' }}>{display}</div>
                <div className="text-[10px] font-bold font-mono uppercase tracking-widest text-muted">{s.label}</div>
              </div>
            );
          })}
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0"></div>
      </section>

      {/* ═══════ DOMAINS — each card has unique accent ═══════ */}
      <section className="py-28 px-6 relative dot-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16" data-animate="fade-up">
            <div className="max-w-xl">
              <p className="text-xs font-bold font-mono uppercase tracking-[0.3em] mb-3" style={{ color: '#60A5FA' }}>&lt;verticals /&gt;</p>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight" style={{ color: '#E5E7EB' }}>
                Four domains.<br /><span className="grad-text">Infinite impact.</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted max-w-xs">Every domain is a launchpad. Pick one, or master all four.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DOMAINS.map((d, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 120}
                className="group depth-card rounded-3xl p-7 cursor-default relative overflow-hidden">
                {/* Unique gradient glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${d.glow}, transparent 60%)` }}></div>
                {/* Accent top line */}
                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, ${d.accent}, transparent)` }}></div>

                <div className="flex items-start gap-5 relative z-10">
                  <div className="icon-box flex-shrink-0 w-14 h-14 shadow-xl">
                    <d.icon size={24} style={{ color: d.accent }} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold font-display group-hover:text-white transition-colors" style={{ color: '#E5E7EB' }}>{d.title}</h3>
                      <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-md uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                        style={{ backgroundColor: `${d.accent}12`, color: d.accent, border: `1px solid ${d.accent}25` }}>{d.tag}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{d.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
                      style={{ color: d.accent }}>
                      Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHY AIGNITE — STRONG HIGHLIGHT SECTION ═══════ */}
      <section className="py-28 px-6 relative overflow-hidden bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        {/* Background glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(59,130,246,0.05)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(34,211,238,0.04)', animationDelay: '2s' }}></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-animate="fade-up">
            <p className="text-xs font-bold font-mono uppercase tracking-[0.3em] mb-3" style={{ color: '#60A5FA' }}>{'// why_aignite'}</p>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight" style={{ color: '#E5E7EB' }}>
              Not just a club.<br /><span className="grad-text">A launchpad.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 150}
                className="relative depth-card rounded-3xl p-8 group overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${h.accent}15, transparent 70%)` }}></div>
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(to right, transparent, ${h.accent}, transparent)` }}></div>

                {/* BIG glowing number */}
                <div className="absolute top-2 right-4 text-[6rem] font-black font-display leading-none select-none transition-all duration-500 group-hover:scale-110"
                  style={{ color: 'transparent', WebkitTextStroke: `1px ${h.accent}15`, filter: 'drop-shadow(0 0 0px transparent)' }}>
                  0{i + 1}
                </div>
                <div className="absolute top-2 right-4 text-[6rem] font-black font-display leading-none select-none opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  style={{ color: 'transparent', WebkitTextStroke: `1px ${h.accent}40`, filter: `drop-shadow(0 0 20px ${h.accent}30)` }}>
                  0{i + 1}
                </div>

                <div className="relative z-10">
                  <div className="icon-box w-14 h-14 mb-6">
                    <h.icon size={24} style={{ color: h.accent }} />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 group-hover:text-white transition-colors" style={{ color: '#E5E7EB' }}>{h.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 text-muted">{h.desc}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold font-mono group-hover:scale-105 transition-all"
                    style={{ background: `linear-gradient(135deg, ${h.accent}10, ${h.accent}05)`, color: h.accent, border: `1px solid ${h.accent}20`, boxShadow: `0 0 0px ${h.accent}00` }}>
                    {h.stat}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0"></div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-5 overflow-hidden">
        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-8 px-4">
              {['AI/ML', 'DEEP LEARNING', 'REACT', 'FLUTTER', 'DEVOPS', 'NLP', 'COMPUTER VISION', 'OPEN SOURCE', 'HACKATHONS', 'WORKSHOPS', 'GEN AI', 'CLOUD'].map((t, i) => (
                <span key={i} className="flex items-center gap-3 text-sm font-bold font-mono tracking-widest" style={{ color: 'rgba(59,130,246,0.08)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}></span>{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ BRAND ═══════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center" data-animate="fade-up">
          <div className="animate-float mb-6 inline-block">
            <div className="relative w-24 h-24 rounded-[1.5rem] p-[2px] group cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', boxShadow: '0 0 50px rgba(59,130,246,0.2)' }}>
              <div className="w-full h-full rounded-[calc(1.5rem-2px)] flex items-center justify-center overflow-hidden bg-level-2 group-hover:bg-level-3 transition-colors duration-300">
                <img src={logo} alt="Aignite" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" style={{ filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.3))' }} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight mb-4" style={{ color: '#E5E7EB' }}>
            Built by students.<br />Driven by <span className="grad-text">curiosity</span>.
          </h2>
          <p className="text-base leading-relaxed max-w-lg mx-auto mb-8 text-muted">
            We're not waiting to graduate. Every line of code brings us closer to the engineers we want to become.
          </p>
          <button onClick={() => go('team')} className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3 group" style={{ color: '#3B82F6' }}>
            Meet the team <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scrollDot { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(8px); opacity: 0.3; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
