import { useState, useCallback } from 'react';
import { Stagger, Reveal } from '../ui/Reveal.jsx';
import ServiceCard from './ServiceCard.jsx';
import ServiceModal from './ServiceModal.jsx';
import { services, serviceCategories } from '../../config/services.js';

/** Service cards grouped by category (see src/config/services.js). */
export default function ServiceGrid() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  return (
    <>
      <div className="space-y-16">
        {serviceCategories.map((cat) => {
          const list = services.filter((s) => s.category === cat.id);
          if (!list.length) return null;
          const cols = list.length % 4 === 0 ? 'xl:grid-cols-4' : '';
          return (
            <div key={cat.id}>
              <Reveal className="mb-7 flex flex-col gap-2 border-b border-mist-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-2xl font-bold">{cat.title}</h3>
                <p className="max-w-lg text-balance text-mist-500 sm:text-right">{cat.intro}</p>
              </Reveal>
              <Stagger className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${cols}`}>
                {list.map((s) => (
                  <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} onLearnMore={setActive} />
                ))}
              </Stagger>
            </div>
          );
        })}
      </div>
      <ServiceModal service={active} onClose={close} />
    </>
  );
}
