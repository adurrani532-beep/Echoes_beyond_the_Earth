import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMachines } from "../lib/api.js";
import { destinations } from "../data/machines.js";
import MachineCard from "../components/MachineCard.jsx";

export default function Explore() {
  const machines = useMachines();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const world = params.get("world") || "All";
  const list = useMemo(
    () => machines.filter((m) => (world === "All" || m.destination === world) && (m.name + " " + m.type).toLowerCase().includes(q.toLowerCase())),
    [machines, world, q]
  );
  const reset = () => {
    setParams({});
    setQ("");
  };
  return (
    <section className="page">
      <h1>Explore the worlds</h1>
      <p className="lead">Pick a destination, then open a machine to read its story.</p>
      <div className="filters">
        <div className="tabs" role="tablist" aria-label="Destination">
          {["All", ...destinations].map((d) => (
            <button key={d} role="tab" aria-selected={world === d} className={world === d ? "on" : ""} onClick={() => (d === "All" ? setParams({}) : setParams({ world: d }))}>
              {d}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search by name or type…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search machines" />
        <button className="btn ghost small" onClick={reset}>Reset</button>
      </div>
      {list.length ? (
        <div className="grid3">{list.map((m, i) => <MachineCard key={m.id} machine={m} index={i} />)}</div>
      ) : (
        <p className="empty">No machines match. Try ‘Reset’. 🔭</p>
      )}
    </section>
  );
}
