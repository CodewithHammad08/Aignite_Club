import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin } from '../Icons';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/10 bg-deep pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Aignite" className="w-9 h-9 rounded-xl object-contain" />
              <span className="text-lg font-bold text-white font-display">Aignite</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              The AI & Technology Club of Bharati Vidyapeeth Deemed University. Founded 2025.
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-6">
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
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Navigate</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Events', 'Team'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Focus</h4>
              <ul className="space-y-3">
                {['AI / ML', 'Web Dev', 'App Dev', 'Open Source'].map(l => (
                  <li key={l}><span className="text-gray-400 text-sm">{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">Connect</h4>
              <ul className="space-y-3">
                {['Instagram', 'LinkedIn', 'GitHub', 'Email Us'].map(l => (
                  <li key={l}><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-blue-500/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <span>&copy; {new Date().getFullYear()} Aignite · Bharati Vidyapeeth Deemed University</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            Built with passion
          </span>
        </div>
      </div>
    </footer>
  );
}
