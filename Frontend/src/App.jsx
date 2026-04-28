import React, { useState } from 'react';
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
      <section className="relative py-24 px-6 text-center overflow-hidden" style={{ borderTop: '1px solid rgba(153,225,217,0.07)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(153,225,217,0.06)' }}></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight mb-6" style={{ color: '#F0F7F4' }}>
            Ready to <span className="grad-text">Build?</span>
          </h2>
          <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: '#70ABAF' }}>
            Join 120+ students building the future of technology at Aignite.
          </p>
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03]"
            style={{ backgroundColor: '#99E1D9', color: '#32292F', boxShadow: '0 8px 30px rgba(153,225,217,0.2)' }}>
            Apply Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}