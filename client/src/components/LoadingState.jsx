export default function LoadingState() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div className="loading__spinner" />
      <p>Loading partner dashboard…</p>
    </div>
  );
}
