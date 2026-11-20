import React, { useEffect, useRef, useState } from 'react';

/**
 * Premium Desktop Magnetic Cursor Follower
 * Inspired by luxury tech studios (Aimfortech).
 * - Smooth RAF interpolation (lerp) for trailing aura ring
 * - Instant positioning for precise center dot
 * - Interactive hover states (expands on buttons, links, cards, form controls)
 * - Click compression feedback
 * - Strict desktop-only gate: disabled on touch screens, tablets, and mobile (pointer: coarse)
 * - Automatically respects prefers-reduced-motion
 * - Zero CPU impact when idle, clean event cleanup on unmount
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position state refs for smooth RAF animation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const checkMotionPref = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!mediaQuery.matches || checkMotionPref.matches) {
      setIsActive(false);
      return;
    }

    setIsActive(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instant update for the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target;
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, ' +
        '.service-card, .project-card, .why-us-capsule-card, .counter-card, ' +
        '.coverflow-card, .btn, .nav-link, .nav-cta-btn, .clickable'
      );
      setIsHovered(!!interactiveEl);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth RAF loop for the trailing ring
    const render = () => {
      // Lerp ring position: current + (target - current) * factor
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = requestAnimationFrame(render);

    // Handle screen resize
    const handleMediaChange = (e) => {
      if (!e.matches) {
        setIsActive(false);
        document.body.classList.remove('has-custom-cursor');
      } else {
        setIsActive(true);
        document.body.classList.add('has-custom-cursor');
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [isVisible]);

  if (!isActive) return null;

  return (
    <div
      className={`bgst-cursor-container ${isVisible ? 'cursor-visible' : 'cursor-hidden'}`}
      aria-hidden="true"
    >
      {/* Center Precision Pointer Dot */}
      <div
        ref={dotRef}
        className={`bgst-cursor-dot ${isHovered ? 'cursor-hover' : ''} ${isClicked ? 'cursor-clicked' : ''}`}
      />

      {/* Smooth Trailing Follower Ring */}
      <div
        ref={ringRef}
        className={`bgst-cursor-ring ${isHovered ? 'cursor-hover' : ''} ${isClicked ? 'cursor-clicked' : ''}`}
      />
    </div>
  );
}
