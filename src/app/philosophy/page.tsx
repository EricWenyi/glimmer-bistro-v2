import FadeIn from '@/components/FadeIn';
import SectionTitle from '@/components/SectionTitle';
import StoryCard from '@/components/StoryCard';
import Quote from '@/components/Quote';

export default function PhilosophyPage() {
  return (
    <>
      <section className="max-w-[780px] mx-auto px-8 py-24">
        <SectionTitle title="Our Philosophy" sub="What We Believe In" />

        <div className="space-y-10">
          <FadeIn>
            <StoryCard title="Simplicity is Sophistication 🌱">
              <p>The best Italian cooking doesn&apos;t hide behind complexity — it celebrates the ingredient. A perfect tomato needs nothing more than salt, olive oil, and basil. We let quality speak for itself.</p>
            </StoryCard>
          </FadeIn>

          <FadeIn>
            <StoryCard title="Time is an Ingredient ⏳">
              <p>A good braise can&apos;t be rushed. A tiramisu needs a night to become itself. We believe in giving food the time it deserves — slow hands, patient heat, and the understanding that the best things are worth waiting for.</p>
            </StoryCard>
          </FadeIn>

          <FadeIn>
            <StoryCard title="Every Meal is Personal 💌">
              <p>We don&apos;t cook for crowds. Every dinner at Glimmer Bistro is intimate — designed for the people at the table, with their tastes in mind. This isn&apos;t mass production. This is a love letter on a plate.</p>
            </StoryCard>
          </FadeIn>
        </div>
      </section>

      <Quote
        text="The discovery of a new dish does more for the happiness of the human race than the discovery of a star."
        author="Jean Anthelme Brillat-Savarin"
      />
    </>
  );
}
