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
      <section className="relative py-24 px-6 text-center overflow-hidden border-t border-white/[0.06]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight mb-6">
            Ready to <span className="grad-text">Build?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            Join 120+ students building the future of technology at Aignite.
          </p>
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-[0_8px_30px_rgba(59,130,246,0.35)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] transition-all hover:scale-[1.03]">
            Apply Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}