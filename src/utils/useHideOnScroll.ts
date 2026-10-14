import { useEffect, useState } from 'react';

/**
 * On small screens, returns true while the visitor is scrolling down past the first screen,
 * so floating buttons get out of the way of the content and come back on scroll up.
 * Always false on wider screens (≥ 768px), where the buttons do not cover text.
 */
export const useHideOnScroll = (threshold = 240): boolean => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (!mq.matches || y < threshold || nearBottom) setHidden(false);
      else if (Math.abs(y - lastY) > 8) setHidden(y > lastY);
      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', update);
    };
  }, [threshold]);

  return hidden;
};
