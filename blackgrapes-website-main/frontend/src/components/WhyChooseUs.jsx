import React from 'react';
import { 
  Layers, 
  Users, 
  CheckCircle2, 
  Headphones, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';
import WhyChooseUsVisual from './WhyChooseUsVisual';
import WhyChooseUsConnectors from './WhyChooseUsConnectors';
import AnimatedCounter from './AnimatedCounter';

// Black Grapes Softech Authentic Why Choose Us Pillars (Left Column)
const LEFT_PILLARS = [
  {
    id: 'customized-solutions',
    title: 'CUSTOMIZED SOLUTIONS',
    subtitle: 'Tailored Architecture',
    icon: Layers,
    desc: 'Bespoke software and applications designed specifically around your operational workflows and business objectives.',
    points: ['Custom UI/UX & Flow Design', 'Tailored Business Logic', 'Scalable Microservices']
  },
  {
    id: 'experienced-team',
    title: 'EXPERIENCED TEAM',
    subtitle: '10+ Years Proven Track',
    icon: Users,
    desc: 'Seasoned full-stack developers, mobile engineers, and system architects delivering battle-tested digital products.',
    points: ['Senior Software Engineers', 'Dedicated Agile Tech Leads', 'Cross-Platform Specialists']
  },
  {
    id: 'precision-engineering',
    title: 'PRECISION ENGINEERING',
    subtitle: 'Uncompromising Quality',
    icon: CheckCircle2,
    desc: 'Clean, modular, thoroughly tested code architectures that minimize technical debt and maximize speed and uptime.',
    points: ['Automated CI/CD Pipelines', '99.9% Uptime Guarantee', 'Clean Modular Code']
  }
];

// Black Grapes Softech Authentic Why Choose Us Pillars (Right Column)
const RIGHT_PILLARS = [
  {
    id: 'reliable-support',
    title: 'RELIABLE SUPPORT',
    subtitle: 'End-to-End Commitment',
    icon: Headphones,
    desc: 'Continuous monitoring, proactive security updates, and rapid response SLAs ensuring uninterrupted business continuity.',
    points: ['24/7 Priority Support Desk', 'Fast Response Time SLAs', 'Dedicated Account Lead']
  },
  {
    id: 'enterprise-security',
    title: 'ENTERPRISE SECURITY',
    subtitle: '100% IP & NDA Protection',
    icon: ShieldCheck,
    desc: 'Military-grade encryption, OWASP Top 10 mitigation, and ISO-standard coding conventions ensure zero vulnerability.',
    points: ['Zero Data Leak Architecture', 'Strict NDAs & IP Ownership', 'Full Source Code Handover']
  },
  {
    id: 'strategic-lifecycle',
    title: 'STRATEGIC LIFECYCLE',
    subtitle: 'Agile Delivery & Speed',
    icon: TrendingUp,
    desc: 'We stand shoulder to shoulder with founders and CIOs as true technology partners from MVP to multi-million user scale.',
    points: ['Two-Week Sprint Cycles', 'Bi-Weekly Demo Milestones', 'Dedicated Tech Project Manager']
  }
];

export default function WhyChooseUs({ onOpenModal }) {
  return (
    <section id="why-us" className="section why-us-section" style={{ background: '#000000', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1300px' }}>
        {/* Section Header with Black Grapes Softech Authentic Copy */}
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>WHY CHOOSE US?</span>
          </div>
          <h2 
            className="section-title" 
            style={{ 
              fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)', 
              fontWeight: 800, 
              color: '#ffffff', 
              letterSpacing: '-0.02em',
              margin: '0.6rem auto',
              maxWidth: '920px',
              lineHeight: 1.2
            }}
          >
            Built On Security, Uncompromising Quality & Lifelong Relationships
          </h2>
          <p 
            className="section-subtitle" 
            style={{ 
              maxWidth: '780px', 
              margin: '0 auto', 
              color: '#fdba74', 
              fontSize: '1rem',
              lineHeight: 1.6,
              fontStyle: 'italic',
              opacity: 0.95
            }}
          >
            "To be the most reliable, visionary IT catalyst for modern businesses by delivering robust code, high ROI, and lifelong partnerships."
          </p>
        </div>

        {/* ========================================================
            3D CENTRAL HUB: 3 CARDS LEFT | ARROWS | 3D QUESTION MARK | ARROWS | 3 CARDS RIGHT (SS1 MATCH)
            ======================================================== */}
        <div className="why-us-hub-layout">
          {/* Crisp Glowing Pointer Arrow Lines Connecting Cards to Center */}
          <WhyChooseUsConnectors />

          {/* Left Column (3 Compact Capsule Cards) */}
          <div className="why-us-column left">
            {LEFT_PILLARS.map((card) => {
              const IconComp = card.icon;
              return (
                <div key={card.id} className="why-us-capsule-card" tabIndex={0} role="button">
                  <div className="capsule-card-top">
                    <div className="capsule-text-group">
                      <h3 className="capsule-title">{card.title}</h3>
                      <span className="capsule-subtitle">{card.subtitle}</span>
                    </div>
                    <div className="capsule-icon-wrap">
                      <IconComp size={18} />
                    </div>
                  </div>

                  {/* Expandable on Hover */}
                  <div className="capsule-expandable-content">
                    <p className="capsule-full-desc">{card.desc}</p>
                    <div className="capsule-points-list">
                      {card.points.map((pt, pIdx) => (
                        <div key={pIdx} className="capsule-point-item">
                          <span className="capsule-check">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: 3D Mascot Leaning on Metallic Question Mark */}
          <div className="why-us-center-column">
            <WhyChooseUsVisual />
          </div>

          {/* Right Column (3 Compact Capsule Cards) */}
          <div className="why-us-column right">
            {RIGHT_PILLARS.map((card) => {
              const IconComp = card.icon;
              return (
                <div key={card.id} className="why-us-capsule-card" tabIndex={0} role="button">
                  <div className="capsule-card-top">
                    <div className="capsule-text-group">
                      <h3 className="capsule-title">{card.title}</h3>
                      <span className="capsule-subtitle">{card.subtitle}</span>
                    </div>
                    <div className="capsule-icon-wrap">
                      <IconComp size={18} />
                    </div>
                  </div>

                  {/* Expandable on Hover */}
                  <div className="capsule-expandable-content">
                    <p className="capsule-full-desc">{card.desc}</p>
                    <div className="capsule-points-list">
                      {card.points.map((pt, pIdx) => (
                        <div key={pIdx} className="capsule-point-item">
                          <span className="capsule-check">✓</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            SS3 ANIMATED NUMBER COUNTERS BANNER
            ======================================================== */}
        <div className="counters-banner">
          <div className="counter-card">
            <div className="counter-icon-wrap">👥</div>
            <div className="counter-data">
              <span className="counter-number">
                <AnimatedCounter target={100} duration={2200} suffix="+" />
              </span>
              <span className="counter-name">Happy Clients</span>
            </div>
          </div>

          <div className="counter-divider" />

          <div className="counter-card">
            <div className="counter-icon-wrap">🚀</div>
            <div className="counter-data">
              <span className="counter-number">
                <AnimatedCounter target={150} duration={2200} suffix="+" />
              </span>
              <span className="counter-name">Projects Delivered</span>
            </div>
          </div>

          <div className="counter-divider" />

          <div className="counter-card">
            <div className="counter-icon-wrap">⚙️</div>
            <div className="counter-data">
              <span className="counter-number">
                <AnimatedCounter target={10} duration={1800} suffix="+ Years" />
              </span>
              <span className="counter-name">IT Excellence</span>
            </div>
          </div>

          <div className="counter-divider" />

          <div className="counter-card">
            <div className="counter-icon-wrap">👨‍💻</div>
            <div className="counter-data">
              <span className="counter-number">
                <AnimatedCounter target={25} duration={1800} suffix="+" />
              </span>
              <span className="counter-name">Tech Wizards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
