'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_MAIN = [
  { href: '/', emoji: '🏠', label: 'Home' },
  { href: '/chef', emoji: '👨‍🍳', label: 'The Chef' },
  { href: '/philosophy', emoji: '🌿', label: 'Philosophy' },
  { href: '/gallery', emoji: '🖼️', label: 'Gallery' },
  { href: '/recipes/tiramisu', emoji: '🍮', label: 'Recipe Demo' },
];

const NAV_EVENTS = [
  { href: '/events/valentine', emoji: '💝', label: "Valentine's Dinner" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>

      {open && <div className="sidebar-overlay open" onClick={() => setOpen(false)} />}

      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <h1>Glimmer Bistro</h1>
          <p className="tagline">Est. 2026</p>
        </div>

        <ul className="sidebar-nav">
          <li className="nav-section">Main</li>
          {NAV_MAIN.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={pathname === item.href ? 'active' : ''}
              >
                <span className="nav-emoji">{item.emoji}</span>
                {item.label}
              </Link>
            </li>
          ))}

          <li className="nav-section">Events</li>
          {NAV_EVENTS.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={pathname === item.href ? 'active' : ''}
              >
                <span className="nav-emoji">{item.emoji}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <p>San Diego, CA</p>
        </div>
      </nav>
    </>
  );
}
