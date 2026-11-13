import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { Reveal, ease } from '../ui/Reveal.jsx';
import { faqs } from '../../config/faqs.js';
import Button from '../ui/Button.jsx';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-mist-50 py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading align="left" eyebrow="FAQ" title="Questions, answered." accent={['answered.']} intro="Can't find what you're looking for? Our team is happy to help." />
          <Reveal delay={0.2} className="mt-8"><Button to="/contact" variant="light" arrow>Ask us directly</Button></Reveal>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${isOpen ? 'border-royal-200 shadow-lift' : 'border-mist-200 shadow-soft'}`}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-lg font-semibold text-navy-900"
                    >
                      {f.q}
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-royal-600 text-white' : 'bg-mist-100 text-navy-900'}`}>
                        <Plus className="h-4 w-4" aria-hidden />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                      >
                        <p className="px-6 pb-6 leading-relaxed text-mist-500">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
