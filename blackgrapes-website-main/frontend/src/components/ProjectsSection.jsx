import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHomePage } from '@backend/useContent';
import { PROJECTS as FALLBACK_PROJECTS } from '../data/siteData';

// Fallback visual mockups for each project
const getProjectImage = (proj, index) => {
  if (proj.image) return proj.image;
  const projectImages = [
    '/images/Website-Designing.jpg',
    '/images/products-hero.jpg',
    '/images/austin-distel-fEedoypsW_U-unsplash-qgntl74b15340mw95449eg068ty9af2yamf46cr91c.jpg',
    '/images/app.jpg',
    '/images/Software.jpg',
    '/images/Graphic-Design-Black-Grapes-Softech.jpg',
    '/images/headway-5QgIuuBxKwM-unsplash.jpg',
    '/images/products-devices.jpg',
    '/images/workspace.jpg',
    '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg',
    '/images/tech-innovation.jpg',
    '/images/Game-Development.jpg'
  ];
  return projectImages[index % projectImages.length];
};

// SS1-style views / impact metrics (e.g. VIEWS 5.4M)
const getProjectViews = (proj, index) => {
  if (proj.views) return proj.views;
  const viewsList = [
    'VIEWS 1.2M',
    'VIEWS 3.8M',
    'USERS 85K',
    'DOWNLOADS 120K',
    'DAILY 45K',
    'USERS 95K',
    'USERS 250K',
    'ORDERS 500K+',
    'VIEWS 4.2M',
    'USERS 350K',
    'VIEWS 8.9M',
    'USERS 1.5M'
  ];
  return viewsList[index % viewsList.length];
};

// SS1-style top pill tag (e.g. YOUTUBE SHORT)
const getProjectBadge = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('commerce')) return '🛒 D2C E-COMMERCE';
  if (cat.includes('app') || cat.includes('ios') || cat.includes('android')) return '📱 MOBILE APP';
  if (cat.includes('web app')) return '⚡ ENTERPRISE SAAS';
  return '🌐 LIVE PRODUCTION';
};

// Clean handle display (@borit.com)
const getProjectHandle = (name) => {
  if (!name) return '@project';
  const clean = name.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/^IOS App - /, '').replace(/^Android App - /, '');
  return `@${clean.toLowerCase().split(' ')[0]}`;
};

export default function ProjectsSection({ onOpenModal }) {
  const { home } = useHomePage();
  const ps = home?.projectsSection || {};

  const projectList = (Array.isArray(ps.projects) && ps.projects.length > 0)
    ? ps.projects
    : FALLBACK_PROJECTS;

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(projectList.map((p) => p.category).filter(Boolean))
  );
  const categories = ['All', ...uniqueCategories];

  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('motion'); // 'motion' (SS1 layout) or 'grid'
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredProjects = activeFilter === 'All'
    ? projectList
    : projectList.filter((p) => p.category === activeFilter);

  const total = filteredProjects.length;

  // Clamp activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gentle auto-play
  useEffect(() => {
    if (viewMode !== 'motion' || isHovered || total <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [viewMode, isHovered, total, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // 3D positioning calculation for SS1 reel showcase
  const getCardStyle = (index) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // ACTIVE CENTER CARD (SS1 Focus)
    if (diff === 0) {
      return {
        transform: 'translateX(0%) translateZ(90px) rotateY(0deg) scale(1)',
        zIndex: 25,
        opacity: 1,
        filter: 'none',
        pointerEvents: 'auto',
        cursor: 'default'
      };
    }

    // IMMEDIATE LEFT (1 step left)
    if (diff === -1) {
      return {
        transform: isMobile
          ? 'translateX(-50%) translateZ(-40px) rotateY(18deg) scale(0.82)'
          : 'translateX(-64%) translateZ(-45px) rotateY(24deg) scale(0.86)',
        zIndex: 18,
        opacity: isMobile ? 0.45 : 0.68,
        filter: 'brightness(0.7) blur(0.4px)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }

    // IMMEDIATE RIGHT (1 step right)
    if (diff === 1) {
      return {
        transform: isMobile
          ? 'translateX(50%) translateZ(-40px) rotateY(-18deg) scale(0.82)'
          : 'translateX(64%) translateZ(-45px) rotateY(-24deg) scale(0.86)',
        zIndex: 18,
        opacity: isMobile ? 0.45 : 0.68,
        filter: 'brightness(0.7) blur(0.4px)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }

    // OUTER LEFT (2 steps left)
    if (diff === -2) {
      return {
        transform: isMobile
          ? 'translateX(-90%) translateZ(-140px) rotateY(32deg) scale(0.6)'
          : 'translateX(-114%) translateZ(-115px) rotateY(36deg) scale(0.72)',
        zIndex: 10,
        opacity: isMobile ? 0 : 0.35,
        filter: 'brightness(0.45) blur(1.5px)',
        pointerEvents: isMobile ? 'none' : 'auto',
        cursor: 'pointer'
      };
    }

    // OUTER RIGHT (2 steps right)
    if (diff === 2) {
      return {
        transform: isMobile
          ? 'translateX(90%) translateZ(-140px) rotateY(-32deg) scale(0.6)'
          : 'translateX(114%) translateZ(-115px) rotateY(-36deg) scale(0.72)',
        zIndex: 10,
        opacity: isMobile ? 0 : 0.35,
        filter: 'brightness(0.45) blur(1.5px)',
        pointerEvents: isMobile ? 'none' : 'auto',
        cursor: 'pointer'
      };
    }

    // HIDDEN CARDS
    return {
      transform: `translateX(${diff > 0 ? 145 : -145}%) translateZ(-220px) scale(0.45)`,
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none'
    };
  };

  const bottomCtaText = ps.bottomCta?.text || "Have a project in mind? Let's turn your concept into our next featured success story.";
  const bottomCtaBtn = ps.bottomCta?.btnText || "Start Your Project With Us";

  return (
    <section id="projects" className="projects-motion-section" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="container" style={{ maxWidth: '1350px' }}>
        {/* Header Row (SS1 Match: Left Elegant Serif Title & Right Stats Badge) */}
        <div className="motion-header-row">
          <div className="motion-header-left">
            <h2 className="motion-serif-title">
              Craft<span className="motion-serif-italic">In Motion</span>
            </h2>
            <p className="motion-header-subtitle">
              Explore our production deployments, mobile applications, and high-performance client platforms.
            </p>
          </div>

          {/* SS1 Right Views Pill Badge */}
          <div className="motion-views-badge">
            <span className="views-pulse-dot" />
            <span>DELIVERIES 250+ LIVE APPS</span>
          </div>
        </div>

        {/* Category Filter Tabs with Counts */}
        <div className="motion-filter-tabs">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? projectList.length
              : projectList.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                className={`motion-tab-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                <span>{cat}</span>
                <span className="motion-tab-count">{count}</span>
              </button>
            );
          })}

          {/* View Switcher Toggle */}
          <button
            type="button"
            className="motion-tab-btn"
            style={{ marginLeft: '0.75rem', borderColor: 'rgba(248, 98, 0, 0.4)' }}
            onClick={() => setViewMode(viewMode === 'motion' ? 'grid' : 'motion')}
          >
            <span>{viewMode === 'motion' ? 'Switch to Grid View' : 'Switch to 3D Motion'}</span>
          </button>
        </div>

        {/* ============================================================
            LAYOUT 1: 3D REEL SHOWCASE (SS1 TECHMASTERCO.COM MATCH)
            ============================================================ */}
        {viewMode === 'motion' && (
          <div
            className="motion-stage-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* SS1 Left & Right Theater Edge Vignettes */}
            <div className="motion-edge-vignette left" aria-hidden="true" />
            <div className="motion-edge-vignette right" aria-hidden="true" />

            {/* Left Circular Arrow */}
            <button
              type="button"
              className="motion-nav-arrow arrow-left"
              onClick={handlePrev}
              aria-label="Previous Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Right Circular Arrow */}
            <button
              type="button"
              className="motion-nav-arrow arrow-right"
              onClick={handleNext}
              aria-label="Next Project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 3D Motion Stage */}
            <div className="motion-stage">
              {filteredProjects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                const style = getCardStyle(idx);
                const image = getProjectImage(proj, idx);
                const views = getProjectViews(proj, idx);
                const badgeText = getProjectBadge(proj.category);
                const handle = getProjectHandle(proj.name);

                return (
                  <article
                    key={proj.name || idx}
                    className={`motion-card ${isActive ? 'is-active' : ''}`}
                    style={style}
                    onClick={() => {
                      if (!isActive) setActiveIndex(idx);
                    }}
                    role="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={proj.name}
                  >
                    {/* Background Visual Image */}
                    <div className="motion-card-img-wrap">
                      <img
                        src={image}
                        alt={proj.name}
                        className="motion-card-img"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg';
                        }}
                      />
                      <div className="motion-card-overlay" />
                    </div>

                    {/* SS1 Top Badge with glowing indicator */}
                    <div className="motion-top-badge">
                      <span className="motion-badge-dot" />
                      <span>{badgeText}</span>
                    </div>

                    {/* SS1 Bottom Information & Handle */}
                    <div className="motion-card-bottom">
                      <div>
                        <h3 className="motion-card-handle">{proj.name}</h3>
                        <p className="motion-card-type">{proj.desc || proj.type}</p>
                      </div>

                      <div className="motion-action-row">
                        {proj.url && proj.url !== '#' ? (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="motion-visit-pill-btn"
                            onClick={(e) => {
                              if (!isActive) {
                                e.preventDefault();
                                setActiveIndex(idx);
                              }
                            }}
                          >
                            <span>Live Site</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="motion-case-info-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onOpenModal) {
                                onOpenModal(`Project Case: ${proj.name}`);
                              }
                            }}
                          >
                            View Case Info ↗
                          </button>
                        )}

                        {/* SS1 Bottom Right Views Tag */}
                        <div className="motion-card-views-tag">
                          <span>{views}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="motion-pagination">
              {filteredProjects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`motion-dot ${dotIdx === activeIndex ? 'dot-active' : ''}`}
                  onClick={() => setActiveIndex(dotIdx)}
                  aria-label={`Go to project ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            LAYOUT 2: CLASSIC GRID VIEW (ALTERNATIVE VIEW)
            ============================================================ */}
        {viewMode === 'grid' && (
          <div className="projects-grid" style={{ marginTop: '2rem' }}>
            {filteredProjects.map((proj, idx) => (
              <div key={idx} className="project-card">
                <div className="project-card-top">
                  <span className="project-category-badge">{proj.category}</span>
                  <span className="project-status-dot">{proj.status || 'Live Production'}</span>
                </div>

                <div className="project-card-body">
                  <span className="project-type-tag">{proj.type}</span>
                  <h3 className="project-name">{proj.name}</h3>
                  <p className="project-desc">{proj.desc}</p>
                </div>

                <div className="project-card-footer">
                  {proj.url && proj.url !== '#' ? (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-visit-link"
                    >
                      <span>Visit Live Site</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="project-case-btn"
                      onClick={() => onOpenModal && onOpenModal(`Project Case: ${proj.name}`)}
                    >
                      <span>View Case Info</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Portfolio Bottom CTA Banner */}
        <div className="portfolio-bottom-cta">
          <p className="portfolio-cta-text">{bottomCtaText}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenModal && onOpenModal('New Project Inquiry')}
          >
            {bottomCtaBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
