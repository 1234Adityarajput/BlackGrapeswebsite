import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  ArrowRight,
  Globe,
  Star
} from 'lucide-react';
import {
  CLIENT_CATEGORIES,
  CLIENT_METRICS,
  CLIENTS_LIST
} from './clientsData';
import { useClients, useClientsPage, useTestimonials } from '@backend/useContent';
import ClientCaseStudyModal from './ClientCaseStudyModal';
import clientsNetworkImg from '../../assets/clients-network.jpg';
import './OurClients.css';

export default function OurClients({ onOpenDemoModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);

  const { clients } = useClients();
  const { clientsPageData } = useClientsPage();
  const { testimonials } = useTestimonials();

  const testimonialsList = useMemo(() => {
    const list = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : [];
    return list.map((t) => ({
      ...t,
      name: t.name || t.author || 'Verified Client',
      role: t.role || t.designation || 'Client Leader',
      company: t.company || '',
      country: t.country || '',
      quote: t.quote || '',
      rating: typeof t.rating === 'number' ? t.rating : 5
    }));
  }, [testimonials]);

  const clientsList = useMemo(() => {
    return (Array.isArray(clients) && clients.length > 0)
      ? clients
      : CLIENTS_LIST;
  }, [clients]);

  const metricsList = useMemo(() => {
    return (Array.isArray(clientsPageData?.metrics) && clientsPageData.metrics.length > 0)
      ? clientsPageData.metrics
      : CLIENT_METRICS;
  }, [clientsPageData]);

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return clientsList.filter((client) => {
      const cCat = (client.category || '').toLowerCase().trim();
      const matchesCat =
        activeCategory === 'all' ||
        cCat === activeCategory ||
        (activeCategory === 'ai-tech' && (cCat === 'ai' || cCat === 'ai-tech')) ||
        (activeCategory === 'it-partners' && (cCat === 'it-partners' || cCat === 'partners'));

      const q = searchQuery.toLowerCase().trim();
      const name = client.name || '';
      const industry = client.industry || '';
      const region = client.region || '';
      const services = client.services || '';

      const matchesSearch =
        !q ||
        name.toLowerCase().includes(q) ||
        industry.toLowerCase().includes(q) ||
        region.toLowerCase().includes(q) ||
        services.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [clientsList, activeCategory, searchQuery]);

  return (
    <div className="clients-page">
      {/* ========================================================
          1. HERO SECTION: Global Reach & Corporate Prestige
          ======================================================== */}
      <section className="clients-hero-section">
        <div className="clients-glow-blob glow-orange-left"></div>
        <div className="clients-glow-blob glow-purple-right"></div>

        <div className="container clients-hero-grid">
          <div className="clients-hero-content">
            <div className="hero-eyebrow-pill">
              <Sparkles size={14} />
              <span>{clientsPageData?.heroBadge || 'TRUSTED BY 150+ GLOBAL ENTERPRISES'}</span>
            </div>

            <h1 className="clients-hero-title">
              {clientsPageData?.heroTitle || 'Our Clients:'} <br />
              <span className="text-gradient">
                {clientsPageData?.heroTitleAccent || 'Powering Leaders Across 15+ Nations'}
              </span>
            </h1>

            <p className="clients-hero-desc">
              {clientsPageData?.heroSubtitle ||
                'At Black Grapes Softech, we take pride in our diverse and dynamic client portfolio. Our clients span various industries including finance, healthcare, e-commerce, education, and technology. We partner with both high-velocity startups and Fortune 500 enterprises to deliver innovative software solutions tailored to their unique needs.'}
            </p>

            {/* Metrics Counter Strip */}
            <div className="clients-metrics-row">
              {metricsList.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="metric-num text-gradient">{metric.number}</span>
                  <span className="metric-sub">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="clients-hero-actions">
              <button
                onClick={onOpenDemoModal}
                className="btn btn-primary btn-pulse-glow"
              >
                <span>{clientsPageData?.primaryBtnText || 'Partner With Us'}</span>
                <ArrowRight size={18} />
              </button>

              <a href="#portfolio" className="btn btn-secondary">
                <span>{clientsPageData?.secondaryBtnText || 'Explore Client Brands'} ({clientsList.length})</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Display */}
          <div className="clients-hero-visual">
            <div className="clients-visual-frame">
              <img
                src={clientsPageData?.heroImage || clientsNetworkImg}
                alt="Black Grapes Softech Global Client Footprint"
                className="clients-network-img"
              />
              <div className="floating-partners-badge">
                <div className="badge-inner-flex">
                  <span className="badge-live-pulse"></span>
                  <div>
                    <div className="badge-text-title">
                      {clientsPageData?.floatingTitle || 'Active Global Deployments'}
                    </div>
                    <div className="badge-text-sub">
                      {clientsPageData?.floatingSubtitle || 'US • UK • Japan • EU • UAE • India'}
                    </div>
                  </div>
                </div>
                <span className="badge-tag-pill">
                  {clientsPageData?.floatingBadge || '99% RETENTION'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. FILTER & REAL-TIME SEARCH BAR (STICKY)
          ======================================================== */}
      <section id="portfolio" className="clients-controls-bar">
        <div className="container controls-flex-wrap">
          <div className="clients-search-row">
            {/* Search Input */}
            <div className="client-search-field">
              <Search size={18} className="search-field-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients by name, sector, or country (e.g. Mastercard, AI, Japan, Cloud)..."
                className="client-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-client-search"
                  aria-label="Clear client search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Counter */}
            <div className="clients-count-pill">
              <span>Showing:</span>
              <span className="count-highlight">{filteredClients.length}</span>
              <span>of {clientsList.length} Clients</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="client-category-tabs">
            {CLIENT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? clientsList.length
                  : clientsList.filter((c) => {
                      const cCat = (c.category || '').toLowerCase().trim();
                      return (
                        cCat === cat.id ||
                        (cat.id === 'ai-tech' && (cCat === 'ai' || cCat === 'ai-tech')) ||
                        (cat.id === 'it-partners' && (cCat === 'it-partners' || cCat === 'partners'))
                      );
                    }).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="category-count-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPREHENSIVE CLIENTS LOGO WALL GRID
          ======================================================== */}
      <section className="clients-grid-section">
        <div className="container">
          {filteredClients.length === 0 ? (
            <div className="clients-empty-state">
              <h3 className="section-title-large">No clients found matching "{searchQuery}"</h3>
              <p className="section-desc-lead">
                Try searching for general keywords like "Enterprise", "Fintech", "Japan", or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="btn btn-primary mt-4"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="clients-portfolio-grid">
              {filteredClients.map((client) => (
                <article
                  key={client.id || client.name}
                  className="client-card"
                  onClick={() => setSelectedClient(client)}
                  title={`View case study and engagement details for ${client.name}`}
                >
                  {/* Clean Logo Frame */}
                  <div className="client-logo-frame">
                    <img
                      src={client.logo || client.logo_url}
                      alt={`${client.name} Logo`}
                      className="client-brand-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Meta Badges */}
                  <div className="client-card-meta-row">
                    <span className={`client-type-badge badge-${client.badgeColor || client.badge_color || 'orange'}`}>
                      {client.badge || 'Verified Partner'}
                    </span>
                    <span className="client-region-tag">
                      <Globe size={11} /> {client.region || 'Global'}
                    </span>
                  </div>

                  <h3 className="client-company-title">{client.name}</h3>
                  <div className="client-industry-label">{client.industry}</div>
                  <p className="client-service-summary">{client.services}</p>

                  <div className="client-card-action-row">
                    <span>View Case Scope</span>
                    <ArrowRight size={15} className="card-action-arrow" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. AUTHENTIC CLIENT REVIEWS & TESTIMONIALS
          ======================================================== */}
      {testimonialsList.length > 0 && (
        <section id="client-testimonials" className="testimonials-section">
          <div className="container">
            <div className="text-center" style={{ marginBottom: '2.5rem' }}>
              <div className="hero-eyebrow-pill" style={{ margin: '0 auto 1rem' }}>
                <Sparkles size={14} />
                <span>AUTHENTIC CLIENT REVIEWS</span>
              </div>
              <h2 className="section-title-large">
                What Global Leaders <span className="text-gradient">Say About Our Work</span>
              </h2>
              <p className="section-desc-lead" style={{ margin: '0 auto', maxWidth: '640px' }}>
                Direct feedback from founders, VP of Engineering, and business directors across 15+ nations.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonialsList.map((t, idx) => (
                <article key={t.id || idx} className="testimonial-quote-card">
                  <div className="rating-stars-row">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>

                  <p className="testimonial-quote-text">
                    "{t.quote}"
                  </p>

                  <div className="testimonial-author-block">
                    <div className="author-info-col">
                      <h4>{t.name}</h4>
                      <p>{t.role}{t.company ? ` • ${t.company}` : ''}</p>
                    </div>
                    {t.country && (
                      <span className="author-country-badge">{t.country}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          8. CLIENT CASE STUDY POPUP MODAL
          ======================================================== */}
      {selectedClient && (
        <ClientCaseStudyModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onOpenDemoModal={onOpenDemoModal}
        />
      )}
    </div>
  );
}
