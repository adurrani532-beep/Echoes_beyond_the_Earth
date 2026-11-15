import { useMachines } from "../lib/api.js";

export default function About() {
  const machines = useMachines();
  const images = machines.flatMap((m) => (m.gallery || []).map((g) => ({ ...g, machine: m.name })));
  return (
    <section className="page narrow">
      <h1>About Echoes Beyond the Earth</h1>
      <p className="lead"><b>Echoes Beyond the Earth</b> is our team's project for the NASA Space Apps Challenge 2026, in the challenge "Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars". It turns the stories of machines left on the Moon, Mars and in deep space into something students can explore, play with and remember.</p>

      <h2>Notice</h2>
      <p>This is an independent student project. It is not created, sponsored or endorsed by NASA. Story text is written for this project and simplified for a young audience. If you spot an error, please tell the team.</p>

      <h2>How the 3D views work</h2>
      <p>The Apollo Lunar Module, Mars Exploration Rover (Spirit and Opportunity), Ingenuity, Moon and Mars use 3D models from NASA 3D Resources. The other 3D views are stylized illustrations made by our team and are labelled as such. Illustrations are never presented as real photographs.</p>

      <h2>Data sources</h2>
      <ul className="sources">
        <li><a href="https://nssdc.gsfc.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA Space Science Data Coordinated Archive (NSSDC)</a></li>
        <li><a href="https://images.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA Image and Video Library</a></li>
        <li><a href="https://science.nasa.gov/3d-resources/" target="_blank" rel="noopener noreferrer">NASA 3D Resources</a></li>
        <li><a href="https://science.nasa.gov/mars/" target="_blank" rel="noopener noreferrer">NASA Mars Exploration</a></li>
      </ul>
      <p className="muted small">Each machine's page lists the specific sources for its facts.</p>

      <h2>Image credits</h2>
      <ul className="credits">
        {images.map((g) => (
          <li key={g.src}>{g.machine}: {g.caption} <span className="muted">({g.credit})</span></li>
        ))}
      </ul>

      <h2>Built with</h2>
      <p>React, Vite, Three.js (React Three Fiber), Framer Motion, Node.js, Express and MongoDB. AI assistance (Claude) was used for planning and writing code. The team reviewed the content.</p>
      <h2>The team</h2>
      <ul className="sources">
        <li><b>Mohsin Ali</b>: team lead</li>
        <li>Abdullah: team member</li>
        <li>Abdul Hamad: team member</li>
      </ul>
    </section>
  );
}
