import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { useSiteSettings } from '@backend/useContent';
import { submitEnquiry } from '@backend/dataService';

// Social Channel SVG Icons
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.58.13.17 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3z" />
  </svg>
);

export default function Footer({ onOpenModal, onOpenInquiry }) {
  const location = useLocation();
  const { settings } = useSiteSettings();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleOpenAction = (title = 'Request a Demo') => {
    if (onOpenModal) {
      onOpenModal(title);
    } else if (onOpenInquiry) {
      onOpenInquiry(title);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      const emailToSubmit = newsletterEmail.trim();
      submitEnquiry({
        name: 'Newsletter Subscriber',
        email: emailToSubmit,
        phone: 'Via Newsletter Form',
        service: 'Newsletter Subscription & Tech Updates',
        message: `User subscribed to Black Grapes newsletter updates with email: ${emailToSubmit}`,
        source: 'Footer Newsletter Widget'
      }).catch(() => {});

      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  // Safe brand name split
  const brandTitle = settings?.brand_title || 'BLACK GRAPES';
  const brandWords = brandTitle.split(' ');
  const brandFirst = brandWords[0] || 'BLACK';
  const brandRest = brandWords.slice(1).join(' ') || 'GRAPES';

  // Services links fallback
  const servicesLinks = (settings?.footer_services_links && settings.footer_services_links.length > 0)
    ? settings.footer_services_links
    : [
        { label: 'Software Development', path: '/services' },
        { label: 'Mobile App Engineering', path: '/services' },
        { label: 'Enterprise CRM & ERP', path: '/services' },
        { label: 'MLM Software Systems', path: '/services' },
        { label: 'Web Portals & Cloud Apps', path: '/services' },
        { label: 'Digital Growth & SEO', path: '/services' },
        { label: 'UI/UX & Brand Systems', path: '/services' },
        { label: 'Interactive Game Dev', path: '/services' }
      ];

  // Solutions links fallback
  const solutionsLinks = (settings?.footer_solutions_links && settings.footer_solutions_links.length > 0)
    ? settings.footer_solutions_links
    : [
        { label: 'Proprietary Software Catalog', path: '/products' },
        { label: 'Client Case Studies', path: '/clients' },
        { label: 'IT & Technical Staffing', path: '/it-staffing' },
        { label: 'Careers & Hiring', path: '/careers' },
        { label: 'E-Commerce & Hardware', path: '/ecommerce' },
        { label: 'Partner Program (ODC)', path: '/partnership' },
        { label: 'About Black Grapes', path: '/about' }
      ];

  // Bottom links fallback
  const bottomLinks = (settings?.footer_bottom_links && settings.footer_bottom_links.length > 0)
    ? settings.footer_bottom_links
    : [
        { label: 'About Us', path: '/about' },
        { label: 'Services', path: '/services' },
        { label: 'Products', path: '/products' },
        { label: 'Careers', path: '/careers' },
        { label: 'Contact', path: '/contact' }
      ];

  // Primary contacts
  const primaryPhone = settings?.primary_phone?.trim() || COMPANY_INFO.phones[0];
  const secondaryPhone = settings?.secondary_phone?.trim() || COMPANY_INFO.phones[1];
  const primaryEmail = settings?.primary_email?.trim() || COMPANY_INFO.emails[0];
  const office1 = settings?.office_address || COMPANY_INFO.address;
  const office2 = settings?.office_address_2 || '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, MP';

  return (
    <footer className="site-footer">
      {/* Main Footer Directory */}
      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Column 1: Brand & Profile */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand" aria-label="Black Grapes Softech">
              <div className="brand-logo-wrap">
                <img
                  src={settings?.logo_url || '/bgst-logo.png'}
                  alt="Black Grapes Logo"
                  className="footer-logo-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
              </div>
              <div>
                <span className="footer-brand-title">
                  {brandFirst} <span className="text-orange">{brandRest}</span>
                </span>
                <span className="footer-brand-sub">
                  {settings?.brand_subtitle || 'SOFTECH • GROUP'}
                </span>
              </div>
            </Link>

            <p className="footer-about-text">
              {settings?.footer_about_text || '10+ Years of Proven IT Excellence. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion portals.'}
            </p>

            <div className="footer-trust-badge">
              <ShieldCheck size={18} className="trust-icon" />
              <span>{settings?.footer_trust_badge || 'ISO 9001:2015 & Quality Assured Engineering'}</span>
            </div>

            <div className="social-links-row mt-3">
              {settings?.social_linkedin && (
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="social-circle"
                >
                  <LinkedinIcon />
                </a>
              )}
              {settings?.social_twitter && (
                <a
                  href={settings.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                  className="social-circle"
                >
                  <TwitterIcon />
                </a>
              )}
              {settings?.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="social-circle"
                >
                  <InstagramIcon />
                </a>
              )}
              {settings?.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="social-circle"
                >
                  <FacebookIcon />
                </a>
              )}
              {settings?.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  className="social-circle"
                >
                  <YoutubeIcon />
                </a>
              )}
              {settings?.whatsapp_number && (
                <a
                  href={settings.whatsapp_number.startsWith('http') ? settings.whatsapp_number : `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                  className="social-circle"
                >
                  <WhatsAppIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Core Services */}
          <div className="footer-col">
            <h4 className="footer-heading">
              {settings?.footer_services_link ? (
                <Link to={settings.footer_services_link} className="footer-heading-link">
                  {settings?.footer_services_title || 'Services Hub'}
                </Link>
              ) : (
                <span>{settings?.footer_services_title || 'Services Hub'}</span>
              )}
            </h4>
            <ul className="footer-link-list">
              {servicesLinks.map((item, idx) => (
                <li key={idx}>
                  {item.path?.startsWith('http') ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.path || '/services'}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Proprietary Products & Solutions */}
          <div className="footer-col">
            <h4 className="footer-heading">
              {settings?.footer_solutions_title || 'Solutions & Ecosystem'}
            </h4>
            <ul className="footer-link-list">
              {solutionsLinks.map((item, idx) => (
                <li key={idx}>
                  {item.path?.startsWith('http') ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.path || '/products'}>{item.label}</Link>
                  )}
                </li>
              ))}
              {settings?.footer_demo_btn_enabled !== false && (
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => handleOpenAction(settings?.footer_demo_btn_text || 'Schedule Demo')}
                  >
                    {settings?.footer_demo_btn_text || 'Request a Live Demo'}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">
              <Link to="/contact" className="footer-heading-link">
                {settings?.footer_contact_title || 'Contact & Offices'}
              </Link>
            </h4>

            {/* Address 1 */}
            {office1 && (
              <div className="footer-contact-item">
                <MapPin size={18} className="contact-icon text-orange" />
                <div className="contact-details">
                  <strong>{settings?.footer_office_1_label || 'Registered Office:'}</strong>
                  <address className="contact-address">{office1}</address>
                </div>
              </div>
            )}

            {/* Address 2 */}
            {office2 && (
              <div className="footer-contact-item">
                <Building2 size={18} className="contact-icon text-purple" />
                <div className="contact-details">
                  <strong>{settings?.footer_office_2_label || 'Corporate Office:'}</strong>
                  <address className="contact-address">{office2}</address>
                </div>
              </div>
            )}

            {/* Emails */}
            {primaryEmail && (
              <div className="footer-contact-item">
                <Mail size={18} className="contact-icon" />
                <div className="contact-details">
                  <strong>{settings?.footer_email_label || 'Direct Inquiries:'}</strong>
                  <a href={`mailto:${primaryEmail}`} className="contact-link">
                    {primaryEmail}
                  </a>
                </div>
              </div>
            )}

            {/* Phones */}
            {(primaryPhone || secondaryPhone) && (
              <div className="footer-contact-item">
                <Phone size={18} className="contact-icon" />
                <div className="contact-details">
                  <strong>{settings?.footer_phone_label || 'Call / WhatsApp:'}</strong>
                  {primaryPhone && (
                    <a href={`tel:${primaryPhone.replace(/[^\d+]/g, '')}`} className="contact-link">
                      {primaryPhone}
                    </a>
                  )}
                  {secondaryPhone && (
                    <a href={`tel:${secondaryPhone.replace(/[^\d+]/g, '')}`} className="contact-link">
                      {secondaryPhone}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quick newsletter */}
            {settings?.footer_newsletter_enabled !== false && (
              <div className="footer-newsletter mt-3">
                <span className="newsletter-title text-sm font-semibold">
                  {settings?.footer_newsletter_title || 'Stay Updated:'}
                </span>
                {subscribed ? (
                  <div className="subscribe-success text-green-400 flex items-center gap-1 text-xs">
                    <CheckCircle2 size={14} /> Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="newsletter-form mt-1">
                    <input
                      type="email"
                      placeholder={settings?.footer_newsletter_placeholder || 'Enter business email'}
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                    />
                    <button type="submit" aria-label="Subscribe to newsletter">
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copy-text">
            {settings?.copyright_text || COMPANY_INFO.copyright}
          </p>
          <div className="footer-bottom-links">
            {bottomLinks.map((link, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="dot-sep">&bull;</span>}
                {link.path?.startsWith('http') ? (
                  <a href={link.path} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.path || '/'}>{link.label}</Link>
                )}
              </React.Fragment>
            ))}
            {settings?.footer_crafted_text && (
              <>
                <span className="dot-sep">&bull;</span>
                <span className="built-with">
                  {settings.footer_crafted_text}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
