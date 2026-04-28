import React, { useEffect, useRef } from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap, ChevronRight, Star, Trophy, Rocket } from '../Icons';
import logo from '../assets/logo.png';
import useScrollAnimate from '../hooks/useScrollAnimate';
import HeroRobot from '../components/HeroRobot';

const STATS = [
  { value: '120+', label: 'Active Members', icon: Users },
  { value: '25+',  label: 'Events Hosted',  icon: Zap },
  { value: '10+',  label: 'Projects Built', icon: Code },
  { value: '2025', label: 'Year Founded',   icon: Sparkles },
];

const DOMAINS = [
  { icon: Brain, title: 'AI & Machine Learning', desc: 'Deep learning, NLP, computer vision and generative AI research & projects.', tag: 'Core' },
  { icon: Globe, title: 'Web Development', desc: 'Full-stack development with React, Next.js, Node.js, and modern architectures.', tag: 'Build' },
  { icon: Cpu,   title: 'App Development', desc: 'Native and cross-platform mobile apps with Flutter, React Native, and Swift.', tag: 'Ship' },
  { icon: Code,  title: 'Open Source & DevOps', desc: 'Contributing to OSS, building dev tools, CI/CD pipelines, and cloud infra.', tag: 'Scale' },
];

const HIGHLIGHTS = [
  { icon: Trophy, title: 'Neural Hack 1.0', desc: '120+ students competed in our flagship AI hackathon — 24 hours, real problems, real solutions.', stat: '120+ Participants' },
  { icon: Rocket, title: 'Industry Mentorship', desc: 'Direct mentorship from professionals at Google, Microsoft, and top startups.', stat: '10+ Mentors' },
  { icon: Star,   title: 'Community First', desc: 'Weekly meetups, study groups, project squads — nobody learns alone at Aignite.', stat: 'Every Week' },
];

export default function Home({ go }) {
  const ref = useScrollAnimate();
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.querySelectorAll('[data-speed]').forEach(el => {
        el.style.transform = `translateY(${scrollY * parseFloat(el.dataset.speed)}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref}>
      {/* ─── HERO ─── */}
      <section ref={parallaxRef} className="relative min-h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 scanline"></div>
        <div className="absolute top-10 left-[5%] w-[500px] h-[500px] rounded-full blur-[160px] animate-pulse-glow pointer-events-none" style={{ backgroundColor: 'rgba(59,130,246,0.05)' }}></div>
        <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] rounded-full blur-[140px] animate-pulse-glow pointer-events-none" style={{ backgroundColor: 'rgba(34,211,238,0.03)', animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <div data-speed="-0.05" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold mb-8 text-muted" data-animate="fade-right">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#3B82F6' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#3B82F6' }}></span>
              </span>
              Bharati Vidyapeeth Deemed University
            </div>

            <h1 data-speed="-0.03" data-animate="fade-up" data-delay="100" className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black font-display tracking-tight leading-[1.05] mb-6 text-offwhite">
              Where<br /><span className="grad-text">Innovation</span><br />Meets Intelligence
            </h1>

            <p data-speed="-0.02" data-animate="fade-up" data-delay="250" className="text-lg md:text-xl max-w-lg mb-10 leading-relaxed text-muted">
              The official AI & Tech club of BVDU — empowering 120+ students to build, ship, and innovate.
            </p>

            <div data-speed="-0.01" className="flex flex-col sm:flex-row gap-4 mb-12" data-animate="fade-up" data-delay="400">
              <a href="https://forms.google.com" target="_blank" rel="noreferrer"
                className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base overflow-hidden transition-all hover:scale-[1.03] active:scale-[0.98] text-white"
                style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 30px rgba(59,130,246,0.3)' }}>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <span className="relative z-10 flex items-center gap-2">Join Aignite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </a>
              <button onClick={() => go('about')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass font-bold text-base text-offwhite hover:bg-white/[0.04] transition-all glow-border">
                <Sparkles size={18} style={{ color: '#22D3EE' }} /> Explore
              </button>
            </div>

            <div className="flex flex-wrap gap-3" data-animate="fade-up" data-delay="550">
              {[{ v: '120+', l: 'Members' }, { v: '25+', l: 'Events' }, { v: '10+', l: 'Projects' }].map((s, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ backgroundColor: 'rgba(15,23,42,0.6)', border: '1px solid rgba(59,130,246,0.08)' }}>
                  <span className="font-black font-display" style={{ color: '#3B82F6' }}>{s.v}</span>
                  <span className="text-muted">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end" data-animate="zoom-in">
            <HeroRobot />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" data-animate="fade-up" data-delay="800">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5" style={{ borderColor: 'rgba(59,130,246,0.2)' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#3B82F6', animation: 'scroll-dot 2s ease-in-out infinite' }}></div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-6 px-6" style={{ borderTop: '1px solid rgba(59,130,246,0.06)', borderBottom: '1px solid rgba(59,130,246,0.06)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6" data-animate="stagger-up">
          {STATS.map((s, i) => (
            <div key={i} data-stagger-child className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.06)' }}>
                <s.icon size={20} style={{ color: '#3B82F6' }} />
              </div>
              <div>
                <div className="text-2xl font-black font-display text-offwhite">{s.value}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DOMAINS ─── */}
      <section className="py-28 px-6 relative dot-grid">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-xl mb-16" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#60A5FA' }}>What We Do</p>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-4 text-offwhite">
              Four verticals.<br /><span className="grad-text">Infinite possibilities.</span>
            </h2>
            <p className="text-base leading-relaxed text-muted">Every domain is a launchpad. Pick one, or master all four.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DOMAINS.map((d, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="group rounded-3xl p-7 hover:-translate-y-1 transition-all duration-400 glow-border cursor-default"
                style={{ backgroundColor: 'rgba(15,23,42,0.5)', border: '1px solid rgba(59,130,246,0.06)' }}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: '#0F172A', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <d.icon size={24} style={{ color: '#60A5FA' }} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold font-display text-offwhite">{d.title}</h3>
                      <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-md uppercase tracking-wider"
                        style={{ backgroundColor: 'rgba(59,130,246,0.08)', color: '#3B82F6' }}>{d.tag}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-animate="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#60A5FA' }}>Why Aignite</p>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-offwhite">
              Not just a club.<br /><span className="grad-text">A launchpad.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 120} className="relative rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                style={{ backgroundColor: 'rgba(15,23,42,0.4)', border: '1px solid rgba(59,130,246,0.06)' }}>
                <div className="absolute top-4 right-4 text-[4rem] font-black font-display leading-none select-none" style={{ color: 'rgba(59,130,246,0.04)' }}>0{i + 1}</div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}>
                    <h.icon size={22} style={{ color: '#22D3EE' }} />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-3 text-offwhite">{h.title}</h3>
                  <p className="text-sm leading-relaxed mb-5 text-muted">{h.desc}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono"
                    style={{ backgroundColor: 'rgba(59,130,246,0.06)', color: '#3B82F6' }}>{h.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="py-5 overflow-hidden" style={{ borderTop: '1px solid rgba(59,130,246,0.06)', borderBottom: '1px solid rgba(59,130,246,0.06)' }}>
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-8 px-4">
              {['AI/ML', 'DEEP LEARNING', 'REACT', 'FLUTTER', 'DEVOPS', 'NLP', 'COMPUTER VISION', 'OPEN SOURCE', 'HACKATHONS', 'WORKSHOPS'].map((t, i) => (
                <span key={i} className="flex items-center gap-3 text-sm font-bold font-mono tracking-widest" style={{ color: 'rgba(59,130,246,0.12)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(59,130,246,0.15)' }}></span>{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── BRAND ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center" data-animate="fade-up">
          <div className="animate-float mb-6 inline-block">
            <div className="relative w-24 h-24 rounded-[1.5rem] p-[2px]" style={{ background: 'linear-gradient(135deg, #3B82F6, #22D3EE)', boxShadow: '0 0 50px rgba(59,130,246,0.2)' }}>
              <div className="w-full h-full bg-deep rounded-[calc(1.5rem-2px)] flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Aignite" className="w-16 h-16 object-contain" style={{ filter: 'drop-shadow(0 0 15px rgba(59,130,246,0.3))' }} />
              </div>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight mb-4 text-offwhite">
            Built by students.<br />Driven by <span className="grad-text">curiosity</span>.
          </h2>
          <p className="text-base leading-relaxed max-w-lg mx-auto mb-8 text-muted">
            We're not waiting to graduate to start building. Every line of code, every workshop, every hack session brings us closer.
          </p>
          <button onClick={() => go('team')} className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:gap-3" style={{ color: '#3B82F6' }}>
            Meet the team <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <style>{`
        @keyframes scroll-dot { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(8px); opacity: 0.3; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
