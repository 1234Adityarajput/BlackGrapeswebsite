import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Save,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Heart,
  Mail,
  MessageSquare,
  Flame,
  Code,
  TrendingUp,
  Globe,
  BookOpen,
  Inbox,
  Award,
  DollarSign,
  MapPin,
  Clock,
  Building,
  Star,
  Search,
  Check
} from 'lucide-react';
import { getCareersPage, saveCareersPage, getEnquiries, updateEnquiryStatus } from '@backend/dataService';
import { DEFAULT_CAREERS_PAGE } from '@backend/defaultData';

export default function CareersManager() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'whyJoin' | 'form' | 'openings' | 'applications'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [applications, setApplications] = useState([]);

  // Job Modal State (for optional open positions)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    id: '',
    title: '',
    department: 'Engineering',
    location: 'Indore, MP (On-Site / Hybrid)',
    type: 'Full-Time',
    experience: '2 - 4 Years',
    salary: '₹4.5 LPA - ₹8.5 LPA',
    overview: '',
    responsibilities: [''],
    requirements: [''],
    status: 'Active'
  });

  // Pillar Modal State (for 4 why join pillars)
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState(null);
  const [pillarFormData, setPillarFormData] = useState({
    id: '',
    title: '',
    desc: '',
    icon: 'Code'
  });

  useEffect(() => {
    loadCareers();
    loadApplications();

    const handleUpdate = (e) => {
      if (e.detail?.key === 'careers_page') {
        loadCareers();
      }
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadCareers = async () => {
    const res = await getCareersPage();
    const isObsolete = res?.heroTitle?.includes('Digital Engineering') || res?.heroBadge?.includes('WE ARE HIRING') || res?.heroTitleAccent === 'Black Grapes Softech';
    const base = isObsolete ? DEFAULT_CAREERS_PAGE : (res || {});
    const merged = {
      ...DEFAULT_CAREERS_PAGE,
      ...base,
      heroBadge: (base.heroBadge && !base.heroBadge.includes('WE ARE HIRING')) ? base.heroBadge : DEFAULT_CAREERS_PAGE.heroBadge,
      heroTitle: (base.heroTitle && !base.heroTitle.includes('Digital Engineering')) ? base.heroTitle : DEFAULT_CAREERS_PAGE.heroTitle,
      heroTitleAccent: (base.heroTitleAccent && base.heroTitleAccent !== 'Black Grapes Softech') ? base.heroTitleAccent : DEFAULT_CAREERS_PAGE.heroTitleAccent,
      heroSubtitle: (base.heroSubtitle && !base.heroSubtitle.includes('passionate team')) ? base.heroSubtitle : DEFAULT_CAREERS_PAGE.heroSubtitle,
      whyJoin: {
        ...DEFAULT_CAREERS_PAGE.whyJoin,
        ...(base.whyJoin || {}),
        pillars: (base.whyJoin?.pillars && base.whyJoin.pillars.length > 0)
          ? base.whyJoin.pillars
          : DEFAULT_CAREERS_PAGE.whyJoin.pillars,
        contactCard: {
          ...DEFAULT_CAREERS_PAGE.whyJoin.contactCard,
          ...(base.whyJoin?.contactCard || {})
        }
      },
      applicationForm: {
        ...DEFAULT_CAREERS_PAGE.applicationForm,
        ...(base.applicationForm || {})
      },
      openingsSection: {
        ...DEFAULT_CAREERS_PAGE.openingsSection,
        ...(base.openingsSection || {})
      }
    };
    setData(merged);
  };

  const loadApplications = async () => {
    const list = await getEnquiries();
    const jobApps = list.filter(
      (e) =>
        (e.service && e.service.toLowerCase().includes('job')) ||
        (e.service && e.service.toLowerCase().includes('career')) ||
        (e.source && e.source.toLowerCase().includes('career'))
    );
    setApplications(jobApps);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveAll = async (overrideData = null) => {
    setSaving(true);
    const payload = overrideData && typeof overrideData === 'object' && !overrideData.preventDefault ? overrideData : data;
    await saveCareersPage(payload);
    setSaving(false);
    showToast('Careers page content published live to website via WebSocket!');
  };

  // --------------------------------------------------------------------------
  // PILLARS CRUD
  // --------------------------------------------------------------------------
  const openEditPillarModal = (pillar) => {
    setEditingPillar(pillar);
    setPillarFormData({
      id: pillar.id,
      title: pillar.title || '',
      desc: pillar.desc || '',
      icon: pillar.icon || 'Code'
    });
    setIsPillarModalOpen(true);
  };

  const handleSavePillar = async (e) => {
    e.preventDefault();
    if (!pillarFormData.title.trim()) {
      alert('Pillar title is required');
      return;
    }

    const currentPillars = [...(data.whyJoin?.pillars || [])];
    const updatedPillars = currentPillars.map((p) => (p.id === editingPillar.id ? pillarFormData : p));

    const updatedData = {
      ...data,
      whyJoin: {
        ...(data.whyJoin || {}),
        pillars: updatedPillars
      }
    };

    setData(updatedData);
    setIsPillarModalOpen(false);
    await handleSaveAll(updatedData);
  };

  // --------------------------------------------------------------------------
  // JOB OPENINGS CRUD
  // --------------------------------------------------------------------------
  const openNewJobModal = () => {
    setEditingJob(null);
    setJobFormData({
      id: `job-${Date.now()}`,
      title: '',
      department: 'Engineering',
      location: 'Indore, MP (On-Site / Hybrid)',
      type: 'Full-Time',
      experience: '2 - 4 Years',
      salary: '₹4.5 LPA - ₹8.5 LPA',
      overview: '',
      responsibilities: ['Architect modular and clean code.'],
      requirements: ['Strong technical foundation and passion to innovate.'],
      status: 'Active'
    });
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (job) => {
    setEditingJob(job);
    setJobFormData({
      id: job.id,
      title: job.title || '',
      department: job.department || 'Engineering',
      location: job.location || 'Indore, MP (On-Site / Hybrid)',
      type: job.type || 'Full-Time',
      experience: job.experience || '',
      salary: job.salary || '',
      overview: job.overview || '',
      responsibilities: Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? [...job.responsibilities] : [''],
      requirements: Array.isArray(job.requirements) && job.requirements.length > 0 ? [...job.requirements] : [''],
      status: job.status || 'Active'
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJobModal = async (e) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      alert('Job title is required');
      return;
    }

    let updatedOpenings = [...(data.openings || [])];
    if (editingJob) {
      updatedOpenings = updatedOpenings.map((j) => (j.id === editingJob.id ? jobFormData : j));
    } else {
      updatedOpenings.unshift(jobFormData);
    }

    const updatedData = { ...data, openings: updatedOpenings };
    setData(updatedData);
    setIsJobModalOpen(false);
    await handleSaveAll(updatedData);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Delete this job opening?')) return;
    const updated = (data.openings || []).filter((j) => j.id !== jobId);
    const updatedData = { ...data, openings: updated };
    setData(updatedData);
    await handleSaveAll(updatedData);
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading Careers Control Center...</div>;
  }

  return (
    <div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>Careers & Recruitment Manager</h1>
            <span className="badge badge-accent" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              LIVE PAGE
            </span>
          </div>
          <p className="admin-page-sub" style={{ margin: 0 }}>
            Manage the exact live sections of your website: Hero Banner, Why Join Us story & 4 Pillars, Talent Team Contacts, Drop Your Profile Form, and Open Vacancies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={async () => {
              if (window.confirm('Reset all careers page content to official live website text and pillars?')) {
                setData(DEFAULT_CAREERS_PAGE);
                await handleSaveAll(DEFAULT_CAREERS_PAGE);
                showToast('Reset to official live website content!');
              }
            }}
            title="Restore exact live website text and structure"
          >
            <span>Restore Live Content</span>
          </button>

          <a
            href="/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live careers page in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>

          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => handleSaveAll()}
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          type="button"
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={16} />
          <span>1. Hero & Intro</span>
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === 'whyJoin' ? 'active' : ''}`}
          onClick={() => setActiveTab('whyJoin')}
        >
          <Heart size={16} />
          <span>2. Why Join Us & 4 Pillars</span>
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          <Briefcase size={16} />
          <span>3. Drop Your Profile Form</span>
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === 'openings' ? 'active' : ''}`}
          onClick={() => setActiveTab('openings')}
        >
          <Flame size={16} />
          <span>4. Current Openings ({data.openings?.length || 0})</span>
        </button>

        <button
          type="button"
          className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Inbox size={16} />
          <span>5. Applications Desk ({applications.length})</span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: HERO & INTRO (Screenshot 1)
          ===================================================================== */}
      {activeTab === 'hero' && (
        <div>
          <div className="admin-card" style={{ maxWidth: '850px' }}>
            <h2 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#f86200" />
              <span>Main Hero Section (Header)</span>
            </h2>

            <div className="admin-form-group">
              <label className="admin-label">Hero Badge Pill</label>
              <input
                type="text"
                className="admin-input"
                value={data.heroBadge || ''}
                onChange={(e) => setData({ ...data, heroBadge: e.target.value })}
                placeholder="CAREERS AT BLACK GRAPES SOFTECH"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.heroTitle || ''}
                  onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
                  placeholder="Build Future-Defining Software"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Accent Text (Orange Gradient)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.heroTitleAccent || ''}
                  onChange={(e) => setData({ ...data, heroTitleAccent: e.target.value })}
                  placeholder="With Us"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Subtitle</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={data.heroSubtitle || ''}
                onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
                placeholder="Join an engineering-first technology powerhouse. We architect scalable enterprise systems, modern mobile platforms, and cloud AI ecosystems for global innovators."
              />
            </div>
          </div>

          {/* Bottom Save & Publish Action Bar */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
            <a href="/careers" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">
              <ExternalLink size={15} />
              <span>View Live Page</span>
            </a>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={() => handleSaveAll()}
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: WHY JOIN US & 4 PILLARS (Screenshot 1 & 2 Left Column)
          ===================================================================== */}
      {activeTab === 'whyJoin' && (
        <div>
          {/* Main Content Box */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <h2 className="admin-card-title">Where High-Velocity Talent Solves Real-World Engineering Scale</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Section Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.whyJoin?.badge || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: { ...(data.whyJoin || {}), badge: e.target.value }
                    })
                  }
                  placeholder="WHY JOIN BLACK GRAPES SOFTECH"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.whyJoin?.title || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: { ...(data.whyJoin || {}), title: e.target.value }
                    })
                  }
                  placeholder="Where High-Velocity Talent Solves Real-World Engineering Scale"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Lead Paragraph</label>
              <textarea
                className="admin-textarea"
                rows={4}
                value={data.whyJoin?.paragraph || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    whyJoin: { ...(data.whyJoin || {}), paragraph: e.target.value }
                  })
                }
                placeholder="With 10+ years of proven IT excellence in Indore and deployments across 15+ countries..."
              />
            </div>
          </div>

          {/* 4 Feature Pillars */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 1rem' }}>
              4 Value Pillars Cards (Modern Tech Stack, Rapid Velocity, etc.)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {(data.whyJoin?.pillars || []).map((pillar, pIdx) => (
                <div
                  key={pillar.id || pIdx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#f86200', fontWeight: 700 }}>
                        CARD #{pIdx + 1} • ICON: {pillar.icon}
                      </span>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={() => openEditPillarModal(pillar)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                      >
                        <Edit2 size={13} /> Edit Card
                      </button>
                    </div>

                    <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, margin: '0 0 0.35rem' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.84rem', margin: 0, lineHeight: 1.5 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Talent Team Contact Box */}
          <div className="admin-card" style={{ maxWidth: '750px' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: '0 0 0.5rem' }}>
              Direct Talent Team Contact Box
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.84rem', marginBottom: '1.25rem' }}>
              Displayed on the live website beneath the 4 pillars for direct candidate inquiries and WhatsApp connect.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Box Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.whyJoin?.contactCard?.title || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: {
                        ...(data.whyJoin || {}),
                        contactCard: { ...(data.whyJoin?.contactCard || {}), title: e.target.value }
                      }
                    })
                  }
                  placeholder="Direct Talent Team Contact"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Box Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.whyJoin?.contactCard?.subtitle || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: {
                        ...(data.whyJoin || {}),
                        contactCard: { ...(data.whyJoin?.contactCard || {}), subtitle: e.target.value }
                      }
                    })
                  }
                  placeholder="Have questions about working with us? Reach out directly."
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Talent Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={data.whyJoin?.contactCard?.email || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: {
                        ...(data.whyJoin || {}),
                        contactCard: { ...(data.whyJoin?.contactCard || {}), email: e.target.value }
                      }
                    })
                  }
                  placeholder="careers@blackgrapessoftech.com"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">WhatsApp Number / Helpline</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.whyJoin?.contactCard?.whatsapp || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      whyJoin: {
                        ...(data.whyJoin || {}),
                        contactCard: { ...(data.whyJoin?.contactCard || {}), whatsapp: e.target.value }
                      }
                    })
                  }
                  placeholder="+91 7470997884"
                />
              </div>
            </div>
          </div>

          {/* Bottom Save & Publish Action Bar */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
            <a href="/careers" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">
              <ExternalLink size={15} />
              <span>View Live Page</span>
            </a>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={() => handleSaveAll()}
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: DROP YOUR PROFILE FORM SETTINGS (Screenshot 1 & 2 Right Column)
          ===================================================================== */}
      {activeTab === 'form' && (
        <div>
          <div className="admin-card" style={{ maxWidth: '850px' }}>
            <h2 className="admin-card-title">"Drop Your Profile" Application Form Configuration</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Configure the heading, domain options, experience levels, and submit button of the live candidate application desk.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Form Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.applicationForm?.badge || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      applicationForm: { ...(data.applicationForm || {}), badge: e.target.value }
                    })
                  }
                  placeholder="DIRECT CAREER APPLICATION"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Form Card Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.applicationForm?.title || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      applicationForm: { ...(data.applicationForm || {}), title: e.target.value }
                    })
                  }
                  placeholder="Drop Your Profile"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Subtitle Description</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={data.applicationForm?.subtitle || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    applicationForm: { ...(data.applicationForm || {}), subtitle: e.target.value }
                  })
                }
                placeholder="Submit your credentials to join our engineering talent network. We evaluate every application thoroughly."
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Submit Button Text</label>
              <input
                type="text"
                className="admin-input"
                value={data.applicationForm?.submitBtnText || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    applicationForm: { ...(data.applicationForm || {}), submitBtnText: e.target.value }
                  })
                }
                placeholder="Submit Job Application ✈"
              />
            </div>
          </div>

          {/* Bottom Save & Publish Action Bar */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
            <a href="/careers" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">
              <ExternalLink size={15} />
              <span>View Live Page</span>
            </a>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={() => handleSaveAll()}
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: CURRENT OPENINGS & TALENT POOL (Screenshot 2 Bottom Section)
          ===================================================================== */}
      {activeTab === 'openings' && (
        <div>
          {/* Section Header & Empty State Settings */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <h2 className="admin-card-title">Explore Open Positions Section Settings</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.openingsSection?.badge || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openingsSection: { ...(data.openingsSection || {}), badge: e.target.value }
                    })
                  }
                  placeholder="CURRENT OPENINGS"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.openingsSection?.title || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openingsSection: { ...(data.openingsSection || {}), title: e.target.value }
                    })
                  }
                  placeholder="Explore Open Positions"
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section Subtitle</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={data.openingsSection?.subtitle || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    openingsSection: { ...(data.openingsSection || {}), subtitle: e.target.value }
                  })
                }
                placeholder="Discover public job vacancies and squad expansion opportunities at Black Grapes Softech."
              />
            </div>

            {/* Talent Pool Banner Settings (Screenshot 2) */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '1.25rem', marginTop: '1rem' }}>
              <h4 style={{ color: '#f86200', fontSize: '0.92rem', fontWeight: 700, margin: '0 0 0.85rem' }}>
                Talent Pool Banner Settings (Visible When 0 Active Openings)
              </h4>

              <div className="admin-form-group">
                <label className="admin-label">Banner Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.openingsSection?.emptyState?.title || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openingsSection: {
                        ...(data.openingsSection || {}),
                        emptyState: { ...(data.openingsSection?.emptyState || {}), title: e.target.value }
                      }
                    })
                  }
                  placeholder="No Specific Public Vacancies Listed Right Now"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Banner Message</label>
                <textarea
                  className="admin-textarea"
                  rows={3}
                  value={data.openingsSection?.emptyState?.desc || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openingsSection: {
                        ...(data.openingsSection || {}),
                        emptyState: { ...(data.openingsSection?.emptyState || {}), desc: e.target.value }
                      }
                    })
                  }
                  placeholder="All our core engineering, mobile app, and design squads are currently staffed..."
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label">CTA Button Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={data.openingsSection?.emptyState?.ctaText || ''}
                  onChange={(e) =>
                    setData({
                      ...data,
                      openingsSection: {
                        ...(data.openingsSection || {}),
                        emptyState: { ...(data.openingsSection?.emptyState || {}), ctaText: e.target.value }
                      }
                    })
                  }
                  placeholder="Join Talent Pool Above ↗"
                />
              </div>
            </div>
          </div>

          {/* Job Vacancies List */}
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
                  Active Job Openings ({(data.openings || []).length})
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.84rem', margin: '0.25rem 0 0' }}>
                  Add specific job positions whenever you are actively hiring. If empty, the website gracefully shows your Talent Pool banner.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={openNewJobModal}
                >
                  <Plus size={16} />
                  <span>Add New Vacancy</span>
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary"
                  onClick={() => handleSaveAll()}
                  disabled={saving}
                >
                  <Save size={16} />
                  <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </div>

            {(!data.openings || data.openings.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px' }}>
                <Briefcase size={36} style={{ color: '#64748b', margin: '0 auto 0.75rem' }} />
                <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: '0 0 0.35rem' }}>
                  No Vacancies Listed (Talent Pool Active on Live Site)
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', maxWidth: '520px', margin: '0 auto 1.25rem' }}>
                  Currently, your website shows the "No Specific Public Vacancies Listed Right Now" banner matching your live screenshot. Click "+ Add New Vacancy" whenever you want to publish an open position.
                </p>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={openNewJobModal}>
                  <Plus size={15} /> Add Opening
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.openings.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>
                          {job.title}
                        </h4>
                        <span className="badge badge-accent" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', fontSize: '0.72rem' }}>
                          {job.department}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>⭐ {job.experience}</span>
                        {job.salary && <span>💰 {job.salary}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.45rem' }}>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary"
                        onClick={() => openEditJobModal(job)}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        <Edit2 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger"
                        onClick={() => handleDeleteJob(job.id)}
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Save & Publish Action Bar */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
            <a href="/careers" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary">
              <ExternalLink size={15} />
              <span>View Live Page</span>
            </a>
            <button
              type="button"
              className="admin-btn admin-btn-primary"
              onClick={() => handleSaveAll()}
              disabled={saving}
            >
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: CANDIDATE APPLICATIONS DESK
          ===================================================================== */}
      {activeTab === 'applications' && (
        <div>
          <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 className="admin-card-title" style={{ margin: 0 }}>Candidate Applications ({applications.length})</h2>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.35rem 0 0' }}>
                  Resumes, portfolios, and job applications submitted through the Careers portal.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={loadApplications}
              >
                Refresh List
              </button>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="admin-card text-center" style={{ padding: '3.5rem 1rem' }}>
              <Inbox size={42} style={{ color: '#64748b', margin: '0 auto 1rem' }} />
              <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>No job applications received yet</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>
                When candidates submit their profiles via the live Careers page, they will instantly appear here with their resumes.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map((app) => (
                <div key={app.id} className="admin-card" style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                        <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                          {app.name}
                        </h4>
                        <span className="badge" style={{ background: 'rgba(248, 98, 0, 0.15)', color: '#f86200', border: '1px solid rgba(248, 98, 0, 0.3)' }}>
                          {app.service || app.scope || 'Job Application'}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', color: '#94a3b8', fontSize: '0.84rem', marginBottom: '0.65rem' }}>
                        <a href={`mailto:${app.email}`} style={{ color: '#f86200', textDecoration: 'none' }}>
                          ✉ {app.email}
                        </a>
                        <a href={`tel:${app.phone}`} style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                          📞 {app.phone}
                        </a>
                      </div>

                      {app.requirement && (
                        <p style={{ color: '#ff9e42', fontSize: '0.82rem', margin: '0 0 0.5rem', fontWeight: 600 }}>
                          {app.requirement}
                        </p>
                      )}

                      <p style={{ color: '#cbd5e1', fontSize: '0.86rem', whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.5 }}>
                        {app.message}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <select
                        className="admin-input"
                        value={app.status || 'new'}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          await updateEnquiryStatus(app.id, newStatus);
                          loadApplications();
                          showToast(`Status updated to ${newStatus}`);
                        }}
                        style={{ width: '130px', fontSize: '0.8rem', padding: '0.35rem' }}
                      >
                        <option value="new">● New</option>
                        <option value="in_review">🔍 Reviewing</option>
                        <option value="shortlisted">⭐ Shortlisted</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="rejected">✕ Rejected</option>
                        <option value="hired">✓ Hired</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          MODAL: EDIT PILLAR (Why Join Us Feature Card)
          ===================================================================== */}
      {isPillarModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsPillarModalOpen(false)}>
          <div className="admin-modal-box" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Edit Value Pillar Card</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsPillarModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSavePillar}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-label">Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={pillarFormData.title}
                    onChange={(e) => setPillarFormData({ ...pillarFormData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Icon</label>
                  <select
                    className="admin-input"
                    value={pillarFormData.icon}
                    onChange={(e) => setPillarFormData({ ...pillarFormData, icon: e.target.value })}
                  >
                    <option value="Code">Code (&lt; / &gt;)</option>
                    <option value="TrendingUp">TrendingUp (Rocket / Chart)</option>
                    <option value="Globe">Globe (Global)</option>
                    <option value="BookOpen">BookOpen (Learning)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Description *</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={pillarFormData.desc}
                    onChange={(e) => setPillarFormData({ ...pillarFormData, desc: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsPillarModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>Save & Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADD / EDIT JOB OPENING
          ===================================================================== */}
      {isJobModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsJobModalOpen(false)}>
          <div className="admin-modal-box" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">{editingJob ? 'Edit Job Opening' : 'Add New Vacancy'}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setIsJobModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveJobModal}>
              <div className="admin-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Job Title *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={jobFormData.title}
                    onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    placeholder="e.g. Senior Full Stack Developer"
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Department</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={jobFormData.department}
                      onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Job Type</label>
                    <select
                      className="admin-input"
                      value={jobFormData.type}
                      onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Experience Required</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={jobFormData.experience}
                      onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                      placeholder="e.g. 2 - 4 Years"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Salary Bracket</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={jobFormData.salary}
                      onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                      placeholder="e.g. ₹5.0 LPA - ₹9.0 LPA"
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Location</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    placeholder="Indore, MP (On-Site / Hybrid)"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Overview</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={jobFormData.overview}
                    onChange={(e) => setJobFormData({ ...jobFormData, overview: e.target.value })}
                    placeholder="Job description..."
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsJobModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>Save & Publish Live</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
