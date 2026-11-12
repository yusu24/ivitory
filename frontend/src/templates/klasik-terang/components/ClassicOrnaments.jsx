// Classic Gold Ornament SVG Components

// 1. Elegant Baroque Corner Ornament
export function CornerOrnament({ className = 'w-16 h-16', color = '#D4AF37' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M 5,5 L 95,5 L 95,12 A 83,83 0 0,0 12,95 L 5,95 Z" strokeWidth="1" fill={`${color}0B`} />
      <path d="M 12,12 L 80,12 A 68,68 0 0,0 12,80 Z" strokeWidth="1.5" />
      <path d="M 20,20 Q 40,20 40,40 Q 40,60 20,60 Q 15,40 20,20 Z" strokeWidth="1" />
      <path d="M 20,20 Q 20,40 40,40 Q 60,40 60,20 Q 40,15 20,20 Z" strokeWidth="1" />
      <path d="M 12,12 C 12,40 40,12 50,50 C 35,35 12,60 12,80" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill={color} />
      <circle cx="35" cy="35" r="1.5" fill={color} />
      <circle cx="50" cy="50" r="2.5" fill={color} />
      <path d="M 5,50 Q 20,50 30,30" strokeWidth="1" />
      <path d="M 50,5 Q 50,20 30,30" strokeWidth="1" />
    </svg>
  );
}

// 2. Elegant Swirly Section Divider
export function FlourishDivider({ className = 'w-64 h-12', color = '#D4AF37' }) {
  return (
    <svg
      viewBox="0 0 400 60"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M 200,15 L 210,30 L 200,45 L 190,30 Z" fill={`${color}33`} />
      <circle cx="200" cy="30" r="3" fill={color} stroke="none" />
      <path d="M 190,30 C 150,30 140,10 110,30 C 80,50 60,20 20,30" />
      <path d="M 170,30 C 150,45 130,45 110,30" strokeWidth="1" />
      <path d="M 110,30 C 95,15 80,15 65,30" strokeWidth="1" />
      <circle cx="110" cy="30" r="2" fill={color} stroke="none" />
      <circle cx="20" cy="30" r="2.5" fill={color} stroke="none" />
      <path d="M 210,30 C 250,30 260,10 290,30 C 320,50 340,20 380,30" />
      <path d="M 230,30 C 250,45 270,45 290,30" strokeWidth="1" />
      <path d="M 290,30 C 305,15 320,15 335,30" strokeWidth="1" />
      <circle cx="290" cy="30" r="2" fill={color} stroke="none" />
      <circle cx="380" cy="30" r="2.5" fill={color} stroke="none" />
      <path d="M 200,45 L 200,55" strokeWidth="1" />
      <circle cx="200" cy="57" r="1.5" fill={color} stroke="none" />
    </svg>
  );
}

// 3. Luxurious Mandala Center Crest
export function LuxuryCrest({ className = 'w-24 h-24', color = '#D4AF37' }) {
  const petals = Array.from({ length: 8 });
  const subPetals = Array.from({ length: 8 });
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="50" cy="50" r="6" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="14" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="22" />
      {petals.map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 50 + 22 * Math.cos(angle);
        const y1 = 50 + 22 * Math.sin(angle);
        const x2 = 50 + 38 * Math.cos(angle);
        const y2 = 50 + 38 * Math.sin(angle);
        const cp1x = 50 + 32 * Math.cos(angle - 0.2);
        const cp1y = 50 + 32 * Math.sin(angle - 0.2);
        const cp2x = 50 + 32 * Math.cos(angle + 0.2);
        const cp2y = 50 + 32 * Math.sin(angle + 0.2);
        return (
          <g key={i}>
            <path d={`M ${x1},${y1} Q ${cp1x},${cp1y} ${x2},${y2} Q ${cp2x},${cp2y} ${x1},${y1}`} fill={`${color}08`} />
            <circle cx={x2} cy={y2} r="2" fill={color} stroke="none" />
          </g>
        );
      })}
      {subPetals.map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        const x1 = 50 + 14 * Math.cos(angle);
        const y1 = 50 + 14 * Math.sin(angle);
        const x2 = 50 + 28 * Math.cos(angle);
        const y2 = 50 + 28 * Math.sin(angle);
        return (
          <path key={`sub-${i}`} d={`M ${x1},${y1} L ${x2},${y2}`} strokeWidth="0.8" strokeDasharray="1 1" />
        );
      })}
    </svg>
  );
}

// 4. Vintage Gold Leaf Branch
export function GoldLeafBranch({ className = 'w-32 h-16', color = '#D4AF37', flipped = false }) {
  return (
    <svg
      viewBox="0 0 160 80"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${flipped ? 'scale-x-[-1]' : ''}`}
    >
      <path d="M 10,70 Q 60,65 110,40 Q 135,25 150,10" strokeWidth="2" />
      <path d="M 30,68 C 25,50 45,50 48,65 C 48,65 40,68 30,68 Z" fill={`${color}1A`} />
      <path d="M 30,68 L 48,65" strokeWidth="0.8" />
      <path d="M 55,61 C 55,40 75,45 72,58 C 72,58 65,61 55,61 Z" fill={`${color}1A`} />
      <path d="M 55,61 L 72,58" strokeWidth="0.8" />
      <path d="M 45,63 C 45,75 65,75 60,62" fill={`${color}1A`} />
      <path d="M 80,51 C 85,30 102,38 98,48 M 80,51 L 98,48" fill={`${color}1A`} />
      <path d="M 105,42 C 115,22 130,30 122,38 M 105,42 L 122,38" fill={`${color}1A`} />
      <path d="M 128,29 C 140,15 148,22 142,26" fill={`${color}1A`} />
      <circle cx="152" cy="8" r="3" fill={color} stroke="none" />
    </svg>
  );
}

// 5. Traditional Golden Lace Repeating Horizontal Border
export function LaceBorder({ className = 'w-full h-8', color = '#D4AF37' }) {
  const items = Array.from({ length: 16 });
  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`}>
      <div className="flex w-[200%] animate-[slide_40s_linear_infinite] opacity-60">
        {items.map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 100 30"
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            className="h-8 w-auto flex-shrink-0"
          >
            <path d="M 0,0 C 25,25 75,25 100,0" />
            <path d="M 10,0 C 30,15 70,15 90,0" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="50" cy="18" r="2.5" fill={color} stroke="none" />
            <circle cx="25" cy="11" r="1.5" fill={color} stroke="none" />
            <circle cx="75" cy="11" r="1.5" fill={color} stroke="none" />
            <path d="M 50,18 L 50,25" strokeWidth="1" />
            <circle cx="50" cy="27" r="1" fill={color} stroke="none" />
          </svg>
        ))}
      </div>
    </div>
  );
}
