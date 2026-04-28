import React from 'react';
import { Brain, Rocket, Target, Sparkles } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const TIMELINE = [
  { year: '2025', title: 'Club Founded', desc: 'Aignite was established at Bharati Vidyapeeth Deemed University with a vision to bridge the gap between academics and real-world technology.' },
  { year: '2025', title: 'First Hackathon', desc: 'Hosted our inaugural 24-hour hackathon with 80+ participants building AI-powered solutions.' },
  { year: '2026', title: 'Growing Strong', desc: 'Expanded to 120+ active members across all branches, with partnerships with industry leaders.' },
];

export default function About() {
  const ref = useScrollAnimate();
  return (
    <div ref={ref}>
      <section className="pt-12 pb-16 px-6 text-center">
        <h1 data-animate="fade-up" className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 text-offwhite">
          About <span className="grad-text">Aignite</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted">
          Born in 2025 at Bharati Vidyapeeth Deemed University, Aignite is a student-led technology club passionate about AI, software engineering, and building products that matter.
        </p>
      </section>
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To create a community where students learn cutting-edge tech through practical, hands-on experience — not just theory.' },
            { icon: Rocket, title: 'Our Vision', desc: 'To become the most impactful student tech community in India, producing engineers who ship real products.' },
            { icon: Sparkles, title: 'Our Values', desc: 'Learn by building. Collaborate openly. Ship fearlessly. Mentor generously. Stay curious, always.' },
          ].map((c, i) => (
            <div key={i} data-animate="fade-up" data-delay={i * 120} className="glass rounded-3xl p-8 group hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: '#0F172A', border: '1px solid rgba(59,130,246,0.15)' }}>
                <c.icon size={22} style={{ color: '#60A5FA' }} />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display text-offwhite">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 data-animate="fade-up" className="text-3xl font-black font-display tracking-tight mb-12 text-center text-offwhite">Our <span className="grad-text">Journey</span></h2>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #3B82F6, #22D3EE, transparent)' }}></div>
            {TIMELINE.map((t, i) => (
              <div key={i} className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-4 border-deep z-10" style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}></div>
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] glass rounded-2xl p-6 ${i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`} data-animate="fade-up" data-delay={i * 150}>
                  <span className="text-xs font-bold font-mono uppercase tracking-widest" style={{ color: '#22D3EE' }}>{t.year}</span>
                  <h3 className="text-lg font-bold mt-1 mb-2 font-display text-offwhite">{t.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black font-display tracking-tight mb-12 text-center text-offwhite">Why <span className="grad-text">Join?</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ icon: '🧠', label: 'Hands-On Workshops' },{ icon: '🏆', label: 'Hackathon Access' },{ icon: '🤝', label: 'Industry Mentors' },{ icon: '🚀', label: 'Build Real Projects' },{ icon: '📜', label: 'Certificates' },{ icon: '🎤', label: 'Speaker Sessions' },{ icon: '🌐', label: 'Tech Community' },{ icon: '💡', label: 'Innovation Culture' }].map((b, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="text-2xl mb-2">{b.icon}</div>
                <div className="text-sm font-semibold text-offwhite">{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
