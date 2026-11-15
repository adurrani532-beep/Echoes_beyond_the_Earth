export default function Logo({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="8" r="3" fill="#F3C94B" />
      <rect x="31" y="8" width="2" height="9" fill="#AEB7C4" />
      <rect x="12" y="17" width="40" height="24" rx="9" fill="#E8EDF5" />
      <rect x="17" y="21" width="30" height="14" rx="7" fill="#101A3A" />
      <circle cx="26" cy="28" r="3.2" fill="#39C5D5" />
      <circle cx="38" cy="28" r="3.2" fill="#39C5D5" />
      <path d="M27 33 q5 3 10 0" stroke="#39C5D5" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <rect x="8" y="38" width="48" height="8" rx="4" fill="#C65D3A" />
      <circle cx="16" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
      <circle cx="32" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
      <circle cx="48" cy="52" r="6" fill="#2A3558" stroke="#AEB7C4" strokeWidth="2" />
    </svg>
  );
}

