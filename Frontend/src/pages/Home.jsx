import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Brain, Code, Cpu, Globe, Sparkles, Users, Zap, ChevronRight, Star, Trophy, Rocket, Target, Github } from '../Icons';
import logo from '../assets/logo.png';
import useScrollAnimate from '../hooks/useScrollAnimate';
import HeroTerminal from '../components/HeroTerminal';

/* ─── Developer Workspace Component ─── */
const DeveloperWorkspace = () => {
  const [activeTab, setActiveTab] = useState('Active Projects');
  const tabs = ['Active Projects', 'Good First Issues', 'Project Ideas'];

  return (
    <section className="py-28 px-6 relative overflow-hidden bg-[#060910]">
      {/* Vercel/Linear style minimal background: subtle grid (Opacity reduced to 20%) */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060910] via-transparent to-[#060910] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12" data-animate="fade-up">
          <h2 className="text-4xl md:text-5xl font-semibold font-display tracking-tight text-white mb-4">
            Build with AIgnite
          </h2>
          <p className="text-base md:text-lg text-slate-400 font-sans leading-relaxed max-w-2xl mb-8">
            Collaborate on real projects, contribute to open source, and learn by building alongside fellow students.
          </p>

          {/* Impact Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-y border-white/5 py-4 mb-8">
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">4</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Active Projects</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">12</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Contributors</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">8</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Good First Issues</span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-white">15</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Pull Requests</span>
            </div>
          </div>

          {/* CTA & Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p className="text-sm text-slate-400">
              <span className="text-white font-medium">New to open source?</span> Start with a Good First Issue.
            </p>
            
            <div className="flex items-center gap-1 sm:gap-2 bg-[#0a0e17] p-1.5 rounded-lg border border-white/10 self-start lg:self-auto overflow-x-auto max-w-full">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 whitespace-nowrap ${activeTab === tab ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[500px]">
          {/* Active Projects Tab */}
          {activeTab === 'Active Projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Featured Project */}
              <div className="lg:col-span-2 bg-[#0a0e17] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col hover:border-white/20 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
                  {/* Left Column: Core Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                            <Github size={20} className="text-slate-200" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white">AIgnite Website</h3>
                            <p className="text-xs text-slate-500 font-mono mt-1">Frontend</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 mb-8">
                        <p className="text-slate-200 text-lg font-medium">Official website powering AIgnite.</p>
                        <ul className="text-slate-400 space-y-2 text-sm">
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Built by students.</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Open for contributions.</li>
                          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Designed with a reusable component system.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 lg:mb-0">
                       <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                          <p className="text-xs text-slate-500 font-mono mb-1">Open Issues</p>
                          <p className="text-xl font-semibold text-white">8</p>
                       </div>
                       <div className="bg-white/5 border border-white/5 rounded-lg p-4">
                          <p className="text-xs text-slate-500 font-mono mb-1">Contributors</p>
                          <p className="text-xl font-semibold text-white">12</p>
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Meta & Action */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {['React', 'Tailwind v4', 'Vite', 'Node.js'].map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300 font-mono">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-8">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Maintainers</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0a0e17] flex items-center justify-center text-xs text-slate-400 font-semibold">JD</div>
                            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0a0e17] flex items-center justify-center text-xs text-slate-400 font-semibold">AS</div>
                            <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-[#0a0e17] flex items-center justify-center text-xs text-slate-400 font-semibold">+3</div>
                          </div>
                          <span className="text-xs text-slate-500 ml-2">Active now</span>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent Activity</p>
                        <div className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <p className="text-slate-400 leading-tight">Merged PR <span className="text-blue-400 font-mono">#42</span> - Improve responsive navigation.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Globe size={14} /> Synced with GitHub
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Code size={14} /> Last updated yesterday
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors">
                          View Repository
                        </button>
                        <button className="flex-1 px-4 py-2.5 rounded-lg bg-white text-black hover:bg-slate-200 text-sm font-semibold transition-colors">
                          Contribute
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Projects Grid */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                {[
                  { name: 'Workshop Resources', category: '12 notebooks', stack: 'Python • Jupyter', status: 'Updated 3 days ago' },
                  { name: 'Discord Bot Core', category: '3 active modules', stack: 'TypeScript • Node', status: 'Updated yesterday' },
                  { name: 'ML Starter Kits', category: '5 starter templates', stack: 'TensorFlow • Pandas', status: 'Updated last week' }
                ].map(project => (
                  <div key={project.name} className="bg-[#0a0e17] border border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-[#0c111c] transition-colors group cursor-pointer flex flex-col justify-between h-full min-h-[140px]">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">{project.name}</h4>
                        <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors group-hover:translate-x-1" />
                      </div>
                      <p className="text-sm text-slate-400 mb-4">{project.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xs text-slate-500 font-mono">{project.stack}</span>
                      <span className="text-xs text-slate-500">{project.status}</span>
                    </div>
                  </div>
                ))}
                
                {/* View all card */}
                <div className="bg-transparent border border-dashed border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center h-full min-h-[80px]">
                  <span className="text-sm font-medium text-slate-400">View all repositories →</span>
                </div>
              </div>
            </div>
          )}

          {/* Good First Issues Tab */}
          {activeTab === 'Good First Issues' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {[
                { title: "Improve UI Responsiveness", repo: "AIgnite Website", tags: ["Frontend", "CSS"], difficulty: "Beginner" },
                { title: "Fix Authentication Bug", repo: "Discord Bot Core", tags: ["Backend", "Auth"], difficulty: "Intermediate" },
                { title: "Update README Examples", repo: "Workshop Resources", tags: ["Documentation"], difficulty: "Beginner" },
                { title: "Add Dark Mode Toggle", repo: "AIgnite Website", tags: ["Frontend", "React"], difficulty: "Beginner" },
                { title: "Optimize Image Loading", repo: "AIgnite Website", tags: ["Performance"], difficulty: "Intermediate" },
                { title: "Refactor API Routes", repo: "Student Dashboard", tags: ["Backend", "Node"], difficulty: "Advanced" },
                { title: "Improve Keyboard Navigation", repo: "AIgnite Website", tags: ["Accessibility"], difficulty: "Beginner" },
                { title: "Write Unit Tests", repo: "ML Starter Kits", tags: ["Testing", "Python"], difficulty: "Intermediate" },
              ].map((issue, idx) => (
                <div key={idx} className="bg-[#0a0e17] border border-white/10 rounded-xl p-5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] transition-all group cursor-pointer flex flex-col justify-between min-h-[160px]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={14} className="text-emerald-400" />
                      <span className="text-xs text-slate-500 font-mono truncate">{issue.repo}</span>
                    </div>
                    <h4 className="text-sm font-medium text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">{issue.title}</h4>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex gap-2">
                      {issue.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-slate-400 border border-white/5">{tag}</span>
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">{issue.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Ideas Tab */}
          {activeTab === 'Project Ideas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {[
                { title: "AI Resume Analyzer", desc: "A tool to help students optimize their resumes for ATS systems using NLP and local LLMs.", category: "Machine Learning" },
                { title: "Smart Campus Navigation", desc: "An AR-based or interactive map application to help freshers find labs and classrooms easily.", category: "Mobile / Web" },
                { title: "Automated Attendance System", desc: "Using computer vision to streamline attendance during large club workshops and events.", category: "Computer Vision" },
                { title: "Open Source CMS for Clubs", desc: "A reusable headless CMS template tailored specifically for university technical clubs.", category: "Full-Stack" },
                { title: "AI Study Buddy Chatbot", desc: "A Discord bot trained on university syllabi to help students find study materials quickly.", category: "NLP / Bots" },
                { title: "Resource Hub Platform", desc: "A centralized platform to share and rate technical resources, roadmaps, and tutorials.", category: "Frontend" }
              ].map((idea, idx) => (
                <div key={idx} className="bg-[#0a0e17] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group flex flex-col h-full">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-5">
                    <Sparkles size={18} className="text-indigo-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{idea.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
                    {idea.desc}
                  </p>
                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                      {idea.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

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
    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Pre-render glow dots on offscreen canvases for extreme performance
    const cyanGlow = document.createElement('canvas');
    cyanGlow.width = 30;
    cyanGlow.height = 30;
    const cCtx = cyanGlow.getContext('2d');
    const cGrad = cCtx.createRadialGradient(15, 15, 0, 15, 15, 15);
    cGrad.addColorStop(0, 'rgba(34,211,238,0.22)');
    cGrad.addColorStop(1, 'rgba(34,211,238,0)');
    cCtx.fillStyle = cGrad;
    cCtx.beginPath(); cCtx.arc(15, 15, 15, 0, Math.PI * 2); cCtx.fill();

    const blueGlow = document.createElement('canvas');
    blueGlow.width = 30;
    blueGlow.height = 30;
    const bCtx = blueGlow.getContext('2d');
    const bGrad = bCtx.createRadialGradient(15, 15, 0, 15, 15, 15);
    bGrad.addColorStop(0, 'rgba(59,130,246,0.22)');
    bGrad.addColorStop(1, 'rgba(59,130,246,0)');
    bCtx.fillStyle = bGrad;
    bCtx.beginPath(); bCtx.arc(15, 15, 15, 0, Math.PI * 2); bCtx.fill();

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 1 + Math.random() * 1.5,
      hue: Math.random() > 0.5 ? 200 : 220, // cyan vs blue
    }));

    let mx = -999, my = -999;
    const onM = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onM);

    const CONN_DIST = 140;
    const MOUSE_DIST = 200;

    const draw = () => {
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const targetParallaxX = mx !== -999 ? (mx - w / 2) * -0.03 : 0;
      const targetParallaxY = my !== -999 ? (my - h / 2) * -0.03 : 0;

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mx, dy = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 160 * 160 && dist2 > 0) {
          const dist = Math.sqrt(dist2);
          p.x += (dx / dist) * 1.2;
          p.y += (dy / dist) * 1.2;
        }
      }

      // Draw the pre-rendered glowing halos
      for (const p of pts) {
        const px = p.x + targetParallaxX;
        const py = p.y + targetParallaxY;
        const glowImg = p.hue === 200 ? cyanGlow : blueGlow;
        ctx.drawImage(glowImg, px - 15, py - 15, 30, 30);
      }

      // Draw connections in a single fast batched call
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(34,211,238,0.05)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONN_DIST * CONN_DIST) {
            ctx.moveTo(pts[i].x + targetParallaxX, pts[i].y + targetParallaxY);
            ctx.lineTo(pts[j].x + targetParallaxX, pts[j].y + targetParallaxY);
          }
        }
      }
      ctx.stroke();

      // Draw mouse lines in a single fast batched call
      if (mx !== -999 && mx > 0) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(34,211,238,0.1)';
        ctx.lineWidth = 0.8;
        for (const p of pts) {
          const px = p.x + targetParallaxX;
          const py = p.y + targetParallaxY;
          const dx = px - mx, dy = py - my;
          if (dx * dx + dy * dy < MOUSE_DIST * MOUSE_DIST) {
            ctx.moveTo(px, py);
            ctx.lineTo(mx, my);
          }
        }
        ctx.stroke();
      }

      // Draw center solid dots
      for (const p of pts) {
        const px = p.x + targetParallaxX;
        const py = p.y + targetParallaxY;
        ctx.fillStyle = p.hue === 200 ? 'rgba(34,211,238,0.5)' : 'rgba(59,130,246,0.5)';
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onM);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

/* ─── Typewriter hook ─── */
function useTypewriter(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) {
      const t = setTimeout(() => { setDeleting(true); setWaiting(false); }, pause);
      return () => clearTimeout(t);
    }
    const current = words[wordIdx];
    if (!deleting) {
      if (charIdx < current.length) {
        const t = setTimeout(() => { setText(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, speed);
        return () => clearTimeout(t);
      } else {
        setWaiting(true);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => { setText(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, speed / 2);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }
  }, [charIdx, deleting, waiting, wordIdx, words, speed, pause]);

  return text;
}

/* ─── Data ─── */
const STATS = [
  { value: '25+', label: 'Active Members', icon: Users, accent: '#22D3EE' },
  { value: '4+', label: 'Events Hosted', icon: Zap, accent: '#818CF8' },
  { value: '2025', label: 'Year Founded', icon: Sparkles, accent: '#34D399' },
];

const DOMAINS = [
  { icon: Brain, title: 'Machine Learning & Deep Learning', desc: 'The mathematical foundations of modern AI. Implementing neural networks, training deep models, optimization algorithms, and advanced predictive analysis from scratch.', tag: 'Core', accent: '#3B82F6', glow: 'rgba(59,130,246,0.18)' },
  { icon: Sparkles, title: 'Natural Language Processing & GenAI', desc: 'Unlocking the power of language and creative AI. Building custom LLM agents, prompt engineering, speech processing, transformers, and multimodal AI architectures.', tag: 'GenAI', accent: '#818CF8', glow: 'rgba(129,140,248,0.15)' },
  { icon: Globe, title: 'Web Development', desc: 'Creating the interface for intelligence. Full-stack development with React, Next.js, and integrating AI API endpoints, vector databases, or client-side model runners.', tag: 'Build', accent: '#22D3EE', glow: 'rgba(34,211,238,0.15)' },
  { icon: Code, title: 'MLOps & AI Infrastructure', desc: 'Scaling models from local environments to production systems. Constructing automated training pipelines, model monitoring, containerized deployments, and robust data engineering workloads.', tag: 'MLOps', accent: '#34D399', glow: 'rgba(52,211,153,0.15)' },
];

const RECENT_EVENTS = [
  {
    icon: Star,
    title: 'Club Founded & Inaugural',
    desc: 'The official launch of Aignite, establishing a new era of technical excellence and community engagement.',
    stat: '2025',
    accent: '#3B82F6',
    image: 'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779466919/inaugral-1_xkrt47.png',
    alt: 'Aignite inaugural ceremony with faculty and student members'
  },
  {
    icon: Brain,
    title: 'Hands-on ML Workshop',
    desc: 'An intensive session on Machine Learning fundamentals and practical AI implementation from scratch.',
    stat: '2026',
    accent: '#22D3EE',
    image: 'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779473312/IMG_7193_p5zhmg.jpg',
    alt: 'Students coding during hands-on machine learning workshop'
  },
  {
    icon: Globe,
    title: 'WebCraft: Web from Scratch',
    desc: 'An expert speaker session by Prof. Snehal Mumbaikar covering HTML, CSS, and JavaScript site building.',
    stat: '2026',
    accent: '#F472B6',
    image: 'https://res.cloudinary.com/dnd7yjtig/image/upload/f_auto,q_auto,w_800/v1779512784/IMG_5286_aqg3lc.jpg',
    alt: 'WebCraft web development speaker session at Bharati Vidyapeeth'
  },
  {
    icon: Code,
    title: 'Practical Linux & OS',
    desc: 'An expert speaker session by Prof. Shubham Nerkar covering CLI commands, OS concepts, and CLI automation.',
    stat: '2026',
    accent: '#818CF8',
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=800&auto=format&fit=crop',
    alt: 'Practical Linux terminal and operating system concepts workshop'
  },
  {
    icon: Target,
    title: 'Tableau Visualization',
    desc: 'Mastering the art of transforming raw data into high-impact interactive dashboards and analytical insights.',
    stat: '2026',
    accent: '#34D399',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    alt: 'Tableau data visualization and analytics dashboard session'
  },
];

const REASONS = [
  { icon: Code, label: 'Hands-On Workshops', desc: 'Build real things, not just slides.', color: '#3B82F6' },
  { icon: Trophy, label: 'Hackathon Access', desc: 'Compete, prototype, and win.', color: '#22D3EE' },
  { icon: Users, label: 'Industry Mentors', desc: 'Learn from people already in the field.', color: '#818CF8' },
  { icon: Rocket, label: 'Build Real Projects', desc: 'Ship things with your name on them.', color: '#34D399' },
  { icon: Target, label: 'Certificates', desc: 'Recognised for what you built, not attended.', color: '#F472B6' },
  { icon: Globe, label: 'Speaker Sessions', desc: 'Perspectives from people doing the work.', color: '#FBBF24' },
  { icon: Zap, label: 'Tech Community', desc: 'Find your crew, build your network.', color: '#A78BFA' },
  { icon: Sparkles, label: 'Innovation Culture', desc: 'An environment that rewards curiosity.', color: '#60A5FA' },
];

const TECH_TAGS = ['AI/ML', 'DEEP LEARNING', 'PYTORCH', 'TENSORFLOW', 'LLMS', 'MLOPS', 'REACT', 'NEXT.JS', 'TRANSFORMERS', 'DATA SCIENCE', 'GEN AI', 'NLP', 'COMPUTER VISION', 'HACKATHONS', 'WORKSHOPS'];

/* ─── Orbit Ring (decorative) ─── */
function OrbitRing({ radius, duration, reverse, color, dotSize = 5 }) {
  return (
    <div
      className="absolute rounded-full border pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderColor: `${color}20`,
        animation: `spin${reverse ? 'Rev' : ''} ${duration}s linear infinite`,
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          top: -dotSize / 2,
          left: '50%',
          transform: 'translateX(-50%)',
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}80`,
        }}
      />
    </div>
  );
}

export default function Home({ go }) {
  const ref = useScrollAnimate();
  const parallaxRef = useRef(null);
  const typedText = useTypewriter(['Innovators.', 'Builders.', 'Dreamers.', 'Creators.'], 90, 2200);

  useEffect(() => {
    if (!parallaxRef.current) return;
    const els = Array.from(parallaxRef.current.querySelectorAll('[data-speed]'));
    if (els.length === 0) return;

    // Promote elements to their own GPU layers for buttery smooth scrolling
    els.forEach(el => {
      el.style.willChange = 'transform';
    });

    let scheduled = false;
    let y = 0;

    const update = () => {
      els.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
      scheduled = false;
    };

    const fn = () => {
      y = window.scrollY;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div ref={ref}>
      {/* ═══════ HERO ═══════ */}
      <section ref={parallaxRef} className="relative min-h-screen flex items-start lg:items-center pt-20 pb-12 md:pt-28 md:pb-20 px-6 overflow-hidden">
        <ParticleField />

        {/* Aurora orbs */}
        <div className="aurora-orb aurora-orb-1 pointer-events-none" />
        <div className="aurora-orb aurora-orb-2 pointer-events-none" />
        <div className="aurora-orb aurora-orb-3 pointer-events-none" />

        <div className="absolute inset-0 scanline" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[rgba(5,13,26,0.95)] via-[rgba(5,13,26,0.3)] to-transparent pointer-events-none z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060910] to-transparent pointer-events-none z-[2]" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Hero Column */}
          <div className="order-1 lg:col-span-6 flex flex-col items-start justify-center">
            {/* University badge */}
            <div data-animate="fade-right" className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6 hero-badge">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-xs font-bold tracking-wider text-cyan-300/80">Bharati Vidyapeeth Deemed University</span>
            </div>

            {/* Main headline */}
            <h1 data-animate="fade-up" data-delay="100"
              className="font-black font-display leading-[1.0] mb-5"
              style={{
                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                letterSpacing: '-0.035em',
                color: '#E5E7EB'
              }}>
              Where<br />
              <span className="grad-text">Innovation</span><br />
              Meets Intelligence
            </h1>

            {/* Typewriter sub-headline (Stack cleanly without position/parallax overlap) */}
            <div data-animate="fade-up" data-delay="200" className="flex items-center gap-3 mb-5">
              <span className="text-base md:text-lg font-medium font-sans" style={{ color: '#6a8090' }}>We are</span>
              <span className="text-base md:text-lg font-black font-display typewriter-word" style={{ color: '#22D3EE' }}>
                {typedText}<span className="typewriter-cursor" />
              </span>
            </div>

            {/* Clean, non-overlapping paragraph block */}
            <p data-animate="fade-up" data-delay="250" className="text-base md:text-lg max-w-lg mb-6 leading-relaxed font-sans" style={{ color: '#6a8090' }}>
              A student-led AI and technology club built for students who want to create, innovate, and lead through technology.
            </p>

            {/* Mobile-only terminal — between text and buttons */}
            <div className="lg:hidden w-full mb-6" data-animate="fade-up" data-delay="320">
              <HeroTerminal />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto" data-animate="fade-up" data-delay="400">
              <a href="https://forms.google.com" target="_blank" rel="noreferrer"
                className="hero-cta-primary group relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl" />
                <span className="relative z-10 flex items-center gap-2">Join Aignite <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </a>
              <button onClick={() => go('about')} className="hero-cta-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base" style={{ color: '#E5E7EB' }}>
                <Sparkles size={18} style={{ color: '#22D3EE' }} /> Explore
              </button>
            </div>

            {/* Terminal bar */}
            <div data-animate="fade-up" data-delay="600" className="terminal-bar flex items-center gap-3 px-5 py-3 rounded-xl font-mono text-xs w-full sm:w-auto">
              <span className="terminal-dot" />
              <span className="text-slate-500">$</span>
              <span style={{ color: '#E5E7EB' }}>building the future</span>
              <span className="terminal-cursor" />
            </div>
          </div>

          {/* Right: HeroTerminal — desktop only */}
          <div className="hidden lg:flex order-2 lg:col-span-6 relative items-center w-full" data-animate="zoom-in">
            <HeroTerminal />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" data-animate="fade-up" data-delay="900">
          <span className="text-[10px] font-bold font-mono uppercase tracking-[0.3em] text-muted">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 overflow-hidden" style={{ borderColor: 'rgba(34,211,238,0.25)' }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#22D3EE', animation: 'scrollDot 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        {/* Subtle stat-section background */}
        <div className="absolute inset-0 stat-section-bg" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" data-animate="stagger-up">
            {STATS.map((s, i) => {
              const StatIcon = s.icon;
              const [cRef, display] = useCounter(s.value);
              return (
                <div key={i} ref={cRef} data-stagger-child className="stat-card group cursor-default rounded-2xl px-8 py-8 text-center relative overflow-hidden">
                  {/* Corner accent */}
                  <div className="stat-card-corner-tl" style={{ borderColor: s.accent }} />
                  <div className="stat-card-corner-br" style={{ borderColor: s.accent }} />
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 50%, ${s.accent}12, transparent 70%)` }} />
                  <div className="icon-box w-14 h-14 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ border: `1px solid ${s.accent}30`, boxShadow: `0 0 20px ${s.accent}10` }}>
                    <StatIcon size={22} style={{ color: s.accent }} />
                  </div>
                  <div className="text-4xl font-black font-display mb-2 transition-all duration-300"
                    style={{ color: '#E5E7EB', textShadow: `0 0 30px ${s.accent}40` }}>
                    {display}
                  </div>
                  <div className="text-[10px] font-bold font-mono uppercase tracking-widest" style={{ color: s.accent + 'bb' }}>
                    {s.label}
                  </div>
                  {/* Bottom neon line */}
                  <div className="absolute bottom-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${s.accent}, transparent)` }} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════ DEVELOPER WORKSPACE (Replaces Open Source) ═══════ */}
      <DeveloperWorkspace />

      {/* ═══════ EVENTS TIMELINE (TASK 2: Vertical split cards with images) ═══════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        {/* Background ambient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #060910 0%, #080f1d 50%, #060910 100%)' }} />
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16" data-animate="fade-up">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-500/50" />
              <p className="text-xs font-bold font-mono uppercase tracking-[0.3em]" style={{ color: '#60A5FA' }}>{'// our_events'}</p>
              <div className="h-px w-8 bg-cyan-500/50" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight" style={{ color: '#E5E7EB' }}>
              Not just a club.<br /><span className="grad-text">A launchpad.</span>
            </h2>
          </div>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px timeline-line" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RECENT_EVENTS.map((h, i) => {
                const EventIcon = h.icon;
                return (
                  <div key={i} data-animate="fade-up" data-delay={i * 150}
                    className={`relative group pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:mt-20'}`}>
                    {/* Timeline dot */}
                    <div className={`absolute top-10 md:top-8 flex items-center justify-center left-4 -translate-x-[5.5px] ${i % 2 === 0 ? 'md:left-auto md:right-[-21.5px] md:translate-x-0' : 'md:left-[-21.5px] md:translate-x-0'}`}
                      style={{ zIndex: 10 }}>
                      <div className="w-3 h-3 rounded-full border-2 border-current"
                        style={{ backgroundColor: h.accent, borderColor: h.accent, boxShadow: `0 0 12px ${h.accent}` }} />
                    </div>

                    {/* Card split vertically top-to-bottom (~60:40) */}
                    <div className="event-card relative rounded-3xl overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                        style={{ background: `linear-gradient(to right, transparent, ${h.accent}, transparent)` }} />
                      
                      {/* TOP PORTION (60%): Light-background event photo frame */}
                      <div className="relative w-full h-48 sm:h-56 bg-slate-100 overflow-hidden flex items-center justify-center border-b border-white/5">
                        <img
                          src={h.image}
                          alt={h.alt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient transition to card content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1829] via-transparent to-transparent opacity-80" />
                        
                        {/* Top-right stat pill */}
                        <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono shadow-lg backdrop-blur-md"
                          style={{ background: 'rgba(5, 13, 26, 0.75)', color: h.accent, border: `1px solid ${h.accent}40` }}>
                          <Zap size={10} />{h.stat}
                        </div>
                      </div>

                      {/* BOTTOM PORTION (40%): Title, Description & Badge text */}
                      <div className="relative p-6 sm:p-7 flex-1 flex flex-col justify-between">
                        {/* Hover radial glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl pointer-events-none"
                          style={{ background: `radial-gradient(circle at 50% 0%, ${h.accent}12, transparent 70%)` }} />

                        {/* Number watermark */}
                        <div className="absolute bottom-2 right-4 text-[4rem] font-black font-display leading-none select-none pointer-events-none"
                          style={{ color: 'transparent', WebkitTextStroke: `1px ${h.accent}15` }}>0{i + 1}</div>
                        <div className="absolute bottom-2 right-4 text-[4rem] font-black font-display leading-none select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{ color: 'transparent', WebkitTextStroke: `1px ${h.accent}40`, filter: `drop-shadow(0 0 12px ${h.accent}25)` }}>0{i + 1}</div>

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="icon-box w-10 h-10"
                              style={{ border: `1px solid ${h.accent}30`, boxShadow: `0 0 15px ${h.accent}15` }}>
                              <EventIcon size={18} style={{ color: h.accent }} />
                            </div>
                            <span className="text-[10px] font-bold font-mono tracking-wider uppercase" style={{ color: h.accent }}>
                              Event 0{i + 1}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold font-display mb-2 group-hover:text-white transition-colors" style={{ color: '#E5E7EB' }}>
                            {h.title}
                          </h3>
                          <p className="text-sm leading-relaxed text-muted">{h.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════ WHY JOIN US (TASK 4: Added below Launchpad timeline) ═══════ */}
      <section className="relative py-24 px-6 bg-level-1 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"
          style={{ backgroundColor: '#22D3EE' }} />

        {/* Header */}
        <div className="max-w-6xl mx-auto mb-14">
          <div data-animate="fade-up" className="flex items-center gap-3 mb-4">
            <div className="w-5 h-px" style={{ backgroundColor: '#22D3EE' }} />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Membership perks</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 data-animate="fade-up" data-delay="80"
              className="text-3xl md:text-5xl font-black font-display tracking-tight text-offwhite leading-tight">
              Why <span className="grad-text">Join Us?</span>
            </h2>
            <p data-animate="fade-up" data-delay="120" className="text-sm text-muted md:text-right max-w-xs leading-relaxed">
              Eight reasons we're built differently from a typical college club.
            </p>
          </div>
        </div>

        {/* Unified grid — 2 col on mobile, 4 col on desktop */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {REASONS.map((r, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 50}
              className="relative rounded-2xl p-5 overflow-hidden group cursor-default transition-all duration-300 hover:-translate-y-1.5"
              style={{ background: 'linear-gradient(145deg, #0d1829, #090f1d)', border: `1px solid ${r.color}20` }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 120%, ${r.color}18, transparent 65%)` }} />
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${r.color}90, transparent)` }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${r.color}14`, border: `1px solid ${r.color}30` }}>
                <r.icon size={20} style={{ color: r.color }} />
              </div>
              <div className="text-sm sm:text-base font-bold text-offwhite font-display mb-1.5 leading-snug">{r.label}</div>
              <div className="text-xs text-muted leading-relaxed">{r.desc}</div>
            </div>
          ))}
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-6 overflow-hidden relative">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #060910 0%, transparent 10%, transparent 90%, #060910 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="flex animate-[marquee_25s_linear_infinite] whitespace-nowrap">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-6 px-3">
              {TECH_TAGS.map((t, i) => (
                <span key={i} className="marquee-tag flex items-center gap-2.5 text-xs font-bold font-mono tracking-[0.2em]">
                  <span className="marquee-dot" style={{ '--mc': ['#22D3EE', '#3B82F6', '#818CF8', '#34D399', '#F472B6'][i % 5] }} />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ BRAND CTA ═══════ */}
      <section className="relative py-28 md:py-36 px-6 bg-level-0 z-10 overflow-hidden">
        <div className="glow-divider absolute top-0 left-0 right-0" />
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        {/* Ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)' }} />

        <div className="max-w-3xl mx-auto text-center relative z-10" data-animate="fade-up">
          {/* Orbital logo */}
          <div className="relative inline-block mb-8 animate-float">
            {/* Orbit rings */}
            <OrbitRing radius={70} duration={8} reverse={false} color="#22D3EE" dotSize={6} />
            <OrbitRing radius={55} duration={12} reverse={true} color="#3B82F6" dotSize={4} />
            <OrbitRing radius={88} duration={16} reverse={false} color="#818CF8" dotSize={5} />

            <div className="relative w-24 h-24 rounded-[1.5rem] p-[2px] group cursor-pointer z-10"
              style={{ background: 'linear-gradient(135deg, #22D3EE, #3B82F6, #818CF8)', boxShadow: '0 0 60px rgba(34,211,238,0.25), 0 0 120px rgba(59,130,246,0.15)' }}>
              <div className="w-full h-full rounded-[calc(1.5rem-2px)] flex items-center justify-center overflow-hidden bg-level-2 group-hover:bg-level-3 transition-colors duration-300">
                <img src={logo} alt="Aignite" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.4))' }} />
              </div>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-5" style={{ color: '#E5E7EB' }}>
            Built by students.<br />Driven by <span className="grad-text">curiosity</span>.
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10 text-muted">
            We're not waiting to graduate. Every line of code brings us closer to the engineers we want to become.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => go('team')} className="brand-cta-btn group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base">
              Meet the team <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="https://forms.google.com" target="_blank" rel="noreferrer"
              className="brand-cta-secondary group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl" />
              <span className="relative z-10 flex items-center gap-2">Join Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </a>
          </div>
        </div>
        <div className="glow-divider absolute bottom-0 left-0 right-0" />
      </section>

      <style>{`
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          65% { transform: translateY(12px); opacity: 0; }
          66% { transform: translateY(-2px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes spinRev { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes auroraFloat1 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(60px, -40px) scale(1.1); } 66% { transform: translate(-30px, 30px) scale(0.95); } }
        @keyframes auroraFloat2 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-80px, 50px) scale(1.08); } 66% { transform: translate(40px, -30px) scale(0.92); } }
        @keyframes auroraFloat3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(50px, 60px) scale(1.05); } }
      `}</style>
    </div>
  );
}
