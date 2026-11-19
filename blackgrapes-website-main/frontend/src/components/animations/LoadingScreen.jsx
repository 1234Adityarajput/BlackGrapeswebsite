import React, { useEffect } from 'react';

/**
 * Premium Cinematic Intro Loader Controller
 * - Controls the 0ms HTML entry loader (#bgst-initial-loader)
 * - Guarantees a minimum 1.4s cinematic reveal on every page load/reload
 * - Ensures smooth progress bar animation and graceful 650ms fade-out
 * - Max safety fallback of 6s to prevent any freeze
 */
export default function LoadingScreen() {
  useEffect(() => {
    const loaderElem = document.getElementById('bgst-initial-loader');
    const progressBar = document.getElementById('init-loader-bar');

    if (!loaderElem) return;

    let progress = 15;
    if (progressBar) progressBar.style.width = '15%';

    // Smooth progress increment
    const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 20) + 12;
          if (progress >= 95) {
            progress = 95;
            clearInterval(interval);
          }
          if (progressBar) {
            progressBar.style.width = `${progress}%`;
          }
        }, 120);

      // Guaranteed minimum duration: 1.4 seconds
      const dismissTimer = setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';

        // Smooth cinematic fade-out
        setTimeout(() => {
          if (loaderElem) {
            loaderElem.classList.add('loader-hidden');
            setTimeout(() => {
              if (loaderElem && loaderElem.parentNode) {
                loaderElem.parentNode.removeChild(loaderElem);
              }
            }, 700);
          }
    }, 250);
  }, 1400);

    // Absolute fallback safety (6s)
    const fallbackTimer = setTimeout(() => {
      if (loaderElem && loaderElem.parentNode) {
        loaderElem.classList.add('loader-hidden');
        setTimeout(() => {
          if (loaderElem && loaderElem.parentNode) {
            loaderElem.parentNode.removeChild(loaderElem);
          }
        }, 700);
      }
    }, 6000);

  return () => {
    clearInterval(interval);
    clearTimeout(dismissTimer);
    clearTimeout(fallbackTimer);
  };
}, []);

return null;
}
