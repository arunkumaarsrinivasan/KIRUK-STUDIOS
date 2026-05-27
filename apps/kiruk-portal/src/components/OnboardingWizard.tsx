'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ScribbleCanvas from './ScribbleCanvas';

// Client onboarding — kiruk SKETCH style, interaction-first (Absurdly = interaction ref only).
// No question lists. You ACT: drag a token across a compass to find your archetype, drag chunky
// gauges for vibe, scribble the idea. NO backend — state in localStorage; persistence + client
// mark-back land with later slices.

type Archetype = 'Maker' | 'Dreamer' | 'Rebel' | 'Builder' | 'Wanderer';

const ARCHETYPE_BLURB: Record<Archetype, string> = {
  Maker: 'hands-first; texture, craft, the joy of building the thing.',
  Dreamer: 'idea-first; chasing what does not exist yet.',
  Rebel: 'rule-first (to break it); allergic to "it has been done".',
  Builder: 'system-first; useful, durable, loved in daily use.',
  Wanderer: 'curiosity-first; the work should take you somewhere.',
};

// 5 archetypes placed in a pentagon around the compass centre.
const ANCHORS: { a: Archetype; x: number; y: number }[] = (
  ['Dreamer', 'Maker', 'Rebel', 'Builder', 'Wanderer'] as Archetype[]
).map((a, i) => {
  const ang = ((-90 + i * 72) * Math.PI) / 180;
  return { a, x: 0.5 + Math.cos(ang) * 0.4, y: 0.5 + Math.sin(ang) * 0.4 };
});

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
  pick: Archetype | null;
  compass: { x: number; y: number };
  vibe: Record<string, number>;
  scribble: string | null;
  product: Record<string, string>;
};

const EMPTY: State = {
  client: { name: '', company: '', role: '', email: '', links: '' },
  pick: null,
  compass: { x: 0.5, y: 0.5 },
  vibe: Object.fromEntries(SLIDERS.map((s) => [s.key, 50])),
  scribble: null,
  product: Object.fromEntries(PRODUCT_FIELDS.map((f) => [f.key, ''])),
};

const STEPS = ['intro', 'client', 'personality', 'vibe', 'scribble', 'product', 'summary'] as const;
const KEY = 'kiruk-onboard';

function nearest(p: { x: number; y: number }): Archetype {
  let best: Archetype = 'Dreamer';
  let d = Number.POSITIVE_INFINITY;
  for (const an of ANCHORS) {
    const dd = (an.x - p.x) ** 2 + (an.y - p.y) ** 2;
    if (dd < d) {
      d = dd;
      best = an.a;
    }
  }
  return best;
}

// drag-compass — drag `me` toward whatever pulls you; nearest archetype is the live read.
function ArchetypeCompass({
  pos,
  onMove,
}: {
  pos: { x: number; y: number };
  onMove: (p: { x: number; y: number }, a: Archetype) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const set = (cx: number, cy: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = {
      x: Math.max(0.04, Math.min(0.96, (cx - r.left) / r.width)),
      y: Math.max(0.06, Math.min(0.94, (cy - r.top) / r.height)),
    };
    onMove(p, nearest(p));
  };
  const live = nearest(pos);
  return (
    <div
      ref={ref}
      className="sketch-border relative mx-auto aspect-square w-full max-w-md cursor-grab touch-none active:cursor-grabbing"
      onPointerDown={(e) => {
        dragging.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* synthetic */
        }
        set(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (dragging.current) set(e.clientX, e.clientY);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {ANCHORS.map((an) => (
          <line
            key={an.a}
            x1="50"
            y1="50"
            x2={an.x * 100}
            y2={an.y * 100}
            stroke="var(--rule)"
            strokeWidth="0.5"
          />
        ))}
        <line
          x1="50"
          y1="50"
          x2={pos.x * 100}
          y2={pos.y * 100}
          stroke="var(--ink)"
          strokeWidth="0.9"
        />
      </svg>
      {ANCHORS.map((an) => (
        <span
          key={an.a}
          className="handwritten absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-1 text-base"
          style={{
            left: `${an.x * 100}%`,
            top: `${an.y * 100}%`,
            fontWeight: live === an.a ? 700 : 400,
            color: live === an.a ? 'var(--ink)' : 'var(--pencil)',
          }}
        >
          {an.a.toLowerCase()}
        </span>
      ))}
      <span
        className="ink-block absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-xs"
        style={{
          left: `${pos.x * 100}%`,
          top: `${pos.y * 100}%`,
          transform: 'translate(-50%, -50%) rotate(-6deg)',
        }}
      >
        me
      </span>
    </div>
  );
}

// chunky pointer-drag gauge — drag the knob between two poles.
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
      <div className="handwritten text-ink flex items-end justify-between">
        <span
          style={{
            fontSize: `${0.95 + (1 - value / 100) * 0.8}rem`,
            opacity: 0.4 + (1 - value / 100) * 0.6,
          }}
        >
          {left}
        </span>
        <span
          style={{
            fontSize: `${0.95 + (value / 100) * 0.8}rem`,
            opacity: 0.4 + (value / 100) * 0.6,
          }}
        >
          {right}
        </span>
      </div>
      <div
        ref={ref}
        className="sketch-border relative mt-2 h-12 cursor-ew-resize touch-none"
        onPointerDown={(e) => {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            /* synthetic */
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
          style={{ left: `calc(${value}% - 14px)`, transform: 'translateY(-50%) rotate(-3deg)' }}
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
  const archetype = s.pick;

  return (
    <main className="grid-paper relative min-h-[100svh] w-full">
      <header className="flex items-center gap-3 px-6 pt-6 md:px-10">
        <span className="face-mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
            <line x1="8" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <div className="leading-none">
          <p className="brutal text-ink text-xl">kiruk</p>
          <p className="handwritten text-pencil text-[0.7rem]">believe in absurdism</p>
        </div>
        <div className="dots ml-auto">
          {STEPS.map((st, i) => (
            <span key={st} className={`dot ${i <= step ? 'on' : ''}`} />
          ))}
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-10 md:px-10">
        {name === 'intro' && (
          <div className="flex flex-col gap-5">
            <h1 className="brutal text-ink text-6xl md:text-8xl">before we scribble.</h1>
            <p className="handwritten text-pencil max-w-lg text-xl">
              No form. A few moves to read you, your company&rsquo;s vibe, and what you want to
              make. Drag, scribble, lean. Then we sketch it together and jump on a call.
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
              <div key={k} className="sketch-border flex items-stretch">
                <span className="handwritten text-pencil flex w-40 shrink-0 items-center px-3 text-sm">
                  {ph}
                </span>
                <input
                  value={s.client[k]}
                  onChange={(e) => setS({ ...s, client: { ...s.client, [k]: e.target.value } })}
                  className="ink-block handwritten w-full px-4 py-3 text-lg outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {name === 'personality' && (
          <div className="flex flex-col gap-5">
            <h2 className="brutal text-ink text-4xl">drag yourself in.</h2>
            <p className="handwritten text-pencil text-lg">
              Drag <strong>me</strong> toward whatever pulls you. No right answer &mdash; the read
              updates as you move.
            </p>
            <ArchetypeCompass
              pos={s.compass}
              onMove={(p, a) => setS({ ...s, compass: p, pick: a })}
            />
            {archetype && (
              <div className="sketch-border flex flex-col gap-1 p-5">
                <span className="handwritten text-pencil text-sm">the read</span>
                <span className="brutal text-ink text-3xl">{archetype}</span>
                <span className="handwritten text-pencil text-base">
                  {ARCHETYPE_BLURB[archetype]}
                </span>
              </div>
            )}
          </div>
        )}

        {name === 'vibe' && (
          <div className="flex flex-col gap-8">
            <h2 className="brutal text-ink text-4xl">company vibe.</h2>
            <p className="handwritten text-pencil text-lg">
              Drag the knob. Lean into what feels true.
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
            <p className="handwritten text-pencil text-lg">
              Don&rsquo;t describe it &mdash; draw the feeling of your idea. Rough is the point.
            </p>
            <div className="sketch-border h-72">
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
                <span className="handwritten text-ink text-lg">{f.label}</span>
                <textarea
                  rows={2}
                  value={s.product[f.key] ?? ''}
                  onChange={(e) =>
                    setS({ ...s, product: { ...s.product, [f.key]: e.target.value } })
                  }
                  className="sketch-border handwritten text-ink w-full resize-none px-4 py-2 text-lg outline-none"
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
              <div className="sketch-border p-5">
                <span className="brutal text-ink text-3xl">{archetype}</span>
                <span className="handwritten text-pencil block text-base">
                  {ARCHETYPE_BLURB[archetype]}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              {SLIDERS.map((sl) => (
                <div key={sl.key} className="handwritten text-ink flex items-center gap-3 text-sm">
                  <span className="w-24 text-right">{sl.left}</span>
                  <span className="sketch-border relative h-2 flex-1">
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
                className="sketch-border max-h-48 w-full object-contain"
              />
            )}
            <ul className="handwritten flex flex-col gap-1 text-base">
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
              <Link href="/proposals/new" className="sketch-button handwritten text-lg">
                start the scribble proposal <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                className="dashed handwritten text-ink rounded-xl px-5 py-3 text-lg"
                onClick={() => alert('Collaborative call booking lands with the auth+DB slice.')}
              >
                book a collaborative call
              </button>
            </div>
            <p className="handwritten text-pencil text-xs">
              Saved locally only (no account yet). A real intake record comes with the auth+DB
              slice.
            </p>
          </div>
        )}
      </section>

      <footer className="flex items-center justify-between px-6 pb-8 md:px-10">
        <button
          type="button"
          className="dashed handwritten text-ink rounded-lg px-4 py-2 text-base"
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
          <Link href="/" className="dashed handwritten text-ink rounded-lg px-4 py-2 text-base">
            done
          </Link>
        )}
      </footer>
    </main>
  );
}
