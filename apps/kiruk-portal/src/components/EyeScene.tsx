'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Component, type ReactNode, Suspense, useRef } from 'react';
import type { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// EyeScene — the kiruk eye in 3D (R3F pipeline, FOUNDER_DECISIONS AG2). It tries to load the
// founder/Blender-authored /eye/eye.glb; until that file exists (or if it fails), it renders a
// PROCEDURAL sketch eye built from primitives so the surface always works. Either way the eye
// gaze-tracks the pointer. B&W sketch look = white eyeball + inverted-hull black outline.

const GLB_SRC = '/eye/eye.glb';
const INK = '#0a0a0a';
const PAPER = '#ffffff';

// shared gaze: rotate a group toward the pointer (NDC), eased.
function useGaze(ref: React.RefObject<Group | null>, amount = 0.5) {
  const { pointer } = useThree();
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += (pointer.x * amount - g.rotation.y) * 0.08;
    g.rotation.x += (-pointer.y * amount * 0.8 - g.rotation.x) * 0.08;
  });
}

// Inverted-hull outline → crisp black sketch edge. Rendered at scene root so BOTH the glb and
// the procedural eye get the same silhouette rim (the white eyeball would vanish on paper otherwise).
function OutlineHull() {
  return (
    <mesh scale={1.045}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshBasicMaterial color={INK} side={1 /* BackSide */} />
    </mesh>
  );
}

// Procedural fallback — eyeball + iris ring + pupil + catchlight, sketch-styled.
function ProceduralEye() {
  const ref = useRef<Group>(null);
  useGaze(ref);
  return (
    <group ref={ref}>
      {/* eyeball */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color={PAPER} roughness={0.7} metalness={0} />
      </mesh>
      {/* iris ring */}
      <mesh position={[0, 0, 0.9]}>
        <torusGeometry args={[0.34, 0.045, 10, 40]} />
        <meshBasicMaterial color={INK} />
      </mesh>
      {/* pupil */}
      <mesh position={[0, 0, 0.95]}>
        <circleGeometry args={[0.16, 32]} />
        <meshBasicMaterial color={INK} />
      </mesh>
      {/* catchlight */}
      <mesh position={[0.1, 0.12, 0.99]}>
        <circleGeometry args={[0.045, 16]} />
        <meshBasicMaterial color={PAPER} />
      </mesh>
    </group>
  );
}

// GLTF eye — loads the authored asset; suspends while loading, throws if absent (caught below).
function GltfEye() {
  const ref = useRef<Group>(null);
  useGaze(ref);
  const gltf = useLoader(GLTFLoader, GLB_SRC);
  return (
    <group ref={ref}>
      <primitive object={gltf.scene} />
    </group>
  );
}

// If the glb is missing / fails, fall back to the procedural eye instead of crashing.
class EyeBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function EyeScene({ size = 300, className }: { size?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      role="img"
      aria-label="kiruk eye (3D)"
    >
      <Canvas camera={{ position: [0, 0, 3.1], fov: 42 }} dpr={[1, 2]}>
        <ambientLight intensity={0.85} />
        <directionalLight position={[2, 3, 4]} intensity={0.7} />
        <OutlineHull />
        <EyeBoundary fallback={<ProceduralEye />}>
          <Suspense fallback={<ProceduralEye />}>
            <GltfEye />
          </Suspense>
        </EyeBoundary>
      </Canvas>
    </div>
  );
}
