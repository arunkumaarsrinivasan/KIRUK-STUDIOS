# Deploying kiruk-portal (Vercel)

Separate deploy from `kiruk-web`. Config: [`vercel.json`](./vercel.json).

## ⚠️ Read first — persistence

The portal is currently **file-backed**: server actions read/write `kiruk-projects/<slug>/`
markdown, scribbles, and `_inbox/`. On Vercel's serverless runtime the filesystem is
**read-only / ephemeral** — those writes **do not persist** between requests or deploys.

So a deploy today is fine for **demo / read-through**, but **real persistence needs Slice 3
(Neon + Drizzle) live** — see [`src/db/README.md`](./src/db/README.md). Provision the DB and
migrate the lifecycle to `universe`/`transition` tables before relying on a hosted instance.

## One-time setup (you — needs a Vercel account)

1. Import the repo in Vercel → **New Project**.
2. **Root Directory:** `apps/kiruk-portal`. Enable _Include files outside root_ so the pnpm
   workspace + `kiruk-projects/` resolve.
3. **Framework:** Next.js (auto). Install/build come from `vercel.json`.
4. **Environment variables** (Project → Settings → Environment Variables) — once Slice 3 is live:
   - `DATABASE_URL` (Neon pooled, `sslmode=require`)
   - `BETTER_AUTH_SECRET` (`openssl rand -base64 32`)
   - `BETTER_AUTH_URL` = your deploy URL (e.g. `https://portal.kiruk.in`)
5. Deploy. Domain: `portal.kiruk.in` (or a subpath per the roadmap).

## Notes

- `.env*` is gitignored — set secrets in the Vercel dashboard, never in the repo.
- Client PII (call inbox, `.local-only/`) is gitignored and must not ship in the build context.
- The R3F `/eye-3d` route is client-only (`ssr:false`) so three.js never runs at build.
