import React, { useState } from 'react';
import { ArrowRight } from './Icons';
import NeuralLoader from './components/NeuralLoader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Team from './pages/Team';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('home');

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <NeuralLoader onFinish={() => setLoading(false)} />;
  }

  const Page = () => {
    switch (page) {
      case 'home':   return <Home go={go} />;
      case 'about':  return <About />;
      case 'events': return <Events />;
      case 'team':   return <Team />;
      default:       return <Home go={go} />;
    }
  };

  return (
    <div className="min-h-screen mesh font-sans flex flex-col">
      <Navbar page={page} go={go} />
      <main className="flex-grow pt-16">
        <Page />
      </main>

      {/* CTA */}
      <section className="relative py-32 px-6 text-center overflow-hidden bg-level-1">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        {/* Animated bg orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[140px] rounded-full pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none animate-pulse-glow" style={{ backgroundColor: 'rgba(34,211,238,0.04)', animationDelay: '2s' }}></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold mb-8 depth-card" style={{ color: '#60A5FA' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 8px rgba(34,211,238,0.5)' }}></span>
            Applications Open
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight mb-6 leading-tight" style={{ color: '#E5E7EB' }}>
            Stop learning alone.<br /><span className="grad-text">Build with us.</span>
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto text-muted leading-relaxed">
            Join <strong style={{ color: '#E5E7EB' }}>120+ builders</strong> shaping the future of AI and technology. Your next project, your next team, your next breakthrough starts here.
          </p>
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="btn-glow group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white"
            style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}>
            <span>Apply Now</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="mt-6 text-xs text-muted font-mono">// No experience required. Just curiosity.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}