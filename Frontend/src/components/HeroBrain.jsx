 import React, { useEffect, useRef } from 'react';

/**
 * Floating AI brain hero image with scroll-driven parallax.
 * Moves down, rotates slightly, and scales as user scrolls.
 * Uses a generated AI brain hologram image.
 */
export default function HeroBrain() {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let raf;

    const animate = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const total = document.body.scrollHeight - vh;
      const t = Math.min(scrollY / Math.max(total, 1), 1);

      // Image: moves down + slight rotation + scale
      if (imgRef.current) {
        const moveY = t * 120;
        const rotate = Math.sin(t * Math.PI * 2) * 8;
        const scale = 1 + t * 0.08;
        imgRef.current.style.transform = `translateY(${moveY}px) rotate(${rotate}deg) scale(${scale})`;
      }

      // Glow: pulses and shifts
      if (glowRef.current) {
        const pulse = 0.15 + Math.sin(t * Math.PI * 3) * 0.1;
        const shiftX = Math.sin(t * Math.PI * 4) * 20;
        glowRef.current.style.opacity = pulse;
        glowRef.current.style.transform = `translate(${shiftX}px, ${t * 60}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[500px] aspect-square select-none pointer-events-none">
      {/* Multi-layer glow */}
      <div ref={glowRef} className="absolute inset-[10%] rounded-full blur-[80px]" style={{ backgroundColor: 'rgba(153,225,217,0.15)', transition: 'transform 0.2s ease-out, opacity 0.2s ease-out' }}></div>
      <div className="absolute inset-[25%] rounded-full blur-[50px] animate-pulse-glow" style={{ backgroundColor: 'rgba(112,171,175,0.1)' }}></div>

      {/* Brain image */}
      <img
        ref={imgRef}
        src="/ai-brain.png"
        alt=""
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_40px_rgba(153,225,217,0.3)]"
        style={{ transition: 'transform 0.15s ease-out', mixBlendMode: 'screen' }}
      />

      {/* Floating particles around */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: 2 + Math.random() * 3,
          height: 2 + Math.random() * 3,
          backgroundColor: i % 3 === 0 ? '#99E1D9' : '#70ABAF',
          opacity: 0.15 + Math.random() * 0.2,
          top: `${15 + Math.random() * 70}%`,
          left: `${15 + Math.random() * 70}%`,
          animation: `float-particle ${3 + i * 0.8}s ease-in-out ${i * 0.4}s infinite alternate`,
        }}></div>
      ))}

      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-15px) translateX(8px); }
        }
      `}</style>
    </div>
  );
}
