import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { BohoArch, BohoLeaf } from '../components/BohoOrnaments';

export default function CoverGate({ invitation, guestName, isOpen, onOpen }) {
  if (isOpen) return null;

  const brideNick = invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || 'Mempelai';
  const groomNick = invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || 'Mempelai';
  const akadDate = invitation.akad_date
    ? new Date(invitation.akad_date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-boho-bg)] overflow-hidden px-4 select-none">
      {/* Decorative Leaves */}
      <div className="absolute top-0 left-0 text-[var(--color-boho-sage)] opacity-60">
        <BohoLeaf className="w-32 h-48 -rotate-12 transform -translate-x-10 -translate-y-10" />
      </div>
      <div className="absolute bottom-0 right-0 text-[var(--color-boho-terracotta-light)] opacity-60">
        <BohoLeaf className="w-32 h-48 rotate-180 transform translate-x-10 translate-y-10" />
      </div>

      {/* Main Arch Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-sm w-full bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)] rounded-t-[140px] shadow-sm p-8 pb-12 text-center flex flex-col items-center z-10 mx-auto"
      >
        <div className="absolute top-[-40px] text-[var(--color-boho-terracotta)]">
           <BohoArch className="w-24 h-24 opacity-80" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-boho-sage)] font-boho-sans font-medium mb-6 mt-6">
          The Wedding Celebration Of
        </p>

        <h1 className="font-boho-script text-5xl sm:text-6xl text-[var(--color-boho-terracotta)] my-4 leading-none">
          {brideNick} <br />
          <span className="text-3xl text-[var(--color-boho-terracotta-light)] block my-1 font-boho-serif">&</span>{' '}
          {groomNick}
        </h1>

        {akadDate && (
          <p className="text-xs text-[var(--color-boho-text)] font-boho-sans font-medium uppercase tracking-[0.2em] mt-6">
            {akadDate}
          </p>
        )}

        <div className="w-16 h-[1px] bg-[var(--color-boho-terracotta)] opacity-40 my-8" />

        {/* Guest Address Card */}
        <div className="w-full max-w-[240px] border-t border-b border-[var(--color-boho-terracotta)] border-opacity-20 py-4 mb-8">
          <p className="text-[10px] text-[var(--color-boho-sage)] uppercase tracking-widest mb-2 font-boho-sans font-medium">
            Dear,
          </p>
          <p className="text-lg font-boho-serif font-medium text-[var(--color-boho-text)] truncate px-2">
            {guestName || 'Special Guest'}
          </p>
        </div>

        {/* Open Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
          id="btn-buka-undangan"
          className="flex items-center justify-center gap-2 bg-[var(--color-boho-terracotta)] text-white px-8 py-3 rounded-full text-xs uppercase tracking-[0.15em] font-boho-sans font-semibold transition-all duration-300 shadow-md hover:bg-[var(--color-boho-terracotta-dark)]"
        >
          <MailOpen size={14} />
          Buka Undangan
        </motion.button>
      </motion.div>
    </div>
  );
}
