import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import ContactCards from '../components/ContactCards.jsx';
import ContactForm from '../components/form/ContactForm.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { site } from '../config/site.js';

export default function Contact() {
  useSEO({ title: 'Contact Us', path: '/contact', description: `Contact Billwise LLC. Email ${site.email}, call ${site.phone}, or request a call back.` });
  return (
    <PageTransition>
      <PageHero eyebrow="Contact Us" title="Let’s talk." accent={['talk.']} intro="Reach us directly, or leave your details and we’ll get in touch." />
      <section className="relative py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ContactCards />
          </aside>
          <Reveal delay={0.1}><ContactForm /></Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
