import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initMotionSystem } from '../utils/motionEngine';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout to allow target DOM element to render
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 80);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Refresh animation triggers on route change for newly rendered route elements
    const motionTimer = setTimeout(() => {
      initMotionSystem();
    }, 60);

    return () => clearTimeout(motionTimer);
  }, [pathname, hash]);

  return null;
}
