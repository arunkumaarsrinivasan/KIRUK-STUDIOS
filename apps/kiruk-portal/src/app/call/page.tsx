import Link from 'next/link';
import CallForm from '@/components/CallForm';
import RiggedGlyph from '@/components/RiggedGlyph';

export const metadata = { title: 'book a collaborative call — kiruk' };

export default function CallPage() {
  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />
      <header className="relative mb-6 flex items-center gap-3">
        <Link href="/" className="face-mark border-none" aria-label="home">
          <RiggedGlyph pattern="solid" size={30} blink />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">book a collaborative call</h1>
          <p className="handwritten text-pencil text-sm">we scribble together, not at you</p>
        </div>
      </header>
      <section className="relative max-w-xl">
        <CallForm />
      </section>
    </main>
  );
}
