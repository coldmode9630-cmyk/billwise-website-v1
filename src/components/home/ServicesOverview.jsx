import SectionHeading from '../ui/SectionHeading.jsx';
import ServiceGrid from '../services/ServiceGrid.jsx';
import Button from '../ui/Button.jsx';
import { Reveal } from '../ui/Reveal.jsx';

export default function ServicesOverview() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 grid-bg [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything your billing needs, in one place."
          accent={['one', 'place.']}
          intro="From credentialing and payer enrollment to the first claim and the final payment, we support each stage of the medical billing cycle. Choose end-to-end support or just the pieces you need."
        />
        <div className="mt-16"><ServiceGrid /></div>
        <Reveal className="mt-12 flex justify-center">
          <Button to="/services" variant="dark" arrow>Explore all services</Button>
        </Reveal>
      </div>
    </section>
  );
}
