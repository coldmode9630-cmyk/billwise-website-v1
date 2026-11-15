import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import { Reveal, Stagger, item } from '../ui/Reveal.jsx';
import { getIcon } from '../../lib/icons.js';
import { services } from '../../config/services.js';

/** Compact list of services on Home; full descriptions live on the Services page. */
export default function ServicesOverview() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      <div className="container-x relative">
        <SectionHeading eyebrow="Our Services" title="Everything your billing needs, in one place." accent={['one', 'place.']} />
        <Stagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <motion.div key={s.slug} variants={item}>
                <Link to={`/services#${s.slug}`} className="group flex items-center gap-4 rounded-2xl border border-mist-200 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-royal-200 hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-700 transition-colors group-hover:bg-royal-600 group-hover:text-white"><Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden /></span>
                  <span className="flex-1 font-semibold text-navy-900">{s.title}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-mist-300 transition-colors group-hover:text-royal-600" aria-hidden />
                </Link>
              </motion.div>
            );
          })}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button to="/services" variant="dark" arrow>View service details</Button>
        </Reveal>
      </div>
    </section>
  );
}
