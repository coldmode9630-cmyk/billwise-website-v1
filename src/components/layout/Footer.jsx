import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Facebook } from 'lucide-react';

const socialIcons = { Instagram, Facebook };
import Logo from '../ui/Logo.jsx';
import { site, nav } from '../../config/site.js';
import { services } from '../../config/services.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-mist-300">
      <div aria-hidden className="absolute inset-0 grid-bg-dark opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-royal-600/20 blur-[120px]" />
      <div className="container-x relative pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-6 max-w-sm leading-relaxed text-mist-400">
              Medical billing services for doctors, hospitals and clinics, handled with accuracy, clear communication and steady follow-through.
            </p>
            <div className="mt-8 space-y-3">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-white hover:text-royal-300">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-royal-400/50"><Mail className="h-4 w-4" aria-hidden /></span>
                {site.email}
              </a>
              <a href={site.phoneHref} className="group flex items-center gap-3 text-white hover:text-royal-300">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-royal-400/50"><Phone className="h-4 w-4" aria-hidden /></span>
                {site.phone}
              </a>
              {site.locations.map((loc) => (
                <a key={loc.line} href={loc.mapHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-royal-300">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-royal-400/50"><MapPin className="h-4 w-4" aria-hidden /></span>
                  <span><span className="block text-xs text-mist-400">{loc.label}</span><address className="not-italic">{loc.line}</address></span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              {site.social.map(({ label, href }) => {
                const Icon = socialIcons[label];
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${label}`} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white ring-1 ring-white/10 transition-colors hover:text-royal-300 hover:ring-royal-400/50">
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
          <FooterCol title="Company" className="lg:col-span-2" links={[...nav, { label: 'Submit a Request', to: '/submit-request' }]} />
          <FooterCol title="Services" className="lg:col-span-4 sm:[&_ul]:columns-2 lg:[&_ul]:columns-1 xl:[&_ul]:columns-2" links={services.map((s) => ({ label: s.title, to: `/services#${s.slug}` }))} />
          <FooterCol title="Legal" className="lg:col-span-2" links={[{ label: 'Privacy Policy', to: '/privacy-policy' }, { label: 'Terms and Conditions', to: '/terms-and-conditions' }]} />
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-mist-400 sm:flex-row sm:items-center">
          <p>© {year} {site.name}. All rights reserved.</p>
          <Link to="/submit-request" className="group inline-flex items-center gap-1.5 font-medium text-white hover:text-royal-300">
            Have a billing question? Submit a request <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className = '' }) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-5 space-y-3 [&>li]:break-inside-avoid">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-mist-400 transition-colors hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
