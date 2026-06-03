import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContractBuilder from '@/components/ContractBuilder';
import LifecycleRail from '@/components/LifecycleRail';
import RiggedGlyph from '@/components/RiggedGlyph';
import { getView } from '@/lib/lifecycle';

export const dynamic = 'force-dynamic';

export default async function ContractPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = await getView(slug);
  if (!u) notFound();

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-rule" aria-hidden="true" />
      <header className="relative mb-6 flex items-center gap-3">
        <Link
          href={`/universes/${slug}`}
          className="face-mark border-none"
          aria-label="back to cockpit"
        >
          <RiggedGlyph pattern="arrow" look="left" size={30} />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">{u.title} — contract</h1>
          <p className="handwritten text-pencil text-sm">sign → engaged · {slug}</p>
        </div>
      </header>
      <div className="relative mb-6">
        <LifecycleRail state={u.state} size={22} />
      </div>
      <section className="relative">
        <ContractBuilder slug={u.slug} />
      </section>
    </main>
  );
}
