import React from 'react';
import ScrollReveal from './ScrollReveal';

/**
 * Reusable Premium Animated Card Component
 * Combines viewport scroll entrance with subtle 3D lift, border glow, and shadow transition.
 */
export default function AnimatedCard({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  style = {},
  zoomImage = false,
  ...props
}) {
  const cardClasses = `premium-card-hover ${zoomImage ? 'premium-img-zoom' : ''} ${className}`.trim();

  return (
    <ScrollReveal
      animation={animation}
      delay={delay}
      duration={duration}
      className={cardClasses}
      style={style}
      {...props}
    >
      {children}
    </ScrollReveal>
  );
}
