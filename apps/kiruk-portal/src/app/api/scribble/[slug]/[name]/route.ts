// Serve a universe scribble image from kiruk-projects/<slug>/scribble/<name>. Validated against
// path traversal in readScribbleBytes. Lets the review page load the original proposal scribble.

import { readScribbleBytes } from '@/lib/lifecycle';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; name: string }> },
) {
  const { slug, name } = await params;
  const bytes = await readScribbleBytes(slug, decodeURIComponent(name));
  if (!bytes) return new Response('not found', { status: 404 });
  const ct = name.endsWith('.svg')
    ? 'image/svg+xml'
    : /jpe?g$/i.test(name)
      ? 'image/jpeg'
      : 'image/png';
  return new Response(new Uint8Array(bytes), {
    headers: { 'Content-Type': ct, 'Cache-Control': 'no-store' },
  });
}
