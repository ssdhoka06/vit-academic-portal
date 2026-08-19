import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader } from "../ui/Feedback";
import Modal from "../ui/Modal";
import { formatDate } from "../../utils/format";

export default function SDPPanel({ yearId }) {
  const { data, loading } = useApi(() => api.getSDP(yearId), [yearId]);
  const [openProgram, setOpenProgram] = useState(null);
  if (loading) return <Loader label="Loading SDP tracks…" />;

  return (
    <>
      <div className="card" style={{ overflow: "hidden" }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Type</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Status</th>
              <th aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ fontWeight: 600, color: "var(--brand-900)" }}>{p.title}</div>
                  <div className="text-muted" style={{ fontSize: 11.5, marginTop: 2 }}>{p.organizingDept}</div>
                </td>
                <td><span className="pill-static">{p.type}</span></td>
                <td className="date-col">{formatDate(p.date)}</td>
                <td className="mono">{p.hours}h</td>
                <td>
                  <span className={`seal ${p.status === "completed" ? "seal-completed" : "seal-in-progress"}`}>
                    <span className="seal-dot" />{p.status === "completed" ? "Completed" : "Upcoming"}
                  </span>
                </td>
                <td>
                  <button
                    className="icon-btn"
                    onClick={() => setOpenProgram(p)}
                    aria-label={`More information about ${p.title}`}
                    title="Event details"
                  >
                    <FiInfo />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!openProgram} onClose={() => setOpenProgram(null)} eyebrow={openProgram?.type} title={openProgram?.title ?? ""}>
        {openProgram && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={`seal ${openProgram.status === "completed" ? "seal-completed" : "seal-in-progress"}`}>
                <span className="seal-dot" />{openProgram.status === "completed" ? "Completed" : "Upcoming"}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{openProgram.description}</p>
            <dl className="modal-row"><dt>Organized by</dt><dd>{openProgram.organizingDept}</dd></dl>
            <dl className="modal-row"><dt>Date</dt><dd className="mono">{formatDate(openProgram.date)}</dd></dl>
            <dl className="modal-row"><dt>Duration</dt><dd>{openProgram.hours} hours</dd></dl>
            <dl className="modal-row"><dt>Venue</dt><dd>{openProgram.venue}</dd></dl>
            <dl className="modal-row"><dt>Category</dt><dd><span className="pill-static">{openProgram.type}</span></dd></dl>
          </>
        )}
      </Modal>
    </>
  );
}