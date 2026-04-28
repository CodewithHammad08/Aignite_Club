import React, { useEffect, useRef } from 'react';

/**
 * Animated Neural Network visualization.
 * Professional AI/ML aesthetic — nodes, layers, data pulses.
 * Moves down with scroll, connections light up as you scroll.
 */
export default function NeuralNet() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H, raf;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = rect.width * window.devicePixelRatio;
      H = canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const w = () => W / window.devicePixelRatio;
    const h = () => H / window.devicePixelRatio;

    // ─── Define layers ───
    const LAYERS = [4, 6, 8, 6, 4, 2];
    const COL = {
      node:   [153, 225, 217],  // #99E1D9
      line:   [112, 171, 175],  // #70ABAF
      pulse:  [240, 247, 244],  // #F0F7F4
      dim:    [112, 93, 86],    // #705D56
    };
    const rgb = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    // Build node positions
    const getNodes = () => {
      const cw = w(), ch = h();
      const padX = cw * 0.12;
      const layerSpacing = (cw - padX * 2) / (LAYERS.length - 1);
      const nodes = [];

      LAYERS.forEach((count, li) => {
        const x = padX + li * layerSpacing;
        const totalH = (count - 1) * 38;
        const startY = (ch - totalH) / 2;
        for (let ni = 0; ni < count; ni++) {
          nodes.push({ x, y: startY + ni * 38, layer: li, idx: ni });
        }
      });
      return nodes;
    };

    // Build connections
    const getConnections = (nodes) => {
      const conns = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            conns.push({ from: i, to: j, weight: 0.3 + Math.random() * 0.7 });
          }
        }
      }
      return conns;
    };

    let nodes = getNodes();
    let conns = getConnections(nodes);
    let scrollT = 0;
    let time = 0;

    const onScroll = () => {
      const vh = window.innerHeight;
      const total = document.body.scrollHeight - vh;
      scrollT = Math.min(window.scrollY / Math.max(total, 1), 1);

      // Move wrapper down with scroll
      if (wrapRef.current) {
        const drift = scrollT * 80;
        wrapRef.current.style.transform = `translateY(${drift}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { resize(); nodes = getNodes(); conns = getConnections(nodes); });

    const draw = () => {
      time += 0.008;
      const cw = w(), ch = h();
      ctx.clearRect(0, 0, cw, ch);

      // ── Draw connections ──
      conns.forEach((c, ci) => {
        const from = nodes[c.from];
        const to = nodes[c.to];

        // Base line
        const baseAlpha = 0.04 + c.weight * 0.04;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = rgb(COL.line, baseAlpha);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Data pulse traveling along connection
        const speed = 0.3 + c.weight * 0.5;
        const pulsePos = (time * speed + ci * 0.02 + scrollT * 3) % 1;
        const px = from.x + (to.x - from.x) * pulsePos;
        const py = from.y + (to.y - from.y) * pulsePos;

        // Only show pulse when scrolling activates this layer
        const layerActivation = Math.max(0, Math.min(1, (scrollT * LAYERS.length - from.layer) * 2));
        if (layerActivation > 0) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, 6);
          g.addColorStop(0, rgb(COL.pulse, 0.5 * layerActivation));
          g.addColorStop(1, rgb(COL.pulse, 0));
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // Brighten the line segment behind the pulse
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(px, py);
          ctx.strokeStyle = rgb(COL.node, 0.15 * layerActivation);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // ── Draw nodes ──
      nodes.forEach((n, ni) => {
        const layerActivation = Math.max(0, Math.min(1, (scrollT * (LAYERS.length + 1) - n.layer) * 1.5));
        const pulse = 0.6 + 0.4 * Math.sin(time * 2 + ni * 0.5);
        const r = 4 + layerActivation * 2;

        // Outer glow
        if (layerActivation > 0.1) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
          g.addColorStop(0, rgb(COL.node, 0.12 * layerActivation * pulse));
          g.addColorStop(1, rgb(COL.node, 0));
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = rgb(COL.node, 0.15 + layerActivation * 0.4);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = rgb(COL.node, 0.3 + layerActivation * 0.7 * pulse);
        ctx.fill();
      });

      // ── Layer labels ──
      const labels = ['Input', 'Hidden', 'Hidden', 'Hidden', 'Hidden', 'Output'];
      ctx.font = '600 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      LAYERS.forEach((_, li) => {
        const x = cw * 0.12 + li * ((cw - cw * 0.24) / (LAYERS.length - 1));
        const layerActivation = Math.max(0, Math.min(1, (scrollT * (LAYERS.length + 1) - li) * 1.5));
        ctx.fillStyle = rgb(COL.dim, 0.3 + layerActivation * 0.5);
        ctx.fillText(labels[li] || '', x, ch - 15);
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[480px] aspect-[4/3] select-none pointer-events-none"
      style={{ transition: 'transform 0.2s ease-out' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
