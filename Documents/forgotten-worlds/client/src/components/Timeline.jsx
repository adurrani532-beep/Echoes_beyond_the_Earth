import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Timeline({ events, onSelect }) {
  const [i, setI] = useState(0);
  const pct = events.length > 1 ? (i / (events.length - 1)) * 100 : 100;
  const pick = (n) => {
    setI(n);
    onSelect && onSelect(n);
  };
  return (
    <div className="timeline">
      <div className="tl-track" role="list">
        <div className="tl-line"><motion.div className="tl-fill" animate={{ width: pct + "%" }} /></div>
        {events.map((e, n) => (
          <button key={n} role="listitem" className={"tl-dot" + (n <= i ? " done" : "") + (n === i ? " on" : "")}
            style={{ left: (events.length > 1 ? (n / (events.length - 1)) * 100 : 0) + "%" }}
            onClick={() => pick(n)} aria-label={`${e.date}: ${e.event}`} aria-current={n === i}>
            <span className="tl-date">{e.date.slice(0, 4)}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} className="tl-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <span className="tl-card-date">{events[i].date}</span>
          {events[i].machine && <span className="pill small-pill">{events[i].machine}</span>}
          <p>{events[i].event}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
