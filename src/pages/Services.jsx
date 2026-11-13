import { Stethoscope, Building2, HeartPulse } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import ServiceGrid from '../components/services/ServiceGrid.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import FAQ from '../components/home/FAQ.jsx';
import FinalCTA from '../components/home/FinalCTA.jsx';

export default function Services() {
  useSEO({ title: 'Medical Billing Services', path: '/services', description: 'Medical billing services for doctors, hospitals and clinics: claims submission, coding support, denial management, A/R follow-up, eligibility verification, payment posting, reporting, credentialing, insurance enrollment and EFT/ERA enrollment.' });
  return (
    <PageTransition>
      <PageHero
        eyebrow="Our Services"
        title="Medical billing services, end to end."
        accent={['end', 'to', 'end.']}
        intro="From provider credentialing and payer enrollment to claims, payments and follow-up, for doctors, hospitals and clinics. Choose comprehensive support or the specific services you need."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          {[[Stethoscope, 'Doctors & physician practices'], [Building2, 'Hospitals'], [HeartPulse, 'Clinics']].map(([I, l]) => (
            <span key={l} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-mist-200 ring-1 ring-white/10"><I className="h-4 w-4 text-royal-300" aria-hidden />{l}</span>
          ))}
        </div>
      </PageHero>

      <section className="py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What we do" title="Choose the support you need." accent={['you', 'need.']} intro="Select any service to see what it includes, or request it directly." />
          <div className="mt-14"><ServiceGrid /></div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-mist-200 bg-gradient-to-br from-mist-50 to-white p-8 shadow-soft sm:p-12 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold sm:text-3xl">Not sure which service fits?</h2>
                <p className="mt-3 text-lg text-mist-500">Describe your billing situation and we’ll recommend the right combination of services for your organization.</p>
              </div>
              <Button to="/submit-request" arrow className="shrink-0">Submit a Request</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </PageTransition>
  );
}
