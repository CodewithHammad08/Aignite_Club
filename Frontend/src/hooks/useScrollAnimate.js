import { useEffect, useRef } from 'react';

/* ─── Pure CSS/JS scroll animation hook — no external dependencies ─── */
export default function useScrollAnimate() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = containerRef.current.querySelectorAll('[data-animate]');
    if (!targets.length) return;

    // Set initial hidden state
    targets.forEach(el => {
      el.style.opacity = '0';
    });

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function animateEl(el, fromProps, toProps, duration, delay) {
      setTimeout(() => {
        const start = performance.now();
        const tick = (now) => {
          const raw = Math.min((now - start) / duration, 1);
          const t = easeOutCubic(raw);
          Object.keys(fromProps).forEach(prop => {
            const from = fromProps[prop];
            const to = toProps[prop];
            const val = from + (to - from) * t;
            if (prop === 'opacity') {
              el.style.opacity = val;
            } else if (prop === 'translateY') {
              el.style.transform = `translateY(${val}px)`;
            } else if (prop === 'translateX') {
              el.style.transform = `translateX(${val}px)`;
            } else if (prop === 'scale') {
              el.style.transform = `scale(${val})`;
            }
          });
          if (raw < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, delay);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const type = el.dataset.animate;
        const delay = parseInt(el.dataset.delay || '0', 10);
        const duration = 800;

        switch (type) {
          case 'fade-up':
            animateEl(el, { opacity: 0, translateY: 40 }, { opacity: 1, translateY: 0 }, duration, delay);
            break;
          case 'fade-down':
            animateEl(el, { opacity: 0, translateY: -30 }, { opacity: 1, translateY: 0 }, duration, delay);
            break;
          case 'fade-left':
            animateEl(el, { opacity: 0, translateX: 50 }, { opacity: 1, translateX: 0 }, duration, delay);
            break;
          case 'fade-right':
            animateEl(el, { opacity: 0, translateX: -50 }, { opacity: 1, translateX: 0 }, duration, delay);
            break;
          case 'zoom-in':
            animateEl(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1 }, duration, delay);
            break;
          case 'stagger-up': {
            const children = el.querySelectorAll('[data-stagger-child]');
            if (children.length) {
              children.forEach((c, i) => {
                c.style.opacity = '0';
                animateEl(c, { opacity: 0, translateY: 30 }, { opacity: 1, translateY: 0 }, 600, delay + i * 80);
              });
            }
            el.style.opacity = '1';
            break;
          }
          default:
            animateEl(el, { opacity: 0 }, { opacity: 1 }, duration, delay);
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
