/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion } from "framer-motion";
import { MailOpen, Heart, Sparkles } from "lucide-react";
import { LeafyCorner, FloralDivider, IslamicMandala, BackgroundOrnaments } from "./Ornaments";
export default function InvitationCover({ data, theme, guestName, onOpen }) {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
    size: 10 + Math.random() * 15,
    rotateStart: Math.random() * 360
  }));
  const accentColor = theme.primaryColor || "#b45309";
  return <div id="invitation-cover" className={`relative w-full h-full min-h-screen flex flex-col justify-between items-center overflow-hidden p-6 text-center select-none ${theme.containerClass}`}>
      {
    /* Absolute Decorative Background Ornaments */
  }
      <BackgroundOrnaments color={accentColor} themeId={theme.id} />

      {
    /* Absolute Decorative Falling Petals */
  }
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {petals.map((p) => <motion.div
    key={p.id}
    className="absolute opacity-40 text-amber-500/30"
    style={{
      left: p.left,
      width: p.size,
      height: p.size,
      top: "-5%",
      filter: "blur(0.5px)"
    }}
    animate={{
      top: "105%",
      x: ["0px", `${(Math.random() - 0.5) * 120}px`, "0px"],
      rotate: [p.rotateStart, p.rotateStart + 180, p.rotateStart + 360]
    }}
    transition={{
      duration: p.duration,
      repeat: Infinity,
      delay: p.delay,
      ease: "linear"
    }}
  >
            {
    /* Elegant organic leaf leaf SVG petal */
  }
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2C12 2 4 10 4 15C4 18.8 7.1 22 11 22C14.9 22 18 18.8 18 15C18 10 12 2 12 2ZM11 20C8.2 20 6 17.8 6 15C6 11.5 11 5.3 11 5.3C11 5.3 16 11.5 16 15C16 17.8 13.8 20 11 20Z" />
            </svg>
          </motion.div>)}
      </div>

      {
    /* Decorative Golden Corner Ornaments & Inner Frame */
  }
      <div className="absolute inset-4 border border-amber-500/10 pointer-events-none z-10 rounded-xl flex items-center justify-center">
        {
    /* Top Left Leaf Corner */
  }
        <LeafyCorner className="absolute top-2 left-2 text-amber-600/60" color={accentColor} />
        {
    /* Top Right Leaf Corner (rotated) */
  }
        <LeafyCorner className="absolute top-2 right-2 text-amber-600/60 rotate-90" color={accentColor} />
        {
    /* Bottom Left Leaf Corner (rotated) */
  }
        <LeafyCorner className="absolute bottom-2 left-2 text-amber-600/60 -rotate-90" color={accentColor} />
        {
    /* Bottom Right Leaf Corner (rotated) */
  }
        <LeafyCorner className="absolute bottom-2 right-2 text-amber-600/60 rotate-180" color={accentColor} />
      </div>

      {
    /* Top Section */
  }
      <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="z-10 mt-14 flex flex-col items-center"
  >
        <span className={`text-xs uppercase tracking-[0.4em] font-medium opacity-85 ${theme.textSecondary}`}>
          {data.title || "WALIMATUL URSY"}
        </span>
        <FloralDivider className="mt-3 w-48 opacity-75" color={accentColor} />
      </motion.div>

      {
    /* Middle Couple Names Section */
  }
      <div className="z-10 my-auto flex flex-col items-center max-w-lg relative px-4">
        {
    /* Rotating Sacred Mandala Behind the Couple names */
  }
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <IslamicMandala className="w-64 h-64 md:w-80 md:h-80 opacity-[0.08] text-amber-600 animate-[spin_180s_linear_infinite]" color={accentColor} />
        </div>

        <motion.div
    initial={{ scale: 0.85, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, delay: 0.4 }}
    className="relative mb-3 flex items-center justify-center"
  >
          <div className="absolute -inset-10 bg-amber-500/5 rounded-full filter blur-2xl animate-pulse" />
          <Heart className="w-14 h-14 text-amber-500/25 fill-amber-500/5 animate-pulse" />
        </motion.div>

        <motion.h1
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.6 }}
    className="text-5xl md:text-6.5xl font-script text-amber-700 my-4 leading-relaxed font-semibold italic select-text"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
          {data.groomName} & {data.brideName}
        </motion.h1>

        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.85 }}
    transition={{ duration: 1.5, delay: 1 }}
    className="flex items-center gap-1 text-sm text-amber-700/80 italic my-2 font-serif"
  >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Save the Date</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        </motion.div>
      </div>

      {
    /* Bottom Guest Personalization and Button Section */
  }
      <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.8 }}
    className="z-10 mb-14 flex flex-col items-center w-full max-w-sm bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-white/80 shadow-xl shadow-amber-950/5 relative"
  >
        {
    /* Mini decorative accent at top of card */
  }
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50 text-[10px] text-amber-700 uppercase tracking-widest font-semibold">
          Wedding Invitation
        </div>

        {guestName && <div className="mb-6 mt-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-800/60 font-medium mb-1.5">Kepada Yth. Bapak/Bujang/Saudara/i:</p>
            <h3 className="text-xl md:text-2xl font-semibold tracking-wide bg-gradient-to-r from-amber-800 to-amber-950 bg-clip-text text-transparent px-4 py-1.5 font-serif select-text">
              {guestName}
            </h3>
            <p className="text-[10px] text-amber-800/60 mt-2.5 italic">*Tanpa Mengurangi Rasa Hormat, Kami Mengundang Anda</p>
          </div>}

        <button
    id="btn-buka-undangan"
    onClick={onOpen}
    className={`group flex items-center gap-2.5 px-8 py-4 rounded-full font-medium shadow-md transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] ${theme.buttonColor} ${theme.buttonText}`}
  >
          <MailOpen className="w-4.5 h-4.5 animate-bounce group-hover:scale-110 transition-transform" />
          <span>Buka Undangan</span>
        </button>
      </motion.div>
    </div>;
}
