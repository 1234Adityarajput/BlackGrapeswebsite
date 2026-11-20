/**
 * BLACK GRAPES SOFTECH - CREATIVE GSAP MOTION DESIGN SYSTEM
 * 100% Safe, GPU-Accelerated, Zero-Freeze Creative Motion Engine
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
 */
export function initHeroAnimation() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  // If initial preloader is active, defer animation choreography until loader dissolves
  const isLoaderActive = typeof document !== 'undefined' && 
    document.getElementById('bgst-initial-loader') && 
    !document.getElementById('bgst-initial-loader').classList.contains('loader-hidden');

  if (isLoaderActive) {
    const runAfterLoad = () => {
      window.removeEventListener('bgst:loaded', runAfterLoad);
      setTimeout(initHeroAnimation, 80);
    };
    window.addEventListener('bgst:loaded', runAfterLoad);
    return;
  }

  const heroSelectors = [
    '.hero-section',
    '.about-hero-section',
    '.products-hero-section',
    '.clients-hero-section',
    '.portfolio-hero-section',
    '.softech-hero',
    '.it-staffing-hero',
    '.ecommerce-hero',
    '.contact-hero',
    '.partnership-hero',
    '.business-partners-hero'
  ].join(', ');

  const heroContainers = document.querySelectorAll(heroSelectors);

  heroContainers.forEach((container) => {
    if (container.dataset.heroAnimated === 'true') return;
    container.dataset.heroAnimated = 'true';

    try {
      const elements = [
        container.querySelector('.hero-badge-pill, .hero-eyebrow, .hero-eyebrow-badge, .hero-badge-wrap, .hero-eyebrow-pill'),
        container.querySelector('.hero-title, .products-hero-title, .portfolio-hero-title, .black-hero-title, .clients-hero-title, h1'),
        container.querySelector('.hero-description, .products-hero-desc, .portfolio-hero-subtitle, .black-hero-subtitle, .hero-lead'),
        container.querySelector('.hero-cta-group, .hero-cta-bar, .hero-cta-row'),
        container.querySelector('.hero-visual, .hero-visual-card, .products-hero-visual, .hero-glass-card'),
        container.querySelector('.hero-metrics-grid')
      ].filter(Boolean);

      // Guarantee elements are never stuck invisible
      elements.forEach(el => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          elements.forEach(el => {
            gsap.set(el, { clearProps: 'opacity,filter,transform' });
          });
        }
      });

      const badge = elements[0];
      if (badge) {
        tl.fromTo(badge, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, delay: 0.05 });
      }

      const title = elements[1];
      if (title) {
        tl.fromTo(title, { x: -65, opacity: 0 }, { x: 0, opacity: 1, duration: 0.65 }, '-=0.35');
      }

      const desc = elements[2];
      if (desc) {
        tl.fromTo(desc, { x: -55, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.4');
      }

      const cta = elements[3];
      if (cta && cta.children.length > 0) {
        tl.fromTo(cta.children, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, '-=0.35');
      }

      const visual = elements[4];
      if (visual) {
        tl.fromTo(visual, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power3.out' }, '-=0.45');
      }
    } catch (e) {
      console.warn('[MotionEngine] Hero animation notice:', e);
      const allHeroElements = container.querySelectorAll('.hero-content, .hero-badge-pill, .hero-title, .hero-description, .hero-cta-group, .hero-metrics-grid, .hero-visual');
      allHeroElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
    }
  });
}

/**
 * 2. 3D CARD TILT VIA SAFE EVENT DELEGATION
 * Uses a single listener on document. No loops, zero memory leaks, works for all dynamic cards.
 */
let isTiltInitialized = false;
let activeTiltCard = null;

export function initCardTilt() {
  if (typeof window === 'undefined' || isTiltInitialized || prefersReducedMotion()) return;

  const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  if (!isDesktop) return;

  isTiltInitialized = true;

  const cardSelector = [
    '.service-card',
    '.softech-card',
    '.softech-service-card',
    '.softech-spotlight-card',
    '.project-card',
    '.coverflow-card',
    '.process-step-card',
    '.why-us-capsule-card',
    '.industry-card',
    '.product-card',
    '.product-glass-card',
    '.value-card',
    '.domain-card',
    '.timeline-card',
    '.staffing-model-card',
    '.talent-card',
    '.hiring-step-card',
    '.ecommerce-feature-card',
    '.store-model-card',
    '.partner-tier-card',
    '.stat-card',
    '.stat-card-v2',
    '.counter-card',
    '.founder-card',
    '.contact-card',
    '.contact-info-card',
    '.compliance-metric-box',
    '.translucent-glass-card'
  ].join(', ');

  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest(cardSelector);

    if (card) {
      activeTiltCard = card;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt (-5 to 5 deg)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        scale: 1.015,
        duration: 0.25,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    } else if (activeTiltCard) {
      gsap.to(activeTiltCard, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      activeTiltCard = null;
    }
  }, { passive: true });
}

/**
 * 3. MAGNETIC BUTTONS VIA SAFE EVENT DELEGATION
 */
let isMagneticInitialized = false;
let activeMagneticBtn = null;

export function initMagneticButtons() {
  if (typeof window === 'undefined' || isMagneticInitialized || prefersReducedMotion()) return;

  const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  if (!isDesktop) return;

  isMagneticInitialized = true;

  document.addEventListener('mousemove', (e) => {
    const btn = e.target.closest('.btn-primary, .nav-cta-btn, .btn-magnetic');

    if (btn) {
      activeMagneticBtn = btn;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    } else if (activeMagneticBtn) {
      gsap.to(activeMagneticBtn, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
      activeMagneticBtn = null;
    }
  }, { passive: true });
}

/**
 * 4. SCROLL ENTRANCE VIA SAFE INTERSECTION OBSERVER
 * Uses native IntersectionObserver for buttery smooth 60fps card reveals.
 * Runs once per element, NEVER loops, 0% CPU impact.
 */
let scrollObserver = null;

export function initScrollTriggers() {
  if (typeof window === 'undefined' || prefersReducedMotion()) return;

  if (!scrollObserver) {
    scrollObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
  }

  const selector = [
    '.section-header:not(._observed)',
    '.section-title:not(._observed)',
    '.section-subtitle:not(._observed)',
    '.section-badge:not(._observed)',
    '.service-card:not(._observed)',
    '.softech-card:not(._observed)',
    '.softech-service-card:not(._observed)',
    '.softech-spotlight-card:not(._observed)',
    '.project-card:not(._observed)',
    '.process-step-card:not(._observed)',
    '.why-us-capsule-card:not(._observed)',
    '.counter-card:not(._observed)',
    '.counters-banner:not(._observed)',
    '.testimonial-card:not(._observed)',
    '.industry-card:not(._observed)',
    '.stat-strip-card:not(._observed)',
    '.stat-card:not(._observed)',
    '.stat-card-v2:not(._observed)',
    '.vm-card:not(._observed)',
    '.founder-card:not(._observed)',
    '.value-card:not(._observed)',
    '.domain-card:not(._observed)',
    '.timeline-card:not(._observed)',
    '.product-card:not(._observed)',
    '.product-glass-card:not(._observed)',
    '.client-logo-card:not(._observed)',
    '.client-case-card:not(._observed)',
    '.staffing-model-card:not(._observed)',
    '.talent-card:not(._observed)',
    '.hiring-step-card:not(._observed)',
    '.ecommerce-feature-card:not(._observed)',
    '.store-model-card:not(._observed)',
    '.contact-info-card:not(._observed)',
    '.contact-form-wrap:not(._observed)',
    '.partner-tier-card:not(._observed)',
    '.tendering-callout-card:not(._observed)',
    '.cta-banner-box:not(._observed)',
    '.cta-banner:not(._observed)',
    '.compliance-metric-box:not(._observed)',
    '.translucent-glass-card:not(._observed)'
  ].join(', ');

  const targets = document.querySelectorAll(selector);

  targets.forEach((el) => {
    el.classList.add('_observed', 'reveal-init');
    const parentGrid = el.closest('.grid, .cards-grid, [class*="-grid"], [class*="-layout"]');
    let delay = 0;
    if (parentGrid) {
      const siblingIndex = Array.from(parentGrid.children).indexOf(el);
      if (siblingIndex >= 0) {
        delay = Math.min((siblingIndex % 6) * 0.08, 0.48);
        el.style.transitionDelay = `${delay}s`;
      }
    }

    // If already in viewport on mount, reveal immediately with subtle stagger
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, delay * 1000 + 40);
    } else {
      scrollObserver.observe(el);
    }
  });
}

/**
 * 5. MASTER MOTION INITIALIZER
 * Safe, reliable, non-blocking initializer.
 */
export function initMotionSystem() {
  if (typeof window === 'undefined') return () => {};

  initHeroAnimation();
  initCardTilt();
  initMagneticButtons();
  initScrollTriggers();

  return () => {
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
  };
}

export default initMotionSystem;
