import React from 'react';
import { useHomePage } from '@backend/useContent';
import { resolveMediaUrl } from '@backend/dataService';

export default function CtaBanner({ onOpenModal }) {
  const { home } = useHomePage();
  const cta = home?.ctaBanner || {};

  const badge = cta.badge || 'GET STARTED WITH BLACK GRAPES SOFTECH';
  const title = cta.title || 'Assess Your Business Potentials Now & Find Take Care of What Matters Most!';
  const subtitle = cta.subtitle || 'Speak directly with our senior architects. Whether you need a full enterprise software build, high-conversion mobile app, or modern web platform, we deliver excellence on time and on budget.';
  const primaryBtnText = cta.primaryBtnText || 'Get Started Now!';
  const secondaryBtnText = cta.secondaryBtnText || 'Get Free Consultation';

  const rawBg = cta.image || cta.bg_image || '';
  const bannerImage = rawBg ? resolveMediaUrl(rawBg) : '';

  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card" style={bannerImage ? { position: 'relative', overflow: 'hidden' } : {}}>
          {bannerImage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.18,
                zIndex: 1,
                pointerEvents: 'none'
              }}
            />
          )}
          <div className="cta-banner-glow"></div>

          <div className="cta-banner-content" style={{ position: 'relative', zIndex: 2 }}>
            {bannerImage && (
              <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={bannerImage}
                  alt="Black Grapes Softech"
                  style={{
                    maxHeight: '120px',
                    maxWidth: '240px',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.6))'
                  }}
                />
              </div>
            )}
            <span className="cta-badge">{badge}</span>
            <h2 className="cta-banner-title" style={{ whiteSpace: 'pre-line' }}>
              {title}
            </h2>
            <p className="cta-banner-subtitle">
              {subtitle}
            </p>

            <div className="cta-btn-wrapper">
              <button
                type="button"
                className="btn btn-primary btn-xl"
                onClick={() => onOpenModal && onOpenModal(primaryBtnText)}
              >
                <span>{primaryBtnText}</span>
                <span className="btn-sparkle">🚀</span>
              </button>

              <button
                type="button"
                className="btn btn-outline btn-xl"
                onClick={() => onOpenModal && onOpenModal(secondaryBtnText)}
              >
                <span>{secondaryBtnText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
