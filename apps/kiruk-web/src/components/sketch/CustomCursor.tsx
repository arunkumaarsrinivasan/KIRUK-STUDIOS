import { useEffect, useRef, useState } from 'react';

// Hand-drawn eye cursor (kiruk-in signature). The eye body trails the pointer with a
// spring; the pupil leads toward the direction of motion. Blinks on click. Fine-pointer
// only — hidden on touch. Mounted client:only as a React island.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);
  const lidRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.style.cursor = 'none';

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eye = { x: target.x, y: target.y };
    let raf = 0;
    let blinkUntil = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onDown = () => {
      blinkUntil = performance.now() + 130;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      eye.x += (target.x - eye.x) * 0.18;
      eye.y += (target.y - eye.y) * 0.18;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate(${eye.x}px, ${eye.y}px) translate(-50%, -50%)`;
      }
      // pupil leads toward where the pointer is relative to the trailing eye
      const dx = target.x - eye.x;
      const dy = target.y - eye.y;
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.min(len, 6);
      if (pupilRef.current) {
        pupilRef.current.setAttribute('cx', String((dx / len) * reach));
        pupilRef.current.setAttribute('cy', String((dy / len) * reach));
      }
      if (lidRef.current) {
        const blinking = performance.now() < blinkUntil;
        lidRef.current.style.transform = blinking ? 'scaleY(0.08)' : 'scaleY(1)';
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.style.cursor = '';
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
        willChange: 'transform',
      }}
    >
      <svg width="58" height="40" viewBox="-29 -20 58 40" fill="none" aria-hidden="true">
        <g ref={lidRef} style={{ transformOrigin: 'center', transition: 'transform 90ms ease' }}>
          {/* hand-drawn almond eye */}
          <path
            d="M -24 1 Q -2 -16 24 -1 Q 2 16 -24 1 Z"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* iris */}
          <circle cx="0" cy="0" r="9.5" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.6" />
          {/* pupil (animated) */}
          <circle ref={pupilRef} cx="0" cy="0" r="4.4" fill="var(--ink)" />
          {/* catch-light */}
          <circle cx="3" cy="-3" r="1.3" fill="var(--paper)" />
        </g>
      </svg>
    </div>
  );
}
