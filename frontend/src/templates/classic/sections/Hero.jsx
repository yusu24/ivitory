import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HangingGarland, LeafBranch, FallingPetals } from '../components/Botanicals';

function formatParts(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    weekday: d.toLocaleDateString('id-ID', { weekday: 'long' }),
    day: d.toLocaleDateString('id-ID', { day: '2-digit' }),
    month: d.toLocaleDateString('id-ID', { month: 'long' }),
    year: d.getFullYear(),
  };
}

export default function Hero({ invitation }) {
  const groom = invitation.groom_nickname || invitation.groom_name;
  const bride = invitation.bride_nickname || invitation.bride_name;
  const date = formatParts(invitation.akad_date);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24 text-center">
      <FallingPetals count={8} />

      <HangingGarland className="ig-sway absolute left-1/2 top-0 h-24 w-[min(560px,120%)] -translate-x-1/2 text-[var(--ig-sage-500)]" />
      <LeafBranch className="absolute -left-10 top-1/3 h-56 w-56 rotate-[200deg] text-[var(--ig-sage-300)] opacity-70" />
      <LeafBranch className="absolute -right-10 bottom-10 h-56 w-56 text-[var(--ig-sage-300)] opacity-70" />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="ig-eyebrow relative"
      >
        Save The Date
      </motion.p>

      {/* Arched photo with offset frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-8"
      >
        <div className="ig-arch-outline absolute -inset-4 translate-x-2 translate-y-2" />
        <div className="ig-arch relative h-[22rem] w-64 bg-[var(--ig-ivory-deep)] shadow-[0_30px_60px_-30px_rgba(44,52,39,0.55)] sm:h-[26rem] sm:w-72">
          {invitation.cover_photo_url && (
            <img src={invitation.cover_photo_url} alt="" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,52,39,0.35)] via-transparent to-transparent" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45 }}
        className="relative mt-10"
      >
        <p className="ig-serif text-sm italic tracking-wide text-[var(--ig-muted)]">
          Kami yang berbahagia
        </p>
        <h1 className="ig-script mt-2 text-6xl leading-[1.05] text-[var(--ig-sage-700)] sm:text-7xl">
          {groom}
          <span className="block text-4xl text-[var(--ig-gold)] sm:mx-4 sm:inline">&amp;</span>
          {bride}
        </h1>
      </motion.div>

      {date && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="relative mt-8 flex items-center gap-5 text-[var(--ig-sage-700)]"
        >
          <span className="ig-sans w-24 border-y border-[rgba(180,149,90,0.5)] py-1.5 text-[0.68rem] uppercase tracking-[0.28em]">
            {date.weekday}
          </span>
          <span className="ig-serif text-5xl font-light leading-none">{date.day}</span>
          <span className="ig-sans w-24 border-y border-[rgba(180,149,90,0.5)] py-1.5 text-[0.68rem] uppercase tracking-[0.28em]">
            {date.month} {date.year}
          </span>
        </motion.div>
      )}

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--ig-sage-400)]"
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.3} />
      </motion.div>
    </section>
  );
}
