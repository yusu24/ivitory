import { useState, useRef } from 'react';

/**
 * Interactive 3D Perspective Card with real-time cursor/touch tilt,
 * specular light sheen, and floating 3D floral depth layers.
 */
export default function Tilt3DCard({
  children,
  className = '',
  intensity = 10,
  showFloralCorners = true,
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState(
    'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.32,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`relative rounded-[36px] bg-white/75 backdrop-blur-xl border border-rose-200/80 shadow-[0_24px_60px_-15px_rgba(180,90,115,0.18)] ${className}`}
    >
      {/* Dynamic 3D Specular Light Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[36px] overflow-hidden z-10 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.85) 0%, rgba(252,228,236,0.2) 45%, transparent 75%)`,
        }}
      />

      {/* Inner Golden Rim Frame floating in 3D Z-space */}
      <div
        className="pointer-events-none absolute inset-2.5 rounded-[28px] border border-amber-400/35 z-10"
        style={{ transform: 'translateZ(14px)' }}
      />

      {/* 3D Floating Floral SVG Ornaments in Corners */}
      {showFloralCorners && (
        <>
          <svg
            viewBox="0 0 80 80"
            className="pointer-events-none absolute -top-3 -left-3 w-16 h-16 text-rose-300/80 drop-shadow-sm z-20"
            style={{ transform: 'translateZ(28px)' }}
          >
            <g fill="currentColor">
              <circle cx="26" cy="26" r="10" className="text-rose-300" />
              <circle cx="38" cy="20" r="8" className="text-pink-200" />
              <circle cx="20" cy="38" r="8" className="text-pink-200" />
              <circle cx="26" cy="26" r="4" className="text-amber-400" />
            </g>
            <path
              d="M12 48 Q24 24 48 12"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            viewBox="0 0 80 80"
            className="pointer-events-none absolute -bottom-3 -right-3 w-16 h-16 text-rose-300/80 drop-shadow-sm z-20 rotate-180"
            style={{ transform: 'translateZ(28px) rotate(180deg)' }}
          >
            <g fill="currentColor">
              <circle cx="26" cy="26" r="10" className="text-rose-300" />
              <circle cx="38" cy="20" r="8" className="text-pink-200" />
              <circle cx="20" cy="38" r="8" className="text-pink-200" />
              <circle cx="26" cy="26" r="4" className="text-amber-400" />
            </g>
            <path
              d="M12 48 Q24 24 48 12"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </>
      )}

      {/* Content elevated in 3D space */}
      <div className="relative z-20" style={{ transform: 'translateZ(22px)' }}>
        {children}
      </div>
    </div>
  );
}
