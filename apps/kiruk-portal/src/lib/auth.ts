// Better-Auth — magic-link over the live DB (Neon in prod, pglite in local dev). Admin (founder)
// is gated by the ADMIN_EMAILS allowlist; clients sign in by magic-link and are scoped via the
// client_access table. A dev secret is used when BETTER_AUTH_SECRET is unset (local only).

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { getDb } from '@/db';

/** Auth is always available now (a DB always exists — Neon or local pglite). */
export const isAuthConfigured = true;

const adminEmails = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

/** Founder check — email in the ADMIN_EMAILS allowlist. */
export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email) && adminEmails.includes(String(email).toLowerCase());
}

function buildAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: 'pg' }),
    secret: process.env.BETTER_AUTH_SECRET ?? 'kiruk-dev-secret-change-in-prod',
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    emailAndPassword: { enabled: false },
    plugins: [
      magicLink({
        // TODO(prod): wire a real email sender (Resend/SES). Logged to the server console until then —
        // in local dev, copy the magic-link URL from the terminal to sign in.
        sendMagicLink: async ({ email, url }) => {
          console.log(`[magic-link] ${email} -> ${url}`);
        },
      }),
    ],
  });
}

let _auth: ReturnType<typeof buildAuth> | null = null;
export function getAuth(): ReturnType<typeof buildAuth> {
  if (!_auth) _auth = buildAuth();
  return _auth;
}
