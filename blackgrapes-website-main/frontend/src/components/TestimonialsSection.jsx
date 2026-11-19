import React, { useState, useEffect, useCallback } from 'react';
import { useHomePage, useTestimonials } from '@backend/useContent';
import { TESTIMONIALS } from '../data/siteData';

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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

  const total = testimonialsList.length;

  const nextReview = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevReview = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  // 5-Second Automatic Review Transition (Pauses on Hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, total, nextReview]);

  const currentIdx = (activeIndex >= total) ? 0 : activeIndex;
  const currentItem = testimonialsList[currentIdx] || testimonialsList[0] || {};

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

        {/* Featured Testimonial Highlight Card */}
        <div 
          className="testimonial-featured-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="quote-mark-icon">&ldquo;</div>

          {/* Top Rating & Dynamic 5s Auto-Play Indicator Row */}
          <div className="testimonial-stars-row">
            {[...Array(starCount)].map((_, i) => (
              <span key={i} className="star-icon">★</span>
            ))}
            <span className="rating-score">{currentItem.ratingScore || '5.0 / 5.0 Rating'}</span>
            <span className="verified-client-pill">{currentItem.verifiedBadge || '✓ Verified Client'}</span>
          </div>

          {/* Animated Quote Text (Resets fade-in on 5s change) */}
          <p key={`quote-${currentIdx}`} className="testimonial-quote-text testimonial-quote-animated">
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

            {/* Slider Controls with Navigation Dots */}
            <div className="testimonial-controls">
              <button
                type="button"
                className="control-arrow-btn"
                onClick={prevReview}
                aria-label="Previous review"
              >
                &larr;
              </button>

              {/* Navigation Dots */}
              <div className="testimonial-nav-dots">
                {testimonialsList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`test-nav-dot ${dotIdx === currentIdx ? 'active' : ''}`}
                    onClick={() => setActiveIndex(dotIdx)}
                    aria-label={`Go to review ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <span className="control-fraction">
                {String(currentIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
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

          {/* 5-Second Animated Progress Bar (Resets key on step change, pauses on hover) */}
          <div className="testimonial-timer-bar">
            <div 
              key={`timer-${currentIdx}`} 
              className={`testimonial-timer-fill ${isHovered ? 'paused' : 'animating'}`} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
