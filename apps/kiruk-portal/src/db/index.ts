// DB client (Slice 3 → live). Picks the driver by environment:
//   - DATABASE_URL set  → Neon (production / your provisioned DB)
//   - otherwise          → pglite, an embedded Postgres persisted to ./.pglite (local dev)
// Same Postgres dialect + schema either way, so nothing else changes when you switch to Neon.

import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { migrate as migrateNeon } from 'drizzle-orm/neon-http/migrator';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { migrate as migratePglite } from 'drizzle-orm/pglite/migrator';
import * as schema from './schema';

const url = process.env.DATABASE_URL;
export const dbDriver: 'neon' | 'pglite' = url ? 'neon' : 'pglite';
/** A DB is always available now (Neon if configured, else local pglite). */
export const isDbConfigured = true;

type DB = NeonHttpDatabase<typeof schema>;

let _db: DB | null = null;
let _migrated: Promise<void> | null = null;

function migrationsFolder() {
  return path.join(process.cwd(), 'drizzle');
}

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

/** Apply migrations once per process (idempotent). Call before the first query. */
export function ensureMigrated(): Promise<void> {
  if (!_migrated) {
    const db = getDb();
    _migrated = url
      ? // biome-ignore lint/suspicious/noExplicitAny: driver-specific migrator, db is the matching instance
        migrateNeon(db as any, { migrationsFolder: migrationsFolder() })
      : // biome-ignore lint/suspicious/noExplicitAny: driver-specific migrator, db is the matching instance
        migratePglite(db as any, { migrationsFolder: migrationsFolder() });
  }
  return _migrated;
}

export { schema };
