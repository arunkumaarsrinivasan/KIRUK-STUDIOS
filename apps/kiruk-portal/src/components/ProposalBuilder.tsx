'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { addTextualScribbleAction, saveProposalAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';
import ScribbleCanvas from './ScribbleCanvas';

// ProposalBuilder — "a proposal you don't write, you scribble." Sketch the pitch on the canvas;
// the PNG is the artifact. The three lines only frame it. Save → writes proposal.md + the scribble,
// moves the universe to `proposal`.
export default function ProposalBuilder({ slug }: { slug: string }) {
  const router = useRouter();
  const [scribble, setScribble] = useState<string | null>(null);
  const [goal, setGoal] = useState('');
  const [scope, setScope] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const field = (label: string, v: string, set: (s: string) => void, pattern: string) => (
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={pattern as 'ring'} size={20} />
        {label}
      </span>
      <textarea
        rows={2}
        value={v}
        onChange={(e) => set(e.target.value)}
        className="sketch-border handwritten text-ink w-full resize-none px-4 py-2 text-lg outline-none"
      />
    </label>
  );

  const save = () =>
    start(async () => {
      setError(null);
      const r = await saveProposalAction(slug, { scribble, goal, scope, deliverables });
      if (r?.error) setError(r.error);
      // success → server action redirects to the cockpit
    });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <p className="handwritten text-pencil text-sm">
          sketch the pitch — this drawing IS the proposal
        </p>
        <div className="sketch-border h-80 overflow-hidden">
          <ScribbleCanvas heightClass="h-full" onCapture={setScribble} />
        </div>
        <p
          className="handwritten text-xs"
          style={{ color: scribble ? 'var(--ink)' : 'var(--pencil)' }}
        >
          {scribble ? '✓ scribble captured' : 'draw something, then it captures on pen-up'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {field('goal — one line', goal, setGoal, 'portal')}
        {field('scope', scope, setScope, 'slit')}
        {field('deliverables', deliverables, setDeliverables, 'star')}

        {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={save}
            className="eye-btn eye-next gap-3 px-6 py-3 disabled:opacity-40"
            aria-label="save scribble proposal"
          >
            <span className="handwritten text-ink text-lg">
              {pending ? 'saving…' : 'save the scribble proposal'}
            </span>
            <RiggedGlyph pattern="portal" look="right" size={28} />
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              start(async () => {
                await addTextualScribbleAction(slug, 'textual proposal scribble (no tablet)');
                router.refresh();
              })
            }
            className="dashed handwritten text-ink rounded-xl px-4 py-2.5 text-sm"
          >
            no tablet? add a textual scribble
          </button>
        </div>
        <p className="handwritten text-pencil text-xs">
          Commercials never go in the repo — shared separately (build-in-public).
        </p>
      </div>
    </div>
  );
}
