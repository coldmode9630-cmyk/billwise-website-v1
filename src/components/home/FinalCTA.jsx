import { Mail, Phone } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { Reveal, SplitText } from '../ui/Reveal.jsx';
import LogoMark from '../ui/LogoMark.jsx';
import { site } from '../../config/site.js';

export default function FinalCTA() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-royal-600 via-royal-700 to-navy-900 bg-[length:200%_200%] px-6 py-16 text-center shadow-lift animate-gradient sm:px-16 sm:py-24">
            <div aria-hidden className="absolute inset-0 -z-10 grid-bg-dark opacity-70 mask-fade" />
            <LogoMark aria-hidden className="absolute -right-10 -top-6 -z-10 h-64 w-auto opacity-[0.08] animate-float" ink="#fff" cut="transparent" accent="#fff" />
            <LogoMark aria-hidden className="absolute -bottom-16 -left-10 -z-10 h-56 w-auto rotate-12 opacity-[0.06]" ink="#fff" cut="transparent" accent="#fff" />
            <h2 className="mx-auto max-w-3xl text-balance text-3xl font-bold leading-tight text-white sm:text-5xl">
              <SplitText text="Ready for billing that just works?" accent={['just', 'works?']} className="[&_.accent]:!text-royal-100" />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-royal-100/90">
              Tell us what's going on with your billing. Our team will review your request and get back to you.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/submit-request" variant="light" arrow>Submit a Request</Button>
              <Button to="/contact" variant="ghostDark">Contact Us</Button>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-royal-100 sm:flex-row sm:gap-8">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" aria-hidden />{site.email}</a>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" aria-hidden />{site.phone}</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
