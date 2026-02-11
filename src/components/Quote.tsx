import FadeIn from './FadeIn';

interface Props {
  text: string;
  author: string;
}

export default function Quote({ text, author }: Props) {
  return (
    <section className="quote-section">
      <FadeIn>
        <div className="quote-inner">
          <div className="qmark">&ldquo;</div>
          <blockquote>{text}</blockquote>
          <p className="attr">{author}</p>
        </div>
      </FadeIn>
    </section>
  );
}
