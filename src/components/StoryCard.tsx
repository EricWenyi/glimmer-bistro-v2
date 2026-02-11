import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  signature?: string;
}

export default function StoryCard({ title, children, signature }: Props) {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-black/[0.03]">
      <h3 className="font-caveat text-3xl font-semibold text-[var(--charcoal)] mb-4">{title}</h3>
      <div className="space-y-3 text-[1.05rem] leading-[1.9] text-[var(--warm-gray)] font-light">
        {children}
      </div>
      {signature && (
        <div className="font-sacramento text-3xl text-[var(--rose)] mt-4">— {signature}</div>
      )}
    </div>
  );
}
