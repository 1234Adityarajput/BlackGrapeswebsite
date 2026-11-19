import React, { useState, useEffect, useRef } from 'react';

// Smooth requestAnimationFrame animated number counter for SS3 stats
export default function AnimatedCounter({ 
  target = 100, 
  duration = 2200, 
  suffix = '+',
  prefix = '' 
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.25 }
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
  }, [target, duration]);

  const startCountAnimation = () => {
    let startTimestamp = null;
    const numericTarget = parseInt(target, 10) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth ease-out cubic curve (starts dynamic, eases gently into final count)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * numericTarget);

      setCount(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericTarget);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <span ref={elementRef} className="animated-counter-value">
      {prefix}{count}{suffix}
    </span>
  );
}
