import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, RefreshCw, Check, Sparkles, Sliders } from 'lucide-react';
import { WeddingData } from '../types/wedding';

interface AdminCustomizerDrawerProps {
  weddingData: WeddingData;
  onUpdateData: (updated: Partial<WeddingData>) => void;
  onResetData: () => void;
}

export const AdminCustomizerDrawer: React.FC<AdminCustomizerDrawerProps> = ({
  weddingData,
  onUpdateData,
  onResetData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [guestNameInput, setGuestNameInput] = useState<string>(weddingData.guestName);
  const [groomFull, setGroomFull] = useState<string>(weddingData.couple.groom.fullName);
  const [brideFull, setBrideFull] = useState<string>(weddingData.couple.bride.fullName);
  const [venueInput, setVenueInput] = useState<string>(weddingData.events[0]?.venueName || '');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    onUpdateData({
      guestName: guestNameInput,
      couple: {
        ...weddingData.couple,
        groom: {
          ...weddingData.couple.groom,
          fullName: groomFull,
        },
        bride: {
          ...weddingData.couple.bride,
          fullName: brideFull,
        },
      },
      events: weddingData.events.map((evt) => ({
        ...evt,
        venueName: venueInput,
      })),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Gear Button on Top-Left */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-40 w-11 h-11 rounded-full bg-[#3D261D] text-[#D4AF37] border border-[#D4AF37] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group"
        title="Buka Customizer Data Undangan"
      >
        <Sliders className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500 text-[#D4AF37]" />
      </button>

      {/* Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-start p-0 sm:p-4"
          >
            <motion.div
              initial={{ x: -350, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -350, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full bg-[#2B1B17] text-white p-6 sm:rounded-3xl border-r border-[#D4AF37]/40 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif-luxury text-xl font-semibold text-[#D4AF37]">
                      Customizer Undangan
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-5 text-xs">
                  <div>
                    <label className="block text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Nama Tamu Undangan (`?to=...`)
                    </label>
                    <input
                      type="text"
                      value={guestNameInput}
                      onChange={(e) => setGuestNameInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Nama Lengkap Mempelai Pria
                    </label>
                    <input
                      type="text"
                      value={groomFull}
                      onChange={(e) => setGroomFull(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Nama Lengkap Mempelai Wanita
                    </label>
                    <input
                      type="text"
                      value={brideFull}
                      onChange={(e) => setBrideFull(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                      Nama Lokasi / Venue Pernikahan
                    </label>
                    <input
                      type="text"
                      value={venueInput}
                      onChange={(e) => setVenueInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl gold-gradient-bg text-[#1A1A1A] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all cursor-pointer mt-4"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#1A1A1A]" />
                        <span>Data Berhasil Diperbarui</span>
                      </>
                    ) : (
                      <span>Simpan Perubahan</span>
                    )}
                  </button>
                </form>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={onResetData}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/20 text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Ke Data Default</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
