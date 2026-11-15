import { useMachines } from "../lib/api.js";
import GlobeMap from "../components/GlobeMap.jsx";

export default function MapPage() {
  const machines = useMachines();
  return (
    <section className="page">
      <h1>Mission map</h1>
      <p className="lead">Where were these machines left? Choose a world and tap a marker.</p>
      <GlobeMap machines={machines} />
    </section>
  );
}
