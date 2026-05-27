// GLSL (ES 1.00) for the cursor-sketch field — monochrome graphite on paper.
// Fullscreen quad. Two passes: UPDATE deposits a density field along the cursor path
// (minimal flow so marks stay put like drawn lines); DISPLAY renders that density as
// pencil cross-hatch + paper tooth, and reveals the eye motif as line-art where drawn over.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Ashima 2D simplex noise — used for a faint curl drift and paper tooth.
const simplex = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                    + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`;

export const updateFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uPrev;
  uniform float uTime;
  uniform float uDissipation;
  uniform vec2  uPointer;     // current pointer in uv (0..1, y up)
  uniform vec2  uPointerVel;  // pointer delta this frame, uv space
  uniform float uMoving;      // 0..1 how much the pointer moved
  uniform float uRadius;
  uniform float uAspect;
  ${simplex}

  vec2 curl(vec2 p){
    float e = 0.001;
    float a = snoise(p + vec2(0.0, e));
    float b = snoise(p - vec2(0.0, e));
    float c = snoise(p + vec2(e, 0.0));
    float d = snoise(p - vec2(e, 0.0));
    return vec2((a - b), -(c - d)) / (2.0 * e);
  }

  void main(){
    vec2 uv = vUv;
    vec2 aspect = vec2(uAspect, 1.0);

    // sketch marks barely move — only a whisper of drift + a little drag near the cursor
    vec2 flow = curl(uv * 3.0 + uTime * 0.02) * 0.0004;
    vec2 toP = (uv - uPointer) * aspect;
    float d = length(toP);
    float infl = exp(-d * d / (uRadius * uRadius));
    flow += uPointerVel * infl * 0.3;

    float density = texture2D(uPrev, uv - flow).r;
    density *= uDissipation;

    // lay graphite under a moving cursor — tight, harder-edged stroke (a drawn line)
    float splat = exp(-d * d / (uRadius * uRadius * 0.32));
    density += splat * 0.55 * clamp(uMoving, 0.0, 1.0);

    gl_FragColor = vec4(clamp(density, 0.0, 1.6), 0.0, 0.0, 1.0);
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

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i), b = hash(i + vec2(1.0,0.0));
    float c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
    vec2 u = f*f*(3.0 - 2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }

  // one set of parallel pencil lines at angle dir, spacing/width in pixels
  float lineMask(vec2 px, float dir, float spacing, float width){
    float c = px.x * cos(dir) + px.y * sin(dir);
    float dist = abs(fract(c / spacing) - 0.5) * spacing;
    return smoothstep(width, 0.0, dist);
  }

  // graphite coverage [0..1] for a target darkness a — cross-hatch builds up with darkness,
  // broken by paper tooth so it reads as pencil, not flat fill.
  float pencil(vec2 px, float a){
    if (a < 0.001) return 0.0;
    float tooth = vnoise(px * 0.7);
    float s = 7.0;
    float h1 = lineMask(px,  0.62, s,        1.2);
    float h2 = lineMask(px, -0.62, s,        1.2);
    float h3 = lineMask(px,  1.92, s * 0.9,  1.1);
    float cov = 0.0;
    cov = max(cov, h1 * smoothstep(0.04, 0.34, a));
    cov = max(cov, h2 * smoothstep(0.30, 0.60, a));
    cov = max(cov, h3 * smoothstep(0.55, 0.85, a));
    cov = max(cov, smoothstep(0.82, 1.0, a));   // solid core for the darkest marks
    cov *= 0.58 + 0.42 * tooth;                 // graphite grabs the tooth
    return clamp(cov, 0.0, 1.0);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    vec2 px = uv * uResolution.xy;

    float density = texture2D(uDye, uv).r;

    // ---- paper ground: tooth + faint speckle + vignette ----
    float tooth = vnoise(px * 0.6);
    vec3 paper = uPaper - tooth * 0.03;
    paper -= step(0.995, hash(floor(px * 0.5))) * 0.04;
    float vig = smoothstep(1.2, 0.3, length(p));
    paper *= mix(0.94, 1.0, vig);

    // ---- eye line-art (EyePrimary proportions) ----
    float R = 0.30;
    float dC = length(p);
    float irisR = R * 0.5;
    float pupilR = R * 0.2;
    float outline  = smoothstep(0.0045, 0.0, abs(dC - R));
    float irisRing = smoothstep(0.0040, 0.0, abs(dC - irisR));
    float pupil    = smoothstep(pupilR, pupilR - 0.006, dC);
    float eyeLines = max(outline, irisRing);

    // ---- darkness at this pixel ----
    float drawn = smoothstep(0.03, 0.5, density);          // free-hand scribble
    float amount = drawn;
    amount = max(amount, eyeLines * drawn);                 // eye contour emerges where drawn over
    amount = max(amount, pupil * drawn);                    // pupil fills in where drawn
    float emboss = eyeLines * 0.08 + pupil * 0.05;          // faint always-on motif (non-neg #4)

    float cov = max(pencil(px, amount), emboss);

    vec3 col = mix(paper, uInk, cov);
    col -= (hash(px + uTime) - 0.5) * 0.015;                // fine film grain

    gl_FragColor = vec4(col, 1.0);
  }
`;
