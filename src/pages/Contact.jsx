import { Clock3, ShieldAlert } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import ContactCards from '../components/ContactCards.jsx';
import RequestForm from '../components/form/RequestForm.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { site } from '../config/site.js';

export default function Contact() {
  useSEO({ title: 'Contact Us', path: '/contact', description: `Contact Billwise LLC about medical billing services. Email ${site.email} or call ${site.phone}.` });
  return (
    <PageTransition>
      <PageHero eyebrow="Contact Us" title="Let’s talk about your billing." accent={['billing.']} intro="Reach our team directly by email or phone, or send us the details of your billing needs using the form below.">
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={`mailto:${site.email}`} arrow>Email {site.email}</Button>
          <Button href={site.phoneHref} variant="ghostDark">Call {site.phone}</Button>
        </div>
      </PageHero>
      <section className="relative py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="text-3xl font-bold">Get in touch</h2>
              <p className="mt-3 text-lg text-mist-500">We’re here to help doctors, hospitals and clinics with their billing questions.</p>
            </Reveal>
            <ContactCards />
            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-mist-50 p-6 ring-1 ring-mist-200">
                <div className="flex gap-3">
                  <Clock3 className="h-5 w-5 shrink-0 text-royal-600" aria-hidden />
                  <p className="text-sm leading-relaxed text-mist-600">Every request is reviewed by our team, and we’ll reply using your preferred contact method.</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />
                  <p className="text-sm leading-relaxed text-mist-600">Please don’t send patient health information by email or through this website. We’ll arrange a secure method when needed.</p>
                </div>
              </div>
            </Reveal>
          </aside>
          <Reveal delay={0.1}><RequestForm /></Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
