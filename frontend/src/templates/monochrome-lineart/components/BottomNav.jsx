import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Calendar, Heart, Image, Gift, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function BottomNav({ visible = true }) {
  const [activeId, setActiveId] = useState('hero');

  const navItems = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'story', label: 'Kisah', icon: Heart },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'gift', label: 'Kado', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: MessageSquare },
  ];

  useEffect(() => {
    if (!visible) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.38;
      let current = 'hero';

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  if (!visible) return null;

  const scrollTo = (id) => {
    sounds.playPaperClick();
    setActiveId(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-lg w-auto"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 bg-white/95 backdrop-blur-md border-2 border-zinc-950 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center justify-center px-2.5 py-1.5 sm:px-3 sm:py-1.5 transition-colors rounded-full cursor-pointer z-10 ${
                isActive ? 'text-white' : 'text-zinc-600 hover:text-zinc-950'
              }`}
              title={item.label}
            >
              {isActive && (
                <motion.span
                  layoutId="monoBottomNavPill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-zinc-950 rounded-full -z-10 shadow-sm"
                />
              )}
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[8.5px] font-clean-sans tracking-wider uppercase font-semibold hidden sm:block mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
