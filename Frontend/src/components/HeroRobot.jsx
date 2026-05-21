import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   AIGNITE HERO — Arc Reactor  +  Neural Brain Network  (enhanced)
   ─ 5 orbital rings with comet particle trails
   ─ Sweeping scan wedge
   ─ Outer tick-mark dial
   ─ Radial circuit spokes
   ─ Inner-node to core connections
   ─ Richer core bloom (extra gradient layers)
   ─ Ambient floating dust
   ─ HUD sparkline waveform
   ─ Double-pass bright neural connections
   ═══════════════════════════════════════════════════════════════ */

const C = '#22D3EE';   // cyan
const B = '#3B82F6';   // blue
const W = '#ffffff';
const P = '#818CF8';   // indigo
const G = '#34D399';   // green
const A = '#F59E0B';   // amber accent

const lerp = (a, b, t) => a + (b - a) * t;
const rnd  = (lo, hi)  => Math.random() * (hi - lo) + lo;

/* ── Rounded rect helper ── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function HeroRobot() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const CW = () => canvas.width  / dpr;
    const CH = () => canvas.height / dpr;

    /* ══════════ NEURAL NODES ══════════ */
    const buildNodes = () => {
      const cx = CW() / 2, cy = CH() / 2;
      const nodes = [];

      // Outer brain-oval (28 nodes)
      for (let i = 0; i < 28; i++) {
        const angle   = (i / 28) * Math.PI * 2 + rnd(-0.12, 0.12);
        const radiusX = CW() * 0.37 + rnd(-18, 18);
        const radiusY = CH() * 0.31 + rnd(-14, 14);
        const bumpY   = Math.sin(angle * 2) * 20;
        nodes.push({
          x:     cx + Math.cos(angle) * radiusX,
          y:     cy + Math.sin(angle) * radiusY + bumpY,
          r:     rnd(2.8, 5.5),
          color: [C, B, P, G][Math.floor(rnd(0, 4))],
          phase: rnd(0, Math.PI * 2),
          speed: rnd(0.6, 1.4),
          inner: false,
        });
      }
      // Inner cluster (8 nodes closer to core)
      for (let i = 0; i < 8; i++) {
        const a = rnd(0, Math.PI * 2);
        const d = rnd(55, 115);
        nodes.push({
          x:     cx + Math.cos(a) * d,
          y:     cy + Math.sin(a) * d,
          r:     rnd(2, 3.8),
          color: [C, B, P][Math.floor(rnd(0, 3))],
          phase: rnd(0, Math.PI * 2),
          speed: rnd(0.8, 1.7),
          inner: true,
        });
      }
      return nodes;
    };

    let nodes = buildNodes();

    /* ══════════ SYNAPTIC PULSES ══════════ */
    class Pulse {
      constructor(a, b) {
        this.a = a; this.b = b;
        this.p     = 0;
        this.speed = rnd(0.007, 0.017);
        this.color = [C, B, P, G, '#F472B6'][Math.floor(rnd(0, 5))];
        this.size  = rnd(2.2, 4.5);
        this.done  = false;
      }
      update() { this.p += this.speed; if (this.p >= 1) this.done = true; }
      draw(ctx) {
        const x = lerp(this.a.x, this.b.x, this.p);
        const y = lerp(this.a.y, this.b.y, this.p);
        // Wide glow
        const g = ctx.createRadialGradient(x, y, 0, x, y, this.size * 7);
        g.addColorStop(0, this.color + 'bb'); g.addColorStop(1, this.color + '00');
        ctx.beginPath(); ctx.arc(x, y, this.size * 7, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        // Hard core
        ctx.beginPath(); ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = W; ctx.globalAlpha = 0.97; ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    let pulses = [], pulseTimer = 0;

    /* ══════════ AMBIENT DUST PARTICLES ══════════ */
    const DUST_COUNT = 40;
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: rnd(0, 1), y: rnd(0, 1),
      vx: rnd(-0.0003, 0.0003), vy: rnd(-0.0006, -0.0002),
      life: rnd(0, 1), maxLife: rnd(0.006, 0.014),
      r: rnd(0.6, 1.4),
      color: [C, B, P, G][Math.floor(rnd(0, 4))],
    }));

    /* ══════════ 5 ORBITAL RINGS ══════════ */
    const orbits = [
      { r: 160, speed:  0.55, count: 3, color: C,  offset: 0             },
      { r: 185, speed: -0.30, count: 5, color: B,  offset: Math.PI / 5   },
      { r: 208, speed:  0.20, count: 4, color: P,  offset: Math.PI / 8   },
      { r: 232, speed: -0.14, count: 6, color: G,  offset: Math.PI / 3   },
      { r: 258, speed:  0.10, count: 8, color: A,  offset: Math.PI / 6   },
    ];

    /* ══════════ DRAW HELPERS ══════════ */
    const drawRing = (cx, cy, radius, width, color, alpha, dashLen = 0, gap = 0, rotation = 0) => {
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(rotation);
      ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2);
      if (dashLen > 0) ctx.setLineDash([dashLen, gap]); else ctx.setLineDash([]);
      ctx.strokeStyle = color; ctx.globalAlpha = alpha;
      ctx.lineWidth = width; ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1; ctx.restore();
    };

    const drawLattice = (cx, cy, radius, rotation) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(rotation);
      for (let ring = 1; ring <= 3; ring++) {
        const r = radius * (ring / 3);
        ctx.beginPath();
        for (let i = 0; i <= 3; i++) {
          const a = (Math.PI * 2 * i / 3) - Math.PI / 2;
          i === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r)
                  : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
        }
        ctx.closePath();
        ctx.strokeStyle = C; ctx.globalAlpha = 0.13 + ring * 0.04;
        ctx.lineWidth = 0.8; ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const a = (Math.PI * 2 * i / 3) - Math.PI / 2;
          ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
          ctx.strokeStyle = C; ctx.globalAlpha = 0.07; ctx.lineWidth = 0.5; ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    };

    /* ══════════ MAIN DRAW LOOP ══════════ */
    const draw = () => {
      t += 0.012;
      const w = CW(), h = CH();
      const cx = w / 2, cy = h / 2;
      const breathe = 0.5 + Math.sin(t * 0.7) * 0.25;
      ctx.clearRect(0, 0, w, h);

      /* ── 1. DEEP AMBIENT BLOOM (3 layers) ── */
      [[280, 0.11, C], [230, 0.07, B], [160, 0.04, P]].forEach(([r, a, col]) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   col.replace('#', 'rgba(') + `,${a * breathe})`); // hack-free below:
        const rgb = col === C ? '34,211,238' : col === B ? '59,130,246' : '129,140,248';
        const bg2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        bg2.addColorStop(0,   `rgba(${rgb},${a * breathe})`);
        bg2.addColorStop(0.5, `rgba(${rgb},${a * 0.4 * breathe})`);
        bg2.addColorStop(1,   `rgba(${rgb},0)`);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = bg2; ctx.fill();
      });

      /* ── 2. OUTER TICK DIAL ── */
      const outerR = Math.min(w, h) * 0.46;
      // Faint outer circle
      ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = C; ctx.globalAlpha = 0.07; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.globalAlpha = 1;
      // Tick marks (slowly rotating)
      const tickRot = t * 0.018;
      for (let i = 0; i < 60; i++) {
        const a   = (Math.PI * 2 * i / 60) + tickRot;
        const major = i % 5 === 0;
        const tLen  = major ? 9 : 4;
        const tAlpha= major ? 0.22 : 0.07;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * outerR, cy + Math.sin(a) * outerR);
        ctx.lineTo(cx + Math.cos(a) * (outerR - tLen), cy + Math.sin(a) * (outerR - tLen));
        ctx.strokeStyle = major ? C : B;
        ctx.globalAlpha = tAlpha; ctx.lineWidth = major ? 1 : 0.5; ctx.stroke();
        ctx.globalAlpha = 1;
      }

      /* ── 3. RADIAL CIRCUIT SPOKES ── */
      const spokeCount = 12;
      for (let i = 0; i < spokeCount; i++) {
        const a = (Math.PI * 2 * i / spokeCount) + t * 0.025;
        const innerR = 60, outerSpoke = outerR * 0.88;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
        ctx.lineTo(cx + Math.cos(a) * outerSpoke, cy + Math.sin(a) * outerSpoke);
        ctx.strokeStyle = i % 3 === 0 ? C : B;
        ctx.globalAlpha = 0.04; ctx.lineWidth = 0.5; ctx.stroke();
        ctx.globalAlpha = 1;
        // Small node at spoke end
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(cx + Math.cos(a)*outerSpoke, cy + Math.sin(a)*outerSpoke, 1.5, 0, Math.PI*2);
          ctx.fillStyle = C; ctx.globalAlpha = 0.12; ctx.fill(); ctx.globalAlpha = 1;
        }
      }

      /* ── 4. AMBIENT DUST ── */
      dust.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.life += d.maxLife;
        if (d.life >= 1 || d.y < 0) {
          d.x = rnd(0.1, 0.9); d.y = rnd(0.7, 1.0);
          d.life = 0;
        }
        const alpha = Math.sin(d.life * Math.PI) * 0.45;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color; ctx.globalAlpha = alpha; ctx.fill();
        ctx.globalAlpha = 1;
      });

      /* ── 5. SCANNING WEDGE ── */
      const scanSpeed = 0.38;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * scanSpeed);
      const sweepR = outerR * 0.92;
      const sweepA = Math.PI / 22; // narrow wedge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, sweepR, 0, sweepA);
      ctx.closePath();
      const sweepG = ctx.createRadialGradient(0, 0, 0, 0, 0, sweepR);
      sweepG.addColorStop(0,   `rgba(34,211,238,${0.18 * breathe})`);
      sweepG.addColorStop(0.6, `rgba(34,211,238,${0.07 * breathe})`);
      sweepG.addColorStop(1,    'rgba(34,211,238,0)');
      ctx.fillStyle = sweepG; ctx.fill();
      // Leading edge bright line
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sweepR, 0);
      ctx.strokeStyle = C; ctx.globalAlpha = 0.30; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();

      /* ── 6. NEURAL CONNECTIONS (double pass for glow) ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > 175) continue;
          const str = 1 - dist / 175;
          // Pass 1 — wide soft glow
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = nodes[i].color; ctx.globalAlpha = str * 0.07;
          ctx.lineWidth = 3; ctx.stroke(); ctx.globalAlpha = 1;
          // Pass 2 — crisp thin line
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = nodes[i].color; ctx.globalAlpha = str * 0.13;
          ctx.lineWidth = 0.7; ctx.stroke(); ctx.globalAlpha = 1;
        }
      }

      /* ── 7. INNER NODE → CORE SPOKES ── */
      nodes.filter(n => n.inner).forEach(n => {
        const a = 0.05 + 0.04 * Math.sin(t * 1.2 + n.phase);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = n.color; ctx.globalAlpha = a;
        ctx.lineWidth = 0.6; ctx.stroke(); ctx.globalAlpha = 1;
      });

      /* ── 8. PULSES ── */
      pulseTimer++;
      if (pulseTimer >= 10) {
        pulseTimer = 0;
        const a = nodes[Math.floor(rnd(0, nodes.length))];
        const b = nodes[Math.floor(rnd(0, nodes.length))];
        const dx = a.x-b.x, dy = a.y-b.y;
        if (Math.sqrt(dx*dx+dy*dy) < 175) pulses.push(new Pulse(a, b));
      }
      pulses = pulses.filter(p => !p.done);
      pulses.forEach(p => { p.update(); p.draw(ctx); });

      /* ── 9. NEURAL NODES ── */
      nodes.forEach(n => {
        const pulse = 0.5 + Math.sin(t * n.speed + n.phase) * 0.35;
        const r = n.r * (0.85 + pulse * 0.3);
        // Wide halo
        const g2 = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        g2.addColorStop(0, n.color + '55'); g2.addColorStop(1, n.color + '00');
        ctx.beginPath(); ctx.arc(n.x, n.y, r*6, 0, Math.PI*2); ctx.fillStyle=g2; ctx.fill();
        // Ring
        ctx.beginPath(); ctx.arc(n.x, n.y, r+2.5, 0, Math.PI*2);
        ctx.strokeStyle=n.color; ctx.globalAlpha=0.35+pulse*0.28; ctx.lineWidth=0.9;
        ctx.stroke(); ctx.globalAlpha=1;
        // Core
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        ng.addColorStop(0, W); ng.addColorStop(0.4, n.color); ng.addColorStop(1, n.color+'70');
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2);
        ctx.fillStyle=ng; ctx.globalAlpha=0.72+pulse*0.25; ctx.fill(); ctx.globalAlpha=1;
      });

      /* ══════════ ARC REACTOR ══════════ */

      /* ── 10. OUTER REACTOR RINGS ── */
      drawRing(cx, cy, 195, 0.5, A, 0.07, 4, 18, t * 0.05);   // amber outer
      drawRing(cx, cy, 178, 0.6, P, 0.11, 6, 12, t * 0.08);
      drawRing(cx, cy, 158, 0.8, B, 0.18, 18, 8, -t * 0.15);
      drawRing(cx, cy, 135, 1.4, C, 0.32, 25, 10, t * 0.30);
      drawRing(cx, cy, 135, 7,   C, 0.05, 0,  0,  t * 0.30);  // glow ring

      /* Fast arc with tip flare */
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.55);
      ctx.beginPath(); ctx.arc(0, 0, 110, 0, Math.PI * 1.5);
      ctx.strokeStyle = C; ctx.globalAlpha = 0.52; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.globalAlpha = 1;
      const tipX = Math.cos(Math.PI*1.5)*110, tipY = Math.sin(Math.PI*1.5)*110;
      const tf = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 14);
      tf.addColorStop(0, C+'dd'); tf.addColorStop(1, C+'00');
      ctx.beginPath(); ctx.arc(tipX, tipY, 14, 0, Math.PI*2);
      ctx.fillStyle=tf; ctx.fill(); ctx.restore();

      /* Very fast short arc */
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 1.12);
      ctx.beginPath(); ctx.arc(0, 0, 90, 0, Math.PI * 0.6);
      ctx.strokeStyle = B; ctx.globalAlpha = 0.58; ctx.lineWidth = 2.2; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();

      /* Counter-rotating medium arc (new) */
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 0.75);
      ctx.beginPath(); ctx.arc(0, 0, 72, 0, Math.PI * 0.9);
      ctx.strokeStyle = P; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();

      /* ── 11. INNER LATTICE ── */
      drawLattice(cx, cy, 72, t * 0.20);
      drawLattice(cx, cy, 72, -t * 0.36);

      /* ── 12. SPINNING HEX ── */
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.62);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI/3)*i;
        i===0 ? ctx.moveTo(Math.cos(a)*40, Math.sin(a)*40)
              : ctx.lineTo(Math.cos(a)*40, Math.sin(a)*40);
      }
      ctx.closePath();
      ctx.strokeStyle=C; ctx.globalAlpha=0.38; ctx.lineWidth=1.3; ctx.stroke();
      ctx.globalAlpha=1; ctx.restore();

      /* Smaller counter-rotating hex */
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-t * 1.0);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI/3)*i + Math.PI/6;
        i===0 ? ctx.moveTo(Math.cos(a)*25, Math.sin(a)*25)
              : ctx.lineTo(Math.cos(a)*25, Math.sin(a)*25);
      }
      ctx.closePath();
      ctx.strokeStyle=B; ctx.globalAlpha=0.25; ctx.lineWidth=0.9; ctx.stroke();
      ctx.globalAlpha=1; ctx.restore();

      /* ── 13. CORE BLOOM (4 layers) ── */
      [[70, 0.16, '34,211,238'], [50, 0.22, '34,211,238'], [35, 0.18, '59,130,246'], [18, 0.14, '200,245,255']].forEach(([r, a, rgb]) => {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${rgb},${a * breathe})`);
        g.addColorStop(0.5, `rgba(${rgb},${a * 0.4 * breathe})`);
        g.addColorStop(1,   `rgba(${rgb},0)`);
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle=g; ctx.fill();
      });

      /* Core solid ring */
      ctx.beginPath(); ctx.arc(cx, cy, 55, 0, Math.PI*2);
      ctx.strokeStyle=C; ctx.globalAlpha=0.58; ctx.lineWidth=1.6; ctx.stroke();
      drawRing(cx, cy, 55, 9, C, 0.05);
      ctx.globalAlpha=1;

      /* Core radial gradient fill */
      const cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      cc.addColorStop(0,   'rgba(255,255,255,0.97)');
      cc.addColorStop(0.25,'rgba(210,250,255,0.92)');
      cc.addColorStop(0.6, 'rgba(34,211,238,0.55)');
      cc.addColorStop(1,   'rgba(34,211,238,0)');
      ctx.beginPath(); ctx.arc(cx, cy, 32, 0, Math.PI*2); ctx.fillStyle=cc; ctx.fill();

      /* Hard dot + shadow glow */
      ctx.shadowBlur = 22; ctx.shadowColor = W;
      ctx.beginPath(); ctx.arc(cx, cy, 7.5, 0, Math.PI*2);
      ctx.fillStyle=W; ctx.globalAlpha=0.99; ctx.fill();
      ctx.shadowBlur=0; ctx.globalAlpha=1;

      /* ── 14. PULSE RINGS (3 rings, staggered) ── */
      for (let ring = 0; ring < 3; ring++) {
        const phase = (t * 0.52 + ring * (Math.PI*2/3)) % (Math.PI*2);
        const pr  = 55 + (phase / (Math.PI*2)) * 195;
        const pa  = (1 - phase / (Math.PI*2)) * 0.28;
        ctx.beginPath(); ctx.arc(cx, cy, pr, 0, Math.PI*2);
        ctx.strokeStyle = C; ctx.globalAlpha = pa; ctx.lineWidth = 1; ctx.stroke();
        ctx.globalAlpha = 1;
      }

      /* ── 15. ORBITAL PARTICLES with comet trails ── */
      orbits.forEach(orb => {
        for (let i = 0; i < orb.count; i++) {
          const baseAngle = (Math.PI*2*i/orb.count) + t*orb.speed + orb.offset;

          // Comet trail (5 ghost dots behind)
          for (let tr = 5; tr >= 1; tr--) {
            const trailAngle = baseAngle - tr * 0.065 * Math.sign(orb.speed);
            const tx = cx + Math.cos(trailAngle) * orb.r;
            const ty = cy + Math.sin(trailAngle) * orb.r;
            const ta = (1 - tr / 6) * 0.35;
            const ts = (1 - tr / 6) * 3.5;
            ctx.beginPath(); ctx.arc(tx, ty, ts, 0, Math.PI*2);
            ctx.fillStyle = orb.color; ctx.globalAlpha = ta; ctx.fill();
            ctx.globalAlpha = 1;
          }

          // Head particle
          const px = cx + Math.cos(baseAngle) * orb.r;
          const py = cy + Math.sin(baseAngle) * orb.r;
          const pf = 0.5 + Math.sin(t*2.2 + i)*0.5;
          const og = ctx.createRadialGradient(px, py, 0, px, py, 12);
          og.addColorStop(0, orb.color+'bb'); og.addColorStop(1, orb.color+'00');
          ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI*2); ctx.fillStyle=og; ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, 2.8+pf*0.6, 0, Math.PI*2);
          ctx.fillStyle=W; ctx.globalAlpha=0.88+pf*0.12; ctx.fill(); ctx.globalAlpha=1;
        }
      });

      /* ══════════ HUD PANELS ══════════ */

      /* ── Right HUD ── */
      const hx = cx + 222, hy = cy - 62;
      ctx.save();
      ctx.fillStyle='rgba(5,13,26,0.78)'; ctx.strokeStyle=C;
      ctx.globalAlpha=0.52+Math.sin(t*0.9)*0.04; ctx.lineWidth=0.5;
      roundRect(ctx, hx, hy, 104, 72, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle=C; ctx.globalAlpha=0.42;
      roundRect(ctx, hx, hy, 104, 2, 1); ctx.fill(); ctx.globalAlpha=1;

      ctx.font='700 7px "JetBrains Mono",monospace'; ctx.textAlign='left';
      ctx.fillStyle=C; ctx.globalAlpha=0.75; ctx.fillText('STATUS', hx+8, hy+15);
      ctx.fillStyle=G; ctx.globalAlpha=0.90;
      ctx.fillText('ONLINE', hx+52, hy+15);

      // Blinking green dot
      ctx.beginPath(); ctx.arc(hx+48, hy+11, 2, 0, Math.PI*2);
      ctx.fillStyle=G; ctx.globalAlpha=0.7+Math.sin(t*3)*0.3; ctx.fill();

      ctx.font='600 6.5px "JetBrains Mono",monospace';
      ctx.fillStyle=W; ctx.globalAlpha=0.50;
      ctx.fillText('CORE  AI v2.1', hx+8, hy+26);

      // Power bar
      const barW=88, barFill=0.85+Math.sin(t*0.9)*0.09;
      ctx.fillStyle='rgba(34,211,238,0.10)'; ctx.globalAlpha=1;
      roundRect(ctx, hx+8, hy+33, barW, 5, 2); ctx.fill();
      const bg2=ctx.createLinearGradient(hx+8,0,hx+8+barW*barFill,0);
      bg2.addColorStop(0,C); bg2.addColorStop(1,B);
      ctx.fillStyle=bg2; roundRect(ctx, hx+8, hy+33, barW*barFill, 5, 2); ctx.fill();
      ctx.fillStyle=W; ctx.globalAlpha=0.35; ctx.font='600 5.5px "JetBrains Mono",monospace';
      ctx.fillText(`PWR ${Math.round(barFill*100)}%`, hx+8, hy+46);

      // Sparkline waveform
      ctx.beginPath();
      for (let px2 = 0; px2 < barW; px2++) {
        const sy = Math.sin(px2 / barW * 7 + t * 2.2) * 5
                 + Math.sin(px2 / barW * 13 + t * 3.5) * 2.5;
        const sx = hx + 8 + px2;
        const sY = hy + 60 + sy;
        px2 === 0 ? ctx.moveTo(sx, sY) : ctx.lineTo(sx, sY);
      }
      ctx.strokeStyle=C; ctx.globalAlpha=0.40; ctx.lineWidth=0.8; ctx.stroke();
      ctx.globalAlpha=1; ctx.restore();

      // Connector line
      ctx.setLineDash([3,5]);
      ctx.strokeStyle=C; ctx.globalAlpha=0.12; ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(hx, hy+36); ctx.lineTo(cx+58, cy-12); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha=1;

      /* ── Left HUD ── */
      const lx = cx - 326, ly = cy + 20;
      ctx.save();
      ctx.fillStyle='rgba(5,13,26,0.75)'; ctx.strokeStyle=P;
      ctx.globalAlpha=0.48+Math.sin(t*1.1)*0.04; ctx.lineWidth=0.5;
      roundRect(ctx, lx, ly, 92, 56, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle=P; ctx.globalAlpha=0.36;
      roundRect(ctx, lx, ly, 92, 2, 1); ctx.fill(); ctx.globalAlpha=1;

      ctx.font='700 7px "JetBrains Mono",monospace'; ctx.textAlign='left';
      ctx.fillStyle=P; ctx.globalAlpha=0.80; ctx.fillText('NEURAL SYNC', lx+8, ly+16);
      ctx.font='600 6.5px "JetBrains Mono",monospace';
      ctx.fillStyle=W; ctx.globalAlpha=0.55;
      ctx.fillText(`${(97.4+Math.sin(t*1.5)*0.7).toFixed(1)}%  STABLE`, lx+8, ly+28);
      ctx.fillStyle=G; ctx.globalAlpha=0.60;
      ctx.fillText('LATENCY  <2ms', lx+8, ly+39);

      // Mini bar (neural load)
      [0.82, 0.91, 0.74, 0.95, 0.66, 0.88].forEach((v, i) => {
        const bx = lx + 8 + i * 13, bH = (v + Math.sin(t*2+i)*0.06) * 12;
        ctx.fillStyle = [C,B,P,G,C,B][i];
        ctx.globalAlpha = 0.50;
        ctx.fillRect(bx, ly + 48 - bH, 9, bH);
      });
      ctx.globalAlpha=1; ctx.restore();

      // Connector line
      ctx.setLineDash([3,5]);
      ctx.strokeStyle=P; ctx.globalAlpha=0.12; ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(lx+92, ly+28); ctx.lineTo(cx-58, cy+8); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha=1;

      /* ── Watermark label ── */
      ctx.save();
      ctx.font='700 8.5px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle=C; ctx.globalAlpha=0.18;
      ctx.fillText('AIGNITE · AI CORE', cx, cy + outerR + 16);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '1 / 0.90', maxWidth: 580 }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(34,211,238,0.07) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)' }} />
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}
