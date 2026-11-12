import { motion } from 'framer-motion';
import { CornerOrnament, LuxuryCrest } from '../components/ClassicOrnaments';

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
    <section className="relative py-20 px-4 bg-white/20 z-10">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-2">
          Kedua Mempelai Yang Berbahagia
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A453E] font-light mb-12">
          Kenali Mempelai Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* BRIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center bg-[#FDFBF7]/90 border border-[#D4AF37]/30 rounded-3xl p-8 shadow-md relative"
          >
            <div className="absolute top-3 left-3 opacity-45">
              <CornerOrnament className="w-10 h-10" />
            </div>

            <div className="relative w-44 h-44 mb-6 rounded-full border border-dashed border-[#D4AF37] p-2 flex items-center justify-center bg-[#FDFBF7]">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FDFBF7] to-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/30 overflow-hidden">
                <span className="font-serif text-5xl font-light text-[#8C8479] italic select-none">
                  {bride.nickname?.[0] || '?'}
                </span>
              </div>
              <div className="absolute -top-4 w-12 h-12 text-[#D4AF37] rotate-12">
                <LuxuryCrest className="w-10 h-10" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-[#4A453E] mb-1">{bride.fullName}</h3>
            <p className="text-xs italic text-[#8C8479] font-serif mb-4">Mempelai Wanita</p>

            <div className="w-16 h-[1px] bg-[#D4AF37]/30 my-3" />

            {bride.parents && (
              <>
                <p className="text-[11px] text-[#8C8479] uppercase tracking-wider mb-1 font-sans">Putri tercinta dari:</p>
                <p className="text-base font-serif font-medium text-[#4A453E]">{bride.parents}</p>
              </>
            )}
          </motion.div>

          {/* GROOM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center bg-[#FDFBF7]/90 border border-[#D4AF37]/30 rounded-3xl p-8 shadow-md relative"
          >
            <div className="absolute top-3 right-3 rotate-90 opacity-45">
              <CornerOrnament className="w-10 h-10" />
            </div>

            <div className="relative w-44 h-44 mb-6 rounded-full border border-dashed border-[#D4AF37] p-2 flex items-center justify-center bg-[#FDFBF7]">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#FDFBF7] to-[#FAF6F0] flex items-center justify-center border border-[#D4AF37]/30 overflow-hidden">
                <span className="font-serif text-5xl font-light text-[#8C8479] italic select-none">
                  {groom.nickname?.[0] || '?'}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-normal text-[#4A453E] mb-1">{groom.fullName}</h3>
            <p className="text-xs italic text-[#8C8479] font-serif mb-4">Mempelai Pria</p>

            <div className="w-16 h-[1px] bg-[#D4AF37]/30 my-3" />

            {groom.parents && (
              <>
                <p className="text-[11px] text-[#8C8479] uppercase tracking-wider mb-1 font-sans">Putra tercinta dari:</p>
                <p className="text-base font-serif font-medium text-[#4A453E]">{groom.parents}</p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
