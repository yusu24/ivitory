import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Calendar } from 'lucide-react';

export default function CoverGate({ invitation, guestName, isOpen, onOpen }) {
  const date = invitation.akad_date
    ? new Date(`${invitation.akad_date}T00:00:00`).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ y: '-100%', opacity: 0, transition: { duration: 1, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-[#0d0d0d] px-6 py-12 text-[#f2f2f2]"
        >
          <div className="pointer-events-none absolute inset-0 z-30 border-[16px] border-[#1a1a1a] md:border-[24px]" />
          <div className="pointer-events-none absolute inset-4 z-30 border border-[#c5a059]/30 md:inset-6" />

          {invitation.cover_photo_url && (
            <div
              className="absolute inset-0 z-0 scale-105 bg-cover bg-center opacity-25"
              style={{
                backgroundImage: `url(${invitation.cover_photo_url})`,
                filter: 'sepia(40%) brightness(30%) contrast(120%)',
              }}
            />
          )}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/80 to-[#0d0d0d]" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-20 mt-8 text-center md:mt-12"
          >
            <span className="font-sans text-xs font-light uppercase tracking-[0.4em] text-[#c5a059]">
              The Wedding Celebration of
            </span>
            <div className="mx-auto mt-4 h-px w-12 bg-[#c5a059] opacity-50" />
          </motion.div>

          <div className="relative z-20 my-auto flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="font-serif text-5xl font-extralight italic tracking-wide text-white md:text-8xl">
                {invitation.groom_nickname || invitation.groom_name}
              </h1>
              <motion.div
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 0.8, rotate: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="my-4 flex items-center justify-center gap-4 text-[#c5a059]"
              >
                <div className="h-px w-12 bg-[#c5a059]/30" />
                <span className="font-serif text-2xl font-light">&amp;</span>
                <div className="h-px w-12 bg-[#c5a059]/30" />
              </motion.div>
              <h1 className="font-serif text-5xl font-extralight italic tracking-wide text-white md:text-8xl">
                {invitation.bride_nickname || invitation.bride_name}
              </h1>
            </motion.div>

            {date && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-8 flex items-center gap-3 font-serif text-xs uppercase tracking-[0.25em] text-stone-300 md:text-sm"
              >
                <Calendar className="h-4 w-4 text-[#c5a059]" />
                {date}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative z-20 mb-8 w-full max-w-sm text-center md:mb-12"
          >
            <div className="mb-8 rounded-lg border border-[#c5a059]/20 bg-[#141414]/80 p-5 shadow-2xl backdrop-blur-md">
              <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-stone-400">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h3 className="font-serif text-xl font-medium tracking-wide text-[#c5a059]">
                {guestName || 'Tamu Undangan'}
              </h3>
              <p className="mt-2 text-[10px] font-light italic text-stone-500">
                *Mohon maaf apabila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            <button
              onClick={onOpen}
              className="inline-flex items-center gap-3 rounded-none border border-[#c5a059] bg-[#c5a059] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.3em] text-black shadow-[0_4px_30px_rgba(197,160,89,0.15)] transition-all duration-300 hover:scale-105 hover:bg-transparent hover:text-[#c5a059]"
            >
              <MailOpen className="h-4 w-4" />
              Buka Undangan
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
