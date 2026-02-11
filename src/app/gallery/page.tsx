import SectionTitle from '@/components/SectionTitle';
import FadeIn from '@/components/FadeIn';

export default function GalleryPage() {
  // TODO: Replace with dynamic images from Cloudinary
  const placeholder = [
    { id: 1, alt: 'Coming soon', emoji: '📸' },
    { id: 2, alt: 'Coming soon', emoji: '🍽️' },
    { id: 3, alt: 'Coming soon', emoji: '🕯️' },
    { id: 4, alt: 'Coming soon', emoji: '🥖' },
    { id: 5, alt: 'Coming soon', emoji: '🍝' },
    { id: 6, alt: 'Coming soon', emoji: '🍮' },
  ];

  return (
    <section className="max-w-[900px] mx-auto px-8 py-24">
      <SectionTitle title="Gallery" sub="Moments from the Kitchen" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {placeholder.map((item) => (
          <FadeIn key={item.id}>
            <div className="aspect-square bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.025)] border border-black/[0.03] flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-transform duration-300">
              <span className="text-4xl opacity-30">{item.emoji}</span>
              <p className="font-josefin text-[0.65rem] tracking-[0.2em] uppercase text-[var(--light-gray)]">
                Coming Soon
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="text-center mt-12">
        <p className="font-caveat text-xl text-[var(--warm-gray)]">
          Photos from our Valentine&apos;s dinner will appear here ✨
        </p>
      </FadeIn>
    </section>
  );
}
