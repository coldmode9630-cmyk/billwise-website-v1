import { Link } from 'react-router-dom';
import LogoMark from './LogoMark.jsx';

/** Full Bill Wise LLC logo: mark + "BILL" (brand blue) "WISELLC" (ink). `dark` = for navy backgrounds. */
export default function Logo({ dark = false, className = '', onClick }) {
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Bill Wise LLC — home">
      <LogoMark
        className="h-8 w-auto transition-transform duration-500 group-hover:-translate-x-0.5 sm:h-9"
        ink={dark ? '#FFFFFF' : '#0B0B0F'}
        cut={dark ? '#081430' : '#FFFFFF'}
        accent={dark ? '#1F78E6' : '#0A66D6'}
      />
      <span className="font-display text-[1.32rem] font-extrabold leading-none tracking-[-0.02em] sm:text-[1.45rem]">
        <span className={dark ? 'text-royal-400' : 'text-royal-600'}>BILL</span>
        <span className={dark ? 'text-white' : 'text-[#0B0B0F]'}>WISELLC</span>
      </span>
    </Link>
  );
}
