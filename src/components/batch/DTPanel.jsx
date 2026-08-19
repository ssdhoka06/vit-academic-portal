import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader, EmptyState } from "../ui/Feedback";
import SealBadge from "../ui/SealBadge";
import { formatDate } from "../../utils/format";
import ResearchDetailModal from "../research/ResearchDetailModal";

const IN_PIPELINE = ["Submitted", "Under Review"];
const NEEDS_ATTENTION = ["Revision Requested", "Rejected"];
const READY = ["Accepted", "Camera Ready"];
const DONE = ["Published", "Patent Filing"];

export default function DTPanel({ yearId, division, batch }) {
  const [semester, setSemester] = useState(1);
  const [openRecord, setOpenRecord] = useState(null);

  const { data: records, loading } = useApi(
    () => api.getResearchPublications(yearId, division, batch, semester),
    [yearId, division, batch, semester],
  );

  if (loading || !records) return <Loader label="Loading publication records…" />;

  const count = (statuses) => records.filter((r) => statuses.includes(r.currentStatus)).length;
  const stats = [
    { label: "In review pipeline", value: count(IN_PIPELINE) },
    { label: "Needs attention", value: count(NEEDS_ATTENTION) },
    { label: "Accepted / camera ready", value: count(READY) },
    { label: "Published or filing patent", value: count(DONE) },
  ];

  const deadlines = records
    .flatMap((r) => r.deadlines.map((d) => ({ ...d, group: r.code, paperTitle: r.paperTitle })))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <div>
      <div className="semester-tabs">
        {[1, 2].map((s) => (
          <button key={s} className={`semester-tab${semester === s ? " is-active" : ""}`} onClick={() => setSemester(s)}>
            Semester {s === 1 ? "I" : "II"}
          </button>
        ))}
      </div>

      {records.length === 0 ? (
        <EmptyState title="No EDI subject this semester" desc="Check the other semester tab." />
      ) : (
        <>
          <div className="dash-grid" style={{ marginBottom: 20 }}>
            {stats.map((s) => (
              <div className="card card-pad" key={s.label}>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>{s.label}</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 600, color: "var(--brand-800)" }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="research-layout" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            <div className="card" style={{ overflow: "hidden" }}>
              <table className="simple-table">
                <thead>
                  <tr>
                    <th>Group</th>
                    <th>Paper title</th>
                    <th>Status</th>
                    <th>Target venue</th>
                    <th>Presentation</th>
                    <th>Reg. fee</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} onClick={() => setOpenRecord(r)} style={{ cursor: "pointer" }}>
                      <td className="mono" style={{ fontWeight: 600, color: "var(--ink)" }}>{r.code}</td>
                      <td style={{ maxWidth: 240 }}>{r.paperTitle}</td>
                      <td><SealBadge status={r.currentStatus} /></td>
                      <td>
                        <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 12.5 }}>{r.targetVenue.short}</div>
                        <span className="pill-static">{r.targetVenue.indexing}</span>
                      </td>
                      <td className="date-col">{r.presentationDate ? formatDate(r.presentationDate) : "—"}</td>
                      <td>
                        <span className="pill-static">{r.registrationFeeStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card card-pad" style={{ alignSelf: "start" }}>
              <h4 style={{ fontSize: 14.5, marginBottom: 14 }}>Upcoming deadlines</h4>
              {deadlines.length === 0 ? (
                <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>No pending deadlines for this batch right now.</p>
              ) : (
                <div className="timeline">
                  {deadlines.map((d, i) => (
                    <div className="timeline-item" key={`${d.group}-${d.label}-${i}`}>
                      <div className="tl-date">{formatDate(d.date)}</div>
                      <div className="tl-title">{d.label}</div>
                      <div className="tl-cat">Group {d.group} · {d.paperTitle}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <style>{`
            @media (max-width: 880px) { .research-layout { grid-template-columns: 1fr !important; } }
          `}</style>
        </>
      )}

      <ResearchDetailModal record={openRecord} onClose={() => setOpenRecord(null)} />
    </div>
  );
}