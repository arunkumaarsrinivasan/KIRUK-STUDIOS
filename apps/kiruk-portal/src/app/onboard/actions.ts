'use server';

// Persist an onboarding read into the real lifecycle DB. The wizard's summary step calls this to
// graduate a localStorage-only draft into a tracked universe (starts at `lead`), then jumps into
// its cockpit. Slug discipline + duplicate guard match the rest of the lifecycle surface.

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createUniverse, getUniverse } from '@/db/repo';
import { isValidSlug } from '@/lib/lifecycle-model';

export type SaveOnboardingInput = { slug: string; title: string };

export async function saveOnboardingAction(
  input: SaveOnboardingInput,
): Promise<{ error?: string }> {
  const slug = input.slug.trim().toLowerCase();
  const title = input.title.trim();

  if (!isValidSlug(slug)) {
    return { error: 'slug must be lowercase kebab-case (a-z, 0-9, hyphens), 2–60 chars' };
  }
  if (!title) {
    return { error: 'give the universe a title' };
  }

  const existing = await getUniverse(slug);
  if (existing) {
    return { error: 'slug taken' };
  }

  await createUniverse(slug, title);

  revalidatePath('/universes');
  redirect(`/universes/${slug}`);
}
