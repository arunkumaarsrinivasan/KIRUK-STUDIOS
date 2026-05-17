/**
 * size-limit — per-route JS budgets. Wired to Lighthouse CI later.
 * Governed by openspec/specs/tech-stack/spec.md → "Performance budgets per route".
 *
 * Add real entries once apps ship build output. Each entry must:
 *   - name a target path (post-build),
 *   - declare a limit aligned with the tech-stack budget table.
 */
module.exports = [
  // Placeholder; replace with real built bundles when apps are wired up.
  // {
  //   name: 'kiruk-web — static route (manifesto)',
  //   path: 'apps/kiruk-web/dist/manifesto/index.html',
  //   limit: '50 KB',
  // },
  // {
  //   name: 'kiruk-web — homepage (with WebGL island)',
  //   path: 'apps/kiruk-web/dist/_astro/*.js',
  //   limit: '150 KB',
  // },
  // {
  //   name: 'kiruk-portal — dashboard',
  //   path: 'apps/kiruk-portal/.next/static/chunks/app/dashboard-*.js',
  //   limit: '250 KB',
  // },
];
