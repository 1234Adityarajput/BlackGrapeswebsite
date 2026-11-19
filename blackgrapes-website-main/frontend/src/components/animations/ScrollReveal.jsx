import React, { useRef, useState, useEffect } from 'react';

/**
 * High-Performance Scroll Reveal Component
 * Uses native IntersectionObserver with CSS GPU transitions for 60fps scroll animations.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up', // 'fade-up' | 'fade-down' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale'
  delay = 0,             // Delay in ms (e.g. 150)
  duration = 700,        // Duration in ms
  threshold = 0.12,      // Visibility threshold
  once = true,           // Run animation once
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const domRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately without animation
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsRevealed(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px' // Slightly trigger before bottom edge
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once]);

  const animationClass = `reveal-${animation}`;
  const revealedClass = isRevealed ? 'is-revealed' : '';
  const inlineStyles = {
    ...style,
    transitionDuration: `${duration}ms`,
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {})
  };

  return (
    <Component
      ref={domRef}
      className={`reveal-base ${animationClass} ${revealedClass} ${className}`.trim()}
      style={inlineStyles}
      {...props}
    >
      {children}
    </Component>
  );
}
