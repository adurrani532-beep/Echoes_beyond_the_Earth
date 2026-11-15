import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const TIPS = {
  "/": "Hi! I'm Scout. Pick a world and I'll show you the machines that explored it.",
  "/explore": "Tap any card to read a machine's story. Try the filters!",
  "/machine": "Switch to 3D and drag the machine to look around!",
  "/timeline": "Select a milestone to see what happened. Collect 5 for a badge!",
  "/map": "These maps are illustrated. Tap a marker to meet a machine.",
  "/quiz": "Five questions, all from the stories. You can do this!",
  "/about": "Every fact here links to its source."
};

export function ScoutArt({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Scout, a friendly rover mascot">
      <circle cx="32" cy="8" r="3" fill="#F3C94B" />
      <rect x="31" y="8" width="2" height="9" fill="#AEB7C4" />
      <rect x="12" y="17" width="40" height="24" rx="9" fill="#E8EDF5" />
      <rect x="17" y="21" width="30" height="14" rx="7" fill="#101A3A" />
      <circle cx="26" cy="28" r="3.2" fill="#39C5D5" />
      <circle cx="38" cy="28" r="3.2" fill="#39C5D5" />
      <path d="M27 33 q5 3 10 0" stroke="#39C5D5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="8" y="38" width="48" height="8" rx="4" fill="#C65D3A" />
      <circle cx="16" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
      <circle cx="32" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
      <circle cx="48" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
    </svg>
  );
}

export default function Scout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const key = "/" + (pathname.split("/")[1] || "");
  const tip = TIPS[key] || TIPS["/"];
  return (
    <div className="scout">
      <AnimatePresence>
        {open && (
          <motion.div
            key={key}
            className="scout-bubble"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <button className="scout-close" onClick={() => setOpen(false)} aria-label="Hide Scout's tip">×</button>
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="scout-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide Scout" : "Ask Scout for a tip"}
      >
        <ScoutArt />
      </button>
    </div>
  );
}
