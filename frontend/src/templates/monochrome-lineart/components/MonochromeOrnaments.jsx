import React from 'react';
import { motion } from 'framer-motion';

/**
 * Self-drawing SVG Botanical corner flourish with Framer Motion pathLength physics
 */
export function BotanicalCorner({ className = "w-16 h-16", position = "top-left", dark = false }) {
  let transform = "";
  if (position === "top-right") transform = "scale-x-[-1]";
  else if (position === "bottom-left") transform = "scale-y-[-1]";
  else if (position === "bottom-right") transform = "scale-[-1]";

  const colorClass = dark ? "text-zinc-100" : "text-zinc-900";

  const pathTransition = (delay = 0) => ({
    duration: 1.4,
    delay,
    ease: [0.16, 1, 0.3, 1],
  });

  return (
    <motion.svg
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${colorClass} pointer-events-none ${transform} ${className}`}
    >
      {/* Delicate architectural corner frame lines */}
      <motion.path
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.45, transition: pathTransition(0) },
        }}
        d="M2 38 L2 2 L38 2"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Delicate botanical branch */}
      <motion.path
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: pathTransition(0.1) },
        }}
        d="M6 6 C 25 15, 45 40, 75 75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Branch offshoots and leaves with staggered self-drawing */}
      {[
        "M12 10 Q 18 2, 28 8 Q 20 18, 12 10 Z",
        "M10 18 Q 2 24, 8 34 Q 18 26, 10 18 Z",
        "M24 22 Q 32 14, 42 20 Q 34 32, 24 22 Z",
        "M22 30 Q 16 40, 24 48 Q 32 38, 22 30 Z",
        "M38 36 Q 48 28, 58 34 Q 48 46, 38 36 Z",
        "M36 44 Q 30 56, 40 62 Q 46 52, 36 44 Z",
        "M52 52 Q 62 44, 72 50 Q 64 62, 52 52 Z",
        "M68 68 Q 78 72, 88 82 Q 78 88, 68 68 Z",
      ].map((d, i) => (
        <motion.path
          key={i}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: pathTransition(0.2 + i * 0.08),
            },
          }}
          d={d}
          stroke="currentColor"
          strokeWidth="1.2"
          fill="currentColor"
          fillOpacity="0.08"
        />
      ))}
      {/* Center delicate stem line */}
      <motion.path
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 0.8, transition: pathTransition(0.5) },
        }}
        d="M16 8 Q 22 12, 24 22"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </motion.svg>
  );
}

/**
 * Animated Diamond divider line with sparkle: ─── ✦ ───
 */
export function DiamondDivider({ className = "", text = "", dark = false }) {
  const lineRight = dark
    ? "from-transparent to-zinc-300"
    : "from-transparent to-zinc-900";
  const lineLeft = dark
    ? "from-transparent to-zinc-300"
    : "from-transparent to-zinc-900";
  const textColor = dark ? "text-zinc-200" : "text-zinc-800";
  const iconColor = dark ? "text-white" : "text-zinc-950";

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.85 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center justify-center gap-3 w-full my-4 ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`h-[1px] flex-1 bg-gradient-to-r ${lineRight} max-w-[120px]`}
      />
      <div className={`flex items-center gap-1.5 ${iconColor}`}>
        <motion.svg
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 fill-current shrink-0"
        >
          <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
        </motion.svg>
        {text && (
          <span className={`text-[10px] sm:text-[11px] tracking-[0.28em] font-clean-sans uppercase ${textColor} px-1.5 font-semibold whitespace-nowrap`}>
            {text}
          </span>
        )}
        {text && (
          <motion.svg
            animate={{ rotate: [360, 270, 180, 90, 0], scale: [1, 1.18, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 fill-current shrink-0"
          >
            <polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" />
          </motion.svg>
        )}
      </div>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`h-[1px] flex-1 bg-gradient-to-l ${lineLeft} max-w-[120px]`}
      />
    </motion.div>
  );
}

/**
 * Rotating Circular Editorial Seal (SVG Text Path)
 */
export function CircularTextSeal({
  text = "NOR NABILLA & M YUSUF EFFENDI • WALIMATUL 'URS • ",
  size = "w-full h-full",
  className = "",
  dark = false,
}) {
  return (
    <div className={`pointer-events-none select-none animate-seal-orbit ${size} ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
        <defs>
          <path
            id="editorialCirclePath"
            d="M 100, 100 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
          />
        </defs>
        <text
          className={`text-[8.5px] font-clean-sans uppercase tracking-[0.29em] font-semibold ${
            dark ? "fill-zinc-400" : "fill-zinc-600"
          }`}
        >
          <textPath href="#editorialCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

/**
 * Kinetic Monochrome Editorial Ticker / Marquee Ribbon
 */
export function EditorialMarquee({
  items = [
    "NOR NABILLA & M YUSUF EFFENDI",
    "THE WEDDING CELEBRATION",
    "TWO HEARTS • ONE SACRED JOURNEY",
    "18 JANUARI 2027 • SURABAYA",
    "HAUTE ATELIER MONOCHROME EDITION",
  ],
  dark = true,
}) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className={`w-full overflow-hidden py-2.5 border-y select-none ${
        dark
          ? "bg-zinc-950 text-zinc-100 border-zinc-800"
          : "bg-white text-zinc-950 border-zinc-900"
      }`}
    >
      <div className="animate-marquee-infinite flex items-center gap-8">
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-clean-sans uppercase tracking-[0.35em] font-medium">
              {item}
            </span>
            <span className="text-xs opacity-60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Minimalist Frame with double border & self-drawing botanical corners
 */
export function MinimalFrame({ children, className = "", withCorners = true, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative p-5 sm:p-8 ${
        dark
          ? "bg-zinc-900/90 border border-zinc-700 text-zinc-100"
          : "bg-white border border-zinc-900 text-zinc-900"
      } shadow-sm ${className}`}
    >
      {/* Inset border */}
      <div
        className={`absolute inset-1.5 border pointer-events-none ${
          dark ? "border-zinc-800" : "border-zinc-300"
        }`}
      />

      {withCorners && (
        <>
          <BotanicalCorner
            position="top-left"
            dark={dark}
            className="w-12 h-12 sm:w-16 sm:h-16 absolute top-1 left-1 opacity-90"
          />
          <BotanicalCorner
            position="bottom-right"
            dark={dark}
            className="w-12 h-12 sm:w-16 sm:h-16 absolute bottom-1 right-1 opacity-90"
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * Romantic hearts line-art icon with self-drawing stroke
 */
export function InterlockingHearts({ className = "w-6 h-6" }) {
  return (
    <motion.svg
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      viewBox="0 0 48 32"
      fill="none"
      className={`text-zinc-900 ${className}`}
    >
      <motion.path
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" },
          },
        }}
        d="M16 26 C 6 18, 4 10, 10 5 C 16 0, 22 6, 22 10 C 22 6, 28 0, 34 5 C 40 10, 38 18, 28 26 L 22 30 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

/**
 * Ambient Floating Monochrome Ink Dust & Micro-Petals Overlay
 */
export function AmbientMonochromeParticles() {
  const particles = [
    { top: "12%", left: "8%", size: 4, duration: 9, delay: 0 },
    { top: "28%", left: "88%", size: 6, duration: 12, delay: 1.5 },
    { top: "46%", left: "14%", size: 3, duration: 10, delay: 3 },
    { top: "64%", left: "82%", size: 5, duration: 11, delay: 0.8 },
    { top: "78%", left: "22%", size: 4, duration: 13, delay: 2.2 },
    { top: "88%", left: "74%", size: 3, duration: 9.5, delay: 4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{
            y: [0, -28, 0],
            x: [0, idx % 2 === 0 ? 12 : -12, 0],
            rotate: [0, 180, 360],
            opacity: [0.12, 0.35, 0.12],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-xs border border-zinc-900/40 bg-zinc-900/10"
        />
      ))}
    </div>
  );
}
