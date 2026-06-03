import Link from 'next/link';
import { redirect } from 'next/navigation';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import { listTransitions, universesForUser } from '@/db/repo';
import { currentUser } from '@/lib/auth-server';
import { LIFECYCLE } from '@/lib/lifecycle-model';

// /client/<slug> — a single shared universe, read-only for the client. Shows the current state,
// the lifecycle rail, the transition history, and one action: mark up the proposal (mark-back).
// Access is enforced via universesForUser — if the world isn't theirs, we say so softly (no 404).
export const dynamic = 'force-dynamic';

function formatAt(at: Date): string {
  return at.toISOString().replace('T', ' ').slice(0, 16);
}

export default async function ClientUniverse({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const mine = await universesForUser(user.id);
  const u = mine.find((x) => x.slug === slug);

  if (!u) {
    return (
      <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
        <div className="bg-grid bg-dots" aria-hidden="true" />
        <header className="relative mb-10 flex items-center gap-3">
          <Link href="/client" className="face-mark border-none" aria-label="your universes">
            <RiggedGlyph pattern="arrow" look="left" size={30} />
          </Link>
          <h1 className="brutal text-ink text-3xl">no access</h1>
        </header>
        <section className="sketch-border dashed relative flex flex-col items-center gap-3 p-10 text-center">
          <RiggedGlyph pattern="slit" size={44} open={false} />
          <p className="handwritten text-ink text-lg">
            you don&rsquo;t have access to this universe
          </p>
          <p className="handwritten text-pencil max-w-sm text-sm">
            it may not be shared with you, or the link is off. head back to your worlds.
          </p>
          <Link
            href="/client"
            className="sketch-button mt-2 text-sm"
            aria-label="back to your universes"
          >
            back to your universes
          </Link>
        </section>
      </main>
    );
  }

  const cur = LIFECYCLE[u.state];
  const transitions = await listTransitions(u.id);
  // newest first — the latest move sits at the top of the log.
  const history = [...transitions].reverse();

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-8 flex items-center gap-3">
        <Link href="/client" className="face-mark border-none" aria-label="your universes">
          <RiggedGlyph pattern="arrow" look="left" size={30} />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">{u.title}</h1>
          <p className="handwritten text-pencil text-sm">
            {u.slug} · now: <span className="text-ink">{cur.label}</span> — {cur.blurb}
          </p>
        </div>
      </header>

      <section className="relative flex flex-col gap-8">
        <div className="sketch-border p-6">
          <LifecycleRail state={u.state} />
        </div>

        {/* mark-back — the one thing a client can do: scribble on the proposal */}
        <Link
          href={`/universes/${u.slug}/review`}
          className="eye-btn eye-next gap-3 self-start px-6 py-3"
          aria-label="mark up the proposal"
        >
          <span className="handwritten text-ink text-lg">mark up the proposal</span>
          <RiggedGlyph pattern="portal" look="right" size={30} />
        </Link>

        {/* read-only history */}
        <div className="flex flex-col gap-3">
          <h2 className="brutal text-ink text-2xl">history</h2>
          {history.length === 0 ? (
            <p className="handwritten text-pencil text-sm">no transitions recorded yet.</p>
          ) : (
            <ol className="flex flex-col gap-1.5">
              {history.map((t) => (
                <li key={t.id} className="handwritten text-ink flex flex-wrap gap-x-2 text-sm">
                  <span className="text-pencil">{formatAt(t.at)}</span>
                  <span>
                    {t.fromState} → <strong>{t.toState}</strong>
                  </span>
                  <span className="text-pencil">
                    · {t.trigger} · {t.why}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  );
}
