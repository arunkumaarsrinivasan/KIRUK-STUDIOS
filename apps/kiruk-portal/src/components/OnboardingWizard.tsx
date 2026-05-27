'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScribbleCanvas from './ScribbleCanvas';

// Client onboarding — the intake, ABSURDLY style. Brutalist B&W on a graph-paper grid; every
// step is a scene you act on, not a form. Read the human + company before any proposal:
// details → kirukal archetype (pick big shapes) → vibe (drag chunky gauges) → scribble → product
// → "the read". NO backend yet — state in localStorage; persistence lands with the auth+DB slice.

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
    q: 'a blank page is…',
    options: [
      { label: 'a universe waiting', a: 'Dreamer' },
      { label: 'something to build on', a: 'Maker' },
      { label: 'a rule to break', a: 'Rebel' },
      { label: 'a plan to draft', a: 'Builder' },
      { label: 'a door', a: 'Wanderer' },
    ],
  },
  {
    q: "you'd rather ship something…",
    options: [
      { label: 'first-of-its-kind', a: 'Dreamer' },
      { label: 'crafted to last', a: 'Maker' },
      { label: 'weird but yours', a: 'Rebel' },
      { label: 'useful and loved', a: 'Builder' },
      { label: 'surprising', a: 'Wanderer' },
    ],
  },
  {
    q: 'the feedback that stings most:',
    options: [
      { label: '“it’s been done”', a: 'Dreamer' },
      { label: '“it’s sloppy”', a: 'Maker' },
      { label: '“it’s safe”', a: 'Rebel' },
      { label: '“it’s not useful”', a: 'Builder' },
      { label: '“it’s boring”', a: 'Wanderer' },
    ],
  },
  {
    q: 'your process looks like…',
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
  { key: 'what', label: 'what are we making? (one line)' },
  { key: 'who', label: 'who is it for?' },
  { key: 'unseen', label: 'what makes it never-before-seen?' },
  { key: 'constraints', label: 'hard constraints (budget / tech / time)?' },
  { key: 'timeline', label: 'dream timeline?' },
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

// chunky pointer-drag gauge (the PASS/FAIL needle energy) — drag the knob between two poles.
function Gauge({
  left,
  right,
  value,
  onChange,
}: {
  left: string;
  right: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const set = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    onChange(Math.round(Math.max(0, Math.min(1, (clientX - r.left) / r.width)) * 100));
  };
  return (
    <div className="select-none">
      <div className="brutal text-ink flex items-end justify-between uppercase">
        <span
          style={{
            fontSize: `${0.9 + (1 - value / 100) * 0.9}rem`,
            opacity: 0.4 + (1 - value / 100) * 0.6,
          }}
        >
          {left}
        </span>
        <span
          style={{
            fontSize: `${0.9 + (value / 100) * 0.9}rem`,
            opacity: 0.4 + (value / 100) * 0.6,
          }}
        >
          {right}
        </span>
      </div>
      <div
        ref={ref}
        className="border-ink relative mt-2 h-12 cursor-ew-resize touch-none border-2"
        onPointerDown={(e) => {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* synthetic pointer */
          }
          set(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1) set(e.clientX);
        }}
      >
        <div className="ink-block absolute inset-y-0 left-0" style={{ width: `${value}%` }} />
        <div
          className="border-ink bg-paper absolute top-1/2 h-16 w-7 -translate-y-1/2 border-2"
          style={{ left: `calc(${value}% - 14px)` }}
        />
      </div>
    </div>
  );
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
    <main className="grid-paper relative min-h-[100svh] w-full">
      {/* header */}
      <header className="flex items-center gap-3 px-6 pt-6 md:px-10">
        <span className="face-mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
            <line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <div className="leading-none">
          <p className="brutal text-ink text-xl">kiruk</p>
          <p className="text-pencil text-[0.6rem] uppercase tracking-[0.2em]">
            believe in absurdism
          </p>
        </div>
        <div className="dots ml-auto">
          {STEPS.map((st, i) => (
            <span key={st} className={`dot ${i <= step ? 'on' : ''}`} />
          ))}
        </div>
      </header>

      {/* scene */}
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-10 md:px-10">
        {name === 'intro' && (
          <div className="flex flex-col gap-5">
            <h1 className="brutal text-ink text-6xl md:text-8xl">before we scribble.</h1>
            <p className="text-pencil max-w-lg text-lg" style={{ fontFamily: 'var(--font-body)' }}>
              No form. A few absurd scenes to read you, your company&rsquo;s vibe, and what you want
              to make. Then we sketch it together and jump on a call.
            </p>
          </div>
        )}

        {name === 'client' && (
          <div className="flex flex-col gap-4">
            <h2 className="brutal text-ink mb-2 text-4xl">who&rsquo;s scribbling?</h2>
            {(
              [
                ['name', 'your name'],
                ['company', 'company / studio'],
                ['role', 'your role'],
                ['email', 'email'],
                ['links', 'website / socials'],
              ] as const
            ).map(([k, ph]) => (
              <div key={k} className="border-ink flex items-stretch border-2">
                <span className="brutal text-pencil flex w-40 shrink-0 items-center px-3 text-xs uppercase">
                  {ph}
                </span>
                <input
                  value={s.client[k]}
                  onChange={(e) => setS({ ...s, client: { ...s.client, [k]: e.target.value } })}
                  className="ink-block brutal w-full px-4 py-3 text-lg outline-none"
                  style={{ letterSpacing: '-0.01em' }}
                />
              </div>
            ))}
          </div>
        )}

        {name === 'personality' && (
          <div className="flex flex-col gap-8">
            <h2 className="brutal text-ink text-4xl">the kirukal test.</h2>
            {QUESTIONS.map((item, qi) => (
              <fieldset key={item.q} className="flex flex-col gap-3">
                <legend className="brutal text-ink text-2xl">{item.q}</legend>
                <div className="flex flex-wrap gap-3">
                  {item.options.map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => setS({ ...s, quiz: { ...s.quiz, [qi]: o.a } })}
                      className={`pick px-4 py-3 text-base ${s.quiz[qi] === o.a ? 'on' : ''}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            {archetype && (
              <div className="ink-block brutal flex flex-col gap-1 p-5">
                <span className="text-xs uppercase tracking-[0.2em] opacity-70">the read</span>
                <span className="text-3xl">{archetype}</span>
                <span className="text-sm font-normal opacity-80">{ARCHETYPE_BLURB[archetype]}</span>
              </div>
            )}
          </div>
        )}

        {name === 'vibe' && (
          <div className="flex flex-col gap-8">
            <h2 className="brutal text-ink text-4xl">company vibe.</h2>
            <p className="text-pencil" style={{ fontFamily: 'var(--font-body)' }}>
              Drag the knob. Lean into the pole that feels true.
            </p>
            {SLIDERS.map((sl) => (
              <Gauge
                key={sl.key}
                left={sl.left}
                right={sl.right}
                value={s.vibe[sl.key] ?? 50}
                onChange={(v) => setS({ ...s, vibe: { ...s.vibe, [sl.key]: v } })}
              />
            ))}
          </div>
        )}

        {name === 'scribble' && (
          <div className="flex flex-col gap-3">
            <h2 className="brutal text-ink text-4xl">scribble the energy.</h2>
            <p className="text-pencil" style={{ fontFamily: 'var(--font-body)' }}>
              Don&rsquo;t describe it &mdash; draw the feeling of your idea. Rough is the point.
            </p>
            <div className="border-ink h-72 border-2">
              <ScribbleCanvas
                heightClass="h-full"
                onCapture={(d) => setS((prev) => ({ ...prev, scribble: d }))}
              />
            </div>
          </div>
        )}

        {name === 'product' && (
          <div className="flex flex-col gap-5">
            <h2 className="brutal text-ink text-4xl">what do you want to make?</h2>
            {PRODUCT_FIELDS.map((f) => (
              <label key={f.key} className="flex flex-col gap-2">
                <span className="brutal text-ink text-lg">{f.label}</span>
                <textarea
                  rows={2}
                  value={s.product[f.key] ?? ''}
                  onChange={(e) =>
                    setS({ ...s, product: { ...s.product, [f.key]: e.target.value } })
                  }
                  className="border-ink text-ink w-full resize-none border-2 px-4 py-2 text-lg outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </label>
            ))}
          </div>
        )}

        {name === 'summary' && (
          <div className="flex flex-col gap-5">
            <h2 className="brutal text-ink text-5xl">the read.</h2>
            <p className="brutal text-ink text-2xl">
              {s.client.name || 'this kirukan'}
              {s.client.company ? ` · ${s.client.company}` : ''}
            </p>
            {archetype && (
              <div className="ink-block brutal p-5">
                <span className="text-3xl">{archetype}</span>
                <span className="block text-sm font-normal opacity-80">
                  {ARCHETYPE_BLURB[archetype]}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {SLIDERS.map((sl) => (
                <div
                  key={sl.key}
                  className="brutal text-ink flex items-center gap-3 text-xs uppercase"
                >
                  <span className="w-24 text-right">{sl.left}</span>
                  <span className="border-ink relative h-2 flex-1 border">
                    <span
                      className="ink-block absolute inset-y-0 left-0"
                      style={{ width: `${s.vibe[sl.key] ?? 50}%` }}
                    />
                  </span>
                  <span className="w-24">{sl.right}</span>
                </div>
              ))}
            </div>
            {s.scribble && (
              // biome-ignore lint/performance/noImgElement: local data-URL scribble preview, not a network image
              <img
                src={s.scribble}
                alt="idea scribble"
                className="border-ink max-h-48 w-full border-2 object-contain"
              />
            )}
            <ul
              className="flex flex-col gap-1 text-base"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {PRODUCT_FIELDS.map((f) =>
                s.product[f.key] ? (
                  <li key={f.key} className="text-ink">
                    <span className="text-pencil">{f.label.replace(/\?.*/, '')}:</span>{' '}
                    {s.product[f.key]}
                  </li>
                ) : null,
              )}
            </ul>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/proposals/new"
                className="ink-block brutal inline-flex items-center gap-2 px-5 py-3 text-lg"
              >
                start the scribble proposal <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                className="dashed brutal text-ink px-5 py-3 text-lg"
                onClick={() => alert('Collaborative call booking lands with the auth+DB slice.')}
              >
                book a collaborative call
              </button>
            </div>
            <p className="text-pencil text-xs" style={{ fontFamily: 'var(--font-body)' }}>
              Saved locally only (no account yet). A real intake record comes with the auth+DB
              slice.
            </p>
          </div>
        )}
      </section>

      {/* nav */}
      <footer className="flex items-center justify-between px-6 pb-8 md:px-10">
        <button
          type="button"
          className="dashed brutal text-ink px-4 py-2 text-base uppercase"
          style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
          onClick={() => setStep((n) => Math.max(0, n - 1))}
        >
          &larr; back
        </button>
        {step < last ? (
          <button
            type="button"
            className="arrow-btn"
            aria-label="next"
            onClick={() => setStep((n) => n + 1)}
          >
            &rarr;
          </button>
        ) : (
          <Link href="/" className="dashed brutal text-ink px-4 py-2 text-base uppercase">
            done
          </Link>
        )}
      </footer>
    </main>
  );
}
