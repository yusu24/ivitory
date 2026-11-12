import { motion } from 'framer-motion';
import { BohoArch, BohoFlower } from '../components/BohoOrnaments';

export default function Profile({ invitation }) {
  const bride = {
    fullName: invitation.bride_name || '',
    nickname: invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || '',
    parents: invitation.bride_parents || '',
  };
  const groom = {
    fullName: invitation.groom_name || '',
    nickname: invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || '',
    parents: invitation.groom_parents || '',
  };

  return (
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
          The Happy Couple
        </p>
        <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-12">
          Bride & Groom
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
          {/* BRIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)]/20 rounded-[80px] rounded-b-xl p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 text-[var(--color-boho-terracotta-light)] opacity-30">
               <BohoFlower className="w-16 h-16" />
            </div>

            <div className="relative w-40 h-48 mb-6 rounded-t-full border border-[var(--color-boho-terracotta)] p-1 flex items-center justify-center bg-[var(--color-boho-bg)] mt-4">
              <div className="w-full h-full rounded-t-full bg-[var(--color-boho-sage)] bg-opacity-10 flex items-center justify-center border border-[var(--color-boho-terracotta)]/30 overflow-hidden">
                <span className="font-boho-script text-6xl text-[var(--color-boho-terracotta)] select-none">
                  {bride.nickname?.[0] || '?'}
                </span>
              </div>
            </div>

            <h3 className="font-boho-serif text-2xl font-normal text-[var(--color-boho-text)] mb-1">{bride.fullName}</h3>
            <p className="text-xs text-[var(--color-boho-sage)] font-boho-sans uppercase tracking-widest mb-4">The Bride</p>

            <div className="w-12 h-[1px] bg-[var(--color-boho-terracotta)]/40 my-3" />

            {bride.parents && (
              <>
                <p className="text-[10px] text-[var(--color-boho-text)] uppercase tracking-wider mb-1 font-boho-sans opacity-70">Beloved Daughter of:</p>
                <p className="text-sm font-boho-serif text-[var(--color-boho-text)]">{bride.parents}</p>
              </>
            )}
          </motion.div>

          {/* GROOM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center bg-[var(--color-boho-bg)] border border-[var(--color-boho-terracotta)]/20 rounded-[80px] rounded-b-xl p-8 shadow-sm relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 text-[var(--color-boho-sage)] opacity-30">
               <BohoFlower className="w-16 h-16" />
            </div>

            <div className="relative w-40 h-48 mb-6 rounded-t-full border border-[var(--color-boho-terracotta)] p-1 flex items-center justify-center bg-[var(--color-boho-bg)] mt-4">
              <div className="w-full h-full rounded-t-full bg-[var(--color-boho-terracotta)] bg-opacity-5 flex items-center justify-center border border-[var(--color-boho-terracotta)]/30 overflow-hidden">
                <span className="font-boho-script text-6xl text-[var(--color-boho-terracotta)] select-none">
                  {groom.nickname?.[0] || '?'}
                </span>
              </div>
            </div>

            <h3 className="font-boho-serif text-2xl font-normal text-[var(--color-boho-text)] mb-1">{groom.fullName}</h3>
            <p className="text-xs text-[var(--color-boho-sage)] font-boho-sans uppercase tracking-widest mb-4">The Groom</p>

            <div className="w-12 h-[1px] bg-[var(--color-boho-terracotta)]/40 my-3" />

            {groom.parents && (
              <>
                <p className="text-[10px] text-[var(--color-boho-text)] uppercase tracking-wider mb-1 font-boho-sans opacity-70">Beloved Son of:</p>
                <p className="text-sm font-boho-serif text-[var(--color-boho-text)]">{groom.parents}</p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
