import { motion } from 'framer-motion';

export const ease = [0.22, 1, 0.36, 1];

/** Fade + slide-up when scrolled into view. */
export function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const M = motion[as];
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Staggered children container + item. */
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
export const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

export function Stagger({ className = '', children, as = 'div' }) {
  const M = motion[as];
  return (
    <M variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </M>
  );
}

/** Word-by-word masked text reveal. Pass plain strings; `accent` words render in serif italic. */
export function SplitText({ text, accent = [], className = '', delay = 0, animateOnMount = false }) {
  const words = text.split(' ');
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true } };
  return (
    <motion.span className={className} initial="hidden" {...trigger} variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-top" aria-hidden>
          <motion.span
            className={`inline-block ${accent.includes(w.replace(/[.,]/g, '')) ? 'accent text-royal-600' : ''}`}
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
