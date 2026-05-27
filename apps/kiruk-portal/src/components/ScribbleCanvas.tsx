'use client';

import { useEffect, useRef, useState } from 'react';

type Pt = { x: number; y: number; p: number };

// The scribble-proposal surface. Pen-and-paper, on screen: sketch the idea in graphite,
// undo/clear, export as PNG to hand to the client. Slice 1 — single user, local. Saving into
// a universe + client mark-back come in later slices.
export default function ScribbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const apiRef = useRef<{ undo: () => void; clear: () => void; exportPng: () => void } | null>(
    null,
  );
  const [strokeCount, setStrokeCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--ink').trim() || '#0a0a0a';
    const paper = css.getPropertyValue('--paper').trim() || '#ffffff';
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const strokes: Pt[][] = [];
    let current: Pt[] | null = null;
    let drawing = false;

    const fillPaper = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const drawSeg = (a: Pt, b: Pt) => {
      ctx.strokeStyle = ink;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = (1.4 + b.p * 4) * dpr;
      ctx.beginPath();
      ctx.moveTo(a.x * dpr, a.y * dpr);
      ctx.lineTo(b.x * dpr, b.y * dpr);
      ctx.stroke();
    };

    const drawDot = (b: Pt) => {
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(b.x * dpr, b.y * dpr, (0.9 + b.p * 2) * dpr, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStroke = (s: Pt[]) => {
      if (s.length === 1 && s[0]) {
        drawDot(s[0]);
        return;
      }
      for (let i = 1; i < s.length; i++) {
        const a = s[i - 1];
        const b = s[i];
        if (a && b) drawSeg(a, b);
      }
    };

    const redraw = () => {
      fillPaper();
      for (const s of strokes) drawStroke(s);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(r.width * dpr));
      canvas.height = Math.max(1, Math.floor(r.height * dpr));
      redraw();
    };

    const pos = (e: PointerEvent): Pt => {
      const r = canvas.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        p: e.pressure > 0 ? e.pressure : 0.5,
      };
    };

    const onDown = (e: PointerEvent) => {
      drawing = true;
      current = [pos(e)];
      strokes.push(current);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* synthetic / already-captured pointer — capture is optional */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!drawing || !current) return;
      const pt = pos(e);
      const last = current[current.length - 1];
      current.push(pt);
      if (last) drawSeg(last, pt);
    };
    const onUp = () => {
      if (!drawing) return;
      drawing = false;
      if (current && current.length === 1) drawStroke(current);
      current = null;
      setStrokeCount(strokes.length);
    };

    apiRef.current = {
      undo: () => {
        strokes.pop();
        redraw();
        setStrokeCount(strokes.length);
      },
      clear: () => {
        strokes.length = 0;
        redraw();
        setStrokeCount(0);
      },
      exportPng: () => {
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `kiruk-scribble-proposal-${Date.now()}.png`;
        a.click();
      },
    };

    resize();
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      ro.disconnect();
      apiRef.current = null;
    };
  }, []);

  return (
    <div className="flex h-[100svh] flex-col gap-3 p-4 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="handwritten text-pencil text-base">
          scribble the proposal &mdash; {strokeCount} stroke{strokeCount === 1 ? '' : 's'}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="sketch-button text-sm"
            onClick={() => apiRef.current?.undo()}
          >
            undo
          </button>
          <button
            type="button"
            className="sketch-button text-sm"
            onClick={() => apiRef.current?.clear()}
          >
            clear
          </button>
          <button
            type="button"
            className="sketch-button text-sm"
            onClick={() => apiRef.current?.exportPng()}
          >
            export &darr;
          </button>
        </div>
      </div>

      <div className="sketch-border min-h-0 flex-1 overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full touch-none" style={{ display: 'block' }} />
      </div>
    </div>
  );
}
