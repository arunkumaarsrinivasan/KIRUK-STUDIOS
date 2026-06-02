'use client';

import { useState, useTransition } from 'react';
import { saveMarksAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';
import ScribbleCanvas from './ScribbleCanvas';

const MARK_COLOR = '#FF6A00'; // distinct review-mark colour (palette: anticipation)

// ReviewBuilder — the client's mark-back surface. The original proposal scribble sits behind a
// transparent canvas; the client draws marks in a distinct colour; save writes a marks-only PNG.
export default function ReviewBuilder({
  slug,
  backgroundSrc,
}: {
  slug: string;
  backgroundSrc: string | null;
}) {
  const [marks, setMarks] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (!backgroundSrc) {
    return (
      <p className="handwritten text-pencil text-lg">
        No proposal scribble to mark yet. The studio needs to scribble the proposal first.
      </p>
    );
  }

  if (saved) {
    return (
      <div className="sketch-border flex flex-col gap-3 p-6">
        <p className="handwritten text-ink flex items-center gap-2 text-2xl">
          <RiggedGlyph pattern="star" size={30} open /> marks sent
        </p>
        <p className="handwritten text-pencil text-base">
          Your marks landed back with the studio. Mark again any time — each pass is saved.
        </p>
        <button
          type="button"
          onClick={() => {
            setSaved(false);
            setMarks(null);
          }}
          className="sketch-button handwritten self-start text-base"
        >
          mark again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="handwritten text-pencil text-sm">
        Mark on the studio&rsquo;s scribble in <span style={{ color: MARK_COLOR }}>orange</span> —
        circle, cross out, arrow, annotate. Save to send it back.
      </p>
      <div className="h-[70svh]">
        <ScribbleCanvas
          heightClass="h-full"
          transparent
          inkColor={MARK_COLOR}
          backgroundSrc={backgroundSrc}
          onCapture={setMarks}
        />
      </div>
      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}
      <button
        type="button"
        disabled={pending || !marks}
        onClick={() =>
          start(async () => {
            setError(null);
            if (!marks) return;
            const r = await saveMarksAction(slug, marks);
            if (r?.error) setError(r.error);
            else setSaved(true);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="send marks back"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'sending…' : 'send marks back'}
        </span>
        <RiggedGlyph pattern="constellation" look="right" size={28} />
      </button>
    </div>
  );
}
