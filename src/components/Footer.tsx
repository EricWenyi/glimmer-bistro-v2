export default function Footer() {
  return (
    <footer className="site-footer">
      <h3>Glimmer Bistro</h3>
      <div className="footer-dots">
        {[...Array(5)].map((_, i) => <span key={i} />)}
      </div>
      <p>Cooked with love. <em>Cucinato con amore.</em></p>
      <p className="copy">© 2026 Glimmer Bistro</p>
    </footer>
  );
}
