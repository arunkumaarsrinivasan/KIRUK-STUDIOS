'use client';

import { useState, useTransition } from 'react';
import RiggedGlyph from '@/components/RiggedGlyph';
import { signIn } from '@/lib/auth-client';

// Magic-link sign-in. No password — drop your email, get a link. In local dev the link is
// printed in the server console (see lib/auth.ts sendMagicLink). Founders land on /dashboard,
// clients on /client (their universes).
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const send = () => {
    start(async () => {
      setError(null);
      const trimmed = email.trim();
      if (!trimmed) {
        setError('drop an email first');
        return;
      }
      const r = await signIn.magicLink({ email: trimmed, callbackURL: '/dashboard' });
      if (r?.error) {
        setError(r.error.message ?? 'could not send the link — try again');
        return;
      }
      setSent(true);
    });
  };

  return (
    <main className="bg-paper relative min-h-[100svh] w-full px-6 py-10 md:px-10">
      <div className="bg-grid bg-dots" aria-hidden="true" />

      <header className="relative mb-10 flex items-center gap-3">
        <span className="face-mark border-none" aria-hidden="true">
          <RiggedGlyph pattern="portal" size={32} blink blinkDelay={1.2} />
        </span>
        <div className="leading-none">
          <h1 className="brutal text-ink text-4xl">sign in</h1>
          <p className="handwritten text-pencil text-sm">no password — the eye remembers you</p>
        </div>
      </header>

      <section className="relative mx-auto flex w-full max-w-md flex-col gap-6">
        {sent ? (
          <div className="sketch-border flex flex-col gap-3 p-6">
            <p className="handwritten text-ink flex items-center gap-2 text-2xl">
              <RiggedGlyph pattern="star" size={30} open /> check your email
            </p>
            <p className="handwritten text-pencil text-base">
              A magic link is on its way to <strong>{email.trim()}</strong>. Click it to land.
            </p>
            <p className="handwritten text-pencil text-sm">
              In local dev, the link is also printed in the server terminal — copy it from there if
              email does not arrive.
            </p>
            <button
              type="button"
              className="handwritten text-pencil self-start text-sm underline"
              onClick={() => {
                setSent(false);
                setError(null);
              }}
            >
              use a different email
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="handwritten text-ink flex items-center gap-2 text-base">
                <RiggedGlyph pattern="ring" size={20} /> your email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !pending) send();
                }}
                placeholder="you@studio.com"
                className="sketch-border handwritten text-ink px-4 py-2.5 text-lg outline-none"
              />
            </label>

            {error ? <p className="handwritten text-ink text-sm">✕ {error}</p> : null}

            <button
              type="button"
              disabled={pending}
              onClick={send}
              className="eye-btn eye-next gap-3 self-start px-6 py-3 disabled:opacity-40"
              aria-label="send me a link"
            >
              <span className="handwritten text-ink text-lg">
                {pending ? 'sending…' : 'send me a link'}
              </span>
              <RiggedGlyph pattern="portal" look="right" size={28} />
            </button>
          </div>
        )}

        <p className="handwritten text-pencil text-xs">
          founders land on <strong>/dashboard</strong>; clients land on <strong>/client</strong> —
          their universes only.
        </p>
      </section>
    </main>
  );
}
