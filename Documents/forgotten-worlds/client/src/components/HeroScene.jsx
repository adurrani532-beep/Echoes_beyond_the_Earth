import { Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Glb, Loading } from "./ModelViewer.jsx";

// One continuous scene behind the whole hero: moving stars surround both the heading and the satellite.
function Scene({ model, reduce }) {
  const { viewport, size } = useThree();
  const wide = size.width > 860;
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#bcd7ff", "#4a2a20", 0.7]} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#7fb5ff" />
      <Stars radius={60} depth={40} count={1800} factor={4} fade speed={reduce ? 0 : 1.2} />
      <group position={[wide ? viewport.width * 0.22 : 0, wide ? 0 : 0.2, 0]}>
        <Suspense fallback={<Loading />}>
          <Glb src={model.src} size={wide ? 3.6 : 2.8} center />
        </Suspense>
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduce} autoRotateSpeed={1.2} />
    </>
  );
}

export default function HeroScene({ model }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Canvas dpr={[1, 2]} gl={{ alpha: true }} camera={{ position: [0, 0.8, 8], fov: 40 }} style={{ touchAction: "pan-y" }}>
      <Scene model={model} reduce={reduce} />
    </Canvas>
  );
}
