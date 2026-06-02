'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addTextualScribble,
  appendCallRequest,
  appendTransition,
  createUniverse,
  isValidSlug,
  nextInvoiceNumber,
  readTransparency,
  readUniverse,
  STATES,
  type State,
  saveScribblePng,
  stateIndex,
  writeArtifact,
  writeCaseStudyDraft,
  writeLocalOnly,
} from '@/lib/lifecycle';

export type CreateState = { error?: string };

// create a universe (starts at `lead`), then jump into its cockpit.
export async function createUniverseAction(
  _prev: CreateState,
  formData: FormData,
): Promise<CreateState> {
  const slug = String(formData.get('slug') ?? '')
    .trim()
    .toLowerCase();
  const title = String(formData.get('title') ?? '').trim();
  if (!isValidSlug(slug)) {
    return { error: 'slug must be lowercase kebab-case (a-z, 0-9, hyphens), 2–60 chars' };
  }
  try {
    await createUniverse(slug, title || undefined);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not create universe' };
  }
  revalidatePath('/universes');
  redirect(`/universes/${slug}`);
}

// advance (or move) a universe to a new state, recording the transition + why.
export async function transitionAction(slug: string, to: State, why: string): Promise<void> {
  if (!STATES.includes(to)) throw new Error(`invalid target state: ${to}`);
  await appendTransition(slug, to, why);
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
}

// attach a textual scribble (no tablet) so the pen-and-paper precondition can be met intentionally.
export async function addTextualScribbleAction(slug: string, reason: string): Promise<void> {
  await addTextualScribble(slug, reason);
  revalidatePath(`/universes/${slug}`);
  revalidatePath(`/universes/${slug}/proposal`);
}

export type ProposalInput = {
  scribble?: string | null; // PNG data URL
  goal: string;
  scope: string;
  deliverables: string;
};

function renderProposal(
  slug: string,
  title: string,
  input: ProposalInput,
  scribbleRef?: string,
): string {
  const now = new Date().toISOString();
  const orDash = (s: string) => (s.trim() ? s.trim() : '_to be scribbled_');
  return `---
universe: ${slug}
title: ${title}
artifact: proposal
state: proposal
created: ${now}
${scribbleRef ? `scribble: ${scribbleRef}\n` : ''}spec: openspec/specs/template-proposal/spec.md
---

# ${title} — scribble proposal

> A proposal you don't read — you see. The sketch is the pitch; the words below only frame it.

## The scribble
${scribbleRef ? `![proposal scribble](${scribbleRef})` : '_(scribble attached in scribble/)_'}

## Goal
${orDash(input.goal)}

## Scope
${orDash(input.scope)}

## Deliverables
${orDash(input.deliverables)}

## Commercials
Shared separately — no figures in the repo (build-in-public spec).
`;
}

// P1 — save the scribble proposal: persist the sketch + a minimal proposal.md, then transition
// the universe into `proposal`. Enforces the pen-and-paper precondition.
export async function saveProposalAction(
  slug: string,
  input: ProposalInput,
): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };

  let scribbleRef: string | undefined;
  if (input.scribble) {
    try {
      scribbleRef = await saveScribblePng(slug, input.scribble, `proposal-${Date.now()}.png`);
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'could not save scribble' };
    }
  }

  const fresh = await readUniverse(slug);
  if (!scribbleRef && (fresh?.scribbleCount ?? 0) === 0) {
    return { error: 'A scribble is required before a proposal (pen-and-paper). Sketch one first.' };
  }

  await writeArtifact(slug, 'proposal.md', renderProposal(slug, u.title, input, scribbleRef));

  if (stateIndex(u.state) < stateIndex('proposal')) {
    await appendTransition(slug, 'proposal', 'scribble proposal drafted');
  }

  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}

// ── P2: contract ─────────────────────────────────────────────────────────
export type ContractInput = {
  client: string;
  signatory: string;
  email: string;
  jurisdiction: string;
  scope: string;
  commercials: string; // figures — NEVER tracked; written to .local-only
};

function renderContract(
  slug: string,
  title: string,
  i: ContractInput,
  commercialsRef: string,
): string {
  const now = new Date().toISOString();
  const d = (s: string) => (s.trim() ? s.trim() : '_to be agreed_');
  return `---
universe: ${slug}
title: ${title}
artifact: contract
version: 1
legal-review-required: true
created: ${now}
commercials: ${commercialsRef}
spec: openspec/specs/template-contract/spec.md
---

# ${title} — engagement contract

> Template — a lawyer MUST review before use. Commercial figures are NOT in this file; they live in
> \`${commercialsRef}\` (gitignored). Signed originals stay out of the repo.

## 1. Parties
kiruk (studio) and **${d(i.client)}**, represented by ${d(i.signatory)} (${d(i.email)}).

## 2. Scope of engagement
${d(i.scope)} — see \`proposal.md\`.

## 3. Deliverables & timeline
Per the proposal + universe spec; phases named after the universe.

## 4. Commercials
Shared separately — see \`${commercialsRef}\` (not tracked, build-in-public).

## 5. Experimentation clause
kiruk may toolbend, iterate, and take creative risk; experimental output may differ from the initial spec.

## 6. Creative-risk acceptance
Client accepts that exploratory work can diverge from first sketches — that divergence is the point.

## 7. IP
Client owns the final deliverables. kiruk retains ISM-derived learnings + anonymized rights.

## 8. Portfolio / devlog rights
kiruk may publish process + a redacted case study, gated by the universe's transparency setting.

## 9. Confidentiality
Mutual NDA; client internals stay private per repo-privacy.

## 10. Termination & jurisdiction
Either party may terminate per notice. Jurisdiction: ${d(i.jurisdiction) || 'India'}; disputes via arbitration.

## Plain-language summary
- You hire kiruk to build the thing in the proposal.
- We're allowed to experiment; the result may surprise you (good).
- You own what ships; we keep what we learned.
- Money terms live privately, agreed separately.
- We can show the *process*, not your secrets.

## Signatures
- kiruk: ____________________  date: __________
- ${d(i.client)}: ____________________  date: __________

_(Record the signed PDF in \`.local-only/\` — never commit it.)_
`;
}

// write the contract artifact (figures → .local-only). Does NOT transition — signing is offline;
// advance proposal→engaged from the cockpit once contract.md exists.
export async function saveContractAction(
  slug: string,
  input: ContractInput,
): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };

  const ref = await writeLocalOnly(
    slug,
    'commercials.md',
    `# ${u.title} — commercials (PRIVATE, not tracked)\n\n${input.commercials || '_amounts TBD_'}\n`,
  );
  await writeArtifact(slug, 'contract.md', renderContract(slug, u.title, input, ref));
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}

// ── P3: invoice ──────────────────────────────────────────────────────────
export type InvoiceInput = {
  phase: string;
  currency: string;
  dueDate: string;
  descriptions: string; // tracked — line-item descriptions only, NO amounts
  amounts: string; // private — figures, → .local-only
};

export async function saveInvoiceAction(
  slug: string,
  input: InvoiceInput,
): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  if (stateIndex(u.state) < stateIndex('engaged')) {
    return { error: 'invoice after the contract is signed (state: engaged or later)' };
  }

  const now = new Date();
  const year = now.getFullYear();
  const number = await nextInvoiceNumber(slug, year);
  const seq = number.slice(-4);

  // figures → .local-only (gitignored)
  await writeLocalOnly(
    slug,
    `invoice-${seq}.md`,
    `# ${number} — amounts (PRIVATE, not tracked)\n\ncurrency: ${input.currency || 'INR'}\n\n${input.amounts || '_amounts TBD_'}\n`,
  );

  // tracked record — NO figures (client-lifecycle "no client secrets" + build-in-public)
  const md = `---
universe: ${slug}
title: ${u.title}
artifact: invoice
number: ${number}
issued: ${now.toISOString().slice(0, 10)}
due: ${input.dueDate || '_on receipt_'}
currency: ${input.currency || 'INR'}
status: issued
amounts: .local-only/invoice-${seq}.md
spec: openspec/specs/template-invoice/spec.md
---

# Invoice ${number} — ${u.title}

phase: **${input.phase || 'unnamed phase'}**

## Line items (descriptions only — amounts kept private)
${input.descriptions.trim() || '_to be itemized_'}

## Amounts
Figures are not tracked in the repo — see \`.local-only/invoice-${seq}.md\` (build-in-public · repo-privacy).
Payment instructions shared with the client directly.
`;
  await writeArtifact(slug, `invoice.md`, md);
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}

// ── P4: shipping ─────────────────────────────────────────────────────────
// /kiruk-spec is the canonical producer of spec.md. The portal only offers a STARTER stub so the
// flow isn't CLI-blocked; the founder is expected to flesh it out (or run /kiruk-spec).
export async function scaffoldSpecAction(slug: string): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  if (u.artifacts['spec.md']) return { error: 'spec.md already exists' };
  const now = new Date().toISOString();
  await writeArtifact(
    slug,
    'spec.md',
    `---\nuniverse: ${slug}\ntitle: ${u.title}\nartifact: spec\nstatus: draft-stub\ncreated: ${now}\n---\n\n# ${u.title} — capability spec (STARTER STUB)\n\n> Scaffolded by the portal so shipping isn't blocked. Replace with a real spec — ideally run\n> \`/kiruk-spec ${slug}\` for the full intake→spec pass.\n\n## Purpose\n_one paragraph: what this universe delivers._\n\n## Requirements\n### Requirement: _name_\n_The system SHALL …_\n\n#### Scenario: _name_\n- GIVEN …\n- WHEN …\n- THEN …\n`,
  );
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}

// ── P5: handoff / archive ────────────────────────────────────────────────
export type HandoffInput = {
  summary: string; // what shipped
  links: string; // repo / deploy / asset links (no secrets)
  nextSteps: string;
  credentials: string; // → .local-only, NEVER tracked
};
export type HandoffResult = {
  error?: string;
  archived?: boolean;
  transparency?: string | null;
  caseStudy?: 'drafted' | 'skipped';
  caseStudyPath?: string;
};

export async function saveHandoffAction(slug: string, input: HandoffInput): Promise<HandoffResult> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  if (stateIndex(u.state) < stateIndex('shipping')) {
    return { error: 'handoff happens from shipping. advance there first.' };
  }

  const now = new Date().toISOString();

  // credentials/access → .local-only (never tracked)
  if (input.credentials.trim()) {
    await writeLocalOnly(
      slug,
      'handoff-credentials.md',
      `# ${u.title} — handoff credentials (PRIVATE)\n\n${input.credentials}\n`,
    );
  }

  // tracked handoff.md — no secrets
  await writeArtifact(
    slug,
    'handoff.md',
    `---\nuniverse: ${slug}\ntitle: ${u.title}\nartifact: handoff\ncreated: ${now}\nspec: openspec/specs/client-lifecycle/spec.md\n---\n\n# ${u.title} — handoff\n\n## What shipped\n${input.summary.trim() || '_summary_'}\n\n## Links\n${input.links.trim() || '_repo / deploy / assets (no secrets)_'}\n\n## Next steps\n${input.nextSteps.trim() || '_what the client owns from here_'}\n\n## Access\nCredentials + access handed over privately — see \`.local-only/handoff-credentials.md\`. Never committed.\n`,
  );

  // transparency gate (build-in-public): draft a case study ONLY when the universe allows it.
  const transparency = await readTransparency(slug);
  let caseStudy: 'drafted' | 'skipped' = 'skipped';
  let caseStudyPath: string | undefined;
  if (transparency === 'open' || transparency === 'partial') {
    caseStudyPath = await writeCaseStudyDraft(
      slug,
      `---\nuniverse: ${slug}\ntitle: ${u.title}\nstatus: draft\npublished: false\ntransparency: ${transparency}\ncreated: ${now}\n---\n\n# ${u.title} — case study (DRAFT, unpublished)\n\n> Consent-gated (build-in-public). No revenue figures. Review + get client consent before publishing.\n\n## The brief\n${input.summary.trim() || '_…_'}\n\n## The process\n_scribble → proposal → ship. Pull from devlogs + scribbles._\n\n## What we made\n${input.links.trim() || '_…_'}\n`,
    );
    caseStudy = 'drafted';
  }

  await appendTransition(slug, 'archived', 'handoff complete');
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  return { archived: true, transparency, caseStudy, caseStudyPath };
}

// ── Slice 4b: request a collaborative call → file-backed inbox ─────────────
export type CallInput = { name: string; contact: string; when: string; note: string };
export async function requestCallAction(
  input: CallInput,
): Promise<{ saved?: boolean; error?: string }> {
  if (!input.contact.trim()) return { error: 'add a way to reach you (email / handle)' };
  await appendCallRequest({
    name: input.name,
    contact: input.contact,
    when: input.when,
    note: input.note,
  });
  return { saved: true };
}

// ── Slice 4a: collaborative proposal mark-back ────────────────────────────
// A reviewer (client) marks on the proposal scribble; their marks layer is saved into scribble/.
// No state change, no redirect (the reviewer may be external and stays on the page).
export async function saveMarksAction(
  slug: string,
  dataUrl: string,
): Promise<{ error?: string; saved?: boolean }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  try {
    await saveScribblePng(slug, dataUrl, `proposal-marks-${Date.now()}.png`);
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'could not save marks' };
  }
  revalidatePath(`/universes/${slug}`);
  revalidatePath(`/universes/${slug}/review`);
  return { saved: true };
}

// ── front of funnel: lead + intake ───────────────────────────────────────
export type LeadInput = { source: string; contact: string; notes: string };

// capture first-contact notes → lead.md, then move lead → intake.
export async function saveLeadAction(slug: string, input: LeadInput): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  const now = new Date().toISOString();
  await writeArtifact(
    slug,
    'lead.md',
    `---\nuniverse: ${slug}\ntitle: ${u.title}\nartifact: lead\ncreated: ${now}\n---\n\n# ${u.title} — first contact\n\n## Source\n${input.source.trim() || '_where this lead came from_'}\n\n## Contact\n${input.contact.trim() || '_name / handle (no private data)_'}\n\n## Notes\n${input.notes.trim() || '_what they want, first impressions_'}\n`,
  );
  if (stateIndex(u.state) < stateIndex('intake')) {
    await appendTransition(slug, 'intake', 'first contact captured');
  }
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}

export type Transparency = 'open' | 'partial' | 'closed';
export type IntakeInput = {
  goal: string;
  audience: string;
  world: string;
  scope: string;
  constraints: string;
  deliverables: string;
  risks: string;
  evaluation: string;
  transparency: Transparency;
};

// structured intake → intake.md. The transparency field gates the case study at handoff (P5).
export async function saveIntakeAction(
  slug: string,
  input: IntakeInput,
): Promise<{ error?: string }> {
  if (!isValidSlug(slug)) return { error: 'invalid slug' };
  const u = await readUniverse(slug);
  if (!u) return { error: 'unknown universe' };
  const now = new Date().toISOString();
  const t = (['open', 'partial', 'closed'] as const).includes(input.transparency)
    ? input.transparency
    : 'closed';
  const sec = (label: string, v: string) => `## ${label}\n${v.trim() || '_…_'}\n`;
  await writeArtifact(
    slug,
    'intake.md',
    `---\nuniverse: ${slug}\ntitle: ${u.title}\ncreated: ${now}\nstatus: intake-complete\ntransparency: ${t}\nnext: /kiruk-spec ${slug}\n---\n\n# ${u.title} — intake\n\n` +
      sec('Goal', input.goal) +
      sec('Audience', input.audience) +
      sec('World / Metaphor', input.world) +
      sec('Scope', input.scope) +
      sec('Constraints', input.constraints) +
      sec('Deliverables', input.deliverables) +
      sec('Risks', input.risks) +
      sec('Evaluation', input.evaluation),
  );
  revalidatePath('/universes');
  revalidatePath(`/universes/${slug}`);
  redirect(`/universes/${slug}`);
}
