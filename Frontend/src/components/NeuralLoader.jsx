import React, { useEffect, useRef, useState } from 'react';

export default function NeuralLoader({ onFinish }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, animId, time = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cx = W / 2;
      cy = H / 2;
    };
    resize();
    window.addEventListener('resize', resize);

    // ─── Particles: form a brain-like cluster ───
    const NUM = 200;
    const pts = Array.from({ length: NUM }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const r = 20 + Math.pow(Math.random(), 0.6) * 280;
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.7, // slight vertical squash
        ox: Math.cos(angle) * r,
        oy: Math.sin(angle) * r * 0.7,
        vx: 0, vy: 0,
        size: 0.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
      };
    });

    // ─── Hexagonal grid (background texture) ───
    const hexes = [];
    const hexSize = 30;
    for (let row = -10; row < 20; row++) {
      for (let col = -10; col < 30; col++) {
        const x = col * hexSize * 1.5;
        const y = row * hexSize * Math.sqrt(3) + (col % 2 ? hexSize * Math.sqrt(3) / 2 : 0);
        hexes.push({ x: x - W * 0.3, y: y - H * 0.3 });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.012;

      // ─── Hex grid background ───
      hexes.forEach(h => {
        const dx = (cx + h.x) - cx;
        const dy = (cy + h.y) - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(W, H) * 0.6;
        const wave = Math.sin(time * 0.8 - dist * 0.005) * 0.5 + 0.5;
        const alpha = Math.max(0, (1 - dist / maxDist) * 0.04 * wave);

        if (alpha > 0.002) {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + h.x + Math.cos(a) * 12;
            const py = cy + h.y + Math.sin(a) * 12;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // ─── Update & draw particles ───
      pts.forEach(p => {
        // Gentle orbital drift
        p.x = p.ox + Math.sin(time * p.speed + p.phase) * 15;
        p.y = p.oy + Math.cos(time * p.speed * 0.7 + p.phase) * 12;
      });

      // ─── Draw connections ───
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70) {
            const alpha = (1 - dist / 70) * 0.12;
            ctx.beginPath();
            ctx.moveTo(cx + pts[i].x, cy + pts[i].y);
            ctx.lineTo(cx + pts[j].x, cy + pts[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ─── Draw particle dots ───
      pts.forEach(p => {
        const distFromCenter = Math.sqrt(p.x * p.x + p.y * p.y);
        const brightness = Math.max(0.3, 1 - distFromCenter / 300);
        const pulse = 0.7 + 0.3 * Math.sin(time * 3 + p.phase);

        // Glow
        const g = ctx.createRadialGradient(cx + p.x, cy + p.y, 0, cx + p.x, cy + p.y, p.size * 4);
        g.addColorStop(0, `rgba(96, 165, 250, ${brightness * pulse * 0.25})`);
        g.addColorStop(1, 'rgba(96, 165, 250, 0)');
        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 219, 254, ${brightness * pulse})`;
        ctx.fill();
      });

      // ─── Central glow ───
      const pulse = 0.6 + 0.4 * Math.sin(time * 1.5);
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      cg.addColorStop(0, `rgba(96, 165, 250, ${0.15 * pulse})`);
      cg.addColorStop(0.5, `rgba(59, 130, 246, ${0.05 * pulse})`);
      cg.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    // ─── Text reveal with anime.js ───
    const timer = setTimeout(() => {
      setShowText(true);

      requestAnimationFrame(() => {
        const tl = window.anime.timeline({ easing: 'easeOutExpo' });

        // Stagger each letter of AIGNITE
        tl.add({
          targets: '.ldr-letter',
          translateY: [80, 0],
          opacity: [0, 1],
          duration: 900,
          delay: window.anime.stagger(60),
        })
        .add({
          targets: '.ldr-tagline',
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 700,
        }, '-=400')
        .add({
          targets: '.ldr-line-left',
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeInOutQuart',
        }, '-=600')
        .add({
          targets: '.ldr-line-right',
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeInOutQuart',
        }, '-=800')
        .add({
          targets: '.ldr-dot',
          scale: [0, 1],
          opacity: [0, 1],
          duration: 400,
        }, '-=400')
        .add({
          targets: '.ldr-bar-fill',
          scaleX: [0, 1],
          duration: 1400,
          easing: 'easeInOutQuart',
        }, '-=200')
        // Hold, then fade out
        .add({
          targets: overlayRef.current,
          opacity: 0,
          duration: 800,
          easing: 'easeInCubic',
          complete: () => onFinish(),
        }, '+=400');
      });
    }, 1800);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onFinish]);

  const letters = 'AIGNITE'.split('');

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-deep flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {showText && (
        <div className="relative z-10 flex flex-col items-center">
          {/* Letter reveal */}
          <div className="flex items-center gap-0 overflow-hidden mb-4">
            {letters.map((l, i) => (
              <span key={i} className="ldr-letter inline-block text-5xl md:text-7xl font-black font-display text-white tracking-[0.2em] opacity-0"
                style={{ textShadow: '0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(59,130,246,0.2)' }}>
                {l}
              </span>
            ))}
          </div>

          {/* Decorative lines flanking a dot */}
          <div className="flex items-center gap-3 mb-4">
            <div className="ldr-line-left w-16 h-[1px] bg-gradient-to-r from-transparent to-blue-400/60 origin-right opacity-0"></div>
            <div className="ldr-dot w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)] opacity-0"></div>
            <div className="ldr-line-right w-16 h-[1px] bg-gradient-to-l from-transparent to-blue-400/60 origin-left opacity-0"></div>
          </div>

          {/* Tagline */}
          <p className="ldr-tagline text-[10px] md:text-xs text-blue-300/50 font-bold tracking-[0.4em] uppercase opacity-0">
            AI & Technology Club
          </p>

          {/* Progress bar */}
          <div className="mt-8 w-48 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="ldr-bar-fill h-full w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full" style={{ transform: 'scaleX(0)' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
