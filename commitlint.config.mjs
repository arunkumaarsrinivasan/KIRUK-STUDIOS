/**
 * Conventional Commits — enforced via commitlint + Husky.
 * Allowed types reflect kiruk's workflow:
 *  - feat / fix / refactor / perf / test / build / ci / chore / docs (standard)
 *  - spec / token / idea (kiruk-specific surfaces)
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'docs',
        'spec',
        'token',
        'idea',
        'revert',
        'style',
      ],
    ],
    'subject-case': [0],
    'header-max-length': [2, 'always', 100],
  },
};
