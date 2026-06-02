'use client';

import { useState, useTransition } from 'react';
import { type InvoiceInput, saveInvoiceAction } from '@/app/universes/actions';
import RiggedGlyph from './RiggedGlyph';

// InvoiceBuilder — generate a tracked invoice.md RECORD (number/date/phase/descriptions, status)
// with all figures kept in .local-only/ (client-lifecycle "no client secrets" + build-in-public).
export default function InvoiceBuilder({ slug }: { slug: string }) {
  const [f, setF] = useState<InvoiceInput>({
    phase: '',
    currency: 'INR',
    dueDate: '',
    descriptions: '',
    amounts: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const set = (k: keyof InvoiceInput) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <label className="flex flex-col gap-1.5">
        <span className="handwritten text-ink flex items-center gap-2 text-base">
          <RiggedGlyph pattern="hatch" size={20} /> phase (universe-themed)
        </span>
        <input
          value={f.phase}
          onChange={(e) => set('phase')(e.target.value)}
          placeholder="e.g. First Light"
          className="sketch-border handwritten text-ink px-4 py-2.5 text-lg outline-none"
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="handwritten text-ink flex items-center gap-2 text-base">
            <RiggedGlyph pattern="ring" size={20} /> currency
          </span>
          <input
            value={f.currency}
            onChange={(e) => set('currency')(e.target.value)}
            className="sketch-border handwritten text-ink px-4 py-2.5 text-lg outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="handwritten text-ink flex items-center gap-2 text-base">
            <RiggedGlyph pattern="portal" size={20} /> due date
          </span>
          <input
            type="date"
            value={f.dueDate}
            onChange={(e) => set('dueDate')(e.target.value)}
            className="sketch-border handwritten text-ink px-4 py-2.5 text-lg outline-none"
          />
        </label>
      </div>
      <div className="lg:col-span-2">
        <label className="flex flex-col gap-1.5">
          <span className="handwritten text-ink flex items-center gap-2 text-base">
            <RiggedGlyph pattern="solid" size={20} /> line items — descriptions only (tracked)
          </span>
          <textarea
            rows={3}
            value={f.descriptions}
            onChange={(e) => set('descriptions')(e.target.value)}
            placeholder={'- design system\n- onboarding flow\n- handoff package'}
            className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
          />
        </label>
      </div>
      <div className="lg:col-span-2">
        <label className="flex flex-col gap-1.5">
          <span className="handwritten text-ink flex items-center gap-2 text-base">
            <RiggedGlyph pattern="star" size={20} /> amounts
            <span className="text-pencil text-xs">
              · kept private (.local-only), never committed
            </span>
          </span>
          <textarea
            rows={3}
            value={f.amounts}
            onChange={(e) => set('amounts')(e.target.value)}
            placeholder={'qty × rate, subtotal, GST, total — figures stay out of the repo'}
            className="sketch-border handwritten text-ink resize-none px-4 py-2 text-lg outline-none"
          />
        </label>
      </div>

      {error ? <p className="handwritten text-ink text-sm lg:col-span-2">✕ {error}</p> : null}

      <div className="flex flex-col gap-2 lg:col-span-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            start(async () => {
              setError(null);
              const r = await saveInvoiceAction(slug, f);
              if (r?.error) setError(r.error);
            })
          }
          className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
          aria-label="generate invoice"
        >
          <span className="handwritten text-ink text-lg">
            {pending ? 'issuing…' : 'issue invoice.md'}
          </span>
          <RiggedGlyph pattern="constellation" look="right" size={28} />
        </button>
        <p className="handwritten text-pencil text-xs">
          The tracked record carries number/date/phase/descriptions + status — never figures.
          Amounts + payment instructions stay in <code>.local-only/</code>.
        </p>
      </div>
    </div>
  );
}
