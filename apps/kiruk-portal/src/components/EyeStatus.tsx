'use client';

import type { CSSProperties } from 'react';
import RiggedGlyph from './RiggedGlyph';

// EyeStatus — the eye as a status indicator. One eye, four moods, so loading / success /
// error / empty all read as the SAME watcher changing expression (not four icons).
// Reuses the rig contract: real glyph art from /public/eye, code drives the mood via CSS.

export type EyeMood = 'loading' | 'success' | 'error' | 'empty';

const MOOD: Record<EyeMood, { pattern: 'portal' | 'star' | 'solid'; open: boolean; cls: string }> =
  {
    loading: { pattern: 'portal', open: true, cls: 'eye-scan' }, // pupil sweeps — watching/working
    success: { pattern: 'star', open: true, cls: 'eye-pop' }, // sparkle pop
    error: { pattern: 'solid', open: false, cls: 'eye-shake' }, // shut + shake — won't look
    empty: { pattern: 'solid', open: false, cls: 'eye-doze' }, // sleeping — nothing here yet
  };

export default function EyeStatus({
  mood = 'loading',
  size = 34,
  label,
  className,
  style,
}: {
  mood?: EyeMood;
  size?: number;
  /** optional handwritten caption beside the eye */
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const m = MOOD[mood];
  return (
    <span
      className={`inline-flex items-center gap-2 ${className ?? ''}`.trim()}
      role="status"
      aria-live="polite"
      aria-label={label ?? mood}
      style={style}
    >
      <RiggedGlyph pattern={m.pattern} open={m.open} size={size} className={m.cls} />
      {label ? <span className="handwritten text-pencil text-sm">{label}</span> : null}
    </span>
  );
}
