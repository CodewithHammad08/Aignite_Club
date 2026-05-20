// ScrollProgressBar.jsx
// Communicates: "you are moving through this content." A 2px bar
// at the very top of the viewport — unobtrusive, but always reassuring.
// The cyan color matches the primary accent, keeping it on-brand.

import React from 'react';
import useScrollProgress from '../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        // Width is driven by scroll position — inline style only (dynamic value)
        width: `${progress * 100}%`,
        height: '2px',
        backgroundColor: '#00d4ff',
        opacity: 0.8,
        zIndex: 9999,
        // borderRadius: 0 — explicitly no border-radius per spec
        // transform-origin left so it grows from the left edge
        transformOrigin: 'left',
        // Smooth update via will-change for GPU compositing
        willChange: 'width',
        pointerEvents: 'none',
      }}
    />
  );
}
