import Link from 'next/link';
import { notFound } from 'next/navigation';
import InvoiceBuilder from '@/components/InvoiceBuilder';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import { readUniverse, stateIndex } from '@/lib/lifecycle';

export const dynamic = 'force-dynamic';

export default async function InvoicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = await readUniverse(slug);
  if (!u) notFound();

  const tooEarly = stateIndex(u.state) < stateIndex('engaged');

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-graph" aria-hidden="true" />
      <header className="relative mb-6 flex items-center gap-3">
        <Link
          href={`/universes/${slug}`}
          className="face-mark border-none"
          aria-label="back to cockpit"
        >
          <RiggedGlyph pattern="arrow" look="left" size={30} />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">{u.title} — invoice</h1>
          <p className="handwritten text-pencil text-sm">figures stay private · {slug}</p>
        </div>
      </header>
      <div className="relative mb-6">
        <LifecycleRail state={u.state} size={22} />
      </div>
      <section className="relative">
        {tooEarly ? (
          <p className="handwritten text-pencil text-lg">
            Invoice after the contract is signed (state <strong>engaged</strong> or later).
            Currently: {u.state}.
          </p>
        ) : (
          <InvoiceBuilder slug={u.slug} />
        )}
      </section>
    </main>
  );
}
