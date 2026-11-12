export default function GununganIcon({ className = '', color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 3 L28 16 L24 16 L33 30 L7 30 L16 16 L12 16 Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="22" r="2.2" stroke={color} strokeWidth="1" />
      <path d="M4 33 H36" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
