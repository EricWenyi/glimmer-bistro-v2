import FadeIn from './FadeIn';

interface Props {
  emoji: string;
  label: string;
  title: string;
  italian: string;
  description: string[];
  note?: string;
  accent?: string;
  courseClass: string;
}

export default function CourseCard({ emoji, label, title, italian, description, note, accent, courseClass }: Props) {
  return (
    <FadeIn>
      <div className={`course ${courseClass}`}>
        <div className="course-top">
          <span className="course-emoji">{emoji}</span>
          <span className="course-label">{label}</span>
        </div>
        <h3>{title}</h3>
        <p className="italian">{italian}</p>
        <div className="desc">
          {description.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {note && <div className="note">🌿 {note}</div>}
        {accent && <p className="accent">✦ {accent}</p>}
      </div>
    </FadeIn>
  );
}
