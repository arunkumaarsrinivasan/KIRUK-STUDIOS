'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  createUniverse,
  getUniverse,
  grantClientAccess,
  transitionUniverse,
  userByEmail,
} from '@/db/repo';
import { isValidSlug, LIFECYCLE, nextState } from '@/lib/lifecycle-model';

export type AdminResult = { error?: string; saved?: boolean };

// open a universe from the admin desk — validates the slug, creates it (starts at `lead`),
// then drops back onto /admin so the new row shows in the pipeline.
export async function createUniverseAdminAction(slug: string, title: string): Promise<AdminResult> {
  const s = slug.trim().toLowerCase();
  const t = title.trim();
  if (!isValidSlug(s)) {
    return { error: 'slug must be lowercase kebab-case (a-z, 0-9, hyphens), 2–60 chars' };
  }
  try {
    await createUniverse(s, t || s);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not open universe' };
  }
  revalidatePath('/admin');
  redirect('/admin');
}

// advance a universe one step along the rail (lead → … → archived), logging the why.
// Guards the terminal state — archived has nowhere to go.
export async function advanceAction(slug: string): Promise<AdminResult> {
  const u = await getUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  const nx = nextState(u.state);
  if (!nx) return { error: 'already archived — the flow is complete' };
  try {
    await transitionUniverse(slug, nx, `advanced to ${LIFECYCLE[nx].label}`, 'admin');
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not advance' };
  }
  revalidatePath('/admin');
  return { saved: true };
}

// invite a client: grant read access to a universe by email. The client must have signed in at
// least once (a user row must exist) — if not, we tell the founder to have them sign in first.
export async function grantAccessAction(email: string, slug: string): Promise<AdminResult> {
  const e = email.trim().toLowerCase();
  const s = slug.trim().toLowerCase();
  if (!e) return { error: 'add the client email' };
  if (!isValidSlug(s)) return { error: 'pick a valid universe slug' };

  const u = await userByEmail(e);
  if (!u) {
    return { error: 'no user with that email yet — have the client sign in once first' };
  }
  const universe = await getUniverse(s);
  if (!universe) return { error: `unknown universe: ${s}` };

  try {
    await grantClientAccess(u.id, universe.id);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'could not grant access' };
  }
  revalidatePath('/admin');
  return { saved: true };
}
