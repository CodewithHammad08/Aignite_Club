// useCursorEffect.js
// Communicates: the interface is alive and aware of you. The custom cursor
// creates a sense of physical presence — the page responds to the user's movements.
// The ring expansion on interactive elements signals "this is clickable" without
// any tooltip or underline — purely through motion language.

import { useEffect } from 'react';

export default function useCursorEffect() {
  useEffect(() => {
    // Skip on touch devices and when user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (prefersReducedMotion || isTouchDevice) return;

    // Create the two-part cursor: dot (follows cursor) + ring (lags behind)
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let rafId = null;
    let isExpanded = false;

    // Lerp-based animation loop for the ring (creates the ~80ms lag)
    const animate = () => {
      // Dot follows instantly in the render loop
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

      // Linear interpolation: ring chases the mouse at 18% per frame
      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      
      ringX += dx * 0.18;
      ringY += dy * 0.18;

      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;

      // Only continue loop if the ring hasn't fully caught up
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        rafId = null;
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    };
    // Trigger initial positioning animation frame
    rafId = requestAnimationFrame(animate);

    // Detect interactive elements and expand the ring
    const INTERACTIVE = 'button, a, [role="button"], input, select, textarea, [data-interactive]';

    const onMouseOver = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        isExpanded = true;
        ring.classList.add('cursor-ring--expanded');
        dot.classList.add('cursor-dot--hidden');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        isExpanded = false;
        ring.classList.remove('cursor-ring--expanded');
        dot.classList.remove('cursor-dot--hidden');
      }
    };

    // Hide native cursor
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.body.style.cursor = '';
      dot.remove();
      ring.remove();
    };
  }, []);
}
