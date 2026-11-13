import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../../lib/icons.js';
import { item } from '../ui/Reveal.jsx';

/** Interactive service card with cursor spotlight; calls onLearnMore(service). */
export default function ServiceCard({ service, index, onLearnMore }) {
  const ref = useRef(null);
  const Icon = getIcon(service.icon);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <motion.article
      id={service.slug}
      ref={ref}
      variants={item}
      onMouseMove={onMove}
      className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-royal-200 hover:shadow-lift"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(420px circle at var(--x,50%) var(--y,0%), rgba(10,102,214,.09), transparent 45%)' }} />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-royal-50 to-royal-100 text-royal-700 ring-1 ring-royal-100 transition-all duration-500 group-hover:from-royal-600 group-hover:to-royal-700 group-hover:text-white group-hover:shadow-glow">
          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="font-display text-sm font-semibold tabular-nums text-mist-300 transition-colors group-hover:text-royal-300">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className="relative mt-6 text-xl font-bold leading-snug">{service.title}</h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-mist-500">{service.summary}</p>
      <button
        type="button"
        onClick={() => onLearnMore(service)}
        className="relative mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-royal-700 after:absolute after:inset-0 after:content-['']"
        aria-label={`Learn more about ${service.title}`}
      >
        Learn more
        <span className="grid h-7 w-7 place-items-center rounded-full bg-royal-50 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-royal-600 group-hover:text-white">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>
    </motion.article>
  );
}
