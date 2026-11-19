import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  ExternalLink, 
  ArrowRight, 
  Globe, 
  Smartphone, 
  ShoppingBag, 
  Code2, 
  CheckCircle2 
} from 'lucide-react';
import { useHomePage } from '@backend/useContent';
import { PROJECTS as FALLBACK_PROJECTS } from '../data/siteData';
import '../styles/CyberServices.css';

// Project imagery mapping for rich presentation
const PROJECT_IMAGES = {
  'www.borit.com': '/images/Website-Designing.jpg',
  'blushandbloom.co.in': '/ecommerce/new-products.jpg',
  'atonfitness.in': '/images/Software.jpg',
  'IOS App - ReadMore': '/images/app.jpg',
  'IOS App - DBT 24/7': '/softech-services/app.jpg',
  'IOS App - Beauty Counter': '/images/app.jpg',
  'Android App - Eduvacancy - Teaching Jobs': '/softech-services/app.jpg',
  'Android App - HoneyliaEmart': '/ecommerce/used-products.jpg',
  'www.jobberman.com': '/images/Website-Designing.jpg',
  'Stavanger Parkering': '/images/Software.jpg',
  'Deliotte': '/images/software-development-qgntl744xv0yqgpkq1174ayad7qp2f62p90f8mobkw.jpeg',
  'Pikto Security': '/images/Security-1.jpg'
};

export default function ProjectsPage({ onOpenModal }) {
  const { home } = useHomePage();
  const ps = home?.projectsSection || {};
  
  const rawList = (Array.isArray(ps.projects) && ps.projects.length > 0)
    ? ps.projects
    : FALLBACK_PROJECTS;

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = new Set(rawList.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [rawList]);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return rawList.filter(proj => {
      const matchesCat = activeCategory === 'All' || proj.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        proj.name.toLowerCase().includes(q) || 
        (proj.type && proj.type.toLowerCase().includes(q)) || 
        (proj.desc && proj.desc.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [rawList, activeCategory, searchQuery]);

  return (
    <div className="portfolio-page-root">
      {/* 1. HERO BANNER */}
      <section className="portfolio-hero-section">
        <div className="ambient-glow glow-top-left" aria-hidden="true"></div>
        <div className="ambient-glow glow-mid-right" aria-hidden="true"></div>
        
        <div className="container text-center">
          <div className="hero-eyebrow-pill" style={{ margin: '0 auto 1.25rem' }}>
            <Sparkles size={14} />
            <span>PORTFOLIO SHOWCASE • PROVEN DELIVERIES</span>
          </div>

          <h1 className="portfolio-hero-title">
            Our Featured <span className="text-highlight">Projects & Case Studies</span>
          </h1>

          <p className="portfolio-hero-subtitle">
            Explore authentic digital solutions delivered for startups and enterprises across web, mobile, and custom cloud architectures.
          </p>

          <div className="portfolio-metrics-strip">
            <div className="p-metric-card">
              <span className="p-metric-num text-highlight">250+</span>
              <span className="p-metric-sub">Completed Deployments</span>
            </div>
            <div className="p-metric-divider"></div>
            <div className="p-metric-card">
              <span className="p-metric-num text-highlight">99%</span>
              <span className="p-metric-sub">Client Retention</span>
            </div>
            <div className="p-metric-divider"></div>
            <div className="p-metric-card">
              <span className="p-metric-num text-highlight">15+</span>
              <span className="p-metric-sub">Countries Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTROLS BAR: SEARCH & FILTER TABS */}
      <section className="portfolio-controls-bar">
        <div className="container">
          <div className="portfolio-controls-flex">
            {/* Search Input */}
            <div className="portfolio-search-box">
              <Search size={18} className="p-search-icon" />
              <input
                type="text"
                placeholder="Search projects by name, platform, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-search-clear"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="portfolio-filter-track">
              {categories.map(cat => {
                const count = cat === 'All'
                  ? rawList.length
                  : rawList.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={`portfolio-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span>{cat}</span>
                    <span className="portfolio-pill-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS GRID */}
      <section className="portfolio-grid-section">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="portfolio-empty-state">
              <Code2 size={48} className="empty-state-icon" />
              <h3 className="empty-state-title">No projects found matching "{searchQuery}"</h3>
              <p className="empty-state-desc">Try clearing your search terms or selecting another category.</p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="portfolio-cards-grid">
              {filteredProjects.map((proj, idx) => {
                const imageSrc = PROJECT_IMAGES[proj.name] || '/images/Website-Designing.jpg';
                return (
                  <article key={idx} className="project-showcase-card">
                    {/* Visual Header */}
                    <div className="project-card-visual">
                      <img
                        src={imageSrc}
                        alt={proj.name}
                        className="project-card-image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = '/images/Software.jpg';
                        }}
                      />
                      <div className="project-card-overlay"></div>
                      <div className="project-card-badge-row">
                        <span className="project-cat-pill">{proj.category}</span>
                        <span className="project-status-pill">
                          <span className="status-dot"></span>
                          <span>{proj.status || 'Live Production'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="project-card-body">
                      <div className="project-type-tag">{proj.type || 'Custom Digital Solution'}</div>
                      <h3 className="project-title">{proj.name}</h3>
                      <p className="project-desc">{proj.desc}</p>
                    </div>

                    {/* Card Action Footer */}
                    <div className="project-card-footer">
                      {proj.url && proj.url !== '#' ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-visit-site"
                        >
                          <span>Visit Live Site</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="private-portal-tag">Enterprise Client Deployment</span>
                      )}

                      <button
                        type="button"
                        className="btn-similar-inquire"
                        onClick={() => onOpenModal && onOpenModal(`Build Similar to: ${proj.name}`)}
                      >
                        <span>Build Similar</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="portfolio-cta-section">
        <div className="container">
          <div className="portfolio-cta-card">
            <span className="cta-badge">HAVE A PROJECT IN MIND?</span>
            <h2 className="cta-title">Let's Turn Your Concept into Our Next Success Story.</h2>
            <p className="cta-subtitle">
              From MVP to multi-million user scale, our senior architects are ready to engineer your software with unmatched precision.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => onOpenModal && onOpenModal('Start Your Project')}
            >
              <span>Start Your Project With Us</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
