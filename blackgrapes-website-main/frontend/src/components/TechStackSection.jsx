import React, { useState } from 'react';
import { TechLogo } from './TechLogos';

const TECH_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'AI & Machine Learning' },
  { id: 'tools', label: 'Tools & Design' }
];

const TECH_SECTIONS = [
  {
    id: 'frontend',
    title: 'FRONTEND ARCHITECTURE',
    items: [
      { name: 'Redux', desc: 'Predictable centralized global state container' },
      { name: 'Next.js', desc: 'SSR, SSG, and sub-second web performance' },
      { name: 'React', desc: 'Component architecture & interactive SPAs' },
      { name: 'Webpack', desc: 'Optimized asset bundling & code splitting' },
      { name: 'TypeScript', desc: 'Type-safe scalable JavaScript codebases' },
      { name: 'Auth0', desc: 'Universal enterprise authentication & SSO' },
      { name: 'HTML5', desc: 'Semantic, accessible, modern web structure' },
      { name: 'CSS3', desc: 'Advanced animations, layouts & fluid design' },
      { name: 'Tailwind CSS', desc: 'Utility-first modern responsive UI styling' },
      { name: 'Vue.js', desc: 'Progressive, reactive user interface framework' },
      { name: 'Three.js', desc: 'Interactive 3D graphics & WebGL rendering' }
    ]
  },
  {
    id: 'backend',
    title: 'BACKEND & MICROSERVICES',
    items: [
      { name: 'Express.js', desc: 'Fast, unopinionated minimalist web framework' },
      { name: 'Node.js', desc: 'Event-driven asynchronous microservices' },
      { name: 'Nest.js', desc: 'Enterprise TypeScript progressive server architecture' },
      { name: 'Python', desc: 'FastAPI, automation pipelines & machine learning' },
      { name: 'FastAPI', desc: 'High-performance async Python APIs' },
      { name: 'Django', desc: 'Batteries-included secure web framework' },
      { name: 'GraphQL', desc: 'Declarative, client-driven data query language' },
      { name: 'REST APIs', desc: 'Standardized stateless HTTP API architectures' }
    ]
  },
  {
    id: 'databases',
    title: 'DATABASES & STORAGE',
    items: [
      { name: 'PostgreSQL', desc: 'ACID-compliant enterprise relational database' },
      { name: 'MongoDB', desc: 'Flexible JSON documents for high volume data' },
      { name: 'Redis', desc: 'Ultra-low latency in-memory sessions & cache' },
      { name: 'MySQL', desc: 'High-performance transactional relational DB' },
      { name: 'Firebase', desc: 'Realtime database & serverless backend cloud' },
      { name: 'Supabase', desc: 'Open-source Postgres backend with realtime sync' }
    ]
  },
  {
    id: 'mobile',
    title: 'MOBILE ECOSYSTEM',
    items: [
      { name: 'Flutter', desc: 'High-performance 60fps iOS & Android apps' },
      { name: 'React Native', desc: 'Native app experiences with React ecosystem' },
      { name: 'Swift (iOS)', desc: 'Optimized iOS apps with Cupertino fidelity' },
      { name: 'Kotlin (Android)', desc: 'Robust modern native Android engineering' }
    ]
  },
  {
    id: 'cloud',
    title: 'CLOUD, DEVOPS & INFRASTRUCTURE',
    items: [
      { name: 'AWS Cloud', desc: 'EC2, S3, RDS, CloudFront & scalable VPCs' },
      { name: 'Docker', desc: 'Isolated reproducible application containers' },
      { name: 'Kubernetes', desc: 'Automated container scaling & orchestration' },
      { name: 'Vercel', desc: 'Edge-optimized zero-config deployments' },
      { name: 'GitHub Actions', desc: 'Continuous testing & automated CI/CD pipelines' },
      { name: 'Google Cloud', desc: 'BigQuery, App Engine & Google Cloud infra' }
    ]
  },
  {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE & LLM',
    items: [
      { name: 'OpenAI', desc: 'GPT-4o, embeddings & generative AI integrations' },
      { name: 'PyTorch', desc: 'Deep learning & neural network training' },
      { name: 'AI Agents / RAG', desc: 'Autonomous multi-agent workflows & vector search' },
      { name: 'TensorFlow', desc: 'Production-grade machine learning pipelines' }
    ]
  },
  {
    id: 'tools',
    title: 'DESIGN & DEVELOPMENT TOOLS',
    items: [
      { name: 'Figma', desc: 'Collaborative UI/UX prototyping & design systems' },
      { name: 'Postman', desc: 'API testing, mocking & contract verification' },
      { name: 'Git', desc: 'Distributed version control & branch workflows' },
      { name: 'GitHub', desc: 'Code review, project tracking & team DevOps' }
    ]
  }
];

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleSections = activeCategory === 'all'
    ? TECH_SECTIONS
    : TECH_SECTIONS.filter(sec => sec.id === activeCategory);

  return (
    <section id="tech-stack" className="tech-stack-section">
      {/* Background Ambient Glow */}
      <div className="tech-stack-ambient-glow" aria-hidden="true" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header (SS2 Match) */}
        <div className="section-header text-center" style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '0.85rem'
            }}
          >
            Technology Stack
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#94a3b8',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Our choice of technology stack was critical to the project's success. It included:
          </p>
        </div>

        {/* Category Jump Filter Pills */}
        <div className="tech-filter-tabs">
          {TECH_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`tech-tab-btn ${activeCategory === cat.id ? 'tech-tab-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Technology Sections with Circular Dashed Nodes (SS2 & SS3 Match) */}
        <div className="tech-stack-groups-wrapper">
          {visibleSections.map(section => (
            <div key={section.id} className="tech-category-group">
              {/* Category Divider Header */}
              <div className="tech-category-divider">
                <span className="tech-divider-line" />
                <h3 className="tech-category-title">{section.title}</h3>
                <span className="tech-divider-line" />
              </div>

              {/* Centered Circular Dashed Nodes */}
              <div className="tech-nodes-container">
                {section.items.map(item => (
                  <div
                    key={item.name}
                    className="tech-circle-node"
                    tabIndex={0}
                    role="button"
                    aria-label={item.name}
                  >
                    {/* Monochrome Vector Logo */}
                    <div className="tech-circle-icon">
                      <TechLogo name={item.name} size={25} />
                    </div>

                    {/* Small Clean Label underneath icon */}
                    <span className="tech-circle-label">{item.name}</span>

                    {/* Interactive Floating Tooltip on Hover */}
                    <div className="tech-node-tooltip">
                      <span className="tooltip-title">{item.name}</span>
                      <span className="tooltip-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
