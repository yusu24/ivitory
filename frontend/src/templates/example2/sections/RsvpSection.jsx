import RsvpForm from './RsvpForm';
import GuestbookWall from './GuestbookWall';

export default function RsvpSection({ slug, guestName }) {
  return (
    <section id="section-rsvp" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-amber-500/80">
        Reservasi &amp; Ucapan Doa
      </h2>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
        <RsvpForm slug={slug} guestName={guestName} />
        <GuestbookWall slug={slug} />
      </div>
    </section>
  );
}
