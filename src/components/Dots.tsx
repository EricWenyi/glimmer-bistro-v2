'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#C4908A', '#AAC2A0', '#D5CCE0', '#E8D5D0', '#C8DCC0', '#F0DDD5'];

export default function Dots() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.children.length > 0) return;
    for (let i = 0; i < 80; i++) {
      const d = document.createElement('div');
      const s = 3 + Math.random() * 5;
      d.style.cssText = `
        position:absolute;border-radius:50%;
        width:${s}px;height:${s}px;
        left:${2 + Math.random() * 96}%;top:${2 + Math.random() * 96}%;
        background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
        opacity:${0.15 + Math.random() * 0.25};
      `;
      el.appendChild(d);
    }
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
