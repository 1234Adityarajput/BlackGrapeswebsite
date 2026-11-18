import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  Cloud,
  AlertCircle
} from 'lucide-react';
import { getMediaLibrary, uploadMediaItem, deleteMediaItem } from '@backend/dataService';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const loadMedia = async () => {
    try {
      setLoading(true);
      const list = await getMediaLibrary();
      setMediaList(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('[MediaLibrary] Failed to load media:', err);
      setMediaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();

    // Listen to real-time content updates from WebSockets and other tabs
    const handleUpdate = (e) => {
      if (!e.detail?.module || e.detail?.module === 'media') {
        loadMedia();
      }
    };

    window.addEventListener('bgst_content_updated', handleUpdate);
    return () => window.removeEventListener('bgst_content_updated', handleUpdate);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleFileUpload = async (e) => {
    const files = e.target?.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      for (let i = 0; i < files.length; i++) {
        try {
          const res = await uploadMediaItem(files[i]);
          if (res && (res.success || res.url)) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (itemErr) {
          console.error('[Upload error for file]:', files[i].name, itemErr);
          failCount++;
        }
      }

      if (successCount > 0) {
        showToast(`Successfully uploaded ${successCount} image(s) to Cloudinary!`, 'success');
      } else if (failCount > 0) {
        showToast('Failed to upload image(s). Please check connection.', 'error');
      }

      await loadMedia();
    } catch (err) {
      showToast('Upload error: ' + (err.message || 'Unknown error'), 'error');
    } finally {
      setUploading(false);
      // Reset input value so user can re-upload the same file if needed
      if (e.target) e.target.value = '';
    }
  };

  const handleCopy = async (url, id) => {
    if (!url) {
      showToast('No valid URL found to copy.', 'error');
      return;
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for non-https or restricted contexts
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      showToast('Cloudinary CDN URL copied to clipboard!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      showToast('Failed to copy URL to clipboard.', 'error');
    }
  };

  const handleDelete = async (id, filename) => {
    if (!id) return;
    const confirmName = filename || 'this asset';
    if (window.confirm(`Delete media asset "${confirmName}" permanently from Cloudinary & database?`)) {
      try {
        await deleteMediaItem(id);
        showToast('Asset removed successfully.', 'success');
        await loadMedia();
      } catch (err) {
        showToast('Failed to delete media asset.', 'error');
      }
    }
  };

  const safeList = Array.isArray(mediaList) ? mediaList : [];
  const filtered = safeList.filter((m) => {
    if (!m) return false;
    const query = (searchQuery || '').trim().toLowerCase();
    if (!query) return true;
    const name = (m.filename || m.name || m.originalName || m.alt_text || '').toLowerCase();
    return name.includes(query);
  });

  return (
    <div>
      {toastMessage && (
        <div className={`admin-toast ${toastType === 'error' ? 'admin-toast-error' : ''}`}>
          {toastType === 'error' ? (
            <AlertCircle size={18} color="#ef4444" />
          ) : (
            <CheckCircle size={18} color="#10b981" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <h1 className="admin-page-title" style={{ margin: 0 }}>Media Storage & Asset Library</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.72rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                fontWeight: 600
              }}
            >
              <Cloud size={12} /> Cloudinary Active
            </span>
          </div>
          <p className="admin-page-sub">
            Upload and manage photos, logos, and banners permanently stored on Cloudinary CDN.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={loadMedia}
            disabled={loading || uploading}
            title="Refresh assets"
          >
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            <span>Refresh</span>
          </button>

          <label
            className="admin-btn admin-btn-primary"
            style={{
              cursor: uploading ? 'not-allowed' : 'pointer',
              opacity: uploading ? 0.7 : 1
            }}
          >
            <Upload size={16} />
            <span>{uploading ? 'Uploading to Cloudinary...' : 'Upload Image'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="admin-card" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            className="admin-input"
            style={{ border: 'none', background: 'transparent', padding: '0.25rem 0' }}
            placeholder="Search media files by name or alt text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Media Grid / Empty State */}
      {loading && safeList.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
          <RefreshCw size={32} className="spin" style={{ color: 'var(--brand-orange)', margin: '0 auto 1rem' }} />
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Loading media assets from Cloudinary...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <ImageIcon size={48} style={{ opacity: 0.3, margin: '0 auto 1rem', color: '#9ca3af' }} />
          <h3 style={{ color: '#fff', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
            {searchQuery ? 'No matching assets found' : 'No media assets yet'}
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            {searchQuery
              ? `No media assets match "${searchQuery}". Try a different search keyword.`
              : 'Click "Upload Image" above to upload photos directly to your Cloudinary storage.'}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filtered.map((item, idx) => {
            if (!item) return null;
            const assetUrl = item.url || item.file_url || '';
            const assetName = item.filename || item.name || item.originalName || `Asset #${idx + 1}`;
            const assetId = item.id || item._id || `asset-${idx}`;
            const isCloud = item.storage_provider === 'cloudinary' || assetUrl.includes('cloudinary');

            return (
              <div
                key={assetId}
                className="admin-card"
                style={{
                  padding: '0.75rem',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s ease, border-color 0.15s ease'
                }}
              >
                {/* Image Preview Box */}
                <div
                  style={{
                    width: '100%',
                    height: '145px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(0, 0, 0, 0.45)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  {assetUrl ? (
                    <img
                      src={assetUrl}
                      alt={item.alt_text || assetName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0.35';
                      }}
                    />
                  ) : (
                    <ImageIcon size={32} color="#6b7280" />
                  )}

                  {isCloud && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        background: 'rgba(0, 0, 0, 0.75)',
                        color: '#10b981',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(16, 185, 129, 0.35)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      Cloudinary
                    </span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <strong
                    style={{
                      display: 'block',
                      color: '#fff',
                      fontSize: '0.85rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    title={assetName}
                  >
                    {assetName}
                  </strong>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '0.25rem'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      {item.file_size || item.size
                        ? `${Math.round((item.file_size || item.size) / 1024)} KB`
                        : 'CDN Asset'}
                    </span>
                    {item.width && item.height && (
                      <span style={{ fontSize: '0.68rem', color: '#6b7280' }}>
                        {item.width}×{item.height}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.4rem',
                    marginTop: '0.75rem',
                    borderTop: '1px solid var(--admin-border)',
                    paddingTop: '0.6rem'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleCopy(assetUrl, assetId)}
                    className="admin-btn admin-btn-secondary"
                    style={{
                      flex: 1,
                      padding: '0.35rem 0.5rem',
                      fontSize: '0.75rem',
                      justifyContent: 'center'
                    }}
                    title="Copy live image URL to clipboard"
                  >
                    {copiedId === assetId ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                    <span>{copiedId === assetId ? 'Copied' : 'Copy'}</span>
                  </button>

                  {assetUrl && (
                    <a
                      href={assetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-secondary"
                      style={{
                        padding: '0.35rem 0.55rem',
                        fontSize: '0.75rem',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                      title="Open image in new tab"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(assetId, assetName)}
                    className="admin-btn admin-btn-danger"
                    style={{
                      padding: '0.35rem 0.55rem',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                    title="Delete image permanently"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
