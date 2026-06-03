import { useEffect, useRef } from 'react';

// InkHero — NOT ink. A pencil. Drag (or move) anywhere and grainy graphite lands on white paper,
// catching the tooth, staying where you put it. A faint eye waits underneath and surfaces as the
// page fills. Canvas2D (no WebGL) — the old fluid shader read like smoke; this reads like a scribble.
// Matches the devlog "the scribble becomes the interface".

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export default function InkHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ink = cssVar('--ink', '#0a0a0a');
    const paper = cssVar('--paper', '#ffffff');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── faint eye, drawn once behind the scribbles ────────────────────────
    const drawEye = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.26; // eye half-width
      ctx.save();
      ctx.strokeStyle = ink;
      ctx.globalAlpha = 0.05;
      ctx.lineWidth = Math.max(2, R * 0.02);
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      // almond
      ctx.beginPath();
      ctx.moveTo(cx - R, cy);
      ctx.quadraticCurveTo(cx, cy - R * 0.62, cx + R, cy);
      ctx.quadraticCurveTo(cx, cy + R * 0.62, cx - R, cy);
      ctx.stroke();
      // iris + pupil
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.34, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.045;
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const fill = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawEye();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      fill(); // resizing clears — repaint paper + eye (scribbles are ephemeral, by design)
    };

    // ── grainy graphite stamp — scatter dots for pencil tooth ─────────────
    ctx.fillStyle = ink;
    const stamp = (x: number, y: number, radius: number, alpha: number) => {
      const n = 3 + Math.floor(radius * 1.4);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * radius;
        ctx.globalAlpha = alpha * (0.25 + Math.random() * 0.55);
        ctx.beginPath();
        ctx.arc(
          x + Math.cos(a) * d,
          y + Math.sin(a) * d,
          0.5 + Math.random() * 0.9,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let lastX = 0;
    let lastY = 0;
    let has = false;

    const draw = (x: number, y: number, pressure: number, drawing: boolean) => {
      if (!has) {
        lastX = x;
        lastY = y;
        has = true;
        return;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const speed = Math.min(1, dist / 28);
      // pressed drag = darker, wider; hover = a light ghost trail
      const radius = (drawing ? 1.6 : 0.9) + pressure * 2 + speed * 1.4;
      const alpha = drawing ? 0.5 : 0.16;
      const steps = Math.max(1, Math.floor(dist / 2));
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        stamp(lastX + dx * t, lastY + dy * t, radius, alpha);
      }
      lastX = x;
      lastY = y;
    };

    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, p: e.pressure > 0 ? e.pressure : 0 };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y, p } = pos(e);
      draw(x, y, p, e.buttons === 1);
    };
    const onLeave = () => {
      has = false;
    };

    resize();
    if (!reduce) {
      canvas.addEventListener('pointermove', onMove, { passive: true });
      canvas.addEventListener('pointerleave', onLeave);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full touch-none"
      style={{ display: 'block', background: 'var(--paper)' }}
    />
  );
}
