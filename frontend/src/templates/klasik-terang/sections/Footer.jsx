import { LaceBorder, LuxuryCrest } from '../components/ClassicOrnaments';

export default function Footer({ invitation }) {
  const brideNick = invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || 'Mempelai';
  const groomNick = invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || 'Mempelai';

  return (
    <footer className="relative py-16 px-6 text-center border-t border-[#D4AF37]/20 bg-white/30 z-10">
      <div className="absolute top-0 left-0 w-full">
        <LaceBorder color="#D4AF37" />
      </div>

      <LuxuryCrest className="w-12 h-12 text-[#D4AF37] mx-auto mb-6 opacity-60 animate-[spin_180s_linear_infinite]" />

      <p className="font-serif italic text-[#8C8479] text-sm mb-2">
        Merupakan suatu kehormatan bagi kami atas kehadiran Anda
      </p>

      <h4 className="font-serif text-3xl font-light italic text-[#4A453E] mb-8">
        {brideNick} & {groomNick}
      </h4>

      <p className="text-[10px] tracking-[0.25em] text-[#A69D8F] uppercase font-sans">
        - Undangan Digital Klasik Terang -
      </p>
    </footer>
  );
}
