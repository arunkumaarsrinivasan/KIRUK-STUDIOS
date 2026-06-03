// repo — DB-backed data layer (Drizzle) for the lifecycle, todos, and client access.
// Mirrors the file engine's shape so surfaces can move onto the DB. Server-only.

import { desc, eq } from 'drizzle-orm';
import type { State } from '@/lib/lifecycle-model';
import { ensureMigrated, getDb } from './index';
import { clientAccess, todo, transition, universe, user } from './schema';

async function db() {
  await ensureMigrated();
  return getDb();
}

export type UniverseRow = typeof universe.$inferSelect;
export type TodoRow = typeof todo.$inferSelect;
export type TransitionRow = typeof transition.$inferSelect;
export type UserRow = typeof user.$inferSelect;

// ── universes ─────────────────────────────────────────────────────────────
export async function listUniverses(): Promise<UniverseRow[]> {
  const d = await db();
  return d.select().from(universe).orderBy(desc(universe.updatedAt));
}

export async function getUniverse(slug: string): Promise<UniverseRow | null> {
  const d = await db();
  const rows = await d.select().from(universe).where(eq(universe.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function createUniverse(slug: string, title: string): Promise<UniverseRow> {
  const d = await db();
  const [u] = await d.insert(universe).values({ slug, title, state: 'lead' }).returning();
  if (!u) throw new Error('insert failed');
  await d.insert(transition).values({
    universeId: u.id,
    fromState: '—',
    toState: 'lead',
    trigger: 'portal',
    why: 'universe created',
  });
  return u;
}

export async function transitionUniverse(
  slug: string,
  to: State,
  why: string,
  trigger = 'portal',
): Promise<UniverseRow | null> {
  const d = await db();
  const u = await getUniverse(slug);
  if (!u) throw new Error(`unknown universe: ${slug}`);
  await d.update(universe).set({ state: to, updatedAt: new Date() }).where(eq(universe.id, u.id));
  await d.insert(transition).values({
    universeId: u.id,
    fromState: u.state,
    toState: to,
    trigger,
    why: why || '—',
  });
  return getUniverse(slug);
}

export async function listTransitions(universeId: string): Promise<TransitionRow[]> {
  const d = await db();
  return d
    .select()
    .from(transition)
    .where(eq(transition.universeId, universeId))
    .orderBy(transition.at);
}

// ── todos ─────────────────────────────────────────────────────────────────
export async function listTodos(): Promise<TodoRow[]> {
  const d = await db();
  return d.select().from(todo).orderBy(todo.done, desc(todo.createdAt));
}

export async function createTodo(
  title: string,
  priority = 'p2',
  universeId: string | null = null,
): Promise<TodoRow> {
  const d = await db();
  const [t] = await d.insert(todo).values({ title, priority, universeId }).returning();
  if (!t) throw new Error('insert failed');
  return t;
}

export async function setTodoDone(id: string, done: boolean): Promise<void> {
  const d = await db();
  await d.update(todo).set({ done, updatedAt: new Date() }).where(eq(todo.id, id));
}

export async function deleteTodo(id: string): Promise<void> {
  const d = await db();
  await d.delete(todo).where(eq(todo.id, id));
}

// ── users / access ──────────────────────────────────────────────────────
export async function userByEmail(email: string): Promise<UserRow | null> {
  const d = await db();
  const rows = await d.select().from(user).where(eq(user.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function universesForUser(userId: string): Promise<UniverseRow[]> {
  const d = await db();
  const rows = await d
    .select({ u: universe })
    .from(clientAccess)
    .innerJoin(universe, eq(clientAccess.universeId, universe.id))
    .where(eq(clientAccess.userId, userId));
  return rows.map((r) => r.u);
}

export async function grantClientAccess(userId: string, universeId: string): Promise<void> {
  const d = await db();
  await d.insert(clientAccess).values({ userId, universeId, role: 'client-read' });
}
