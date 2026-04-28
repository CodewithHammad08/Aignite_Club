import React from 'react';
import { Github, Linkedin, Instagram, Mail, MapPin } from '../Icons';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-deep pt-16 pb-8 px-6" style={{ borderTop: '1px solid rgba(153,225,217,0.07)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Aignite" className="w-9 h-9 rounded-xl object-contain" />
              <span className="text-lg font-bold font-display" style={{ color: '#F0F7F4' }}>Aignite</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: '#70ABAF' }}>
              The AI & Technology Club of Bharati Vidyapeeth Deemed University. Founded 2025.
            </p>
            <div className="flex items-center gap-2 text-xs mb-6" style={{ color: '#705D56' }}><MapPin size={14} /> Pune, India</div>
            <div className="flex gap-3">
              {[{ Icon: Instagram, href: '#' }, { Icon: Linkedin, href: '#' }, { Icon: Github, href: '#' }, { Icon: Mail, href: 'mailto:aignite@bvdu.edu' }].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{ backgroundColor: 'rgba(153,225,217,0.06)', border: '1px solid rgba(153,225,217,0.08)', color: '#705D56' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#99E1D9'}
                  onMouseLeave={e => e.currentTarget.style.color = '#705D56'}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {[
              { title: 'Navigate', items: ['Home','About','Events','Team'], link: true },
              { title: 'Focus', items: ['AI / ML','Web Dev','App Dev','Open Source'], link: false },
              { title: 'Connect', items: ['Instagram','LinkedIn','GitHub','Email Us'], link: true },
            ].map((col, ci) => (
              <div key={ci}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: '#F0F7F4' }}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map(l => (
                    <li key={l}>{col.link
                      ? <a href="#" className="text-sm transition-colors" style={{ color: '#705D56' }} onMouseEnter={e=>e.currentTarget.style.color='#99E1D9'} onMouseLeave={e=>e.currentTarget.style.color='#705D56'}>{l}</a>
                      : <span className="text-sm" style={{ color: '#705D56' }}>{l}</span>
                    }</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ borderTop: '1px solid rgba(153,225,217,0.07)', color: '#705D56' }}>
          <span>&copy; {new Date().getFullYear()} Aignite · Bharati Vidyapeeth Deemed University</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#99E1D9' }}></span>
            Built with passion
          </span>
        </div>
      </div>
    </footer>
  );
}
