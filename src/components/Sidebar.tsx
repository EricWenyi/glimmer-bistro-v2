'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_MAIN = [
  { href: '/', emoji: '🏠', label: 'Home' },
  { href: '/chef', emoji: '👨‍🍳', label: 'The Chef' },
  { href: '/philosophy', emoji: '🌿', label: 'Philosophy' },
  { href: '/gallery', emoji: '🖼️', label: 'Gallery' },
];

const NAV_EVENTS = [
  { href: '/events/valentine', emoji: '💝', label: "Valentine's Dinner" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[200] w-[42px] h-[42px] bg-white border border-black/5 rounded-full shadow-md flex flex-col items-center justify-center gap-[3px] lg:hidden"
        aria-label="Menu"
      >
        <span className="block w-4 h-[1.5px] bg-[var(--charcoal)]" />
        <span className="block w-4 h-[1.5px] bg-[var(--charcoal)]" />
        <span className="block w-4 h-[1.5px] bg-[var(--charcoal)]" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`
        fixed top-0 left-0 w-[250px] h-screen bg-[var(--warm-white)]
        border-r border-black/[0.04] z-[100] flex flex-col py-10
        transition-transform duration-400
        lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="text-center px-6 pb-8 border-b border-black/[0.04] mb-6">
          <h1 className="font-sacramento text-4xl text-[var(--charcoal)]">Glimmer Bistro</h1>
          <p className="font-josefin text-[0.6rem] tracking-[0.3em] uppercase text-[var(--rose)] mt-1">Est. 2026</p>
        </div>

        <ul className="flex-1 px-6 space-y-0.5 overflow-y-auto">
          <li className="font-josefin text-[0.55rem] font-normal tracking-[0.2em] uppercase text-[var(--light-gray)] px-3 pt-2 pb-1">
            Main
          </li>
          {NAV_MAIN.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg font-josefin text-[0.72rem] font-light
                  tracking-[0.12em] uppercase transition-all duration-300
                  ${pathname === item.href
                    ? 'text-[var(--charcoal)] bg-[var(--rose-pale)]'
                    : 'text-[var(--warm-gray)] hover:text-[var(--charcoal)] hover:bg-[var(--sage-pale)]'
                  }
                `}
              >
                <span className="text-[0.95rem] w-5 text-center">{item.emoji}</span>
                {item.label}
              </Link>
            </li>
          ))}

          <li className="font-josefin text-[0.55rem] font-normal tracking-[0.2em] uppercase text-[var(--light-gray)] px-3 pt-4 pb-1">
            Events
          </li>
          {NAV_EVENTS.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg font-josefin text-[0.72rem] font-light
                  tracking-[0.12em] uppercase transition-all duration-300
                  ${pathname === item.href
                    ? 'text-[var(--charcoal)] bg-[var(--rose-pale)]'
                    : 'text-[var(--warm-gray)] hover:text-[var(--charcoal)] hover:bg-[var(--sage-pale)]'
                  }
                `}
              >
                <span className="text-[0.95rem] w-5 text-center">{item.emoji}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-6 pt-5 border-t border-black/[0.04] text-center">
          <p className="font-josefin text-[0.65rem] text-[var(--light-gray)] tracking-[0.1em]">San Diego, CA</p>
        </div>
      </nav>
    </>
  );
}
