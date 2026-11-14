import { Component, Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, ContactShadows, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import Procedural from "./ProceduralModels.jsx";

useGLTF.setDecoderPath("/draco/");

function Fit({ size = 2.6, children, scene }) {
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
    ref.current.position.set(-c.x * (size / max), -box.min.y * (size / max), -c.z * (size / max));
  }, [size, scene]);
  return <group ref={ref}>{children}</group>;
}

function Glb({ src, size }) {
  const { scene } = useGLTF(src);
  const clone = useMemo(() => scene.clone(true), [scene]);
  return (
    <Fit scene={clone} size={size}>
      <primitive object={clone} />
    </Fit>
  );
}

function Loading() {
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

export default function ModelViewer({ model, fallback, height = 420 }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Boundary fallback={fallback}>
      <div className="viewer" style={{ height }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [3.4, 2.2, 4.2], fov: 38 }}>
          <color attach="background" args={["#0a1128"]} />
          <ambientLight intensity={0.9} />
          <hemisphereLight args={["#bcd7ff", "#4a2a20", 0.7]} />
          <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow />
          <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#7fb5ff" />
          <Stars radius={40} depth={20} count={800} factor={3} fade speed={reduce ? 0 : 1} />
          <Suspense fallback={<Loading />}>
            {model.type === "glb" ? (
              <Glb src={model.src} size={model.size || 2.6} />
            ) : (
              <Fit>
                <Procedural kind={model.kind} />
              </Fit>
            )}
          </Suspense>
          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={8} blur={2.4} far={3} />
          <OrbitControls autoRotate={!reduce} autoRotateSpeed={1.2} enablePan={false} minDistance={2.5} maxDistance={9} target={[0, 1.2, 0]} />
        </Canvas>
        <span className="viewer-hint">Drag to rotate · scroll to zoom</span>
      </div>
    </Boundary>
  );
}
