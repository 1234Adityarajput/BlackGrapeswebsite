import React, { useState } from 'react';

/**
 * Resolves the client logo URL, automatically repairing any old dead WordPress uploads
 * paths and mapping them to the local /clients/<id>.svg vector assets.
 */
export function resolveClientLogo(client) {
  if (!client) return '';
  const rawLogo = client.logo || client.logo_url;
  const clientId = client.id || client.client_key || (client.name || '').toLowerCase().replace(/[^a-z0-9]/g, '-');

  // If URL points to the old dead WordPress upload directory, use local SVG asset
  if (typeof rawLogo === 'string' && rawLogo.includes('/wp-content/uploads/')) {
    return `/clients/${clientId}.svg`;
  }

  if (rawLogo && rawLogo.trim().length > 0) {
    return rawLogo;
  }

  // Fallback to local SVG asset
  return `/clients/${clientId}.svg`;
}

/**
 * Bulletproof client logo component with zero broken images guarantee.
 * Automatically falls back to an elegant brand initial badge if loading fails.
 */
export default function ClientLogoImage({ client, className = 'client-brand-img', isModal = false }) {
  const [hasError, setHasError] = useState(false);

  if (!client) return null;

  const resolvedSrc = resolveClientLogo(client);
  const name = client.name || client.client || 'Client';
  const initial = name.trim().charAt(0).toUpperCase() || 'C';

  if (hasError || !resolvedSrc) {
    return (
      <div className={`client-brand-fallback-badge ${isModal ? 'in-modal' : ''}`}>
        <span className="client-fallback-initial">{initial}</span>
        {!isModal && <span className="client-fallback-title">{name}</span>}
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={`${name} Logo`}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
