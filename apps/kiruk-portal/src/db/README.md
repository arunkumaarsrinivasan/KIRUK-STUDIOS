# Portal auth + DB (Slice 3)

Scaffolded, **not yet live**. The portal runs file-backed (`src/lib/lifecycle.ts` over
`kiruk-projects/<slug>/`) until Neon is provisioned. Everything here is env-guarded so
`next build` is green without a database.

## Pieces

| File                                 | Role                                                                                                                  |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `src/db/schema.ts`                   | Drizzle schema — Better-Auth core tables + `universe` / `transition` / `client_access` (mirror of the file lifecycle) |
| `src/db/index.ts`                    | Lazy, env-guarded Drizzle client (`getDb()`, `isDbConfigured`)                                                        |
| `src/lib/auth.ts`                    | Lazy Better-Auth instance (`getAuth()`, `isAuthConfigured`) — magic-link                                              |
| `src/app/api/auth/[...all]/route.ts` | Auth handler; returns `501` until configured                                                                          |
| `drizzle.config.ts`                  | drizzle-kit config (CLI-only)                                                                                         |
| `.env.example`                       | env var names                                                                                                         |

## Activation (you do this — needs an account + secrets I can't create)

1. **Provision Neon**: create a project at neon.tech, copy the pooled connection string.
2. `cp .env.example .env.local` and fill `DATABASE_URL`, `BETTER_AUTH_SECRET` (`openssl rand -base64 32`), `BETTER_AUTH_URL`.
3. **Generate + apply migration**:
   ```
   pnpm db:generate   # writes SQL to ./drizzle
   pnpm db:migrate    # applies to Neon
   ```
   (or `pnpm db:push` for dev.)
4. Restart `pnpm dev`. `/api/auth/*` now responds; `getAuth()` works.

## Next (after the DB is live)

- Replace `sendMagicLink` console.log in `src/lib/auth.ts` with a real email sender.
- Add a sign-in page + a **client read-only** view (`/client/[slug]`) gated by `client_access`.
- Dual-write or migrate the file lifecycle into the `universe`/`transition` tables.

## Guard

Never store client API keys / payment data in the DB (client-lifecycle "no client secrets").
Money stays in `.local-only/`; app secrets are env-only. `.env*` is gitignored — only `.env.example`
is committed.
