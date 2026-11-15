import Art from "./Art.jsx";

// Shows a 3D-model poster or a NASA photo, or an honest illustration if neither exists.
export default function Media({ machine, className = "" }) {
  const src = machine.poster || machine.imageUrl;
  if (src) {
    return <img className={className} src={src} alt={machine.poster ? `3D model preview: ${machine.name}` : `NASA image: ${machine.name}`} loading="lazy" />;
  }
  return (
    <div className={`illus ${className}`}>
      <Art kind="mer" label={`Illustration of ${machine.name}`} />
    </div>
  );
}
