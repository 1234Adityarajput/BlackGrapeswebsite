import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useHomePage } from '@backend/useContent';
import { SERVICES as FALLBACK_SERVICES } from '../data/siteData';

// Map service id to clean canonical route slug
const getServiceSlug = (id) => {
  if (!id) return 'software-development';
  if (id === 'website-development') return 'web-development';
  if (id === 'mobile-app') return 'mobile-app-development';
  return id;
};

// Eyebrow category tag matching SS2 style
const getServiceCategory = (service, index) => {
  if (service.category) return service.category;
  const categories = [
    'WEB ENGINEERING & CLOUD CMS',
    'MOBILE APP & CROSS-PLATFORM',
    'ENTERPRISE SOFTWARE & ARCHITECTURE',
    'CRM & AUTOMATION WORKFLOWS',
    'MLM & SECURE DIGITAL WALLETS',
    'DATA-BACKED DIGITAL MARKETING',
    'UI/UX & CREATIVE BRAND IDENTITY',
    'INTERACTIVE 2D/3D GAME ENGINES'
  ];
  return categories[index % categories.length];
};

export default function ServicesSection({ onOpenModal }) {
  const { home } = useHomePage();
  const servicesSec = home?.servicesSection || {};

  const badge = servicesSec.badge || 'WHAT WE DO';
  const titlePrefix = servicesSec.titlePrefix !== undefined ? servicesSec.titlePrefix : 'We Provide Best Quality Services & Products At ';
  const titleHighlight = servicesSec.titleHighlight !== undefined ? servicesSec.titleHighlight : 'Affordable Price';
  const subtitle = servicesSec.subtitle || 'Explore our full spectrum of specialized IT services, custom software engineering, and high-impact digital solutions.';

  const services = (Array.isArray(servicesSec.services) && servicesSec.services.length > 0)
    ? servicesSec.services
    : FALLBACK_SERVICES;

  const total = services.length;

  // View mode: 'coverflow' (SS2 default) or 'grid' (classic SS1)
  const [viewMode, setViewMode] = useState('coverflow');
  // Active center card index in 3D coverflow (default 3: CRM / Software development)
  const [activeIndex, setActiveIndex] = useState(total > 3 ? 3 : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Resize listener for responsive 3D perspective
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gentle auto-play (pauses on hover)
  useEffect(() => {
    if (viewMode !== 'coverflow' || isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [viewMode, isHovered, handleNext]);

  // Touch swipe events
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Compute 3D Coverflow positioning style for each card
  const getCardStyle = (index) => {
    // Circular shortest distance from activeIndex
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // CENTER ACTIVE CARD (SS2 glowing focus)
    if (diff === 0) {
      return {
        transform: 'translateX(0%) translateZ(70px) rotateY(0deg) scale(1)',
        zIndex: 25,
        opacity: 1,
        filter: 'none',
        pointerEvents: 'auto',
        cursor: 'default'
      };
    }

    // IMMEDIATE LEFT CARD
    if (diff === -1) {
      return {
        transform: isMobile
          ? 'translateX(-48%) translateZ(-50px) rotateY(20deg) scale(0.82)'
          : 'translateX(-62%) translateZ(-40px) rotateY(26deg) scale(0.86)',
        zIndex: 18,
        opacity: isMobile ? 0.45 : 0.68,
        filter: 'brightness(0.72) blur(0.4px)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }

    // IMMEDIATE RIGHT CARD
    if (diff === 1) {
      return {
        transform: isMobile
          ? 'translateX(48%) translateZ(-50px) rotateY(-20deg) scale(0.82)'
          : 'translateX(62%) translateZ(-40px) rotateY(-26deg) scale(0.86)',
        zIndex: 18,
        opacity: isMobile ? 0.45 : 0.68,
        filter: 'brightness(0.72) blur(0.4px)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }

    // OUTER LEFT CARD (2 steps away)
    if (diff === -2) {
      return {
        transform: isMobile
          ? 'translateX(-95%) translateZ(-160px) rotateY(35deg) scale(0.6)'
          : 'translateX(-112%) translateZ(-120px) rotateY(38deg) scale(0.72)',
        zIndex: 10,
        opacity: isMobile ? 0 : 0.32,
        filter: 'brightness(0.45) blur(1.5px)',
        pointerEvents: isMobile ? 'none' : 'auto',
        cursor: 'pointer'
      };
    }

    // OUTER RIGHT CARD (2 steps away)
    if (diff === 2) {
      return {
        transform: isMobile
          ? 'translateX(95%) translateZ(-160px) rotateY(-35deg) scale(0.6)'
          : 'translateX(112%) translateZ(-120px) rotateY(-38deg) scale(0.72)',
        zIndex: 10,
        opacity: isMobile ? 0 : 0.32,
        filter: 'brightness(0.45) blur(1.5px)',
        pointerEvents: isMobile ? 'none' : 'auto',
        cursor: 'pointer'
      };
    }

    // FAR CARDS (hidden behind horizon)
    return {
      transform: `translateX(${diff > 0 ? 140 : -140}%) translateZ(-220px) scale(0.5)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none'
    };
  };

  const tendering = servicesSec.tendering || {};
  const tendBadge = tendering.badge || 'GOVERNMENT & PRIVATE TENDERS';
  const tendTitle = tendering.title || 'Specialized Tendering & e-Procurement Technical Services';
  const tendDesc = tendering.desc || 'Black Grapes Softech provides end-to-end technical documentation, GeM portal technical bidding, architecture compliance, and software delivery for government and corporate procurement tenders.';
  const tendPills = Array.isArray(tendering.pills) && tendering.pills.length > 0
    ? tendering.pills
    : ['✓ GeM Portal Compliance', '✓ Technical RFP Preparation', '✓ Enterprise Security Certification'];
  const tendBtnText = tendering.btnText || 'Consult Tender Experts';

  return (
    <section id="services" className="section services-section" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>{badge}</span>
          </div>
          <h2 className="section-title">
            {titlePrefix}<span className="text-highlight">{titleHighlight}</span>
          </h2>
          <p className="section-subtitle">
            {subtitle}
          </p>

          {/* View Switcher: 3D Coverflow (SS2 layout) vs Grid View */}
          <div className="coverflow-view-switcher">
            <button
              type="button"
              className={`view-switch-btn ${viewMode === 'coverflow' ? 'active' : ''}`}
              onClick={() => setViewMode('coverflow')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="18" rx="2" />
                <path d="M7 3v18M17 3v18" />
              </svg>
              <span>3D Showcase</span>
            </button>
            <button
              type="button"
              className={`view-switch-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* ============================================================
            LAYOUT 1: 3D COVERFLOW PERSPECTIVE CAROUSEL (SS2 MATCH)
            ============================================================ */}
        {viewMode === 'coverflow' && (
          <div
            className="coverflow-stage-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Center Amber Glow Aura (matching SS2 ambient lighting) */}
            <div className="coverflow-center-glow" aria-hidden="true" />

            {/* Left Circular Navigation Arrow */}
            <button
              type="button"
              className="coverflow-nav-arrow arrow-left"
              onClick={handlePrev}
              aria-label="Previous Service"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Circular Navigation Arrow */}
            <button
              type="button"
              className="coverflow-nav-arrow arrow-right"
              onClick={handleNext}
              aria-label="Next Service"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 3D Stage with Cards */}
            <div className="coverflow-stage">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                const style = getCardStyle(index);
                const tags = Array.isArray(service.tags)
                  ? service.tags
                  : (typeof service.tags === 'string'
                      ? service.tags.split(',').map((t) => t.trim()).filter(Boolean)
                      : []);
                const category = getServiceCategory(service, index);
                const slug = getServiceSlug(service.id);

                return (
                  <article
                    key={service.id || index}
                    className={`coverflow-card ${isActive ? 'is-active' : ''}`}
                    style={style}
                    onClick={() => {
                      if (!isActive) setActiveIndex(index);
                    }}
                    role="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={service.title}
                  >
                    {/* Visual Image Header */}
                    <div className="coverflow-image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="coverflow-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                        }}
                      />
                      <div className="coverflow-img-overlay" />
                      <div className="coverflow-index-tag">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Card Content Body (SS2 Typography Hierarchy) */}
                    <div className="coverflow-body">
                      <div>
                        <div className="coverflow-eyebrow">{category}</div>
                        <h3 className="coverflow-title">{service.title}</h3>
                        <p className="coverflow-desc">{service.shortDesc}</p>
                      </div>

                      {/* Feature Tags */}
                      {tags.length > 0 && (
                        <div className="coverflow-tags">
                          {tags.slice(0, 4).map((tag, tIdx) => (
                            <span key={tIdx} className="coverflow-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* SS2 High-Contrast White Pill CTA Button */}
                      <div className="coverflow-action-row">
                        <Link
                          to={`/services/${slug}`}
                          className="coverflow-pill-btn"
                          onClick={(e) => {
                            if (!isActive) {
                              e.preventDefault();
                              setActiveIndex(index);
                            }
                          }}
                        >
                          <span>Explore Service</span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.8"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </Link>

                        <button
                          type="button"
                          className="coverflow-estimate-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenModal) {
                              onOpenModal(`Quote: ${service.title}`);
                            }
                          }}
                        >
                          Get Instant Estimate
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Navigation Dots */}
            <div className="coverflow-pagination">
              {services.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`coverflow-dot ${dotIdx === activeIndex ? 'dot-active' : ''}`}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            LAYOUT 2: CLASSIC GRID VIEW (SS1)
            ============================================================ */}
        {viewMode === 'grid' && (
          <div className="services-grid" style={{ marginTop: '2rem' }}>
            {services.map((service, index) => {
              const tags = Array.isArray(service.tags)
                ? service.tags
                : (typeof service.tags === 'string'
                    ? service.tags.split(',').map((t) => t.trim()).filter(Boolean)
                    : []);
              const slug = getServiceSlug(service.id);

              return (
                <div key={service.id || index} className="service-card">
                  <div className="service-card-img-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                      }}
                    />
                    <div className="service-card-img-overlay" />
                    <div className="service-index-badge">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  <div className="service-card-content">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.shortDesc}</p>

                    <div className="service-tags-list">
                      {tags.map((tag, tIdx) => (
                        <span key={tIdx} className="service-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="service-card-actions">
                      <Link to={`/services/${slug}`} className="service-details-btn">
                        <span>Learn More</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Link>

                      <button
                        type="button"
                        className="service-quote-btn"
                        onClick={() =>
                          onOpenModal && onOpenModal(`Quote: ${service.title}`)
                        }
                      >
                        Get Estimate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tendering Callout Section */}
        <div id="tendering" className="tendering-callout-card">
          <div className="tendering-content">
            <div className="tendering-badge">{tendBadge}</div>
            <h3 className="tendering-title">{tendTitle}</h3>
            <p className="tendering-desc">{tendDesc}</p>
            <div className="tendering-pills">
              {tendPills.map((pill, pIdx) => (
                <span key={pIdx} className="tend-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className="tendering-action">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenModal && onOpenModal('Tendering Services')}
            >
              {tendBtnText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
