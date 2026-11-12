/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
export function LeafyCorner({ className = "", color = "currentColor" }) {
  return <svg
    viewBox="0 0 120 120"
    className={`w-24 h-24 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
      <path
    d="M10 10C35 10 50 25 50 50C50 75 65 90 90 90"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeDasharray="1 3"
    opacity="0.4"
  />
      {
    /* Elegant Leaf branches */
  }
      <path
    d="M6 6C20 15 35 15 45 35C50 45 48 55 58 65C68 75 80 75 94 94"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
  />
      {
    /* Hand-drawn leaf paths */
  }
      <path
    d="M20 11C23 7 28 6 31 10C32 14 27 18 20 11Z"
    fill={color}
    opacity="0.85"
  />
      <path
    d="M32 17C37 14 41 15 43 20C42 25 36 26 32 17Z"
    fill={color}
    opacity="0.85"
  />
      <path
    d="M41 29C46 27 50 29 51 34C49 39 44 39 41 29Z"
    fill={color}
    opacity="0.85"
  />
      <path
    d="M11 20C7 23 6 28 10 31C14 32 18 27 11 20Z"
    fill={color}
    opacity="0.85"
  />
      <path
    d="M17 32C14 37 15 41 20 43C25 42 26 36 17 32Z"
    fill={color}
    opacity="0.85"
  />
      <path
    d="M29 41C27 46 29 50 34 51C39 49 39 44 29 41Z"
    fill={color}
    opacity="0.85"
  />
      {
    /* Curvy flourishes */
  }
      <path
    d="M48 45C55 42 62 48 62 55C62 62 55 65 52 58"
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    opacity="0.7"
  />
      {
    /* Outer elegant borders */
  }
      <path d="M2 30V2H30" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="2" cy="2" r="2.5" fill={color} />
    </svg>;
}
export function FloralDivider({ className = "", color = "currentColor" }) {
  return <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-[1px] w-20 md:w-28 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" style={{ color }} />
      <svg
    viewBox="0 0 80 40"
    className="w-16 h-8 shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
        {
    /* Central Rose/Bud icon */
  }
        <path
    d="M40 8C35 15 35 25 40 32C45 25 45 15 40 8Z"
    fill={color}
    opacity="0.85"
  />
        {
    /* Left flourish */
  }
        <path
    d="M35 20C28 15 20 18 15 22C20 22 26 22 30 20"
    stroke={color}
    strokeWidth="1.2"
    strokeLinecap="round"
  />
        <path
    d="M22 19C23 16 26 15 27 17C26 20 23 21 22 19Z"
    fill={color}
    opacity="0.75"
  />
        {
    /* Right flourish */
  }
        <path
    d="M45 20C52 15 60 18 65 22C60 22 54 22 50 20"
    stroke={color}
    strokeWidth="1.2"
    strokeLinecap="round"
  />
        <path
    d="M58 19C57 16 54 15 53 17C54 20 57 21 58 19Z"
    fill={color}
    opacity="0.75"
  />
        {
    /* Tiny dots */
  }
        <circle cx="40" cy="4" r="1.5" fill={color} opacity="0.6" />
        <circle cx="31" cy="23" r="1" fill={color} opacity="0.6" />
        <circle cx="49" cy="23" r="1" fill={color} opacity="0.6" />
      </svg>
      <div className="h-[1px] w-20 md:w-28 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" style={{ color }} />
    </div>;
}
export function LeafyWreath({ children, className = "", color = "currentColor" }) {
  return <div className={`relative flex items-center justify-center ${className}`}>
      <svg
    viewBox="0 0 200 200"
    className="absolute inset-0 w-full h-full animate-[spin_100s_linear_infinite]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
        <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 6" opacity="0.3" />
        
        {
    /* Botanical leaves around the circle */
  }
        {Array.from({ length: 16 }).map((_, i) => {
    const angle = i * 360 / 16;
    const rad = angle * Math.PI / 180;
    const x = 100 + 85 * Math.cos(rad);
    const y = 100 + 85 * Math.sin(rad);
    return <g key={i} transform={`translate(${x}, ${y}) rotate(${angle + 45})`}>
              <path
      d="M0 0C-4 -8 -12 -8 -10 -2C-8 4 -4 2 0 0Z"
      fill={color}
      opacity="0.5"
    />
              <path
      d="M0 0C4 -8 12 -8 10 -2C8 4 4 2 0 0Z"
      fill={color}
      opacity="0.5"
    />
            </g>;
  })}
      </svg>
      <div className="z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>;
}
export function AestheticArch({ children, className = "", borderColor = "rgba(197, 168, 92, 0.3)" }) {
  return <div className={`relative p-8 rounded-t-[140px] border-2 ${className}`} style={{ borderColor }}>
      {
    /* Decorative leaf at apex */
  }
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-3 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C12 2 8 8 8 13C8 18 12 22 12 22C12 22 16 18 16 13C16 8 12 2 12 2Z" fill="currentColor" className="text-amber-500/20" />
          <path d="M12 4C12 4 10 9 10 13C10 17 12 20 12 20C12 20 14 17 14 13C14 9 12 4 12 4Z" fill="currentColor" className="text-amber-500/50" />
          <circle cx="12" cy="13" r="2.5" fill="currentColor" className="text-amber-600" />
        </svg>
      </div>
      {children}
    </div>;
}
export function IslamicMandala({ className = "", color = "currentColor" }) {
  return <svg
    viewBox="0 0 100 100"
    className={`w-32 h-32 opacity-15 select-none pointer-events-none ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="0.5" />
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="0.5" strokeDasharray="1 2" />
      
      {
    /* Multi-angle geometry */
  }
      {Array.from({ length: 8 }).map((_, i) => {
    const angle = i * 45;
    return <g key={i} transform={`rotate(${angle} 50 50)`}>
            <rect x="25" y="25" width="50" height="50" stroke={color} strokeWidth="0.5" />
            <path d="M50 5L60 30H40L50 5Z" stroke={color} strokeWidth="0.5" />
            <path d="M50 95L60 70H40L50 95Z" stroke={color} strokeWidth="0.5" />
          </g>;
  })}
      
      <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="0.75" />
      <circle cx="50" cy="50" r="8" fill={color} opacity="0.2" />
    </svg>;
}
export function BotanicalBranch({ className = "", color = "currentColor", opacity = 0.08 }) {
  return <svg
    viewBox="0 0 200 300"
    className={`${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
      {
    /* The main stem */
  }
      <path
    d="M60 280C75 220 90 150 110 80C118 50 128 20 135 10"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
  />
      
      {
    /* Beautiful soft shaded leaves branching out */
  }
      {
    /* Leaf 1 Left */
  }
      <path
    d="M72 230C40 232 20 205 32 185C46 170 68 195 76 212"
    fill={color}
  />
      <path
    d="M72 230C50 220 38 200 32 185"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf 1 Right */
  }
      <path
    d="M80 210C112 205 130 180 120 160C106 148 88 175 82 192"
    fill={color}
  />
      <path
    d="M80 210C95 200 110 180 120 160"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf 2 Left */
  }
      <path
    d="M84 170C55 165 40 140 50 120C62 108 80 132 86 150"
    fill={color}
  />
      <path
    d="M84 170C65 160 55 140 50 120"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf 2 Right */
  }
      <path
    d="M92 150C122 140 138 115 126 98C112 85 98 112 94 130"
    fill={color}
  />
      <path
    d="M92 150C108 140 120 120 126 98"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf 3 Left */
  }
      <path
    d="M96 110C72 100 60 78 68 60C78 48 92 70 98 88"
    fill={color}
  />
      <path
    d="M96 110C82 100 72 82 68 60"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf 3 Right */
  }
      <path
    d="M104 90C130 80 142 58 132 42C120 30 110 52 106 70"
    fill={color}
  />
      <path
    d="M104 90C118 80 128 62 132 42"
    stroke={color}
    strokeWidth="0.5"
  />

      {
    /* Leaf Top Apex */
  }
      <path
    d="M112 50C108 20 118 5 125 2C130 8 128 25 122 40"
    fill={color}
  />
    </svg>;
}
export function OrnateCorner({ className = "", color = "currentColor", opacity = 0.15 }) {
  return <svg
    viewBox="0 0 100 100"
    className={`${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
      {
    /* Triple line elegant curved border */
  }
      <path d="M4 80V4H80" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M10 70V10H70" stroke={color} strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M14 60V14H60" stroke={color} strokeWidth="0.5" strokeLinecap="round" />

      {
    /* Intricate swirl pattern */
  }
      <path d="M4 4C15 15 25 15 35 4" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M4 4C15 15 15 25 4 35" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M22 22C28 16 34 22 28 28C22 34 16 28 22 22Z" fill={color} />
      <circle cx="14" cy="14" r="2" fill={color} />
      <circle cx="45" cy="14" r="1.5" fill={color} />
      <circle cx="14" cy="45" r="1.5" fill={color} />
    </svg>;
}
export function BackgroundOrnaments({ color = "currentColor", themeId = "" }) {
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {
    /* Elegant large leaves in corners - repositioned and resized for mobile visibility */
  }
      <BotanicalBranch
    color={color}
    className="absolute -top-4 -left-4 w-48 sm:w-64 md:w-96 h-auto transform -rotate-12"
    opacity={0.07}
  />
      <BotanicalBranch
    color={color}
    className="absolute -top-4 -right-4 w-48 sm:w-64 md:w-96 h-auto transform rotate-[105deg]"
    opacity={0.07}
  />
      <BotanicalBranch
    color={color}
    className="absolute -bottom-6 -left-6 w-48 sm:w-64 md:w-96 h-auto transform -rotate-[105deg]"
    opacity={0.07}
  />
      <BotanicalBranch
    color={color}
    className="absolute -bottom-6 -right-6 w-48 sm:w-64 md:w-96 h-auto transform rotate-12"
    opacity={0.07}
  />

      {
    /* Subtle traditional corners on non-minimal/luxury themes */
  }
      {themeId !== "minimalist-olive" && <>
          <OrnateCorner color={color} className="absolute top-4 left-4 w-10 h-10 md:top-6 md:left-6 md:w-16 md:h-16" opacity={0.08} />
          <OrnateCorner color={color} className="absolute top-4 right-4 w-10 h-10 md:top-6 md:right-6 md:w-16 md:h-16 transform rotate-90" opacity={0.08} />
          <OrnateCorner color={color} className="absolute bottom-4 left-4 w-10 h-10 md:bottom-6 md:left-6 md:w-16 md:h-16 transform -rotate-90" opacity={0.08} />
          <OrnateCorner color={color} className="absolute bottom-4 right-4 w-10 h-10 md:bottom-6 md:right-6 md:w-16 md:h-16 transform rotate-180" opacity={0.08} />
        </>}

      {
    /* Abstract floating circles for warm modern vibe */
  }
      <div className="absolute top-1/4 left-6 md:left-10 w-32 md:w-48 h-32 md:h-48 rounded-full border border-current opacity-[0.015]" style={{ color }} />
      <div className="absolute bottom-1/4 right-6 md:right-10 w-48 md:w-72 h-48 md:h-72 rounded-full border border-current opacity-[0.015]" style={{ color }} />
    </div>;
}
