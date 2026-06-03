// Better-Auth catch-all route. Migrates the DB before handling so auth tables exist on first hit.

import { toNextJsHandler } from 'better-auth/next-js';
import { ensureMigrated } from '@/db';
import { getAuth } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  await ensureMigrated();
  return toNextJsHandler(getAuth()).GET(req);
}

export async function POST(req: Request) {
  await ensureMigrated();
  return toNextJsHandler(getAuth()).POST(req);
}
