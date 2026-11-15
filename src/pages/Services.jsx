import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import ServiceList from '../components/services/ServiceList.jsx';

export default function Services() {
  useSEO({ title: 'Medical Billing Services', path: '/services', description: 'Medical billing services for doctors, hospitals and clinics: claims submission, coding support, denial management, A/R follow-up, eligibility verification, payment posting, patient billing, reporting, credentialing, insurance enrollment and EFT/ERA enrollment.' });
  return (
    <PageTransition>
      <PageHero eyebrow="Our Services" title="What we offer." accent={['offer.']} intro="Billing and credentialing services for doctors, hospitals and clinics. Use one or combine several." />
      <div className="container-x py-16 sm:py-24">
        <ServiceList />
      </div>
    </PageTransition>
  );
}
