import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════
   AIGNITE HERO — Supercharged 3D Arc Reactor + Neural Network
   ─ Scene projected onto a true 3D space with perspective
   ─ 5 orbital rings tilted on independent 3D planes (spherical atom look)
   ─ Global rotation wiggles + real-time mouse parallax response
   ─ Depth-scaled node sizing, glow radii, and line thicknesses
   ─ Parallel-plane counter-rotating 3D hexagons (z = +12 / -12)
   ─ Inner 3D double-lattice cage (Z-extruded rings & spokes)
   ─ HUD tracking lines locked to projected 3D rotating targets
   ═══════════════════════════════════════════════════════════════ */

const C = '#22D3EE';   // cyan
const B = '#3B82F6';   // blue
const W = '#ffffff';
const P = '#818CF8';   // indigo
const G = '#34D399';   // green
const A = '#F59E0B';   // amber accent
const M = '#F472B6';   // pink/magenta

const lerp = (a, b, t) => a + (b - a) * t;
const rnd  = (lo, hi)  => Math.random() * (hi - lo) + lo;

/* ── Rounded rect helper for HUD overlays ── */
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

    // Perspective parameters
    const FOV = 420;

    // 3D Scene Rotation Angles (global tilt & swing)
    let angleX = -0.32; // Default tilt forward to show plate perspective
    let angleY = 0.0;
    let targetAngleX = -0.32;
    let targetAngleY = 0.0;

    // Mouse positions for interactive parallax
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      // Normalize coordinate offsets from -1 to 1
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ─── 3D Projection Engine ─── */
    const project = (x, y, z, cx, cy) => {
      // 1. Rotate around Y axis (swing)
      let x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
      let z1 = x * Math.sin(angleY) + z * Math.cos(angleY);

      // 2. Rotate around X axis (tilt)
      let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
      let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

      // 3. Perspective divide
      const scale = FOV / (FOV + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale: scale,
        z: z2
      };
    };

    /* ══════════ NEURAL NODES (Defined in 3D relative to center) ══════════ */
    const buildNodes = () => {
      const nodes = [];
      const radiusX = 180;
      const radiusY = 140;

      // Outer brain-oval (22 nodes distributed in 3D)
      for (let i = 0; i < 22; i++) {
        const angle = (i / 22) * Math.PI * 2 + rnd(-0.12, 0.12);
        const rx = radiusX + rnd(-15, 15);
        const ry = radiusY + rnd(-12, 12);
        const bumpY = Math.sin(angle * 2) * 20;

        nodes.push({
          bx:    Math.cos(angle) * rx,
          by:    Math.sin(angle) * ry + bumpY,
          bz:    Math.sin(angle * 2) * 60 + rnd(-20, 20), // Brain depth
          r:     rnd(1.8, 3.2),
          color: [C, B, P, G, M, A][Math.floor(rnd(0, 6))],
          phase: rnd(0, Math.PI * 2),
          speed: rnd(0.6, 1.4),
          inner: false,
        });
      }
      
      // Inner cluster (6 nodes closer to reactor core)
      for (let i = 0; i < 6; i++) {
        const a = rnd(0, Math.PI * 2);
        const d = rnd(50, 95);
        nodes.push({
          bx:    Math.cos(a) * d,
          by:    Math.sin(a) * d,
          bz:    rnd(-20, 20),
          r:     rnd(1.5, 2.5),
          color: [C, B, P, G, M, A][Math.floor(rnd(0, 6))],
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
        this.speed = rnd(0.006, 0.012);
        this.color = [C, B, P, G, '#F472B6'][Math.floor(rnd(0, 5))];
        this.size  = rnd(1.0, 2.0);
        this.done  = false;
      }
      update() { this.p += this.speed; if (this.p >= 1) this.done = true; }
      
      pushPrimitives(primitives, cx, cy) {
        // Calculate 3D position
        const px = lerp(this.a.bx, this.b.bx, this.p);
        const py = lerp(this.a.by, this.b.by, this.p);
        const pz = lerp(this.a.bz, this.b.bz, this.p);
        
        const pt = project(px, py, pz, cx, cy);
        
        const glowR = this.size * 2.5;
        const color = this.color;
        const sz = this.size;
        
        primitives.push({
          z: pt.z,
          draw: (ctx) => {
            const sc = pt.scale;
            const gr = glowR * sc;
            if (gr > 0) {
              const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, gr);
              g.addColorStop(0, color + '33');
              g.addColorStop(1, color + '00');
              ctx.beginPath(); ctx.arc(pt.x, pt.y, gr, 0, Math.PI * 2);
              ctx.fillStyle = g; ctx.fill();
            }
            
            ctx.beginPath(); ctx.arc(pt.x, pt.y, sz * sc, 0, Math.PI * 2);
            ctx.fillStyle = W; ctx.globalAlpha = 0.90; ctx.fill();
            ctx.globalAlpha = 1;
          }
        });
      }
    }
    let pulses = [], pulseTimer = 0;

    const labelsData = [
      { label: 'Transformer', color: '#22D3EE', base3d: { x: 200,  y: -140, z: 20 },  targetNodeIdx: 0 },
      { label: 'Backprop',    color: '#818CF8', base3d: { x: -210, y: -40,  z: -10 }, targetNodeIdx: 4 },
      { label: 'CNN',         color: '#34D399', base3d: { x: -200, y: 130,  z: 15 },  targetNodeIdx: 8 },
      { label: 'LLM',         color: '#F472B6', base3d: { x: 210,  y: 160,  z: -20 }, targetNodeIdx: 2 }
    ];

    /* ══════════ AMBIENT DUST PARTICLES (3D space dust field) ══════════ */
    const DUST_COUNT = 24;
    const dust = Array.from({ length: DUST_COUNT }, () => ({
      x: rnd(-260, 260),
      y: rnd(-260, 260),
      z: rnd(-100, 300),
      vx: rnd(-0.15, 0.15),
      vy: rnd(-0.4, -0.1), // slowly rising
      vz: rnd(-0.2, 0.2),
      r: rnd(0.8, 1.8),
      color: [C, B, P, G, '#F472B6'][Math.floor(rnd(0, 5))],
      life: rnd(0.1, 1.0),
      decay: rnd(0.001, 0.003)
    }));

    /* ══════════ 5 ORBITAL RINGS (Independent 3D Tilt Planes) ══════════ */
    const orbits = [
      { r: 165, speed:  0.55, count: 2, color: C,  offset: 0,             tiltX: 0.22,  tiltY: -0.15 },
      { r: 188, speed: -0.30, count: 1, color: B,  offset: Math.PI / 5,   tiltX: -0.32, tiltY: 0.24   },
      { r: 210, speed:  0.20, count: 1, color: P,  offset: Math.PI / 8,   tiltX: 0.15,  tiltY: -0.38 },
      { r: 235, speed: -0.14, count: 1, color: G,  offset: Math.PI / 3,   tiltX: -0.42, tiltY: 0.18   },
      { r: 260, speed:  0.10, count: 3, color: A,  offset: Math.PI / 6,   tiltX: 0.38,  tiltY: 0.34    },
    ];

    /* ══════════ MAIN DRAW LOOP ══════════ */
    const draw = () => {
      t += 0.012;
      const w = CW(), h = CH();
      const cx = w / 2, cy = h / 2;
      const breathe = 0.5 + Math.sin(t * 0.7) * 0.25;
      const pulsePhase = (Math.sin(t * 3.0) + 1.0) / 2.0; // 0 to 1
      const corePulseScale = 1.0 + pulsePhase * 0.05; // 1.0 to 1.05
      const corePulseOpacity = 0.9 + pulsePhase * 0.1; // 0.9 to 1.0

      ctx.clearRect(0, 0, w, h);

      // Interpolate angles for smooth mouse parallax + constant gentle oscillation + continuous slow Y-orbital rotation
      targetAngleX = -0.32 + mouseY * 0.26 + Math.sin(t * 0.4) * 0.03;
      targetAngleY = (t * 0.08) + mouseX * 0.32;
      angleX += (targetAngleX - angleX) * 0.08;
      angleY += (targetAngleY - angleY) * 0.08;

      const pCenter = project(0, 0, 0, cx, cy);

      // Create depth primitives array
      const primitives = [];

      // Helper to add lines to primitives
      const addLine = (p1, p2, color, alpha, width, dash = null) => {
        const avgZ = (p1.z + p2.z) / 2;
        primitives.push({
          z: avgZ,
          draw: (ctx) => {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = width * ((p1.scale + p2.scale) / 2);
            if (dash) ctx.setLineDash(dash);
            ctx.stroke();
            if (dash) ctx.setLineDash([]);
            ctx.globalAlpha = 1;
          }
        });
      };

      // Helper to add circles to primitives
      const addCircle = (p, radius, color, fill = true, alpha = 1, strokeWidth = 1) => {
        primitives.push({
          z: p.z,
          draw: (ctx) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius * p.scale, 0, Math.PI * 2);
            ctx.globalAlpha = alpha;
            if (fill) {
              ctx.fillStyle = color;
              ctx.fill();
            } else {
              ctx.strokeStyle = color;
              ctx.lineWidth = strokeWidth * p.scale;
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
          }
        });
      };

      // Helper to add 3D rings in segments
      const add3DRing = (radius, zVal, segments, color, width, alpha, rotZ = 0, dash = false) => {
        for (let i = 0; i < segments; i++) {
          if (dash && i % 2 === 0) continue;
          const a1 = (i / segments) * Math.PI * 2 + rotZ;
          const a2 = ((i + 1) / segments) * Math.PI * 2 + rotZ;
          const p1 = project(radius * Math.cos(a1), radius * Math.sin(a1), zVal, cx, cy);
          const p2 = project(radius * Math.cos(a2), radius * Math.sin(a2), zVal, cx, cy);
          addLine(p1, p2, color, alpha, width);
        }
      };

      // Helper to add 3D arcs in segments
      const add3DArc = (radius, zVal, width, color, alpha, startAngle, endAngle) => {
        const steps = 24;
        for (let i = 0; i < steps; i++) {
          const theta1 = startAngle + (i / steps) * (endAngle - startAngle);
          const theta2 = startAngle + ((i + 1) / steps) * (endAngle - startAngle);
          const p1 = project(radius * Math.cos(theta1), radius * Math.sin(theta1), zVal, cx, cy);
          const p2 = project(radius * Math.cos(theta2), radius * Math.sin(theta2), zVal, cx, cy);
          addLine(p1, p2, color, alpha, width);
        }
      };

      // Helper to add 3D rotating triangles
      const pushTriangle3D = (radius, rotZ, zVal, color, alpha, width) => {
        const points = [];
        for (let i = 0; i < 3; i++) {
          const a = (Math.PI * 2 / 3) * i + rotZ;
          points.push(project(radius * Math.cos(a), radius * Math.sin(a), zVal, cx, cy));
        }
        for (let i = 0; i < 3; i++) {
          const p1 = points[i];
          const p2 = points[(i + 1) % 3];
          addLine(p1, p2, color, alpha, width);
        }
      };

      /* ── 1. DEEP AMBIENT BLOOM (3 layers) ── */
      // Drawn as a deep background primitive
      [[280, 0.03, C], [230, 0.02, B], [160, 0.01, P]].forEach(([r, a, col]) => {
        const rgb = col === C ? '34,211,238' : col === B ? '59,130,246' : '129,140,248';
        primitives.push({
          z: 300, // Very far back
          draw: (ctx) => {
            const bg2 = ctx.createRadialGradient(pCenter.x, pCenter.y, 0, pCenter.x, pCenter.y, r * pCenter.scale);
            bg2.addColorStop(0,   `rgba(${rgb},${a * breathe})`);
            bg2.addColorStop(0.5, `rgba(${rgb},${a * 0.4 * breathe})`);
            bg2.addColorStop(1,   `rgba(${rgb},0)`);
            ctx.beginPath(); ctx.arc(pCenter.x, pCenter.y, r * pCenter.scale, 0, Math.PI * 2);
            ctx.fillStyle = bg2; ctx.fill();
          }
        });
      });

      /* ── 2. OUTER TICK DIAL (Front Bezel Ticks at Z = 20) ── */
      const outerR = Math.min(w, h) * 0.46;
      add3DRing(outerR, 20, 48, C, 0.5, 0.07);

      const tickRot = t * 0.018;
      for (let i = 0; i < 60; i++) {
        const a = (Math.PI * 2 * i / 60) + tickRot;
        const major = i % 5 === 0;
        const tLen = major ? 9 : 4;
        const tAlpha = major ? 0.22 : 0.07;
        
        const pStart = project(outerR * Math.cos(a), outerR * Math.sin(a), 20, cx, cy);
        const pEnd   = project((outerR - tLen) * Math.cos(a), (outerR - tLen) * Math.sin(a), 20, cx, cy);
        
        addLine(pStart, pEnd, major ? C : B, tAlpha, major ? 1 : 0.5);
      }

      /* ── 2B. OUTER TECH COMPASS RING (Z = 20) ── */
      const compassR = outerR + 12;
      add3DRing(compassR, 20, 72, B, 0.4, 0.04);
      
      const cardinals = [
        { label: '000', angle: 0 },
        { label: '090', angle: Math.PI / 2 },
        { label: '180', angle: Math.PI },
        { label: '270', angle: Math.PI * 1.5 }
      ];
      
      cardinals.forEach(card => {
        const phi = card.angle + t * 0.01;
        const pPos = project((compassR + 6) * Math.cos(phi), (compassR + 6) * Math.sin(phi), 20, cx, cy);
        
        primitives.push({
          z: pPos.z,
          draw: (ctx) => {
            const sc = pPos.scale;
            ctx.font = `600 ${Math.max(4.5, 6.0 * sc)}px "JetBrains Mono", monospace`;
            ctx.fillStyle = C;
            ctx.globalAlpha = 0.28 * sc;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(card.label, pPos.x, pPos.y);
            ctx.globalAlpha = 1;
          }
        });
      });

      /* ── 3. RADIAL CIRCUIT SPOKES (Z = 0) ── */
      const spokeCount = 12;
      for (let i = 0; i < spokeCount; i++) {
        const a = (Math.PI * 2 * i / spokeCount) + t * 0.025;
        const innerRadius = 60, outerSpoke = outerR * 0.88;
        
        const pStart = project(innerRadius * Math.cos(a), innerRadius * Math.sin(a), 0, cx, cy);
        const pEnd   = project(outerSpoke * Math.cos(a), outerSpoke * Math.sin(a), 0, cx, cy);
        
        addLine(pStart, pEnd, i % 3 === 0 ? C : B, 0.09, 0.6);
        
        if (i % 3 === 0) {
          addCircle(pEnd, 1.0, C, true, 0.07);
        }

        // Plasma energy pulse traveling outward (Tony Stark style reactor charging pulses)
        const pulseSpeed = 0.65;
        const pulseProgress = ((t * pulseSpeed) + (i / spokeCount)) % 1.0;
        const pulseR = lerp(innerRadius, outerSpoke, pulseProgress);
        const pPulse = project(pulseR * Math.cos(a), pulseR * Math.sin(a), 0, cx, cy);
        const pulseAlpha = Math.sin(pulseProgress * Math.PI) * 0.22;
        addCircle(pPulse, 1.2, i % 3 === 0 ? C : W, true, pulseAlpha);
      }

      /* ── 4. AMBIENT DUST (Rendered as true 3D space dust background elements) ── */
      dust.forEach(d => {
        d.x += d.vx;
        d.y += d.vy;
        d.z += d.vz;
        d.life -= d.decay;

        if (d.life <= 0 || d.y < -280 || d.z < -100 || d.z > 300) {
          d.x = rnd(-260, 260);
          d.y = rnd(200, 280);
          d.z = rnd(-100, 300);
          d.life = 1.0;
        }

        const p = project(d.x, d.y, d.z, cx, cy);
        const alpha = Math.sin(d.life * Math.PI) * 0.45 * p.scale;
        
        if (alpha > 0) {
          primitives.push({
            z: p.z,
            draw: (ctx) => {
              const rScaled = d.r * p.scale;
              
              // Soft glow halo matching the reference image's background particles
              const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rScaled * 2.8);
              g.addColorStop(0, d.color + '22');
              g.addColorStop(1, d.color + '00');
              ctx.beginPath();
              ctx.arc(p.x, p.y, rScaled * 2.8, 0, Math.PI * 2);
              ctx.fillStyle = g;
              ctx.fill();

              // Central dot
              ctx.beginPath();
              ctx.arc(p.x, p.y, rScaled, 0, Math.PI * 2);
              ctx.fillStyle = d.color;
              ctx.globalAlpha = alpha;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          });
        }
      });

      // Draw 3D connection lines between space dust particles (constellation network mesh)
      for (let i = 0; i < dust.length; i++) {
        for (let j = i + 1; j < dust.length; j++) {
          const dx = dust[i].x - dust[j].x;
          const dy = dust[i].y - dust[j].y;
          const dz = dust[i].z - dust[j].z;
          const dist3D = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist3D < 120) {
            const p1 = project(dust[i].x, dust[i].y, dust[i].z, cx, cy);
            const p2 = project(dust[j].x, dust[j].y, dust[j].z, cx, cy);
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = (1 - dist3D / 120) * 0.045 * Math.min(p1.scale, p2.scale) * Math.sin(dust[i].life * Math.PI) * Math.sin(dust[j].life * Math.PI);
            if (alpha > 0) {
              primitives.push({
                z: avgZ,
                draw: (ctx) => {
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.strokeStyle = '#3B82F6';
                  ctx.globalAlpha = alpha;
                  ctx.lineWidth = 0.45 * ((p1.scale + p2.scale) / 2);
                  ctx.stroke();
                  ctx.globalAlpha = 1;
                }
              });
            }
          }
        }
      }

      /* ── 5. SCANNING WEDGE (Projected Sector at Z = 0) ── */
      const scanSpeed = 0.38;
      const wedgeStart = t * scanSpeed;
      const wedgeEnd = wedgeStart + Math.PI / 22;
      const wedgeR = outerR * 0.92;

      const wedgeSteps = 10;
      const wedgePoints = [pCenter];
      for (let i = 0; i <= wedgeSteps; i++) {
        const theta = wedgeStart + (i / wedgeSteps) * (wedgeEnd - wedgeStart);
        wedgePoints.push(project(wedgeR * Math.cos(theta), wedgeR * Math.sin(theta), 0, cx, cy));
      }
      
      const wedgeAvgZ = wedgePoints.reduce((sum, p) => sum + p.z, 0) / wedgePoints.length;
      
      primitives.push({
        z: wedgeAvgZ,
        draw: (ctx) => {
          ctx.beginPath();
          ctx.moveTo(wedgePoints[0].x, wedgePoints[0].y);
          for (let i = 1; i < wedgePoints.length; i++) {
            ctx.lineTo(wedgePoints[i].x, wedgePoints[i].y);
          }
          ctx.closePath();

          const scale = pCenter.scale;
          const sweepG = ctx.createRadialGradient(pCenter.x, pCenter.y, 0, pCenter.x, pCenter.y, wedgeR * scale);
          sweepG.addColorStop(0,   `rgba(34,211,238,${0.18 * breathe})`);
          sweepG.addColorStop(0.6, `rgba(34,211,238,${0.07 * breathe})`);
          sweepG.addColorStop(1,    'rgba(34,211,238,0)');
          ctx.fillStyle = sweepG; ctx.fill();
        }
      });

      const pLead = project(wedgeR * Math.cos(wedgeStart), wedgeR * Math.sin(wedgeStart), 0, cx, cy);
      addLine(pCenter, pLead, C, 0.30, 0.8);

      /* ── 6. UPDATE & PROJECT NEURAL NODES ── */
      nodes.forEach(n => {
        const pulse = Math.sin(t * n.speed + n.phase);
        const x3d = n.bx + Math.cos(t * n.speed + n.phase) * 8;
        const y3d = n.by + Math.sin(t * n.speed + n.phase) * 6;
        const z3d = n.bz + pulse * 10;

        const p = project(x3d, y3d, z3d, cx, cy);
        n.x = p.x;
        n.y = p.y;
        n.scale = p.scale;
        n.z = p.z;
      });

      /* ── 7. NEURAL CONNECTIONS (Stable depth sorting) ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].bx - nodes[j].bx;
          const dy = nodes[i].by - nodes[j].by;
          const dz = nodes[i].bz - nodes[j].bz;
          const dist3D = Math.sqrt(dx*dx + dy*dy + dz*dz);
          if (dist3D > 125) continue;

          const n1 = nodes[i];
          const n2 = nodes[j];
          const avgZ = (n1.z + n2.z) / 2;
          const str = (1 - dist3D / 125) * Math.min(n1.scale, n2.scale);
          const color = n1.color;

          primitives.push({
            z: avgZ,
            draw: (ctx) => {
              const minScale = Math.min(n1.scale, n2.scale);
              
              // Pass 1 - wide soft glow
              ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = color; ctx.globalAlpha = str * 0.05;
              ctx.lineWidth = 1.8 * minScale; ctx.stroke();

              // Pass 2 - crisp thin line
              ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = color; ctx.globalAlpha = str * 0.11;
              ctx.lineWidth = 0.5 * minScale; ctx.stroke();
              ctx.globalAlpha = 1;
            }
          });
        }
      }

      /* ── 8. INNER NODE → CORE SPOKES ── */
      nodes.filter(n => n.inner).forEach(n => {
        const a = 0.05 + 0.04 * Math.sin(t * 1.2 + n.phase);
        const pStart = project(0, 0, 0, cx, cy);
        const pEnd = { x: n.x, y: n.y, scale: n.scale, z: n.z };
        addLine(pStart, pEnd, n.color, a, 0.6);
      });

      /* ── 9. SYNAPTIC PULSES ── */
      pulseTimer++;
      if (pulseTimer >= 22) {
        pulseTimer = 0;
        const a = nodes[Math.floor(rnd(0, nodes.length))];
        const b = nodes[Math.floor(rnd(0, nodes.length))];
        const dx = a.bx-b.bx, dy = a.by-b.by, dz = a.bz-b.bz;
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 125) pulses.push(new Pulse(a, b));
      }
      pulses = pulses.filter(p => !p.done);
      pulses.forEach(p => {
        p.update();
        p.pushPrimitives(primitives, cx, cy);
      });

      /* ── 10. NEURAL NODES ── */
      nodes.forEach(n => {
        const pulseVal = 0.5 + Math.sin(t * n.speed + n.phase) * 0.35;
        const r = n.r * (0.85 + pulseVal * 0.3);
        const nColor = n.color;
        const nScale = n.scale;
        const nX = n.x;
        const nY = n.y;
        
        primitives.push({
          z: n.z,
          draw: (ctx) => {
            // Halo
            const rScaled = r * nScale;
            if (rScaled > 0) {
              const g2 = ctx.createRadialGradient(nX, nY, 0, nX, nY, rScaled * 4.8);
              g2.addColorStop(0, nColor + '30');
              g2.addColorStop(1, nColor + '00');
              ctx.beginPath(); ctx.arc(nX, nY, rScaled * 4.8, 0, Math.PI * 2);
              ctx.fillStyle = g2; ctx.fill();
            }
            
            // Ring
            ctx.beginPath(); ctx.arc(nX, nY, (r + 1.2) * nScale, 0, Math.PI * 2);
            ctx.strokeStyle = nColor;
            ctx.globalAlpha = (0.12 + pulseVal * 0.08) * nScale;
            ctx.lineWidth = 0.5 * nScale;
            ctx.stroke();
            ctx.globalAlpha = 1;
            
            // Core
            if (rScaled > 0) {
              const ng = ctx.createRadialGradient(nX, nY, 0, nX, nY, rScaled);
              ng.addColorStop(0, W);
              ng.addColorStop(0.4, nColor);
              ng.addColorStop(1, nColor + '20');
              ctx.beginPath(); ctx.arc(nX, nY, rScaled, 0, Math.PI * 2);
              ctx.fillStyle = ng;
              ctx.globalAlpha = (0.35 + pulseVal * 0.10) * nScale;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
        });
      });

      /* ══════════ ARC REACTOR 3D MODEL ══════════ */

      // ── CONICAL LAYERED REACTOR RINGS ──
      add3DRing(135, 15, 32, C, 1.4, 0.32, t * 0.30, true);   // Outer ring (frontmost, Z=15)
      add3DRing(135, 15, 32, C, 2.0, 0.01, t * 0.30, false);  // Outer glow ring (further reduced glow width & opacity)
      add3DRing(120, 5,  32, B, 0.8, 0.18, -t * 0.15, true);  // Mid-outer ring (Z=5)
      add3DRing(105, -10, 32, P, 0.6, 0.11, t * 0.08, true);   // Mid-inner ring (Z=-10)
      add3DRing(90, -25, 32, A, 0.5, 0.07, t * 0.05, true);   // Deep ring (Z=-25)

      // ── 3D ELECTROMAGNETIC COILS (10 Coils around Outer Ring at Z=10) ──
      const coilCount = 10;
      const coilR = 110;
      const coilZ = 10;
      const coilRotSpeed = t * 0.05;

      for (let i = 0; i < coilCount; i++) {
        const theta = (Math.PI * 2 * i / coilCount) + coilRotSpeed;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        
        // Tangent vector
        const tx = -sin;
        const ty = cos;
        
        // Radial vector
        const rx = cos;
        const ry = sin;
        
        const cx_coil = coilR * cos;
        const cy_coil = coilR * sin;
        
        // Draw 4 copper winding loops for each coil
        for (let k = -1.5; k <= 1.5; k += 1) {
          const l_cx = cx_coil + tx * (k * 3.8);
          const l_cy = cy_coil + ty * (k * 3.8);
          
          // Define 4 corners of loop
          const pt1 = project(l_cx - rx * 5.5, l_cy - ry * 5.5, coilZ - 5, cx, cy);
          const pt2 = project(l_cx + rx * 5.5, l_cy + ry * 5.5, coilZ - 5, cx, cy);
          const pt3 = project(l_cx + rx * 5.5, l_cy + ry * 5.5, coilZ + 5, cx, cy);
          const pt4 = project(l_cx - rx * 5.5, l_cy - ry * 5.5, coilZ + 5, cx, cy);
          
          // Connect corners with lines (individually sorted)
          addLine(pt1, pt2, '#d97706', 0.65, 0.9); // Copper brown-gold
          addLine(pt2, pt3, '#d97706', 0.65, 0.9);
          addLine(pt3, pt4, '#d97706', 0.65, 0.9);
          addLine(pt4, pt1, '#d97706', 0.65, 0.9);
        }

        // Metallic bracket bounding the coil
        const b1 = project(cx_coil - rx * 7 - tx * 8, cy_coil - ry * 7 - ty * 8, coilZ + 6, cx, cy);
        const b2 = project(cx_coil + rx * 7 - tx * 8, cy_coil + ry * 7 - ty * 8, coilZ + 6, cx, cy);
        const b3 = project(cx_coil + rx * 7 + tx * 8, cy_coil + ry * 7 + ty * 8, coilZ + 6, cx, cy);
        const b4 = project(cx_coil - rx * 7 + tx * 8, cy_coil - ry * 7 + ty * 8, coilZ + 6, cx, cy);
        
        addLine(b1, b2, C, 0.35, 0.6);
        addLine(b2, b3, C, 0.35, 0.6);
        addLine(b3, b4, C, 0.35, 0.6);
        addLine(b4, b1, C, 0.35, 0.6);

        // Glowing LED Indicator on top of coil
        const pLED = project(cx_coil + rx * 4, cy_coil + ry * 4, coilZ + 7, cx, cy);
        addCircle(pLED, 0.8, C, true, 0.35);
        primitives.push({
          z: pLED.z,
          draw: (ctx) => {
            const sc = pLED.scale;
            const lg = ctx.createRadialGradient(pLED.x, pLED.y, 0, pLED.x, pLED.y, 3 * sc);
            lg.addColorStop(0, C + '33');
            lg.addColorStop(1, C + '00');
            ctx.beginPath(); ctx.arc(pLED.x, pLED.y, 3 * sc, 0, Math.PI * 2);
            ctx.fillStyle = lg; ctx.fill();
          }
        });
      }

      // ── 3D TRUSS SUPPORT STRUTS (3 Struts aligning with outer ring) ──
      const strutAngles = [0, Math.PI * 2 / 3, Math.PI * 4 / 3];
      for (let i = 0; i < strutAngles.length; i++) {
        const phi = strutAngles[i] + coilRotSpeed;
        const cos = Math.cos(phi);
        const sin = Math.sin(phi);
        const tx = -sin;
        const ty = cos;

        // Strut 3D Node points (Outer Ring to Middle Ring to Inner Ring)
        // Outer
        const pOuter_L = project(135 * cos - tx * 3.5, 135 * sin - ty * 3.5, 15, cx, cy);
        const pOuter_R = project(135 * cos + tx * 3.5, 135 * sin + ty * 3.5, 15, cx, cy);
        // Middle
        const pMid_L = project(98 * cos - tx * 2.5, 98 * sin - ty * 2.5, -10, cx, cy);
        const pMid_R = project(98 * cos + tx * 2.5, 98 * sin + ty * 2.5, -10, cx, cy);
        // Inner
        const pInner_L = project(62 * cos - tx * 1.5, 62 * sin - ty * 1.5, -30, cx, cy);
        const pInner_R = project(62 * cos + tx * 1.5, 62 * sin + ty * 1.5, -30, cx, cy);

        // Strut Rails
        addLine(pOuter_L, pMid_L, B, 0.28, 0.8);
        addLine(pOuter_R, pMid_R, B, 0.28, 0.8);
        addLine(pMid_L, pInner_L, B, 0.28, 0.8);
        addLine(pMid_R, pInner_R, B, 0.28, 0.8);

        // Zig-zag truss diagonals
        addLine(pOuter_L, pMid_R, B, 0.16, 0.5);
        addLine(pOuter_R, pMid_L, B, 0.16, 0.5);
        addLine(pMid_L, pInner_R, B, 0.16, 0.5);
        addLine(pMid_R, pInner_L, B, 0.16, 0.5);
      }

      // ── ROTATING ARCS AT Z DEPTHS ──
      const arcRot = -t * 0.55;
      add3DArc(110, 0, 1.0, C, 0.30, arcRot, arcRot + Math.PI * 1.5);
      
      const tipTheta = arcRot + Math.PI * 1.5;
      const pTip = project(110 * Math.cos(tipTheta), 110 * Math.sin(tipTheta), 0, cx, cy);
      primitives.push({
        z: pTip.z,
        draw: (ctx) => {
          const sc = pTip.scale;
          const tf = ctx.createRadialGradient(pTip.x, pTip.y, 0, pTip.x, pTip.y, 7 * sc);
          tf.addColorStop(0, C+'44'); tf.addColorStop(1, C+'00');
          ctx.beginPath(); ctx.arc(pTip.x, pTip.y, 7 * sc, 0, Math.PI*2);
          ctx.fillStyle=tf; ctx.fill();
        }
      });

      const shortArcRot = t * 1.12;
      add3DArc(90, -10, 1.2, B, 0.32, shortArcRot, shortArcRot + Math.PI * 0.6);

      const medArcRot = -t * 0.75;
      add3DArc(72, -20, 0.8, P, 0.20, medArcRot, medArcRot + Math.PI * 0.9);

      // ── 3D DOUBLE-LATTICE CAGES (Z-extruded structures) ──
      const pushLattice3D = (radius, rotZ, zOffsetMultiplier) => {
        for (let ring = 1; ring <= 3; ring++) {
          const r = radius * (ring / 3);
          const rz = zOffsetMultiplier * (ring - 2) * 14; 
          
          // Lattice Ring
          const steps = 16;
          for (let i = 0; i < steps; i++) {
            const a1 = (i / steps) * Math.PI * 2 + rotZ;
            const a2 = ((i + 1) / steps) * Math.PI * 2 + rotZ;
            
            const p1 = project(r * Math.cos(a1), r * Math.sin(a1), rz, cx, cy);
            const p2 = project(r * Math.cos(a2), r * Math.sin(a2), rz, cx, cy);
            
            const avgZ = (p1.z + p2.z) / 2;
            const alpha = (0.08 + ring * 0.04);
            
            primitives.push({
              z: avgZ,
              draw: (ctx) => {
                ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = C; ctx.globalAlpha = alpha;
                ctx.lineWidth = 0.8 * ((p1.scale + p2.scale) / 2); ctx.stroke();
                ctx.globalAlpha = 1;
              }
            });
          }

          // Lattice Spokes
          for (let i = 0; i < 3; i++) {
            const a = (Math.PI * 2 * i / 3) - Math.PI / 2 + rotZ;
            const pStart = project(0, 0, rz, cx, cy);
            const pEnd = project(r * Math.cos(a), r * Math.sin(a), rz, cx, cy);
            
            const avgZ = (pStart.z + pEnd.z) / 2;
            
            primitives.push({
              z: avgZ,
              draw: (ctx) => {
                ctx.beginPath(); ctx.moveTo(pStart.x, pStart.y); ctx.lineTo(pEnd.x, pEnd.y);
                ctx.strokeStyle = C; ctx.globalAlpha = 0.06;
                ctx.lineWidth = 0.5 * ((pStart.scale + pEnd.scale) / 2); ctx.stroke();
                ctx.globalAlpha = 1;
              }
            });
          }
        }
      };

      pushLattice3D(72, t * 0.20, 1);
      pushLattice3D(72, -t * 0.36, -1);

      // ── SPINNING HEXAGONS ON MULTIPLE Z PLANES (z = +12 / -12) ──
      const pushHexagon3D = (r, rotZ, zVal, color, alpha, width) => {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i + rotZ;
          points.push(project(r * Math.cos(a), r * Math.sin(a), zVal, cx, cy));
        }
        for (let i = 0; i < 6; i++) {
          const p1 = points[i];
          const p2 = points[(i + 1) % 6];
          addLine(p1, p2, color, alpha, width);
        }
      };

      pushHexagon3D(40, t * 0.62, 12, C, 0.38, 1.3);
      pushHexagon3D(25, -t * 1.0, -12, B, 0.25, 0.9);

      // ── ROTATING TURBINE BLADES WITH Z-TWIST (Z = -20) ──
      const turbineBlades = 6;
      const turbRot = -t * 0.4;
      const tRadiusIn = 12;
      const tRadiusOut = 35;

      for (let i = 0; i < turbineBlades; i++) {
        const phi = (Math.PI * 2 * i / turbineBlades) + turbRot;
        
        // Define twisted blade vertices in 3D
        const v1 = project(tRadiusIn * Math.cos(phi), tRadiusIn * Math.sin(phi), -20, cx, cy);
        const v2 = project(tRadiusOut * Math.cos(phi + 0.1), tRadiusOut * Math.sin(phi + 0.1), -17, cx, cy); // twisted forward
        const v3 = project(tRadiusOut * Math.cos(phi + 0.35), tRadiusOut * Math.sin(phi + 0.35), -23, cx, cy); // twisted backward
        const v4 = project(tRadiusIn * Math.cos(phi + 0.25), tRadiusIn * Math.sin(phi + 0.25), -20, cx, cy);

        const avgZ = (v1.z + v2.z + v3.z + v4.z) / 4;
        
        primitives.push({
          z: avgZ,
          draw: (ctx) => {
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.lineTo(v3.x, v3.y);
            ctx.lineTo(v4.x, v4.y);
            ctx.closePath();
            
            // Neon cyan semi-transparent blade
            ctx.fillStyle = 'rgba(34, 211, 238, 0.12)';
            ctx.globalAlpha = 1;
            ctx.fill();
            
            ctx.strokeStyle = C;
            ctx.lineWidth = 0.8 * ((v1.scale + v2.scale) / 2);
            ctx.globalAlpha = 0.45;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }

      // ── CORE BLOOM (Z = -40 deep) ──
      const pCenterCore = project(0, 0, -40, cx, cy);
      [[115, 0.05, '34,211,238'], [85, 0.08, '34,211,238'], [55, 0.12, '59,130,246'], [28, 0.15, '200,245,255']].forEach(([r, a, rgb]) => {
        primitives.push({
          z: pCenterCore.z,
          draw: (ctx) => {
            const sc = pCenterCore.scale;
            const gr = r * sc * corePulseScale;
            if (gr > 0) {
              const g = ctx.createRadialGradient(pCenterCore.x, pCenterCore.y, 0, pCenterCore.x, pCenterCore.y, gr);
              g.addColorStop(0,   `rgba(${rgb},${a * corePulseOpacity})`);
              g.addColorStop(0.5, `rgba(${rgb},${a * 0.4 * corePulseOpacity})`);
              g.addColorStop(1,   `rgba(${rgb},0)`);
              ctx.beginPath(); ctx.arc(pCenterCore.x, pCenterCore.y, gr, 0, Math.PI*2);
              ctx.fillStyle=g; ctx.fill();
            }
          }
        });
      });

      add3DRing(55, -35, 24, C, 1.0, 0.22 * corePulseOpacity);
      add3DRing(55, -35, 24, C, 2.0, 0.01 * corePulseOpacity); // further reduced core glow ring width and opacity

      // Render counter-rotating inner core triangles (complex crystalline star shape matching the reference image)
      pushTriangle3D(20 * corePulseScale, t * 0.9, -35, C, 0.45 * corePulseOpacity, 0.9);
      pushTriangle3D(20 * corePulseScale, -t * 0.7 + Math.PI / 3, -35, B, 0.35 * corePulseOpacity, 0.9);
      pushTriangle3D(20 * corePulseScale, t * 0.5 + Math.PI / 6, -35, P, 0.25 * corePulseOpacity, 0.9);
      pushTriangle3D(20 * corePulseScale, -t * 0.35 + Math.PI / 4, -35, G, 0.15 * corePulseOpacity, 0.9);

      // Core radial gradient fill + Solid center dot
      primitives.push({
        z: pCenterCore.z,
        draw: (ctx) => {
          const sc = pCenterCore.scale;
          
          // Outer soft core glow
          const softG = ctx.createRadialGradient(pCenterCore.x, pCenterCore.y, 0, pCenterCore.x, pCenterCore.y, 35 * sc * corePulseScale);
          softG.addColorStop(0, `rgba(0, 212, 255, ${0.45 * corePulseOpacity})`);
          softG.addColorStop(0.5, `rgba(0, 212, 255, ${0.15 * corePulseOpacity})`);
          softG.addColorStop(1, 'rgba(0, 212, 255, 0)');
          ctx.beginPath(); ctx.arc(pCenterCore.x, pCenterCore.y, 35 * sc * corePulseScale, 0, Math.PI * 2);
          ctx.fillStyle = softG; ctx.fill();

          // Core radial gradient fill
          const cc = ctx.createRadialGradient(pCenterCore.x, pCenterCore.y, 0, pCenterCore.x, pCenterCore.y, 22 * sc * corePulseScale);
          cc.addColorStop(0,   `rgba(255,255,255,${0.97 * corePulseOpacity})`);
          cc.addColorStop(0.25,`rgba(210,250,255,${0.92 * corePulseOpacity})`);
          cc.addColorStop(0.6, `rgba(34,211,238,${0.25 * corePulseOpacity})`);
          cc.addColorStop(1,   'rgba(34,211,238,0)');
          ctx.beginPath(); ctx.arc(pCenterCore.x, pCenterCore.y, 22 * sc * corePulseScale, 0, Math.PI*2);
          ctx.fillStyle=cc; ctx.fill();

          // Softer blurred holographic bloom behind the center pinpoint light source
          ctx.save();
          try {
            ctx.filter = `blur(${12 * sc}px)`;
          } catch (e) {
            // fallback if filter is not supported
          }
          ctx.globalAlpha = 0.70 * corePulseOpacity;
          const holoG = ctx.createRadialGradient(pCenterCore.x, pCenterCore.y, 0, pCenterCore.x, pCenterCore.y, 32 * sc * corePulseScale);
          holoG.addColorStop(0, '#ffffff');
          holoG.addColorStop(0.25, 'rgba(34, 211, 238, 0.95)');
          holoG.addColorStop(0.65, 'rgba(59, 130, 246, 0.4)');
          holoG.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.beginPath();
          ctx.arc(pCenterCore.x, pCenterCore.y, 32 * sc * corePulseScale, 0, Math.PI * 2);
          ctx.fillStyle = holoG;
          ctx.fill();
          try {
            ctx.filter = 'none';
          } catch (e) {}
          ctx.restore();

          // Softened central pinpoint light source
          ctx.shadowBlur = 24 * sc * corePulseScale; ctx.shadowColor = W;
          ctx.beginPath(); ctx.arc(pCenterCore.x, pCenterCore.y, 3.5 * sc * corePulseScale, 0, Math.PI*2);
          ctx.fillStyle=W; ctx.globalAlpha=0.99 * corePulseOpacity; ctx.fill();
          ctx.shadowBlur=0; ctx.globalAlpha=1;
        }
      });

      // ── PULSE RINGS (Tilted Conical Z expansion) ──
      for (let ring = 0; ring < 3; ring++) {
        const phase = (t * 0.52 + ring * (Math.PI*2/3)) % (Math.PI*2);
        const pr  = 55 + (phase / (Math.PI*2)) * 195;
        const pa  = (1 - phase / (Math.PI*2)) * 0.28;
        
        const factor = (pr - 55) / 195;
        const pz = -30 + factor * 50; // Conical slope
        
        add3DRing(pr, pz, 24, C, 1.0, pa);
      }

      // ── 5 ORBITAL PARTICLES (Tilted 3D Orbit paths + Comet trails divided in segments) ──
      orbits.forEach(orb => {
        const orbitZOffset = t * orb.speed;
        
        // Divide orbit track into 24 line segments for correct depth occlusion
        const orbitSteps = 24;
        for (let j = 0; j < orbitSteps; j++) {
          const a1 = (j / orbitSteps) * Math.PI * 2 + orbitZOffset;
          const a2 = ((j + 1) / orbitSteps) * Math.PI * 2 + orbitZOffset;
          
          // Get tilted 3D coordinates
          const getTiltedPoint = (ang) => {
            const lx = orb.r * Math.cos(ang);
            const ly = orb.r * Math.sin(ang);
            const x1 = lx * Math.cos(orb.tiltY);
            const z1 = lx * Math.sin(orb.tiltY);
            const y2 = ly * Math.cos(orb.tiltX) - z1 * Math.sin(orb.tiltX);
            const z2 = ly * Math.sin(orb.tiltX) + z1 * Math.cos(orb.tiltX);
            return project(x1, y2, z2, cx, cy);
          };

          const p1 = getTiltedPoint(a1);
          const p2 = getTiltedPoint(a2);
          
          // Add segment line
          addLine(p1, p2, orb.color, 0.035, 0.45);
        }

        // Render comet heads & trails
        for (let i = 0; i < orb.count; i++) {
          const baseAngle = (Math.PI*2*i/orb.count) + orbitZOffset + orb.offset;
          
          const getOrbitPoint = (angle) => {
            const lx = orb.r * Math.cos(angle);
            const ly = orb.r * Math.sin(angle);
            
            let x1 = lx * Math.cos(orb.tiltY);
            let z1 = lx * Math.sin(orb.tiltY);
            let y2 = ly * Math.cos(orb.tiltX) - z1 * Math.sin(orb.tiltX);
            let z2 = ly * Math.sin(orb.tiltX) + z1 * Math.cos(orb.tiltX);
            
            return project(x1, y2, z2, cx, cy);
          };

          // Ghost trail dots (properly sorted)
          for (let tr = 2; tr >= 1; tr--) {
            const trailAngle = baseAngle - tr * 0.06 * Math.sign(orb.speed);
            const pt = getOrbitPoint(trailAngle);
            const ta = (1 - tr / 3) * 0.10; // lower opacity
            const ts = (1 - tr / 3) * 1.5;  // smaller dots
            
            addCircle(pt, ts, orb.color, true, ta);
          }

          // Main orbiting comet head
          const pt = getOrbitPoint(baseAngle);
          const pf = 0.5 + Math.sin(t*2.2 + i)*0.5;
          
          addCircle(pt, 1.8 + pf * 0.4, W, true, 0.65 + pf * 0.10);
          
          primitives.push({
            z: pt.z,
            draw: (ctx) => {
              const sc = pt.scale;
              const og = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6 * sc);
              og.addColorStop(0, orb.color+'33');
              og.addColorStop(1, orb.color+'00');
              ctx.beginPath(); ctx.arc(pt.x, pt.y, 6 * sc, 0, Math.PI*2);
              ctx.fillStyle=og; ctx.fill();
            }
          });
        }
      });


      /* ── 11. 3D PROJECTED FLOATING LABELS ── */
      labelsData.forEach((label, idx) => {
        const yOffset = Math.sin(t * 1.5 + idx * 1.6) * 10;
        const pLabel = project(label.base3d.x, label.base3d.y + yOffset, label.base3d.z, cx, cy);

        // Target connection node
        const node = nodes[label.targetNodeIdx];
        let pTarget = null;
        if (node) {
          pTarget = { x: node.x, y: node.y, scale: node.scale, z: node.z };
        }

        primitives.push({
          z: pLabel.z,
          draw: (ctx) => {
            const sc = pLabel.scale;
            
            // Draw pointer connection line if target node exists (made more ambient)
            if (pTarget) {
              ctx.beginPath();
              ctx.moveTo(pLabel.x, pLabel.y);
              ctx.lineTo(pTarget.x, pTarget.y);
              ctx.strokeStyle = label.color;
              ctx.globalAlpha = 0.04 * sc;
              ctx.lineWidth = 0.5 * sc;
              ctx.setLineDash([3, 3]);
              ctx.stroke();
              ctx.setLineDash([]);
              
              // Draw target dot at the node
              ctx.beginPath();
              ctx.arc(pTarget.x, pTarget.y, 2 * pTarget.scale, 0, Math.PI * 2);
              ctx.fillStyle = label.color;
              ctx.globalAlpha = 0.15 * pTarget.scale;
              ctx.fill();
            }

            // Draw glassmorphic neon text capsule
            const txt = label.label;
            const fontSize = Math.max(7.5, 9.5 * sc);
            ctx.font = `700 ${fontSize}px "JetBrains Mono", monospace`;
            const txtWidth = ctx.measureText(txt).width;
            
            const padX = 8 * sc;
            const padY = 5.5 * sc;
            const capW = txtWidth + padX * 2;
            const capH = fontSize + padY * 2;
            const capX = pLabel.x - capW / 2;
            const capY = pLabel.y - capH / 2;
            const capR = Math.max(2, 5 * sc);

            // Background fill (reduced opacity for ambient look)
            ctx.beginPath();
            roundRect(ctx, capX, capY, capW, capH, capR);
            ctx.fillStyle = 'rgba(5, 13, 26, 0.40)';
            ctx.strokeStyle = label.color;
            ctx.lineWidth = 0.8 * sc;
            ctx.globalAlpha = 0.20 * sc;
            ctx.fill();

            // Neon border glow (reduced border stroke opacity and shadow blur for ambient look)
            ctx.shadowBlur = 2 * sc;
            ctx.shadowColor = label.color;
            ctx.stroke();
            ctx.shadowBlur = 0; // reset shadow immediately

            // Label text (reduced opacity to make it ambient)
            ctx.fillStyle = label.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = 0.35 * sc;
            ctx.fillText(txt, pLabel.x, pLabel.y);
            ctx.globalAlpha = 1;
          }
        });
      });

      // Draw 3D diagnostic target brackets on a couple of nodes (Stark J.A.R.V.I.S. tracking reticles)
      [0, 5].forEach((nIdx) => {
        const n = nodes[nIdx];
        if (n) {
          const avgZ = n.z;
          primitives.push({
            z: avgZ - 1, // Draw slightly in front of the node
            draw: (ctx) => {
              const sc = n.scale;
              const size = (6 + Math.sin(t * 3.5 + nIdx) * 1.5) * sc;
              
              ctx.strokeStyle = n.color;
              ctx.globalAlpha = 0.25 * sc;
              ctx.lineWidth = 0.5 * sc;
              
              // Draw 4 corner brackets
              // Top-left
              ctx.beginPath();
              ctx.moveTo(n.x - size, n.y - size + 2 * sc);
              ctx.lineTo(n.x - size, n.y - size);
              ctx.lineTo(n.x - size + 2 * sc, n.y - size);
              ctx.stroke();
              
              // Top-right
              ctx.beginPath();
              ctx.moveTo(n.x + size, n.y - size + 2 * sc);
              ctx.lineTo(n.x + size, n.y - size);
              ctx.lineTo(n.x + size - 2 * sc, n.y - size);
              ctx.stroke();
              
              // Bottom-left
              ctx.beginPath();
              ctx.moveTo(n.x - size, n.y + size - 2 * sc);
              ctx.lineTo(n.x - size, n.y + size);
              ctx.lineTo(n.x - size + 2 * sc, n.y + size);
              ctx.stroke();
              
              // Bottom-right
              ctx.beginPath();
              ctx.moveTo(n.x + size, n.y + size - 2 * sc);
              ctx.lineTo(n.x + size, n.y + size);
              ctx.lineTo(n.x + size - 2 * sc, n.y + size);
              ctx.stroke();
              
              // Small diagnostic tag
              ctx.font = `600 ${Math.max(4.0, 5.0 * sc)}px "JetBrains Mono", monospace`;
              ctx.fillStyle = n.color;
              ctx.globalAlpha = 0.35 * sc;
              ctx.fillText(`TRK_${nIdx}`, n.x + size + 2 * sc, n.y - size + 2 * sc);
              ctx.globalAlpha = 1;
            }
          });
        }
      });


      // ══════════ RENDER DEPTH PRIMITIVES (Painter's Algorithm) ══════════
      // Sort: furthest away (largest z) is rendered first.
      primitives.sort((a, b) => b.z - a.z);
      
      // Execute all draw instructions
      primitives.forEach(p => p.draw(ctx));


      // ══════════ HUD PANELS (2D Screen Overlays drawn last on top) ══════════

      /* ── Right HUD ── */
      const hx = cx + 222, hy = cy - 62;
      ctx.save();
      ctx.fillStyle='rgba(5,13,26,0.78)'; ctx.strokeStyle=C;
      ctx.globalAlpha=0.52+Math.sin(t*0.9)*0.04; ctx.lineWidth=0.5;
      roundRect(ctx, hx, hy, 104, 88, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle=C; ctx.globalAlpha=0.42;
      roundRect(ctx, hx, hy, 104, 2, 1); ctx.fill(); ctx.globalAlpha=1;

      ctx.font='700 7px "JetBrains Mono",monospace'; ctx.textAlign='left';
      ctx.fillStyle=C; ctx.globalAlpha=0.75; ctx.fillText('STATUS', hx+8, hy+15);
      ctx.fillStyle=G; ctx.globalAlpha=0.90;
      ctx.fillText('ONLINE', hx+52, hy+15);

      // Blinking online dot
      ctx.beginPath(); ctx.arc(hx+48, hy+11, 2, 0, Math.PI*2);
      ctx.fillStyle=G; ctx.globalAlpha=0.7+Math.sin(t*3)*0.3; ctx.fill();

      ctx.font='600 6.5px "JetBrains Mono",monospace';
      ctx.fillStyle=W; ctx.globalAlpha=0.50;
      ctx.fillText('CORE  AI v2.1', hx+8, hy+26);

      const barW=88, barFill=0.85+Math.sin(t*0.9)*0.09;
      ctx.fillStyle='rgba(34,211,238,0.10)'; ctx.globalAlpha=1;
      roundRect(ctx, hx+8, hy+33, barW, 5, 2); ctx.fill();
      const pGrad=ctx.createLinearGradient(hx+8,0,hx+8+barW*barFill,0);
      pGrad.addColorStop(0,C); pGrad.addColorStop(1,B);
      ctx.fillStyle=pGrad; roundRect(ctx, hx+8, hy+33, barW*barFill, 5, 2); ctx.fill();
      ctx.fillStyle=W; ctx.globalAlpha=0.35; ctx.font='600 5.5px "JetBrains Mono",monospace';
      ctx.fillText(`PWR ${Math.round(barFill*100)}%`, hx+8, hy+46);

      // Diagnostic text readings (Jarvis style)
      ctx.font='600 5.5px "JetBrains Mono",monospace';
      ctx.fillStyle=C; ctx.globalAlpha=0.45;
      ctx.fillText(`T_COIL: ${(1024 + Math.sin(t*1.2)*12).toFixed(1)}K`, hx+8, hy+55);
      ctx.fillStyle=P;
      ctx.fillText(`MAG_STB: ${(98.2 + Math.cos(t*0.8)*0.4).toFixed(2)}%`, hx+8, hy+63);

      // Sparkline
      ctx.beginPath();
      for (let px2 = 0; px2 < barW; px2++) {
        const sy = Math.sin(px2 / barW * 7 + t * 2.2) * 5
                 + Math.sin(px2 / barW * 13 + t * 3.5) * 2.5;
        const sx = hx + 8 + px2;
        const sY = hy + 76 + sy;
        px2 === 0 ? ctx.moveTo(sx, sY) : ctx.lineTo(sx, sY);
      }
      ctx.strokeStyle=C; ctx.globalAlpha=0.40; ctx.lineWidth=0.8; ctx.stroke();
      ctx.globalAlpha=1; ctx.restore();

      // Interactive 3D Target Connector (Locks onto projected rotating core outer ring node)
      const pRightHUDConnect = project(135 * Math.cos(-t * 0.3), 135 * Math.sin(-t * 0.3), 15, cx, cy);
      ctx.setLineDash([3,5]);
      ctx.strokeStyle=C; ctx.globalAlpha=0.12; ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(hx, hy+44); ctx.lineTo(pRightHUDConnect.x, pRightHUDConnect.y); ctx.stroke();
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

      // Mini bars
      [0.82, 0.91, 0.74, 0.95, 0.66, 0.88].forEach((v, i) => {
        const bx = lx + 8 + i * 13, bH = (v + Math.sin(t*2+i)*0.06) * 12;
        ctx.fillStyle = [C,B,P,G,C,B][i];
        ctx.globalAlpha = 0.50;
        ctx.fillRect(bx, ly + 48 - bH, 9, bH);
      });
      ctx.globalAlpha=1; ctx.restore();

      // Interactive 3D Target Connector (Locks onto opposite rotating outer ring node)
      const pLeftHUDConnect = project(135 * Math.cos(Math.PI - t * 0.3), 135 * Math.sin(Math.PI - t * 0.3), 15, cx, cy);
      ctx.setLineDash([3,5]);
      ctx.strokeStyle=P; ctx.globalAlpha=0.12; ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(lx+92, ly+28); ctx.lineTo(pLeftHUDConnect.x, pLeftHUDConnect.y); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha=1;

      /* ── Watermark label ── */
      ctx.save();
      ctx.font='700 8.5px "JetBrains Mono",monospace'; ctx.textAlign='center';
      ctx.fillStyle=C; ctx.globalAlpha=0.18;
      ctx.fillText('AIGNITE · AI CORE 3D', cx, cy + outerR + 16);
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '1 / 0.90', maxWidth: 580 }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(34,211,238,0.07) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)' }} />
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
}
