// PageTransition.jsx
// Communicates: navigating between pages is a movement, not a teleport.
// The outgoing page slides up and fades out (recedes), the incoming page
// rises from below (arrives). 350ms keeps it fast enough to not feel sluggish.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Detect reduced motion preference — if set, skip transforms and just fade
const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

// Framer Motion variants — defined as named constants per spec
const pageVariants = prefersReducedMotion
  ? {
      // Reduced motion: only opacity, no transform
      initial:  { opacity: 0 },
      animate:  { opacity: 1, transition: { duration: 0.2 } },
      exit:     { opacity: 0, transition: { duration: 0.2 } },
    }
  : {
      // Full motion:
      //   Exit → fade out + slide UP 20px (page departs upward)
      //   Enter → fade in + slide up from 20px BELOW (page arrives from beneath)
      initial:  { opacity: 0, y: 20 },
      animate:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
      exit:     { opacity: 0, y: -20, transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] } },
    };

export default function PageTransition({ pageKey, children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        // layout prevents any layout shifts during transition
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
