// DB client. Picks the driver by environment:
//   - DATABASE_URL set  → Neon (production / your provisioned DB)
//   - otherwise          → pglite, embedded Postgres persisted to ./.pglite (local dev)
// Same Postgres dialect + schema either way, so nothing changes when you switch to Neon.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { neon } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';
import { drizzle as drizzleNeon, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import * as schema from './schema';

const url = process.env.DATABASE_URL;
export const dbDriver: 'neon' | 'pglite' = url ? 'neon' : 'pglite';
/** A DB is always available now (Neon if configured, else local pglite). */
export const isDbConfigured = true;

type DB = NeonHttpDatabase<typeof schema>;

let _db: DB | null = null;
let _migrated: Promise<void> | null = null;

export function getDb(): DB {
  if (_db) return _db;
  if (url) {
    _db = drizzleNeon(neon(url), { schema });
  } else {
    const client = new PGlite(path.join(process.cwd(), '.pglite'));
    _db = drizzlePglite(client, { schema }) as unknown as DB;
  }
  return _db;
}

// Apply the generated SQL migrations by executing them directly. We avoid drizzle's folder-based
// migrators because they choke on path→URL resolution inside the Next bundle. Idempotent: skips if
// the schema is already present, and runs each .sql statement in order otherwise.
async function applyMigrations(): Promise<void> {
  const db = getDb();
  try {
    await db.execute(sql.raw('select 1 from "universe" limit 1'));
    return; // already migrated
  } catch {
    /* tables not present yet — apply below */
  }
  const dir = path.join(process.cwd(), 'drizzle');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();
  for (const f of files) {
    const content = await readFile(path.join(dir, f), 'utf8');
    const statements = content
      .split('--> statement-breakpoint')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const stmt of statements) {
      await db.execute(sql.raw(stmt));
    }
  }
}

/** Apply migrations once per process (idempotent). Call before the first query. */
export function ensureMigrated(): Promise<void> {
  if (!_migrated) _migrated = applyMigrations();
  return _migrated;
}

export { schema };
