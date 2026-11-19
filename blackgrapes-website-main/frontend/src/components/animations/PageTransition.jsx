import React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global Page Transition Wrapper
 * Wraps page elements to provide a silky smooth fade-in and subtle upward glide upon route changes.
 */
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition-wrapper">
      {children}
    </div>
  );
}
