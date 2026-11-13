// Bill Wise document mark, recreated from the brand logo as SVG.
// `ink` = document color, `accent` = folded-corner color, `cut` = speed-line cutouts.
export default function LogoMark({ className = '', ink = '#0B0B0F', accent = '#0A66D6', cut = '#FFFFFF', title }) {
  return (
    <svg viewBox="0 0 360 320" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {/* outside speed lines */}
      <g fill={ink}>
        <rect x="0" y="6" width="46" height="22" rx="11" />
        <rect x="18" y="58" width="64" height="22" rx="11" />
        <rect x="96" y="58" width="60" height="22" rx="11" />
        <rect x="64" y="96" width="90" height="22" rx="11" />
        <rect x="2" y="140" width="46" height="22" rx="11" />
        <rect x="62" y="140" width="90" height="22" rx="11" />
        <rect x="60" y="178" width="140" height="22" rx="11" />
      </g>
      {/* document body */}
      <path fill={ink} d="M150 4H330Q352 4 352 26V286L320 318H306Q272 318 266 284L262 258Q256 224 222 224H130V24Q130 4 150 4Z" />
      {/* folded corner */}
      <path fill={accent} d="M128 226H220Q248 228 252 264L256 292Q260 308 270 316Z" />
      {/* cutout lines inside the document */}
      <g fill={cut}>
        <rect x="174" y="34" width="134" height="22" rx="11" />
        <rect x="240" y="78" width="68" height="22" rx="11" />
        <rect x="172" y="120" width="112" height="22" rx="11" />
      </g>
    </svg>
  );
}
