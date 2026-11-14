import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Media from "./Media.jsx";

export default function MachineCard({ machine, index = 0 }) {
  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index, 5) * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/machine/${machine.id}`} className="card-img" aria-label={`Read the story of ${machine.name}`}>
        <Media machine={machine} />
        <span className={`pill ${machine.destination.replace(" ", "").toLowerCase()}`}>{machine.destination}</span>
      </Link>
      <div className="card-body">
        <h3>{machine.name}</h3>
        <p className="muted small">{machine.type}</p>
        <p>{machine.hook}</p>
        <p className="status"><b>Status:</b> {machine.status}</p>
        <Link className="btn small" to={`/machine/${machine.id}`}>Read story</Link>
      </div>
    </motion.article>
  );
}
