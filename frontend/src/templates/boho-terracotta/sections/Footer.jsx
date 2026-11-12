import { BohoFlower, BohoArch } from '../components/BohoOrnaments';

export default function Footer({ invitation }) {
  const brideNick = invitation.bride_nickname || invitation.bride_name?.split(' ')[0] || 'Mempelai';
  const groomNick = invitation.groom_nickname || invitation.groom_name?.split(' ')[0] || 'Mempelai';

  return (
    <footer className="relative py-24 px-4 bg-[var(--color-boho-terracotta)] text-white text-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
         <div className="absolute top-[-50px] left-[-50px]">
           <BohoFlower className="w-64 h-64" />
         </div>
         <div className="absolute bottom-[-50px] right-[-50px]">
           <BohoFlower className="w-64 h-64" />
         </div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
        <BohoArch className="w-16 h-16 text-white opacity-80 mb-6" />

        <p className="font-boho-sans text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">
          Terima kasih atas doa restunya
        </p>

        <h2 className="font-boho-script text-5xl sm:text-6xl mb-2">
          {brideNick} & {groomNick}
        </h2>

        <p className="font-boho-serif text-sm opacity-80 mt-8">
          © {new Date().getFullYear()} Invitory. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
