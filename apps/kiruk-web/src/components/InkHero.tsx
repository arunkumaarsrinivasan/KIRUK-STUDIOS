import { useEffect, useRef } from 'react';
import { InkField } from './ink/InkField';

// Reads the live hero palette from CSS custom properties so the shader stays in sync
// with global.css (single source of truth — no duplicated hex literals).
function readPalette() {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    paper: get('--paper', '#ffffff'),
    ink: get('--ink', '#0a0a0a'),
  };
}

export default function InkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const palette = readPalette();

    let field: InkField | null = null;
    try {
      field = new InkField(canvas, { ...palette, reducedMotion });
    } catch (err) {
      // WebGL unavailable — leave the paper-coloured canvas background as a graceful fallback.
      console.error('[InkHero] WebGL init failed', err);
    }

    return () => field?.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full touch-none"
      style={{ display: 'block', background: 'var(--paper)' }}
    />
  );
}
