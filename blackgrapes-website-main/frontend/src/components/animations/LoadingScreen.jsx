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
      }, 1200);
      return () => clearTimeout(timer);
    }

    const loaderElem = document.getElementById('bgst-initial-loader');
    if (loaderElem) {
      const timer = setTimeout(() => {
        loaderElem.classList.add('loader-hidden');
        document.documentElement.classList.remove('bgst-loading');
        document.documentElement.classList.add('bgst-loaded');
        window.__bgstLoaded = true;
        try {
          window.dispatchEvent(new CustomEvent('bgst:loaded'));
        } catch (e) {}
        setTimeout(() => {
          if (loaderElem.parentNode) loaderElem.parentNode.removeChild(loaderElem);
        }, 650);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
