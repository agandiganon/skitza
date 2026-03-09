'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const run = () => scrollToPageTop();
    const raf = window.requestAnimationFrame(run);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
