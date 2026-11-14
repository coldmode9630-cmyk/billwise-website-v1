import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Stethoscope, Building2, HeartPulse } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { SplitText, ease } from '../ui/Reveal.jsx';
import HeroVisual from './HeroVisual.jsx';

export default function Hero() {
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 500], [1, 0.25]);
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-28">
      {/* animated background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg-dark mask-fade" />
        <div className="absolute -left-48 -top-48 h-[40rem] w-[40rem] rounded-full bg-royal-600/35 blur-[130px] animate-drift" />
        <div className="absolute right-[-12rem] top-1/4 h-[34rem] w-[34rem] rounded-full bg-royal-400/20 blur-[130px] animate-drift-slow" />
        <div className="absolute bottom-[-14rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[130px] animate-drift" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-950" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <motion.div style={{ opacity: fade }}>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.2 }} className="eyebrow-dark">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Billwise LLC · Medical Billing Services
          </motion.span>

          <h1 className="mt-7 text-[2.75rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]">
            <SplitText text="Smarter Billing." animateOnMount delay={0.3} />
            <br />
            <SplitText text="Better Business." accent={['Business']} animateOnMount delay={0.5} className="[&_.accent]:text-royal-300 [&_.accent]:pr-1" />
          </h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.85 }} className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-mist-300 sm:text-xl">
            Reliable billing solutions designed to simplify your operations, improve efficiency, and help your practice move forward, for doctors, hospitals and clinics.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/submit-request" arrow>Get Started</Button>
            <Button to="/contact" variant="ghostDark">Contact Us</Button>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-mist-300">
            {[[Stethoscope, 'Doctors'], [Building2, 'Hospitals'], [HeartPulse, 'Clinics']].map(([I, l]) => (
              <li key={l} className="flex items-center gap-2"><I className="h-4 w-4 text-royal-300" aria-hidden /> {l}</li>
            ))}
          </motion.ul>
        </motion.div>

        <HeroVisual />
      </div>
    </section>
  );
}
