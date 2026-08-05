import { useEffect, useRef } from 'react';
import anime from 'animejs';


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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const type = el.dataset.animate;
        const delay = parseInt(el.dataset.delay || '0', 10);

        const base = {
          targets: el,
          opacity: [0, 1],
          easing: 'easeOutCubic',
          duration: 800,
          delay,
        };

        switch (type) {
          case 'fade-up':
            anime({ ...base, translateY: [40, 0] });
            break;
          case 'fade-down':
            anime({ ...base, translateY: [-30, 0] });
            break;
          case 'fade-left':
            anime({ ...base, translateX: [50, 0] });
            break;
          case 'fade-right':
            anime({ ...base, translateX: [-50, 0] });
            break;
          case 'zoom-in':
            anime({ ...base, scale: [0.85, 1] });
            break;
          case 'stagger-up':
            // For parent containers: animate children
            const children = el.querySelectorAll('[data-stagger-child]');
            if (children.length) {
              children.forEach(c => { c.style.opacity = '0'; });
              anime({
                targets: children,
                opacity: [0, 1],
                translateY: [30, 0],
                easing: 'easeOutCubic',
                duration: 600,
                delay: anime.stagger(80, { start: delay }),
              });
            }
            el.style.opacity = '1';
            break;
          default:
            anime(base);
        }

        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
