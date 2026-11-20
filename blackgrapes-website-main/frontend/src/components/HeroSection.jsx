
import React from 'react';
import { COMPANY_INFO } from '../data/siteData';
import { useHomePage } from '@backend/useContent';
import { resolveMediaUrl } from '@backend/dataService';
import AnimatedCounter from './AnimatedCounter';

export default function HeroSection({ onOpenModal }) {
  const { home } = useHomePage();
  const hero = home?.hero || {};
  const rawImage = hero.image || hero.badge_image || hero.hero_image || '';
  const heroImage = rawImage ? resolveMediaUrl(rawImage) : '';

  const badgeText = hero.badge || '10+ Years of Proven IT Excellence • Indore, India';
  const prefix = hero.prefix || 'INNOVATE. INTEGRATE. ELEVATE.';
  const brandHighlight = hero.brand_highlight || 'BLACK GRAPES SOFTECH';

  // Cleanly handle SS1 layout
  const rawBreakText = (hero.break_text || hero.title || 'And Digitalize Your Ideas into Success via').trim();
  const rawSuffix = (hero.suffix || 'Where Innovation And ideas Meets Excellence.').trim().replace(/^,\s*/, '');

  let titleLine1 = hero.title_line1 || 'And Digitalize Your Ideas';
  let breakText = 'into Success via';
  if (rawBreakText.toLowerCase().includes('into success via')) {
    const parts = rawBreakText.split(/into\s+success\s+via/i);
    titleLine1 = parts[0]?.trim() || 'And Digitalize Your Ideas';
    breakText = 'into Success via';
  } else if (!hero.title_line1 && rawBreakText) {
    titleLine1 = rawBreakText;
    breakText = '';
  }

  let suffixInline = hero.suffix_inline || 'Where Innovation';
  let suffix = 'And ideas Meets Excellence.';
  if (rawSuffix.toLowerCase().includes('where innovation')) {
    suffixInline = 'Where Innovation';
    const rest = rawSuffix.replace(/.*?where\s+innovation\s*/i, '').trim();
    suffix = rest || 'And ideas Meets Excellence.';
  } else if (!hero.suffix_inline && rawSuffix) {
    suffix = rawSuffix;
    suffixInline = '';
  }

  // If hero.headline happens to be the old generic placeholder, ignore it
  const isOldGenericHeadline = hero.headline && hero.headline.includes('Engineering Scalable Software');
  const customHeadline = (!isOldGenericHeadline && hero.headline) ? hero.headline : null;

  const description = hero.description || 'Get Free Consultation From Our Industry Experts. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.';
  const ctaPrimary = hero.cta_primary_text || 'Request a Demo';
  const ctaSecondary = hero.cta_secondary_text || 'Get the offer';

  const defaultBadges = [
    { name: 'React', category: 'Frontend' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'AI & Data' },
    { name: 'Next.js', category: 'Full Stack' },
    { name: 'iOS / Swift', category: 'Native' },
    { name: 'Android / Kotlin', category: 'Native' },
    { name: 'AWS Cloud', category: 'DevOps' },
    { name: 'Custom CRM', category: 'Enterprise' },
    { name: 'MLM Engines', category: 'FinTech' }
  ];

  const techBadges = (hero.techBadges && hero.techBadges.length > 0) ? hero.techBadges : defaultBadges;

  // Coordinate entrance animation with initial loading screen dismissal
  const [isHeroReady, setIsHeroReady] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(window.__bgstLoaded) || !document.getElementById('bgst-initial-loader');
  });

  React.useEffect(() => {
    if (isHeroReady) return;

    const handleLoaderDismissed = () => {
      // Trigger smooth entrance right as loader starts dissolving
      setTimeout(() => {
        setIsHeroReady(true);
      }, 80);
    };

    window.addEventListener('bgst:loaded', handleLoaderDismissed);

    // Guaranteed fallback timer (never remains hidden)
    const fallbackTimer = setTimeout(() => {
      setIsHeroReady(true);
    }, 1500);

    return () => {
      window.removeEventListener('bgst:loaded', handleLoaderDismissed);
      clearTimeout(fallbackTimer);
    };
  }, [isHeroReady]);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Headline & Action CTAs */}
        <div className={`hero-content ${isHeroReady ? 'hero-content-entrance' : 'hero-content-waiting'} is-revealed`}>
          <div className="hero-badge-pill reveal-fade-down is-revealed">
            <span className="badge-glow-dot"></span>
            <span className="badge-text">{badgeText}</span>
          </div>

          <h1 className="hero-title reveal-fade-up is-revealed stagger-1">
            {customHeadline ? (
              <span className="hero-headline-shimmer">{customHeadline}</span>
            ) : (
              <>
                <span className="hero-prefix">{prefix}</span>
                <span className="hero-break">{titleLine1}</span>
                <span className="hero-title-flow">
                  {breakText ? `${breakText} ` : ''}
                  <span className="hero-gradient-brand">{brandHighlight}</span>
                  {suffixInline ? ` ${suffixInline}` : ''}
                </span>
                {suffix && <span className="hero-suffix">{suffix}</span>}
              </>
            )}
          </h1>

          <p className="hero-description reveal-fade-up is-revealed stagger-2">
            {description}
          </p>

          <div className="hero-cta-group reveal-fade-up is-revealed stagger-3">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-premium-action"
              onClick={() => onOpenModal(ctaPrimary)}
            >
              <span className="btn-icon">⚡</span>
              <span>{ctaPrimary}</span>
            </button>

            {ctaSecondary === 'Get the offer' ? (
              <button
                type="button"
                className="btn btn-outline btn-lg btn-premium-action"
                onClick={() => onOpenModal(ctaSecondary)}
              >
                <span>{ctaSecondary}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            ) : (
              <a
                href="#services"
                className="btn btn-outline btn-lg btn-premium-action"
              >
                <span>{ctaSecondary}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div key={isHeroReady ? 'hero-metrics-ready' : 'hero-metrics-waiting'} className="hero-metrics-grid reveal-fade-up is-revealed stagger-4">
            <div className="hero-metric-item">
              <span className="metric-number">
                <AnimatedCounter target={10} duration={1600} suffix="+" />
              </span>
              <span className="metric-label">Years Innovation</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">
                <AnimatedCounter target={150} duration={1800} suffix="+" />
              </span>
              <span className="metric-label">Global Clients</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">
                <AnimatedCounter target={250} duration={2000} suffix="+" />
              </span>
              <span className="metric-label">Projects Deployed</span>
            </div>
            <div className="hero-metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-number">
                <AnimatedCounter target={99} duration={1800} suffix="%" />
              </span>
              <span className="metric-label">Retention Rate</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Tech Showcase Card / Custom Hero Visual */}
        <div className={`hero-visual ${isHeroReady ? 'hero-visual-entrance' : 'hero-visual-waiting'}`}>
          <div className="hero-glass-card hero-glass-card-floating">
            {/* Card Header with Mock Window Controls */}
            <div className="glass-card-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                {heroImage ? 'Featured Architecture' : 'FullStackApp.tsx'}
              </span>
            </div>

            {/* Showcase Card Content */}
            <div className="glass-card-body" style={heroImage ? { padding: 0 } : {}}>
              {heroImage ? (
                <div style={{ position: 'relative', width: '100%', minHeight: '360px', maxHeight: '420px', overflow: 'hidden' }}>
                  <img
                    src={heroImage}
                    alt="Black Grapes Softech"
                    style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.3) 50%, transparent 100%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1rem', display: 'block' }}>Black Grapes Softech</strong>
                      <span style={{ color: '#f86200', fontSize: '0.78rem', fontWeight: 600 }}>Enterprise Software & IT Solutions</span>
                    </div>
                    <span style={{
                      background: 'rgba(248, 98, 0, 0.2)',
                      border: '1px solid rgba(248, 98, 0, 0.4)',
                      color: '#f86200',
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}>
                      LIVE
                    </span>
                  </div>
                </div>
              ) : (
                <div className="tab-pane">
                  <div className="code-header">
                    <span className="code-lang">FullStackApp.tsx</span>
                    <span className="code-status">
                      <span className="live-ping-dot"></span>
                      <span>Live Production</span>
                    </span>
                  </div>
                  <pre className="code-block">
                    <code>{`// Modern React + Cloud Integration
import { BlackGrapesSoftech } from '@bgst/core';

export const EnterprisePortal = () => {
  const { deploy, performance } = BlackGrapesSoftech({
    speedScore: 99,
    securityShield: 'Active',
    uptime: '99.98%'
  });

  return <DigitalTransformation success={true} />;
};`}</code>
                  </pre>

                  <div className="card-kpis">
                    <div className="kpi-box">
                      <span className="kpi-val">
                        <AnimatedCounter target={99} duration={1600} suffix=" / 100" />
                      </span>
                      <span className="kpi-label">Lighthouse Score</span>
                    </div>
                    <div className="kpi-box">
                      <span className="kpi-val">&lt; 0.6s</span>
                      <span className="kpi-label">Load Time</span>
                    </div>
                    <div className="kpi-box">
                      <span className="kpi-val">
                        <AnimatedCounter target={100} duration={1600} suffix="%" />
                      </span>
                      <span className="kpi-label">Responsive</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Badge */}
          <div key={isHeroReady ? 'hero-badge-ready' : 'hero-badge-waiting'} className="floating-badge badge-bottom-left">
            <span className="floating-icon">🚀</span>
            <div className="floating-text">
              <strong>
                <AnimatedCounter target={100} duration={1800} suffix="+ Clients" />
              </strong>
              <span>Global Deliveries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee Strip */}
      <div className="tech-marquee-wrapper">
        <div className="marquee-label-container">
          <div className="marquee-label-pill">
            <span className="marquee-dot"></span>
            <span className="marquee-label">Core Tech Stack</span>
          </div>
        </div>
        <div className="marquee-track-container">
          <div className="marquee-track">
            {[...techBadges, ...techBadges, ...techBadges, ...techBadges].map((item, idx) => (
              <div key={idx} className="marquee-item">
                <span className="marquee-tech-name">{item.name}</span>
                <span className="marquee-category">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
