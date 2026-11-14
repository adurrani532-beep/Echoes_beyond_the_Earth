import { useMemo } from "react";
import { useMachines } from "../lib/api.js";
import { useProgress } from "../lib/progress.jsx";
import Timeline from "../components/Timeline.jsx";

export default function TimelinePage() {
  const machines = useMachines();
  const { milestone } = useProgress();
  const events = useMemo(
    () =>
      machines
        .flatMap((m) => m.timeline.map((e) => ({ ...e, machine: m.name.replace(" (optional)", "") })))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [machines]
  );
  return (
    <section className="page">
      <h1>Mission timeline</h1>
      <p className="lead">From Apollo to Ingenuity: select a milestone. Opening five earns the Mission Historian badge.</p>
      <Timeline events={events} onSelect={milestone} />
    </section>
  );
}
