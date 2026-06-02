'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { transitionAction } from '@/app/universes/actions';
import {
  type FixKind,
  LIFECYCLE,
  nextState,
  precondition,
  type State,
} from '@/lib/lifecycle-model';
import RiggedGlyph from './RiggedGlyph';

const FIX_LABEL: Record<FixKind, string> = {
  proposal: 'go scribble the proposal',
  contract: 'go draft the contract',
  spec: 'run /kiruk-spec to create spec.md',
  handoff: 'go write the handoff',
};

// TransitionControls — advance to the next state, recording a one-line why. Blocks the move when
// its precondition (scribble / contract / spec / handoff) isn't met and points to the fix.
export default function TransitionControls({
  slug,
  state,
  scribbleCount,
  artifacts,
}: {
  slug: string;
  state: State;
  scribbleCount: number;
  artifacts: Record<string, boolean>;
}) {
  const nx = nextState(state);
  const [why, setWhy] = useState('');
  const [pending, start] = useTransition();

  if (!nx) {
    return (
      <p className="handwritten text-pencil text-base">
        archived — the flow is complete. handoff done.
      </p>
    );
  }

  const meta = LIFECYCLE[nx];
  const gate = precondition(state, nx, { scribbleCount, artifacts });
  const fixHref =
    gate.fix === 'proposal'
      ? `/universes/${slug}/proposal`
      : gate.fix === 'contract'
        ? `/universes/${slug}/contract`
        : gate.fix === 'handoff'
          ? `/universes/${slug}/handoff`
          : null;

  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="handwritten text-pencil text-sm">why this move? (one line, logged)</span>
        <input
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          placeholder={`e.g. ${meta.blurb}`}
          className="sketch-border handwritten text-ink w-full px-4 py-2.5 text-base outline-none"
        />
      </label>
      <button
        type="button"
        disabled={pending || !gate.ok}
        onClick={() =>
          start(async () => {
            await transitionAction(slug, nx, why.trim() || meta.blurb);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label={`advance to ${meta.label}`}
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'moving…' : `advance to ${meta.label}`}
        </span>
        <RiggedGlyph pattern={meta.pattern as 'portal'} look="right" size={28} />
      </button>
      {!gate.ok ? (
        <div className="flex flex-col gap-1">
          <p className="handwritten text-pencil text-sm">✕ {gate.message}</p>
          {fixHref ? (
            <Link
              href={fixHref}
              className="handwritten text-ink text-sm underline underline-offset-2"
            >
              {gate.fix ? FIX_LABEL[gate.fix] : ''} →
            </Link>
          ) : (
            <p className="handwritten text-pencil text-xs">{gate.fix ? FIX_LABEL[gate.fix] : ''}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
