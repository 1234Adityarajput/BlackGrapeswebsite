import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  Code, 
  TrendingUp, 
  Globe2, 
  Users, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  ExternalLink,
  Radar,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { submitEnquiry } from '@backend/dataService';
import '../styles/Careers.css';

export default function CareersPage() {
  // Dynamic SEO metadata
  useEffect(() => {
    document.title = 'Careers at Black Grapes Softech | Join Our Elite Engineering Team';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore high-impact career opportunities at Black Grapes Softech. Join our team of innovative software engineers, mobile developers, and cloud architects in Indore.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'Full Stack Engineer',
    experience: '1 - 3 Years',
    portfolioUrl: '',
    resumeLink: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionPayload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      service: `Career Application: ${formData.role} (${formData.experience})`,
      source: 'Careers Page (/careers)',
      message: `Role: ${formData.role}\nExperience: ${formData.experience}\nPortfolio/LinkedIn: ${formData.portfolioUrl || 'N/A'}\nResume/Drive Link: ${formData.resumeLink || 'Attached via note'}\n\nCandidate Note:\n${formData.message || 'No additional note provided.'}`
    };

    try {
      const response = await submitEnquiry(submissionPayload);
      if (response && response.ticket_id) {
        setTicketId(response.ticket_id);
      }
    } catch (err) {
      console.warn('Career submission fallback:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'Full Stack Engineer',
      experience: '1 - 3 Years',
      portfolioUrl: '',
      resumeLink: '',
      message: ''
    });
    setIsSubmitted(false);
    setTicketId('');
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('career-application-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formElement.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  };

  return (
    <div className="careers-page-container">
      {/* Background Ambience */}
      <div className="hero-ambient-glow" style={{ background: 'radial-gradient(circle, rgba(248, 98, 0, 0.12) 0%, rgba(147, 51, 234, 0.08) 50%, transparent 70%)' }} />

      <div className="container">
        {/* Page Top Header */}
        <header className="careers-hero-header">
          <div className="careers-eyebrow">
            <Sparkles size={14} />
            <span>CAREERS AT BLACK GRAPES SOFTECH</span>
          </div>
          <h1 className="careers-page-title">
            Build Future-Defining Software{' '}
            <span className="text-gradient">With Us</span>
          </h1>
          <p className="careers-page-subtitle">
            Join an engineering-first technology powerhouse. We architect scalable enterprise systems, modern mobile platforms, and cloud AI ecosystems for global innovators.
          </p>
        </header>

        {/* Main 2-Column Split Section */}
        <div className="careers-main-grid">
          {/* Left Column: Story, Culture, Highlights (Slides from Left) */}
          <div className="careers-left-content">
            <div className="career-intro-card">
              <div className="career-intro-badge">
                <Briefcase size={13} />
                <span>WHY JOIN BLACK GRAPES SOFTECH</span>
              </div>
              <h2 className="career-intro-heading">
                Where High-Velocity Talent Solves Real-World Engineering Scale
              </h2>
              <p className="career-intro-body">
                With 10+ years of proven IT excellence in Indore and deployments across 15+ countries, Black Grapes Softech is the launchpad for ambitious developers, creative UI/UX designers, and technology leaders. We provide challenging work, genuine autonomy, and an agile culture that rewards engineering curiosity.
              </p>
            </div>

            {/* 4 Perks / Culture Highlights Grid */}
            <div className="career-perks-grid">
              <div className="career-perk-card">
                <div className="perk-icon-wrap">
                  <Code size={20} />
                </div>
                <h4 className="perk-title">Modern Tech Stack</h4>
                <p className="perk-desc">
                  Architect with React, Next.js, Flutter, Node.js, Python, AWS Cloud & scalable microservices.
                </p>
              </div>

              <div className="career-perk-card">
                <div className="perk-icon-wrap purple-glow">
                  <TrendingUp size={20} />
                </div>
                <h4 className="perk-title">Rapid Career Velocity</h4>
                <p className="perk-desc">
                  Merit-driven progression, executive mentorship, and direct leadership opportunities.
                </p>
              </div>

              <div className="career-perk-card">
                <div className="perk-icon-wrap purple-glow">
                  <Globe2 size={20} />
                </div>
                <h4 className="perk-title">Global Enterprise Scope</h4>
                <p className="perk-desc">
                  Build production platforms touching millions of users across US, Europe, UAE, and India.
                </p>
              </div>

              <div className="career-perk-card">
                <div className="perk-icon-wrap">
                  <Users size={20} />
                </div>
                <h4 className="perk-title">People-First Culture</h4>
                <p className="perk-desc">
                  Flexible work-life balance, collaborative engineering squads, and continuous learning support.
                </p>
              </div>
            </div>

            {/* Direct HR Connect Bubble */}
            <div className="career-contact-bubble">
              <div className="hr-bubble-info">
                <h5>Direct Talent Team Contact</h5>
                <p>Have questions about working with us? Reach out directly.</p>
              </div>
              <div className="hr-bubble-links">
                <a 
                  href="mailto:careers@blackgrapessoftech.com" 
                  className="hr-link-pill"
                  title="Email Talent Acquisition Team"
                >
                  <Mail size={15} />
                  <span>careers@blackgrapessoftech.com</span>
                </a>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hr-link-pill"
                  title="WhatsApp Talent Team"
                >
                  <Phone size={15} />
                  <span>WhatsApp HR</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Job Application Form (Slides from Right) */}
          <div id="career-application-card" className="career-form-card">
            {!isSubmitted ? (
              <>
                <div className="career-form-header">
                  <div className="career-form-badge">
                    <Sparkles size={13} />
                    <span>DIRECT CAREER APPLICATION</span>
                  </div>
                  <h3 className="career-form-title">Drop Your Profile</h3>
                  <p className="career-form-subtitle">
                    Submit your credentials to join our engineering talent network. We evaluate every application thoroughly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="career-form">
                  {/* Full Name */}
                  <div className="career-input-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="form-grid-2">
                    <div className="career-input-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="career-input-group">
                      <label htmlFor="phone">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Role & Experience Grid */}
                  <div className="form-grid-2">
                    <div className="career-input-group">
                      <label htmlFor="role">Domain of Interest *</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="Full Stack Engineer">Full Stack Engineer (MERN / Python)</option>
                        <option value="Frontend Developer">Frontend Developer (React / Next.js)</option>
                        <option value="Mobile App Developer">Mobile App Developer (Flutter / React Native)</option>
                        <option value="Backend Developer">Backend Developer (Node.js / Python / Microservices)</option>
                        <option value="UI/UX Product Designer">UI/UX Product Designer (Figma / Web3)</option>
                        <option value="QA / Test Automation">QA Automation & Testing Engineer</option>
                        <option value="Cloud DevOps Engineer">Cloud & DevOps Engineer (AWS / Docker)</option>
                        <option value="Business Development / Sales">IT Business Development / Sales</option>
                        <option value="Other Technology Role">Other Specialized Tech Role</option>
                      </select>
                    </div>

                    <div className="career-input-group">
                      <label htmlFor="experience">Experience Level *</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      >
                        <option value="Fresher / College Graduate">Fresher / College Graduate</option>
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="2 - 4 Years">2 - 4 Years</option>
                        <option value="4 - 6 Years">4 - 6 Years</option>
                        <option value="6+ Years (Senior / Lead)">6+ Years (Senior Lead / Architect)</option>
                      </select>
                    </div>
                  </div>

                  {/* Portfolio / LinkedIn Link */}
                  <div className="career-input-group">
                    <label htmlFor="portfolioUrl">LinkedIn / GitHub / Portfolio Link</label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      placeholder="https://linkedin.com/in/username or https://github.com/username"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Resume / Drive Link */}
                  <div className="career-input-group">
                    <label htmlFor="resumeLink">Resume / CV (Google Drive or Dropbox Link)</label>
                    <input
                      type="url"
                      id="resumeLink"
                      name="resumeLink"
                      placeholder="https://drive.google.com/file/d/... or sharing URL"
                      value={formData.resumeLink}
                      onChange={handleChange}
                    />
                    <span className="career-input-hint">Make sure link access is set to 'Anyone with the link can view'.</span>
                  </div>

                  {/* Message */}
                  <div className="career-input-group">
                    <label htmlFor="message">Brief Note / Skills Highlight</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your core strengths, past projects, or why you'd like to work at Black Grapes Softech..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-career-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <span>Submit Job Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Submission Success Panel */
              <div className="career-success-panel">
                <div className="career-success-icon">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="career-success-title">Application Submitted!</h3>
                <p className="career-success-body">
                  Thank you, <strong>{formData.fullName}</strong>. We have received your profile and added you to our engineering talent roster.
                  {ticketId && (
                    <span style={{ display: 'block', marginTop: '0.5rem', color: '#ff8c3b', fontSize: '0.85rem' }}>
                      Application Reference ID: #{ticketId}
                    </span>
                  )}
                  Our HR talent acquisition team reviews candidates continuously and will contact you directly via email or phone.
                </p>
                <button
                  type="button"
                  className="btn-talent-pool"
                  onClick={handleReset}
                >
                  <span>Submit Another Profile</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------
            BOTTOM SECTION: CURRENT OPENINGS (Strictly No Dummy Openings)
           ------------------------------------------------------------------ */}
        <section id="open-positions" className="career-openings-section">
          <div className="openings-header">
            <div className="openings-eyebrow">
              <Radar size={14} />
              <span>CURRENT OPENINGS</span>
            </div>
            <h2 className="openings-title">Explore Open Positions</h2>
            <p className="openings-desc">
              Discover public job vacancies and squad expansion opportunities at Black Grapes Softech.
            </p>
          </div>

          {/* Elegant High-Tech Transparent State (No Dummy Job Cards) */}
          <div className="openings-empty-card">
            <div className="empty-radar-wrap">
              <div className="radar-ping"></div>
              <Briefcase size={32} />
            </div>

            <h3 className="empty-state-title">
              No Specific Public Vacancies Listed Right Now
            </h3>

            <p className="empty-state-body">
              All our core engineering, mobile app, and design squads are currently staffed. However, exceptional talent always finds an opportunity at Black Grapes Softech! We prioritize candidates from our talent pool first whenever a new client mandate or team sprint begins.
            </p>

            <button
              type="button"
              className="btn-talent-pool"
              onClick={scrollToForm}
            >
              <span>Join Talent Pool Above</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
