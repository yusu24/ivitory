import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check } from 'lucide-react';

export default function GiftEnvelope({ accounts }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!accounts || accounts.length === 0) return null;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="relative py-20 px-4 bg-transparent z-10">
      <div className="max-w-3xl mx-auto text-center">
        <Gift className="w-12 h-12 text-[var(--color-boho-terracotta)] mx-auto mb-4 animate-[bounce_3s_infinite]" />
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-2">
          Kado & Amplop Pernikahan
        </p>
        <h2 className="font-boho-serif text-3xl sm:text-4xl text-[var(--color-boho-text)] mb-4">
          Wedding Gift
        </h2>
        <p className="text-sm text-[var(--color-boho-text)] opacity-80 italic font-boho-serif max-w-md mx-auto mb-10 leading-relaxed">
          Doa restu Anda adalah berkah paling utama. Namun, jika Anda berniat mengirimkan tanda kasih virtual, silakan kirim melalui rekening di bawah ini:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              whileHover={{ y: -3 }}
              className="bg-[var(--color-boho-bg)] rounded-[40px] rounded-bl-xl p-8 border border-[var(--color-boho-terracotta)]/20 shadow-sm relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-boho-terracotta)]/10 rounded-bl-full opacity-40 flex items-start justify-end p-4">
                <span className="font-boho-serif italic font-bold text-xl text-[var(--color-boho-terracotta)]">
                  {(account.bank_name || account.bankName || '?')[0]}
                </span>
              </div>

              <p className="text-[11px] uppercase tracking-widest text-[var(--color-boho-sage)] font-boho-sans font-semibold mb-1">
                {account.bank_name || account.bankName}
              </p>
              <div className="w-10 h-[1px] bg-[var(--color-boho-terracotta)]/40 mb-4" />

              <p className="text-xl font-mono font-bold text-[var(--color-boho-text)] tracking-widest mb-1">
                {account.account_number || account.accountNumber}
              </p>
              <p className="text-xs text-[var(--color-boho-text)] opacity-70 font-medium mb-6">
                a.n. {account.account_name || account.accountHolder}
              </p>

              <button
                onClick={() => handleCopy(account.id, account.account_number || account.accountNumber)}
                className="inline-flex items-center gap-2 bg-[var(--color-boho-terracotta)] hover:bg-[var(--color-boho-terracotta-dark)] text-white text-xs font-semibold px-4 py-3 rounded-full transition-all w-full justify-center tracking-widest uppercase font-boho-sans"
              >
                {copiedId === account.id ? (
                  <>
                    <Check size={14} />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Salin Nomor</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
