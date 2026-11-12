import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';

export default function CoverGate({ invitation, guestName, isOpen, onOpen }) {
  const date = invitation.akad_date
    ? new Date(`${invitation.akad_date}T00:00:00`).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0, y: '-100vh', transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-stone-900 px-6 py-12 text-center"
        >
          {[
            'top-0 left-0',
            'top-0 right-0 scale-x-[-1]',
            'bottom-0 left-0 scale-y-[-1]',
            'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
          ].map((pos) => (
            <div key={pos} className={`pointer-events-none absolute h-32 w-32 opacity-25 ${pos}`}>
              <svg viewBox="0 0 100 100" className="h-full w-full text-amber-500">
                <path
                  d="M0,0 L100,0 C80,20 60,30 40,40 C20,50 10,70 0,100 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
              </svg>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-500/80">Walimatul &lsquo;Ursy</span>
            <h2 className="mt-1 text-lg font-light tracking-[0.15em] text-stone-300">UNDANGAN PERNIKAHAN</h2>
          </motion.div>

          <div className="relative z-10 my-6 flex max-w-sm flex-col items-center justify-center">
            <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-amber-500 opacity-20 blur-[100px]" />

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-56 w-56 drop-shadow-[0_10px_15px_rgba(245,158,11,0.15)] md:h-64 md:w-64"
            >
              <svg viewBox="0 0 200 200" className="h-full w-full text-amber-500">
                <path
                  d="M100,10 L165,130 C175,150 160,175 140,175 L60,175 C40,175 25,150 35,130 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <line x1="100" y1="175" x2="100" y2="55" stroke="currentColor" strokeWidth="2.5" />
                <path d="M100,160 C120,160 135,150 145,135" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M100,160 C80,160 65,150 55,135" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M100,140 C125,135 145,120 155,100" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M100,140 C75,135 55,120 45,100" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M100,120 C125,115 150,90 152,70" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M100,120 C75,115 50,90 48,70" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M100,95 C120,85 135,70 135,50" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <path d="M100,95 C80,85 65,70 65,50" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <rect x="85" y="145" width="30" height="30" rx="3" fill="#1c1917" stroke="currentColor" strokeWidth="1.5" />
                <line x1="100" y1="145" x2="100" y2="175" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="75" cy="155" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="125" cy="155" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="30" r="2" fill="currentColor" />
                <circle cx="100" cy="5" r="1.5" fill="currentColor" />
                <circle cx="132" cy="70" r="1.5" fill="currentColor" />
                <circle cx="68" cy="70" r="1.5" fill="currentColor" />
                <circle cx="150" cy="110" r="1.5" fill="currentColor" />
                <circle cx="50" cy="110" r="1.5" fill="currentColor" />
              </svg>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="mt-6 space-y-2">
              <h1 className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text py-1 font-serif text-4xl font-bold tracking-wide text-transparent md:text-5xl">
                {invitation.bride_nickname || invitation.bride_name} &amp; {invitation.groom_nickname || invitation.groom_name}
              </h1>
              {date && <p className="font-mono text-sm tracking-wider text-amber-500/90">{date}</p>}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="z-10 w-full max-w-xs space-y-4">
            <div className="rounded-2xl border border-amber-500/20 bg-stone-900/60 px-5 py-4 shadow-xl backdrop-blur-md">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-400">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <h3 className="mt-2 truncate text-lg font-medium tracking-wide text-stone-100">{guestName || 'Tamu Undangan'}</h3>
              <p className="mt-1 font-mono text-[10px] italic text-amber-500/60">
                *Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia kami.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 px-6 py-4 font-sans font-medium tracking-wider text-stone-950 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:from-amber-400 hover:to-yellow-500"
            >
              <MailOpen size={18} className="animate-pulse" />
              BUKA UNDANGAN
            </motion.button>
          </motion.div>

          <div className="z-10 font-mono text-[10px] tracking-widest text-stone-500">
            © {new Date().getFullYear()} {invitation.bride_nickname || invitation.bride_name} &amp;{' '}
            {invitation.groom_nickname || invitation.groom_name} &bull; SAVING THE DATE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
