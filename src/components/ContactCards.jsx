import { Mail, Phone, Building, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { site } from '../config/site.js';
import { Stagger, item } from './ui/Reveal.jsx';

export default function ContactCards() {
  const cards = [
    { icon: Building, label: 'Company', value: site.name },
    { icon: Mail, label: 'Email us', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
    ...site.locations.map((loc) => ({
      icon: MapPin,
      label: `${loc.city} office`,
      value: loc.line,
      href: loc.mapHref,
      external: true,
    })),
  ];
  return (
    <Stagger className="grid gap-4">
      {cards.map((c) => {
        const Tag = c.href ? 'a' : 'div';
        return (
          <motion.div key={c.label} variants={item}>
            <Tag href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`group flex items-center gap-5 rounded-3xl border border-mist-200 bg-white p-6 shadow-soft transition-all duration-500 ${c.href ? 'hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift' : ''}`}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white transition-colors duration-500 group-hover:bg-royal-600"><c.icon className="h-6 w-6" aria-hidden /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-mist-400">{c.label}</p>
                <p className="mt-0.5 break-words font-display text-lg font-semibold text-navy-900 sm:text-xl">{c.value}</p>
              </div>
              {c.href && <ArrowUpRight className="h-5 w-5 shrink-0 text-mist-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal-600" aria-hidden />}
            </Tag>
          </motion.div>
        );
      })}
    </Stagger>
  );
}
