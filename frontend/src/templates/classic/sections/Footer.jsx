import { Heart } from 'lucide-react';
import { LeafDivider } from '../components/Botanicals';

export default function Footer({ invitation }) {
  const groom = invitation.groom_nickname || invitation.groom_name;
  const bride = invitation.bride_nickname || invitation.bride_name;

  return (
    <footer className="relative bg-[var(--ig-sage-900)] text-[var(--ig-paper)] px-6 py-20 text-center overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(214, 195, 154, 0.4) 0, transparent 65%)`,
        }}
      />

      <div className="mx-auto max-w-xl relative z-10 flex flex-col items-center">
        <div className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(214,195,154,0.3)] flex items-center justify-center text-[var(--ig-gold-soft)] mb-5">
          <Heart className="h-5 w-5 fill-current" strokeWidth={1.5} />
        </div>

        <p className="ig-eyebrow !text-[var(--ig-gold-soft)]">Terima Kasih</p>

        <h3 className="ig-script text-5xl sm:text-6xl text-[var(--ig-paper)] mt-3">
          {groom}
          <span className="mx-3 text-3xl text-[var(--ig-gold-soft)]">&amp;</span>
          {bride}
        </h3>

        <LeafDivider className="my-5 h-4 w-36 text-[var(--ig-gold-soft)] opacity-80" />

        <p className="ig-serif text-sm sm:text-base italic leading-relaxed text-[var(--ig-ivory)] opacity-90 max-w-md">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami berdua.
        </p>

        <p className="ig-sans text-xs uppercase tracking-[0.25em] text-[var(--ig-gold-soft)] font-medium mt-8">
          Wassalamu&rsquo;alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.1)] w-full flex items-center justify-center gap-2 text-[11px] text-[var(--ig-paper)] opacity-60">
          <span>Dibuat dengan penuh cinta oleh</span>
          <span className="font-semibold text-[var(--ig-gold-soft)]">Invitory</span>
        </div>
      </div>
    </footer>
  );
}
