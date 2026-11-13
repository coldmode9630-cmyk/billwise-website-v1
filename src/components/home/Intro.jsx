import { Stethoscope, Building2, HeartPulse, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../ui/Reveal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const audiences = [
  { icon: Stethoscope, title: 'Doctors & physician practices', text: 'Billing support that lets physicians and their staff stay focused on patients instead of paperwork.' },
  { icon: Building2, title: 'Hospitals', text: 'Dependable help with claims, follow-up and reconciliation alongside your existing revenue cycle team.' },
  { icon: HeartPulse, title: 'Clinics', text: 'Organized, consistent billing for clinics that want fewer surprises and clearer visibility.' },
];

export default function Intro() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Introducing Bill Wise LLC"
            title="Medical billing, handled with care and precision."
            accent={['care', 'precision.']}
            intro="Bill Wise LLC is a medical billing services company. We help doctors, hospitals and clinics keep claims moving, resolve billing issues, and understand where their revenue stands, so their teams can spend more time on patient care."
          />
          <Reveal delay={0.25}>
            <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-semibold text-royal-700">
              More about us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className="space-y-5">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <div className="group flex gap-5 rounded-3xl border border-mist-200 bg-gradient-to-br from-white to-mist-50 p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-royal-200 hover:shadow-lift">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white transition-colors duration-500 group-hover:bg-royal-600">
                  <a.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 leading-relaxed text-mist-500">{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
