import React from 'react';
import { Sparkles, Layers, Handshake, ExternalLink, Plus } from 'lucide-react';
import { useBusinessPartners } from '@backend/useContent';
import {
  PRODUCT_PARTNERS_INTRO,
  PRODUCT_PARTNERS,
  SERVICE_PARTNERS_INTRO,
  SERVICE_PARTNERS
} from '../data/businessPartnersData';
import '../styles/Partnership.css';

export default function BusinessPartnersPage() {
  const { partners } = useBusinessPartners();

  const badge = partners?.badge || 'WHAT WE DO';
  const title = partners?.title || 'Our Business Partners';
  const titleAccent = partners?.titleAccent || 'Business Partners';
  const subtitle = partners?.subtitle ||
    'Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.';

  // Product Partners Section
  const productSectionTitle = (!partners?.product_intro?.sectionTitle || partners?.product_intro?.sectionTitle === 'Products Companies Tie-up')
    ? PRODUCT_PARTNERS_INTRO.sectionTitle
    : partners.product_intro.sectionTitle;

  const rawProductParas = partners?.product_intro?.paragraphs;
  const productParagraphs = (Array.isArray(rawProductParas) && rawProductParas.length > 0 && !rawProductParas[0].startsWith('Facilitating strategic alliances'))
    ? rawProductParas
    : PRODUCT_PARTNERS_INTRO.paragraphs;

  const productSubHeading = partners?.product_intro?.subHeading ||
    partners?.product_intro?.subheading ||
    PRODUCT_PARTNERS_INTRO.subHeading;

  const productList = (Array.isArray(partners?.product_partners) && partners.product_partners.length > 0)
    ? partners.product_partners
    : PRODUCT_PARTNERS;

  // Service Partners Section
  const serviceSectionTitle = (!partners?.service_intro?.sectionTitle || partners?.service_intro?.sectionTitle === 'Services Companies Tie-up')
    ? SERVICE_PARTNERS_INTRO.sectionTitle
    : partners.service_intro.sectionTitle;

  const rawServiceParas = partners?.service_intro?.paragraphs;
  const serviceParagraphs = (Array.isArray(rawServiceParas) && rawServiceParas.length > 0 && !rawServiceParas[0].startsWith('Strategic collaborations between service'))
    ? rawServiceParas
    : SERVICE_PARTNERS_INTRO.paragraphs;

  const serviceSubHeading = partners?.service_intro?.subHeading ||
    partners?.service_intro?.subheading ||
    SERVICE_PARTNERS_INTRO.subHeading;

  const serviceList = (Array.isArray(partners?.service_partners) && partners.service_partners.length > 0)
    ? partners.service_partners
    : SERVICE_PARTNERS;

  return (
    <div className="business-partners-container">
      <div className="container">
        {/* Top Header */}
        <div className="partner-page-header">
          <div className="partner-eyebrow">
            <Sparkles size={14} />
            <span>{badge}</span>
          </div>
          <h1 className="partner-page-title">
            {title.includes(titleAccent) ? (
              <>
                {title.split(titleAccent)[0]}
                <span className="text-gradient">{titleAccent}</span>
                {title.split(titleAccent)[1]}
              </>
            ) : (
              <span className="text-gradient">{title}</span>
            )}
          </h1>
          <p className="partner-page-subtitle">
            {subtitle}
          </p>
        </div>

        {/* Section 1: Products Companies Tie-up */}
        <section className="bp-section">
          <div className="bp-intro-card">
            <h2 className="bp-section-title">
              <Handshake size={24} color="#f86200" />
              <span>{productSectionTitle}</span>
            </h2>

            <div className="bp-intro-paragraphs">
              {productParagraphs.map((p, idx) => (
                <p key={idx} className="bp-intro-para">{p}</p>
              ))}
            </div>
          </div>

          <h3 className="bp-grid-subheading">
            <span>✦</span> {productSubHeading}
          </h3>

          <div className="bp-partners-grid">
            {productList.map((partner, idx) => {
              const isMore = partner.name && partner.name.toLowerCase().includes('more');
              if (isMore) {
                return (
                  <div key={partner.id || idx} className="bp-partner-card bp-more-card">
                    <div className="bp-more-icon">
                      <Plus size={26} />
                    </div>
                    <span className="bp-partner-name">&amp; More Global Platforms</span>
                  </div>
                );
              }

              return (
                <div key={partner.id || idx} className="bp-partner-card">
                  <div className="bp-logo-wrap">
                    <img
                      src={partner.localImg || partner.img}
                      alt={`${partner.name} logo`}
                      className="bp-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent && !parent.querySelector('.bp-fallback-initial')) {
                          const span = document.createElement('span');
                          span.className = 'bp-fallback-initial';
                          span.textContent = (partner.name || 'P').charAt(0).toUpperCase();
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <span className="bp-partner-name">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Services Companies Tie-up */}
        <section className="bp-section">
          <div className="bp-intro-card">
            <h2 className="bp-section-title">
              <Layers size={24} color="#a855f7" />
              <span>{serviceSectionTitle}</span>
            </h2>

            <div className="bp-intro-paragraphs">
              {serviceParagraphs.map((p, idx) => (
                <p key={idx} className="bp-intro-para">{p}</p>
              ))}
            </div>
          </div>

          <h3 className="bp-grid-subheading" style={{ color: '#c084fc' }}>
            <span>✦</span> {serviceSubHeading}
          </h3>

          <div className="bp-partners-grid">
            {serviceList.map((partner, idx) => {
              const isMore = partner.name && partner.name.toLowerCase().includes('more');
              if (isMore) {
                return (
                  <div key={partner.id || idx} className="bp-partner-card bp-more-card">
                    <div className="bp-more-icon" style={{ color: '#c084fc', background: 'rgba(168, 85, 247, 0.2)' }}>
                      <Plus size={26} />
                    </div>
                    <span className="bp-partner-name">&amp; More Service Networks</span>
                  </div>
                );
              }

              return (
                <div key={partner.id || idx} className="bp-partner-card">
                  <div className="bp-logo-wrap">
                    <img
                      src={partner.localImg || partner.img}
                      alt={`${partner.name} logo`}
                      className="bp-logo-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent && !parent.querySelector('.bp-fallback-initial')) {
                          const span = document.createElement('span');
                          span.className = 'bp-fallback-initial';
                          span.textContent = (partner.name || 'P').charAt(0).toUpperCase();
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <span className="bp-partner-name">{partner.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
