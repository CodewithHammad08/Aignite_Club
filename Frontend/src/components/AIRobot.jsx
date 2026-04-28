import React, { useEffect, useRef } from 'react';

/**
 * Menacing AI Robot — angular, sharp, dangerous.
 * Scroll-driven: head snaps, eyes narrow, claws flex.
 */
export default function AIRobot() {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let raf, prevT = 0;

    const animate = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const total = document.body.scrollHeight - vh;
      const t = Math.min(scrollY / Math.max(total, 1), 1);

      if (Math.abs(t - prevT) < 0.0005) { raf = requestAnimationFrame(animate); return; }
      prevT = t;

      const svg = svgRef.current;
      if (!svg) { raf = requestAnimationFrame(animate); return; }

      // Container: aggressive drift
      if (containerRef.current) {
        const y = t * 30;
        const s = 1 - t * 0.1;
        containerRef.current.style.transform = `translateY(${y}px) scale(${s})`;
      }

      // Head: sharp snap rotations
      const head = svg.querySelector('#head');
      if (head) {
        const snap = Math.sin(t * Math.PI * 3) * 8;
        head.style.transform = `rotate(${snap}deg)`;
        head.style.transformOrigin = '100px 75px';
      }

      // Eyes: narrow/widen menacingly
      const eyeL = svg.querySelector('#slit-l');
      const eyeR = svg.querySelector('#slit-r');
      if (eyeL && eyeR) {
        const h = 4 + Math.abs(Math.sin(t * Math.PI * 5)) * 8;
        eyeL.setAttribute('height', h);
        eyeR.setAttribute('height', h);
        eyeL.setAttribute('y', 58 - h / 2);
        eyeR.setAttribute('y', 58 - h / 2);
      }

      // Eye glow intensity
      const glowL = svg.querySelector('#glow-l');
      const glowR = svg.querySelector('#glow-r');
      if (glowL && glowR) {
        const o = 0.4 + Math.abs(Math.sin(t * Math.PI * 6)) * 0.6;
        glowL.setAttribute('opacity', o);
        glowR.setAttribute('opacity', o);
      }

      // Jaw: opens/closes
      const jaw = svg.querySelector('#jaw');
      if (jaw) {
        const open = Math.abs(Math.sin(t * Math.PI * 4)) * 8;
        jaw.style.transform = `translateY(${open}px)`;
      }

      // Left claw: flex
      const clawL = svg.querySelector('#claw-l');
      if (clawL) {
        const flex = Math.sin(t * Math.PI * 4) * 25 - 10;
        clawL.style.transform = `rotate(${flex}deg)`;
        clawL.style.transformOrigin = '38px 148px';
      }

      // Right claw: flex opposite
      const clawR = svg.querySelector('#claw-r');
      if (clawR) {
        const flex = Math.sin(t * Math.PI * 4 + Math.PI) * 25 + 10;
        clawR.style.transform = `rotate(${flex}deg)`;
        clawR.style.transformOrigin = '162px 148px';
      }

      // Core reactor pulse
      const core = svg.querySelector('#core');
      if (core) {
        const p = 0.3 + Math.abs(Math.sin(t * Math.PI * 8)) * 0.7;
        core.setAttribute('opacity', p);
        core.setAttribute('r', 4 + p * 3);
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[320px] md:max-w-[420px] aspect-square select-none pointer-events-none"
      style={{ transition: 'transform 0.1s ease-out' }}>

      {/* Danger glow */}
      <div className="absolute inset-[20%] rounded-full blur-[70px] animate-pulse-glow" style={{ backgroundColor: 'rgba(153,225,217,0.08)' }}></div>

      {/* Sparks */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full" style={{
          backgroundColor: '#99E1D9',
          opacity: 0.2,
          top: `${20 + Math.random() * 60}%`,
          left: `${20 + Math.random() * 60}%`,
          animation: `spark ${1.5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
        }}></div>
      ))}

      <svg ref={svgRef} viewBox="0 0 200 230" className="relative z-10 w-full h-full">
        <defs>
          <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d3340" />
            <stop offset="50%" stopColor="#2a2228" />
            <stop offset="100%" stopColor="#32292F" />
          </linearGradient>
          <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2228" />
            <stop offset="100%" stopColor="#1a151a" />
          </linearGradient>
          <filter id="eyeGlow">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="coreGlow">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── HEAD (sharp angular) ── */}
        <g id="head" style={{ transition: 'transform 0.08s ease-out' }}>
          {/* Horn/spike left */}
          <polygon points="52,30 40,8 56,25" fill="#2a2228" stroke="#70ABAF" strokeWidth="0.5" />
          {/* Horn/spike right */}
          <polygon points="148,30 160,8 144,25" fill="#2a2228" stroke="#70ABAF" strokeWidth="0.5" />

          {/* Main head — angular hexagon shape */}
          <polygon points="100,18 148,35 155,75 145,105 55,105 45,75 52,35" fill="url(#metal)" stroke="#70ABAF" strokeWidth="0.6" />

          {/* Forehead plate */}
          <polygon points="100,22 140,37 60,37" fill="#2a2228" stroke="rgba(153,225,217,0.1)" strokeWidth="0.3" />

          {/* V-shaped visor cut */}
          <polygon points="62,48 100,42 138,48 138,72 62,72" fill="#1a151a" stroke="rgba(153,225,217,0.08)" strokeWidth="0.3" />

          {/* Left eye — narrow slit */}
          <rect id="glow-l" x="68" y="52" width="22" height="12" rx="1" fill="#99E1D9" opacity="0.15" filter="url(#eyeGlow)" />
          <rect id="slit-l" x="68" y="54" width="22" height="8" rx="1" fill="#99E1D9" filter="url(#eyeGlow)" />

          {/* Right eye — narrow slit */}
          <rect id="glow-r" x="110" y="52" width="22" height="12" rx="1" fill="#99E1D9" opacity="0.15" filter="url(#eyeGlow)" />
          <rect id="slit-r" x="110" y="54" width="22" height="8" rx="1" fill="#99E1D9" filter="url(#eyeGlow)" />

          {/* Nose ridge */}
          <line x1="100" y1="45" x2="100" y2="70" stroke="#70ABAF" strokeWidth="0.5" opacity="0.3" />

          {/* Cheek vents */}
          <g opacity="0.15" stroke="#70ABAF" strokeWidth="0.5">
            <line x1="50" y1="65" x2="58" y2="62" />
            <line x1="50" y1="69" x2="58" y2="66" />
            <line x1="50" y1="73" x2="58" y2="70" />
            <line x1="150" y1="65" x2="142" y2="62" />
            <line x1="150" y1="69" x2="142" y2="66" />
            <line x1="150" y1="73" x2="142" y2="70" />
          </g>

          {/* Jaw — separates from head, moves */}
          <g id="jaw" style={{ transition: 'transform 0.1s ease-out' }}>
            <polygon points="60,100 80,100 75,115 60,112" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
            <polygon points="140,100 120,100 125,115 140,112" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
            {/* Center jaw */}
            <polygon points="82,100 118,100 115,112 85,112" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
            {/* Teeth grille */}
            <g opacity="0.25" stroke="#99E1D9" strokeWidth="0.5">
              <line x1="88" y1="103" x2="88" y2="109" />
              <line x1="93" y1="103" x2="93" y2="109" />
              <line x1="98" y1="103" x2="98" y2="109" />
              <line x1="103" y1="103" x2="103" y2="109" />
              <line x1="108" y1="103" x2="108" y2="109" />
            </g>
          </g>

          {/* Battle scar on left */}
          <line x1="58" y1="42" x2="48" y2="58" stroke="#705D56" strokeWidth="1" opacity="0.15" />
          <line x1="56" y1="44" x2="46" y2="60" stroke="#705D56" strokeWidth="0.5" opacity="0.1" />
        </g>

        {/* Neck — exposed pistons */}
        <rect x="85" y="115" width="30" height="22" rx="3" fill="url(#darkMetal)" stroke="rgba(153,225,217,0.06)" strokeWidth="0.5" />
        <circle cx="92" cy="126" r="3" fill="none" stroke="#70ABAF" strokeWidth="0.5" opacity="0.2" />
        <circle cx="108" cy="126" r="3" fill="none" stroke="#70ABAF" strokeWidth="0.5" opacity="0.2" />

        {/* Torso — armored, angular */}
        <polygon points="55,138 145,138 150,165 148,195 52,195 50,165" fill="url(#metal)" stroke="#70ABAF" strokeWidth="0.5" />
        {/* Armor plates */}
        <line x1="100" y1="138" x2="100" y2="195" stroke="rgba(153,225,217,0.04)" strokeWidth="0.5" />
        <line x1="70" y1="145" x2="70" y2="190" stroke="rgba(153,225,217,0.03)" strokeWidth="0.3" />
        <line x1="130" y1="145" x2="130" y2="190" stroke="rgba(153,225,217,0.03)" strokeWidth="0.3" />

        {/* Core reactor */}
        <polygon points="90,155 100,148 110,155 108,168 92,168" fill="#1a151a" stroke="#70ABAF" strokeWidth="0.5" />
        <circle id="core" cx="100" cy="160" r="5" fill="#99E1D9" filter="url(#coreGlow)" opacity="0.5" />

        {/* Shoulder spikes */}
        <polygon points="50,138 38,130 52,142" fill="#2a2228" stroke="#70ABAF" strokeWidth="0.4" />
        <polygon points="150,138 162,130 148,142" fill="#2a2228" stroke="#70ABAF" strokeWidth="0.4" />

        {/* ── LEFT CLAW ARM ── */}
        <g id="claw-l" style={{ transition: 'transform 0.1s ease-out' }}>
          {/* Upper arm */}
          <rect x="28" y="142" width="28" height="14" rx="3" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
          {/* Forearm */}
          <rect x="22" y="154" width="16" height="38" rx="3" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
          {/* Claw fingers */}
          <polygon points="20,192 12,210 18,210 24,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
          <polygon points="28,192 26,214 30,214 34,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
          <polygon points="36,192 40,210 36,210 32,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
        </g>

        {/* ── RIGHT CLAW ARM ── */}
        <g id="claw-r" style={{ transition: 'transform 0.1s ease-out' }}>
          <rect x="144" y="142" width="28" height="14" rx="3" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
          <rect x="162" y="154" width="16" height="38" rx="3" fill="url(#darkMetal)" stroke="#70ABAF" strokeWidth="0.4" />
          {/* Claw fingers */}
          <polygon points="164,192 158,210 164,210 168,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
          <polygon points="170,192 168,214 172,214 174,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
          <polygon points="178,192 184,210 178,210 176,195" fill="#2a2228" stroke="#99E1D9" strokeWidth="0.4" />
        </g>

        {/* Damage sparks */}
        <circle cx="148" cy="155" r="1" fill="#99E1D9" opacity="0.3">
          <animate attributeName="opacity" values="0;0.6;0" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="170" r="0.8" fill="#99E1D9" opacity="0.2">
          <animate attributeName="opacity" values="0;0.5;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>

      <style>{`
        @keyframes spark {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          50% { opacity: 0.4; transform: translateY(-8px) scale(1.5); }
        }
      `}</style>
    </div>
  );
}
