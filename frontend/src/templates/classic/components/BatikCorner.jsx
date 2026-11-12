export default function BatikCorner({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4 V30 M4 4 H30" stroke={color} strokeWidth="1" />
      <path
        d="M4 40 C 4 20, 20 4, 40 4"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" stroke={color} strokeWidth="1" />
      <circle cx="28" cy="10" r="1.6" fill={color} />
      <circle cx="10" cy="28" r="1.6" fill={color} />
    </svg>
  );
}
