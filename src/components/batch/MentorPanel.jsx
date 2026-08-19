import { FiMail, FiBriefcase } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader } from "../ui/Feedback";

export default function MentorPanel({ yearId, division, batch }) {
  const { data: mentor, loading } = useApi(() => api.getFacultyMentor(yearId, division, batch), [yearId, division, batch]);
  if (loading || !mentor) return <Loader label="Loading mentor details…" />;

  const initials = mentor.name.replace(/^(Dr\.|Prof\.)\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  // Prefer a real, known email/handle when the record supplies one; only
  // guess a handle from the name as a last resort.
  const email = mentor.email ?? `${mentor.name.replace(/^(Dr\.|Prof\.)\s*\(?.*?\)?\s*/, "").toLowerCase().split(" ").join(".")}@vit.edu`;

  return (
    <div className="card card-pad" style={{ maxWidth: 460 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 18 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "var(--brand-800)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600,
        }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 16, color: "var(--brand-900)" }}>{mentor.name}</div>
          <div className="text-muted" style={{ fontSize: 13 }}>{mentor.designation}</div>
        </div>
      </div>
      <div className="stack-12">
        <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5 }}>
          <FiBriefcase style={{ color: "var(--brand-600)" }} /> {mentor.dept}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13.5 }}>
          <FiMail style={{ color: "var(--brand-600)" }} /> <span className="mono">{email}</span>
        </div>
        {mentor.linkedin && (
          <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 12, color: "var(--brand-600)" }}>
            View LinkedIn profile ↗
          </a>
        )}
      </div>
      <p className="text-muted" style={{ fontSize: 12.5, marginTop: 16, marginBottom: 0 }}>
        As Head of Department, {mentor.name} is this batch's assigned faculty mentor of record for EDI and
        course-project reviews this semester.
      </p>
    </div>
  );
}