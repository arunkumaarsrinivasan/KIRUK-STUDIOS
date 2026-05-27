// GLSL (ES 1.00) for the cursor-pencil field — monochrome graphite on white paper.
// Marks are STAMPED along the pointer's path (point-to-segment brush), grained by paper
// tooth, and persist like drawn lines. No fluid advection — that read as smoke. The eye
// motif sits faint beneath and darkens where you draw over it.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const noise = /* glsl */ `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0 - 2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  // distance from point p to segment a→b
  float segDist(vec2 p, vec2 a, vec2 b){
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
    return length(pa - ba * h);
  }
`;

export const updateFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPrev;
  uniform float uPersist;   // how long graphite lingers (≈0.997)
  uniform vec2  uP0;        // previous pointer (uv)
  uniform vec2  uP1;        // current pointer (uv)
  uniform float uDraw;      // 1 while the pen is moving, else 0
  uniform float uWidth;     // brush half-width (aspect-corrected uv)
  uniform float uPressure;  // 0..1 — slower pen = darker, like real pressure
  uniform float uAspect;
  ${noise}

  void main(){
    vec2 uv = vUv;
    vec2 asp = vec2(uAspect, 1.0);

    float d = segDist(uv * asp, uP0 * asp, uP1 * asp);

    // soft brush core, edge eroded by paper tooth so the line is grainy, not solid
    float tooth = vnoise(uv * asp * 900.0);
    float brush = smoothstep(uWidth, 0.0, d);
    float grain = 0.25 + 0.75 * tooth;       // broken graphite — keeps grainy holes
    float stamp = brush * grain * uDraw * mix(0.5, 1.1, uPressure);

    float prev = texture2D(uPrev, uv).r;
    float density = prev * uPersist + stamp;

    gl_FragColor = vec4(clamp(density, 0.0, 1.8), 0.0, 0.0, 1.0);
  }
`;

export const displayFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uDye;
  uniform vec2  uResolution;
  uniform float uTime;
  uniform float uAspect;
  uniform vec3  uPaper;
  uniform vec3  uInk;
  ${noise}

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    vec2 px = uv * uResolution.xy;

    float density = texture2D(uDye, uv).r;

    // ---- paper ground: tooth + faint speckle + vignette ----
    float tooth = vnoise(px * 0.6);
    vec3 paper = uPaper - tooth * 0.02;
    paper -= step(0.996, hash(floor(px * 0.5))) * 0.04;
    float vig = smoothstep(1.2, 0.3, length(p));
    paper *= mix(0.95, 1.0, vig);

    // ---- eye line-art beneath (EyePrimary proportions), revealed by drawing ----
    float R = 0.30;
    float dC = length(p);
    float outline  = smoothstep(0.0045, 0.0, abs(dC - R));
    float irisRing = smoothstep(0.0040, 0.0, abs(dC - R * 0.5));
    float pupil    = smoothstep(R * 0.2, R * 0.2 - 0.006, dC);
    float eyeLines = max(outline, irisRing);

    // ---- graphite line from stamped density (grainy, not a flat fill) ----
    float fineGrain = vnoise(px * 1.3);
    float line = smoothstep(0.04, 0.4, density) * (0.6 + 0.5 * fineGrain);

    float amount = line;
    amount = max(amount, eyeLines * line);          // eye contour surfaces where drawn over
    amount = max(amount, pupil * line);             // pupil fills where drawn
    float emboss = eyeLines * 0.06 + pupil * 0.04;  // faint always-on motif (non-neg #4)

    vec3 col = mix(paper, uInk, clamp(max(amount, emboss), 0.0, 1.0));
    col -= (hash(px + uTime) - 0.5) * 0.012;         // fine film grain

    gl_FragColor = vec4(col, 1.0);
  }
`;
