// ScrollProgressBar.jsx
// Communicates: "you are moving through this content." A 2px bar
// at the very top of the viewport — unobtrusive, but always reassuring.
// The cyan color matches the primary accent, keeping it on-brand.

import React, { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!barRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      barRef.current.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial value
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: '#00d4ff',
        opacity: 0.8,
        zIndex: 9999,
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    />
  );
}
