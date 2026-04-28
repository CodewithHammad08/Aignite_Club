import React, { useState, useEffect } from 'react';
import { Menu, X } from '../Icons';
import logo from '../assets/logo.png';

const NAV = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' }, { id: 'team', label: 'Team' },
];

export default function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 10); window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn); }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'}`}
      style={scrolled ? { backgroundColor: 'rgba(50,41,47,0.85)', borderBottom: '1px solid rgba(153,225,217,0.07)' } : {}}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => go('home')} className="flex items-center group">
          <img src={logo} alt="Aignite" className="w-9 h-9 rounded-xl object-contain" />
        </button>
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${page === n.id ? 'text-cream' : 'hover:bg-white/[0.04]'}`}
              style={page === n.id ? { backgroundColor: 'rgba(153,225,217,0.12)', color: '#F0F7F4' } : { color: '#70ABAF' }}>
              {n.label}
            </button>
          ))}
        </div>
        <a href="https://forms.google.com" target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-lg hover:scale-[1.02]"
          style={{ backgroundColor: '#99E1D9', color: '#32292F' }}>
          Join Us
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: '#F0F7F4' }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden backdrop-blur-2xl px-6 pb-6 pt-2" style={{ backgroundColor: 'rgba(50,41,47,0.95)', borderTop: '1px solid rgba(153,225,217,0.07)' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => { go(n.id); setOpen(false); }}
              className="block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
              style={page === n.id ? { backgroundColor: 'rgba(153,225,217,0.12)', color: '#F0F7F4' } : { color: '#70ABAF' }}>
              {n.label}
            </button>
          ))}
          <a href="https://forms.google.com" target="_blank" rel="noreferrer"
            className="mt-3 block w-full text-center px-5 py-3 rounded-xl text-sm font-bold"
            style={{ backgroundColor: '#99E1D9', color: '#32292F' }}>Join Us</a>
        </div>
      )}
    </nav>
  );
}
