import { notFound } from 'next/navigation';
import ReviewBuilder from '@/components/ReviewBuilder';
import RiggedGlyph from '@/components/RiggedGlyph';
import { latestProposalScribble, readUniverse } from '@/lib/lifecycle';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'review the scribble — kiruk' };

// Public-ish review link (no auth yet — Slice 3 will gate it). A client opens this to mark back
// on the proposal scribble.
export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = await readUniverse(slug);
  if (!u) notFound();

  const original = latestProposalScribble(u.scribbles);
  const backgroundSrc = original ? `/api/scribble/${slug}/${encodeURIComponent(original)}` : null;

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-sparse" aria-hidden="true" />
      <header className="relative mb-6 flex items-center gap-3">
        <span className="face-mark border-none" aria-hidden="true">
          <RiggedGlyph pattern="portal" size={30} blink />
        </span>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">{u.title} — your turn</h1>
          <p className="handwritten text-pencil text-sm">mark back on the scribble proposal</p>
        </div>
      </header>
      <section className="relative">
        <ReviewBuilder slug={u.slug} backgroundSrc={backgroundSrc} />
      </section>
    </main>
  );
}
