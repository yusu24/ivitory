import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { CornerOrnament, LuxuryCrest } from '../components/ClassicOrnaments';

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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] overflow-hidden px-4 select-none">
      {/* Golden Corner Ornaments */}
      <div className="absolute top-4 left-4">
        <CornerOrnament className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
      </div>
      <div className="absolute top-4 right-4 rotate-90">
        <CornerOrnament className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
      </div>
      <div className="absolute bottom-4 left-4 -rotate-90">
        <CornerOrnament className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
      </div>
      <div className="absolute bottom-4 right-4 rotate-180">
        <CornerOrnament className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
      </div>

      {/* Elegant border frame */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border-[0.5px] border-[#D4AF37] opacity-25 pointer-events-none rounded-xl" />

      {/* Subtle dot overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-lg w-full bg-[#FDFBF7]/85 backdrop-blur-md border border-[#D4AF37]/35 shadow-xl rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center z-10"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#A69D8F] font-sans font-medium mb-4">
          Walimatul 'Ursy
        </p>

        <div className="my-2">
          <LuxuryCrest className="w-20 h-20 sm:w-28 sm:h-28 text-[#D4AF37] animate-[spin_120s_linear_infinite]" />
        </div>

        <h2 className="font-serif italic text-base sm:text-lg text-[#8C8479] tracking-wider mt-6 mb-2">
          The Wedding Celebration of
        </h2>

        <h1 className="font-serif text-4xl sm:text-5xl font-light italic text-[#4A453E] my-4 tracking-wide leading-tight">
          {brideNick} <br />
          <span className="text-xl sm:text-2xl text-[#A69D8F] block my-1 font-sans font-normal uppercase tracking-widest">&</span>{' '}
          {groomNick}
        </h1>

        {akadDate && (
          <p className="text-sm text-[#6B655D] font-sans font-medium uppercase tracking-[0.2em] mt-3">
            {akadDate}
          </p>
        )}

        <div className="w-24 h-[1px] bg-[#D4AF37]/40 my-6" />

        {/* Guest Address Card */}
        <div className="w-full max-w-xs bg-[#FDFBF7]/90 border border-[#D4AF37]/25 rounded-xl p-4 mb-8">
          <p className="text-[10px] text-[#8C8479] uppercase tracking-widest mb-1.5 font-sans font-medium">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-lg font-serif font-medium text-[#4A453E] truncate px-2">
            {guestName || 'Tamu Undangan Istimewa'}
          </p>
          <p className="text-[9px] text-[#A69D8F] mt-1.5 font-sans">
            *Mohon maaf jika ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpen}
          id="btn-buka-undangan"
          className="flex items-center justify-center gap-2 bg-white hover:bg-[#FDFBF7] text-[#4A453E] border border-[#D4AF37] px-10 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 shadow-sm"
        >
          <MailOpen size={13} className="text-[#D4AF37]" />
          BUKA UNDANGAN
        </motion.button>
      </motion.div>

      <div className="absolute bottom-6 text-center z-10 opacity-75">
        <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#A69D8F]">
          Exclusive Invitation for You
        </p>
      </div>
    </div>
  );
}
