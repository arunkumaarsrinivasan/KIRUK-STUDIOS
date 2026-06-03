import Link from 'next/link';
import type { EyePattern } from '@/components/EyeBall';
import ReactiveEye from '@/components/ReactiveEye';
import RiggedGlyph from '@/components/RiggedGlyph';

// Lifecycle states (client-lifecycle spec) drawn as a row of distinct eyes. The `proposal`
// step is live; earlier eyes are open, later ones not yet opened.
const lifecycle: { key: string; label: string; pattern: EyePattern; live?: boolean }[] = [
  { key: 'lead', label: 'lead', pattern: 'ring' },
  { key: 'intake', label: 'intake', pattern: 'solid' },
  { key: 'proposal', label: 'proposal', pattern: 'portal', live: true },
  { key: 'engaged', label: 'engaged', pattern: 'slit' },
  { key: 'shipping', label: 'shipping', pattern: 'hatch' },
  { key: 'archived', label: 'handoff', pattern: 'constellation' },
];
const liveIndex = lifecycle.findIndex((s) => s.live);

export default function Home() {
  return (
    <main className="bg-paper relative grid min-h-[100svh] w-full place-items-center overflow-hidden px-6">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="absolute left-6 top-6 flex items-center gap-2.5">
        <span className="face-mark border-none" aria-hidden="true">
          <RiggedGlyph pattern="solid" size={30} blink blinkDelay={1.2} />
        </span>
        <span className="brutal text-ink text-xl">kiruk</span>
      </header>

      <nav aria-label="portal" className="absolute right-6 top-6 flex items-center gap-4 md:gap-5">
        <Link
          href="/sign-in"
          className="handwritten text-pencil hover:text-ink text-base underline-offset-4 hover:underline"
        >
          sign in
        </Link>
        <Link
          href="/dashboard"
          className="handwritten text-pencil hover:text-ink text-base underline-offset-4 hover:underline"
        >
          dashboard
        </Link>
        <Link
          href="/client"
          className="handwritten text-pencil hover:text-ink text-base underline-offset-4 hover:underline"
        >
          your universes
        </Link>
      </nav>

      <section className="relative flex w-full max-w-3xl flex-col items-center gap-9 py-16 text-center">
        <ReactiveEye size={300} />

        <div className="flex flex-col items-center gap-4">
          <p className="handwritten text-pencil text-sm tracking-wide">
            kiruk portal &mdash; first scribble to handoff
          </p>
          <h1 className="font-wordmark text-ink text-6xl leading-none md:text-8xl">
            scribble desk
          </h1>
          <p className="handwritten text-pencil max-w-md text-lg">
            A proposal you don&rsquo;t write &mdash; you <em>scribble</em>. Sketch the idea, hand it
            over, get their marks back.
          </p>
        </div>

        <nav
          aria-label="Client lifecycle"
          className="flex flex-wrap items-end justify-center gap-x-5 gap-y-3"
        >
          {lifecycle.map((s, i) => {
            const seen = i <= liveIndex;
            return (
              <span key={s.key} className="flex w-16 flex-col items-center gap-1.5">
                <RiggedGlyph
                  pattern={s.pattern}
                  open={seen}
                  size={s.live ? 34 : 28}
                  blink={seen}
                  blinkDelay={i * 0.8}
                  className={s.live ? 'eye-active' : undefined}
                  style={{ opacity: i < liveIndex ? 0.8 : 1 }}
                />
                <span
                  className="handwritten text-xs"
                  style={{
                    color: s.live ? 'var(--ink)' : 'var(--pencil)',
                    fontWeight: s.live ? 700 : 400,
                  }}
                >
                  {s.label}
                </span>
              </span>
            );
          })}
        </nav>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/onboard"
            className="eye-btn eye-next gap-3 px-6 py-3"
            aria-label="onboard a client"
          >
            <span className="handwritten text-ink text-lg">onboard a client</span>
            <RiggedGlyph pattern="solid" look="right" size={30} />
          </Link>
          <Link
            href="/dashboard"
            className="eye-btn eye-next gap-3 px-6 py-3"
            aria-label="open the studio dashboard"
          >
            <span className="handwritten text-ink text-lg">dashboard</span>
            <RiggedGlyph pattern="slit" look="right" size={30} />
          </Link>
          <Link
            href="/proposals/new"
            className="eye-btn gap-3 px-6 py-3"
            aria-label="jump to a scribble proposal"
          >
            <span className="handwritten text-ink text-lg">jump to a scribble proposal</span>
            <RiggedGlyph pattern="hatch" size={28} />
          </Link>
          <Link href="/eye-3d" className="eye-btn gap-3 px-6 py-3" aria-label="see the eye in 3D">
            <span className="handwritten text-ink text-lg">see the eye in 3D</span>
            <RiggedGlyph pattern="portal" size={28} />
          </Link>
        </div>
      </section>

      <footer className="absolute bottom-5 left-0 right-0">
        <div className="eye-footer" aria-hidden="true">
          <RiggedGlyph pattern="constellation" size={20} blink blinkDelay={0.4} />
          <RiggedGlyph pattern="ring" size={18} blink blinkDelay={1.6} />
          <RiggedGlyph pattern="portal" size={18} blink blinkDelay={2.8} />
        </div>
        <p className="handwritten text-pencil mt-1 text-center text-xs">
          kiruk watches the work — first scribble to handoff
        </p>
      </footer>
    </main>
  );
}
