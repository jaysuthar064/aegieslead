import React, { useEffect } from 'react';
import type { PageMeta, BrandingSettings } from '../types/cms';

interface Props {
  meta?: PageMeta;
  branding?: BrandingSettings;
  slug?: string;
}

export const SeoHead: React.FC<Props> = ({ meta, branding, slug = 'home' }) => {
  useEffect(() => {
    // 1. Dynamic Title
    if (meta?.title) {
      document.title = meta.title;
    } else if (branding?.site_title) {
      document.title = `${branding.site_title} — The Unified Operating System for Physical Security`;
    }

    // 2. Meta Description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta');
      metaDescEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescEl);
    }
    const descriptionContent = meta?.description || branding?.tagline || 'Command guard patrols, live incidents, timesheet billing, and AI proposals in one connected system of record.';
    metaDescEl.setAttribute('content', descriptionContent);

    // 3. OpenGraph Title
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (!ogTitleEl) {
      ogTitleEl = document.createElement('meta');
      ogTitleEl.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleEl);
    }
    ogTitleEl.setAttribute('content', document.title);

    // 4. OpenGraph Description
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (!ogDescEl) {
      ogDescEl = document.createElement('meta');
      ogDescEl.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescEl);
    }
    ogDescEl.setAttribute('content', descriptionContent);

  }, [meta, branding, slug]);

  return null;
};
