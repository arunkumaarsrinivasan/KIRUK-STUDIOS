'use client';

import { useEffect, useRef, useState } from 'react';

// RiggedEye — loads a HAND-DRAWN eye SVG and brings it alive by id. The art is 100% the
// founder's (drawn in Figma from design/eye-rig.svg, exported to /eye/hero.svg). Code only
// rigs named parts: #pupil gaze-tracks the pointer (watching-eyes) + dilates with engagement
// (pupillometry); #iris + #sparks recolour by INFERRED emotion (pointer velocity, never
// asked); #lid blinks; #sparks (the founder's doodles) grow with engagement = creativity
// unleashed. Until hero.svg exists, a clean minimal fallback eye keeps the same rig contract.

export type Emotion = 'focus' | 'calm' | 'curiosity' | 'anticipation';

export const EMOTION_COLOR: Record<Emotion, string> = {
  focus: '#0a0a0a', // ink — still, neutral default
  calm: '#18E0FF', // cyan — slow, steady
  curiosity: '#B6FF1A', // lime — exploratory wandering
  anticipation: '#FF6A00', // orange — fast, driven
};

function emotionFor(arousal: number): Emotion {
  if (arousal < 0.08) return 'focus';
  if (arousal < 0.3) return 'calm';
  if (arousal < 0.6) return 'curiosity';
  return 'anticipation';
}

const SVGNS = 'http://www.w3.org/2000/svg';

export default function ReactiveEye({
  src = '/eye/hero.svg',
  size = 300,
  onEmotion,
}: {
  src?: string;
  size?: number;
  onEmotion?: (e: { emotion: Emotion; color: string; arousal: number }) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<string | null>(null);
  const onEmotionRef = useRef(onEmotion);
  onEmotionRef.current = onEmotion;

  // load the founder's hand-drawn eye; fall back silently if absent
  useEffect(() => {
    let on = true;
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error('no art'))))
      .then((t) => {
        if (on && t.includes('<svg')) setArt(t);
      })
      .catch(() => {});
    return () => {
      on = false;
    };
  }, [src]);

  // rig whatever SVG is in the host (injected art OR the fallback) by id
  useEffect(() => {
    const host = hostRef.current;
    const svg = host?.querySelector('svg') as SVGSVGElement | null;
    if (!svg) return;
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';

    const vb = svg.viewBox.baseVal;
    const cx = Number(svg.dataset.eyeCx) || (vb ? vb.x + vb.width / 2 : 100);
    const cy = Number(svg.dataset.eyeCy) || (vb ? vb.y + vb.height / 2 : 100);
    const travel = Number(svg.dataset.eyeTravel) || (vb ? vb.width * 0.05 : 11);

    // wrap a node in a fresh <g> we fully control (avoids clobbering baked transforms)
    const wrap = (sel: string): SVGGElement | null => {
      const n = svg.querySelector(sel);
      if (!n || !n.parentNode) return null;
      const g = document.createElementNS(SVGNS, 'g');
      n.parentNode.insertBefore(g, n);
      g.appendChild(n);
      return g;
    };
    const leaves = (sel: string): SVGElement[] => {
      const root = svg.querySelector(sel);
      if (!root) return [];
      const out: SVGElement[] = [];
      if (root.children.length === 0) out.push(root as SVGElement);
      for (const e of root.querySelectorAll('*')) out.push(e as SVGElement);
      return out;
    };

    const pupil = wrap('#pupil');
    const sparks = wrap('#sparks');
    const lid = wrap('#lid');
    const irisLeaves = leaves('#iris');
    const sparkLeaves = leaves('#sparks');
    let lidTop = cy;
    if (lid) {
      try {
        lidTop = lid.getBBox().y;
      } catch {
        /* not yet measurable */
      }
    }

    const recolor = (nodes: SVGElement[], color: string) => {
      for (const el of nodes) {
        const s = el.getAttribute('stroke');
        const f = el.getAttribute('fill');
        el.style.transition = 'stroke 320ms ease, fill 320ms ease';
        if (s && s !== 'none') el.style.stroke = color;
        if (f && f !== 'none') el.style.fill = color;
      }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // halt the SVG "pencil boil" (SMIL turbulence) when the user prefers reduced motion
    if (reduce) {
      try {
        svg.pauseAnimations();
      } catch {
        /* not supported */
      }
    }
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let lastX = px;
    let lastY = py;
    let lastT = performance.now();
    let arousal = 0;
    let lastMoveT = performance.now();
    let ox = 0;
    let oy = 0;
    let curEmotion: Emotion | null = null;
    let nextBlink = performance.now() + 2500 + Math.random() * 3000;
    let blinkPhase = 0;
    const VREF = 2.2;

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      arousal = Math.max(arousal, Math.min(1, dist / dt / VREF));
      px = e.clientX;
      py = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      lastMoveT = now;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let rot = 0;
    const tick = () => {
      const now = performance.now();
      arousal *= 0.95;
      rot = (rot + 0.1 * (0.3 + arousal)) % 360;

      let tx = px;
      let ty = py;
      if (!reduce && now - lastMoveT > 1800) {
        const t = now / 1400;
        tx = window.innerWidth / 2 + Math.cos(t) * window.innerWidth * 0.18;
        ty = window.innerHeight / 2 + Math.sin(t * 0.8) * window.innerHeight * 0.14;
      }

      const r = svg.getBoundingClientRect();
      const ecx = r.left + r.width / 2;
      const ecy = r.top + r.height / 2;
      const ang = Math.atan2(ty - ecy, tx - ecx);
      const mag = Math.min(travel, Math.hypot(tx - ecx, ty - ecy) / 40);
      const k = reduce ? 1 : 0.18;
      ox += (Math.cos(ang) * mag - ox) * k;
      oy += (Math.sin(ang) * mag - oy) * k;

      if (!reduce) {
        if (blinkPhase === 0 && now >= nextBlink) blinkPhase = 0.0001;
        if (blinkPhase > 0) {
          blinkPhase += 0.12;
          if (blinkPhase >= 2) {
            blinkPhase = 0;
            nextBlink = now + 2500 + Math.random() * 3500;
          }
        }
      }
      const shut = blinkPhase === 0 ? 0 : 1 - Math.abs(1 - Math.min(blinkPhase, 2));
      const pupilScale = 0.9 + arousal * 0.4;
      const emotion = emotionFor(arousal);

      if (pupil) {
        pupil.setAttribute(
          'transform',
          `translate(${ox.toFixed(2)} ${oy.toFixed(2)}) translate(${cx} ${cy}) scale(${pupilScale.toFixed(3)}) translate(${-cx} ${-cy})`,
        );
      }
      if (sparks) {
        sparks.style.opacity = (0.12 + arousal * 0.88).toFixed(2);
        const ss = 0.92 + arousal * 0.22;
        sparks.setAttribute(
          'transform',
          `translate(${cx} ${cy}) rotate(${rot.toFixed(2)}) scale(${ss.toFixed(3)}) translate(${-cx} ${-cy})`,
        );
      }
      if (lid) {
        lid.setAttribute(
          'transform',
          `translate(0 ${lidTop}) scale(1 ${shut.toFixed(3)}) translate(0 ${-lidTop})`,
        );
      }
      if (emotion !== curEmotion) {
        curEmotion = emotion;
        const c = EMOTION_COLOR[emotion];
        recolor(irisLeaves, c);
        recolor(sparkLeaves, c);
        onEmotionRef.current?.({ emotion, color: c, arousal });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [art]);

  return (
    <div ref={hostRef} className="mx-auto" style={{ width: size, height: size }}>
      {art ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted first-party eye asset shipped in /public
        <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: art }} />
      ) : (
        <FallbackEye />
      )}
    </div>
  );
}

// Clean minimal eye that follows the SAME rig contract (#iris/#pupil/#sparks/#lid).
// Placeholder until the founder's hero.svg lands.
function FallbackEye() {
  const ALMOND = 'M20 100 Q100 36 180 100 Q100 164 20 100 Z';
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      data-eye-cx="100"
      data-eye-cy="100"
      data-eye-travel="11"
      role="img"
      aria-label="kiruk eye"
      style={{ overflow: 'visible' }}
    >
      <clipPath id="fallback-eye-clip">
        <path d={ALMOND} />
      </clipPath>
      <g id="sparks" fill="none" stroke="#0a0a0a" strokeWidth="1.4" strokeLinecap="round" />
      <path d={ALMOND} fill="#fff" stroke="#0a0a0a" strokeWidth="2.4" strokeLinejoin="round" />
      <g clipPath="url(#fallback-eye-clip)">
        <g id="iris" fill="none" stroke="#0a0a0a">
          <circle cx="100" cy="100" r="40" strokeWidth="2.4" />
          <circle cx="100" cy="100" r="26" strokeWidth="1.2" opacity="0.6" />
        </g>
        <g id="pupil" fill="#0a0a0a">
          <circle cx="100" cy="100" r="13" />
          <circle cx="104" cy="95" r="3.4" fill="#fff" opacity="0.95" />
        </g>
        <g id="lid" transform="translate(0 36) scale(1 0) translate(0 -36)">
          <path d={ALMOND} fill="#fff" />
          <path d="M20 100 Q100 36 180 100" fill="none" stroke="#0a0a0a" strokeWidth="2.4" />
        </g>
      </g>
      <path d={ALMOND} fill="none" stroke="#0a0a0a" strokeWidth="2.4" />
      <path
        d="M30 76 L20 64 M100 36 L100 22 M170 76 L180 64"
        stroke="#0a0a0a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
