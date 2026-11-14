import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { worlds } from "../data/mapData.js";
import Media from "./Media.jsx";

const W = 720;
const H = 360;
const PAD = 34; // keeps edge markers (e.g. Spirit near 175°E) fully inside the map
const project = (lat, lon) => [PAD + ((lon + 180) / 360) * (W - PAD * 2), PAD + ((90 - lat) / 180) * (H - PAD * 2)];

export default function MissionMap({ machines }) {
  const [world, setWorld] = useState("Moon");
  const [active, setActive] = useState(null);
  const data = worlds[world];
  const sel = active && machines.find((m) => m.id === active.machine);
  const ground = world === "Moon" ? ["#2b3042", "#5b6272"] : ["#5a2a22", "#a2573e"];

  return (
    <div className="map-wrap">
      <div className="tabs" role="tablist" aria-label="Choose a world">
        {Object.keys(worlds).map((w) => (
          <button key={w} role="tab" aria-selected={world === w} className={world === w ? "on" : ""} onClick={() => { setWorld(w); setActive(null); }}>
            {w === "Moon" ? "🌕" : "🔴"} {w}
          </button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="map" role="img" aria-label={`Illustrated map of ${data.title}`}>
        <defs>
          <radialGradient id="g" cx="0.5" cy="0.4" r="0.8">
            <stop offset="0" stopColor={ground[1]} />
            <stop offset="1" stopColor={ground[0]} />
          </radialGradient>
        </defs>
        <rect width={W} height={H} rx="18" fill="url(#g)" />
        {[...Array(26)].map((_, i) => (
          <circle key={i} cx={(i * 131) % W} cy={((i * 71) % (H - 40)) + 20} r={6 + (i % 5) * 4} fill="#000" opacity="0.12" />
        ))}
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="0" x2={W} y1={(H / 6) * (i + 1)} y2={(H / 6) * (i + 1)} stroke="#fff" opacity="0.06" />
        ))}
        {data.markers.map((m, i) => {
          const [x, y] = project(m.lat, m.lon);
          const on = active && active.label === m.label;
          return (
            <g key={m.label} transform={`translate(${x},${y})`} className="marker" tabIndex={0} role="button" aria-label={m.label}
               onClick={() => setActive(m)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(m)}>
              <circle r="22" fill="transparent" />
              <circle r={on ? 20 : 14} fill="#F3C94B" opacity="0.25" pointerEvents="none">
                <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
              <circle r="8" fill="#F3C94B" stroke="#101A3A" strokeWidth="3" />
            </g>
          );
        })}
      </svg>
      <p className="muted small">{data.note} {data.markers.some((m) => m.approx) && "Markers flagged ‘approx.’ are placed roughly."}</p>
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
          <motion.p key="hint" className="muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Tap a glowing marker to meet a machine.</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
