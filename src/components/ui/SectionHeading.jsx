import { Reveal, SplitText } from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, accent = [], intro, align = 'center', dark = false, className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal y={12}>
          <span className={dark ? 'eyebrow-dark' : 'eyebrow'}>
            <span className={`h-1.5 w-1.5 rounded-full ${dark ? 'bg-royal-300' : 'bg-royal-600'}`} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className={`mt-5 text-balance text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[3.1rem] ${dark ? 'text-white' : ''}`}>
        <SplitText text={title} accent={accent} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-pretty text-lg leading-relaxed ${dark ? 'text-mist-300' : 'text-mist-500'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
