import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle,
  Bell,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Image as ImageIcon,
  MousePointer,
  Eye
} from 'lucide-react';
import { getSiteSettings, updateSiteSettings } from '@backend/dataService';

export default function HeaderManager() {
  const [settings, setSettings] = useState(null);
  const [activeTab, setActiveTab] = useState('strip'); // 'strip', 'brand', 'cta', 'preview'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getSiteSettings().then((res) => {
      setSettings(res || {});
    });
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(settings);
      showToast('Header & Banner updated live on website via WebSocket!');
    } catch (err) {
      showToast('Failed to save header settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading header settings...</div>;
  }

  return (
    <div>
      {toastMessage && (
        <div className="admin-toast">
          <CheckCircle size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Header & Banner Manager</h1>
          <p className="admin-page-sub">
            Customize the top announcement strip, hotline coordinates, brand logo &amp; title, CTA button, and responsive mobile navigation.
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
            <span>{saving ? 'Publishing...' : 'Save & Publish Header'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'strip' ? 'active' : ''}`}
          onClick={() => setActiveTab('strip')}
        >
          <Bell size={16} />
          <span>Top Announcement Strip</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'brand' ? 'active' : ''}`}
          onClick={() => setActiveTab('brand')}
        >
          <Sparkles size={16} />
          <span>Brand Identity & Logo</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'cta' ? 'active' : ''}`}
          onClick={() => setActiveTab('cta')}
        >
          <MousePointer size={16} />
          <span>Header CTA Button</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye size={16} />
          <span>Live Header Preview</span>
        </button>
      </div>

      <form onSubmit={handleSave}>
        {/* TAB 1: TOP NOTIFICATION & HOTLINE STRIP */}
        {activeTab === 'strip' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Bell size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Top Announcement & Info Bar
              </h3>
            </div>

            <div className="admin-form-group" style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', margin: 0 }}>
                <input
                  type="checkbox"
                  style={{ width: '18px', height: '18px', accentColor: '#ff6b00' }}
                  checked={settings.top_strip_enabled !== false}
                  onChange={(e) => setSettings({ ...settings, top_strip_enabled: e.target.checked })}
                />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>
                    Enable Top Announcement & Contact Bar
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    Controls visibility of the slim top bar across all pages above the sticky navigation menu.
                  </div>
                </div>
              </label>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Left Status Pill (Pulsing Green Indicator)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Accepting New Projects"
                  value={settings.top_bar_pill || ''}
                  onChange={(e) => setSettings({ ...settings, top_bar_pill: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Announcement Badge Text</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Apprenticeship & Partner Program Open"
                  value={settings.top_bar_badge || settings.top_strip_text || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      top_bar_badge: e.target.value,
                      top_strip_text: e.target.value
                    })
                  }
                />
              </div>
            </div>

            <div className="admin-grid-3">
              <div className="admin-form-group">
                <label className="admin-label">Hotline Phone Number</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. +91 7470997884"
                  value={settings.primary_phone || ''}
                  onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Inbound Contact Email</label>
                <input
                  type="email"
                  className="admin-input"
                  placeholder="e.g. info@blackgrapessoftech.com"
                  value={settings.primary_email || ''}
                  onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Location Coordinate</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Indore, MP, India"
                  value={settings.top_bar_location || ''}
                  onChange={(e) => setSettings({ ...settings, top_bar_location: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BRAND IDENTITY & LOGO */}
        {activeTab === 'brand' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Sparkles size={20} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Brand Identity & Logo Configuration
              </h3>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Brand Logo Asset URL / Path</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="/bgst-logo.png"
                  value={settings.logo_url || ''}
                  onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                />
                <span style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.3rem', display: 'block' }}>
                  Use default <code>/bgst-logo.png</code> or paste any hosted image link.
                </span>
              </div>

              {/* Logo Preview */}
              <div className="admin-form-group">
                <label className="admin-label">Logo Asset Preview</label>
                <div
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid var(--admin-border)',
                    borderRadius: '8px',
                    padding: '0.65rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    height: '52px',
                    boxSizing: 'border-box'
                  }}
                >
                  <img
                    src={settings.logo_url || '/bgst-logo.png'}
                    alt="Logo Preview"
                    style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/bgst-logo.png';
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#10b981' }}>✓ Active Logo Asset</span>
                </div>
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Primary Brand Title (Main Header Text)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. BLACK GRAPES"
                  value={settings.brand_title || ''}
                  onChange={(e) => setSettings({ ...settings, brand_title: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Brand Subtitle / Tagline</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. SOFTECH • IT INNOVATION"
                  value={settings.brand_subtitle || settings.tagline || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      brand_subtitle: e.target.value,
                      tagline: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HEADER CTA BUTTON */}
        {activeTab === 'cta' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <MousePointer size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Header Call-to-Action (CTA) Button
              </h3>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Full Button Label (Desktop & Tablet)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Get Quote / Demo"
                  value={settings.header_cta_text || ''}
                  onChange={(e) => setSettings({ ...settings, header_cta_text: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Short Button Label (Compact Mobile)</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="e.g. Quote"
                  value={settings.header_cta_short || ''}
                  onChange={(e) => setSettings({ ...settings, header_cta_short: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Click Action Behavior</label>
                <select
                  className="admin-select"
                  value={settings.header_cta_action || 'modal'}
                  onChange={(e) => setSettings({ ...settings, header_cta_action: e.target.value })}
                >
                  <option value="modal">Open Interactive "Request a Demo" Modal</option>
                  <option value="link">Navigate directly to page URL (e.g. /contact-us)</option>
                </select>
              </div>

              {settings.header_cta_action === 'link' && (
                <div className="admin-form-group">
                  <label className="admin-label">Target Page Route / URL</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/contact-us"
                    value={settings.header_cta_link || '/contact-us'}
                    onChange={(e) => setSettings({ ...settings, header_cta_link: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE HEADER PREVIEW */}
        {activeTab === 'preview' && (
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Eye size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Live Header Visual Preview
              </h3>
            </div>

            <div
              style={{
                background: '#07050d',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Top Bar Preview */}
              {settings.top_strip_enabled !== false ? (
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '0.5rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: '#94a3b8'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#10b981',
                          boxShadow: '0 0 6px #10b981'
                        }}
                      />
                      {settings.top_bar_pill || 'Accepting New Projects'}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
                    <span
                      style={{
                        background: 'rgba(147, 51, 234, 0.15)',
                        border: '1px solid rgba(147, 51, 234, 0.3)',
                        color: '#c084fc',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 600
                      }}
                    >
                      {settings.top_bar_badge || settings.top_strip_text || 'Apprenticeship & Partner Program Open'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#cbd5e1' }}>
                      <Mail size={12} color="#ff6b00" />
                      {settings.primary_email || 'info@blackgrapessoftech.com'}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#cbd5e1' }}>
                      <Phone size={12} color="#ff6b00" />
                      {settings.primary_phone || '+91 7470997884'}
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
                    <span style={{ color: '#94a3b8' }}>
                      {settings.top_bar_location || 'Indore, MP, India'}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '0.4rem 1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', fontSize: '0.75rem', textAlign: 'center' }}>
                  Top Announcement Strip is currently disabled.
                </div>
              )}

              {/* Main Navbar Preview */}
              <div
                style={{
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(13, 10, 23, 0.85)'
                }}
              >
                {/* Brand Logo & Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={settings.logo_url || '/bgst-logo.png'}
                    alt="Logo"
                    style={{ height: '36px', width: 'auto' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/bgst-logo.png';
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.01em' }}>
                      {settings.brand_title || 'BLACK GRAPES'}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: '#ff6b00', letterSpacing: '0.08em', fontWeight: 600 }}>
                      {settings.brand_subtitle || settings.tagline || 'SOFTECH • IT INNOVATION'}
                    </div>
                  </div>
                </div>

                {/* Mock Nav links */}
                <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 500 }}>
                  <span style={{ color: '#ff6b00' }}>Home</span>
                  <span>About Us</span>
                  <span>Services</span>
                  <span>Our Products</span>
                  <span>Ecommerce</span>
                  <span>Our Clients</span>
                  <span>IT Staffing</span>
                  <span>Partnership</span>
                  <span>Contact</span>
                </div>

                {/* CTA Button */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #ff6b00, #ea580c)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)'
                  }}
                >
                  <span>✨</span>
                  <span>{settings.header_cta_text || 'Get Quote / Demo'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
