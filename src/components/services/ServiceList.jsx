import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Stagger, Reveal, item } from '../ui/Reveal.jsx';
import { getIcon } from '../../lib/icons.js';
import { services, serviceCategories } from '../../config/services.js';

/** Every service with its description and what it includes, grouped by category (see src/config/services.js). */
export default function ServiceList() {
  return (
    <div className="space-y-16">
      {serviceCategories.map((cat) => {
        const list = services.filter((s) => s.category === cat.id);
        if (!list.length) return null;
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            <Reveal className="mb-7 border-b border-mist-200 pb-4">
              <h2 id={`cat-${cat.id}`} className="text-2xl font-bold sm:text-3xl">{cat.title}</h2>
            </Reveal>
            <Stagger className="grid gap-5 md:grid-cols-2">
              {list.map((s) => {
                const Icon = getIcon(s.icon);
                return (
                  <motion.article key={s.slug} id={s.slug} variants={item} className="flex scroll-mt-28 flex-col rounded-3xl border border-mist-200 bg-white p-6 shadow-soft sm:p-8">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-royal-50 text-royal-700 ring-1 ring-royal-100">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                    </div>
                    <p className="mt-4 leading-relaxed text-mist-600">{s.summary}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {s.details.map((d) => (
                        <li key={d} className="flex gap-3 text-sm text-navy-900">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-royal-50 text-royal-700"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    <Link to={`/submit-request?service=${s.slug}`} className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-royal-700">
                      Request this service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </motion.article>
                );
              })}
            </Stagger>
          </section>
        );
      })}
    </div>
  );
}
