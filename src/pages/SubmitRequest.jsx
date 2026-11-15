import { Link } from 'react-router-dom';
import { ClipboardCheck, PhoneCall, ShieldCheck } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import RequestForm from '../components/form/RequestForm.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';

const next = [
  { icon: ClipboardCheck, t: 'We review your details', d: 'Our billing team looks at your practice profile and the issue.' },
  { icon: PhoneCall, t: 'We contact you', d: 'We follow up to discuss scope and next steps.' },
  { icon: ShieldCheck, t: 'We set up secure sharing', d: 'If patient data is needed, we agree a secure method first.' },
];

export default function SubmitRequest() {
  useSEO({ title: 'Submit a Request', path: '/submit-request', description: 'Share your practice details and billing needs with Billwise LLC so our team can review them and follow up.' });
  return (
    <PageTransition>
      <PageHero eyebrow="Submit a Request" title="Tell us about your billing." accent={['billing.']} intro="Share your practice details and the billing issue you need help with, so our team can review it before we follow up." />
      <section className="relative py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal y={40}><RequestForm /></Reveal>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-mist-200 bg-white p-7 shadow-soft">
                <h2 className="text-lg font-bold">What happens next</h2>
                <ol className="mt-6 space-y-6">
                  {next.map((n, i) => (
                    <li key={n.t} className="relative flex gap-4">
                      {i < next.length - 1 && <span aria-hidden className="absolute left-5 top-11 h-[calc(100%-1rem)] w-px bg-mist-200" />}
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal-50 text-royal-700"><n.icon className="h-5 w-5" aria-hidden /></span>
                      <div>
                        <p className="font-semibold text-navy-900">{n.t}</p>
                        <p className="mt-1 text-sm leading-relaxed text-mist-500">{n.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="px-2 text-sm text-mist-500">
                Just want to talk first? <Link to="/contact" className="font-semibold text-royal-700 underline underline-offset-4">Request a call back</Link>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
