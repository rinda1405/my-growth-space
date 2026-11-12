import React from 'react';
import { Menu, Plus, Compass } from 'lucide-react';

interface HeaderProps {
  onToggleMobile: () => void;
  onOpenQuickCapture: () => void;
  todayFocus?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobile,
  onOpenQuickCapture,
  todayFocus,
}) => {
  // Format current date in Indonesian
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Time-based Indonesian greeting
  const hour = today.getHours();
  let greeting = 'Selamat Datang';
  if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi';
  else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
  else greeting = 'Selamat Malam';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy/10 bg-white/90 backdrop-blur px-6 py-3.5">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobile}
          className="rounded-lg p-1.5 text-navy-600 hover:bg-navy/5 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-sm font-semibold text-navy tracking-tight">
            {greeting}, Ruang Kerja Personal
          </h2>
          <p className="text-xs text-navy-500">{dateFormatted}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {todayFocus && (
          <div className="hidden md:flex items-center gap-2 max-w-md truncate rounded-full bg-cyan-50 border border-cyan/40 px-3.5 py-1 text-xs text-navy">
            <Compass className="h-3.5 w-3.5 text-navy flex-shrink-0" />
            <span className="font-medium text-navy-700">Fokus Hari Ini:</span>
            <span className="truncate text-navy-600">{todayFocus}</span>
          </div>
        )}

        <button
          onClick={onOpenQuickCapture}
          className="flex items-center gap-2 rounded-lg bg-cyan px-3.5 py-1.5 text-xs font-semibold text-navy border border-cyan-400 hover:bg-cyan-400 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Quick Capture</span>
        </button>
      </div>
    </header>
  );
};
