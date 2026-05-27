'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ScribbleCanvas from './ScribbleCanvas';

// Client onboarding — the intake step, kiruk-style. Hybrid read of the client + company before
// any scribble: details → kirukal archetype quiz → vibe sliders → a scribble prompt → product
// vision → summary, then hand off to the scribble proposal + a collaborative call.
// Slice: NO backend. State lives in localStorage; persistence (intake.md / Neon) lands with the
// auth+DB slice — see ROADMAP Phase 4 / TASKS.

type Archetype = 'Maker' | 'Dreamer' | 'Rebel' | 'Builder' | 'Wanderer';

const ARCHETYPE_BLURB: Record<Archetype, string> = {
  Maker: 'hands-first; texture, craft, the joy of building the thing.',
  Dreamer: 'idea-first; chasing what does not exist yet.',
  Rebel: 'rule-first (to break it); allergic to "it has been done".',
  Builder: 'system-first; useful, durable, loved in daily use.',
  Wanderer: 'curiosity-first; the work should take you somewhere.',
};

const QUESTIONS: { q: string; options: { label: string; a: Archetype }[] }[] = [
  {
    q: 'A blank page is…',
    options: [
      { label: 'a universe waiting', a: 'Dreamer' },
      { label: 'something to build on', a: 'Maker' },
      { label: 'a rule to break', a: 'Rebel' },
      { label: 'a plan to draft', a: 'Builder' },
      { label: 'a door', a: 'Wanderer' },
    ],
  },
  {
    q: "You'd rather ship something…",
    options: [
      { label: 'first-of-its-kind', a: 'Dreamer' },
      { label: 'crafted to last', a: 'Maker' },
      { label: 'weird but yours', a: 'Rebel' },
      { label: 'useful and loved', a: 'Builder' },
      { label: 'surprising', a: 'Wanderer' },
    ],
  },
  {
    q: 'The feedback that stings most:',
    options: [
      { label: '“it’s been done”', a: 'Dreamer' },
      { label: '“it’s sloppy”', a: 'Maker' },
      { label: '“it’s safe”', a: 'Rebel' },
      { label: '“it’s not useful”', a: 'Builder' },
      { label: '“it’s boring”', a: 'Wanderer' },
    ],
  },
  {
    q: 'Your process looks like…',
    options: [
      { label: 'big leaps', a: 'Dreamer' },
      { label: 'messy scribbles', a: 'Maker' },
      { label: 'break, then rebuild', a: 'Rebel' },
      { label: 'steady systems', a: 'Builder' },
      { label: 'follow the curiosity', a: 'Wanderer' },
    ],
  },
  {
    q: 'kiruk should make you…',
    options: [
      { label: "something nobody's seen", a: 'Dreamer' },
      { label: 'something handcrafted', a: 'Maker' },
      { label: 'something rebellious', a: 'Rebel' },
      { label: 'something that just works', a: 'Builder' },
      { label: 'something that takes you somewhere', a: 'Wanderer' },
    ],
  },
];

const SLIDERS = [
  { key: 'weird', left: 'safe', right: 'weird' },
  { key: 'considered', left: 'fast', right: 'considered' },
  { key: 'collab', left: 'solo', right: 'collaborative' },
  { key: 'maximal', left: 'minimal', right: 'maximal' },
  { key: 'loud', left: 'quiet', right: 'loud' },
] as const;

const PRODUCT_FIELDS = [
  { key: 'what', label: 'What are we making? (one line)' },
  { key: 'who', label: 'Who is it for?' },
  { key: 'unseen', label: 'What makes it never-before-seen?' },
  { key: 'constraints', label: 'Hard constraints (budget / tech / time)?' },
  { key: 'timeline', label: 'Dream timeline?' },
] as const;

type State = {
  client: { name: string; company: string; role: string; email: string; links: string };
  quiz: Record<number, Archetype>;
  vibe: Record<string, number>;
  scribble: string | null;
  product: Record<string, string>;
};

const EMPTY: State = {
  client: { name: '', company: '', role: '', email: '', links: '' },
  quiz: {},
  vibe: Object.fromEntries(SLIDERS.map((s) => [s.key, 50])),
  scribble: null,
  product: Object.fromEntries(PRODUCT_FIELDS.map((f) => [f.key, ''])),
};

const STEPS = ['intro', 'client', 'personality', 'vibe', 'scribble', 'product', 'summary'] as const;
const KEY = 'kiruk-onboard';

function scoreArchetype(quiz: Record<number, Archetype>): Archetype | null {
  const tally: Record<string, number> = {};
  for (const a of Object.values(quiz)) tally[a] = (tally[a] ?? 0) + 1;
  let top: Archetype | null = null;
  let max = 0;
  for (const [a, n] of Object.entries(tally)) {
    if (n > max) {
      max = n;
      top = a as Archetype;
    }
  }
  return top;
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(EMPTY);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* ignore */
    }
  }, [s]);

  const name = STEPS[step];
  const last = STEPS.length - 1;
  const archetype = scoreArchetype(s.quiz);

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-2xl flex-col gap-8 px-6 py-12">
      <header>
        <p className="handwritten text-pencil text-sm tracking-wide">
          onboard a client &mdash; step {step + 1} / {STEPS.length}
        </p>
        <div className="bg-rule mt-3 h-1 w-full overflow-hidden rounded-full">
          <div
            className="bg-ink h-full transition-all"
            style={{ width: `${(step / last) * 100}%` }}
          />
        </div>
      </header>

      <section className="flex-1">
        {name === 'intro' && (
          <div className="flex flex-col gap-4">
            <h1 className="font-wordmark text-ink text-4xl md:text-6xl">before we scribble</h1>
            <p className="handwritten text-pencil max-w-md text-lg">
              We get to know you, your company&rsquo;s vibe, and what you want to make. Then we
              sketch it together and jump on a call. Messy answers welcome.
            </p>
          </div>
        )}

        {name === 'client' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-wordmark text-ink text-3xl">who&rsquo;s scribbling?</h2>
            {(
              [
                ['name', 'your name'],
                ['company', 'company / studio'],
                ['role', 'your role'],
                ['email', 'email'],
                ['links', 'website / socials'],
              ] as const
            ).map(([k, ph]) => (
              <input
                key={k}
                value={s.client[k]}
                placeholder={ph}
                onChange={(e) => setS({ ...s, client: { ...s.client, [k]: e.target.value } })}
                className="handwritten sketch-border text-ink w-full px-4 py-2 text-lg outline-none"
              />
            ))}
          </div>
        )}

        {name === 'personality' && (
          <div className="flex flex-col gap-6">
            <h2 className="font-wordmark text-ink text-3xl">the kirukal test</h2>
            {QUESTIONS.map((item, qi) => (
              <fieldset key={item.q} className="flex flex-col gap-2">
                <legend className="handwritten text-ink mb-1 text-lg">{item.q}</legend>
                <div className="flex flex-wrap gap-2">
                  {item.options.map((o) => {
                    const active = s.quiz[qi] === o.a;
                    return (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setS({ ...s, quiz: { ...s.quiz, [qi]: o.a } })}
                        className="handwritten rounded-lg border-2 px-3 py-1 text-base transition-colors"
                        style={{
                          borderColor: active ? 'var(--ink)' : 'var(--rule)',
                          background: active ? 'var(--ink)' : 'transparent',
                          color: active ? 'var(--paper)' : 'var(--pencil)',
                        }}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
            {archetype && (
              <p className="handwritten text-ink text-lg">
                reading: <strong>{archetype}</strong> &mdash; {ARCHETYPE_BLURB[archetype]}
              </p>
            )}
          </div>
        )}

        {name === 'vibe' && (
          <div className="flex flex-col gap-6">
            <h2 className="font-wordmark text-ink text-3xl">company vibe check</h2>
            {SLIDERS.map((sl) => (
              <label key={sl.key} className="flex flex-col gap-1">
                <span className="handwritten text-pencil flex justify-between text-base">
                  <span>{sl.left}</span>
                  <span>{sl.right}</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={s.vibe[sl.key] ?? 50}
                  onChange={(e) =>
                    setS({ ...s, vibe: { ...s.vibe, [sl.key]: Number(e.target.value) } })
                  }
                  className="accent-ink w-full"
                />
              </label>
            ))}
          </div>
        )}

        {name === 'scribble' && (
          <div className="flex flex-col gap-3">
            <h2 className="font-wordmark text-ink text-3xl">scribble the energy</h2>
            <p className="handwritten text-pencil text-base">
              Don&rsquo;t describe it &mdash; draw the feeling of your idea. Rough is the point.
            </p>
            <div className="sketch-border h-72 overflow-hidden">
              <ScribbleCanvas
                heightClass="h-full"
                onCapture={(d) => setS((prev) => ({ ...prev, scribble: d }))}
              />
            </div>
          </div>
        )}

        {name === 'product' && (
          <div className="flex flex-col gap-4">
            <h2 className="font-wordmark text-ink text-3xl">what do you want to make?</h2>
            {PRODUCT_FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-1">
                <span className="handwritten text-pencil text-base">{f.label}</span>
                <textarea
                  rows={2}
                  value={s.product[f.key] ?? ''}
                  onChange={(e) =>
                    setS({ ...s, product: { ...s.product, [f.key]: e.target.value } })
                  }
                  className="handwritten sketch-border text-ink w-full resize-none px-4 py-2 text-lg outline-none"
                />
              </label>
            ))}
          </div>
        )}

        {name === 'summary' && (
          <div className="flex flex-col gap-5">
            <h2 className="font-wordmark text-ink text-3xl">the read</h2>
            <p className="handwritten text-ink text-lg">
              {s.client.name || 'this kirukan'}
              {s.client.company ? ` · ${s.client.company}` : ''}
            </p>
            {archetype && (
              <p className="handwritten text-ink text-lg">
                archetype: <strong>{archetype}</strong> &mdash; {ARCHETYPE_BLURB[archetype]}
              </p>
            )}
            <div className="flex flex-col gap-1">
              {SLIDERS.map((sl) => (
                <div
                  key={sl.key}
                  className="handwritten text-pencil flex items-center gap-2 text-sm"
                >
                  <span className="w-24 text-right">{sl.left}</span>
                  <span className="bg-rule relative h-1 flex-1 rounded-full">
                    <span
                      className="bg-ink absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                      style={{ left: `calc(${s.vibe[sl.key] ?? 50}% - 6px)` }}
                    />
                  </span>
                  <span className="w-24">{sl.right}</span>
                </div>
              ))}
            </div>
            {s.scribble && (
              <img
                src={s.scribble}
                alt="idea scribble"
                className="sketch-border max-h-48 w-full object-contain"
              />
            )}
            <ul className="handwritten text-ink flex flex-col gap-1 text-base">
              {PRODUCT_FIELDS.map((f) =>
                s.product[f.key] ? (
                  <li key={f.key}>
                    <span className="text-pencil">{f.label.replace(/\?.*/, '')}:</span>{' '}
                    {s.product[f.key]}
                  </li>
                ) : null,
              )}
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/proposals/new" className="sketch-button text-lg">
                start the scribble proposal <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                className="sketch-button text-lg"
                onClick={() => alert('Collaborative call booking lands with the auth+DB slice.')}
              >
                book a collaborative call
              </button>
            </div>
            <p className="handwritten text-pencil text-xs">
              Saved locally only (no account yet). Persistence + a real intake record come with the
              auth+DB slice.
            </p>
          </div>
        )}
      </section>

      <footer className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="sketch-button text-base"
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          onClick={() => setStep((n) => Math.max(0, n - 1))}
        >
          &larr; back
        </button>
        {step < last ? (
          <button
            type="button"
            className="sketch-button text-base"
            onClick={() => setStep((n) => n + 1)}
          >
            next &rarr;
          </button>
        ) : (
          <Link href="/" className="sketch-button text-base">
            done
          </Link>
        )}
      </footer>
    </main>
  );
}
