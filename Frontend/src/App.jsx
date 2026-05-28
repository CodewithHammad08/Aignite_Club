// App.jsx — root shell
// All global systems live here: progress bar, cursor, page transitions, layout.

import React, { useState } from 'react';
import { ArrowRight } from './Icons';
import NeuralLoader from './components/NeuralLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Team from './pages/Team';
import useCursorEffect from './hooks/useCursorEffect';

// ─── CTA section variants per page ───
const CTA_CONTENT = {
  home: {
    headline: ['Stop learning alone.', 'Build with us.'],
    sub: (
      <>
        Join <strong style={{ color: '#e8f4f8' }}>25+ builders</strong> shaping
        the future of AI and technology. Your next project, your next team, your
        next breakthrough — starts here.
      </>
    ),
  },
  about: {
    headline: ['From learner', 'to builder — begin here.'],
    sub: <>Start your journey with Aignite. Join <strong style={{ color: '#e8f4f8' }}>25+ builders</strong> and turn your ideas into reality.</>,
  },
  events: {
    headline: ["Don't just watch.", 'Participate.'],
    sub: 'Register for our next hackathon, workshop, or speaker session. The best way to learn is to show up.',
  },
  team: {
    headline: ['Ready to join the', 'Core Team?'],
    sub: 'We are always looking for passionate builders and leaders. Apply to join a department and shape the future of Aignite.',
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');

  // Activate custom cursor globally (desktop only, respects reduced-motion)
  useCursorEffect();

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <NeuralLoader onFinish={() => setLoading(false)} />;
  }

  const Page = () => {
    switch (page) {
      case 'home': return <Home go={go} />;
      case 'about': return <About />;
      case 'events': return <Events />;
      case 'team': return <Team />;
      default: return <Home go={go} />;
    }
  };

  const cta = CTA_CONTENT[page] || CTA_CONTENT.home;

  return (
    <div className="min-h-screen bg-level-0 font-sans flex flex-col">
      {/* 2px cyan progress bar — always on top */}
      <ScrollProgressBar />

      <Navbar page={page} go={go} />

      <main className="flex-grow pt-16 pb-20 md:pb-0">
        {/* Page transitions: outgoing slides up, incoming rises from below */}
        <PageTransition pageKey={page}>
          <Page />
        </PageTransition>
      </main>

      {/* ─── Global CTA Section — only on Team page ─── */}
      {page === 'team' && (
        <section
          className="relative py-32 px-6 text-center overflow-hidden bg-level-1"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 50% 50%, rgba(5,13,26,0) 0%, rgba(5,13,26,0.8) 100%),
              #080f1d
            `,
          }}
        >
          <div className="glow-divider absolute top-0 left-0 right-0" />

          {/* Very subtle ambient cyan orb — one glow, not everywhere */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none"
            style={{ backgroundColor: 'rgba(0,212,255,0.05)' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Active pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold mb-8 depth-card"
              style={{ color: '#00d4ff' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: '#00d4ff', boxShadow: '0 0 8px rgba(0,212,255,0.6)' }}
              />
              Applications Open
            </div>

            {/* Headline: two-line with weight contrast */}
            <h2
              className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 leading-tight"
              style={{ color: '#e8f4f8' }}
            >
              {cta.headline[0]}
              <br />
              <span className="grad-text">{cta.headline[1]}</span>
            </h2>

            <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: '#4a6070' }}>
              {cta.sub}
            </p>

            {/* Apply Now — arrow loops on hover, border pulses once */}
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn-glow btn-pulse-border group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg"
              style={{
                backgroundColor: '#00d4ff',
                color: '#050d1a',
                boxShadow: '0 0 30px rgba(0,212,255,0.20)',
              }}
            >
              <span>Apply Now</span>
              {/* Arrow slides right 4px and back in a loop on hover */}
              <ArrowRight size={20} className="btn-arrow-icon" />
            </a>

            <p className="mt-6 text-xs font-mono" style={{ color: '#4a6070' }}>
              // No experience required. Just curiosity.
            </p>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}