import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const links = [
  ["/", "Home"],
  ["/explore", "Explore"],
  ["/timeline", "Timeline"],
  ["/map", "Mission Map"],
  ["/quiz", "Quiz"],
  ["/about", "About"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <Logo size={34} /> <span>Echoes <b>Beyond the Earth</b></span>
      </Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
        {open ? "✕" : "☰"}
      </button>
      <nav className={open ? "open" : ""} aria-label="Main">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>
            {label}
          </NavLink>
        ))}
        <Link to="/explore" className="btn small" onClick={() => setOpen(false)}>Start exploring</Link>
      </nav>
    </header>
  );
}
