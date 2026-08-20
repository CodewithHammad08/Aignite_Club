// Navbar.jsx — Upgraded
// Motion rationale:
//   Logo glow pulse: "this brand is alive" — very subtle, not distracting.
//   Sliding underline: routes have physical weight; switching feels like moving,
//     not just changing state.
//   Scroll blur: nav earns its space as you scroll — it's not always visible,
//     only becomes opaque when content is beneath it.
//   Mobile tab bar: feels native, not a hamburger afterthought.

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

// Icons for the bottom tab bar — inline SVG to keep bundle clean
const HomeIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const EventsIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TeamIcon = ({ active }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const NAV = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: AboutIcon },
  { id: 'events', label: 'Events', Icon: EventsIcon },
  { id: 'team', label: 'Team', Icon: TeamIcon },
];

export default function Navbar({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  // Track the position/width of the active nav link for the sliding underline
  const navRefs = useRef({});
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Recalculate underline position whenever the active page changes
  useEffect(() => {
    const el = navRefs.current[page];
    if (el) {
      const parent = el.parentElement.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setUnderline({
        left: rect.left - parent.left,
        width: rect.width,
        opacity: 1,
      });
    }
  }, [page]);

  return (
    <>
      {/* ── Desktop Navigation ── */}
      <nav
        className="fixed top-0 w-full z-50 transition-[background-color,border-color,box-shadow] duration-300"
        style={
          scrolled
            ? {
              backgroundColor: 'rgba(5,13,26,0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(0,212,255,0.08)',
              boxShadow: '0 4px 20px rgba(0,212,255,0.04)',
              willChange: 'background-color, box-shadow',
              transform: 'translateZ(0)',
            }
            : {
              backgroundColor: 'rgba(5,13,26,0.22)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderBottom: '1px solid rgba(0,212,255,0.04)',
              boxShadow: '0 2px 10px rgba(0,212,255,0.02)',
              transform: 'translateZ(0)',
            }
        }
      >
        <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo with shape-conforming glow pulse */}
          <button
            onClick={() => go('home')}
            className="flex items-center group ml-6 md:ml-4"
            aria-label="Go home"
          >
            <img
              src={logo}
              alt="Aignite"
              className="mt-3 w-auto h-[64px] md:h-[74px] object-contain object-left relative z-10"
              style={{ animation: 'logoPulse 2s ease-in-out infinite' }}
            />
          </button>

          {/* Desktop nav links with sliding underline */}
          <div className="hidden md:flex items-center gap-2 relative" id="nav-link-container">
            {NAV.map((n) => (
              <button
                key={n.id}
                ref={(el) => { navRefs.current[n.id] = el; }}
                onClick={() => go(n.id)}
                className="relative px-5 py-2.5 rounded-xl text-base font-bold tracking-wide transition-colors duration-200"
                style={{
                  color: page === n.id ? '#e8f4f8' : '#4a6070',
                }}
                onMouseEnter={(e) => {
                  if (page !== n.id) e.currentTarget.style.color = '#e8f4f8';
                }}
                onMouseLeave={(e) => {
                  if (page !== n.id) e.currentTarget.style.color = '#4a6070';
                }}
              >
                {n.label}
              </button>
            ))}

            {/* The sliding underline — a single element that moves between links */}
            <motion.div
              className="absolute bottom-0 h-[2px] rounded-full pointer-events-none"
              style={{ backgroundColor: '#00d4ff' }}
              animate={{
                left: underline.left,
                width: underline.width,
                opacity: underline.opacity,
              }}
              transition={{
                // Communicates: "you moved to a new place" — spring feels physical
                type: 'spring',
                stiffness: 380,
                damping: 30,
              }}
            />
          </div>

          {/* CTA */}
          <button
            disabled
            className="hidden md:inline-flex items-center gap-2 px-7 py-2.5 rounded-xl text-base font-bold tracking-wide opacity-50 cursor-not-allowed"
            style={{
              backgroundColor: '#2a3b4c',
              color: '#8a9fac',
              boxShadow: 'none',
            }}
          >
            Join Us
          </button>
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar (< 768px) ── */}
      {/* Communicates: this is a real app, not a website crammed into mobile */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center"
        style={{
          backgroundColor: 'rgba(5,13,26,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(0,212,255,0.08)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {NAV.map((n) => {
          const isActive = page === n.id;
          return (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors duration-200"
              style={{ color: isActive ? '#00d4ff' : '#4a6070' }}
            >
              <div className="relative">
                <n.Icon active={isActive} />
                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: '#00d4ff' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-bold font-mono tracking-wide"
                style={{ color: isActive ? '#00d4ff' : '#4a6070' }}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(0, 212, 255, 0.1)); }
          50%       { filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.45)); }
        }
      `}</style>
    </>
  );
}
