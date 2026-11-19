import React, { useState, useEffect } from 'react';

/**
 * Premium Branded Website Loading Screen for Black Grapes Softech
 * - Shows on initial site visit or browser refresh
 * - Suppressed during internal React Router navigation
 * - Features official Black Grapes logo with glow aura, smooth progress indicator, and seamless fade-out
 */
export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if user has already seen loader in this browser session
    const hasLoaded = sessionStorage.getItem('bgst_loaded_session');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Smooth, realistic progress bar increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate smoothly as it approaches completion
        const step = Math.floor(Math.random() * 15) + 10;
        return Math.min(prev + step, 100);
      });
    }, 75);

    // Fade out and close
    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      sessionStorage.setItem('bgst_loaded_session', 'true');
      
      const unmountTimer = setTimeout(() => {
        setLoading(false);
      }, 500); // 500ms fade transition

      return () => clearTimeout(unmountTimer);
    }, 1100); // Clean, snappy ~1.1s total loading experience (No 3-5s freeze!)

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`bgst-loader-overlay ${fadeOut ? 'fade-out' : ''}`}
      aria-label="Loading Black Grapes Softech"
      role="status"
    >
      {/* Ambient Pulsing Glow in Background */}
      <div className="loader-ambient-glow" aria-hidden="true" />
      
      <div className="loader-content">
        {/* Glowing Logo Container */}
        <div className="loader-logo-wrap">
          <div className="loader-logo-glow" />
          <img 
            src="/bgst-logo.png" 
            alt="Black Grapes Softech" 
            className="loader-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/bgst-logo.png';
            }}
          />
        </div>

        {/* Company Title */}
        <div className="loader-brand-title">
          <span className="brand-primary">BLACK GRAPES</span>
          <span className="brand-accent"> SOFTECH</span>
        </div>
        <p className="loader-tagline">Engineering Next-Gen Digital Products</p>

        {/* Minimal High-Tech Progress Bar */}
        <div className="loader-progress-container">
          <div 
            className="loader-progress-bar" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Percentage Counter */}
        <div className="loader-status-text">
          <span>INITIALIZING EXPERIENCE</span>
          <span className="loader-percentage">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
