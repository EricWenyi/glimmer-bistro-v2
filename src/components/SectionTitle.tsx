interface Props {
  title: string;
  sub?: string;
}

export default function SectionTitle({ title, sub }: Props) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      <div className="dot-divider">
        <span /><span /><span />
      </div>
    </div>
  );
}
