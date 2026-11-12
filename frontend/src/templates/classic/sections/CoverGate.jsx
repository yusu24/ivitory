import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { FloralCorner, LeafBranch, LeafDivider, Monogram, FallingPetals } from '../components/Botanicals';

function initial(name) {
  return (name || '').trim().charAt(0).toUpperCase() || '·';
}

export default function CoverGate({ invitation, guestName, isOpen, onOpen }) {
  const groom = invitation.groom_nickname || invitation.groom_name;
  const bride = invitation.bride_nickname || invitation.bride_name;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0, y: -40, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
          className="ivory-garden ig-paper-texture fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
        >
          <FallingPetals count={12} />

          {/* Botanical frame */}
          <FloralCorner className="absolute -left-2 -top-2 h-40 w-40 text-[var(--ig-sage-500)] sm:h-56 sm:w-56" />
          <FloralCorner className="absolute -right-2 -top-2 h-40 w-40 -scale-x-100 text-[var(--ig-sage-500)] sm:h-56 sm:w-56" />
          <LeafBranch className="absolute -bottom-4 -left-4 h-44 w-44 text-[var(--ig-sage-400)] sm:h-64 sm:w-64" />
          <LeafBranch className="absolute -bottom-4 -right-4 h-44 w-44 -scale-x-100 text-[var(--ig-sage-400)] sm:h-64 sm:w-64" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
          >
            <p className="ig-eyebrow">The Wedding Of</p>

            {/* Arched portrait */}
            <div className="relative mt-6">
              <div className="ig-arch-outline absolute -inset-3" />
              <div className="ig-arch relative h-64 w-48 bg-[var(--ig-ivory-deep)] sm:h-72 sm:w-52">
                {invitation.cover_photo_url ? (
                  <motion.img
                    src={invitation.cover_photo_url}
                    alt=""
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: 'easeOut' }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Monogram left={initial(groom)} right={initial(bride)} className="h-36 w-36 text-sm" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,52,39,0.25)] to-transparent" />
              </div>
            </div>

            <h1 className="ig-script mt-8 text-[3.4rem] leading-[1.05] text-[var(--ig-sage-700)] sm:text-6xl">
              {groom}
              <span className="mx-3 text-4xl text-[var(--ig-gold)]">&amp;</span>
              {bride}
            </h1>

            <LeafDivider className="mt-3 h-5 w-40 text-[var(--ig-gold)]" />

            <div className="mt-6 w-full">
              <p className="ig-sans text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ig-muted)]">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="ig-serif mt-2 text-2xl font-medium italic text-[var(--ig-ink)]">
                {guestName || 'Tamu Undangan'}
              </p>
              <p className="ig-sans mx-auto mt-2 max-w-[16rem] text-[0.7rem] leading-relaxed text-[var(--ig-muted)]">
                Mohon maaf apabila ada kesalahan penulisan nama &amp; gelar
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpen}
              className="ig-btn-primary mt-8 cursor-pointer"
            >
              <MailOpen className="h-4 w-4" strokeWidth={1.6} />
              Buka Undangan
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
