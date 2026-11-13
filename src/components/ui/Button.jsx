import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const styles = {
  primary:
    'bg-royal-600 text-white shadow-glow hover:bg-royal-700 hover:shadow-[0_0_0_1px_rgba(10,102,214,.2),0_18px_44px_-10px_rgba(10,102,214,.6)]',
  dark: 'bg-navy-900 text-white shadow-soft hover:bg-navy-800',
  light: 'bg-white text-navy-900 shadow-soft ring-1 ring-mist-200 hover:ring-royal-200 hover:text-royal-700',
  ghostDark: 'bg-white/5 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/10 hover:ring-white/40',
};

/** Button that renders a router Link, external <a>, or <button>. */
export default function Button({ to, href, variant = 'primary', arrow = false, className = '', children, ...rest }) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="relative inline-flex items-center gap-2">
        {children}
        {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}
