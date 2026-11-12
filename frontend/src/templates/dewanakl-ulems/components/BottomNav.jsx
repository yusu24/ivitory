import React from 'react';
import { Home, Users, CalendarCheck, Image, MessageCircle } from 'lucide-react';

export default function BottomNav({ visible = true }) {
  if (!visible) return null;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'bride', label: 'Mempelai', icon: Users },
    { id: 'wedding-date', label: 'Tanggal', icon: CalendarCheck },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'comment', label: 'Ucapan', icon: MessageCircle },
  ];

  return (
    <nav
      className="fixed bottom-0 z-40 backdrop-blur-md border-t shadow-lg py-1 px-4 ulems-bottom-nav transition-colors duration-300"
      style={{
        backgroundColor: 'var(--ulems-nav-bg)',
        borderColor: 'var(--ulems-border-card)',
        color: 'var(--ulems-text-main)',
      }}
    >
      <ul className="flex items-center justify-around max-w-md mx-auto p-0 m-0 list-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="flex flex-col items-center justify-center py-1 px-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-josefin mt-0.5">
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
