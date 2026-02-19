import FadeIn from '@/components/FadeIn';
import SectionTitle from '@/components/SectionTitle';
import { fetchContent } from '@/lib/content';

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const content = await fetchContent('recipe', slug);
  const cover = content.cover?.[0];
  const gallery = content.gallery ?? [];

  return (
    <section className="content-section" style={{ paddingTop: '6rem' }}>
      <SectionTitle title={`Recipe: ${slug}`} sub="Dynamic content from placement API" />

      {cover && (
        <figure className="event-hero" data-placement-id={cover.placementShortCode}>
          <img src={cover.imageUrl} alt={cover.alt || cover.caption || `${slug} cover`} className="event-hero-image" />
          {cover.caption && <figcaption>{cover.caption}</figcaption>}
        </figure>
      )}

      {gallery.length > 0 ? (
        <div className="event-gallery">
          {gallery.map((item) => (
            <FadeIn key={item.placementShortCode}>
              <figure className="event-gallery-item" data-placement-id={item.placementShortCode}>
                <img src={item.imageUrl} alt={item.alt || item.caption || `${slug} gallery image`} />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            </FadeIn>
          ))}
        </div>
      ) : (
        <p className="gallery-note">No published recipe images yet.</p>
      )}
    </section>
  );
}
