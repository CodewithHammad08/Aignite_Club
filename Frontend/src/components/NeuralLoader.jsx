import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';

export default function NeuralLoader({ onFinish }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [showReveal, setShowReveal] = useState(false);

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

    // ─── Orbital rings ───
    const rings = [
      { r: 80,  speed: 0.3,  dots: 6,  dotSize: 2.5, alpha: 0.6 },
      { r: 130, speed: -0.2, dots: 8,  dotSize: 2,   alpha: 0.4 },
      { r: 190, speed: 0.15, dots: 12, dotSize: 1.5, alpha: 0.3 },
      { r: 260, speed: -0.1, dots: 16, dotSize: 1.2, alpha: 0.2 },
    ];

    // ─── Floating particles ───
    const particles = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 350;
      return {
        x: 0, y: 0,
        angle,
        dist,
        speed: (Math.random() - 0.5) * 0.004,
        drift: Math.random() * 0.002,
        size: 0.5 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
      };
    });

    // ─── Connection lines between close particles ───
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.08;
            ctx.beginPath();
            ctx.moveTo(cx + particles[i].x, cy + particles[i].y);
            ctx.lineTo(cx + particles[j].x, cy + particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      time += 0.016;

      // ─── Central pulsing core ───
      const coreSize = 30 + Math.sin(time * 1.5) * 8;
      
      // Outer halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 6);
      halo.addColorStop(0, `rgba(59, 130, 246, ${0.12 + Math.sin(time) * 0.04})`);
      halo.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
      halo.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 6, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Inner glow
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 2);
      inner.addColorStop(0, `rgba(147, 197, 253, ${0.25 + Math.sin(time * 2) * 0.1})`);
      inner.addColorStop(0.6, 'rgba(96, 165, 250, 0.08)');
      inner.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 2, 0, Math.PI * 2);
      ctx.fillStyle = inner;
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
      core.addColorStop(0, 'rgba(219, 234, 254, 0.9)');
      core.addColorStop(0.4, 'rgba(147, 197, 253, 0.5)');
      core.addColorStop(1, 'rgba(96, 165, 250, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      // ─── Orbital rings ───
      rings.forEach(ring => {
        // Ring path (faint circle)
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${ring.alpha * 0.15})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Dots along ring
        for (let i = 0; i < ring.dots; i++) {
          const a = (i / ring.dots) * Math.PI * 2 + time * ring.speed;
          const x = cx + Math.cos(a) * ring.r;
          const y = cy + Math.sin(a) * ring.r;
          const pulse = 0.5 + 0.5 * Math.sin(time * 3 + i);

          // Dot glow
          const dg = ctx.createRadialGradient(x, y, 0, x, y, ring.dotSize * 6);
          dg.addColorStop(0, `rgba(96, 165, 250, ${ring.alpha * pulse * 0.5})`);
          dg.addColorStop(1, 'rgba(96, 165, 250, 0)');
          ctx.beginPath();
          ctx.arc(x, y, ring.dotSize * 6, 0, Math.PI * 2);
          ctx.fillStyle = dg;
          ctx.fill();

          // Dot core
          ctx.beginPath();
          ctx.arc(x, y, ring.dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(191, 219, 254, ${ring.alpha + pulse * 0.3})`;
          ctx.fill();
        }

        // Arc segment (sweeping highlight)
        const sweepStart = time * ring.speed * 2;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, sweepStart, sweepStart + 0.8);
        ctx.strokeStyle = `rgba(96, 165, 250, ${ring.alpha * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // ─── Particles ───
      particles.forEach(p => {
        p.angle += p.speed;
        p.dist += Math.sin(time + p.pulse) * 0.3;
        p.x = Math.cos(p.angle) * p.dist;
        p.y = Math.sin(p.angle) * p.dist;
        const flicker = 0.6 + 0.4 * Math.sin(time * 2 + p.pulse);

        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha * flicker})`;
        ctx.fill();
      });

      // ─── Particle connections ───
      drawConnections();

      animId = requestAnimationFrame(draw);
    };

    draw();

    // ─── Anime.js reveal after 2s ───
    const timer = setTimeout(() => {
      setShowReveal(true);

      requestAnimationFrame(() => {
        const tl = window.anime.timeline({ easing: 'easeOutExpo' });

        tl.add({
          targets: '.ai-loader-logo',
          scale: [0.3, 1],
          opacity: [0, 1],
          duration: 1000,
        })
        .add({
          targets: '.ai-loader-name span',
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 700,
          delay: window.anime.stagger(80),
        }, '-=400')
        .add({
          targets: '.ai-loader-tagline',
          translateY: [15, 0],
          opacity: [0, 1],
          duration: 600,
        }, '-=300')
        .add({
          targets: '.ai-loader-bar-inner',
          scaleX: [0, 1],
          duration: 1400,
          easing: 'easeInOutQuart',
        }, '-=200')
        .add({
          targets: overlayRef.current,
          opacity: 0,
          duration: 600,
          easing: 'easeInQuad',
          complete: () => onFinish(),
        }, '+=500');
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onFinish]);

  // Split "AIGNITE" into individual letter spans
  const letters = 'AIGNITE'.split('');

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-deep flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {showReveal && (
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={logo}
            alt="Aignite"
            className="ai-loader-logo w-20 h-20 object-contain mb-6 opacity-0 drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]"
          />
          <h2 className="ai-loader-name text-4xl md:text-5xl font-black font-display text-white tracking-widest flex overflow-hidden">
            {letters.map((l, i) => (
              <span key={i} className="inline-block opacity-0">{l}</span>
            ))}
          </h2>
          <p className="ai-loader-tagline text-xs text-blue-300/60 font-bold mt-3 tracking-[0.3em] uppercase opacity-0">
            Artificial Intelligence & Technology Club
          </p>
          <div className="mt-8 w-40 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="ai-loader-bar-inner h-full w-full origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full" style={{ transform: 'scaleX(0)' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
