import React, { useState } from 'react';
import { useHomePage, useTestimonials } from '@backend/useContent';
import { TESTIMONIALS } from '../data/siteData';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { home } = useHomePage();
  const { testimonials } = useTestimonials();

  const ts = home?.testimonialsSection || {};
  const badge = ts.badge || 'WHAT PEOPLE ARE SAYING';
  const titlePrefix = ts.titlePrefix !== undefined ? ts.titlePrefix : 'Preparing For Your Success • ';
  const titleHighlight = ts.titleHighlight !== undefined ? ts.titleHighlight : 'Trusted Source In IT Services';
  const subtitle = ts.subtitle || 'See how Black Grapes Softech delivers real business transformation for leaders and founders.';

  // Prioritize live testimonials collection from TestimonialsManager
  const rawList = (Array.isArray(testimonials) && testimonials.length > 0)
    ? testimonials
    : ((Array.isArray(ts.testimonials) && ts.testimonials.length > 0) ? ts.testimonials : TESTIMONIALS);

  const testimonialsList = rawList.map((item) => {
    const name = item.name || item.author || 'Verified Client';
    const role = item.role || item.designation || (item.company ? `${item.role} • ${item.company}` : 'Client');
    const rating = typeof item.rating === 'number' ? item.rating : 5;
    return {
      ...item,
      name,
      role,
      rating,
      ratingScore: item.ratingScore || `${rating.toFixed(1)} / 5.0 Rating`,
      verifiedBadge: item.verifiedBadge || '✓ Verified Client',
      avatar: item.avatar || (name || 'BG').slice(0, 2).toUpperCase()
    };
  });

  const currentIdx = (activeIndex >= testimonialsList.length) ? 0 : activeIndex;
  const currentItem = testimonialsList[currentIdx] || testimonialsList[0] || {};

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  // Helper to extract or display initials for avatar
  const getAvatarText = (item) => {
    if (item.avatar) return item.avatar;
    if (item.name) {
      const parts = item.name.trim().split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return parts[0].slice(0, 2).toUpperCase();
    }
    return 'BG';
  };

  const starCount = typeof currentItem.rating === 'number' ? currentItem.rating : 5;

  return (
    <section id="testimonials" className="section testimonials-section">
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
        </div>

        {/* Featured Testimonial Highlight */}
        <div className="testimonial-featured-card">
          <div className="quote-mark-icon">&ldquo;</div>

          <div className="testimonial-stars-row">
            {[...Array(starCount)].map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
            <span className="rating-score">{currentItem.ratingScore || '5.0 / 5.0 Rating'}</span>
            <span className="verified-client-pill">{currentItem.verifiedBadge || '✓ Verified Client'}</span>
          </div>

          <p className="testimonial-quote-text">
            {currentItem.quote}
          </p>

          <div className="testimonial-author-row">
            <div className="author-avatar-circle">
              {getAvatarText(currentItem)}
            </div>
            <div className="author-info">
              <strong className="author-name">{currentItem.name}</strong>
              <span className="author-role">{currentItem.role}</span>
            </div>

            {/* Slider Controls */}
            <div className="testimonial-controls">
              <button
                type="button"
                className="control-arrow-btn"
                onClick={prevReview}
                aria-label="Previous review"
              >
                &larr;
              </button>
              <span className="control-fraction">
                {String(currentIdx + 1).padStart(2, '0')} / {String(testimonialsList.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="control-arrow-btn"
                onClick={nextReview}
                aria-label="Next review"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
