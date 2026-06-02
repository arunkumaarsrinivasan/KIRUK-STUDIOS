'use client';

import { useState, useTransition } from 'react';
import { type LeadInput, saveLeadAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// LeadBuilder — capture first-contact notes → lead.md, then move lead → intake.
export default function LeadBuilder({ slug }: { slug: string }) {
  const [f, setF] = useState<LeadInput>({ source: '', contact: '', notes: '' });
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof LeadInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const area = (
    label: string,
    k: keyof LeadInput,
    pattern: string,
    placeholder: string,
    rows = 2,
  ) => (
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={pattern as 'ring'} size={20} /> {label}
      </span>
      <textarea
        rows={rows}
        value={f[k]}
        onChange={(e) => set(k)(e.target.value)}
        placeholder={placeholder}
        className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
      />
    </label>
  );

  return (
    <div className="flex flex-col gap-5">
      {area('source', 'source', 'ring', 'referral, DM, story drop, event…', 1)}
      {area('contact', 'contact', 'solid', 'name / handle — no private data', 1)}
      {area('notes', 'notes', 'portal', 'what they want, first impressions', 3)}

      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            const r = await saveLeadAction(slug, f);
            if (r?.error) setError(r.error);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="save lead and start intake"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'saving…' : 'capture + start intake'}
        </span>
        <RiggedGlyph pattern="solid" look="right" size={28} />
      </button>
      <p className="handwritten text-pencil text-xs">
        Writes lead.md and moves the universe to intake.
      </p>
    </div>
  );
}
