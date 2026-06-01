const STATUS_LABELS = {
  NEW: "In progress",
  FINISHED: "Completed",
  EXAM_PASSED: "Exam passed",
};

export default function StatusBadge({ status }) {
  const label = STATUS_LABELS[status] ?? status;
  const variant = status?.toLowerCase().replace("_", "-") ?? "unknown";

  return (
    <span className={`status-badge status-badge--${variant}`}>{label}</span>
  );
}
