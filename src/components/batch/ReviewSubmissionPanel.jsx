import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader } from "../ui/Feedback";
import { formatDate, isPastDate } from "../../utils/format";

export default function ReviewSubmissionPanel({ yearId, type }) {
  const { data, loading } = useApi(() => api.getReviewAndSubmissionDates(yearId), [yearId]);
  if (loading || !data) return <Loader label="Loading schedule…" />;

  const rows = type === "submissions" ? data.submissions : data.reviews;

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <table className="simple-table">
        <thead>
          <tr>
            <th>{type === "submissions" ? "Submission" : "Review"}</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <td>{r.label}</td>
              <td className="date-col">{formatDate(r.date)}</td>
              <td>
                <span className={`seal ${isPastDate(r.date) ? "seal-completed" : "seal-in-progress"}`}>
                  <span className="seal-dot" />{isPastDate(r.date) ? "Done" : "Scheduled"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
