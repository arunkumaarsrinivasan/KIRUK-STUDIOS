'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Eye lab — the 3D eye (R3F, FOUNDER_DECISIONS AG2). Client-only: three loads in the browser
// (ssr:false) so SSR never touches WebGL. Renders the procedural sketch eye until /eye/eye.glb
// (authored in Blender) lands, then swaps it in automatically.
const EyeScene = dynamic(() => import('@/components/EyeScene'), {
  ssr: false,
  loading: () => <p className="handwritten text-pencil">waking the eye…</p>,
});

export default function Eye3DPage() {
  return (
    <main className="bg-paper relative grid min-h-[100svh] w-full place-items-center overflow-hidden px-6">
      <div className="bg-grid bg-dots" aria-hidden="true" />
      <section className="relative flex flex-col items-center gap-6 text-center">
        <p className="handwritten text-pencil text-sm tracking-wide">kiruk eye — lab</p>
        <h1 className="font-wordmark text-ink text-5xl md:text-7xl">the eye, in 3D</h1>
        <EyeScene size={360} />
        <p className="handwritten text-pencil max-w-md text-base">
          Move your pointer — it watches. This is the procedural sketch eye; drop a Blender-authored{' '}
          <code>/eye/eye.glb</code> and it swaps in automatically.
        </p>
        <Link href="/" className="sketch-button handwritten text-lg">
          <span aria-hidden="true">&larr;</span> back to the desk
        </Link>
      </section>
    </main>
  );
}
