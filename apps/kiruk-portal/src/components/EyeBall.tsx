'use client';

import { type CSSProperties, useId } from 'react';

// Round eyeball — the universal UI atom, but NOT one repeated eye. Each instance picks a
// distinct iris `pattern`, so every step / control reads as its own eye. Static (no rAF).
// `look` aims the iris; `irisColor` lets chrome carry the live emotional read.

export type EyePattern =
  | 'solid' // plain pupil
  | 'ring' // iris ring + dot
  | 'slit' // cat / vertical slit
  | 'portal' // concentric rings (vision)
  | 'hatch' // cross-hatch (scribble)
  | 'star' // sparkle pupil
  | 'constellation' // dot cluster
  | 'arrow'; // directional — for next/back

function Pattern({ p, cx, cy, look }: { p: EyePattern; cx: number; cy: number; look: string }) {
  const ink = 'var(--ink, #0a0a0a)';
  switch (p) {
    case 'ring':
      return (
        <>
          <circle cx={cx} cy={cy} r={3.4} fill="none" stroke={ink} strokeWidth={1.3} />
          <circle className="eye-pupil" cx={cx} cy={cy} r={1.3} fill={ink} />
        </>
      );
    case 'slit':
      return <ellipse className="eye-pupil" cx={cx} cy={cy} rx={1.1} ry={3.8} fill={ink} />;
    case 'portal':
      return (
        <>
          <circle cx={cx} cy={cy} r={4.2} fill="none" stroke={ink} strokeWidth={1} />
          <circle cx={cx} cy={cy} r={2.6} fill="none" stroke={ink} strokeWidth={1} />
          <circle className="eye-pupil" cx={cx} cy={cy} r={1.1} fill={ink} />
        </>
      );
    case 'hatch':
      return (
        <>
          <g stroke={ink} strokeWidth={0.7}>
            <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
            <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy + 6} />
            <line x1={cx + 4} y1={cy - 4} x2={cx - 4} y2={cy + 4} />
          </g>
          <circle className="eye-pupil" cx={cx} cy={cy} r={1.8} fill={ink} />
        </>
      );
    case 'star':
      return (
        <path
          className="eye-pupil"
          d={`M${cx} ${cy - 3} L${cx + 0.9} ${cy - 0.9} L${cx + 3} ${cy} L${cx + 0.9} ${cy + 0.9} L${cx} ${cy + 3} L${cx - 0.9} ${cy + 0.9} L${cx - 3} ${cy} L${cx - 0.9} ${cy - 0.9} Z`}
          fill={ink}
        />
      );
    case 'constellation':
      return (
        <>
          <circle className="eye-pupil" cx={cx} cy={cy} r={1.4} fill={ink} />
          <circle cx={cx - 3} cy={cy - 2} r={0.6} fill={ink} />
          <circle cx={cx + 3} cy={cy - 1} r={0.5} fill={ink} />
          <circle cx={cx + 1} cy={cy + 3} r={0.5} fill={ink} />
        </>
      );
    case 'arrow': {
      const d =
        look === 'left'
          ? `M${cx + 1.6} ${cy - 2.6} L${cx - 2.4} ${cy} L${cx + 1.6} ${cy + 2.6} Z`
          : `M${cx - 1.6} ${cy - 2.6} L${cx + 2.4} ${cy} L${cx - 1.6} ${cy + 2.6} Z`;
      return <path className="eye-pupil" d={d} fill={ink} />;
    }
    default:
      return <circle className="eye-pupil" cx={cx} cy={cy} r={2.6} fill={ink} />;
  }
}

export default function EyeBall({
  pattern = 'solid',
  look = 'center',
  irisColor = 'var(--ink, #0a0a0a)',
  open = true,
  size = 28,
  blink = false,
  blinkDelay = 0,
  className,
  style,
}: {
  pattern?: EyePattern;
  look?: 'left' | 'center' | 'right';
  irisColor?: string;
  open?: boolean;
  size?: number;
  /** idle blink (CSS-driven, no rAF). Stagger instances with blinkDelay. */
  blink?: boolean;
  blinkDelay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const id = useId().replace(/[:]/g, '');
  const cx = look === 'left' ? 9.5 : look === 'right' ? 14.5 : 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {open ? (
        <>
          <clipPath id={`eb-${id}`}>
            <circle cx="12" cy="12" r="11" />
          </clipPath>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="var(--paper, #fff)"
            stroke="var(--ink, #0a0a0a)"
            strokeWidth="1.5"
          />
          <g clipPath={`url(#eb-${id})`}>
            {/* iris group — blink = squash on this group (default scaleY(1) = open, never blanks) */}
            <g
              className={blink ? 'eye-blinker' : undefined}
              style={blink ? { animationDelay: `${blinkDelay}s` } : undefined}
            >
              <circle cx={cx} cy="12" r="6" fill={irisColor} />
              <Pattern p={pattern} cx={cx} cy={12} look={look} />
              <circle cx={cx + 1.6} cy="9.8" r="0.9" fill="var(--paper, #fff)" opacity="0.9" />
              <circle
                cx={cx}
                cy="12"
                r="6"
                fill="none"
                stroke="var(--ink, #0a0a0a)"
                strokeWidth="1"
              />
            </g>
          </g>
        </>
      ) : (
        <>
          <circle
            cx="12"
            cy="12"
            r="11"
            fill="var(--paper, #fff)"
            stroke="var(--ink, #0a0a0a)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M5 12 Q12 16 19 12"
            fill="none"
            stroke="var(--ink, #0a0a0a)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
