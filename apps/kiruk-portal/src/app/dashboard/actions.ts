'use server';

// Dashboard server actions — founder todo CRUD. Each write hits the repo then revalidates the
// dashboard so the server-rendered list stays the source of truth. Server-only (DB) by design.

import { revalidatePath } from 'next/cache';
import { createTodo, deleteTodo, setTodoDone } from '@/db/repo';

type ActionResult = { error?: string };

const PRIORITIES = new Set(['p0', 'p1', 'p2']);

// add a todo (optionally tied to a universe). Empty titles are rejected on-voice.
export async function addTodoAction(
  title: string,
  priority: string,
  universeId?: string | null,
): Promise<ActionResult> {
  const t = title.trim();
  if (!t) return { error: 'a todo needs a title' };
  const p = PRIORITIES.has(priority) ? priority : 'p2';
  try {
    await createTodo(t, p, universeId ?? null);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not add todo' };
  }
  revalidatePath('/dashboard');
  return {};
}

// flip a todo's done flag.
export async function toggleTodoAction(id: string, done: boolean): Promise<ActionResult> {
  try {
    await setTodoDone(id, done);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not update todo' };
  }
  revalidatePath('/dashboard');
  return {};
}

// remove a todo for good.
export async function deleteTodoAction(id: string): Promise<ActionResult> {
  try {
    await deleteTodo(id);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not delete todo' };
  }
  revalidatePath('/dashboard');
  return {};
}
