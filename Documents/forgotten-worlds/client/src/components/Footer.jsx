import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>Echoes Beyond the Earth</strong>
        <p>Team lead Mohsin Ali · NASA Space Apps Challenge 2026 · "Abandoned but not Forgotten".</p>
      </div>
      <div>
        <Link to="/about">Sources and credits</Link>
        <p className="muted">
          Most images are from NASA. This project is not affiliated with, or endorsed by, NASA. Dates and facts link to their sources on each story page.
        </p>
      </div>
    </footer>
  );
}
