// Simple illustrated stand-ins for machines that do not have a photo yet.
// They are clearly labelled as illustrations in the UI.
export default function Art({ kind = "mer", label }) {
  return (
    <svg viewBox="0 0 400 260" className="art" role="img" aria-label={label || "Illustration"}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1230" />
          <stop offset="1" stopColor={kind === "dawn" ? "#1b2a55" : "#5b2b26"} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#sky)" />
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 140} r={(i % 3) * 0.5 + 0.6} fill="#fff" opacity="0.7" />
      ))}
      {kind === "dawn" ? (
        <>
          <circle cx="290" cy="170" r="70" fill="#8a8f99" />
          <circle cx="270" cy="150" r="10" fill="#6f7480" />
          <circle cx="305" cy="190" r="14" fill="#6f7480" />
          <ellipse cx="290" cy="170" rx="120" ry="28" fill="none" stroke="#39C5D5" strokeDasharray="4 5" opacity="0.7" />
          <g transform="translate(80,100)">
            <rect x="30" y="20" width="40" height="30" rx="4" fill="#E8EDF5" />
            <rect x="-30" y="28" width="55" height="14" fill="#2b4a9a" />
            <rect x="75" y="28" width="55" height="14" fill="#2b4a9a" />
            <circle cx="50" cy="35" r="6" fill="#F3C94B" />
          </g>
        </>
      ) : (
        <>
          <path d="M0 200 Q100 170 200 195 T400 185 V260 H0Z" fill="#8c4a35" />
          <path d="M0 225 Q120 205 240 225 T400 220 V260 H0Z" fill="#a85a40" />
          <g transform="translate(120,150)">
            <rect x="0" y="10" width="110" height="22" rx="6" fill="#E8EDF5" />
            <rect x="12" y="0" width="60" height="12" rx="3" fill="#2A3558" />
            <rect x="75" y="-22" width="4" height="26" fill="#AEB7C4" />
            <circle cx="77" cy="-24" r="6" fill="#F3C94B" />
            {[14, 55, 96].map((x) => (
              <circle key={x} cx={x} cy="40" r="11" fill="#2A3558" stroke="#AEB7C4" strokeWidth="3" />
            ))}
          </g>
        </>
      )}
    </svg>
  );
}
