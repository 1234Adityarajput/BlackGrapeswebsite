import React, { useState, useRef } from 'react';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Award,
  DollarSign,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  ExternalLink,
  ChevronRight,
  Code,
  TrendingUp,
  Globe,
  BookOpen,
  Mail,
  MessageSquare,
  Flame,
  Check
} from 'lucide-react';
import { useCareersPage } from '@backend/useContent';
import { submitJobApplication } from '@backend/dataService';
import '../styles/Careers.css';

const ICON_MAP = {
  Code,
  TrendingUp,
  Globe,
  BookOpen,
  Briefcase,
  Award,
  DollarSign,
  Building
};

export default function CareersPage() {
  const { careersData } = useCareersPage();
  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    domain: 'Full Stack Engineer (MERN / Next.js)',
    experience: 'Fresher / College Graduate',
    portfolioUrl: '',
    resumeUrl: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Dynamic data with live defaults from Screenshot 1 & 2
  const isOldDummyData = Boolean(
    careersData?.heroBadge?.includes('WE ARE HIRING') ||
    careersData?.heroTitle?.includes('Digital Engineering')
  );
  const safeData = isOldDummyData ? null : careersData;

  const heroBadge = safeData?.heroBadge || '# CAREERS AT BLACK GRAPES SOFTECH';
  const heroTitle = safeData?.heroTitle || 'Build Future-Defining Software';
  const heroTitleAccent = safeData?.heroTitleAccent || 'With Us';
  const heroSubtitle = safeData?.heroSubtitle || 'Join an engineering-first technology powerhouse. We architect scalable enterprise systems, modern mobile platforms, and cloud AI ecosystems for global innovators.';

  const whyJoin = safeData?.whyJoin || {
    badge: 'WHY JOIN BLACK GRAPES SOFTECH',
    title: 'Where High-Velocity Talent Solves Real-World Engineering Scale',
    paragraph: 'With 10+ years of proven IT excellence in Indore and deployments across 15+ countries, Black Grapes Softech is the launchpad for ambitious developers, creative UI/UX designers, and technology leaders. We provide challenging work, genuine autonomy, and an agile culture that rewards engineering curiosity.',
    pillars: [
      {
        id: 'pillar-1',
        title: 'Modern Tech Stack',
        desc: 'Architect with React, Next.js, Flutter, Node.js, Python, AWS Cloud & scalable microservices.',
        icon: 'Code'
      },
      {
        id: 'pillar-2',
        title: 'Rapid Career Velocity',
        desc: 'Merit-driven progression, executive mentorship, and direct leadership opportunities.',
        icon: 'TrendingUp'
      },
      {
        id: 'pillar-3',
        title: 'Global Impact & Deployments',
        desc: 'Build high-scale enterprise platforms deployed across 15+ countries and India.',
        icon: 'Globe'
      },
      {
        id: 'pillar-4',
        title: 'Continuous Tech Upgrades',
        desc: 'Sponsored technical certifications, internal hackathons, and advanced learning support.',
        icon: 'BookOpen'
      }
    ],
    contactCard: {
      title: 'Direct Talent Team Contact',
      subtitle: 'Have questions about working with us? Reach out directly.',
      email: 'careers@blackgrapessoftech.com',
      whatsapp: '+91 7470997884',
      whatsappLabel: 'WhatsApp HR →'
    }
  };

  const appFormConfig = safeData?.applicationForm || {
    badge: 'DIRECT CAREER APPLICATION',
    title: 'Drop Your Profile',
    subtitle: 'Submit your credentials to join our engineering talent network. We evaluate every application thoroughly.',
    domains: [
      'Full Stack Engineer (MERN / Next.js)',
      'Mobile App Developer (Flutter / React Native)',
      'UI/UX Designer & Motion Creative',
      'Python & AI Backend Engineer',
      'QA Automation Engineer',
      'Business Development / IT Sales',
      'Digital Marketing & SEO Specialist',
      'Other / General Application'
    ],
    experienceLevels: [
      'Fresher / College Graduate',
      '1 - 2 Years (Junior Developer)',
      '2 - 5 Years (Mid-Level Engineer)',
      '5+ Years (Senior / Technical Lead)'
    ],
    submitBtnText: 'Submit Job Application ✈'
  };

  const openingsSection = safeData?.openingsSection || {
    badge: 'CURRENT OPENINGS',
    title: 'Explore Open Positions',
    subtitle: 'Discover public job vacancies and squad expansion opportunities at Black Grapes Softech.',
    emptyState: {
      title: 'No Specific Public Vacancies Listed Right Now',
      desc: 'All our core engineering, mobile app, and design squads are currently staffed. However, exceptional talent always finds an opportunity at Black Grapes Softech! We prioritize candidates from our talent pool first whenever a new client mandate or team sprint begins.',
      ctaText: 'Join Talent Pool Above ↗'
    }
  };

  const openings = safeData?.openings || [];

  const scrollToForm = (prefillDomain = null) => {
    if (prefillDomain) {
      setFormState((prev) => ({ ...prev, domain: prefillDomain }));
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        if (nameInputRef.current) nameInputRef.current.focus();
      }, 500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formState.name.trim() || !formState.email.trim() || !formState.phone.trim()) {
      setErrorMessage('Please fill in your name, email address, and contact number.');
      return;
    }

    setSubmitting(true);
    try {
      await submitJobApplication({
        name: formState.name.trim(),
        email: formState.email.trim(),
        phone: formState.phone.trim(),
        position: formState.domain,
        experience: formState.experience,
        portfolioUrl: formState.portfolioUrl.trim(),
        resumeUrl: formState.resumeUrl.trim(),
        message: formState.message.trim()
      });

      setSubmitting(false);
      setSubmitSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        domain: appFormConfig.domains?.[0] || 'Full Stack Engineer (MERN / Next.js)',
        experience: appFormConfig.experienceLevels?.[0] || 'Fresher / College Graduate',
        portfolioUrl: '',
        resumeUrl: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    } catch (err) {
      setSubmitting(false);
      setErrorMessage('Could not send application right now. Please email directly to careers@blackgrapessoftech.com');
    }
  };

  return (
    <div className="careers-page-wrapper">
      {/* Background Glows */}
      <div className="careers-bg-glow-top"></div>
      <div className="careers-bg-glow-right"></div>

      <div className="container careers-container">
        {/* ================================================================= */}
        {/* HERO HEADER (Screenshot 1)                                       */}
        {/* ================================================================= */}
        <section className="careers-hero-section text-center">
          <div className="careers-badge-pill">
            {!heroBadge?.startsWith('#') && <Sparkles size={14} className="badge-sparkle-icon" />}
            <span>{heroBadge}</span>
          </div>

          <h1 className="careers-hero-title">
            {heroTitle} <span className="text-orange-gradient">{heroTitleAccent}</span>
          </h1>

          <p className="careers-hero-subtitle">
            {heroSubtitle}
          </p>
        </section>

        {/* ================================================================= */}
        {/* TWO-COLUMN LAYOUT: WHY JOIN & DROP YOUR PROFILE FORM              */}
        {/* ================================================================= */}
        <section className="careers-grid-section">
          {/* LEFT COLUMN: Why Join Black Grapes Softech */}
          <div className="careers-why-column">
            <div className="careers-sub-badge">
              <span>✦</span>
              <span>{whyJoin.badge}</span>
            </div>

            <h2 className="careers-why-heading">
              {whyJoin.title}
            </h2>

            <p className="careers-why-lead">
              {whyJoin.paragraph}
            </p>

            {/* 4 Feature Pillars Grid */}
            <div className="careers-pillars-grid">
              {(whyJoin.pillars || []).map((pillar) => {
                const IconComponent = ICON_MAP[pillar.icon] || Code;
                return (
                  <div key={pillar.id} className="careers-pillar-card">
                    <div className="pillar-icon-box">
                      <IconComponent size={20} />
                    </div>
                    <div className="pillar-content">
                      <h3 className="pillar-title">{pillar.title}</h3>
                      <p className="pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Talent Team Contact Box */}
            {whyJoin.contactCard && (
              <div className="careers-direct-contact-card">
                <div className="direct-contact-header">
                  <h4 className="direct-contact-title">{whyJoin.contactCard.title}</h4>
                  <p className="direct-contact-sub">{whyJoin.contactCard.subtitle}</p>
                </div>
                <div className="direct-contact-links">
                  <a
                    href={`mailto:${whyJoin.contactCard.email || 'careers@blackgrapessoftech.com'}`}
                    className="talent-link talent-email-link"
                  >
                    <Mail size={16} />
                    <span>{whyJoin.contactCard.email || 'careers@blackgrapessoftech.com'}</span>
                  </a>
                  <a
                    href={`https://wa.me/${(whyJoin.contactCard.whatsapp || '917470997884').replace(/[^0-9]/g, '')}?text=Hello%20HR,%20I%20am%20interested%20in%20career%20opportunities%20at%20Black%20Grapes%20Softech`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="talent-link talent-whatsapp-link"
                  >
                    <MessageSquare size={16} />
                    <span>{whyJoin.contactCard.whatsappLabel || 'WhatsApp HR →'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Drop Your Profile Form Card */}
          <div className="careers-form-column" ref={formRef} id="profile-form">
            <div className="careers-form-card">
              <div className="form-card-glow-bar"></div>

              <div className="form-card-header">
                <div className="careers-sub-badge form-badge">
                  <span>✦</span>
                  <span>{appFormConfig.badge}</span>
                </div>
                <h3 className="form-card-title">{appFormConfig.title}</h3>
                <p className="form-card-sub">{appFormConfig.subtitle}</p>
              </div>

              {submitSuccess ? (
                <div className="form-success-alert">
                  <CheckCircle2 size={36} color="#10b981" />
                  <h4>Profile Submitted Successfully!</h4>
                  <p>
                    Thank you for applying. Our talent acquisition team will review your credentials and contact you within 24 to 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="careers-profile-form">
                  {errorMessage && (
                    <div className="form-error-banner">
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="careers-field-group">
                    <label className="careers-field-label">Full Name *</label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      className="careers-field-input"
                      placeholder="e.g. Rahul Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="careers-field-row">
                    <div className="careers-field-group">
                      <label className="careers-field-label">Email Address *</label>
                      <input
                        type="email"
                        className="careers-field-input"
                        placeholder="you@domain.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="careers-field-group">
                      <label className="careers-field-label">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="careers-field-input"
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="careers-field-row">
                    <div className="careers-field-group">
                      <label className="careers-field-label">Domain of Interest *</label>
                      <select
                        className="careers-field-select"
                        value={formState.domain}
                        onChange={(e) => setFormState({ ...formState, domain: e.target.value })}
                      >
                        {(appFormConfig.domains || []).map((d, idx) => (
                          <option key={idx} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="careers-field-group">
                      <label className="careers-field-label">Experience Level *</label>
                      <select
                        className="careers-field-select"
                        value={formState.experience}
                        onChange={(e) => setFormState({ ...formState, experience: e.target.value })}
                      >
                        {(appFormConfig.experienceLevels || []).map((lvl, idx) => (
                          <option key={idx} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="careers-field-group">
                    <label className="careers-field-label">LinkedIn / GitHub / Portfolio Link</label>
                    <input
                      type="url"
                      className="careers-field-input"
                      placeholder="https://linkedin.com/in/username or https://github.com/username"
                      value={formState.portfolioUrl}
                      onChange={(e) => setFormState({ ...formState, portfolioUrl: e.target.value })}
                    />
                  </div>

                  <div className="careers-field-group">
                    <label className="careers-field-label">Resume / CV (Google Drive or Dropbox Link)</label>
                    <input
                      type="url"
                      className="careers-field-input"
                      placeholder="https://drive.google.com/file/d/... or public URL"
                      value={formState.resumeUrl}
                      onChange={(e) => setFormState({ ...formState, resumeUrl: e.target.value })}
                    />
                  </div>

                  <div className="careers-field-group">
                    <label className="careers-field-label">Tell Us About Yourself / Strengths</label>
                    <textarea
                      rows={3}
                      className="careers-field-textarea"
                      placeholder="Tell us about your core strengths, past projects, or why you'd like to work at Black Grapes Softech..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="careers-submit-btn"
                    disabled={submitting}
                  >
                    <span>{submitting ? 'Submitting Credentials...' : appFormConfig.submitBtnText || 'Submit Job Application ✈'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CURRENT OPENINGS (Screenshot 2)                                   */}
        {/* ================================================================= */}
        <section className="careers-openings-section" id="openings">
          <div className="openings-section-header text-center">
            <div className="careers-badge-pill">
              <Flame size={14} className="badge-flame-icon" />
              <span>{openingsSection.badge}</span>
            </div>
            <h2 className="openings-section-title">
              {openingsSection.title}
            </h2>
            <p className="openings-section-sub">
              {openingsSection.subtitle}
            </p>
          </div>

          {/* Condition: If No Openings Exist, Show The Exact Screenshot 2 Banner */}
          {openings.length === 0 ? (
            <div className="careers-talent-pool-card text-center">
              <div className="talent-pool-icon-wrap">
                <Briefcase size={32} />
              </div>

              <h3 className="talent-pool-title">
                {openingsSection.emptyState?.title || 'No Specific Public Vacancies Listed Right Now'}
              </h3>

              <p className="talent-pool-desc">
                {openingsSection.emptyState?.desc ||
                  'All our core engineering, mobile app, and design squads are currently staffed. However, exceptional talent always finds an opportunity at Black Grapes Softech! We prioritize candidates from our talent pool first whenever a new client mandate or team sprint begins.'}
              </p>

              <button
                type="button"
                className="talent-pool-cta-btn"
                onClick={() => scrollToForm()}
              >
                <span>{openingsSection.emptyState?.ctaText || 'Join Talent Pool Above ↗'}</span>
              </button>
            </div>
          ) : (
            /* If Openings Are Added Via Admin, Display Them Professionally */
            <div className="careers-openings-grid">
              {openings.map((job) => (
                <div key={job.id} className="career-job-card">
                  <div className="job-card-top">
                    <span className="job-dept-tag">{job.department || 'Engineering'}</span>
                    <span className="job-type-tag">{job.type || 'Full-Time'}</span>
                  </div>
                  <h3 className="job-card-title">{job.title}</h3>
                  <div className="job-meta-row">
                    <span><MapPin size={14} /> {job.location || 'Indore, MP'}</span>
                    <span><Award size={14} /> {job.experience || 'Experienced'}</span>
                    {job.salary && <span><DollarSign size={14} /> {job.salary}</span>}
                  </div>
                  <p className="job-card-overview">{job.overview}</p>
                  <button
                    type="button"
                    className="job-apply-cta-btn"
                    onClick={() => scrollToForm(job.title)}
                  >
                    <span>Apply For This Position →</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
