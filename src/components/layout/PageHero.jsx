import { motion } from 'framer-motion';
import { SplitText, ease } from '../ui/Reveal.jsx';

/** Dark gradient header used by inner pages. */
export default function PageHero({ eyebrow, title, accent = [], intro, children }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
      <div aria-hidden className="absolute inset-0 grid-bg-dark mask-fade" />
      <div aria-hidden className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-royal-600/30 blur-[120px] animate-drift" />
      <div aria-hidden className="absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-royal-400/20 blur-[120px] animate-drift-slow" />
      <div className="container-x relative">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow-dark">
          <span className="h-1.5 w-1.5 rounded-full bg-royal-300" />
          {eyebrow}
        </motion.span>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          <SplitText text={title} accent={accent} animateOnMount delay={0.1} className="[&_.accent]:text-royal-300" />
        </h1>
        {intro && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.45 }} className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-300">
            {intro}
          </motion.p>
        )}
        {children}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-royal-400/50 to-transparent" />
    </section>
  );
}
