import React, { useState, useEffect } from 'react';
import {
  Users,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  Inbox,
  Flame,
  ExternalLink,
  Image as ImageIcon,
  Sparkles,
  Layers,
  MapPin,
  Briefcase,
  FileText,
  UserCheck,
  Send,
  GraduationCap,
  Quote,
  Star
} from 'lucide-react';
import { getITStaffing, saveITStaffing, getEnquiries, updateEnquiryStatus } from '@backend/dataService';
import MediaPickerModal from '../components/MediaPickerModal';

export default function ITStaffingManager() {
  const [data, setData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'stats', 'expansion', 'ways', 'growth_process', 'compliance', 'testimonials', 'models', 'leads'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('hero'); // 'hero' or 'compliance'

  useEffect(() => {
    loadData();
    loadLeads();
    const handleUpdate = () => {
      loadLeads();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadData = async () => {
    const res = await getITStaffing();
    setData(res || {});
  };

  const loadLeads = async () => {
    const list = await getEnquiries();
    const staffingLeads = list.filter(
      (e) => (e.service && e.service.toLowerCase().includes('staffing')) || (e.source && e.source.toLowerCase().includes('staffing'))
    );
    setEnquiries(staffingLeads);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveITStaffing(data);
    setSaving(false);
    showToast('IT Staffing content published live to website via WebSocket!');
  };

  // Stat Handlers
  const handleStatChange = (idx, field, val) => {
    const stats = [...(data.stats || [])];
    stats[idx] = { ...stats[idx], [field]: val };
    setData({ ...data, stats });
  };

  // Scenario Handlers (Expansion Challenge)
  const handleScenarioChange = (idx, field, val) => {
    const scenarios = [...(data.scenarios || [])];
    scenarios[idx] = { ...scenarios[idx], [field]: val };
    setData({ ...data, scenarios });
  };

  // Strategic Ways Handlers
  const handleWayChange = (idx, field, val) => {
    const ways = [...(data.ways || [])];
    ways[idx] = { ...ways[idx], [field]: val };
    setData({ ...data, ways });
  };

  // Growth Pillars Handlers
  const handleGrowthPillarChange = (idx, field, val) => {
    const growthPillars = [...(data.growthPillars || [])];
    growthPillars[idx] = { ...growthPillars[idx], [field]: val };
    setData({ ...data, growthPillars });
  };

  // Process Steps Handlers
  const handleProcessStepChange = (idx, field, val) => {
    const processSteps = [...(data.processSteps || [])];
    processSteps[idx] = { ...processSteps[idx], [field]: val };
    setData({ ...data, processSteps });
  };

  // Compliance Stats Handlers
  const handleComplianceStatChange = (idx, field, val) => {
    const complianceStats = [...(data.complianceStats || [])];
    complianceStats[idx] = { ...complianceStats[idx], [field]: val };
    setData({ ...data, complianceStats });
  };

  // Testimonial Handlers
  const handleTestimonialChange = (idx, field, val) => {
    const testimonials = [...(data.testimonials || [])];
    testimonials[idx] = { ...testimonials[idx], [field]: val };
    setData({ ...data, testimonials });
  };

  const handleAddTestimonial = () => {
    const testimonials = [...(data.testimonials || [])];
    testimonials.push({
      id: `t-${Date.now()}`,
      name: 'New Client Name',
      role: 'CEO / Business Leader',
      company: 'Enterprise Partner',
      rating: 5,
      quote: 'Outstanding manpower staffing and IT engineering support that accelerated our expansion timelines.'
    });
    setData({ ...data, testimonials });
  };

  const handleDeleteTestimonial = (idx) => {
    const testimonials = (data.testimonials || []).filter((_, i) => i !== idx);
    setData({ ...data, testimonials });
  };

  // Model Handlers
  const handleModelChange = (idx, field, val) => {
    const models = [...(data.models || [])];
    models[idx] = { ...models[idx], [field]: val };
    setData({ ...data, models });
  };

  const handleAddModel = () => {
    const models = [...(data.models || [])];
    models.push({
      id: `model-${Date.now()}`,
      title: 'New Hiring Model',
      desc: 'Description of candidate sourcing and engagement framework.',
      rate: 'From $20/hr',
      bestFor: 'High-growth startups'
    });
    setData({ ...data, models });
  };

  const handleDeleteModel = (idx) => {
    const models = (data.models || []).filter((_, i) => i !== idx);
    setData({ ...data, models });
  };

  const openMediaPicker = (target) => {
    setMediaTarget(target);
    setIsMediaPickerOpen(true);
  };

  const handleSelectMedia = (item) => {
    if (item && item.url) {
      if (mediaTarget === 'compliance') {
        setData((prev) => ({ ...prev, complianceImage: item.url }));
        showToast('Compliance showcase image selected from Media Library');
      } else {
        setData((prev) => ({ ...prev, heroImage: item.url }));
        showToast('Showcase image selected from Media Library');
      }
    }
    setIsMediaPickerOpen(false);
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading IT Staffing Control Center...</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">IT Staffing Solutions Manager</h1>
          <p className="admin-page-sub">
            Complete control over all sections: hero banner, mandate form, expansion challenges, 3 strategic ways, growth pillars, process pipeline, 28 states compliance, and client testimonials.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/it-staffing"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live page in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Flame size={16} />
          <span>Hero Banner & Mandate Form</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <ShieldCheck size={16} />
          <span>Key Numbers Strip</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'expansion' ? 'active' : ''}`}
          onClick={() => setActiveTab('expansion')}
        >
          <Briefcase size={16} />
          <span>Expansion Challenge ({data.scenarios?.length || 3})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'ways' ? 'active' : ''}`}
          onClick={() => setActiveTab('ways')}
        >
          <Award size={16} />
          <span>3 Strategic Ways & CTA</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'growth_process' ? 'active' : ''}`}
          onClick={() => setActiveTab('growth_process')}
        >
          <TrendingUp size={16} />
          <span>Growth Pillars & Process</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          <MapPin size={16} />
          <span>28 States Compliance</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'testimonials' ? 'active' : ''}`}
          onClick={() => setActiveTab('testimonials')}
        >
          <Quote size={16} />
          <span>Testimonials ({data.testimonials?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'models' ? 'active' : ''}`}
          onClick={() => setActiveTab('models')}
        >
          <Users size={16} />
          <span>Hiring Models ({data.models?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          <Inbox size={16} />
          <span>Staffing Enquiries ({enquiries.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: HERO & MANDATE LEAD FORM
          ========================================================================= */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Flame size={18} color="#ff6b00" />
                Hero Banner & Direct Mandate Form (Both Columns)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                All content shown in the top 2-column section of the IT Staffing page is configured here.
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Left Column */}
          <div style={{ marginBottom: '2rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: '#ff6b00', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              1. Hero Left Column (Headlines, Image & Badges)
            </h4>

            <div className="admin-form-group">
              <label className="admin-label">Top Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. BLACK GRAPES SOFTECH • IT STAFFING & MANPOWER SOLUTIONS"
                value={data.badge || ''}
                onChange={(e) => setData({ ...data, badge: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Main H1 Headline</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Stay on course with growth plans by"
                  value={data.headline || ''}
                  onChange={(e) => setData({ ...data, headline: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Headline Highlight Accent (Neon Flame text)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. hiring contractual staff"
                  value={data.headlineAccent || ''}
                  onChange={(e) => setData({ ...data, headlineAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Lead Subtitle (Orange text)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Outsource your manpower needs with prompt."
                value={data.subtitle || ''}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Narrative Overview Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Paragraph describing pre-vetted engineers, 28 states compliance, etc..."
                value={data.description || ''}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Hero Showcase Image URL</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/it-staffing/staffing-hero.jpg or https://..."
                  value={data.heroImage || ''}
                  onChange={(e) => setData({ ...data, heroImage: e.target.value })}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker('hero')}
                  className="admin-btn admin-btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <ImageIcon size={16} />
                  <span>Media Library</span>
                </button>
              </div>
              {data.heroImage && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Preview:</span>
                  <img
                    src={data.heroImage}
                    alt="Hero Preview"
                    style={{ height: '48px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>

            <div className="admin-grid-2">
              <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 'bold' }}>Floating Badge 1 (Top-Right)</span>
                <div className="admin-form-group" style={{ marginTop: '0.5rem' }}>
                  <label className="admin-label">Number / Metric</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. 28 States"
                    value={data.badge1Val || ''}
                    onChange={(e) => setData({ ...data, badge1Val: e.target.value })}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Subtitle Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. 100% Compliant"
                    value={data.badge1Sub || ''}
                    onChange={(e) => setData({ ...data, badge1Sub: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.82rem', color: '#f86200', fontWeight: 'bold' }}>Floating Badge 2 (Bottom-Left)</span>
                <div className="admin-form-group" style={{ marginTop: '0.5rem' }}>
                  <label className="admin-label">Number / Metric</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. 25,000+ Staff"
                    value={data.badge2Val || ''}
                    onChange={(e) => setData({ ...data, badge2Val: e.target.value })}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Subtitle Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Active on Payroll"
                    value={data.badge2Sub || ''}
                    onChange={(e) => setData({ ...data, badge2Sub: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Mandate Form */}
          <div>
            <h4 style={{ color: '#ff6b00', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              2. Hero Right Column (Direct Staffing Mandate Form)
            </h4>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Form Top Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Direct Staffing Mandate Form"
                  value={data.formBadge || ''}
                  onChange={(e) => setData({ ...data, formBadge: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Form Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Outsource Your Manpower Needs"
                  value={data.formTitle || ''}
                  onChange={(e) => setData({ ...data, formTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Form Subtitle / Quotation Guarantee</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Get a tailored contract staffing quotation with SLA confirmation in 2 business hours."
                value={data.formSubtitle || ''}
                onChange={(e) => setData({ ...data, formSubtitle: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Submit Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Send Staffing Inquiry"
                  value={data.formBtnText || ''}
                  onChange={(e) => setData({ ...data, formBtnText: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Form Footer Trust / Privacy Note</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 100% Confidential • Zero Commitment Required • NDA Protected"
                  value={data.formFooterNotice || ''}
                  onChange={(e) => setData({ ...data, formFooterNotice: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Staffing Services Offered (Comma-separated)</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={(data.staffingServices || []).join(', ')}
                  onChange={(e) =>
                    setData({
                      ...data,
                      staffingServices: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Mandate Range Options (Comma-separated)</label>
                <textarea
                  rows={3}
                  className="admin-textarea"
                  value={(data.mandateOptions || []).join(', ')}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mandateOptions: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: KEY NUMBERS STRIP & GUARANTEES
          ========================================================================= */}
      {activeTab === 'stats' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                Key Numbers Strip (4 Highlight Cards Below Hero)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                These 4 cyber glass cards appear directly underneath the hero section.
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Metrics'}</span>
            </button>
          </div>

          <div className="admin-grid-2">
            {(data.stats || []).map((stat, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ color: '#ff6b00', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                  Stat Card #{idx + 1}
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Stat Value / Number (e.g. 25,000+, 28 States, 98.4%)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.value || stat.number || ''}
                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Title / Headline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.label || stat.title || ''}
                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Description / Subline</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={stat.desc || stat.sub || ''}
                    onChange={(e) => handleStatChange(idx, 'desc', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-form-group" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <label className="admin-label">Key Guarantee Bullet Points (One per line)</label>
            <textarea
              rows={4}
              className="admin-textarea"
              value={(data.guaranteePoints || []).join('\n')}
              onChange={(e) =>
                setData({
                  ...data,
                  guaranteePoints: e.target.value.split('\n').filter(Boolean)
                })
              }
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: THE EXPANSION CHALLENGE (From User's Screenshot 1)
          ========================================================================= */}
      {activeTab === 'expansion' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={18} color="#c084fc" />
                The Expansion Challenge (Photo 1 Section)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Edit the section badge, headline, overview paragraph, and the 3 critical scenario cards directly from here.
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Section Main Headers */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-form-group">
              <label className="admin-label">Section Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. THE EXPANSION CHALLENGE"
                value={data.expansionBadge || ''}
                onChange={(e) => setData({ ...data, expansionBadge: e.target.value })}
              />
            </div>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Title Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. How does your company address new"
                  value={data.expansionTitle || ''}
                  onChange={(e) => setData({ ...data, expansionTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Title Accent (Neon Flame Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Manpower staffing requirements"
                  value={data.expansionTitleAccent || ''}
                  onChange={(e) => setData({ ...data, expansionTitleAccent: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Title Suffix</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. as it expands?"
                  value={data.expansionTitleSuffix || ''}
                  onChange={(e) => setData({ ...data, expansionTitleSuffix: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Overview Subtitle Paragraph</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="Balancing talent management with rapid business growth in new locations poses challenges..."
                value={data.expansionSubtitle || ''}
                onChange={(e) => setData({ ...data, expansionSubtitle: e.target.value })}
              />
            </div>
          </div>

          {/* 3 Scenario Cards */}
          <div>
            <h4 style={{ color: '#c084fc', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              3 Scenario Cards
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(data.scenarios || []).map((scenario, sIdx) => {
                const isHighlight = sIdx === 2;
                return (
                  <div
                    key={sIdx}
                    style={{
                      padding: '1.25rem',
                      background: isHighlight ? 'rgba(248, 98, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: isHighlight ? '1px solid rgba(248, 98, 0, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px'
                    }}
                  >
                    <div style={{ color: isHighlight ? '#ff6b00' : '#c084fc', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                      {isHighlight ? `Card #${sIdx + 1} (Highlighted Support Action Card)` : `Card #${sIdx + 1} (Scenario Card)`}
                    </div>

                    <div className="admin-grid-2">
                      <div className="admin-form-group">
                        <label className="admin-label">Card Title</label>
                        <input
                          type="text"
                          className="admin-input"
                          value={scenario.title || ''}
                          onChange={(e) => handleScenarioChange(sIdx, 'title', e.target.value)}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label">
                          {isHighlight ? 'Action Button Text' : 'Bottom Pill Tag'}
                        </label>
                        {isHighlight ? (
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Request HR Support"
                            value={scenario.btnText || ''}
                            onChange={(e) => handleScenarioChange(sIdx, 'btnText', e.target.value)}
                          />
                        ) : (
                          <input
                            type="text"
                            className="admin-input"
                            placeholder="e.g. Critical Scenario 01"
                            value={scenario.tag || ''}
                            onChange={(e) => handleScenarioChange(sIdx, 'tag', e.target.value)}
                          />
                        )}
                      </div>
                    </div>

                    <div className="admin-form-group" style={{ marginBottom: 0 }}>
                      <label className="admin-label">Card Description</label>
                      <textarea
                        rows={2}
                        className="admin-textarea"
                        value={scenario.desc || ''}
                        onChange={(e) => handleScenarioChange(sIdx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: 3 STRATEGIC WAYS & CTA BANNER (Photo 1 Lower Section)
          ========================================================================= */}
      {activeTab === 'ways' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="#f86200" />
                3 Strategic Ways We Offer Assistance & CTA Banner
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Manage the "Proven Strategic Value" headline, the 3 assistance cards, and bottom "Enquire Now" CTA banner.
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Section Main Headers */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-form-group">
              <label className="admin-label">Section Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. PROVEN STRATEGIC VALUE"
                value={data.waysBadge || ''}
                onChange={(e) => setData({ ...data, waysBadge: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Main Heading</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="e.g. As Prompt Personnel, we're the top choice for staffing and HR solutions among leading MNCs and Indian businesses."
                value={data.waysTitle || ''}
                onChange={(e) => setData({ ...data, waysTitle: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Subtitle Label</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Here are 3 ways through which we can offer assistance:"
                value={data.waysSubtitle || ''}
                onChange={(e) => setData({ ...data, waysSubtitle: e.target.value })}
              />
            </div>
          </div>

          {/* 3 Ways Cards */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#f86200', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              3 Assistance Cards
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(data.ways || []).map((way, wIdx) => (
                <div
                  key={wIdx}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px'
                  }}
                >
                  <div style={{ color: '#ff6b00', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                    Way #{wIdx + 1} (Watermark {way.number || `0${wIdx + 1}`})
                  </div>

                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label">Watermark Number</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. 01"
                        value={way.number || ''}
                        onChange={(e) => handleWayChange(wIdx, 'number', e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Action Button Text</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Learn More About Bulk Hiring"
                        value={way.btnText || ''}
                        onChange={(e) => handleWayChange(wIdx, 'btnText', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Card Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={way.title || ''}
                      onChange={(e) => handleWayChange(wIdx, 'title', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Card Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={way.desc || ''}
                      onChange={(e) => handleWayChange(wIdx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: '#ff6b00', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Bottom "Enquire Now" CTA Banner
            </h4>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Banner Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Ready to discuss your contractual staff requirements?"
                  value={data.ctaBannerTitle || ''}
                  onChange={(e) => setData({ ...data, ctaBannerTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Banner Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Enquire Now"
                  value={data.ctaBannerBtn || ''}
                  onChange={(e) => setData({ ...data, ctaBannerBtn: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Banner Subtitle / Description</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Our talent advisors will configure an agile staffing model custom tailored to your timelines."
                value={data.ctaBannerDesc || ''}
                onChange={(e) => setData({ ...data, ctaBannerDesc: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: GROWTH PILLARS & DELIVERY PROCESS
          ========================================================================= */}
      {activeTab === 'growth_process' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="#38bdf8" />
                Contingent Growth Pillars & 3-Stage Process Pipeline
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Customize both the 3 strategic growth pillars and the 3-stage delivery pipeline (Source, Train, Deploy).
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Part A: Contingent Growth Pillars */}
          <div style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Part A: Contingent Growth Pillars (Strategic Advantage)
            </h4>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Pillars Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. STRATEGIC ADVANTAGE"
                  value={data.growthBadge || ''}
                  onChange={(e) => setData({ ...data, growthBadge: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. How Contingent Staffing Firm can help you"
                  value={data.growthTitle || ''}
                  onChange={(e) => setData({ ...data, growthTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Accent (Neon Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. stay focused on Growth?"
                  value={data.growthTitleAccent || ''}
                  onChange={(e) => setData({ ...data, growthTitleAccent: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {(data.growthPillars || []).map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Pillar #{pIdx + 1}
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label">Pillar Badge Tag</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Pillar 01"
                        value={pillar.badge || ''}
                        onChange={(e) => handleGrowthPillarChange(pIdx, 'badge', e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Key Advantage / Perk Highlight</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Zero severance or permanent liability"
                        value={pillar.perk || ''}
                        onChange={(e) => handleGrowthPillarChange(pIdx, 'perk', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Pillar Heading</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={pillar.heading || ''}
                      onChange={(e) => handleGrowthPillarChange(pIdx, 'heading', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Pillar Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={pillar.desc || ''}
                      onChange={(e) => handleGrowthPillarChange(pIdx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part B: Flexible Staffing Delivery Process */}
          <div>
            <h4 style={{ color: '#c084fc', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Part B: Flexible Staffing Delivery Process (Our Process Pipeline)
            </h4>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Process Eyebrow Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. SYSTEMATIC METHODOLOGY"
                  value={data.processBadge || ''}
                  onChange={(e) => setData({ ...data, processBadge: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Prefix</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. What does our Flexible Staffing Services include:"
                  value={data.processTitle || ''}
                  onChange={(e) => setData({ ...data, processTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Accent</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Our Process"
                  value={data.processTitleAccent || ''}
                  onChange={(e) => setData({ ...data, processTitleAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Process Subtitle</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. A battle-tested 3-stage delivery pipeline ensuring pre-vetted, high-performance talent deployed seamlessly..."
                value={data.processSubtitle || ''}
                onChange={(e) => setData({ ...data, processSubtitle: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              {(data.processSteps || []).map((step, stIdx) => (
                <div
                  key={stIdx}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ color: '#c084fc', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Process Stage #{stIdx + 1}
                  </div>
                  <div className="admin-grid-2">
                    <div className="admin-form-group">
                      <label className="admin-label">Stage Step Tag</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. Step 01"
                        value={step.tag || ''}
                        onChange={(e) => handleProcessStepChange(stIdx, 'tag', e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Stage Title</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="e.g. 1. Source"
                        value={step.title || ''}
                        onChange={(e) => handleProcessStepChange(stIdx, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Stage Description</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={step.desc || ''}
                      onChange={(e) => handleProcessStepChange(stIdx, 'desc', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Stage Key Metrics / Bullets (One per line)</label>
                    <textarea
                      rows={2}
                      className="admin-textarea"
                      value={Array.isArray(step.metrics) ? step.metrics.join('\n') : ''}
                      onChange={(e) =>
                        handleProcessStepChange(
                          stIdx,
                          'metrics',
                          e.target.value.split('\n').filter(Boolean)
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: 28 STATES COMPLIANCE NETWORK
          ========================================================================= */}
      {activeTab === 'compliance' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="#10b981" />
                Nationwide 28 States Compliance Network
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Configure the compliance headline, 5 nationwide stat boxes, showcase map image, and statutory compliance checklist tags.
              </p>
            </div>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Changes'}</span>
            </button>
          </div>

          {/* Headlines & Lead */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-form-group">
              <label className="admin-label">Section Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. NATIONWIDE COMPLIANCE NETWORK"
                value={data.complianceBadge || ''}
                onChange={(e) => setData({ ...data, complianceBadge: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Why Prompt should be your go-to-partner in Manpower Staffing"
                  value={data.complianceHeading || ''}
                  onChange={(e) => setData({ ...data, complianceHeading: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Highlight Accent</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. 28 States Compliance Expertise."
                  value={data.complianceHeadingAccent || ''}
                  onChange={(e) => setData({ ...data, complianceHeadingAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Compliance Overview Description</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Managing contingent workforces across multiple state boundaries demands rigorous compliance..."
                value={data.complianceDesc || ''}
                onChange={(e) => setData({ ...data, complianceDesc: e.target.value })}
              />
            </div>

            {/* Compliance Showcase Image */}
            <div className="admin-form-group">
              <label className="admin-label">Compliance Network Graphic Image URL</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/it-staffing/staffing-compliance.png or https://..."
                  value={data.complianceImage || ''}
                  onChange={(e) => setData({ ...data, complianceImage: e.target.value })}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => openMediaPicker('compliance')}
                  className="admin-btn admin-btn-secondary"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <ImageIcon size={16} />
                  <span>Media Library</span>
                </button>
              </div>
              {data.complianceImage && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Preview:</span>
                  <img
                    src={data.complianceImage}
                    alt="Compliance Showcase Preview"
                    style={{ height: '48px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 5 Compliance Metric Highlights */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              5 Compliance Metric Highlight Boxes
            </h4>

            <div className="admin-grid-3">
              {(data.complianceStats || []).map((cStat, csIdx) => (
                <div
                  key={csIdx}
                  style={{
                    padding: '1rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    Metric #{csIdx + 1}
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Value (e.g. 25+, 2200+, 28)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={cStat.value || ''}
                      onChange={(e) => handleComplianceStatChange(csIdx, 'value', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label className="admin-label">Label</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={cStat.label || ''}
                      onChange={(e) => handleComplianceStatChange(csIdx, 'label', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Checklist Tags */}
          <div>
            <h4 style={{ color: '#10b981', fontSize: '0.95rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Statutory Compliance Checklist Tags (One per line)
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '1rem' }}>
              These appear as cyber badges under the compliance map graphic (e.g. EPF, ESIC, Professional Tax in 28 States, etc.).
            </p>
            <textarea
              rows={5}
              className="admin-textarea"
              value={(data.complianceChecklist || []).join('\n')}
              onChange={(e) =>
                setData({
                  ...data,
                  complianceChecklist: e.target.value.split('\n').filter(Boolean)
                })
              }
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: CLIENT TESTIMONIALS
          ========================================================================= */}
      {activeTab === 'testimonials' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Quote size={18} color="#fba721" />
                Client Testimonials & Feedback Carousel
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Manage reviews and client quotes displayed in the carousel on the IT Staffing page.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={handleAddTestimonial} className="admin-btn admin-btn-secondary">
                <Plus size={16} />
                <span>Add Testimonial</span>
              </button>
              <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
                <Save size={16} />
                <span>{saving ? 'Publishing...' : 'Save Testimonials'}</span>
              </button>
            </div>
          </div>

          {/* Section Headers */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Eyebrow Pill Badge</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. VERIFIED CLIENT SUCCESS"
                  value={data.testimonialsBadge || ''}
                  onChange={(e) => setData({ ...data, testimonialsBadge: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. What do our clients"
                  value={data.testimonialsTitle || ''}
                  onChange={(e) => setData({ ...data, testimonialsTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Accent</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. say about us:"
                  value={data.testimonialsTitleAccent || ''}
                  onChange={(e) => setData({ ...data, testimonialsTitleAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Bottom Contact CTA Button Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Contact Now"
                value={data.contactBtnText || ''}
                onChange={(e) => setData({ ...data, contactBtnText: e.target.value })}
              />
            </div>
          </div>

          {/* Testimonial Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {(data.testimonials || []).map((t, idx) => (
              <div
                key={t.id || idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#fba721', fontWeight: 'bold' }}>Testimonial #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteTestimonial(idx)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Delete testimonial"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="admin-grid-3">
                  <div className="admin-form-group">
                    <label className="admin-label">Client Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={t.name || ''}
                      onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Role / Designation</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={t.role || ''}
                      onChange={(e) => handleTestimonialChange(idx, 'role', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Company / Enterprise</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={t.company || ''}
                      onChange={(e) => handleTestimonialChange(idx, 'company', e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Star Rating (1 to 5)</label>
                  <select
                    className="admin-select"
                    value={t.rating || 5}
                    onChange={(e) => handleTestimonialChange(idx, 'rating', Number(e.target.value))}
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Testimonial Quote</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    value={t.quote || ''}
                    onChange={(e) => handleTestimonialChange(idx, 'quote', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: HIRING MODELS
          ========================================================================= */}
      {activeTab === 'models' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                Engagement & Sourcing Models
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Configure engagement frameworks (Dedicated Developers, Managed Squads, etc.).
              </p>
            </div>
            <button type="button" onClick={handleAddModel} className="admin-btn admin-btn-secondary">
              <Plus size={16} />
              <span>Add Model</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {(data.models || []).map((model, idx) => (
              <div
                key={model.id || idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>Model #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteModel(idx)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Delete model"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Model Title</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={model.title || ''}
                      onChange={(e) => handleModelChange(idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Billing Rate / Pricing</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={model.rate || ''}
                      onChange={(e) => handleModelChange(idx, 'rate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Best For</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={model.bestFor || ''}
                    onChange={(e) => handleModelChange(idx, 'bestFor', e.target.value)}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Description & Capabilities</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    value={model.desc || ''}
                    onChange={(e) => handleModelChange(idx, 'desc', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 9: DIRECT STAFFING LEADS
          ========================================================================= */}
      {activeTab === 'leads' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Direct Inquiries Received from IT Staffing Page
          </h3>

          {enquiries.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
              No staffing enquiries received yet. Inquiries submitted through the IT Staffing form will appear here in real time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>{enq.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(enq.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {enq.email} | <strong>Phone:</strong> {enq.phone} | <strong>Company:</strong> {enq.company || 'N/A'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                    <strong>Service Requirement:</strong> {enq.service} | <strong>Mandates:</strong> {enq.mandates || 'N/A'} | <strong>Source:</strong> {enq.source}
                  </div>
                  {enq.message && (
                    <div style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '4px' }}>
                      {enq.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectMedia={handleSelectMedia}
        mediaType="image"
      />
    </div>
  );
}
