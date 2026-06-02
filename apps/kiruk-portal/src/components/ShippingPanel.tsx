'use client';

import { useState, useTransition } from 'react';
import { scaffoldSpecAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// ShippingPanel — spec.md is the gate into `shipping`. /kiruk-spec is its canonical producer;
// this only offers a STARTER stub so the flow isn't CLI-blocked.
export default function ShippingPanel({ slug, hasSpec }: { slug: string; hasSpec: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (hasSpec) {
    return (
      <div className="flex flex-col gap-2">
        <p className="handwritten text-ink flex items-center gap-2 text-lg">
          <RiggedGlyph pattern="hatch" size={24} open /> spec.md is present.
        </p>
        <p className="handwritten text-pencil text-base">
          Advance <strong>engaged → shipping</strong> from the cockpit.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="handwritten text-pencil text-lg">
        Shipping needs a universe <code>spec.md</code>. The real one comes from{' '}
        <code>/kiruk-spec {slug}</code> (intake → spec). If you just want to unblock the flow,
        scaffold a starter stub and flesh it out later.
      </p>
      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            const r = await scaffoldSpecAction(slug);
            if (r?.error) setError(r.error);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="scaffold a starter spec.md"
      >
        <span className="handwritten text-ink text-lg">
          {pending ? 'scaffolding…' : 'scaffold a starter spec.md'}
        </span>
        <RiggedGlyph pattern="hatch" look="right" size={28} />
      </button>
    </div>
  );
}
