/**
 * Hand-drawn style botanical line ornaments for the Ivory Garden theme.
 * Pure SVG (no external assets) so they stay crisp at any size.
 */

const STROKE = 'currentColor';

/** Eucalyptus / olive sprig — used as corner & side garlands. */
export function LeafBranch({ className = '', style }) {
  return (
    <svg viewBox="0 0 220 220" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M14 206C52 160 86 118 128 78C152 55 176 36 206 14"
        stroke={STROKE}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {[
        [40, 172, -38],
        [58, 150, 28],
        [74, 132, -42],
        [92, 112, 24],
        [110, 95, -46],
        [128, 78, 20],
        [146, 62, -50],
        [164, 48, 16],
        [182, 34, -54],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path
            d="M0 0C6 -11 18 -15 28 -12C22 -2 11 3 0 0Z"
            fill={STROKE}
            fillOpacity={i % 2 ? 0.16 : 0.1}
            stroke={STROKE}
            strokeWidth="0.9"
          />
          <path d="M0 0C9 -5 17 -9 27 -12" stroke={STROKE} strokeWidth="0.5" strokeOpacity="0.7" />
        </g>
      ))}
      {[
        [66, 160],
        [118, 104],
        [170, 56],
      ].map(([x, y], i) => (
        <g key={`b-${i}`}>
          <circle cx={x} cy={y} r="3.2" fill={STROKE} fillOpacity="0.35" />
          <circle cx={x + 7} cy={y + 4} r="2.2" fill={STROKE} fillOpacity="0.25" />
        </g>
      ))}
    </svg>
  );
}

/** Corner floral cluster (rose + leaves) for card / page corners. */
export function FloralCorner({ className = '', style }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M6 6C40 30 70 64 92 104" stroke={STROKE} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M6 6C34 14 70 18 112 16" stroke={STROKE} strokeWidth="1.1" strokeLinecap="round" />
      {/* Rose */}
      <g transform="translate(52 52)">
        <circle r="20" fill={STROKE} fillOpacity="0.08" stroke={STROKE} strokeWidth="0.9" />
        <path d="M-10 -2C-8 -12 6 -14 10 -4C14 6 2 12 -4 8C-10 4 -6 -4 0 -4C5 -4 5 2 1 3" stroke={STROKE} strokeWidth="0.9" strokeLinecap="round" />
        <path d="M-16 6C-12 16 4 20 14 12" stroke={STROKE} strokeWidth="0.8" strokeLinecap="round" />
        <path d="M-14 -10C-6 -20 10 -20 17 -9" stroke={STROKE} strokeWidth="0.8" strokeLinecap="round" />
      </g>
      {/* Leaves along horizontal stem */}
      {[
        [84, 17, -20],
        [100, 16, 22],
        [118, 15, -18],
      ].map(([x, y, r], i) => (
        <path
          key={`h-${i}`}
          transform={`translate(${x} ${y}) rotate(${r})`}
          d="M0 0C5 -9 15 -12 23 -9C18 -1 9 3 0 0Z"
          fill={STROKE}
          fillOpacity="0.12"
          stroke={STROKE}
          strokeWidth="0.8"
        />
      ))}
      {/* Leaves along diagonal stem */}
      {[
        [70, 78, 70],
        [80, 92, 100],
        [88, 104, 64],
      ].map(([x, y, r], i) => (
        <path
          key={`d-${i}`}
          transform={`translate(${x} ${y}) rotate(${r})`}
          d="M0 0C5 -9 15 -12 23 -9C18 -1 9 3 0 0Z"
          fill={STROKE}
          fillOpacity="0.12"
          stroke={STROKE}
          strokeWidth="0.8"
        />
      ))}
      <circle cx="132" cy="14" r="2.4" fill={STROKE} fillOpacity="0.4" />
      <circle cx="96" cy="118" r="2.4" fill={STROKE} fillOpacity="0.4" />
      <circle cx="26" cy="40" r="2" fill={STROKE} fillOpacity="0.35" />
    </svg>
  );
}

/** Small centered divider: leaf – diamond – leaf. */
export function LeafDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 180 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12H66" stroke={STROKE} strokeWidth="0.8" strokeOpacity="0.6" />
      <path d="M114 12H176" stroke={STROKE} strokeWidth="0.8" strokeOpacity="0.6" />
      <path d="M68 12C74 4 84 3 88 12C84 21 74 20 68 12Z" fill={STROKE} fillOpacity="0.14" stroke={STROKE} strokeWidth="0.8" />
      <path d="M112 12C106 4 96 3 92 12C96 21 106 20 112 12Z" fill={STROKE} fillOpacity="0.14" stroke={STROKE} strokeWidth="0.8" />
      <rect x="86.5" y="8.5" width="7" height="7" transform="rotate(45 90 12)" fill={STROKE} fillOpacity="0.55" />
    </svg>
  );
}

/** Circular laurel wreath — wraps monograms / initials. */
export function Wreath({ className = '' }) {
  const leaves = Array.from({ length: 22 });
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="78" stroke={STROKE} strokeWidth="0.8" strokeOpacity="0.55" />
      {leaves.map((_, i) => {
        const side = i < 11 ? -1 : 1;
        const idx = i % 11;
        const angle = side === -1 ? 200 - idx * 15 : -20 + idx * 15;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 78;
        const y = 100 + Math.sin(rad) * 78;
        const rot = angle + (side === -1 ? -60 : 60);
        return (
          <path
            key={i}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})`}
            d="M0 0C4 -7 12 -9 18 -7C14 -1 7 2 0 0Z"
            fill={STROKE}
            fillOpacity={idx % 2 ? 0.2 : 0.1}
            stroke={STROKE}
            strokeWidth="0.7"
          />
        );
      })}
    </svg>
  );
}

/** Hanging botanical garland that sways (top of hero / cover). */
export function HangingGarland({ className = '' }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" className={className} aria-hidden="true">
      <path d="M0 8C80 70 140 86 200 86C260 86 320 70 400 8" stroke={STROKE} strokeWidth="1" strokeLinecap="round" />
      {Array.from({ length: 15 }).map((_, i) => {
        const t = (i + 1) / 16;
        const x = t * 400;
        const y = 8 + Math.sin(t * Math.PI) * 78;
        const r = (t - 0.5) * 60 + (i % 2 ? 40 : -40);
        return (
          <path
            key={i}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(1)})`}
            d="M0 0C5 -9 15 -12 24 -9C18 -1 9 3 0 0Z"
            fill={STROKE}
            fillOpacity={i % 3 === 0 ? 0.22 : 0.12}
            stroke={STROKE}
            strokeWidth="0.8"
          />
        );
      })}
      {[100, 200, 300].map((x) => (
        <g key={x}>
          <path d={`M${x} ${x === 200 ? 86 : 72}V${x === 200 ? 112 : 96}`} stroke={STROKE} strokeWidth="0.7" strokeOpacity="0.6" />
          <circle cx={x} cy={x === 200 ? 114 : 98} r="3" fill={STROKE} fillOpacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

/** Monogram composed of the couple initials inside a wreath. */
export function Monogram({ left = 'A', right = 'B', className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Wreath className="absolute inset-0 h-full w-full text-[var(--ig-gold)]" />
      <div className="ig-serif relative flex items-baseline gap-1 text-[var(--ig-sage-700)]">
        <span className="text-[2.1em] font-light italic leading-none">{left}</span>
        <span className="ig-script text-[1.2em] text-[var(--ig-gold)]">&amp;</span>
        <span className="text-[2.1em] font-light italic leading-none">{right}</span>
      </div>
    </div>
  );
}

/** Section heading used across the theme. */
export function SectionHeading({ eyebrow, title, light = false, className = '' }) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className={`ig-eyebrow ${light ? '!text-[var(--ig-gold-soft)]' : ''}`}>{eyebrow}</p>
      )}
      {title && (
        <h2
          className={`ig-script mt-3 text-5xl leading-tight sm:text-6xl ${
            light ? 'text-[var(--ig-paper)]' : 'text-[var(--ig-sage-700)]'
          }`}
        >
          {title}
        </h2>
      )}
      <LeafDivider
        className={`mx-auto mt-4 h-5 w-40 ${light ? 'text-[var(--ig-gold-soft)]' : 'text-[var(--ig-gold)]'}`}
      />
    </div>
  );
}

/** Falling petals ambience (lightweight CSS animation). */
export function FallingPetals({ count = 10 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ig-petal"
          style={{
            left: `${(i * 97) % 100}%`,
            animationDuration: `${11 + (i % 5) * 2.5}s`,
            animationDelay: `${(i * 1.7) % 9}s`,
            transform: `scale(${0.7 + (i % 3) * 0.25})`,
          }}
        />
      ))}
    </div>
  );
}
