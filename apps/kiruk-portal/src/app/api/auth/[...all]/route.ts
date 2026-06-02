// Better-Auth catch-all route (Slice 3). Returns 501 until DATABASE_URL + BETTER_AUTH_SECRET are
// set, so the build/runtime never crashes pre-provisioning.

import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth, isAuthConfigured } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function notConfigured() {
  return new Response('auth not configured (Slice 3): set DATABASE_URL + BETTER_AUTH_SECRET', {
    status: 501,
  });
}

export async function GET(req: Request) {
  if (!isAuthConfigured) return notConfigured();
  return toNextJsHandler(getAuth()).GET(req);
}

export async function POST(req: Request) {
  if (!isAuthConfigured) return notConfigured();
  return toNextJsHandler(getAuth()).POST(req);
}
