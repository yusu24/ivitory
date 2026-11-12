import Reveal from '../components/Reveal';
import { SectionHeading, Monogram, LeafDivider } from '../components/Botanicals';

function getInitials(name) {
  return (name || '').trim().charAt(0).toUpperCase() || '·';
}

export default function CoupleInfo({ invitation }) {
  const groom = invitation.groom_name || 'Mempelai Pria';
  const groomNick = invitation.groom_nickname || groom;
  const bride = invitation.bride_name || 'Mempelai Wanita';
  const brideNick = invitation.bride_nickname || bride;

  return (
    <section className="relative px-6 py-24 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <SectionHeading eyebrow="Maha Suci Allah" title="Mempelai Pengantin" />
          <p className="ig-serif mx-auto mt-4 max-w-lg text-sm sm:text-base italic text-[var(--ig-muted)] leading-relaxed">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&rsquo;ala, kami bermaksud mengikrarkan janji suci pernikahan:
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Mempelai Pria */}
          <Reveal delay={0.1}>
            <div className="ig-card rounded-[36px] p-8 sm:p-10 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto mb-6 flex justify-center">
                <div className="h-28 w-28 rounded-full border-2 border-[var(--ig-gold-soft)] p-1.5 bg-[var(--ig-paper)] shadow-md flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-[var(--ig-ivory-deep)] flex items-center justify-center text-[var(--ig-sage-700)] font-serif text-3xl font-light italic">
                    {getInitials(groomNick)}
                  </div>
                </div>
              </div>

              <h3 className="ig-script text-4xl sm:text-5xl text-[var(--ig-sage-700)] leading-tight">
                {groomNick}
              </h3>
              <p className="ig-serif text-lg font-medium text-[var(--ig-ink)] mt-1 tracking-wide">
                {groom}
              </p>

              <LeafDivider className="mx-auto my-4 h-4 w-28 text-[var(--ig-gold)]" />

              {invitation.groom_parents && (
                <div className="text-xs text-[var(--ig-muted)] leading-relaxed space-y-1">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-[var(--ig-sage-500)] font-medium">Putra tercinta dari:</p>
                  <p className="ig-serif text-sm font-normal text-[var(--ig-ink)]">{invitation.groom_parents}</p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Mempelai Wanita */}
          <Reveal delay={0.2}>
            <div className="ig-card rounded-[36px] p-8 sm:p-10 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative mx-auto mb-6 flex justify-center">
                <div className="h-28 w-28 rounded-full border-2 border-[var(--ig-gold-soft)] p-1.5 bg-[var(--ig-paper)] shadow-md flex items-center justify-center">
                  <div className="h-full w-full rounded-full bg-[var(--ig-ivory-deep)] flex items-center justify-center text-[var(--ig-sage-700)] font-serif text-3xl font-light italic">
                    {getInitials(brideNick)}
                  </div>
                </div>
              </div>

              <h3 className="ig-script text-4xl sm:text-5xl text-[var(--ig-sage-700)] leading-tight">
                {brideNick}
              </h3>
              <p className="ig-serif text-lg font-medium text-[var(--ig-ink)] mt-1 tracking-wide">
                {bride}
              </p>

              <LeafDivider className="mx-auto my-4 h-4 w-28 text-[var(--ig-gold)]" />

              {invitation.bride_parents && (
                <div className="text-xs text-[var(--ig-muted)] leading-relaxed space-y-1">
                  <p className="uppercase tracking-[0.18em] text-[10px] text-[var(--ig-sage-500)] font-medium">Putri tercinta dari:</p>
                  <p className="ig-serif text-sm font-normal text-[var(--ig-ink)]">{invitation.bride_parents}</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
