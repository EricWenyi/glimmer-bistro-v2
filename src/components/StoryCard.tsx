import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  signature?: string;
}

export default function StoryCard({ title, children, signature }: Props) {
  return (
    <div className="story-card">
      <h3>{title}</h3>
      {children}
      {signature && <div className="signature">— {signature}</div>}
    </div>
  );
}
