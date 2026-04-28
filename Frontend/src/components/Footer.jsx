import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin } from '../Icons';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6" style={{ background: 'linear-gradient(180deg, #060910 0%, #0B0F1A 30%, #0D1321 100%)' }}>
      {/* Glow divider at top */}
      <div className="glow-divider absolute top-0 left-0 right-0"></div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: 'rgba(59,130,246,0.04)' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-[1px] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-shadow"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(34,211,238,0.2))' }}>
                <div className="w-full h-full bg-level-2 rounded-[10px] flex items-center justify-center">
                  <img src={logo} alt="Aignite" className="w-7 h-7 object-contain" />
                </div>
              </div>
              <span className="text-lg font-bold font-display" style={{ color: '#E5E7EB' }}>Aignite</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6 text-muted">
              The AI & Technology Club of Bharati Vidyapeeth Deemed University. Founded 2025.
            </p>
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: '#4B5563' }}>
              <MapPin size={14} /> Pune, India
            </div>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' },
                { Icon: Mail, href: 'mailto:aignite@bvdu.edu' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="group/icon w-10 h-10 rounded-xl flex items-center justify-center text-muted transition-all duration-300 hover:text-white hover:-translate-y-1"
                  style={{ background: 'linear-gradient(145deg, #111827, #0D1321)', border: '1px solid rgba(59,130,246,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4), 0 0 15px rgba(59,130,246,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.08)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                  }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {[
              { title: 'Navigate', items: ['Home', 'About', 'Events', 'Team'] },
              { title: 'Focus', items: ['AI / ML', 'Web Dev', 'App Dev', 'Open Source'] },
              { title: 'Connect', items: ['Instagram', 'LinkedIn', 'GitHub', 'Email Us'] },
            ].map((col, ci) => (
              <div key={ci}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#E5E7EB' }}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted transition-all duration-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-0 hover:gap-1.5 group/link">
                        <span className="w-0 group-hover/link:w-3 transition-all duration-200 overflow-hidden">
                          <span className="inline-block w-2 h-[1px]" style={{ backgroundColor: '#3B82F6' }}></span>
                        </span>
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="glow-divider mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <span>&copy; {new Date().getFullYear()} Aignite · Bharati Vidyapeeth Deemed University</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 8px rgba(34,211,238,0.4)' }}></span>
              All systems online
            </span>
            <span style={{ color: '#1F2937' }}>·</span>
            <span className="font-mono" style={{ color: '#374151' }}>v1.0.0</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
