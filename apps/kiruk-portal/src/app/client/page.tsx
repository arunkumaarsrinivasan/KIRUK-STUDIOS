import Link from 'next/link';
import { redirect } from 'next/navigation';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import SignOutButton from '@/components/SignOutButton';
import { universesForUser } from '@/db/repo';
import { currentUser } from '@/lib/auth-server';
import { LIFECYCLE } from '@/lib/lifecycle-model';

// /client — the client portal index. Auth-gated, read-only. Lists the universes shared with the
// signed-in client as sketch-border cards. The founder-facing /universes board stays separate.
export const dynamic = 'force-dynamic';

export default async function ClientHome() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const universes = await universesForUser(user.id);

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-10 flex flex-wrap items-center gap-3">
        <span className="face-mark border-none" aria-hidden="true">
          <RiggedGlyph pattern="portal" size={30} blink blinkDelay={1} />
        </span>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">your universes</h1>
          <p className="handwritten text-pencil text-sm">
            read-only — the worlds kiruk is building with you
          </p>
        </div>
        <div className="ml-auto">
          <SignOutButton />
        </div>
      </header>

      {universes.length === 0 ? (
        <section className="sketch-border dashed relative flex flex-col items-center gap-3 p-10 text-center">
          <RiggedGlyph pattern="ring" size={44} />
          <p className="handwritten text-ink text-lg">no universes shared with you yet</p>
          <p className="handwritten text-pencil max-w-sm text-sm">
            when kiruk opens a world to you, it shows up here — scribble first, handoff last.
          </p>
        </section>
      ) : (
        <section className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {universes.map((u) => {
            const cur = LIFECYCLE[u.state];
            return (
              <Link
                key={u.id}
                href={`/client/${u.slug}`}
                className="sketch-border flex flex-col gap-4 p-5 transition-transform hover:-translate-y-0.5"
                aria-label={`open ${u.title}`}
              >
                <div className="flex items-start gap-2.5">
                  <RiggedGlyph pattern={cur.pattern as 'solid'} size={26} />
                  <div className="leading-tight">
                    <h2 className="brutal text-ink text-2xl">{u.title}</h2>
                    <p className="handwritten text-pencil text-xs">
                      {u.slug} · now: <span className="text-ink">{cur.label}</span>
                    </p>
                  </div>
                </div>
                <LifecycleRail state={u.state} size={20} showLabels={false} />
                <span className="handwritten text-pencil text-xs">{cur.blurb} →</span>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}
