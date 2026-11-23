import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  Phone,
  Mail,
  UserCheck,
  GraduationCap,
  Send,
  FileText,
  Building2,
  Quote,
  Check,
  X,
  MessageCircle,
  Layers,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Star,
  Zap,
  Globe,
  Flame
} from 'lucide-react';
import { useITStaffing } from '@backend/useContent';
import { submitEnquiry } from '@backend/dataService';
import AnimatedCounter from '../components/AnimatedCounter';
import '../styles/CyberServices.css';

export default function ITStaffingPage({ onOpenContact }) {
  const { staffingData } = useITStaffing();

  // Sanitized Hero Content (prevents test data or duplicate accents from displaying)
  const rawBadge = (staffingData?.badge || '').trim();
  const heroBadge = (!rawBadge || rawBadge.toUpperCase().includes('TEST'))
    ? 'BLACK GRAPES SOFTECH • IT STAFFING & MANPOWER SOLUTIONS'
    : rawBadge;

  const rawHeadline = (staffingData?.headline || '').trim();
  const rawAccent = (staffingData?.headlineAccent || '').trim();
  let heroHeadline = rawHeadline;
  let heroAccent = rawAccent || 'hiring contractual staff';
  if (!heroHeadline || heroHeadline.includes('hiring contractual staff') || heroHeadline.toUpperCase().includes('TEST')) {
    heroHeadline = 'Stay on course with growth plans by';
    heroAccent = 'hiring contractual staff';
  }

  const rawSubtitle = (staffingData?.subtitle || '').trim();
  const heroSubtitle = (!rawSubtitle || rawSubtitle.toLowerCase().includes('test'))
    ? 'Outsource your manpower needs with prompt.'
    : rawSubtitle;

  const heroDesc = (staffingData?.description && !staffingData.description.toLowerCase().includes('test'))
    ? staffingData.description.trim()
    : 'Deploy pre-vetted senior software engineers, technical squads, and bulk contractual staff across 28 Indian states with full statutory compliance, zero long-term liabilities, and guaranteed rapid onboarding.';

  const staffingServicesList = (Array.isArray(staffingData?.staffingServices) && staffingData.staffingServices.length > 0)
    ? staffingData.staffingServices
    : [
        'NAPS/Apprenticeship Hiring',
        'Bulk Hiring',
        'Diversity Hiring',
        'Gig Hiring/Flexi Staffing',
        'General Staffing/Payroll Management',
        'IT/Technical Hiring'
      ];

  const mandateOptionsList = (Array.isArray(staffingData?.mandateOptions) && staffingData.mandateOptions.length > 0)
    ? staffingData.mandateOptions
    : ['1-10', '10-50', '51-100', '101+'];

  const statsList = (Array.isArray(staffingData?.stats) && staffingData.stats.length > 0)
    ? staffingData.stats
    : [
        { value: '25,000+', label: 'Contract Staff Deployed', desc: 'Active workforce deployed across PAN-India client locations' },
        { value: '28 States', label: 'Full Statutory Compliance', desc: 'Complete PF, ESIC, Professional Tax & state labour laws adherence' },
        { value: '48-72h', label: 'Rapid Onboarding SLA', desc: 'Swift talent turnaround from requirement mandate to active kickoff' },
        { value: '98.4%', label: 'Client Retention Rate', desc: 'Trusted by leading Fortune enterprises, MNCs & Indian startups' }
      ];
  // Hero Lead Form State
  const [heroForm, setHeroForm] = useState({
    fullName: '',
    companyName: '',
    companyEmail: '',
    mobileNumber: '',
    service: 'IT/Technical Hiring',
    mandates: '10-50'
  });
  const [heroFormSubmitting, setHeroFormSubmitting] = useState(false);
  const [heroFormSuccess, setHeroFormSuccess] = useState(false);

  // Modal Inquiry Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Enquiry'); // 'Enquiry', 'Request a Demo', 'Get the offer'
  const [modalForm, setModalForm] = useState({
    name: '',
    email: '',
    contact: '',
    requirement: 'IT/Technical Hiring',
    message: ''
  });
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  // Interactive Testimonial Carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const staffingServices = [
    'NAPS/Apprenticeship Hiring',
    'Bulk Hiring',
    'Diversity Hiring',
    'Gig Hiring/Flexi Staffing',
    'General Staffing/Payroll Management',
    'IT/Technical Hiring'
  ];

  const mandateOptions = ['1-10', '10-50', '51-100', '101+'];

  const defaultScenarios = [
    {
      title: 'Tight Deployment Deadlines',
      desc: 'Your expansion timeline hinges on quickly deploying contract staff onsite, often with tight deadlines and high performance stakes.',
      tag: 'Critical Scenario 01',
      icon: 'Clock'
    },
    {
      title: 'HR Time & Bandwidth Drain',
      desc: 'Your HR department consistently requires contract staff, leading to significant time spent on sourcing, training, and onboarding.',
      tag: 'Critical Scenario 02',
      icon: 'Users'
    },
    {
      title: 'Full HR Assistance',
      desc: 'You might require additional HR assistance. This is where we can offer support! We take over sourcing, background checks, and payroll management.',
      btnText: 'Request HR Support',
      icon: 'Award'
    }
  ];

  const scenariosList = (Array.isArray(staffingData?.scenarios) && staffingData.scenarios.length > 0)
    ? staffingData.scenarios
    : defaultScenarios;

  const defaultWays = [
    {
      number: '01',
      title: 'Bulk Hiring of Contractual Staff for your Company',
      desc: 'Rapid multi-city deployment of technical squads, developers, QA engineers, and operations staff. Pre-screened talent pools ready for immediate onsite or remote integration.',
      btnText: 'Learn More About Bulk Hiring',
      icon: 'UserCheck'
    },
    {
      number: '02',
      title: 'Managing End to End Payroll Operations',
      desc: 'Comprehensive payroll processing, salary disbursement, digital employee self-service slips, TDS calculations, and full monthly statutory filings with zero compliance slip-ups.',
      btnText: 'Learn More About Payroll Management',
      icon: 'FileText'
    },
    {
      number: '03',
      title: 'Allowing You to Focus on Core Competencies',
      desc: 'Relieve leadership and core department heads from staffing friction. Focus 100% on product development, client acquisition, and core business growth while we manage human capital.',
      btnText: 'Learn More About Core Focus',
      icon: 'TrendingUp'
    }
  ];

  const waysList = (Array.isArray(staffingData?.ways) && staffingData.ways.length > 0)
    ? staffingData.ways
    : defaultWays;

  const defaultGrowthPillars = [
    {
      badge: 'Pillar 01',
      heading: '1. Mitigate incorrect hiring risks.',
      desc: 'Incorrect permanent hires cost significant severance, recruitment fees, and team momentum. Contingent staffing lets you evaluate engineers on real-world milestones with complete agility and zero long-term termination liability.',
      perk: 'Zero severance or permanent liability'
    },
    {
      badge: 'Pillar 02',
      heading: '2. Reduce operations costs, improve toplines.',
      desc: 'Replace heavy fixed annual compensation overheads with flexible, project-based operational expenditure. Scale headcount strictly when revenue-generating mandates require it, protecting margins and bottom lines.',
      perk: 'Optimize operational cash flows & margins'
    },
    {
      badge: 'Pillar 03',
      heading: '3. Improve scalability, increase alignment with strategy.',
      desc: 'Seamlessly adapt workforce size in response to sudden product releases, client surges, or geographic expansions. Align team capacity directly with corporate quarterly strategy without recruiting bottlenecks.',
      perk: 'Instant ramp-up and ramp-down flexibility'
    }
  ];

  const growthPillarsList = (Array.isArray(staffingData?.growthPillars) && staffingData.growthPillars.length > 0)
    ? staffingData.growthPillars
    : defaultGrowthPillars;

  const defaultProcessSteps = [
    {
      tag: 'Step 01',
      title: '1. Source',
      desc: 'Accessing appropriate channels is crucial for candidate sourcing. We engage with specific demographics to ensure the recruitment of suitable individuals.',
      metrics: ['Multi-channel sourcing networks', 'Technical & behavioral pre-screening']
    },
    {
      tag: 'Step 02',
      title: '2. Train',
      desc: 'Training aligned with organizational development objectives is essential for enhancing their job effectiveness.',
      metrics: ['Customized domain skill orientation', 'Compliance & operational workflow alignment']
    },
    {
      tag: 'Step 03',
      title: '3. Deploy',
      desc: 'With over 25,000 contractual staff on our payroll, we are in a great position to deploy anywhere across India.',
      metrics: ['PAN-India physical & remote deployment', 'Centralized compliance & daily governance']
    }
  ];

  const processStepsList = (Array.isArray(staffingData?.processSteps) && staffingData.processSteps.length > 0)
    ? staffingData.processSteps
    : defaultProcessSteps;

  const defaultComplianceStats = [
    { value: '25+', label: 'Years of Staffing Excellence', color: 'neon-flame-text' },
    { value: '2200+', label: 'Service Locations Nationwide', color: 'cyber-grape-text' },
    { value: '08', label: 'Branch Network Cities', color: 'cyan-blue-text' },
    { value: '29', label: 'States Compliance Expertise', color: 'neon-flame-text' },
    { value: '05', label: 'Union Territories Compliance', color: 'emerald-green-text' }
  ];

  const complianceStatsList = (Array.isArray(staffingData?.complianceStats) && staffingData.complianceStats.length > 0)
    ? staffingData.complianceStats
    : defaultComplianceStats;

  const defaultComplianceChecklist = [
    "Employees' Provident Fund (EPF)",
    "Employees' State Insurance (ESIC)",
    "Professional Tax (PT) in 28 States",
    "Labour Welfare Fund (LWF)",
    "Gratuity & Bonus Act Compliance",
    "Contract Labour (Regulation & Abolition) Act"
  ];

  const complianceChecklistList = (Array.isArray(staffingData?.complianceChecklist) && staffingData.complianceChecklist.length > 0)
    ? staffingData.complianceChecklist
    : defaultComplianceChecklist;

  const testimonialsList = (Array.isArray(staffingData?.testimonials) && staffingData.testimonials.length > 0)
    ? staffingData.testimonials
    : [
        {
          name: 'Subodh Bhandari',
          role: 'Businessman',
          company: 'Enterprise Partner',
          rating: 5,
          quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.'
        },
        {
          name: 'Kartik Mali',
          role: 'Gym Owner',
          company: 'Fitness Enterprise',
          rating: 5,
          quote: 'From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements. The level of customization and flexibility they provided was truly impressive.'
        }
      ];

  const handleHeroFormSubmit = async (e) => {
    e.preventDefault();
    setHeroFormSubmitting(true);
    try {
      await submitEnquiry({
        name: heroForm.fullName,
        company: heroForm.companyName,
        email: heroForm.companyEmail,
        phone: heroForm.mobileNumber,
        service: `IT Staffing - ${heroForm.service} (${heroForm.mandates} hires)`,
        message: `Hiring Mandates: ${heroForm.mandates} Staff\nService Type: ${heroForm.service}`,
        source: 'IT Staffing Page Hero Form'
      });
    } catch (err) {
      console.warn('[ITStaffing Hero Submit]:', err);
    } finally {
      setHeroFormSubmitting(false);
      setHeroFormSuccess(true);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalSubmitting(true);
    try {
      await submitEnquiry({
        name: modalForm.name,
        email: modalForm.email,
        phone: modalForm.contact,
        service: `IT Staffing - ${modalForm.requirement}`,
        message: modalForm.message,
        source: `IT Staffing Modal (${modalType})`
      });
    } catch (err) {
      console.warn('[ITStaffing Modal Submit]:', err);
    } finally {
      setModalSubmitting(false);
      setModalSuccess(true);
    }
  };

  const openInquiryModal = (type = 'Enquiry') => {
    setModalType(type);
    setModalSuccess(false);
    setModalOpen(true);
  };

  const scrollToHeroForm = () => {
    const el = document.getElementById('hero-staffing-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      openInquiryModal('Contact Staffing Team');
    }
  };

  return (
    <main className="staffing-page-main cyber-grape-theme">
      {/* Background Cyber Ambient Radial Glows */}
      <div className="cyber-ambient-glow glow-flame-top" />
      <div className="cyber-ambient-glow glow-grape-right" />
      <div className="cyber-ambient-glow glow-cyan-left" />

      {/* =========================================================================
          HERO SECTION (2-Column High-Tech Glassmorphism Layout)
          ========================================================================= */}
      <section className="staffing-hero-v2">
        <div className="content-wrapper">
          <div className="hero-grid-v2">

            {/* Left Column: Authentic Title, Subtitle, Silhouette Hero Image, Key Highlights */}
            <div className="hero-left-v2">
              <div className="hero-badge-wrap" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                <span className="hero-top-pill cyber-pill-flame">
                  <Flame size={14} color="#f86200" />
                  <span>{heroBadge}</span>
                </span>
              </div>

              <h1 className="staffing-h1">
                {heroHeadline}
                {heroAccent ? (
                  <>
                    {' '}
                    <span className="neon-flame-text">{heroAccent}</span>
                  </>
                ) : null}
              </h1>

              <p className="staffing-lead-text">
                {heroSubtitle}
              </p>

              <p className="staffing-sub-desc">
                {heroDesc}
              </p>

              {/* Authentic Business Image with Cyber Grape High-Tech Frame & Floating Stats */}
              <div className="hero-image-showcase">
                <div className="hero-image-wrapper cyber-glass-border">
                  <img
                    src={staffingData?.heroImage || '/it-staffing/staffing-hero.jpg'}
                    alt="Black Grapes Softech Contractual Staffing"
                    className="hero-staffing-img"
                  />
                  <div className="hero-image-overlay-glow" />

                  {/* Floating Glass Badges */}
                  <div className="floating-stat-badge badge-top-right cyber-glass-pill">
                    <ShieldCheck size={18} color="#10b981" />
                    <div>
                      <div className="badge-bold">{staffingData?.badge1Val || '28 States'}</div>
                      <div className="badge-sub">{staffingData?.badge1Sub || '100% Compliant'}</div>
                    </div>
                  </div>

                  <div className="floating-stat-badge badge-bottom-left cyber-glass-pill">
                    <Users size={18} color="#f86200" />
                    <div>
                      <div className="badge-bold">{staffingData?.badge2Val || '25,000+ Staff'}</div>
                      <div className="badge-sub">{staffingData?.badge2Sub || 'Active on Payroll'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Lead Generation Form in Glassmorphic Card */}
            <div className="hero-right-v2" id="hero-staffing-form">
              <div className="hero-form-card translucent-glass-panel">
                <div className="form-header-badge cyber-glass-badge">
                  <Sparkles size={16} color="#f86200" />
                  <span>{staffingData?.formBadge || 'Direct Staffing Mandate Form'}</span>
                </div>

                <h3 className="hero-form-title">
                  {staffingData?.formTitle || 'Outsource Your Manpower Needs'}
                </h3>
                <p className="hero-form-subtitle">
                  {staffingData?.formSubtitle || 'Get a tailored contract staffing quotation with SLA confirmation in 2 business hours.'}
                </p>

                {!heroFormSuccess ? (
                  <form onSubmit={handleHeroFormSubmit} className="hero-actual-form">
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={heroForm.fullName}
                        onChange={(e) => setHeroForm({ ...heroForm, fullName: e.target.value })}
                        className="form-input cyber-input"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="form-group">
                      <label className="form-label">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        value={heroForm.companyName}
                        onChange={(e) => setHeroForm({ ...heroForm, companyName: e.target.value })}
                        className="form-input cyber-input"
                      />
                    </div>

                    {/* Company Email & Mobile Number Grid */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Company Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          value={heroForm.companyEmail}
                          onChange={(e) => setHeroForm({ ...heroForm, companyEmail: e.target.value })}
                          className="form-input cyber-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          pattern="[0-9()#&amp;+*-=.]+"
                          placeholder="Your Contact Number"
                          value={heroForm.mobileNumber}
                          onChange={(e) => setHeroForm({ ...heroForm, mobileNumber: e.target.value })}
                          className="form-input cyber-input"
                        />
                      </div>
                    </div>

                    {/* Services Dropdown (All 6 Options from Original Site) */}
                    <div className="form-group">
                      <label className="form-label">Services *</label>
                      <select
                        required
                        value={heroForm.service}
                        onChange={(e) => setHeroForm({ ...heroForm, service: e.target.value })}
                        className="form-select cyber-input"
                      >
                        {staffingServicesList.map((service, idx) => (
                          <option key={idx} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    {/* Number of Hiring Mandates (All 4 Options from Original Site) */}
                    <div className="form-group">
                      <label className="form-label">Number of Hiring Mandates *</label>
                      <select
                        required
                        value={heroForm.mandates}
                        onChange={(e) => setHeroForm({ ...heroForm, mandates: e.target.value })}
                        className="form-select cyber-input"
                      >
                        {mandateOptionsList.map((opt, idx) => (
                          <option key={idx} value={opt}>{opt} Staff</option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="hero-submit-btn neon-flame-btn"
                      disabled={heroFormSubmitting}
                    >
                      {heroFormSubmitting ? (
                        <span>Processing Mandate...</span>
                      ) : (
                        <>
                          <span>{staffingData?.formBtnText || 'Send Staffing Inquiry'}</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <div className="form-footer-privacy">
                      <ShieldCheck size={14} color="#10b981" />
                      <span>{staffingData?.formFooterNotice || '100% Confidential • Zero Commitment Required • NDA Protected'}</span>
                    </div>
                  </form>
                ) : (
                  <div className="form-success-box">
                    <div className="success-icon-wrap cyber-emerald-glow">
                      <Check size={32} color="#10b981" />
                    </div>
                    <h4>Inquiry Received Successfully!</h4>
                    <p>
                      Thank you, <strong>{heroForm.fullName || 'Valued Partner'}</strong>. Your inquiry for <strong>{heroForm.mandates}</strong> contractual staff under <strong>{heroForm.service}</strong> has been assigned to our senior recruitment director.
                    </p>
                    <div className="success-contact-confirm cyber-grape-box">
                      We will contact you at <strong>{heroForm.mobileNumber}</strong> or <strong>{heroForm.companyEmail}</strong> within 2 hours.
                    </div>
                    <button
                      type="button"
                      className="reset-form-btn cyber-btn-subtle"
                      onClick={() => {
                        setHeroFormSuccess(false);
                        setHeroForm({
                          fullName: '',
                          companyName: '',
                          companyEmail: '',
                          mobileNumber: '',
                          service: 'IT/Technical Hiring',
                          mandates: '10-50'
                        });
                      }}
                    >
                      Submit Another Mandate
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY NUMBERS STRIP (Cyber Grape Glass Cards)
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '4rem' }}>
        <div className="staffing-stats-strip-v2">
          {statsList.map((stat, idx) => {
            const colorClasses = ['neon-flame-text', 'cyber-grape-text', 'cyan-blue-text', 'emerald-green-text'];
            const colorClass = colorClasses[idx % colorClasses.length];
            return (
              <div key={idx} className="stat-card-v2 translucent-glass-card">
                <div className={`stat-card-num ${colorClass}`}>
                  <AnimatedCounter value={stat.value || stat.number} duration={1800} />
                </div>
                <div className="stat-card-title">{stat.label || stat.title}</div>
                <div className="stat-card-desc">{stat.desc || stat.sub}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: How does your company address new Manpower staffing requirements as it expands?
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="expansion-card-v2 translucent-glass-panel">
          <div className="section-header-centered">
            <span className="hero-top-pill cyber-pill-grape">
              <Briefcase size={13} color="#c084fc" />
              <span>{staffingData?.expansionBadge || 'THE EXPANSION CHALLENGE'}</span>
            </span>
            <h2 className="section-title-large">
              {staffingData?.expansionTitle || 'How does your company address new'}{' '}
              <span className="neon-flame-text">
                {staffingData?.expansionTitleAccent || 'Manpower staffing requirements'}
              </span>{' '}
              {staffingData?.expansionTitleSuffix || 'as it expands?'}
            </h2>
            <p className="section-subtitle-large">
              {staffingData?.expansionSubtitle ||
                'Balancing talent management with rapid business growth in new locations poses challenges. If you’re aiming for expansion, you probably face the following scenarios:'}
            </p>
          </div>

          <div className="scenarios-grid">
            {scenariosList.map((scenario, sIdx) => {
              const isSupport = sIdx === 2 || Boolean(scenario.btnText);
              if (isSupport) {
                return (
                  <div key={sIdx} className="scenario-item-card support-highlight-card flame-gradient-card">
                    <div className="scenario-icon-wrapper support-icon">
                      <Award size={24} color="#ffffff" />
                    </div>
                    <h4 className="scenario-card-title" style={{ color: '#ffffff' }}>
                      {scenario.title || 'Full HR Assistance'}
                    </h4>
                    <p className="scenario-card-desc" style={{ color: 'rgba(255,255,255,0.92)' }}>
                      {scenario.desc}
                    </p>
                    <button
                      type="button"
                      className="scenario-action-btn"
                      onClick={() => openInquiryModal(scenario.btnText || 'Request HR Support')}
                    >
                      <span>{scenario.btnText || 'Request HR Support'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                );
              }
              const isGrape = sIdx % 2 === 1;
              return (
                <div key={sIdx} className="scenario-item-card translucent-glass-card">
                  <div className={`scenario-icon-wrapper ${isGrape ? 'grape-icon-glow' : 'flame-icon-glow'}`}>
                    {isGrape ? <Users size={24} color="#c084fc" /> : <Clock size={24} color="#f86200" />}
                  </div>
                  <h4 className="scenario-card-title">{scenario.title}</h4>
                  <p className="scenario-card-desc">{scenario.desc}</p>
                  <div className={`scenario-bullet-pill ${isGrape ? 'cyber-grape-text' : 'neon-flame-text'}`}>
                    <span>{scenario.tag || `Critical Scenario 0${sIdx + 1}`}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: As Prompt Personnel, we're the top choice for staffing and HR solutions...
          Here are 3 ways through which we can offer assistance:
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-flame">
            <Award size={13} color="#f86200" />
            <span>{staffingData?.waysBadge || 'PROVEN STRATEGIC VALUE'}</span>
          </span>
          <h2 className="section-title-large">
            {staffingData?.waysTitle ||
              "As Prompt Personnel, we're the top choice for staffing and HR solutions among leading MNCs and Indian businesses."}
          </h2>
          <p className="section-subtitle-large">
            {staffingData?.waysSubtitle || 'Here are 3 ways through which we can offer assistance:'}
          </p>
        </div>

        <div className="three-ways-grid">
          {waysList.map((way, wIdx) => {
            const glowClasses = ['flame-icon-glow', 'grape-icon-glow', 'cyan-icon-glow'];
            const glowClass = glowClasses[wIdx % glowClasses.length];
            const iconColor = wIdx === 0 ? '#f86200' : wIdx === 1 ? '#c084fc' : '#38bdf8';
            return (
              <div key={wIdx} className="three-way-card translucent-glass-card">
                <div className="way-number-watermark">{way.number || `0${wIdx + 1}`}</div>
                <div className={`way-icon-container ${glowClass}`}>
                  {wIdx === 0 ? (
                    <UserCheck size={26} color={iconColor} />
                  ) : wIdx === 1 ? (
                    <FileText size={26} color={iconColor} />
                  ) : (
                    <TrendingUp size={26} color={iconColor} />
                  )}
                </div>
                <h3 className="way-title">{way.title}</h3>
                <p className="way-desc">{way.desc}</p>
                <div className="way-card-action">
                  <button
                    type="button"
                    className="way-learn-more"
                    onClick={() => openInquiryModal(way.btnText || way.title)}
                  >
                    <span>{way.btnText || 'Learn More'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner: Enquire Now */}
        <div className="enquire-now-banner translucent-glass-panel">
          <div className="enquire-banner-text">
            <h4>{staffingData?.ctaBannerTitle || 'Ready to discuss your contractual staff requirements?'}</h4>
            <p>
              {staffingData?.ctaBannerDesc ||
                'Our talent advisors will configure an agile staffing model custom tailored to your timelines.'}
            </p>
          </div>
          <button
            type="button"
            className="enquire-cta-btn neon-flame-btn"
            onClick={() => openInquiryModal(staffingData?.ctaBannerBtn || 'Enquire Now')}
          >
            <span>{staffingData?.ctaBannerBtn || 'Enquire Now'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: How Contingent Staffing Firm can help you stay focused on Growth?
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="contingent-growth-section translucent-glass-panel">
          <div className="section-header-centered">
            <span className="hero-top-pill cyber-pill-cyan">
              <TrendingUp size={13} color="#38bdf8" />
              <span>{staffingData?.growthBadge || 'STRATEGIC ADVANTAGE'}</span>
            </span>
            <h2 className="section-title-large">
              {staffingData?.growthTitle || 'How Contingent Staffing Firm can help you'}{' '}
              <span className="neon-flame-text">
                {staffingData?.growthTitleAccent || 'stay focused on Growth?'}
              </span>
            </h2>
          </div>

          <div className="growth-pillars-grid-v2">
            {growthPillarsList.map((pillar, pIdx) => {
              const badgeClasses = ['flame-badge', 'grape-badge', 'cyan-badge'];
              const badgeClass = badgeClasses[pIdx % badgeClasses.length];
              return (
                <div key={pIdx} className="growth-pillar-card-v2 translucent-glass-card">
                  <div className={`pillar-num-badge ${badgeClass}`}>{pillar.badge || `Pillar 0${pIdx + 1}`}</div>
                  <h3 className="pillar-heading">{pillar.heading}</h3>
                  <p className="pillar-description">{pillar.desc}</p>
                  {pillar.perk && (
                    <div className="pillar-perk">
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{pillar.perk}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: What does our Flexible Staffing Services include: Our Process
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-grape">
            <Layers size={13} color="#c084fc" />
            <span>{staffingData?.processBadge || 'SYSTEMATIC METHODOLOGY'}</span>
          </span>
          <h2 className="section-title-large">
            {staffingData?.processTitle || 'What does our Flexible Staffing Services include:'}{' '}
            <span className="neon-flame-text">{staffingData?.processTitleAccent || 'Our Process'}</span>
          </h2>
          <p className="section-subtitle-large">
            {staffingData?.processSubtitle ||
              'A battle-tested 3-stage delivery pipeline ensuring pre-vetted, high-performance talent deployed seamlessly to your organization.'}
          </p>
        </div>

        <div className="process-pipeline-grid">
          {processStepsList.map((step, stIdx) => {
            const stepTags = ['flame-step-tag', 'grape-step-tag', 'cyan-step-tag'];
            const stepTag = stepTags[stIdx % stepTags.length];
            const iconBoxes = ['flame-icon-glow', 'grape-icon-glow', 'cyan-icon-glow'];
            const iconBox = iconBoxes[stIdx % iconBoxes.length];
            const iconColor = stIdx === 0 ? '#f86200' : stIdx === 1 ? '#c084fc' : '#38bdf8';
            return (
              <div key={stIdx} className="process-stage-card translucent-glass-card">
                <div className="stage-header-row">
                  <div className={`stage-step-tag ${stepTag}`}>{step.tag || `Step 0${stIdx + 1}`}</div>
                  <div className={`stage-icon-box ${iconBox}`}>
                    {stIdx === 0 ? (
                      <Users size={22} color={iconColor} />
                    ) : stIdx === 1 ? (
                      <GraduationCap size={22} color={iconColor} />
                    ) : (
                      <Send size={22} color={iconColor} />
                    )}
                  </div>
                </div>
                <h3 className="stage-title">{step.title}</h3>
                <p className="stage-body">{step.desc}</p>
                {Array.isArray(step.metrics) && step.metrics.length > 0 && (
                  <div className="stage-key-metrics">
                    {step.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="metric-pill">
                        {metric.startsWith('•') ? metric : `• ${metric}`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: What do our clients say about us: (Testimonials Carousel)
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="section-header-centered">
          <span className="hero-top-pill cyber-pill-flame">
            <Quote size={13} color="#f86200" />
            <span>{staffingData?.testimonialsBadge || 'VERIFIED CLIENT SUCCESS'}</span>
          </span>
          <h2 className="section-title-large">
            {staffingData?.testimonialsTitle || 'What do our clients'}{' '}
            <span className="neon-flame-text">{staffingData?.testimonialsTitleAccent || 'say about us:'}</span>
          </h2>
        </div>

        {testimonialsList.length > 0 && (
          <div className="testimonials-carousel-wrapper">
            {(() => {
              const currentT = testimonialsList[activeTestimonial % testimonialsList.length] || testimonialsList[0];
              const starsCount = Math.max(1, Math.min(5, Number(currentT.rating) || 5));
              const authorInitials = (currentT.name || 'Client')
                .split(' ')
                .filter(Boolean)
                .map((n) => n[0])
                .join('');
              return (
                <div className="testimonial-display-card translucent-glass-panel">
                  <div className="testimonial-quote-icon">
                    <Quote size={40} color="#f86200" />
                  </div>

                  {/* Stars */}
                  <div className="testimonial-stars-row">
                    {[...Array(starsCount)].map((_, i) => (
                      <Star key={i} size={18} fill="#fba721" color="#fba721" />
                    ))}
                  </div>

                  {/* Quote Body */}
                  <blockquote className="testimonial-quote-content">
                    "{currentT.quote}"
                  </blockquote>

                  {/* Author Footer */}
                  <div className="testimonial-footer-wrap">
                    <div className="testimonial-avatar-initials flame-gradient-bg">
                      {authorInitials}
                    </div>
                    <div className="testimonial-author-meta">
                      <div className="author-name-bold">{currentT.name}</div>
                      <div className="author-title-sub">
                        {currentT.role} {currentT.company ? `• ${currentT.company}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Carousel Controls */}
            {testimonialsList.length > 1 && (
              <div className="carousel-controls-bar">
                <button
                  type="button"
                  className="carousel-nav-btn cyber-glass-pill"
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1))
                  }
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className="carousel-dots-row">
                  {testimonialsList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`carousel-dot ${(activeTestimonial % testimonialsList.length) === idx ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="carousel-nav-btn cyber-glass-pill"
                  onClick={() =>
                    setActiveTestimonial((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1))
                  }
                  aria-label="Next Testimonial"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* SECTION 7 CTA Button: Contact Now */}
        <div className="contact-now-action-row">
          <button
            type="button"
            className="contact-now-btn neon-flame-btn"
            onClick={scrollToHeroForm}
          >
            <span>{staffingData?.contactBtnText || 'Contact Now'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: Why Prompt should be your go-to-partner in Manpower Staffing
          28 States Compliance Expertise.
          ========================================================================= */}
      <section className="content-wrapper" style={{ marginBottom: '5rem' }}>
        <div className="compliance-expert-card translucent-glass-panel">
          <div className="compliance-header-group">
            <span className="hero-top-pill cyber-pill-emerald">
              <ShieldCheck size={14} color="#10b981" />
              <span>{staffingData?.complianceBadge || 'NATIONWIDE COMPLIANCE NETWORK'}</span>
            </span>
            <h2 className="compliance-heading-title">
              {staffingData?.complianceHeading || 'Why Prompt should be your go-to-partner in Manpower Staffing'}{' '}
              <br />
              <span className="neon-flame-text">
                {staffingData?.complianceHeadingAccent || '28 States Compliance Expertise.'}
              </span>
            </h2>
            <p className="compliance-lead-desc">
              {staffingData?.complianceDesc ||
                'Managing contingent workforces across multiple state boundaries demands rigorous compliance with fluctuating local Minimum Wage notifications, Shops & Commercial Establishment Acts, and statutory filing calendars.'}
            </p>
          </div>

          {/* Interactive Compliance Metrics Grid */}
          <div className="compliance-stat-highlights-grid">
            {complianceStatsList.map((cStat, csIdx) => {
              const highlightClass = csIdx === 3 ? 'highlight-metric' : '';
              return (
                <div key={csIdx} className={`compliance-metric-box translucent-glass-card ${highlightClass}`}>
                  <div className={`compliance-stat-val ${cStat.color || 'neon-flame-text'}`}>
                    <AnimatedCounter value={cStat.value} duration={1600} />
                  </div>
                  <div className="compliance-stat-label">{cStat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Map Graphic Presentation Card */}
          <div className="compliance-graphic-frame">
            <div className="compliance-img-container">
              <img
                src={staffingData?.complianceImage || '/it-staffing/staffing-compliance.png'}
                alt="28 States Compliance Expertise Black Grapes Softech"
                className="compliance-showcase-img"
              />
            </div>
            <div className="compliance-checklist-strip">
              {complianceChecklistList.map((item, idx) => {
                const tagColors = [
                  'cyber-tag-flame',
                  'cyber-tag-grape',
                  'cyber-tag-cyan',
                  'cyber-tag-emerald',
                  'cyber-tag-amber',
                  'cyber-tag-flame'
                ];
                const tagColor = tagColors[idx % tagColors.length];
                const labelText = item.startsWith('✓') ? item : `✓ ${item}`;
                return (
                  <span key={idx} className={`comp-tag ${tagColor}`}>
                    {labelText}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          AUTHENTIC INQUIRY MODAL (Request a Demo / Enquiry / Get the Offer)
          ========================================================================= */}
      {modalOpen && (
        <div className="modal-backdrop-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-container-card translucent-glass-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-trigger"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {!modalSuccess ? (
              <>
                <div className="modal-top-strip flame-gradient-bg" />
                <div className="modal-header-block">
                  <div className="modal-category-tag cyber-glass-badge">
                    <Sparkles size={14} color="#f86200" />
                    <span>{modalType}</span>
                  </div>
                  <h3 className="modal-heading-title">{modalType}</h3>
                  <p className="modal-heading-sub">
                    Fill out your staffing requirements below and our HR director will connect with you.
                  </p>
                </div>

                <form onSubmit={handleModalSubmit} className="modal-form-body">
                  <div className="modal-input-group">
                    <label className="modal-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={modalForm.name}
                      onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={modalForm.email}
                      onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Your Contact Number"
                      value={modalForm.contact}
                      onChange={(e) => setModalForm({ ...modalForm, contact: e.target.value })}
                      className="modal-text-input cyber-input"
                    />
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Requirement *</label>
                    <select
                      value={modalForm.requirement}
                      onChange={(e) => setModalForm({ ...modalForm, requirement: e.target.value })}
                      className="modal-select-input cyber-input"
                    >
                      <option value="IT/Technical Hiring">IT/Technical Hiring</option>
                      <option value="Bulk Hiring">Bulk Hiring</option>
                      <option value="General Staffing/Payroll Management">General Staffing/Payroll Management</option>
                      <option value="Gig Hiring/Flexi Staffing">Gig Hiring/Flexi Staffing</option>
                      <option value="NAPS/Apprenticeship Hiring">NAPS/Apprenticeship Hiring</option>
                      <option value="Diversity Hiring">Diversity Hiring</option>
                      <option value="Software Development">Software Development</option>
                      <option value="CRM Software Development">CRM Software Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="modal-input-group">
                    <label className="modal-label">Your Message</label>
                    <textarea
                      rows={3}
                      placeholder="Your Message"
                      value={modalForm.message}
                      onChange={(e) => setModalForm({ ...modalForm, message: e.target.value })}
                      className="modal-textarea-input cyber-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="modal-submit-btn neon-flame-btn"
                    disabled={modalSubmitting}
                  >
                    {modalSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </>
            ) : (
              <div className="modal-success-screen">
                <div className="modal-success-icon-wrap cyber-emerald-glow">
                  <Check size={36} color="#10b981" />
                </div>
                <h3>Request Submitted!</h3>
                <p>
                  Thank you, <strong>{modalForm.name || 'Valued Client'}</strong>! We have received your request for <strong>{modalForm.requirement}</strong>. Our senior executive will call you at <strong>{modalForm.contact}</strong> promptly.
                </p>
                <button
                  type="button"
                  className="modal-close-action-btn cyber-btn-subtle"
                  onClick={() => setModalOpen(false)}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
