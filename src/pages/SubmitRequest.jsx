import { ClipboardCheck, PhoneCall, ShieldCheck } from 'lucide-react';
import useSEO from '../hooks/useSEO.js';
import PageTransition from '../components/layout/PageTransition.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import RequestForm from '../components/form/RequestForm.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { site } from '../config/site.js';

const next = [
  { icon: ClipboardCheck, t: 'We review your request', d: 'Our team reads every submission and the details you provide.' },
  { icon: PhoneCall, t: 'We contact you', d: 'We reach out by your preferred method to discuss next steps.' },
  { icon: ShieldCheck, t: 'We agree a secure process', d: 'If patient data is needed, we set up a secure way to share it.' },
];

export default function SubmitRequest() {
  useSEO({ title: 'Submit a Request', path: '/submit-request', description: 'Tell Billwise LLC about your medical billing requirements or concerns. Our team will review your submission and get back to you.' });
  return (
    <PageTransition>
      <PageHero eyebrow="Submit a Request" title="How Can We Help You?" accent={['Help']} intro="Tell us about your billing requirements or concerns. Our team will review your submission and get back to you." />
      <section className="relative -mt-10 pb-24 sm:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal y={40}><RequestForm compact /></Reveal>
          <aside className="space-y-5 lg:pt-14">
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
              <div className="rounded-3xl bg-navy-900 p-7 text-white">
                <h2 className="text-lg font-bold text-white">Prefer to talk?</h2>
                <p className="mt-2 text-sm text-mist-300">Reach our team directly.</p>
                <a href={`mailto:${site.email}`} className="mt-5 block break-words font-semibold text-royal-200 hover:text-white">{site.email}</a>
                <a href={site.phoneHref} className="mt-2 block font-semibold text-royal-200 hover:text-white">{site.phone}</a>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
