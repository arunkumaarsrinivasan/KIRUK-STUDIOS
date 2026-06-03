// Drizzle schema for kiruk-portal (Slice 3 — auth + DB).
// Better-Auth core tables (user/session/account/verification) + app tables that MIRROR the
// file-backed lifecycle (universe/transition/client_access). Until Neon is provisioned the portal
// stays file-backed; this schema is the target the DB migration will create.
//
// SECRET GUARD (client-lifecycle + repo-privacy): no client API keys / payment data here. Money
// stays in .local-only/; app secrets are env-only. Better-Auth's token columns are auth artifacts
// it manages — not app/client secrets.

import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { State } from '@/lib/lifecycle-model';

// ── Better-Auth core ──────────────────────────────────────────────────────
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  // 'admin' (founder) or 'client'. Founder is promoted via ADMIN_EMAILS env on first sign-in.
  role: text('role').notNull().default('client'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ── App tables (mirror the file-backed lifecycle) ─────────────────────────
export const universe = pgTable('universe', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  state: text('state').$type<State>().notNull().default('lead'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const transition = pgTable('transition', {
  id: uuid('id').primaryKey().defaultRandom(),
  universeId: uuid('universe_id')
    .notNull()
    .references(() => universe.id, { onDelete: 'cascade' }),
  at: timestamp('at').notNull().defaultNow(),
  fromState: text('from_state').notNull(),
  toState: text('to_state').notNull(),
  trigger: text('trigger').notNull().default('portal'),
  why: text('why').notNull().default(''),
});

// P1 — a client user gets read-only access to their own universe.
export const clientAccess = pgTable('client_access', {
  id: uuid('id').primaryKey().defaultRandom(),
  universeId: uuid('universe_id')
    .notNull()
    .references(() => universe.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('client-read'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// founder todo / task list — optionally tied to a universe.
export const todo = pgTable('todo', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  done: boolean('done').notNull().default(false),
  priority: text('priority').notNull().default('p2'), // p0 | p1 | p2
  universeId: uuid('universe_id').references(() => universe.id, { onDelete: 'set null' }),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
