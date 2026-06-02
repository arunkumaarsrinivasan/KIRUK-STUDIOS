'use client';

import { useState, useTransition } from 'react';
import { type IntakeInput, saveIntakeAction, type Transparency } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

const TRANSPARENCY: { v: Transparency; label: string; blurb: string }[] = [
  { v: 'open', label: 'open', blurb: 'process + case study publishable' },
  { v: 'partial', label: 'partial', blurb: 'anonymized case study ok' },
  { v: 'closed', label: 'closed', blurb: 'nothing public' },
];

// IntakeBuilder — structured brief → intake.md. The transparency choice gates the handoff case study.
export default function IntakeBuilder({ slug }: { slug: string }) {
  const [f, setF] = useState<IntakeInput>({
    goal: '',
    audience: '',
    world: '',
    scope: '',
    constraints: '',
    deliverables: '',
    risks: '',
    evaluation: '',
    transparency: 'closed',
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof IntakeInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const area = (label: string, k: keyof IntakeInput, pattern: string) => (
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={pattern as 'ring'} size={20} /> {label}
      </span>
      <textarea
        rows={2}
        value={f[k] as string}
        onChange={(e) => set(k)(e.target.value)}
        className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
      />
    </label>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        {area('goal — one line', 'goal', 'portal')}
        {area('audience', 'audience', 'ring')}
        {area('world / metaphor', 'world', 'star')}
        {area('scope (in / out)', 'scope', 'slit')}
        {area('constraints', 'constraints', 'hatch')}
        {area('deliverables', 'deliverables', 'solid')}
        {area('risks', 'risks', 'slit')}
        {area('evaluation', 'evaluation', 'constellation')}
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="handwritten text-ink text-base">
          transparency — gates what can ever be published
        </legend>
        <div className="flex flex-wrap gap-3">
          {TRANSPARENCY.map((t) => {
            const on = f.transparency === t.v;
            return (
              <button
                key={t.v}
                type="button"
                aria-pressed={on}
                onClick={() => set('transparency')(t.v)}
                className={`pick px-4 py-2.5 text-left ${on ? 'on' : ''}`}
              >
                <span className="handwritten text-lg">{t.label}</span>
                <span className="handwritten block text-xs" style={{ opacity: 0.8 }}>
                  {t.blurb}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            const r = await saveIntakeAction(slug, f);
            if (r?.error) setError(r.error);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="save intake"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'saving…' : 'save intake.md'}
        </span>
        <RiggedGlyph pattern="solid" look="right" size={28} />
      </button>
      <p className="handwritten text-pencil text-xs">
        Writes intake.md. For the full guided intake, <code>/kiruk-intake {slug}</code> also works.
        Next: scribble the proposal.
      </p>
    </div>
  );
}
