import React, { useState, useEffect } from 'react';
import {
  Building2,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  ExternalLink,
  Search,
  Globe,
  Award,
  X,
  Image as ImageIcon,
  Sparkles,
  Layers,
  MapPin
} from 'lucide-react';
import { getClients, saveClient, deleteClient, getClientsPage, saveClientsPage } from '@backend/dataService';
import MediaPickerModal from '../components/MediaPickerModal';

export const CLIENT_CATEGORY_OPTIONS = [
  { value: 'enterprise', label: 'Enterprise & Fortune 500' },
  { value: 'ai-tech', label: 'AI, Web3 & Tech Startups' },
  { value: 'fintech', label: 'FinTech & Banking' },
  { value: 'healthcare', label: 'Healthcare & MedTech' },
  { value: 'ecommerce', label: 'E-Commerce & Retail' },
  { value: 'it-partners', label: 'Global IT Agencies & Partners' }
];

export const BADGE_COLOR_OPTIONS = [
  { value: 'orange', label: 'Orange (Warm Accent)' },
  { value: 'cyan', label: 'Cyan (Tech Neon)' },
  { value: 'purple', label: 'Purple (Enterprise Royal)' },
  { value: 'green', label: 'Green (Growth / Success)' }
];

export default function ClientsManager() {
  const [clients, setClients] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'clients', 'metrics'
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTarget, setMediaTarget] = useState('clientLogo'); // 'clientLogo', 'heroImage'
  const [editingClient, setEditingClient] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    logo_url: '',
    category: 'enterprise',
    industry: 'Enterprise Software',
    region: 'North America',
    services: '',
    badge: 'Verified Partner',
    badgeColor: 'orange',
    impact: ''
  });

  useEffect(() => {
    loadClients();
    loadPageData();
  }, []);

  const loadClients = async () => {
    const list = await getClients();
    setClients(Array.isArray(list) ? list : []);
  };

  const loadPageData = async () => {
    const res = await getClientsPage();
    setPageData(res || {});
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenCreate = () => {
    setEditingClient(null);
    setForm({
      name: '',
      logo_url: '',
      category: 'enterprise',
      industry: 'Enterprise Software',
      region: 'North America',
      services: '',
      badge: 'Verified Partner',
      badgeColor: 'orange',
      impact: ''
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditingClient(client);
    const cat = client.category === 'ai' ? 'ai-tech' : (client.category || 'enterprise');
    setForm({
      name: client.name || '',
      logo_url: client.logo_url || client.logo || '',
      category: cat,
      industry: client.industry || '',
      region: client.region || 'Global',
      services: client.services || '',
      badge: client.badge || 'Verified Partner',
      badgeColor: client.badgeColor || client.badge_color || 'orange',
      impact: client.impact || ''
    });
    setModalOpen(true);
  };

  const handleSubmitModal = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert('Please enter a client name.');
      return;
    }
    setSaving(true);
    const payload = {
      ...(editingClient || {}),
      name: form.name.trim(),
      logo_url: form.logo_url.trim(),
      logo: form.logo_url.trim(),
      category: form.category,
      industry: form.industry.trim(),
      region: form.region.trim(),
      services: form.services.trim(),
      badge: form.badge?.trim() || 'Verified Partner',
      badgeColor: form.badgeColor || 'orange',
      badge_color: form.badgeColor || 'orange',
      impact: form.impact?.trim() || ''
    };
    await saveClient(payload);
    await loadClients();
    setSaving(false);
    setModalOpen(false);
    showToast(editingClient ? 'Client updated on live website!' : 'New client added to portfolio!');
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete client "${name}" from portfolio? This change will reflect on the live website immediately.`)) {
      await deleteClient(id);
      await loadClients();
      showToast('Client removed from portfolio.');
    }
  };

  const handleSaveHero = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveClientsPage(pageData);
    setSaving(false);
    showToast('Hero section & banner updated on live website!');
  };

  const handleSaveMetrics = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveClientsPage(pageData);
    setSaving(false);
    showToast('Client impact metrics published live via WebSocket!');
  };

  const handleMetricChange = (idx, field, val) => {
    const metrics = [...(pageData.metrics || [])];
    metrics[idx] = { ...metrics[idx], [field]: val };
    setPageData({ ...pageData, metrics });
  };

  const handleOpenMediaPicker = (target) => {
    setMediaTarget(target);
    setIsMediaPickerOpen(true);
  };

  const handleSelectMedia = (item) => {
    if (item && item.url) {
      if (mediaTarget === 'heroImage') {
        setPageData((prev) => ({ ...prev, heroImage: item.url }));
        showToast('Hero map image updated from Media Library');
      } else {
        setForm((prev) => ({ ...prev, logo_url: item.url }));
        showToast('Client logo selected from Media Library');
      }
    }
    setIsMediaPickerOpen(false);
  };

  const filteredClients = clients.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name?.toLowerCase().includes(q) ||
      c.industry?.toLowerCase().includes(q) ||
      c.region?.toLowerCase().includes(q) ||
      c.services?.toLowerCase().includes(q) ||
      c.badge?.toLowerCase().includes(q)
    );
  });

  const getCategoryLabel = (catVal) => {
    const found = CLIENT_CATEGORY_OPTIONS.find((c) => c.value === catVal);
    if (found) return found.label;
    if (catVal === 'ai') return 'AI, Web3 & Tech Startups';
    return catVal || 'Enterprise';
  };

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
          <h1 className="admin-page-title">Client Portfolio & Impact Management</h1>
          <p className="admin-page-sub">
            Customize the hero banner, global network map, corporate client roster, and impact counter stats in real time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/clients"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live clients page"
          >
            <ExternalLink size={16} />
            <span>View Live Page</span>
          </a>
          <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
            <Plus size={16} />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={16} />
          <span>Hero Banner & Map</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <Building2 size={16} />
          <span>Client Roster ({clients.length})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'metrics' ? 'active' : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          <Award size={16} />
          <span>Impact Counter Metrics</span>
        </button>
      </div>

      {/* TAB 1: HERO & GLOBAL NETWORK BANNER */}
      {activeTab === 'hero' && pageData && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="#ff6b00" />
                Hero Section & Headline Content
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Changes here update the top banner, titles, call-to-actions, and interactive deployment map.
              </p>
            </div>
            <button
              onClick={handleSaveHero}
              disabled={saving}
              className="admin-btn admin-btn-primary"
            >
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Hero Section'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveHero}>
            {/* Top Eyebrow Badge */}
            <div className="admin-form-group">
              <label className="admin-label">Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. TRUSTED BY 150+ GLOBAL ENTERPRISES"
                value={pageData.heroBadge || ''}
                onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
              />
            </div>

            {/* Main Title & Gradient Accent */}
            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Hero Main Title (e.g. Our Clients:)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={pageData.heroTitle || ''}
                  onChange={(e) => setPageData({ ...pageData, heroTitle: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Title Gradient Accent (Highlighted text)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Powering Leaders Across 15+ Nations"
                  value={pageData.heroTitleAccent || ''}
                  onChange={(e) => setPageData({ ...pageData, heroTitleAccent: e.target.value })}
                />
              </div>
            </div>

            {/* Subtitle / Description */}
            <div className="admin-form-group">
              <label className="admin-label">Hero Description / Subtitle</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Paragraph introducing Black Grapes Softech's client partnerships..."
                value={pageData.heroSubtitle || ''}
                onChange={(e) => setPageData({ ...pageData, heroSubtitle: e.target.value })}
              />
            </div>

            {/* CTA Buttons */}
            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Primary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Partner With Us"
                  value={pageData.primaryBtnText || ''}
                  onChange={(e) => setPageData({ ...pageData, primaryBtnText: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Secondary Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Explore Client Brands"
                  value={pageData.secondaryBtnText || ''}
                  onChange={(e) => setPageData({ ...pageData, secondaryBtnText: e.target.value })}
                />
              </div>
            </div>

            {/* Visual Frame & Map Image */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fff', fontSize: '0.98rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={16} color="#ff6b00" />
                Global Network Map & Floating Overlay Card
              </h4>

              <div className="admin-form-group">
                <label className="admin-label">Custom Hero Map Image URL (Optional)</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Leave empty for default glowing network map, or enter URL / /uploads/..."
                    value={pageData.heroImage || ''}
                    onChange={(e) => setPageData({ ...pageData, heroImage: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenMediaPicker('heroImage')}
                    className="admin-btn admin-btn-secondary"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <ImageIcon size={16} />
                    <span>Media Library</span>
                  </button>
                </div>
                {pageData.heroImage && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Current Map Image:</span>
                    <img
                      src={pageData.heroImage}
                      alt="Map preview"
                      style={{ height: '50px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              {/* Floating Badge Settings */}
              <div className="admin-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Floating Card Title</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Active Global Deployments"
                    value={pageData.floatingTitle || ''}
                    onChange={(e) => setPageData({ ...pageData, floatingTitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Floating Card Subtitle / Regions</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. US • UK • Japan • EU • UAE • India"
                    value={pageData.floatingSubtitle || ''}
                    onChange={(e) => setPageData({ ...pageData, floatingSubtitle: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Floating Retention Tag Pill</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. 99% RETENTION"
                    value={pageData.floatingBadge || ''}
                    onChange={(e) => setPageData({ ...pageData, floatingBadge: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={saving}
                className="admin-btn admin-btn-primary"
              >
                <Save size={16} />
                <span>{saving ? 'Saving...' : 'Save & Publish Hero Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: CLIENTS LIST */}
      {activeTab === 'clients' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="admin-search-box" style={{ flex: 1, minWidth: '260px' }}>
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search clients by name, industry, region, badge..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={handleOpenCreate} className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add New Client</span>
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Brand</th>
                  <th>Badge</th>
                  <th>Category</th>
                  <th>Industry</th>
                  <th>Region</th>
                  <th>Deliverables</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                      No clients found. Click "Add New Client" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => {
                    const logoSrc = client.logo_url || client.logo;
                    const badgeColor = client.badgeColor || client.badge_color || 'orange';
                    return (
                      <tr key={client.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {logoSrc ? (
                              <img
                                src={logoSrc}
                                alt=""
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  objectFit: 'contain',
                                  background: '#fff',
                                  borderRadius: '6px',
                                  padding: '3px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  background: 'rgba(255,107,0,0.15)',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#ff6b00',
                                  fontWeight: 'bold'
                                }}
                              >
                                {client.name?.charAt(0) || 'C'}
                              </div>
                            )}
                            <div>
                              <div style={{ fontWeight: '600', color: '#fff' }}>{client.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`admin-badge admin-badge-${badgeColor}`}>
                            {client.badge || 'Verified'}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                            {getCategoryLabel(client.category)}
                          </span>
                        </td>
                        <td>{client.industry || '—'}</td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Globe size={12} color="#9ca3af" />
                            {client.region || '—'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '240px' }}>
                          {client.services || '—'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(client)}
                              className="admin-action-btn"
                              title="Edit client"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(client.id, client.name)}
                              className="admin-action-btn danger"
                              title="Delete client"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: METRICS */}
      {activeTab === 'metrics' && pageData && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                Headline Counter Strip Metrics
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                These 4 impact statistics appear directly under the hero heading on the Client Portfolio page.
              </p>
            </div>
            <button onClick={handleSaveMetrics} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Metrics'}</span>
            </button>
          </div>

          <div className="admin-grid-2">
            {(pageData.metrics || []).map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px'
                }}
              >
                <div className="admin-form-group">
                  <label className="admin-label">Metric Number / Stat (e.g. 150+, 99%)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.number || ''}
                    onChange={(e) => handleMetricChange(idx, 'number', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Label</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.label || ''}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Subline Highlight</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={m.highlight || ''}
                    onChange={(e) => handleMetricChange(idx, 'highlight', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE / EDIT CLIENT MODAL */}
      {modalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '640px' }}>
            <div className="admin-modal-header">
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building2 size={18} color="#ff6b00" />
                {editingClient ? `Edit: ${editingClient.name}` : 'Add New Client to Portfolio'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitModal}>
              <div className="admin-modal-body">
                {/* Client Name */}
                <div className="admin-form-group">
                  <label className="admin-label">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nekologic, Alphabet, Mastercard"
                    className="admin-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                {/* Logo Image URL + Media Picker */}
                <div className="admin-form-group">
                  <label className="admin-label">Logo Image URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="https://... or /uploads/..."
                      value={form.logo_url}
                      onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                      style={{ flex: 1 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleOpenMediaPicker('clientLogo')}
                      className="admin-btn admin-btn-secondary"
                      title="Choose from Media Library"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <ImageIcon size={16} />
                      <span>Media Library</span>
                    </button>
                  </div>
                  {form.logo_url && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Preview:</span>
                      <img
                        src={form.logo_url}
                        alt="Logo Preview"
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'contain',
                          background: '#fff',
                          borderRadius: '4px',
                          padding: '4px',
                          border: '1px solid rgba(255,255,255,0.2)'
                        }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                {/* Category & Region */}
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Portfolio Category</label>
                    <select
                      className="admin-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {CLIENT_CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Region / Country</label>
                    <input
                      type="text"
                      placeholder="e.g. Japan, United States, Europe"
                      className="admin-input"
                      value={form.region}
                      onChange={(e) => setForm({ ...form, region: e.target.value })}
                    />
                  </div>
                </div>

                {/* Industry & Badge Label */}
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Industry</label>
                    <input
                      type="text"
                      placeholder="e.g. AI & Custom Software"
                      className="admin-input"
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Card Badge Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Tokyo Tech, Fortune 500"
                      className="admin-input"
                      value={form.badge}
                      onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    />
                  </div>
                </div>

                {/* Badge Color */}
                <div className="admin-form-group">
                  <label className="admin-label">Badge Color Accent</label>
                  <select
                    className="admin-select"
                    value={form.badgeColor}
                    onChange={(e) => setForm({ ...form, badgeColor: e.target.value })}
                  >
                    {BADGE_COLOR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivered Services Summary */}
                <div className="admin-form-group">
                  <label className="admin-label">Delivered Services & Scope Summary</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    placeholder="e.g. Cross-Border Agile Engineering & Distributed Cloud Systems"
                    value={form.services}
                    onChange={(e) => setForm({ ...form, services: e.target.value })}
                  />
                </div>

                {/* Measurable Business Impact */}
                <div className="admin-form-group">
                  <label className="admin-label">Measurable Business Impact (Shown in Case Study Modal)</label>
                  <textarea
                    rows={2}
                    className="admin-textarea"
                    placeholder="e.g. Streamlined technical delivery for Japanese conglomerate clients with 99.9% uptime."
                    value={form.impact}
                    onChange={(e) => setForm({ ...form, impact: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </form>
          </div>
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
