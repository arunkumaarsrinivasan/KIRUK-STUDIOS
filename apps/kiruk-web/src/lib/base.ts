// Base-path helper. Astro's `base` (/studio) is NOT auto-applied to anchor hrefs,
// so all internal links go through href(). When the dedicated domain lands, only
// astro.config.mjs `base` changes — call sites stay put (tech-stack spec).
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal route with the configured base path. */
export const href = (path: string): string => {
  if (!path.startsWith('/')) return path; // external / hash / mailto untouched
  return path === '/' ? `${BASE}/` : `${BASE}${path}`;
};

/** Normalize a pathname back to a base-less route for active-link comparison. */
export const stripBase = (pathname: string): string => {
  const p = pathname.replace(BASE, '').replace(/\/$/, '');
  return p || '/';
};
