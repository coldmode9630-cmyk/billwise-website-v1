import { services } from '../../config/services.js';

/** Slow scrolling ribbon of service names (pauses on hover). */
export default function Marquee() {
  const items = [...services, ...services];
  return (
    <div className="relative overflow-hidden border-y border-mist-200 bg-mist-50 py-5" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist-50 to-transparent" />
      <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-semibold text-mist-400">
            {s.title}
            <span className="h-1.5 w-1.5 rounded-full bg-royal-400" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
