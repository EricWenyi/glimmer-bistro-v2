import SectionTitle from '@/components/SectionTitle';
import FadeIn from '@/components/FadeIn';

export default function GalleryPage() {
  const placeholders = [
    { id: 1, emoji: '📸' },
    { id: 2, emoji: '🍽️' },
    { id: 3, emoji: '🕯️' },
    { id: 4, emoji: '🥖' },
    { id: 5, emoji: '🍝' },
    { id: 6, emoji: '🍮' },
  ];

  return (
    <section className="content-section" style={{ paddingTop: '6rem', maxWidth: '900px' }}>
      <SectionTitle title="Gallery" sub="Moments from the Kitchen" />

      <div className="gallery-grid">
        {placeholders.map(item => (
          <FadeIn key={item.id}>
            <div className="gallery-item">
              <span className="gi-emoji">{item.emoji}</span>
              <p>Coming Soon</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="gallery-note">Photos from our Valentine&apos;s dinner will appear here ✨</p>
      </FadeIn>
    </section>
  );
}
