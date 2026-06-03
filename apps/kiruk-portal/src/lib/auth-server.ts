// Server-side auth helpers for surfaces (dashboard / admin / client). Ensures the DB is migrated
// before any auth query, reads the current session, and exposes role checks.

import { headers } from 'next/headers';
import { ensureMigrated } from '@/db';
import { getAuth, isAdminEmail } from './auth';

export type SessionUser = { id: string; email: string; name?: string | null } | null;

/** Current session (or null). Migrates the DB on first call. */
export async function getSession() {
  await ensureMigrated();
  return getAuth().api.getSession({ headers: await headers() });
}

/** Current user, or null. */
export async function currentUser(): Promise<SessionUser> {
  const s = await getSession();
  return s?.user ? { id: s.user.id, email: s.user.email, name: s.user.name } : null;
}

/** Is the signed-in user the founder/admin? */
export async function isAdmin(): Promise<boolean> {
  const u = await currentUser();
  return isAdminEmail(u?.email);
}
