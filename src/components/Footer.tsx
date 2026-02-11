export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--cream)] text-center py-14 px-8">
      <h3 className="font-sacramento text-4xl font-normal mb-1">Glimmer Bistro</h3>
      <div className="flex items-center justify-center gap-1.5 my-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[var(--rose)] opacity-50" />
        ))}
      </div>
      <p className="font-light text-[0.95rem] text-[var(--blush)]">
        Cooked with love. <em>Cucinato con amore.</em>
      </p>
      <p className="mt-6 font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-white/15">
        © 2026 Glimmer Bistro
      </p>
    </footer>
  );
}
