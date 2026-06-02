// drizzle-kit config (Slice 3). Read only by the drizzle-kit CLI (db:generate / db:migrate),
// never imported by the app — so the missing-env case only matters when you actually run a migration.
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  // biome-ignore lint/style/noNonNullAssertion: CLI-only; provide DATABASE_URL before running drizzle-kit
  dbCredentials: { url: process.env.DATABASE_URL! },
});
