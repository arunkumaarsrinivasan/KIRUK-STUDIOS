// lifecycle — the file-backed engine behind the portal's proposal→handoff flow.
// Source of truth = kiruk-projects/<slug>/ markdown, exactly per openspec/specs/client-lifecycle/spec.md.
// Server-only: uses node:fs. Never import from a 'use client' module.

import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  isValidSlug,
  LIFECYCLE,
  STATES,
  type State,
  type Transition,
  type UniverseDetail,
  type UniverseSummary,
} from './lifecycle-model';

export {
  isValidSlug,
  LIFECYCLE,
  nextState,
  STATES,
  type State,
  stateIndex,
  type Transition,
  type UniverseDetail,
  type UniverseSummary,
} from './lifecycle-model';

// --- repo location -------------------------------------------------------

// Walk up from cwd to the repo root (the dir that holds openspec/ + kiruk-projects/).
let cachedRoot: string | null = null;
export function repoRoot(): string {
  if (cachedRoot) return cachedRoot;
  let dir = process.cwd();
  for (let i = 0; i < 8; i++) {
    if (existsSync(path.join(dir, 'openspec')) && existsSync(path.join(dir, 'kiruk-projects'))) {
      cachedRoot = dir;
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // fallback: assume portal lives at apps/kiruk-portal
  cachedRoot = path.resolve(process.cwd(), '..', '..');
  return cachedRoot;
}

export function projectsDir(): string {
  return path.join(repoRoot(), 'kiruk-projects');
}
export function universeDir(slug: string): string {
  return path.join(projectsDir(), slug);
}

// --- front-matter --------------------------------------------------------

function parseFrontMatter(md: string): { data: Record<string, string>; body: string } {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: md };
  const data: Record<string, string> = {};
  for (const line of m[1]!.split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]!] = kv[2]!.trim();
  }
  return { data, body: m[2] ?? '' };
}

function parseTransitions(body: string): Transition[] {
  const out: Transition[] = [];
  for (const line of body.split(/\r?\n/)) {
    const cells = line.split('|').map((c) => c.trim());
    // table rows look like: | when | from | to | trigger | why |  → 7 cells incl leading/trailing empty
    if (cells.length === 7 && cells[0] === '' && cells[6] === '') {
      const [, when, from, to, trigger, why] = cells;
      if (when === 'when' || /^-+$/.test(when ?? '')) continue; // header / divider
      out.push({ when: when!, from: from!, to: to!, trigger: trigger!, why: why! });
    }
  }
  return out;
}

// --- reads ---------------------------------------------------------------

export async function readUniverse(slug: string): Promise<UniverseDetail | null> {
  const dir = universeDir(slug);
  if (!existsSync(dir)) return null;

  const statePath = path.join(dir, 'state.md');
  let data: Record<string, string> = {};
  let transitions: Transition[] = [];
  let needsInit = true;
  if (existsSync(statePath)) {
    const raw = await readFile(statePath, 'utf8');
    const fm = parseFrontMatter(raw);
    data = fm.data;
    transitions = parseTransitions(fm.body);
    needsInit = false;
  }

  // infer state when state.md absent
  let state = (data.state as State) || 'lead';
  if (needsInit) state = existsSync(path.join(dir, 'intake.md')) ? 'intake' : 'lead';
  if (!STATES.includes(state)) state = 'lead';

  const artifacts: Record<string, boolean> = {};
  for (const meta of Object.values(LIFECYCLE)) {
    if (meta.artifact) artifacts[meta.artifact] = existsSync(path.join(dir, meta.artifact));
  }

  let scribbleCount = 0;
  const scribbleDir = path.join(dir, 'scribble');
  if (existsSync(scribbleDir)) {
    const entries = await readdir(scribbleDir).catch(() => []);
    scribbleCount = entries.filter((e) => !e.startsWith('.')).length;
  }

  const created = data.created || (await safeBirth(dir));
  const updated = data.updated || created;
  const title = data.title || titleFromSlug(slug);

  return { slug, title, state, created, updated, needsInit, transitions, artifacts, scribbleCount };
}

export async function listUniverses(): Promise<UniverseSummary[]> {
  const dir = projectsDir();
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const out: UniverseSummary[] = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith('_') || e.name.startsWith('.')) continue; // _products etc.
    const u = await readUniverse(e.name);
    if (u) {
      const { slug, title, state, created, updated, needsInit } = u;
      out.push({ slug, title, state, created, updated, needsInit });
    }
  }
  out.sort((a, b) => (a.updated < b.updated ? 1 : -1));
  return out;
}

// --- writes --------------------------------------------------------------

function titleFromSlug(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

async function safeBirth(dir: string): Promise<string> {
  try {
    const s = await stat(dir);
    return s.birthtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function renderStateFile(opts: {
  slug: string;
  title: string;
  state: State;
  created: string;
  updated: string;
  transitions: Transition[];
}): string {
  const rows = opts.transitions
    .map((t) => `| ${t.when} | ${t.from} | ${t.to} | ${t.trigger} | ${t.why} |`)
    .join('\n');
  return `---
universe: ${opts.slug}
title: ${opts.title}
state: ${opts.state}
created: ${opts.created}
updated: ${opts.updated}
---

# ${opts.title} — lifecycle

> Canonical state record (client-lifecycle spec). Each transition is appended below; do not edit history.

| when | from | to | trigger | why |
| --- | --- | --- | --- | --- |
${rows}
`;
}

export async function createUniverse(slug: string, title?: string): Promise<UniverseDetail> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  const dir = universeDir(slug);
  if (existsSync(path.join(dir, 'state.md'))) throw new Error(`universe already exists: ${slug}`);
  await mkdir(path.join(dir, 'scribble'), { recursive: true });

  const now = new Date().toISOString();
  const t: Transition = {
    when: now,
    from: '—',
    to: 'lead',
    trigger: 'portal',
    why: 'universe created',
  };
  const content = renderStateFile({
    slug,
    title: title?.trim() || titleFromSlug(slug),
    state: 'lead',
    created: now,
    updated: now,
    transitions: [t],
  });
  await writeFile(path.join(dir, 'state.md'), content, 'utf8');

  // a textual scribble placeholder so pen-and-paper precondition can be satisfied intentionally later
  const u = await readUniverse(slug);
  if (!u) throw new Error('failed to read created universe');
  return u;
}

// write (or overwrite) a lifecycle artifact markdown file in the universe folder.
export async function writeArtifact(
  slug: string,
  filename: string,
  content: string,
): Promise<void> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  if (!/^[a-z0-9][a-z0-9._-]*\.md$/.test(filename))
    throw new Error(`invalid artifact name: ${filename}`);
  const dir = universeDir(slug);
  if (!existsSync(dir)) throw new Error(`unknown universe: ${slug}`);
  await writeFile(path.join(dir, filename), content, 'utf8');
}

// decode a PNG data-URL and save it into the universe's scribble/ folder. Returns the repo-relative
// path to reference from artifacts.
export async function saveScribblePng(
  slug: string,
  dataUrl: string,
  name: string,
): Promise<string> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  const m = dataUrl.match(/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/);
  if (!m) throw new Error('expected a PNG data URL');
  const safe = name.replace(/[^a-z0-9._-]/gi, '-');
  const dir = path.join(universeDir(slug), 'scribble');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safe), Buffer.from(m[1]!, 'base64'));
  return `scribble/${safe}`;
}

// write a file into the universe's .local-only/ folder (gitignored per repo-privacy). Used for
// payment figures + signed originals that MUST NOT be tracked.
export async function writeLocalOnly(
  slug: string,
  filename: string,
  content: string,
): Promise<string> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  const safe = filename.replace(/[^a-z0-9._-]/gi, '-');
  const dir = path.join(universeDir(slug), '.local-only');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, safe), content, 'utf8');
  return `.local-only/${safe}`;
}

// next invoice sequence for a universe, formatted KIRUK-<YYYY>-<NNNN>. Counts existing invoice
// records in .local-only/.
export async function nextInvoiceNumber(slug: string, year: number): Promise<string> {
  const dir = path.join(universeDir(slug), '.local-only');
  let n = 0;
  if (existsSync(dir)) {
    const entries = await readdir(dir).catch(() => []);
    n = entries.filter((e) => /^invoice-\d+\.md$/.test(e)).length;
  }
  return `KIRUK-${year}-${String(n + 1).padStart(4, '0')}`;
}

// read the universe's transparency setting from intake.md front-matter (build-in-public spec).
// Returns the raw value (e.g. 'open' | 'partial' | 'closed') or null if unset / no intake.md.
export async function readTransparency(slug: string): Promise<string | null> {
  const p = path.join(universeDir(slug), 'intake.md');
  if (!existsSync(p)) return null;
  const raw = await readFile(p, 'utf8').catch(() => '');
  const fm = parseFrontMatter(raw);
  const t = fm.data.transparency?.toLowerCase();
  return t || null;
}

// write a case-study DRAFT into content/case-studies/ (consent-gated per build-in-public). Always
// marked draft + unpublished; never contains figures.
export async function writeCaseStudyDraft(slug: string, content: string): Promise<string> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  const dir = path.join(repoRoot(), 'content', 'case-studies');
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, `${slug}-draft.md`), content, 'utf8');
  return `content/case-studies/${slug}-draft.md`;
}

// textual scribble placeholder (pen-and-paper spec allows a textual.md with a reason).
export async function addTextualScribble(slug: string, reason: string): Promise<void> {
  if (!isValidSlug(slug)) throw new Error(`invalid slug: ${slug}`);
  const dir = path.join(universeDir(slug), 'scribble');
  await mkdir(dir, { recursive: true });
  const now = new Date().toISOString();
  await writeFile(
    path.join(dir, 'textual.md'),
    `---\nkind: textual-scribble\ncreated: ${now}\n---\n\nreason: ${reason || 'placeholder scribble'}\n`,
    'utf8',
  );
}

export async function appendTransition(
  slug: string,
  to: State,
  why: string,
  trigger = 'portal',
): Promise<UniverseDetail> {
  const u = await readUniverse(slug);
  if (!u) throw new Error(`unknown universe: ${slug}`);
  const from = u.state;
  const now = new Date().toISOString();
  const transitions = [...u.transitions, { when: now, from, to, trigger, why: why || '—' }];
  const content = renderStateFile({
    slug,
    title: u.title,
    state: to,
    created: u.created,
    updated: now,
    transitions,
  });
  await writeFile(path.join(universeDir(slug), 'state.md'), content, 'utf8');
  const next = await readUniverse(slug);
  if (!next) throw new Error('failed to re-read universe');
  return next;
}
