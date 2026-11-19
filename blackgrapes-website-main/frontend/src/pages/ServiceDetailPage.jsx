import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Code2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeft, 
  ChevronDown,
  HelpCircle,
  ExternalLink,
  PhoneCall
} from 'lucide-react';
import { softechServices } from '../data/softechServicesData';
import { PROJECTS } from '../data/siteData';
import '../styles/CyberServices.css';

// Slug to service ID mapping
const SLUG_MAP = {
  'software-development': 'software-development',
  'software': 'software-development',
  'custom-software-development': 'software-development',
  
  'web-development': 'web-development',
  'web-designing-and-development': 'web-development',
  'website-development': 'web-development',
  
  'mobile-app-development': 'mobile-app-development',
  'mobile-apps': 'mobile-app-development',
  'mobile-app': 'mobile-app-development',
  
  'digital-marketing': 'digital-marketing',
  'seo-marketing': 'digital-marketing',
  
  'graphic-designing': 'graphic-designing',
  'ui-ux-design': 'graphic-designing',
  
  'crm-software': 'crm-software-development',
  'crm-software-development': 'crm-software-development',
  
  'mlm-software': 'mlm-software-development',
  'mlm-software-development': 'mlm-software-development',
  
  'crm-mlm-solutions': 'crm-software-development',
  'game-development': 'game-development',
  'tender-services': 'tender-services',
  'tenders-procurement': 'tender-services'
};

const SERVICE_BENEFITS = {
  'web-development': [
    { title: 'Sub-Second Load Times', desc: 'Engineered with Next.js & React for lightning-fast speeds and top Core Web Vitals scores.' },
    { title: 'Search Engine Dominance', desc: 'Semantic HTML5 structure and schema markup designed for top Google search rankings.' },
    { title: 'Universal Device Parity', desc: 'Flawless responsive behavior on smartphones, tablets, laptops, and ultra-wide screens.' },
    { title: 'Future-Proof Scalability', desc: 'Modular component architecture ready to grow with your business without technical debt.' }
  ],
  'mobile-app-development': [
    { title: 'Fluid 60fps Experience', desc: 'Native performance on iOS and Android with smooth micro-interactions and transitions.' },
    { title: 'Offline Capability', desc: 'Local database caching and background synchronization for uninterrupted user experience.' },
    { title: 'Guaranteed Store Approval', desc: 'Strict compliance with Apple App Store and Google Play Store review guidelines.' },
    { title: 'Real-Time Engagement', desc: 'Targeted push notifications, instant chat, and biometric security integration.' }
  ],
  'software-development': [
    { title: 'Zero Bottleneck Automation', desc: 'Automate repetitive workflows, eliminating human error and cutting operational overhead.' },
    { title: 'Enterprise Data Security', desc: 'OWASP-compliant encryption, role-based authorization, and comprehensive audit logs.' },
    { title: 'High-Concurrency Handling', desc: 'Microservices architecture that effortlessly handles thousands of simultaneous transactions.' },
    { title: 'Seamless System Integrations', desc: 'Connect legacy databases, third-party APIs, payment gateways, and cloud storage.' }
  ],
  'crm-software-development': [
    { title: 'Higher Lead Conversion', desc: 'Automated lead assignment and pipeline tracking ensure zero customer drop-offs.' },
    { title: 'Omnichannel Engagement', desc: 'Integrated WhatsApp Business, SMS, and automated email follow-up sequences.' },
    { title: 'Executive Visibility', desc: 'Real-time sales velocity dashboards and forecasting for leadership decisions.' },
    { title: 'Complete Data Ownership', desc: 'Your customer data stays securely hosted on your private cloud with zero per-user SaaS tax.' }
  ],
  'mlm-software-development': [
    { title: 'Accurate Payout Engine', desc: 'Automated compensation math for Binary, Matrix, Unilevel, and Hybrid business plans.' },
    { title: 'Visual Genealogy Tree', desc: 'Interactive member hierarchy navigation with instant performance and volume tracking.' },
    { title: 'Multi-Wallet System', desc: 'Secure digital wallets for payouts, E-Pins, reward points, and bank transfer requests.' },
    { title: 'Anti-Fraud Protection', desc: 'Automated cap checks, IP logging, and multi-tier transaction approval workflows.' }
  ],
  'digital-marketing': [
    { title: 'Qualified Inbound Leads', desc: 'Laser-focused audience targeting that delivers high-intent prospects ready to buy.' },
    { title: 'Transparent ROI Tracking', desc: 'Live attribution dashboards tracking cost per lead, conversion rate, and revenue.' },
    { title: 'Sustainable Organic Growth', desc: 'White-hat technical SEO and content authority that compound search visibility over time.' },
    { title: 'Multi-Channel Synergy', desc: 'Cohesive ad campaigns across Google Search, YouTube, Meta, and LinkedIn.' }
  ],
  'graphic-designing': [
    { title: 'Commanding Brand Perception', desc: 'High-end visual aesthetics that communicate enterprise credibility and trust.' },
    { title: 'Interactive Prototypes', desc: 'Figma wireframes and design systems that streamline development and validate UX.' },
    { title: 'Multi-Format Asset Kits', desc: 'Vector logos, social media banners, marketing brochures, and presentation decks.' },
    { title: 'Consistent Brand Guidelines', desc: 'Defined typography, color palettes, and component libraries for long-term consistency.' }
  ]
};

const SERVICE_FAQS = {
  'web-development': [
    { q: 'How long does it take to build a custom website?', a: 'Standard corporate web applications typically launch within 3 to 6 weeks, while enterprise multi-tier platforms take 6 to 10 weeks depending on custom feature requirements.' },
    { q: 'Will my website be mobile-responsive and SEO-ready?', a: 'Yes, 100%. Every website we engineer follows mobile-first design, semantic structure, sub-second loading optimization, and schema markup.' },
    { q: 'Can I manage content myself after launch?', a: 'Yes. We provide modern, easy-to-use admin panels or headless CMS setups allowing you to update text, images, and pages effortlessly.' }
  ],
  'mobile-app-development': [
    { q: 'Do you build native apps or cross-platform apps?', a: 'We build both. For high-velocity deployment with cost efficiency, we use Flutter or React Native. For specialized hardware needs, we build native Swift (iOS) and Kotlin (Android).' },
    { q: 'Do you handle the App Store and Play Store launch?', a: 'Yes, our team handles the entire submission process, including metadata, privacy compliance, review feedback, and live publishing.' },
    { q: 'Will the app work offline?', a: 'Yes, we implement local caching and background sync so users can view data and perform actions without an active connection.' }
  ],
  'software-development': [
    { q: 'Can you modernize our existing legacy software?', a: 'Yes. We specialize in refactoring legacy codebases, migrating databases to modern cloud architectures, and replacing monoliths with microservices.' },
    { q: 'Who owns the intellectual property (IP) and source code?', a: 'You have 100% full ownership of the source code, database architectures, and all intellectual property upon project milestone completion.' },
    { q: 'What security standards do you adhere to?', a: 'We adhere to OWASP security standards, end-to-end data encryption, role-based access control, and strict NDAs.' }
  ],
  'crm-software-development': [
    { q: 'Can this CRM integrate with our WhatsApp Business and Website?', a: 'Yes, we specialize in direct Meta WhatsApp Business API integration, website lead capture webhooks, SMS gateways, and payment systems.' },
    { q: 'Is there a recurring monthly fee per user?', a: 'No. Our custom CRM is built exclusively for your company, meaning you host it on your own server with zero recurring per-user license fees.' }
  ],
  'mlm-software-development': [
    { q: 'What compensation plans do you support?', a: 'We support all major models including Binary, Matrix, Unilevel, Board, Australian X-Up, and custom hybrid compensation models.' },
    { q: 'Is payout calculation automated?', a: 'Yes. Calculations run on scheduled cron triggers with automated TDS/GST deductions, payout capping, and instant wallet credit.' }
  ],
  'digital-marketing': [
    { q: 'How soon can we expect results from digital marketing?', a: 'PPC campaigns (Google Ads & Meta) begin delivering targeted leads within 48 to 72 hours. Organic SEO typically compounds visible growth within 60 to 90 days.' },
    { q: 'Do you provide weekly reporting?', a: 'Yes, we provide live attribution dashboards with weekly progress updates covering leads, spend, cost-per-acquisition, and conversion metrics.' }
  ],
  'graphic-designing': [
    { q: 'What deliverables do you provide for branding projects?', a: 'You receive vector master files (.AI, .SVG, .EPS), brand guidelines PDF, high-res web exports (.PNG, .WebP), social media kits, and Figma source files.' },
    { q: 'How many revisions do we get?', a: 'We iterate collaboratively until the visual identity aligns 100% with your brand vision and market positioning.' }
  ]
};

export default function ServiceDetailPage({ onOpenInquiry }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  // Match service by slug or fallback
  const resolvedId = SLUG_MAP[slug?.toLowerCase()] || slug || 'software-development';
  const service = useMemo(() => {
    return softechServices.find(s => s.id === resolvedId) || softechServices[0];
  }, [resolvedId]);

  const benefits = SERVICE_BENEFITS[service.id] || SERVICE_BENEFITS['software-development'];
  const faqs = SERVICE_FAQS[service.id] || SERVICE_FAQS['software-development'];

  // Filter relevant projects
  const relevantProjects = useMemo(() => {
    const titleLower = service.title.toLowerCase();
    return PROJECTS.filter(p => {
      const pCat = (p.category || '').toLowerCase();
      if (titleLower.includes('web') && pCat.includes('web')) return true;
      if (titleLower.includes('mobile') && (pCat.includes('app') || pCat.includes('android') || pCat.includes('ios'))) return true;
      if (titleLower.includes('ecommerce') && pCat.includes('e-commerce')) return true;
      return true;
    }).slice(0, 3);
  }, [service]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleInquiry = () => {
    if (onOpenInquiry) {
      onOpenInquiry(`Service: ${service.title}`);
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="service-detail-page">
      {/* 1. SERVICE HERO */}
      <section className="service-detail-hero">
        <div className="ambient-glow glow-top-left" aria-hidden="true"></div>
        <div className="container">
          <div className="service-breadcrumb">
            <Link to="/services" className="breadcrumb-back-link">
              <ArrowLeft size={16} />
              <span>All Services</span>
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{service.title}</span>
          </div>

          <div className="service-hero-grid">
            <div className="service-hero-content">
              <div className="service-eyebrow-badge">
                <Sparkles size={14} />
                <span>{service.categoryLabel || 'ENTERPRISE SERVICE'} • {service.badge || 'PROVEN'}</span>
              </div>

              <h1 className="service-hero-title">
                {service.title}
              </h1>

              <p className="service-hero-tagline">
                {service.tagline}
              </p>

              {/* 2. SHORT SERVICE INTRODUCTION (15-25 words) */}
              <p className="service-hero-desc">
                {service.description}
              </p>

              <div className="service-hero-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-pulse-glow"
                  onClick={handleInquiry}
                >
                  <span>Request Free Consultation</span>
                  <ArrowRight size={18} />
                </button>
                <a href="#work-process" className="btn btn-secondary">
                  <span>View Work Process</span>
                </a>
              </div>

              <div className="service-quick-meta">
                <div className="meta-pill">
                  <Clock size={14} className="meta-icon" />
                  <span>Timeline: <strong>{service.timeline || '3 - 6 Weeks'}</strong></span>
                </div>
                <div className="meta-pill">
                  <ShieldCheck size={14} className="meta-icon" />
                  <span>SLA: <strong>Production Support</strong></span>
                </div>
              </div>
            </div>

            <div className="service-hero-visual">
              <div className="service-visual-card">
                <div className="visual-card-image-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-main-image"
                    onError={(e) => {
                      e.currentTarget.src = '/images/Software.jpg';
                    }}
                  />
                  <div className="visual-overlay-gradient"></div>
                </div>

                <div className="visual-card-footer">
                  <div className="ideal-for-label">IDEAL FOR:</div>
                  <div className="ideal-for-text">{service.clientTypes || 'Startups, SMEs & Global Enterprises'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES */}
      <section className="section service-features-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="section-title">
              Key <span className="text-highlight">Features & Deliverables</span>
            </h2>
            <p className="section-subtitle">
              Engineered with precision for peak operational performance, high availability, and long-term maintainability.
            </p>
          </div>

          <div className="service-features-grid">
            {(service.keyDeliverables || []).map((feat, idx) => (
              <div key={idx} className="service-feature-card">
                <div className="feature-icon-badge">
                  <CheckCircle2 size={20} color="#f86200" />
                </div>
                <h3 className="feature-card-title">{feat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSINESS BENEFITS */}
      <section className="section service-benefits-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>MEASURABLE IMPACT</span>
            </div>
            <h2 className="section-title">
              Business <span className="text-highlight">Benefits</span>
            </h2>
            <p className="section-subtitle">
              How partnering with Black Grapes Softech delivers concrete competitive advantages for your company.
            </p>
          </div>

          <div className="service-benefits-grid">
            {benefits.map((b, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-step-number">0{idx + 1}</div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES & TOOLS */}
      <section className="section service-tech-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>TECH ARSENAL</span>
            </div>
            <h2 className="section-title">
              Technologies & <span className="text-highlight">Frameworks</span>
            </h2>
            <p className="section-subtitle">
              Industry-standard tools and battle-tested stacks applied to engineer your solution.
            </p>
          </div>

          <div className="service-tech-chips-wrap">
            {(service.techStack || []).map((tech, idx) => (
              <div key={idx} className="service-tech-chip">
                <Code2 size={16} className="tech-chip-icon" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WORK PROCESS */}
      <section id="work-process" className="section service-process-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>METHODOLOGY</span>
            </div>
            <h2 className="section-title">
              Our 4-Step <span className="text-highlight">Delivery Process</span>
            </h2>
            <p className="section-subtitle">
              Agile execution from requirements discovery to live production deployment.
            </p>
          </div>

          <div className="service-process-grid">
            <div className="service-process-item">
              <div className="sp-step-num">01</div>
              <h3 className="sp-title">Understanding Requirements</h3>
              <p className="sp-desc">Comprehensive discovery sessions to map business logic, user flows, and technical feasibility.</p>
            </div>
            <div className="service-process-item">
              <div className="sp-step-num">02</div>
              <h3 className="sp-title">Planning & Design</h3>
              <p className="sp-desc">Figma wireframes, database schemas, and architectural blueprints for validation.</p>
            </div>
            <div className="service-process-item">
              <div className="sp-step-num">03</div>
              <h3 className="sp-title">Development & Testing</h3>
              <p className="sp-desc">Modular sprint-based clean coding, automated QA, and bi-weekly milestone reviews.</p>
            </div>
            <div className="service-process-item">
              <div className="sp-step-num">04</div>
              <h3 className="sp-title">Delivery & Support</h3>
              <p className="sp-desc">Production launch, full source code handover, and SLA-backed maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RELEVANT PORTFOLIO / PROJECTS */}
      {relevantProjects.length > 0 && (
        <section className="section service-portfolio-section">
          <div className="container">
            <div className="section-header text-center">
              <div className="section-badge">
                <span className="badge-sparkle">✦</span>
                <span>SUCCESSFUL DELIVERIES</span>
              </div>
              <h2 className="section-title">
                Related <span className="text-highlight">Projects</span>
              </h2>
              <p className="section-subtitle">
                Real client applications delivered with excellence.
              </p>
            </div>

            <div className="service-projects-grid">
              {relevantProjects.map((p, idx) => (
                <div key={idx} className="service-project-card">
                  <div className="spc-badge">{p.category}</div>
                  <h3 className="spc-name">{p.name}</h3>
                  <p className="spc-desc">{p.desc}</p>
                  {p.url && p.url !== '#' && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="spc-link">
                      <span>Visit Live Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQS */}
      <section className="section service-faqs-section">
        <div className="container">
          <div className="section-header text-center">
            <div className="section-badge">
              <span className="badge-sparkle">✦</span>
              <span>COMMON QUESTIONS</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="text-highlight">Questions</span>
            </h2>
            <p className="section-subtitle">
              Clear answers regarding our development timelines, pricing models, and technology stack.
            </p>
          </div>

          <div className="service-faq-accordion">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`service-faq-item ${openFaq === idx ? 'faq-open' : ''}`}
              >
                <button
                  type="button"
                  className="service-faq-q-btn"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`faq-chevron ${openFaq === idx ? 'chevron-rotated' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="service-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA */}
      <section className="service-cta-section">
        <div className="container">
          <div className="service-cta-card">
            <span className="service-cta-badge">GET STARTED WITH BLACK GRAPES</span>
            <h2 className="service-cta-title">
              Let's Build Your {service.title} Solution
            </h2>
            <p className="service-cta-desc">
              Speak directly with our senior technology architects. We will evaluate your scope, suggest optimal architectures, and provide a fixed-timeline estimate.
            </p>
            <div className="service-cta-buttons">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleInquiry}
              >
                <PhoneCall size={18} />
                <span>Book Technical Consultation</span>
              </button>
              <Link to="/contact-us" className="btn btn-secondary btn-lg">
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
