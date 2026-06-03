import { redirect } from 'next/navigation';

// The universes board folded into the founder dashboard (DB-backed, admin-gated). This index just
// forwards there; the per-universe cockpit + builders still live under /universes/[slug].
export default function UniversesIndex() {
  redirect('/dashboard');
}
