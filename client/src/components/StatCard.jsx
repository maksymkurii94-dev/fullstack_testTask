export default function StatCard({ label, value, hint, delay = 0 }) {
  return (
    <article
      className="stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {hint ? <p className="stat-card__hint">{hint}</p> : null}
    </article>
  );
}
