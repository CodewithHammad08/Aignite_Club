import React, { useEffect, useRef } from 'react';

/**
 * Professional holographic wireframe robot.
 * Drawn on canvas — clean geometric lines, glowing joints, HUD overlay.
 * Scroll-driven: walks, head tracks, arms swing, core pulses.
 */
export default function HeroRobot() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf, time = 0;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.width / dpr;
    const H = () => canvas.height / dpr;

    // Colors
    const BLUE = '#3B82F6';
    const NEON = '#60A5FA';
    const CYAN = '#22D3EE';

    const drawLine = (x1, y1, x2, y2, color, alpha, width = 1) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawJoint = (x, y, r, pulse = 0) => {
      // Outer glow
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      g.addColorStop(0, `rgba(59,130,246,${0.15 + pulse * 0.15})`);
      g.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      // Ring
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = NEON;
      ctx.globalAlpha = 0.5 + pulse * 0.5;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // Core
      ctx.beginPath();
      ctx.arc(x, y, r * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = CYAN;
      ctx.globalAlpha = 0.6 + pulse * 0.4;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawHexagonPlate = (cx, cy, size, rotation = 0) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + rotation;
        const x = cx + Math.cos(a) * size;
        const y = cy + Math.sin(a) * size;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = BLUE;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    let scrollT = 0;
    const onScroll = () => {
      const vh = window.innerHeight;
      const total = document.body.scrollHeight - vh;
      scrollT = Math.min(window.scrollY / Math.max(total, 1), 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      time += 0.015;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const baseY = h * 0.42;
      const t = scrollT;
      const walkCycle = Math.sin(t * Math.PI * 6);
      const breathe = Math.sin(time * 1.5) * 2;

      // Scroll drift - whole robot moves down
      const driftY = t * 60;

      // ─── Background hex grid ───
      for (let i = 0; i < 12; i++) {
        const hx = cx + Math.cos(i * 0.5 + time * 0.2) * (60 + i * 15);
        const hy = baseY + driftY + Math.sin(i * 0.7 + time * 0.15) * (40 + i * 10);
        drawHexagonPlate(hx, hy, 15 + i * 3, time * 0.1 + i);
      }

      // ─── ROBOT SKELETON ───
      const headY = baseY - 65 + breathe + driftY;
      const headTilt = Math.sin(t * Math.PI * 3) * 6;

      // Spine
      const spineTop = baseY - 30 + driftY;
      const spineBot = baseY + 55 + driftY;
      drawLine(cx, spineTop + breathe, cx, spineBot, BLUE, 0.25, 1.5);

      // ── HEAD ──
      ctx.save();
      ctx.translate(cx, headY);
      ctx.rotate((headTilt * Math.PI) / 180);

      // Head shape — angular polygon
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(18, -12);
      ctx.lineTo(20, 8);
      ctx.lineTo(12, 18);
      ctx.lineTo(-12, 18);
      ctx.lineTo(-20, 8);
      ctx.lineTo(-18, -12);
      ctx.closePath();
      ctx.strokeStyle = NEON;
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = 'rgba(15,23,42,0.4)';
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Visor — horizontal slit
      const visorH = 3 + Math.abs(Math.sin(t * Math.PI * 5)) * 5;
      ctx.fillStyle = CYAN;
      ctx.globalAlpha = 0.7 + Math.sin(time * 3) * 0.3;
      ctx.fillRect(-14, -4, 28, visorH);
      // Visor glow
      const vg = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      vg.addColorStop(0, `rgba(34,211,238,${0.15 + Math.sin(time * 3) * 0.1})`);
      vg.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = vg;
      ctx.fillRect(-30, -15, 60, 30);
      ctx.globalAlpha = 1;

      // Chin line
      drawLine(-8, 14, 8, 14, BLUE, 0.2, 0.5);

      ctx.restore();

      // ── SHOULDERS ──
      const shoulderY = baseY - 22 + breathe + driftY;
      const shoulderW = 45;
      drawLine(cx - shoulderW, shoulderY, cx + shoulderW, shoulderY, NEON, 0.3, 1.5);
      drawJoint(cx - shoulderW, shoulderY, 4, Math.abs(walkCycle) * 0.5);
      drawJoint(cx + shoulderW, shoulderY, 4, Math.abs(walkCycle) * 0.5);

      // ── CHEST PLATE ──
      ctx.beginPath();
      ctx.moveTo(cx - 30, shoulderY + 5);
      ctx.lineTo(cx + 30, shoulderY + 5);
      ctx.lineTo(cx + 25, shoulderY + 50);
      ctx.lineTo(cx - 25, shoulderY + 50);
      ctx.closePath();
      ctx.strokeStyle = BLUE;
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Core reactor
      const coreY = shoulderY + 28;
      const corePulse = 0.5 + Math.abs(Math.sin(t * Math.PI * 8 + time)) * 0.5;
      const cg = ctx.createRadialGradient(cx, coreY, 0, cx, coreY, 20);
      cg.addColorStop(0, `rgba(34,211,238,${0.3 * corePulse})`);
      cg.addColorStop(0.5, `rgba(59,130,246,${0.1 * corePulse})`);
      cg.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.beginPath();
      ctx.arc(cx, coreY, 20, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      // Core ring
      ctx.beginPath();
      ctx.arc(cx, coreY, 8, 0, Math.PI * 2);
      ctx.strokeStyle = CYAN;
      ctx.globalAlpha = 0.4 + corePulse * 0.4;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, coreY, 3, 0, Math.PI * 2);
      ctx.fillStyle = CYAN;
      ctx.globalAlpha = corePulse;
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── ARMS ──
      const armSwing = walkCycle * 20;

      // Left arm
      const laElbowX = cx - shoulderW - 8 + Math.sin(armSwing * 0.02) * 5;
      const laElbowY = shoulderY + 35 + Math.abs(Math.sin(armSwing * 0.03)) * 5;
      const laHandX = laElbowX - 3 + Math.sin(armSwing * 0.02) * 8;
      const laHandY = laElbowY + 30;
      drawLine(cx - shoulderW, shoulderY, laElbowX, laElbowY, NEON, 0.3, 1.2);
      drawLine(laElbowX, laElbowY, laHandX, laHandY, NEON, 0.25, 1);
      drawJoint(laElbowX, laElbowY, 3, 0.3);
      drawJoint(laHandX, laHandY, 2.5, 0.2);

      // Right arm
      const raElbowX = cx + shoulderW + 8 - Math.sin(armSwing * 0.02) * 5;
      const raElbowY = shoulderY + 35 + Math.abs(Math.cos(armSwing * 0.03)) * 5;
      const raHandX = raElbowX + 3 - Math.sin(armSwing * 0.02) * 8;
      const raHandY = raElbowY + 30;
      drawLine(cx + shoulderW, shoulderY, raElbowX, raElbowY, NEON, 0.3, 1.2);
      drawLine(raElbowX, raElbowY, raHandX, raHandY, NEON, 0.25, 1);
      drawJoint(raElbowX, raElbowY, 3, 0.3);
      drawJoint(raHandX, raHandY, 2.5, 0.2);

      // ── HIPS ──
      const hipY = spineBot;
      drawLine(cx - 20, hipY, cx + 20, hipY, BLUE, 0.25, 1.2);
      drawJoint(cx - 20, hipY, 3, 0.2);
      drawJoint(cx + 20, hipY, 3, 0.2);

      // ── LEGS ──
      const legSwing = walkCycle * 12;

      // Left leg
      const llKneeX = cx - 22 + Math.sin(legSwing * 0.015) * 3;
      const llKneeY = hipY + 35 + Math.abs(walkCycle) * 3;
      const llFootX = llKneeX - 3;
      const llFootY = llKneeY + 30;
      drawLine(cx - 20, hipY, llKneeX, llKneeY, BLUE, 0.25, 1.2);
      drawLine(llKneeX, llKneeY, llFootX, llFootY, BLUE, 0.2, 1);
      drawJoint(llKneeX, llKneeY, 3, 0.2);
      drawJoint(llFootX, llFootY, 2.5, 0.15);
      // Foot plate
      drawLine(llFootX - 8, llFootY, llFootX + 6, llFootY, NEON, 0.2, 1.5);

      // Right leg
      const rlKneeX = cx + 22 - Math.sin(legSwing * 0.015) * 3;
      const rlKneeY = hipY + 35 + Math.abs(-walkCycle) * 3;
      const rlFootX = rlKneeX + 3;
      const rlFootY = rlKneeY + 30;
      drawLine(cx + 20, hipY, rlKneeX, rlKneeY, BLUE, 0.25, 1.2);
      drawLine(rlKneeX, rlKneeY, rlFootX, rlFootY, BLUE, 0.2, 1);
      drawJoint(rlKneeX, rlKneeY, 3, 0.2);
      drawJoint(rlFootX, rlFootY, 2.5, 0.15);
      drawLine(rlFootX - 6, rlFootY, rlFootX + 8, rlFootY, NEON, 0.2, 1.5);

      // ── HUD ELEMENTS ──
      // Data readouts near head
      ctx.font = '500 7px "JetBrains Mono", monospace';
      ctx.fillStyle = NEON;
      ctx.globalAlpha = 0.2 + Math.abs(Math.sin(time * 2)) * 0.15;
      ctx.textAlign = 'left';
      ctx.fillText(`STATUS: ONLINE`, cx + 30, headY - 15);
      ctx.fillText(`SCROLL: ${Math.round(t * 100)}%`, cx + 30, headY - 5);
      ctx.fillText(`CORE: ${Math.round(corePulse * 100)}%`, cx + 30, headY + 5);
      // Corner brackets
      ctx.strokeStyle = BLUE;
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 0.8;
      // Top-left bracket
      ctx.beginPath(); ctx.moveTo(cx + 26, headY - 20); ctx.lineTo(cx + 26, headY - 22); ctx.lineTo(cx + 30, headY - 22); ctx.stroke();
      // Bottom-right bracket
      ctx.beginPath(); ctx.moveTo(cx + 76, headY + 8); ctx.lineTo(cx + 76, headY + 10); ctx.lineTo(cx + 72, headY + 10); ctx.stroke();
      ctx.globalAlpha = 1;

      // Scanning ring around head
      ctx.beginPath();
      ctx.arc(cx, headY, 32, time % (Math.PI * 2), (time % (Math.PI * 2)) + Math.PI * 0.4);
      ctx.strokeStyle = CYAN;
      ctx.globalAlpha = 0.08;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Particle sparks at joints
      if (Math.random() > 0.92) {
        const sparkJoints = [[cx - shoulderW, shoulderY], [cx + shoulderW, shoulderY], [cx, coreY]];
        const sj = sparkJoints[Math.floor(Math.random() * sparkJoints.length)];
        ctx.beginPath();
        ctx.arc(sj[0] + (Math.random() - 0.5) * 10, sj[1] + (Math.random() - 0.5) * 10, 1, 0, Math.PI * 2);
        ctx.fillStyle = CYAN;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[420px] aspect-[3/4] select-none pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
