import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { EyePattern } from '@/components/EyeBall';
import LifecycleRail from '@/components/LifecycleRail';
import NewUniverse from '@/components/NewUniverse';
import RiggedGlyph from '@/components/RiggedGlyph';
import TodoList from '@/components/TodoList';
import { listTodos, listUniverses } from '@/db/repo';
import { isAdmin } from '@/lib/auth-server';
import { LIFECYCLE } from '@/lib/lifecycle-model';

// Founder cockpit — DB-backed, admin only. Reads live each request (todos + states change often).
export const dynamic = 'force-dynamic';

export const metadata = { title: 'studio dashboard — kiruk portal' };

export default async function DashboardPage() {
  if (!(await isAdmin())) redirect('/sign-in');

  const [universes, todos] = await Promise.all([listUniverses(), listTodos()]);
  // front-of-funnel universes that are still cold — the nudge list.
  const needsAttention = universes.filter((u) => u.state === 'lead' || u.state === 'intake');

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-10 flex items-center gap-3">
        <Link href="/" className="face-mark border-none" aria-label="home">
          <RiggedGlyph pattern="constellation" size={32} blink />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">studio dashboard</h1>
          <p className="handwritten text-pencil text-sm">the whole studio, one eye open.</p>
        </div>
      </header>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-10">
          {/* ── universes ─────────────────────────────────────────────── */}
          <section className="flex flex-col gap-4">
            <h2 className="brutal text-ink text-2xl">universes</h2>
            {universes.length === 0 ? (
              <div className="dashed flex flex-col items-center gap-3 p-10 text-center">
                <RiggedGlyph pattern="ring" open={false} size={40} />
                <p className="handwritten text-pencil text-lg">
                  no universes yet — open one on the right <span aria-hidden="true">→</span>
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {universes.map((u) => {
                  const meta = LIFECYCLE[u.state];
                  return (
                    <Link
                      key={u.slug}
                      href={`/universes/${u.slug}`}
                      className="sketch-border flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="brutal text-ink text-2xl">{u.title}</span>
                        <span className="handwritten text-pencil text-sm">{meta.label}</span>
                      </div>
                      <LifecycleRail state={u.state} size={20} showLabels={false} />
                      <span className="handwritten text-pencil text-xs">{u.slug}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── what needs attention ──────────────────────────────────── */}
          <section className="flex flex-col gap-3">
            <h2 className="brutal text-ink text-2xl">what needs attention</h2>
            {needsAttention.length === 0 ? (
              <p className="handwritten text-pencil text-lg">
                nothing cold up front. the funnel's warm.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {needsAttention.map((u) => (
                  <li key={u.slug}>
                    <Link
                      href={`/universes/${u.slug}`}
                      className="dashed handwritten text-ink flex items-center gap-2 p-3 text-lg hover:-translate-y-0.5"
                    >
                      <RiggedGlyph
                        pattern={LIFECYCLE[u.state].pattern as EyePattern}
                        size={20}
                        open={false}
                      />
                      <span className="flex-1">{u.title}</span>
                      <span className="text-pencil text-sm">
                        {u.state === 'lead' ? 'needs first contact →' : 'needs a brief →'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* ── create + todo ───────────────────────────────────────────── */}
        <aside className="flex flex-col gap-8">
          <NewUniverse />
          <div className="flex flex-col gap-4">
            <h2 className="brutal text-ink text-2xl">todo</h2>
            <TodoList initial={todos} />
          </div>
        </aside>
      </div>
    </main>
  );
}
