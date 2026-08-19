import { FiUsers, FiFolder, FiCompass, FiTrendingUp } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader } from "../ui/Feedback";
import ProgressBar from "../ui/ProgressBar";

export default function OverviewPanel({ yearId, division, batch }) {
  const { data, loading } = useApi(() => api.getBatchOverview(yearId, division, batch), [yearId, division, batch]);
  if (loading || !data) return <Loader label="Loading overview…" />;

  const stats = [
    { icon: <FiUsers />, label: "Batch strength", value: `${data.strength} students` },
    { icon: <FiFolder />, label: "Course-project subjects", value: `${data.cpSubjectCount} this year` },
    { icon: <FiCompass />, label: "EDI tracks", value: `${data.ediSubjectCount} this year` },
    { icon: <FiTrendingUp />, label: "Groups per subject", value: `${data.groupsPerSubject} in this batch` },
  ];

  return (
    <div className="stack-20">
      <div className="card card-pad">
        <p style={{ fontSize: 14.5, margin: 0 }}>{data.summary}</p>
      </div>

      <div className="dash-grid">
        {stats.map((s) => (
          <div className="card card-pad" key={s.label} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div className="dash-icon icon-cp" style={{ background: "var(--brand-700)" }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{s.label}</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, color: "var(--brand-900)" }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card card-pad">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <h4 style={{ margin: 0, fontSize: 14.5 }}>Overall semester progress</h4>
        </div>
        <ProgressBar value={data.overallProgress} />
      </div>
    </div>
  );
}