import { motion } from 'framer-motion';
import { Send, PhoneCall, Settings2, RefreshCcw } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { Reveal, ease } from '../ui/Reveal.jsx';

const steps = [
  { icon: Send, title: 'Submit a request', text: 'Tell us about your organization and your billing needs or concerns using our online form.' },
  { icon: PhoneCall, title: 'Review & consultation', text: 'Our team reviews your submission and contacts you to understand the details and answer questions.' },
  { icon: Settings2, title: 'Onboarding & setup', text: 'We agree on scope, access and secure communication, and set up a workflow that fits your team.' },
  { icon: RefreshCcw, title: 'Ongoing support', text: 'We handle the agreed billing work day to day and keep you informed with regular updates.' },
];

export default function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="How It Works" title="A simple path to getting started." accent={['simple']} intro="Four clear steps from first contact to ongoing billing support." />
        <div className="relative mt-20">
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-mist-200 lg:block" />
          <motion.div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px origin-left bg-gradient-to-r from-royal-600 via-royal-400 to-royal-600 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease }}
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={0.2 + i * 0.15} className="group relative text-center">
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-royal-700 shadow-lift ring-1 ring-mist-200 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-royal-600 group-hover:text-white">
                  <s.icon className="h-6 w-6" aria-hidden />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy-900 text-[11px] font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs leading-relaxed text-mist-500">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
