import React, { useMemo } from 'react';

// ── Komponen SVG bunga 5 kelopak romantis ──────────────────────────────────
const FlowerSVG: React.FC<{ size: number; color: string; opacity: number }> = ({
  size,
  color,
  opacity,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    {/* 5 kelopak melingkar */}
    <ellipse cx="20" cy="8"  rx="5" ry="9" fill={color} transform="rotate(0   20 20)" />
    <ellipse cx="20" cy="8"  rx="5" ry="9" fill={color} transform="rotate(72  20 20)" />
    <ellipse cx="20" cy="8"  rx="5" ry="9" fill={color} transform="rotate(144 20 20)" />
    <ellipse cx="20" cy="8"  rx="5" ry="9" fill={color} transform="rotate(216 20 20)" />
    <ellipse cx="20" cy="8"  rx="5" ry="9" fill={color} transform="rotate(288 20 20)" />
    {/* Putik tengah */}
    <circle cx="20" cy="20" r="5"   fill="#FFF5E0" opacity="0.9" />
    <circle cx="20" cy="20" r="2.5" fill="#F4C842" opacity="0.95" />
  </svg>
);

// ── SVG kelopak tunggal jatuh ─────────────────────────────────────────────
const PetalSVG: React.FC<{ size: number; color: string; opacity: number }> = ({
  size,
  color,
  opacity,
}) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 20 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path d="M10 1 C3 8, 1 18, 10 29 C19 18, 17 8, 10 1 Z" fill={color} />
    {/* Urat kelopak */}
    <path d="M10 4 Q10 16, 10 28"    stroke="white" strokeWidth="0.6" strokeOpacity="0.4" />
    <path d="M10 10 Q7 15, 5 22"     stroke="white" strokeWidth="0.4" strokeOpacity="0.3" />
    <path d="M10 10 Q13 15, 15 22"   stroke="white" strokeWidth="0.4" strokeOpacity="0.3" />
  </svg>
);

// ── SVG bintang kilau kecil ───────────────────────────────────────────────
const SparkSVG: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

// ── Palet warna romantis ──────────────────────────────────────────────────
const FLOWER_COLORS = [
  '#E8A0BF', // soft pink
  '#F4B8C1', // sakura pink
  '#D4789E', // mauve rose
  '#EFC7D6', // blush
  '#C97B9E', // deep rose
];

const PETAL_COLORS = [
  '#F2A3BC', // pink petal
  '#F8C8D5', // light rose
  '#E07BA0', // vivid rose
  '#FADADD', // pastel pink
  '#D4697F', // warm coral-rose
];

// ── Komponen utama ────────────────────────────────────────────────────────
export const FloatingParticles: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, index) => {
      // 0 = bunga, 1 = kelopak, 2 = bintang kilau, 3 = bokeh
      const typeNum = index % 4;
      const size =
        typeNum === 0 ? Math.random() * 14 + 18  // bunga: 18–32 px
        : typeNum === 1 ? Math.random() * 8  + 10 // kelopak: 10–18 px
        : typeNum === 2 ? Math.random() * 6  + 6  // bintang: 6–12 px
        : Math.random() * 5 + 3;                  // bokeh: 3–8 px

      const colorIndex = index % 5;
      return {
        id: index,
        size,
        left:     Math.random() * 100,
        top:      Math.random() * 100,
        duration: Math.random() * 10 + 8,    // 8–18 s
        delay:    Math.random() * 8,          // 0–8 s
        opacity:  Math.random() * 0.4 + 0.45, // 0.45–0.85
        rotation: Math.floor(Math.random() * 360),
        type: typeNum === 0 ? 'flower' : typeNum === 1 ? 'petal' : typeNum === 2 ? 'spark' : 'bokeh',
        flowerColor: FLOWER_COLORS[colorIndex],
        petalColor:  PETAL_COLORS[colorIndex],
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => {
        // ── Bunga utuh ──
        if (p.type === 'flower') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top:  `${p.top}%`,
                transform: `rotate(${p.rotation}deg)`,
                animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                filter: 'drop-shadow(0 2px 8px rgba(200,100,140,0.35))',
              }}
            >
              <FlowerSVG size={p.size} color={p.flowerColor} opacity={p.opacity} />
            </div>
          );
        }

        // ── Kelopak jatuh ──
        if (p.type === 'petal') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top:  `${p.top}%`,
                transform: `rotate(${p.rotation}deg)`,
                animation: `floatPetal ${p.duration}s ease-in-out ${p.delay}s infinite`,
                filter: 'drop-shadow(0 1px 4px rgba(220,100,140,0.3))',
              }}
            >
              <PetalSVG size={p.size} color={p.petalColor} opacity={p.opacity} />
            </div>
          );
        }

        // ── Bintang kilau ──
        if (p.type === 'spark') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top:  `${p.top}%`,
                opacity: p.opacity,
                animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                filter: 'drop-shadow(0 0 5px rgba(244,184,193,0.8))',
              }}
            >
              <SparkSVG size={p.size} color="#F4C0D0" />
            </div>
          );
        }

        // ── Bokeh dot ──
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              width:  `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top:  `${p.top}%`,
              opacity: p.opacity * 0.6,
              borderRadius: '50%',
              background: p.petalColor,
              boxShadow: `0 0 ${p.size * 2}px ${p.petalColor}`,
              animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        );
      })}

      {/* Ambient romantic blobs */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-pink-200/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
    </div>
  );
};
