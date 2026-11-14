import Art from "./Art.jsx";

// Shows the machine's photo, or an honest illustration if there is none yet.
export default function Media({ machine, className = "" }) {
  if (machine.imageUrl) {
    return <img className={className} src={machine.imageUrl} alt={`NASA image: ${machine.name}`} loading="lazy" />;
  }
  return (
    <div className={`illus ${className}`}>
      <Art kind={machine.model?.kind === "dawn" ? "dawn" : "mer"} label={`Illustration of ${machine.name}`} />
      <span className="tag">Illustration - photo coming</span>
    </div>
  );
}
