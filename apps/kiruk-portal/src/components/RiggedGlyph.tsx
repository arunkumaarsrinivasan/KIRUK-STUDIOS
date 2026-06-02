'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import EyeBall, { type EyePattern } from './EyeBall';

// RiggedGlyph — a small chrome eye. Loads the founder's hand-drawn glyph at
// /eye/glyphs/<pattern>.svg and rigs it (pupil look offset + CSS hover dart/dilate, blink,
// closed, active breathe). Until that file exists, falls back to the procedural <EyeBall>,
// so chrome keeps working and upgrades file-by-file. Neutral ink only (no emotion colour).

const SVGNS = 'http://www.w3.org/2000/svg';
const cache = new Map<string, Promise<string | null>>();
function load(src: string) {
  let p = cache.get(src);
  if (!p) {
    p = fetch(src)
      .then((r) => (r.ok ? r.text() : null))
      .then((t) => (t?.includes('<svg') ? t : null))
      .catch(() => null);
    cache.set(src, p);
  }
  return p;
}

export default function RiggedGlyph({
  pattern = 'solid',
  look = 'center',
  open = true,
  size = 28,
  blink = false,
  blinkDelay = 0,
  className,
  style,
}: {
  pattern?: EyePattern;
  look?: 'left' | 'center' | 'right';
  open?: boolean;
  size?: number;
  blink?: boolean;
  blinkDelay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<string | null>(null);

  useEffect(() => {
    let on = true;
    load(`/eye/glyphs/${pattern}.svg`).then((t) => {
      if (on) setArt(t);
    });
    return () => {
      on = false;
    };
  }, [pattern]);

  // rig the injected art: offset pupil by `look`, tag it for CSS hover dart/dilate
  useEffect(() => {
    if (!art) return;
    const svg = hostRef.current?.querySelector('svg') as SVGSVGElement | null;
    if (!svg) return;
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.overflow = 'visible';
    const vb = svg.viewBox.baseVal;
    const travel = Number(svg.dataset.eyeTravel) || (vb ? vb.width * 0.07 : 3.5);
    const pupil = svg.querySelector('#pupil');
    if (pupil?.parentNode) {
      const g = document.createElementNS(SVGNS, 'g');
      const dx = look === 'left' ? -travel : look === 'right' ? travel : 0;
      g.setAttribute('transform', `translate(${dx} 0)`);
      pupil.parentNode.insertBefore(g, pupil);
      g.appendChild(pupil);
      pupil.classList.add('eye-pupil');
    }
  }, [art, look]);

  const isActive = className?.includes('eye-active');
  // one animation per element: active eyes breathe, others blink (if asked)
  const animCls = isActive ? '' : blink ? 'glyph-blink' : '';

  // while loading, or if the glyph file is missing, use the procedural fallback
  if (!art) {
    return (
      <EyeBall
        pattern={pattern}
        look={look}
        open={open}
        size={size}
        blink={blink}
        blinkDelay={blinkDelay}
        className={className}
        style={style}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className={`${className ?? ''} ${animCls}`.trim() || undefined}
      style={{
        width: size,
        height: size,
        transformOrigin: 'center',
        transform: open ? undefined : 'scaleY(0.08)',
        opacity: open ? (style?.opacity ?? 1) : 0.55,
        animationDelay: animCls ? `${blinkDelay}s` : undefined,
        ...style,
      }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted first-party eye glyph from /public
      dangerouslySetInnerHTML={{ __html: art }}
    />
  );
}
