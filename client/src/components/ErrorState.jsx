export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <h2>Unable to load dashboard</h2>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
