import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Trophy, Users, Star, Zap, Rocket, Target, Sparkles } from '../Icons';
import useScrollAnimate from '../hooks/useScrollAnimate';

const EVENTS = [
  { title: 'AI/ML Concept-Based Interactive Session', date: 'Jul 15, 2026', type: 'Session', status: 'Upcoming', desc: 'An interactive deep dive into core AI and Machine Learning concepts.', seats: 45 },
  { title: 'AI System Design & Problem Solving', date: 'Aug 10, 2026', type: 'Workshop', status: 'Upcoming', desc: 'Learn how to architect scalable AI systems and solve complex engineering problems.', seats: 60 },
  { title: 'Flagship AI Interactive Event', date: 'Aug 25, 2026', type: 'Event', status: 'Featured', desc: 'Our biggest event of the semester featuring expert talks and hands-on activities.', featured: true, seats: 120 },
  { title: 'AI Career Guidance / Expert Talk', date: 'Oct 05, 2026', type: 'Speaker', status: 'Upcoming', desc: 'Navigate your career in tech with insights from industry leaders and AI experts.', seats: 150 },
  { title: 'AI Application & Analysis-Based Session', date: 'Jan 15, 2027', type: 'Session', status: 'Upcoming', desc: 'Practical analysis and real-world applications of modern AI models.', seats: 50 },
  { title: 'AI Simulation / Engagement-Based Session', date: 'Feb 05, 2027', type: 'Workshop', status: 'Upcoming', desc: 'Engage with dynamic AI simulations to understand complex model behaviors.', seats: 40 },
  { title: 'AI Tools & Practical Applications Session', date: 'Feb 20, 2027', type: 'Workshop', status: 'Upcoming', desc: 'Hands-on session exploring the latest AI tools and how to use them effectively.', seats: 40 },
  { title: 'AI Innovation & Idea Presentation Event', date: 'Mar 10, 2027', type: 'Event', status: 'Upcoming', desc: 'Showcase your innovative AI ideas and projects to the community and mentors.', seats: 80 },
];

const PAST = [
  { title: 'Club Founded & Inaugural', date: '2025', attendees: '200+', outcomes: 'Official Launch • Core Team Formed', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop' },
  { title: 'Hands-on ML Workshop', date: '2026', attendees: '120+', outcomes: '40+ Models Trained • 3 Datasets', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=600&auto=format&fit=crop' },
  { title: 'Command to Automation: Linux Workshop', date: '2026', attendees: '100+', outcomes: '80+ Scripts • Full CLI Mastery', img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600&auto=format&fit=crop' },
  { title: 'Data Visualization using Tableau', date: '2026', attendees: '30+', outcomes: '15 Interactive Dashboards Built', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
];

const FILTERS = ['All', 'Session', 'Workshop', 'Event', 'Speaker'];

export default function Events() {
  const ref = useScrollAnimate();
  const [filter, setFilter] = useState('All');
  
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 14, minutes: 22, seconds: 40 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flagshipEvent = EVENTS.find(e => e.featured);
  const displayEvents = EVENTS.filter(e => filter === 'All' || e.type === filter);

  return (
    <div ref={ref}>
      {/* HEADER */}
      <section className="pt-24 pb-12 px-6 text-center bg-level-0 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none opacity-20" style={{ backgroundColor: '#3B82F6' }}></div>
        <div className="relative z-10">
          <h1 data-animate="fade-up" className="text-4xl md:text-7xl font-black font-display tracking-tight mb-6 text-offwhite">
            <span className="grad-text">Events</span> & Workshops
          </h1>
          <p data-animate="fade-up" data-delay="100" className="text-lg md:text-xl max-w-2xl mx-auto text-muted">Learn, build, and connect. Here's what's happening at Aignite.</p>
        </div>
      </section>

      {/* FEATURED EVENT HERO */}
      {flagshipEvent && filter === 'All' && (
        <section className="px-6 pb-16 relative z-10" data-animate="fade-up" data-delay="200">
          <div className="max-w-5xl mx-auto">
            <div className="relative depth-card rounded-3xl p-1 overflow-hidden group">
              {/* Animated Glow Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] via-[#22D3EE] to-[#818CF8] opacity-50 animate-[spin_4s_linear_infinite]" style={{ margin: '-50%' }}></div>
              <div className="absolute inset-[2px] bg-level-1 rounded-[calc(1.5rem-2px)] z-0"></div>
              
              <div className="relative z-10 bg-level-1/80 backdrop-blur-xl rounded-[calc(1.5rem-2px)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-widest mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <Star size={14} className="animate-pulse" /> Featured Flagship
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black font-display text-offwhite mb-4 leading-tight">{flagshipEvent.title}</h2>
                  <p className="text-lg text-muted mb-8">{flagshipEvent.desc}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-sm font-semibold text-offwhite">
                      <Calendar size={18} style={{ color: '#22D3EE' }} /> {flagshipEvent.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-offwhite">
                      <Users size={18} style={{ color: '#F472B6' }} /> {flagshipEvent.seats} Seats Left
                    </div>
                  </div>

                  <button className="w-full md:w-auto btn-glow relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: '#3B82F6', boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}>
                    <Rocket size={18} /> Register Now
                  </button>
                </div>
                
                {/* Countdown Timer */}
                <div className="w-full md:w-auto flex-shrink-0 bg-level-2/50 border border-white/5 p-6 rounded-2xl flex flex-col items-center">
                  <div className="text-xs font-bold font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Sparkles size={14} /> Registration Closes In
                  </div>
                  <div className="flex items-center gap-4 text-center">
                    {Object.entries(timeLeft).map(([unit, val]) => (
                      <div key={unit} className="flex flex-col items-center">
                        <div className="text-3xl md:text-4xl font-black font-mono text-white bg-level-3 px-3 py-2 rounded-lg border border-white/10 mb-1 w-16 md:w-20 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                          {String(val).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] uppercase tracking-widest text-muted">{unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS LIST WITH FILTERS */}
      <section className="px-6 pb-20 relative z-10 bg-level-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl font-black font-display text-offwhite mb-2 flex items-center gap-2">
                <Calendar size={24} style={{ color: '#3B82F6' }} /> Event Schedule
              </h2>
              <p className="text-sm text-muted">Filter by category to find what interests you.</p>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 bg-level-1 p-1.5 rounded-xl border border-white/5">
              {FILTERS.map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${filter === f ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'text-muted hover:text-white hover:bg-white/5'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-4">
            {displayEvents.map((e, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 50} 
                className="group relative glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] cursor-pointer overflow-hidden">
                
                {/* Subtle Hover Glow Inside Card */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 50%, rgba(59,130,246,0.05), transparent 50%)` }}></div>

                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center bg-level-2 border border-white/5 group-hover:bg-[#3B82F6]/10 group-hover:border-[#3B82F6]/30 transition-colors">
                  <span className="text-lg font-black text-offwhite leading-none group-hover:text-[#60A5FA] transition-colors">{e.date.split(' ')[1].replace(',','')}</span>
                  <span className="text-[10px] font-bold font-mono uppercase text-muted group-hover:text-[#3B82F6] transition-colors">{e.date.split(' ')[0]}</span>
                </div>
                
                <div className="flex-grow relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold font-display text-offwhite group-hover:text-white transition-colors">{e.title}</h3>
                    {e.featured && (
                      <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded uppercase flex items-center gap-1" style={{ backgroundColor: 'rgba(244,114,182,0.1)', color: '#F472B6', border: '1px solid rgba(244,114,182,0.2)' }}>
                        <Star size={10} /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-3 group-hover:text-gray-300 transition-colors">{e.desc}</p>
                  <div className="flex items-center gap-4 text-[10px] font-bold font-mono text-muted uppercase">
                    <span className="flex items-center gap-1"><Zap size={12} className="text-blue-400" /> {e.type}</span>
                    <span className="flex items-center gap-1"><Users size={12} className="text-cyan-400" /> {e.seats} Seats</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-level-2 border border-white/5 flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:border-[#3B82F6] transition-all duration-300 shadow-[0_0_0_rgba(59,130,246,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    <ArrowRight size={16} className="text-muted group-hover:text-white transition-colors group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            ))}
            
            {displayEvents.length === 0 && (
              <div className="py-12 text-center text-muted border border-dashed border-white/10 rounded-2xl">
                No upcoming {filter.toLowerCase()}s found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PAST EVENTS WITH MEDIA & IMPACT */}
      <section className="px-6 py-24 bg-level-1 relative">
        <div className="glow-divider absolute top-0 left-0 right-0"></div>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-offwhite mb-4">
              Past <span className="grad-text">Impact</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">A look back at what our community has built, learned, and achieved.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAST.map((p, i) => (
              <div key={i} data-animate="fade-up" data-delay={i * 100} className="group relative depth-card rounded-3xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-500 min-h-[320px]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-level-2">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060910] via-[#060910]/80 to-transparent"></div>
                </div>
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold font-mono uppercase text-white border border-white/10">
                      {p.date}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#3B82F6]/20 backdrop-blur-md text-[10px] font-bold font-mono uppercase text-[#60A5FA] border border-[#3B82F6]/30 flex items-center gap-1">
                      <Users size={10} /> {p.attendees}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 font-display text-white group-hover:text-[#60A5FA] transition-colors">{p.title}</h3>
                  
                  <div className="flex items-center gap-2 mt-2 pt-4 border-t border-white/10 text-sm font-medium text-gray-300">
                    <Trophy size={16} className="text-[#F472B6]" /> {p.outcomes}
                  </div>
                </div>
                
                {/* Floating View Gallery button on hover */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 hover:bg-white/20">
                  <ArrowRight size={16} className="text-white -rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
