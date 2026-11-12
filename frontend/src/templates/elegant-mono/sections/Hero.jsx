import Reveal from '../components/Reveal';

export default function Hero({ invitation }) {
  return (
    <section id="section-home" className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {invitation.cover_photo_url ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${invitation.cover_photo_url})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-taupe-500 to-taupe-800" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-taupe-900/40 via-taupe-900/30 to-taupe-950/70" />

      <Reveal className="relative z-10 flex flex-col items-center text-ivory">
        <p className="text-xs uppercase tracking-[0.4em] text-ivory/70">The Wedding Of</p>
        <h1 className="mt-3 font-cursive text-6xl leading-tight text-ivory sm:text-7xl">
          {invitation.groom_nickname || invitation.groom_name}
          <span className="mx-2 block text-4xl sm:inline sm:text-5xl">&amp;</span>
          {invitation.bride_nickname || invitation.bride_name}
        </h1>
      </Reveal>
    </section>
  );
}
