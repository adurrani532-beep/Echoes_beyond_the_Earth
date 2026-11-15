import { Suspense, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { Glb, Loading } from "./ModelViewer.jsx";
import { worlds } from "../data/mapData.js";
import Media from "./Media.jsx";

const R = 1.5; // globe radius in scene units

// Same lat/lon -> 3D mapping as a standard equirectangular sphere, plus a per-world rotation fix.
export function toVec(lat, lon, rotY = 0, r = R) {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  const v = new THREE.Vector3(Math.cos(la) * Math.cos(lo), Math.sin(la), -Math.cos(la) * Math.sin(lo));
  return v.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY).multiplyScalar(r);
}

function Marker({ m, pos, active, onPick }) {
  const ring = useRef();
  useFrame(({ clock }) => {
    if (ring.current) {
      const t = (clock.elapsedTime * 0.9) % 1;
      ring.current.scale.setScalar(1 + t * 2.2);
      ring.current.material.opacity = 0.7 * (1 - t);
    }
  });
  const normal = pos.clone().normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  return (
    <group position={pos.clone().multiplyScalar(1.01)} quaternion={quat}>
      <mesh onClick={(e) => { e.stopPropagation(); onPick(m); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
        <sphereGeometry args={[active ? 0.06 : 0.045, 20, 20]} />
        <meshBasicMaterial color={active ? "#ffffff" : "#F3C94B"} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.05, 0.065, 32]} />
        <meshBasicMaterial color="#F3C94B" transparent opacity={0.6} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {active && (
        <Html center position={[0, 0, 0.12]} style={{ pointerEvents: "none" }}>
          <div className="globe-label">{m.label}</div>
        </Html>
      )}
    </group>
  );
}

function Focus({ target, controls }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!target) return;
    const want = target.clone().normalize().multiplyScalar(camera.position.length());
    camera.position.lerp(want, 0.09);
    controls.current && controls.current.update();
  });
  return null;
}

function Globe({ world, data, active, onPick, reduce }) {
  const controls = useRef();
  const focus = useMemo(() => (active ? toVec(active.lat, active.lon, data.rotY).normalize() : null), [active, data.rotY]);
  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 3, 6]} intensity={2.4} />
      <directionalLight position={[-6, -2, -4]} intensity={0.7} color="#8fb4ff" />
      <Stars radius={50} depth={30} count={1200} factor={3} fade speed={reduce ? 0 : 1} />
      <Suspense fallback={<Loading />}>
        <group rotation={[0, 0, 0]}>
          <Glb src={data.model} size={R * 2} center />
        </group>
      </Suspense>
      {data.markers.map((m) => (
        <Marker key={m.label} m={m} pos={toVec(m.lat, m.lon, data.rotY)} active={active && active.label === m.label} onPick={onPick} />
      ))}
      <Focus target={focus} controls={controls} />
      <OrbitControls ref={controls} enablePan={false} minDistance={2.6} maxDistance={7} autoRotate={!reduce && !active} autoRotateSpeed={0.8} />
    </>
  );
}

export default function GlobeMap({ machines }) {
  const [world, setWorld] = useState("Moon");
  const [active, setActive] = useState(null);
  const data = worlds[world];
  const sel = active && machines.find((m) => m.id === active.machine);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="map-wrap">
      <div className="tabs" role="tablist" aria-label="Choose a world">
        {Object.keys(worlds).map((w) => (
          <button key={w} role="tab" aria-selected={world === w} className={world === w ? "on" : ""} onClick={() => { setWorld(w); setActive(null); }}>
            {w === "Moon" ? "🌕" : "🔴"} {w}
          </button>
        ))}
      </div>
      <div className="globe">
        <Canvas key={world} dpr={[1, 2]} gl={{ alpha: true }} camera={{ position: [0, 0.8, 5.2], fov: 40 }}>
          <Globe world={world} data={data} active={active} onPick={setActive} reduce={reduce} />
        </Canvas>
        <span className="viewer-hint">Drag to spin · scroll to zoom · tap a gold marker</span>
      </div>
      <div className="chips" role="group" aria-label="Locations">
        {data.markers.map((m) => (
          <button key={m.label} className={"chip" + (active && active.label === m.label ? " on" : "")} onClick={() => setActive(m)}>
            {m.label}
          </button>
        ))}
      </div>
      <p className="muted small">{data.note}</p>
      <AnimatePresence mode="wait">
        {sel ? (
          <motion.div key={active.label} className="map-panel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Media machine={sel} className="map-thumb" />
            <div>
              <h3>{sel.name}</h3>
              <p className="muted small">{active.label}{active.approx ? " · approx. position" : ""}</p>
              <p>{sel.hook}</p>
              <Link className="btn small" to={`/machine/${sel.id}`}>View its story</Link>
            </div>
          </motion.div>
        ) : (
          <motion.p key="hint" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Pick a marker to meet a machine.</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
