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
    <section className="relative py-20 px-4 bg-[#FDFBF7] border-t border-b border-[#D4AF37]/20 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <Gift className="w-12 h-12 text-[#D4AF37] mx-auto mb-4 animate-[bounce_3s_infinite]" />
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8479] font-sans font-semibold mb-2">
          Kado & Amplop Pernikahan
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#4A453E] font-light mb-4">
          Dompet Digital / Hadiah
        </h2>
        <p className="text-sm text-[#8C8479] italic font-serif max-w-md mx-auto mb-10 leading-relaxed">
          Doa restu Anda adalah berkah paling utama. Namun, jika Anda berniat mengirimkan tanda kasih virtual, silakan kirim melalui rekening di bawah ini:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl p-6 border border-[#D4AF37]/25 shadow-md relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDFBF7] rounded-bl-full opacity-40 flex items-start justify-end p-4">
                <span className="font-serif italic font-bold text-lg text-[#D4AF37]">
                  {(account.bank_name || account.bankName || '?')[0]}
                </span>
              </div>

              <p className="text-xs uppercase tracking-widest text-[#8C8479] font-sans font-semibold mb-1">
                {account.bank_name || account.bankName}
              </p>
              <div className="w-10 h-[1.5px] bg-[#D4AF37]/40 mb-4" />

              <p className="text-lg font-mono font-bold text-[#4A453E] tracking-wider mb-1">
                {account.account_number || account.accountNumber}
              </p>
              <p className="text-xs text-[#8C8479] font-medium mb-4">
                a.n. {account.account_name || account.accountHolder}
              </p>

              <button
                onClick={() => handleCopy(account.id, account.account_number || account.accountNumber)}
                className="inline-flex items-center gap-1.5 bg-[#FDFBF7] hover:bg-white text-[#8C8479] hover:text-[#4A453E] text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-[#D4AF37]/25 w-full justify-center"
              >
                {copiedId === account.id ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">BERHASIL DISALIN!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#D4AF37]" />
                    <span>SALIN NOMOR REKENING</span>
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
