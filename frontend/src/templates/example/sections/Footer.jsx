import { Heart } from 'lucide-react';

export default function Footer({ invitation }) {
  return (
    <footer className="relative overflow-hidden border-t border-[#c5a059]/15 bg-[#0d0d0d] px-6 py-24 pb-28 text-center text-[#f2f2f2]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a059]/5 blur-3xl" />
      <div className="pointer-events-none absolute inset-4 z-10 border border-[#c5a059]/10" />

      <div className="relative z-20 mx-auto max-w-2xl space-y-8">
        <div className="flex justify-center">
          <Heart className="h-8 w-8 animate-pulse fill-[#c5a059]/10 text-[#c5a059]" />
        </div>

        <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
          Terima Kasih
        </h2>

        <p className="mx-auto max-w-md text-xs font-light leading-relaxed text-stone-400 md:text-sm">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu kepada kedua mempelai.
        </p>

        <div className="space-y-1 pt-4">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">
            Kami yang berbahagia,
          </p>
          <p className="mt-3 font-serif text-2xl font-light italic text-[#c5a059]">
            {invitation.groom_nickname || invitation.groom_name} &amp; {invitation.bride_nickname || invitation.bride_name}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-900 pt-12 text-[10px] tracking-wider text-stone-600 md:flex-row">
          <p>
            © {new Date().getFullYear()} {invitation.groom_nickname || invitation.groom_name} &amp;{' '}
            {invitation.bride_nickname || invitation.bride_name}. All Rights Reserved.
          </p>
          <p>Dibuat dengan cinta untuk hari kebahagiaan.</p>
        </div>
      </div>
    </footer>
  );
}
