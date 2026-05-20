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
    let rafId;
    let isExpanded = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    // Lerp-based animation loop for the ring (creates the ~80ms lag)
    const animate = () => {
      // Linear interpolation: ring chases the mouse at 18% per frame
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (isExpanded) {
        ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      } else {
        ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

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
