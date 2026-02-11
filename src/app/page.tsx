import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import SectionTitle from '@/components/SectionTitle';
import StoryCard from '@/components/StoryCard';
import Quote from '@/components/Quote';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden bg-gradient-to-bl from-[var(--cream)] via-[var(--warm-white)] to-[var(--peach)]">
        <FadeIn className="relative z-[2] px-8">
          <h2 className="font-sacramento text-[clamp(4.5rem,10vw,8rem)] font-normal text-[var(--charcoal)] leading-none mb-1">
            Glimmer Bistro
          </h2>
          <span className="block w-[200px] h-1.5 mx-auto my-3 rounded-full bg-gradient-to-r from-transparent via-[var(--rose)] to-transparent" />
          <p className="font-caveat text-[clamp(1.4rem,3vw,1.8rem)] font-medium text-[var(--warm-gray)] mb-4">
            Where every meal tells a story
          </p>
          <p className="font-josefin text-[0.75rem] font-extralight tracking-[0.3em] uppercase text-[var(--light-gray)]">
            A Home Kitchen with Heart
          </p>
        </FadeIn>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-josefin text-[0.6rem] tracking-[0.3em] uppercase text-[var(--light-gray)] animate-bounce">
          ↓ Scroll
        </div>
      </section>

      {/* Chef Intro */}
      <section className="max-w-[780px] mx-auto px-8 py-20">
        <SectionTitle title="Meet the Chef" sub="The Person Behind the Apron" />
        <FadeIn>
          <StoryCard title="Hello, I'm G 👋" signature="G">
            <p>I&apos;m not a trained chef — I&apos;m someone who believes that the best meals come from genuine care and curiosity. Glimmer Bistro started as a simple idea: what if I turned my home kitchen into a dining experience worth remembering?</p>
            <p>Every dish I make is a conversation between technique I&apos;ve studied and flavors I&apos;ve fallen in love with. From hand-torn burrata to slow-braised osso buco, I cook the way I think food should be — with patience, good ingredients, and no shortcuts.</p>
            <p>This isn&apos;t a restaurant. It&apos;s an invitation to my table.</p>
          </StoryCard>
        </FadeIn>

        {/* Highlights */}
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            { emoji: '🇮🇹', title: 'Italian Soul', desc: 'Inspired by the simplicity and honesty of Italian home cooking' },
            { emoji: '🌿', title: 'Fresh & Seasonal', desc: 'Local ingredients, sourced with care, prepared with intention' },
            { emoji: '❤️', title: 'Made with Love', desc: 'Every meal is personal — cooked for you, not for a crowd' },
          ].map(h => (
            <div key={h.title} className="bg-white rounded-xl p-8 text-center shadow-[0_2px_16px_rgba(0,0,0,0.025)] border border-black/[0.03] hover:-translate-y-1 transition-transform duration-300">
              <div className="text-3xl mb-3">{h.emoji}</div>
              <h4 className="font-caveat text-xl font-semibold text-[var(--charcoal)] mb-1">{h.title}</h4>
              <p className="text-sm leading-relaxed text-[var(--warm-gray)] font-light">{h.desc}</p>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* Event Banner */}
      <section className="bg-gradient-to-r from-[var(--rose-pale)] via-[var(--peach)] to-[var(--sage-pale)] py-16 px-8 text-center">
        <FadeIn className="max-w-[600px] mx-auto">
          <p className="font-josefin text-[0.65rem] tracking-[0.3em] uppercase text-[var(--rose)] mb-3">Upcoming Event</p>
          <h3 className="font-sacramento text-[clamp(2.5rem,5vw,3.5rem)] font-normal text-[var(--charcoal)] mb-2">
            Valentine&apos;s Italian Evening
          </h3>
          <p className="text-[1.05rem] leading-relaxed text-[var(--warm-gray)] font-light mb-6">
            A five-course Italian dinner for two. Hand-made with love, served with candlelight. February 14, 2026.
          </p>
          <Link
            href="/events/valentine"
            className="inline-block font-josefin text-[0.72rem] font-light tracking-[0.2em] uppercase text-[var(--charcoal)] px-8 py-3 border border-[var(--rose)] rounded-full hover:bg-[var(--rose)] hover:text-white transition-all duration-300"
          >
            View the Menu
          </Link>
        </FadeIn>
      </section>

      {/* Quote */}
      <Quote
        text="Cooking is an act of love, a gift, a way of sharing with others the little secrets — the secrets of the heart."
        author="Sophia Loren"
      />
    </>
  );
}
