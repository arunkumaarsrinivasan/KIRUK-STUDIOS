'use client';

import { useActionState, useState } from 'react';
import { type CreateState, createUniverseAction } from '@/app/universes/actions';
import EyeField from './EyeField';
import RiggedGlyph from './RiggedGlyph';

// NewUniverse — kick off a universe (starts at `lead`). Server action writes the folder +
// state.md, then redirects into the cockpit.
export default function NewUniverse() {
  const [state, action, pending] = useActionState<CreateState, FormData>(createUniverseAction, {});
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');

  return (
    <form action={action} className="sketch-border flex flex-col gap-4 p-5">
      <div className="flex items-center gap-2">
        <RiggedGlyph pattern="ring" size={26} blink />
        <h2 className="brutal text-ink text-2xl">open a universe</h2>
      </div>
      <EyeField
        label="slug (kebab-case)"
        pattern="solid"
        name="slug"
        value={slug}
        onValueChange={(v) => setSlug(v.toLowerCase())}
        placeholder="midnight-atlas"
        autoCapitalize="none"
        spellCheck={false}
      />
      <EyeField
        label="title (optional)"
        pattern="star"
        name="title"
        value={title}
        onValueChange={setTitle}
        placeholder="Midnight Atlas"
      />
      {state.error ? (
        <p className="handwritten text-sm" style={{ color: 'var(--ink)' }}>
          ✕ {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="eye-btn eye-next gap-3 self-start px-6 py-3"
        aria-label="create universe"
      >
        <span className="handwritten text-ink text-lg">{pending ? 'opening…' : 'open it'}</span>
        <RiggedGlyph pattern="portal" look="right" size={28} />
      </button>
    </form>
  );
}
