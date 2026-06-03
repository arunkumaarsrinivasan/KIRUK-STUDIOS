// universe-view — the unified read layer (server-only). State, transitions, todos, and access
// come from the DB (system of record); artifact CONTENT (proposal.md, contract.md, scribbles)
// stays as files under kiruk-projects/<slug>/, scanned here. Returns the same shape the existing
// pages/components already consume (so they swap readUniverse → getView with no other changes).

import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { getUniverse, listTransitions, listUniverses } from '../db/repo';
import { universeDir } from './lifecycle';
import { LIFECYCLE, type State, type Transition, type UniverseSummary } from './lifecycle-model';

export type UniverseView = UniverseSummary & {
  transitions: Transition[];
  artifacts: Record<string, boolean>;
  scribbleCount: number;
  scribbles: string[];
};

function iso(d: Date | string): string {
  return d instanceof Date ? d.toISOString() : String(d);
}

async function scanFiles(slug: string): Promise<{
  artifacts: Record<string, boolean>;
  scribbles: string[];
}> {
  const dir = universeDir(slug);
  const artifacts: Record<string, boolean> = {};
  for (const meta of Object.values(LIFECYCLE)) {
    if (meta.artifact) artifacts[meta.artifact] = existsSync(path.join(dir, meta.artifact));
  }
  let scribbles: string[] = [];
  const scribbleDir = path.join(dir, 'scribble');
  if (existsSync(scribbleDir)) {
    const entries = await readdir(scribbleDir).catch(() => []);
    scribbles = entries.filter((e) => !e.startsWith('.')).sort();
  }
  return { artifacts, scribbles };
}

/** Full view of one universe: DB state/transitions + file artifacts. Null if not in the DB. */
export async function getView(slug: string): Promise<UniverseView | null> {
  const u = await getUniverse(slug);
  if (!u) return null;
  const { artifacts, scribbles } = await scanFiles(slug);
  const rows = await listTransitions(u.id);
  const transitions: Transition[] = rows.map((t) => ({
    when: iso(t.at),
    from: t.fromState,
    to: t.toState,
    trigger: t.trigger,
    why: t.why,
  }));
  return {
    slug: u.slug,
    title: u.title,
    state: u.state as State,
    created: iso(u.createdAt),
    updated: iso(u.updatedAt),
    needsInit: false,
    transitions,
    artifacts,
    scribbleCount: scribbles.length,
    scribbles,
  };
}

/** Board summaries from the DB. */
export async function listView(): Promise<UniverseSummary[]> {
  const rows = await listUniverses();
  return rows.map((u) => ({
    slug: u.slug,
    title: u.title,
    state: u.state as State,
    created: iso(u.createdAt),
    updated: iso(u.updatedAt),
    needsInit: false,
  }));
}
