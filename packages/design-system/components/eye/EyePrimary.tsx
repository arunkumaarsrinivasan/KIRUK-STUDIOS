/**
 * EyePrimary — Kiruk Studio primary eye-mark.
 *
 * spec-link: openspec/specs/brand-system/spec.md#requirement-primary-eye-mark
 *
 * Full circular eye: sclera → iris → pupil → highlight.
 * All fills use CSS custom properties from design-system/build/css/tokens.css.
 * Import that stylesheet (or the Tailwind build) in your app root.
 */
import * as React from 'react';

export interface EyePrimaryProps extends React.SVGProps<SVGSVGElement> {
  /** Diameter in pixels. Default 160. */
  size?: number;
  /** Accessible label. Default "Kiruk eye mark". */
  label?: string;
}

export function EyePrimary({ size = 160, label = 'Kiruk eye mark', ...props }: EyePrimaryProps) {
  const r = size / 2;
  const irisR = r * 0.5;
  const pupilR = r * 0.2;
  const highlightR = r * 0.075;
  const highlightOffset = r * 0.1;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      {...props}
    >
      {/* Sclera */}
      <circle
        cx={r}
        cy={r}
        r={r}
        fill="var(--color-paper, #EFEADF)"
      />
      {/* Iris */}
      <circle
        cx={r}
        cy={r}
        r={irisR}
        fill="var(--color-iris-core, #FF4D2E)"
      />
      {/* Pupil */}
      <circle
        cx={r}
        cy={r}
        r={pupilR}
        fill="var(--color-void, #0A0A0B)"
      />
      {/* Highlight */}
      <circle
        cx={r + highlightOffset}
        cy={r - highlightOffset}
        r={highlightR}
        fill="var(--color-scribble-ink, #F5F3EE)"
        opacity={0.9}
      />
    </svg>
  );
}

export default EyePrimary;
