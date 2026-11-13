import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading.jsx';
import { Reveal, ease } from '../ui/Reveal.jsx';

const principles = [
  { k: 'Understand', t: 'We start by learning how your practice, clinic or hospital works today: your payers, your systems and the issues that cost you the most time.' },
  { k: 'Organize', t: 'We bring structure to the billing workflow with clear responsibilities, consistent checks and documented processes.' },
  { k: 'Follow through', t: 'Claims are tracked, denials are worked, and balances are followed up until they are resolved, not just submitted and forgotten.' },
  { k: 'Communicate', t: 'You get regular, readable updates and a direct line to our team. No black boxes.' },
];

export default function Approach() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 grid-bg-dark mask-fade" />
      <div aria-hidden className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-royal-600/20 blur-[140px] animate-drift-slow" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            dark
            align="left"
            eyebrow="Our Approach"
            title="Billing done thoughtfully, not mechanically."
            accent={['thoughtfully,']}
            intro="Every organization's billing is different. Our approach is built on four simple principles that guide how we work with each client."
            className="[&_.accent]:!text-royal-300"
          />
        </div>
        <ol className="space-y-4">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.k} delay={i * 0.08}>
              <div className="group relative flex gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-royal-400/40 hover:bg-white/[0.06] sm:p-8">
                <motion.span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-royal-300 to-royal-600"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.1 }}
                />
                <span className="font-serif text-5xl italic leading-none text-royal-300/80">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{p.k}</h3>
                  <p className="mt-2 leading-relaxed text-mist-300">{p.t}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
