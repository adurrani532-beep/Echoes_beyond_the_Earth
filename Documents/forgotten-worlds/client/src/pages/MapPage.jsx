import { useMachines } from "../lib/api.js";
import MissionMap from "../components/MissionMap.jsx";

export default function MapPage() {
  const machines = useMachines();
  return (
    <section className="page">
      <h1>Mission map</h1>
      <p className="lead">Where were these machines left? Choose a world and tap a marker.</p>
      <MissionMap machines={machines} />
    </section>
  );
}
