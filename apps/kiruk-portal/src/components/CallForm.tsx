'use client';

import { useState, useTransition } from 'react';
import { type CallInput, requestCallAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// CallForm — "book a collaborative call" → writes a request into the file-backed inbox
// (kiruk-projects/_inbox/calls.ndjson). No Cal.com account; the studio reads the inbox.
export default function CallForm() {
  const [f, setF] = useState<CallInput>({ name: '', contact: '', when: '', note: '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof CallInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const field = (label: string, k: keyof CallInput, pattern: string, rows = 1) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: the input/textarea control is nested in this label (via the rows ternary)
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={pattern as 'ring'} size={20} /> {label}
      </span>
      {rows > 1 ? (
        <textarea
          rows={rows}
          value={f[k]}
          onChange={(e) => set(k)(e.target.value)}
          className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
        />
      ) : (
        <input
          value={f[k]}
          onChange={(e) => set(k)(e.target.value)}
          className="sketch-border handwritten text-ink px-4 py-2.5 text-lg outline-none"
        />
      )}
    </label>
  );

  if (saved) {
    return (
      <div className="sketch-border flex flex-col gap-3 p-6">
        <p className="handwritten text-ink flex items-center gap-2 text-2xl">
          <RiggedGlyph pattern="star" size={30} open /> request sent
        </p>
        <p className="handwritten text-pencil text-base">
          The studio has your note. We&rsquo;ll reach out at <strong>{f.contact}</strong> to find a
          time.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {field('your name', 'name', 'ring')}
      {field('how to reach you (email / handle)', 'contact', 'solid')}
      {field('rough timing (optional)', 'when', 'portal')}
      {field('what do you want to make? (optional)', 'note', 'star', 3)}

      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            const r = await requestCallAction(f);
            if (r?.error) setError(r.error);
            else setSaved(true);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="request a call"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'sending…' : 'request a call'}
        </span>
        <RiggedGlyph pattern="portal" look="right" size={28} />
      </button>
      <p className="handwritten text-pencil text-xs">
        Goes to the studio&rsquo;s inbox — your details stay private (not committed to the repo).
      </p>
    </div>
  );
}
