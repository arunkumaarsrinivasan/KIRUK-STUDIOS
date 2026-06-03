'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { advanceAction, createUniverseAdminAction, grantAccessAction } from '@/app/admin/actions';
import type { UniverseRow } from '@/db/repo';
import { LIFECYCLE, nextState } from '@/lib/lifecycle-model';
import type { EyePattern } from './EyeBall';
import RiggedGlyph from './RiggedGlyph';

// AdminPanel — the founder's CRUD desk: create a universe, advance the pipeline, invite a client.
// Server actions are imported + called directly (Next 15 RPC), not threaded through props.
export default function AdminPanel({ universes }: { universes: UniverseRow[] }) {
  return (
    <div className="flex flex-col gap-8">
      <CreateUniverse />
      <Pipeline universes={universes} />
      <InviteClient universes={universes} />
    </div>
  );
}

// ── 1. open a universe ──────────────────────────────────────────────────────
function CreateUniverse() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  // render fn (not a nested component) so inputs keep focus on re-render.
  const field = (
    label: string,
    pattern: EyePattern,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    lower = false,
  ) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: control nested in label
    <label className="sketch-border flex items-stretch">
      <span className="handwritten text-pencil flex w-40 shrink-0 items-center gap-2 px-3 text-sm">
        <RiggedGlyph pattern={pattern} size={22} open={value.length > 0} blink />
        {label}
      </span>
      <input
        value={value}
        onChange={(ev) => onChange(lower ? ev.target.value.toLowerCase() : ev.target.value)}
        placeholder={placeholder}
        autoCapitalize={lower ? 'none' : undefined}
        spellCheck={lower ? false : undefined}
        className="ink-block handwritten w-full px-4 py-3 text-lg outline-none"
      />
    </label>
  );

  return (
    <section className="sketch-border flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <RiggedGlyph pattern="ring" size={26} blink />
        <h2 className="brutal text-ink text-2xl">open a universe</h2>
      </div>
      {field('slug (kebab-case)', 'solid', slug, setSlug, 'midnight-atlas', true)}
      {field('title (optional)', 'star', title, setTitle, 'Midnight Atlas')}
      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            const res = await createUniverseAdminAction(slug, title);
            if (res?.error) setError(res.error);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="open universe"
      >
        <span className="handwritten text-ink text-lg">{pending ? 'opening…' : 'open it'}</span>
        <RiggedGlyph pattern="portal" look="right" size={28} />
      </button>
    </section>
  );
}

// ── 2. pipeline ─────────────────────────────────────────────────────────────
function Pipeline({ universes }: { universes: UniverseRow[] }) {
  return (
    <section className="sketch-border flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <RiggedGlyph pattern="constellation" size={26} blink />
        <h2 className="brutal text-ink text-2xl">pipeline</h2>
      </div>
      {universes.length === 0 ? (
        <p className="handwritten text-pencil text-base">
          no universes yet — open one above to start the flow.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {universes.map((u) => (
            <PipelineRow key={u.id} universe={u} />
          ))}
        </ul>
      )}
    </section>
  );
}

function PipelineRow({ universe }: { universe: UniverseRow }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const meta = LIFECYCLE[universe.state];
  const nx = nextState(universe.state);

  return (
    <li className="dashed flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={`/universes/${universe.slug}`}
        className="flex items-baseline gap-2 underline-offset-2 hover:underline"
      >
        <span className="brutal text-ink text-xl">{universe.title}</span>
        <span className="handwritten text-pencil text-sm">{universe.slug}</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="handwritten text-pencil text-sm">{meta.label}</span>
        {nx ? (
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              start(async () => {
                setError(null);
                const res = await advanceAction(universe.slug);
                if (res?.error) setError(res.error);
              })
            }
            className="eye-btn eye-next gap-2 px-4 py-2 disabled:opacity-40"
            aria-label={`advance ${universe.slug} to ${LIFECYCLE[nx].label}`}
          >
            <span className="handwritten text-ink text-base">
              {pending ? 'moving…' : 'advance'}
            </span>
            <RiggedGlyph pattern={LIFECYCLE[nx].pattern as EyePattern} look="right" size={22} />
          </button>
        ) : (
          <span className="handwritten text-pencil text-sm">archived ✓</span>
        )}
      </div>
      {error ? <p className="handwritten text-ink text-sm sm:basis-full">✕ {error}</p> : null}
    </li>
  );
}

// ── 3. invite a client ──────────────────────────────────────────────────────
function InviteClient({ universes }: { universes: UniverseRow[] }) {
  const [email, setEmail] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  return (
    <section className="sketch-border flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <RiggedGlyph pattern="slit" size={26} blink />
        <h2 className="brutal text-ink text-2xl">invite a client</h2>
      </div>
      <p className="handwritten text-pencil text-sm">
        grant read access by email — the client must have signed in at least once.
      </p>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: control nested in label */}
      <label className="sketch-border flex items-stretch">
        <span className="handwritten text-pencil flex w-40 shrink-0 items-center gap-2 px-3 text-sm">
          <RiggedGlyph pattern="portal" size={22} open={email.length > 0} blink />
          client email
        </span>
        <input
          type="email"
          value={email}
          onChange={(ev) => {
            setEmail(ev.target.value);
            setSaved(false);
          }}
          placeholder="client@studio.world"
          autoCapitalize="none"
          spellCheck={false}
          className="ink-block handwritten w-full px-4 py-3 text-lg outline-none"
        />
      </label>

      {/* biome-ignore lint/a11y/noLabelWithoutControl: control nested in label */}
      <label className="sketch-border flex items-stretch">
        <span className="handwritten text-pencil flex w-40 shrink-0 items-center gap-2 px-3 text-sm">
          <RiggedGlyph pattern="hatch" size={22} open={slug.length > 0} blink />
          universe slug
        </span>
        <input
          list="admin-universe-slugs"
          value={slug}
          onChange={(ev) => {
            setSlug(ev.target.value.toLowerCase());
            setSaved(false);
          }}
          placeholder="midnight-atlas"
          autoCapitalize="none"
          spellCheck={false}
          className="ink-block handwritten w-full px-4 py-3 text-lg outline-none"
        />
        <datalist id="admin-universe-slugs">
          {universes.map((u) => (
            <option key={u.id} value={u.slug} />
          ))}
        </datalist>
      </label>

      {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}
      {saved ? <p className="handwritten text-pencil text-sm">✓ access granted</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null);
            setSaved(false);
            const res = await grantAccessAction(email, slug);
            if (res?.error) setError(res.error);
            else setSaved(true);
          })
        }
        className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
        aria-label="grant access"
      >
        <span className="handwritten text-ink text-lg">{pending ? 'inviting…' : 'invite'}</span>
        <RiggedGlyph pattern="slit" look="right" size={28} />
      </button>
    </section>
  );
}
