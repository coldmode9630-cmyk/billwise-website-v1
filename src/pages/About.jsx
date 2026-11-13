import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Scale, MessagesSquare, Sparkles, Handshake, Check, Stethoscope, Building2, HeartPulse } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { Reveal, Stagger, item } from '../components/ui/Reveal.jsx';
import FinalCTA from '../components/home/FinalCTA.jsx';
import Process from '../components/home/Process.jsx';

const values = [
  { icon: ShieldCheck, title: 'Integrity', text: 'We are honest about what we see in your billing, including the uncomfortable parts.' },
  { icon: Target, title: 'Accuracy', text: 'Details matter in medical billing. We check our work and stand behind it.' },
  { icon: MessagesSquare, title: 'Transparency', text: 'Clear communication and readable reporting, so you’re never left guessing.' },
  { icon: Scale, title: 'Accountability', text: 'We take ownership of the work we agree to and follow it through.' },
  { icon: Sparkles, title: 'Continuous improvement', text: 'We look for patterns behind problems and help fix them at the source.' },
  { icon: Handshake, title: 'Partnership', text: 'We work as an extension of your team, respecting your workflows and priorities.' },
];

const reasons = [
  'Focused on medical billing for doctors, hospitals and clinics',
  'Support across the billing cycle, or targeted help where you need it',
  'Consistent follow-up on unpaid, underpaid and denied claims',
  'Plain-language updates and reporting',
  'A responsive team you can reach by email or phone',
  'Discretion with patient and practice information',
];

export default function About() {
  useSEO({ title: 'About Us', path: '/about', description: 'Learn about Bill Wise LLC: our mission, vision, values and approach to medical billing for doctors, hospitals and clinics.' });
  return (
    <PageTransition>
      <PageHero
        eyebrow="About Bill Wise LLC"
        title="Billing expertise that lets care come first."
        accent={['care']}
        intro="Bill Wise LLC is a medical billing services company supporting doctors, hospitals and clinics. We take on the detailed, time-consuming work of billing so healthcare teams can focus on their patients."
      />

      {/* Introduction */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Who we are" title="A dedicated partner for healthcare billing." accent={['dedicated']} />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-mist-500">
                <p>Healthcare billing is complex. Payer rules change, claims get rejected for small errors, and unpaid balances age quickly while teams are busy caring for patients.</p>
                <p>Bill Wise LLC exists to take that weight off your shoulders. We bring structure, persistence and clear communication to the billing process, whether you need full support or help with one specific challenge.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative">
              <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-royal-100 to-transparent" />
              <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[[Stethoscope, 'Doctors'], [Building2, 'Hospitals'], [HeartPulse, 'Clinics']].map(([I, l], i) => (
                  <motion.div key={l} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`flex flex-col items-start gap-6 rounded-3xl p-7 shadow-lift ${i === 1 ? 'bg-navy-900 text-white' : 'bg-white ring-1 ring-mist-200'}`}>
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 1 ? 'bg-royal-600 text-white' : 'bg-royal-50 text-royal-700'}`}><I className="h-6 w-6" aria-hidden /></span>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${i === 1 ? 'text-royal-200' : 'text-mist-400'}`}>We serve</p>
                      <p className={`mt-1 font-display text-2xl font-bold ${i === 1 ? 'text-white' : 'text-navy-900'}`}>{l}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-mist-50 py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            { icon: Target, k: 'Our Mission', t: 'To give doctors, hospitals and clinics accurate, dependable billing support that protects their revenue and frees their teams to focus on patient care.', dark: true },
            { icon: Eye, k: 'Our Vision', t: 'To be the billing partner healthcare organizations trust most for clarity, consistency and genuine care about getting things right.' },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 0.1}>
              <div className={`group relative h-full overflow-hidden rounded-[2rem] p-10 sm:p-12 ${b.dark ? 'bg-navy-900 text-white' : 'bg-white ring-1 ring-mist-200 shadow-soft'}`}>
                {b.dark && <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-royal-500/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />}
                <b.icon className={`relative h-8 w-8 ${b.dark ? 'text-royal-300' : 'text-royal-600'}`} aria-hidden />
                <h2 className={`relative mt-8 text-sm font-semibold uppercase tracking-[0.16em] ${b.dark ? 'text-royal-200' : 'text-royal-700'}`}>{b.k}</h2>
                <p className={`relative mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl ${b.dark ? 'text-white' : 'text-navy-900'}`}>{b.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Our Values" title="The principles behind our work." accent={['principles']} intro="These values shape how we handle every claim, every question and every client relationship." />
          <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <motion.div key={v.title} variants={item} className="group rounded-3xl border border-mist-200 bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal-50 text-royal-700 transition-colors duration-500 group-hover:bg-royal-600 group-hover:text-white"><v.icon className="h-5 w-5" aria-hidden /></span>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-mist-500">{v.text}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Approach */}
      <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div aria-hidden className="absolute inset-0 grid-bg-dark mask-fade" />
        <div aria-hidden className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-royal-600/25 blur-[130px] animate-drift" />
        <div className="container-x relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading dark align="left" eyebrow="Our Professional Approach" title="Structured, persistent and transparent." accent={['transparent.']} className="[&_.accent]:!text-royal-300"
            intro="We start by understanding your current billing workflow and where it breaks down. From there, we put clear processes in place, follow every claim through to resolution, and keep you informed along the way." />
          <div>
            <Reveal><h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-royal-200">Why clients work with us</h3></Reveal>
            <Stagger as="ul" className="mt-6 space-y-3">
              {reasons.map((r) => (
                <motion.li key={r} variants={item} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-royal-400/40 hover:bg-white/[0.07]">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-royal-600 text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /></span>
                  <span className="text-mist-200">{r}</span>
                </motion.li>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <Process />
      <FinalCTA />
    </PageTransition>
  );
}
