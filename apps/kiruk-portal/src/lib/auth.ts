// Better-Auth — magic-link over the live DB (Neon in prod, pglite in local dev). Admin (founder)
// is gated by the ADMIN_EMAILS allowlist; clients sign in by magic-link and are scoped via the
// client_access table. A dev secret is used when BETTER_AUTH_SECRET is unset (local only).

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { Resend } from 'resend';
import { getDb } from '@/db';

// Send the magic link by email via Resend when RESEND_API_KEY is set; otherwise log it to the
// server console (local dev). EMAIL_FROM must be a Resend-verified sender in prod.
async function sendMagicLinkEmail(email: string, url: string): Promise<void> {
  const isDev = process.env.NODE_ENV === 'development';
  const logLink = () => console.log(`[magic-link] ${email} -> ${url}`);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    logLink();
    return;
  }

  const from = process.env.EMAIL_FROM ?? 'kiruk <onboarding@resend.dev>';
  try {
    const { data, error } = await new Resend(key).emails.send({
      from,
      to: email,
      subject: 'Your kiruk sign-in link',
      html: `<p style="font-family:sans-serif">Sign in to kiruk:</p>
<p style="font-family:sans-serif"><a href="${url}">${url}</a></p>
<p style="font-family:sans-serif;color:#6b6b6b;font-size:13px">This link expires shortly. If you didn't request it, ignore this email.</p>`,
    });
    if (error) {
      console.error('[magic-link] send failed:', error.message);
      logLink();
      return;
    }
    if (isDev) {
      // Resend may succeed only for verified senders — always surface the link locally.
      console.log(`[magic-link:sent id=${data?.id ?? 'unknown'}] ${email}`);
      logLink();
    }
  } catch (e) {
    // never crash auth on a send failure — surface in logs, still console the link as a fallback.
    console.error('[magic-link] send failed:', e instanceof Error ? e.message : e);
    logLink();
  }
}

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
        sendMagicLink: async ({ email, url }) => {
          await sendMagicLinkEmail(email, url);
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
