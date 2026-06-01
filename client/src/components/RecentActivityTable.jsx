import { memo } from "react";
import StatusBadge from "./StatusBadge.jsx";
import { formatDate } from "../utils/format.js";

function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="progress" aria-label={`${pct}% complete`}>
      <div className="progress__fill" style={{ width: `${pct}%` }} />
      <span className="progress__text">{pct}%</span>
    </div>
  );
}

function ActivityRow({ row, index }) {
  return (
    <tr style={{ animationDelay: `${80 + index * 40}ms` }}>
      <td className="activity-table__student">{row.studentName}</td>
      <td className="activity-table__course">{row.courseTitle}</td>
      <td>{formatDate(row.enrolledAt)}</td>
      <td>
        <ProgressBar value={row.progress} />
      </td>
      <td>
        <StatusBadge status={row.status} />
      </td>
    </tr>
  );
}

const MemoRow = memo(ActivityRow);

function RecentActivityTable({ rows }) {
  if (!rows.length) {
    return (
      <p className="activity-table__empty">No student activity yet.</p>
    );
  }

  return (
    <div className="activity-table-wrap">
      <table className="activity-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Enrolled</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <MemoRow key={`${row.userId}-${row.enrolledAt}-${i}`} row={row} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(RecentActivityTable);
