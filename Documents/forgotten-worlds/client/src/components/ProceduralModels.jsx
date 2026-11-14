// Stylized, low-poly illustrations used where no official NASA 3D model was supplied.
// They are labelled as illustrations in the UI.
const metal = { color: "#cfd6e4", metalness: 0.5, roughness: 0.4 };
const dark = { color: "#1f2742", metalness: 0.2, roughness: 0.6 };
const gold = { color: "#d9a93a", metalness: 0.7, roughness: 0.35 };

function Wheel({ position, r = 0.32, w = 0.22 }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[r, r, w, 20]} />
      <meshStandardMaterial {...dark} />
    </mesh>
  );
}

function Lrv() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1.0, 0.12, 2.3]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh position={[-0.28, 0.85, 0.1]}><boxGeometry args={[0.32, 0.55, 0.12]} /><meshStandardMaterial {...gold} /></mesh>
      <mesh position={[0.28, 0.85, 0.1]}><boxGeometry args={[0.32, 0.55, 0.12]} /><meshStandardMaterial {...gold} /></mesh>
      <mesh position={[0, 0.75, 0.9]}><boxGeometry args={[0.8, 0.5, 0.5]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh position={[0, 1.55, -1.0]} rotation={[0.5, 0, 0]}><coneGeometry args={[0.55, 0.25, 24, 1, true]} /><meshStandardMaterial color="#e6d8a8" side={2} /></mesh>
      <mesh position={[0, 1.1, -1.0]}><cylinderGeometry args={[0.03, 0.03, 1.0, 8]} /><meshStandardMaterial {...metal} /></mesh>
      {[[-0.75, 0.32, -0.85], [0.75, 0.32, -0.85], [-0.75, 0.32, 0.85], [0.75, 0.32, 0.85]].map((p, i) => (
        <Wheel key={i} position={p} r={0.34} w={0.2} />
      ))}
    </group>
  );
}

function Sojourner() {
  return (
    <group scale={1.2}>
      <mesh position={[0, 0.55, 0]}><boxGeometry args={[1.1, 0.22, 0.8]} /><meshStandardMaterial color="#1a2a55" metalness={0.4} roughness={0.5} /></mesh>
      <mesh position={[0, 0.35, 0]}><boxGeometry args={[0.9, 0.3, 0.6]} /><meshStandardMaterial {...gold} /></mesh>
      <mesh position={[0.4, 0.95, -0.25]}><cylinderGeometry args={[0.015, 0.015, 0.7, 8]} /><meshStandardMaterial {...metal} /></mesh>
      {[-0.55, 0, 0.55].map((x) =>
        [-0.45, 0.45].map((z) => <Wheel key={x + "_" + z} position={[z, 0.2, x * 0.9]} r={0.2} w={0.14} />)
      )}
    </group>
  );
}

function Mer() {
  return (
    <group>
      <mesh position={[0, 0.7, 0]}><boxGeometry args={[1.0, 0.35, 1.3]} /><meshStandardMaterial {...gold} /></mesh>
      <mesh position={[0, 0.95, 0]}><boxGeometry args={[1.7, 0.05, 1.6]} /><meshStandardMaterial color="#1a2a55" metalness={0.5} roughness={0.35} /></mesh>
      <mesh position={[0.3, 1.5, -0.45]}><cylinderGeometry args={[0.03, 0.03, 1.0, 8]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh position={[0.3, 2.05, -0.45]}><boxGeometry args={[0.28, 0.18, 0.18]} /><meshStandardMaterial {...metal} /></mesh>
      {[-0.65, 0, 0.65].map((z) =>
        [-0.75, 0.75].map((x) => <Wheel key={x + "_" + z} position={[x, 0.32, z]} r={0.3} w={0.24} />)
      )}
    </group>
  );
}

function Dawn() {
  return (
    <group rotation={[0.2, 0.4, 0]}>
      <mesh><boxGeometry args={[0.9, 0.9, 1.3]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh position={[0, 0.2, 0.75]}><cylinderGeometry args={[0.3, 0.3, 0.12, 24]} /><meshStandardMaterial {...gold} /></mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 2.1, 0, 0]}><boxGeometry args={[2.6, 0.04, 1.0]} /><meshStandardMaterial color="#2b4a9a" metalness={0.5} roughness={0.35} /></mesh>
      ))}
    </group>
  );
}

export default function Procedural({ kind }) {
  if (kind === "lrv") return <Lrv />;
  if (kind === "sojourner") return <Sojourner />;
  if (kind === "dawn") return <Dawn />;
  return <Mer />;
}
