import React, { useEffect } from 'react';

/**
 * Premium Cinematic Intro Loader Controller
 * - Coordinates with the 0ms HTML entry loader (#bgst-initial-loader)
 * - Guarantees smooth progress bar animation and graceful fade-out
 * - Zero freeze, zero blocking, safe cleanup
 */
export default function LoadingScreen() {
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.__dismissBgstLoader === 'function') {
      const timer = setTimeout(() => {
        window.__dismissBgstLoader();
      }, 1300);
      return () => clearTimeout(timer);
    }

    const loaderElem = document.getElementById('bgst-initial-loader');
    if (loaderElem) {
      const timer = setTimeout(() => {
        loaderElem.classList.add('loader-hidden');
        setTimeout(() => {
          if (loaderElem.parentNode) loaderElem.parentNode.removeChild(loaderElem);
        }, 650);
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
