import { useState } from 'react';
import { Gift, Copy, Check } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function GiftEnvelope({ accounts }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <section
      id="gift-section"
      className="relative overflow-hidden border-t border-[#c5a059]/10 bg-[#0d0d0d] px-6 py-24 text-[#f2f2f2] md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="mb-16 text-center">
          <span className="mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#c5a059]">
            Wedding Gift
          </span>
          <h2 className="font-serif text-3xl font-extralight italic tracking-wide text-white md:text-5xl">
            Kado Digital
          </h2>
          <p className="mx-auto mt-4 max-w-md font-sans text-xs font-light leading-relaxed text-stone-400 md:text-sm">
            Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda ingin memberikan tanda
            kasih, Anda dapat menyalurkannya melalui pilihan di bawah ini.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-[#c5a059]/30" />
        </Reveal>

        <div className="mx-auto max-w-md space-y-6">
          <div className="mb-2 flex items-center justify-center gap-3">
            <Gift className="h-5 w-5 text-[#c5a059]" />
            <h3 className="font-serif text-lg font-light tracking-wide text-white">
              Transfer Bank / E-Wallet
            </h3>
          </div>

          {accounts.map((acc, idx) => (
            <Reveal key={acc.id} delay={Math.min(idx * 0.08, 0.3)}>
              <BankCard account={acc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BankCard({ account }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(account.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-none border border-[#c5a059]/15 bg-[#141414] p-6 shadow-2xl transition-all duration-300 hover:border-[#c5a059]/35">
      <div className="flex items-start justify-between">
        <div>
          <span className="border border-[#c5a059]/30 bg-[#c5a059]/5 px-3 py-1 font-serif text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]">
            {account.bank_name}
          </span>
          <p className="mt-5 font-mono text-lg font-semibold tracking-wider text-white">
            {account.account_number}
          </p>
          <p className="mt-1 text-[10px] font-light uppercase tracking-wider text-stone-400">
            a.n. {account.account_holder}
          </p>
        </div>

        <button
          onClick={copy}
          className="flex h-10 w-10 items-center justify-center rounded-none border border-[#c5a059]/30 bg-[#0d0d0d] text-[#c5a059] transition-colors hover:bg-[#c5a059] hover:text-black"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      {copied && <span className="mt-3 block text-[10px] font-light text-emerald-400">✓ Berhasil disalin</span>}
    </div>
  );
}
