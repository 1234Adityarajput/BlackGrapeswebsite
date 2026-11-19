/**
 * BLACK GRAPES SOFTECH - AUTOMATED SCROLL REVEAL ENGINE
 * Automatically observes sections, headers, and cards across all pages.
 * Works seamlessly with both static and dynamic Admin Panel content.
 */

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Accessibility: Don't run animations if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll, .section-header, .section').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const observeElements = () => {
    const selector = [
      '.section',
      '.section-header',
      '.hero-content',
      '.hero-visual',
      '.service-card',
      '.project-card',
      '.process-step-card',
      '.why-us-capsule-card',
      '.counter-card',
      '.testimonial-card',
      '.industry-card',
      '.stat-strip-card',
      '.vm-card',
      '.founder-card',
      '.value-card',
      '.domain-card',
      '.timeline-card',
      '.product-card',
      '.client-logo-card',
      '.client-case-card',
      '.staffing-model-card',
      '.talent-card',
      '.hiring-step-card',
      '.ecommerce-feature-card',
      '.contact-info-card',
      '.partner-tier-card',
      '.tendering-callout-card',
      '.cta-banner-box'
    ].join(', ');

    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      if (!el.classList.contains('reveal-init') && !el.classList.contains('is-revealed')) {
        el.classList.add('reveal-init');
        // Add subtle staggered delays to cards inside grids
        const parentGrid = el.closest('.grid, .cards-grid, [class*="-grid"], [class*="-layout"]');
        if (parentGrid) {
          const siblingIndex = Array.from(parentGrid.children).indexOf(el);
          if (siblingIndex >= 0) {
            const delay = Math.min((siblingIndex % 6) * 0.08, 0.48);
            el.style.transitionDelay = `${delay}s`;
          }
        }
        observer.observe(el);
      }
    });
  };

  // Initial observation
  observeElements();

  // Watch for dynamic route transitions and Admin-updated DOM mutations
  const mutationObserver = new MutationObserver(() => {
    observeElements();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
  };
}

export default initScrollAnimations;
