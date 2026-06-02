'use client';

import { LIFECYCLE, STATES, type State, stateIndex } from '@/lib/lifecycle-model';
import type { EyePattern } from './EyeBall';
import RiggedGlyph from './RiggedGlyph';

// LifecycleRail — the six lifecycle states drawn as a row of distinct eyes. Past + current are
// open (current breathes = "you are here"); future states are not-yet-opened. Same eye language
// as the rest of the portal.
export default function LifecycleRail({
  state,
  size = 26,
  showLabels = true,
}: {
  state: State;
  size?: number;
  showLabels?: boolean;
}) {
  const cur = stateIndex(state);
  return (
    <ol className="flex flex-wrap items-end gap-x-4 gap-y-2" aria-label={`lifecycle: ${state}`}>
      {STATES.map((s, i) => {
        const meta = LIFECYCLE[s];
        const seen = i <= cur;
        const isNow = i === cur;
        return (
          <li key={s} className="flex w-14 flex-col items-center gap-1.5 text-center">
            <RiggedGlyph
              pattern={meta.pattern as EyePattern}
              open={seen}
              size={isNow ? size + 6 : size}
              blink={seen}
              blinkDelay={i * 0.7}
              className={isNow ? 'eye-active' : undefined}
              style={{ opacity: i < cur ? 0.75 : 1 }}
            />
            {showLabels ? (
              <span
                className="handwritten text-xs"
                style={{
                  color: isNow ? 'var(--ink)' : 'var(--pencil)',
                  fontWeight: isNow ? 700 : 400,
                }}
              >
                {meta.label}
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
