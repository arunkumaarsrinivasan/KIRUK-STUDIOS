import Link from 'next/link';
import { notFound } from 'next/navigation';
import HandoffBuilder from '@/components/HandoffBuilder';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import { readUniverse, stateIndex } from '@/lib/lifecycle';

export const dynamic = 'force-dynamic';

export default async function HandoffPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = await readUniverse(slug);
  if (!u) notFound();

  const tooEarly = stateIndex(u.state) < stateIndex('shipping');

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-horizon" aria-hidden="true" />
      <header className="relative mb-6 flex items-center gap-3">
        <Link
          href={`/universes/${slug}`}
          className="face-mark border-none"
          aria-label="back to cockpit"
        >
          <RiggedGlyph pattern="arrow" look="left" size={30} />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">{u.title} — handoff</h1>
          <p className="handwritten text-pencil text-sm">ship → archive · {slug}</p>
        </div>
      </header>
      <div className="relative mb-6">
        <LifecycleRail state={u.state} size={22} />
      </div>
      <section className="relative">
        {tooEarly ? (
          <p className="handwritten text-pencil text-lg">
            Handoff happens from <strong>shipping</strong>. Currently: {u.state}.
          </p>
        ) : (
          <HandoffBuilder slug={u.slug} />
        )}
      </section>
    </main>
  );
}
