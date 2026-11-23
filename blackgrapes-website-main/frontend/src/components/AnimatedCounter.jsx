import React, { useState, useEffect, useRef } from 'react';

/**
 * Universal High-Performance Animated Counter
 * - Smoothly animates integers, decimals (e.g. 98.4%), and formatted numbers (e.g. 25,000+)
 * - Automatically parses strings with suffixes like '10+', '250+ Projects', '99%', etc.
 * - GPU-accelerated requestAnimationFrame with ease-out cubic curve
 * - Runs once per viewport entrance via native IntersectionObserver
 */
export default function AnimatedCounter({ 
  target = null,
  value = null,
  duration = 1800, 
  suffix = '',
  prefix = '',
  className = ''
}) {
  const rawInput = value !== null ? value : (target !== null ? target : 0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  // Parse raw input (e.g., "25,000+", "98.4%", "10+ Years", 150)
  const parseConfig = () => {
    if (typeof rawInput === 'number') {
      return {
        numeric: rawInput,
        hasCommas: false,
        decimals: Number.isInteger(rawInput) ? 0 : 1,
        autoPrefix: prefix,
        autoSuffix: suffix
      };
    }

    const str = String(rawInput).trim();
    // Match optional prefix, number with optional commas/decimals, and suffix
    const match = str.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) {
      return {
        numeric: null,
        rawStr: str
      };
    }

    const extractedPrefix = prefix || match[1] || '';
    const numStr = match[2];
    const extractedSuffix = suffix || match[3] || '';
    const hasCommas = numStr.includes(',');
    const decimals = numStr.includes('.') ? (numStr.split('.')[1].length || 0) : 0;
    const numeric = parseFloat(numStr.replace(/,/g, ''));

    return {
      numeric: isNaN(numeric) ? null : numeric,
      hasCommas,
      decimals,
      autoPrefix: extractedPrefix,
      autoSuffix: extractedSuffix,
      rawStr: str
    };
  };

  const config = parseConfig();
  const [displayCount, setDisplayCount] = useState(
    config.numeric !== null ? 0 : (config.rawStr || '')
  );

  useEffect(() => {
    if (config.numeric === null) return;

    // Respect reduced motion accessibility
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      formatAndSet(config.numeric);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.15 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [rawInput, duration]);

  const formatNumber = (num) => {
    let formatted = config.decimals > 0 
      ? num.toFixed(config.decimals) 
      : Math.floor(num).toString();

    if (config.hasCommas) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = parts.join('.');
    }
    return formatted;
  };

  const formatAndSet = (num) => {
    setDisplayCount(formatNumber(num));
  };

  const startCountAnimation = () => {
    let startTimestamp = null;
    const targetVal = config.numeric;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * targetVal;

      formatAndSet(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        formatAndSet(targetVal);
      }
    };

    window.requestAnimationFrame(step);
  };

  if (config.numeric === null) {
    return <span className={`animated-counter-value ${className}`}>{config.rawStr}</span>;
  }

  return (
    <span ref={elementRef} className={`animated-counter-value ${className}`}>
      {config.autoPrefix}{displayCount}{config.autoSuffix}
    </span>
  );
}
