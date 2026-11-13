import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { getIcon } from '../../lib/icons.js';
import Button from '../ui/Button.jsx';
import { ease } from '../ui/Reveal.jsx';

export default function ServiceModal({ service, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!service) return;
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [service, onClose]);

  const Icon = service ? getIcon(service.icon) : null;
  return (
    <AnimatePresence>
      {service && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="svc-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-4xl bg-white p-7 shadow-lift sm:rounded-4xl sm:p-9"
          >
            <button ref={closeRef} onClick={onClose} className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-mist-100 text-navy-900 hover:bg-mist-200" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-royal-600 text-white shadow-glow"><Icon className="h-6 w-6" aria-hidden /></span>
            <h3 id="svc-title" className="mt-6 pr-10 text-2xl font-bold">{service.title}</h3>
            <p className="mt-3 leading-relaxed text-mist-500">{service.summary}</p>
            <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.14em] text-mist-400">What this includes</h4>
            <ul className="mt-4 space-y-3">
              {service.details.map((d, i) => (
                <motion.li key={d} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06, ease, duration: 0.5 }} className="flex gap-3 text-navy-900">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-royal-50 text-royal-700"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>
                  {d}
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={`/submit-request?service=${service.slug}`} arrow onClick={onClose}>Request this service</Button>
              <Button to="/contact" variant="light" onClick={onClose}>Talk to our team</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
