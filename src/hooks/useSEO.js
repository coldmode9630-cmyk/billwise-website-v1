import { useEffect } from 'react';
import { site } from '../config/site.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

/** Per-page title, description, canonical and Open Graph tags. */
export default function useSEO({ title, description = site.description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | Medical Billing Services for Doctors, Hospitals & Clinics`;
    const url = site.url + path;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
  }, [title, description, path]);
}
