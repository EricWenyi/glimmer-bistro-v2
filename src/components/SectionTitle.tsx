interface Props {
  title: string;
  sub?: string;
}

export default function SectionTitle({ title, sub }: Props) {
  return (
    <div className="text-center mb-14">
      <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[var(--charcoal)]">{title}</h2>
      {sub && (
        <p className="font-josefin text-[0.65rem] tracking-[0.3em] uppercase text-[var(--light-gray)] mt-1">{sub}</p>
      )}
      <div className="flex items-center justify-center gap-2 mt-5">
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--sage)] opacity-50" />
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--rose)] opacity-60" />
        <span className="w-[5px] h-[5px] rounded-full bg-[var(--sage)] opacity-50" />
      </div>
    </div>
  );
}
