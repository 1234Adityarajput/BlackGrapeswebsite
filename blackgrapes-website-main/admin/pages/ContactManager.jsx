import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Save,
  CheckCircle,
  Building,
  Globe,
  ExternalLink,
  Clock,
  Plus,
  Trash2,
  Sparkles,
  MessageSquare,
  Share2,
  Inbox,
  Eye,
  RefreshCw
} from 'lucide-react';
import {
  getSiteSettings,
  updateSiteSettings,
  getContactPage,
  saveContactPage,
  getEnquiries,
  updateEnquiryStatus
} from '@backend/dataService';

export default function ContactManager() {
  const [settings, setSettings] = useState(null);
  const [contactPage, setContactPage] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero', 'addresses', 'hotlines', 'message_social', 'enquiries'
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadAll();
    const handleUpdate = () => {
      loadEnquiries();
    };
    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const loadAll = async () => {
    const [sRes, cRes, enqRes] = await Promise.all([
      getSiteSettings(),
      getContactPage(),
      getEnquiries()
    ]);
    setSettings(sRes || {});
    setContactPage(cRes || {});
    setEnquiries(Array.isArray(enqRes) ? enqRes : []);
  };

  const loadEnquiries = async () => {
    const list = await getEnquiries();
    setEnquiries(Array.isArray(list) ? list : []);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Direct Phone Contacts Handlers
  const handleAddPhonePerson = () => {
    const directPhones = [...(contactPage.directPhones || [])];
    directPhones.push({
      name: 'New Department / Executive',
      phones: ['+91 9000000000']
    });
    setContactPage({ ...contactPage, directPhones });
  };

  const handlePhonePersonChange = (idx, field, val) => {
    const directPhones = [...(contactPage.directPhones || [])];
    if (field === 'phones') {
      const phonesArr = val.split(',').map((p) => p.trim()).filter(Boolean);
      directPhones[idx] = { ...directPhones[idx], phones: phonesArr };
    } else {
      directPhones[idx] = { ...directPhones[idx], [field]: val };
    }
    setContactPage({ ...contactPage, directPhones });
  };

  const handleDeletePhonePerson = (idx) => {
    const directPhones = (contactPage.directPhones || []).filter((_, i) => i !== idx);
    setContactPage({ ...contactPage, directPhones });
  };

  // Department Emails Handlers
  const handleAddEmailChannel = () => {
    const emails = [...(contactPage.emails || [])];
    emails.push({
      department: 'Customer Desk',
      email: 'desk@blackgrapessoftech.com'
    });
    setContactPage({ ...contactPage, emails });
  };

  const handleEmailChannelChange = (idx, field, val) => {
    const emails = [...(contactPage.emails || [])];
    emails[idx] = { ...emails[idx], [field]: val };
    setContactPage({ ...contactPage, emails });
  };

  const handleDeleteEmailChannel = (idx) => {
    const emails = (contactPage.emails || []).filter((_, i) => i !== idx);
    setContactPage({ ...contactPage, emails });
  };

  // Enquiry Status Update Handler
  const handleStatusChange = async (id, newStatus) => {
    await updateEnquiryStatus(id, newStatus);
    showToast(`Enquiry status updated to "${newStatus}"`);
    await loadEnquiries();
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      // Sync mirrored values between settings and contactPage
      const updatedSettings = {
        ...(settings || {}),
        office_address: contactPage.address1Text || settings?.office_address || '',
        primary_phone: settings?.primary_phone || contactPage.directPhones?.[0]?.phones?.[0] || '',
        secondary_phone: settings?.secondary_phone || contactPage.directPhones?.[0]?.phones?.[1] || '',
        primary_email: settings?.primary_email || contactPage.emails?.[0]?.email || '',
        social_facebook: contactPage.socialFacebook || settings?.social_facebook || '',
        social_twitter: contactPage.socialTwitter || settings?.social_twitter || '',
        social_instagram: contactPage.socialInstagram || settings?.social_instagram || '',
        social_linkedin: contactPage.socialLinkedin || settings?.social_linkedin || '',
        social_youtube: contactPage.socialYoutube || settings?.social_youtube || ''
      };

      await Promise.all([
        updateSiteSettings(updatedSettings),
        saveContactPage(contactPage)
      ]);
      setSettings(updatedSettings);
      showToast('Contact page coordinates & content published live via WebSocket!');
    } catch (err) {
      showToast('Failed to save contact settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings || !contactPage) {
    return <div style={{ color: '#9ca3af', padding: '2rem' }}>Loading contact coordinates...</div>;
  }

  // Filter contact inquiries (matching 'contact' in source or general)
  const contactEnquiries = enquiries.filter((e) => {
    const isContact =
      !e.source ||
      e.source.toLowerCase().includes('contact') ||
      (e.service && e.service.toLowerCase().includes('contact')) ||
      (e.service && e.service.toLowerCase().includes('general'));

    if (!isContact) return false;

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.message?.toLowerCase().includes(q) ||
      e.service?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

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
          <h1 className="admin-page-title">Contact & Location Coordinates</h1>
          <p className="admin-page-sub">
            Customize top hero headlines, registered headquarters & development centers, Google Maps embeds, hotline contacts, support emails, and live inquiries.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
            title="Preview live contact page"
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
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={16} />
          <span>Hero Banner & Headlines</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'addresses' ? 'active' : ''}`}
          onClick={() => setActiveTab('addresses')}
        >
          <MapPin size={16} />
          <span>Office Addresses & Maps</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'hotlines' ? 'active' : ''}`}
          onClick={() => setActiveTab('hotlines')}
        >
          <Phone size={16} />
          <span>Hotlines & Support Emails</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'message_social' ? 'active' : ''}`}
          onClick={() => setActiveTab('message_social')}
        >
          <MessageSquare size={16} />
          <span>Leave Message & Socials</span>
        </button>

        <button
          className={`admin-tab ${activeTab === 'enquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('enquiries')}
        >
          <Inbox size={16} />
          <span>Contact Enquiries ({contactEnquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: HERO BANNER & HEADLINES */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} color="#ff6b00" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
              Hero Banner & Headline Coordinates
            </h3>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Top Eyebrow Badge</label>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. BLACK GRAPES GROUP"
              value={contactPage.heroBadge || ''}
              onChange={(e) => setContactPage({ ...contactPage, heroBadge: e.target.value })}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Main H1 Title</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Get in Touch"
                value={contactPage.heroTitle || ''}
                onChange={(e) => setContactPage({ ...contactPage, heroTitle: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Highlight Accent Word (Gradient Styled)</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Touch"
                value={contactPage.heroTitleAccent || ''}
                onChange={(e) => setContactPage({ ...contactPage, heroTitleAccent: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Hero Lead Subtitle</label>
            <textarea
              rows={3}
              className="admin-textarea"
              placeholder="e.g. We are here to help and answer any questions you might have. We look forward to hearing from you."
              value={contactPage.heroSubtitle || ''}
              onChange={(e) => setContactPage({ ...contactPage, heroSubtitle: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* TAB 2: OFFICE ADDRESSES & GOOGLE MAPS */}
      {activeTab === 'addresses' && (
        <div>
          {/* Address 1: Headquarter */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Building size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Address 1 — Registered Corporate Headquarters
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section / Badge Label</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Registered Office (Address 1)"
                value={contactPage.address1Label || ''}
                onChange={(e) => setContactPage({ ...contactPage, address1Label: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Complete Postal Address</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="252-F/H, Scheme No 54, Vijay Nagar, Indore - 452010, Madhya Pradesh, India."
                value={contactPage.address1Text || ''}
                onChange={(e) => {
                  setContactPage({ ...contactPage, address1Text: e.target.value });
                  setSettings({ ...settings, office_address: e.target.value });
                }}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Google Maps External Navigation Link</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://maps.app.goo.gl/..."
                  value={contactPage.address1MapUrl || ''}
                  onChange={(e) => setContactPage({ ...contactPage, address1MapUrl: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Google Maps iFrame Embed URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={contactPage.address1MapEmbed || ''}
                  onChange={(e) => setContactPage({ ...contactPage, address1MapEmbed: e.target.value })}
                />
              </div>
            </div>

            {contactPage.address1MapEmbed && (
              <div style={{ marginTop: '0.5rem' }}>
                <span className="admin-label" style={{ marginBottom: '0.4rem' }}>Live Map Embed Preview:</span>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', border: '1px solid var(--admin-border)' }}>
                  <iframe
                    src={contactPage.address1MapEmbed}
                    title="Address 1 Map Preview"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Address 2: Development Centre */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Building size={20} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Address 2 — Development & Engineering Centre
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Section / Badge Label</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Development Centre (Address 2)"
                value={contactPage.address2Label || ''}
                onChange={(e) => setContactPage({ ...contactPage, address2Label: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Complete Postal Address</label>
              <textarea
                rows={2}
                className="admin-textarea"
                placeholder="Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore - 452010, Madhya Pradesh, India."
                value={contactPage.address2Text || ''}
                onChange={(e) => setContactPage({ ...contactPage, address2Text: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Google Maps External Navigation Link</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://maps.app.goo.gl/..."
                  value={contactPage.address2MapUrl || ''}
                  onChange={(e) => setContactPage({ ...contactPage, address2MapUrl: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Google Maps iFrame Embed URL</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  value={contactPage.address2MapEmbed || ''}
                  onChange={(e) => setContactPage({ ...contactPage, address2MapEmbed: e.target.value })}
                />
              </div>
            </div>

            {contactPage.address2MapEmbed && (
              <div style={{ marginTop: '0.5rem' }}>
                <span className="admin-label" style={{ marginBottom: '0.4rem' }}>Live Map Embed Preview:</span>
                <div style={{ borderRadius: '8px', overflow: 'hidden', height: '180px', border: '1px solid var(--admin-border)' }}>
                  <iframe
                    src={contactPage.address2MapEmbed}
                    title="Address 2 Map Preview"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: HOTLINES & SUPPORT EMAILS */}
      {activeTab === 'hotlines' && (
        <div>
          {/* Direct Phone Directory */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={20} color="#ff6b00" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Direct Phone Hotlines & Representatives
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddPhonePerson}
                className="admin-btn admin-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              >
                <Plus size={14} />
                <span>Add Person / Desk</span>
              </button>
            </div>

            {(contactPage.directPhones || []).map((person, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ff6b00' }}>
                    Contact #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeletePhonePerson(idx)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Representative / Desk Name</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Arpit Jain"
                      value={person.name || ''}
                      onChange={(e) => handlePhonePersonChange(idx, 'name', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Phone Numbers (comma-separated)</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="+91 9039397884, +91 7470997884"
                      value={(person.phones || []).join(', ')}
                      onChange={(e) => handlePhonePersonChange(idx, 'phones', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Department Emails */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={20} color="#8b5cf6" />
                <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                  Inbound Departmental Email Inboxes
                </h3>
              </div>
              <button
                type="button"
                onClick={handleAddEmailChannel}
                className="admin-btn admin-btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              >
                <Plus size={14} />
                <span>Add Email Channel</span>
              </button>
            </div>

            {(contactPage.emails || []).map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--admin-border)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8b5cf6' }}>
                    Email Channel #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEmailChannel(idx)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label className="admin-label">Department / Purpose</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. General Inquiries"
                      value={item.department || ''}
                      onChange={(e) => handleEmailChannelChange(idx, 'department', e.target.value)}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Email Address</label>
                    <input
                      type="email"
                      className="admin-input"
                      placeholder="info@blackgrapessoftech.com"
                      value={item.email || ''}
                      onChange={(e) => handleEmailChannelChange(idx, 'email', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Support Operating Hours & Global Settings Sync */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Clock size={20} color="#10b981" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Support Hours & Global Communication Sync
              </h3>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Support & Operating Desk Hours</label>
              <input
                type="text"
                className="admin-input"
                placeholder="Monday – Saturday: 10:00 AM – 7:30 PM (IST)"
                value={contactPage.workingHours || ''}
                onChange={(e) => setContactPage({ ...contactPage, workingHours: e.target.value })}
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Global Primary Phone (Syncs to Header/Footer)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.primary_phone || ''}
                  onChange={(e) => setSettings({ ...settings, primary_phone: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Global Secondary Phone</label>
                <input
                  type="text"
                  className="admin-input"
                  value={settings.secondary_phone || ''}
                  onChange={(e) => setSettings({ ...settings, secondary_phone: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Global Primary Email (Syncs to Header/Footer)</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.primary_email || ''}
                  onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Global Support Email</label>
                <input
                  type="email"
                  className="admin-input"
                  value={settings.support_email || ''}
                  onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LEAVE MESSAGE & SOCIALS */}
      {activeTab === 'message_social' && (
        <div>
          {/* Leave a Message Section Text */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <MessageSquare size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                "Leave a Message" Section Content
              </h3>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">Section Heading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Leave a Message"
                  value={contactPage.leaveTitle || ''}
                  onChange={(e) => setContactPage({ ...contactPage, leaveTitle: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Subheading</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Feel free to contact us for any questions or doubts."
                  value={contactPage.leaveSubtitle || ''}
                  onChange={(e) => setContactPage({ ...contactPage, leaveSubtitle: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Descriptive Narrative</label>
              <textarea
                rows={3}
                className="admin-textarea"
                placeholder="Whether you need technical software consultation, property valuation..."
                value={contactPage.leaveDesc || ''}
                onChange={(e) => setContactPage({ ...contactPage, leaveDesc: e.target.value })}
              />
            </div>
          </div>

          {/* Social Media Channels */}
          <div className="admin-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Share2 size={20} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Official Social Media Channels
              </h3>
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label">LinkedIn Corporate URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://www.linkedin.com/in/..."
                  value={contactPage.socialLinkedin || settings.social_linkedin || ''}
                  onChange={(e) => {
                    setContactPage({ ...contactPage, socialLinkedin: e.target.value });
                    setSettings({ ...settings, social_linkedin: e.target.value });
                  }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Twitter / X URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://twitter.com/..."
                  value={contactPage.socialTwitter || settings.social_twitter || ''}
                  onChange={(e) => {
                    setContactPage({ ...contactPage, socialTwitter: e.target.value });
                    setSettings({ ...settings, social_twitter: e.target.value });
                  }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Instagram URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://www.instagram.com/..."
                  value={contactPage.socialInstagram || settings.social_instagram || ''}
                  onChange={(e) => {
                    setContactPage({ ...contactPage, socialInstagram: e.target.value });
                    setSettings({ ...settings, social_instagram: e.target.value });
                  }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Facebook URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://www.facebook.com/..."
                  value={contactPage.socialFacebook || settings.social_facebook || ''}
                  onChange={(e) => {
                    setContactPage({ ...contactPage, socialFacebook: e.target.value });
                    setSettings({ ...settings, social_facebook: e.target.value });
                  }}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">YouTube Channel URL</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://www.youtube.com/channel/..."
                  value={contactPage.socialYoutube || settings.social_youtube || ''}
                  onChange={(e) => {
                    setContactPage({ ...contactPage, socialYoutube: e.target.value });
                    setSettings({ ...settings, social_youtube: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CONTACT ENQUIRIES */}
      {activeTab === 'enquiries' && (
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Inbox size={20} color="#ff6b00" />
              <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
                Live Inquiries Submitted via Contact Form ({contactEnquiries.length})
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search inquiries..."
                className="admin-input"
                style={{ width: '220px', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="admin-select"
                style={{ width: '130px', padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>

              <button
                type="button"
                onClick={loadEnquiries}
                className="admin-btn admin-btn-secondary"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                title="Refresh leads"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {contactEnquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9ca3af' }}>
              <Inbox size={42} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ margin: 0 }}>No contact form submissions found matching your filters.</p>
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date / Time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Requirement / Service</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td style={{ fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                        {enq.date || enq.created_at || 'Just now'}
                      </td>
                      <td style={{ fontWeight: 600, color: '#fff' }}>
                        {enq.name || 'Anonymous'}
                      </td>
                      <td>
                        <a
                          href={`mailto:${enq.email}`}
                          style={{ color: '#ff6b00', textDecoration: 'none' }}
                        >
                          {enq.email}
                        </a>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: '#d1d5db' }}>
                        {enq.service || 'General Contact'}
                      </td>
                      <td style={{ maxWidth: '280px', fontSize: '0.8rem', color: '#9ca3af' }}>
                        {enq.message || '-'}
                      </td>
                      <td>
                        <span className={`badge-status ${enq.status || 'new'}`}>
                          {enq.status || 'new'}
                        </span>
                      </td>
                      <td>
                        <select
                          className="admin-select"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                          value={enq.status || 'new'}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
