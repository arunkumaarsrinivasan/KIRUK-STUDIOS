// lifecycle-model — PURE constants + types for the client-lifecycle state machine.
// No node:fs here, so both client and server code can import it safely.
// The fs-backed engine lives in lifecycle.ts (server-only) and re-uses these.

export const STATES = ['lead', 'intake', 'proposal', 'engaged', 'shipping', 'archived'] as const;
export type State = (typeof STATES)[number];

// per-state metadata: required artifact (client-lifecycle spec), the eye pattern that represents
// it in the UI, a label, and a one-line blurb.
export const LIFECYCLE: Record<
  State,
  { label: string; pattern: string; artifact: string | null; blurb: string }
> = {
  lead: { label: 'lead', pattern: 'ring', artifact: 'lead.md', blurb: 'first contact' },
  intake: { label: 'intake', pattern: 'solid', artifact: 'intake.md', blurb: 'structured brief' },
  proposal: {
    label: 'proposal',
    pattern: 'portal',
    artifact: 'proposal.md',
    blurb: 'scribble proposal',
  },
  engaged: {
    label: 'engaged',
    pattern: 'slit',
    artifact: 'contract.md',
    blurb: 'signed · building',
  },
  shipping: { label: 'shipping', pattern: 'hatch', artifact: 'spec.md', blurb: 'in production' },
  archived: {
    label: 'handoff',
    pattern: 'constellation',
    artifact: 'handoff.md',
    blurb: 'handed off',
  },
};

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug) && slug.length >= 2 && slug.length <= 60;
}

export function stateIndex(s: State): number {
  return STATES.indexOf(s);
}

export function nextState(s: State): State | null {
  const i = stateIndex(s);
  return i >= 0 && i < STATES.length - 1 ? (STATES[i + 1] as State) : null;
}

// gate a transition on its required precondition (client-lifecycle + pen-and-paper specs).
// Returns ok=false with a message + a fix-screen kind when the move is blocked.
export type FixKind = 'proposal' | 'contract' | 'spec' | 'handoff';
export function precondition(
  from: State,
  to: State,
  ctx: { scribbleCount: number; artifacts: Record<string, boolean> },
): { ok: boolean; message?: string; fix?: FixKind } {
  if (from === 'intake' && to === 'proposal' && ctx.scribbleCount === 0) {
    return {
      ok: false,
      message: 'a scribble is required before a proposal (pen-and-paper)',
      fix: 'proposal',
    };
  }
  if (from === 'proposal' && to === 'engaged' && !ctx.artifacts['contract.md']) {
    return { ok: false, message: 'draft + sign the contract before engaging', fix: 'contract' };
  }
  if (from === 'engaged' && to === 'shipping' && !ctx.artifacts['spec.md']) {
    return {
      ok: false,
      message: 'create the universe spec.md (run /kiruk-spec) before shipping',
      fix: 'spec',
    };
  }
  if (from === 'shipping' && to === 'archived' && !ctx.artifacts['handoff.md']) {
    return { ok: false, message: 'write the handoff before archiving', fix: 'handoff' };
  }
  return { ok: true };
}

export type Transition = { when: string; from: string; to: string; trigger: string; why: string };

export type UniverseSummary = {
  slug: string;
  title: string;
  state: State;
  created: string;
  updated: string;
  needsInit: boolean;
};

export type UniverseDetail = UniverseSummary & {
  transitions: Transition[];
  artifacts: Record<string, boolean>;
  scribbleCount: number;
  scribbles: string[]; // filenames under scribble/, sorted
};
