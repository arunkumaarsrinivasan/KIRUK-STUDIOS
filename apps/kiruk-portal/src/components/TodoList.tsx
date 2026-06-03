'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState, useTransition } from 'react';
import { addTodoAction, deleteTodoAction, toggleTodoAction } from '@/app/dashboard/actions';
import type { TodoRow } from '@/db/repo';
import RiggedGlyph from './RiggedGlyph';

// TodoList — the founder's running list, sketch-styled. The eye IS the checkbox (open = done,
// the attention-is-on metaphor). Seeded from the server render, then refreshed after each write so
// the revalidated server list stays canonical. Optimistic-free + simple on purpose.

const PRIORITIES = ['p0', 'p1', 'p2'] as const;
type Priority = (typeof PRIORITIES)[number];

// p0 = loudest. We don't invent CSS — chips reuse sketch-border + ink/pencil tokens.
const PRIORITY_LABEL: Record<Priority, string> = {
  p0: 'now',
  p1: 'soon',
  p2: 'someday',
};

export default function TodoList({ initial }: { initial: TodoRow[] }) {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoRow[]>(initial);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('p2');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // after a write, pull the revalidated server list back in.
  const refresh = () => router.refresh();

  const onAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = title.trim();
    if (!t || pending) return;
    setError(null);
    startTransition(async () => {
      const res = await addTodoAction(t, priority, null);
      if (res.error) {
        setError(res.error);
        return;
      }
      setTitle('');
      setPriority('p2');
      refresh();
    });
  };

  const onToggle = (todo: TodoRow) => {
    if (pending) return;
    const next = !todo.done;
    // local nudge so the eye reacts instantly; server revalidate confirms it.
    setTodos((prev) => prev.map((x) => (x.id === todo.id ? { ...x, done: next } : x)));
    startTransition(async () => {
      const res = await toggleTodoAction(todo.id, next);
      if (res.error) {
        setError(res.error);
        setTodos((prev) => prev.map((x) => (x.id === todo.id ? { ...x, done: todo.done } : x)));
        return;
      }
      refresh();
    });
  };

  const onDelete = (id: string) => {
    if (pending) return;
    setTodos((prev) => prev.filter((x) => x.id !== id));
    startTransition(async () => {
      const res = await deleteTodoAction(id);
      if (res.error) setError(res.error);
      refresh();
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={onAdd} className="sketch-border flex flex-wrap items-center gap-2 p-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="what needs doing…"
          aria-label="new todo"
          className="handwritten text-ink min-w-[12rem] flex-1 bg-transparent px-2 py-1 text-lg outline-none placeholder:text-pencil"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          aria-label="priority"
          className="handwritten text-ink dashed bg-paper px-2 py-1 text-sm outline-none"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p} · {PRIORITY_LABEL[p]}
            </option>
          ))}
        </select>
        <button type="submit" disabled={pending || !title.trim()} className="sketch-button">
          add
        </button>
      </form>

      {error ? <p className="handwritten text-sm text-ink">⚠ {error}</p> : null}

      {todos.length === 0 ? (
        <div className="dashed flex flex-col items-center gap-2 p-8 text-center">
          <RiggedGlyph pattern="ring" open={false} size={34} />
          <p className="handwritten text-pencil text-lg">nothing on the list. clean slate.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="sketch-border flex items-center gap-3 p-3 transition-transform hover:-translate-y-0.5"
            >
              {/* biome-ignore lint/a11y/useSemanticElements: intentional — eye-styled toggle; button + role=checkbox + aria-checked is accessible */}
              <button
                type="button"
                role="checkbox"
                aria-checked={todo.done}
                aria-label={
                  todo.done ? `mark "${todo.title}" not done` : `mark "${todo.title}" done`
                }
                disabled={pending}
                onClick={() => onToggle(todo)}
                className="eye-btn shrink-0"
              >
                <RiggedGlyph pattern="solid" open={todo.done} size={26} blink={todo.done} />
              </button>

              <span
                className="handwritten text-ink flex-1 text-lg"
                style={{
                  textDecoration: todo.done ? 'line-through' : undefined,
                  opacity: todo.done ? 0.55 : 1,
                }}
              >
                {todo.title}
              </span>

              <span
                className="sketch-border handwritten shrink-0 px-2 py-0.5 text-xs"
                style={{ color: todo.priority === 'p0' ? 'var(--ink)' : 'var(--pencil)' }}
              >
                {todo.priority}
              </span>

              <button
                type="button"
                aria-label={`delete "${todo.title}"`}
                disabled={pending}
                onClick={() => onDelete(todo.id)}
                className="handwritten text-pencil shrink-0 px-1 text-lg hover:text-ink"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
