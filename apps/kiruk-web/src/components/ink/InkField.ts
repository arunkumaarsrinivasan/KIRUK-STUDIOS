import * as THREE from 'three';
import { displayFragment, updateFragment, vertexShader } from './shaders';

export interface InkFieldOptions {
  paper: string;
  ink: string;
  reducedMotion?: boolean;
}

// GPU ink field: ping-pong dye target advected by curl flow + pointer force (UPDATE pass),
// composited over paper with the eye motif revealed (DISPLAY pass). Raw three.js for tight
// render-target control; mounted by InkHero.tsx as a client-only React island.
export class InkField {
  private renderer: THREE.WebGLRenderer;
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private scene = new THREE.Scene();
  private quad: THREE.Mesh;
  private geo = new THREE.PlaneGeometry(2, 2);
  private updateMat: THREE.ShaderMaterial;
  private displayMat: THREE.ShaderMaterial;
  private rtA: THREE.WebGLRenderTarget;
  private rtB: THREE.WebGLRenderTarget;

  // Typed uniform holders (shared by reference with the materials) so reads stay type-safe
  // under noUncheckedIndexedAccess — avoids material.uniforms[...] index access.
  private uUpdate = {
    uPrev: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uDissipation: { value: 0.997 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uPointerVel: { value: new THREE.Vector2(0, 0) },
    uMoving: { value: 0 },
    uRadius: { value: 0.06 },
    uAspect: { value: 1 },
  };
  private uDisplay = {
    uDye: { value: null as THREE.Texture | null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uPaper: { value: new THREE.Color() },
    uInk: { value: new THREE.Color() },
  };

  private dpr: number;
  private simScale = 0.6;
  private width = 1;
  private height = 1;

  private pointer = new THREE.Vector2(0.5, 0.5);
  private pointerPrev = new THREE.Vector2(0.5, 0.5);
  private pointerVel = new THREE.Vector2(0, 0);
  private moving = 0;

  private clock = new THREE.Clock();
  private raf = 0;
  private reduced: boolean;
  private disposed = false;

  constructor(
    private canvas: HTMLCanvasElement,
    opts: InkFieldOptions,
  ) {
    this.reduced = !!opts.reducedMotion;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.uDisplay.uPaper.value.set(opts.paper);
    this.uDisplay.uInk.value.set(opts.ink);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });

    this.updateMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: updateFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: this.uUpdate,
    });

    this.displayMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: displayFragment,
      depthTest: false,
      depthWrite: false,
      uniforms: this.uDisplay,
    });

    this.quad = new THREE.Mesh(this.geo, this.updateMat);
    this.scene.add(this.quad);

    const [a, b] = this.makeTargets();
    this.rtA = a;
    this.rtB = b;

    this.syncSize();
    this.remakeTargets();
    this.clearTargets();
    this.bind();

    if (this.reduced) {
      this.renderDisplay(0);
    } else {
      this.clock.start();
      this.loop();
    }
  }

  private makeTargets(): [THREE.WebGLRenderTarget, THREE.WebGLRenderTarget] {
    const w = Math.max(2, Math.floor(this.width * this.dpr * this.simScale));
    const h = Math.max(2, Math.floor(this.height * this.dpr * this.simScale));
    const params: THREE.RenderTargetOptions = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      depthBuffer: false,
      stencilBuffer: false,
    };
    return [new THREE.WebGLRenderTarget(w, h, params), new THREE.WebGLRenderTarget(w, h, params)];
  }

  private remakeTargets() {
    this.rtA.dispose();
    this.rtB.dispose();
    const [a, b] = this.makeTargets();
    this.rtA = a;
    this.rtB = b;
  }

  private clearTargets() {
    const prev = this.renderer.getClearColor(new THREE.Color());
    const prevAlpha = this.renderer.getClearAlpha();
    this.renderer.setClearColor(0x000000, 0);
    for (const rt of [this.rtA, this.rtB]) {
      this.renderer.setRenderTarget(rt);
      this.renderer.clear(true, false, false);
    }
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(prev, prevAlpha);
  }

  private syncSize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    const aspect = this.width / this.height;

    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(this.width, this.height, false);

    this.uUpdate.uAspect.value = aspect;
    this.uDisplay.uAspect.value = aspect;
    this.uDisplay.uResolution.value.set(this.width * this.dpr, this.height * this.dpr);
  }

  private bind() {
    this.canvas.addEventListener('pointermove', this.onPointer, { passive: true });
    this.canvas.addEventListener('pointerdown', this.onPointer, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  private onPointer = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(
      (e.clientX - rect.left) / rect.width,
      1 - (e.clientY - rect.top) / rect.height,
    );
  };

  private onResize = () => {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.syncSize();
    this.remakeTargets();
    this.clearTargets();
    if (this.reduced) this.renderDisplay(0);
  };

  private step(t: number) {
    // UPDATE: read rtA, write rtB
    this.quad.material = this.updateMat;
    this.uUpdate.uPrev.value = this.rtA.texture;
    this.uUpdate.uTime.value = t;
    this.uUpdate.uPointer.value.copy(this.pointer);
    this.uUpdate.uPointerVel.value.copy(this.pointerVel);
    this.uUpdate.uMoving.value = this.moving;
    this.renderer.setRenderTarget(this.rtB);
    this.renderer.render(this.scene, this.camera);

    const tmp = this.rtA;
    this.rtA = this.rtB;
    this.rtB = tmp;

    this.renderDisplay(t);
  }

  private renderDisplay(t: number) {
    this.quad.material = this.displayMat;
    this.uDisplay.uDye.value = this.rtA.texture;
    this.uDisplay.uTime.value = t;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
  }

  private loop = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.loop);

    this.clock.getDelta();
    const t = this.clock.elapsedTime;

    this.pointerVel.subVectors(this.pointer, this.pointerPrev);
    this.moving = Math.min(this.pointerVel.length() * 90, 1);
    this.pointerPrev.copy(this.pointer);

    this.step(t);
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.canvas.removeEventListener('pointermove', this.onPointer);
    this.canvas.removeEventListener('pointerdown', this.onPointer);
    window.removeEventListener('resize', this.onResize);
    this.rtA.dispose();
    this.rtB.dispose();
    this.geo.dispose();
    this.updateMat.dispose();
    this.displayMat.dispose();
    this.renderer.dispose();
  }
}
