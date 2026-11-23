import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Top Cyber Navigation Progress Bar
 * Sleek 2.5px electric orange-purple laser beam that sweeps across the viewport on route transitions.
 */
export default function TopRouteProgressBar() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!animating) return null;

  return (
    <div className="top-cyber-progress-bar" aria-hidden="true">
      <div className="top-cyber-progress-glow" />
    </div>
  );
}
