import Link from 'next/link';

// Lifecycle states (client-lifecycle spec). Slice 1 shows the map; the scribble-proposal
// step is live. Other steps land in later slices (dashboard, persistence, auth, collab).
const lifecycle = [
  { key: 'lead', label: 'lead', done: false },
  { key: 'intake', label: 'intake', done: false },
  { key: 'proposal', label: 'proposal', done: false, live: true },
  { key: 'engaged', label: 'engaged', done: false },
  { key: 'shipping', label: 'shipping', done: false },
  { key: 'archived', label: 'handoff', done: false },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center gap-10 px-6">
      <header>
        <p className="handwritten text-pencil mb-2 text-sm tracking-wide">
          kiruk portal — first scribble to handoff
        </p>
        <h1 className="font-wordmark text-ink text-5xl md:text-7xl">scribble desk</h1>
        <p className="handwritten text-pencil mt-4 max-w-md text-lg">
          A new way to make a proposal: don&rsquo;t write it — <em>scribble</em> it. Sketch the
          idea, hand it to the client, get their marks back.
        </p>
      </header>

      <nav aria-label="Client lifecycle" className="flex flex-wrap items-center gap-2">
        {lifecycle.map((s, i) => (
          <span key={s.key} className="flex items-center gap-2">
            <span
              className="handwritten rounded-md px-3 py-1 text-base"
              style={{
                color: s.live ? 'var(--paper)' : 'var(--pencil)',
                background: s.live ? 'var(--ink)' : 'transparent',
                border: s.live ? '2px solid var(--ink)' : '2px dashed var(--rule)',
                transform: `rotate(${i % 2 ? 0.5 : -0.5}deg)`,
              }}
            >
              {s.label}
            </span>
            {i < lifecycle.length - 1 && <span className="text-rule">&rarr;</span>}
          </span>
        ))}
      </nav>

      <div className="flex flex-wrap gap-3">
        <Link href="/onboard" className="sketch-button text-lg">
          onboard a client <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href="/proposals/new" className="sketch-button text-lg">
          jump to a scribble proposal
        </Link>
      </div>
    </main>
  );
}
