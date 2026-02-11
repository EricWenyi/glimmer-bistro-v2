import FadeIn from '@/components/FadeIn';
import SectionTitle from '@/components/SectionTitle';
import StoryCard from '@/components/StoryCard';

export default function ChefPage() {
  return (
    <section className="content-section" style={{ paddingTop: '6rem' }}>
      <SectionTitle title="The Chef's Story" sub="How Glimmer Bistro Came to Be" />

      <div className="story-grid">
        <FadeIn>
          <StoryCard title="It Started with a Question ✨">
            <p>What if dinner could feel like a gift? Not a reservation at some crowded spot, but something made just for you — every detail considered, every flavor intentional.</p>
            <p>I grew up watching my family cook. Not professionally, but with the kind of care that makes you remember a meal twenty years later. That feeling — of being fed with love — is what I wanted to recreate.</p>
          </StoryCard>
        </FadeIn>

        <FadeIn>
          <StoryCard title="The Kitchen as a Studio 🍳">
            <p>I approach cooking the way an artist approaches a canvas. Every meal has a palette — the deep red of a slow braise, the bright green of fresh basil, the golden crust of toasted ciabatta. I plan courses the way you&apos;d plan movements of a symphony: contrast, rhythm, surprise.</p>
            <p>My kitchen is small, my ambition is not. I&apos;ve spent hours perfecting a single gremolata. I&apos;ve braised veal shanks at midnight. I&apos;ve turned my living room into a dining room with candlelight and linen napkins.</p>
          </StoryCard>
        </FadeIn>

        <FadeIn>
          <StoryCard title='Why "Glimmer"? 💫' signature="G">
            <p>Because the best evenings have a certain glow to them. The candlelight on a wine glass. The warmth of a kitchen in full swing. The moment someone takes a first bite and their eyes light up.</p>
            <p>Glimmer Bistro isn&apos;t a place — it&apos;s a feeling. And I want to share it with you.</p>
          </StoryCard>
        </FadeIn>
      </div>
    </section>
  );
}
