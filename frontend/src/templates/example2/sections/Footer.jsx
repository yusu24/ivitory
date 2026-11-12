export default function Footer({ invitation }) {
  return (
    <footer className="space-y-4 border-t border-stone-900/40 bg-stone-950/60 py-16 text-center font-mono text-xs text-stone-500">
      <p className="font-serif text-sm italic text-stone-400">
        &ldquo;Mugi-mugi panjenengan kekalih pinaringan berkah lan keslametan urip sesarengan.&rdquo;
      </p>
      <p className="pt-2 text-[10px] font-semibold uppercase tracking-widest text-amber-500/60">
        {invitation.bride_nickname || invitation.bride_name} &amp; {invitation.groom_nickname || invitation.groom_name} Wedding
        Celebration
      </p>
      <p className="text-[10px] text-stone-600">Undangan Pernikahan &bull; Adat Jawa Modern Elegan</p>
    </footer>
  );
}
