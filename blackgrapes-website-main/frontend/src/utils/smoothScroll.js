/**
 * BLACK GRAPES SOFTECH - HIGH-PERFORMANCE MOMENTUM SCROLL ENGINE
 * Provides silky-smooth inertia scrolling inspired by luxury agency motion (Lenis-like)
 * 100% Native, zero external dependencies, seamless GSAP ScrollTrigger synchronization.
 * 
 * Safety & Performance Guarantees:
 * - Desktop fine-pointer only (never interferes with mobile touch/swipes)
 * - Automatically pauses when modals or mobile drawers are open
 * - Preserves native scrollbars and anchor navigation (#home, #services, #about)
 * - Completely disabled when user prefers reduced motion
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isSmoothScrollActive = false;
let rafId = null;
let currentScrollY = 0;
let targetScrollY = 0;
let isMoving = false;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {};

  // Verify desktop fine pointer and reduced motion
  const isDesktopFinePointer = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isDesktopFinePointer || prefersReduced) {
    return () => {};
  }

  currentScrollY = window.scrollY || window.pageYOffset;
  targetScrollY = currentScrollY;

  const getMaxScroll = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight;
  };

  const updateScroll = () => {
    if (!isMoving) return;

    const diff = targetScrollY - currentScrollY;
    const factor = 0.085; // Luxurious dampening

    if (Math.abs(diff) > 0.4) {
      currentScrollY += diff * factor;
      window.scrollTo(0, currentScrollY);

      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.update) {
        ScrollTrigger.update();
      }

      rafId = requestAnimationFrame(updateScroll);
    } else {
      currentScrollY = targetScrollY;
      window.scrollTo(0, currentScrollY);
      isMoving = false;
      if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.update) {
        ScrollTrigger.update();
      }
    }
  };

  const handleWheel = (e) => {
    // If a modal or mobile drawer is open, or body has overflow hidden, do not intercept
    if (document.body.style.overflow === 'hidden' || document.querySelector('.modal-open, .modal-backdrop')) {
      return;
    }

    // Check if target is inside an independently scrollable container
    let el = e.target;
    while (el && el !== document.body && el !== document.documentElement) {
      const overflowY = window.getComputedStyle(el).overflowY;
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        return; // Let the inner scroll container handle its own wheel
      }
      el = el.parentElement;
    }

    e.preventDefault();

    const maxScroll = getMaxScroll();
    // Normalize delta across browsers
    let delta = e.deltaY;
    if (e.deltaMode === 1) delta *= 30; // Line mode
    else if (e.deltaMode === 2) delta *= window.innerHeight; // Page mode

    targetScrollY = Math.max(0, Math.min(targetScrollY + delta * 0.9, maxScroll));

    if (!isMoving) {
      isMoving = true;
      rafId = requestAnimationFrame(updateScroll);
    }
  };

  // Keep target synchronized when user drags native scrollbar or presses PageDown/Space
  const handleNativeScroll = () => {
    if (!isMoving) {
      currentScrollY = window.scrollY || window.pageYOffset;
      targetScrollY = currentScrollY;
    }
  };

  // Keep synchronized on window resize
  const handleResize = () => {
    const maxScroll = getMaxScroll();
    targetScrollY = Math.min(targetScrollY, maxScroll);
    currentScrollY = Math.min(currentScrollY, maxScroll);
  };

  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('scroll', handleNativeScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  isSmoothScrollActive = true;

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('scroll', handleNativeScroll);
    window.removeEventListener('resize', handleResize);
    isSmoothScrollActive = false;
    isMoving = false;
  };
}

export default initSmoothScroll;
