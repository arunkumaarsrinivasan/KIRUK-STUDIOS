import { describe, expect, it } from 'vitest';
import {
  isValidSlug,
  nextState,
  precondition,
  STATES,
  type State,
  stateIndex,
} from './lifecycle-model';

const noArt: Record<string, boolean> = {};

describe('STATES order', () => {
  it('is the canonical six-state machine', () => {
    expect(STATES).toEqual(['lead', 'intake', 'proposal', 'engaged', 'shipping', 'archived']);
  });
});

describe('nextState', () => {
  it('advances linearly', () => {
    expect(nextState('lead')).toBe('intake');
    expect(nextState('proposal')).toBe('engaged');
    expect(nextState('shipping')).toBe('archived');
  });
  it('returns null at the terminal state', () => {
    expect(nextState('archived')).toBeNull();
  });
});

describe('stateIndex', () => {
  it('orders states', () => {
    expect(stateIndex('lead')).toBeLessThan(stateIndex('proposal'));
    expect(stateIndex('engaged')).toBeLessThan(stateIndex('archived'));
  });
});

describe('isValidSlug', () => {
  it('accepts kebab-case', () => {
    expect(isValidSlug('midnight-atlas')).toBe(true);
    expect(isValidSlug('orbit')).toBe(true);
    expect(isValidSlug('a1-b2-c3')).toBe(true);
  });
  it('rejects bad slugs', () => {
    expect(isValidSlug('Midnight')).toBe(false); // uppercase
    expect(isValidSlug('a')).toBe(false); // too short
    expect(isValidSlug('-x')).toBe(false); // leading hyphen
    expect(isValidSlug('x-')).toBe(false); // trailing hyphen
    expect(isValidSlug('a--b')).toBe(false); // double hyphen
    expect(isValidSlug('a b')).toBe(false); // space
    expect(isValidSlug('a_b')).toBe(false); // underscore
  });
});

describe('precondition gates', () => {
  it('blocks intake → proposal without a scribble', () => {
    const g = precondition('intake', 'proposal', { scribbleCount: 0, artifacts: noArt });
    expect(g.ok).toBe(false);
    expect(g.fix).toBe('proposal');
  });
  it('allows intake → proposal with a scribble', () => {
    const g = precondition('intake', 'proposal', { scribbleCount: 1, artifacts: noArt });
    expect(g.ok).toBe(true);
  });
  it('blocks proposal → engaged without a contract', () => {
    const g = precondition('proposal', 'engaged', { scribbleCount: 1, artifacts: noArt });
    expect(g.ok).toBe(false);
    expect(g.fix).toBe('contract');
  });
  it('allows proposal → engaged with a contract', () => {
    const g = precondition('proposal', 'engaged', {
      scribbleCount: 1,
      artifacts: { 'contract.md': true },
    });
    expect(g.ok).toBe(true);
  });
  it('blocks engaged → shipping without a spec', () => {
    const g = precondition('engaged', 'shipping', { scribbleCount: 1, artifacts: noArt });
    expect(g.ok).toBe(false);
    expect(g.fix).toBe('spec');
  });
  it('blocks shipping → archived without a handoff', () => {
    const g = precondition('shipping', 'archived', { scribbleCount: 1, artifacts: noArt });
    expect(g.ok).toBe(false);
    expect(g.fix).toBe('handoff');
  });
  it('allows shipping → archived with a handoff', () => {
    const g = precondition('shipping', 'archived', {
      scribbleCount: 1,
      artifacts: { 'handoff.md': true },
    });
    expect(g.ok).toBe(true);
  });
  it('does not gate lead → intake', () => {
    const g = precondition('lead', 'intake', { scribbleCount: 0, artifacts: noArt });
    expect(g.ok).toBe(true);
  });
});

describe('every non-terminal state advances', () => {
  it('nextState is defined for all but archived', () => {
    for (const s of STATES) {
      const n = nextState(s as State);
      if (s === 'archived') expect(n).toBeNull();
      else expect(n).not.toBeNull();
    }
  });
});
