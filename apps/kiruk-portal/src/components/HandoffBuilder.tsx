'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { type HandoffInput, type HandoffResult, saveHandoffAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// HandoffBuilder — write handoff.md, hand credentials over privately, archive the universe. A case
// study is drafted ONLY when the universe's transparency allows it (build-in-public consent gate);
// the outcome is shown inline.
export default function HandoffBuilder({ slug }: { slug: string }) {
  const [f, setF] = useState<HandoffInput>({
    summary: '',
    links: '',
    nextSteps: '',
    credentials: '',
  });
  const [res, setRes] = useState<HandoffResult | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof HandoffInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const area = (
    label: string,
    k: keyof HandoffInput,
    pattern: string,
    placeholder: string,
    priv?: boolean,
  ) => (
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={pattern as 'ring'} size={20} /> {label}
        {priv ? <span className="text-pencil text-xs">· private (.local-only)</span> : null}
      </span>
      <textarea
        rows={2}
        value={f[k]}
        onChange={(e) => set(k)(e.target.value)}
        placeholder={placeholder}
        className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
      />
    </label>
  );

  if (res?.archived) {
    return (
      <div className="sketch-border flex flex-col gap-3 p-6">
        <p className="handwritten text-ink flex items-center gap-2 text-2xl">
          <RiggedGlyph pattern="constellation" size={30} open /> handed off · archived
        </p>
        <p className="handwritten text-pencil text-base">
          transparency: <strong>{res.transparency ?? 'unset'}</strong> —{' '}
          {res.caseStudy === 'drafted' ? (
            <>
              case study drafted to <code>{res.caseStudyPath}</code> (unpublished, consent-gated).
            </>
          ) : (
            <>
              case study <strong>skipped</strong>. To draft one, set <code>transparency: open</code>{' '}
              (or
              <code> partial</code>) in <code>intake.md</code> and re-run handoff.
            </>
          )}
        </p>
        <Link href={`/universes/${slug}`} className="eye-btn eye-next gap-3 self-start px-6 py-3">
          <span className="handwritten text-ink text-lg">back to the cockpit</span>
          <RiggedGlyph pattern="solid" look="right" size={26} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {area('what shipped', 'summary', 'star', 'the deliverables, in a few lines')}
      {area('links', 'links', 'portal', 'repo / deploy / asset links — no secrets')}
      {area('next steps', 'nextSteps', 'ring', 'what the client owns + does from here')}
      {area(
        'credentials / access',
        'credentials',
        'slit',
        'kept out of the repo — handed over privately',
        true,
      )}

      {res?.error ? <p className="handwritten text-ink text-sm">✕ {res.error}</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await saveHandoffAction(slug, f);
            setRes(r);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="write handoff and archive"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'handing off…' : 'write handoff + archive'}
        </span>
        <RiggedGlyph pattern="constellation" look="right" size={28} />
      </button>
      <p className="handwritten text-pencil text-xs">
        Writes <code>handoff.md</code> + records the archive. A case study is drafted only if the
        universe's transparency allows it.
      </p>
    </div>
  );
}
