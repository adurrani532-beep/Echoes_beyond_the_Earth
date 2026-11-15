import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Glb, Loading } from "./ModelViewer.jsx";

// One continuous scene behind the whole hero: moving stars surround both the heading and the satellite.
function Scene({ model, reduce }) {
  const { viewport, size, gl } = useThree();
  const spin = useRef();
  const drag = useRef({ down: false, x: 0 });
  const wide = size.width > 860;

  useEffect(() => {
    const el = gl.domElement;
    const down = (e) => { drag.current = { down: true, x: e.clientX }; };
    const up = () => { drag.current.down = false; };
    const move = (e) => {
      if (!drag.current.down || !spin.current) return;
      spin.current.rotation.y += (e.clientX - drag.current.x) * 0.01;
      drag.current.x = e.clientX;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);
    return () => { el.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up); window.removeEventListener("pointermove", move); };
  }, [gl]);

  useFrame((_, dt) => { if (spin.current && !reduce && !drag.current.down) spin.current.rotation.y += dt * 0.4; });

  return (
    <>
      <ambientLight intensity={1.3} />
      <hemisphereLight args={["#bcd7ff", "#6a4a40", 0.9]} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} />
      <directionalLight position={[-4, 2, -3]} intensity={1.0} color="#7fb5ff" />
      <Stars radius={60} depth={40} count={1800} factor={4} fade speed={reduce ? 0 : 1.2} />
      <group position={[wide ? viewport.width * 0.2 : 0, wide ? -0.1 : 0.2, 0]}>
        <group ref={spin}>
          <Suspense fallback={<Loading />}>
            <Glb src={model.src} size={wide ? 3.4 : 2.8} center />
          </Suspense>
        </group>
      </group>
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
