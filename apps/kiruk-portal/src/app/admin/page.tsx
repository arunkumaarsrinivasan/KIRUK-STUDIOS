import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminPanel from '@/components/AdminPanel';
import RiggedGlyph from '@/components/RiggedGlyph';
import { listUniverses } from '@/db/repo';
import { isAdmin } from '@/lib/auth-server';

// the founder's desk — reads the DB each request, never statically cached.
export const dynamic = 'force-dynamic';

export const metadata = { title: 'admin — kiruk portal' };

export default async function AdminPage() {
  if (!(await isAdmin())) redirect('/sign-in');

  const universes = await listUniverses();

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-8 flex items-center gap-3">
        <Link href="/" className="face-mark border-none" aria-label="home">
          <RiggedGlyph pattern="star" size={30} blink />
        </Link>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">admin</h1>
          <p className="handwritten text-pencil text-sm">
            open worlds, push the pipeline, let clients in
          </p>
        </div>
      </header>

      <section className="relative max-w-3xl">
        <AdminPanel universes={universes} />
      </section>
    </main>
  );
}
