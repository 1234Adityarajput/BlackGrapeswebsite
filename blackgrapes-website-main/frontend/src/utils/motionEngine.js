/**
 * BLACK GRAPES SOFTECH - CREATIVE GSAP MOTION DESIGN SYSTEM
 * Award-winning animation choreography for Hero, Cards, ScrollTrigger, Tilt & Page Transitions
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion for accessibility
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * 1. HERO SECTION CINEMATIC CHOREOGRAPHY
 * Creates a coordinated sequence across ANY hero section on any page
 */
export function initHeroAnimation() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  const heroSelectors = [
    '.hero-section',
    '.about-hero-section',
    '.products-hero-section',
    '.clients-hero-section',
    '.portfolio-hero-section',
    '.softech-hero'
  ].join(', ');

  const heroContainers = document.querySelectorAll(heroSelectors);

  heroContainers.forEach((container) => {
    if (container._hasHeroAnimation) return;
    container._hasHeroAnimation = true;

    gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Badge Pill
      const badge = container.querySelector(
        '.hero-badge-pill, .hero-eyebrow, .hero-eyebrow-badge, .hero-badge-wrap, .hero-eyebrow-pill'
      );
      if (badge) {
        tl.fromTo(
          badge,
          { y: -22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, delay: 0.15 }
        );
      }

      // 2. Headline with cinematic blur-to-sharp reveal
      const title = container.querySelector(
        '.hero-title, .products-hero-title, .portfolio-hero-title, .black-hero-title, .clients-hero-title, h1'
      );
      if (title) {
        tl.fromTo(
          title,
          { y: 36, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 },
          '-=0.4'
        );
      }

      // 3. Supporting Description
      const desc = container.querySelector(
        '.hero-description, .products-hero-desc, .portfolio-hero-subtitle, .black-hero-subtitle, .hero-lead'
      );
      if (desc) {
        tl.fromTo(
          desc,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
      }

      // 4. CTA Buttons Staggered
      const cta = container.querySelector(
        '.hero-cta-group, .hero-cta-bar, .hero-cta-row'
      );
      if (cta && cta.children.length > 0) {
        tl.fromTo(
          cta.children,
          { y: 18, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12 },
          '-=0.4'
        );
      }

      // 5. Metrics Bar
      const metrics = container.querySelector(
        '.hero-metrics-grid, .portfolio-metrics-strip, .hero-stats-row'
      );
      if (metrics) {
        tl.fromTo(
          metrics,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.3'
        );
      }

      // 6. Right Visual: 3D Perspective Entrance + Ambient Float
      const visual = container.querySelector(
        '.hero-visual, .hero-visual-card, .products-hero-visual, .hero-glass-card'
      );
      if (visual) {
        tl.fromTo(
          visual,
          { x: 45, opacity: 0, rotateY: -6, scale: 0.95 },
          { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.1, ease: 'power2.out' },
          '-=0.8'
        );
      }
    }, container);
  });
}

/**
 * 2. 3D INTERACTIVE CARD TILT & SPOTLIGHT SYSTEM
 * Subtle pointer-based 3D perspective and radial lighting for desktop
 */
export function initCardTilt() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  // Only enable on desktop screens with fine pointer
  const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  if (!isDesktop) return;

  const cardSelectors = [
    '.service-card',
    '.project-card',
    '.coverflow-card',
    '.process-step-card',
    '.why-us-capsule-card',
    '.industry-card',
    '.product-card',
    '.value-card',
    '.domain-card',
    '.timeline-card',
    '.staffing-model-card',
    '.talent-card',
    '.ecommerce-feature-card',
    '.partner-tier-card'
  ].join(', ');

  const cards = document.querySelectorAll(cardSelectors);

  cards.forEach((card) => {
    if (card._hasTiltListener) return;
    card._hasTiltListener = true;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Restrained tilt angle (-6 to 6 deg)
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      // Update CSS variables for dynamic radial spotlight
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        scale: 1.02,
        duration: 0.35,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

/**
 * 3. MAGNETIC MICRO-INTERACTIONS FOR CTA BUTTONS
 * Gently pulls CTA buttons toward pointer on hover
 */
export function initMagneticButtons() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  if (!isDesktop) return;

  const buttons = document.querySelectorAll('.btn-primary, .nav-cta-btn, .btn-magnetic');

  buttons.forEach((btn) => {
    if (btn._hasMagneticListener) return;
    btn._hasMagneticListener = true;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
  });
}

/**
 * 4. GLOBAL SCROLLTRIGGER SECTION & CARD REVEALS
 * Orchestrates entrance for every section, header, and card grid across all pages
 */
export function initScrollTriggers() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  // Refresh ScrollTrigger to calculate accurate layout bounds
  ScrollTrigger.refresh();

  // A. Section Headers Reveal
  const sectionHeaders = document.querySelectorAll('.section-header:not(._animated)');
  sectionHeaders.forEach((header) => {
    header.classList.add('_animated');
    gsap.fromTo(
      header,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // B. Card Grids Staggered Reveal
  const gridSelectors = [
    '.services-grid',
    '.projects-grid',
    '.values-grid',
    '.domains-grid',
    '.timeline-grid',
    '.products-grid',
    '.clients-grid',
    '.staffing-grid',
    '.ecommerce-grid',
    '.why-us-hub-layout'
  ];

  gridSelectors.forEach((selector) => {
    const grids = document.querySelectorAll(`${selector}:not(._animated)`);
    grids.forEach((grid) => {
      grid.classList.add('_animated');
      const cards = grid.children;
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    });
  });

  // C. Image Clip-Path / Zoom Reveals
  const images = document.querySelectorAll(
    '.service-card-img-wrapper img, .motion-card-img-wrap img, .product-card img, .founder-card img'
  );
  images.forEach((img) => {
    if (img._hasImgReveal) return;
    img._hasImgReveal = true;

    gsap.fromTo(
      img,
      { scale: 1.15, filter: 'blur(4px)' },
      {
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // D. Attach 3D Card Tilt & Magnetic Buttons to any newly rendered elements
  initCardTilt();
  initMagneticButtons();
}

/**
 * 5. MASTER MOTION CONTROLLER
 * Initializes all animations and observes route changes / DOM mutations
 */
export function initMotionSystem() {
  if (typeof window === 'undefined') return () => {};

  // Initialize initial viewport triggers
  initHeroAnimation();
  initScrollTriggers();
  initCardTilt();
  initMagneticButtons();

  // MutationObserver for dynamic DB content / route transitions
  const mutationObserver = new MutationObserver(() => {
    initHeroAnimation();
    initScrollTriggers();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => {
    mutationObserver.disconnect();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}

export default initMotionSystem;
