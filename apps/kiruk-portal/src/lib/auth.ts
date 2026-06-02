// Better-Auth instance (Slice 3). LAZY + env-guarded — constructed on first use only when
// DATABASE_URL + BETTER_AUTH_SECRET are present, so module import is side-effect-free and the
// build stays green pre-provisioning. Magic-link is the primary method (P-decision: Better-Auth).
// Better-Auth reads BETTER_AUTH_SECRET / BETTER_AUTH_URL from the environment automatically.

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { getDb, isDbConfigured } from '@/db';

/** true when both the DB and the auth secret are configured. */
export const isAuthConfigured = isDbConfigured && Boolean(process.env.BETTER_AUTH_SECRET);

// factory so the concrete Auth type is inferred (avoids the broad `ReturnType<typeof betterAuth>`).
function buildAuth() {
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: 'pg' }),
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    emailAndPassword: { enabled: false },
    plugins: [
      magicLink({
        // TODO(provisioning): wire a real email sender (Resend/SES). Logged until then.
        sendMagicLink: async ({ email, url }) => {
          console.log(`[magic-link] ${email} -> ${url}`);
        },
      }),
    ],
  });
}

let _auth: ReturnType<typeof buildAuth> | null = null;

export function getAuth(): ReturnType<typeof buildAuth> {
  if (!isAuthConfigured) {
    throw new Error(
      'Auth not configured — set DATABASE_URL + BETTER_AUTH_SECRET. See src/db/README.md.',
    );
  }
  if (!_auth) _auth = buildAuth();
  return _auth;
}
