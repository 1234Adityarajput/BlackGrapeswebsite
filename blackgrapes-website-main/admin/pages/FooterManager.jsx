import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Building2,
  List,
  Compass,
  Mail,
  Phone,
  FileText,
  Eye,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Heart,
  MapPin
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';

const DEFAULT_SERVICES_LINKS = [
  { label: 'Software Development', path: '/services' },
  { label: 'Mobile App Engineering', path: '/services' },
  { label: 'Enterprise CRM & ERP', path: '/services' },
  { label: 'MLM Software Systems', path: '/services' },
  { label: 'Web Portals & Cloud Apps', path: '/services' },
  { label: 'Digital Growth & SEO', path: '/services' },
  { label: 'UI/UX & Brand Systems', path: '/services' },
  { label: 'Interactive Game Dev', path: '/services' }
];

const DEFAULT_SOLUTIONS_LINKS = [
  { label: 'Proprietary Software Catalog', path: '/products' },
  { label: 'Client Case Studies', path: '/clients' },
  { label: 'IT & Technical Staffing', path: '/it-staffing' },
  { label: 'E-Commerce & Hardware', path: '/ecommerce' },
  { label: 'Partner Program (ODC)', path: '/partnership' },
  { label: 'About Black Grapes', path: '/about' }
];

const DEFAULT_BOTTOM_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' }
];

export default function FooterManager() {
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState('bio'); // 'bio', 'services', 'solutions', 'contact', 'legal', 'preview'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getSiteSettings().then((res) => {
      const data = res || {};
      // Ensure link arrays are initialized
      if (!data.footer_services_links || data.footer_services_links.length === 0) {
        data.footer_services_links = DEFAULT_SERVICES_LINKS;
      }
      if (!data.footer_solutions_links || data.footer_solutions_links.length === 0) {
        data.footer_solutions_links = DEFAULT_SOLUTIONS_LINKS;
      }
      if (!data.footer_bottom_links || data.footer_bottom_links.length === 0) {
        data.footer_bottom_links = DEFAULT_BOTTOM_LINKS;
      }
      setSettings(data);
    });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      showToast('Footer updated live on website via WebSocket!');
    } catch (err) {
      showToast('Failed to save footer: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLinkChange = (listKey, index, field, value) => {
    const list = [...(settings[listKey] || [])];
    list[index] = { ...list[index], [field]: value };
    setSettings({ ...settings, [listKey]: list });
  };

  const handleAddLink = (listKey, defaultLabel = 'New Link', defaultPath = '/services') => {
    const list = [...(settings[listKey] || [])];
    list.push({ label: defaultLabel, path: defaultPath });
    setSettings({ ...settings, [listKey]: list });
  };

  const handleRemoveLink = (listKey, index) => {
    const list = [...(settings[listKey] || [])];
    list.splice(index, 1);
    setSettings({ ...settings, [listKey]: list });
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading footer configuration...</div>;
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
          <h1 className="admin-page-title">Footer &amp; Links Manager</h1>
          <p className="admin-page-sub">
            Customize company bio, ISO trust badges, services links, solutions ecosystem, office coordinates, newsletter subscription, and legal copyright notices.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live website in new tab"
          >
            <ExternalLink size={16} />
            <span>View Live Website</span>
          </a>
          <button onClick={handleSave} disabled={saving} className="admin-btn admin-btn-primary">
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Footer'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'bio' ? 'active' : ''}`}
          onClick={() => setActiveTab('bio')}
        >
          <Building2 size={16} />
          <span>Company Bio &amp; Badges</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <List size={16} />
          <span>Services Column</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          <Compass size={16} />
          <span>Solutions &amp; Demo CTA</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <MapPin size={16} />
          <span>Offices &amp; Newsletter</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'legal' ? 'active' : ''}`}
          onClick={() => setActiveTab('legal')}
        >
          <FileText size={16} />
          <span>Copyright &amp; Legal Bar</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={16} />
          <span>Live Footer Preview</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* TAB 1: BIO & BADGES & SOCIAL */}
        {activeTab === 'bio' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <ShieldCheck size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Brand Profile, Bio &amp; Social Channels
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">About Us Short Summary</label>
              <textarea
                rows={4}
                className="admin-textarea"
                placeholder="Describe Black Grapes Softech..."
                value={settings.footer_about_text || ''}
                onChange={(e) => setSettings({ ...settings, footer_about_text: e.target.value })}
              />
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '0.25rem', display: 'block' }}>
                Displayed directly beneath the logo in the first column of the footer.
              </span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Quality &amp; ISO Trust Badge Text</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <ShieldCheck size={20} color="#10b981" />
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. ISO 9001:2015 & Quality Assured Engineering"
                  value={settings.footer_trust_badge || ''}
                  onChange={(e) => setSettings({ ...settings, footer_trust_badge: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2" style={{ marginTop: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Brand Title Word 1 (White)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.brand_title || 'BLACK GRAPES'}
                  onChange={(e) => setSettings({ ...settings, brand_title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Brand Subtitle</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.brand_subtitle || 'SOFTECH • GROUP'}
                  onChange={(e) => setSettings({ ...settings, brand_subtitle: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem', fontWeight: 600 }}>
                Social Media Profile Links (Icons in Footer Column 1)
              </h4>
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://linkedin.com/in/..."
                    value={settings.social_linkedin || ''}
                    onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Twitter / X URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://x.com/..."
                    value={settings.social_twitter || ''}
                    onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Instagram Profile URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://instagram.com/..."
                    value={settings.social_instagram || ''}
                    onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Facebook Page URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://facebook.com/..."
                    value={settings.social_facebook || ''}
                    onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">YouTube Channel URL</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://youtube.com/..."
                    value={settings.social_youtube || ''}
                    onChange={(e) => setSettings({ ...settings, social_youtube: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">WhatsApp Contact Number / URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="+91 9039397884"
                    value={settings.whatsapp_number || ''}
                    onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES COLUMN */}
        {activeTab === 'services' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <List size={20} color="#ff6b00" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Footer Column 2: Core Services Links
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleAddLink('footer_services_links', 'New Service', '/services')}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
              >
                <Plus size={14} />
                <span>Add Service Link</span>
              </button>
            </div>

            <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Column Heading Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Services Hub"
                  value={settings.footer_services_title || 'Services Hub'}
                  onChange={(e) => setSettings({ ...settings, footer_services_title: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Heading Link Destination</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/services"
                  value={settings.footer_services_link || '/services'}
                  onChange={(e) => setSettings({ ...settings, footer_services_link: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--admin-border)', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>
                <span>Link Display Text</span>
                <span>Target URL / Route Path</span>
                <span></span>
              </div>
              {(settings.footer_services_links || []).map((link, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={link.label || ''}
                    placeholder="Link Label"
                    onChange={(e) => handleLinkChange('footer_services_links', idx, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={link.path || ''}
                    placeholder="/services/..."
                    onChange={(e) => handleLinkChange('footer_services_links', idx, 'path', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink('footer_services_links', idx)}
                    className="admin-btn-icon"
                    style={{ color: '#ef4444', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                    title="Delete Link"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => handleAddLink('footer_services_links', 'New Service', '/services')}
                className="admin-btn admin-btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Plus size={16} />
                <span>Add Another Service Link</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SOLUTIONS COLUMN & DEMO CTA */}
        {activeTab === 'solutions' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Compass size={20} color="#ff6b00" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Footer Column 3: Solutions, Products &amp; Demo CTA
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleAddLink('footer_solutions_links', 'New Solution', '/products')}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
              >
                <Plus size={14} />
                <span>Add Solution Link</span>
              </button>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Column Heading Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Solutions & Ecosystem"
                value={settings.footer_solutions_title || 'Solutions & Ecosystem'}
                onChange={(e) => setSettings({ ...settings, footer_solutions_title: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--admin-border)', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>
                <span>Link Display Text</span>
                <span>Target URL / Route Path</span>
                <span></span>
              </div>
              {(settings.footer_solutions_links || []).map((link, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={link.label || ''}
                    placeholder="Link Label"
                    onChange={(e) => handleLinkChange('footer_solutions_links', idx, 'label', e.target.value)}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={link.path || ''}
                    placeholder="/products..."
                    onChange={(e) => handleLinkChange('footer_solutions_links', idx, 'path', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink('footer_solutions_links', idx)}
                    className="admin-btn-icon"
                    style={{ color: '#ef4444', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                    title="Delete Link"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => handleAddLink('footer_solutions_links', 'New Solution', '/products')}
                className="admin-btn admin-btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Plus size={16} />
                <span>Add Another Solution Link</span>
              </button>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                Interactive "Request a Live Demo" Action Button
              </h4>
              <div className="admin-form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', margin: 0 }}>
                  <input
                    type="checkbox"
                    style={{ width: '18px', height: '18px', accentColor: '#ff6b00' }}
                    checked={settings.footer_demo_btn_enabled !== false}
                    onChange={(e) => setSettings({ ...settings, footer_demo_btn_enabled: e.target.checked })}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>
                      Show Demo Button at Bottom of Column 3
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      Opens the interactive inquiry popup when clicked by clients.
                    </div>
                  </div>
                </label>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Demo Button Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Request a Live Demo"
                  value={settings.footer_demo_btn_text || 'Request a Live Demo'}
                  onChange={(e) => setSettings({ ...settings, footer_demo_btn_text: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OFFICES & NEWSLETTER */}
        {activeTab === 'contact' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <MapPin size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Footer Column 4: Contact Coordinates &amp; Newsletter
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Column Heading Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Contact & Offices"
                value={settings.footer_contact_title || 'Contact & Offices'}
                onChange={(e) => setSettings({ ...settings, footer_contact_title: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Office 1 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Registered Office:"
                  value={settings.footer_office_1_label || 'Registered Office:'}
                  onChange={(e) => setSettings({ ...settings, footer_office_1_label: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Office 1 Physical Address</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="252-F/H, Scheme No 54..."
                  value={settings.office_address || ''}
                  onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Office 2 Label</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Corporate Office:"
                  value={settings.footer_office_2_label || 'Corporate Office:'}
                  onChange={(e) => setSettings({ ...settings, footer_office_2_label: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Office 2 Physical Address</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Office No.1141, Scheme No.114..."
                  value={settings.office_address_2 || ''}
                  onChange={(e) => setSettings({ ...settings, office_address_2: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2" style={{ marginTop: '0.5rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Direct Inquiries Email</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="info@blackgrapessoftech.com"
                  value={settings.primary_email || ''}
                  onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Alternate / Support Email</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="blackgrapesgroups@gmail.com"
                  value={settings.alt_email || ''}
                  onChange={(e) => setSettings({ ...settings, alt_email: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Primary Hotline / WhatsApp Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="+91 9039397884"
                  value={settings.primary_phone || ''}
                  onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Secondary Hotline Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="+91 7470997884"
                  value={settings.secondary_phone || ''}
                  onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
                />
              </div>
            </div>

            {/* Newsletter Subscription Strip */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
              <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                Newsletter Subscription Box
              </h4>
              <div className="admin-form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', margin: 0 }}>
                  <input
                    type="checkbox"
                    style={{ width: '18px', height: '18px', accentColor: '#ff6b00' }}
                    checked={settings.footer_newsletter_enabled !== false}
                    onChange={(e) => setSettings({ ...settings, footer_newsletter_enabled: e.target.checked })}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>
                      Enable Newsletter Subscription Box
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                      Visitors can enter their email directly in the footer to subscribe.
                    </div>
                  </div>
                </label>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-label">Newsletter Heading</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Stay Updated:"
                    value={settings.footer_newsletter_title || 'Stay Updated:'}
                    onChange={(e) => setSettings({ ...settings, footer_newsletter_title: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Input Field Placeholder</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Enter business email"
                    value={settings.footer_newsletter_placeholder || 'Enter business email'}
                    onChange={(e) => setSettings({ ...settings, footer_newsletter_placeholder: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COPYRIGHT & LEGAL BAR */}
        {activeTab === 'legal' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <FileText size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Bottom Copyright &amp; Legal Navigation Bar
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Copyright Notice Text</label>
              <input
                type="text"
                className="admin-input"
                placeholder="© 2026 Black Grapes Softech Pvt. Ltd. All rights reserved."
                value={settings.copyright_text || ''}
                onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">"Crafted With" Location Tag</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Crafted with ❤️ in Indore, India"
                value={settings.footer_crafted_text || 'Crafted with ❤️ in Indore, India'}
                onChange={(e) => setSettings({ ...settings, footer_crafted_text: e.target.value })}
              />
            </div>

            <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--admin-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', margin: 0, fontWeight: 600 }}>
                  Bottom Bar Quick / Legal Links
                </h4>
                <button
                  type="button"
                  onClick={() => handleAddLink('footer_bottom_links', 'Privacy Policy', '/privacy')}
                  className="admin-btn admin-btn-secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                >
                  <Plus size={14} />
                  <span>Add Bottom Link</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', paddingBottom: '0.4rem', borderBottom: '1px solid var(--admin-border)', fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>
                  <span>Link Display Text</span>
                  <span>Target URL / Route Path</span>
                  <span></span>
                </div>
                {(settings.footer_bottom_links || []).map((link, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 40px', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="admin-input"
                      value={link.label || ''}
                      placeholder="Link Label"
                      onChange={(e) => handleLinkChange('footer_bottom_links', idx, 'label', e.target.value)}
                    />
                    <input
                      type="text"
                      className="admin-input"
                      value={link.path || ''}
                      placeholder="/about, /terms, /privacy..."
                      onChange={(e) => handleLinkChange('footer_bottom_links', idx, 'path', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink('footer_bottom_links', idx)}
                      className="admin-btn-icon"
                      style={{ color: '#ef4444', height: '38px', width: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                      title="Delete Link"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => handleAddLink('footer_bottom_links', 'New Link', '/')}
                  className="admin-btn admin-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Plus size={16} />
                  <span>Add Another Bottom Link</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LIVE INTERACTIVE PREVIEW */}
        {activeTab === 'preview' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Eye size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Live Visual Footer Preview (Real-Time Render)
              </h3>
            </div>

            {/* Preview Frame */}
            <div style={{ background: '#06050a', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1.2fr', gap: '2rem' }}>
                  {/* Col 1 */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <img src={settings.logo_url || '/bgst-logo.png'} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} onError={(e) => { e.target.src = '/bgst-logo.png'; }} />
                      <div>
                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>
                          {settings.brand_title || 'BLACK GRAPES'}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: '#ff6b00', letterSpacing: '0.1em' }}>
                          {settings.brand_subtitle || 'SOFTECH • GROUP'}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {settings.footer_about_text || 'Company summary goes here...'}
                    </p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.35rem 0.75rem', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#10b981', fontSize: '0.78rem' }}>
                      <ShieldCheck size={14} />
                      <span>{settings.footer_trust_badge || 'ISO Quality Assured'}</span>
                    </div>
                  </div>

                  {/* Col 2 */}
                  <div>
                    <h5 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {settings.footer_services_title || 'Services Hub'}
                    </h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {(settings.footer_services_links || []).map((l, i) => (
                        <li key={i} style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
                          {l.label}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 3 */}
                  <div>
                    <h5 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {settings.footer_solutions_title || 'Solutions & Ecosystem'}
                    </h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {(settings.footer_solutions_links || []).map((l, i) => (
                        <li key={i} style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
                          {l.label}
                        </li>
                      ))}
                      {settings.footer_demo_btn_enabled !== false && (
                        <li style={{ marginTop: '0.5rem' }}>
                          <span style={{ color: '#ff6b00', fontWeight: 600, fontSize: '0.82rem' }}>
                            &bull; {settings.footer_demo_btn_text || 'Request a Live Demo'}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Col 4 */}
                  <div>
                    <h5 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      {settings.footer_contact_title || 'Contact & Offices'}
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                      <div>
                        <strong style={{ color: '#fff' }}>{settings.footer_office_1_label || 'Registered Office:'}</strong>
                        <div>{settings.office_address}</div>
                      </div>
                      {settings.office_address_2 && (
                        <div>
                          <strong style={{ color: '#fff' }}>{settings.footer_office_2_label || 'Corporate Office:'}</strong>
                          <div>{settings.office_address_2}</div>
                        </div>
                      )}
                      <div>
                        <strong style={{ color: '#fff' }}>Email:</strong> {settings.primary_email}
                      </div>
                      <div>
                        <strong style={{ color: '#fff' }}>Phone:</strong> {settings.primary_phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Preview */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6b7280', fontSize: '0.78rem' }}>
                <div>{settings.copyright_text}</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {(settings.footer_bottom_links || []).map((l, i) => (
                    <span key={i}>{l.label}</span>
                  ))}
                  {settings.footer_crafted_text && (
                    <span style={{ color: '#9ca3af' }}>{settings.footer_crafted_text}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem', gap: '1rem' }}>
          <button type="submit" disabled={saving} className="admin-btn admin-btn-primary" style={{ minWidth: '180px' }}>
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Save & Publish Footer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
