import React from 'react';

// Crisp, lightweight, monochrome vector SVG icons for all tech stack items (SS2 & SS3 Match)
export const TechLogo = ({ name, size = 26, className = '' }) => {
  const s = size;
  const c = className;

  switch (name.toLowerCase()) {
    // ---------------- FRONTEND ----------------
    case 'react':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );

    case 'next.js':
    case 'nextjs':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.3 14.7L9.5 9v-.6h1.2v6.9h-1.2v-4.5l5 6.7c.3.4.6.6 1 .6.5 0 .8-.4.8-1V8.4h-1v8.3z" />
        </svg>
      );

    case 'redux':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
          <circle cx="12" cy="11" r="2.5" fill="currentColor" />
          <path d="M12 8.5v5M9.5 11h5" strokeWidth="1.5" />
        </svg>
      );

    case 'webpack':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" />
          <polyline points="12,2 12,12 21,16.5" />
          <polyline points="12,12 3,16.5" />
          <polygon points="12,7 16.5,9.5 16.5,14.5 12,17 7.5,14.5 7.5,9.5" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <rect x="3" y="3" width="18" height="18" rx="3.5" />
          <path d="M7 8h6M10 8v8M14 13.5c.5.8 1.4 1.3 2.4 1.3 1.2 0 1.8-.6 1.8-1.3 0-1-.8-1.3-2-1.7s-2.2-.8-2.2-2.1c0-1.2 1-2.1 2.4-2.1 1.2 0 2 .5 2.5 1.4" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'auth0':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <path d="M12 2a8 8 0 0 0-8 8c0 3.2 2 6 5 7.2L12 22l3-4.8c3-1.2 5-4 5-7.2a8 8 0 0 0-8-8z" />
          <circle cx="12" cy="10" r="2.5" fill="currentColor" />
        </svg>
      );

    case 'html5':
    case 'html':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <path d="M4 3l1.8 17 6.2 2 6.2-2L20 3H4z" />
          <path d="M7 7h10M7.5 11h9l-.5 5-4 1.2-4-1.2-.2-2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'css3':
    case 'css':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <path d="M4 3l1.8 17 6.2 2 6.2-2L20 3H4z" />
          <path d="M16.5 7H7.5l.4 4h8.2l-.5 5-3.6 1-3.6-1-.2-2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'tailwind css':
    case 'tailwind':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4-1-1-2.2-2.1-4.5-2.1zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4-1-1-2.2-2.1-4.5-2.1z" />
        </svg>
      );

    case 'vue.js':
    case 'vue':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M2 3h4.2l5.8 9.8L17.8 3H22L12 21 2 3z" />
          <path d="M6.5 3h3.5L12 6.5 14 3h3.5L12 12.5 6.5 3z" fill="#000" />
        </svg>
      );

    case 'three.js':
    case 'threejs':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <polygon points="12,3 21,19 3,19" />
          <line x1="12" y1="3" x2="12" y2="19" />
          <line x1="12" y1="11" x2="21" y2="19" />
          <line x1="12" y1="11" x2="3" y2="19" />
        </svg>
      );

    // ---------------- BACKEND & MICROSERVICES ----------------
    case 'express.js':
    case 'express':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <text x="5" y="16" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="currentColor">ex</text>
        </svg>
      );

    case 'node.js':
    case 'nodejs':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" />
          <path d="M12 7v10M8 9.5l4 2.5 4-2.5" />
        </svg>
      );

    case 'nest.js':
    case 'nestjs':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <polygon points="12,2 20,9 17,21 7,21 4,9" />
          <polygon points="12,6 16,11 14,18 10,18 8,11" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );

    case 'python':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M11.9 2c-3.1 0-5 1.4-5 3.3v2.2h5.1v.7H4.3C2.5 8.2 1 9.9 1 12.3c0 2.5 1.5 4.1 3.3 4.1h1.5v-2.1c0-2 1.7-3.7 3.7-3.7h5.1c1.7 0 3-1.4 3-3V5.3c0-2-1.9-3.3-5.7-3.3zm-1.8 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
          <path d="M12.1 22c3.1 0 5-1.4 5-3.3v-2.2H12v-.7h7.7c1.8 0 3.3-1.7 3.3-4.1 0-2.5-1.5-4.1-3.3-4.1h-1.5v2.1c0 2-1.7 3.7-3.7 3.7H9.4c-1.7 0-3 1.4-3 3v2.3c0 2 1.9 3.3 5.7 3.3zm1.8-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <polygon points="13,2 4,14 11,14 9,22 20,10 13,10" />
        </svg>
      );

    case 'django':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M14 6v8a3 3 0 0 1-3 3c-1.6 0-3-1.2-3-2.8 0-1.5 1.2-2.7 2.8-2.7.9 0 1.7.4 2.2 1" />
        </svg>
      );

    case 'graphql':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <polygon points="12,2 21,7.5 21,16.5 12,22 3,16.5 3,7.5" />
          <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" />
          <circle cx="12" cy="2" r="1.5" fill="currentColor" />
          <circle cx="21" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="21" cy="16.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="22" r="1.5" fill="currentColor" />
          <circle cx="3" cy="16.5" r="1.5" fill="currentColor" />
          <circle cx="3" cy="7.5" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'rest apis':
    case 'rest':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="7" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M9 12h3m0 0l3-4m-3 4l3 4" strokeLinecap="round" />
        </svg>
      );

    // ---------------- DATABASES & STORAGE ----------------
    case 'postgresql':
    case 'postgres':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <ellipse cx="12" cy="11" rx="8" ry="7" />
          <path d="M8 8c1-2 4-2 6-1 2 1 2 4 1 6-1 2-3 4-5 4M6 14c-1 2 0 4 2 4M15 14c2 0 3-1 3-3" strokeLinecap="round" />
          <circle cx="9.5" cy="10" r="1" fill="currentColor" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M12 2C12 2 6 9 6 14.5 6 18.1 8.7 21 12 22c3.3-1 6-3.9 6-7.5C18 9 12 2 12 2zm.5 17.5v-15c2.5 1.5 4 4.5 4 7.5 0 3-1.8 6-4 7.5z" />
        </svg>
      );

    case 'redis':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <polygon points="12,2 22,7 12,12 2,7" />
          <polyline points="2,12 12,17 22,12" />
          <polyline points="2,17 12,22 22,17" />
        </svg>
      );

    case 'mysql':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <ellipse cx="12" cy="8" rx="8" ry="4" />
          <path d="M4 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
          <path d="M4 12c0 2.2 3.6 4 8 4s8-1.8 8-4" />
        </svg>
      );

    case 'firebase':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M4.5 16.5L7.2 3.8a.8.8 0 0 1 1.5-.2l2.3 4.3 3.4-6.4a.8.8 0 0 1 1.4.1l4 14.9-6.9 3.8a2.5 2.5 0 0 1-2.4 0l-6-3.5z" />
        </svg>
      );

    case 'supabase':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M13.2 2.3a1 1 0 0 0-1.6.8V11H4.5a1 1 0 0 0-.8 1.6l8 10a1 1 0 0 0 1.6-.8V13h7.1a1 1 0 0 0 .8-1.6l-8-9.1z" />
        </svg>
      );

    // ---------------- MOBILE APPS ----------------
    case 'flutter':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M13.5 2.5L4 12l2.8 2.8L19.2 2.5h-5.7zM13.5 13.9L8.8 18.6 11.6 21.5 19.2 13.9h-5.7z" />
          <path d="M11.6 12L7.4 16.2 10.2 19l4.2-4.2-2.8-2.8z" />
        </svg>
      );

    case 'react native':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <circle cx="12" cy="18" r="1" fill="currentColor" />
          <ellipse cx="12" cy="9.5" rx="4.5" ry="2" transform="rotate(25 12 9.5)" />
          <ellipse cx="12" cy="9.5" rx="4.5" ry="2" transform="rotate(-25 12 9.5)" />
        </svg>
      );

    case 'swift (ios)':
    case 'swift':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M20.5 14.5c-.8 1.4-2 2.7-3.4 3.7-2.6 1.8-6.1 2.2-9 1 3.5-.8 6.5-2.8 8.4-5.6-2 .7-4.2.8-6.3.3-2.3-.6-4.3-2-5.7-3.9 2 .6 4.1.6 6.1 0-2.3-1.2-4-3.2-4.8-5.7 1.8 1 3.8 1.6 5.9 1.7-1.5-1.5-2.4-3.6-2.4-5.8 4.2 3.5 7.4 8.2 8.7 13.5.8.3 1.7.5 2.5.8z" />
        </svg>
      );

    case 'kotlin (android)':
    case 'kotlin':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <polygon points="2,2 12,2 2,12" />
          <polygon points="12,2 22,2 2,22 2,12" />
          <polygon points="22,2 22,12 12,22 2,22" />
        </svg>
      );

    // ---------------- CLOUD, DEVOPS & INFRASTRUCTURE ----------------
    case 'aws cloud':
    case 'aws':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <path d="M6 14.5c4 2.5 9 2.5 12.5 0" strokeLinecap="round" />
          <path d="M16.5 14l2 1-1 2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 10a4 4 0 0 1 7.5-1.5 3.5 3.5 0 0 1 5.5 3.5H5.5" />
        </svg>
      );

    case 'docker':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <path d="M4 14h16c0 3.5-3 6-8 6s-8-2.5-8-6z" />
          <rect x="6" y="10" width="2.5" height="2.5" fill="currentColor" />
          <rect x="9.5" y="10" width="2.5" height="2.5" fill="currentColor" />
          <rect x="13" y="10" width="2.5" height="2.5" fill="currentColor" />
          <rect x="9.5" y="6.5" width="2.5" height="2.5" fill="currentColor" />
          <rect x="13" y="6.5" width="2.5" height="2.5" fill="currentColor" />
        </svg>
      );

    case 'kubernetes':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={c}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <line x1="12" y1="3.5" x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="20.5" />
          <line x1="4.5" y1="7.5" x2="9.5" y2="10.5" />
          <line x1="14.5" y1="13.5" x2="19.5" y2="16.5" />
          <line x1="4.5" y1="16.5" x2="9.5" y2="13.5" />
          <line x1="14.5" y1="10.5" x2="19.5" y2="7.5" />
        </svg>
      );

    case 'vercel':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <polygon points="12,3 22,21 2,21" />
        </svg>
      );

    case 'github actions':
    case 'github ci/cd':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="5" cy="6" r="2.5" />
          <circle cx="19" cy="6" r="2.5" />
          <circle cx="12" cy="20" r="2" />
          <path d="M7 8l3.5 2.5M17 8l-3.5 2.5M12 15v3" />
        </svg>
      );

    case 'google cloud':
    case 'gcp':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <path d="M7 16a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1.5A4.5 4.5 0 0 1 18 16H7z" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );

    // ---------------- ARTIFICIAL INTELLIGENCE & LLM ----------------
    case 'openai':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5A8.5 8.5 0 0 1 19.5 8M20.5 12a8.5 8.5 0 0 1-4.5 7.5M12 20.5a8.5 8.5 0 0 1-7.5-4.5M3.5 12A8.5 8.5 0 0 1 8 4.5" />
        </svg>
      );

    case 'pytorch':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <path d="M13 3l-6 6a6 6 0 1 0 8.5 8.5l2-2" />
          <circle cx="15.5" cy="5.5" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'ai agents / rag':
    case 'ai agents':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <rect x="4" y="6" width="16" height="13" rx="3" />
          <circle cx="9" cy="12" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <path d="M12 2v4M2 12h2M20 12h2M9 16h6" strokeLinecap="round" />
        </svg>
      );

    case 'tensorflow':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <polygon points="12,2 20,7 20,11 12,6 12,2" />
          <polygon points="12,6 4,11 4,7 12,2" />
          <polygon points="12,8 18,12 18,15 12,11" />
          <polygon points="12,11 6,15 6,12 12,8" />
          <polygon points="12,13 18,17 18,21 12,17" />
          <polygon points="12,17 6,21 6,17 12,13" />
        </svg>
      );

    // ---------------- DESIGN & DEVELOPMENT TOOLS ----------------
    case 'figma':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <circle cx="15" cy="12" r="3" />
          <rect x="6" y="3" width="6" height="6" rx="3" />
          <rect x="12" y="3" width="6" height="6" rx="3" />
          <rect x="6" y="9" width="6" height="6" rx="3" />
          <path d="M6 15h3a3 3 0 1 1-3 3v-3z" />
        </svg>
      );

    case 'postman':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M7 13l4-4 6 2-4 4-6-2z" />
          <circle cx="15" cy="9" r="1" fill="currentColor" />
        </svg>
      );

    case 'git':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={c}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="9" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <line x1="6" y1="8.5" x2="6" y2="15.5" />
          <path d="M15.5 9c-3 0-5 2-7.5 5" />
        </svg>
      );

    case 'github':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={c}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
};
