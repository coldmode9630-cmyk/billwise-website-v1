import { Target, Repeat2, LineChart, MessagesSquare, SlidersHorizontal, Lock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { Stagger, item } from '../ui/Reveal.jsx';
import { motion } from 'framer-motion';

const reasons = [
  { icon: Target, title: 'Accuracy first', text: 'We review details before claims go out, because getting it right the first time saves everyone time.', big: true },
  { icon: Repeat2, title: 'Persistent follow-up', text: 'Unpaid and denied claims get consistent attention instead of sitting in a queue.' },
  { icon: LineChart, title: 'Clear visibility', text: 'Straightforward reporting so you always know where things stand.' },
  { icon: MessagesSquare, title: 'Responsive communication', text: 'Questions get timely, plain-language answers from people who know your account.' },
  { icon: SlidersHorizontal, title: 'Flexible scope', text: 'End-to-end billing or targeted help. We fit around your existing team and workflow.' },
  { icon: Lock, title: 'Careful with information', text: 'We treat patient and practice information with discretion and agree secure ways to exchange records.', big: true },
];

export default function WhyChoose() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Bill Wise LLC"
          title="A billing partner you can rely on."
          accent={['rely', 'on.']}
          intro="Medical billing works best when it is accurate, consistent and transparent. That's the standard we hold ourselves to on every account."
        />
        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              variants={item}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                r.big ? 'bg-navy-900 text-white md:col-span-2 hover:shadow-lift' : 'border border-mist-200 bg-white shadow-soft hover:border-royal-200 hover:shadow-lift'
              } ${i === 5 ? 'md:col-span-3 md:grid md:grid-cols-[auto_1fr_1.4fr] md:items-center md:gap-8' : ''}`}
            >
              {r.big && <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-royal-500/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />}
              <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${r.big ? 'bg-white/10 text-royal-200 ring-1 ring-white/15' : 'bg-royal-50 text-royal-700'}`}>
                <r.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className={`relative mt-6 text-xl font-bold ${r.big ? 'text-white' : ''} ${i === 5 ? 'md:mt-0' : ''}`}>{r.title}</h3>
              <p className={`relative mt-3 max-w-md leading-relaxed ${i === 5 ? 'md:mt-0' : ''} ${r.big ? 'text-mist-300' : 'text-mist-500'}`}>{r.text}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
