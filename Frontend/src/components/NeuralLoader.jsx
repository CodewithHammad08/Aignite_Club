import React, { useEffect, useRef, useState } from 'react';

export default function NeuralLoader({ onFinish }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, cx, cy, animId, time = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; cx = W / 2; cy = H / 2; };
    resize(); window.addEventListener('resize', resize);

    const C = { blue: [59,130,246], neon: [96,165,250], cyan: [34,211,238] };
    const rgb = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const pts = Array.from({ length: 200 }, () => {
      const a = Math.random() * Math.PI * 2, r = 20 + Math.pow(Math.random(), 0.6) * 280;
      return { x: Math.cos(a)*r, y: Math.sin(a)*r*0.7, ox: Math.cos(a)*r, oy: Math.sin(a)*r*0.7, size: 0.8+Math.random()*2.2, phase: Math.random()*Math.PI*2, speed: 0.3+Math.random()*0.7 };
    });

    const hexes = [];
    for (let row=-10;row<20;row++) for (let col=-10;col<30;col++) hexes.push({ x: col*45-W*0.3, y: row*30*Math.sqrt(3)+(col%2?15*Math.sqrt(3):0)-H*0.3 });

    const draw = () => {
      ctx.clearRect(0,0,W,H); time += 0.012;
      hexes.forEach(h => {
        const dist = Math.sqrt(h.x**2+h.y**2), wave = Math.sin(time*0.8-dist*0.005)*0.5+0.5;
        const alpha = Math.max(0,(1-dist/(Math.max(W,H)*0.6))*0.03*wave);
        if(alpha>0.002){ctx.beginPath();for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6;const px=cx+h.x+Math.cos(a)*12;const py=cy+h.y+Math.sin(a)*12;i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);}ctx.closePath();ctx.strokeStyle=rgb(C.blue,alpha);ctx.lineWidth=0.5;ctx.stroke();}
      });
      pts.forEach(p=>{p.x=p.ox+Math.sin(time*p.speed+p.phase)*15;p.y=p.oy+Math.cos(time*p.speed*0.7+p.phase)*12;});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const d=Math.sqrt((pts[i].x-pts[j].x)**2+(pts[i].y-pts[j].y)**2);if(d<70){ctx.beginPath();ctx.moveTo(cx+pts[i].x,cy+pts[i].y);ctx.lineTo(cx+pts[j].x,cy+pts[j].y);ctx.strokeStyle=rgb(C.neon,(1-d/70)*0.1);ctx.lineWidth=0.6;ctx.stroke();}}
      pts.forEach(p=>{const d=Math.sqrt(p.x**2+p.y**2),b=Math.max(0.3,1-d/300),pulse=0.7+0.3*Math.sin(time*3+p.phase);const g=ctx.createRadialGradient(cx+p.x,cy+p.y,0,cx+p.x,cy+p.y,p.size*4);g.addColorStop(0,rgb(C.neon,b*pulse*0.25));g.addColorStop(1,rgb(C.neon,0));ctx.beginPath();ctx.arc(cx+p.x,cy+p.y,p.size*4,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();ctx.beginPath();ctx.arc(cx+p.x,cy+p.y,p.size,0,Math.PI*2);ctx.fillStyle=rgb(C.cyan,b*pulse*0.8);ctx.fill();});
      const gp=0.6+0.4*Math.sin(time*1.5);const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,120);cg.addColorStop(0,rgb(C.blue,0.08*gp));cg.addColorStop(0.5,rgb(C.cyan,0.03*gp));cg.addColorStop(1,rgb(C.blue,0));ctx.beginPath();ctx.arc(cx,cy,120,0,Math.PI*2);ctx.fillStyle=cg;ctx.fill();
      animId=requestAnimationFrame(draw);
    };
    draw();

    // Show text after 1.8s, then fade out after another 2.5s — pure CSS animations, no animejs
    const t1 = setTimeout(() => setShowText(true), 1800);
    const t2 = setTimeout(() => setFadeOut(true), 4000);
    const t3 = setTimeout(() => onFinish(), 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, [onFinish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: '#0B0F1A',
        transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <style>{`
        @keyframes ldrLetterIn {
          from { transform: translateY(80px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes ldrFadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes ldrScaleX {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes ldrDot {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes ldrBarFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {showText && (
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-0 overflow-hidden mb-4">
            {'AIGNITE'.split('').map((l, i) => (
              <span
                key={i}
                className="inline-block text-5xl md:text-7xl font-black font-display tracking-[0.2em]"
                style={{
                  color: '#E5E7EB',
                  textShadow: '0 0 40px rgba(59,130,246,0.5), 0 0 80px rgba(34,211,238,0.2)',
                  animation: `ldrLetterIn 0.9s cubic-bezier(0.16,1,0.3,1) both`,
                  animationDelay: `${i * 60}ms`,
                }}
              >{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-16 h-[1px] origin-right"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(59,130,246,0.6))',
                animation: 'ldrScaleX 0.8s cubic-bezier(0.76,0,0.24,1) 0.5s both',
              }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#3B82F6',
                boxShadow: '0 0 12px rgba(59,130,246,0.8)',
                animation: 'ldrDot 0.4s cubic-bezier(0.16,1,0.3,1) 0.9s both',
              }}
            />
            <div
              className="w-16 h-[1px] origin-left"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(59,130,246,0.6))',
                animation: 'ldrScaleX 0.8s cubic-bezier(0.76,0,0.24,1) 0.5s both',
              }}
            />
          </div>
          <p
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase"
            style={{
              color: 'rgba(96,165,250,0.5)',
              animation: 'ldrFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s both',
            }}
          >AI &amp; Technology Club</p>
          <div className="mt-8 w-48 h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
            <div
              className="h-full w-full origin-left rounded-full"
              style={{
                background: 'linear-gradient(to right, #0F172A, #3B82F6, #22D3EE)',
                animation: 'ldrBarFill 1.4s cubic-bezier(0.76,0,0.24,1) 0.6s both',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
