import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function DigitalEnvelope({ accounts }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <section id="section-gift" className="relative mx-auto max-w-4xl px-6 py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[100px]" />

      <Reveal className="space-y-8 rounded-3xl border border-amber-500/15 bg-stone-900/50 p-8 text-center backdrop-blur-md md:p-12">
        <div className="space-y-3">
          <span className="block font-mono text-xs font-bold uppercase tracking-widest text-amber-500">
            Tanda Kasih &amp; Doa
          </span>
          <h2 className="font-serif text-3xl font-bold text-stone-100">Kado Digital / Angpao</h2>
          <p className="mx-auto max-w-md text-xs leading-relaxed text-stone-400">
            Bagi Bapak/Ibu/Saudara yang ingin mengirimkan hadiah, dapat mengirimkannya secara cashless melalui
            rekening di bawah ini:
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 pt-4 text-left sm:grid-cols-2">
          {accounts.map((acc) => (
            <BankCard key={acc.id} account={acc} />
          ))}
        </div>
      </Reveal>
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
    <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-stone-800/60 bg-stone-950 p-6">
      <div className="space-y-2">
        <p className="font-mono text-xs font-bold text-amber-500">{account.bank_name}</p>
        <p className="mt-1 font-mono text-xl font-bold tracking-wider text-stone-200">{account.account_number}</p>
        <p className="text-xs text-stone-400">
          Atas Nama: <strong className="font-medium text-stone-300">{account.account_holder}</strong>
        </p>
      </div>
      <button
        onClick={copy}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-800 bg-stone-900 py-2.5 font-mono text-xs text-stone-300 transition-colors hover:border-amber-500/40 hover:text-amber-400"
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-400" />
            <span>Disalin!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>Salin Rekening</span>
          </>
        )}
      </button>
    </div>
  );
}
