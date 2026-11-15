import { Component, Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

useGLTF.setDecoderPath("/draco/");

export function Fit({ size = 2.6, children, scene, center = false }) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.scale.setScalar(1);
    ref.current.position.set(0, 0, 0);
    ref.current.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(ref.current);
    const s = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const max = Math.max(s.x, s.y, s.z) || 1;
    ref.current.scale.setScalar(size / max);
    const k = size / max;
    ref.current.position.set(-c.x * k, center ? -c.y * k : -box.min.y * k, -c.z * k);
  }, [size, scene, center]);
  return <group ref={ref}>{children}</group>;
}

export function Glb({ src, size, center }) {
  const { scene } = useGLTF(src);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return (
    <Fit scene={clone} size={size} center={center}>
      <primitive object={clone} />
    </Fit>
  );
}

export function Loading() {
  return (
    <Html center>
      <div className="viewer-loading">Loading 3D model…</div>
    </Html>
  );
}

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function ModelViewer({ model, fallback, height = 420, transparent = false }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Boundary fallback={fallback}>
      <div className={"viewer" + (transparent ? " clear" : "")} style={{ height }}>
        <Canvas shadows dpr={[1, 2]} gl={{ alpha: true }} camera={{ position: [3.4, 2.2, 4.2], fov: 38 }}>
          {!transparent && <color attach="background" args={["#0a1128"]} />}
          <ambientLight intensity={1.6} />
          <hemisphereLight args={["#bcd7ff", "#6a4a40", 1.1]} />
          <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow />
          <directionalLight position={[-4, 3, -3]} intensity={1.6} color="#7fb5ff" />
          <Stars radius={40} depth={20} count={800} factor={3} fade speed={reduce ? 0 : 1} />
          <Suspense fallback={<Loading />}>
            <Glb src={model.src} size={model.size || 2.6} />
          </Suspense>
          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={8} blur={2.4} far={3} />
          <OrbitControls autoRotate={!reduce} autoRotateSpeed={1.2} enablePan={false} minDistance={2.5} maxDistance={9} target={[0, 1.2, 0]} />
        </Canvas>
        <span className="viewer-hint">Drag to rotate · scroll to zoom</span>
      </div>
    </Boundary>
  );
}
