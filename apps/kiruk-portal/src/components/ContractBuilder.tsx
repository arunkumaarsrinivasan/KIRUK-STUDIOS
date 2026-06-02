'use client';

import { useState, useTransition } from 'react';
import { type ContractInput, saveContractAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// ContractBuilder — generate contract.md from the kiruk contract template. Commercial figures are
// kept OUT of the repo (written to .local-only/). Signing happens offline; advance to `engaged`
// from the cockpit once contract.md exists.
export default function ContractBuilder({ slug }: { slug: string }) {
  const [f, setF] = useState<ContractInput>({
    client: '',
    signatory: '',
    email: '',
    jurisdiction: 'India',
    scope: '',
    commercials: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof ContractInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  // render-function (NOT a component) so inputs don't remount + lose focus on each keystroke.
  const field = (o: {
    label: string;
    k: keyof ContractInput;
    pattern: string;
    rows?: number;
    placeholder?: string;
    privateNote?: boolean;
  }) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: the input/textarea control is nested in this label (via the rows ternary)
    <label className="flex flex-col gap-1.5">
      <span className="handwritten text-ink flex items-center gap-2 text-base">
        <RiggedGlyph pattern={o.pattern as 'ring'} size={20} />
        {o.label}
        {o.privateNote ? (
          <span className="text-pencil text-xs">· kept private (.local-only)</span>
        ) : null}
      </span>
      {o.rows ? (
        <textarea
          rows={o.rows}
          value={f[o.k]}
          onChange={(e) => set(o.k)(e.target.value)}
          placeholder={o.placeholder}
          className="sketch-border handwritten text-ink w-full resize-none px-4 py-2 text-lg outline-none"
        />
      ) : (
        <input
          value={f[o.k]}
          onChange={(e) => set(o.k)(e.target.value)}
          placeholder={o.placeholder}
          className="sketch-border handwritten text-ink w-full px-4 py-2.5 text-lg outline-none"
        />
      )}
    </label>
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {field({
        label: 'client (legal name)',
        k: 'client',
        pattern: 'solid',
        placeholder: 'Nimbus Forge Pvt Ltd',
      })}
      {field({
        label: 'signatory',
        k: 'signatory',
        pattern: 'ring',
        placeholder: 'name of who signs',
      })}
      {field({
        label: 'signatory email',
        k: 'email',
        pattern: 'portal',
        placeholder: 'name@company.com',
      })}
      {field({ label: 'jurisdiction', k: 'jurisdiction', pattern: 'hatch', placeholder: 'India' })}
      <div className="lg:col-span-2">
        {field({
          label: 'scope of engagement',
          k: 'scope',
          pattern: 'slit',
          rows: 2,
          placeholder: "what we're building, one or two lines",
        })}
      </div>
      <div className="lg:col-span-2">
        {field({
          label: 'commercials (amounts, milestones)',
          k: 'commercials',
          pattern: 'star',
          rows: 3,
          placeholder:
            'e.g. total, advance %, milestone splits, late fee — stays in .local-only, never committed',
          privateNote: true,
        })}
      </div>

      {error ? <p className="handwritten text-ink text-sm lg:col-span-2">✕ {error}</p> : null}

      <div className="flex flex-col gap-2 lg:col-span-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              setError(null);
              const r = await saveContractAction(slug, f);
              if (r?.error) setError(r.error);
            })
          }
          className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
          aria-label="generate contract"
        >
          <span className="handwritten text-ink text-lg">
            {pending ? 'drafting…' : 'generate contract.md'}
          </span>
          <RiggedGlyph pattern="slit" look="right" size={28} />
        </button>
        <p className="handwritten text-pencil text-xs">
          ⚖ template only — a lawyer must review. Figures go to <code>.local-only/</code>; signed
          PDF never enters the repo. Sign offline, then advance to <strong>engaged</strong> from the
          cockpit.
        </p>
      </div>
    </div>
  );
}
