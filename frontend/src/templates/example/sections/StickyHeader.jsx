export default function StickyHeader({ invitation }) {
  const links = [
    { href: '#profile-section', label: 'Mempelai' },
    { href: '#event-section', label: 'Acara' },
    { href: '#story-section', label: 'Cerita' },
    { href: '#gallery-section', label: 'Galeri' },
    { href: '#gift-section', label: 'Kado' },
    { href: '#rsvp-section', label: 'RSVP & Doa' },
  ];

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-[#c5a059]/15 bg-[#0d0d0d]/95 px-6 py-4 shadow-lg backdrop-blur-md">
      <span className="font-serif text-lg font-light italic tracking-[0.1em] text-[#c5a059] md:text-xl">
        {invitation.groom_nickname || invitation.groom_name} &amp; {invitation.bride_nickname || invitation.bride_name}
      </span>
      <nav className="hidden items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-300 md:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="transition-colors hover:text-[#c5a059]">
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
