import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, MessagesSquare, Handshake } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { Reveal, Stagger, item } from '../components/ui/Reveal.jsx';
import { team } from '../config/team.js';

const values = [
  { icon: ShieldCheck, title: 'Integrity', text: 'Honest about what we find, including the uncomfortable parts.' },
  { icon: Target, title: 'Accuracy', text: 'We check our work and stand behind it.' },
  { icon: MessagesSquare, title: 'Transparency', text: 'Clear updates, so you’re never left guessing.' },
  { icon: Handshake, title: 'Partnership', text: 'We work as an extension of your team.' },
];

const initials = (name) => name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase();

export default function About() {
  useSEO({ title: 'About Us', path: '/about', description: 'Meet Billwise LLC: the team, mission and values behind our medical billing services for doctors, hospitals and clinics.' });
  return (
    <PageTransition>
      <PageHero eyebrow="About Billwise LLC" title="The team behind your billing." accent={['team']} />

      {/* Who we are */}
      <section className="py-20 sm:py-28">
        <div className="container-x max-w-3xl">
          <SectionHeading align="left" eyebrow="Who we are" title="Billing specialists for healthcare." accent={['healthcare.']} />
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-mist-600">
              <p>Billwise LLC is a team of medical billing and credentialing specialists with offices in Tigard, Oregon and Boulder, Colorado. We work with doctors, hospitals and clinics.</p>
              <p>We take on the detailed work of claims, follow-up and payer enrollment so your staff can stay focused on patients.</p>
            </div>
          </Reveal>
        </div>

        {team.length > 0 && (
          <div className="container-x mt-16">
            <Reveal><h2 className="text-2xl font-bold sm:text-3xl">Meet the team</h2></Reveal>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <motion.div key={m.name} variants={item} className="rounded-3xl border border-mist-200 bg-white p-7 shadow-soft">
                  {m.photo ? (
                    <img src={m.photo} alt="" loading="lazy" className="h-20 w-20 rounded-2xl object-cover" />
                  ) : (
                    <span aria-hidden className="grid h-20 w-20 place-items-center rounded-2xl bg-navy-900 font-display text-2xl font-bold text-white">{initials(m.name)}</span>
                  )}
                  <h3 className="mt-5 text-xl font-bold">{m.name}</h3>
                  <p className="text-sm font-semibold text-royal-700">{m.role}</p>
                  {m.bio && <p className="mt-3 leading-relaxed text-mist-500">{m.bio}</p>}
                </motion.div>
              ))}
            </Stagger>
          </div>
        )}
      </section>

      {/* Mission & vision */}
      <section className="bg-mist-50 py-20 sm:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            { icon: Target, k: 'Our Mission', t: 'Accurate, dependable billing that protects our clients’ revenue and frees their teams to focus on patients.', dark: true },
            { icon: Eye, k: 'Our Vision', t: 'To be the billing partner healthcare organizations trust most.' },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 0.1}>
              <div className={`relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-12 ${b.dark ? 'bg-navy-900 text-white' : 'bg-white ring-1 ring-mist-200 shadow-soft'}`}>
                {b.dark && <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-royal-500/30 blur-3xl" />}
                <b.icon className={`relative h-8 w-8 ${b.dark ? 'text-royal-300' : 'text-royal-600'}`} aria-hidden />
                <h2 className={`relative mt-6 text-sm font-semibold uppercase tracking-[0.16em] ${b.dark ? 'text-royal-200' : 'text-royal-700'}`}>{b.k}</h2>
                <p className={`relative mt-3 font-display text-2xl font-semibold leading-snug ${b.dark ? 'text-white' : 'text-navy-900'}`}>{b.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our Values" title="How we work." accent={['work.']} />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <motion.div key={v.title} variants={item} className="rounded-3xl border border-mist-200 bg-white p-7 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-royal-50 text-royal-700"><v.icon className="h-5 w-5" aria-hidden /></span>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-1.5 leading-relaxed text-mist-500">{v.text}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>
    </PageTransition>
  );
}
