import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import SectionTitle from '@/components/SectionTitle';
import StoryCard from '@/components/StoryCard';
import Quote from '@/components/Quote';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <FadeIn className="">
          <div className="hero-content">
            <h2>Glimmer Bistro</h2>
            <span className="brush-line" />
            <p className="hero-tagline">Where every meal tells a story</p>
            <p className="hero-sub">A Home Kitchen with Heart</p>
          </div>
        </FadeIn>
        <div className="scroll-cue">↓ Scroll</div>
      </section>

      {/* Chef Intro */}
      <section className="content-section">
        <SectionTitle title="Meet the Chef" sub="The Person Behind the Apron" />
        <FadeIn>
          <div className="story-grid">
            <StoryCard title="Hello, I'm G 👋" signature="G">
              <p>I&apos;m not a trained chef — I&apos;m someone who believes that the best meals come from genuine care and curiosity. Glimmer Bistro started as a simple idea: what if I turned my home kitchen into a dining experience worth remembering?</p>
              <p>Every dish I make is a conversation between technique I&apos;ve studied and flavors I&apos;ve fallen in love with. From hand-torn burrata to slow-braised osso buco, I cook the way I think food should be — with patience, good ingredients, and no shortcuts.</p>
              <p>This isn&apos;t a restaurant. It&apos;s an invitation to my table.</p>
            </StoryCard>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="story-highlights">
            <div className="highlight-item">
              <div className="hl-emoji">🇮🇹</div>
              <h4>Italian Soul</h4>
              <p>Inspired by the simplicity and honesty of Italian home cooking</p>
            </div>
            <div className="highlight-item">
              <div className="hl-emoji">🌿</div>
              <h4>Fresh &amp; Seasonal</h4>
              <p>Local ingredients, sourced with care, prepared with intention</p>
            </div>
            <div className="highlight-item">
              <div className="hl-emoji">❤️</div>
              <h4>Made with Love</h4>
              <p>Every meal is personal — cooked for you, not for a crowd</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Event Banner */}
      <section className="event-banner">
        <FadeIn>
          <div className="event-banner-inner">
            <p className="event-tag">Upcoming Event</p>
            <h3>Valentine&apos;s Italian Evening</h3>
            <p>A five-course Italian dinner for two. Hand-made with love, served with candlelight. February 14, 2026.</p>
            <Link href="/events/valentine" className="event-btn">View the Menu</Link>
          </div>
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
