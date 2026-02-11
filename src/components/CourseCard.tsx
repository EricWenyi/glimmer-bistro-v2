import FadeIn from './FadeIn';

interface Props {
  emoji: string;
  label: string;
  title: string;
  italian: string;
  description: string[];
  note?: string;
  accent?: string;
  color: string; // tailwind border-l color class
}

export default function CourseCard({ emoji, label, title, italian, description, note, accent, color }: Props) {
  return (
    <FadeIn>
      <div className={`
        relative bg-white rounded-2xl p-10 mb-10
        shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-black/[0.03]
        hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(0,0,0,0.06)]
        transition-all duration-300 overflow-hidden
      `}>
        {/* Color stripe */}
        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${color}`} />

        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{emoji}</span>
          <span className="font-josefin text-[0.65rem] font-light tracking-[0.2em] uppercase text-[var(--rose)]">{label}</span>
        </div>

        <h3 className="font-caveat text-3xl md:text-4xl font-semibold text-[var(--charcoal)] leading-tight mb-0.5">{title}</h3>
        <p className="italic text-[1.05rem] text-[var(--rose-soft)] mb-4 tracking-wide">{italian}</p>

        <div className="text-base leading-[1.85] text-[var(--warm-gray)] font-light space-y-2">
          {description.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {note && (
          <div className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-[var(--sage-pale)] rounded-full text-sm italic text-[var(--sage-dot)]">
            🌿 {note}
          </div>
        )}

        {accent && (
          <p className="mt-4 font-caveat text-xl font-medium text-[var(--rose)]">✦ {accent}</p>
        )}
      </div>
    </FadeIn>
  );
}
