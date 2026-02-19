import SectionTitle from '@/components/SectionTitle';
import CourseCard from '@/components/CourseCard';
import { valentineMenu } from '@/data/menu';
import FadeIn from '@/components/FadeIn';
import { fetchContent } from '@/lib/content';

export const revalidate = 30;

export default async function ValentinePage() {
  const content = await fetchContent('event', 'valentine-2026');
  const heroImage = content.hero?.[0];
  const gallery = content.gallery ?? [];

  return (
    <section className="content-section" style={{ paddingTop: '6rem' }}>
      <SectionTitle title="Valentine's Italian Evening" sub="February 14, 2026 · Five Courses · For Two" />

      {heroImage && (
        <figure className="event-hero" data-placement-id={heroImage.placementShortCode}>
          <img src={heroImage.imageUrl} alt={heroImage.alt || heroImage.caption || 'Valentine event hero'} className="event-hero-image" />
          {heroImage.caption && <figcaption>{heroImage.caption}</figcaption>}
        </figure>
      )}

      {gallery.length > 0 && (
        <div className="event-gallery">
          {gallery.map((item) => (
            <FadeIn key={item.placementShortCode}>
              <figure className="event-gallery-item" data-placement-id={item.placementShortCode}>
                <img src={item.imageUrl} alt={item.alt || item.caption || 'Event gallery image'} />
                {item.caption && <figcaption>{item.caption}</figcaption>}
              </figure>
            </FadeIn>
          ))}
        </div>
      )}

      {valentineMenu.map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </section>
  );
}
