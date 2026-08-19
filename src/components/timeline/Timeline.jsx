import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader } from "../ui/Feedback";
import { formatDate, isPastDate } from "../../utils/format";

const CAT_LABEL = { calendar: "Academic Calendar", sdp: "SDP", edi: "EDI", dt: "DT", cp: "CP" };

export default function Timeline() {
  const { data, loading } = useApi(() => api.getAcademicCalendar(), []);
  if (loading || !data) return <Loader label="Loading academic calendar…" />;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28 }} className="timeline-layout">
      <div className="card card-pad">
        <div className="timeline">
          {data.map((ev) => {
            const past = isPastDate(ev.date);
            return (
              <div className={`timeline-item${past ? " is-past" : ""}`} key={ev.title}>
                <div className="tl-date">{formatDate(ev.date)}</div>
                <div className="tl-title">{ev.title}</div>
                <div className="tl-cat">{past ? "Completed" : "Scheduled"} · <span className="pill-static">{CAT_LABEL[ev.cat] ?? ev.cat}</span></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card card-pad" style={{ alignSelf: "start" }}>
        <h4 style={{ fontSize: 14.5, marginBottom: 8 }}>Reading the timeline</h4>
        <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>
          Muted markers indicate completed milestones; teal markers indicate what's still ahead this
          semester, from SDP registration through End-Semester examinations.
        </p>
      </div>
      <style>{`
        @media (max-width: 880px) { .timeline-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
