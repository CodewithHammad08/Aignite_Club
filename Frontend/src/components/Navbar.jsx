import React, { useState, useEffect } from 'react';
import { Menu, X } from '../Icons';
import logo from '../assets/logo.png';

const NAV = [
  { id: 'home',   label: 'Home' },
  { id: 'about',  label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'team',   label: 'Team' },
];

export default function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-deep/70 backdrop-blur-2xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <button onClick={() => go('home')} className="flex items-center group">
          <img src={logo} alt="Aignite" className="w-9 h-9 rounded-xl object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                page === n.id
                  ? 'text-white bg-blue-500/10 shadow-[inset_0_1px_0_rgba(59,130,246,0.2)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}>
              {n.label}
            </button>
          ))}
        </div>

        <a href="https://forms.google.com" target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02]">
          Join Us
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-deep/95 backdrop-blur-2xl border-t border-blue-500/10 px-6 pb-6 pt-2">
          {NAV.map(n => (
            <button key={n.id} onClick={() => { go(n.id); setOpen(false); }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                page === n.id ? 'text-white bg-blue-500/10' : 'text-gray-400 hover:text-white'
              }`}>
              {n.label}
            </button>
          ))}
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="mt-3 block w-full text-center px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}
