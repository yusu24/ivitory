import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function CoverGate({ invitation, guestName, isOpen, onOpen }) {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-end overflow-hidden bg-taupe-800 px-6 pb-16 text-center text-ivory"
        >
          {invitation.cover_photo_url ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${invitation.cover_photo_url})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-taupe-600 to-taupe-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-taupe-900/10 via-taupe-900/40 to-taupe-950/90" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-ivory/70">Kepada</p>
            <p className="mt-2 font-cursive text-4xl text-ivory sm:text-5xl">{guestName || 'Bapak/Ibu/Saudara/i'}</p>

            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-ivory/70">
              Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara kami.
            </p>

            <button
              onClick={onOpen}
              className="mt-8 flex items-center gap-2 rounded-full bg-taupe-300 px-8 py-3 text-sm text-taupe-900 shadow-lg transition hover:bg-taupe-200"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              Buka Undangan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
