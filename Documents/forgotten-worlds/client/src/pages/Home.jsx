import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMachines } from "../lib/api.js";
import MachineCard from "../components/MachineCard.jsx";
const ModelViewer = lazy(() => import("../components/ModelViewer.jsx"));
import { useProgress, BADGES } from "../lib/progress.jsx";

const worlds = [
  { name: "The Moon", key: "Moon", text: "Discover lunar landers and the buggies of Apollo.", img: "/images/as16-107-17436.jpg", cls: "moon" },
  { name: "Mars", key: "Mars", text: "Meet the robotic explorers of the Red Planet.", img: "/images/pia01122.jpg", cls: "mars" },
  { name: "Deep Space", key: "Deep Space", text: "Follow a spacecraft that visited two worlds.", img: "/images/dawn-2.jpg", cls: "deep" }
];
const steps = ["Built", "Launched", "Explored", "Discovered", "Remembered"];

export default function Home() {
  const machines = useMachines();
  const { badges } = useProgress();
  const featured = ["opportunity", "ingenuity", "apollo-lm-descent-stage"].map((id) => machines.find((m) => m.id === id)).filter(Boolean);
  const lm = machines.find((m) => m.id === "apollo-lm-descent-stage");

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>NASA Space Apps Challenge 2026</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Echoes <span>Beyond the Earth</span></motion.h1>
          <p className="sub">The machines that explored beyond Earth.</p>
          <p>Every mission leaves a story. Discover the machines that explored the Moon, Mars and beyond, and uncover the science they made possible.</p>
          <div className="row">
            <Link to="/explore" className="btn">Start exploring</Link>
            <Link to="/machine/opportunity" className="btn ghost">Discover their stories</Link>
          </div>
        </div>
        <div className="hero-3d">
          {lm && (
            <Suspense fallback={<img className="hero-fallback" src="/images/as11-40-5927.jpg" alt="Apollo lunar module on the Moon" />}>
              <ModelViewer model={lm.model} height={440} fallback={<img className="hero-fallback" src="/images/as11-40-5927.jpg" alt="Apollo lunar module on the Moon" />} />
            </Suspense>
          )}
          <p className="credit">Apollo Lunar Module · 3D model from NASA 3D Resources</p>
        </div>
      </section>

      <section className="page">
        <h2>Not everything that goes to space comes back.</h2>
        <p className="lead">When a mission ends, its machines usually stay where they stopped: parked on the Moon, silent on Mars, or orbiting a dwarf planet. They are not just leftovers. Each one carried instruments, did real science, and taught us something. Here are their stories.</p>
      </section>

      <section className="page">
        <h2>Choose a world</h2>
        <div className="grid3">
          {worlds.map((w) => (
            <motion.div key={w.key} className={`world ${w.cls}`} whileHover={{ y: -6 }} style={w.img ? { backgroundImage: `linear-gradient(180deg, rgba(8,13,29,.15), rgba(8,13,29,.9)), url(${w.img})` } : undefined}>
              <h3>{w.name}</h3>
              <p>{w.text}</p>
              <Link className="btn small" to={`/explore?world=${encodeURIComponent(w.key)}`}>Explore</Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="page">
        <h2>Featured machines</h2>
        <div className="grid3">{featured.map((m, i) => <MachineCard key={m.id} machine={m} index={i} />)}</div>
      </section>

      <section className="page">
        <h2>How missions become history</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <motion.li key={s} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <span>{i + 1}</span>{s}
            </motion.li>
          ))}
        </ol>
      </section>

      <section className="page quiz-cta">
        <h2>Think you know space?</h2>
        <p>Test your knowledge and collect badges. You have {badges.length} of {BADGES.length} so far.</p>
        <Link to="/quiz" className="btn">Test your space knowledge</Link>
      </section>
    </>
  );
}
