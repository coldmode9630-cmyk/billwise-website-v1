import PageTransition from './PageTransition.jsx';
import PageHero from './PageHero.jsx';
import { Reveal } from '../ui/Reveal.jsx';

export default function LegalLayout({ title, accent, intro, updated, children }) {
  return (
    <PageTransition>
      <PageHero eyebrow="Legal" title={title} accent={accent} intro={intro} />
      <section className="py-20 sm:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl">
            <p className="inline-flex rounded-full bg-mist-100 px-4 py-1.5 text-sm font-medium text-mist-600">Last updated: {updated}</p>
            <article className="prose-legal mt-4">{children}</article>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
