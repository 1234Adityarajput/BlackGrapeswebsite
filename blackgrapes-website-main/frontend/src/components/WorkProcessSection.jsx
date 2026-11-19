import React, { useState, useEffect } from 'react';
import { 
  FileSearch, 
  Palette, 
  Code2, 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronDown
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    shortName: 'Discovery',
    title: 'Understanding Requirements',
    icon: FileSearch,
    badge: 'Discovery & Feasibility',
    shortSummary: 'Technical consultation & scope architecture formulation.',
    fullDesc: 'In-depth technical consultation, requirement mapping, and architecture feasibility formulation to align with your business goals.',
    deliverables: ['Detailed Project Scope', 'Architecture Blueprint', 'Fixed Sprint Timeline']
  },
  {
    step: '02',
    shortName: 'Design',
    title: 'Planning & Design',
    icon: Palette,
    badge: 'UI/UX & Prototyping',
    shortSummary: 'UI/UX wireframing & interactive design systems.',
    fullDesc: 'Crafting responsive user interfaces, Figma prototypes, interactive design systems, and database schema diagrams for optimal user journeys.',
    deliverables: ['Interactive Figma Wireframes', 'Component Design System', 'Database Schema Models']
  },
  {
    step: '03',
    shortName: 'Development',
    title: 'Development & Testing',
    icon: Code2,
    badge: 'Agile Engineering',
    shortSummary: 'Clean agile coding & automated QA verification.',
    fullDesc: 'Sprint-driven clean coding, automated QA, security vulnerability assessments, and continuous feedback loops ensuring bug-free execution.',
    deliverables: ['Modular Clean Code', 'Automated Unit & QA Tests', 'Bi-Weekly Demo Milestones']
  },
  {
    step: '04',
    shortName: 'Deployment',
    title: 'Delivery & Support',
    icon: Rocket,
    badge: 'Live Deployment & SLA',
    shortSummary: 'Production launch & proactive 24/7 SLA maintenance.',
    fullDesc: 'Production deployment, server optimization, full source code handover, and proactive 24/7 maintenance to guarantee zero downtime.',
    deliverables: ['Zero-Downtime Deployment', 'Full Source Code Handover', 'SLA-Backed Maintenance']
  }
];

export default function WorkProcessSection({ onOpenModal }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = PROCESS_STEPS.length;

  // Auto-advance step every 4.2 seconds (pauses on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % total);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered, total]);

  // Calculate sliding progress percentage (0% to 100%)
  const progressPercent = (activeStep / (total - 1)) * 100;

  return (
    <section id="work-process" className="section work-process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>HOW WE WORK</span>
          </div>
          <h2 className="section-title">
            Our Work <span className="text-highlight">Process</span>
          </h2>
          <p className="section-subtitle">
            A transparent, agile four-step methodology engineered for predictable delivery, robust code, and on-time launches.
          </p>
        </div>

        {/* Sliding Process Timeline Bar */}
        <div 
          className="process-timeline-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Base track */}
          <div className="process-timeline-track">
            {/* Sliding progress fill */}
            <div 
              className="process-timeline-fill" 
              style={{ width: `${progressPercent}%` }}
            >
              <div className="timeline-pulse-head" />
            </div>
          </div>

          {/* 4 Interactive Step Nodes */}
          <div className="process-timeline-nodes">
            {PROCESS_STEPS.map((s, idx) => {
              const isNodeActive = idx === activeStep;
              const isCompleted = idx < activeStep;

              return (
                <button
                  key={s.step}
                  type="button"
                  className={`timeline-node-item ${isNodeActive ? 'node-active' : ''} ${isCompleted ? 'node-completed' : ''}`}
                  onClick={() => setActiveStep(idx)}
                  aria-label={`Go to step ${s.step}: ${s.title}`}
                >
                  <div className="timeline-node-circle">
                    {isCompleted ? '✓' : s.step}
                  </div>
                  <span className="timeline-node-label">{s.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Process Step Cards with Smooth Hover Expansion */}
        <div 
          className="process-steps-grid"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = idx === activeStep;

            return (
              <div
                key={idx}
                className={`process-step-card ${isActive ? 'card-active' : ''}`}
                onClick={() => setActiveStep(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Step ${step.step}: ${step.title}`}
              >
                {/* Active Indicator Tag */}
                {isActive && (
                  <div className="step-active-indicator-tag">
                    <span className="step-indicator-pulse" />
                    <span>Current Stage</span>
                  </div>
                )}

                <div className="step-card-header">
                  <div className="step-number-tag">{step.step}</div>
                  <div className="step-icon-wrap">
                    <IconComponent size={20} />
                  </div>
                </div>

                <div className="step-badge-pill">{step.badge}</div>
                <h3 className="step-title">{step.title}</h3>
                
                {/* Short Concise Summary (Always visible in compact card) */}
                <p className="step-short-summary">{step.shortSummary}</p>

                {/* Subtle Hover Hint */}
                <div className="step-hover-hint">
                  <span>Hover to view deliverables</span>
                  <ChevronDown size={12} />
                </div>

                {/* Expandable Content (Unfolds smoothly on Hover) */}
                <div className="step-expandable-content">
                  <p className="step-full-desc">{step.fullDesc}</p>

                  <div className="step-deliverables-list">
                    {step.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="step-deliverable-item">
                        <CheckCircle2 size={13} className="deliverable-check" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Animated progress fill on active card */}
                {isActive && (
                  <div className="step-card-progress-timer">
                    <div className="step-card-progress-fill" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Process CTA Banner */}
        <div className="process-bottom-banner">
          <div className="banner-left">
            <Clock size={20} className="banner-clock-icon" />
            <div>
              <h4 className="banner-title">Need a custom roadmap for your project?</h4>
              <p className="banner-desc">Discuss your timeline and get a detailed execution plan within 24 hours.</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenModal && onOpenModal('Discuss Project Roadmap')}
          >
            <span>Plan Your Project</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
