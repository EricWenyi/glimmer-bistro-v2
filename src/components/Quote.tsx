import FadeIn from './FadeIn';

interface Props {
  text: string;
  author: string;
}

export default function Quote({ text, author }: Props) {
  return (
    <section className="bg-gradient-to-br from-[var(--sage-pale)] to-[var(--cream)] py-20 px-8 text-center">
      <FadeIn className="max-w-[550px] mx-auto">
        <div className="font-sacramento text-7xl text-[var(--sage)] opacity-30 leading-[0.5]">&ldquo;</div>
        <blockquote className="text-xl md:text-2xl font-light italic text-[var(--warm-dark)] leading-[1.7] my-6">
          {text}
        </blockquote>
        <p className="font-josefin text-[0.65rem] tracking-[0.2em] uppercase text-[var(--light-gray)]">{author}</p>
      </FadeIn>
    </section>
  );
}
