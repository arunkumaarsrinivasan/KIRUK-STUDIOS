// DB client (Slice 3). LAZY + env-guarded so importing this never touches the network and
// `next build` stays green without DATABASE_URL. Provisioning steps: src/db/README.md.

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const url = process.env.DATABASE_URL;

/** true once Neon is provisioned and DATABASE_URL is set. */
export const isDbConfigured = Boolean(url);

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

/** Get the Drizzle client. Throws (does not connect at import) until DATABASE_URL is set. */
export function getDb() {
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set — DB is not provisioned yet (Slice 3). See src/db/README.md.',
    );
  }
  if (!_db) _db = drizzle(neon(url), { schema });
  return _db;
}

export { schema };
