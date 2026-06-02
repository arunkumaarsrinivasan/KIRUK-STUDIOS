import Link from 'next/link';
import { notFound } from 'next/navigation';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import ShareReview from '@/components/ShareReview';
import TransitionControls from '@/components/TransitionControls';
import {
  LIFECYCLE,
  latestProposalScribble,
  readUniverse,
  STATES,
  stateIndex,
} from '@/lib/lifecycle';

export const dynamic = 'force-dynamic';

export default async function UniverseCockpit({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = await readUniverse(slug);
  if (!u) notFound();

  const cur = LIFECYCLE[u.state];
  const reviewable = latestProposalScribble(u.scribbles);
  const marksCount = u.scribbles.filter((s) => s.includes('marks')).length;

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-8 flex items-center gap-3">
        <Link href="/universes" className="face-mark border-none" aria-label="all universes">
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

        {/* phase actions — builders for the artifacts relevant to where the universe is now */}
        <div className="flex flex-wrap gap-3">
          {u.state === 'lead' ? (
            <Link
              href={`/universes/${u.slug}/lead`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="capture the lead"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['lead.md'] ? 're-capture lead' : 'capture lead'}
              </span>
              <RiggedGlyph pattern="ring" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) <= stateIndex('intake') ? (
            <Link
              href={`/universes/${u.slug}/intake`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="structured intake"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['intake.md'] ? 're-do intake' : 'structured intake'}
              </span>
              <RiggedGlyph pattern="solid" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) <= stateIndex('proposal') ? (
            <Link
              href={`/universes/${u.slug}/proposal`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="scribble the proposal"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['proposal.md'] ? 're-scribble proposal' : 'scribble proposal'}
              </span>
              <RiggedGlyph pattern="portal" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) >= stateIndex('proposal') &&
          stateIndex(u.state) <= stateIndex('engaged') ? (
            <Link
              href={`/universes/${u.slug}/contract`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="draft the contract"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['contract.md'] ? 're-draft contract' : 'draft contract'}
              </span>
              <RiggedGlyph pattern="slit" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) >= stateIndex('engaged') ? (
            <Link
              href={`/universes/${u.slug}/invoice`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="issue an invoice"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['invoice.md'] ? 're-issue invoice' : 'issue invoice'}
              </span>
              <RiggedGlyph pattern="constellation" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) >= stateIndex('engaged') &&
          stateIndex(u.state) <= stateIndex('shipping') ? (
            <Link
              href={`/universes/${u.slug}/shipping`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="shipping / spec"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['spec.md'] ? 'spec ✓' : 'spec / shipping'}
              </span>
              <RiggedGlyph pattern="hatch" look="right" size={26} />
            </Link>
          ) : null}
          {stateIndex(u.state) >= stateIndex('shipping') ? (
            <Link
              href={`/universes/${u.slug}/handoff`}
              className="eye-btn eye-next gap-3 px-5 py-2.5"
              aria-label="handoff"
            >
              <span className="handwritten text-ink text-base">
                {u.artifacts['handoff.md'] ? 're-handoff' : 'handoff + archive'}
              </span>
              <RiggedGlyph pattern="star" look="right" size={26} />
            </Link>
          ) : null}
        </div>

        {reviewable ? <ShareReview slug={u.slug} marksCount={marksCount} /> : null}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* advance */}
          <div className="flex flex-col gap-4">
            <h2 className="brutal text-ink text-2xl">move it forward</h2>
            <TransitionControls
              slug={u.slug}
              state={u.state}
              scribbleCount={u.scribbleCount}
              artifacts={u.artifacts}
            />
            <p className="handwritten text-pencil text-xs">scribbles attached: {u.scribbleCount}</p>
          </div>

          {/* artifacts */}
          <div className="flex flex-col gap-4">
            <h2 className="brutal text-ink text-2xl">artifacts</h2>
            <ul className="flex flex-col gap-2">
              {STATES.map((s) => {
                const m = LIFECYCLE[s];
                if (!m.artifact) return null;
                const has = u.artifacts[m.artifact];
                return (
                  <li key={s} className="flex items-center gap-2.5">
                    <RiggedGlyph pattern={m.pattern as 'solid'} open={!!has} size={22} />
                    <span
                      className="handwritten text-ink text-base"
                      style={{ opacity: has ? 1 : 0.5 }}
                    >
                      {m.artifact}
                    </span>
                    <span className="handwritten text-pencil text-xs">
                      {has ? '✓ present' : '— missing'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* transition log */}
        <div className="flex flex-col gap-3">
          <h2 className="brutal text-ink text-2xl">history</h2>
          {u.transitions.length === 0 ? (
            <p className="handwritten text-pencil text-sm">no transitions recorded yet.</p>
          ) : (
            <ol className="flex flex-col gap-1.5">
              {u.transitions.map((t, i) => (
                <li
                  key={`${t.when}-${t.from}-${t.to}`}
                  className="handwritten text-ink flex flex-wrap gap-x-2 text-sm"
                >
                  <span className="text-pencil">{t.when.replace('T', ' ').slice(0, 16)}</span>
                  <span>
                    {t.from} → <strong>{t.to}</strong>
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
