import React, { useState, useEffect } from 'react';
import {
  Handshake,
  Save,
  Plus,
  Trash2,
  CheckCircle,
  ExternalLink,
  Layers,
  Inbox,
  ShieldCheck,
  Sparkles,
  Edit,
  X,
  Search,
  Image as ImageIcon
} from 'lucide-react';
import {
  getPartnership,
  savePartnership,
  getBusinessPartners,
  saveBusinessPartners,
  getEnquiries
} from '@backend/dataService';
import MediaPickerModal from '../components/MediaPickerModal';

export default function PartnershipManager() {
  const [data, setData] = useState(null);
  const [businessPartners, setBusinessPartners] = useState({
    badge: 'WHAT WE DO',
    title: 'Our Business Partners',
    titleAccent: 'Business Partners',
    subtitle: 'Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.',
    product_intro: {
      sectionTitle: 'Black Grapes Softech Products Companies Tie-up:-',
      subHeading: 'Product Companies Tie-up',
      paragraphs: []
    },
    service_intro: {
      sectionTitle: 'Black Grapes Softech Services Companies Tie-up:-',
      subHeading: 'Services Companies Tie-up',
      paragraphs: []
    },
    product_partners: [],
    service_partners: []
  });

  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'business_partners', 'product_partners', 'service_partners', 'applications'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Partner Modal State
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerModalType, setPartnerModalType] = useState('product'); // 'product' or 'service'
  const [editingPartner, setEditingPartner] = useState(null);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    img: '',
    localImg: ''
  });

  useEffect(() => {
    loadAll();
    const handleUpdate = () => {
      loadApplications();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadAll = async () => {
    const [pRes, bpRes, enqRes] = await Promise.all([
      getPartnership(),
      getBusinessPartners(),
      getEnquiries()
    ]);
    setData(pRes || {});
    if (bpRes) {
      setBusinessPartners({
        badge: bpRes.badge || 'WHAT WE DO',
        title: bpRes.title || 'Our Business Partners',
        titleAccent: bpRes.titleAccent || 'Business Partners',
        subtitle: bpRes.subtitle || 'Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.',
        product_intro: {
          sectionTitle: bpRes.product_intro?.sectionTitle || bpRes.product_intro?.title || 'Black Grapes Softech Products Companies Tie-up:-',
          subHeading: bpRes.product_intro?.subHeading || bpRes.product_intro?.subheading || 'Product Companies Tie-up',
          paragraphs: bpRes.product_intro?.paragraphs || []
        },
        service_intro: {
          sectionTitle: bpRes.service_intro?.sectionTitle || bpRes.service_intro?.title || 'Black Grapes Softech Services Companies Tie-up:-',
          subHeading: bpRes.service_intro?.subHeading || bpRes.service_intro?.subheading || 'Services Companies Tie-up',
          paragraphs: bpRes.service_intro?.paragraphs || []
        },
        product_partners: bpRes.product_partners || [],
        service_partners: bpRes.service_partners || []
      });
    }
    const apps = (enqRes || []).filter(
      (e) => (e.service && e.service.toLowerCase().includes('partner')) || (e.source && e.source.toLowerCase().includes('partner'))
    );
    setApplications(apps);
  };

  const loadApplications = async () => {
    const list = await getEnquiries();
    const apps = list.filter(
      (e) => (e.service && e.service.toLowerCase().includes('partner')) || (e.source && e.source.toLowerCase().includes('partner'))
    );
    setApplications(apps);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await Promise.all([
      savePartnership(data),
      saveBusinessPartners(businessPartners)
    ]);
    setSaving(false);
    showToast('Partnership content published live via WebSocket!');
  };

  const handleSaveOverview = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await savePartnership(data);
    setSaving(false);
    showToast('Partner With Us (/partnership) content saved & published live!');
  };

  const handleSaveBusinessPartners = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    await saveBusinessPartners(businessPartners);
    setSaving(false);
    showToast('Business Partners (/business-partners) content saved & published live!');
  };

  // PARTNER MODAL HANDLERS
  const handleOpenCreatePartner = (type) => {
    setPartnerModalType(type);
    setEditingPartner(null);
    setPartnerForm({ name: '', img: '', localImg: '' });
    setPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (type, partner) => {
    setPartnerModalType(type);
    setEditingPartner(partner);
    setPartnerForm({
      name: partner.name || '',
      img: partner.img || '',
      localImg: partner.localImg || ''
    });
    setPartnerModalOpen(true);
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    setSaving(true);
    const listKey = partnerModalType === 'product' ? 'product_partners' : 'service_partners';
    const currentList = [...(businessPartners[listKey] || [])];

    if (editingPartner) {
      const idx = currentList.findIndex((p) => p.id === editingPartner.id || p.name === editingPartner.name);
      if (idx >= 0) {
        currentList[idx] = { ...editingPartner, ...partnerForm };
      }
    } else {
      currentList.push({
        id: `partner-${Date.now()}`,
        name: partnerForm.name,
        img: partnerForm.img,
        localImg: partnerForm.localImg || partnerForm.img
      });
    }

    const updated = {
      ...businessPartners,
      [listKey]: currentList
    };

    await saveBusinessPartners(updated);
    setBusinessPartners(updated);
    setSaving(false);
    setPartnerModalOpen(false);
    showToast(`${partnerModalType === 'product' ? 'Product' : 'Service'} partner updated live!`);
  };

  const handleDeletePartner = async (type, partner) => {
    if (window.confirm(`Delete partner "${partner.name}"?`)) {
      const listKey = type === 'product' ? 'product_partners' : 'service_partners';
      const updatedList = (businessPartners[listKey] || []).filter(
        (p) => (p.id ? p.id !== partner.id : p.name !== partner.name)
      );

      const updated = {
        ...businessPartners,
        [listKey]: updatedList
      };

      await saveBusinessPartners(updated);
      setBusinessPartners(updated);
      showToast('Partner removed.');
    }
  };

  const handleSelectMedia = (item) => {
    if (item && item.url) {
      setData((prev) => ({ ...prev, partnerImage: item.url }));
      showToast('Showcase image selected from Media Library');
    }
    setIsMediaPickerOpen(false);
  };

  if (!data) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading Partnership Control Center...</div>;
  }

  const prodList = (businessPartners.product_partners || []).filter(
    (p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const servList = (businessPartners.service_partners || []).filter(
    (p) => !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="admin-page-title">Partnership & Alliances Manager</h1>
          <p className="admin-page-sub">
            Manage both <strong>Partner with Us (/partnership)</strong> and <strong>Business Partners (/business-partners)</strong> tie-ups & alliances in real time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="/partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live Partner with Us page"
          >
            <ExternalLink size={15} />
            <span>View Partner With Us</span>
          </a>
          <a
            href="/business-partners"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live Business Partners page"
          >
            <ExternalLink size={15} />
            <span>View Business Partners</span>
          </a>
          <button onClick={handleSaveAll} disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs" style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <button
          className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={16} />
          <span>Partner With Us (/partnership)</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'business_partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('business_partners')}
        >
          <Handshake size={16} />
          <span>Business Partners Page (/business-partners)</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'product_partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('product_partners')}
        >
          <Layers size={16} />
          <span>Product Partners ({businessPartners.product_partners?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'service_partners' ? 'active' : ''}`}
          onClick={() => setActiveTab('service_partners')}
        >
          <Layers size={16} />
          <span>Service Partners ({businessPartners.service_partners?.length || 0})</span>
        </button>
        <button
          className={`admin-tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <Inbox size={16} />
          <span>Partner Applications ({applications.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: PARTNER WITH US (ODC PAGE /partnership)
          ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Partner With Us & Offshore Development Center (/partnership)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                All headlines, descriptions, benefits, and inquiry form texts on <strong>/partnership</strong> are managed here.
              </p>
            </div>
            <button onClick={handleSaveOverview} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Partner With Us'}</span>
            </button>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. PARTNERSHIP"
              value={data.heroBadge || ''}
              onChange={(e) => setData({ ...data, heroBadge: e.target.value })}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Main Heading</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Partnership"
                value={data.heroTitle || ''}
                onChange={(e) => setData({ ...data, heroTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Card Section Title</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Partner With Us"
                value={data.partnerWithUsTitle || ''}
                onChange={(e) => setData({ ...data, partnerWithUsTitle: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Subtitle</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Cultivating long-term strategic relationships and delivering high-velocity offshore technology development."
              value={data.heroSubtitle || ''}
              onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Showcase Image Path</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                className="admin-input"
                placeholder="/partners/partner_with_us.webp or https://..."
                value={data.partnerImage || ''}
                onChange={(e) => setData({ ...data, partnerImage: e.target.value })}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="admin-btn admin-btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                <ImageIcon size={16} />
                <span>Media Library</span>
              </button>
            </div>
            {data.partnerImage && (
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Preview:</span>
                <img
                  src={data.partnerImage}
                  alt="Partner Showcase"
                  style={{ height: '48px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Partner With Us Detailed Narrative</label>
            <textarea
              rows={4}
              className="admin-textarea"
              placeholder="If you are an IT or web software development company..."
              value={data.partnerWithUsText || ''}
              onChange={(e) => setData({ ...data, partnerWithUsText: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Key Partnership Advantages (One per line)</label>
            <textarea
              rows={4}
              className="admin-textarea"
              value={(data.benefits || []).join('\n')}
              onChange={(e) =>
                setData({
                  ...data,
                  benefits: e.target.value.split('\n').filter(Boolean)
                })
              }
            />
          </div>

          <div className="admin-grid-2" style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-form-group">
              <label className="admin-label">Right Column Form Heading</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Please tell us a bit about yourself"
                value={data.formTitle || ''}
                onChange={(e) => setData({ ...data, formTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Right Column Form Subtitle</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Fill in your details below to explore development centre partnerships with our team."
                value={data.formSubtitle || ''}
                onChange={(e) => setData({ ...data, formSubtitle: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSaveOverview} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: BUSINESS PARTNERS PAGE CONTENT (/business-partners)
          ========================================================================= */}
      {activeTab === 'business_partners' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Our Business Partners Page Content (/business-partners)
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0.25rem 0 0' }}>
                Manage the main heading, product tie-up narrative, and service tie-up narrative for <strong>/business-partners</strong>.
              </p>
            </div>
            <button onClick={handleSaveBusinessPartners} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save Business Partners'}</span>
            </button>
          </div>

          {/* Top Page Headers */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="admin-form-group">
              <label className="admin-label">Page Eyebrow Pill Badge</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. WHAT WE DO"
                value={businessPartners.badge || ''}
                onChange={(e) => setBusinessPartners({ ...businessPartners, badge: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Page Main Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Our Business Partners"
                  value={businessPartners.title || ''}
                  onChange={(e) => setBusinessPartners({ ...businessPartners, title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Gradient Accent Word(s)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Business Partners"
                  value={businessPartners.titleAccent || ''}
                  onChange={(e) => setBusinessPartners({ ...businessPartners, titleAccent: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Page Subtitle</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="e.g. Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms."
                value={businessPartners.subtitle || ''}
                onChange={(e) => setBusinessPartners({ ...businessPartners, subtitle: e.target.value })}
              />
            </div>
          </div>

          {/* Section 1: Product Companies Tie-up */}
          <div style={{ marginBottom: '1.75rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h4 style={{ color: '#f86200', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              1. Product Companies Tie-up Section
            </h4>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Black Grapes Softech Products Companies Tie-up:-"
                  value={businessPartners.product_intro?.sectionTitle || ''}
                  onChange={(e) =>
                    setBusinessPartners({
                      ...businessPartners,
                      product_intro: { ...businessPartners.product_intro, sectionTitle: e.target.value }
                    })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subheading Above Brand Logos</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Product Companies Tie-up"
                  value={businessPartners.product_intro?.subHeading || ''}
                  onChange={(e) =>
                    setBusinessPartners({
                      ...businessPartners,
                      product_intro: { ...businessPartners.product_intro, subHeading: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Introductory Paragraphs (One paragraph per double enter)</label>
              <textarea
                rows={5}
                className="admin-textarea"
                value={(businessPartners.product_intro?.paragraphs || []).join('\n\n')}
                onChange={(e) =>
                  setBusinessPartners({
                    ...businessPartners,
                    product_intro: {
                      ...businessPartners.product_intro,
                      paragraphs: e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean)
                    }
                  })
                }
              />
            </div>
          </div>

          {/* Section 2: Services Companies Tie-up */}
          <div>
            <h4 style={{ color: '#a855f7', fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              2. Services Companies Tie-up Section
            </h4>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Section Title</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Black Grapes Softech Services Companies Tie-up:-"
                  value={businessPartners.service_intro?.sectionTitle || ''}
                  onChange={(e) =>
                    setBusinessPartners({
                      ...businessPartners,
                      service_intro: { ...businessPartners.service_intro, sectionTitle: e.target.value }
                    })
                  }
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subheading Above Brand Logos</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Services Companies Tie-up"
                  value={businessPartners.service_intro?.subHeading || ''}
                  onChange={(e) =>
                    setBusinessPartners({
                      ...businessPartners,
                      service_intro: { ...businessPartners.service_intro, subHeading: e.target.value }
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-label">Introductory Paragraphs (One paragraph per double enter)</label>
              <textarea
                rows={5}
                className="admin-textarea"
                value={(businessPartners.service_intro?.paragraphs || []).join('\n\n')}
                onChange={(e) =>
                  setBusinessPartners({
                    ...businessPartners,
                    service_intro: {
                      ...businessPartners.service_intro,
                      paragraphs: e.target.value.split('\n\n').map((p) => p.trim()).filter(Boolean)
                    }
                  })
                }
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSaveBusinessPartners} disabled={saving} className="admin-btn admin-btn-primary">
              <Save size={16} />
              <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PRODUCT PARTNERS (Zoho, Salesforce, Microsoft, etc.)
          ========================================================================= */}
      {activeTab === 'product_partners' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="admin-search-box" style={{ flex: 1, minWidth: '260px', margin: 0 }}>
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search product partner brands (e.g. Zoho, Salesforce, SAP)..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => handleOpenCreatePartner('product')} className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add Product Partner</span>
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Logo Image URL</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {prodList.map((partner, idx) => (
                  <tr key={partner.id || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {partner.img || partner.localImg ? (
                          <img
                            src={partner.localImg || partner.img}
                            alt=""
                            style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                        )}
                        <strong style={{ color: '#fff' }}>{partner.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '300px' }}>
                      {partner.img || partner.localImg || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditPartner('product', partner)}
                          className="admin-action-btn"
                          title="Edit partner"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner('product', partner)}
                          className="admin-action-btn danger"
                          title="Delete partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SERVICE PARTNERS (JustDial, Sulekha, IndiaMart, etc.)
          ========================================================================= */}
      {activeTab === 'service_partners' && (
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="admin-search-box" style={{ flex: 1, minWidth: '260px', margin: 0 }}>
              <Search size={16} color="#9ca3af" />
              <input
                type="text"
                placeholder="Search service partner networks (e.g. JustDial, Sulekha)..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={() => handleOpenCreatePartner('service')} className="admin-btn admin-btn-primary">
              <Plus size={16} />
              <span>Add Service Partner</span>
            </button>
          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Network Name</th>
                  <th>Logo Image URL</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {servList.map((partner, idx) => (
                  <tr key={partner.id || idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {partner.img || partner.localImg ? (
                          <img
                            src={partner.localImg || partner.img}
                            alt=""
                            style={{ width: '32px', height: '32px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '2px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                        )}
                        <strong style={{ color: '#fff' }}>{partner.name}</strong>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#9ca3af', maxWidth: '300px' }}>
                      {partner.img || partner.localImg || '—'}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenEditPartner('service', partner)}
                          className="admin-action-btn"
                          title="Edit partner"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePartner('service', partner)}
                          className="admin-action-btn danger"
                          title="Delete partner"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: PARTNER APPLICATIONS
          ========================================================================= */}
      {activeTab === 'applications' && (
        <div className="admin-card">
          <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '1.25rem' }}>
            Development Centre &amp; ODC Partner Applications ({applications.length})
          </h3>

          {applications.length === 0 ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>
              No partner applications received yet. Applications submitted through the Partner with Us form will appear here in real time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map((app) => (
                <div
                  key={app.id || app.ticket_id}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff6b00', fontWeight: 'bold' }}>{app.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      {new Date(app.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    <strong>Email:</strong> {app.email} | <strong>Phone:</strong> {app.phone}
                  </div>
                  {app.message && (
                    <div style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '4px', whiteSpace: 'pre-line' }}>
                      {app.message}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Partner Add/Edit Modal */}
      {partnerModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setPartnerModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                {editingPartner ? 'Edit Partner Brand' : 'Add New Partner Brand'}
              </h3>
              <button
                type="button"
                onClick={() => setPartnerModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePartner}>
              <div className="admin-form-group">
                <label className="admin-label">Partner Brand Name *</label>
                <input
                  type="text"
                  required
                  className="admin-input"
                  placeholder="e.g. Zoho, Microsoft, JustDial"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Logo Image URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/partners/zoho.png or https://..."
                  value={partnerForm.img}
                  onChange={(e) => setPartnerForm({ ...partnerForm, img: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Local Asset Fallback URL (Optional)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/partners/zoho.png"
                  value={partnerForm.localImg}
                  onChange={(e) => setPartnerForm({ ...partnerForm, localImg: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="admin-btn admin-btn-primary">
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Partner'}</span>
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
