// useCountUp.js
// Communicates: numbers have weight. By animating from 0 to target,
// we let users feel the scale of the stat — it's not just a number, it's a story.

import { useState, useEffect, useRef } from 'react';

/**
 * @param {number} target   - The final number to count to
 * @param {number} duration - Animation duration in ms (default 1200)
 * @returns {{ ref, count, done }} - Attach `ref` to the element to trigger on viewport enter
 */
export default function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now) => {
            // easeOut cubic — fast start, smooth landing
            const elapsed = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - elapsed, 3);
            const current = Math.floor(eased * target);
            setCount(current);

            if (elapsed < 1) {
              requestAnimationFrame(tick);
            } else {
              setCount(target);
              setDone(true); // signal for the "+" pop animation
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, count, done };
}
