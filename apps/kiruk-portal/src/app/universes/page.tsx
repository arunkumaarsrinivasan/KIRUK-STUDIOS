import Link from 'next/link';
import EyeStatus from '@/components/EyeStatus';
import LifecycleRail from '@/components/LifecycleRail';
import NewUniverse from '@/components/NewUniverse';
import RiggedGlyph from '@/components/RiggedGlyph';
import { LIFECYCLE, listUniverses } from '@/lib/lifecycle';

// reads the filesystem each request — never statically cache.
export const dynamic = 'force-dynamic';

export const metadata = { title: 'universes — kiruk portal' };

export default async function UniversesPage() {
  const universes = await listUniverses();

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-8 flex items-center gap-3">
        <Link href="/" className="face-mark border-none" aria-label="home">
          <RiggedGlyph pattern="solid" size={30} blink />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">universes</h1>
          <p className="handwritten text-pencil text-sm">first scribble to handoff</p>
        </div>
      </header>

      <section className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col gap-4">
          {universes.length === 0 ? (
            <div className="sketch-border flex flex-col items-center gap-3 p-10 text-center">
              <EyeStatus mood="empty" size={40} />
              <p className="handwritten text-pencil text-lg">
                No universes yet. Open one to start the flow.
              </p>
            </div>
          ) : (
            universes.map((u) => {
              const meta = LIFECYCLE[u.state];
              return (
                <Link
                  key={u.slug}
                  href={`/universes/${u.slug}`}
                  className="sketch-border flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="brutal text-ink text-2xl">{u.title}</span>
                    <span className="handwritten text-pencil text-sm">
                      {meta.label} · {meta.blurb}
                    </span>
                  </div>
                  <LifecycleRail state={u.state} size={22} showLabels={false} />
                  <span className="handwritten text-pencil text-xs">
                    {u.slug}
                    {u.needsInit ? ' · ⚠ no state.md (inferred)' : ''}
                  </span>
                </Link>
              );
            })
          )}
        </div>

        <aside>
          <NewUniverse />
        </aside>
      </section>
    </main>
  );
}
