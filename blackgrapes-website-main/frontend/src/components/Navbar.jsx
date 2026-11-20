import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_INFO, NAV_LINKS } from '../data/siteData';
import { useSiteSettings, useMenus } from '@backend/useContent';
import '../styles/Navbar.css';

export default function Navbar({ onOpenModal, onOpenInquiry, onOpenDemoModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { menus } = useMenus();

  // Dynamically derive active nav items ordered by admin panel order_index
  const activeMenus = (menus && menus.length > 0)
    ? menus
        .filter((m) => m.is_active !== false)
        .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    : [];

  const baseItems = activeMenus.length > 0
    ? activeMenus.map((m) => {
        const match = NAV_LINKS.find(
          (nl) =>
            nl.href.toLowerCase().replace(/\/$/, '') === (m.path || '').toLowerCase().replace(/\/$/, '') ||
            nl.name.toLowerCase() === (m.label || '').toLowerCase()
        );
        return {
          name: m.label || match?.name || '',
          href: m.path || match?.href || '/',
          dropdown: match?.dropdown || null
        };
      })
    : NAV_LINKS;

  // Guarantee Careers is always present in navigation items
  const hasCareers = baseItems.some(
    (item) => item.href === '/careers' || item.name.toLowerCase() === 'careers'
  );

  const navItems = hasCareers
    ? baseItems
    : (() => {
        const contactIndex = baseItems.findIndex(
          (i) => i.href === '/contact' || i.href === '/contact-us' || i.name.toLowerCase().includes('contact')
        );
        const careersItem = { name: 'Careers', href: '/careers', dropdown: null };
        if (contactIndex !== -1) {
          const copy = [...baseItems];
          copy.splice(contactIndex, 0, careersItem);
          return copy;
        }
        return [...baseItems, careersItem];
      })();

  const handleOpenAction = (title = 'Request a Demo') => {
    if (onOpenModal) {
      onOpenModal(title);
    } else if (onOpenInquiry) {
      onOpenInquiry(title);
    } else if (onOpenDemoModal) {
      onOpenDemoModal();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isLinkActive = (href) => {
    const current = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const target = href.toLowerCase().replace(/\/$/, '') || '/';

    if (target === '/') {
      return current === '/';
    }
    if (target === '/about-us') {
      return current === '/about' || current === '/about-us';
    }
    if (target === '/services') {
      return current === '/services' || current === '/softech-services';
    }
    if (target === '/our-products') {
      return current === '/products' || current === '/our-products';
    }
    if (target === '/ecommerce') {
      return current === '/ecommerce';
    }
    if (target === '/our-clients') {
      return current === '/clients' || current === '/our-clients';
    }
    if (target === '/it-staffing') {
      return current === '/it-staffing' || current === '/staffing';
    }
    if (target === '/partnership') {
      return current === '/partnership' || current === '/business-partners';
    }
    if (target === '/careers' || target === '/career') {
      return current === '/careers' || current === '/career' || current === '/jobs';
    }
    if (target === '/contact-us') {
      return current === '/contact' || current === '/contact-us';
    }

    return current === target || current.startsWith(target + '/');
  };

  return (
    <>
      {/* Top Info Bar */}
      {settings?.top_strip_enabled !== false && (
        <div className="top-bar">
          <div className="container top-bar-container">
            <div className="top-bar-left">
              <span className="top-pill">
                <span className="pulse-dot"></span>
                {settings?.top_bar_pill || 'Accepting New Projects'}
              </span>
            </div>

            <div className="top-bar-right">
              <a href={`mailto:${settings?.primary_email || COMPANY_INFO.emails[0]}`} className="top-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                {settings?.primary_email || COMPANY_INFO.emails[0]}
              </a>
              <span className="top-divider">|</span>
              <a href={`tel:${(settings?.primary_phone || COMPANY_INFO.phones[0]).replace(/\s+/g, '')}`} className="top-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {settings?.primary_phone || COMPANY_INFO.phones[0]}
              </a>
              <span className="top-divider">|</span>
              <span className="top-location">{settings?.top_bar_location || 'Indore, MP, India'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar */}
      <header className={`main-navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo Branding */}
          <Link to="/" className="brand-logo" aria-label="Black Grapes Softech Home">
            <div className="logo-glow-wrapper">
              <img
                src={settings?.logo_url || '/bgst-logo.png'}
                alt="Black Grapes Softech Logo"
                className="logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/bgst-logo.png';
                }}
              />
            </div>
            <div className="brand-text-block">
              <span className="brand-title">{settings?.brand_title || 'BLACK GRAPES'}</span>
              <span className="brand-subtitle">{settings?.brand_subtitle || settings?.tagline || 'SOFTECH • IT INNOVATION'}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navItems.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <div
                  key={link.name}
                  className={`nav-item-wrapper ${link.dropdown ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`nav-link ${active ? 'nav-link-active' : ''}`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <svg
                        className={`dropdown-chevron ${activeDropdown === link.name ? 'chevron-rotated' : ''}`}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div className={`nav-dropdown-menu ${activeDropdown === link.name ? 'show-dropdown' : ''}`}>
                      <div className="dropdown-grid">
                        {link.dropdown.map((subItem) => {
                          const isSubActive = location.pathname.toLowerCase().replace(/\/$/, '') === subItem.href.toLowerCase().replace(/\/$/, '');
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`dropdown-item ${isSubActive ? 'dropdown-item-active' : ''}`}
                              onClick={() => setActiveDropdown(null)}
                            >
                            <div className="dropdown-item-content">
                              <span className="dropdown-item-title">{subItem.name}</span>
                              <span className="dropdown-item-desc">{subItem.desc}</span>
                            </div>
                            <span className="dropdown-item-arrow">&rarr;</span>
                          </Link>
                        );})}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Header Action CTA */}
          <div className="navbar-actions">
            {settings?.header_cta_action === 'link' && settings?.header_cta_link ? (
              <Link
                to={settings.header_cta_link}
                className="btn btn-primary nav-cta-btn"
              >
                <span className="btn-sparkle">✨</span>
                <span className="nav-cta-text-full">{settings?.header_cta_text || 'Get Quote / Demo'}</span>
                <span className="nav-cta-text-short">{settings?.header_cta_short || 'Quote'}</span>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary nav-cta-btn"
                onClick={() => handleOpenAction(settings?.header_cta_text || 'Request a Demo')}
              >
                <span className="btn-sparkle">✨</span>
                <span className="nav-cta-text-full">{settings?.header_cta_text || 'Get Quote / Demo'}</span>
                <span className="nav-cta-text-short">{settings?.header_cta_short || 'Quote'}</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle (hidden on desktop) */}
            <button
              type="button"
              className={`mobile-toggle ${mobileMenuOpen ? 'mobile-toggle-active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
              <span className="bar bar-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Overlay Drawer - Only rendered when mobileMenuOpen is true */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-drawer-box" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-top">
              <div className="brand-text-block">
                <span className="brand-title">{settings?.brand_title || 'BLACK GRAPES'}</span>
                <span className="brand-subtitle">{settings?.brand_subtitle || 'NAVIGATION MENU'}</span>
              </div>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Navigation Menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer-links">
              {navItems.map((link) => (
                <div key={link.name} className="mobile-link-group">
                  <div className="mobile-link-row">
                    <Link
                      to={link.href}
                      className={`mobile-link-item ${isLinkActive(link.href) ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <button
                        type="button"
                        className="mobile-expand-btn"
                        onClick={() => toggleDropdown(link.name)}
                        aria-label="Toggle submenu"
                      >
                        {activeDropdown === link.name ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {link.dropdown && activeDropdown === link.name && (
                    <div className="mobile-submenu-list">
                      {link.dropdown.map((sub) => {
                        const isSubActive = location.pathname.toLowerCase().replace(/\/$/, '') === sub.href.toLowerCase().replace(/\/$/, '');
                        return (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`mobile-submenu-link ${isSubActive ? 'active' : ''}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mobile-drawer-cta">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAction('Request a Demo');
                }}
              >
                <span className="btn-sparkle">✨</span>
                <span>Get Quote / Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
