import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { nav, site } from '../../config/site.js';
import { ease } from '../ui/Reveal.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-500 ${solid ? 'bg-white/85 shadow-[0_1px_0_rgba(10,22,56,.06),0_10px_30px_-12px_rgba(10,22,56,.18)] backdrop-blur-xl' : 'bg-transparent'}`}>
        <nav className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`} aria-label="Main">
          <Logo dark={!solid} />
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${solid ? (isActive ? 'text-royal-700' : 'text-mist-600 hover:text-navy-900') : isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className={`absolute inset-0 -z-10 rounded-full ${solid ? 'bg-royal-50' : 'bg-white/10'}`} />
                      )}
                      {l.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <a href={site.phoneHref} className={`hidden items-center gap-2 text-sm font-medium lg:inline-flex ${solid ? 'text-mist-600 hover:text-royal-700' : 'text-white/80 hover:text-white'}`}>
              <Phone className="h-4 w-4" aria-hidden /> {site.phone}
            </a>
            <Button to="/submit-request" className="!px-5 !py-2.5 text-sm" arrow>Get Started</Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full md:hidden ${solid ? 'bg-mist-100 text-navy-900' : 'bg-white/10 text-white'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-x-0 bottom-0 top-[64px] overflow-y-auto bg-white px-4 pb-10 pt-6 md:hidden"
          >
            <ul className="space-y-1">
              {[...nav, { label: 'Submit a Request', to: '/submit-request' }].map((l, i) => (
                <motion.li key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.05, ease, duration: 0.5 }}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) => `flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold ${isActive ? 'bg-royal-50 text-royal-700' : 'text-navy-900'}`}
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 border-t border-mist-200 pt-6">
              <a href={site.phoneHref} className="flex items-center gap-3 rounded-2xl bg-mist-50 px-4 py-4 font-medium text-navy-900"><Phone className="h-5 w-5 text-royal-600" aria-hidden /> {site.phone}</a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl bg-mist-50 px-4 py-4 font-medium text-navy-900"><Mail className="h-5 w-5 text-royal-600" aria-hidden /> {site.email}</a>
              <Button to="/submit-request" className="mt-2 w-full" arrow>Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
