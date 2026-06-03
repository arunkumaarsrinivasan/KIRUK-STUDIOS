'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signOut } from '@/lib/auth-client';
import RiggedGlyph from './RiggedGlyph';

// SignOutButton — sketch button that ends the client session and walks them back to sign-in.
export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const leave = async () => {
    setBusy(true);
    try {
      await signOut();
    } catch {
      /* even if the call hiccups, send them to the door */
    }
    router.push('/sign-in');
  };

  return (
    <button
      type="button"
      onClick={leave}
      disabled={busy}
      className="sketch-button flex items-center gap-2 text-sm"
      aria-label="sign out"
    >
      <RiggedGlyph pattern="slit" size={18} />
      {busy ? 'leaving…' : 'sign out'}
    </button>
  );
}
