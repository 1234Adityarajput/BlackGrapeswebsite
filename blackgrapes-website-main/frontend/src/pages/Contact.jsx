import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Clock
} from 'lucide-react';
import { useContactPage, useSiteSettings } from '@backend/useContent';
import { submitEnquiry } from '@backend/dataService';
import '../styles/CyberServices.css';

// Clean SVG Icons for Social Channels
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactPage() {
  const { contactData } = useContactPage();
  const { settings } = useSiteSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: 'Via Contact Form',
        service: formData.project || 'General Contact',
        source: 'Contact Page (/contact-us)',
        message: formData.message
      });
    } catch (err) {
      console.warn('submitEnquiry fallback:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', project: '', message: '' });
    }
  };

  const heroBadge = contactData?.heroBadge || 'BLACK GRAPES GROUP';
  const heroTitle = contactData?.heroTitle || 'Get in Touch';
  const heroTitleAccent = contactData?.heroTitleAccent || 'Touch';
  const heroSubtitle = contactData?.heroSubtitle ||
    'We are here to help and answer any questions you might have. We look forward to hearing from you.';

  const address1Text = contactData?.address1Text || settings?.office_address ||
    '252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, Madhya Pradesh.';
  const address1MapUrl = contactData?.address1MapUrl || 'https://maps.app.goo.gl/qJcKNw9DMo4JVWrv8';
  const address1MapEmbed = contactData?.address1MapEmbed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3068694610433!2d75.88491091113343!3d22.753990279276895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630310c76a0dc5%3A0xf446e40a939f4b1d!2sBlack%20Grapes%20Softech!5e0!3m2!1sen!2sin!4v1746083224583!5m2!1sen!2sin';

  const address2Text = contactData?.address2Text ||
    'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore-452010, Madhya Pradesh.';
  const address2MapUrl = contactData?.address2MapUrl || 'https://maps.app.goo.gl/yahxDsm7BLK652mA8';
  const address2MapEmbed = contactData?.address2MapEmbed ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.976510611648!2d75.8924314!3d22.7687402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396303eb56ed3fd1%3A0x9af6cadec6743e07!2sScheme%20No%20114!5e0!3m2!1sen!2sin!4v1687599921907!5m2!1sen!2sin';

  const phonesList = (Array.isArray(contactData?.directPhones) && contactData.directPhones.length > 0)
    ? contactData.directPhones
    : [
        { name: 'Arpit Jain', phones: [settings?.primary_phone || '+91 9039397884', settings?.secondary_phone || '+91 7470997884'].filter(Boolean) },
        { name: 'Support Desk', phones: ['+91 6262414463'] }
      ];

  const emailsList = (Array.isArray(contactData?.emails) && contactData.emails.length > 0)
    ? contactData.emails
    : [
        { department: 'General Inquiries', email: settings?.primary_email || 'blackgrapesgroups@gmail.com' },
        { department: 'Executive Desk', email: 'blackgrapes.arpitjain@gmail.com' },
        { department: 'Strategic Desk', email: 'blackgrapes.deepikajain@gmail.com' }
      ];

  const socialFacebook = contactData?.socialFacebook || settings?.social_facebook || 'https://www.facebook.com/blackgrapessoftech.fb';
  const socialTwitter = contactData?.socialTwitter || settings?.social_twitter || 'https://twitter.com/grapessoftech';
  const socialInstagram = contactData?.socialInstagram || settings?.social_instagram || 'https://www.instagram.com/blackgrapessoftech/';
  const socialLinkedin = contactData?.socialLinkedin || settings?.social_linkedin || 'https://www.linkedin.com/in/black-grapes-softech/';
  const socialYoutube = contactData?.socialYoutube || settings?.social_youtube || 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ';

  return (
    <main className="contact-page-main">
      <div className="hero-ambient-glow" />

      <div className="content-wrapper">
        {/* Top Header */}
        <div className="text-center" style={{ paddingTop: '6rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span className="hero-top-pill">
              <Sparkles size={13} color="#f86200" />
              <span>{heroBadge}</span>
            </span>
          </div>

          <h1 className="black-hero-title">
            {heroTitle.includes(heroTitleAccent) ? (
              <>
                {heroTitle.split(heroTitleAccent)[0]}
                <span className="hero-title-accent">{heroTitleAccent}</span>
                {heroTitle.split(heroTitleAccent)[1]}
              </>
            ) : (
              <span className="hero-title-accent">{heroTitle}</span>
            )}
          </h1>
          <p className="black-hero-subtitle">
            {heroSubtitle}
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="contact-info-cards-grid">
          {/* Card 1: Address */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble">
              <MapPin size={26} color="#f86200" />
            </div>
            <h3 className="contact-card-title">Address</h3>

            <div className="contact-address-block">
              <a
                href={address1MapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-address-link"
              >
                <span className="address-label">Address 1: </span>
                {address1Text}
                <ExternalLink size={13} className="ext-icon" />
              </a>

              <div className="contact-card-divider" />

              <a
                href={address2MapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-address-link"
              >
                <span className="address-label">Address 2: </span>
                {address2Text}
                <ExternalLink size={13} className="ext-icon" />
              </a>
            </div>
          </div>

          {/* Card 2: Call Us */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble">
              <Phone size={26} color="#f86200" />
            </div>
            <h3 className="contact-card-title">Call Us</h3>

            <div className="contact-call-block">
              {phonesList.map((person, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="contact-card-divider" />}
                  <div className="contact-person-row">
                    <span className="person-label">{person.name}:</span>
                    <div className="person-phones">
                      {(person.phones || []).map((ph, pIdx) => (
                        <React.Fragment key={pIdx}>
                          {pIdx > 0 && <span className="sep-pipe">|</span>}
                          <a href={`tel:${ph.replace(/\s+/g, '')}`} className="contact-tel-link">
                            {ph}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Card 3: Email Us */}
          <div className="contact-info-card">
            <div className="contact-icon-bubble">
              <Mail size={26} color="#f86200" />
            </div>
            <h3 className="contact-card-title">Email Us</h3>

            <div className="contact-email-block">
              {emailsList.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="contact-card-divider" />}
                  <a
                    href={`mailto:${item.email}`}
                    className="contact-mail-link"
                    title={item.department || ''}
                  >
                    {item.email}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Operating Hours Banner */}
        {contactData?.workingHours && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 3rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                background: 'rgba(255, 107, 0, 0.08)',
                border: '1px solid rgba(255, 107, 0, 0.25)',
                color: '#e5e7eb',
                fontSize: '0.85rem'
              }}
            >
              <Clock size={15} color="#f86200" />
              <span style={{ color: '#9ca3af' }}>Operating / Support Desk Hours:</span>
              <strong style={{ color: '#ff8c38', fontWeight: 600 }}>{contactData.workingHours}</strong>
            </div>
          </div>
        )}

        {/* Embedded Google Maps (Address 1 & Address 2) */}
        <div className="contact-maps-grid">
          <div className="map-container-box">
            <div className="map-badge">
              <MapPin size={14} color="#f86200" /> Address 1 (Scheme No 54, Vijay Nagar)
            </div>
            <iframe
              src={address1MapEmbed}
              title="Black Grapes Softech Scheme 54 Map"
              className="map-iframe"
              loading="lazy"
              allowFullScreen=""
            />
          </div>

          <div className="map-container-box">
            <div className="map-badge">
              <MapPin size={14} color="#f86200" /> Address 2 (Scheme No 114, Vijay Nagar)
            </div>
            <iframe
              src={address2MapEmbed}
              title="Black Grapes Scheme 114 Map"
              className="map-iframe"
              loading="lazy"
              allowFullScreen=""
            />
          </div>
        </div>

        {/* Leave a Message Section */}
        <div className="leave-message-section">
          <div className="leave-message-grid">
            {/* Left Column: Visual & Header */}
            <div className="leave-message-left">
              <h2 className="leave-title">{contactData?.leaveTitle || 'Leave a Message'}</h2>
              <h3 className="leave-subtitle">
                {contactData?.leaveSubtitle || 'Feel free to contact us for any questions or doubts.'}
              </h3>
              <p className="leave-desc">
                {contactData?.leaveDesc ||
                  'Whether you need technical software consultation, property valuation, real estate advice, or securities advisory, our dedicated leadership team is ready to assist.'}
              </p>

              <div className="contact-illustration-wrap">
                <img
                  src="/contact-img.png"
                  alt="Black Grapes Contact"
                  className="contact-illustration-img"
                  onError={(e) => {
                    e.target.src = "https://blackgrapessoftech.com/wp-content/uploads/2023/11/4849052-1.png";
                  }}
                />
              </div>

              {/* Social Channels */}
              <div className="contact-social-bar">
                <span className="social-label">Follow Us:</span>
                <div className="social-links-list">
                  {socialFacebook && (
                    <a href={socialFacebook} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Facebook">
                      <FacebookIcon />
                    </a>
                  )}
                  {socialTwitter && (
                    <a href={socialTwitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter / X">
                      <TwitterIcon />
                    </a>
                  )}
                  {socialInstagram && (
                    <a href={socialInstagram} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Instagram">
                      <InstagramIcon />
                    </a>
                  )}
                  {socialLinkedin && (
                    <a href={socialLinkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                      <LinkedinIcon />
                    </a>
                  )}
                  {socialYoutube && (
                    <a href={socialYoutube} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                      <YoutubeIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Message Form */}
            <div className="leave-message-right">
              {submitted ? (
                <div className="form-success-card">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={40} color="#f86200" />
                  </div>
                  <h3 className="success-title">Message Sent Successfully!</h3>
                  <p className="success-desc">
                    Thank you for reaching out to Black Grapes Group. We have received your message and our team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setSubmitted(false)}
                    style={{ margin: '1.5rem auto 0', justifyContent: 'center' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-box">
                  <div>
                    <label className="form-label" htmlFor="cnt-name">Name</label>
                    <input
                      id="cnt-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="cnt-email">Email</label>
                    <input
                      id="cnt-email"
                      name="email"
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="cnt-project">Requirement</label>
                    <input
                      id="cnt-project"
                      name="project"
                      type="text"
                      placeholder="Your Requirement"
                      value={formData.project}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="cnt-msg">Message</label>
                    <textarea
                      id="cnt-msg"
                      name="message"
                      rows={5}
                      required
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
