export function BohoArch({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0C22.3858 0 0 22.3858 0 50V120H100V50C100 22.3858 77.6142 0 50 0Z" fill="currentColor"/>
    </svg>
  );
}

export function BohoLeaf({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 80C25 80 0 50 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 50 25 80 25 80Z" fill="currentColor"/>
    </svg>
  );
}

export function BohoLine({ className = '' }) {
  return (
    <div className={`h-[1px] w-full bg-[var(--color-boho-terracotta)] opacity-40 ${className}`} />
  );
}

export function BohoFlower({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="10" fill="currentColor"/>
      <path d="M50 0C60 20 70 30 50 40C30 30 40 20 50 0Z" fill="currentColor"/>
      <path d="M100 50C80 40 70 30 60 50C70 70 80 60 100 50Z" fill="currentColor"/>
      <path d="M50 100C40 80 30 70 50 60C70 70 60 80 50 100Z" fill="currentColor"/>
      <path d="M0 50C20 60 30 70 40 50C30 30 20 40 0 50Z" fill="currentColor"/>
    </svg>
  );
}
